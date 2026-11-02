# 07 — Why SHIVOM GLOBAL (Export Compliance & Credibility Console)

## 1. Section Overview
- **Section ID**: `sec-07` / `<section id="why-us" className="why-shivom-section">`
- **Section Name**: Why SHIVOM GLOBAL (Sourcing Credibility & Export Compliance Console)
- **Position on Website**: Section 6 of the main content flow, rendered directly below `HowItWorksSection`.
- **Main Purpose**: Establish institutional compliance, statutory export authority, and commercial trustworthiness through a dual-console layout detailing Indian export documentation (Phytosanitary, COO, B/L, Customs Shipping Bills) alongside 4 core buyer-first trading pillars.
- **Target Audience**: Corporate import compliance officers, risk-averse overseas procurement directors, institutional tea importers, and supermarket buyers requiring verified paperwork and direct desk communication.
- **Business Objective**: Overcome trust barriers inherent in international origin sourcing, prove statutory export readiness, and eliminate intermediaries by connecting buyers directly to the trade desk.

## 2. Current Implementation
- **Existing Design Description**: Asymmetric split-screen console replacing generic cards with an authoritative dual-terminal interface: a dark Deep Forest statutory documentation terminal on the left and an interactive interactive accordion stack of buyer pillars on the right.
- **Existing Layout**:
  - **Section Header**: Centered gold badge ("SOURCING CREDIBILITY"), H2 title ("Built for International Tea Buyers"), and positioning lead copy.
  - **Asymmetric Split-Screen Console** (`.compliance-console-wrap`):
    - **Left Console (Export Documentation Terminal)**: Deep Forest container (`var(--color-primary-dark)`) with green status pill, statutory heading, 4-item verified compliance checklist, loading ports list, and "Discuss Requirements & Terms" CTA button.
    - **Right Console (Interactive Buyer Value Pillars)**: Stack of 4 interactive cards with hover and click expansion displaying detailed operational scopes.
- **Content Structure**:
  - **Statutory Documentation Checklist**:
    1. Phytosanitary Certificate (Plant quarantine inspection & pest freedom).
    2. Certificate of Origin / COO (Chamber of Commerce authentic Indian tea verification).
    3. Export Clearance & Shipping Documentation (Customs shipping bills, statutory export filings).
    4. Ocean Bill of Lading (B/L) & Commercial Set (Clean on-board ocean B/L, packing list, commercial invoice).
  - **4 Value Pillars**:
    1. Flexible Quantities (Commercial Scope: LCL trial batches through FCL multi-containers).
    2. Requirement-Based Sourcing (Origin matching across primary auction & garden centers).
    3. Physical Counter-Samples (Quality pre-verification for organoleptic cup evaluation).
    4. Direct Trade Desk Access (Direct WhatsApp & email communication without broker layers).
  - **Trade Terms & Disclaimer**: FOB Indian loading ports (Mundra, Kandla, Kolkata, Nhava Sheva) and CIF destination ports (including Port Jebel Ali, UAE).
- **Visual Elements**:
  - `ShieldCheck` and `FileCheck` verification iconography.
  - Deep Forest dark terminal with high-contrast white and gold typography.
  - Interactive expanded state with checkmark highlights.
- **Current Functionality**:
  - Hovering or clicking any pillar card toggles expansion (`expandedPillar`), revealing additional operational depth.
  - "Discuss Requirements & Terms" button smoothly scrolls to `#requirement-form`.

## 3. Component Mapping
- **React Component Name**: `WhyShivomGlobal`
- **Exact Source File Path**: `src/features/company/components/WhyShivomGlobal.tsx`
- **Related Subcomponents**: None (fully self-contained).
- **Shared Components & Utilities**:
  - Icons from `lucide-react`: `Package`, `Layers`, `CheckCircle2`, `MessageCircle`, `FileCheck`, `ShieldCheck`, `ArrowRight`.

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 3110–3330: Base why-shivom section, compliance console wrap, terminal card, pillar stack, and responsive media queries).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--color-primary-dark)` (#072218), `var(--color-gold)` (#C59B27), `var(--color-primary-green)` (#0D3829), `var(--bg-surface)` (#FFFFFF).
  - Spacing: `var(--space-3)` (12px), `var(--space-4)` (16px), `var(--space-6)` (24px), `var(--space-8)` (32px).
  - Radii: `var(--radius-md)` (8px), `var(--radius-lg)` (12px).
  - Shadows: `var(--shadow-card)`, `var(--shadow-elevated)`.
- **Typography**:
  - Terminal headings and check items: `var(--font-primary)`.
  - Pillar tags and port text: `var(--font-mono)` (Space Grotesk, `.font-spec`).
- **Layout Behaviour**:
  - Split console: `display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8);`.
  - Stacks into single column below 1024px.
- **Animation Styles**:
  - Accordion expansion transition: `transition: max-height 200ms ease, padding 200ms ease`.

## 5. Asset Mapping
- **Image Paths**: None.
- **SVG Paths**: None (inline Lucide SVGs).
- **Video Paths**: None.
- **Icon References**: `Package`, `Layers`, `CheckCircle2`, `MessageCircle`, `FileCheck`, `ShieldCheck`, `ArrowRight`.
- **Fonts**: Plus Jakarta Sans and Space Grotesk.
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - "Discuss Requirements & Terms" Button: Calls `onRequestSamples` or `onSubmitRequirement` callback, falling back to smooth-scrolling to `#requirement-form`.
  - 4 Pillar Cards: Interactive click / touch toggles expanded state for that pillar.
- **Navigation**:
  - Section anchor `#why-us`.
  - Smooth-scrolls to `#requirement-form`.
- **Form Behaviour**: Routes buyer to appropriate form mode.
- **Interactions**:
  - Interactive pillar card expansion reveals verified sub-points.
  - Hover highlights on checklist items and pillar rows.
- **Animations**: CSS transitions on pillar expansion.
- **API Integrations**: None.
- **External Integrations**: None.

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: Side-by-side 50/50 split console. Terminal on left, pillar stack on right.
- **Tablet (769px – 1024px)**: Console transitions to single vertical column with terminal on top and pillars below; padding reduces to `var(--space-6)`.
- **Mobile (<= 768px & <= 480px)**:
  - Terminal checklist items stack vertically.
  - Terminal footer action area becomes full-width.
  - Pillar cards condense padding and remain tap-expandable.
- **Existing Responsive Issues**: None; the grid cleanly collapses into a single column on tablet and mobile.

## 8. SEO & Accessibility
- **Heading Hierarchy**:
  - `<h2>`: "Built for International Tea Buyers" (`id="why-shivom-title"`)
  - `<h3>`: "Statutory Export Compliance & Documentation"
  - `<h4>`: Pillar titles ("Flexible Quantities", "Requirement-Based Sourcing", "Physical Counter-Samples", "Direct Trade Desk Access")
- **Semantic HTML**: `<section id="why-us" aria-labelledby="why-shivom-title">`, `<ul role="list">`, `<li role="listitem">`, `<div role="button">`.
- **Image Alt Attributes**: N/A.
- **ARIA Attributes**:
  - Pillar cards: `role="button" tabIndex={0} aria-expanded={isExpanded}`.
  - Checklist: `role="list"`, `role="listitem"`.
  - Decorative icons have `aria-hidden="true"`.
- **Keyboard Accessibility**: Pillar cards are keyboard accessible (tab focusable, expandable with Enter/Space).
- **Relevant SEO Considerations**:
  - Directly matches searches for Indian tea export compliance, tea export phytosanitary certificate, Indian tea Chamber of Commerce certificate of origin, and Mundra/Nhava Sheva tea port logistics.

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**:
  - Links to `BuyerRequirementForm` (Section 08).
- **Shared Components**: None.
- **Global CSS Dependencies**:
  - `src/styles/tokens.css`
  - `.container`, `.spec-badge`, `.btn`, `.btn-primary`, `.font-spec`
- **API Dependencies**: None.
- **Navigation Dependencies**: Anchor `#why-us` and `#requirement-form`.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC07-01` | Statutory document certificates are described in text without visual sample previews | Add a light modal preview showing redacted sample certificate formats (COO, Phyto) | Low | Open |
| `SEC07-02` | Pillar card toggle uses click only; keyboard Enter/Space handler could be made explicit in JSX | Add explicit `onKeyDown={(e) => (e.key === 'Enter' \|\| e.key === ' ') && setExpandedPillar(idx)}` | Medium | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - Left terminal card renders dark background with high-contrast white text.
  - 4 compliance documents show clear icons and descriptions.
  - Active pillar card highlights clearly with checkmark detail visible.
- **Functional Verification**:
  - Clicking each pillar expands its detail and collapses others.
  - Clicking "Discuss Requirements & Terms" smoothly scrolls to `#requirement-form`.
- **Desktop Verification**:
  - Side-by-side 2-column layout displays with equal height at 1440px and 1280px.
- **Tablet Verification**:
  - Console stacks into a single column at 1024px / 768px.
- **Mobile Verification**:
  - All text is legible without horizontal overflow on 375px and 414px viewports.
- **Regression Testing**:
  - Verify that pillar expansion does not cause layout jitter in adjacent sections.
- **Performance Checks**:
  - Instantaneous accordion expansion with zero DOM recalculation lag.

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/07_WHY_SHIVOM_GLOBAL.md` | Verified against `WhyShivomGlobal.tsx` & `src/styles/index.css` |

