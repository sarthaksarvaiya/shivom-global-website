# 03 — Tea Categories (What We Supply / Tea Sourcing Portfolio)

## 1. Section Overview
- **Section ID**: `sec-03` / `<section id="our-teas" className="tea-categories-section">`
- **Section Name**: Tea Categories & Sourcing Portfolio (What We Supply)
- **Position on Website**: Section 2 of the main content flow, rendered directly below `HeroSection`.
- **Main Purpose**: Present SHIVOM GLOBAL's 4 core export tea categories (Assam CTC, Assam Orthodox, Darjeeling Single Origin, Indian Green & Wellness Teas), their organoleptic cupping attributes, origin terroirs, commercial grades, and packing specifications.
- **Target Audience**: Overseas tea importers, commercial blenders, wholesale repackers, supermarket brand procurement teams, and boutique loose-leaf brand owners seeking granular technical specifications and physical counter-samples.
- **Business Objective**: Educate prospective buyers on available origin profiles, facilitate organoleptic cup comparison, establish origin traceability, and drive preselected sample inquiries directly into the Buyer Requirement Form (`#requirement-form`).

## 2. Current Implementation
- **Existing Design Description**: Two-part presentation architecture combining an introductory Sourcing Spectrum protocol screen with an interactive high-contrast Sourcing Console screen featuring dynamic terroir-ambient themes matching tea liquor tones (Honey Amber, Golden Tippy, Muscatel Gold, Jade Green). Includes a dedicated Laboratory Cupping Bar and touch-optimized mobile sequence (Phase 3A).
- **Existing Layout**:
  - **Part 1 (Introductory Screen)**: Centered editorial header with gold eyebrow badge, high-authority heading, lead paragraph, and 3-step verified sourcing protocol banner.
  - **Part 2 (Interactive Sourcing Console)**:
    - Sticky/scroll-margin anchor (`#tea-catalog-console`, scroll-margin-top: 88px).
    - Category navigation tab bar with 4 interactive tabs (`role="tablist"`) and mobile position indicator dots (`1 of 4`).
    - Two-column responsive console card (48% media / 52% intelligence on desktop; natural single-column DOM stream on mobile):
      - **Desktop 48/52 CSS Grid**:
        - **Left Column (48fr)**: Leaf photography frame (`16:10.5` aspect ratio with origin badge and liquor indicator), Illustrative Cupping Infusion Profile Bar (indicative clarity badge, horizontal infusion gradient strip, liquor name, cupping character notes, illustrative disclaimer), and Indicative Organoleptic Profile Grid (2x2 Matrix: Liquor Depth, Body & Texture, Aroma Profile, Milk Affinity).
        - **Right Column (52fr)**: Category Header (Counter-samples on request badge, Category name, Tagline, Description), Export Sourcing Grades radiogroup (`role="radiogroup"`), Active Grade Callout Card with editorial particle cut badge, Sourcing & Packing Specifications List, and Sourcing Desk Actions (Sample Request CTA + WhatsApp Consultation link).
      - **Mobile DOM & Visual Reading Order (1:1 Synchronized)**:
        - Rendered in exact semantic reading order without CSS `order` or `display: contents`:
          `1. Category Header -> 2. Photography Frame -> 3. Illustrative Cupping Bar -> 4. Export Sourcing Grades -> 5. Sourcing Desk Action CTAs -> 6. Sourcing & Packing Specifications -> 7. Indicative Organoleptic Profile`.
- **Content Structure**:
  - 4 Sourced Tea Categories:
    1. **Assam CTC (Crush, Tear, Curl)**: Brahmaputra Valley, bold malty amber cup, 6 grades (BOP, BOPSM, BP, PF, PD, Dust / D1).
    2. **Assam Orthodox Whole Leaf**: Upper Assam, rolled whole leaf with golden tips, 4 grades (FTGFOP1, TGFOP, FBOP, BOPF).
    3. **Darjeeling Single Origin**: Himalayan foothills, muscatel bouquet, 3 grades (First Flush FTGFOP1, Second Flush TGFOP, Autumnal Harvest).
    4. **Indian Green & Wellness Teas**: High-elevation unoxidized leaf, jade clarity, 3 grades (Whole Leaf Green, Green Tea Fannings, Herbal Cut).
- **Visual Elements**:
  - High-resolution editorial Indian tea photography for each category.
  - Visual liquor swatches (`#8B2500`, `#C27803`, `#D99B26`, `#4E8A3C`).
  - Active category tab indicators and animated selection states.
- **Current Functionality**:
  - Tab switching between 4 tea categories updates active category state (`activeCategoryIndex`).
  - Interactive grade selection pills update active grade (`selectedGradeCode`) and live application descriptions.
  - Category sample request button invokes `onSelectCategory(categoryName, gradeCode)` passing context down to the form.
  - "View Full Grade Specifications" button triggers smooth scroll to `#tea-by-grade`.

## 3. Component Mapping
- **React Component Name**: `TeaCategoriesSection`
- **Exact Source File Path**: `src/features/tea-catalog/components/TeaCategoriesSection.tsx`
- **Related Subcomponents**: None (all sub-views and console interfaces are organized cleanly inside this component).
- **Shared Components & Utilities**:
  - `motion`, `AnimatePresence`, `useReducedMotion` from `motion/react`.
  - `src/constants/contact.ts` (`CONTACT_INFO` for WhatsApp sample link generation).
  - Icons from `lucide-react`: `Flame`, `Sparkles`, `Leaf`, `Award`, `ArrowRight`, `Check`, `Compass`, `Droplet`, `MessageCircle`, `ChevronDown`.

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 1060–1615: Base category section styles; Lines 6200–6850: Interactive console screen, terroir ambient theme rules, organoleptic grid).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--bg-page)` (#FBFBFA), `var(--bg-surface)` (#FFFFFF), `var(--color-primary)` (#0D3829), `var(--color-gold)` (#C59B27), `var(--color-sage)` (#9CAF88).
  - Spacing: `var(--space-3)` (12px), `var(--space-4)` (16px), `var(--space-6)` (24px), `var(--space-8)` (32px).
  - Radii: `var(--radius-md)` (8px), `var(--radius-lg)` (12px), `var(--radius-full)` (9999px).
  - Shadows: `var(--shadow-card)`, `var(--shadow-hover)`.
- **Typography**:
  - Headings: `var(--font-primary)` (Plus Jakarta Sans), weights 700 & 800.
  - Specification labels and grade codes: `var(--font-mono)` (Space Grotesk, `.font-spec`).
- **Layout Behaviour**:
  - Console container: CSS grid or two-column flex with `gap: var(--space-8)`.
  - Responsive stacking at `<= 960px`.
- **Animation Styles**:
  - `motion.div` tab transitions with cross-fade (`opacity: 0` to `1`, `y: 8` to `0`).
  - Active tab underline layout animation using Motion.

## 5. Asset Mapping
- **Image Paths**:
  - Assam CTC: `/images/assam-ctc-spotlight.jpg` (400x300, JPEG)
  - Assam Orthodox: `/images/assam-orthodox.jpg` (400x300, JPEG)
  - Darjeeling: `/images/darjeeling-single-origin.jpg` (400x300, JPEG)
  - Green Tea: `/images/indian-green-tea.jpg` (400x300, JPEG)
- **SVG Paths**: None (inline Lucide icons).
- **Video Paths**: None.
- **Icon References**: `Flame` (CTC), `Award` (Orthodox), `Sparkles` (Darjeeling), `Leaf` (Green), `Droplet`, `Compass`, `Check`, `ArrowRight`, `MessageCircle`.
- **Fonts**: Plus Jakarta Sans and Space Grotesk.
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - Category Tabs: 4 buttons toggling active category and updating URL hash or scroll position.
  - Grade Selection Badges: Clickable pills updating the active grade code and the application detail text box.
  - "Request [Category Name] Samples" CTA: Pre-selects the category and selected grade in `#requirement-form` and scrolls smoothly down.
  - "Explore All Indian Tea Grades" Button: Smooth-scrolls to Section 04 (`#tea-by-grade`).
  - Contextual WhatsApp Button: Generates customized inquiry link with category and selected grade prefilled.
- **Navigation**:
  - Anchor `#our-teas` (Targeted by Header).
  - Anchor `#tea-catalog-console` (Internal jump to console).
- **Form Behaviour**:
  - Injects `formRequirementType` and `formGrade` into parent state in `src/pages/HomePage.tsx`.
- **Interactions**:
  - Keyboard accessible tab list (`role="tablist"`, `role="tab"`).
  - Hover states on grade pills highlight border in tea liquor color.
- **Animations**: Motion layout animations respect `useReducedMotion()`.
- **API Integrations**: None.
- **External Integrations**: Contextual WhatsApp API link generation via `CONTACT_INFO.whatsapp.getContextualLink()`.

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: Full two-column console grid. Left panel width ~58%, Right panel width ~42%.
- **Tablet (769px – 1024px)**: Console grid narrows, organoleptic attributes adjust to 2x2 grid, tab buttons tighten text.
- **Mobile (<= 768px & <= 480px)**:
  - Console stacks into a single vertical column (Image on top, specifications below).
  - Tab navigation bar becomes horizontally scrollable with touch momentum (`overflow-x: auto`, scroll snap).
  - Grade selector pills wrap cleanly across multiple lines.
  - Action buttons expand to full width (`width: 100%`).
- **Existing Responsive Issues**: On very narrow devices (< 360px width), category tab names require horizontal scrolling; a scroll hint is provided.

## 8. SEO & Accessibility
- **Heading Hierarchy**:
  - `<h2>`: "Indian Tea Categories Sourced to Buyer Requirement"
  - `<h3>`: Dynamic category title (e.g. "Assam CTC (Crush, Tear, Curl)")
  - `<h4>`: Organoleptic attribute titles ("Liquor Character", "Body & Density", "Aroma Notes", "Milk Reactivity")
- **Semantic HTML & Roles**:
  - Section wrapper: `<section id="our-teas" className="tea-categories-section">`
  - Category selector: `<div role="tablist" aria-label="Tea categories selector">` containing 4 `<button role="tab">` elements.
  - Category tabs use roving tabindex: active tab has `tabIndex={0}`, inactive tabs have `tabIndex={-1}`.
  - Tabpanel: `<motion.div role="tabpanel" id={`tea-panel-${activeCategory.id}`} aria-labelledby={`tea-tab-${activeCategory.id}`}>`.
  - Grade selector: Mutually exclusive choice implemented with `<div role="radiogroup" aria-labelledby="tea-grades-heading">` containing `<motion.button role="radio" aria-checked={isSelected} tabIndex={isSelected ? 0 : -1}>`.
  - Sourcing specs list: `<ul role="list">`, `<li>`.
- **Keyboard Interaction Matrix (WAI-ARIA APG)**:
  - **Category Tabs (`role="tablist"`)**:
    - `Tab`: Enters tablist focusing the currently active category tab. Pressing `Tab` again moves focus to the active grade radio inside the tabpanel.
    - `ArrowRight`: Moves focus and selection to the next category tab (wraps from last to first).
    - `ArrowLeft`: Moves focus and selection to the previous category tab (wraps from first to last).
    - `Home`: Moves focus and selection to the first category tab.
    - `End`: Moves focus and selection to the last category tab.
  - **Grade Selection Radios (`role="radiogroup"`)**:
    - `Tab`: Enters radiogroup focusing the currently selected grade radio (`tabIndex={0}`).
    - `ArrowRight` / `ArrowDown`: Moves focus and selects the next grade option (wraps to first).
    - `ArrowLeft` / `ArrowUp`: Moves focus and selects the previous grade option (wraps to last).
    - `Home`: Moves focus and selects the first grade option.
    - `End`: Moves focus and selects the last grade option.
- **Focus Indicators**:
  - `.tea-category-tab:focus-visible`: `outline: 2px solid var(--color-accent-gold); outline-offset: 2px;`.
  - `.tea-grade-badge-interactive:focus-visible`: `outline: 2px solid var(--color-accent-gold); outline-offset: 2px;`.
  - High-contrast, unclipped, and respects `prefers-reduced-motion`.
- **Image Alt Attributes**: Every image has an authoritative, descriptive alt attribute:
  - `alt="Authentic Assam CTC granular black tea with rich amber liquor cupping"`
  - `alt="Upper Assam Orthodox whole black tea leaves with golden tips and golden liquor cupping"`
  - `alt="Darjeeling single origin black tea leaves with pale golden-amber muscatel liquor cup"`
  - `alt="Authentic Indian whole green tea leaves with clear jade green tea infusion"`
- **ARIA Attributes**:
  - `role="tablist"`, `role="tab"`, `aria-selected={true/false}`, `aria-controls`.
  - `role="radiogroup"`, `role="radio"`, `aria-checked={true/false}`.
  - Action buttons have descriptive `aria-label`.
- **Relevant SEO Considerations**:
  - Directly matches search terms for bulk Indian tea grades (BOP, BOPSM, BP, PF, PD, FTGFOP1, TGFOP).
  - Prerendered semantic content in `index.html` includes full category descriptions for SEO crawlers without JavaScript.

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**:
  - Feeds preselected data into `BuyerRequirementForm` (Section 08).
  - Links to `GradeSpecificationTable` (Section 04).
- **Shared Components**:
  - `src/constants/contact.ts`
- **Global CSS Dependencies**:
  - `src/styles/tokens.css`
  - `.container`, `.btn`, `.font-spec`, `.spec-badge`
- **API Dependencies**: None.
- **Navigation Dependencies**: Anchor `#our-teas` and `#tea-by-grade`.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC03-01` | Active tab keyboard arrow navigation and grade selection accessibility | Implement WAI-ARIA tab pattern (roving tabindex + arrow keys) and radiogroup pattern for grades with focus styling | Medium | **Resolved** |
| `SEC03-02` | Images are standard JPG format | Convert to WebP format with responsive `<picture>` srcset for faster mobile load | Low | Open |
| `SEC03-03` | Sourcing console can push content down on mobile when grade application text varies | Set min-height on grade description container to prevent layout shift | Low | **Resolved (Phase 1)** |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - Active category tab accurately reflects selected theme and liquor color.
  - Photography matches category (e.g. CTC is granular, Orthodox has golden tips).
  - Organoleptic grid displays all 4 parameters clearly.
  - Topographic contour elevation lines display softly on warm canvas without distracting text.
  - Excessive vertical gap between protocol banner and category tabs eliminated.
- **Functional Verification**:
  - Clicking tabs swaps category data instantly.
  - Clicking a grade pill updates the displayed application note and sets the preselected grade for form submission.
  - Clicking "Request Samples" scrolls to `#requirement-form` and preselects the active category.
- **Desktop Verification**:
  - Two-column console displays balanced proportions at 1440px and 1280px.
- **Tablet Verification**:
  - 2x2 organoleptic grid aligns properly on 768px viewports.
- **Mobile Verification**:
  - Tab bar scrolls smoothly without horizontal page overflow.
  - Stacked layout displays image, details, and full-width CTA cleanly.
- **Regression Testing**:
  - Check that category switching does not affect unrelated page components.
- **Performance Checks**:
  - Tab animations run at 60fps with zero layout shifts (CLS < 0.02).

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-03 | Implemented SEC03 Atelier Phase 2.1: Two-Screen Editorial Layout Refinement (refactored Section 03 into Screen 01: Sourcing Introduction calibrated to fit within one desktop viewport [min-height: calc(100vh - 74px)] beneath the sticky header with zero clipping, and Screen 02: Interactive Tea Origin Atelier beginning with the 4 terroir cards, 2-column laboratory and sourcing console, scroll-margin-top 80px, and natural responsive document flow on mobile/tablet) | `src/features/tea-catalog/components/TeaCategoriesSection.tsx`, `src/styles/index.css`, `docs/website-sections/03_TEA_CATEGORIES.md`, `docs/SEC03_ATELIER_PHASE_2_1_REPORT.md` | Verification suite (36 accessibility tests passed), functional test suite (13 tests passed), tsc, vite build, Headless Chrome 1440x900, 1366x768, 1280x720 desktop, 768px tablet, 390px mobile screenshots, zero horizontal overflow |
| 2026-11-03 | Implemented SEC03 Atelier Phase 2: Terroir Navigation Redesign (transformed category tabs into origin-inspired terroir selection cards with balanced 4-column desktop grid, 2x2 tablet grid, 390px horizontal touch scroll snapping, distinctive origin identities for Assam CTC, Assam Orthodox, Darjeeling, and Green & Specialty, origin icon chips, geographic elevation badges, and terroir-accented active indicators) | `src/features/tea-catalog/components/TeaCategoriesSection.tsx`, `src/styles/index.css`, `docs/website-sections/03_TEA_CATEGORIES.md`, `docs/SEC03_ATELIER_PHASE_2_REPORT.md` | Verification suite (36 tests passed), functional test suite (13 tests passed), tsc, vite build, Headless Chrome 1440px desktop, 768px tablet, 390px mobile screenshots, zero horizontal overflow |
| 2026-11-03 | Implemented SEC03 Atelier Phase 1.1: Responsive visual refinement (reduced contour opacity by 15-20%, calibrated 390px clamp typography, compacted protocol banner, constrained Explore cue button, refined 50px mobile WhatsApp FAB with halo removed, and added horizontal scroll fade mask with scroll snap on category tabs) | `src/styles/index.css`, `docs/SEC03_ATELIER_PHASE_1_REPORT.md`, `docs/website-sections/03_TEA_CATEGORIES.md` | Verification suite (36 tests passed), tsc, vite build, Headless Chrome 1440px desktop, 768px tablet, 390px mobile screenshots, zero horizontal overflow |
| 2026-11-03 | Implemented SEC03 Atelier Phase 1: Visual foundation, warm canvas with subtle radial gradients and SVG topographic contour elevation lines, harmonized vertical spacing, refined surface/depth elevation, and stabilized grade callout min-height (resolving SEC03-03) | `src/styles/index.css`, `docs/website-sections/03_TEA_CATEGORIES.md` | Verification suite (36 tests passed), tsc, vite build, Headless Chrome desktop & mobile screenshots |
| 2026-11-03 | Implemented SEC03-01: WAI-ARIA tabs and grade radiogroup patterns, roving tabindex, keyboard navigation (Arrow keys/Home/End), and focus-visible indicators | `src/features/tea-catalog/components/TeaCategoriesSection.tsx`, `src/styles/index.css`, `docs/website-sections/03_TEA_CATEGORIES.md` | Verification suite (36 tests passed), tsc, vite build |
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/03_TEA_CATEGORIES.md` | Verified against `TeaCategoriesSection.tsx` & `src/styles/index.css` |

