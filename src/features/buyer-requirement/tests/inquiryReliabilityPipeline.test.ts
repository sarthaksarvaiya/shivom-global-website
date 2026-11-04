import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateIdempotencyKey,
  buildRequirementRecord,
} from '../utils/requirementValidation.ts';
import { submitBuyerRequirement } from '../services/submissionAdapter.ts';
import type { BuyerRequirementFormData } from '../types/buyerRequirement.ts';
import fs from 'fs';
import path from 'path';

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const SAMPLE_DATA: BuyerRequirementFormData = {
  companyName: 'Al-Noor Tea Trading LLC',
  contactPerson: 'Tariq Mansoor',
  businessEmail: 'tariq@alnoortea.ae',
  phoneWhatsApp: '+971 50 123 4567',
  country: 'United Arab Emirates',
  requirementType: 'Assam CTC Black Tea',
  grade: 'BOP',
  volume: '1x20ft FCL (~10–12 MT)',
  packaging: 'Standard Bulk Export Sacks',
  destinationPort: 'Jebel Ali, Dubai',
  qualitySpecs: 'Standard Dubai commercial blend',
};

describe('Phase 4A.2 — Inquiry Reliability & Idempotency Pipeline', () => {
  describe('1. Idempotency Key Generation & Lifecycle', () => {
    it('should generate a valid RFC 4122 UUID v4 key', () => {
      const key = generateIdempotencyKey();
      assert.match(key, UUID_V4_REGEX);
    });

    it('should generate distinct keys across consecutive invocations', () => {
      const key1 = generateIdempotencyKey();
      const key2 = generateIdempotencyKey();
      assert.notEqual(key1, key2);
    });

    it('should bind the idempotency key stably to the requirement record', () => {
      const testKey = 'b1e8e2d3-4567-4890-a123-456789abcdef';
      const record = buildRequirementRecord(SAMPLE_DATA, testKey);

      assert.equal(record.idempotencyKey, testKey);
      assert.match(record.referenceId, /^SG-REQ-\d{8}-[2-9A-Z]{4}$/);
      assert.equal(record.companyName, 'Al-Noor Tea Trading LLC');
    });

    it('should generate an idempotency key automatically if omitted', () => {
      const record = buildRequirementRecord(SAMPLE_DATA);
      assert.ok(record.idempotencyKey);
      assert.match(record.idempotencyKey, UUID_V4_REGEX);
    });
  });

  describe('2. Client Submission Adapter Network & Idempotency Contracts', () => {
    it('should attach Idempotency-Key header and payload when submitting', async () => {
      const originalFetch = globalThis.fetch;
      let capturedUrl = '';
      let capturedHeaders: Record<string, string> = {};
      let capturedBody: any = null;

      const testKey = 'c2d3e4f5-6789-4012-b345-678901abcdef';
      const record = buildRequirementRecord(SAMPLE_DATA, testKey);

      globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        capturedUrl = input.toString();
        capturedHeaders = init?.headers as Record<string, string>;
        capturedBody = JSON.parse(init?.body as string);
        return new Response(
          JSON.stringify({
            success: true,
            status: 'ACCEPTED',
            duplicate: false,
            referenceId: 'SG-REQ-20261104-TEST',
            message: 'Your commercial requirement has been received.',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      };

      try {
        const response = await submitBuyerRequirement(record);

        assert.equal(capturedUrl, '/api/buyer-requirements');
        assert.equal(capturedHeaders['Idempotency-Key'], testKey);
        assert.equal(capturedBody.idempotencyKey, testKey);
        assert.equal(response.success, true);
        assert.equal(response.referenceId, 'SG-REQ-20261104-TEST');
        assert.equal(response.isDuplicate, false);
        assert.equal(response.status, 'ACCEPTED');
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it('should accurately handle idempotent duplicate resolution from server', async () => {
      const originalFetch = globalThis.fetch;
      const testKey = 'd3e4f5g6-7890-4123-8456-789012abcdef';
      const record = buildRequirementRecord(SAMPLE_DATA, testKey);

      globalThis.fetch = async () => {
        return new Response(
          JSON.stringify({
            success: true,
            status: 'DUPLICATE',
            duplicate: true,
            referenceId: 'SG-REQ-20261104-ORIG',
            message: 'Your requirement specification is already safely on file.',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      };

      try {
        const response = await submitBuyerRequirement(record);

        assert.equal(response.success, true);
        assert.equal(response.isDuplicate, true);
        assert.equal(response.status, 'DUPLICATE');
        assert.equal(response.referenceId, 'SG-REQ-20261104-ORIG');
        assert.equal(response.record?.referenceId, 'SG-REQ-20261104-ORIG');
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it('should return service unavailable and preserve referenceId on network drop', async () => {
      const originalFetch = globalThis.fetch;
      const testKey = 'e4f5a6b7-8901-4234-9567-890123abcdef';
      const record = buildRequirementRecord(SAMPLE_DATA, testKey);

      globalThis.fetch = async () => {
        throw new Error('Failed to fetch: Network unreachable');
      };

      try {
        const response = await submitBuyerRequirement(record);

        assert.equal(response.success, false);
        assert.equal(response.status, 'SERVICE_UNAVAILABLE');
        assert.equal(response.referenceId, record.referenceId);
        assert.ok(response.message.includes('Network error'));
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe('3. Serverless API Endpoint Contract Verification', () => {
    // Import API handler dynamically for test execution
    const loadHandler = async () => {
      const mod = await import('../../../../api/buyer-requirements.ts');
      return mod.default;
    };

    it('should reject requests missing an idempotency key with HTTP 400', async () => {
      const handler = await loadHandler();
      let capturedStatus = 0;
      let capturedPayload: any = null;

      const mockReq: any = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': '100',
        },
        body: {
          ...SAMPLE_DATA,
          idempotencyKey: '', // Empty
        },
        socket: { remoteAddress: '127.0.0.1' },
      };

      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      await handler(mockReq, mockRes);

      assert.equal(capturedStatus, 400);
      assert.equal(capturedPayload.success, false);
      assert.equal(capturedPayload.status, 'VALIDATION_ERROR');
      assert.ok(capturedPayload.error.includes('idempotency key'));
    });

    it('should reject malformed non-UUID idempotency keys with HTTP 400', async () => {
      const handler = await loadHandler();
      let capturedStatus = 0;
      let capturedPayload: any = null;

      const mockReq: any = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': '100',
        },
        body: {
          ...SAMPLE_DATA,
          idempotencyKey: 'not-a-valid-uuid-format',
        },
        socket: { remoteAddress: '127.0.0.1' },
      };

      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      await handler(mockReq, mockRes);

      assert.equal(capturedStatus, 400);
      assert.equal(capturedPayload.status, 'VALIDATION_ERROR');
    });

    it('should return decoy HTTP 200 on honeypot without database write', async () => {
      const handler = await loadHandler();
      let capturedStatus = 0;
      let capturedPayload: any = null;

      const mockReq: any = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': '100',
        },
        body: {
          ...SAMPLE_DATA,
          idempotencyKey: generateIdempotencyKey(),
          website_hp: 'automated_spam_bot',
        },
        socket: { remoteAddress: '127.0.0.1' },
      };

      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      await handler(mockReq, mockRes);

      assert.equal(capturedStatus, 200);
      assert.equal(capturedPayload.success, true);
      assert.equal(capturedPayload.status, 'ACCEPTED');
      assert.match(capturedPayload.referenceId, /^SG-REQ-/);
    });

    it('should return HTTP 503 SERVICE_UNAVAILABLE when Supabase is unreachable', async () => {
      const handler = await loadHandler();
      let capturedStatus = 0;
      let capturedPayload: any = null;

      const prevUrl = process.env.SUPABASE_URL;
      const prevKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.SUPABASE_URL = 'https://mock.supabase.co';
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-role-key';

      const originalFetch = globalThis.fetch;
      globalThis.fetch = async () => {
        throw new Error('Supabase network unreachable');
      };

      const mockReq: any = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': '100',
        },
        body: {
          ...SAMPLE_DATA,
          idempotencyKey: generateIdempotencyKey(),
        },
        socket: { remoteAddress: '127.0.0.1' },
      };

      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      try {
        await handler(mockReq, mockRes);

        assert.equal(capturedStatus, 503);
        assert.equal(capturedPayload.success, false);
        assert.equal(capturedPayload.status, 'SERVICE_UNAVAILABLE');
        assert.ok(capturedPayload.error.includes('could not submit') || capturedPayload.error.includes('unavailable'));
      } finally {
        globalThis.fetch = originalFetch;
        process.env.SUPABASE_URL = prevUrl;
        process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
      }
    });

    it('should handle idempotent duplicate on server upsert and return original reference', async () => {
      const handler = await loadHandler();
      let capturedStatus = 0;
      let capturedPayload: any = null;

      const prevUrl = process.env.SUPABASE_URL;
      const prevKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.SUPABASE_URL = 'https://mock.supabase.co';
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-role-key';

      const originalFetch = globalThis.fetch;
      const existingRef = 'SG-REQ-20261104-ORIGINAL';

      // Mock PostgREST returning existing row on conflict
      globalThis.fetch = async (input: RequestInfo | URL) => {
        const url = input.toString();
        if (url.includes('/rest/v1/buyer_requirements')) {
          return new Response(
            JSON.stringify([
              {
                id: '11111111-2222-3333-4444-555555555555',
                reference_id: existingRef,
                created_at: '2026-11-04T00:00:00Z',
              },
            ]),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
        return new Response('{}', { status: 200 });
      };

      const mockReq: any = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': '100',
        },
        body: {
          ...SAMPLE_DATA,
          idempotencyKey: 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
        },
        socket: { remoteAddress: '127.0.0.1' },
      };

      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      try {
        await handler(mockReq, mockRes);

        assert.equal(capturedStatus, 200);
        assert.equal(capturedPayload.success, true);
        assert.equal(capturedPayload.status, 'DUPLICATE');
        assert.equal(capturedPayload.duplicate, true);
        assert.equal(capturedPayload.referenceId, existingRef);
      } finally {
        globalThis.fetch = originalFetch;
        process.env.SUPABASE_URL = prevUrl;
        process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
      }
    });
  });

  describe('4. Notification Retry Worker Contract Verification', () => {
    const loadCronWorker = async () => {
      const mod = await import('../../../../api/cron/retry-failed-inquiries.ts');
      return mod.default;
    };

    it('should reject request with HTTP 500 when CRON_SECRET is missing in production', async () => {
      const cronWorker = await loadCronWorker();
      const prevEnv = process.env.NODE_ENV;
      const prevSecret = process.env.CRON_SECRET;
      process.env.NODE_ENV = 'production';
      delete process.env.CRON_SECRET;

      let capturedStatus = 0;
      let capturedPayload: any = null;

      const mockReq: any = {
        method: 'POST',
        headers: {},
      };

      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      try {
        await cronWorker(mockReq, mockRes);
        assert.equal(capturedStatus, 500);
        assert.equal(capturedPayload.success, false);
        assert.ok(capturedPayload.error.includes('CRON_SECRET must be configured in production'));
      } finally {
        process.env.NODE_ENV = prevEnv;
        if (prevSecret !== undefined) process.env.CRON_SECRET = prevSecret;
      }
    });

    it('should reject unauthorized requests when CRON_SECRET is configured with invalid token', async () => {
      const cronWorker = await loadCronWorker();
      const prevSecret = process.env.CRON_SECRET;
      process.env.CRON_SECRET = 'super-secret-token-123';

      let capturedStatus = 0;
      let capturedPayload: any = null;

      const mockReq: any = {
        method: 'POST',
        headers: {
          authorization: 'Bearer wrong-token',
        },
      };

      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      try {
        await cronWorker(mockReq, mockRes);
        assert.equal(capturedStatus, 401);
        assert.equal(capturedPayload.success, false);
      } finally {
        if (prevSecret !== undefined) {
          process.env.CRON_SECRET = prevSecret;
        } else {
          delete process.env.CRON_SECRET;
        }
      }
    });

    it('should reject request when bearer token is completely missing in production', async () => {
      const cronWorker = await loadCronWorker();
      const prevEnv = process.env.NODE_ENV;
      const prevSecret = process.env.CRON_SECRET;
      process.env.NODE_ENV = 'production';
      process.env.CRON_SECRET = 'production-secret-token-456';

      let capturedStatus = 0;
      let capturedPayload: any = null;

      const mockReq: any = {
        method: 'POST',
        headers: {},
      };

      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      try {
        await cronWorker(mockReq, mockRes);
        assert.equal(capturedStatus, 401);
        assert.equal(capturedPayload.success, false);
        assert.ok(capturedPayload.error.includes('Unauthorized'));
      } finally {
        process.env.NODE_ENV = prevEnv;
        if (prevSecret !== undefined) {
          process.env.CRON_SECRET = prevSecret;
        } else {
          delete process.env.CRON_SECRET;
        }
      }
    });

    it('should authenticate successfully when valid CRON_SECRET token is provided in production', async () => {
      const cronWorker = await loadCronWorker();
      const prevEnv = process.env.NODE_ENV;
      const prevSecret = process.env.CRON_SECRET;
      const prevUrl = process.env.SUPABASE_URL;
      const prevKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.NODE_ENV = 'production';
      process.env.CRON_SECRET = 'valid-production-secret-789';
      process.env.SUPABASE_URL = 'https://mock.supabase.co';
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-role-key';

      const originalFetch = globalThis.fetch;
      globalThis.fetch = async () => {
        return new Response('[]', { status: 200, headers: { 'Content-Type': 'application/json' } });
      };

      let capturedStatus = 0;
      let capturedPayload: any = null;

      const mockReq: any = {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-production-secret-789',
        },
      };

      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      try {
        await cronWorker(mockReq, mockRes);
        assert.equal(capturedStatus, 200);
        assert.equal(capturedPayload.success, true);
      } finally {
        globalThis.fetch = originalFetch;
        process.env.NODE_ENV = prevEnv;
        if (prevSecret !== undefined) process.env.CRON_SECRET = prevSecret;
        else delete process.env.CRON_SECRET;
        process.env.SUPABASE_URL = prevUrl;
        process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
      }
    });

    it('should claim batch and skip BUYER_ACKNOWLEDGMENT events per Phase 4A.2 boundary rule', async () => {
      const cronWorker = await loadCronWorker();
      const prevUrl = process.env.SUPABASE_URL;
      const prevKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.SUPABASE_URL = 'https://mock.supabase.co';
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-role-key';

      const originalFetch = globalThis.fetch;
      const claimedJobs = [
        {
          id: 'job-1',
          inquiry_id: 'inq-1',
          reference_id: 'SG-REQ-20261104-JOB1',
          notification_type: 'BUYER_ACKNOWLEDGMENT', // Should be skipped!
          recipient_email: 'buyer@example.com',
          status: 'PROCESSING',
          attempt_count: 1,
          max_attempts: 5,
          payload: {},
        },
      ];

      globalThis.fetch = async (input: RequestInfo | URL) => {
        const url = input.toString();
        if (url.includes('claim_inquiry_outbox_jobs')) {
          return new Response(JSON.stringify(claimedJobs), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return new Response('{}', { status: 200 });
      };

      let capturedStatus = 0;
      let capturedPayload: any = null;

      const mockReq: any = { method: 'POST', headers: {} };
      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      try {
        await cronWorker(mockReq, mockRes);

        assert.equal(capturedStatus, 200);
        assert.equal(capturedPayload.success, true);
        assert.equal(capturedPayload.skipped, 1);
        assert.equal(capturedPayload.succeeded, 0);
      } finally {
        globalThis.fetch = originalFetch;
        process.env.SUPABASE_URL = prevUrl;
        process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
      }
    });

    it('should claim TRADE_DESK_ALERT, dispatch via Resend, and mark status SENT on success', async () => {
      const cronWorker = await loadCronWorker();
      const prevUrl = process.env.SUPABASE_URL;
      const prevKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const prevApiKey = process.env.EMAIL_API_KEY;
      process.env.SUPABASE_URL = 'https://mock.supabase.co';
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-role-key';
      process.env.EMAIL_API_KEY = 'mock-resend-api-key';

      const originalFetch = globalThis.fetch;
      const patchedStatuses: string[] = [];

      const claimedJobs = [
        {
          id: 'job-trade-1',
          inquiry_id: 'inq-trade-1',
          reference_id: 'SG-REQ-20261104-TRADE',
          notification_type: 'TRADE_DESK_ALERT',
          recipient_email: 'shivomglobal1010@gmail.com',
          status: 'PROCESSING',
          attempt_count: 1,
          max_attempts: 5,
          payload: {
            reference_id: 'SG-REQ-20261104-TRADE',
            company_name: 'Gulf Beverages LLC',
            contact_name: 'Rashid Khan',
            corporate_email: 'rashid@gulfbev.ae',
            phone: '+971 50 999 8888',
            buyer_country: 'United Arab Emirates',
            requirement_type: 'Assam CTC Black Tea',
            grade: 'BP',
            quantity: '1x20ft FCL',
            packaging_requirements: 'Standard Bulk Export Sacks',
            target_market: 'Jebel Ali',
          },
        },
      ];

      globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        if (url.includes('claim_inquiry_outbox_jobs')) {
          return new Response(JSON.stringify(claimedJobs), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        if (url.includes('api.resend.com/emails')) {
          return new Response(JSON.stringify({ id: 'resend-msg-123' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        if (url.includes('/rest/v1/inquiry_outbox')) {
          if (init?.method === 'PATCH') {
            const body = JSON.parse(init.body as string);
            if (body.status) patchedStatuses.push(body.status);
          }
          return new Response('[]', { status: 200 });
        }
        return new Response('[]', { status: 200 });
      };

      let capturedStatus = 0;
      let capturedPayload: any = null;

      const mockReq: any = { method: 'POST', headers: {} };
      const mockRes: any = {
        setHeader: () => {},
        end: (bodyStr: string) => {
          capturedPayload = JSON.parse(bodyStr);
        },
      };
      Object.defineProperty(mockRes, 'statusCode', {
        set(val: number) {
          capturedStatus = val;
        },
        get() {
          return capturedStatus;
        },
      });

      try {
        await cronWorker(mockReq, mockRes);

        assert.equal(capturedStatus, 200);
        assert.equal(capturedPayload.success, true);
        assert.equal(capturedPayload.succeeded, 1);
        assert.ok(patchedStatuses.includes('SENT'));
      } finally {
        globalThis.fetch = originalFetch;
        process.env.SUPABASE_URL = prevUrl;
        process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
        process.env.EMAIL_API_KEY = prevApiKey;
      }
    });
  });

  describe('5. Database Migration Static Verification', () => {
    const migrationPath = path.resolve(
      process.cwd(),
      'supabase/migrations/20261104000000_inquiry_reliability_hardening.sql'
    );

    it('should contain the idempotency_key column and unique index', () => {
      const sql = fs.readFileSync(migrationPath, 'utf-8');
      assert.ok(sql.includes('ADD COLUMN IF NOT EXISTS idempotency_key TEXT;'));
      assert.ok(sql.includes('idx_buyer_requirements_idempotency_key'));
      assert.ok(sql.includes('CREATE UNIQUE INDEX IF NOT EXISTS'));
    });

    it('should define public.inquiry_outbox with all required fields', () => {
      const sql = fs.readFileSync(migrationPath, 'utf-8');
      assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.inquiry_outbox'));
      assert.ok(sql.includes('notification_type TEXT NOT NULL CHECK'));
      assert.ok(sql.includes('TRADE_DESK_ALERT'));
      assert.ok(sql.includes('BUYER_ACKNOWLEDGMENT'));
      assert.ok(sql.includes('status TEXT NOT NULL DEFAULT \'PENDING\''));
      assert.ok(sql.includes('locked_at TIMESTAMPTZ'));
      assert.ok(sql.includes('locked_by TEXT'));
      assert.ok(sql.includes('lease_expires_at TIMESTAMPTZ'));
      assert.ok(sql.includes('attempt_count INTEGER'));
      assert.ok(sql.includes('max_attempts INTEGER'));
      assert.ok(sql.includes('uq_inquiry_outbox_event UNIQUE (inquiry_id, notification_type)'));
    });

    it('should define the atomic AFTER INSERT trigger for outbox event creation', () => {
      const sql = fs.readFileSync(migrationPath, 'utf-8');
      assert.ok(sql.includes('CREATE OR REPLACE FUNCTION public.trg_enqueue_inquiry_outbox'));
      assert.ok(sql.includes('AFTER INSERT ON public.buyer_requirements'));
      assert.ok(sql.includes('ON CONFLICT (inquiry_id, notification_type) DO NOTHING'));
    });

    it('should define the claim_inquiry_outbox_jobs function with FOR UPDATE SKIP LOCKED', () => {
      const sql = fs.readFileSync(migrationPath, 'utf-8');
      assert.ok(sql.includes('CREATE OR REPLACE FUNCTION public.claim_inquiry_outbox_jobs'));
      assert.ok(sql.includes('FOR UPDATE SKIP LOCKED'));
      assert.ok(sql.includes('p_batch_size INTEGER'));
      assert.ok(sql.includes('p_lease_seconds INTEGER'));
    });

    it('should harden SECURITY DEFINER functions with explicit search_path and schema qualification', () => {
      const sql = fs.readFileSync(migrationPath, 'utf-8');
      // Verify SET search_path = '' on both security definer functions
      assert.ok(sql.includes("CREATE OR REPLACE FUNCTION public.trg_enqueue_inquiry_outbox()\nRETURNS TRIGGER\nLANGUAGE plpgsql\nSECURITY DEFINER\nSET search_path = ''"));
      assert.ok(sql.includes("CREATE OR REPLACE FUNCTION public.claim_inquiry_outbox_jobs(\n  p_batch_size INTEGER DEFAULT 10,\n  p_worker_id TEXT DEFAULT 'worker',\n  p_lease_seconds INTEGER DEFAULT 180\n)\nRETURNS SETOF public.inquiry_outbox\nLANGUAGE plpgsql\nSECURITY DEFINER\nSET search_path = ''"));
      // Verify schema qualification
      assert.ok(sql.includes('pg_catalog.current_setting'));
      assert.ok(sql.includes('pg_catalog.jsonb_build_object'));
      assert.ok(sql.includes('pg_catalog.timezone'));
      assert.ok(sql.includes('pg_catalog.now()'));
    });

    it('should enforce strict Row-Level Security and service_role grants', () => {
      const sql = fs.readFileSync(migrationPath, 'utf-8');
      assert.ok(sql.includes('ALTER TABLE public.inquiry_outbox ENABLE ROW LEVEL SECURITY'));
      assert.ok(sql.includes('REVOKE ALL ON public.inquiry_outbox FROM anon, authenticated'));
      assert.ok(sql.includes('GRANT ALL ON public.inquiry_outbox TO service_role'));
    });
  });
});
