# 06 — Export Process (The Sourcing & Export Pathway / How It Works)

## 1. Section Overview
- **Section ID**: `sec-06` / `<section id="how-it-works" className="how-it-works-section theme-ivory">`
- **Section Name**: The Sourcing & Export Pathway (5-Step How It Works Flow)
- **Position on Website**: Section 5 of the main content flow, rendered directly below `PrivateLabelSection`.
- **Main Purpose**: Demystify the international Indian tea procurement cycle into a clear, transparent 5-step operational milestone roadmap that removes buyer hesitation by formalizing physical counter-sample cupping before commercial commitment.
- **Target Audience**: International tea buyers, risk-conscious procurement officers, new market entrants, and blenders who need assurance that contracts are executed only after sensory cupping sign-off.
- **Business Objective**: Eliminate perceived friction and risk in cross-border tea trade, build buyer confidence, and guide users directly into Step 01 (submitting their requirements via `#requirement-form`).

## 2. Current Implementation
- **Existing Design Description**: Estate Ivory prestige theme (`linear-gradient(180deg, var(--bg-surface-subtle) 0%, #F5F1E8 100%)`) featuring a horizontally connected interactive milestone pathway with numbered circular step indicators, time badges, deliverable tags, and a live commitment ribbon with an animated green pulse dot.
- **Existing Layout**:
  - **Section Header**: Centered gold badge ("STRUCTURED SOURCING FLOW"), H2 title ("The Sourcing & Export Pathway"), and explanatory lead copy.
  - **Connected Milestone Pathway**: Responsive timeline track containing 5 milestone nodes (`.process-step-node`):
    - Node 01: Share Requirement
    - Node 02: We Match the Requirement
    - Node 03: Counter-Sample Arranged
    - Node 04: Buyer Evaluation
    - Node 05: Commercial Discussion & Export
  - **Live Commitment Ribbon**: Full-width connected card at the base of the track featuring an organoleptic sample evaluation policy with an active green pulse indicator and a gold CTA button ("Start With Step 01: Share Requirement").
- **Content Structure**:
  - Each milestone card displays:
    - Step numeric indicator (`01` through `05`)
    - Time badge (`font-spec`: "Step 01", "Step 02", etc.)
    - Deliverable tag (e.g. "Specification Intake", "Physical Counter-Sample", "Proforma Invoice & Dispatch")
    - Step Title & Description
    - Associated vector icon
- **Visual Elements**:
  - Ivory background gradient with warm cream tones.
  - Green pulsing beacon (`.process-pulse-dot`) communicating active trade desk readiness.
  - Interactive selection and completion borders on step nodes.
- **Current Functionality**:
  - Hovering or clicking any step updates `activeStep` (1 through 5), updating active and completed styling across the timeline.
  - Keyboard accessible: Users can navigate and activate steps with Tab, Space, and Enter.
  - Action button triggers smooth scrolling to `#requirement-form`.

## 3. Component Mapping
- **React Component Name**: `HowItWorksSection`
- **Exact Source File Path**: `src/features/export-process/components/HowItWorksSection.tsx`
- **Related Subcomponents**: None (self-contained).
- **Shared Components & Utilities**:
  - Icons from `lucide-react`: `Send`, `FileSearch`, `Package`, `CheckCircle2`, `Ship`, `ArrowRight`.

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 5269–5520 & Lines 2582–3060: Base stepper, Ivory theme, milestone track, pulse animation, and responsive media queries).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `--bg-surface-subtle` (#F4F5F3), `#F5F1E8` (Estate Ivory), `var(--color-primary-green)` (#0D3829), `var(--color-gold)` (#C59B27), `var(--color-whatsapp)` (#25D366).
  - Spacing: `var(--space-3)` (12px), `var(--space-4)` (16px), `var(--space-6)` (24px), `var(--space-8)` (32px).
  - Radii: `var(--radius-md)` (8px), `var(--radius-lg)` (12px), `var(--radius-full)` (9999px).
- **Typography**:
  - Headings: `var(--font-primary)` (Plus Jakarta Sans).
  - Deliverable and step badges: `var(--font-mono)` (Space Grotesk, `.font-spec`).
- **Layout Behaviour**:
  - Desktop: 5 horizontal flex or grid columns connected via subtle horizontal lines.
  - Mobile: Vertical milestone stack with connected vertical progress spine.
- **Animation Styles**:
  - Pulse dot: CSS `@keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }`.
  - Node hover elevation: `transform: translateY(-2px)`, `transition: var(--transition-normal)`.

## 5. Asset Mapping
- **Image Paths**: None.
- **SVG Paths**: None (inline Lucide SVGs).
- **Video Paths**: None.
- **Icon References**: `Send` (Step 1), `FileSearch` (Step 2), `Package` (Step 3), `CheckCircle2` (Step 4), `Ship` (Step 5), `ArrowRight` (CTA).
- **Fonts**: Plus Jakarta Sans and Space Grotesk.
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - "Start With Step 01: Share Requirement" Button: Calls `onRequestSamples` or `onSubmitRequirement` callback, falling back to smooth scroll to `#requirement-form`.
  - 5 Step Node Elements: Click or Enter key selects the active step in local state.
- **Navigation**:
  - Section anchor `#how-it-works`.
  - Smooth-scrolls to `#requirement-form`.
- **Form Behaviour**: Directs user intent to Form A (Quick) or Form B (Detailed) via props.
- **Interactions**:
  - Hovering over a node marks it as `active` and all prior nodes as `completed`.
  - Accessible keyboard interaction (`onKeyDown` handles Enter and Space).
- **Animations**: CSS transitions on hover and active states.
- **API Integrations**: None.
- **External Integrations**: None.

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: All 5 steps laid out horizontally side-by-side with continuous connecting line.
- **Tablet (769px – 1024px)**: Steps condense padding; deliverable font size scales to 11px.
- **Mobile (<= 768px & <= 480px)**:
  - Timeline transforms into a vertical stacked process flow.
  - Step indicators align to the left with a connecting vertical line.
  - Commitment ribbon stacks vertically (Pulse and text on top, CTA button full width below).
- **Existing Responsive Issues**: None; the vertical transition below 768px provides excellent readability on touch devices.

## 8. SEO & Accessibility
- **Heading Hierarchy**:
  - `<h2>`: "The Sourcing & Export Pathway" (`id="how-it-works-heading"`)
  - `<h3>`: Step titles ("Share Requirement", "We Match the Requirement", "Counter-Sample Arranged", "Buyer Evaluation", "Commercial Discussion & Export")
- **Semantic HTML**: `<section id="how-it-works" aria-labelledby="how-it-works-heading">`, `<div role="list">`, `<div role="listitem">`, `<button>`.
- **Image Alt Attributes**: N/A.
- **ARIA Attributes**:
  - `role="list"`, `role="listitem"`.
  - Step nodes have `aria-label="Step 01: Share Requirement"`.
  - Decorative icons have `aria-hidden="true"`.
- **Keyboard Accessibility**: Each node has `tabIndex={0}` and keyboard event handlers (`onKeyDown`).
- **Relevant SEO Considerations**: Directly explains commercial export terms ("FOB", "CIF", "Counter-Samples", "Proforma Invoice", "Phytosanitary").

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**:
  - Links to `BuyerRequirementForm` (Section 08).
- **Shared Components**: None.
- **Global CSS Dependencies**:
  - `src/styles/tokens.css`
  - `.container`, `.spec-badge`, `.font-spec`
- **API Dependencies**: None.
- **Navigation Dependencies**: Anchor `#how-it-works` and `#requirement-form`.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC06-01` | Step 05 icon is `Ship` (Ocean freight), but air courier samples are handled in Step 03 | Standardize iconography: add airplane or express courier sub-badge to Step 03 | Low | Open |
| `SEC06-02` | Milestone connector lines on tablet viewports (769px–900px) can overlap tight cards | Add fluid gap spacing using `clamp()` on tablet views | Low | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - 5 steps display numbers `01` to `05` with clean typography.
  - Estate Ivory background gradient renders smoothly.
  - Green pulse dot animates continuously without CPU spike.
- **Functional Verification**:
  - Clicking any step node marks it as active.
  - Clicking "Start With Step 01: Share Requirement" scrolls down to `#requirement-form`.
- **Desktop Verification**:
  - 5 steps fit horizontally without wrapping at 1440px and 1280px.
- **Tablet Verification**:
  - Steps adapt down to 768px.
- **Mobile Verification**:
  - Steps stack vertically with vertical connecting line on 375px and 414px viewports.
- **Regression Testing**:
  - Ensure theme-ivory styles do not bleed into adjacent sections.
- **Performance Checks**:
  - Animation uses CSS `transform` and `opacity` exclusively for 60fps performance.

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/06_EXPORT_PROCESS.md` | Verified against `HowItWorksSection.tsx` & `src/styles/index.css` |

