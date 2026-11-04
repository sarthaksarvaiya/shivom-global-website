# 05 — Private Label (Packaging & Contract Packing Support)

## 1. Section Overview
- **Section ID**: `sec-05` / `<section id="private-label" className="private-label-section">`
- **Section Name**: Private Label & Contract Packaging Support
- **Position on Website**: Section 4 of the main content flow, rendered directly below `GradeSpecificationTable` and above `HowItWorksSection`.
- **Main Purpose**: Detail SHIVOM GLOBAL's packaging coordination capabilities spanning standard export bulk multi-wall paper sacks, flexible custom container packing, and retail brand packaging (pouches, tins, pyramid tea bags) through vetted third-party packing partners.
- **Target Audience**: Consumer packaged goods (CPG) brand creators, supermarket retail buyers, institutional catering operations, and private-label tea distributors needing turnkey packaging, destination compliance, and shelf-ready products.
- **Business Objective**: Broaden commercial engagement beyond raw bulk leaf trading into high-margin private label programs, clarifying minimum batch flexibility and routing preselected packaging inquiries directly into the buyer requirement engine.

## 2. Modernized Implementation
- **Design Structure**: Premium B2B Private Label & Packaging Showcase structured across 4 coherent vertical tiers:
  1. **Editorial Showcase**: Split 2-column introduction pairing authoritative positioning copy, commercial governance callout box, and authentic packaging photography (`/images/private-label-packaging.jpg`).
  2. **Supported Packaging Formats**: 3-column responsive card grid (`.private-label-formats-grid`):
     - Bulk Export Packaging (Standard Bulk Sacks) → routes to `'Standard Bulk Export Sacks'`
     - Custom Bulk Packing (Flexible Container Packaging) → routes to `'Heavy-duty Woven Sacks'`
     - Private Label Support (Retail Pouches, Tins & Tea Bags) → routes to `'Retail Stand-up Pouches'`
  3. **4-Stage Coordination Workflow**: 4-card sequence detailing the transparent operational journey from garden sourcing to destination port arrival:
     - 01: Tea Sourcing & Cupping (Direct Estate Capability)
     - 02: Packaging Specification (Partner Sourcing)
     - 03: Counter-Sample Evaluation (Buyer Verification)
     - 04: Contract Packing & Export (Coordinated Dispatch)
  4. **Commercial Inquiry CTA Banner**: Deep forest green banner with `ShieldCheck` icon, compliance copy, and primary gold CTA button.
- **Visual Elements**:
  - Warm Ivory & Champagne Gold accents (`--color-gold: #C59B27` / `#D4AF37`) on badges, icons, and borders.
  - Refined gold-outline buttons (`.btn-outline-gold`) on service cards with smooth gold hover fill.
  - Editorial photograph `public/images/private-label-packaging.jpg` displayed inside `.private-label-visual-card` with an anchored caption pill.
- **Functional Form Integration**:
  - Clicking any *"Inquire [Format Title]"* button invokes `onStartPrivateLabel(opt.title, opt.packagingFormat)`.
  - `HomePage.tsx` updates `formPackaging` state, sets `formIntent = 'packing'`, and smoothly scrolls to `#requirement-form`.
  - `BuyerRequirementForm.tsx` receives `initialPackaging={formPackaging}`, switches to Detailed Mode, and preselects the corresponding format in `#det-packaging`.

## 3. Component Mapping
- **React Component Name**: `PrivateLabelSection`
- **Exact Source File Path**: `src/features/private-label/components/PrivateLabelSection.tsx`
- **Parent Page Component**: `src/pages/HomePage.tsx`
- **Inquiry Form Target**: `src/features/buyer-requirement/components/BuyerRequirementForm.tsx`
- **Shared Components & Utilities**:
  - Icons from `lucide-react`: `Package`, `Sparkles`, `Layers`, `ArrowRight`, `Check`, `ShieldCheck`, `Search`, `Sliders`, `CheckCircle2`, `Truck`.

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 2893–3580: Section styles, split showcase, workflow grid, format cards, `.btn-outline-gold`, and responsive breakpoints).
  - `src/styles/tokens.css` (Three-tier design tokens).
- **Design Tokens**:
  - Colors: `var(--bg-surface)` (#FFFFFF), `var(--border-subtle)` (#E5E7EB), `var(--color-primary-green)` (#0A281E), `var(--color-gold)` (#D4AF37), `var(--color-primary-dark)` (#061811).
  - Spacing: 8px grid system (`var(--space-2)` to `var(--space-8)`).
  - Radii: `var(--radius-sm)` (4px/6px), `var(--radius-md)` (8px), `var(--radius-lg)` (14px).
- **Responsive Breakpoints**:
  - **Desktop (>= 1101px)**: 3-column format grid and 4-column workflow grid.
  - **Tablet (768px – 1100px)**: 2-column format grid with Card 3 spanning both columns (`grid-column: 1 / -1`), eliminating empty grid voids; 2x2 workflow grid.
  - **Mobile (<= 540px)**: Single-column clean vertical stack.
  - **Reduced Motion**: Full `@media (prefers-reduced-motion: reduce)` support disabling transitions and transforms.

## 5. Asset Mapping
- **Image Paths**:
  - `public/images/private-label-packaging.jpg` (High-resolution authentic photograph of matte green private label pouch, tin canister, pyramid tea bags, and cupped liquor on timber tasting table).
- **SVG Paths**: None (inline Lucide SVGs).
- **Fonts**: Plus Jakarta Sans and Space Grotesk.

## 6. Functional Behaviour & Preselection Flow
- **Bulk Export Packaging Button**:
  - Passes title: `"Bulk Export Packaging"`, format: `'Standard Bulk Export Sacks'`.
  - Form state: `formPackaging = 'Standard Bulk Export Sacks'`, `formIntent = 'packing'`.
  - Result: Selects *"Standard Bulk Export Sacks"* in Detailed Form.
- **Custom Bulk Packing Button**:
  - Passes title: `"Custom Bulk Packing"`, format: `'Heavy-duty Woven Sacks'`.
  - Form state: `formPackaging = 'Heavy-duty Woven Sacks'`, `formIntent = 'packing'`.
  - Result: Selects *"Heavy-duty Woven Sacks"* in Detailed Form.
- **Private Label Support Button**:
  - Passes title: `"Private Label Support"`, format: `'Retail Stand-up Pouches'`.
  - Form state: `formPackaging = 'Retail Stand-up Pouches'`, `formIntent = 'packing'`.
  - Result: Selects *"Retail Pouches / Tins (OEM)"* in Detailed Form.
- **Discuss Packaging Options (Bottom CTA)**:
  - Passes `undefined` packaging, switches form to Detailed Mode for open inquiry.

## 7. Commercial Governance & Capability Accuracy
- **Direct Sourcing & Coordination**: Clearly stated as direct origin leaf procurement across Assam and Darjeeling auctions/estates, organoleptic cupping, counter-sample dispatch, and export documentation.
- **Supplier-Dependent Packaging Procurement**: Food-grade multi-wall paper sacks, woven sacks, and barrier pouches procured to buyer specification.
- **Third-Party Contract Packing**: Explicitly disclosed that pouch filling, canister seaming, and pyramid tea bag packing are coordinated through vetted commercial packing partners.
- **Zero Fabricated Claims**: No false in-house factory claims, fake machine certifications, or artificial MOQ guarantees.

## 8. Resolved Backlog Issues

| ID | Issue | Solution Implemented | Status |
|---|---|---|---|
| `SEC05-BUG-01` | Format inquiry buttons did not pass packaging format to form | Added `formPackaging` state to `HomePage.tsx`, passed `initialPackaging` prop to `BuyerRequirementForm`, and wired all 3 card handlers. | **RESOLVED** |
| `SEC05-STY-01` | Card inquiry buttons rendered as unstyled browser-default buttons | Implemented refined `.btn-outline-gold` with champagne gold border, dark text, and gold hover state. | **RESOLVED** |
| `SEC05-VIS-01` | `private-label-packaging.jpg` was unrendered | Introduced split editorial showcase pairing positioning copy with visual packaging photography. | **RESOLVED** |
| `SEC05-RSP-01` | Tablet 2-column layout left empty 50% void | Added `grid-column: 1 / -1` for the 3rd card on viewports between 541px and 1100px. | **RESOLVED** |
| `SEC05-TYP-01` | `VOLUME SCALE` label wrapped to two lines on Card 3 | Added `white-space: nowrap; flex-shrink: 0;` to `.format-moq-label`. | **RESOLVED** |

## 9. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/05_PRIVATE_LABEL.md` | Codebase inspection |
| 2026-11-04 | Section 05 Modernization: Editorial showcase with photography, 4-stage workflow, gold outline buttons, tablet layout fix, and end-to-end form preselection routing | `PrivateLabelSection.tsx`, `HomePage.tsx`, `index.css`, `05_PRIVATE_LABEL.md` | Chrome DevTools CDP browser testing, unit tests, and production build |
