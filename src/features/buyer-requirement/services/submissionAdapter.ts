/**
 * SHIVOM GLOBAL — Commercial Submission Adapter Boundary
 * Pipeline: Form UI -> Client Validation -> Normalized Record -> POST /api/buyer-requirements -> Trade Desk Pipeline
 * System of Record: Supabase Database (Table: buyer_requirements) + Transactional Email Notification
 */

import type { BuyerRequirementRecord } from '../types/buyerRequirement.ts';

export interface SubmissionResponse {
  success: boolean;
  mode: 'PREVIEW' | 'LIVE';
  referenceId: string;
  message: string;
  record?: BuyerRequirementRecord;
  error?: string;
  details?: Record<string, string>;
  isDuplicate?: boolean;
  status?: 'ACCEPTED' | 'DUPLICATE' | 'VALIDATION_ERROR' | 'SERVICE_UNAVAILABLE' | 'ERROR';
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
      idempotencyKey: record.idempotencyKey || '',
      website_hp: honeypot || '',
    };

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (record.idempotencyKey) {
      headers['Idempotency-Key'] = record.idempotencyKey;
    }

    const res = await fetch('/api/buyer-requirements', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (res.ok && data?.success) {
      const isDuplicate = Boolean(data.duplicate || data.isDuplicate || data.status === 'DUPLICATE');
      return {
        success: true,
        mode: 'LIVE',
        referenceId: data.referenceId,
        message: data.message || 'Your requirement has been received by the SHIVOM GLOBAL trade desk.',
        isDuplicate,
        status: isDuplicate ? 'DUPLICATE' : 'ACCEPTED',
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
      status: data?.status || 'ERROR',
    };
  } catch (err: unknown) {
    console.error('[SUBMISSION_ADAPTER_NETWORK_ERROR]', err);
    return {
      success: false,
      mode: 'LIVE',
      referenceId: record.referenceId,
      message: 'Network error communicating with the trade desk. Please verify your connection and try again.',
      error: 'Network connection issue. Please try again.',
      status: 'SERVICE_UNAVAILABLE',
    };
  }
};
