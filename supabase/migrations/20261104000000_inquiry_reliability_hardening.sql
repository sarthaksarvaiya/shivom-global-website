-- ==============================================================================
-- SHIVOM GLOBAL — Commercial Inquiry Reliability & Outbox Hardening Migration
-- Migration: 20261104000000_inquiry_reliability_hardening.sql
-- Target: public.buyer_requirements (Alteration) & public.inquiry_outbox (New Table)
-- Purpose: Introduce strict idempotency enforcement and an atomic outbox queue
--          for independently retryable trade-desk & buyer notifications.
-- Safety: Non-destructive, backward-compatible with existing schema and application.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- PART 1: Idempotency Enforcement on public.buyer_requirements
-- ------------------------------------------------------------------------------

-- 1. Add idempotency_key column (Nullable for historical records; enforced for new website leads)
ALTER TABLE public.buyer_requirements
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

-- 2. Create unique index for idempotency enforcement
-- Standard PostgreSQL UNIQUE behavior: multiple NULLs are permitted, so existing rows remain valid.
-- When non-null, uniqueness is strictly enforced, enabling safe ON CONFLICT arbitration.
CREATE UNIQUE INDEX IF NOT EXISTS idx_buyer_requirements_idempotency_key
  ON public.buyer_requirements (idempotency_key);

COMMENT ON COLUMN public.buyer_requirements.idempotency_key IS 
  'Client-generated UUID v4 token identifying a single logical submission attempt. Prevents duplicate submissions and duplicate notification dispatch.';

-- ------------------------------------------------------------------------------
-- PART 2: Transactional Notification Outbox Table
-- ------------------------------------------------------------------------------

-- Create public.inquiry_outbox table for decoupling email dispatch from the critical HTTP request path
CREATE TABLE IF NOT EXISTS public.inquiry_outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign key references to the commercial buyer requirement
  inquiry_id UUID NOT NULL REFERENCES public.buyer_requirements(id) ON DELETE CASCADE,
  reference_id TEXT NOT NULL REFERENCES public.buyer_requirements(reference_id) ON DELETE CASCADE,
  
  -- Notification routing and recipient categorization
  notification_type TEXT NOT NULL CHECK (notification_type IN ('TRADE_DESK_ALERT', 'BUYER_ACKNOWLEDGMENT')),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  
  -- State machine: PENDING -> PROCESSING -> SENT (or FAILED -> DEAD_LETTER)
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'SENT', 'FAILED', 'DEAD_LETTER')),
  
  -- Encapsulated message data (snapshot of specifications, subject, and template parameters)
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Retry schedule & backoff metadata
  attempt_count INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 5,
  next_retry_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  last_error TEXT,
  
  -- Concurrency control: Lease lock fields for worker safety (FOR UPDATE SKIP LOCKED)
  locked_at TIMESTAMPTZ,
  locked_by TEXT,
  lease_expires_at TIMESTAMPTZ,
  
  -- Timestamps
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

  -- Duplicate event constraint: Exactly one pending/active notification per type per inquiry
  CONSTRAINT uq_inquiry_outbox_event UNIQUE (inquiry_id, notification_type)
);

-- ------------------------------------------------------------------------------
-- PART 3: Performance & Worker Polling Indexes
-- ------------------------------------------------------------------------------

-- 1. Partial polling index for concurrent outbox workers
-- Optimizes: SELECT ... WHERE status IN ('PENDING', 'FAILED') AND next_retry_at <= now() ORDER BY next_retry_at ASC
CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_polling
  ON public.inquiry_outbox (next_retry_at ASC, status)
  WHERE status IN ('PENDING', 'FAILED');

-- 2. Lease recovery index for stalled or crashed workers
CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_lease_recovery
  ON public.inquiry_outbox (lease_expires_at ASC)
  WHERE status = 'PROCESSING';

-- 3. Lookup index by inquiry foreign key
CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_inquiry_id
  ON public.inquiry_outbox (inquiry_id);

-- 4. Lookup index by commercial reference ID
CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_reference_id
  ON public.inquiry_outbox (reference_id);

-- 5. Audit index for monitoring dead-letter or exhausted messages
CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_failed
  ON public.inquiry_outbox (created_at DESC)
  WHERE status IN ('FAILED', 'DEAD_LETTER');

-- ------------------------------------------------------------------------------
-- PART 4: Atomic Outbox Trigger Function
-- ------------------------------------------------------------------------------

-- Automatically enqueues the TRADE_DESK_ALERT notification event atomically
-- within the exact same database transaction that inserts the buyer inquiry.
CREATE OR REPLACE FUNCTION public.trg_enqueue_inquiry_outbox()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Enqueue internal trade desk alert
  -- (BUYER_ACKNOWLEDGMENT is intentionally omitted until copy & sender configuration are approved)
  INSERT INTO public.inquiry_outbox (
    inquiry_id,
    reference_id,
    notification_type,
    recipient_email,
    recipient_name,
    payload,
    status,
    attempt_count,
    max_attempts,
    next_retry_at
  )
  VALUES (
    NEW.id,
    NEW.reference_id,
    'TRADE_DESK_ALERT',
    COALESCE(NULLIF(pg_catalog.current_setting('app.trade_desk_email', true), ''), 'shivomglobal1010@gmail.com'),
    'SHIVOM GLOBAL Trade Desk',
    pg_catalog.jsonb_build_object(
      'reference_id', NEW.reference_id,
      'company_name', NEW.company_name,
      'contact_name', NEW.contact_name,
      'corporate_email', NEW.corporate_email,
      'phone', NEW.phone,
      'buyer_country', NEW.buyer_country,
      'requirement_type', NEW.requirement_type,
      'tea_category', NEW.tea_category,
      'grade', NEW.grade,
      'quantity', NEW.quantity,
      'packaging_requirements', NEW.packaging_requirements,
      'target_market', NEW.target_market,
      'application', NEW.application,
      'additional_requirements', NEW.additional_requirements,
      'submitted_at', NEW.submitted_at
    ),
    'PENDING',
    0,
    5,
    pg_catalog.timezone('utc'::pg_catalog.text, pg_catalog.now())
  )
  ON CONFLICT (inquiry_id, notification_type) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_buyer_requirements_outbox ON public.buyer_requirements;
CREATE TRIGGER trg_buyer_requirements_outbox
  AFTER INSERT ON public.buyer_requirements
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_enqueue_inquiry_outbox();

-- ------------------------------------------------------------------------------
-- PART 5: Concurrency-Safe Outbox Worker Claim Function (RPC)
-- ------------------------------------------------------------------------------

-- Enables background cron workers to safely claim a bounded batch of jobs
-- using FOR UPDATE SKIP LOCKED. Guarantees zero duplicate processing and
-- recovers expired worker leases.
CREATE OR REPLACE FUNCTION public.claim_inquiry_outbox_jobs(
  p_batch_size INTEGER DEFAULT 10,
  p_worker_id TEXT DEFAULT 'worker',
  p_lease_seconds INTEGER DEFAULT 180
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
      (status IN ('PENDING', 'FAILED') AND next_retry_at <= pg_catalog.timezone('utc'::pg_catalog.text, pg_catalog.now()))
      OR
      (status = 'PROCESSING' AND lease_expires_at < pg_catalog.timezone('utc'::pg_catalog.text, pg_catalog.now()))
    )
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
END;
$$;

-- ------------------------------------------------------------------------------
-- PART 6: Row-Level Security (RLS) & Access Control
-- ------------------------------------------------------------------------------

-- Enable Row-Level Security on outbox
ALTER TABLE public.inquiry_outbox ENABLE ROW LEVEL SECURITY;

-- Deny all access to anon and authenticated public roles
REVOKE ALL ON public.inquiry_outbox FROM anon, authenticated;

-- Grant complete access exclusively to backend service_role
GRANT ALL ON public.inquiry_outbox TO service_role;

-- Grant execute permissions on helper functions to service_role
GRANT EXECUTE ON FUNCTION public.claim_inquiry_outbox_jobs(INTEGER, TEXT, INTEGER) TO service_role;

-- Service Role Policy
DROP POLICY IF EXISTS "Service role full access on inquiry_outbox" ON public.inquiry_outbox;
CREATE POLICY "Service role full access on inquiry_outbox"
  ON public.inquiry_outbox
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- PART 7: Documentation & Table Comments
-- ------------------------------------------------------------------------------

COMMENT ON TABLE public.inquiry_outbox IS 
  'Transactional outbox queue storing asynchronous email notification events for commercial buyer inquiries.';
COMMENT ON COLUMN public.inquiry_outbox.notification_type IS 
  'Routing type: TRADE_DESK_ALERT (internal notification) or BUYER_ACKNOWLEDGMENT (transactional confirmation receipt).';
COMMENT ON COLUMN public.inquiry_outbox.status IS 
  'Lifecycle state: PENDING (queued), PROCESSING (locked by worker), SENT (delivered), FAILED (retryable error), DEAD_LETTER (exhausted attempts).';
COMMENT ON COLUMN public.inquiry_outbox.lease_expires_at IS 
  'Timestamp after which a worker lock expires, permitting stalled or crashed jobs to be reclaimed by healthy workers.';
COMMENT ON FUNCTION public.claim_inquiry_outbox_jobs(INTEGER, TEXT, INTEGER) IS 
  'Atomically claims a batch of pending or expired-lease outbox events for processing using FOR UPDATE SKIP LOCKED.';
