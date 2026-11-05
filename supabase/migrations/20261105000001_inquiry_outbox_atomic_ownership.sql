-- ==============================================================================
-- SHIVOM GLOBAL — Commercial Inquiry Outbox Self-Contained Deployment Migration
-- Migration: 20261105000001_inquiry_outbox_atomic_ownership.sql
-- Target: public.buyer_requirements & public.inquiry_outbox
-- Purpose: Complete, self-contained, idempotent deployment of the transactional outbox:
--   1. Idempotency enforcement on public.buyer_requirements.
--   2. Creation of public.inquiry_outbox table (with authorized_at).
--   3. High-performance polling and lease recovery indexes.
--   4. Automatic enqueue trigger trg_buyer_requirements_outbox (AFTER INSERT).
--   5. 7 Hardened, atomic stored procedures with search_path = '' and SECURITY DEFINER.
--   6. Strict Row-Level Security and execution privileges (service_role only).
--   7. One-time quarantine of historical unsupported events.
-- Safety: Completely non-destructive, idempotent (IF NOT EXISTS / CREATE OR REPLACE).
-- ==============================================================================

-- ============================================================================
-- PART 1: IDEMPOTENCY ENFORCEMENT ON public.buyer_requirements
-- ============================================================================
ALTER TABLE public.buyer_requirements
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_buyer_requirements_idempotency_key
  ON public.buyer_requirements (idempotency_key);

COMMENT ON COLUMN public.buyer_requirements.idempotency_key IS 
  'Client-generated UUID v4 token identifying a single logical submission attempt. Prevents duplicate submissions and duplicate notification dispatch.';

-- ============================================================================
-- PART 2: TRANSACTIONAL OUTBOX TABLE CREATION & ALTERATION
-- ============================================================================
-- Guarantees table exists even if previous migration (20261104000000) was skipped
CREATE TABLE IF NOT EXISTS public.inquiry_outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign key references to commercial buyer requirements
  inquiry_id UUID NOT NULL REFERENCES public.buyer_requirements(id) ON DELETE CASCADE,
  reference_id TEXT NOT NULL REFERENCES public.buyer_requirements(reference_id) ON DELETE CASCADE,
  
  -- Notification routing and recipient categorization
  notification_type TEXT NOT NULL CHECK (notification_type IN ('TRADE_DESK_ALERT', 'BUYER_ACKNOWLEDGMENT')),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  
  -- State machine: PENDING -> PROCESSING -> SENT (or FAILED -> DEAD_LETTER)
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'SENT', 'FAILED', 'DEAD_LETTER')),
  
  -- Encapsulated message data
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
  
  -- Ephemeral authorization marker for strict at-least-once lifecycle
  authorized_at TIMESTAMPTZ,
  
  -- Timestamps
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

  -- Duplicate event constraint: Exactly one pending/active notification per type per inquiry
  CONSTRAINT uq_inquiry_outbox_event UNIQUE (inquiry_id, notification_type)
);

-- Ensure authorized_at exists if table was previously created without it
ALTER TABLE public.inquiry_outbox 
  ADD COLUMN IF NOT EXISTS authorized_at TIMESTAMPTZ;

COMMENT ON TABLE public.inquiry_outbox IS 
  'Transactional outbox queue storing asynchronous email notification events for commercial buyer inquiries.';
COMMENT ON COLUMN public.inquiry_outbox.authorized_at IS 
  'Ephemeral timestamp recording when a worker received database authorization to dispatch. Strictly NULL when unstarted; cleared upon completion, failure, or claim.';

-- ============================================================================
-- PART 3: PERFORMANCE & WORKER POLLING INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_polling
  ON public.inquiry_outbox (next_retry_at ASC, status)
  WHERE status IN ('PENDING', 'FAILED');

CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_lease_recovery
  ON public.inquiry_outbox (lease_expires_at ASC)
  WHERE status = 'PROCESSING';

CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_inquiry_id
  ON public.inquiry_outbox (inquiry_id);

CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_reference_id
  ON public.inquiry_outbox (reference_id);

CREATE INDEX IF NOT EXISTS idx_inquiry_outbox_failed
  ON public.inquiry_outbox (created_at DESC)
  WHERE status IN ('FAILED', 'DEAD_LETTER');

-- ============================================================================
-- PART 4: ATOMIC OUTBOX TRIGGER (AUTO-ENQUEUE ON INTAKE)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.trg_enqueue_inquiry_outbox()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
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

-- ============================================================================
-- PART 5: AUTHORITATIVE BACKGROUND WORKER STORED PROCEDURES (V2.6.0)
-- ============================================================================

-- 1. CLAIM INQUIRY OUTBOX JOBS
-- Supports both batch recovery polling (p_event_id IS NULL) and targeted synchronous intake claim (p_event_id IS NOT NULL)
DROP FUNCTION IF EXISTS public.claim_inquiry_outbox_jobs(INTEGER, TEXT, INTEGER);
CREATE OR REPLACE FUNCTION public.claim_inquiry_outbox_jobs(
  p_batch_size INTEGER DEFAULT 5,
  p_worker_id TEXT DEFAULT 'worker',
  p_lease_seconds INTEGER DEFAULT 300,
  p_event_id UUID DEFAULT NULL
)
RETURNS SETOF public.inquiry_outbox
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_batch_size INTEGER;
  v_lease_seconds INTEGER;
BEGIN
  -- Validate worker identity
  IF p_worker_id IS NULL OR pg_catalog.btrim(p_worker_id) = '' THEN
    RAISE EXCEPTION 'p_worker_id must not be empty';
  END IF;

  IF pg_catalog.length(p_worker_id) > 128 THEN
    RAISE EXCEPTION 'p_worker_id exceeds maximum length of 128 characters';
  END IF;

  -- Defensive parameter clamping using standard SQL conditional expressions
  v_batch_size := GREATEST(1, LEAST(COALESCE(p_batch_size, 5), 50));
  v_lease_seconds := GREATEST(30, LEAST(COALESCE(p_lease_seconds, 300), 3600));

  RETURN QUERY
  WITH claimable AS (
    SELECT id 
    FROM public.inquiry_outbox
    WHERE (
      (p_event_id IS NOT NULL AND id = p_event_id)
      OR
      (p_event_id IS NULL)
    )
    AND (
      status = 'PENDING'
      OR (status = 'FAILED' AND next_retry_at <= pg_catalog.clock_timestamp())
      OR (status = 'PROCESSING' AND lease_expires_at <= pg_catalog.clock_timestamp())
    )
    AND notification_type = 'TRADE_DESK_ALERT'
    ORDER BY next_retry_at ASC
    LIMIT v_batch_size
    FOR UPDATE SKIP LOCKED
  )
  UPDATE public.inquiry_outbox o
  SET status = 'PROCESSING',
      locked_at = pg_catalog.clock_timestamp(),
      locked_by = p_worker_id,
      lease_expires_at = pg_catalog.clock_timestamp() + (v_lease_seconds || ' seconds')::pg_catalog.interval,
      authorized_at = NULL, -- Guarantees clean state on initial claim and retries
      updated_at = pg_catalog.clock_timestamp()
  FROM claimable
  WHERE o.id = claimable.id
  RETURNING o.*;
END;
$$;

-- 2. AUTHORIZE INQUIRY OUTBOX DISPATCH
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

-- 3. COMPLETE INQUIRY OUTBOX JOB
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
      authorized_at = NULL,
      last_error = NULL,
      updated_at = pg_catalog.clock_timestamp()
  WHERE id = p_event_id
    AND status = 'PROCESSING'
    AND locked_by = p_worker_id
    AND lease_expires_at > pg_catalog.clock_timestamp()
    AND authorized_at IS NOT NULL
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

-- 4. FAIL INQUIRY OUTBOX JOB
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
      authorized_at = NULL,
      updated_at = pg_catalog.clock_timestamp()
  WHERE id = p_event_id;

  RETURN TRUE;
END;
$$;

-- 5. RELEASE INQUIRY OUTBOX JOBS
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
    AND authorized_at IS NULL;

  GET DIAGNOSTICS v_released = ROW_COUNT;
  RETURN v_released;
END;
$$;

-- 6. WORKER-LEVEL QUARANTINE
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
    AND lease_expires_at > pg_catalog.clock_timestamp();

  GET DIAGNOSTICS v_rows = ROW_COUNT;
  RETURN v_rows > 0;
END;
$$;

-- 7. RECURRING MAINTENANCE CLEANUP
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
-- PART 6: SECURITY DEFINER PRIVILEGE HARDENING & RLS
-- ============================================================================
ALTER TABLE public.inquiry_outbox ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.inquiry_outbox FROM anon, authenticated;
GRANT ALL ON public.inquiry_outbox TO service_role;

DROP POLICY IF EXISTS "Service role full access on inquiry_outbox" ON public.inquiry_outbox;
CREATE POLICY "Service role full access on inquiry_outbox"
  ON public.inquiry_outbox
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

REVOKE ALL ON FUNCTION public.claim_inquiry_outbox_jobs(INTEGER, TEXT, INTEGER, UUID) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.authorize_inquiry_outbox_dispatch(UUID, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.complete_inquiry_outbox_job(UUID, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.fail_inquiry_outbox_job(UUID, TEXT, TEXT, TIMESTAMPTZ) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.release_inquiry_outbox_jobs(UUID[], TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.quarantine_inquiry_outbox_job(UUID, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.cleanup_unsupported_inquiry_outbox_jobs(INTEGER) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.claim_inquiry_outbox_jobs(INTEGER, TEXT, INTEGER, UUID) TO service_role;
GRANT EXECUTE ON FUNCTION public.authorize_inquiry_outbox_dispatch(UUID, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.complete_inquiry_outbox_job(UUID, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.fail_inquiry_outbox_job(UUID, TEXT, TEXT, TIMESTAMPTZ) TO service_role;
GRANT EXECUTE ON FUNCTION public.release_inquiry_outbox_jobs(UUID[], TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.quarantine_inquiry_outbox_job(UUID, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_unsupported_inquiry_outbox_jobs(INTEGER) TO service_role;

-- ============================================================================
-- PART 7: HISTORICAL UNSUPPORTED EVENT QUARANTINE
-- ============================================================================
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
