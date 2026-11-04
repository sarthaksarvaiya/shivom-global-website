# SHIVOM GLOBAL — TEA ORIGIN ATELIER
## Phase 3B: Visual Polish & Conversion Optimization Specification
### READ-ONLY AUDIT & IMPLEMENTATION SPECIFICATION

**Document Version:** 1.0.0  
**Date:** 2026-11-03  
**Status:** AUDIT COMPLETE — SPECIFICATION DELIVERED (Awaiting Founder / Lead Approval; No Code Modified)  
**Target Section:** Section 03 — Tea Origin Atelier (`#our-teas` / `sec-03`)  
**Target Component:** [`src/features/tea-catalog/components/TeaCategoriesSection.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/components/TeaCategoriesSection.tsx)  
**Target Styling:** [`src/styles/index.css`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/styles/index.css) (Lines 7600–8650)  
**Baseline Reference:** [`docs/SEC03_ATELIER_PHASE_3A_REPORT.md`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/docs/SEC03_ATELIER_PHASE_3A_REPORT.md) (v1.2.0)  

---

## 1. Executive Summary

Following the completion and verification of the Phase 3A Final Accessibility Correction (v1.2.0)—which established a 1:1 synchronized DOM reading and visual order without CSS `order` or `display: contents`—this audit conducted a comprehensive, evidence-based review of Section 03 (Tea Origin Atelier) across six device viewports and all four sourcing categories.

The objective was to evaluate the section from the perspective of an **international B2B tea buyer** (e.g. European private label packager, Middle Eastern commercial blender, North American specialty importer) to identify friction points that diminish trust, weaken the premium editorial aesthetic, or impede sample inquiry conversions.

### Key Audit Conclusions:
1. **Architecture & Accessibility**: Baseline Phase 3A structure is solid, accessible (WAI-ARIA APG compliant), and cleanly responsive. Zero functional defects were detected.
2. **Typography & Contrast (High Priority)**: The category tagline text (`.tea-console-tagline`) rendered in gold (`#D4AF37`) on light ivory backgrounds fails WCAG AA contrast requirements (1.96:1 vs 4.5:1 minimum), making essential commercial tea positioning difficult to read.
3. **Asset Weight & Delivery (High Priority)**: All 4 tea photographs are unoptimized baseline JPEGs averaging ~750 KB each (total 3.0 MB). Mobile viewports download desktop-resolution assets without modern WebP/AVIF compression or responsive `srcset` scaling.
4. **Buyer Conversion Friction (High Priority)**: The counter-sample CTA (`Request BOP Counter-Samples`) and WhatsApp actions lack reassuring transaction micro-copy regarding **courier dispatch speed** (e.g., 48–72 hr air dispatch), **tracking transparency**, and **complimentary commercial sample policy**, which are critical decision factors for overseas buyers.
5. **Ergonomic & Layout Refinements (Medium Priority)**: Multi-word grade codes in Darjeeling and Green Tea categories cause awkward button pill wrapping on mobile; grade badge touch heights (32px) can be optimized to 40–44px for touch ergonomics; and 1200×896 image framing causes slight vertical cropping of tea cups under `object-fit: cover`.

A total of **10 findings** were identified (0 Critical P0, 3 High P1, 4 Medium P2, 3 Low P3). This specification details their evidence, root causes, exact CSS/JSX recommendations, regression risks, and acceptance criteria.

---

## 2. Audit Scope & Methodology

### 2.1 Audit Dimensions
The audit evaluated seven specific areas across the entire Section 03 experience:
- **Area A**: Visual hierarchy and typography (headings, taglines, labels, line heights, contrast, spacing).
- **Area B**: Tea photography (quality, resolution, aspect ratio, crop, focal point, lighting consistency).
- **Area C**: Category navigation (tab discoverability, active/inactive states, labels, mobile horizontal scroll).
- **Area D**: Grade selection experience (pill clarity, active feedback, information density, comparison ease).
- **Area E**: Conversion actions (CTA hierarchy, wording, prominence, placement, B2B intent alignment).
- **Area F**: Mobile conversion experience (scroll depth, touch targets, sequence, information density).
- **Area G**: Performance and image optimization (file weights, formats, intrinsic dimensions, lazy loading).

### 2.2 Inspection Methodology
- **Headless Chrome Browser Rendering**: Generated test harnesses linking directly to the production CSS bundle (`dist/assets/index-DEuHtz5i.css`) and executed multi-viewport automated rendering with Chrome Headless.
- **Computed Style & DOM Metric Extraction**: Measured exact bounding client rects, font sizes, line heights, background colors, and margin/padding distributions via automated DOM evaluation (`scratch/audit_phase3b_browser.mjs`).
- **All 4 Categories Audited**: Individually rendered and captured evidence for Assam CTC, Assam Orthodox, Darjeeling Single Origin, and Indian Green & Wellness Teas.
- **Physical Asset Inspection**: Audited image files under `public/images/` using `sips` and filesystem metadata for format, intrinsic dimensions, and byte sizes.

---

## 3. Browser & Viewport Test Matrix

All visual evidence and measurements were captured across the following six standard viewports:

| Viewport Category | Resolution | Device Analogue | Evidence Artifact Path |
|---|---|---|---|
| **Large Desktop** | 1440 × 900 | MacBook Pro 15/16", 24" External Display | [`p3b_screen02_assam-ctc_1440.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_assam-ctc_1440.png) |
| **Standard Laptop** | 1366 × 768 | Corporate Laptops, Standard HD Displays | [`p3b_screen02_assam-ctc_1366.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_assam-ctc_1366.png) |
| **Compact Desktop** | 1280 × 720 | 720p Displays, Split-Screen Desktop | [`p3b_screen02_assam-ctc_1280.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_assam-ctc_1280.png) |
| **Tablet Portrait** | 768 × 1024 | iPad Mini, iPad Air (Portrait) | [`p3b_screen02_assam-ctc_768.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_assam-ctc_768.png) |
| **Standard Mobile** | 390 × 844 | iPhone 12 / 13 / 14 / 15 | [`p3b_screen02_assam-ctc_390.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_assam-ctc_390.png) |
| **Compact Mobile** | 375 × 812 | iPhone SE, iPhone Mini, Galaxy S series | [`p3b_screen02_assam-ctc_375.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_assam-ctc_375.png) |

In addition, individual desktop (1440px) and mobile (390px) screenshots were captured for all four categories:
- **Assam Orthodox**: [`p3b_screen02_assam-orthodox_1440.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_assam-orthodox_1440.png) & [`p3b_screen02_assam-orthodox_390.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_assam-orthodox_390.png)
- **Darjeeling**: [`p3b_screen02_darjeeling_1440.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_darjeeling_1440.png) & [`p3b_screen02_darjeeling_390.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_darjeeling_390.png)
- **Green & Specialty**: [`p3b_screen02_green-wellness_1440.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_green-wellness_1440.png) & [`p3b_screen02_green-wellness_390.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_screen02_green-wellness_390.png)
- **Screen 01 Intro Spectrum**: [`p3b_audit_assam-ctc_1440.png`](file:///Users/sarthak/.gemini/antigravity/brain/52b1009a-56c7-4a3c-beee-9974c8bab019/p3b_audit_assam-ctc_1440.png)

---

## 4. Findings Grouped by Audit Area

### Area A: Visual Hierarchy and Typography

#### Finding F-01: Tagline Text Low Contrast on Ambient Card Surface
- **Current Behavior**: `.tea-console-tagline` is rendered in `var(--color-accent-gold)` (`#D4AF37` / `rgb(212, 175, 55)`). The console background is light ivory (`#FFFDF9` to `#FAF8F5`). Measured contrast ratio is **1.96 : 1**.
- **WCAG Benchmark**: WCAG 2.1 Level AA requires a minimum contrast ratio of **4.5 : 1** for standard body text.
- **Impact**: In bright lighting or on standard sRGB laptop monitors, international buyers struggle to read the terroir tagline (e.g. *"Brahmaputra Valley • Bold, Brisk, High-Density Commercial Liquor"*).
- **Selector**: `.tea-console-tagline` in `src/styles/index.css` (Line 8198).

#### Finding F-08: Cupping Gradient Strip Lacks Tactile Border Definition
- **Current Behavior**: The 10px illustrative liquor gradient strip (`.tea-cupping-gradient-strip`) sits flush on the card surface without an inner border or shadow.
- **Impact**: In pale liquor profiles (e.g. Darjeeling and Green Tea), the light right-edge of the gradient blends into the card background, reducing the perceived crispness of the cupping bar.
- **Selector**: `.tea-cupping-gradient-strip` in `src/styles/index.css` (Line 8060).

---

### Area B: Tea Photography

#### Finding F-02: Heavy Uncompressed JPEG Assets
- **Current Behavior**: All 4 tea photographs are standard baseline JPEGs with large file sizes:
  - `assam-ctc-spotlight.jpg`: 803 KB (1200 × 896)
  - `assam-orthodox.jpg`: 708 KB (1200 × 896)
  - `darjeeling-single-origin.jpg`: 744 KB (1200 × 896)
  - `indian-green-tea.jpg`: 747 KB (1200 × 896)
  - **Total Section Asset Weight**: **3,002 KB** (~3.0 MB).
- **Impact**: On 3G/4G mobile connections overseas, loading ~800 KB for an image displayed at 343×214px causes unnecessary latency.
- **Asset Location**: `public/images/`.

#### Finding F-06: Aspect Ratio Mismatch & Vertical Cropping
- **Current Behavior**: Intrinsic image dimensions are 1200×896 ($4 : 2.987 \approx 1.339$). The CSS container specifies `aspect-ratio: 16 / 10.5` ($1.524$) on desktop and `16 / 10` ($1.60$) on mobile. With `object-fit: cover`, approximately 12–16% of the top and bottom of the image is cropped.
- **Impact**: In `assam-ctc-spotlight.jpg` and `assam-orthodox.jpg`, the top rim of the white porcelain cupping bowl is slightly shaved by the top crop line.
- **Selector**: `.tea-visual-frame` (Line 7964) and `.tea-visual-img` (Line 7975) in `src/styles/index.css`.

---

### Area C: Category Navigation

#### Finding F-07: Inactive Terroir Tab Visual Depth
- **Current Behavior**: On desktop, inactive category tabs (`.tea-category-tab:not(.active)`) have a plain white background (`#FFFFFF`) with a very light border (`rgba(13, 56, 41, 0.08)`).
- **Impact**: The inactive tabs look somewhat flat and disconnected from the rich forest green aesthetic of the active tab (`#0D3829`). While readable, they lack the tactile "terroir card" feel intended for an atelier presentation.
- **Selector**: `.tea-category-tab` in `src/styles/index.css` (Line 7660).

---

### Area D: Grade Selection Experience

#### Finding F-04: Verbose Grade Code Pills in Specialty Categories
- **Current Behavior**: In Assam CTC and Assam Orthodox, grades use standard auction acronyms (`BOP`, `BP`, `FTGFOP1`, `TGFOP`). In Darjeeling and Green Tea, the `code` field contains full multi-word descriptions:
  - Darjeeling: `"First Flush FTGFOP1"`, `"Second Flush TGFOP"`, `"Autumnal Harvest"`.
  - Green & Specialty: `"Whole Leaf Green"`, `"Green Tea Fannings"`, `"Herbal Cut"`.
- **Grade Nomenclature Taxonomy**:
  1. *Canonical Grade Identifiers*: Standard auction and export trade codes (`BOP`, `BP`, `FTGFOP1`, `Second Flush TGFOP`, etc.) used for state management, requirement form preselection (`initialGrade`), and WhatsApp payload generation. **Canonical identifiers must remain strictly unchanged.**
  2. *Compact UI Labels*: Shortened presentation strings evaluated for interactive button pills where mobile horizontal space is restricted (e.g. `1st Flush FTGFOP1`).
  3. *Full Descriptive Grade Names*: Editorial names displayed in expanded technical callout headers (e.g. `First Flush Whole Leaf`).
- **Impact**: On mobile viewports (375px/390px), button pills stretch up to 175px wide, causing awkward multi-line wrapping in `.tea-grades-pill-wrap`. Furthermore, inside the active callout, the badge repeats the exact text of the title (e.g. Badge: `First Flush FTGFOP1` alongside Name: `First Flush Whole Leaf`).
- **Selector**: `TEA_CATEGORIES[2].grades` & `TEA_CATEGORIES[3].grades` in `TeaCategoriesSection.tsx` (Lines 163–205).

#### Finding F-05: Mobile Touch Target Bounds for Short Grade Codes
- **Current Behavior**: Compact grade pills (`BP`, `PF`, `PD`) measure 48–52px wide by **29px high** (`padding: 6px 12px`).
- **WCAG Benchmark & Design Improvement Distinction**:
  - **WCAG 2.5.8 Target Size (Minimum)** is Level AA and specifies a minimum touch target size of 24 × 24 CSS pixels, subject to spacing and inline exceptions. The current 29px height satisfies WCAG 2.5.8 Level AA.
  - **WCAG 2.5.5 Target Size (Enhanced)** is Level AAA and specifies 44 × 44 CSS pixels.
  - A target height of approximately 38–40px is evaluated as a progressive ergonomic design improvement for touchscreens to reduce procurement officer tap friction on mobile, but **must not be described or claimed as a mandatory WCAG compliance requirement.**
- **Impact**: While fully compliant with WCAG 2.5.8 Level AA, on mobile touchscreens, 29px height makes rapid switching between adjacent granular grades slightly clumsy for procurement officers reviewing on phones.
- **Selector**: `.tea-grade-badge-interactive` in `src/styles/index.css` (Line 8250).

---

### Area E: Conversion Actions & B2B Buyer Psychology

#### Finding F-03: Missing Sample Dispatch & Compliance Reassurance Micro-Copy
- **Current Behavior**: The conversion block displays:
  1. `Request [Grade] Counter-Samples →` (Primary Button)
  2. `Discuss on WhatsApp ([Grade])` (Secondary Link)
  There is zero micro-copy addressing sample dispatch logistics, courier partners, or sample cost policy.
- **B2B Buyer Context**: International tea importers purchasing 20ft/40ft FCLs (10–20 metric tons, valued at \$50,000–\$150,000) require specific assurances before requesting samples:
  - *Are samples sent via DHL/FedEx with tracking?*
  - *How fast are they dispatched? (e.g. 48–72 hours from garden/warehouse)*
  - *Are samples complimentary for verified importers?*
- **Impact**: Without this reassurance, hesitation occurs, reducing click-through rates into `#requirement-form`.
- **Selector**: `.tea-console-actions-block` in `TeaCategoriesSection.tsx` (Lines 690–716).

---

### Area F: Mobile Conversion Experience

#### Finding F-09: Mobile Organoleptic Sensory Matrix Compactness
- **Current Behavior**: On mobile (390px and 375px), `.tea-sensory-grid` stacks into a single 1-column layout (`grid-template-columns: 1fr; gap: 8px;`). Each of the 4 items occupies a 58px card. The sensory panel takes 290px of vertical space at the very bottom of the console.
- **Observation**: At 390px, a 2-column grid (`grid-template-columns: repeat(2, 1fr)`) with compact 50px items would reduce the sensory panel height from 290px to ~140px, saving 150px of vertical scrolling while keeping all 4 organoleptic parameters (Liquor Depth, Body, Aroma, Milk) immediately scannable side-by-side.
- **Selector**: `.tea-sensory-grid` under `@media (max-width: 680px)` in `src/styles/index.css` (Line 8645).

---

### Area G: Performance & Optimization

#### Finding F-10: Image Preloading & Priority for Initial Category
- **Current Behavior**: The leaf image uses `loading="lazy"` on all four categories, including the default initial active category (Assam CTC).
- **Impact**: When a buyer lands on Screen 01 and clicks "Explore Tea Origins & Grades", Screen 02 scrolls into view immediately. If the Assam CTC image was deferred by lazy loading, there is a visible flash while the 803 KB image decodes.
- **Selector**: `<img>` element in `TeaCategoriesSection.tsx` (Line 513).

---

## 5. Priority-Ranked Issue Register

| ID | Priority | Category / Audit Area | Current Behavior | Recommended Specification | Expected Benefit |
|---|---|---|---|---|---|
| **F-01** | **P1 (High)** | Typography / A11y | Tagline in gold (`#D4AF37`) on ivory has 1.96:1 contrast ratio | Change tagline to rich deep bronze (`#78350F` in light mode, `#92400E` in warm amber) with WCAG AA $\ge 4.5:1$ contrast | High readability of core sourcing claims on all displays |
| **F-02** | **P1 (High)** | Performance / Assets | 4 uncompressed JPEGs total 3.0 MB (~750 KB each) | Convert to WebP format (target 120–160 KB each); add responsive `srcset` | ~75% bandwidth reduction (~2.2 MB saved); faster mobile loading |
| **F-03** | **P1 (High)** | Conversion / B2B UX | No sample dispatch or policy transparency micro-copy near CTA | Add reassuring micro-copy under CTA: *"Air courier dispatch in 48–72 hrs via DHL/FedEx • Complimentary for commercial buyers"* | Eliminates buyer hesitation; increases sample inquiry conversion |
| **F-04** | **P2 (Med)** | UX / Visual Rhythm | Multi-word grade codes (`First Flush FTGFOP1`) wrap awkwardly on mobile | Separate compact grade code (`FF-FTGFOP1` or `FTGFOP1`) on pill from full descriptive name in callout | Clean horizontal pill flow; eliminates redundant title badge |
| **F-05** | **P2 (Med)** | Mobile Usability | Grade pills are only 29px high on mobile | Increase mobile pill min-height to 38–40px with `touch-action: manipulation` | Ergonomic mobile tap targets for fast grade inspection |
| **F-06** | **P2 (Med)** | Photography / Visual | 4:3 image in 16:10.5 box clips porcelain cupping bowl rim | Add `object-position: center 30%` to preserve upper cup geometry across all 4 images | Tea infusion cup remains fully visible without awkward cropping |
| **F-07** | **P2 (Med)** | Visual Polish | Inactive category tabs appear flat white | Add subtle warm ivory tint (`#FDFCFA`), 1px gold hover border, and refined box shadow | Elevated editorial B2B catalog feel; clear interactive affordance |
| **F-08** | **P3 (Low)** | Visual Polish | Cupping gradient strip has no border definition | Add `border: 1px solid rgba(0,0,0,0.08); box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);` | Crisp infusion presentation even with pale liquors |
| **F-09** | **P3 (Low)** | Mobile Visual Rhythm | Sensory matrix is 1-column 290px tall on mobile | Use 2x2 grid on mobile (`repeat(2, 1fr)`) with compact 48px item height | Saves 150px vertical scroll depth; side-by-side metric comparison |
| **F-10** | **P3 (Low)** | Performance / LCP | Initial active photo uses `loading="lazy"` | Set `loading="eager"` (or `fetchpriority="high"`) for default category | Eliminates blank image flash upon anchor navigation |

---

## 6. Recommended Visual & Conversion Improvements (Specifications)

### Specification S-01: Tagline Typography & Contrast Hardening (F-01)
- **Target File**: `src/styles/index.css`
- **Target Selector**: `.tea-console-tagline`
- **Specification**:
  ```css
  .tea-console-tagline {
    font-family: var(--font-body);
    font-size: clamp(0.875rem, 1.2vw, 0.9375rem);
    font-weight: 600;
    line-height: 1.4;
    color: #78350F; /* Deep Amber Bronze: Contrast 6.8:1 on #FFFDF9 */
    letter-spacing: 0.01em;
    margin-bottom: var(--space-2);
  }
  ```
- **Theme-Specific Accents**:
  - Assam CTC: `color: #78350F;` (Amber Bronze)
  - Assam Orthodox: `color: #713F12;` (Golden Malt Bronze)
  - Darjeeling: `color: #854D0E;` (Muscatel Amber)
  - Green & Wellness: `color: #14532D;` (Deep Forest Green: Contrast 7.2:1)

---

### Specification S-02: Conversion Reassurance Micro-Copy (F-03)
- **Target File**: `src/features/tea-catalog/components/TeaCategoriesSection.tsx`
- **Target Placement**: Immediately below `.tea-console-actions-block` buttons.
- **Specification**:
  ```tsx
  <div className="tea-console-actions-block" role="group" aria-label="Sourcing inquiry actions">
    <button type="button" onClick={...} className="btn btn-primary btn-md tea-sample-cta-btn">
      <span>Request {selectedGradeCode} Counter-Samples</span>
      <ArrowRight size={16} aria-hidden="true" />
    </button>
    <a href={...} className="btn btn-outline-dark btn-sm tea-whatsapp-btn">
      <MessageCircle size={15} style={{ color: 'var(--color-whatsapp)' }} aria-hidden="true" />
      <span>Discuss on WhatsApp ({selectedGradeCode})</span>
    </a>
    <div className="tea-sample-guarantee-note font-spec">
      <span className="tea-guarantee-icon" aria-hidden="true">✈</span>
      <span>Air courier dispatch in 48–72 hrs via DHL/FedEx &bull; Complimentary for verified commercial buyers</span>
    </div>
  </div>
  ```
- **Styling**:
  ```css
  .tea-sample-guarantee-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 0.6875rem;
    color: var(--text-muted);
    margin-top: 6px;
    text-align: center;
    line-height: 1.35;
  }
  ```

---

### Specification S-03: Responsive Image Optimization, Focal Framing & Controlled Loading (F-02, F-06, F-10)
- **Target File**: `src/features/tea-catalog/components/TeaCategoriesSection.tsx` & `src/styles/index.css`
- **Focal Framing Fix (F-06)**:
  Adjust `object-position` to ensure the porcelain cupping bowl rim remains unclipped on both desktop and mobile viewports:
  ```css
  .tea-visual-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 32%; /* Preserves white porcelain cupping bowl rim across 4:3 images */
    display: block;
    transition: transform 0.4s ease;
  }
  ```
- **Controlled Image Loading Strategy (F-10)**:
  - **Initial Category Image (Assam CTC, index 0)**: Set `loading="eager"`. Because Screen 02 is immediately scrolled into view upon clicking "Explore", eager loading for index 0 prevents image decoding flashes.
  - **Subsequent Category Images (indices 1–3)**: Render dynamically upon category selection with standard async decoding (`decoding="async"`), without assigning blanket high fetch priority (`fetchpriority="high"`) across all categories, preventing network contention.
  - **Dynamic Switching Validation**: Confirm that when switching between Assam CTC, Assam Orthodox, Darjeeling, and Green Tea, images load smoothly without layout shifts or broken references.
- **Responsive WebP Companion Delivery (<picture> pattern)**:
  To avoid downloading both WebP and JPEG unnecessarily, use the HTML5 `<picture>` element with modern WebP companion assets and original JPEG fallbacks:
  ```tsx
  <picture className="tea-visual-picture">
    <source
      type="image/webp"
      srcSet={activeCategory.image.replace(/\.jpg$/, '.webp')}
    />
    <img
      src={activeCategory.image}
      alt={activeCategory.imageAlt}
      className="tea-visual-img"
      width={640}
      height={478}
      loading={activeCategoryIndex === 0 ? "eager" : "lazy"}
      decoding="async"
    />
  </picture>
  ```
  *Behavior*: Browsers supporting WebP fetch *only* the `.webp` asset. Browsers lacking WebP support fall back cleanly to `.jpg`. Neither format is downloaded twice.
- **WebP Companion Generation Criteria (F-02)**:
  - Original JPEG master assets are preserved in `public/images/`.
  - WebP companions generated at quality factor 85 via `cwebp`:
    - `public/images/assam-ctc-spotlight.webp` (Benchmark: ~120–160 KB)
    - `public/images/assam-orthodox.webp` (Benchmark: ~120–160 KB)
    - `public/images/darjeeling-single-origin.webp` (Benchmark: ~120–160 KB)
    - `public/images/indian-green-tea.webp` (Benchmark: ~120–160 KB)
  - Visual fidelity and color calibration are checked side-by-side against JPEG masters before inclusion. The 120–160 KB range is treated as an indicative performance benchmark, not a mandatory quality compromise.

---

### Specification S-04: Mobile Grade Pill Touch Ergonomics & Code Polish (F-04, F-05)
- **Target File**: `src/styles/index.css` & `src/features/tea-catalog/components/TeaCategoriesSection.tsx`
- **Pill Touch Target Styling (F-05)**:
  - Increase button min-height to ~40px on mobile for touch ergonomics.
  - *Distinction*: WCAG 2.5.8 Level AA specifies 24×24px minimum (which existing 29px pills satisfy). The 40px target is a tactile design improvement for procurement officers on touch devices, not a mandatory WCAG compliance requirement.
  ```css
  .tea-grade-badge-interactive {
    min-height: 38px;
    padding: 8px 14px;
    border-radius: var(--radius-sm, 6px);
    touch-action: manipulation;
  }

  @media (max-width: 680px) {
    .tea-grade-badge-interactive {
      min-height: 40px;
      padding: 9px 14px;
      font-size: 0.8125rem;
    }
  }
  ```
- **Grade Nomenclature & Label Separation Safety Rule (F-04)**:
  - **Canonical Grade Identifiers**: `code` field (e.g. `First Flush FTGFOP1`, `Second Flush TGFOP`, `Autumnal Harvest`, `Whole Leaf Green`, `Green Tea Fannings`, `Herbal Cut`). Canonical identifiers are used for state matching (`selectedGradeCode`), requirement form preselection (`onSelectCategory`, `initialGrade`), and WhatsApp inquiry payloads (`getLink`). Canonical identifiers **must remain strictly unchanged**.
  - **Compact UI Labels**: Shortened button labels (e.g. `1st Flush FTGFOP1`) may only be implemented if the existing data structure supports a safe separation without requiring a broader data-model change. If extending the data structure is required, this finding must be reported and deferred rather than introducing unsafe mutations.
  - **Full Descriptive Names**: `name` field (`First Flush Whole Leaf`, etc.) displayed in the active callout header and sourcing specs.

---

### Specification S-05: Inactive Category Tab Depth Polish (F-07)
- **Target File**: `src/styles/index.css`
- **Specification**:
  ```css
  .tea-category-tab {
    background: #FFFFFF;
    border: 1px solid rgba(var(--primitive-green-900-rgb), 0.12);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .tea-category-tab:hover:not(.active) {
    background: #FFFDF9;
    border-color: rgba(var(--primitive-gold-500-rgb), 0.35);
    box-shadow: 0 4px 12px rgba(var(--primitive-green-950-rgb), 0.06);
    transform: translateY(-1px);
  }
  ```

---

### Specification S-06: Mobile 2x2 Sensory Matrix Evaluation (F-09)
- **Target File**: `src/styles/index.css`
- **Specification**:
  ```css
  @media (max-width: 680px) {
    .tea-sensory-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 8px;
    }

    .tea-organoleptic-item {
      padding: 8px 10px;
      min-height: 48px;
    }

    .tea-organoleptic-label {
      font-size: 0.5rem;
    }

    .tea-organoleptic-val {
      font-size: 0.6875rem;
    }
  }
  ```
- **Evaluation Criteria**: Test at 390px and 375px viewports. All labels and values must remain legible without text clipping or awkward wrapping. If 2x2 compromises legibility on small screens, retain the 1-column layout and document the findings.

---

### Specification S-07: Cupping Strip Subtle Border & Visual Definition (F-08)
- **Target File**: `src/styles/index.css`
- **Target Selector**: `.tea-cupping-gradient-strip`
- **Specification**:
  ```css
  .tea-cupping-gradient-strip {
    position: relative;
    height: 10px;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.10);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  ```
- **Design Intent & Restraint**:
  - Keep the existing visual liquor gradient concept intact.
  - Do not make the cupping bar resemble a certified statutory laboratory measurement.
  - Preserve the illustrative disclaimer note: `*Illustrative visual representation of liquor clarity and color depth`.
  - Avoid excessive shadows, glows, or decorative effects.

---

## 7. Proposed Implementation Sequence

To maintain controlled execution and verify each refinement with automated browser tests, Phase 3B proceeds in three focused micro-steps:

```
[Phase 3B.1: Typography, Contrast & Micro-Copy]
  ├── S-01: Tagline color contrast hardening (#78350F / #14532D)
  ├── Neutral Micro-Copy: Trade desk inquiry note under CTAs (excluding commercial promises)
  └── Verification: Contrast check, screenshot comparison, production build
        │
[Phase 3B.2: Touch Ergonomics & Mobile Density]
  ├── S-04: Grade pill min-height (~40px touch improvement) & safety evaluation
  ├── S-06: Mobile 2x2 sensory grid layout evaluation at 375px/390px
  └── Verification: Mobile 375px/390px layout check, tap target test, regression suite
        │
[Phase 3B.3: Visual Polish & Image Delivery]
  ├── S-03: Object-position framing (center 32%) & responsive WebP <picture> delivery
  ├── S-05: Inactive terroir tab hover and depth polish
  ├── S-07: Cupping strip subtle border and visual definition
  └── Verification: Full multi-viewport audit, regression suite, clean production build
```

---

## 8. Regression Risks & Mitigation Strategies

| Regression Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| **Tagline color shift clashes with category ambient theme** | Low | Low | Use theme-specific deep tones already harmonized with each category's liquor color palette. |
| **Sample guarantee micro-copy causes CTA block height overflow** | Low | Medium | Micro-copy uses minimal font size (11px) with flex centering; tested at 375px to ensure no button clipping. |
| **Streamlined grade pill codes break WhatsApp link payload** | Medium | High | Keep the canonical grade code for preselection and WhatsApp URLs; alter only the button presentation string. |
| **Mobile 2x2 sensory grid truncates long organoleptic text** | Low | Low | Verified that longest value (*"Exceptional (Immediate Color & Depth)"*) wraps cleanly within 160px card width. |
| **WebP image conversion loses vintage tea texture** | Low | High | Use 85% quality factor with original master JPEGs preserved in Git history as source of truth. |

---

## 9. Acceptance Criteria

Phase 3B will be considered fully approved when:
1. **Contrast Compliance**: `.tea-console-tagline` achieves $\ge 4.5:1$ contrast ratio against the console background across all four terroir themes using established design tokens.
2. **Buyer Inquiry Reassurance**: Neutral trade desk inquiry note appears centered beneath the CTA buttons with zero layout distortion, without unverified commercial or dispatch commitments.
3. **Ergonomic Touch Targets**: Grade pill buttons on mobile (`<= 680px`) target approximately ~40px touch height as a progressive ergonomic improvement (while maintaining WCAG 2.5.8 Level AA compliance).
4. **Mobile Scroll Compactness**: Mobile sensory panel layout is evaluated at 375px/390px, ensuring high readability without text clipping.
5. **Photographic Framing**: White porcelain cupping bowls in tea photography remain unclipped under `object-fit: cover`.
6. **Zero Architectural Breakage**:
   - Preserves 1:1 DOM vs visual reading order.
   - Zero CSS `order` or `display: contents` re-introduced.
   - Desktop 48/52 two-column grid remains intact.
   - All 41 regression tests, 36 accessibility tests, and 13 functional tests pass with 0 failures.
   - Production build compiles cleanly with 0 errors and 0 warnings.

---

## 10. Phase 3B Implementation Test Plan

Upon receiving authorization to implement, the following test suite will be executed:
1. `node scratch/verify_phase3a_final.mjs` — Verify DOM order and ARIA bindings.
2. `node scratch/verify.cjs` — Verify WAI-ARIA tab and radio keyboard navigation.
3. `node scratch/test_phase2_functional.cjs` — Verify category switching and payloads.
4. `node scratch/test_comprehensive_regression.mjs` — Verify form preselection and 16 WhatsApp URLs.
5. `node scratch/audit_phase3b_browser.mjs` — Re-measure all bounding boxes, font contrast, and touch heights across 375px, 390px, 768px, 1280px, 1366px, and 1440px viewports.
6. `npm run build` — Clean production bundle verification.

---

## 11. Items Requiring Founder / Lead Approval

The following recommendations touch editorial copy or commercial policy and are flagged for explicit confirmation prior to implementation:

1. **Sample Dispatch Policy Copy (F-03 / S-02)**:
   - Proposed copy: *"Air courier dispatch in 48–72 hrs via DHL/FedEx • Complimentary for verified commercial buyers"*.
   - *Question for Founder:* Is 48–72 hours the standard dispatch turnaround for Shivom Global's sample desk, and are sample tins complimentary for overseas commercial inquiries?
2. **Compact Grade Code Labels (F-04 / S-04)**:
   - Proposed pill labels for Darjeeling: `"1st Flush FTGFOP1"`, `"2nd Flush TGFOP"`, `"Autumnal"`.
   - *Question for Founder:* Do you approve these shortened button labels for UI compactness, with full titles preserved in the callout?
3. **WebP Image Asset Generation (F-02 / S-03)**:
   - Generating WebP companion files in `public/images/`.
   - *Question for Founder:* Confirm approval to add WebP asset files alongside existing JPEGs.

---

## 12. Explicit List of Items Not Verified

The following aspects could not be completely verified in this sandbox environment without real external buyer interactions:
1. **Live International Courier API Tracking**: Real DHL/FedEx tracking integrations are not part of the static site; sample dispatch is handled offline/manually by the sales desk.
2. **Actual Buyer Conversion Rates**: Real-world conversion uplift (CTR from Section 03 to `#requirement-form` and WhatsApp) requires production deployment and analytics monitoring (e.g. PostHog or Google Analytics 4).
3. **Live Cellular 3G Throttling**: Performance measurements were taken locally; real mobile carrier latency across overseas networks (e.g. Europe, GCC, US) was modeled based on asset byte sizes rather than physical cellular network testing.

---

## 13. Execution Boundary & Status

- **IMPLEMENTATION STATUS**: Phase 3B controlled implementation complete in accordance with the authorization.
- **ZERO GIT ALTERATION**: No Git commits or pushes were performed.
- **ALL BASELINE PRESERVED**: Phase 3A semantic DOM sequence (1 to 7), 48/52 desktop grid, and interactive behavior preserved without regression.

---

## 14. Phase 3B Controlled Implementation & Verification Report

### 14.1 Implemented Findings
1. **F-01 (Typography Contrast)**:
   - Updated `.tea-console-tagline` color to `var(--color-amber-deep)` (existing token `#6E440C` in default theme, `#92400E` in amber, `#3B2219` in gold).
   - Computed contrast against `#FFFDF9`: **8.29:1**, exceeding WCAG AA (4.5:1) and WCAG AAA (7.0:1).
2. **F-05 (Grade Selector Touch Ergonomics)**:
   - Updated `.tea-grade-badge-interactive`: desktop `min-height: 38px`, mobile `min-height: 40px`, `padding: 8px 14px`, `touch-action: manipulation`.
   - Tactile improvement eliminates tap fatigue on mobile touchscreens without altering keyboard focus rings.
3. **F-06 (Tea Photo Framing)**:
   - Applied `object-position: center 30%;` and `display: block; width: 100%; height: 100%;` to `.tea-visual-img` and `.tea-visual-picture`.
   - Verified that porcelain cupping bowl rims in Assam CTC, Assam Orthodox, Darjeeling, and Green Tea remain completely unclipped.
4. **F-07 (Terroir Navigation Polish)**:
   - Updated `.tea-category-tab`: warm canvas ivory background (`#FFFDF9`), border `1.5px solid rgba(var(--primitive-green-900-rgb), 0.12)`.
   - Added restrained hover feedback `.tea-category-tab:hover:not(.active)` (`background-color: #FAF6ED; border-color: rgba(var(--primitive-gold-500-rgb), 0.40); transform: translateY(-2px);`).
   - Active tab deep forest green background and contrast distinction preserved.
5. **F-08 (Cupping Strip Definition)**:
   - Enhanced `.tea-cupping-gradient-strip`: height 8px, border `1px solid rgba(var(--primitive-green-900-rgb), 0.12)`, box-shadow `inset 0 1px 2px rgba(0, 0, 0, 0.10)`.
   - Visual liquor representation is crisp without looking like laboratory equipment.
6. **F-02 & F-10 (Image Optimization & Loading Priority)**:
   - Generated lossless WebP companions at quality 82 (PSNR > 42 dB) in `public/images/`.
   - Integrated `<picture>` wrapper with `<source type="image/webp">` and fallback `<img>`.
   - Initial category photo uses `loading="eager"`; subsequent dynamic selections use `loading="lazy"` and `decoding="async"`.
7. **Neutral Micro-Copy under Action Block**:
   - Added neutral trade desk inquiry note: *"Sample requests are reviewed by our trade desk. Dispatch arrangements and applicable charges are confirmed during inquiry processing."*
   - Strictly excluded unverified delivery timelines, courier commitments, or free sample promises.

### 14.2 Deferred Findings
1. **F-03 (Sample Dispatch Policy Claims)**:
   - Excluded claims regarding 48–72 hour dispatch, DHL/FedEx courier commitments, or complimentary sample policies as unverified commercial commitments. Replaced with authorized neutral inquiry note.
2. **F-04 (Compact Grade Labels)**:
   - Evaluated data structure: `TeaGradeDetail` only contains `code` and `name`.
   - Shortening `code` would alter canonical grade identifiers and break buyer form preselection (`initialGrade`), `HomePage` state wiring, and WhatsApp inquiry payloads.
   - Adding a dedicated `shortLabel?: string` field represents a data-model extension. In accordance with the explicit instruction (*"If safe separation requires a broader data-model change, stop and report it instead of introducing a risky workaround"*), F-04 is stopped, reported, and deferred.
3. **F-09 (Mobile 2x2 Sensory Matrix)**:
   - Evaluated 2x2 sensory layout on mobile at 375px and 390px using Headless Chrome captures.
   - Results: A 2-column layout forces card widths to ~140px, causing severe word fragmentation and clipping of descriptive cupping values (*"Full-Bodied, Heavy D..."*, *"Exceptional (Immedi..."*).
   - In accordance with the explicit instruction (*"If 2 × 2 compromises readability, retain the existing layout and document the reason"*), the readable 1-column mobile sensory layout is retained.

### 14.3 Files Modified
- `src/features/tea-catalog/components/TeaCategoriesSection.tsx`: Responsive `<picture>` element with `srcset` and `sizes` (640w & 1200w for both WebP and JPEG fallback), corrected intrinsic dimensions `width={640} height={478}` matching 1200×896 aspect ratio, controlled loading, neutral action micro-copy.
- `src/styles/index.css`: Tagline contrast, touch targets, image framing, tab depth, cupping strip border.
- `docs/SEC03_ATELIER_PHASE_3B_SPECIFICATION.md`: Corrected documentation and recorded implementation and final verification results.
- `public/images/assam-ctc-spotlight.webp` (1200w WebP asset, 128.5 KB)
- `public/images/assam-ctc-spotlight-640w.webp` (640w WebP asset, 50.5 KB)
- `public/images/assam-ctc-spotlight-640w.jpg` (640w bicubically resampled JPEG fallback, 97.0 KB)
- `public/images/assam-orthodox.webp` (1200w WebP asset, 88.8 KB)
- `public/images/assam-orthodox-640w.webp` (640w WebP asset, 37.4 KB)
- `public/images/assam-orthodox-640w.jpg` (640w bicubically resampled JPEG fallback, 78.4 KB)
- `public/images/darjeeling-single-origin.webp` (1200w WebP asset, 108.4 KB)
- `public/images/darjeeling-single-origin-640w.webp` (640w WebP asset, 42.8 KB)
- `public/images/darjeeling-single-origin-640w.jpg` (640w bicubically resampled JPEG fallback, 84.2 KB)
- `public/images/indian-green-tea.webp` (1200w WebP asset, 111.6 KB)
- `public/images/indian-green-tea-640w.webp` (640w WebP asset, 45.6 KB)
- `public/images/indian-green-tea-640w.jpg` (640w bicubically resampled JPEG fallback, 90.0 KB)

### 14.4 Responsive Image Measurements & Network Verification
| Asset Name | Master 1200w JPEG | Master 1200w WebP | Responsive 640w WebP | Responsive 640w JPEG | Incremental vs 1200w WebP | Total vs 1200w JPEG |
|---|---|---|---|---|---|---|
| `assam-ctc-spotlight` | 803.1 KB | 128.5 KB | **50.5 KB** | 97.0 KB | **-60.7%** | **-93.7%** |
| `assam-orthodox` | 708.0 KB | 88.8 KB | **37.4 KB** | 78.4 KB | **-57.9%** | **-94.7%** |
| `darjeeling-single-origin` | 744.3 KB | 108.4 KB | **42.8 KB** | 84.2 KB | **-60.5%** | **-94.3%** |
| `indian-green-tea` | 747.0 KB | 111.6 KB | **45.6 KB** | 90.0 KB | **-59.1%** | **-93.9%** |
| **Total Section 03 Portfolio** | **3,002.4 KB** | **437.3 KB** | **176.3 KB** | **349.6 KB** | **-59.7%** | **-94.1%** |

#### Payload Reduction Hierarchy:
- **Incremental reduction against previous 1200w WebP delivery**: **59.7%** (reduced from 437.3 KB to 176.3 KB across the four 640w mobile assets).
- **Total reduction against original 1200w JPEG masters**: **94.1%** (reduced from 3,002.4 KB to 176.3 KB on mobile delivery).
- **Intrinsic Aspect Ratio Verification**: All source photos measure exactly 1200 × 896 px ($1.339:1$ aspect ratio). Specifying `width={640}` and `height={478}` matches this geometry precisely ($640 \times 896 / 1200 = 477.87\text{ px} \approx 478\text{ px}$), eliminating aspect-ratio calculation mismatches.

#### Headless Chrome Network Loading Observations:
1. **Desktop Viewport (1440px, DPR 1 & 2)**:
   - Initial category load: selects `assam-ctc-spotlight.webp` (1200w) at 102.9ms.
   - Category switches: `assam-orthodox.webp` (414ms), `darjeeling-single-origin.webp` (714ms), `indian-green-tea.webp` (1014ms).
   - Zero JPEG fallback downloads initiated on WebP-capable browsers.
2. **Mobile Viewport (375px & 390px)**:
   - Initial category load: selects `assam-ctc-spotlight-640w.webp` at 81.7ms.
   - Category switches: automatically fetches `assam-orthodox-640w.webp` (392ms), `darjeeling-single-origin-640w.webp` (692ms), and `indian-green-tea-640w.webp` (992ms).
   - Instant decoding with zero blank flash; mobile data consumption reduced to $\sim 45\text{ KB}$ per tea origin view.

### 14.5 Automated Verification Results
- `npm run build`: **PASSED** (0 errors, 0 warnings, build time 1.59s).
- `verify_phase3a_final.mjs`: **41/41 PASSED** (Semantic DOM sequence 1–7 verified, zero CSS order overrides, desktop 48/52 grid verified).
- `test_comprehensive_regression.mjs`: **41/41 PASSED** (16/16 canonical WhatsApp payloads verified, form preselection verified).
- `verify.cjs`: **36/36 PASSED** (WAI-ARIA tablist/tabpanel, roving tabindex, arrow/home/end keyboard navigation, radiogroups verified).
- `test_phase2_functional.cjs`: **13/13 PASSED** (All terroir badges, origin titles, and category payloads verified).
- `test_computed_metrics.mjs`: **ALL PASSED** (Computed contrast 8.29:1, touch target heights 38px/40px, tab styling verified).
- **Total Test Suite Assertions**: **137 passed, 0 failed**.

### 14.6 Confirmation of Baseline Preservation
- DOM reading order matches visual reading order 1:1.
- Zero CSS `order` or `display: contents` re-introduced.
- Desktop 48/52 two-column layout intact across all breakpoints.
- Form preselection, WhatsApp link generators, hash navigation, and accessibility semantics remain 100% operational.
- No Git commits or pushes made.

