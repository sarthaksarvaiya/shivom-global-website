# 06 — Export Process (The Sourcing & Export Pathway / How It Works)

## 1. Section Overview
- **Section ID**: `sec-06` / `<section id="how-it-works" className="how-it-works-section theme-ivory">`
- **Section Name**: The Sourcing & Export Pathway (Two-Phase Editorial Export Journey)
- **Position on Website**: Section 5 of the main content flow, rendered directly below `PrivateLabelSection` and directly above `WhyShivomGlobal`.
- **Main Purpose**: Demystify the cross-border Indian tea procurement cycle for international B2B buyers into a structured two-phase operational framework that removes commercial risk by requiring physical counter-sample cupping approval prior to proforma invoicing and ocean dispatch.
- **Target Audience**: International tea buyers, commercial blenders, private-label distributors, and institutional importers who require organoleptic proof of dry leaf appearance, liquor infusion, and cup briskness before making financial commitments.
- **Business Objective**: Reassure international buyers of zero financial risk prior to sample sign-off, build institutional credibility through authentic sensory cupping aesthetics, and route users accurately to either Detailed Specification Intake (`'quote'`) or Quick Sample Enquiry (`'sample'`).

## 2. Modernized Architecture (Hybrid: Concept A + Concept C)
- **Architectural Paradigm**: Two-Phase Operational Journey with Editorial Cupping Showcase
  1. **Editorial Sensory Cupping Showcase**:
     - **Header**: Gold specification badge (`STRUCTURED SOURCING FLOW`), H2 title (`The Sourcing & Export Pathway`), and authoritative lead copy.
     - **Sensory Verification Manifesto**: Shield-checked callout box detailing the buyer-first sourcing protocol with three core pillars:
       - *Pre-Commitment Samples*: Representative lots dispatched for physical laboratory evaluation.
       - *Invoice-Matched Dispatch*: Export container dispatches match approved counter-sample specifications.
       - *Transparent Incoterms*: Clear FOB Indian Ports (Mundra / Kolkata) or CIF Destination Port pricing.
     - **Authentic Cupping Photography**: High-resolution image (`/images/darjeeling-single-origin.webp`) showing dry whole leaf tea on black slate tasting trays alongside porcelain cupping bowls steeped with golden liquor, with an authentic `SENSORY EVALUATION LAB` caption.
  2. **Phase 1: Pre-Commitment Verification (Steps 01 to 04)**:
     - Header: `PHASE 01 — PRE-COMMITMENT VERIFICATION · ZERO FINANCIAL RISK`
     - Step 01: **Share Requirement** (Deliverable: `SPECIFICATION INTAKE`) -> Action: `Submit Requirement` (routes to Detailed Specification Intake / `'quote'`).
     - Step 02: **Sourcing Identification** (Deliverable: `LOT SOURCING`) -> Action: `Review Grade Specs` (smooth-scrolls to `#tea-by-grade`).
     - Step 03: **Physical Counter-Sample** (Deliverable: `AIR SAMPLE DISPATCH`) -> Action: `Request Counter-Samples` (routes to Quick Sample Request / `'sample'`).
     - Step 04: **Buyer Cupping Approval** (Deliverable: `CUPPING APPROVAL`) -> Milestone: `Sign-Off Milestone · Unlocks Phase 2`.
  3. **Phase 2: Commercial Execution Console (Step 05)**:
     - Header: `PHASE 02 — COMMERCIAL EXECUTION · POST-APPROVAL DISPATCH`
     - Console Container: Deep Forest luxury gradient (`#061811` to `#0A281E`) with warm gold border and elevated shadow.
     - Step 05: **Commercial Formalization, Export Clearance & Ocean Freight**
     - Four Operational Deliverable Blocks:
       1. *Commercial Terms & Invoicing*: Volume confirmation, milestone payment terms, FOB/CIF pricing.
       2. *Packaging & Contract Packing*: Multi-wall paper sacks, woven bulk bags, or customized retail pouches/tins.
       3. *Statutory Export Paperwork*: Tea Board of India export clearance, Phytosanitary Certificate, Certificate of Origin, COA.
       4. *Container Stuffing & Port Freight*: Container inspection, secure stuffing, fumigation, customs clearance, and Bill of Lading dispatch.
     - Reassurance Bar: Active green pulse indicator (`.export-pulse-dot`) + Commercial Governance disclosure.
     - Primary Action: `Submit Export Requirement` button (warm gold primary, routes to Detailed Specification Intake / `'quote'`).

## 3. Component Mapping
- **React Component Name**: `HowItWorksSection`
- **Exact Source File Path**: `src/features/export-process/components/HowItWorksSection.tsx`
- **Parent Page**: `src/pages/HomePage.tsx` (Lines 144–148)
- **Props Interface**:
  ```typescript
  export interface HowItWorksSectionProps {
    onRequestSamples?: () => void;
    onSubmitRequirement?: () => void;
    onExploreGrades?: () => void;
  }
  ```
- **Dependencies**:
  - `lucide-react`: `Send`, `FileSearch`, `Package`, `CheckCircle2`, `Ship`, `ArrowRight`, `ShieldCheck`, `Check`, `FileText`, `Layers`, `Anchor`.

## 4. Styling Mapping
- **CSS File**: `src/styles/index.css` (Lines 9556–9885)
- **Design Tokens**:
  - Colors: `--color-primary-dark` (`#061811`), `--color-primary-green` (`#0A281E`), `--color-gold` (`#D4AF37`), `--primitive-white` (`#FFFFFF`), `--border-subtle`, `--bg-surface-subtle`.
  - Spacing: 8px spacing grid (`--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-6`).
  - Radii: `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (14px).
  - Shadows: `0 4px 16px -2px rgba(10, 40, 30, 0.05)`, `0 12px 36px -6px rgba(10, 40, 30, 0.35)`.
- **Dormant CSS Purged**:
  - Legacy `.how-it-works-grid`, `.how-it-works-step-card`, `.step-card-*`, and `.how-it-works-bottom` (94 lines) purged from lines 7526–7620.

## 5. Asset Mapping
- **Images**:
  - WebP (Modern): `/images/darjeeling-single-origin.webp` (1200w) & `/images/darjeeling-single-origin-640w.webp` (640w).
  - JPEG Fallback: `/images/darjeeling-single-origin.jpg`.
- **Depiction**: Authentic whole leaf Darjeeling specialty tea on slate tasting tray with steeped porcelain cupping bowls.
- **Attributes**: `loading="eager"`, responsive `<picture>` with `srcset` and `sizes`.

## 6. Functional & Intent Routing
- **Step 01 Button ("Submit Requirement")**:
  - Invokes `onSubmitRequirement()`.
  - Sets `formIntent = 'quote'` in `HomePage.tsx`.
  - Selects Form B (`Detailed Tea Requirement`) tab in `BuyerRequirementForm.tsx`.
  - Smooth-scrolls to `#requirement-form`.
- **Step 02 Button ("Review Grade Specs")**:
  - Invokes `onExploreGrades()`.
  - Smooth-scrolls to `#tea-by-grade` (The Tea Origin & Grade Explorer).
- **Step 03 Button ("Request Counter-Samples")**:
  - Invokes `onRequestSamples()`.
  - Sets `formIntent = 'sample'` in `HomePage.tsx`.
  - Selects Form A (`Quick Enquiry / Samples`) tab in `BuyerRequirementForm.tsx`.
  - Smooth-scrolls to `#requirement-form`.
- **Step 05 Console CTA ("Submit Export Requirement")**:
  - Invokes `onSubmitRequirement()`.
  - Sets `formIntent = 'quote'` in `HomePage.tsx`.
  - Selects Form B (`Detailed Tea Requirement`) tab in `BuyerRequirementForm.tsx`.
  - Smooth-scrolls to `#requirement-form`.

## 7. Responsive Matrix

| Breakpoint / Device | Viewport | Phase 1 Grid | Phase 2 Console Grid | Visual Layout |
|---|---|---|---|---|
| **Desktop** | 1440 × 900 | 4 columns (`repeat(4, 1fr)`) | 4 columns (`repeat(4, 1fr)`) | Editorial split (1.15fr / 0.85fr); button fully enclosed with zero overflow |
| **Tablet** | 768 × 1024 | 2 columns (`repeat(2, 1fr)`) | 2 columns (`repeat(2, 1fr)`) | Stacked editorial hero; balanced 2x2 grids eliminating stretched 700px horizontal cards |
| **Mobile** | 390 × 844 | 1 column (`1fr`) | 1 column (`1fr`) | Vertical connected card track; generous bottom padding preventing floating WhatsApp button overlap |

## 8. Accessibility & Performance
- **Reduced Motion**: Full `@media (prefers-reduced-motion: reduce)` support with disabled animations and zero transitions.
- **Touch Targets**: All interactive buttons meet or exceed the 44px minimum touch target height.
- **Semantic HTML**: `<section>`, `<picture>`, `<h2>`, `<h3>`, `<h4>`, `<button>`, `role="list"`, `role="listitem"`.
- **Contrast**: Tested and compliant with WCAG 2.1 AA standards.
