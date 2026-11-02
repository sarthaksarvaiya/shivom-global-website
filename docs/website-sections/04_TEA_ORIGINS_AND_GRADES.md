# 04 — Tea Origins & Grades (Grade Specification Reference Table)

## 1. Section Overview
- **Section ID**: `sec-04` / `<section id="tea-by-grade" className="grade-matrix-section">`
- **Section Name**: Tea Origins & Grades (Commercial Grade Specification Table)
- **Position on Website**: Section 3 of the main content flow, rendered directly below `TeaCategoriesSection`.
- **Main Purpose**: Provide a definitive, authoritative commercial reference table of standard Indian tea manufacturing cuts (Assam CTC and Orthodox), their visual style, industry applications, and direct specification mechanisms.
- **Target Audience**: Professional tea tasters, commercial packet tea brand managers, tea bag manufacturers, institutional buyers, and import brokers who evaluate teas by specific sieve grades and commercial mesh codes.
- **Business Objective**: Establish technical mastery over Indian auction classifications, enable granular grade preselection that automatically routes into the Buyer Requirement Form, and facilitate custom mesh or benchmark counter-sample matching.

## 2. Current Implementation
- **Existing Design Description**: Precision technical data-dense layout rendered in a clean corporate tabular format with Warm Gold badge accents, monospace grade codes, interactive filter tabs, and responsive horizontal overflow handling.
- **Existing Layout**:
  - **Section Header**: Centered gold eyebrow badge ("COMMERCIAL GRADE REFERENCE"), authoritative H2 title, and lead disclosure clarifying that grades represent sourcing classifications rather than speculative standing stock.
  - **Category Filter Bar**: Tablist allowing instant filtering by manufacturing type: "All Sourcing Grades (8)", "Assam CTC Granular (6)", and "Orthodox Whole Leaf (2)".
  - **Mobile Scroll Hint**: Visual indicator prompting touch users on smaller viewports.
  - **Grade Specification Table**: 5-column accessible data table wrapped in an overflow container.
  - **Organoleptic Disclaimer Strip**: Subtle amber-bordered information block emphasizing physical counter-sample cupping prior to contract commitment.
  - **Custom Specification Match Card**: Dark-accented callout box for buyers requiring custom mesh sizing, sieve distributions, or benchmark sample matching.
- **Content Structure**:
  - **8 Documented Tea Grades**:
    - **CTC BOP**: Broken Orange Pekoe (Largest CTC grade, robust granular leaf; packet tea foundation).
    - **CTC BOPSM**: BOP Small (Medium-to-bold even cut; consumer packet tea).
    - **CTC BP**: Broken Pekoe (Medium granular size; strong everyday milk chai).
    - **CTC PF**: Pekoe Fannings (Fine particles, rapid liquor release; tea bags & single-serve).
    - **CTC PD**: Pekoe Dust (Fine granular dust, instantaneous extraction; Karak chai & vending).
    - **CTC Dust / D1**: Dust 1 (Micro-cut particles, maximum color yield; foodservice & catering).
    - **Orthodox TGFOP**: Tippy Golden Flowery Orange Pekoe (Whole wiry leaf with golden tips; specialty loose-leaf).
    - **Orthodox FBOP**: Flowery Broken Orange Pekoe (Aromatic broken leaf with tips; English breakfast).
- **Visual Elements**:
  - Monospace font styling (`Space Grotesk`, `.font-spec`) for tea grades and industry abbreviations.
  - Interactive "Specify" / "Selected" state button with checkmark icon.
  - Compact green WhatsApp icon button for contextual instant chat.
- **Current Functionality**:
  - Filter tabs dynamically filter displayed table rows with smooth layout animation.
  - Clicking "Specify" selects the grade, synchronizes it with parent page state, and smoothly scrolls to `#requirement-form`.
  - Contextual WhatsApp icon generates pre-filled message specific to the selected grade code.
  - "Tell Us Your Specification" button preselects "Custom Specification" in the form.

## 3. Component Mapping
- **React Component Name**: `GradeSpecificationTable`
- **Exact Source File Path**: `src/features/tea-catalog/components/GradeSpecificationTable.tsx`
- **Related Subcomponents**: None (self-contained tabular component).
- **Shared Components & Utilities**:
  - `src/constants/contact.ts` (`CONTACT_INFO` for WhatsApp links).
  - `motion`, `AnimatePresence`, `useReducedMotion` from `motion/react`.
  - Icons from `lucide-react`: `ArrowRight`, `Info`, `Check`, `MessageCircle`.

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 3334–3750: Table container, filter bar, table headers, grade badges, custom box, and mobile horizontal scroll styles).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--bg-surface)` (#FFFFFF), `var(--border-subtle)` (#E5E7EB), `var(--color-primary-green)` (#0D3829), `var(--color-gold)` (#C59B27).
  - Spacing: `var(--space-2)` (8px), `var(--space-4)` (16px), `var(--space-6)` (24px), `var(--space-8)` (32px).
  - Radii: `var(--radius-sm)` (4px), `var(--radius-md)` (8px).
- **Typography**:
  - Grade codes: `var(--font-mono)` (Space Grotesk) with tabular numbers (`tnum`).
  - Table headers: Uppercase 12px with 0.05em letter spacing.
- **Layout Behaviour**:
  - Table wrapper: `overflow-x: auto; -webkit-overflow-scrolling: touch;`.
  - Table: `width: 100%; border-collapse: separate; border-spacing: 0; min-width: 720px;`.
- **Animation Styles**:
  - Row entrance and exit animations powered by Framer Motion / Motion `motion.tr`.

## 5. Asset Mapping
- **Image Paths**: None (Data table utilizes typographical clarity and SVG iconography).
- **SVG Paths**: None (inline Lucide icons).
- **Video Paths**: None.
- **Icon References**: `ArrowRight`, `Info`, `Check`, `MessageCircle`.
- **Fonts**: Space Grotesk (monospace specs) and Plus Jakarta Sans (body & headings).
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - Filter Buttons (3): Filter grades by All, CTC, and Orthodox.
  - "Specify" Button: Calls `onSelectGrade(gradeCode)`, sets parent form grade, and scrolls to `#requirement-form`.
  - Contextual WhatsApp Button: Direct link to WhatsApp with grade name and category preloaded.
  - "Tell Us Your Specification" CTA: Calls `handleCustomInquiry()`, setting grade to "Custom Specification".
- **Navigation**:
  - Section anchor `#tea-by-grade`.
  - Jump-down navigation to `#requirement-form` on grade selection.
- **Form Behaviour**: Injects selected grade into parent state in `HomePage.tsx` which populates `BuyerRequirementForm`.
- **Interactions**:
  - Filter tab activation toggles `activeFilter` state.
  - Row hover highlights background (`rgba(13, 56, 41, 0.03)`).
- **Animations**: Rows reorder with `layout` transitions and fade animations.
- **API Integrations**: None.
- **External Integrations**: WhatsApp link generation via `CONTACT_INFO.whatsapp.getContextualLink()`.

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: Full width 5-column table displaying Type, Grade, Appearance, Typical Use, and Actions without horizontal scroll.
- **Tablet (769px – 1024px)**: Table remains comfortably legible; column widths adapt fluidly.
- **Mobile (<= 768px & <= 480px)**:
  - Table wrapper enables horizontal scrolling (`min-width: 680px` table inside scrollable container).
  - Scroll hint banner (`.grade-table-scroll-hint`) appears above table alerting users.
  - Filter buttons wrap or become horizontally scrollable.
  - Custom specification box stacks vertically (Copy on top, button full width below).
- **Existing Responsive Issues**: On small mobile devices, horizontal scrolling requires two-finger swipe or conscious sideways dragging; table container has explicit `tabIndex={0}` to allow keyboard panning.

## 8. SEO & Accessibility
- **Heading Hierarchy**:
  - `<h2>`: "Tea Grades & Specification Reference" (`id="grade-table-heading"`)
  - `<h3>`: "Have a Target Benchmark Sample or Custom Mesh Specification?"
- **Semantic HTML**: `<section id="tea-by-grade" aria-labelledby="grade-table-heading">`, `<table>`, `<thead>`, `<tbody>`, `<th scope="col">`, `<tr>`, `<td>`.
- **Image Alt Attributes**: N/A (no images).
- **ARIA Attributes**:
  - Filter bar: `role="tablist" aria-label="Filter tea grades by manufacturing type"`.
  - Filter tabs: `role="tab" aria-selected={true/false}`.
  - Table wrapper: `role="region" aria-label="Tea Grades Specification Table" tabIndex={0}`.
  - Action buttons: Clear `aria-label` including grade code (e.g. `aria-label="Select BOP in requirement form"`).
- **Keyboard Accessibility**:
  - Full keyboard focusability across table container, filter buttons, and row action triggers.
  - Space and Enter keys trigger filters and selection.
- **Relevant SEO Considerations**:
  - Direct indexing of commercial tea grade terms (BOP, BOPSM, BP, PF, PD, Dust, TGFOP, FBOP).

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**:
  - Interlinked from `TeaCategoriesSection` ("View Full Grade Specifications" CTA).
  - Passes selected grade to `BuyerRequirementForm` (Section 08).
- **Shared Components**:
  - `src/constants/contact.ts`
- **Global CSS Dependencies**:
  - `src/styles/tokens.css`
  - `.container`, `.spec-badge`, `.btn`, `.font-spec`
- **API Dependencies**: None.
- **Navigation Dependencies**: Anchor `#tea-by-grade` and `#requirement-form`.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC04-01` | Table has 8 primary grades; Darjeeling & Green grades are listed only in Section 03 | Add Darjeeling (First/Second Flush) and Green Tea rows to the table with a category filter tab | Medium | Open |
| `SEC04-02` | Mobile card-based layout alternative for small screens | Provide optional responsive toggle switching table to stacked cards on mobile | Low | Open |
| `SEC04-03` | Mesh size (sieve range) data is described in text rather than numeric micrometers | Add optional particle size column (microns/mesh) for technical blenders | Low | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - Table header and rows align cleanly with correct column proportions.
  - Monospace font renders with uniform width on grade codes.
  - Selected grade displays checkmark and highlighted background.
- **Functional Verification**:
  - Clicking "CTC" filter isolates 6 CTC grades; "Orthodox" filter isolates 2 Orthodox grades.
  - Clicking "Specify" updates parent state and smoothly scrolls to `#requirement-form`.
  - WhatsApp icon opens chat with grade prefilled.
- **Desktop Verification**:
  - Full table fits inside 1240px container without horizontal scrollbar.
- **Tablet Verification**:
  - Table fits comfortably down to 768px viewport.
- **Mobile Verification**:
  - Horizontal scroll container allows smooth panning on 375px and 414px viewports.
  - Custom specification box wraps cleanly.
- **Regression Testing**:
  - Ensure filter state changes do not reset parent form values.
- **Performance Checks**:
  - Row filter transitions execute with zero lag or dropped frames.

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/04_TEA_ORIGINS_AND_GRADES.md` | Verified against `GradeSpecificationTable.tsx` & `src/styles/index.css` |

