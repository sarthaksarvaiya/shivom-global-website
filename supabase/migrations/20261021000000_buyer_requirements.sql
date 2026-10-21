-- ==============================================================================
-- SHIVOM GLOBAL — Commercial Buyer Requirements Table & Security Migration
-- Migration: 20261021000000_buyer_requirements.sql
-- Table: public.buyer_requirements
-- Decision: DEC-WEBSITE-02 (Option 4: Dual Pipeline Persistence)
-- ==============================================================================

-- 1. Create table public.buyer_requirements
CREATE TABLE IF NOT EXISTS public.buyer_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id TEXT NOT NULL UNIQUE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  
  -- Buyer Corporate Identity
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  corporate_email TEXT NOT NULL,
  phone TEXT NOT NULL,
  buyer_country TEXT NOT NULL,
  
  -- Commercial Tea Specifications
  requirement_type TEXT NOT NULL,
  tea_category TEXT,
  grade TEXT NOT NULL,
  quantity TEXT NOT NULL,
  packaging_requirements TEXT NOT NULL,
  target_market TEXT NOT NULL,
  application TEXT,
  additional_requirements TEXT,
  
  -- Lifecycle & Pipeline Tracking
  source TEXT NOT NULL DEFAULT 'WEBSITE',
  status TEXT NOT NULL DEFAULT 'NEW',
  
  -- Email Dispatch State Machine
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_dispatched_at TIMESTAMPTZ,
  email_error TEXT,
  
  -- Audit & Anti-Abuse Metadata
  ip_address TEXT,
  user_agent TEXT,
  
  -- Record Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Performance & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_buyer_requirements_reference_id 
  ON public.buyer_requirements (reference_id);

CREATE INDEX IF NOT EXISTS idx_buyer_requirements_status 
  ON public.buyer_requirements (status);

CREATE INDEX IF NOT EXISTS idx_buyer_requirements_created_at 
  ON public.buyer_requirements (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_buyer_requirements_email 
  ON public.buyer_requirements (corporate_email);

-- 3. Row-Level Security (RLS) Policies
-- The table must be strictly secured.
-- Public anon users CANNOT view or manipulate buyer commercial records.
-- Serverless functions access this table exclusively via the service_role key.
ALTER TABLE public.buyer_requirements ENABLE ROW LEVEL SECURITY;

-- Allow full access for backend service_role only
DROP POLICY IF EXISTS "Service role full access on buyer_requirements" ON public.buyer_requirements;
CREATE POLICY "Service role full access on buyer_requirements"
  ON public.buyer_requirements
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Explicitly revoke public read/write access
REVOKE ALL ON public.buyer_requirements FROM anon, authenticated;
GRANT ALL ON public.buyer_requirements TO service_role;

-- 4. Comment on table and columns for documentation
COMMENT ON TABLE public.buyer_requirements IS 'Commercial buyer sourcing requirements captured via SHIVOM GLOBAL website';
COMMENT ON COLUMN public.buyer_requirements.reference_id IS 'Unique commercial reference ID in format SG-REQ-YYYYMMDD-XXXX';
COMMENT ON COLUMN public.buyer_requirements.status IS 'Pipeline status: NEW, REVIEWING, QUALIFIED, REJECTED, ARCHIVED';
COMMENT ON COLUMN public.buyer_requirements.source IS 'Intake source: WEBSITE, BOS, MANUAL';
