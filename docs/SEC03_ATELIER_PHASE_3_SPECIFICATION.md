# SHIVOM GLOBAL — TEA ORIGIN ATELIER
# SEC-03 Phase 3: Architectural Audit & Detailed Implementation Specification

**Document Version:** 1.0.0  
**Date:** 2026-11-03  
**Status:** SPECIFICATION ONLY (Read-Only Phase — Awaiting Explicit Approval for Phase 3A Implementation)  
**Target Section:** `sec-03` / `<section id="our-teas" className="tea-categories-section">`  
**Target Component:** `src/features/tea-catalog/components/TeaCategoriesSection.tsx`  
**Primary CSS:** `src/styles/index.css` (Section 2 & Part 2 Console Rules)  
**Design Tokens:** `src/styles/tokens.css` (Three-Tier CSS Token Architecture)  

---

## 1. Current Architecture

### 1.1 Structural Layout & Page Hierarchy
The Tea Categories section (`#our-teas`) serves as Section 2 of the main content hierarchy on `HomePage.tsx`, positioned immediately beneath the Hero section (`#hero`) and immediately above the Grade Specification Table (`#tea-by-grade`).

The section is partitioned into a strict **Two-Screen Editorial Architecture**:

```
<section id="our-teas" className="tea-categories-section">
  <div className="container">
    
    <!-- SCREEN 01: SOURCING SPECTRUM & PROTOCOL SCREEN -->
    <div className="tea-sourcing-intro-screen">
      1. Section Header:
         - Gold Eyebrow Badge: "INDIAN TEA SOURCING SPECTRUM"
         - Main H2: "Tea Categories Sourced to Your Requirement"
         - Sourcing Lead Paragraph (Accredited B2B positioning)
         - Availability Disclaimer (Sourcing categories, not standing stock)
      2. 3-Step Sourcing Protocol Banner (.tea-protocol-banner):
         - Step 01: Specification Matching (Grade cut, mesh particle size, liquor depth)
         - Step 02: Pre-Shipment Cupping (Physical counter-sample dispatch)
         - Step 03: Container Export Dispatch (Lot allocation, phytosanitary checks, export)
      3. Scroll Cue CTA (.tea-intro-scroll-wrap):
         - Link to #tea-catalog-console with animated bounce chevron
    </div>

    <!-- SCREEN 02: INTERACTIVE TEA ORIGIN ATELIER -->
    <div id="tea-catalog-console" className="tea-sourcing-console-screen">
      1. Four Terroir Navigation Cards (.tea-category-nav-bar, role="tablist"):
         - Assam CTC (Brahmaputra Valley)
         - Assam Orthodox (Upper Assam Terroirs)
         - Darjeeling Single Origin (Himalayan Ridge, 6,000+ ft)
         - Green & Specialty (High-Elevation Terroirs)
      2. Dynamic Sourcing Console (.tea-sourcing-console, role="tabpanel"):
         - Left Column (.tea-console-visual):
           * Authentic Leaf Photography Frame (.tea-visual-frame)
           * Origin Tag & Visual Liquor Swatch Dot
           * Indicative Organoleptic Cupping Grid (2x2 Matrix: Liquor, Body, Aroma, Milk)
         - Right Column (.tea-console-specs):
           * Category Header (Counter-samples badge, H3 name, Tagline, Description)
           * Interactive Grade Radiogroup (.tea-grades-pill-wrap, role="radiogroup")
           * Active Grade Callout Card (.tea-active-grade-callout)
           * Sourcing & Packing Specifications List (.tea-specs-list)
           * Dual Conversion Actions (Sample CTA + WhatsApp Consultation Link)
    </div>

    <!-- SECTION BOTTOM TRANSITION -->
    <div className="tea-categories-bottom-cta">
      - Technical mesh sieve callout & deep link to #tea-by-grade
    </div>

  </div>
</section>
```

### 1.2 State Management & Interactions
1. **Active Category State**: `const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);`
   - Controls which of the 4 tea varieties is active.
   - When a user selects a new category (via mouse click or keyboard arrow), `handleSelectCategoryTab` synchronizes `activeCategoryIndex` and resets `selectedGradeCode` to `activeCategory.defaultGrade`.
2. **Selected Grade State**: `const [selectedGradeCode, setSelectedGradeCode] = useState<string>(activeCategory.defaultGrade);`
   - Tracks the active grade badge inside the selected category.
   - Updates the live in-context technical callout box (`.tea-active-grade-callout`) and dynamically alters CTA button labels and WhatsApp URL query parameters.
3. **Scroll Offset & Anchor Positioning**:
   - `handleScrollToConsole` calculates target element offset dynamically:
     ```ts
     const headerOffset = 88; // 74px sticky header + 14px breathing room
     const elementPosition = targetEl.getBoundingClientRect().top;
     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
     ```
   - Accompanied by CSS `scroll-margin-top: 88px` on `.tea-sourcing-console-screen` and `.tea-category-nav-bar`.
4. **Buyer Form Preselection Integration**:
   - `handleCategorySampleRequest` calls `onSelectCategory(activeCategory.name, selectedGradeCode)`.
   - Propagates to `HomePage.tsx`, executing:
     ```ts
     setFormRequirementType(categoryName);
     setFormGrade(gradeCode);
     setFormIntent('sample');
     scrollToForm(); // Smoothly scrolls to #requirement-form with header offset
     ```
5. **Contextual WhatsApp URL Generation**:
   - Integrated via `CONTACT_INFO.whatsapp.getLink(...)` in `src/constants/contact.ts`.
   - Generates pre-populated message:
     `"Hi SHIVOM GLOBAL, I am reviewing your {activeCategory.name} ({selectedGradeCode}) specifications and would like to discuss sourcing options."`

---

## 2. Existing Visual Strengths

1. **Authoritative Trade Palette**:
   - Deep Forest Green (`#0D3829`), Dark Forest (`#072218`), Pure Warm Ivory (`#FAF8F5`, `#FFFFFF`), and Metallic Harvest Gold (`#C59B27`, `#D4AF37`).
   - Conveys institutional export credibility without generic tech gradients or neon glows.
2. **Authentic Photography & Origin Integrity**:
   - Real, authentic Indian tea estate photography for all 4 categories (`assam-ctc-spotlight.jpg`, `assam-orthodox.jpg`, `darjeeling-single-origin.jpg`, `indian-green-tea.jpg`).
   - Avoids stock-photo artifice; highlights genuine dry leaf textures, particle cuts, and brewed liquor cups.
3. **Two-Screen Editorial Separation**:
   - Screen 01 establishes institutional sourcing protocol (3-step verification) within a single desktop viewport.
   - Screen 02 reveals the interactive atelier, placing the 4 Terroir Navigation cards prominently first below the sticky header.
4. **Dynamic Terroir-Ambient Theming**:
   - Smooth container background and border color shifts tailored to the liquor character of each variety (Honey Amber for CTC, Golden Tippy for Orthodox, Muscatel Amber for Darjeeling, Pale Jade for Green Tea).
5. **WAI-ARIA APG Compliance**:
   - Fully accessible WAI-ARIA tablist pattern for category navigation and radiogroup pattern for grade selection, featuring roving tabindex and focus rings.

---

## 3. Identified Design Problems

Comprehensive inspection of the current component code and visual rendering across viewports reveals the following specific architectural and aesthetic issues:

| # | Identified Problem | Root Cause in Code / CSS | Visual / UX Impact |
|---|---|---|---|
| **P-1** | **Vertical Column Imbalance on Desktop** | `.tea-sourcing-console` uses `grid-template-columns: 1fr 1.05fr`. The right column contains category title, tagline, description, grade badges, callout card, 4 specs, and 2 action buttons. The left column only contains the 16:10 image frame and the 2x2 sensory grid. | On viewports between 1200px and 1600px, the right intelligence column is significantly taller than the left media column, creating an awkward empty gap below the organoleptic panel. |
| **P-2** | **Understated Tea Liquor Cupping Presentation** | The liquor cupping indicator is restricted to a small 10px circular color dot (`.tea-liquor-swatch`) inside a semi-transparent overlay strip. | In professional Indian tea procurement, the organoleptic liquor evaluation (color, brightness, clarity, briskness) is equal in importance to dry leaf appearance. A 10px dot understates this critical B2B cupping factor. |
| **P-3** | **Sensory Grid Text Wrapping Inconsistencies** | `.tea-organoleptic-item` in `.tea-sensory-grid` (2x2) has fixed padding and variable text length (e.g. "Exceptional (Immediate Color & Depth)" vs "Full-Bodied Granular Density"). | At intermediate widths (800px–1100px), card heights fluctuate slightly or text wraps awkwardly, degrading the polished laboratory aesthetic. |
| **P-4** | **Lack of Particle Size & Cut Hints on Grade Badges** | Interactive grade badges display only the raw acronym code (`BOP`, `BOPSM`, `BP`, `PF`, `PD`, `Dust / D1`). | Non-expert buyers or new procurement managers cannot immediately perceive the sieve hierarchy (e.g., that BOP is coarse granular, PF is fast-extraction fannings, and PD/Dust is micro-mesh). |
| **P-5** | **Mobile Stacking Length (Long Scroll to CTAs)** | On mobile viewports (`<= 680px`), `.tea-sourcing-console` stacks into a single vertical column with visual leaf frame and sensory panel first, followed by category info, grades, and actions. | Mobile buyers must scroll past ~450px of image and sensory cards before reaching the interactive grade selector and conversion buttons. |
| **P-6** | **Category Navigation Horizontal Mask Cutoff on Mobile** | On mobile screens (375px–390px), `.tea-category-nav-bar` uses `overflow-x: auto` with `flex: 0 0 auto` and min-width 195px. | The fourth category card ("Green & Specialty") is hidden off-screen without an explicit visual page indicator or scroll counter, reducing discovery. |
| **P-7** | **Section Bottom Transition Card Contrast** | `.tea-categories-bottom-cta` uses a neutral white surface with subtle green border, which visually competes with the console container above it. | Needs tighter visual integration to feel like a cohesive transition into Section 04 (`#tea-by-grade`). |

---

## 4. Proposed Desktop Composition (Phase 3 Specification)

### 4.1 Enhanced Two-Column Atelier Balance (48% Media / 52% Intelligence)
To resolve **P-1** and create visual balance on desktop viewports (`>= 961px`):

```
+---------------------------------------------------------------------------------------------------+
|  SCREEN 02: INTERACTIVE TEA ORIGIN ATELIER                                                        |
+---------------------------------------------------------------------------------------------------+
|  [ 1. Assam CTC ]      [ 2. Assam Orthodox ]    [ 3. Darjeeling ]      [ 4. Green & Specialty ]   |
+---------------------------------------------------------------------------------------------------+
|  LEFT COLUMN: VISUAL LEAF & CUPPING ATELIER (48%) | RIGHT COLUMN: PROCUREMENT INTELLIGENCE (52%)  |
|                                                   |                                               |
|  +---------------------------------------------+  |  [ COUNTER-SAMPLES ON REQUEST ]               |
|  | AUTHENTIC LEAF PHOTOGRAPHY FRAME            |  |                                               |
|  | - 16:10.5 Aspect Ratio (Native Crop)         |  |  Category Name & Origin Tagline               |
|  | - Origin Estate & Elevation Badge           |  |  Refined Sourcing Scope Paragraph             |
|  +---------------------------------------------+  |                                               |
|                                                   |  EXPORT SOURCING GRADES                       |
|  +---------------------------------------------+  |  [ BOP ] [ BOPSM ] [ BP ] [ PF ] [ PD ] [ D1 ]|
|  | LABORATORY CUPPING BAR (ENHANCED)           |  |                                               |
|  | - Liquor Tone Swatch & Infusion Clarity     |  |  +-----------------------------------------+  |
|  | - Cupping Character: Bold / Brisk / Aromatic|  |  | ACTIVE GRADE TECHNICAL CALLOUT           |  |
|  +---------------------------------------------+  |  | - Grade Code & Name                     |  |
|                                                   |  | - Mesh Particle Sizing Hint             |  |
|  +---------------------------------------------+  |  | - Target Commercial Application        |  |
|  | INDICATIVE ORGANOLEPTIC PROFILE (2x2)       |  |  +-----------------------------------------+  |
|  | [ LIQUOR DEPTH ]     [ BODY & TEXTURE ]     |  |                                               |
|  | [ AROMA PROFILE ]    [ MILK AFFINITY ]      |  |  SOURCING & PACKING SPECIFICATIONS         |
|  +---------------------------------------------+  |  (•) Lot-matched estate sourcing              |
|                                                   |  (•) Standard bulk packaging (40-55kg sacks)  |
|                                                   |  (•) FCL / LCL container export coordination  |
|                                                   |  (•) Full export documentation compliance     |
|                                                   |                                               |
|                                                   |  [ REQUEST {GRADE} COUNTER-SAMPLES  -> ]      |
|                                                   |  [ Discuss on WhatsApp ({GRADE})        ]     |
+---------------------------------------------------------------------------------------------------+
```

### 4.2 Key Desktop Enhancements
1. **Laboratory Cupping Bar**:
   - Positioned between the photography frame and the organoleptic panel.
   - Replaces the 10px circular dot with a refined **Cupping Infusion Strip**:
     - Visual liquor hue bar representing true infusion tone.
     - Infusion color description (e.g., *"Deep Amber with High Brisk Rim"*).
     - Recommended water temperature and extraction time guidance for commercial cup evaluation.
2. **Organoleptic Matrix Balancing**:
   - Standardized micro-label styling using `.font-spec` with `letter-spacing: 0.06em`.
   - Balanced line heights and minimum card padding to ensure identical height across all 4 quadrants.
3. **Right-Column Visual Anchor**:
   - Sticky intelligence layout option for extra-tall displays so actions remain anchored to the viewport as the user interacts with grades.

---

## 5. Proposed Mobile Composition (Phase 3 Specification)

### 5.1 Re-sequenced Mobile Reading Order
On mobile viewports (`<= 680px`), re-sequence the layout so high-intent commercial buyers encounter the interactive grade selection and conversion actions without excessive scrolling:

```
+-----------------------------------------------+
| MOBILE SCREEN 02 SEQUENCE (<= 680px)          |
+-----------------------------------------------+
| 1. Terroir Origin Selector (Swipeable Bar)    |
|    - Visible indicators showing 4 options     |
+-----------------------------------------------+
| 2. Category Title & Terroir Origin Header     |
|    - Category Name (e.g. Assam CTC)           |
|    - Tagline & Counter-Sample Badge           |
+-----------------------------------------------+
| 3. Authentic Leaf Photography Frame           |
|    - Compact 16:9 aspect ratio                |
|    - Origin tag & Liquor chip overlay         |
+-----------------------------------------------+
| 4. Export Sourcing Grades (Touch-First)       |
|    - Minimum 44px touch targets               |
|    - Horizontal wrapping chips                |
+-----------------------------------------------+
| 5. Active Grade Callout Card                  |
|    - Selected grade code, name & application  |
+-----------------------------------------------+
| 6. Sourcing Specifications Summary            |
|    - Compact bullet list with checkmarks      |
+-----------------------------------------------+
| 7. Indicative Organoleptic Profile            |
|    - Compact 2x2 grid                         |
+-----------------------------------------------+
| 8. Dual Action Conversion Buttons             |
|    - Full-width Sample Request CTA            |
|    - Full-width WhatsApp Consultation Link    |
+-----------------------------------------------+
```

### 5.2 Mobile Touch & Usability Improvements
1. **Grade Chip Tap Targets**:
   - Ensure all grade selector badges have a minimum height of `44px` and minimum width of `48px`, satisfying WCAG 2.5.5 (Target Size).
2. **Horizontal Tab Discoverability**:
   - Add a subtle 4-dot indicator or counter (`1 of 4`) beneath `.tea-category-nav-bar` on mobile so buyers are immediately aware of all 4 tea varieties.
3. **Compact Organoleptic Matrix**:
   - Font sizes adjusted: labels at `0.625rem` (10px), values at `0.75rem` (12px), reducing vertical space by ~40px.

---

## 6. Photography and Asset Mapping

### 6.1 Existing Asset Inventory & Technical Properties
All 4 tea category images reside in `public/images/`. No new image generation or third-party asset downloads are permitted or required.

| Category ID | Asset Path | Image Format | Actual Dimensions | File Size | Native Aspect Ratio | Current Render Ratio |
|---|---|---|---|---|---|---|
| `assam-ctc` | `/images/assam-ctc-spotlight.jpg` | JPEG (JFIF 1.01) | **1200 × 896 px** | 803 KB | 1.339 : 1 (~4:3) | 16 : 10.5 (`1.524 : 1`) |
| `assam-orthodox` | `/images/assam-orthodox.jpg` | JPEG (JFIF 1.01) | **1200 × 896 px** | 708 KB | 1.339 : 1 (~4:3) | 16 : 10.5 (`1.524 : 1`) |
| `darjeeling` | `/images/darjeeling-single-origin.jpg` | JPEG (JFIF 1.01) | **1200 × 896 px** | 744 KB | 1.339 : 1 (~4:3) | 16 : 10.5 (`1.524 : 1`) |
| `green-wellness` | `/images/indian-green-tea.jpg` | JPEG (JFIF 1.01) | **1200 × 896 px** | 747 KB | 1.339 : 1 (~4:3) | 16 : 10.5 (`1.524 : 1`) |

### 6.2 Asset Rendering & Aspect Ratio Refinement
- **Current Issue**: The CSS `.tea-visual-frame` specifies `aspect-ratio: 16 / 10.5` (~1.524). Because the native assets are `1200 × 896` (1.339), `object-fit: cover` crops approximately 12.1% from the top and bottom of the photographs.
- **Proposed Refinement**:
  - Update `.tea-visual-frame` to `aspect-ratio: 16 / 11` (or `4 / 3` on mobile) to display more of the authentic leaf geometry and brewed cup edges without unnecessary vertical clipping.
  - Maintain `object-fit: cover` with `object-position: center 45%` to center the tea spoon and liquor cup.
  - Set explicit attributes `width={640}` and `height={440}` in `<img>` to prevent Cumulative Layout Shift (CLS).
  - Retain `loading="lazy"` and `decoding="async"`.

---

## 7. Grade Panel Refinement

### 7.1 Grade Categorization & Sieve Hints
To address **P-4** (lack of particle size hints), the grade data structure in `TeaCategoriesSection.tsx` will be extended with an optional `sieveHint` property:

```ts
export interface TeaGradeDetail {
  code: string;
  name: string;
  sieveHint?: string;    // e.g. "Bold Granular Cut" | "Rapid Brew Fannings" | "Micro Chai Dust"
  application: string;
}
```

#### Proposed Sieve Hints by Category:
1. **Assam CTC**:
   - `BOP`: *"Bold Granular Cut (Mesh 10–14)"*
   - `BOPSM`: *"Medium-Bold Granular (Mesh 14–18)"*
   - `BP`: *"Standard Granular Cut (Mesh 18–24)"*
   - `PF`: *"Fine Fast-Extraction Fannings (Mesh 24–30)"*
   - `PD`: *"Pekoe Dust (Mesh 30–40)"*
   - `Dust / D1`: *"Micro-Cut Sieve Dust (Mesh 40+)"*
2. **Assam Orthodox**:
   - `FTGFOP1`: *"Finest Tippy Whole Leaf"*
   - `TGFOP`: *"High-Tip Rolled Whole Leaf"*
   - `FBOP`: *"Flowery Broken Orange Pekoe"*
   - `BOPF`: *"Orthodox Broken Fannings"*
3. **Darjeeling**:
   - `First Flush FTGFOP1`: *"Spring Whole Leaf with Silver Tips"*
   - `Second Flush TGFOP`: *"Summer Harvest Muscatel Whole Leaf"*
   - `Autumnal Harvest`: *"Post-Monsoon Copper Leaf"*
4. **Green & Specialty**:
   - `Whole Leaf Green`: *"Antioxidant Preserved Whole Leaf"*
   - `Green Tea Fannings`: *"Fast Extraction Tea-Bag Cut"*
   - `Herbal Cut`: *"Uniform Botanical Blending Cut"*

### 7.2 Active Grade Callout Card Stabilization
- Fix `.tea-active-grade-callout` minimum height to `84px` across all categories to eliminate any minor layout shift when toggling between grades.
- Add `sieveHint` pill badge next to the grade code in `.tea-active-grade-top`.

---

## 8. Responsive Specifications

| Breakpoint Range | Device Class | Terroir Tabs Layout | Sourcing Console Layout | Sensory Grid | Action Buttons |
|---|---|---|---|---|---|
| **>= 1200px** | Large Desktop / Workstation | 4-column equal grid (`repeat(4, 1fr)`) | 2-column split (48% media / 52% specs) | 2x2 grid (equal height) | 100% width stacked with prominent Primary |
| **961px – 1199px** | Compact Desktop / Laptop | 4-column compact grid | 2-column split (46% media / 54% specs) | 2x2 grid | 100% width stacked |
| **769px – 960px** | Tablet Landscape | 2x2 grid (`repeat(2, 1fr)`) | 1-column vertical stack | 2x2 grid | 100% width stacked |
| **481px – 768px** | Tablet Portrait / Large Mobile | Horizontal scrollable snap row | 1-column vertical stack | 2x2 grid | Full-width buttons |
| **360px – 480px** | Standard Mobile (375px, 390px) | Horizontal scrollable snap row with page dots | 1-column compact vertical stack | 2x2 compact grid | Full-width buttons (44px min touch target) |
| **< 360px** | Compact Mobile | Horizontal scrollable snap row | 1-column ultra-compact stack | 1-column vertical list | Full-width buttons |

### Zero Horizontal Overflow Guarantee:
- Ensure all media rules enforce `max-width: 100%`, `overflow-x: hidden`, and proper `box-sizing: border-box`.
- No fixed widths exceeding `100vw - 32px`.

---

## 9. Accessibility Preservation Requirements

All changes in Phase 3 must strictly preserve existing WAI-ARIA APG compliance:

### 9.1 Category Navigation Tabs (`role="tablist"`)
- Container: `role="tablist"` with `aria-label="Tea categories selector"`.
- Tabs: `role="tab"`, `aria-selected={isActive}`, `aria-controls={"tea-panel-" + cat.id}`, `id={"tea-tab-" + cat.id}`.
- Roving Tabindex: Active tab has `tabIndex={0}`; all inactive tabs have `tabIndex={-1}`.
- Keyboard Navigation:
  - `ArrowRight`: Next category (wraps to first).
  - `ArrowLeft`: Previous category (wraps to last).
  - `Home`: First category (Assam CTC).
  - `End`: Last category (Green & Specialty).
  - Focus must follow selection immediately.

### 9.2 Grade Selection Radiogroup (`role="radiogroup"`)
- Container: `role="radiogroup"` with `aria-labelledby="tea-grades-heading"`.
- Grade Badges: `role="radio"`, `aria-checked={isSelected}`, `tabIndex={isSelected ? 0 : -1}`.
- Keyboard Navigation:
  - `ArrowRight` / `ArrowDown`: Next grade (wraps to first).
  - `ArrowLeft` / `ArrowUp`: Previous grade (wraps to last).
  - `Home`: First grade.
  - `End`: Last grade.
  - `Space` / `Enter`: Activate grade.
  - Focus must synchronize with selection.

### 9.3 Visual Focus Indicators & Motion Rules
- Focus indicators: `outline: 2px solid var(--color-accent-gold); outline-offset: 2px;` on `:focus-visible`.
- Reduced Motion: Respect `prefers-reduced-motion: reduce` and Motion's `useReducedMotion()`. All transforms, transitions, and keyframe animations must evaluate to `none` or `0ms` when enabled.

---

## 10. Exact File Modification Matrix (For Phase 3A)

The following files are targeted for implementation once Phase 3A is approved:

| File Path | Nature of Modifications | Action Scope |
|---|---|---|
| `src/features/tea-catalog/components/TeaCategoriesSection.tsx` | Add `sieveHint` to grade details; enhance cupping bar component; reorder mobile reading sequence if needed; refine aspect ratio. | EDIT (Phase 3A only) |
| `src/styles/index.css` | Update `.tea-sourcing-console` column grid proportions; add cupping bar styling; refine organoleptic grid typography; optimize mobile view. | EDIT (Phase 3A only) |
| `docs/website-sections/03_TEA_CATEGORIES.md` | Update section documentation with final Phase 3 specifications and component anatomy. | UPDATE (Phase 3A only) |
| `docs/SEC03_ATELIER_PHASE_3_REPORT.md` | Verification report with test results, visual screenshots, and final audit sign-off. | CREATE (Phase 3A only) |

### Prohibited Modifications:
- DO NOT edit `src/styles/tokens.css` (frozen design system).
- DO NOT edit `src/pages/HomePage.tsx` (frozen wiring).
- DO NOT edit `src/constants/contact.ts` (frozen contact information).
- DO NOT modify or overwrite image files in `public/images/`.

---

## 11. Regression Test Plan

Prior to final sign-off in Phase 3A, the following 4-tier verification protocol must be executed:

1. **Automated Accessibility Test Suite**:
   - 36 automated assertions checking WAI-ARIA tablist roving tabindex, radiogroup roving tabindex, arrow keys, Home/End keys, focus-visible states, and ARIA attributes.
2. **Automated Functional Test Suite**:
   - 13 automated assertions validating category switching, grade selection state sync, sample request callback (`onSelectCategory`), contextual WhatsApp URL generation, and scroll offset targeting.
3. **Multi-Viewport Visual Inspection**:
   - Capture Chrome DevTools full-page screenshots at:
     * `1440 × 900` (Standard Desktop)
     * `1366 × 768` (Laptop)
     * `1280 × 720` (Compact Desktop)
     * `768 × 1024` (Tablet Portrait)
     * `390 × 844` (Mobile iPhone 12/13/14)
     * `375 × 667` (Compact Mobile iPhone SE)
4. **TypeScript & Production Build Verification**:
   - Run `npm run build` (`tsc && vite build`) to confirm zero compilation errors and zero warnings.

---

## 12. Acceptance Criteria

Phase 3A will be deemed successfully completed and accepted ONLY when all of the following criteria are satisfied:

- [ ] **AC-1**: Screen 01 fits comfortably within a single desktop viewport (`calc(100vh - 74px)`) without clipping, maintaining the 3-step sourcing protocol banner and bouncing scroll cue.
- [ ] **AC-2**: Clicking "EXPLORE TEA ORIGINS & GRADES" scrolls smoothly to reveal the 4 Terroir Navigation cards first below the 74px sticky header (at `scroll-margin-top: 88px`).
- [ ] **AC-3**: Sourcing console on desktop displays balanced left (media & cupping) and right (intelligence & specs) columns with zero awkward empty gaps.
- [ ] **AC-4**: Laboratory Cupping Bar displays true tea liquor tone description and cupping characteristics for all 4 categories.
- [ ] **AC-5**: Interactive grade badges feature sieve sizing hints and stable, zero-shift technical callouts.
- [ ] **AC-6**: Sample request CTA correctly triggers `onSelectCategory(categoryName, gradeCode)` and passes preselection into `#requirement-form`.
- [ ] **AC-7**: WhatsApp CTA opens a valid `wa.me` URL with pre-populated message including category name and selected grade code.
- [ ] **AC-8**: WAI-ARIA APG Tabs and Radiogroup keyboard navigation operates with 100% compliance.
- [ ] **AC-9**: Zero horizontal page overflow across 375px, 390px, 768px, and 1440px viewports.
- [ ] **AC-10**: `npm run build` compiles with zero TypeScript errors.

---

## 13. Scope Boundary & Sign-Off Notice

**IMPORTANT:** This document concludes Phase 3 (Read-Only Audit and Detailed Implementation Specification).  
In accordance with project execution guidelines:
- No source code files have been modified.
- No design tokens have been altered.
- No image assets have been replaced.
- Implementation of Phase 3A will commence only upon explicit user review and approval of this specification.

