# SHIVOM GLOBAL — Render Background Worker Migration Specification

**Document Version:** 2.6.0 (Final Reliability Hardening & Pre-Staging Verification)  
**Date:** November 5, 2026  
**Status:** Architecture Specification (Pre-Staging Approved)  
**Author:** Senior PostgreSQL Reliability Engineer, Backend Architect & Security Auditor  
**Target Subsystems:**
- `worker/index.ts` (Dedicated Node.js Persistent Daemon)
- `tsconfig.worker.json` (Dedicated TypeScript Compiler Configuration)
- `render.yaml` (Render Infrastructure as Code Configuration)
- `api/buyer-requirements.ts` (Existing Primary Buyer Intake Endpoint on Vercel)
- `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Existing Schema & RPC)
- `supabase/migrations/20261105000001_inquiry_outbox_atomic_ownership.sql` (Required Prerequisite Migration)

---

## 1. Document Change Log

| Version | Change ID | Focus Area | Detailed Resolution |
|:---:|:---|:---|:---|
| **v2.6.0** | **SPEC-30** | **Double-Authorization Invariant (`ALREADY_AUTHORIZED`)** | Added Predicate 6 to `authorize_inquiry_outbox_dispatch` checking `v_job.authorized_at IS NOT NULL`. Rejects duplicate authorization calls within the same claim lease with error code `ALREADY_AUTHORIZED`, mathematically guaranteeing `attempt_count` can never be incremented twice for the same claim. |
| **v2.6.0** | **SPEC-31** | **Signature Reconciliation on `claim_inquiry_outbox_jobs`** | Corrected argument type order in SQL DDL, grants, and revocations to `(INTEGER, TEXT, INTEGER)` (`p_batch_size`, `p_worker_id`, `p_lease_seconds`) matching the existing PostgreSQL function signature in `20261104000000_inquiry_reliability_hardening.sql`. |
| **v2.6.0** | **SPEC-32** | **Prerequisite DDL Schema Alteration (`authorized_at`)** | Verified `authorized_at` does not exist in `20261104000000_inquiry_reliability_hardening.sql`. Added `ALTER TABLE public.inquiry_outbox ADD COLUMN IF NOT EXISTS authorized_at TIMESTAMPTZ;` as mandatory Step 0 executing prior to stored procedure compilation. |
| **v2.6.0** | **SPEC-33** | **Awaited Maintenance & Database RPC Error Handling** | Replaced fire-and-forget maintenance RPC call with an awaited fetch, bounded `AbortSignal.timeout(DB_TIMEOUT_MS)`, HTTP status validation, and structured error logging across `release_inquiry_outbox_jobs`, `quarantine_inquiry_outbox_job`, and `fail_inquiry_outbox_job`. |
| **v2.6.0** | **SPEC-34** | **Transactional DDL STG-09 Test Setup & Suite (`STG-01` to `STG-14`)** | Rewrote `STG-09` using a technically valid PostgreSQL transactional DDL setup (`BEGIN; ALTER TABLE ... DROP CONSTRAINT ...; INSERT orphan; SELECT complete_inquiry_outbox_job(...); ROLLBACK;`). Replaced invalid session-level foreign key disabling claims. |
| **v2.6.0** | **SPEC-35** | **STG-08 Transactionally Valid NULL Notification Type Test** | Replaced invalid "bypassing DDL" test with a transactionally valid test using `BEGIN; ALTER TABLE public.inquiry_outbox ALTER COLUMN notification_type DROP NOT NULL; INSERT ...; SELECT authorize_inquiry_outbox_dispatch(...); ROLLBACK;`. Explained PostgreSQL CHECK constraint ternary logic (evaluating to UNKNOWN does not reject rows) and designated test strictly for isolated staging. |
| **v2.6.0** | **SPEC-36** | **STG-09 Precise Dynamic Dual-FK Rollback Test** | Resolved foreign key handling by dynamically querying `inquiry_id` FK from `pg_constraint`, dropping only the `inquiry_id` FK within `BEGIN`, providing a valid `reference_id` to satisfy the separate `reference_id` FK constraint, and asserting `BUYER_REQUIREMENT_SYNC_FAILED` transaction abort before `ROLLBACK`. |
| **v2.6.0** | **SPEC-37** | **Explicit Worker Response Parsing Contract (`RpcResult<T>`)** | Replaced all `.catch(() => false)`, `.catch(() => [])`, and `.catch(() => '')` fallback patterns with typed `RpcResult<T>` and `invokePostgrestRpc<T>`. Enforced HTTP status check, try/catch JSON parsing, explicit non-JSON/502/503 HTML error capture as `INVALID_JSON`, schema validation, and structured error categorization preventing misclassification of infrastructure faults as business rejections. |
| **v2.5.0** | **SPEC-26–29** | **Completion Authorization & Sync Verification** | Added `authorized_at IS NOT NULL` guard on completion, cleared `authorized_at = NULL` upon `SENT`, null-safe `IS DISTINCT FROM`, and exception rollback on `buyer_requirements` sync failure. |
| **v2.4.0** | **SPEC-18–25** | **Lifecycle Hardening & RPC Alignment** | Reset `authorized_at = NULL` on claim/fail, reconciled 6 authorization error codes, database-issued lease margin check, post-retry payload conflict quarantine, initial atomic sync, and SECURITY DEFINER role restrictions. |
| **v2.3.0** | **SPEC-12–17** | **Shutdown Release & Quarantine Baseline** | Introduced `authorized_at` column, expanded lease to 300s, and defined baseline synthetic staging tests. |
| **v2.2.0** | **SPEC-07–11** | **Authorized Dispatch Semantics** | Formally defined `attempt_count` as authorized dispatches, discriminated Resend 409 responses, and disentangled timing domains. |
| **v2.1.0** | **SPEC-01–06** | **Core Reliability Baseline** | Real-time `clock_timestamp()` lease checks, initial quarantine strategy, Resend 24h key retention window, and exact 60,999 ms backoff bounds. |

---

## 2. Executive Summary & Architecture Goal

The objective of this specification is to establish a **continuous, near-real-time ($\le 60\text{ seconds}$) email notification recovery worker** for commercial buyer inquiries by migrating background retries from Vercel Cron to a dedicated **Render Background Worker**.

### The Core Problem
Under Vercel's Hobby plan, scheduled cron jobs are restricted to at most once per day (`0 0 * * *`). Configuring `schedule: "*/10 * * * *"` in `vercel.json` triggers deployment failure during platform manifest parsing. However, reducing retries to once per 24 hours creates unacceptable commercial friction (up to 24-hour delays in notifying the trade desk of wholesale inquiries) and risks multi-day queue starvation during transit network anomalies.

### Recommended Strategy: Decoupled Hybrid (Option A)
- **Vercel:** Hosts the React/Vite single-page application and the high-performance serverless intake API (`/api/buyer-requirements.ts`), executing immediate synchronous Resend dispatches.
- **Render:** Hosts a persistent Node.js daemon as a **Background Worker** (Starter tier, $7/month in Singapore), executing adaptive polling (5s active / 30s idle) to recover failed or pending inquiry dispatches.
- **Supabase (ap-south-1 Mumbai):** Serves as the authoritative system of record (`public.buyer_requirements`) and transactional outbox queue (`public.inquiry_outbox`), managing row locking via `FOR UPDATE SKIP LOCKED`.

```
+---------------------------------------------------------------------------------------------------------+
|                                    RECOMMENDED HYBRID ARCHITECTURE                                      |
|                                                                                                         |
|  [ VERCEL (Zero Cost / Fast Edge CDN) ]              [ RENDER ($7/mo Starter Worker) ]                  |
|  - React + Vite Single-Page Application              - Standalone Node.js Daemon (worker/index.ts)      |
|  - Serverless API: /api/buyer-requirements           - Continuous Adaptive Polling (5s active / 30s)    |
|  - Fast Synchronous Resend Email Dispatch            - Single Authoritative Attempt Increment (1 to 5)  |
|  - "crons" block REMOVED from vercel.json            - Provider Idempotency Key (sg-outbox-${event.id}) |
|                                                      - Atomic Database-Side Ownership Verification      |
|                                                      - 550ms Resend Rate-Limit Pacing                   |
|                                                               │                                         |
|                                                               ▼                                         |
|                                              [ SUPABASE POSTGRESQL & RPC ]                              |
|                                              - Table: buyer_requirements (System of Record)             |
|                                              - Table: inquiry_outbox (State Machine)                    |
|                                              - RPC: claim_inquiry_outbox_jobs() (Resets authorized_at)  |
|                                              - RPC: authorize_inquiry_outbox_dispatch() (7 Predicates)  |
|                                              - RPC: complete_inquiry_outbox_job() (Guards Auth, Rollback)|
|                                              - RPC: fail_inquiry_outbox_job() (Resets authorized_at)    |
|                                              - RPC: release_inquiry_outbox_jobs() (Guards authorized_at)|
|                                              - RPC: quarantine_inquiry_outbox_job() (Active Lease Check)|
|                                              - RPC: cleanup_unsupported_inquiry_outbox_jobs() (Maint.)  |
+---------------------------------------------------------------------------------------------------------+
```

---

## 3. Verified Current Architecture & State Machine

### 3.1 Database State Machine
In `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql`, the notification outbox lifecycle is modeled as:

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
                  │ (o.attempt_count < max_attempts, authorized_at IS NULL, attempt_count = attempt_count + 1)
                  ▼
            [ AUTHORIZED ] ───► Resend API Call (with Idempotency-Key: sg-outbox-${id})
             /     |    \
            /      |     \
  Resend OK /      |      \ Resend Error (4xx, 5xx, or network failure)
          ▼        |       ▼
       [ SENT ]    |   [ FAILED ] (attempt_count < 5, authorized_at = NULL, backoff delay scheduled)
  (Guards Auth,    |       │
   clears marker,  |       │ Next claim cycle when next_retry_at <= clock_timestamp()
   atomic sync)    |       ▼
                   |   [ PROCESSING ] (Claim resets authorized_at = NULL)
                   |       │
                   | (Attempt 5 Fails)
                   |       ▼
                   └──►[ DEAD_LETTER ] (attempt_count >= 5, or Quarantined Unsupported Type)
```

### 3.2 Table Definition & Indexes
- **Primary Table:** `public.inquiry_outbox`
  - `id`: UUID (Primary Key, default `gen_random_uuid()`).
  - `inquiry_id`: UUID NOT NULL (Foreign key to `public.buyer_requirements.id` ON DELETE CASCADE).
  - `reference_id`: TEXT NOT NULL (Foreign key to `public.buyer_requirements.reference_id` ON DELETE CASCADE).
  - `notification_type`: TEXT NOT NULL (`CHECK (notification_type IN ('TRADE_DESK_ALERT', 'BUYER_ACKNOWLEDGMENT'))`).
  - `recipient_email`: TEXT NOT NULL.
  - `recipient_name`: TEXT.
  - `status`: TEXT NOT NULL DEFAULT 'PENDING' (`CHECK (status IN ('PENDING', 'PROCESSING', 'SENT', 'FAILED', 'DEAD_LETTER'))`).
  - `payload`: JSONB NOT NULL DEFAULT '{}'::jsonb.
  - `attempt_count`: INTEGER NOT NULL DEFAULT 0.
  - `max_attempts`: INTEGER NOT NULL DEFAULT 5.
  - `next_retry_at`: TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()).
  - `locked_at`, `locked_by`, `lease_expires_at`: Concurrency control lease fields.
  - `authorized_at`: TIMESTAMPTZ (Per-claim authorization marker; added via prerequisite DDL migration).
  - `sent_at`, `created_at`, `updated_at`: Audit timestamps.
  - `uq_inquiry_outbox_event`: UNIQUE `(inquiry_id, notification_type)`.
- **Performance Indexes:**
  - `idx_inquiry_outbox_polling`: `(next_retry_at ASC, status) WHERE status IN ('PENDING', 'FAILED')`.
  - `idx_inquiry_outbox_lease_recovery`: `(lease_expires_at ASC) WHERE status = 'PROCESSING'`.
  - `idx_inquiry_outbox_failed`: `(created_at DESC) WHERE status IN ('FAILED', 'DEAD_LETTER')`.

---

## 4. Critical Reliability Corrections & Concrete Designs

### 4.1 Attempt Count Semantics & Dispatch Authorization Model

#### The Preferred Model: Authorized Dispatch Counting
```
An attempt count represents an AUTHORIZED EMAIL DISPATCH ATTEMPT.
Claiming a batch or releasing unstarted jobs must never consume retry attempts.
```

1. **The Architectural Reality:**  
   Because there is no atomic distributed transaction spanning PostgreSQL and Resend, **the system cannot guarantee that exactly five actual HTTP dispatches will reach Resend across arbitrary crashes, host terminations, or network partitions.**
2. **The Crash Sequence Accounted For:**
   - Worker authorizes dispatch in PostgreSQL. Database increments `attempt_count` from 0 to 1 and records `authorized_at`.
   - Worker host suffers an immediate SIGKILL, fatal crash, or host termination before opening the HTTP socket to Resend.
   - The outbox row remains in `status = 'PROCESSING'` until `lease_expires_at` (300s).
   - The next worker reclaims the row. The claim resets `authorized_at = NULL`. The subsequent authorization increments `attempt_count` from 1 to 2.
   - **Result:** Zero email requests reached Resend, but one authorization attempt was consumed.
3. **The System Guarantee:**  
   The database authorizes **at most five dispatch attempts** (`max_attempts = 5`). In normal un-crashed execution, exactly five provider invocations occur before dead-lettering. Across arbitrary crash scenarios, fewer than five actual HTTP transmissions may reach Resend before the authorization budget of five is exhausted. This is mandatory for poison payload protection: a malformed payload that triggers fatal process terminations cannot crash workers in an infinite loop.
4. **Successful First Dispatch:**  
   A job that succeeds on its first attempt records `attempt_count = 1`, `status = 'SENT'`, clears `authorized_at = NULL`, and atomically updates `buyer_requirements.email_sent = TRUE`.
5. **Failed Fifth Dispatch:**  
   On Attempt 5, the dispatch is authorized (`attempt_count = 5`). If it fails, `fail_inquiry_outbox_job` marks `status = 'DEAD_LETTER'` and resets `authorized_at = NULL`.
6. **Per-Claim Lifecycle of `authorized_at`:**  
   - `claim_inquiry_outbox_jobs`: Sets `authorized_at = NULL` upon claim acquisition, whether from `PENDING` or retried from `FAILED`.
   - `authorize_inquiry_outbox_dispatch`: Enforces `authorized_at IS NULL` (rejecting repeat calls with `ALREADY_AUTHORIZED`), sets `authorized_at = pg_catalog.clock_timestamp()`, and increments `attempt_count`.
   - `complete_inquiry_outbox_job`: Strictly requires `authorized_at IS NOT NULL` before marking `SENT`, and clears `authorized_at = NULL` upon success.
   - `fail_inquiry_outbox_job`: Resets `authorized_at = NULL` upon failure.
   - `release_inquiry_outbox_jobs`: Enforces `WHERE authorized_at IS NULL`.
7. **24-Hour Idempotency Boundary & At-Least-Once Delivery SLA:**  
   - Resend guarantees idempotency key caching for **24 hours**.
   - Under standard backoff ($4\text{m} + 8\text{m} + 16\text{m} + 32\text{m} = 60\text{ minutes}$ nominal), all attempts execute within ~62.5 minutes, well within the 24-hour cache window.
   - If a catastrophic infrastructure disruption halts worker execution for $> 24$ hours, or if an in-flight dispatch reached Resend but the worker crashed before recording completion, a recovery attempt occurring after $> 24$ hours will be treated by Resend as a new request, resulting in a duplicate email delivery.
   - The system guarantees **at-least-once delivery with a 24-hour deduplication window**, not perpetual exactly-once delivery across arbitrary multi-day outages.

#### Exact Authorized Dispatch Lifecycle

| Lifecycle Stage | Initial Count | Claim Action | Authorization Action | Dispatch Action | DB Result on Failure | Maximum Authorizations Granted |
|:---:|:---:|:---|:---|:---|:---|:---:|
| **Attempt 1** | 0 | Locks row (count = 0, `authorized_at = NULL`) | Increments count = 1, sets `authorized_at` | Dispatch #1 sent | Sets `FAILED`, `authorized_at = NULL` | 1 |
| **Attempt 2** | 1 | Locks row (count = 1, `authorized_at = NULL`) | Increments count = 2, sets `authorized_at` | Dispatch #2 sent | Sets `FAILED`, `authorized_at = NULL` | 2 |
| **Attempt 3** | 2 | Locks row (count = 2, `authorized_at = NULL`) | Increments count = 3, sets `authorized_at` | Dispatch #3 sent | Sets `FAILED`, `authorized_at = NULL` | 3 |
| **Attempt 4** | 3 | Locks row (count = 3, `authorized_at = NULL`) | Increments count = 4, sets `authorized_at` | Dispatch #4 sent | Sets `FAILED`, `authorized_at = NULL` | 4 |
| **Attempt 5** | 4 | Locks row (count = 4, `authorized_at = NULL`) | **Increments count = 5, sets `authorized_at`** | **Dispatch #5 sent** | **Sets `DEAD_LETTER`** | **5** |

---

### 4.2 Authoritative Database Stored Procedures & Security Grants

All lease ownership verifications and state transitions occur in **atomic database transactions** using `clock_timestamp()` and `SET search_path = ''`:

```sql
-- ============================================================================
-- 0. PREREQUISITE DDL: SCHEMA ALTERATION
-- ============================================================================
-- Mandatory prerequisite: authorized_at does NOT exist in 20261104000000_inquiry_reliability_hardening.sql.
-- This ALTER TABLE statement MUST execute first before any stored procedures referencing authorized_at are compiled.
ALTER TABLE public.inquiry_outbox 
  ADD COLUMN IF NOT EXISTS authorized_at TIMESTAMPTZ;

COMMENT ON COLUMN public.inquiry_outbox.authorized_at IS 
  'Ephemeral timestamp recording when a worker received database authorization to dispatch. Strictly NULL when unstarted; cleared upon completion, failure, or claim.';

-- ============================================================================
-- 1. CLAIM INQUIRY OUTBOX JOBS (BATCH CLAIM, RESETS AUTHORIZED_AT)
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
-- 2. AUTHORIZE INQUIRY OUTBOX DISPATCH (7 PREDICATES, NULL-SAFE, ATOMIC)
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
-- 4. FAIL INQUIRY OUTBOX JOB (RESETS AUTHORIZED_AT, ATTEMPTS GUARDED)
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
-- 5. RELEASE INQUIRY OUTBOX JOBS (SHUTDOWN GUARD: authorized_at IS NULL)
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

### 4.3 Comprehensive Unsupported-Event Migration Coverage

#### Multi-State Migration Quarantine (Prerequisite Migration)
The upcoming database migration `20261105000001_inquiry_outbox_atomic_ownership.sql` cleans up all non-terminal states where no active lease exists:

```sql
-- 1. Quarantine existing unsupported events in PENDING and FAILED
UPDATE public.inquiry_outbox
SET status = 'DEAD_LETTER',
    last_error = 'QUARANTINED_UNSUPPORTED_TYPE: ' || notification_type || ' (Phase 4B feature inactive)',
    locked_at = NULL,
    locked_by = NULL,
    lease_expires_at = NULL,
    authorized_at = NULL,
    updated_at = pg_catalog.clock_timestamp()
WHERE notification_type != 'TRADE_DESK_ALERT'
  AND status IN ('PENDING', 'FAILED');

-- 2. Quarantine existing unsupported events in PROCESSING with expired leases (<= clock_timestamp)
UPDATE public.inquiry_outbox
SET status = 'DEAD_LETTER',
    last_error = 'QUARANTINED_UNSUPPORTED_TYPE: ' || notification_type || ' (Phase 4B feature inactive)',
    locked_at = NULL,
    locked_by = NULL,
    lease_expires_at = NULL,
    authorized_at = NULL,
    updated_at = pg_catalog.clock_timestamp()
WHERE notification_type != 'TRADE_DESK_ALERT'
  AND status = 'PROCESSING'
  AND lease_expires_at <= pg_catalog.clock_timestamp();
```

* **Handling Active In-Flight Leases (`lease_expires_at > clock_timestamp()`):**  
  Active leases are untouched during migration to prevent corrupting in-flight operations. Once their lease expires, `cleanup_unsupported_inquiry_outbox_jobs` reclaims and quarantines them.
* **Future Ingestion Prevention:**
  1. The database trigger `trg_enqueue_inquiry_outbox()` hardcodes `notification_type = 'TRADE_DESK_ALERT'`.
  2. The worker claim RPC `claim_inquiry_outbox_jobs` filters `AND notification_type = 'TRADE_DESK_ALERT'`.

---

### 4.4 Resend Concurrency, Error Code 409 & Payload Stability

#### Idempotency Key Specification
- **Key Derivation:** `const idempotencyKey = sg-outbox-${event.id};` (prefixed alphanumeric ASCII string, length: 46 characters, not a UUID v4).
- **Payload Immutability Requirement:** Email subject, text, and HTML constructed strictly from immutable `event.payload` (never dynamic dates or nonces).
- **Resend 409 Conflict Disambiguation:**

| Resend Response Condition | Error Classification | Root Cause | Worker Action & Policy |
|:---|:---:|:---|:---|
| **`concurrent_idempotent_requests`** | **Transient Concurrency** | Another HTTP connection with the same `Idempotency-Key` is currently being processed on Resend's edge. | **Bounded Retry:** Sleep 1,500ms (attempt 1) and 3,000ms (attempt 2). Maximum 2 retries (total $\sim 4.5\text{s}$). Re-evaluate response for payload conflicts after retries. |
| **`idempotency_key_already_used_with_different_payload`** | **Permanent Data Conflict** | The same idempotency key was previously submitted with a different body payload. | **Permanent Fatal Error:** Do NOT retry. Immediately invoke `quarantine_inquiry_outbox_job` to set `status = 'DEAD_LETTER'` with `FATAL_RESEND_PAYLOAD_MISMATCH_CONFLICT`. |

---

### 4.5 Orthogonal Timing Domains & Lease Budget Verification

#### Timing Domains Disentangled

| Timing Domain | Governed By | Progression Sequence | Operational Purpose |
|:---|:---|:---|:---|
| **1. Email Retry Delay** | Outbox Worker Business Logic | $4\text{m} \to 8\text{m} \to 16\text{m} \to 32\text{m}$ (Sum = 60m) | Delays re-eligibility of failed jobs in Supabase (`next_retry_at`). |
| **2. Database Reconnect Backoff** | Worker Daemon Network Layer | $2\text{s} \to 4\text{s} \to 8\text{s} \to 16\text{s} \to 32\text{s} \to 60,999\text{ms}$ | Protects Supabase from tight reconnect loops during DB disruptions. |
| **3. Queue Polling Interval** | Worker Daemon Main Loop | 30s (idle) / 5s (active drain) | Controls query frequency when the daemon is connected and healthy. |

#### Lease Budget Verification (300 Seconds)
- **Worst-Case Single Item Duration:**
  $$\text{Authorize (6s)} + \text{Resend Initial (4s)} + \text{Resend 409 Retries (12.5s)} + \text{Resolution RPC (6s)} + \text{Network Latency (6s)} = \mathbf{34.5\text{ seconds}}$$
- **Worst-Case 5-Item Batch:**
  $$5 \times 34.5\text{s} = \mathbf{172.5\text{ seconds}}$$
- **Lease Specification:** `LEASE_DURATION_SECONDS = 300` (5 minutes).
  - Safety Buffer: $300\text{s} - 172.5\text{s} = \mathbf{127.5\text{ seconds}}$ (74% margin).
  - **Database-Issued Pre-Dispatch Lease Margin Check:** Before calling `authorize_inquiry_outbox_dispatch`, the worker evaluates `event.lease_expires_at` issued directly by Supabase. If $event.lease\_expires\_at - \text{Date.now}() < 45,000\text{ms}$, the worker breaks the loop and releases remaining unstarted jobs cleanly.

---

### 4.6 Reconciled Database Reconnect Backoff Formula

$$T_{\text{sleep}} = \min(60000, 2^{\text{consecutiveErrors}} \times 1000) + \text{floor}(\text{random}() \times 1000)\text{ ms}$$

| Error Event | `consecutiveErrors` | Base Delay ($2^n \times 1000$) | Jitter Range | Total Sleep Range |
|:---:|:---:|:---:|:---:|:---:|
| **1st Failure** | 1 | $2^1 \times 1000 = 2,000\text{ms}$ | 0 – 999ms | **2,000 – 2,999ms** (~2s) |
| **2nd Failure** | 2 | $2^2 \times 1000 = 4,000\text{ms}$ | 0 – 999ms | **4,000 – 4,999ms** (~4s) |
| **3rd Failure** | 3 | $2^3 \times 1000 = 8,000\text{ms}$ | 0 – 999ms | **8,000 – 8,999ms** (~8s) |
| **4th Failure** | 4 | $2^4 \times 1000 = 16,000\text{ms}$ | 0 – 999ms | **16,000 – 16,999ms** (~16s) |
| **5th Failure** | 5 | $2^5 \times 1000 = 32,000\text{ms}$ | 0 – 999ms | **32,000 – 32,999ms** (~32s) |
| **6th+ Failure**| $\ge 6$ | $\min(60000, 64000) = 60,000\text{ms}$ | 0 – 999ms | **60,000 – 60,999ms** (~61s) |

- **Maximum Delay Ceiling:** Guaranteed strictly $\le \mathbf{60,999\text{ ms}}$ (approximately 61 seconds).
- **Reset & Auth Failure:** Reset to 0 on HTTP 200. HTTP 401/403 triggers a fixed 300,000 ms (5 minutes) pause.

---

### 4.7 Explicit Typed Database RPC Response Parsing Contract

To prevent silent error suppression and guarantee that database disruptions (such as 502/503 Bad Gateway from reverse proxies, timeouts, or network resets) are never misclassified as business-logic outcomes (such as empty queues or expired leases), all database RPC interactions in the worker daemon must adhere to an explicit typed parsing contract:

#### 1. Typed Result Contract (`RpcResult<T>`)
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

#### 2. Strict Execution Order & Parsing Validation
1. **HTTP Status Verification:** Check `response.ok` before attempting any JSON parsing. Non-2xx HTTP responses must extract the raw text body safely and be categorized as `HTTP_ERROR` with the HTTP status code.
2. **Safe JSON Parsing:** Wrapping all body extraction in `try/catch`. If an upstream reverse proxy returns an HTML error page (e.g. Cloudflare / Kong 502 Bad Gateway), the syntax error is caught and categorized as `INVALID_JSON` along with a bounded snippet ($\le 300\text{ characters}$) of the raw body.
3. **Shape & Schema Verification:** The parsed payload is validated using a runtime type guard. Non-matching shapes (e.g. empty strings, null, or missing fields) are categorized as `INVALID_SHAPE` and never coerced to fallback defaults like `[]` or `false`.
4. **Categorized Worker Behavior & Error Policy:**
   - `NETWORK_TIMEOUT` / `HTTP_ERROR` (5xx): Considered transient infrastructure disruptions. The worker increments consecutive failure counters and applies jittered exponential backoff ($\le 60,999\text{ms}$).
   - `INVALID_JSON` / `INVALID_SHAPE`: Considered fatal protocol or deployment anomalies. The worker emits a structured `CRITICAL` log and pauses or backs off without blind state manipulation.
   - `BUSINESS_REJECTION`: Normal domain state transitions (e.g. `complete_inquiry_outbox_job` returning `false` due to lease expiration, or `authorize_inquiry_outbox_dispatch` returning `authorized: false` with error codes). Handled cleanly through normal workflow branches.
5. **Mutation Retry Policy:**
   - **Never Blindly Retry State Mutations:** If a network timeout or HTTP 5xx occurs during `complete_inquiry_outbox_job` or `fail_inquiry_outbox_job`, the worker must NOT retry the mutation blindly in a loop. Because the database operation may have succeeded before network socket termination, blind retries risk racing against lease expirations or consuming extra attempt counts. The in-flight reference is cleared, and the job is left to either naturally expire its lease for safe redelivery or be re-arbitrated during the next cycle under idempotent protection.

---

## 5. Standalone Worker Implementation Blueprint (`worker/index.ts`)

```typescript
interface OutboxEvent {
  id: string;
  inquiry_id: string;
  reference_id: string;
  notification_type: 'TRADE_DESK_ALERT' | 'BUYER_ACKNOWLEDGMENT';
  recipient_email: string;
  recipient_name?: string;
  payload: Record<string, unknown>;
  status: 'PENDING' | 'PROCESSING' | 'SENT' | 'FAILED' | 'DEAD_LETTER';
  attempt_count: number;
  max_attempts: number;
  next_retry_at: string;
  last_error?: string;
  locked_by?: string;
  lease_expires_at?: string;
  authorized_at?: string;
}

// Bounded Timing Constants
const BATCH_SIZE = 5;
const LEASE_DURATION_SECONDS = 300; // 5-minute lease (127.5s buffer over worst-case 172.5s batch)
const PRE_DISPATCH_MIN_LEASE_MS = 45000; // 45s margin check
const EMAIL_TIMEOUT_MS = 4000;
const DB_TIMEOUT_MS = 6000;
const IDLE_POLL_INTERVAL_MS = 30000;  // 30s when queue is empty
const ACTIVE_POLL_INTERVAL_MS = 5000;  // 5s when jobs are active
const RESEND_PACING_DELAY_MS = 550;   // Safe pacing (~1.8 req/sec)

// State Tracking Variables
let isShuttingDown = false;
let currentAuthorizedInFlightId: string | null = null;
const unauthorizedJobIds = new Set<string>();

let consecutiveErrors = 0;
let lastMaintenanceCheck = 0;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function calculateBackoffMinutes(attemptCount: number): number {
  return Math.min(120, Math.pow(2, Math.max(1, attemptCount)) * 2);
}

function getJitteredBackoffMs(errors: number): number {
  const base = Math.min(60000, Math.pow(2, Math.max(1, errors)) * 1000);
  const jitter = Math.floor(Math.random() * 1000);
  return base + jitter; // Strictly <= 60,999ms (~61 seconds)
}

function setupSignalHandlers(workerId: string) {
  const onSignal = (signal: string) => {
    console.log(JSON.stringify({
      level: 'INFO',
      timestamp: new Date().toISOString(),
      workerId,
      message: `Received ${signal}. Initiating graceful shutdown sequence.`,
    }));
    isShuttingDown = true;
  };
  process.on('SIGTERM', () => onSignal('SIGTERM'));
  process.on('SIGINT', () => onSignal('SIGINT'));
}

// Typed Database RPC Parsing Contract & Error Hierarchy
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

/**
 * Executes a typed PostgREST RPC call with strict HTTP status validation,
 * bounded timeout, safe JSON parsing, and shape verification.
 * Replaces all silent fallback patterns (.catch(() => false / [] / '')) with typed errors.
 */
async function invokePostgrestRpc<T>(
  rpcUrl: string,
  serviceKey: string,
  bodyPayload: Record<string, unknown>,
  timeoutMs: number,
  validateShape: (data: unknown) => data is T,
  rpcName: string
): Promise<RpcResult<T>> {
  let response: Response;
  try {
    response = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError');
    return {
      ok: false,
      error: {
        kind: isTimeout ? 'NETWORK_TIMEOUT' : 'HTTP_ERROR',
        message: `Network failure calling ${rpcName}: ${err instanceof Error ? err.message : String(err)}`,
      },
    };
  }

  // 1. Check response.ok before attempting to parse JSON
  if (!response.ok) {
    let rawText = '';
    try {
      rawText = await response.text();
    } catch {
      rawText = '<unreadable body>';
    }
    return {
      ok: false,
      error: {
        kind: 'HTTP_ERROR',
        status: response.status,
        message: `RPC ${rpcName} returned HTTP ${response.status}: ${rawText.slice(0, 300)}`,
        raw: rawText.slice(0, 300),
      },
    };
  }

  // 2. Safe JSON Parsing in try/catch (captures 502/503 HTML error pages from proxies)
  let rawBody = '';
  let parsedJson: unknown;
  try {
    rawBody = await response.text();
    parsedJson = JSON.parse(rawBody);
  } catch (parseErr: unknown) {
    return {
      ok: false,
      error: {
        kind: 'INVALID_JSON',
        status: response.status,
        message: `RPC ${rpcName} returned non-JSON body: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`,
        raw: rawBody.slice(0, 300),
      },
    };
  }

  // 3. Schema & Shape Validation
  if (!validateShape(parsedJson)) {
    return {
      ok: false,
      error: {
        kind: 'INVALID_SHAPE',
        status: response.status,
        message: `RPC ${rpcName} response failed schema validation.`,
        raw: rawBody.slice(0, 300),
      },
    };
  }

  return { ok: true, data: parsedJson };
}

async function releaseUnstartedJobs(
  jobIds: string[],
  workerId: string,
  supabaseUrl: string,
  supabaseServiceKey: string
): Promise<void> {
  if (jobIds.length === 0) return;
  const endpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/rpc/release_inquiry_outbox_jobs`;
  const result = await invokePostgrestRpc<number>(
    endpoint,
    supabaseServiceKey,
    { p_event_ids: jobIds, p_worker_id: workerId },
    3000,
    (d): d is number => typeof d === 'number',
    'release_inquiry_outbox_jobs'
  );

  if (!result.ok) {
    console.error(JSON.stringify({
      level: 'ERROR',
      timestamp: new Date().toISOString(),
      workerId,
      message: `release_inquiry_outbox_jobs failed: [${result.error.kind}] ${result.error.message}`,
      status: result.error.status,
      raw: result.error.raw,
    }));
  } else {
    console.log(JSON.stringify({
      level: 'INFO',
      timestamp: new Date().toISOString(),
      workerId,
      message: `release_inquiry_outbox_jobs successfully released ${result.data} unstarted job(s) back to PENDING.`,
    }));
  }
}

async function quarantineJob(
  eventId: string,
  workerId: string,
  reason: string,
  supabaseUrl: string,
  supabaseServiceKey: string
): Promise<boolean> {
  const endpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/rpc/quarantine_inquiry_outbox_job`;
  const result = await invokePostgrestRpc<boolean>(
    endpoint,
    supabaseServiceKey,
    { p_event_id: eventId, p_worker_id: workerId, p_reason: reason },
    DB_TIMEOUT_MS,
    (d): d is boolean => typeof d === 'boolean',
    'quarantine_inquiry_outbox_job'
  );

  if (!result.ok) {
    console.error(JSON.stringify({
      level: 'ERROR',
      timestamp: new Date().toISOString(),
      workerId,
      eventId,
      message: `quarantine_inquiry_outbox_job failed: [${result.error.kind}] ${result.error.message}`,
      status: result.error.status,
      raw: result.error.raw,
    }));
    return false;
  }

  if (!result.data) {
    console.warn(JSON.stringify({
      level: 'WARN',
      timestamp: new Date().toISOString(),
      workerId,
      eventId,
      message: 'quarantine_inquiry_outbox_job returned false (lease expired or worker ownership lost).',
    }));
  }
  return result.data;
}

async function dispatchTradeDeskAlert(
  event: OutboxEvent,
  apiKey: string,
  emailTo: string,
  emailFrom: string
): Promise<{ success: boolean; error?: string; messageId?: string; isConcurrentConflict?: boolean; isPayloadConflict?: boolean }> {
  const p = event.payload || {};
  const referenceId = String(p.reference_id || event.reference_id);
  const subject = `[SHIVOM GLOBAL] New Buyer Requirement — ${referenceId}`;
  const idempotencyKey = `sg-outbox-${event.id}`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey, // Resend official 24-hour idempotent protection
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        reply_to: (p.corporate_email as string) || undefined,
        subject,
        text: `Commercial inquiry retry for reference: ${referenceId}`,
      }),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });

    if (response.status === 409 || response.status === 400) {
      let errJson: { name?: string; message?: string } = {};
      try {
        errJson = (await response.json()) as { name?: string; message?: string };
      } catch {
        errJson = {};
      }
      const errMsg = (errJson.message || '').toLowerCase();
      
      if (errMsg.includes('currently being processed') || errJson.name === 'conflict') {
        return { success: false, error: 'Concurrent dispatch in progress', isConcurrentConflict: true };
      }
      if (errMsg.includes('different payload') || errMsg.includes('already used')) {
        return { success: false, error: 'Idempotency key payload conflict', isPayloadConflict: true };
      }
    }

    if (!response.ok) {
      let errText = '';
      try {
        errText = await response.text();
      } catch {
        errText = '<unreadable body>';
      }
      return { success: false, error: `Resend HTTP ${response.status}: ${errText.slice(0, 200)}` };
    }

    let resJson: { id?: string } = {};
    try {
      resJson = (await response.json()) as { id?: string };
    } catch {
      resJson = {};
    }
    return { success: true, messageId: resJson.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown network error';
    return { success: false, error: msg };
  }
}

export async function runWorker() {
  const workerId = `render-${process.env.RENDER_INSTANCE_ID || 'worker'}-${Date.now()}`;
  setupSignalHandlers(workerId);

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseServiceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY)?.trim();
  const emailApiKey = process.env.EMAIL_API_KEY?.trim();
  const emailTo = process.env.EMAIL_TO?.trim() || 'shivomglobal1010@gmail.com';
  const emailFrom = process.env.EMAIL_FROM?.trim() || 'SHIVOM GLOBAL Inquiries <inquiries@shivomglobal.com>';

  if (!supabaseUrl || !supabaseServiceKey || !emailApiKey) {
    console.error(JSON.stringify({
      level: 'FATAL',
      timestamp: new Date().toISOString(),
      workerId,
      message: 'Missing mandatory credentials (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or EMAIL_API_KEY).',
    }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    level: 'INFO',
    timestamp: new Date().toISOString(),
    workerId,
    message: 'Worker initialized. Starting adaptive polling loop.',
    leaseDurationSeconds: LEASE_DURATION_SECONDS,
    idlePollMs: IDLE_POLL_INTERVAL_MS,
  }));

  while (!isShuttingDown) {
    // Periodic Maintenance Check (every 10 minutes) — Fully Awaited & Handled with RpcResult
    if (Date.now() - lastMaintenanceCheck > 600000) {
      lastMaintenanceCheck = Date.now();
      const cleanupEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/rpc/cleanup_unsupported_inquiry_outbox_jobs`;
      const cleanupResult = await invokePostgrestRpc<number>(
        cleanupEndpoint,
        supabaseServiceKey,
        { p_batch_size: 50 },
        DB_TIMEOUT_MS,
        (d): d is number => typeof d === 'number',
        'cleanup_unsupported_inquiry_outbox_jobs'
      );

      if (!cleanupResult.ok) {
        console.error(JSON.stringify({
          level: 'ERROR',
          timestamp: new Date().toISOString(),
          workerId,
          message: `cleanup_unsupported_inquiry_outbox_jobs failed: [${cleanupResult.error.kind}] ${cleanupResult.error.message}`,
          status: cleanupResult.error.status,
          raw: cleanupResult.error.raw,
        }));
      } else if (cleanupResult.data > 0) {
        console.log(JSON.stringify({
          level: 'INFO',
          timestamp: new Date().toISOString(),
          workerId,
          message: `cleanup_unsupported_inquiry_outbox_jobs quarantined ${cleanupResult.data} expired unsupported job(s).`,
        }));
      }
    }

    let claimedEvents: OutboxEvent[] = [];

    // 1. Claim Batch via RPC (Does NOT increment attempt_count; resets authorized_at = NULL)
    const claimEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/rpc/claim_inquiry_outbox_jobs`;
    const claimResult = await invokePostgrestRpc<OutboxEvent[]>(
      claimEndpoint,
      supabaseServiceKey,
      {
        p_batch_size: BATCH_SIZE,
        p_worker_id: workerId,
        p_lease_seconds: LEASE_DURATION_SECONDS,
      },
      DB_TIMEOUT_MS,
      (d): d is OutboxEvent[] => Array.isArray(d),
      'claim_inquiry_outbox_jobs'
    );

    if (!claimResult.ok) {
      if (claimResult.error.status === 401 || claimResult.error.status === 403) {
        console.error(JSON.stringify({
          level: 'FATAL',
          timestamp: new Date().toISOString(),
          workerId,
          message: `Authentication failure on Supabase claim RPC: HTTP ${claimResult.error.status}. Pausing 5 minutes.`,
        }));
        await sleep(300000);
        continue;
      }

      consecutiveErrors++;
      const backoffMs = getJitteredBackoffMs(consecutiveErrors);
      console.warn(JSON.stringify({
        level: 'WARN',
        timestamp: new Date().toISOString(),
        workerId,
        message: `Claim RPC failed [${claimResult.error.kind}]: ${claimResult.error.message}. Backing off for ${backoffMs}ms.`,
        consecutiveErrors,
      }));
      await sleep(backoffMs);
      continue;
    }

    claimedEvents = claimResult.data;
    consecutiveErrors = 0; // Reset consecutive errors on successful claim response

    // 2. Queue Empty -> Idle Sleep
    if (claimedEvents.length === 0) {
      await sleep(IDLE_POLL_INTERVAL_MS);
      continue;
    }

    console.log(JSON.stringify({
      level: 'INFO',
      timestamp: new Date().toISOString(),
      workerId,
      message: `Claimed batch of ${claimedEvents.length} event(s).`,
    }));

    // In-memory separation of unauthorized vs authorized
    unauthorizedJobIds.clear();
    claimedEvents.forEach((e) => unauthorizedJobIds.add(e.id));

    // 3. Process Batch
    for (let i = 0; i < claimedEvents.length; i++) {
      if (isShuttingDown) {
        const unstarted = Array.from(unauthorizedJobIds);
        console.warn(JSON.stringify({
          level: 'WARN',
          timestamp: new Date().toISOString(),
          workerId,
          message: `Shutdown initiated. Releasing ${unstarted.length} unstarted unauthorized job(s).`,
        }));
        await releaseUnstartedJobs(unstarted, workerId, supabaseUrl, supabaseServiceKey);
        break;
      }

      const event = claimedEvents[i];

      // Pre-Dispatch Lease Margin Check (Evaluates Database-Issued Expiry)
      const dbExpiryMs = event.lease_expires_at ? new Date(event.lease_expires_at).getTime() : 0;
      const remainingLeaseMs = dbExpiryMs - Date.now();
      if (remainingLeaseMs < PRE_DISPATCH_MIN_LEASE_MS) {
        const unstarted = Array.from(unauthorizedJobIds);
        console.warn(JSON.stringify({
          level: 'WARN',
          timestamp: new Date().toISOString(),
          workerId,
          message: `Remaining database-issued lease on event ${event.id} (${remainingLeaseMs}ms) < ${PRE_DISPATCH_MIN_LEASE_MS}ms margin. Halting batch and releasing ${unstarted.length} unstarted job(s).`,
        }));
        await releaseUnstartedJobs(unstarted, workerId, supabaseUrl, supabaseServiceKey);
        break;
      }

      // Contract Safeguard: Quarantine unsupported notification types immediately with active lease check
      if (event.notification_type !== 'TRADE_DESK_ALERT') {
        unauthorizedJobIds.delete(event.id);
        console.warn(JSON.stringify({
          level: 'WARN',
          timestamp: new Date().toISOString(),
          workerId,
          message: `Quarantining unsupported notification type: ${event.notification_type}`,
          eventId: event.id,
        }));
        await quarantineJob(
          event.id,
          workerId,
          `QUARANTINED_UNSUPPORTED_TYPE: ${event.notification_type} (Commercial feature inactive)`,
          supabaseUrl,
          supabaseServiceKey
        );
        continue;
      }

      // Step A: Authorize Dispatch in PostgreSQL (Enforces 7 predicates, increments attempt_count, sets authorized_at)
      type AuthRpcRow = { authorized: boolean; error_code: string | null; attempt_count: number };
      const authEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/rpc/authorize_inquiry_outbox_dispatch`;
      const authResult = await invokePostgrestRpc<AuthRpcRow[]>(
        authEndpoint,
        supabaseServiceKey,
        { p_event_id: event.id, p_worker_id: workerId },
        DB_TIMEOUT_MS,
        (d): d is AuthRpcRow[] => Array.isArray(d) && d.length > 0 && typeof d[0].authorized === 'boolean',
        'authorize_inquiry_outbox_dispatch'
      );

      if (!authResult.ok) {
        console.error(JSON.stringify({
          level: 'ERROR',
          timestamp: new Date().toISOString(),
          workerId,
          eventId: event.id,
          message: `authorize_inquiry_outbox_dispatch failed: [${authResult.error.kind}] ${authResult.error.message}`,
          status: authResult.error.status,
          raw: authResult.error.raw,
        }));
        // Transport/schema failure: do NOT proceed with email dispatch!
        // Leave unstarted job in unauthorizedJobIds for shutdown release or lease expiration.
        continue;
      }

      const authRow = authResult.data[0];
      if (!authRow.authorized) {
        unauthorizedJobIds.delete(event.id);
        console.warn(JSON.stringify({
          level: 'WARN',
          timestamp: new Date().toISOString(),
          workerId,
          message: `Dispatch authorization rejected by database for event ${event.id}. Reason: ${authRow.error_code}. Current attempt count: ${authRow.attempt_count}`,
        }));
        continue;
      }

      // Job is now formally authorized and in-flight
      unauthorizedJobIds.delete(event.id);
      currentAuthorizedInFlightId = event.id;

      // Step B: Execute Actual Email Dispatch with Bounded 409 Retry
      let dispatch = await dispatchTradeDeskAlert(event, emailApiKey, emailTo, emailFrom);

      // Handle Transient 409 Concurrent Conflict (Bounded to max 2 retries)
      let retryCount = 0;
      const retryDelaysMs = [1500, 3000];
      while (dispatch.isConcurrentConflict && retryCount < retryDelaysMs.length) {
        const delay = retryDelaysMs[retryCount];
        retryCount++;
        console.warn(JSON.stringify({
          level: 'WARN',
          timestamp: new Date().toISOString(),
          workerId,
          message: `Resend returned 409 concurrent_idempotent_requests for ${event.id}. Pausing ${delay}ms (Retry ${retryCount}/2).`,
        }));
        await sleep(delay);
        dispatch = await dispatchTradeDeskAlert(event, emailApiKey, emailTo, emailFrom);
      }

      // Re-evaluate payload conflict on the FINAL dispatch outcome
      if (dispatch.isPayloadConflict) {
        console.error(JSON.stringify({
          level: 'ERROR',
          timestamp: new Date().toISOString(),
          workerId,
          eventId: event.id,
          message: 'Resend rejected dispatch due to payload mismatch conflict after retry. Quarantining event.',
        }));
        await quarantineJob(event.id, workerId, 'FATAL_RESEND_PAYLOAD_MISMATCH_CONFLICT', supabaseUrl, supabaseServiceKey);
        currentAuthorizedInFlightId = null;
        continue;
      }

      const nowIso = new Date().toISOString();

      if (dispatch.success) {
        // Step C1: Atomic Completion via Database RPC (Guards authorized_at, syncs buyer_requirements with row verification)
        const compEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/rpc/complete_inquiry_outbox_job`;
        const compResult = await invokePostgrestRpc<boolean>(
          compEndpoint,
          supabaseServiceKey,
          { p_event_id: event.id, p_worker_id: workerId },
          DB_TIMEOUT_MS,
          (d): d is boolean => typeof d === 'boolean',
          'complete_inquiry_outbox_job'
        );

        if (!compResult.ok) {
          console.error(JSON.stringify({
            level: 'ERROR',
            timestamp: nowIso,
            workerId,
            eventId: event.id,
            message: `complete_inquiry_outbox_job RPC error: [${compResult.error.kind}] ${compResult.error.message}`,
            status: compResult.error.status,
            raw: compResult.error.raw,
          }));
          // Mutation retry policy: Do NOT blindly retry mutations on network timeout or HTTP 5xx.
          // The database transaction may have committed, or the lease may have expired.
        } else if (!compResult.data) {
          console.warn(`[OWNERSHIP_LOST] complete_inquiry_outbox_job returned false for ${event.id}. Lease expired or authorization marker absent.`);
        }
      } else {
        // Step C2: Atomic Failure via Database RPC (Resets authorized_at = NULL; sets DEAD_LETTER if 5th attempt)
        const backoffMins = calculateBackoffMinutes(authRow.attempt_count);
        const nextRetryDate = new Date(Date.now() + backoffMins * 60000).toISOString();
        const failEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/rpc/fail_inquiry_outbox_job`;

        const failResult = await invokePostgrestRpc<boolean>(
          failEndpoint,
          supabaseServiceKey,
          {
            p_event_id: event.id,
            p_worker_id: workerId,
            p_error: dispatch.error || 'Unknown dispatch failure',
            p_next_retry_at: nextRetryDate,
          },
          DB_TIMEOUT_MS,
          (d): d is boolean => typeof d === 'boolean',
          'fail_inquiry_outbox_job'
        );

        if (!failResult.ok) {
          console.error(JSON.stringify({
            level: 'ERROR',
            timestamp: nowIso,
            workerId,
            eventId: event.id,
            message: `fail_inquiry_outbox_job RPC error: [${failResult.error.kind}] ${failResult.error.message}`,
            status: failResult.error.status,
            raw: failResult.error.raw,
          }));
        } else if (!failResult.data) {
          console.warn(JSON.stringify({
            level: 'WARN',
            timestamp: nowIso,
            workerId,
            eventId: event.id,
            message: 'fail_inquiry_outbox_job returned false (lease expired or worker ownership lost).',
          }));
        }

        console.warn(JSON.stringify({
          level: 'WARN',
          timestamp: nowIso,
          workerId,
          eventId: event.id,
          referenceId: event.reference_id,
          attempt: authRow.attempt_count,
          maxAttempts: event.max_attempts,
          error: dispatch.error,
        }));
      }

      currentAuthorizedInFlightId = null;

      // Safe Resend Pacing
      if (i < claimedEvents.length - 1) {
        await sleep(RESEND_PACING_DELAY_MS);
      }
    }

    // Active drain delay
    await sleep(ACTIVE_POLL_INTERVAL_MS);
  }

  console.log(JSON.stringify({
    level: 'INFO',
    timestamp: new Date().toISOString(),
    workerId,
    message: 'Graceful shutdown completed successfully. Process exiting.',
  }));
  process.exit(0);
}
```

---

## 6. Security & Credential Management

- **Database Function Execution Hardening:**
  - `SECURITY DEFINER` functions in PostgreSQL execute with the privileges of their creator.
  - The migration explicitly issues `REVOKE ALL ON FUNCTION ... FROM PUBLIC, anon, authenticated;` for all 7 outbox functions.
  - Execution privileges are explicitly granted strictly to `service_role`: `GRANT EXECUTE ON FUNCTION ... TO service_role;`.
  - Unauthenticated clients (`anon`) and regular users (`authenticated`) receive HTTP 401/403 Permission Denied if attempting to invoke outbox RPCs directly via PostgREST.
- **Credential Storage on Render:**
  - In `render.yaml`, environment variables must specify `sync: false`.
  - Values are entered manually via the secure Render Dashboard.
  - Zero secrets or API keys are placed in Git repository files or build logs.
- **Frontend Isolation Boundary:**
  - The `SUPABASE_SERVICE_ROLE_KEY` must **never** be prefixed with `VITE_` or included in frontend client bundles.

---

## 7. Build & Runtime Configuration

### 7.1 TypeScript Configuration (`tsconfig.worker.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "worker",
    "outDir": "dist/worker",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "noEmit": false
  },
  "include": ["worker/**/*"]
}
```

### 7.2 Package Scripts (`package.json`)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "build:worker": "tsc -p tsconfig.worker.json",
    "start:worker": "node dist/worker/index.js"
  }
}
```

---

## 8. Render Deployment Blueprint (`render.yaml`)

```yaml
services:
  # ============================================================================
  # SHIVOM GLOBAL — Commercial Inquiry Outbox Retry Background Worker
  # ============================================================================
  - type: worker
    name: shivom-inquiry-outbox-worker
    runtime: node
    region: singapore # Closest Render region to Supabase Mumbai (ap-south-1)
    plan: starter # $7/mo Starter compute (0.5 vCPU, 512 MB RAM)
    branch: main
    buildCommand: npm ci && npm run build:worker
    startCommand: node dist/worker/index.js
    autoDeploy: true
    maxShutdownDelaySeconds: 30 # Render default shutdown grace period (30s)
    envVars:
      - key: NODE_ENV
        value: production
      - key: SUPABASE_URL
        sync: false # Configured in Render Dashboard
      - key: SUPABASE_SERVICE_ROLE_KEY
        sync: false # Configured in Render Dashboard
      - key: EMAIL_API_KEY
        sync: false # Configured in Render Dashboard
      - key: EMAIL_TO
        value: shivomglobal1010@gmail.com
      - key: EMAIL_FROM
        value: SHIVOM GLOBAL Inquiries <inquiries@shivomglobal.com>
```

---

## 9. Verified Pricing & Region Latency Assessment

### 9.1 Official Render Pricing (Verified November 2026)
- **Background Worker Starter Instance:** **$7.00 / month** (0.5 vCPU, 512 MB RAM), billed per second.
- **Hobby Workspace (1 User):** **$0.00 / month** base fee.
- **Total Compute Cost:** **$7.00 / month** (plus applicable regional sales tax/VAT).
- **Team Workspace Note:** If using a Pro team workspace, Render charges a **$19 – $25/month** workspace fee, bringing the total to $26–$32/mo.

### 9.2 Region Selection & Latency
- **Supabase Region:** Verified in `docs/WEBSITE_IMPROVEMENT_PLAN.md:679` as **`ap-south-1` (Mumbai, India)**.
- **Render Available Regions:** Oregon (`oregon`), Ohio (`ohio`), Virginia (`virginia`), Frankfurt (`frankfurt`), Singapore (`singapore`).
- **Optimal Choice:** **Singapore (`singapore`)** is geographically closest to Mumbai, providing $\sim 40\text{--}60\text{ms}$ round-trip latency (compared to $> 220\text{ms}$ for US West).

---

## 10. Comprehensive Staging Acceptance Test Suite (STG-01 to STG-14)

The synthetic test suite must be executed and pass in a staging Supabase environment prior to authorizing production deployment:

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

### 10.1 Detailed Staging Verification Procedures for Advanced Schema Tests (STG-08 & STG-09)

> [!WARNING]
> **STAGING ENVIRONMENT RESTRICTION:** The test procedures below execute transactional DDL alterations (`ALTER TABLE ... DROP CONSTRAINT / DROP NOT NULL`) within uncommitted database transactions (`BEGIN ... ROLLBACK`). These tests are designed exclusively for an isolated staging database and must **NEVER** be executed against production.

#### STG-08: Transactionally Valid NULL Notification Type Test
**Objective:** Verify that `authorize_inquiry_outbox_dispatch`'s Predicate 5 (`notification_type IS DISTINCT FROM 'TRADE_DESK_ALERT'`) defensively rejects `NULL` notification types and leaves the job intact without incrementing `attempt_count` or setting `authorized_at`.

**PostgreSQL CHECK Constraint Ternary Logic Analysis:**
In `20261104000000_inquiry_reliability_hardening.sql`, the column is defined as:
```sql
notification_type TEXT NOT NULL CHECK (notification_type IN ('TRADE_DESK_ALERT', 'BUYER_ACKNOWLEDGMENT'))
```
Under SQL ternary boolean logic (`TRUE`, `FALSE`, `UNKNOWN`), a table `CHECK` constraint rejects row insertion **only** when the condition evaluates to `FALSE`. An expression that evaluates to `UNKNOWN` (`NULL`) does **not** reject the row. For `notification_type = NULL`:
$$( \text{NULL} = \text{'TRADE\_DESK\_ALERT'} ) \text{ OR } ( \text{NULL} = \text{'BUYER\_ACKNOWLEDGMENT'} ) \equiv \text{UNKNOWN} \lor \text{UNKNOWN} \equiv \mathbf{UNKNOWN}$$
Consequently, the `CHECK` constraint alone permits `NULL` values; it is solely the `NOT NULL` constraint that prohibits them. Temporarily dropping `NOT NULL` within an explicit transaction allows seeding a `NULL` row to test stored procedure null-safety without permanent schema corruption:

```sql
-- STG-08 Executable Staging Test Script
BEGIN;

-- 1. Temporarily remove NOT NULL constraint within transaction
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
-- Predicate evaluates: (NULL IS DISTINCT FROM 'TRADE_DESK_ALERT') -> TRUE
SELECT authorized, error_code, attempt_count
FROM public.authorize_inquiry_outbox_dispatch('88888888-8888-8888-8888-888888888888', 'test-worker-stg08');
-- Expected Return: authorized = FALSE, error_code = 'UNSUPPORTED_NOTIFICATION_TYPE', attempt_count = 0

-- 4. Verify outbox row state remained unmodified
SELECT status, attempt_count, authorized_at
FROM public.inquiry_outbox
WHERE id = '88888888-8888-8888-8888-888888888888';
-- Expected State: status = 'PROCESSING', attempt_count = 0, authorized_at IS NULL

-- 5. Always rollback to restore NOT NULL constraint and discard test record
ROLLBACK;
```

---

#### STG-09: Precise Dynamic Dual-FK Missing Buyer Row Rollback
**Objective:** Verify that `complete_inquiry_outbox_job` enforces ACID transaction rollback if the underlying buyer requirement row does not exist.

**Dual Foreign-Key Constraint Structure & Catalog Query:**
The `inquiry_outbox` table maintains **two separate foreign keys** referencing `buyer_requirements`:
1. `inquiry_id UUID NOT NULL REFERENCES public.buyer_requirements(id) ON DELETE CASCADE`
2. `reference_id TEXT NOT NULL REFERENCES public.buyer_requirements(reference_id) ON DELETE CASCADE`

Indiscriminately dropping foreign keys or inserting arbitrary values triggers unhandled constraint violations during row insertion. To test the specific rollback condition in `complete_inquiry_outbox_job`, the test dynamically queries the exact constraint name for `inquiry_id` from PostgreSQL's `pg_constraint` system catalog, drops **only** that constraint within an uncommitted transaction, and seeds an outbox record with an existing valid `reference_id` (satisfying the second foreign key) and an unreferenced `inquiry_id` (`gen_random_uuid()`):

```sql
-- STG-09 Executable Staging Test Script

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

## 11. Final Section: Consolidated Audit & Implementation Gate

### 11.1 Consolidated Audit Findings & Corrections Made
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

### 11.2 Remaining Known Limitations
1. **Provider 24-Hour Deduplication Window:** Resend guarantees key deduplication for 24 hours. Under standard backoff ($4\text{m} + 8\text{m} + 16\text{m} + 32\text{m} = 60\text{m}$), all retries occur within ~62.5 minutes. If a prolonged infrastructure outage exceeds 24 hours, a replay of an in-flight dispatch may result in a duplicate email delivery under at-least-once semantics.
2. **Crash Between Authorization and Provider Invocation:** Because no two-phase commit spans PostgreSQL and Resend, a fatal process crash (e.g. host kernel panic or immediate SIGKILL) between authorization and HTTP socket creation will consume one authorization attempt without sending an email. The system authorizes at most 5 attempts.

### 11.3 Migration Prerequisites
Before deploying the background worker daemon, the database migration `supabase/migrations/20261105000001_inquiry_outbox_atomic_ownership.sql` must be authored matching Section 4.2 verbatim (including the `ALTER TABLE` prerequisite at the top), applied to a staging Supabase instance, and verified against tests `STG-01` through `STG-14`.

### 11.4 Production Deployment Blockers
1. [ ] Author migration file `20261105000001_inquiry_outbox_atomic_ownership.sql` matching Section 4.2 verbatim.
2. [ ] Apply migration `20261105000001_inquiry_outbox_atomic_ownership.sql` to Supabase staging.
3. [ ] Execute and pass test suite `STG-01` through `STG-14` in staging.
4. [ ] Author `worker/index.ts`, `tsconfig.worker.json`, and `render.yaml` in codebase matching blueprint.
5. [ ] Apply migration to production Supabase.
6. [ ] Deploy Background Worker on Render Singapore ($7/mo Starter).
7. [ ] Remove `"crons"` block from `vercel.json` and deploy Vercel frontend.

### 11.5 Final Readiness Verdict

```
================================================================================
FINAL READINESS VERDICT: DOCUMENTATION READY FOR STAGING
================================================================================
```
The architecture, database contracts, RPC signatures, security grants, and failure recoveries are verified, reconciled, and implementation-ready for staging deployment. Production deployment remains blocked until staging verification passes.
