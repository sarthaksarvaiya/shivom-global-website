# 05 — Private Label (Packaging & Contract Packing Support)

## 1. Section Overview
- **Section ID**: `sec-05` / `<section id="private-label" className="private-label-section">`
- **Section Name**: Private Label & Contract Packaging Support
- **Position on Website**: Section 4 of the main content flow, rendered directly below `GradeSpecificationTable`.
- **Main Purpose**: Detail SHIVOM GLOBAL's packaging coordination capabilities spanning standard export bulk multi-wall paper sacks, flexible custom container packing, and retail brand packaging (pouches, tins, pyramid tea bags) through qualified packing partners.
- **Target Audience**: Consumer packaged goods (CPG) brand creators, supermarket retail buyers, institutional catering operations, and private-label tea distributors needing turnkey packaging and barcoded shelf-ready products.
- **Business Objective**: Broaden commercial engagement beyond raw bulk leaf trading into high-margin private label programs, clarifying minimum batch flexibility and routing inquiries into the requirement engine.

## 2. Current Implementation
- **Existing Design Description**: Prestige packaging layout structured around a 3-column card grid with warm gold tier badges, monospace specification callouts, checkmarked export advantage lists, and an integrated bottom discussion banner.
- **Existing Layout**:
  - **Section Header**: Centered gold badge ("PACKING & PRIVATE LABEL SUPPORT"), H2 title, and balanced explanatory lead text.
  - **Packaging Formats Grid**: 3-column responsive card grid (`.private-label-formats-grid`):
    1. Bulk Export Packaging (Standard Bulk Sacks)
    2. Custom Bulk Packing (Flexible Container Packaging)
    3. Private Label Support (Retail Pouches, Tins & Tea Bags)
  - **Capabilities Callout Box**: Dark-themed bottom container with `ShieldCheck` icon, copy explaining destination compliance coordination, and a gold action button.
- **Content Structure**:
  - Each packaging format card contains:
    - Tier badge (`font-spec`) + Icon pill
    - Card Title & Subtitle
    - Container Specification Callout Box
    - Key Export Advantages (3 checkmarked bullet items)
    - Target Buyer Persona ("Suitable For")
    - Volume Scale ("MOQ / Scale")
    - Dedicated Inquire Button (`.format-inquire-btn`)
  - Bottom Callout: "Discuss Your Destination Packaging & Labeling Needs" + "Discuss Packaging Options" button.
- **Visual Elements**:
  - Warm Gold accents (`--color-gold: #C59B27`) on badges and buttons.
  - Crisp border boundaries with subtle card box-shadow.
  - Editorial asset `public/images/private-label-packaging.jpg` available in project asset library.
- **Current Functionality**:
  - Clicking any "Inquire [Format Title]" button passes the format title to `onStartPrivateLabel(formatTitle)` in parent `HomePage.tsx`.
  - Sets parent form state to `formRequirementType = 'Private Label Retail Product'`, sets `formIntent = 'packing'`, and smoothly scrolls to `#requirement-form`.
  - Bottom "Discuss Packaging Options" button initiates the same flow.

## 3. Component Mapping
- **React Component Name**: `PrivateLabelSection`
- **Exact Source File Path**: `src/features/private-label/components/PrivateLabelSection.tsx`
- **Related Subcomponents**: None (fully self-contained).
- **Shared Components & Utilities**:
  - Icons from `lucide-react`: `Package`, `Sparkles`, `Layers`, `ArrowRight`, `Check`, `ShieldCheck`.

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 1620–2290: Base card styles, format grid, feature lists, capabilities banner, and media queries).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--bg-card)` (#FFFFFF), `var(--border-subtle)` (#E5E7EB), `var(--color-primary-green)` (#0D3829), `var(--color-gold)` (#C59B27).
  - Spacing: `var(--space-3)` (12px), `var(--space-4)` (16px), `var(--space-6)` (24px), `var(--space-8)` (32px).
  - Radii: `var(--radius-md)` (8px), `var(--radius-lg)` (12px).
- **Typography**:
  - Header: H2 `var(--font-primary)` with tight leading.
  - Subheaders and spec labels: `var(--font-mono)` (Space Grotesk, `.font-spec`).
- **Layout Behaviour**:
  - Format grid: `display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6);`.
  - Stacks into single column below 1100px / 768px.
- **Animation Styles**:
  - Card hover: `transform: translateY(-2px)`, `box-shadow: var(--shadow-hover)`.

## 5. Asset Mapping
- **Image Paths**:
  - `public/images/private-label-packaging.jpg` (Referenced in project documentation and improvement plans as the editorial reference photograph of unbranded kraft pouches and tins on timber table).
- **SVG Paths**: None (inline Lucide SVGs).
- **Video Paths**: None.
- **Icon References**: `Package`, `Sparkles`, `Layers`, `ArrowRight`, `Check`, `ShieldCheck`.
- **Fonts**: Plus Jakarta Sans and Space Grotesk.
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - "Inquire Bulk Export Packaging" Button: Triggers `handleActionClick("Bulk Export Packaging")`.
  - "Inquire Custom Bulk Packing" Button: Triggers `handleActionClick("Custom Bulk Packing")`.
  - "Inquire Private Label Support" Button: Triggers `handleActionClick("Private Label Support")`.
  - "Discuss Packaging Options" (Bottom Banner CTA): Triggers `handleActionClick()`.
- **Navigation**:
  - Section anchor `#private-label`.
  - Navigates down to `#requirement-form`.
- **Form Behaviour**: Updates parent form state in `HomePage.tsx` (`setFormRequirementType('Private Label Retail Product')` and `setFormIntent('packing')`).
- **Interactions**: Interactive hover states on cards and buttons.
- **Animations**: CSS transitions (`var(--transition-normal)`).
- **API Integrations**: None.
- **External Integrations**: None directly in this component.

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: Balanced 3-column grid showing all three formats side-by-side with equal height cards (`display: flex; flex-direction: column`).
- **Tablet (769px – 1024px)**: Grid shifts to 2 columns with the third card spanning full width, or scrolls cleanly.
- **Mobile (<= 768px & <= 480px)**:
  - Grid collapses into a single-column stack.
  - Capabilities box stacks vertically (Text on top, button on bottom).
  - Card padding adjusts from `var(--space-8)` to `var(--space-5)`.
- **Existing Responsive Issues**: None observed; cards flex cleanly to uniform content heights.

## 8. SEO & Accessibility
- **Heading Hierarchy**:
  - `<h2>`: "Private Label & Contract Packaging Support" (`id="private-label-heading"`)
  - `<h3>`: Card titles ("Bulk Export Packaging", "Custom Bulk Packing", "Private Label Support")
  - `<h4>`: Bottom capabilities heading ("Discuss Your Destination Packaging & Labeling Needs")
- **Semantic HTML**: `<section id="private-label" aria-labelledby="private-label-heading">`, `<div role="list">`, `<div role="listitem">`, `<ul>`, `<li>`.
- **Image Alt Attributes**: N/A (Card layout uses icons and vector elements).
- **ARIA Attributes**:
  - `role="list"`, `role="listitem"`.
  - Action buttons have descriptive `aria-label` including the option name.
  - Decorative icons have `aria-hidden="true"`.
- **Keyboard Accessibility**: All buttons are keyboard accessible via Tab, with visible outline focus rings.
- **Relevant SEO Considerations**: Captures high-intent searches for "private label tea India", "custom tea packaging export", and "bulk tea paper sacks".

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**:
  - Feeds preselection into `BuyerRequirementForm` (Section 08).
- **Shared Components**: None.
- **Global CSS Dependencies**:
  - `src/styles/tokens.css`
  - `.container`, `.spec-badge`, `.btn`, `.btn-primary`, `.btn-gold`, `.font-spec`
- **API Dependencies**: None.
- **Navigation Dependencies**: Anchor `#private-label` and `#requirement-form`.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC05-01` | Packaging image asset (`private-label-packaging.jpg`) is not rendered visually in the section | Add visual editorial photography thumbnail or gallery modal displaying actual pouch, tin, and sack mockups | Medium | Open |
| `SEC05-02` | Card buttons have outline style which can have lower visual prominence than primary buttons | Test converting Private Label card CTA to a solid gold accent button for higher conversion | Low | Open |
| `SEC05-03` | Specific packaging material certifications (FDA food contact, FSC paper) are described in text only | Add visual compliance iconography (food-grade symbol, recyclable symbol) | Low | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - 3 cards render with equal heights and uniform alignment.
  - Gold badges and icons render sharply.
  - Bottom capabilities banner contrast is verified.
- **Functional Verification**:
  - Clicking "Inquire Private Label Support" sets parent form state to "Private Label Retail Product" and scrolls to `#requirement-form`.
  - Clicking "Discuss Packaging Options" scrolls cleanly to the form.
- **Desktop Verification**:
  - 3-column layout displays with consistent gap at 1440px and 1280px.
- **Tablet Verification**:
  - Layout wraps cleanly at 1024px / 768px.
- **Mobile Verification**:
  - Stacked cards are easy to read and buttons span comfortably across 375px–414px viewports.
- **Regression Testing**:
  - Verify that clicking format buttons preserves other previously entered form data.
- **Performance Checks**:
  - Zero performance overhead (pure CSS and standard HTML primitives).

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/05_PRIVATE_LABEL.md` | Verified against `PrivateLabelSection.tsx` & `src/styles/index.css` |

