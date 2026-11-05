# SHIVOM GLOBAL — Inquiry Outbox Retry Worker Reliability Review

**Document Version:** 1.0.0  
**Audit Date:** November 5, 2026  
**Target Subsystem:** Transactional Outbox Background Retry Worker  
**Component Files:**
- `api/cron/retry-failed-inquiries.ts` (Vercel Cron / Node.js Serverless Function)
- `api/buyer-requirements.ts` (Primary Commercial Inquiry Ingestion Endpoint)
- `vercel.json` (Platform Routing and Cron Configuration)
- `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (PostgreSQL Schema, Indexes, Triggers & RPC Locking)

---

## 1. Executive Summary & Definitive Verdict

### Definitive Conclusion:
```
SAFE WITH REQUIRED CORRECTIONS
```

### High-Level Evaluation:
The inquiry outbox architecture implemented in `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` and `api/cron/retry-failed-inquiries.ts` is fundamentally well-engineered, utilizing transactional decoupling, database-level triggers, PostgreSQL row locking (`FOR UPDATE SKIP LOCKED`), and worker leases.

However, **deploying the worker under a once-per-day Vercel Cron schedule (`0 0 * * *`) in its current code state is unsafe without specific corrections.** While it will not produce duplicate emails or corrupt database state, it contains two critical runtime defects and an operational capacity bottleneck that will cause job failures, premature job exhaustion, and backlog starvation under daily execution:

1. **Vercel Serverless Function Execution Timeout (Critical Severity):**  
   On Vercel Hobby accounts, functions enforce a hard **10-second timeout**. The worker processes up to 10 jobs sequentially with an `EMAIL_TIMEOUT_MS` of 4,000ms ($10 \times 4\text{s} = 40\text{s}$) plus database round-trips. If 2–3 requests encounter network latency, the function will be hard-killed mid-execution (HTTP 504 Gateway Timeout), leaving jobs locked in `PROCESSING` state until lease expiration.
2. **Double Attempt-Count Increment Defect (High Severity):**  
   The PostgreSQL RPC `claim_inquiry_outbox_jobs` increments `attempt_count` upon claiming (`attempt_count = o.attempt_count + 1`). When dispatch fails, `retry-failed-inquiries.ts` increments it **again** (`newAttemptCount = (event.attempt_count || 0) + 1`). As a result, failed jobs increment by 2 on each run, exhausting their `max_attempts = 5` and moving to `DEAD_LETTER` after only **2 to 3 failed runs** instead of the documented 5.
3. **Queue Starvation / Daily Throughput Ceiling (Medium-High Severity):**  
   `BATCH_SIZE` is fixed at 10. The worker does not paginate or loop to drain the queue. Running once every 24 hours caps system recovery at **10 retries per day**. Any backlog exceeding 10 failed jobs is pushed back 24 to 48+ hours.
4. **Commercial Trade Desk SLA Latency (Operational Risk):**  
   A 24-hour retry interval means that if a synchronous alert fails at 09:00 AM, the trade desk will not receive the inquiry notification until the following night (up to 24-hour delay), impacting wholesale buyer conversion.

Once the identified corrections are applied (detailed in Section 5), the worker can safely operate on a daily schedule as a secondary safety net.

---

## 2. In-Depth Verification of the 10 Reliability Criteria

### Criterion 1: Maximum Retry Attempts & Exponential Backoff Calculation
* **Source Code References:**
  - `api/cron/retry-failed-inquiries.ts` (Lines 49–51, 364–375)
  - `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Line 52)
* **Code Implementation:**
  ```typescript
  // api/cron/retry-failed-inquiries.ts
  function calculateBackoffMinutes(attemptCount: number): number {
    return Math.min(120, Math.pow(2, Math.max(1, attemptCount)) * 2);
  }
  // Formula: min(120m, 2^attempt * 2) -> 4m, 8m, 16m, 32m, 64m, 120m
  ```
  ```typescript
  const newAttemptCount = (event.attempt_count || 0) + 1;
  const isDeadLetter = newAttemptCount >= (event.max_attempts || 5);
  ```
* **Evaluation for Daily Cron:**
  - **Mathematical Soundness:** The backoff progression ($4\text{m} \to 8\text{m} \to 16\text{m} \to 32\text{m} \to 64\text{m}$, capped at $120\text{m}$) is mathematically stable with no numeric overflow risk.
  - **Operational Impact of 24h Interval:** Under a daily cron, the calculated delay (max 2 hours) is completely superseded by the 24-hour (1,440-minute) cron interval. Every failed attempt is delayed by a full calendar day regardless of the backoff value.
  - **Attempt Limit:** `max_attempts` defaults to 5. Under a daily cron, an item failing 5 times would take 5 full days to reach `DEAD_LETTER`.

---

### Criterion 2: Daily Execution Safety for Eligible Pending & Failed Records
* **Source Code References:**
  - `api/cron/retry-failed-inquiries.ts` (Lines 29, 265, 308–419)
  - `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Lines 184–195)
* **Code Implementation:**
  ```typescript
  const BATCH_SIZE = 10;
  // ...
  body: JSON.stringify({
    p_batch_size: BATCH_SIZE,
    p_worker_id: workerId,
    p_lease_seconds: LEASE_DURATION_SECONDS,
  }),
  ```
  ```sql
  -- claim_inquiry_outbox_jobs RPC
  WHERE (
    (status IN ('PENDING', 'FAILED') AND next_retry_at <= pg_catalog.timezone('utc'::pg_catalog.text, pg_catalog.now()))
    OR
    (status = 'PROCESSING' AND lease_expires_at < pg_catalog.timezone('utc'::pg_catalog.text, pg_catalog.now()))
  )
  ORDER BY next_retry_at ASC
  LIMIT p_batch_size
  ```
* **Evaluation for Daily Cron:**
  - **Verdict:** **UNSAFE AS-IS**.
  - **Evidence:** The worker claims at most 10 jobs per execution (`LIMIT 10`) and executes a single unlooped pass. There is no pagination or while loop.
  - If more than 10 records accumulate in `PENDING` or `FAILED` status within 24 hours (e.g. during a Resend outage or DNS failure), the daily cron will process only the first 10. The 11th record and beyond will be delayed by an additional 24 hours.

---

### Criterion 3: Risk of Permanently Stranded Jobs
* **Source Code References:**
  - `api/cron/retry-failed-inquiries.ts` (Lines 364–366, 386)
  - `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Lines 187–191, 201)
* **Evaluation:**
  - **Dead-Letter State:** Once an event reaches `status = 'DEAD_LETTER'`, `claim_inquiry_outbox_jobs` will **never** claim it again because the query strictly filters `WHERE status IN ('PENDING', 'FAILED')`. This is deliberate and prevents bad data (e.g. invalid recipient addresses) from causing infinite retry loops.
  - **Double-Increment Flaw (Premature Stranding):**
    1. In `claim_inquiry_outbox_jobs` (SQL Line 201):
       `attempt_count = o.attempt_count + 1` (increments count when claimed).
    2. In `retry-failed-inquiries.ts` (Line 364):
       `const newAttemptCount = (event.attempt_count || 0) + 1;` (increments count a second time).
    3. In `retry-failed-inquiries.ts` (Line 387):
       `attempt_count: newAttemptCount` (writes the doubly-incremented count back to Supabase).
    - **Result:** On Attempt 1 failure, `attempt_count` becomes 2. On Attempt 2 failure, it becomes 4. On Attempt 3 failure, it becomes 6 $\ge 5$, causing the job to be prematurely marked `DEAD_LETTER` after only **3 attempts**, not 5.
  - **Lease Lock Recovery:** If a worker terminates abruptly, the lease lock mechanism safely expires after 180 seconds (`lease_expires_at < now()`). The record is not permanently stranded by a crash and will be re-claimed in the next run.

---

### Criterion 4: Availability of Failed Records for Manual Recovery
* **Source Code References:**
  - `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Lines 32–68, 93–96)
  - `api/buyer-requirements.ts` (Lines 579–603, 730–748)
* **Code Implementation:**
  ```sql
  -- Dedicated audit index for triage
  CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_failed
    ON public.inquiry_outbox (created_at DESC)
    WHERE status IN ('FAILED', 'DEAD_LETTER');
  ```
* **Evaluation:**
  - **Verdict:** **EXCELLENT (100% Retrievable).**
  - **Evidence:**
    1. The `buyer_requirements` system of record table retains all inquiry submissions indefinitely with `email_sent = false` and `email_error`.
    2. The `inquiry_outbox` table stores the full original submission payload in JSONB (`payload`), the reference ID, recipient email, timestamp, and the sanitized error string (`last_error`).
    3. The partial index `idx_inquiry_outbox_failed` provides instant indexing for administrative recovery queries.
    4. Manual recovery is straightforward:
       ```sql
       UPDATE public.inquiry_outbox
       SET status = 'PENDING', attempt_count = 0, next_retry_at = timezone('utc', now())
       WHERE status = 'DEAD_LETTER';
       ```

---

### Criterion 5: Duplicate Email Prevention & Idempotency
* **Source Code References:**
  - `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Lines 21–22, 67, 124–142, 194)
  - `api/buyer-requirements.ts` (Lines 652–666, 677–689)
  - `api/cron/retry-failed-inquiries.ts` (Lines 321–340)
* **Code Implementation:**
  ```sql
  -- Outbox event uniqueness guarantee
  CONSTRAINT uq_inquiry_outbox_event UNIQUE (inquiry_id, notification_type)
  ```
  ```sql
  -- Trigger idempotency
  INSERT INTO public.inquiry_outbox (...)
  VALUES (...)
  ON CONFLICT (inquiry_id, notification_type) DO NOTHING;
  ```
* **Evaluation:**
  - **Verdict:** **FULLY IDEMPOTENT & PROTECTED AGAINST DUPLICATES.**
  - **Evidence:**
    1. Client-generated `idempotency_key` ensures rapid form resubmissions do not duplicate entries in `buyer_requirements`.
    2. The unique constraint `uq_inquiry_outbox_event (inquiry_id, notification_type)` guarantees that exactly one outbox event exists per notification type per inquiry.
    3. Once an email is dispatched (either synchronously or via retry), the outbox row is updated to `status = 'SENT'`. Rows with `status = 'SENT'` are permanently excluded from future claims.
    4. Row-level locking (`FOR UPDATE SKIP LOCKED`) prevents multiple workers from claiming or dispatching the same event concurrently.

---

### Criterion 6: Database Locking & Concurrent Worker Safety
* **Source Code References:**
  - `supabase/migrations/20261104000000_inquiry_reliability_hardening.sql` (Lines 172–207)
  - `api/cron/retry-failed-inquiries.ts` (Lines 251–291)
* **Code Implementation:**
  ```sql
  WITH claimable AS (
    SELECT id 
    FROM public.inquiry_outbox
    WHERE (...)
    ORDER BY next_retry_at ASC
    LIMIT p_batch_size
    FOR UPDATE SKIP LOCKED
  )
  UPDATE public.inquiry_outbox o
  SET status = 'PROCESSING',
      locked_at = pg_catalog.timezone('utc'::pg_catalog.text, pg_catalog.now()),
      locked_by = p_worker_id,
      lease_expires_at = pg_catalog.timezone('utc'::pg_catalog.text, pg_catalog.now()) + (p_lease_seconds || ' seconds')::pg_catalog.interval,
      attempt_count = o.attempt_count + 1,
      updated_at = pg_catalog.timezone('utc'::pg_catalog.text, pg_catalog.now())
  FROM claimable
  WHERE o.id = claimable.id
  RETURNING o.*;
  ```
* **Evaluation:**
  - **Verdict:** **SAFE (RPC Path) / CAUTION (Fallback Path).**
  - **Evidence:**
    1. The primary locking mechanism uses `FOR UPDATE SKIP LOCKED` inside a single atomic SQL CTE. Two workers invoking the RPC simultaneously will receive completely disjoint sets of records without blocking each other.
    2. Each lease is tagged with a unique `workerId` (`worker-${Date.now()}-${randomBytes}`) and expires after 180 seconds.
    3. **Fallback Path Caution:** Lines 275–290 contain a direct REST fallback query (`/rest/v1/inquiry_outbox?status=in.(PENDING,FAILED)...`) executed if the RPC is unavailable. This fallback does not lock rows at read time. In production, the RPC is verified to exist, so the fallback is not invoked under normal operation.

---

### Criterion 7: HTTP Method Support (GET vs POST)
* **Source Code References:**
  - `api/cron/retry-failed-inquiries.ts` (Lines 185–230)
  - `api/buyer-requirements.ts` (Lines 373–379 for comparison)
  - `vercel.json` (Lines 5–10)
* **Code Implementation:**
  ```typescript
  // api/cron/retry-failed-inquiries.ts
  export default async function handler(
    req: IncomingMessage & { query?: unknown },
    res: ServerResponse
  ) {
    // Authenticates Bearer token; NO check on req.method
  ```
* **Evaluation:**
  - **Verdict:** **SUPPORTS GET AND POST.**
  - **Evidence:**
    1. Vercel Cron sends **HTTP GET** requests with an `Authorization: Bearer <CRON_SECRET>` header.
    2. Unlike `api/buyer-requirements.ts` (which explicitly rejects non-POST requests with HTTP 405), `api/cron/retry-failed-inquiries.ts` does not inspect `req.method`.
    3. The endpoint successfully accepts GET requests initiated by Vercel Cron, as well as POST requests used in local testing and webhooks.

---

### Criterion 8: Batch Limits & Queue Starvation
* **Source Code References:**
  - `api/cron/retry-failed-inquiries.ts` (Lines 29, 265, 308, 421)
* **Evaluation:**
  - **Verdict:** **VULNERABLE UNDER DAILY CRON SCHEDULE.**
  - **Analysis:**
    - Under a 10-minute cron (`*/10 * * * *`), processing 10 items per run yielded a theoretical capacity of:
      $$\text{Capacity} = 10 \times 6 \times 24 = 1,440\text{ retries/day}$$
    - Under a once-daily cron (`0 0 * * *`), the capacity is reduced by **99.3%**:
      $$\text{Capacity} = 10 \times 1 = 10\text{ retries/day}$$
    - There is no loop to drain remaining records. If a network event causes 25 failures on a given day:
      - Day 1: 10 processed (15 remain).
      - Day 2: 10 processed (5 remain).
      - Day 3: 5 processed.
    - Recovering from a modest incident takes 3 full days.

---

### Criterion 9: Execution Timeout & Resend Rate Limits
* **Source Code References:**
  - `api/cron/retry-failed-inquiries.ts` (Lines 31, 32, 167, 308–361)
  - `vercel.json`
* **Code Implementation:**
  ```typescript
  const BATCH_SIZE = 10;
  const EMAIL_TIMEOUT_MS = 4000; // 4s timeout per email
  const DB_TIMEOUT_MS = 6000;    // 6s timeout per DB write
  
  for (const event of claimedEvents) {
    const dispatchResult = await dispatchTradeDeskAlert(event); // await #1
    await fetch(patchOutbox, ...);                               // await #2
    await fetch(patchReq, ...);                                  // await #3
  }
  ```
* **Evaluation:**
  - **Verdict:** **CRITICAL TIMEOUT RISK ON VERCEL HOBBY.**
  - **Evidence:**
    1. **Vercel Hobby Serverless Function Ceiling:** Standard timeout is **10 seconds** (maximum configurable is 15 seconds).
    2. **Serial Latency Worst-Case:**
       The loop dispatches emails sequentially. In an outage or degradation scenario where Resend or DNS is unresponsive:
       $$\text{Max Email Latency} = 10 \times 4,000\text{ms} = 40,000\text{ms} = 40\text{ seconds}$$
       $$\text{Max DB Latency} = 10 \times 2 \times 6,000\text{ms} = 120,000\text{ms} = 120\text{ seconds}$$
    3. Even under moderate latency (e.g., 3 emails taking 3.5s each), the total runtime exceeds 10.5 seconds, triggering an immediate **HTTP 504 Function Timeout** from Vercel's edge proxy.
    4. When terminated by timeout, the worker exits ungracefully. Claimed records remain in `PROCESSING` status until their 180s lease expires, and downstream updates are aborted.
  - **Resend Rate Limits:** Resend allows 2 requests/second on free tiers. Because the loop is sequential with awaiting network responses, it rarely exceeds 2 req/s, making rate limiting a minor concern compared to function timeouts.

---

### Criterion 10: Validation of Claimed 99%+ Synchronous Email Success Rate
* **Source Code References:**
  - `api/buyer-requirements.ts` (Lines 671–748)
* **Evaluation:**
  - **Verdict:** **UNSUPPORTED BY REPOSITORY METRICS (THEORETICAL ASSUMPTION).**
  - **Evidence:**
    1. The codebase contains **no telemetry pipeline, log draining configuration, or persistent metrics** tracking historical email dispatch success vs. failure rates.
    2. Resend's platform availability SLA (>99.9%) is cited as the basis for the 99%+ figure. However, in serverless runtime environments, synchronous dispatch success is also subject to:
       - Cold start initialization overhead competing with the 4,000ms `EMAIL_TIMEOUT_MS`.
       - Transient DNS resolution delays in AWS/Vercel regions.
       - Misconfigured or rotated `EMAIL_API_KEY` credentials.
    3. **Commercial Implication:** Because the 99%+ figure cannot be verified from production telemetry, relying on a daily cron as the sole retry mechanism exposes the trade desk to undetected 24-hour notification delays if synchronous dispatch encounters systemic failures.

---

## 3. Summary of Findings & Vulnerabilities

| ID | Category | Severity | Description | Impact on Daily Cron |
|:---|:---|:---:|:---|:---|
| **VULN-01** | Runtime Timeout | **CRITICAL** | Sequential execution of 10 dispatches with 4s timeouts exceeds Vercel's 10s Hobby limit. | Worker hard-killed with HTTP 504; jobs left in `PROCESSING` state. |
| **VULN-02** | Logic Defect | **HIGH** | Double-increment of `attempt_count` (RPC + TS worker) exhausts attempts prematurely. | Jobs retired to `DEAD_LETTER` after 2–3 runs instead of 5. |
| **VULN-03** | Architecture | **MEDIUM-HIGH** | Fixed batch size of 10 without pagination caps daily throughput to 10 retries/day. | Backlog clearing delayed by days if >10 records accumulate. |
| **VULN-04** | Business SLA | **MEDIUM** | 24-hour inter-execution window delays trade desk notifications for failed initial dispatches. | Buyer response times stretched up to 24 hours. |
| **VULN-05** | Observability | **LOW** | Lack of integrated metrics to verify real-world synchronous delivery success rate. | Blind spot regarding actual retry volume and frequency. |

---

## 4. Required Corrections for Daily Cron Safety

To safely operate `api/cron/retry-failed-inquiries.ts` on a daily Vercel Cron schedule (`0 0 * * *`), the following corrections are required:

### Correction 1: Fix the Double Attempt-Count Increment Defect
In `api/cron/retry-failed-inquiries.ts` (Lines 364–365):
```typescript
// CURRENT (DEFECTIVE):
const newAttemptCount = (event.attempt_count || 0) + 1; // event.attempt_count was ALREADY incremented by RPC

// REQUIRED CORRECTION:
// The RPC claim_inquiry_outbox_jobs already incremented attempt_count by 1 upon claiming.
// Use event.attempt_count directly without incrementing again:
const currentAttemptCount = event.attempt_count || 1;
const isDeadLetter = currentAttemptCount >= (event.max_attempts || 5);
```

### Correction 2: Prevent Serverless Execution Timeouts
To ensure the function completes within Vercel's 10-second ceiling:
1. **Reduce Batch Size for Daily Cron:** Change `BATCH_SIZE = 10` to `BATCH_SIZE = 5` in `retry-failed-inquiries.ts`, OR
2. **Execute Concurrent/Batched Dispatches:** Use `Promise.allSettled` in small batches of 3, with an `AbortSignal.timeout(2500)` per dispatch, OR
3. **Configure Function Timeout in `vercel.json`:**
   ```json
   {
     "functions": {
       "api/cron/retry-failed-inquiries.ts": {
         "maxDuration": 15
       }
     }
   }
   ```
   *(Note: 15 seconds is the maximum allowed on Vercel Hobby).*

### Correction 3: Add Explicit HTTP Method Gate
For security and clarity, verify the HTTP method explicitly in `api/cron/retry-failed-inquiries.ts`:
```typescript
if (req.method !== 'GET' && req.method !== 'POST') {
  sendJsonResponse(405, { success: false, error: 'Method Not Allowed' });
  return;
}
```

### Correction 4: Implement Drain Loop / Secondary Trigger Option
If `BATCH_SIZE` remains bounded to prevent timeouts, implement a self-checking return payload. If `claimedEvents.length === BATCH_SIZE`, the response should flag `hasMore: true` so external monitors or an auxiliary trigger can invoke a follow-up batch if necessary.

---

## 5. Architectural Recommendation for Hobby Tier Compatibility

Because Vercel Hobby accounts enforce a strict limit of **one cron job per day** (`0 0 * * *`), the team has two viable long-term architectures:

```
+-----------------------------------------------------------------------------------+
| OPTION A: Daily Vercel Cron + Corrected Worker (Recommended for Zero New Cost)     |
| - Schedule: "0 4 * * *" (Daily at 04:00 UTC / 09:30 AM IST before business opens) |
| - Apply Corrections 1, 2, and 3 to retry-failed-inquiries.ts                     |
| - Trade-off: Max 24h delay on retried notifications (acceptable if initial sync    |
|   dispatch remains healthy).                                                      |
+-----------------------------------------------------------------------------------+
| OPTION B: Supabase Native pg_cron (Recommended for Real-Time Reliability)         |
| - Supabase includes native pg_cron + pg_net extensions on all tiers.              |
| - A pg_cron job runs every 5 minutes inside PostgreSQL, invoking the outbox       |
|   endpoint via pg_net.http_post() with CRON_SECRET bearer token.                  |
| - Completely bypasses Vercel's Hobby cron frequency restriction.                  |
| - Zero code modifications to the Next.js/Vite frontend application.               |
+-----------------------------------------------------------------------------------+
```

---

## 6. Verification Summary Checklist

- [x] Maximum retry attempts (5) and exponential backoff mathematically verified.
- [x] Queue starvation identified due to `BATCH_SIZE = 10` without drain loop.
- [x] Double-increment bug identified in attempt counter leading to premature DLQ stranding.
- [x] Manual recovery confirmed 100% possible via `buyer_requirements` and `inquiry_outbox`.
- [x] Duplicate email prevention and database locking verified (`FOR UPDATE SKIP LOCKED`).
- [x] HTTP GET method compatibility confirmed for Vercel Cron.
- [x] Vercel 10-second execution timeout vulnerability identified and documented.
- [x] Unverified 99%+ synchronous claim evaluated and contextualized with operational risk.
- [x] Concluded with authoritative verdict: **`SAFE WITH REQUIRED CORRECTIONS`**.

