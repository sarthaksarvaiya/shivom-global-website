import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

/**
 * SHIVOM GLOBAL — Commercial Buyer Requirement Submission Endpoint
 * Runtime: Vercel Serverless Function (Node.js) / Local Dev Middleware
 * Pipeline: Validate -> Sanitize -> DB Insert (Supabase) -> Email Notification -> Controlled Response
 * Policy: DEC-WEBSITE-02 (Option 4: Dual Pipeline Persistence)
 */

interface RawBuyerPayload {
  companyName?: unknown;
  contactPerson?: unknown;
  businessEmail?: unknown;
  phoneWhatsApp?: unknown;
  country?: unknown;
  requirementType?: unknown;
  grade?: unknown;
  volume?: unknown;
  packaging?: unknown;
  destinationPort?: unknown;
  qualitySpecs?: unknown;
  website_hp?: unknown; // Anti-bot honeypot field
  [key: string]: unknown;
}

interface SanitizedBuyerRequirement {
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  phoneWhatsApp: string;
  country: string;
  requirementType: string;
  grade: string;
  volume: string;
  packaging: string;
  destinationPort: string;
  qualitySpecs: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// Allowed Origins for CORS protection
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/.*\.vercel\.app$/,
  /^https:\/\/shivomglobal\.com$/,
  /^https:\/\/www\.shivomglobal\.com$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

// In-Memory Rate Limiting for Basic Abuse Protection (Sliding Window per IP)
const ipRequestWindow = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 15; // Max 15 submissions per 10 minutes per IP

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const PHONE_PATTERN = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{5,20}$/;

/**
 * Sanitize and strip unsafe control characters
 */
function sanitizeString(val: unknown, maxLength: number): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '') // remove ASCII control characters
    .trim()
    .slice(0, maxLength);
}

/**
 * Generate cryptographically random, collision-resistant reference ID
 * Format: SG-REQ-YYYYMMDD-XXXX
 */
function generateServerReferenceId(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');

  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Unambiguous alphanumeric
  const bytes = crypto.randomBytes(4);
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars[bytes[i] % chars.length];
  }

  return `SG-REQ-${year}${month}${day}-${rand}`;
}

/**
 * Perform server-side validation against incoming sanitized parameters
 */
function validateServerPayload(data: SanitizedBuyerRequirement): ValidationErrors {
  const errors: ValidationErrors = {};

  // 1. Requirement Type
  if (!data.requirementType) {
    errors.requirementType = 'Requirement type is required.';
  } else if (data.requirementType.length < 2 || data.requirementType.length > 100) {
    errors.requirementType = 'Invalid requirement type length.';
  }

  // 2. Grade
  if (!data.grade) {
    errors.grade = 'Preferred grade or cut specification is required.';
  } else if (data.grade.length < 1 || data.grade.length > 100) {
    errors.grade = 'Invalid grade specification length.';
  }

  // 3. Volume
  if (!data.volume) {
    errors.volume = 'Estimated volume scope is required.';
  } else if (data.volume.length < 2 || data.volume.length > 100) {
    errors.volume = 'Invalid volume scope length.';
  }

  // 4. Packaging
  if (!data.packaging) {
    errors.packaging = 'Packaging preference is required.';
  } else if (data.packaging.length < 2 || data.packaging.length > 100) {
    errors.packaging = 'Invalid packaging preference length.';
  }

  // 5. Destination Port & Country
  if (!data.destinationPort) {
    errors.destinationPort = 'Discharging port and country are required for CIF costing.';
  } else if (data.destinationPort.length < 3) {
    errors.destinationPort = 'Destination port must be at least 3 characters.';
  } else if (data.destinationPort.length > 120) {
    errors.destinationPort = 'Destination port cannot exceed 120 characters.';
  }

  // 6. Quality Details (Optional, length bounded)
  if (data.qualitySpecs && data.qualitySpecs.length > 2000) {
    errors.qualitySpecs = 'Quality specifications cannot exceed 2,000 characters.';
  }

  // 7. Company Name
  if (!data.companyName) {
    errors.companyName = 'Company legal name is required.';
  } else if (data.companyName.length < 2) {
    errors.companyName = 'Company name must be at least 2 characters.';
  } else if (data.companyName.length > 120) {
    errors.companyName = 'Company name cannot exceed 120 characters.';
  }

  // 8. Contact Person
  if (!data.contactPerson) {
    errors.contactPerson = 'Contact person and professional title are required.';
  } else if (data.contactPerson.length < 2) {
    errors.contactPerson = 'Contact name must be at least 2 characters.';
  } else if (data.contactPerson.length > 100) {
    errors.contactPerson = 'Contact name cannot exceed 100 characters.';
  }

  // 9. Corporate Email
  if (!data.businessEmail) {
    errors.businessEmail = 'Corporate business email is required.';
  } else if (!EMAIL_REGEX.test(data.businessEmail)) {
    errors.businessEmail = 'A valid corporate email address is required.';
  } else if (data.businessEmail.length > 120) {
    errors.businessEmail = 'Email cannot exceed 120 characters.';
  }

  // 10. Phone / WhatsApp
  const digitsOnly = data.phoneWhatsApp.replace(/\D/g, '');
  if (!data.phoneWhatsApp) {
    errors.phoneWhatsApp = 'WhatsApp or telephone number is required.';
  } else if (digitsOnly.length < 7 || digitsOnly.length > 18 || !PHONE_PATTERN.test(data.phoneWhatsApp)) {
    errors.phoneWhatsApp = 'Please provide a valid international telephone format.';
  } else if (data.phoneWhatsApp.length > 30) {
    errors.phoneWhatsApp = 'Phone number cannot exceed 30 characters.';
  }

  // 11. Buyer Country
  if (!data.country) {
    errors.country = 'Company registration country is required.';
  } else if (data.country.length < 2) {
    errors.country = 'Country name must be at least 2 characters.';
  } else if (data.country.length > 80) {
    errors.country = 'Country name cannot exceed 80 characters.';
  }

  return errors;
}

/**
 * Check and record IP rate limiting
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestWindow.get(ip);

  // Clean stale records periodically
  if (ipRequestWindow.size > 1000) {
    for (const [key, val] of ipRequestWindow.entries()) {
      if (val.resetAt < now) ipRequestWindow.delete(key);
    }
  }

  if (!record || record.resetAt < now) {
    ipRequestWindow.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

/**
 * Dispatch transactional email to Trade Desk
 */
async function sendTradeDeskEmail(
  referenceId: string,
  reqData: SanitizedBuyerRequirement,
  submittedAtIso: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.EMAIL_API_KEY?.trim();
  const emailTo = process.env.EMAIL_TO?.trim() || 'shivomglobal1010@gmail.com';
  const emailFrom = process.env.EMAIL_FROM?.trim() || 'SHIVOM GLOBAL Inquiries <inquiries@shivomglobal.com>';

  if (!apiKey) {
    console.warn(
      `[TRADE_DESK_EMAIL_NOTICE] EMAIL_API_KEY is not provisioned. Lead ${referenceId} is safely stored in Supabase.`
    );
    return { success: false, error: 'EMAIL_API_KEY not configured' };
  }

  const subject = `[SHIVOM GLOBAL] New Buyer Requirement — ${referenceId}`;

  const plainText = `
SHIVOM GLOBAL — COMMERCIAL BUYER REQUIREMENT INTAKE
Reference ID: ${referenceId}
Submitted At: ${submittedAtIso}

BUYER CORPORATE PROFILE:
----------------------------------------
Company Name:   ${reqData.companyName}
Contact Person: ${reqData.contactPerson}
Corporate Email:${reqData.businessEmail}
Phone/WhatsApp: ${reqData.phoneWhatsApp}
Country:        ${reqData.country}

TEA COMMERCIAL SPECIFICATIONS:
----------------------------------------
Requirement Scope: ${reqData.requirementType}
Preferred Grade:   ${reqData.grade}
Order Volume:      ${reqData.volume}
Packaging:         ${reqData.packaging}
Destination Port:  ${reqData.destinationPort}
Special Specs:     ${reqData.qualitySpecs || 'None specified'}

Status: NEW
System of Record: Supabase Database (Table: buyer_requirements)
Notice: New commercial buyer inquiry submitted through the SHIVOM GLOBAL website.
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
      <div class="field-row"><div class="field-label">Company Legal Name:</div><div class="field-value"><strong>${reqData.companyName}</strong> (${reqData.country})</div></div>
      <div class="field-row"><div class="field-label">Contact Person:</div><div class="field-value">${reqData.contactPerson}</div></div>
      <div class="field-row"><div class="field-label">Corporate Email:</div><div class="field-value"><a href="mailto:${reqData.businessEmail}">${reqData.businessEmail}</a></div></div>
      <div class="field-row"><div class="field-label">WhatsApp / Phone:</div><div class="field-value">${reqData.phoneWhatsApp}</div></div>

      <div class="section-title">Tea Commercial Specifications</div>
      <div class="field-row"><div class="field-label">Requirement Scope:</div><div class="field-value">${reqData.requirementType}</div></div>
      <div class="field-row"><div class="field-label">Preferred Grade / Cut:</div><div class="field-value"><strong>${reqData.grade}</strong></div></div>
      <div class="field-row"><div class="field-label">Volume Tier:</div><div class="field-value">${reqData.volume}</div></div>
      <div class="field-row"><div class="field-label">Packaging Format:</div><div class="field-value">${reqData.packaging}</div></div>
      <div class="field-row"><div class="field-label">Discharging Port:</div><div class="field-value"><strong>${reqData.destinationPort}</strong></div></div>

      <div class="section-title">Additional Technical Notes</div>
      <div class="specs-box">${reqData.qualitySpecs || 'None provided.'}</div>
    </div>
    <div class="footer">
      New commercial buyer inquiry submitted through the SHIVOM GLOBAL website.<br>
      Captured at ${submittedAtIso} UTC • System of Record: Supabase (buyer_requirements)
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    // Standard Resend transactional API endpoint
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        reply_to: reqData.businessEmail,
        subject,
        text: plainText,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error(`[EMAIL_DISPATCH_FAILED] Resend status ${response.status}: ${errBody}`);
      return { success: false, error: `Resend status ${response.status}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown network error';
    console.error(`[EMAIL_DISPATCH_EXCEPTION] ${errorMsg}`);
    return { success: false, error: errorMsg };
  }
}

/**
 * Helper to read raw body if not pre-parsed
 */
async function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 50000) {
        reject(new Error('PAYLOAD_TOO_LARGE'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', (err) => reject(err));
  });
}

/**
 * Universal Serverless HTTP Handler
 */
export default async function handler(
  req: IncomingMessage & { body?: unknown; query?: unknown },
  res: ServerResponse & {
    status?: (code: number) => any;
    json?: (payload: any) => any;
  }
) {
  // Helper for setting HTTP status and JSON response
  const sendJsonResponse = (statusCode: number, payload: Record<string, unknown>) => {
    if (res.headersSent) return;
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
  };

  // CORS and Origin Management
  const rawOrigin = req.headers['origin'] || req.headers['referer'] || '';
  const originStr = Array.isArray(rawOrigin) ? rawOrigin[0] : rawOrigin;
  let isAllowedOrigin = false;
  let matchingOrigin = 'https://shivom-global-website.vercel.app';

  if (!originStr) {
    // Same-origin, direct browser POST, or server-side request without explicit Origin header
    isAllowedOrigin = true;
  } else {
    for (const pattern of ALLOWED_ORIGIN_PATTERNS) {
      if (pattern.test(originStr)) {
        isAllowedOrigin = true;
        matchingOrigin = originStr;
        break;
      }
    }
  }

  res.setHeader('Access-Control-Allow-Origin', matchingOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Handle preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Reject unauthorized cross-origin calls
  if (!isAllowedOrigin) {
    sendJsonResponse(403, {
      success: false,
      error: 'Cross-origin request rejected. Inquiries must originate from SHIVOM GLOBAL approved domains.',
    });
    return;
  }

  // Reject non-POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJsonResponse(405, {
      success: false,
      error: 'Method not allowed. Please submit commercial requirements via POST.',
    });
    return;
  }

  // Request-Size Protection (Max 50KB)
  const contentLength = parseInt(String(req.headers['content-length'] || '0'), 10);
  if (contentLength > 50000) {
    sendJsonResponse(413, {
      success: false,
      error: 'Request payload exceeds maximum allowed size (50KB).',
    });
    return;
  }

  // Rate Limiting Protection
  const rawForwardedFor = req.headers['x-forwarded-for'];
  const clientIp =
    (Array.isArray(rawForwardedFor) ? rawForwardedFor[0] : rawForwardedFor?.split(',')[0]) ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  if (isRateLimited(clientIp)) {
    console.warn(`[RATE_LIMIT_EXCEEDED] IP: ${clientIp}`);
    sendJsonResponse(429, {
      success: false,
      error: 'Too many submissions received from this network. Please wait a few moments before trying again.',
    });
    return;
  }

  // Parse Body
  let body: RawBuyerPayload;
  try {
    if (req.body && typeof req.body === 'object') {
      body = req.body as RawBuyerPayload;
    } else {
      const rawText = await readRequestBody(req);
      body = rawText ? JSON.parse(rawText) : {};
    }
  } catch (parseErr: unknown) {
    if (parseErr instanceof Error && parseErr.message === 'PAYLOAD_TOO_LARGE') {
      sendJsonResponse(413, {
        success: false,
        error: 'Request payload exceeds maximum allowed size (50KB).',
      });
      return;
    }
    sendJsonResponse(400, {
      success: false,
      error: 'Malformed JSON payload. Please review submitted fields.',
    });
    return;
  }

  // Honeypot Protection: Silent Discard
  const honeypotVal = sanitizeString(body.website_hp, 100);
  if (honeypotVal.length > 0) {
    // Generate decoy reference ID so bot believes submission succeeded
    const fakeRef = generateServerReferenceId();
    console.warn(`[HONEYPOT_TRIGGERED] Discarded automated submission from IP ${clientIp}. Decoy Ref: ${fakeRef}`);
    sendJsonResponse(200, {
      success: true,
      referenceId: fakeRef,
      message: 'Your requirement specification has been received for commercial evaluation.',
    });
    return;
  }

  // Sanitize Inputs
  const sanitized: SanitizedBuyerRequirement = {
    companyName: sanitizeString(body.companyName, 120),
    contactPerson: sanitizeString(body.contactPerson, 100),
    businessEmail: sanitizeString(body.businessEmail, 120).toLowerCase(),
    phoneWhatsApp: sanitizeString(body.phoneWhatsApp, 30),
    country: sanitizeString(body.country, 80),
    requirementType: sanitizeString(body.requirementType, 100),
    grade: sanitizeString(body.grade, 100),
    volume: sanitizeString(body.volume, 100),
    packaging: sanitizeString(body.packaging, 100),
    destinationPort: sanitizeString(body.destinationPort, 120),
    qualitySpecs: sanitizeString(body.qualitySpecs, 2000),
  };

  // Validate Required Fields Server-Side
  const validationErrors = validateServerPayload(sanitized);
  if (Object.keys(validationErrors).length > 0) {
    sendJsonResponse(400, {
      success: false,
      error: 'Please review the highlighted fields and try again.',
      details: validationErrors,
    });
    return;
  }

  // Generate Authoritative Server Reference ID
  const referenceId = generateServerReferenceId();
  const submittedAtIso = new Date().toISOString();
  const userAgent = sanitizeString(req.headers['user-agent'] || '', 255);

  // Supabase Persistence (System of Record)
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseServiceRoleKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY
  )?.trim();

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error(
      '[CRITICAL_BACKEND_CONFIG] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SECRET_KEY in environment variables.'
    );
    sendJsonResponse(500, {
      success: false,
      error: 'We could not submit your requirement at this time. Please try again.',
    });
    return;
  }

  const dbRow = {
    reference_id: referenceId,
    submitted_at: submittedAtIso,
    company_name: sanitized.companyName,
    contact_name: sanitized.contactPerson,
    corporate_email: sanitized.businessEmail,
    phone: sanitized.phoneWhatsApp,
    buyer_country: sanitized.country,
    requirement_type: sanitized.requirementType,
    tea_category: sanitized.requirementType,
    grade: sanitized.grade,
    quantity: sanitized.volume,
    packaging_requirements: sanitized.packaging,
    target_market: sanitized.destinationPort,
    application: sanitized.destinationPort,
    additional_requirements: sanitized.qualitySpecs || null,
    source: 'WEBSITE',
    status: 'NEW',
    email_sent: false,
    ip_address: clientIp,
    user_agent: userAgent,
    created_at: submittedAtIso,
    updated_at: submittedAtIso,
  };

  let dbInsertSuccess = false;

  try {
    const supabaseEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/buyer_requirements`;
    const dbRes = await fetch(supabaseEndpoint, {
      method: 'POST',
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(dbRow),
    });

    if (dbRes.ok) {
      dbInsertSuccess = true;
    } else {
      const errBody = await dbRes.text().catch(() => '');
      console.error(
        `[SUPABASE_INSERT_FAILED] HTTP ${dbRes.status}. Table: buyer_requirements. Details: ${errBody}`
      );
    }
  } catch (dbErr: unknown) {
    const errorMsg = dbErr instanceof Error ? dbErr.message : 'Unknown database error';
    console.error(`[SUPABASE_NETWORK_EXCEPTION] ${errorMsg}`);
  }

  // System of Record Safety Gate: NEVER give false success if DB write failed
  if (!dbInsertSuccess) {
    sendJsonResponse(500, {
      success: false,
      error: 'We could not submit your requirement at this time. Please try again.',
    });
    return;
  }

  // DB Insert Succeeded -> Attempt Email Dispatch
  const emailResult = await sendTradeDeskEmail(referenceId, sanitized, submittedAtIso);

  // Update Database with Email Dispatch Status (Fire-and-forget background patch)
  if (emailResult.success) {
    try {
      const patchEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/buyer_requirements?reference_id=eq.${encodeURIComponent(referenceId)}`;
      await fetch(patchEndpoint, {
        method: 'PATCH',
        headers: {
          apikey: supabaseServiceRoleKey,
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_sent: true,
          email_dispatched_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      });
    } catch {
      // Non-fatal if patch tracking fails
    }
  } else if (emailResult.error) {
    try {
      const patchEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/buyer_requirements?reference_id=eq.${encodeURIComponent(referenceId)}`;
      await fetch(patchEndpoint, {
        method: 'PATCH',
        headers: {
          apikey: supabaseServiceRoleKey,
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_sent: false,
          email_error: sanitizeString(emailResult.error, 255),
          updated_at: new Date().toISOString(),
        }),
      });
    } catch {
      // Non-fatal
    }
  }

  // Return Controlled Success Response
  sendJsonResponse(200, {
    success: true,
    referenceId,
    message: 'Your commercial requirement has been received by the SHIVOM GLOBAL trade desk.',
  });
}
