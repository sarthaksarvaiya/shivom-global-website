/**
 * SHIVOM GLOBAL — Submission Adapter Boundary
 * Phase: SG-WEBSITE-PHASE-04
 * Architecture Pattern: Form UI -> Validation -> Normalized Object -> Submission Adapter -> Future Backend
 */

import { BuyerRequirementRecord } from '../types/buyerRequirement';

export interface SubmissionResponse {
  success: boolean;
  mode: 'PREVIEW' | 'LIVE';
  referenceId: string;
  message: string;
  record?: BuyerRequirementRecord;
  error?: string;
}

/**
 * Clean submission boundary adapter.
 * Currently operates in explicit FRONTEND PREVIEW mode because no production backend
 * has been formally approved or provisioned.
 * When an approved backend (e.g. Serverless Function, Supabase Inbound Table, or Form Gateway)
 * is provisioned, this adapter is the single point of connection.
 */
export const submitBuyerRequirement = async (
  record: BuyerRequirementRecord
): Promise<SubmissionResponse> => {
  // Simulate network dispatch latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Explicit frontend preview return: zero false claims of database persistence or email dispatch
  return {
    success: true,
    mode: 'PREVIEW',
    referenceId: record.referenceId,
    message: 'Your specification has passed frontend validation. Submission integration is currently in preview mode.',
    record,
  };
};
