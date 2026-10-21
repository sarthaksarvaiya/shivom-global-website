/**
 * SHIVOM GLOBAL — Commercial Submission Adapter Boundary
 * Pipeline: Form UI -> Client Validation -> Normalized Record -> POST /api/buyer-requirements -> Trade Desk Pipeline
 * System of Record: Supabase Database (Table: buyer_requirements) + Transactional Email Notification
 */

import { BuyerRequirementRecord } from '../types/buyerRequirement';

export interface SubmissionResponse {
  success: boolean;
  mode: 'PREVIEW' | 'LIVE';
  referenceId: string;
  message: string;
  record?: BuyerRequirementRecord;
  error?: string;
  details?: Record<string, string>;
}

/**
 * Production submission adapter.
 * Dispatches client-validated requirement parameters to the Vercel serverless function
 * at POST /api/buyer-requirements for server validation, Supabase persistence,
 * and commercial email dispatch.
 */
export const submitBuyerRequirement = async (
  record: BuyerRequirementRecord,
  honeypot?: string
): Promise<SubmissionResponse> => {
  try {
    const payload = {
      ...record,
      website_hp: honeypot || '',
    };

    const res = await fetch('/api/buyer-requirements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (res.ok && data?.success) {
      return {
        success: true,
        mode: 'LIVE',
        referenceId: data.referenceId,
        message: data.message || 'Your commercial requirement has been received by the SHIVOM GLOBAL trade desk.',
        record: {
          ...record,
          referenceId: data.referenceId, // Authoritative server-side reference ID
        },
      };
    }

    // Server-side controlled error response
    const errorMessage =
      data?.error || 'We could not submit your requirement at this time. Please try again.';

    return {
      success: false,
      mode: 'LIVE',
      referenceId: record.referenceId,
      message: errorMessage,
      error: errorMessage,
      details: data?.details,
    };
  } catch (err: unknown) {
    console.error('[SUBMISSION_ADAPTER_NETWORK_ERROR]', err);
    return {
      success: false,
      mode: 'LIVE',
      referenceId: record.referenceId,
      message: 'Network error communicating with the commercial submission desk. Please verify your connection and try again.',
      error: 'Network connection issue. Please try again.',
    };
  }
};
