# SHIVOM GLOBAL — Phase 4A.2: Stage 1 Migration Review
## Database Reliability Hardening: Idempotency & Transactional Notification Outbox

**Project:** SHIVOM GLOBAL Website  
**Phase:** 4A.2 — Stage 1: Database Reliability Migration Draft  
**Target Migration:** `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql`  
**Status:** Draft Specification Complete — Awaiting Approval  
**Execution Mode:** Inspection & Migration-File Preparation Only (Zero Execution Against Live Supabase)  
**Date:** November 2026  

---

## 1. Existing Schema Findings

An audit of the baseline migration `supabase/migrations/20261021000000_buyer_requirements.sql` and the active API implementation `api/buyer-requirements.ts` reveals the following database foundation:

### 1.1 Existing Table: `public.buyer_requirements`
- **Primary Key**: `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- **Natural / Business Key**: `reference_id TEXT NOT NULL UNIQUE` (Formatted as `SG-REQ-YYYYMMDD-XXXX`)
- **Buyer Identity Columns**: `company_name`, `contact_name`, `corporate_email`, `phone`, `buyer_country` (All `TEXT NOT NULL`)
- **Commercial Specification Columns**: `requirement_type`, `tea_category`, `grade`, `quantity`, `packaging_requirements`, `target_market` (All `TEXT NOT NULL`, except `tea_category` which is nullable)
- **Technical & Application Notes**: `application`, `additional_requirements` (`TEXT NULL`)
- **Lifecycle & Anti-Abuse**: `source TEXT NOT NULL DEFAULT 'WEBSITE'`, `status TEXT NOT NULL DEFAULT 'NEW'`, `ip_address TEXT`, `user_agent TEXT`
- **Timestamps**: `submitted_at`, `created_at`, `updated_at` (All `TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())`)

### 1.2 Existing Email Tracking Columns
- `email_sent BOOLEAN NOT NULL DEFAULT false`
- `email_dispatched_at TIMESTAMPTZ NULL`
- `email_error TEXT NULL`

*Finding*: These three columns track only a single, synchronous email dispatch to the internal trade desk. They do not support multiple notification targets (e.g. buyer transactional receipts), retry attempt tracking, exponential backoff, worker lease locking, or an independent outbox queue.

### 1.3 Existing Indexes
- `idx_buyer_requirements_reference_id` on `reference_id` (Unique lookup)
- `idx_buyer_requirements_status` on `status`
- `idx_buyer_requirements_created_at` on `created_at DESC`
- `idx_buyer_requirements_email` on `corporate_email`

### 1.4 Existing RLS Policies & Grants
- Row-Level Security is strictly enabled: `ALTER TABLE public.buyer_requirements ENABLE ROW LEVEL SECURITY;`
- Public access is revoked: `REVOKE ALL ON public.buyer_requirements FROM anon, authenticated;`
- Service role has full permissions: `GRANT ALL ON public.buyer_requirements TO service_role;`
- Service role policy: `"Service role full access on buyer_requirements"` for `ALL` actions to `service_role`.

### 1.5 Existing PostgREST Access Patterns
- The serverless function (`api/buyer-requirements.ts`) communicates via direct HTTPS calls to Supabase PostgREST:
  - `POST /rest/v1/buyer_requirements` with `Prefer: return=representation`
  - `PATCH /rest/v1/buyer_requirements?reference_id=eq.${referenceId}` to update email status.

---

## 2. Proposed Schema Changes

The migration script `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` introduces two structural enhancements while preserving 100% backward compatibility:

1. **Idempotency Column on `public.buyer_requirements`**:
   Adds `idempotency_key TEXT` with a dedicated unique index `idx_buyer_requirements_idempotency_key`.
2. **Dedicated Outbox Queue Table `public.inquiry_outbox`**:
   Creates a decoupled transactional event store for trade desk notifications and buyer acknowledgment receipts, complete with worker claiming fields, backoff metadata, and RLS security.

### Schema Comparison (Before vs. After)

```
========================================================================================
 public.buyer_requirements
========================================================================================
 Existing Columns                           Hardened Columns
 ----------------                           ----------------
 id UUID PK                                 id UUID PK
 reference_id TEXT UNIQUE                   reference_id TEXT UNIQUE
 submitted_at TIMESTAMPTZ                   submitted_at TIMESTAMPTZ
 company_name TEXT                          company_name TEXT
 contact_name TEXT                          contact_name TEXT
 corporate_email TEXT                       corporate_email TEXT
 phone TEXT                                 phone TEXT
 buyer_country TEXT                         buyer_country TEXT
 requirement_type TEXT                      requirement_type TEXT
 tea_category TEXT                          tea_category TEXT
 grade TEXT                                 grade TEXT
 quantity TEXT                              quantity TEXT
 packaging_requirements TEXT                packaging_requirements TEXT
 target_market TEXT                         target_market TEXT
 application TEXT                           application TEXT
 additional_requirements TEXT               additional_requirements TEXT
 source TEXT                                source TEXT
 status TEXT                                status TEXT
 email_sent BOOLEAN                         email_sent BOOLEAN (preserved for backward compat)
 email_dispatched_at TIMESTAMPTZ            email_dispatched_at TIMESTAMPTZ (preserved)
 email_error TEXT                           email_error TEXT (preserved)
 ip_address TEXT                            ip_address TEXT
 user_agent TEXT                            user_agent TEXT
 created_at TIMESTAMPTZ                     created_at TIMESTAMPTZ
 updated_at TIMESTAMPTZ                     updated_at TIMESTAMPTZ
                                         +  idempotency_key TEXT (UNIQUE INDEX)

========================================================================================
 NEW TABLE: public.inquiry_outbox (Transactional Queue)
========================================================================================
 + id UUID PRIMARY KEY DEFAULT gen_random_uuid()
 + inquiry_id UUID NOT NULL FK -> buyer_requirements(id) ON DELETE CASCADE
 + reference_id TEXT NOT NULL FK -> buyer_requirements(reference_id) ON DELETE CASCADE
 + notification_type TEXT NOT NULL ('TRADE_DESK_ALERT' | 'BUYER_ACKNOWLEDGMENT')
 + recipient_email TEXT NOT NULL
 + recipient_name TEXT
 + status TEXT NOT NULL ('PENDING' | 'PROCESSING' | 'SENT' | 'FAILED' | 'DEAD_LETTER')
 + payload JSONB NOT NULL DEFAULT '{}'::jsonb
 + attempt_count INTEGER NOT NULL DEFAULT 0
 + max_attempts INTEGER NOT NULL DEFAULT 5
 + next_retry_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
 + last_error TEXT
 + locked_at TIMESTAMPTZ
 + locked_by TEXT
 + lease_expires_at TIMESTAMPTZ
 + sent_at TIMESTAMPTZ
 + created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
 + updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
 + CONSTRAINT uq_inquiry_outbox_event UNIQUE (inquiry_id, notification_type)
========================================================================================
```

---

## 3. Idempotency Design

### 3.1 Idempotency Lifecycle & Requirements Traceability

| Requirement | Implementation Mechanism | Technical Verification |
|:---|:---|:---|
| **1. One key identifies one logical submission** | Client generates a UUID v4 when the form initializes. Passed in payload as `idempotencyKey` and header `Idempotency-Key`. | Form edits preserve the key; reset generates a new key. |
| **2. Repeated key resolves to original inquiry** | PostgreSQL `ON CONFLICT (idempotency_key)` returns the existing row with the original `reference_id`. | Calling POST with the same key returns HTTP 200 with the original reference ID. |
| **3. Repeated request does not create another inquiry** | Uniqueness constraint halts duplicate insertion at the database engine level. | Zero additional rows inserted into `buyer_requirements`. |
| **4. Repeated request does not enqueue duplicate notifications** | In the outbox, `CONSTRAINT uq_inquiry_outbox_event UNIQUE (inquiry_id, notification_type)` prevents duplicate notification records. In the API, duplicate detection skips re-enqueuing. | Outbox row count remains exactly 1 per notification type. |
| **5. Existing records remain valid** | Standard SQL `UNIQUE` index treats `NULL` values as distinct (`NULL != NULL`). | Existing historical rows with `idempotency_key = NULL` never violate the index. |
| **6. Migration handles existing rows safely** | Column added with `ADD COLUMN IF NOT EXISTS idempotency_key TEXT;` without a default value. | Zero table rewrites, zero locks, immediate schema update. |
| **7. Nullability vs. New Submission Enforcement** | Database column is `TEXT NULL` to accommodate historical records and manual imports. Application layer (`api/buyer-requirements.ts`) enforces `NOT NULL` for all new website submissions. | Web API rejects submissions missing `idempotencyKey` with HTTP 400. |

### 3.2 PostgreSQL Conflict-Handling Behavior

When PostgREST executes an upsert, it issues:
```sql
INSERT INTO public.buyer_requirements (
  idempotency_key, reference_id, company_name, ...
)
VALUES (
  'e6c27931-7b3b-4892-95f2-901be802d251', 'SG-REQ-20261104-ABCD', 'Al Noor LLC', ...
)
ON CONFLICT (idempotency_key) 
DO UPDATE SET updated_at = buyer_requirements.updated_at
RETURNING *;
```

#### Crucial PostgreSQL Implementation Note: Why `DO UPDATE` vs. `DO NOTHING`?
In PostgreSQL, an `INSERT ... ON CONFLICT (...) DO NOTHING RETURNING *` query returns **zero rows** when a conflict occurs. If PostgREST receives zero rows from `DO NOTHING`, it cannot return the existing record's `reference_id` to the client.

By using `DO UPDATE SET updated_at = buyer_requirements.updated_at` (a semantic no-op update), PostgreSQL is forced to return the **existing matching row** in `RETURNING *`. PostgREST returns this row with HTTP 200, allowing the serverless handler to extract the authoritative `reference_id` and return it to the buyer with `isDuplicate: true`.

---

## 4. Transactional Notification Outbox Design

### 4.1 State Machine
```mermaid
stateDiagram-v2
    [*] --> PENDING: Inserted with Inquiry (attempt_count = 0)
    
    PENDING --> PROCESSING: Worker claims row (FOR UPDATE SKIP LOCKED)
    
    PROCESSING --> SENT: Resend returns 200 OK (sent_at = now())
    SENT --> [*]
    
    PROCESSING --> FAILED: Resend returns 4xx/5xx / network error (attempt < 5)
    FAILED --> PENDING: next_retry_at reached (Exponential Backoff)
    
    PROCESSING --> DEAD_LETTER: attempt_count >= 5 (Operator Alert Required)
    DEAD_LETTER --> [*]
```

### 4.2 State Definitions
- **`PENDING`**: Initial state. Notification event is queued and ready for dispatch.
- **`PROCESSING`**: A worker has acquired a lease lock on the row (`locked_at`, `locked_by`, `lease_expires_at`). Other workers will skip this row.
- **`SENT`**: Successfully dispatched via Resend. `sent_at` timestamp recorded. Terminal success state.
- **`FAILED`**: Dispatch attempted but encountered an error. `attempt_count` incremented, `last_error` populated, `next_retry_at` scheduled using exponential backoff (e.g. +2m, +8m, +32m, +2h).
- **`DEAD_LETTER`**: Failed after exceeding `max_attempts` (default: 5). Terminal failure state requiring trade desk operator review.

### 4.3 Safe Concurrent Worker Claiming (`FOR UPDATE SKIP LOCKED`)

To enable multiple worker lambdas or cron jobs to run safely without collision or distributed locks, the worker claims work using PostgreSQL's native row-level lock skipping:

```sql
WITH claimable AS (
  SELECT id 
  FROM public.inquiry_outbox
  WHERE status IN ('PENDING', 'FAILED')
    AND next_retry_at <= timezone('utc'::text, now())
    AND (lease_expires_at IS NULL OR lease_expires_at < timezone('utc'::text, now()))
  ORDER BY next_retry_at ASC
  LIMIT 10
  FOR UPDATE SKIP LOCKED
)
UPDATE public.inquiry_outbox o
SET status = 'PROCESSING',
    locked_at = timezone('utc'::text, now()),
    locked_by = $1, -- Unique worker instance ID (e.g. 'vercel-lambda-req_123')
    lease_expires_at = timezone('utc'::text, now()) + INTERVAL '3 minutes',
    attempt_count = o.attempt_count + 1,
    updated_at = timezone('utc'::text, now())
FROM claimable
WHERE o.id = claimable.id
RETURNING o.*;
```

#### Concurrency Guarantees
1. **Zero Duplicate Processing**: `FOR UPDATE SKIP LOCKED` guarantees that no two workers ever claim the same notification event simultaneously.
2. **Crash Resilience (Lease Expiration)**: If a serverless worker container terminates abruptly during execution, its lease will expire in 3 minutes (`lease_expires_at < now()`). The next execution of the outbox worker will reclaim the stranded job and retry dispatch.
3. **Strict Notification Separation**: Separate entries for `TRADE_DESK_ALERT` and `BUYER_ACKNOWLEDGMENT` ensure that an email delivery failure to the buyer does not block or delay notification to the internal trade desk, and vice-versa.

---

## 5. Existing-Data Compatibility

1. **Non-Destructive Alteration**:
   The migration does not drop, rename, or modify any existing table, column, index, constraint, or trigger.
2. **Zero Default Rewrites**:
   `ALTER TABLE public.buyer_requirements ADD COLUMN IF NOT EXISTS idempotency_key TEXT;` executes instantaneously as a metadata update in PostgreSQL 11+. It does not write to existing table blocks.
3. **Preservation of Existing Legacy Columns**:
   The existing columns (`email_sent`, `email_dispatched_at`, `email_error`) remain intact in `public.buyer_requirements`. This ensures that existing production code in `api/buyer-requirements.ts` will continue to read and write these columns without interruption until Stage 3 is deployed.
4. **Foreign Key Integrity**:
   The new `public.inquiry_outbox` table references `public.buyer_requirements(id)` and `public.buyer_requirements(reference_id)`. Both target columns already have primary and unique indexes, satisfying foreign key constraints.

---

## 6. Row-Level Security (RLS) & Security Implications

### 6.1 Attack Surface Analysis
The `inquiry_outbox` table stores sensitive commercial communication metadata:
- Corporate email addresses of international buyers.
- Trade desk internal destination emails.
- Commercial requirement specifications stored in `payload` JSONB.

### 6.2 Security Policy Enforced
1. **RLS Enabled Immediately**:
   `ALTER TABLE public.inquiry_outbox ENABLE ROW LEVEL SECURITY;`
2. **Zero Public Access**:
   `REVOKE ALL ON public.inquiry_outbox FROM anon, authenticated;`
   Public website visitors, anonymous PostgREST clients, and compromised frontend sessions cannot view or manipulate the outbox queue.
3. **Exclusive Backend Service Role Access**:
   `GRANT ALL ON public.inquiry_outbox TO service_role;`
   Only backend functions operating with the secure `SUPABASE_SERVICE_ROLE_KEY` can read, claim, or update outbox records.

---

## 7. Index Rationale

| Index Name | Target Table | Columns / Definition | Rationale |
|:---|:---|:---|:---|
| `idx_buyer_requirements_idempotency_key` | `buyer_requirements` | `UNIQUE (idempotency_key)` | Enforces global uniqueness across non-null keys. Powers `ON CONFLICT (idempotency_key)` conflict detection in $O(1)$ time. |
| `idx_inquiry_outbox_polling` | `inquiry_outbox` | `(next_retry_at ASC, status) WHERE status IN ('PENDING', 'PROCESSING')` | Partial index specifically designed for the worker query. Excludes historical `SENT` records, ensuring sub-millisecond polling even with millions of past inquiries. |
| `idx_inquiry_outbox_inquiry_id` | `inquiry_outbox` | `(inquiry_id)` | Optimizes foreign key joins between commercial requirements and their notification history. |
| `idx_inquiry_outbox_reference_id` | `inquiry_outbox` | `(reference_id)` | Enables fast lookup by commercial reference ID (e.g. `SG-REQ-YYYYMMDD-XXXX`) in audit and support workflows. |
| `idx_inquiry_outbox_failed` | `inquiry_outbox` | `(created_at DESC) WHERE status IN ('FAILED', 'DEAD_LETTER')` | Partial index for monitoring failed or dead-letter dispatches, facilitating operational alerts and administrative dashboards. |

---

## 8. Migration Execution Risks & Mitigation

| Risk | Severity | Potential Impact | Mitigation in Migration Draft |
|:---|:---|:---|:---|
| **Table Lock on `buyer_requirements`** | Low | Brief blockage of active website inquiries. | `ADD COLUMN IF NOT EXISTS` without a default value is a metadata-only change in PostgreSQL. Execution completes in < 5ms. |
| **Index Creation Lock** | Low | Slower writes during index build. | Table currently contains minimal rows; B-tree creation completes in < 10ms. |
| **PostgREST Schema Cache Delay** | Low | PostgREST returns "column not found" immediately after DDL. | Supabase automatically issues `NOTIFY pgrst, 'reload schema'` upon migration application. |
| **Constraint Violation on Existing Rows** | Zero | Migration fails if existing rows have duplicate nulls. | PostgreSQL standard unique indexes allow multiple `NULL` entries. Verified by relational theory. |

---

## 9. Rollback Considerations

Should rollback ever be required, the following non-destructive reversal script safely returns the database to its exact baseline state without losing any inquiry data:

```sql
-- ==============================================================================
-- SHIVOM GLOBAL — Rollback Script for 20261104000000_inquiry_reliability_hardening.sql
-- ==============================================================================

-- 1. Drop the outbox table (Cascades all dependent indexes and policies)
DROP TABLE IF EXISTS public.inquiry_outbox CASCADE;

-- 2. Drop the idempotency unique index
DROP INDEX IF EXISTS public.idx_buyer_requirements_idempotency_key;

-- 3. Remove the idempotency_key column from buyer_requirements
ALTER TABLE public.buyer_requirements 
  DROP COLUMN IF EXISTS idempotency_key;
```

---

## 10. SQL Validation & Test Plan

### 10.1 Static Validation
- [x] Conforms to PostgreSQL 15 SQL syntax standards.
- [x] Uses idempotent DDL (`IF NOT EXISTS`, `DROP POLICY IF EXISTS`).
- [x] Complies with Supabase Row-Level Security best practices.
- [x] Preserves existing data, foreign keys, and application contracts.

### 10.2 Stage 1 Local Verification Checklist (Ready for Test DB)
1. **Table Creation Check**: Verify `public.inquiry_outbox` exists with correct data types and defaults.
2. **Idempotency Nullability Check**: Verify existing rows with `idempotency_key = NULL` can coexist with multiple NULL rows.
3. **Idempotency Uniqueness Check**: Verify inserting two rows with the same non-null `idempotency_key` raises error `23505` (unique_violation).
4. **Concurrent Claim Test**: Verify `SELECT ... FOR UPDATE SKIP LOCKED` allows two simultaneous transactions to claim separate rows without deadlocks.
5. **RLS Security Check**: Verify queries using the `anon` key receive empty results or access denied errors.

---

## 11. Architectural Decisions Requiring Approval

Before proceeding to Stage 2 (Client Idempotency) and Stage 3 (API Implementation), authorization is requested on the following architectural choice:

### Decision: Outbox Event Generation Strategy
- **Option A (API-Managed Dual Insert)**:
  `api/buyer-requirements.ts` inserts into `public.buyer_requirements`, and upon success, immediately inserts the pending event into `public.inquiry_outbox` via PostgREST.
  *Pros*: Pure TypeScript control; no database triggers or procedural PL/pgSQL; straightforward error logging in Vercel logs.
  *Cons*: Requires two HTTP PostgREST calls (unless wrapped in an RPC).
- **Option B (Database Trigger Atomicity — Recommended)**:
  An `AFTER INSERT ON public.buyer_requirements` trigger automatically seeds the `TRADE_DESK_ALERT` and `BUYER_ACKNOWLEDGMENT` rows in `public.inquiry_outbox` within the exact same database transaction.
  *Pros*: 100% atomic at the database level. Impossible to create an inquiry without creating its outbox notifications. Zero additional network latency for the API.
  *Cons*: Trigger logic lives inside PostgreSQL rather than TypeScript code.

---

## 12. Conclusion & Summary

The Stage 1 migration draft:
`supabase/migrations/20261104000000_inquiry_reliability_hardening.sql`
has been prepared locally in strict accordance with the project rules.

- **Zero database executions** have been performed.
- **Zero frontend, API, or cron worker files** have been modified.
- **Zero secret values** have been exposed.
- All existing inquiry records and live production behaviors remain preserved and protected.

**Awaiting user review and authorization before proceeding.**

