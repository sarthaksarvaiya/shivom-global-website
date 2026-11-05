/**
 * SHIVOM GLOBAL — Section 06: Export Process Modernization Unit Tests
 * Sourcing & Export Pathway Verification Suite
 *
 * Test coverage:
 * 1. Two-Phase Operational Journey contracts (Phase 1 Pre-Commitment vs Phase 2 Commercial Execution).
 * 2. Four Pre-Commitment Milestones & Parameters (Intake, Sourcing, Samples, 4-Parameter Cupping).
 * 3. Eight Commercial Execution requirements (Quantity, Packaging, Pricing, Milestones, Invoice, Paperwork, Freight, Dispatch).
 * 4. CTA routing architecture and Form Intent contracts (Quote vs Sample vs Grade Explorer).
 * 5. CSS token consistency and legacy dormant style purge verification (SEC06-CSS-01).
 * 6. Photographic asset integrity (WebP/JPEG variants on disk).
 * 7. Commercial governance, Incoterms, and regulatory compliance claims.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Section 06: Sourcing & Export Pathway Modernization Suite', () => {
  const rootDir = process.cwd();
  const componentPath = path.join(rootDir, 'src/features/export-process/components/HowItWorksSection.tsx');
  const cssPath = path.join(rootDir, 'src/styles/index.css');
  const componentSource = fs.readFileSync(componentPath, 'utf8');
  const cssSource = fs.readFileSync(cssPath, 'utf8');

  describe('1. Two-Phase Structural Architecture & Hierarchy', () => {
    it('should define Section 06 with semantic HTML5 section and ivory theme', () => {
      assert.ok(componentSource.includes('id="how-it-works"'));
      assert.ok(componentSource.includes('className="how-it-works-section theme-ivory"'));
      assert.ok(componentSource.includes('aria-labelledby="how-it-works-heading"'));
    });

    it('should contain the Top Editorial Showcase with authentic cupping photography', () => {
      assert.ok(componentSource.includes('export-editorial-showcase'));
      assert.ok(componentSource.includes('STRUCTURED SOURCING FLOW'));
      assert.ok(componentSource.includes('The Sourcing &amp; Export Pathway'));
      assert.ok(componentSource.includes('export-cupping-manifesto'));
      assert.ok(componentSource.includes('darjeeling-single-origin.webp'));
      assert.ok(componentSource.includes('darjeeling-single-origin-640w.webp'));
      assert.ok(componentSource.includes('darjeeling-single-origin.jpg'));
      assert.ok(componentSource.includes('SENSORY EVALUATION LAB'));
    });

    it('should structure Phase 1: Pre-Commitment Verification (Zero Financial Risk)', () => {
      assert.ok(componentSource.includes('PHASE 01'));
      assert.ok(componentSource.includes('PRE-COMMITMENT VERIFICATION · ZERO FINANCIAL RISK'));
      assert.ok(componentSource.includes('export-phase-wrap export-phase-1'));
    });

    it('should structure Phase 2: Commercial Execution & Export Console (Step 05)', () => {
      assert.ok(componentSource.includes('PHASE 02'));
      assert.ok(componentSource.includes('COMMERCIAL EXECUTION · POST-APPROVAL DISPATCH'));
      assert.ok(componentSource.includes('export-phase-wrap export-phase-2-console'));
      assert.ok(componentSource.includes('Step 05 — Commercial Formalization, Export Clearance &amp; Ocean Freight'));
    });
  });

  describe('2. Four Pre-Commitment Milestones & Operational Details', () => {
    it('should present Milestone 01: Requirement Intake with the 6 core sourcing parameters', () => {
      assert.ok(componentSource.includes('Requirement Intake'));
      assert.ok(componentSource.includes('SPECIFICATION INTAKE'));
      assert.ok(componentSource.includes('Tea Category'));
      assert.ok(componentSource.includes('Specific Grade'));
      assert.ok(componentSource.includes('Liquor Profile'));
      assert.ok(componentSource.includes('Estimated Volume'));
      assert.ok(componentSource.includes('Packaging Format'));
      assert.ok(componentSource.includes('Destination Port'));
    });

    it('should present Milestone 02: Origin & Lot Sourcing with auction and estate options', () => {
      assert.ok(componentSource.includes('Origin & Lot Sourcing'));
      assert.ok(componentSource.includes('ORIGIN & LOT SOURCING'));
      assert.ok(componentSource.includes('Assam Brahmaputra Valley, Darjeeling Hills, or Nilgiri terroirs'));
      assert.ok(componentSource.includes('Guwahati, Kolkata, Siliguri, and Cochin auctions'));
      assert.ok(componentSource.includes('Specification Matching'));
      assert.ok(componentSource.includes('Availability Verification'));
    });

    it('should present Milestone 03: Counter-Sample Preparation with courier coordination and prudent notice', () => {
      assert.ok(componentSource.includes('Counter-Sample Preparation'));
      assert.ok(componentSource.includes('COUNTER-SAMPLE DISPATCH'));
      assert.ok(componentSource.includes('Representative Lot Drawing'));
      assert.ok(componentSource.includes('Moisture-Barrier Packaging'));
      assert.ok(componentSource.includes('Express Courier Dispatch'));
      assert.ok(componentSource.includes('Lot Reservation'));
      // Verify prudent notice (no false promises of free samples or 24hr arrival)
      assert.ok(componentSource.includes('Counter-samples are coordinated subject to origin lot availability and international air courier logistics'));
    });

    it('should present Milestone 04: Sensory Evaluation with the four core tea-quality parameters', () => {
      assert.ok(componentSource.includes('Sensory Evaluation & Approval'));
      assert.ok(componentSource.includes('CUPPING APPROVAL'));
      assert.ok(componentSource.includes('1. Leaf Appearance'));
      assert.ok(componentSource.includes('2. Infusion Liquor'));
      assert.ok(componentSource.includes('3. Aroma Profile'));
      assert.ok(componentSource.includes('4. Cup Briskness'));
      assert.ok(componentSource.includes('Sign-Off Milestone · Unlocks Phase 2'));
    });
  });

  describe('3. Phase 2 Commercial Execution: Eight Core Operations', () => {
    it('should detail Final Quantity Confirmation and FOB / CIF Pricing', () => {
      assert.ok(componentSource.includes('Final Quantity &amp; FOB / CIF Pricing'));
      assert.ok(componentSource.includes('Metric ton volume confirmation'));
      assert.ok(componentSource.includes('FOB Indian Port (Mundra / Kolkata / Nhava Sheva) or CIF Destination Port'));
    });

    it('should detail Packaging Specifications & Contract Packing', () => {
      assert.ok(componentSource.includes('Packaging Specifications &amp; Packing'));
      assert.ok(componentSource.includes('multi-wall paper sacks (25kg–55kg), food-grade woven sacks, or custom retail tins/pouches'));
    });

    it('should detail Payment Milestones & Proforma Invoicing', () => {
      assert.ok(componentSource.includes('Payment Milestones &amp; Proforma Invoice'));
      assert.ok(componentSource.includes('Formal proforma invoice issued upon written sample approval with agreed milestone terms'));
    });

    it('should detail Export Documentation & Port Freight Coordination', () => {
      assert.ok(componentSource.includes('Export Documentation &amp; Port Freight'));
      assert.ok(componentSource.includes('Tea Board of India export clearance'));
      assert.ok(componentSource.includes('Phytosanitary Certificate, Certificate of Origin'));
      assert.ok(componentSource.includes('container inspection, fumigation, customs clearance, and Bill of Lading dispatch'));
    });

    it('should feature active Commercial Governance pulse indicator and reassurance text', () => {
      assert.ok(componentSource.includes('export-pulse-dot'));
      assert.ok(componentSource.includes('Commercial Governance:'));
      assert.ok(componentSource.includes('Operational sourcing and ocean logistics are coordinated directly with verified gardens, packing facilities, and accredited shipping lines'));
    });
  });

  describe('4. Interactive Milestone Selection & Disclosure Engine (SEC06-UX-01)', () => {
    it('should manage active milestone state defaulting to Step 1', () => {
      assert.ok(componentSource.includes('useState<number>(1)'));
    });

    it('should provide keyboard handlers supporting Enter and Space key selection', () => {
      assert.ok(componentSource.includes('onKeyDown={(e) => handleKeyDown(e, m.stepNumber)}'));
      assert.ok(componentSource.includes("e.key === 'Enter' || e.key === ' '"));
    });

    it('should provide accessible ARIA attributes for expandable disclosure drawers', () => {
      assert.ok(componentSource.includes('aria-expanded={isActive}'));
      assert.ok(componentSource.includes('aria-controls={`milestone-detail-${m.stepNumber}`}'));
      assert.ok(componentSource.includes('role="region"'));
    });

    it('should visually differentiate active and completed milestone states', () => {
      assert.ok(componentSource.includes('export-step-card-active'));
      assert.ok(componentSource.includes('export-step-card-completed'));
      assert.ok(componentSource.includes('export-step-number-completed'));
      assert.ok(componentSource.includes('export-step-number-active'));
    });
  });

  describe('5. CTA Routing Architecture Contracts (SEC06-FNC-01)', () => {
    it('should route Step 01 action to onSubmitRequirement (quote intent / Form B)', () => {
      assert.ok(componentSource.includes('handleStartRequirement'));
      assert.ok(componentSource.includes('onSubmitRequirement()'));
    });

    it('should route Step 02 action to onExploreGrades (#tea-by-grade smooth scroll)', () => {
      assert.ok(componentSource.includes('handleExploreGrades'));
      assert.ok(componentSource.includes('onExploreGrades()'));
      assert.ok(componentSource.includes("document.getElementById('tea-by-grade')"));
    });

    it('should route Step 03 action to onRequestSamples (sample intent / Form A)', () => {
      assert.ok(componentSource.includes('handleRequestSamples'));
      assert.ok(componentSource.includes('onRequestSamples()'));
    });

    it('should route Phase 1 Banner CTA to onRequestSamples (sample intent / Form A)', () => {
      assert.ok(componentSource.includes('className="export-phase-1-cta-btn"'));
      assert.ok(componentSource.includes('onClick={handleRequestSamples}'));
      assert.ok(componentSource.includes('Request Counter-Samples'));
    });

    it('should route Phase 2 Console CTA to onSubmitRequirement (quote intent / Form B)', () => {
      assert.ok(componentSource.includes('className="export-console-cta-btn"'));
      assert.ok(componentSource.includes('onClick={handleStartRequirement}'));
      assert.ok(componentSource.includes('Submit Commercial Requirement'));
    });
  });

  describe('6. CSS Architecture & Dormant Code Purge (SEC06-CSS-01 & SEC06-BUG-01)', () => {
    it('should have purged dormant legacy classes (.how-it-works-header, .how-it-works-title, .how-it-works-lead)', () => {
      assert.equal(cssSource.includes('.how-it-works-header {'), false, 'Dormant .how-it-works-header must be removed');
      assert.equal(cssSource.includes('.how-it-works-title {'), false, 'Dormant .how-it-works-title must be removed');
      assert.equal(cssSource.includes('.how-it-works-lead {'), false, 'Dormant .how-it-works-lead must be removed');
    });

    it('should contain all required modern Section 06 classes in index.css', () => {
      const requiredClasses = [
        '.how-it-works-section',
        '.export-editorial-showcase',
        '.export-cupping-manifesto',
        '.export-photo-frame',
        '.export-phase-wrap',
        '.export-step-grid',
        '.export-step-card',
        '.export-step-card-active',
        '.export-step-card-completed',
        '.export-step-detail-drawer',
        '.export-step-parameter-list',
        '.export-phase-1-banner',
        '.export-phase-1-cta-btn',
        '.export-phase-2-console',
        '.export-console-deliverables-grid',
        '.export-console-action-ribbon',
        '.export-pulse-dot',
        '.export-console-cta-btn',
      ];

      for (const cls of requiredClasses) {
        assert.ok(cssSource.includes(cls), `CSS must define ${cls}`);
      }
    });

    it('should define safe mobile bottom clearance to eliminate WhatsApp float overlap (SEC06-RSP-02)', () => {
      assert.ok(cssSource.includes('padding-bottom: clamp(5rem, 12vw, 6.5rem)'));
    });

    it('should support prefers-reduced-motion for all interactive and animated elements', () => {
      assert.ok(cssSource.includes('@media (prefers-reduced-motion: reduce)'));
      assert.ok(cssSource.includes('.export-pulse-dot::after'));
      assert.ok(cssSource.includes('.export-step-detail-drawer.drawer-open'));
    });
  });

  describe('7. Photographic Asset Verification', () => {
    it('should verify that all referenced cupping photographic assets exist on disk', () => {
      const images = [
        'public/images/darjeeling-single-origin.webp',
        'public/images/darjeeling-single-origin-640w.webp',
        'public/images/darjeeling-single-origin.jpg',
      ];

      for (const img of images) {
        const fullPath = path.join(rootDir, img);
        assert.ok(fs.existsSync(fullPath), `Asset ${img} must exist on disk`);
        const stats = fs.statSync(fullPath);
        assert.ok(stats.size > 1000, `Asset ${img} must be non-empty`);
      }
    });
  });
});

