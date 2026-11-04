# 04 — Tea Origins & Grades: The Tea Origin & Grade Explorer

## 1. Section Overview
- **Section ID**: `sec-04` / `<section id="tea-by-grade" className="tea-explorer-section">`
- **Section Name**: The Tea Origin & Grade Explorer (Commercial Sourcing Catalog & Technical Specification System)
- **Position on Website**: Section 3 of the main content flow, rendered directly below `TeaCategoriesSection` (`#our-teas`) and above `PrivateLabelSection` (`#private-label`).
- **Main Purpose**: Deliver an interactive, editorial digital sourcing showroom that combines terroir discovery, visual grade selection across all 14 commercial sourcing cuts, deep technical specification drawers, and multi-grade sample shortlisting.
- **Target Audience**: Professional tea tasters, commercial packet tea brand managers, tea bag manufacturers, institutional blenders, and import brokers who evaluate teas by specific sieve cuts, auction classifications, and organoleptic liquor chemistry.
- **Business Objective**: Establish technical competence over Indian tea classifications, enable granular grade preselection and multi-grade shortlists that automatically route into the Buyer Requirement Form, and facilitate custom mesh or benchmark counter-sample matching without claiming unverified standing stock (Buyer-First, Inventory-Last principle).

---

## 2. Interactive Architecture & Design System

The section has evolved from a static spreadsheet table into **The Tea Origin & Grade Explorer**, featuring five integrated layers:

### A. Editorial Hero — Tea Collection Introduction
- **Eyebrow Badge**: Gold-bordered capsule: `INDIAN TEA SOURCING COLLECTION`.
- **Heading**: `Discover the Character of Indian Tea` with an editorial serif display aesthetic.
- **Lead Description**: Communicates the Buyer-First model: every requirement is matched against harvest availability, terroir documentation, and pre-shipment counter-samples rather than speculative standing stock.
- **Trust Metrics Bar**:
  - `14` Commercial Sourcing Grades
  - `4` Distinguishable Indian Terroirs
  - `100%` Pre-Shipment Counter-Samples
  - `3–5 Days` Western Sea Logistics Corridor (Mundra / Kandla to Jebel Ali)

### B. Visual Tea Category Explorer
Displays four distinct interactive category cards with authentic photography and terroir badges:
1. **Assam CTC**: 6 commercial grades; bold granular cuts; Gulf Karak chai foundation; Brahmaputra Valley & Upper Assam terroirs.
2. **Assam Orthodox**: 4 commercial grades; whole wiry leaves and golden tips; traditional orthodox processing; Brahmaputra Valley terroirs.
3. **Darjeeling Single-Origin**: 2 specialty grades (FF & SF); high-elevation Himalayan foothills; GI-compliant sourcing documentation.
4. **Indian Green Tea**: 2 specialty grades (Whole Leaf & Fannings); pan-fired processing; loose-leaf and pyramid tea bag cuts.
- **Interactive Filtering**: Clicking any category card smoothly updates the grade collection below without page reload.

### C. Interactive Grade Collection (14 Visual Cards)
14 cards arranged in a responsive 3-column desktop / 2-column tablet / 1-column mobile grid:
- **Card Header**: Monospace grade code badge, terroir origin tag, and specification status indicator (`Supplier-Confirmed Sourcing` vs `Provisional Sourcing Matrix`).
- **Representative Photography**: High-resolution authentic tea leaf/cut visual with subtle hover zoom.
- **Cut & Sieve Profile**: Industrial cut description, standardized commercial sieve classification, and cupping liquor behavior.
- **Application Tags**: Clear pills including `Karak Chai`, `Tea Bags`, `Consumer Packet`, `Specialty Retail`, `Loose-Leaf Blends`.
- **Primary Actions**:
  - **"Specs"**: Opens the technical specification slide-out drawer.
  - **"Shortlist" / "Shortlisted"**: Adds/removes grade from the sticky bottom shortlist bar.
  - **"Specify"**: 1-click router directly into the Buyer Requirement Form.
  - **WhatsApp**: Direct contextual chat link pre-populated with grade code and sourcing territory.

### D. Technical Specification Drawer (`GradeSpecificationDrawer.tsx`)
- Slide-out right panel (desktop $\ge 768\text{px}$) and bottom-sheet modal (mobile $< 768\text{px}$).
- Accessible WAI-ARIA modal dialog (`role="dialog"`, `aria-modal="true"`, `Escape` key listener, focus trap, and background scroll locking).
- Four detailed specification tabs/sections:
  1. *Product Identification & Terroir*: Category, origin, statutory compliance (FSSAI / Tea Board / GI), and harvest windows.
  2. *Cut, Particle & Sieve Protocol*: Industrial cut type, sieve classification, mesh guidelines, and laboratory laser diffraction notes.
  3. *Organoleptic Cupping Profile*: Dry leaf visual, liquor infusion color, briskness/body notes, and extraction behavior.
  4. *Commercial Packing & Logistics*: Export packaging options (multi-wall paper sacks, bulk corrugated cartons, food-grade foil caddies), MOQ benchmarks, and pre-shipment sample dispatch protocols.

### E. Buyer Sample Shortlist Bar (`SampleShortlistBar.tsx`)
- Persistent floating bottom toolbar activated when 1 or more grades are shortlisted.
- Displays interactive grade code pills with individual remove (`X`) buttons.
- Supports single-click "Clear All" or "Proceed to Requirement Form".
- Transfers multi-grade selections (`BOP · PD · FTGFOP1 (FF)`) directly into the Buyer Requirement Form with zero loss of context.

---

## 3. Commercial Data Governance

To protect SHIVOM GLOBAL's reputation and avoid misrepresenting specifications to international buyers:
1. **No Invented Micron/Millimeter Numbers**: Sieve classifications are identified by commercial standards (`Standard Bold Commercial Sieve`, `Fine Tea Bag Sieve Cut`, `Specialized Dust Sieve`) rather than rigid unverified millimeter ranges. Sieve distributions are confirmed against laboratory laser diffraction on buyer counter-samples.
2. **Explicit Verification Statuses**: Each grade carries a `specificationStatus`:
   - `supplier-confirmed`: Backed by established auction cataloging and garden grading protocols.
   - `provisional`: Sourced against buyer-mandated counter-sample matching.
3. **Traceable Origin Attribution**: Sourcing territories are tied to actual regional terroirs (`Assam Brahmaputra Valley Terroirs`, `High-Elevation Darjeeling Foothills`, `High-Elevation Indian Terroirs`). Darjeeling teas note mandatory GI origin documentation and Tea Board registration.
4. **Buyer-First Sourcing Principle**: Transparently disclaims that all offerings represent commercial sourcing capabilities, with physical pre-shipment counter-samples dispatched for laboratory evaluation prior to export contract execution.

---

## 4. Component & Data Mapping

- **Main Container**: [`src/features/tea-catalog/components/TeaOriginGradeExplorer.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/components/TeaOriginGradeExplorer.tsx)
- **Specification Drawer**: [`src/features/tea-catalog/components/GradeSpecificationDrawer.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/components/GradeSpecificationDrawer.tsx)
- **Shortlist Floating Bar**: [`src/features/tea-catalog/components/SampleShortlistBar.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/components/SampleShortlistBar.tsx)
- **Backwards Compatibility Wrapper**: [`src/features/tea-catalog/components/GradeSpecificationTable.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/components/GradeSpecificationTable.tsx) (re-exports `TeaOriginGradeExplorer`)
- **Centralized Types**: [`src/features/tea-catalog/types/gradeMatrix.ts`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/types/gradeMatrix.ts)
  - `CommercialGradeSpecification`: Full commercial and organoleptic schema.
  - `TeaCategoryExplorerItem`: Category metadata and authentic photography paths.
  - `SpecificationStatus`: `'provisional' | 'supplier-confirmed' | 'verified'`.
  - `SourcingTerritory`: Authentic regional origin territories.
- **Centralized Data**: [`src/features/tea-catalog/data/commercialGradesData.ts`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/data/commercialGradesData.ts) (14 commercial grades, 4 categories)
- **Form Integration**:
  - [`src/pages/HomePage.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/pages/HomePage.tsx) (`handleSelectGrade`, `handleShortlistSubmit`)
  - [`src/features/buyer-requirement/components/BuyerRequirementForm.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/buyer-requirement/components/BuyerRequirementForm.tsx) (Dynamic shortlisted grade option + grouped catalog optgroups)

---

## 5. Styling & Token Architecture

- **Primary CSS File**: `src/styles/index.css`
  - `.tea-explorer-section`: Deep obsidian green backdrop (`#081E15`), ivory text, gold accents.
  - `.tea-category-card`: Interactive grid cards with authentic photography and hover depth.
  - `.tea-grade-card`: Technical card layout with monospace badges, tag pills, and dual-tier action buttons.
  - `.tea-spec-drawer`: Slide-out panel / bottom-sheet with backdrop blur, accessible close button, and tabbed specifications.
  - `.sample-shortlist-bar`: Fixed bottom docking bar (`z-index: 90`) with badge counters, individual removable pills, and clear triggers.
- **Design Tokens**: Centralized in `src/styles/tokens.css` (`--color-primary-green`, `--color-primary-dark`, `--color-gold`, `--color-surface`, `--font-mono`).
- **Responsive Breakpoints**:
  - Desktop ($\ge 1024\text{px}$): 3-column grade grid, 4-column category grid, 540px right-hand slide drawer.
  - Tablet ($768\text{px} - 1023\text{px}$): 2-column grade grid, 2-column category grid.
  - Mobile ($< 768\text{px}$): 1-column stacked cards, bottom-sheet drawer (92vh max), touch targets $\ge 44\text{px}$, floating shortlist bar with horizontal scroll for chips.

---

## 6. Accessibility & WAI-ARIA
- **Category Filter Tabs**: `role="tablist"` with APG roving tabindex (`0` active, `-1` inactive), full keyboard arrow navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`), `role="tab"`, and `role="tabpanel"`.
- **Specification Drawer**: `role="dialog"`, `aria-modal="true"`, focus retention on trigger upon close, and keyboard `Escape` key dismissal.
- **Screen Reader Announcements**: Live region (`aria-live="polite"`) updates when shortlisting grades; explicit `aria-label` attributes on all icon-only buttons.
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`, disabling slide transitions in favor of instantaneous opacity fades.

---

## 7. Issue Backlog & Resolution

| ID | Issue | Solution | Priority | Status |
|---|---|---|---|---|
| `SEC04-01` | Table had only 8 grades; Darjeeling & Green missing | Added Darjeeling (First/Second Flush) and Green Tea (Whole Leaf/Fannings) with category tabs (14 grades total) | High | **Resolved** |
| `SEC04-02` | Mobile horizontal table scroll required dragging | Replaced with native responsive visual grade cards and mobile bottom-sheet drawer | Medium | **Resolved** |
| `SEC04-03` | Unclear particle sizing & blender guidance | Added industrial cut classifications, commercial sieve guidance, and custom mesh targeting notes without unverified millimeters | Medium | **Resolved** |
| `P4-04` | UAE / Gulf Karak chai suitability unrepresented | Highlighted Pekoe Dust (PD) and Dust 1 (D1) with dedicated `[Karak Chai]` tags and extraction profiles | High | **Resolved** |
| `P4-05` | Complete absence of Darjeeling & Green Tea grades | Integrated full 14-grade commercial spectrum across all 4 categories | High | **Resolved** |
| `P4-06` | Inflexible single-grade inquiry limitation | Implemented multi-grade sample shortlisting bar synchronized with Buyer Requirement Form | High | **Resolved** |

---

## 8. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-04 | Implemented complete redesign into **The Tea Origin & Grade Explorer**: 14 visual cards, 4 terroir category cards, technical specification drawer, multi-grade sample shortlisting bar, and Buyer Requirement Form multi-grade synchronization. | `TeaOriginGradeExplorer.tsx`, `GradeSpecificationDrawer.tsx`, `SampleShortlistBar.tsx`, `GradeSpecificationTable.tsx`, `gradeMatrix.ts`, `commercialGradesData.ts`, `HomePage.tsx`, `BuyerRequirementForm.tsx`, `TeaCategoriesSection.tsx`, `index.css`, `04_TEA_ORIGINS_AND_GRADES.md` | `npm run build` passed (0 errors), Chrome DevTools CDP headless browser verification across desktop & mobile (6 screenshots captured). |
| 2026-11-04 | Implemented Option 1 Modernization: 14 commercial grades, centralized data model (`gradeMatrix.ts`, `commercialGradesData.ts`), mobile specification cards, WAI-ARIA tabs with roving tabindex, Karak tags, and parent form routing. | `GradeSpecificationTable.tsx`, `commercialGradesData.ts`, `gradeMatrix.ts`, `HomePage.tsx`, `index.css`, `04_TEA_ORIGINS_AND_GRADES.md` | `npm run build` (tsc & vite passed), verification across viewports |
| 2026-11-02 | Initial documentation created from codebase audit | `04_TEA_ORIGINS_AND_GRADES.md` | Codebase inspection |
