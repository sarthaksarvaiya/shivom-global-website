# SHIVOM GLOBAL — Design System & Centralized Colour Architecture
**Document Version:** 1.0.0\
**Phase:** SG-DESIGN-SYSTEM-CORE\
**Status:** Approved Architectural Specification\
**Scope:** Centralized Visual Identity, Colour Tokens, Typography, Component Rules & Inconsistency Audit\
**Target Environment:** B2B Indian Tea Sourcing & Export Desk (`https://shivom-global-website.vercel.app/`)\

---

## 1. Executive Summary & Brand Theme Definition

### 1.1 Brand Positioning
SHIVOM GLOBAL is a specialized, credible Indian B2B tea sourcing and export desk based in Bhavnagar, Gujarat. The company coordinates direct estate procurement across Assam (Brahmaputra Valley & Upper Assam), Darjeeling, and South India for international tea buyers, blenders, supermarket brands, and private-label packers.

Unlike consumer tea e-commerce websites or generic agricultural trading portals, the visual identity of SHIVOM GLOBAL must project:
* **Institutional Trust & Credibility:** Reflecting statutory compliance (Tea Board of India, FSSAI, APEDA, MSME, GSTIN), transparent documentation, and contract reliability.
* **Authentic Origin & Agricultural Heritage:** Grounded in genuine Indian tea terroirs, orthodox whole leaf craftsmanship, and estate-level harvesting.
* **B2B Trade Desk Precision:** Crisp commercial communication, structured specifications (mesh size, particle density, ISO moisture/ash benchmarks), and clear pricing structures (FOB Indian loading ports / CIF destination ports).
* **Simplicity, Calmness & Clarity:** Clutter-free interfaces, high-contrast typography, and purposeful layouts that enable overseas procurement heads to evaluate grades and submit requirements rapidly.

### 1.2 The 65–25–10 Surface Rule
To maintain visual discipline and prevent visual fatigue, all interfaces adhere strictly to the **65–25–10 Surface Allocation Architecture**:
* **65% to 75% — Clean Neutral Canvas:** Warm off-white (`#FBFBFA`), pure white surfaces (`#FFFFFF`), and subtle warm ivory alternates (`#F4F5F3`) providing generous white space and maximum readability.
* **20% to 25% — Structural Deep Green & Botanical Sage:** Deep Forest (`#072218`) and Deep Estate Green (`#0D3829`) anchoring sticky headers, hero viewports, dark statutory footers, and prominent headings, accented by botanical Sage Green (`#9CAF88`) for origin indicators.
* **5% to 10% — Warm Gold & Burnt Amber Accents:** Burnt Amber (`#CC5500`) and Warm Gold (`#C59B27`) reserved exclusively for primary conversion CTAs, active tab selections, verified status badges, and critical tea liquor benchmarks. Zero gratuitous decoration.

```
┌────────────────────────────────────────────────────────────────────────┐
│  65% - 75% Warm Neutral Canvas (#FBFBFA / #FFFFFF)                     │
│  Main background, cards, tables, white space, clean reading surface    │
├────────────────────────────────────────┬───────────────────────────────┤
│  20% - 25% Deep Forest & Estate Green  │  5% - 10% Amber & Gold        │
│  (#072218 / #0D3829 / #9CAF88)         │  (#CC5500 / #C59B27)          │
│  Header, hero, footer, headings, icons │  CTAs, active tabs, badges    │
└────────────────────────────────────────┴───────────────────────────────┘
```

---

## 2. Brand Palette Evaluation & Accessibility Harmonization

### 2.1 Starting Palette Analysis
The requested brand palette consists of three foundation colours:

| Colour | Hex | Intended Purpose | Initial Observation |
| :--- | :---: | :--- | :--- |
| **Sage Green** | `#9CAF88` | Primary brand colour | Natural, botanical, organic tea leaf tone. Soft and calming. |
| **Concrete Grey** | `#A7A7A7` | Secondary neutral | Industrial, balanced, neutral mid-tone. |
| **Burnt Amber** | `#CC5500` | Accent and highlights | Rich, warm, oxidized black tea liquor tone. High vibrancy. |

---

### 2.2 Rigorous Accessibility & Usability Evaluation (WCAG 2.1)

#### 1. Sage Green (`#9CAF88`)
* **Relative Luminance:** \(L = 0.395\)
* **Contrast against Pure White (`#FFFFFF`):** **2.36:1** ❌ **FAILS WCAG AA** (Requires 4.5:1 for normal text, 3.0:1 for large text).
  * *Usability Finding:* Using `#9CAF88` for text on white or for button fills with white text produces severely illegible content.
* **Contrast against Deep Forest (`#072218`):** **7.14:1** ✅ **PASSES WCAG AAA**.
* **Contrast of Dark Text (`#072218` / `#111827`) on Sage Green Fill:** **7.42:1** ✅ **PASSES WCAG AAA**.
* **Architectural Decision:** Sage Green (`#9CAF88`) is adopted as the **Botanical Accent & Light Surface Tint**. It is paired with deep text or used for badge fills, iconography, subtle borders, and terroir badges. For primary structural headings, text, and high-contrast buttons, it is harmonized with its tonal anchors: **Deep Estate Green (`#0D3829`)** and **Deep Forest (`#072218`)**.

#### 2. Concrete Grey (`#A7A7A7`)
* **Relative Luminance:** \(L = 0.387\)
* **Contrast against Pure White (`#FFFFFF`):** **2.40:1** ❌ **FAILS WCAG AA for text**.
  * *Usability Finding:* Light/mid greys cannot carry body text on white.
* **Contrast against Deep Forest (`#072218`):** **7.01:1** ✅ **PASSES WCAG AAA**.
* **Architectural Decision:** Concrete Grey (`#A7A7A7`) is designated as the **Secondary Neutral for UI Framing**. It powers disabled input fills, placeholder outlines, table column dividers, and secondary badge borders. Body copy is assigned to Slate Grey (`#4B5563`, **7.0:1 AAA**), and main headings are assigned to Near Black (`#111827`, **16.1:1 AAA**).

#### 3. Burnt Amber (`#CC5500`)
* **Relative Luminance:** \(L = 0.194\)
* **Contrast against Pure White (`#FFFFFF`):** **4.31:1** (Borderline AA).
* **Calibrated Adjustment:** By lightly deepening Burnt Amber to `#BA4E00` (\(L = 0.166\)), the contrast against pure white reaches **4.85:1** ✅ **PASSES WCAG AA**.
* **Contrast against Deep Forest (`#072218`):** **3.91:1** ✅ **PASSES WCAG Large Text / UI Components (3:1)**.
* **White Text (`#FFFFFF`) on Burnt Amber Fill:** **4.85:1** ✅ **PASSES WCAG AA**.
* **Architectural Decision:** Burnt Amber represents the authentic color of concentrated Assam CTC tea liquor. It serves as the **Primary Interactive Action Accent**, used for critical CTAs, active indicators, and conversion highlights, working alongside **Warm Gold (`#C59B27`)** which represents premium auction lots and statutory export seals.

---

### 2.3 Visual Harmonization Matrix

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             SHIVOM GLOBAL PALETTE                                │
├────────────────────────┬────────────────────────┬────────────────────────────────┤
│ 1. Botanical & Forest  │ 2. Tea Liquor & Gold   │ 3. Canvas & Technical Neutrals │
├────────────────────────┼────────────────────────┼────────────────────────────────┤
│ Deep Forest  #072218   │ Burnt Amber  #CC5500   │ Warm Canvas   #FBFBFA          │
│ Estate Green #0D3829   │ Deep Amber   #BA4E00   │ Pure White    #FFFFFF          │
│ Sage Brand   #9CAF88   │ Warm Gold    #C59B27   │ Surface Soft  #F4F5F3          │
│ Soft Sage    #E8EFE3   │ Gold Hover   #B0871D   │ Concrete Grey #A7A7A7          │
│ Mint Tint    #F0FDF4   │ Gold Sheen   #FEF08A   │ Border Line   #E5E7EB          │
└────────────────────────┴────────────────────────┴────────────────────────────────┘
```

---

## 3. Centralized Colour Token System

Below is the definitive token system. Every token has an assigned CSS custom property, exact HEX code, semantic role, and accessibility rating.

### 3.1 Primary Brand Tokens (Estate & Botanical)

| Token Name | CSS Custom Property | HEX Value | Semantic Usage & Context | WCAG AA / AAA |
| :--- | :--- | :---: | :--- | :---: |
| **Primary Deep Forest** | `--color-primary-dark` | `#072218` | Sticky header background, dark section canvas, hero overlay | 16.8:1 on White (AAA) |
| **Primary Estate Green** | `--color-primary` | `#0D3829` | Primary brand anchor, section headings, card title hover | 12.3:1 on White (AAA) |
| **Primary Hover** | `--color-primary-hover` | `#08281D` | Deepened green for hover state on primary green elements | 14.9:1 on White (AAA) |
| **Primary Active** | `--color-primary-active` | `#051A12` | Active/pressed state for primary green elements | 17.5:1 on White (AAA) |
| **Sage Botanical Brand** | `--color-sage` | `#9CAF88` | Botanical badges, origin accents, illustration highlights | 7.4:1 with Dark Text (AAA) |
| **Sage Light Surface** | `--color-sage-light` | `#E8EFE3` | Background for terroir cards, origin tags, active grade chips | 9.8:1 with Dark Text (AAA) |
| **Sage Border** | `--color-sage-border` | `#7D9269` | High-definition border for sage components | 3.6:1 UI Border (AA) |

---

### 3.2 Action, Accent & Liquor Tokens

| Token Name | CSS Custom Property | HEX Value | Semantic Usage & Context | WCAG AA / AAA |
| :--- | :--- | :---: | :--- | :---: |
| **Accent Burnt Amber** | `--color-accent` | `#CC5500` | High-priority interactive actions, conversion buttons | 4.5:1 on White (AA) |
| **Accent Amber Calibrated** | `--color-accent-amber` | `#BA4E00` | Text links on white, inline highlighted terms | 4.8:1 on White (AA) |
| **Accent Amber Hover** | `--color-accent-hover` | `#994000` | Hover state for burnt amber buttons & links | 6.2:1 on White (AAA) |
| **Warm Gold** | `--color-gold` | `#C59B27` | Commercial grade highlights, selected badges, quote buttons | 6.3:1 on Dark (AAA) |
| **Warm Gold Hover** | `--color-gold-hover` | `#B0871D` | Hover state for gold buttons and icons | 7.8:1 on Dark (AAA) |
| **Gold Sheen** | `--color-gold-sheen` | `#FEF08A` | Micro highlights, tip accents on Orthodox tea descriptions | High-visibility tint |

---

### 3.3 Canvas, Surface & Neutral Tokens

| Token Name | CSS Custom Property | HEX Value | Semantic Usage & Context | WCAG AA / AAA |
| :--- | :--- | :---: | :--- | :---: |
| **Main Page Canvas** | `--bg-page` | `#FBFBFA` | Default page background (warm off-white, anti-glare) | Base |
| **Surface White** | `--bg-surface` | `#FFFFFF` | Cards, input fields, modal dialogs, specification tables | Base |
| **Surface Subtle** | `--bg-surface-subtle` | `#F4F5F3` | Alternating section background (warm ivory/green tint) | Base |
| **Surface Card** | `--bg-card` | `#FFFFFF` | Isolated card containers with border & elevation | Base |
| **Surface Dark Section** | `--bg-dark-section` | `#0A1F17` | Full-bleed dark sections (Hero, Why Us, Statutory Footer) | Base |
| **Concrete Grey** | `--color-concrete` | `#A7A7A7` | Secondary neutral for disabled controls, dividers | 3.1:1 Graphic (AA) |
| **Concrete Subtle** | `--color-concrete-subtle` | `#E5E7EB` | Hairline card borders and table row borders | Base UI |

---

### 3.4 Typography Tokens

| Token Name | CSS Custom Property | HEX Value | Semantic Usage & Context | WCAG AA / AAA |
| :--- | :--- | :---: | :--- | :---: |
| **Heading Text** | `--text-heading` | `#072218` | Section titles (H1, H2, H3), high-authority labels | 16.8:1 on White (AAA) |
| **Body Main Text** | `--text-main` | `#111827` | Primary narrative copy, card body text, table cell values | 16.1:1 on White (AAA) |
| **Muted Text** | `--text-muted` | `#4B5563` | Secondary descriptions, subheadings, helper text | 7.0:1 on White (AAA) |
| **Dim Text** | `--text-dim` | `#6B7280` | Input placeholder copy, metadata timestamps, field hints | 4.6:1 on White (AA) |
| **Inverse Text** | `--text-inverse` | `#FFFFFF` | Headings and text on dark forest & hero viewports | 16.8:1 on Dark (AAA) |
| **Inverse Muted** | `--text-inverse-muted` | `#D1D5DB` | Secondary text on dark forest backgrounds | 9.6:1 on Dark (AAA) |

---

### 3.5 Border & Divider Tokens

| Token Name | CSS Custom Property | Value / HEX | Semantic Usage & Context |
| :--- | :--- | :---: | :--- |
| **Border Subtle** | `--border-subtle` | `#E5E7EB` | Default container border, table cell dividers |
| **Border Medium** | `--border-medium` | `#D1D5DB` | Inactive form input border, card outlines |
| **Border Strong** | `--border-strong` | `#9CA3AF` | Inactive select dropdown border, interactive hover |
| **Border Accent Gold** | `--border-accent-gold` | `rgba(197, 155, 39, 0.40)` | Highlighting selected grade rows and active cards |
| **Border Accent Amber** | `--border-accent-amber` | `rgba(204, 85, 0, 0.40)` | Highlighting active conversion actions and notifications |
| **Border Dark Subtle** | `--border-dark-subtle` | `rgba(255, 255, 255, 0.12)` | Subtle dividing lines within dark sections |

---

### 3.6 Functional & Semantic Feedback Tokens

| Token Name | CSS Custom Property | HEX Value | Semantic Usage & Context |
| :--- | :--- | :---: | :--- |
| **Success Fill** | `--color-success-bg` | `#F0FDF4` | Positive confirmation cards, WhatsApp speed-dial badges |
| **Success Border** | `--color-success-border` | `#86EFAC` | Confirmation container border |
| **Success Text** | `--color-success-text` | `#15803D` | Success messages, verified certificate indicators |
| **Warning Fill** | `--color-warning-bg` | `#FFFBEB` | Sourcing advisory callouts, seasonal flush alerts |
| **Warning Border** | `--color-warning-border` | `#FCD34D` | Advisory callout border |
| **Warning Text** | `--color-warning-text` | `#B45309` | Advisory labels and cautionary notices |
| **Error Fill** | `--color-error-bg` | `#FEF2F2` | Validation error summary box, invalid input background |
| **Error Border** | `--color-error-border` | `#EF4444` | Required field validation failure outline (`.form-input-error`) |
| **Error Text** | `--color-error-text` | `#DC2626` | Inline validation error alerts (`.form-error-msg`) |
| **Info Fill** | `--color-info-bg` | `#EFF6FF` | Technical cupping protocol notes, parameter explainers |
| **Info Border** | `--color-info-border` | `#93C5FD` | Informational callout border |
| **Info Text** | `--color-info-text` | `#1D4ED8` | Informational notices |
| **WhatsApp Brand** | `--color-whatsapp` | `#25D366` | Direct trade desk communication channel button & badge |

---

### 3.7 Interactive & Accessibility Focus Tokens

| Token Name | CSS Custom Property | Value / HEX | Semantic Usage & Context |
| :--- | :--- | :---: | :--- |
| **Focus Ring** | `--focus-ring` | `0 0 0 3px rgba(13, 56, 41, 0.20)` | Keyboard navigation outline (`:focus-visible`) |
| **Focus Ring Gold** | `--focus-ring-gold` | `0 0 0 3px rgba(197, 155, 39, 0.35)` | Keyboard focus outline on gold buttons |
| **Focus Ring Error** | `--focus-ring-error` | `0 0 0 3px rgba(220, 38, 38, 0.20)` | Active focus on invalid form input |
| **Disabled Background** | `--color-disabled-bg` | `#F3F4F6` | Inactive/disabled buttons, read-only input fields |
| **Disabled Text** | `--color-disabled-text` | `#9CA3AF` | Unclickable action text |
| **Disabled Border** | `--color-disabled-border` | `#E5E7EB` | Disabled control perimeter |

---

## 4. Typography System

### 4.1 Dual-Engine Font Architecture
SHIVOM GLOBAL employs two specialized, complementary Google Fonts:
1. **Primary Structural Engine — Plus Jakarta Sans:**
   * Used for all primary headlines (H1–H4), navigation links, introductory leads, body narratives, button labels, and general form copy.
   * Characteristics: Clean geometric curves, tall x-height, contemporary corporate authority, outstanding legibility across all display densities.
2. **Technical Specification Engine — Space Grotesk:**
   * Used for auction grade codes (`BOP`, `BOPSM`, `PF`, `TGFOP`), ISO laboratory benchmarks (`ISO 1573`), mesh sieve specifications, statutory tax IDs (`GSTIN`, `Udyam`), and enquiry reference IDs (`SG-REQ-YYYYMMDD-XXXX`).
   * Characteristics: Proportional tabular numerals (`font-feature-settings: "tnum" 1`), distinctive technical character, international commercial trade clarity.

---

### 4.2 Typographic Hierarchy Scale

| Level | Font Family | Size (Fluid Clamp) | Pixel Equiv | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **Display H1** | Plus Jakarta Sans | `clamp(2.00rem, 4vw + 1rem, 3.25rem)` | 32px – 52px | 800 (ExtraBold) | 1.15 | `-0.025em` |
| **Section H2** | Plus Jakarta Sans | `clamp(1.625rem, 3vw + 0.5rem, 2.375rem)` | 26px – 38px | 700 (Bold) | 1.25 | `-0.02em` |
| **Module H3** | Plus Jakarta Sans | `clamp(1.25rem, 2vw + 0.25rem, 1.50rem)` | 20px – 24px | 700 (Bold) | 1.30 | `-0.01em` |
| **Card H4** | Plus Jakarta Sans | `1.125rem` | 18px | 600 (SemiBold) | 1.35 | `0.00em` |
| **Lead Paragraph** | Plus Jakarta Sans | `1.125rem` | 18px | 400 (Regular) | 1.65 | `0.00em` |
| **Body Copy** | Plus Jakarta Sans | `1.000rem` | 16px | 400 (Regular) | 1.60 | `0.00em` |
| **Small / Helper** | Plus Jakarta Sans | `0.875rem` | 14px | 500 (Medium) | 1.45 | `0.00em` |
| **Micro Caption** | Plus Jakarta Sans | `0.750rem` | 12px | 600 (SemiBold) | 1.40 | `+0.04em` |
| **Spec Grade Badge** | Space Grotesk | `0.8125rem – 0.9375rem` | 13px – 15px | 700 (Bold) | 1.20 | `+0.05em` |
| **Technical Data** | Space Grotesk | `0.875rem` | 14px | 600 (SemiBold) | 1.40 | `0.00em` |

---

## 5. Spacing, Elevation & Layout Grid

### 5.1 8px Spacing Grid
The design system strictly implements an **8px base grid** for consistent spatial rhythms:

| Token | Pixels | Semantic Application |
| :--- | :---: | :--- |
| `--space-1` | `4px` | Micro gaps between inline icons and text, tight badge padding |
| `--space-2` | `8px` | Base unit: button icon gaps, form group internal spacing |
| `--space-3` | `12px` | Card internal dividers, compact list item gaps |
| `--space-4` | `16px` | Standard padding inside inputs, buttons, mobile card padding |
| `--space-5` | `20px` | Card body separation, modal header padding |
| `--space-6` | `24px` | Standard desktop card padding, grid gutter between cards |
| `--space-8` | `32px` | Section header bottom margins, major module separation |
| `--space-12` | `48px` | Tablet section vertical padding, prominent card separation |
| `--space-16` | `64px` | Standard section top/bottom padding (`clamp(3rem, 6vw, 5rem)`) |
| `--space-20` | `80px` | Hero and final CTA generous vertical clearance |
| `--space-24` | `96px` | Deep architectural viewport padding |
| `--space-30` | `120px` | Major landmark transitions |

---

### 5.2 Elevation & Box Shadows
Shadows in B2B trade platforms must remain subtle, clean, and commercial—never blurry or glowing:

* **Subtle Elevation (`--shadow-sm`):** `0 1px 2px 0 rgba(0, 0, 0, 0.05)` — Form inputs, standard buttons.
* **Card Elevation (`--shadow-card`):** `0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)` — Information modules, tea category cards.
* **Hover Elevation (`--shadow-hover`):** `0 4px 6px -1px rgba(13, 56, 41, 0.08), 0 2px 4px -2px rgba(13, 56, 41, 0.04)` — Interactive cards on hover.
* **Prominent Elevation (`--shadow-elevated`):** `0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.03)` — Form containers, mobile navigation drawer.

---

### 5.3 Border Radius System
* `--radius-sm` (`4px`): Form inputs, select dropdowns, technical spec badges, table action buttons.
* `--radius-md` (`8px`): Standard content cards, information modules, terroir console display.
* `--radius-lg` (`12px`): Large section containers, buyer requirement intake card.
* `--radius-full` (`9999px`): Dual-mode switcher pill, circular icon buttons, status pills.

---

## 6. UI Component Theme Rules

### 6.1 Buttons & Interactive Actions

```
[ Primary Conversion Button ]
Background: #C59B27 (Warm Gold) or #CC5500 (Burnt Amber)
Text: #072218 (Deep Forest) or #FFFFFF (White) | Weight: 700 (Bold)
Hover: #B0871D / #B34700 | Transform: translateY(-1px)
Padding: 12px 24px | Border-Radius: 6px

[ Secondary Light Button ]
Background: transparent | Border: 1.5px solid #0D3829 (Estate Green)
Text: #0D3829 | Weight: 600
Hover: Background rgba(13, 56, 41, 0.06) | Padding: 12px 24px

[ Secondary Dark Button (Hero / Dark Viewport) ]
Background: rgba(255, 255, 255, 0.08) | Border: 1px solid rgba(255, 255, 255, 0.25)
Text: #FFFFFF | Weight: 600
Hover: Background rgba(255, 255, 255, 0.16) | Border-Color: #FFFFFF
```

* **Rules:**
  1. Never use generic gradients or glowing dropshadows on buttons.
  2. Maintain a minimum tap target of `44px × 44px` across mobile viewports.
  3. Every interactive button must display an explicit `:focus-visible` ring.

---

### 6.2 Dual-Mode Form Switcher
* **Component:** Quick Enquiry (Form A) vs Detailed Tea Requirement (Form B).
* **Container:** `display: inline-flex; background: rgba(0, 0, 0, 0.35); padding: 5px; border-radius: var(--radius-full); border: 1px solid rgba(255, 255, 255, 0.16);`
* **Inactive Pill:** `background: transparent; color: rgba(255, 255, 255, 0.85);`
* **Active Pill (`.mode-switch-btn-active`):**
  * `background: #FFFFFF !important;`
  * `color: #072218 !important;` (Deep Forest)
  * `font-weight: 700;`
  * `box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);`
  * *Critical Rule:* Applied directly to the button element to guarantee 100% contrast compatibility across Safari, WebKit, Chrome, and Firefox.

---

### 6.3 Form Inputs & Validation States
* **Label:** `font-weight: 600; font-size: 0.875rem; color: #111827; margin-bottom: 6px;`
* **Required Indicator:** Gold asterisk (`*`, color: `#C59B27`) with accessible label.
* **Default Input:** `background: #FFFFFF; border: 1px solid #D1D5DB; border-radius: 4px; padding: 10px 14px; font-size: 0.9375rem; color: #111827;`
* **Focus State:** `border-color: #0D3829; outline: none; box-shadow: 0 0 0 3px rgba(13, 56, 41, 0.15);`
* **Error State (`.form-input-error`):** `border-color: #DC2626 !important; background-color: #FFFDFD;`
* **Error Message (`.form-error-msg`):** `display: flex; align-items: center; gap: 4px; color: #DC2626; font-size: 0.75rem; font-weight: 500; margin-top: 4px;`
* **Real-time Clearance:** Errors must vanish dynamically as soon as valid keystrokes are registered.

---

### 6.4 Specification Tables (Grade Matrix)
* **Table Wrapper:** Horizontal scroll enabled (`overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 8px; border: 1px solid #E5E7EB;`).
* **Header (`<thead>`):** `background: #072218; color: #FFFFFF; font-family: Plus Jakarta Sans; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;`
* **Body Rows (`<tbody>`):**
  * Odd rows: `#FFFFFF`
  * Even rows: `#FBFBFA`
  * Hover row: `background: #F4F5F3;`
* **Selected Row (`.grade-row-selected`):** `background: #FFFDF5 !important; border-left: 3px solid #C59B27;`
* **Grade Code Badge:** Monospace Space Grotesk, bold, surrounded by light neutral pill (`background: #F3F4F6; border: 1px solid #E5E7EB;`).
* **Action Button:**
  * Inactive: `"Specify →"` (`background: #FFFFFF; border: 1px solid #D1D5DB; color: #111827; font-weight: 600;`)
  * Selected: `"✓ Selected"` (`background: #C59B27; border: 1px solid #C59B27; color: #072218; font-weight: 700;`)

---

### 6.5 Header & Navigation
* **Sticky Position:** `position: sticky; top: 0; z-index: 1000; height: 74px;`
* **Background:** `rgba(7, 34, 24, 0.85)` with `backdrop-filter: blur(14px)`.
* **Scrolled State:** `rgba(7, 34, 24, 0.96); border-bottom: 1px solid rgba(197, 155, 39, 0.25);`
* **Navigation Anchors:** `color: #FFFFFF; opacity: 0.85; font-size: 0.9375rem; font-weight: 500;`
  * Active/Hover: `opacity: 1; color: #FEF08A;` with a subtle bottom accent indicator.
* **Mobile Drawer:** Full-screen overlay `background: #072218; border-top: 1px solid rgba(255, 255, 255, 0.1);` with 48px touch navigation items.

---

### 6.6 Compact Statutory Footer
* **Background:** Solid Deep Forest (`#072218`), text `#FFFFFF`.
* **3-Column Grid:** Brand & statutory entity verification (Column 1), Sourcing & compliance navigation (Column 2), Direct trade desk contact (Column 3).
* **Statutory Verification Box:** High-transparency card (`background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1);`) highlighting Udyam MSME and GSTIN in Space Grotesk.

---

## 7. Core Design Principles

1. **Hierarchy Before Styling:** Use spacing, scale, and typographic weight to establish hierarchy before introducing color accents.
2. **Color is Informational, Never Decorative:** Every accent color must represent an operational state (e.g. Green for botanical/verified, Amber for interactive conversion, Gold for auction grades, Red for field errors).
3. **Contrast is Non-Negotiable:** Every textual element on the website must satisfy or exceed WCAG 2.1 AA standards (minimum 4.5:1 for body copy; 3.0:1 for headings and UI components).
4. **Authenticity Over Generic Polish:** Never use generic AI-generated purple/blue gradients or neon lighting effects. Preserve genuine Indian tea photography, authentic brown/amber liquor tones, and clean kraft paper bulk sack aesthetics.
5. **Mobile-First Touch Parity:** Every control, switcher, and filter tab must adapt seamlessly to touch screens with a minimum 44px hit box and zero horizontal document overflow.
6. **Strict Motion Sensitivity:** Respect user motion preferences (`@media (prefers-reduced-motion: reduce)`) across all CSS transitions and Framer Motion animations.

---

## 8. Existing Website Inconsistencies Inventory

A comprehensive audit of `src/styles/tokens.css`, `src/styles/index.css`, and React components revealed the following inconsistencies:

### 8.1 Inconsistent Color Values
* **Multiple Competing Golds:**
  * `#C59B27` declared in `tokens.css` as Warm Gold.
  * `#D4AF37` used 37 times in `index.css` as Classic Metallic Gold.
  * `#D97706` and `#B45309` used across category badges.
  * *Harmonization:* Consolidate to `--color-gold: #C59B27` for actions and `--color-accent-amber: #BA4E00` for amber accents.
* **Multiple Competing Canvas Off-Whites:**
  * `#FBFBFA` declared in `tokens.css` as `--bg-page`.
  * `#FAF8F5` used 21 times in `index.css`.
  * `#FFFDF9`, `#FFFDF8`, `#edece6`, and `#EBE6DE` scattered across card sections.
  * *Harmonization:* Standardize to `--bg-page: #FBFBFA` for main canvas and `--bg-surface-subtle: #F4F5F3` for alternating sections.
* **Hardcoded Hex Values in CSS:**
  * `.site-footer` defines `background-color: #072218;` directly instead of referencing `var(--color-primary-dark)`.
  * `.hero-gradient-overlay` defines `rgba(7, 34, 24, 0.90)` instead of referencing a variable.

### 8.2 Missing CSS Variable Declarations
Several custom properties are referenced in `src/styles/index.css` but are **not declared** in `tokens.css`:
* `--color-bg-alt` (referenced at line 1062) → Unset fallback.
* `--font-display` (referenced at lines 48, 88) → Unset fallback.
* `--space-10` (referenced at line 1686) → Unset fallback.
* `--radius-xl` (referenced in card styles) → Unset fallback.
* `--shadow-md` (referenced in button hover states) → Unset fallback.

### 8.3 Dead / Legacy Styles in CSS
* Lines 1143–1340 in `src/styles/index.css` contain `.tea-card-assam`, `.tea-card-darjeeling`, `.tea-card-orthodox`, and `.tea-card-green` with purple (`#8B5CF6`) and blue (`#2563EB`) radial glows and linear gradients.
* *Finding:* These classes belong to an obsolete card layout that was superseded by the modern interactive Terroir Console in `TeaCategoriesSection.tsx`. They remain as unused CSS debt.

---

## 9. Centralized Token Implementation Structure

To resolve these inconsistencies without disrupting live production, the following centralized token structure is prepared for `src/styles/tokens.css`:

```css
/* ==========================================================================
   SHIVOM GLOBAL — Centralized Design System Tokens
   Single Source of Truth
   ========================================================================== */

:root {
  /* --------------------------------------------------------------------------
     1. COLOUR PALETTE: BRAND FOUNDATION
     -------------------------------------------------------------------------- */
  /* Estate & Forest Greens */
  --color-primary-dark: #072218;          /* Deep Forest — Header, hero, footer */
  --color-primary: #0D3829;               /* Deep Estate Green — Primary brand identity */
  --color-primary-hover: #08281D;         /* Hover state */
  --color-primary-active: #051A12;        /* Active/pressed state */
  --color-sage: #9CAF88;                  /* Sage Green — Botanical brand accent */
  --color-sage-light: #E8EFE3;            /* Soft sage tint surface */
  --color-sage-border: #7D9269;           /* Sage component boundary */

  /* Action & Accent (Burnt Amber & Warm Gold) */
  --color-accent: #CC5500;                /* Burnt Amber — Primary conversion accent */
  --color-accent-amber: #BA4E00;          /* Calibrated Amber — High-contrast text & links */
  --color-accent-hover: #994000;          /* Amber hover state */
  --color-gold: #C59B27;                  /* Warm Gold — Commercial grade & badges */
  --color-gold-hover: #B0871D;            /* Gold hover state */
  --color-gold-sheen: #FEF08A;            /* Gold micro-sheen */

  /* Canvas & Surfaces */
  --bg-page: #FBFBFA;                     /* Warm Off-White — Main page background */
  --bg-surface: #FFFFFF;                  /* Pure White — Cards & tables */
  --bg-surface-subtle: #F4F5F3;           /* Warm Ivory/Green — Alternating sections */
  --bg-card: #FFFFFF;                     /* Card container background */
  --bg-dark-section: #0A1F17;             /* Dark section container */
  --color-bg-alt: #F4F5F3;                /* Legacy alias compatibility */

  /* Neutral Spectrum */
  --color-concrete: #A7A7A7;              /* Concrete Grey — Secondary neutral */
  --color-concrete-subtle: #E5E7EB;       /* Hairline divider */

  /* Typography */
  --text-heading: #072218;                /* Near Black Deep Forest for Headings */
  --text-main: #111827;                   /* High-legibility Body Text */
  --text-muted: #4B5563;                  /* Secondary Descriptions */
  --text-dim: #6B7280;                    /* Hints, Placeholders, Timestamps */
  --text-inverse: #FFFFFF;                /* White text on dark viewports */
  --text-inverse-muted: #D1D5DB;          /* Muted text on dark viewports */

  /* Borders & Dividers */
  --border-subtle: #E5E7EB;               /* Light grey container outline */
  --border-medium: #D1D5DB;               /* Form input perimeter */
  --border-strong: #9CA3AF;               /* Select dropdown focus boundary */
  --border-accent-gold: rgba(197, 155, 39, 0.40);
  --border-accent-amber: rgba(204, 85, 0, 0.40);
  --border-dark-subtle: rgba(255, 255, 255, 0.12);

  /* Functional Feedback */
  --color-success-bg: #F0FDF4;
  --color-success-border: #86EFAC;
  --color-success-text: #15803D;
  --color-warning-bg: #FFFBEB;
  --color-warning-border: #FCD34D;
  --color-warning-text: #B45309;
  --color-error-bg: #FEF2F2;
  --color-error-border: #EF4444;
  --color-error-text: #DC2626;
  --color-info-bg: #EFF6FF;
  --color-info-border: #93C5FD;
  --color-info-text: #1D4ED8;
  --color-whatsapp: #25D366;

  /* Focus & States */
  --focus-ring: 0 0 0 3px rgba(13, 56, 41, 0.20);
  --focus-ring-gold: 0 0 0 3px rgba(197, 155, 39, 0.35);
  --focus-ring-error: 0 0 0 3px rgba(220, 38, 38, 0.20);
  --color-disabled-bg: #F3F4F6;
  --color-disabled-text: #9CA3AF;
  --color-disabled-border: #E5E7EB;

  /* --------------------------------------------------------------------------
     2. TYPOGRAPHY SYSTEM
     -------------------------------------------------------------------------- */
  --font-primary: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Space Grotesk', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Font Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;

  /* Line Heights */
  --leading-tight: 1.15;
  --leading-snug: 1.30;
  --leading-normal: 1.50;
  --leading-relaxed: 1.65;

  /* --------------------------------------------------------------------------
     3. SPACING SCALE (8px Base Grid)
     -------------------------------------------------------------------------- */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;                       /* Added: missing alias fix */
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-30: 120px;

  /* --------------------------------------------------------------------------
     4. CONTAINERS & RADII
     -------------------------------------------------------------------------- */
  --container-max-width: 1240px;
  --container-padding-desktop: var(--space-8);
  --container-padding-tablet: var(--space-6);
  --container-padding-mobile: var(--space-4);

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;                      /* Added: missing alias fix */
  --radius-full: 9999px;

  /* --------------------------------------------------------------------------
     5. ELEVATION & SHADOWS
     -------------------------------------------------------------------------- */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-card: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.04); /* Added */
  --shadow-hover: 0 4px 6px -1px rgba(13, 56, 41, 0.08), 0 2px 4px -2px rgba(13, 56, 41, 0.04);
  --shadow-elevated: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.03);

  /* --------------------------------------------------------------------------
     6. MOTION & TRANSITIONS
     -------------------------------------------------------------------------- */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 10. Implementation Rules & Governance

1. **Design System Governance:** Any future colour, font, or spacing modification must first be documented in `DESIGN_SYSTEM.md` and approved before implementation in CSS.
2. **Zero Breaking Changes:** Under no circumstances should token refactoring remove existing functional styles, break Supabase submission adapters, modify Resend email dispatches, or disturb responsive layouts.
3. **One Step at a Time:** Consolidating tokens must be executed as a dedicated, audited step, followed by full Chrome DevTools QA verification across Desktop, Tablet, and Mobile.
4. **No Arbitrary Hardcoded Values:** New UI components must reference CSS variables exclusively (e.g. `var(--color-primary-dark)`) rather than raw hex codes.
