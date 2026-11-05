import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

/**
 * SHIVOM GLOBAL — Commercial Buyer Requirement Submission Endpoint
 * Runtime: Vercel Serverless Function (Node.js) / Local Dev Middleware
 * Pipeline: Validate -> Sanitize -> DB Insert (Supabase) -> Controlled Response
 * System of Record: Supabase Database (public.buyer_requirements)
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
  idempotencyKey?: unknown;
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
  idempotencyKey: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// Allowed Origins for CORS protection (strictly scoped to project domains)
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/shivom-global-website(-[a-z0-9-]+)?\.vercel\.app$/,
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

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const DB_TIMEOUT_MS = 6000;

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Idempotency-Key');
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
      status: 'ACCEPTED',
      duplicate: false,
      referenceId: fakeRef,
      message: 'Your requirement specification has been received for commercial evaluation.',
    });
    return;
  }

  // Idempotency Key Extraction & Validation
  const rawIdempotencyKey = (
    (typeof body.idempotencyKey === 'string' && body.idempotencyKey) ||
    (typeof req.headers['idempotency-key'] === 'string' && req.headers['idempotency-key']) ||
    ''
  ).trim();

  if (!rawIdempotencyKey || !UUID_REGEX.test(rawIdempotencyKey)) {
    sendJsonResponse(400, {
      success: false,
      status: 'VALIDATION_ERROR',
      error: 'A valid submission idempotency key (UUID) is required.',
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
    idempotencyKey: rawIdempotencyKey.toLowerCase(),
  };

  // Validate Required Fields Server-Side
  const validationErrors = validateServerPayload(sanitized);
  if (Object.keys(validationErrors).length > 0) {
    sendJsonResponse(400, {
      success: false,
      status: 'VALIDATION_ERROR',
      error: 'Please review the highlighted fields and try again.',
      details: validationErrors,
    });
    return;
  }

  // Generate Candidate Reference ID (Used for new inserts)
  const candidateReferenceId = generateServerReferenceId();
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
    sendJsonResponse(503, {
      success: false,
      status: 'SERVICE_UNAVAILABLE',
      error: 'The requirement intake service is temporarily unavailable. Please try again.',
    });
    return;
  }

  const dbRow = {
    idempotency_key: sanitized.idempotencyKey,
    reference_id: candidateReferenceId,
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

  let authoritativeReferenceId = candidateReferenceId;
  let isDuplicate = false;
  let submissionSuccess = false;

  try {
    // 1. Conflict-Ignore Insert (ON CONFLICT DO NOTHING)
    // Resolution=ignore-duplicates guarantees existing buyer records are NEVER overwritten on retry
    const supabaseEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/buyer_requirements?on_conflict=idempotency_key`;
    const dbRes = await fetch(supabaseEndpoint, {
      method: 'POST',
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation,resolution=ignore-duplicates',
      },
      body: JSON.stringify(dbRow),
      signal: AbortSignal.timeout(DB_TIMEOUT_MS),
    });

    if (dbRes.ok) {
      const returnedJson = await dbRes.json().catch(() => null);
      if (Array.isArray(returnedJson) && returnedJson.length > 0 && returnedJson[0]?.reference_id) {
        // Brand-new inquiry record created
        authoritativeReferenceId = String(returnedJson[0].reference_id);
        isDuplicate = false;
        submissionSuccess = true;
      } else {
        // Conflict detected: 0 rows returned because idempotency_key already exists
        // Must retrieve original record without modifying existing data
        isDuplicate = true;
      }
    } else if (dbRes.status === 409) {
      // Direct HTTP 409 conflict signal
      isDuplicate = true;
    } else {
      const errBody = await dbRes.text().catch(() => '');
      console.error(
        `[SUPABASE_INSERT_FAILED] HTTP ${dbRes.status}. Table: buyer_requirements. Details: ${errBody}`
      );
    }

    // 2. If a duplicate was detected (or 0 rows returned on conflict), query the original record
    if (isDuplicate) {
      const lookupEndpoint = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/buyer_requirements?idempotency_key=eq.${encodeURIComponent(sanitized.idempotencyKey)}&select=reference_id`;
      const lookupRes = await fetch(lookupEndpoint, {
        method: 'GET',
        headers: {
          apikey: supabaseServiceRoleKey,
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(DB_TIMEOUT_MS),
      });

      if (lookupRes.ok) {
        const lookupRows = await lookupRes.json().catch(() => null);
        if (Array.isArray(lookupRows) && lookupRows.length > 0 && lookupRows[0]?.reference_id) {
          authoritativeReferenceId = String(lookupRows[0].reference_id);
          submissionSuccess = true;
        }
      } else {
        const lookupErr = await lookupRes.text().catch(() => '');
        console.error(`[SUPABASE_LOOKUP_FAILED] HTTP ${lookupRes.status}: ${lookupErr}`);
      }
    }
  } catch (dbErr: unknown) {
    const errorMsg = dbErr instanceof Error ? dbErr.message : 'Unknown database error';
    console.error(`[SUPABASE_NETWORK_EXCEPTION] ${errorMsg}`);
  }

  // System of Record Safety Gate: NEVER give false success if DB write or duplicate lookup failed
  if (!submissionSuccess) {
    sendJsonResponse(503, {
      success: false,
      status: 'SERVICE_UNAVAILABLE',
      error: 'We could not submit your requirement at this time. Please try again.',
    });
    return;
  }

  // If this was an idempotent duplicate, resolve immediately without altering existing data
  if (isDuplicate) {
    sendJsonResponse(200, {
      success: true,
      status: 'DUPLICATE',
      duplicate: true,
      referenceId: authoritativeReferenceId,
      message: 'Your requirement specification is already safely on file with the SHIVOM GLOBAL trade desk.',
    });
    return;
  }

  // Brand-New Submission: Return Controlled Success Response
  sendJsonResponse(200, {
    success: true,
    status: 'ACCEPTED',
    duplicate: false,
    referenceId: authoritativeReferenceId,
    message: 'Your commercial requirement has been received by the SHIVOM GLOBAL trade desk.',
  });
}
