# SHIVOM GLOBAL — Inquiry Outbox Reliability Remediation Specification

**Document Version:** 1.0.0  
**Date:** November 5, 2026  
**Status:** Approved Engineering Specification (Pre-Implementation)  
**Author:** DeepMind Pair Programming / Antigravity Assistant  
**Target Subsystems:**
- `api/cron/retry-failed-inquiries.ts` (Vercel Serverless Outbox Worker)
- `vercel.json` (Vercel Platform Configuration & Cron Routing)
- `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Existing Schema & RPC)
- `supabase/migrations/20261105000000_inquiry_outbox_scheduler.sql` (Proposed Remediation Migration)

---

## 1. Executive Summary & Architecture Goal

The objective of this specification is to establish a **reliable, near-real-time (10-minute) email recovery pipeline** for commercial buyer inquiries without requiring an upgrade to Vercel Pro.

Vercel Hobby enforces a strict quota: **at most one cron job per day** (`0 0 * * *`). Setting `schedule: "*/10 * * * *"` in `vercel.json` causes Vercel build/deployment rejection. However, shifting the retry schedule to once per 24 hours introduces unacceptable commercial latency (up to 24-hour delays for wholesale buyer inquiries) and risks queue starvation.

### Remediation Blueprint
```
+-------------------------------------------------------------------------------------------------+
|                                    REMEDIATED ARCHITECTURE                                      |
|                                                                                                 |
|  [ Buyer Submits Form ]                                                                         |
|            │                                                                                    |
|            ▼                                                                                    |
|  [ api/buyer-requirements.ts ]                                                                  |
|            │                                                                                    |
|            ├────────────────────────────────────────┐ (Async Trigger on INSERT)                 |
|            ▼                                        ▼                                           |
|  Synchronous Resend Call (99% cases)     [ public.inquiry_outbox ]                             |
|    - If OK -> Mark SENT                  (Initial State: status='PENDING', attempt_count=0)    |
|    - If Fail -> Outbox Worker Recovers              │                                           |
|                                                     │                                           |
|  [ Supabase pg_cron Scheduler ]                     │                                           |
|    - Runs every 10 min: '*/10 * * * *'              │                                           |
|    - Fetches CRON_SECRET from Supabase Vault        │                                           |
|    - Dispatches net.http_post() to Vercel Endpoint  │                                           |
|            │                                        │                                           |
|            ▼                                        ▼                                           |
|  [ api/cron/retry-failed-inquiries.ts ] ──► [ claim_inquiry_outbox_jobs() RPC ]                |
|    - Authenticates Bearer Token               - FOR UPDATE SKIP LOCKED (No concurrency race)   |
|    - Respects 20s Execution Budget           - Single increment of attempt_count              |
|    - 550ms Pacing (Resend Rate-Limit Safe)   - 180s Lease Lock Recovery                         |
|    - Exactly 5 Permitted Attempts                                                               |
+-------------------------------------------------------------------------------------------------+
```

---

## 2. Phase 1 — Vercel Runtime & Execution Limits Analysis

A comprehensive inspection of the Vercel environment was performed to establish ground truth regarding function timeouts and Fluid Compute.

### 2.1 Workspace Findings
* **`vercel.json` Inspection:**
  ```json
  {
    "framework": "vite",
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "crons": [
      {
        "path": "/api/cron/retry-failed-inquiries",
        "schedule": "*/10 * * * *"
      }
    ],
    "rewrites": [ ... ]
  }
  ```
  - Contains **no `"functions"` property**.
  - Contains **no `maxDuration` specification**.
* **`api/cron/retry-failed-inquiries.ts` Inspection:**
  - Contains **no `export const maxDuration`**.
  - Contains **no `export const config`**.
  - The worker relies entirely on default runtime configuration.
* **Local Project Linking:**
  - The project does not contain a `.vercel` directory or cached project settings.

### 2.2 Fluid Compute vs. Legacy Compute Limits
* **Fluid Compute (Vercel Modern Default):**
  - Fluid Compute is enabled by default for all Vercel projects created since mid-2024.
  - Under Fluid Compute, the **default duration is 300 seconds (5 minutes)** and the **maximum duration on Hobby is 300 seconds (5 minutes)**. Active CPU execution is billed separately from wall-clock I/O wait.
* **Legacy Compute (Historical Serverless):**
  - Under Legacy Compute, the Hobby default duration was **10 seconds**, with a configurable maximum of 15 seconds (later 60 seconds).
* **Vercel Hobby Cron Restriction:**
  - Independent of Fluid Compute, Vercel enforces a **hard platform validation rule: Hobby plans are restricted to daily cron expressions (`0 0 * * *`)**. This restriction is enforced during deployment manifest parsing, regardless of function execution duration.
* **Engineering Determination:**
  - Relying on implicit platform defaults creates architectural ambiguity.
  - The worker remediation must incorporate an **internal software-level execution budget (20 seconds)**. This guarantees safe termination within legacy 60s bounds, modern 300s bounds, or edge-case network partitions without relying on platform termination.

---

## 3. Phase 2 — Attempt-Count Defect Resolution & Precise Trace

### 3.1 Defect Root Cause Analysis
A code conflict exists between PostgreSQL stored procedures and TypeScript handler logic:

1. **SQL RPC Increment:**  
   In `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Line 201), the atomic claim query increments `attempt_count`:
   ```sql
   UPDATE public.inquiry_outbox o
   SET status = 'PROCESSING',
       ...
       attempt_count = o.attempt_count + 1,  -- INCREMENT #1 IN SQL
       updated_at = pg_catalog.timezone('utc'::pg_catalog.text, pg_catalog.now())
   FROM claimable
   WHERE o.id = claimable.id
   RETURNING o.*;  -- Returns o.attempt_count ALREADY incremented!
   ```
2. **TypeScript Redundant Increment:**  
   In `api/cron/retry-failed-inquiries.ts` (Lines 364–365), upon dispatch failure:
   ```typescript
   const newAttemptCount = (event.attempt_count || 0) + 1; // INCREMENT #2 IN TYPESCRIPT!
   const isDeadLetter = newAttemptCount >= (event.max_attempts || 5);
   ```
3. **Database Write-Back:**  
   In `api/cron/retry-failed-inquiries.ts` (Line 387), `newAttemptCount` is patched back to the database.

**Result:** Every failed execution increments `attempt_count` by **2**. Jobs exhaust their 5-attempt budget and enter `DEAD_LETTER` after only **3 attempts**, losing 40% of their intended retry resilience.

---

### 3.2 Execution Trace: Current (Defective) vs. Corrected

#### A. Current Implementation Trace (Premature Dead-Lettering at Run 3)
*Initial Condition: Job enqueued with `attempt_count = 0`, `max_attempts = 5`.*

| Run # | Start DB Count | RPC Claim (`+1`) | Event Count Seen by TS | TS Calculation (`event + 1`) | Dead-Letter Check (`count >= 5`) | DB Status Written | DB Count Written | Backoff Delay Applied | Evaluation |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **Run 1** | 0 | 1 | 1 | **2** | `2 >= 5` (False) | `FAILED` | **2** | $2^2 \times 2 = 8\text{m}$ (Skipped 4m!) | Defect: Jumped from 0 to 2. |
| **Run 2** | 2 | 3 | 3 | **4** | `4 >= 5` (False) | `FAILED` | **4** | $2^4 \times 2 = 32\text{m}$ (Skipped 16m!) | Defect: Jumped from 2 to 4. |
| **Run 3** | 4 | 5 | 5 | **6** | `6 >= 5` (**True**) | `DEAD_LETTER` | **6** | Stalled (DLQ) | **Premature exhaustion! Retired after 3 attempts.** |
| **Run 4** | 6 | - | - | - | - | `DEAD_LETTER` | 6 | - | Never claimed. Attempt 4 never executed. |
| **Run 5** | 6 | - | - | - | - | `DEAD_LETTER` | 6 | - | Never claimed. Attempt 5 never executed. |

#### B. Corrected Implementation Trace (Exact 5 Permitted Attempts)
*Correction: TypeScript treats `event.attempt_count` as authoritative (incremented by RPC upon claim).*

```typescript
// Corrected logic in api/cron/retry-failed-inquiries.ts:
const currentAttempts = event.attempt_count || 1;
const isDeadLetter = currentAttempts >= (event.max_attempts || 5);
```

| Run # | Start DB Count | RPC Claim (`+1`) | Event Count Seen by TS | TS Evaluation (`currentAttempts`) | Dead-Letter Check (`count >= 5`) | DB Status Written | DB Count Written | Backoff Delay Applied | Evaluation |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **Run 1** | 0 | 1 | 1 | **1** | `1 >= 5` (False) | `FAILED` | **1** | $2^1 \times 2 = 4\text{m}$ | Attempt 1 executed. Next retry in 4m. |
| **Run 2** | 1 | 2 | 2 | **2** | `2 >= 5` (False) | `FAILED` | **2** | $2^2 \times 2 = 8\text{m}$ | Attempt 2 executed. Next retry in 8m. |
| **Run 3** | 2 | 3 | 3 | **3** | `3 >= 5` (False) | `FAILED` | **3** | $2^3 \times 2 = 16\text{m}$ | Attempt 3 executed. Next retry in 16m. |
| **Run 4** | 3 | 4 | 4 | **4** | `4 >= 5` (False) | `FAILED` | **4** | $2^4 \times 2 = 32\text{m}$ | Attempt 4 executed. Next retry in 32m. |
| **Run 5** | 4 | 5 | 5 | **5** | `5 >= 5` (**True**) | `DEAD_LETTER` | **5** | Stalled (DLQ) | **Exactly 5 attempts executed! Safely retired.** |
| **Run 6** | 5 | - | - | - | - | `DEAD_LETTER` | 5 | - | Properly isolated. Available for manual recovery. |

---

## 4. Phase 3 — Batch Execution & Capacity Design

### 4.1 Bounded Execution Budget Architecture
Instead of relying on platform timeouts to kill the process, the worker implements an **Internal Execution Watchdog**:

```typescript
const START_TIME = Date.now();
const MAX_EXECUTION_BUDGET_MS = 20000; // 20 seconds ceiling
const RESEND_PACING_DELAY_MS = 550;   // Pacing for Resend rate limit safety (~1.8 req/sec)
```

### 4.2 Handling Partial Batches & Lease Recovery
1. **Per-Item State Commit:** The worker updates the status of each job in Supabase immediately after its dispatch attempt (`status = 'SENT'` or `status = 'FAILED'`).
2. **Watchdog Interruption:** Before starting dispatch for job $i$, the worker evaluates:
   ```typescript
   if (Date.now() - START_TIME > MAX_EXECUTION_BUDGET_MS) {
     console.warn(`[WATCHDOG_CEILING] Execution budget reached. Releasing remaining ${claimedEvents.length - i} jobs.`);
     // Explicitly release remaining claimed jobs back to PENDING:
     await releaseUnprocessedJobs(unprocessedJobIds, supabaseUrl, supabaseServiceRoleKey);
     break;
   }
   ```
3. **Fail-Safe Crash Recovery:** If the serverless node dies abruptly (e.g. fatal host SIGKILL), the 180-second PostgreSQL lease (`lease_expires_at`) guarantees that the uncompleted jobs will automatically become claimable in the subsequent cron run. No jobs are lost or permanently locked.
4. **Resend Rate Limit Protection:** An asynchronous sleep of `550ms` between sequential dispatches caps dispatch frequency at ~1.8 requests/second, remaining safely below Resend's 2.0 requests/second free-tier threshold.

---

## 5. Phase 4 — Supabase Scheduler Architecture

Because Vercel Hobby accounts reject `schedule: "*/10 * * * *"` in `vercel.json`, the scheduling responsibility is shifted to PostgreSQL native extensions.

### 5.1 Architecture Stack
- **`pg_cron`**: Triggers recurring SQL execution inside PostgreSQL every 10 minutes (`*/10 * * * *`).
- **`pg_net`**: Makes non-blocking, asynchronous HTTP `POST` requests to the Vercel function.
- **`supabase_vault`**: Stores the target endpoint URL and `CRON_SECRET` encrypted at rest with AES-GCM.
- **Vercel Endpoint (`api/cron/retry-failed-inquiries.ts`)**: Reused without modifications to its authentication interface.

### 5.2 Secret Management via Supabase Vault
No credentials, secrets, or API keys are placed in Git repository files. Secrets are stored in the database vault:

```sql
-- Vault Secrets Setup (Executed once via Supabase SQL Editor or Dashboard)
SELECT vault.create_secret(
  'https://shivom-global-website.vercel.app/api/cron/retry-failed-inquiries',
  'inquiry_outbox_endpoint_url',
  'Production Vercel endpoint for outbox retry worker'
);

SELECT vault.create_secret(
  '<ACTUAL_PRODUCTION_CRON_SECRET>',
  'inquiry_outbox_cron_secret',
  'Bearer token for authenticating outbox retry invocations'
);
```

### 5.3 Asynchronous Non-Blocking Execution via `pg_net`
Inside PostgreSQL, the scheduled job executes `net.http_post()`. Because `pg_net` is asynchronous:
1. The SQL query completes in $< 5\text{ms}$, returning a numeric `request_id`.
2. PostgreSQL holds zero connection or row locks while the HTTP request is in-flight.
3. The `pg_net` background worker executes the HTTP request against Vercel.
4. HTTP response status and headers are written to `net._http_response`.

```sql
-- Scheduled Job Definition
SELECT cron.schedule(
  'inquiry-outbox-10min-retry',
  '*/10 * * * *',
  $$
  SELECT net.http_post(
    url := (
      SELECT decrypted_secret 
      FROM vault.decrypted_secrets 
      WHERE name = 'inquiry_outbox_endpoint_url' 
      LIMIT 1
    ),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (
        SELECT decrypted_secret 
        FROM vault.decrypted_secrets 
        WHERE name = 'inquiry_outbox_cron_secret' 
        LIMIT 1
      )
    ),
    body := jsonb_build_object('source', 'supabase_pg_cron', 'scheduled_at', now())
  ) AS request_id;
  $$
);
```

---

## 6. Phase 5 — Migration and Operational Safety Specification

### 6.1 Database Migration: `20261105000000_inquiry_outbox_scheduler.sql`

```sql
-- ==============================================================================
-- SHIVOM GLOBAL — Inquiry Outbox Scheduler & Vault Automation Migration
-- Migration: 20261105000000_inquiry_outbox_scheduler.sql
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;

-- 2. Grant Permissions to service_role and postgres
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT USAGE ON SCHEMA net TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- 3. Create Scheduler Function with Failure Handling
CREATE OR REPLACE FUNCTION public.invoke_inquiry_outbox_worker()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault, net, extensions
AS $$
DECLARE
  v_url TEXT;
  v_secret TEXT;
  v_request_id BIGINT;
BEGIN
  -- Retrieve decrypted secrets from Supabase Vault
  SELECT decrypted_secret INTO v_url 
  FROM vault.decrypted_secrets 
  WHERE name = 'inquiry_outbox_endpoint_url' 
  LIMIT 1;

  SELECT decrypted_secret INTO v_secret 
  FROM vault.decrypted_secrets 
  WHERE name = 'inquiry_outbox_cron_secret' 
  LIMIT 1;

  -- Safety Gate: Abort if vault secrets are not configured
  IF v_url IS NULL OR v_secret IS NULL THEN
    RAISE WARNING '[OUTBOX_SCHEDULER] Vault secrets missing. Invocation skipped.';
    RETURN NULL;
  END IF;

  -- Dispatch asynchronous HTTP request
  SELECT net.http_post(
    url := v_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_secret
    ),
    body := jsonb_build_object(
      'source', 'supabase_pg_cron',
      'invoked_at', timezone('utc'::text, now())
    )
  ) INTO v_request_id;

  RETURN v_request_id;
END;
$$;

-- 4. Register Recurring Cron Schedule (Every 10 minutes)
-- First unschedule any existing instance to ensure idempotency
SELECT cron.unschedule('inquiry-outbox-10min-retry')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'inquiry-outbox-10min-retry');

SELECT cron.schedule(
  'inquiry-outbox-10min-retry',
  '*/10 * * * *',
  'SELECT public.invoke_inquiry_outbox_worker();'
);
```

---

### 6.2 Monitoring and Health Inspection Procedures

#### A. Inspect Scheduler Invocations & Errors
```sql
-- Check last 10 pg_cron execution results
SELECT jobid, runid, job_pid, status, return_message, start_time, end_time
FROM cron.job_run_details
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'inquiry-outbox-10min-retry')
ORDER BY start_time DESC
LIMIT 10;
```

#### B. Inspect HTTP Request Delivery & Vercel HTTP Status Codes
```sql
-- Check HTTP delivery logs from pg_net
SELECT id, status_code, content::json, error_msg, created
FROM net._http_response
ORDER BY created DESC
LIMIT 10;
```

#### C. Inspect Outbox Queue Status
```sql
-- Summary of queue states
SELECT status, count(*), min(created_at) AS oldest_entry, max(created_at) AS newest_entry
FROM public.inquiry_outbox
GROUP BY status;
```

#### D. Manual Recovery of Dead-Letter Records
```sql
-- Triage and recover records after addressing upstream email issues
UPDATE public.inquiry_outbox
SET status = 'PENDING',
    attempt_count = 0,
    next_retry_at = timezone('utc', now()),
    last_error = NULL,
    locked_at = NULL,
    locked_by = NULL,
    lease_expires_at = NULL,
    updated_at = timezone('utc', now())
WHERE status = 'DEAD_LETTER';
```

---

### 6.3 Test & Verification Protocol (Without Production Side-Effects)

To verify the remediation safely without spamming the real trade desk:
1. **Local Test Rig:**  
   Run `npm run dev`. Send a test submission with a dummy company name and verify in Supabase that `inquiry_outbox` creates a record.
2. **Authentication Gate Test:**
   ```bash
   # Test invalid auth (must return HTTP 401)
   curl -i -X POST https://shivom-global-website.vercel.app/api/cron/retry-failed-inquiries \
     -H "Authorization: Bearer invalid-secret"

   # Test valid auth (must return HTTP 200 with batch metrics)
   curl -i -X POST https://shivom-global-website.vercel.app/api/cron/retry-failed-inquiries \
     -H "Authorization: Bearer <ACTUAL_CRON_SECRET>"
   ```
3. **Execution Budget Verification:**  
   Temporarily set `MAX_EXECUTION_BUDGET_MS = 1000` in a test branch to verify that the watchdog breaks the loop gracefully and returns HTTP 200 with `skipped` counts without timing out.
4. **Attempt-Count Transition Verification:**  
   Insert a test outbox row with an intentionally invalid recipient email (`invalid-test@domain.invalid`). Trigger the worker 5 times consecutively. Verify in Supabase that `attempt_count` progresses: $1 \to 2 \to 3 \to 4 \to 5$ and status transitions from `PENDING` $\to$ `FAILED` $\to$ `DEAD_LETTER` strictly on attempt 5.

---

### 6.4 Deployment Sequence

```
Step 1: Populate Supabase Vault
  │     - Insert 'inquiry_outbox_endpoint_url' and 'inquiry_outbox_cron_secret' in Supabase Vault.
  ▼
Step 2: Apply Supabase Migration
  │     - Run 20261105000000_inquiry_outbox_scheduler.sql in Supabase SQL editor.
  │     - Verify cron.job has 'inquiry-outbox-10min-retry'.
  ▼
Step 3: Update api/cron/retry-failed-inquiries.ts
  │     - Apply attempt-count fix (remove redundant +1).
  │     - Implement watchdog execution budget (20s ceiling).
  │     - Implement 550ms inter-dispatch pacing.
  ▼
Step 4: Update vercel.json
  │     - Remove the "crons" block from vercel.json.
  │     - Add "functions": { "api/cron/retry-failed-inquiries.ts": { "maxDuration": 60 } }.
  ▼
Step 5: Deploy & Build Verification
  │     - Git push and trigger Vercel deployment.
  │     - Confirm deployment builds cleanly with ZERO cron quota errors.
  ▼
Step 6: Live Smoke Test
        - Observe cron.job_run_details and net._http_response.
        - Verify HTTP 200 response from Vercel endpoint.
```

---

### 6.5 Rollback Strategy

If any unforeseen issue arises after deployment:

1. **Immediate Scheduler Pause (0 Downtime):**
   ```sql
   SELECT cron.unschedule('inquiry-outbox-10min-retry');
   ```
   *Result:* Instantly stops all background invocations without affecting website operations or form submissions.
2. **Revert to Daily Vercel Cron (If Desired):**
   Add back to `vercel.json`:
   ```json
   "crons": [
     {
       "path": "/api/cron/retry-failed-inquiries",
       "schedule": "0 0 * * *"
     }
   ]
   ```
3. **Data Integrity Guarantee:**  
   The `inquiry_outbox` table and `buyer_requirements` system of record remain 100% intact throughout all steps. No buyer leads or commercial requirements can be lost.

---

## 7. Compliance Checklist

- [x] Verified Vercel runtime configuration, Fluid Compute behavior, and Hobby limitations.
- [x] Provided exact mathematical execution trace of attempt-count transitions (Current vs. Corrected).
- [x] Designed watchdog execution budget protecting against platform timeouts.
- [x] Designed 550ms dispatch pacing for Resend API rate-limit compliance.
- [x] Outlined complete Supabase `pg_cron` + `pg_net` + `supabase_vault` scheduler architecture.
- [x] Guaranteed zero credentials hardcoded in migration files or Git.
- [x] Delivered complete SQL migration script and rollback procedures.
- [x] Strictly adhered to inspection and specification rules (zero production mutations).

