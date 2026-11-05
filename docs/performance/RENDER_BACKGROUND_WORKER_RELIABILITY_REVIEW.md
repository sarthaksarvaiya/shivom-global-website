# SHIVOM GLOBAL — Render Background Worker Reliability Review

**Document Version:** 2.6.0 (Final Reliability Hardening & Pre-Staging Verification)  
**Review Date:** November 5, 2026  
**Status:** Architectural Review & Pre-Staging Audit Report  
**Author:** Senior PostgreSQL Reliability Engineer, Backend Architect & Security Auditor  
**Target Systems:**
- `api/cron/retry-failed-inquiries.ts` (Existing Legacy Vercel Cron Function)
- `api/buyer-requirements.ts` (Existing Primary Buyer Intake Endpoint)
- `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Existing Applied Migration)
- `supabase/migrations/20261105000001_inquiry_outbox_atomic_ownership.sql` (Target Prerequisite Migration)
- `docs/performance/RENDER_BACKGROUND_WORKER_MIGRATION_SPECIFICATION.md` (Migration Specification)

---

## 1. Document Change Log

| Version | Change ID | Focus Area | Detailed Resolution |
|:---:|:---|:---|:---|
| **v2.6.0** | **REV-30** | **Double-Authorization Invariant (`ALREADY_AUTHORIZED`)** | Added Predicate 6 to `authorize_inquiry_outbox_dispatch` checking `v_job.authorized_at IS NOT NULL`. Rejects duplicate authorization calls within the same claim lease with error code `ALREADY_AUTHORIZED`, mathematically guaranteeing `attempt_count` can never be incremented twice for the same claim. |
| **v2.6.0** | **REV-31** | **Signature Reconciliation on `claim_inquiry_outbox_jobs`** | Corrected argument type order in SQL DDL, grants, and revocations to `(INTEGER, TEXT, INTEGER)` (`p_batch_size`, `p_worker_id`, `p_lease_seconds`) matching the existing PostgreSQL function signature in `20261104000000_inquiry_reliability_hardening.sql`. |
| **v2.6.0** | **REV-32** | **Prerequisite DDL Schema Alteration (`authorized_at`)** | Verified `authorized_at` does not exist in `20261104000000_inquiry_reliability_hardening.sql`. Added `ALTER TABLE public.inquiry_outbox ADD COLUMN IF NOT EXISTS authorized_at TIMESTAMPTZ;` as mandatory Step 0 executing prior to stored procedure compilation. |
| **v2.6.0** | **REV-33** | **Awaited Maintenance & Database RPC Error Handling** | Replaced fire-and-forget maintenance RPC call with an awaited fetch, bounded `AbortSignal.timeout(DB_TIMEOUT_MS)`, HTTP status validation, and structured error logging across `release_inquiry_outbox_jobs`, `quarantine_inquiry_outbox_job`, and `fail_inquiry_outbox_job`. |
| **v2.6.0** | **REV-34** | **Transactional DDL STG-09 Test Setup & Suite (`STG-01` to `STG-14`)** | Rewrote `STG-09` using a technically valid PostgreSQL transactional DDL setup (`BEGIN; ALTER TABLE ... DROP CONSTRAINT ...; INSERT orphan; SELECT complete_inquiry_outbox_job(...); ROLLBACK;`). Replaced invalid session-level foreign key disabling claims. |
| **v2.6.0** | **REV-35** | **STG-08 Transactionally Valid NULL Notification Type Test** | Replaced invalid "bypassing DDL" test with a transactionally valid test using `BEGIN; ALTER TABLE public.inquiry_outbox ALTER COLUMN notification_type DROP NOT NULL; INSERT ...; SELECT authorize_inquiry_outbox_dispatch(...); ROLLBACK;`. Explained PostgreSQL CHECK constraint ternary logic (evaluating to UNKNOWN does not reject rows) and designated test strictly for isolated staging. |
| **v2.6.0** | **REV-36** | **STG-09 Precise Dynamic Dual-FK Rollback Test** | Resolved foreign key handling by dynamically querying `inquiry_id` FK from `pg_constraint`, dropping only the `inquiry_id` FK within `BEGIN`, providing a valid `reference_id` to satisfy the separate `reference_id` FK constraint, and asserting `BUYER_REQUIREMENT_SYNC_FAILED` transaction abort before `ROLLBACK`. |
| **v2.6.0** | **REV-37** | **Explicit Worker Response Parsing Contract (`RpcResult<T>`)** | Replaced all `.catch(() => false)`, `.catch(() => [])`, and `.catch(() => '')` fallback patterns with typed `RpcResult<T>` and `invokePostgrestRpc<T>`. Enforced HTTP status check, try/catch JSON parsing, explicit non-JSON/502/503 HTML error capture as `INVALID_JSON`, schema validation, and structured error categorization preventing misclassification of infrastructure faults as business rejections. |
| **v2.5.0** | **REV-26–29** | **Completion Authorization & Sync Verification** | Added `authorized_at IS NOT NULL` guard on completion, cleared `authorized_at = NULL` upon `SENT`, null-safe `IS DISTINCT FROM`, and exception rollback on `buyer_requirements` sync failure. |
| **v2.4.0** | **REV-18–25** | **Lifecycle Hardening & RPC Alignment** | Reset `authorized_at = NULL` on claim/fail, reconciled 6 authorization error codes, database-issued lease margin check, post-retry payload conflict quarantine, initial atomic sync, and SECURITY DEFINER role restrictions. |
| **v2.3.0** | **REV-12–17** | **Shutdown Release & Quarantine Baseline** | Introduced `authorized_at` column, expanded lease to 300s, and defined baseline synthetic staging tests. |
| **v2.2.0** | **REV-07–11** | **Authorized Dispatch Semantics** | Formally defined `attempt_count` as authorized dispatches, discriminated Resend 409 responses, and disentangled timing domains. |
| **v2.1.0** | **REV-01–06** | **Core Reliability Baseline** | Real-time `clock_timestamp()` lease checks, initial quarantine strategy, Resend 24h key retention window, and exact 60,999 ms backoff bounds. |

---

## 2. Executive Summary & Consolidated Architecture Audit

This consolidated audit finalizes the architecture and database contract for migrating the commercial inquiry retry worker from Vercel Cron to a dedicated Render Background Worker.

### Architectural Verdict
The decoupled hybrid model (Vercel Edge for web intake + Render persistent daemon for queue processing + Supabase Mumbai as authoritative state machine) is **verified and approved**.

### Consolidated State Machine & Operational Invariants
```
                  ┌──────────────── trg_enqueue_inquiry_outbox() (AFTER INSERT)
                  ▼
              [ PENDING ] (attempt_count = 0, authorized_at = NULL)
                  │
                  │ claim_inquiry_outbox_jobs(batch, worker_id, 300s)
                  │ (FOR UPDATE SKIP LOCKED, status = 'PROCESSING', authorized_at = NULL)
                  ▼
            [ PROCESSING ] (locked_by = workerId, lease_expires_at = clock_timestamp() + 300s)
                  │
                  │ authorize_inquiry_outbox_dispatch()
                  │ (Verifies: status, worker_id, lease, notif_type, authorized_at IS NULL, attempts < 5)
                  │ (Atomic: attempt_count = attempt_count + 1, authorized_at = clock_timestamp())
                  ▼
            [ AUTHORIZED ] ───► Resend API Call (with Idempotency-Key: sg-outbox-${id})
             /     |    \
            /      |     \
  Resend OK /      |      \ Resend Error (4xx, 5xx, or network failure)
          ▼        |       ▼
       [ SENT ]    |   [ FAILED ] (attempt_count < 5, authorized_at = NULL, backoff delay scheduled)
  (Guards Auth,    |       │
   clears marker,  |       │ Next claim cycle when next_retry_at <= clock_timestamp()
   atomic sync     |       ▼
   buyer_req)      |   [ PROCESSING ] (Claim explicitly resets authorized_at = NULL)
                   |       │
                   | (Attempt 5 Fails)
                   |       ▼
                   └──►[ DEAD_LETTER ] (attempt_count >= 5, or Quarantined Unsupported Type)
```

---

## 3. Authoritative PostgreSQL Database Contract

All stored procedures execute with `SECURITY DEFINER` and `SET search_path = ''`. All internal references are fully schema-qualified (`public.inquiry_outbox`, `public.buyer_requirements`, `pg_catalog.clock_timestamp()`).

```sql
-- ============================================================================
-- 0. PREREQUISITE DDL: SCHEMA ALTERATION
-- ============================================================================
-- Verified: authorized_at does NOT exist in 20261104000000_inquiry_reliability_hardening.sql.
-- This ALTER TABLE statement MUST execute first before any stored procedures referencing authorized_at are compiled.
ALTER TABLE public.inquiry_outbox 
  ADD COLUMN IF NOT EXISTS authorized_at TIMESTAMPTZ;

COMMENT ON COLUMN public.inquiry_outbox.authorized_at IS 
  'Ephemeral timestamp recording when a worker received database authorization to dispatch. Strictly NULL when unstarted; cleared upon completion, failure, or claim.';

-- ============================================================================
-- 1. CLAIM INQUIRY OUTBOX JOBS
-- ============================================================================
CREATE OR REPLACE FUNCTION public.claim_inquiry_outbox_jobs(
  p_batch_size INTEGER DEFAULT 5,
  p_worker_id TEXT DEFAULT 'worker',
  p_lease_seconds INTEGER DEFAULT 300
)
RETURNS SETOF public.inquiry_outbox
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  WITH claimable AS (
    SELECT id 
    FROM public.inquiry_outbox
    WHERE (
      (status IN ('PENDING', 'FAILED') AND next_retry_at <= pg_catalog.clock_timestamp())
      OR
      (status = 'PROCESSING' AND lease_expires_at <= pg_catalog.clock_timestamp())
    )
    AND notification_type = 'TRADE_DESK_ALERT'
    ORDER BY next_retry_at ASC
    LIMIT p_batch_size
    FOR UPDATE SKIP LOCKED
  )
  UPDATE public.inquiry_outbox o
  SET status = 'PROCESSING',
      locked_at = pg_catalog.clock_timestamp(),
      locked_by = p_worker_id,
      lease_expires_at = pg_catalog.clock_timestamp() + (p_lease_seconds || ' seconds')::pg_catalog.interval,
      authorized_at = NULL, -- Guarantees clean state on initial claim and retries
      updated_at = pg_catalog.clock_timestamp()
  FROM claimable
  WHERE o.id = claimable.id
  RETURNING o.*;
END;
$$;

-- ============================================================================
-- 2. AUTHORIZE INQUIRY OUTBOX DISPATCH
-- ============================================================================
CREATE OR REPLACE FUNCTION public.authorize_inquiry_outbox_dispatch(
  p_event_id UUID,
  p_worker_id TEXT
)
RETURNS TABLE (
  authorized BOOLEAN,
  error_code TEXT,
  attempt_count INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_job public.inquiry_outbox%ROWTYPE;
BEGIN
  SELECT * INTO v_job
  FROM public.inquiry_outbox
  WHERE id = p_event_id
  FOR UPDATE;

  -- Predicate 1: Record existence
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 'RECORD_NOT_FOUND'::TEXT, 0;
    RETURN;
  END IF;

  -- Predicate 2: Status check
  IF v_job.status <> 'PROCESSING' THEN
    RETURN QUERY SELECT FALSE, 'STATUS_NOT_PROCESSING'::TEXT, v_job.attempt_count;
    RETURN;
  END IF;

  -- Predicate 3: Worker lease ownership
  IF v_job.locked_by IS DISTINCT FROM p_worker_id THEN
    RETURN QUERY SELECT FALSE, 'WORKER_ID_MISMATCH'::TEXT, v_job.attempt_count;
    RETURN;
  END IF;

  -- Predicate 4: Lease expiration check under clock_timestamp()
  IF v_job.lease_expires_at IS NULL OR pg_catalog.clock_timestamp() >= v_job.lease_expires_at THEN
    RETURN QUERY SELECT FALSE, 'LEASE_EXPIRED'::TEXT, v_job.attempt_count;
    RETURN;
  END IF;

  -- Predicate 5: Notification type eligibility (Defensive against NULL)
  IF v_job.notification_type IS DISTINCT FROM 'TRADE_DESK_ALERT' THEN
    RETURN QUERY SELECT FALSE, 'UNSUPPORTED_NOTIFICATION_TYPE'::TEXT, v_job.attempt_count;
    RETURN;
  END IF;

  -- Predicate 6: Double-authorization protection within active claim lease
  IF v_job.authorized_at IS NOT NULL THEN
    RETURN QUERY SELECT FALSE, 'ALREADY_AUTHORIZED'::TEXT, v_job.attempt_count;
    RETURN;
  END IF;

  -- Predicate 7: Maximum attempt exhaustion
  IF v_job.attempt_count >= v_job.max_attempts THEN
    UPDATE public.inquiry_outbox
    SET status = 'DEAD_LETTER',
        last_error = 'MAX_ATTEMPTS_REACHED (Exhausted attempt budget)',
        locked_at = NULL,
        locked_by = NULL,
        lease_expires_at = NULL,
        authorized_at = NULL,
        updated_at = pg_catalog.clock_timestamp()
    WHERE id = p_event_id;
    RETURN QUERY SELECT FALSE, 'MAX_ATTEMPTS_REACHED'::TEXT, v_job.attempt_count;
    RETURN;
  END IF;

  -- Authorization Granted: Atomically increment attempt count and record timestamp
  UPDATE public.inquiry_outbox
  SET attempt_count = v_job.attempt_count + 1,
      authorized_at = pg_catalog.clock_timestamp(),
      updated_at = pg_catalog.clock_timestamp()
  WHERE id = p_event_id;

  RETURN QUERY SELECT TRUE, NULL::TEXT, v_job.attempt_count + 1;
END;
$$;

-- ============================================================================
-- 3. COMPLETE INQUIRY OUTBOX JOB (ATOMIC SYNC & ROW COUNT VERIFICATION)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.complete_inquiry_outbox_job(
  p_event_id UUID,
  p_worker_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_inquiry_id UUID;
  v_outbox_rows INTEGER;
  v_buyer_rows INTEGER;
BEGIN
  -- 1. Atomically mark outbox job as SENT under active lease AND authorization check
  UPDATE public.inquiry_outbox
  SET status = 'SENT',
      sent_at = pg_catalog.clock_timestamp(),
      locked_at = NULL,
      locked_by = NULL,
      lease_expires_at = NULL,
      authorized_at = NULL, -- Reset authorization marker upon completion
      last_error = NULL,
      updated_at = pg_catalog.clock_timestamp()
  WHERE id = p_event_id
    AND status = 'PROCESSING'
    AND locked_by = p_worker_id
    AND lease_expires_at > pg_catalog.clock_timestamp()
    AND authorized_at IS NOT NULL -- GUARDS: Job must have been formally authorized!
  RETURNING inquiry_id INTO v_inquiry_id;

  GET DIAGNOSTICS v_outbox_rows = ROW_COUNT;
  IF v_outbox_rows = 0 THEN
    RETURN FALSE;
  END IF;

  -- 2. Atomically synchronize commercial buyer requirement in the SAME transaction
  UPDATE public.buyer_requirements
  SET email_sent = TRUE,
      email_dispatched_at = pg_catalog.clock_timestamp(),
      updated_at = pg_catalog.clock_timestamp()
  WHERE id = v_inquiry_id;

  GET DIAGNOSTICS v_buyer_rows = ROW_COUNT;
  IF v_buyer_rows <> 1 THEN
    RAISE EXCEPTION 'BUYER_REQUIREMENT_SYNC_FAILED: Expected 1 row for inquiry_id %, found %', v_inquiry_id, v_buyer_rows;
  END IF;

  RETURN TRUE;
END;
$$;

-- ============================================================================
-- 4. FAIL INQUIRY OUTBOX JOB
-- ============================================================================
CREATE OR REPLACE FUNCTION public.fail_inquiry_outbox_job(
  p_event_id UUID,
  p_worker_id TEXT,
  p_error TEXT,
  p_next_retry_at TIMESTAMPTZ
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_curr_count INTEGER;
  v_max_attempts INTEGER;
  v_is_dead_letter BOOLEAN;
BEGIN
  SELECT attempt_count, max_attempts
  INTO v_curr_count, v_max_attempts
  FROM public.inquiry_outbox
  WHERE id = p_event_id
    AND status = 'PROCESSING'
    AND locked_by = p_worker_id
    AND lease_expires_at > pg_catalog.clock_timestamp()
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  v_is_dead_letter := v_curr_count >= v_max_attempts;

  UPDATE public.inquiry_outbox
  SET status = CASE WHEN v_is_dead_letter THEN 'DEAD_LETTER' ELSE 'FAILED' END,
      next_retry_at = CASE WHEN v_is_dead_letter THEN pg_catalog.clock_timestamp() ELSE p_next_retry_at END,
      last_error = pg_catalog.substr(p_error, 1, 255),
      locked_at = NULL,
      locked_by = NULL,
      lease_expires_at = NULL,
      authorized_at = NULL, -- Explicitly clear per-claim authorization marker!
      updated_at = pg_catalog.clock_timestamp()
  WHERE id = p_event_id;

  RETURN TRUE;
END;
$$;

-- ============================================================================
-- 5. RELEASE INQUIRY OUTBOX JOBS (SHUTDOWN GUARD)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.release_inquiry_outbox_jobs(
  p_event_ids UUID[],
  p_worker_id TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_released INTEGER;
BEGIN
  UPDATE public.inquiry_outbox
  SET status = 'PENDING',
      locked_at = NULL,
      locked_by = NULL,
      lease_expires_at = NULL,
      authorized_at = NULL,
      next_retry_at = pg_catalog.clock_timestamp(),
      updated_at = pg_catalog.clock_timestamp()
  WHERE id = ANY(p_event_ids)
    AND status = 'PROCESSING'
    AND locked_by = p_worker_id
    AND authorized_at IS NULL; -- GUARDS AGAINST RELEASING AUTHORIZED IN-FLIGHT JOBS!

  GET DIAGNOSTICS v_released = ROW_COUNT;
  RETURN v_released;
END;
$$;

-- ============================================================================
-- 6. WORKER-LEVEL QUARANTINE (REQUIRES ACTIVE LEASE)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.quarantine_inquiry_outbox_job(
  p_event_id UUID,
  p_worker_id TEXT,
  p_reason TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_rows INTEGER;
BEGIN
  UPDATE public.inquiry_outbox
  SET status = 'DEAD_LETTER',
      last_error = pg_catalog.substr(p_reason, 1, 255),
      locked_at = NULL,
      locked_by = NULL,
      lease_expires_at = NULL,
      authorized_at = NULL,
      updated_at = pg_catalog.clock_timestamp()
  WHERE id = p_event_id
    AND status = 'PROCESSING'
    AND locked_by = p_worker_id
    AND lease_expires_at > pg_catalog.clock_timestamp(); -- PREVENTS STALE WORKER MUTATION!

  GET DIAGNOSTICS v_rows = ROW_COUNT;
  RETURN v_rows > 0;
END;
$$;

-- ============================================================================
-- 7. RECURRING MAINTENANCE CLEANUP (EXPIRED UNSUPPORTED RECORDS)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.cleanup_unsupported_inquiry_outbox_jobs(
  p_batch_size INTEGER DEFAULT 50
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_quarantined INTEGER;
BEGIN
  WITH claimable_unsupported AS (
    SELECT id
    FROM public.inquiry_outbox
    WHERE notification_type != 'TRADE_DESK_ALERT'
      AND (
        status IN ('PENDING', 'FAILED')
        OR (status = 'PROCESSING' AND lease_expires_at <= pg_catalog.clock_timestamp())
      )
    LIMIT p_batch_size
    FOR UPDATE SKIP LOCKED
  )
  UPDATE public.inquiry_outbox o
  SET status = 'DEAD_LETTER',
      last_error = 'QUARANTINED_UNSUPPORTED_TYPE: ' || o.notification_type || ' (Recurring maintenance)',
      locked_at = NULL,
      locked_by = NULL,
      lease_expires_at = NULL,
      authorized_at = NULL,
      updated_at = pg_catalog.clock_timestamp()
  FROM claimable_unsupported
  WHERE o.id = claimable_unsupported.id;

  GET DIAGNOSTICS v_quarantined = ROW_COUNT;
  RETURN v_quarantined;
END;
$$;

-- ============================================================================
-- 8. SECURITY DEFINER PRIVILEGE HARDENING
-- ============================================================================
REVOKE ALL ON FUNCTION public.claim_inquiry_outbox_jobs(INTEGER, TEXT, INTEGER) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.authorize_inquiry_outbox_dispatch(UUID, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.complete_inquiry_outbox_job(UUID, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.fail_inquiry_outbox_job(UUID, TEXT, TEXT, TIMESTAMPTZ) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.release_inquiry_outbox_jobs(UUID[], TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.quarantine_inquiry_outbox_job(UUID, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.cleanup_unsupported_inquiry_outbox_jobs(INTEGER) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.claim_inquiry_outbox_jobs(INTEGER, TEXT, INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION public.authorize_inquiry_outbox_dispatch(UUID, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.complete_inquiry_outbox_job(UUID, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.fail_inquiry_outbox_job(UUID, TEXT, TEXT, TIMESTAMPTZ) TO service_role;
GRANT EXECUTE ON FUNCTION public.release_inquiry_outbox_jobs(UUID[], TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.quarantine_inquiry_outbox_job(UUID, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_unsupported_inquiry_outbox_jobs(INTEGER) TO service_role;
```

---

### 3.1 PostgreSQL Ternary Logic & Null-Safe Evaluation (STG-08 Verification)

Under SQL ternary logic (`TRUE`, `FALSE`, `UNKNOWN`), standard table `CHECK` constraints reject rows **only** when the evaluating predicate resolves to `FALSE`. If the predicate evaluates to `UNKNOWN` (`NULL`), PostgreSQL allows the insertion to proceed.

In `20261104000000_inquiry_reliability_hardening.sql`, the column is defined with two distinct constraints:
```sql
notification_type TEXT NOT NULL CHECK (notification_type IN ('TRADE_DESK_ALERT', 'BUYER_ACKNOWLEDGMENT'))
```
When `notification_type` is `NULL`, the expression `(NULL IN ('TRADE_DESK_ALERT', 'BUYER_ACKNOWLEDGMENT'))` evaluates to `UNKNOWN`, which satisfies the `CHECK` constraint. It is strictly the separate `NOT NULL` constraint that blocks `NULL` values under normal operation.

Consequently, to synthetically test whether `authorize_inquiry_outbox_dispatch`'s Predicate 5 (`v_job.notification_type IS DISTINCT FROM 'TRADE_DESK_ALERT'`) correctly rejects `NULL` inputs, the test procedure must temporarily drop the `NOT NULL` constraint within an uncommitted transaction (`BEGIN ... ROLLBACK`). Because standard SQL inequality (`<>`) evaluates `NULL <> 'TRADE_DESK_ALERT'` to `NULL` (falsy in PL/pgSQL `IF` conditions), using `IS DISTINCT FROM` guarantees that `NULL` evaluates to `TRUE`, properly returning `authorized = FALSE` with error code `UNSUPPORTED_NOTIFICATION_TYPE` without consuming retry attempts or updating timestamps.

> [!CAUTION]
> This test alters relation schema within an uncommitted transaction. It is strictly designated for an isolated staging environment and must **never** be executed against production.

---

### 3.2 Dual Foreign-Key Constraints & Catalog Query (STG-09 Verification)

The `public.inquiry_outbox` table maintains **two separate foreign keys** to `public.buyer_requirements`:
1. `inquiry_id UUID NOT NULL REFERENCES public.buyer_requirements(id) ON DELETE CASCADE`
2. `reference_id TEXT NOT NULL REFERENCES public.buyer_requirements(reference_id) ON DELETE CASCADE`

An invalid test setup that drops all constraints indiscriminately or seeds an arbitrary string for `reference_id` will trigger unexpected constraint violations during row creation. To accurately test the sync rollback invariant in `complete_inquiry_outbox_job`:
1. The exact constraint name for `inquiry_id` is queried dynamically from `pg_constraint`.
2. Within an uncommitted transaction (`BEGIN`), **only** that constraint is dropped.
3. The test seeds an outbox event referencing an **existing valid `reference_id`** (satisfying the second foreign key) and an **unreferenced `inquiry_id`** (`gen_random_uuid()`).
4. When `complete_inquiry_outbox_job` is invoked, the `UPDATE public.buyer_requirements WHERE id = v_inquiry_id` matches 0 rows, triggering `RAISE EXCEPTION 'BUYER_REQUIREMENT_SYNC_FAILED'`, which aborts the transaction (SQLSTATE P0001) and rolls back the outbox completion.
5. The transaction is terminated with `ROLLBACK`, cleanly restoring the table schema.

---

### 3.3 Explicit Worker Response Parsing Contract (`RpcResult<T>`)

To eliminate all silent error swallows (`.catch(() => false / [] / '')`), all worker communication with Supabase PostgREST endpoints is governed by a typed result contract:

```typescript
export type RpcErrorKind =
  | 'NETWORK_TIMEOUT'
  | 'HTTP_ERROR'
  | 'INVALID_JSON'
  | 'INVALID_SHAPE'
  | 'BUSINESS_REJECTION';

export interface RpcError {
  kind: RpcErrorKind;
  message: string;
  status?: number;
  raw?: string;
}

export type RpcResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: RpcError };
```

#### Parsing Lifecycle:
1. **HTTP Status Check First:** `response.ok` is checked before parsing. HTTP 4xx/5xx responses extract raw error text and return `HTTP_ERROR` with the status code.
2. **Safe JSON Parsing:** Body parsing is wrapped in `try/catch`. Non-JSON responses (such as Cloudflare / Kong 502/503 HTML error pages) are categorized as `INVALID_JSON` with a bounded snippet of the raw payload.
3. **Runtime Shape Validation:** The payload is verified against expected schemas (e.g. `Array.isArray` for claims, `typeof d === 'boolean'` for completions). Unexpected shapes return `INVALID_SHAPE` and are never coerced to fallback falsy values.
4. **Categorized Worker Behavior:**
   - `NETWORK_TIMEOUT` / `HTTP_ERROR`: Increments consecutive error count and triggers jittered backoff ($\le 60,999\text{ms}$).
   - `INVALID_JSON` / `INVALID_SHAPE`: Emits structured `CRITICAL` logs; prevents blind retry loops.
   - `BUSINESS_REJECTION`: Handled via regular domain logic (e.g. lease expired or already authorized).
5. **Mutation Retry Invariant:** The worker never blindly retries state mutations (`complete`, `fail`, `quarantine`) upon network timeout or HTTP 5xx, as the database transaction may have committed before connection termination.

---

---

## 4. Comprehensive Staging Acceptance Test Suite (STG-01 to STG-14)

The test suite must be executed against a staging Supabase instance prior to production deployment authorization:

| Test ID | Test Category | Verification Procedure | Expected Outcome | Invariant Validated |
|:---|:---|:---|:---|:---|
| **STG-01** | **Shutdown Release** | Seed event in `FAILED` (`attempt_count = 1`). Worker claims it (`authorized_at = NULL`). Trigger `SIGTERM` before dispatch authorization. | `release_inquiry_outbox_jobs` releases the job to `PENDING` with `attempt_count = 1` preserved. Row is not locked in `PROCESSING`. | Unstarted retry jobs release cleanly on shutdown. |
| **STG-02** | **Shutdown In-Flight** | Worker authorizes Job 1 (`authorized_at` set). Trigger `SIGTERM` while Resend HTTP socket is open. | Database guard `authorized_at IS NULL` blocks releasing Job 1. Job 1 completes and marks `SENT`. Unstarted Jobs 2–5 release to `PENDING`. | In-flight authorized jobs cannot be released during shutdown. |
| **STG-03** | **Payload Conflict** | Mock Resend returning 409 concurrency conflict on call 1, followed by payload conflict on retry. | Worker retry logic captures payload conflict on the final response and immediately quarantines event to `DEAD_LETTER` with `FATAL_RESEND_PAYLOAD_MISMATCH_CONFLICT`. | Payload mismatch cannot bypass quarantine after retry. |
| **STG-04** | **Atomic Sync** | Call `complete_inquiry_outbox_job` for an authorized event. | In a single transaction, `inquiry_outbox.status` becomes `SENT` and `buyer_requirements.email_sent` becomes `TRUE`. | Atomicity across system-of-record and outbox queue. |
| **STG-05** | **Role Permissions** | Attempt to invoke `claim_inquiry_outbox_jobs` via PostgREST using `anon` or `authenticated` JWT. | PostgREST rejects call with HTTP 401/403 Permission Denied. Execution succeeds only with `service_role`. | SECURITY DEFINER privilege isolation. |
| **STG-06** | **Lease Margin** | Mock a claimed event with `lease_expires_at` set to $30\text{s}$ in the future ($< 45\text{s}$ margin). | Worker evaluates `event.lease_expires_at`, skips authorization, breaks batch, and releases unstarted jobs cleanly. | Pre-dispatch lease safety buffer. |
| **STG-07** | **Unauthorized Complete** | Claim a job (`authorized_at IS NULL`). Call `complete_inquiry_outbox_job` directly without calling `authorize_inquiry_outbox_dispatch`. | Predicate `authorized_at IS NOT NULL` fails; update modifies 0 rows; function returns `FALSE`. Job remains in `PROCESSING`. | Claim cannot bypass authorization. |
| **STG-08** | **NULL Notification Type (Ternary Logic Test)** | Start transaction (`BEGIN`). Temporarily drop NOT NULL: `ALTER TABLE public.inquiry_outbox ALTER COLUMN notification_type DROP NOT NULL;`. Insert row with `notification_type = NULL`. Call `authorize_inquiry_outbox_dispatch`. Verify outbox row state before `ROLLBACK`. | Function returns `authorized = FALSE`, `error_code = 'UNSUPPORTED_NOTIFICATION_TYPE'`. Row remains in `PROCESSING` with `attempt_count = 0` and `authorized_at IS NULL`. `ROLLBACK` cleanly restores table schema. | Defends against ternary SQL NULL evaluations; guarantees `IS DISTINCT FROM` rejection without consuming retry budget. |
| **STG-09** | **Missing Buyer Row Rollback (Dynamic Dual-FK Test)** | Dynamically query `inquiry_id` FK from `pg_constraint`. Start transaction (`BEGIN`). Drop ONLY the `inquiry_id` FK. Insert row with valid `reference_id` (satisfying reference_id FK) and unreferenced `inquiry_id` (`gen_random_uuid()`). Call `authorize_inquiry_outbox_dispatch`, then invoke `complete_inquiry_outbox_job`. Terminate with `ROLLBACK`. | Stored procedure encounters 0 matched rows in `buyer_requirements` and executes `RAISE EXCEPTION 'BUYER_REQUIREMENT_SYNC_FAILED'`. PostgreSQL aborts transaction; outbox row is NOT marked `SENT`. `ROLLBACK` cleanly restores FK constraint. | Guarantees atomic cross-table synchronization; prevents orphaned outbox completions via ACID exception abort. |
| **STG-10** | **Marker Cleanup** | Claim event, authorize dispatch, and complete job. | `inquiry_outbox.status` becomes `SENT`, `authorized_at` is cleared to `NULL`, `buyer_requirements.email_sent` becomes `TRUE`. | Clean terminal state. |
| **STG-11** | **Expired Complete** | Claim event and authorize dispatch. Artificially set `lease_expires_at = clock_timestamp() - INTERVAL '1 second'`. Call `complete_inquiry_outbox_job`. | Lease expiration check fails; function returns `FALSE`; outbox is not marked `SENT`. | Stale workers cannot complete jobs after lease expiry. |
| **STG-12** | **Double Authorization** | Claim event and authorize dispatch (`authorized_at` set). Call `authorize_inquiry_outbox_dispatch` a second time on same job. | Predicate `v_job.authorized_at IS NOT NULL` trips; returns `{ authorized: false, error_code: 'ALREADY_AUTHORIZED' }`. `attempt_count` is NOT incremented twice. | Attempt counter increments strictly once per claim. |
| **STG-13** | **Worker ID Mismatch** | Worker A claims event. Worker B calls `complete_inquiry_outbox_job`, `fail_inquiry_outbox_job`, or `quarantine_inquiry_outbox_job`. | All three functions return `FALSE` (0 rows modified). Event state is uncorrupted. | Worker lease isolation boundary. |
| **STG-14** | **Max Attempts Dead-Letter**| Seed event with `attempt_count = 4`. Authorize Attempt 5 (count becomes 5). Call `fail_inquiry_outbox_job`. | Job transitions to `DEAD_LETTER` with `locked_by = NULL`, `lease_expires_at = NULL`, `authorized_at = NULL`. | Attempt budget strictly enforced at 5. |

---

### 4.1 Detailed Staging Verification Procedures for Advanced Schema Tests (STG-08 & STG-09)

> [!WARNING]
> **STAGING ENVIRONMENT RESTRICTION:** The test procedures below execute transactional DDL alterations (`ALTER TABLE ... DROP CONSTRAINT / DROP NOT NULL`) within uncommitted database transactions (`BEGIN ... ROLLBACK`). These tests are designed exclusively for an isolated staging database and must **NEVER** be executed against production.

#### STG-08: Transactionally Valid NULL Notification Type Test
```sql
BEGIN;

-- 1. Temporarily drop NOT NULL constraint within transaction
ALTER TABLE public.inquiry_outbox ALTER COLUMN notification_type DROP NOT NULL;

-- 2. Insert test outbox row with notification_type = NULL under active lease
INSERT INTO public.inquiry_outbox (
  id,
  inquiry_id,
  reference_id,
  notification_type,
  recipient_email,
  status,
  locked_by,
  locked_at,
  lease_expires_at,
  attempt_count,
  authorized_at
) VALUES (
  '88888888-8888-8888-8888-888888888888',
  '00000000-0000-0000-0000-000000000001', -- Existing valid buyer requirement id
  'REQ-202611-0001',                      -- Existing valid reference_id
  NULL,                                   -- Explicitly NULL to test ternary logic
  'trade@shivomglobal.com',
  'PROCESSING',
  'test-worker-stg08',
  pg_catalog.clock_timestamp(),
  pg_catalog.clock_timestamp() + INTERVAL '300 seconds',
  0,
  NULL
);

-- 3. Execute authorize_inquiry_outbox_dispatch
SELECT authorized, error_code, attempt_count
FROM public.authorize_inquiry_outbox_dispatch('88888888-8888-8888-8888-888888888888', 'test-worker-stg08');
-- Expected: authorized = FALSE, error_code = 'UNSUPPORTED_NOTIFICATION_TYPE', attempt_count = 0

-- 4. Verify outbox row state remained unmodified
SELECT status, attempt_count, authorized_at
FROM public.inquiry_outbox
WHERE id = '88888888-8888-8888-8888-888888888888';
-- Expected: status = 'PROCESSING', attempt_count = 0, authorized_at IS NULL

-- 5. Rollback to restore NOT NULL constraint and discard test record
ROLLBACK;
```

---

#### STG-09: Precise Dynamic Dual-FK Missing Buyer Row Rollback
```sql
-- Step 1: Query exact constraint name for inquiry_id from pg_constraint
SELECT c.conname AS inquiry_id_fk_name
FROM pg_catalog.pg_constraint c
JOIN pg_catalog.pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
WHERE c.conrelid = 'public.inquiry_outbox'::regclass
  AND c.contype = 'f'
  AND a.attname = 'inquiry_id';
-- Output: inquiry_outbox_inquiry_id_fkey

-- Step 2: Transactional Test Block
BEGIN;

-- Drop ONLY the dynamically queried inquiry_id FK constraint
ALTER TABLE public.inquiry_outbox DROP CONSTRAINT inquiry_outbox_inquiry_id_fkey;

-- Insert test outbox row:
-- - reference_id matches an existing valid buyer requirement ('REQ-202611-0001') -> satisfies reference_id FK
-- - inquiry_id is an unreferenced UUID -> orphaned from buyer_requirements
INSERT INTO public.inquiry_outbox (
  id,
  inquiry_id,
  reference_id,
  notification_type,
  recipient_email,
  status,
  locked_by,
  locked_at,
  lease_expires_at,
  attempt_count,
  authorized_at
) VALUES (
  '99999999-9999-9999-9999-999999999999',
  gen_random_uuid(),           -- Unreferenced UUID
  'REQ-202611-0001',           -- Valid existing reference_id
  'TRADE_DESK_ALERT',
  'trade@shivomglobal.com',
  'PROCESSING',
  'test-worker-stg09',
  pg_catalog.clock_timestamp(),
  pg_catalog.clock_timestamp() + INTERVAL '300 seconds',
  0,
  NULL
);

-- Authorize dispatch
SELECT authorized, error_code, attempt_count
FROM public.authorize_inquiry_outbox_dispatch('99999999-9999-9999-9999-999999999999', 'test-worker-stg09');
-- Expected: authorized = TRUE, error_code = NULL, attempt_count = 1

-- Attempt atomic completion
SELECT public.complete_inquiry_outbox_job('99999999-9999-9999-9999-999999999999', 'test-worker-stg09');
-- Expected Outcome:
-- Second UPDATE statement matches 0 rows in buyer_requirements.
-- Stored procedure executes: RAISE EXCEPTION 'BUYER_REQUIREMENT_SYNC_FAILED: Expected 1 row for inquiry_id %, found 0'
-- PostgreSQL aborts transaction (SQLSTATE P0001).
-- Pending update marking outbox job as SENT is cleanly aborted.

-- Cleanly discard all test alterations and restore FK constraint
ROLLBACK;
```

---

## 5. Consolidated Review Findings & Corrections Made

1. **Prerequisite DDL Schema Alteration (`authorized_at`):** Verified that `authorized_at` does not exist in `20261104000000_inquiry_reliability_hardening.sql`. Added `ALTER TABLE public.inquiry_outbox ADD COLUMN IF NOT EXISTS authorized_at TIMESTAMPTZ;` as mandatory Step 0 before any function references the column.
2. **Explicit Database RPC Response Parsing Contract (`RpcResult<T>`):** Replaced all fire-and-forget calls and silent `.catch(() => false / [] / '')` fallback patterns across all database RPC interactions with a typed contract `RpcResult<T>`. All RPC invocations enforce HTTP status verification before parsing, wrap JSON parsing in `try/catch` to safely capture non-JSON 502/503 HTML proxy errors as `INVALID_JSON`, validate runtime schema shapes, and categorize failures into typed operational domains (`NETWORK_TIMEOUT`, `HTTP_ERROR`, `INVALID_JSON`, `INVALID_SHAPE`, `BUSINESS_REJECTION`). Mutation calls (`complete`, `fail`, `quarantine`) are governed by a strict non-blind retry policy.
3. **Transactionally Valid Advanced Schema Tests (`STG-08` & `STG-09`):**
   - **STG-08:** Validated PostgreSQL CHECK constraint ternary logic (expressions evaluating to `UNKNOWN` do not reject rows) and implemented a transactionally safe test using `BEGIN; ALTER TABLE ... DROP NOT NULL; INSERT NULL; SELECT authorize...; ROLLBACK;` strictly restricted to isolated staging.
   - **STG-09:** Addressed `inquiry_outbox`'s dual-FK structure (`inquiry_id` and `reference_id` to `buyer_requirements`). Querying `pg_constraint` dynamically to drop ONLY the `inquiry_id` FK within `BEGIN ... ROLLBACK`, while seeding a valid `reference_id` and unreferenced `inquiry_id`, guaranteeing atomic rollback via `BUYER_REQUIREMENT_SYNC_FAILED` without unintended constraint failures.
4. **`claim_inquiry_outbox_jobs` Full SQL Specification & Signature Reconciliation:** Corrected argument types in DDL, grants, and revocations to `(INTEGER, TEXT, INTEGER)` matching the existing migration. Added full SQL text with `authorized_at = NULL` reset and `TRADE_DESK_ALERT` filter.
5. **Double-Authorization Protection (`ALREADY_AUTHORIZED`):** Added Predicate 6 to `authorize_inquiry_outbox_dispatch` checking `authorized_at IS NULL`, preventing duplicate incrementing within the same claim lease.
6. **Completion Authorization Guard:** `complete_inquiry_outbox_job` strictly requires `authorized_at IS NOT NULL`, preventing leaseholders from skipping dispatch authorization. Clears `authorized_at = NULL` upon `SENT`.
7. **Defensive Null-Safety:** Stored procedures use `IS DISTINCT FROM 'TRADE_DESK_ALERT'` rather than `<>` to prevent SQL `NULL` values from bypassing checks.
8. **Atomic Sync with Rollback Guard:** `complete_inquiry_outbox_job` updates `buyer_requirements` within the outbox transaction and raises `BUYER_REQUIREMENT_SYNC_FAILED` if row count $\ne 1$, rolling back all changes.
9. **SECURITY DEFINER Hardening:** All 7 stored procedures execute with `SET search_path = ''` and revoke all permissions from untrusted roles (`PUBLIC`, `anon`, `authenticated`), granting execution strictly to `service_role`.
10. **Database-Issued Pre-Dispatch Lease Margin:** Worker verifies `event.lease_expires_at - Date.now() >= 45,000ms` using database-issued timestamps.
11. **Resend Error Classification:** Bounded 409 concurrency retries (1.5s, 3.0s) re-evaluate for payload mismatch conflicts on the final response, guaranteeing quarantine of invalid payloads.

---

## 6. Remaining Known Limitations

1. **Provider 24-Hour Deduplication Window:** Resend guarantees key deduplication for 24 hours. Under standard backoff ($4\text{m} + 8\text{m} + 16\text{m} + 32\text{m} = 60\text{m}$), all retries occur within ~62.5 minutes. If a prolonged infrastructure outage exceeds 24 hours, a replay of an in-flight dispatch may result in a duplicate email delivery under at-least-once semantics.
2. **Crash Between Authorization and Provider Invocation:** Because no two-phase commit spans PostgreSQL and Resend, a fatal process crash (e.g. host kernel panic or immediate SIGKILL) between authorization and HTTP socket creation will consume one authorization attempt without sending an email. The system authorizes at most 5 attempts.

---

## 7. Migration Prerequisites & Production Deployment Blockers

```
================================================================================
FINAL READINESS VERDICT: DOCUMENTATION READY FOR STAGING
================================================================================
```

### Pre-Deployment Blocker Checklist
- [ ] **Blocker 1: Author Migration File:** Create `supabase/migrations/20261105000001_inquiry_outbox_atomic_ownership.sql` matching Section 3 verbatim (with `ALTER TABLE` prerequisite first).
- [ ] **Blocker 2: Apply to Staging Database:** Execute migration against non-production Supabase instance.
- [ ] **Blocker 3: Execute Staging Test Suite:** Run and pass all tests `STG-01` through `STG-14` in staging.
- [ ] **Blocker 4: Worker Code Creation:** Author `worker/index.ts`, `tsconfig.worker.json`, and `render.yaml` in codebase matching blueprint.
- [ ] **Blocker 5: Production Approval:** Apply migration to production Supabase and provision Render Background Worker.
