-- ==============================================================================
-- SHIVOM GLOBAL — Controlled Removal of Transactional Inquiry Outbox
-- Migration: 20261105000002_remove_inquiry_outbox.sql
-- Purpose: Safely removes outbox queue, background polling functions, and triggers
-- Safety: NO CASCADE statements; drops only explicit outbox dependencies in order
-- Preserves: public.buyer_requirements table and all historical commercial data
-- ==============================================================================

-- 1. Drop trigger on public.buyer_requirements
-- Prevents new buyer submissions from referencing the enqueue trigger function
DROP TRIGGER IF EXISTS trg_buyer_requirements_outbox ON public.buyer_requirements;

-- 2. Drop outbox enqueue trigger function (without CASCADE; trigger dropped above)
DROP FUNCTION IF EXISTS public.trg_enqueue_inquiry_outbox();

-- 3. Drop all outbox queue stored procedures using exact parameter signatures
-- A. Outbox claim functions (both 4-arg and 3-arg historical signatures)
DROP FUNCTION IF EXISTS public.claim_inquiry_outbox_jobs(integer, text, integer, uuid);
DROP FUNCTION IF EXISTS public.claim_inquiry_outbox_jobs(integer, text, integer);

-- B. Atomic ownership, authorization, and state transition functions
DROP FUNCTION IF EXISTS public.authorize_inquiry_outbox_dispatch(uuid, text);
DROP FUNCTION IF EXISTS public.complete_inquiry_outbox_job(uuid, text);
DROP FUNCTION IF EXISTS public.fail_inquiry_outbox_job(uuid, text, text, timestamp with time zone);
DROP FUNCTION IF EXISTS public.release_inquiry_outbox_jobs(uuid[], text);
DROP FUNCTION IF EXISTS public.quarantine_inquiry_outbox_job(uuid, text, text);
DROP FUNCTION IF EXISTS public.cleanup_unsupported_inquiry_outbox_jobs(integer);

-- 4. Drop the inquiry_outbox table (without CASCADE; table-owned indexes drop automatically)
DROP TABLE IF EXISTS public.inquiry_outbox;
