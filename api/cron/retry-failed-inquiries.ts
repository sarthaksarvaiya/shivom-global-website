import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

/**
 * SHIVOM GLOBAL — Outbox Retry Cron Worker
 * Runtime: Vercel Cron Function (Node.js) / Local Dev Middleware
 * Pipeline: Authenticate -> Claim Batch (SKIP LOCKED / RPC) -> Dispatch via Resend -> Update Outbox
 * Concurrency: Protected by PostgreSQL row locking and worker lease timeouts.
 */

interface OutboxEvent {
  id: string;
  inquiry_id: string;
  reference_id: string;
  notification_type: 'TRADE_DESK_ALERT' | 'BUYER_ACKNOWLEDGMENT';
  recipient_email: string;
  recipient_name?: string;
  payload: Record<string, unknown>;
  status: 'PENDING' | 'PROCESSING' | 'SENT' | 'FAILED' | 'DEAD_LETTER';
  attempt_count: number;
  max_attempts: number;
  next_retry_at: string;
  last_error?: string;
  locked_at?: string;
  locked_by?: string;
  lease_expires_at?: string;
}

const BATCH_SIZE = 10;
const LEASE_DURATION_SECONDS = 180; // 3 minutes lease
const EMAIL_TIMEOUT_MS = 4000; // 4 seconds timeout per dispatch
const DB_TIMEOUT_MS = 6000;

/**
 * Sanitize and strip control characters
 */
function sanitizeString(val: unknown, maxLength: number): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Calculate exponential backoff delay in minutes
 * Formula: min(120 minutes, 2^attempt_count * 2) -> 4m, 8m, 16m, 32m, 64m, 120m
 */
function calculateBackoffMinutes(attemptCount: number): number {
  return Math.min(120, Math.pow(2, Math.max(1, attemptCount)) * 2);
}

/**
 * Dispatch Trade Desk Notification Email via Resend
 */
async function dispatchTradeDeskAlert(
  event: OutboxEvent
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.EMAIL_API_KEY?.trim();
  const emailTo = process.env.EMAIL_TO?.trim() || event.recipient_email || 'shivomglobal1010@gmail.com';
  const emailFrom = process.env.EMAIL_FROM?.trim() || 'SHIVOM GLOBAL Inquiries <inquiries@shivomglobal.com>';

  if (!apiKey) {
    return { success: false, error: 'EMAIL_API_KEY not configured on server' };
  }

  const p = event.payload || {};
  const referenceId = String(p.reference_id || event.reference_id);
  const submittedAtIso = String(p.submitted_at || new Date().toISOString());

  const subject = `[SHIVOM GLOBAL] New Buyer Requirement — ${referenceId}`;

  const plainText = `
SHIVOM GLOBAL — COMMERCIAL BUYER REQUIREMENT INTAKE (OUTBOX RETRY)
Reference ID: ${referenceId}
Submitted At: ${submittedAtIso}

BUYER CORPORATE PROFILE:
----------------------------------------
Company Name:   ${p.company_name || 'N/A'}
Contact Person: ${p.contact_name || 'N/A'}
Corporate Email:${p.corporate_email || 'N/A'}
Phone/WhatsApp: ${p.phone || 'N/A'}
Country:        ${p.buyer_country || 'N/A'}

TEA COMMERCIAL SPECIFICATIONS:
----------------------------------------
Requirement Scope: ${p.requirement_type || 'N/A'}
Preferred Grade:   ${p.grade || 'N/A'}
Order Volume:      ${p.quantity || 'N/A'}
Packaging:         ${p.packaging_requirements || 'N/A'}
Destination Port:  ${p.target_market || 'N/A'}
Special Specs:     ${p.additional_requirements || 'None specified'}

Status: QUEUED_DISPATCH
System of Record: Supabase Database (Table: buyer_requirements)
Notice: Commercial inquiry dispatched via the SHIVOM GLOBAL transactional outbox retry worker.
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f8; color: #1a2e22; margin: 0; padding: 24px; }
    .card { background-color: #ffffff; max-width: 640px; margin: 0 auto; border-radius: 8px; border: 1px solid #d4dfd8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background-color: #0D3829; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0 0 6px; font-size: 20px; font-weight: 700; letter-spacing: 0.02em; }
    .header .ref { color: #C5A059; font-size: 14px; font-weight: 600; }
    .body { padding: 24px; }
    .section-title { font-size: 13px; font-weight: 700; color: #0D3829; text-transform: uppercase; letter-spacing: 0.05em; margin: 18px 0 8px; border-bottom: 2px solid #EBF2EE; padding-bottom: 4px; }
    .field-row { display: flex; padding: 6px 0; font-size: 14px; line-height: 1.5; }
    .field-label { width: 160px; font-weight: 600; color: #4B6356; flex-shrink: 0; }
    .field-value { flex-grow: 1; color: #111827; }
    .specs-box { background-color: #F8FAF9; border-left: 3px solid #C5A059; padding: 12px; margin-top: 6px; font-size: 14px; color: #2D3748; white-space: pre-wrap; }
    .footer { background-color: #F4F7F5; padding: 16px 24px; font-size: 12px; color: #6B7280; text-align: center; border-top: 1px solid #E5E7EB; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Commercial Buyer Requirement</h1>
      <div class="ref">Reference: ${referenceId}</div>
    </div>
    <div class="body">
      <div class="section-title">Buyer Corporate Profile</div>
      <div class="field-row"><div class="field-label">Company Legal Name:</div><div class="field-value"><strong>${p.company_name || 'N/A'}</strong> (${p.buyer_country || 'N/A'})</div></div>
      <div class="field-row"><div class="field-label">Contact Person:</div><div class="field-value">${p.contact_name || 'N/A'}</div></div>
      <div class="field-row"><div class="field-label">Corporate Email:</div><div class="field-value"><a href="mailto:${p.corporate_email || ''}">${p.corporate_email || 'N/A'}</a></div></div>
      <div class="field-row"><div class="field-label">WhatsApp / Phone:</div><div class="field-value">${p.phone || 'N/A'}</div></div>

      <div class="section-title">Tea Commercial Specifications</div>
      <div class="field-row"><div class="field-label">Requirement Scope:</div><div class="field-value">${p.requirement_type || 'N/A'}</div></div>
      <div class="field-row"><div class="field-label">Preferred Grade / Cut:</div><div class="field-value"><strong>${p.grade || 'N/A'}</strong></div></div>
      <div class="field-row"><div class="field-label">Volume Tier:</div><div class="field-value">${p.quantity || 'N/A'}</div></div>
      <div class="field-row"><div class="field-label">Packaging Format:</div><div class="field-value">${p.packaging_requirements || 'N/A'}</div></div>
      <div class="field-row"><div class="field-label">Discharging Port:</div><div class="field-value"><strong>${p.target_market || 'N/A'}</strong></div></div>

      <div class="section-title">Additional Technical Notes</div>
      <div class="specs-box">${p.additional_requirements || 'None provided.'}</div>
    </div>
    <div class="footer">
      Dispatched via SHIVOM GLOBAL transactional outbox worker.<br>
      System of Record: Supabase (buyer_requirements &amp; inquiry_outbox)
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        reply_to: (p.corporate_email as string) || undefined,
        subject,
        text: plainText,
        html: htmlContent,
      }),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      return { success: false, error: `Resend HTTP ${response.status}: ${errBody.slice(0, 200)}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown network error';
    return { success: false, error: errorMsg };
  }
}

/**
 * Universal Serverless HTTP Handler for Cron Worker
 */
export default async function handler(
  req: IncomingMessage & { query?: unknown },
  res: ServerResponse
) {
  const sendJsonResponse = (statusCode: number, payload: Record<string, unknown>) => {
    if (res.headersSent) return;
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
  };

  // 1. Authenticate Request via CRON_SECRET
  const isProduction = process.env.NODE_ENV === 'production';
  const cronSecret = process.env.CRON_SECRET?.trim();
  const rawAuth = req.headers['authorization'] || '';
  const token = (typeof rawAuth === 'string' && rawAuth.startsWith('Bearer '))
    ? rawAuth.slice(7).trim()
    : (Array.isArray(rawAuth) && rawAuth[0]?.startsWith('Bearer '))
      ? rawAuth[0].slice(7).trim()
      : '';

  // In production, CRON_SECRET is strictly mandatory; missing secret rejects with HTTP 500
  if (isProduction && !cronSecret) {
    console.error('[CRON_WORKER_AUTH_ERROR] CRON_SECRET is not configured in production environment.');
    sendJsonResponse(500, {
      success: false,
      error: 'Server configuration error: CRON_SECRET must be configured in production.',
    });
    return;
  }

  // When CRON_SECRET is configured (mandatory in production; optional in non-production),
  // verify incoming bearer token using timing-safe comparison.
  if (cronSecret) {
    const isTokenValid =
      token.length === cronSecret.length &&
      crypto.timingSafeEqual(Buffer.from(token), Buffer.from(cronSecret));

    if (!isTokenValid) {
      sendJsonResponse(401, {
        success: false,
        error: 'Unauthorized. Invalid or missing CRON_SECRET bearer token.',
      });
      return;
    }
  } else {
    // Non-production fallback notice (only reachable in development/testing without CRON_SECRET)
    console.warn('[CRON_WORKER_DEV_NOTICE] Bypassing CRON_SECRET authentication in non-production environment.');
  }

  // 2. Validate Supabase Configuration
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseServiceRoleKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY
  )?.trim();

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('[CRON_WORKER_ERROR] Missing Supabase credentials in environment.');
    sendJsonResponse(500, {
      success: false,
      error: 'Backend database credentials not configured.',
    });
    return;
  }

  const workerId = `worker-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
  let claimedEvents: OutboxEvent[] = [];

  // 3. Claim Pending/Failed Events (Attempt RPC claim function first, with direct fallback)
  try {
    const rpcEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/rpc/claim_inquiry_outbox_jobs`;
    const rpcRes = await fetch(rpcEndpoint, {
      method: 'POST',
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_batch_size: BATCH_SIZE,
        p_worker_id: workerId,
        p_lease_seconds: LEASE_DURATION_SECONDS,
      }),
      signal: AbortSignal.timeout(DB_TIMEOUT_MS),
    });

    if (rpcRes.ok) {
      claimedEvents = (await rpcRes.json().catch(() => [])) as OutboxEvent[];
    } else {
      // Fallback: If RPC is not yet applied, query table directly
      const nowIso = new Date().toISOString();
      const directQuery = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/inquiry_outbox?status=in.(PENDING,FAILED)&next_retry_at=lte.${encodeURIComponent(nowIso)}&limit=${BATCH_SIZE}`;
      const directRes = await fetch(directQuery, {
        method: 'GET',
        headers: {
          apikey: supabaseServiceRoleKey,
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(DB_TIMEOUT_MS),
      });

      if (directRes.ok) {
        claimedEvents = (await directRes.json().catch(() => [])) as OutboxEvent[];
      }
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Database query error';
    console.error(`[CRON_WORKER_CLAIM_EXCEPTION] ${errorMsg}`);
    sendJsonResponse(500, {
      success: false,
      error: 'Failed to claim outbox jobs from database.',
    });
    return;
  }

  // 4. Process Each Claimed Event
  let succeeded = 0;
  let failed = 0;
  let deadLetter = 0;
  let skipped = 0;

  for (const event of claimedEvents) {
    // Stage 1 Boundary Rule: Do NOT activate buyer acknowledgment emails yet
    if (event.notification_type === 'BUYER_ACKNOWLEDGMENT') {
      skipped++;
      continue;
    }

    if (event.notification_type === 'TRADE_DESK_ALERT') {
      const dispatchResult = await dispatchTradeDeskAlert(event);
      const nowIso = new Date().toISOString();

      if (dispatchResult.success) {
        succeeded++;
        // Mark Outbox entry as SENT
        try {
          const patchOutbox = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/inquiry_outbox?id=eq.${encodeURIComponent(event.id)}`;
          await fetch(patchOutbox, {
            method: 'PATCH',
            headers: {
              apikey: supabaseServiceRoleKey,
              Authorization: `Bearer ${supabaseServiceRoleKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: 'SENT',
              sent_at: nowIso,
              locked_at: null,
              locked_by: null,
              lease_expires_at: null,
              last_error: null,
              updated_at: nowIso,
            }),
            signal: AbortSignal.timeout(DB_TIMEOUT_MS),
          });

          // Sync buyer_requirements table
          const patchReq = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/buyer_requirements?reference_id=eq.${encodeURIComponent(event.reference_id)}`;
          await fetch(patchReq, {
            method: 'PATCH',
            headers: {
              apikey: supabaseServiceRoleKey,
              Authorization: `Bearer ${supabaseServiceRoleKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email_sent: true,
              email_dispatched_at: nowIso,
              updated_at: nowIso,
            }),
            signal: AbortSignal.timeout(DB_TIMEOUT_MS),
          }).catch(() => {});
        } catch (updateErr) {
          console.error(`[CRON_WORKER_UPDATE_ERROR] Event ${event.id}:`, updateErr);
        }
      } else {
        // Dispatch failed
        const newAttemptCount = (event.attempt_count || 0) + 1;
        const isDeadLetter = newAttemptCount >= (event.max_attempts || 5);

        if (isDeadLetter) {
          deadLetter++;
        } else {
          failed++;
        }

        const backoffMinutes = calculateBackoffMinutes(newAttemptCount);
        const nextRetryDate = new Date(Date.now() + backoffMinutes * 60 * 1000).toISOString();

        try {
          const patchOutbox = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/inquiry_outbox?id=eq.${encodeURIComponent(event.id)}`;
          await fetch(patchOutbox, {
            method: 'PATCH',
            headers: {
              apikey: supabaseServiceRoleKey,
              Authorization: `Bearer ${supabaseServiceRoleKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: isDeadLetter ? 'DEAD_LETTER' : 'FAILED',
              attempt_count: newAttemptCount,
              next_retry_at: isDeadLetter ? nowIso : nextRetryDate,
              last_error: sanitizeString(dispatchResult.error, 255),
              locked_at: null,
              locked_by: null,
              lease_expires_at: null,
              updated_at: nowIso,
            }),
            signal: AbortSignal.timeout(DB_TIMEOUT_MS),
          });

          // Sync error to buyer_requirements
          const patchReq = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/buyer_requirements?reference_id=eq.${encodeURIComponent(event.reference_id)}`;
          await fetch(patchReq, {
            method: 'PATCH',
            headers: {
              apikey: supabaseServiceRoleKey,
              Authorization: `Bearer ${supabaseServiceRoleKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email_sent: false,
              email_error: sanitizeString(dispatchResult.error, 255),
              updated_at: nowIso,
            }),
            signal: AbortSignal.timeout(DB_TIMEOUT_MS),
          }).catch(() => {});
        } catch (updateErr) {
          console.error(`[CRON_WORKER_UPDATE_ERROR] Failed event ${event.id}:`, updateErr);
        }
      }
    }
  }

  sendJsonResponse(200, {
    success: true,
    workerId,
    batchSize: claimedEvents.length,
    succeeded,
    failed,
    deadLetter,
    skipped,
  });
}

