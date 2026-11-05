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

      // Mock PostgREST: conflict-ignore insert returns [] on conflict, subsequent GET retrieves original
      globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        const method = init?.method || 'GET';
        if (url.includes('/rest/v1/buyer_requirements')) {
          if (method === 'POST') {
            // PostgREST with resolution=ignore-duplicates returns [] when idempotency_key conflicts
            return new Response('[]', { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
          if (method === 'GET') {
            // Lookup retrieves original un-modified row
            return new Response(
              JSON.stringify([{ reference_id: existingRef }]),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
          }
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

    it('should create new record and return status ACCEPTED when idempotency key is novel', async () => {
      const handler = await loadHandler();
      let capturedStatus = 0;
      let capturedPayload: any = null;

      const prevUrl = process.env.SUPABASE_URL;
      const prevKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.SUPABASE_URL = 'https://mock.supabase.co';
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-role-key';

      const originalFetch = globalThis.fetch;
      const expectedRef = 'SG-REQ-20261105-NEWREF';

      // Mock PostgREST: insert succeeds and returns representation with new reference_id
      globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        const method = init?.method || 'GET';
        if (url.includes('/rest/v1/buyer_requirements') && method === 'POST') {
          return new Response(
            JSON.stringify([{ reference_id: expectedRef }]),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
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
          idempotencyKey: 'b2c3d4e5-f6a7-4b2c-9d3e-4f5a6b7c8d9e',
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
        assert.equal(capturedPayload.status, 'ACCEPTED');
        assert.equal(capturedPayload.duplicate, false);
        assert.equal(capturedPayload.referenceId, expectedRef);
      } finally {
        globalThis.fetch = originalFetch;
        process.env.SUPABASE_URL = prevUrl;
        process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
      }
    });

    it('should return HTTP 503 SERVICE_UNAVAILABLE when duplicate is detected but subsequent lookup fails', async () => {
      const handler = await loadHandler();
      let capturedStatus = 0;
      let capturedPayload: any = null;

      const prevUrl = process.env.SUPABASE_URL;
      const prevKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.SUPABASE_URL = 'https://mock.supabase.co';
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-role-key';

      const originalFetch = globalThis.fetch;

      // Mock PostgREST: insert returns [] (conflict), but lookup GET fails with 500
      globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        const method = init?.method || 'GET';
        if (url.includes('/rest/v1/buyer_requirements')) {
          if (method === 'POST') {
            return new Response('[]', { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
          if (method === 'GET') {
            return new Response('Database timeout during lookup', { status: 500 });
          }
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
          idempotencyKey: 'c3d4e5f6-a7b8-4c3d-ae4f-5a6b7c8d9e0f',
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
      } finally {
        globalThis.fetch = originalFetch;
        process.env.SUPABASE_URL = prevUrl;
        process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
      }
    });
  });

  describe('4. Buyer Requirements Schema Static Verification', () => {
    it('should verify the primary buyer_requirements table definition exists', () => {
      const primaryMigrationPath = path.resolve(
        process.cwd(),
        'supabase/migrations/20261021000000_buyer_requirements.sql'
      );
      const sql = fs.readFileSync(primaryMigrationPath, 'utf-8');
      assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS public.buyer_requirements'));
      assert.ok(sql.includes('reference_id TEXT NOT NULL UNIQUE'));
      assert.ok(sql.includes('ALTER TABLE public.buyer_requirements ENABLE ROW LEVEL SECURITY'));
      assert.ok(sql.includes('GRANT ALL ON public.buyer_requirements TO service_role'));
    });

    it('should verify the buyer_requirements idempotency key unique constraint', () => {
      const hardeningMigrationPath = path.resolve(
        process.cwd(),
        'supabase/migrations/20261104000000_inquiry_reliability_hardening.sql'
      );
      const sql = fs.readFileSync(hardeningMigrationPath, 'utf-8');
      assert.ok(sql.includes('ADD COLUMN IF NOT EXISTS idempotency_key TEXT;'));
      assert.ok(sql.includes('idx_buyer_requirements_idempotency_key'));
      assert.ok(sql.includes('CREATE UNIQUE INDEX IF NOT EXISTS'));
    });
  });
});
