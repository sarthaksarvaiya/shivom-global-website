# 03 — Tea Categories (What We Supply / Tea Sourcing Portfolio)

## 1. Section Overview
- **Section ID**: `sec-03` / `<section id="our-teas" className="tea-categories-section">`
- **Section Name**: Tea Categories & Sourcing Portfolio (What We Supply)
- **Position on Website**: Section 2 of the main content flow, rendered directly below `HeroSection`.
- **Main Purpose**: Present SHIVOM GLOBAL's 4 core export tea categories (Assam CTC, Assam Orthodox, Darjeeling Single Origin, Indian Green & Wellness Teas), their organoleptic cupping attributes, origin terroirs, commercial grades, and packing specifications.
- **Target Audience**: Overseas tea importers, commercial blenders, wholesale repackers, supermarket brand procurement teams, and boutique loose-leaf brand owners seeking granular technical specifications and physical counter-samples.
- **Business Objective**: Educate prospective buyers on available origin profiles, facilitate organoleptic cup comparison, establish origin traceability, and drive preselected sample inquiries directly into the Buyer Requirement Form (`#requirement-form`).

## 2. Current Implementation
- **Existing Design Description**: Two-part presentation architecture combining an introductory Sourcing Spectrum protocol screen with an interactive high-contrast Sourcing Console screen featuring dynamic terroir-ambient themes matching tea liquor tones (Honey Amber, Golden Tippy, Muscatel Gold, Jade Green).
- **Existing Layout**:
  - **Part 1 (Introductory Screen)**: Centered editorial header with gold eyebrow badge, high-authority heading, lead paragraph, and 4-point verified sourcing protocol banner.
  - **Part 2 (Interactive Sourcing Console)**:
    - Sticky/scroll-margin anchor (`#tea-catalog-console`, scroll-margin-top: 85px).
    - Category navigation tab bar with 4 interactive tabs.
    - Two-column responsive console card:
      - **Left Panel (Specs & Profile)**: Header (Origin pill, Category name, Tagline), Lead description, Organoleptic Cupping Grid (4 cards: Liquor, Body, Aroma, Milk Reactivity), Interactive Grade Selector Pills, Technical Sourcing Specifications List, and Primary Action Buttons.
      - **Right Panel (Terroir Image & Cupping Swatch)**: Premium authentic photography, floating liquor color badge with hex swatch dot, quick WhatsApp sample inquiry trigger.
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
- **Semantic HTML**: `<section id="our-teas">`, `<div role="tablist">`, `<button role="tab">`, `<ul role="list">`, `<li>`.
- **Image Alt Attributes**: Every image has an authoritative, descriptive alt attribute:
  - `alt="Authentic Assam CTC granular black tea with rich amber liquor cupping"`
  - `alt="Upper Assam Orthodox whole black tea leaves with golden tips and golden liquor cupping"`
  - `alt="Darjeeling single origin black tea leaves with pale golden-amber muscatel liquor cup"`
  - `alt="Authentic Indian whole green tea leaves with clear jade green tea infusion"`
- **ARIA Attributes**:
  - `role="tablist"`, `role="tab"`, `aria-selected={true/false}`, `aria-controls`.
  - Action buttons have descriptive `aria-label`.
- **Keyboard Accessibility**: Tabs and grade pills are fully navigable via `Tab` and activation via `Enter` or `Space`.
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
| `SEC03-01` | Active tab keyboard arrow navigation (Left/Right) not fully implemented | Implement WAI-ARIA tab pattern with `onKeyDown` handling for Left/Right arrows | Medium | Open |
| `SEC03-02` | Images are standard JPG format | Convert to WebP format with responsive `<picture>` srcset for faster mobile load | Low | Open |
| `SEC03-03` | Sourcing console can push content down on mobile when grade application text varies | Set min-height on grade description container to prevent layout shift | Low | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - Active category tab accurately reflects selected theme and liquor color.
  - Photography matches category (e.g. CTC is granular, Orthodox has golden tips).
  - Organoleptic grid displays all 4 parameters clearly.
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
  - Tab animations run at 60fps with zero layout shifts (CLS < 0.05).

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/03_TEA_CATEGORIES.md` | Verified against `TeaCategoriesSection.tsx` & `src/styles/index.css` |

