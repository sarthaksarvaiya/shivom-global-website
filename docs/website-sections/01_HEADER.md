# 01 — Site Header (Header & Navigation)

## 1. Section Overview
- **Section ID**: `sec-01` / `<header className="site-header">`
- **Section Name**: Site Header & Navigation
- **Position on Website**: Top of viewport, persistent across scroll (`position: fixed`, z-index 1000). Renders as the first visual component on the page.
- **Main Purpose**: Provides corporate identity branding, sticky navigation across the 5 core sourcing sections with live scroll-spy detection, quick access to direct quote submission, and mobile drawer navigation.
- **Target Audience**: International B2B tea importers, overseas procurement managers, tea blenders, packaging brand partners who need rapid navigation across the sourcing portfolio, grade specifications, and direct quotation intake.
- **Business Objective**: Establish institutional credibility through clean corporate presentation, maintain continuous conversion pathway via the persistent "Request a Quote" CTA button, and facilitate frictionless one-click scrolling to key commercial decision points.

## 2. Current Implementation
- **Existing Design Description**: Deep Forest dark background (`var(--color-primary-dark): #072218`) with crisp Warm Gold (`var(--color-gold): #C59B27`) active indicators. When scrolled past 20px, it dynamically transitions into a high-density blurred backdrop (`rgba(7, 34, 24, 0.96)`, `backdrop-filter: blur(12px)`) with a subtle bottom divider border (`rgba(255, 255, 255, 0.08)`).
- **Existing Layout**: Single horizontal flex container (`.header-container`) constrained to `var(--container-max-width): 1240px` with 74px fixed height (`height: 74px`). Left: Brand logo; Center: 5 desktop navigation links; Right: Primary conversion CTA ("Request a Quote"). On screens <= 768px, desktop navigation and desktop CTA collapse into a clean hamburger button and an overlay modal drawer.
- **Content Structure**:
  - Brand Logo anchor linking to `#hero`.
  - Desktop Navigation (`<nav aria-label="Main Navigation">`) containing 5 text anchor links:
    1. "Tea Sourcing" (`#our-teas`)
    2. "Grades & Specs" (`#tea-by-grade`)
    3. "Private Label" (`#private-label`)
    4. "Sourcing Flow" (`#how-it-works`)
    5. "Export Compliance" (`#why-us`)
  - Primary Action CTA: "Request a Quote" linking to `#requirement-form`.
  - Mobile Menu Toggle: Accessible `<button>` toggling between `Menu` (24px) and `X` (24px) icons.
  - Mobile Drawer (`#mobile-nav-drawer`): Vertical link stack with chevron arrows and full-width "Request a Quote" conversion button.
- **Visual Elements**:
  - High-resolution SVG brand header logo: `/Shivom_Global_Header_Logo.svg`.
  - Gold underlines and active tint transitions on active navigation links.
  - Smooth backdrop-filter blur on scroll.
- **Current Functionality**:
  - Sticky scroll state detection (`window.scrollY > 20`).
  - Active section scroll-spy with a 140px vertical threshold offset to match page scroll depth.
  - Smooth scrolling calculation (`headerOffset: 74px`) when clicking navigation anchors.
  - Keyboard accessibility: Pressing `Escape` automatically closes the mobile navigation drawer.
  - Integration with parent `onRequestSamples` handler.

## 3. Component Mapping
- **React Component Name**: `SiteHeader`
- **Exact Source File Path**: `src/components/layout/SiteHeader.tsx`
- **Related Subcomponents**: None (completely self-contained within `SiteHeader.tsx`).
- **Shared Components**:
  - Imported and rendered by `src/pages/HomePage.tsx`.
  - Consumes Lucide icons: `Menu`, `X`, `ArrowRight` from `lucide-react`.

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 490–630: Header core classes; Lines 738–780: Mobile drawer media queries).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--color-primary-dark)` (#072218), `var(--color-accent-gold)` (#C59B27), `var(--text-inverse)` (#FFFFFF), `var(--text-inverse-muted)` (#D1D5DB).
  - Spacing: `var(--space-2)` (8px), `var(--space-3)` (12px), `var(--space-4)` (16px), `var(--space-6)` (24px).
  - Layout: `var(--container-max-width)` (1240px), `height: 74px`.
  - Radii: `var(--radius-sm)` (4px), `var(--radius-md)` (8px).
  - Transitions: `var(--transition-fast)` (150ms), `var(--transition-normal)` (200ms).
- **Typography**:
  - Font: `var(--font-primary)` (Plus Jakarta Sans).
  - Weights: `var(--weight-semibold)` (600), `var(--weight-bold)` (700).
  - Font Sizes: `0.875rem` (14px) for desktop navigation links, `0.9375rem` (15px) for CTA button.
- **Layout Behaviour**:
  - Desktop: `display: flex; justify-content: space-between; align-items: center;`.
  - Sticky: `position: fixed; top: 0; left: 0; right: 0; z-index: 1000;`.
- **Animation Styles**:
  - Background transition on scroll: `transition: background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease`.
  - Link underline slide-in: CSS `::after` pseudo-element with `transform: scaleX(0)` to `scaleX(1)`.

## 5. Asset Mapping
- **Image Paths**: None.
- **SVG Paths**: `/Shivom_Global_Header_Logo.svg` (Rendered via `<img className="header-brand-img" src="/Shivom_Global_Header_Logo.svg" alt="SHIVOM GLOBAL" />`).
- **Video Paths**: None.
- **Icon References**: `Menu`, `X`, `ArrowRight` from `lucide-react`.
- **Fonts**: Plus Jakarta Sans (Google Fonts loaded via `index.html`).
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - Brand Logo: Scrolls page smoothly to `#hero`.
  - 5 Navigation Links: Smooth-scroll to corresponding section anchors (`#our-teas`, `#tea-by-grade`, `#private-label`, `#how-it-works`, `#why-us`) taking into account the 74px sticky header height offset.
  - "Request a Quote" CTA: Invokes `onRequestSamples()` prop if supplied, or falls back to smooth-scrolling to `#requirement-form`.
  - Mobile Menu Toggle: Flips `mobileMenuOpen` boolean state.
- **Navigation**:
  - Pure anchor navigation using browser `window.scrollTo({ top: offsetPosition, behavior: 'smooth' })`.
  - Scroll-spy dynamically adds `.active` class to current section's nav link.
- **Form Behaviour**: N/A (Header does not contain form fields).
- **Interactions**:
  - Hover states on links show gold text and underline animation.
  - Primary button hover darkens background and elevates slightly.
  - Keyboard focus rings using `outline: 2px solid var(--color-accent-gold)`.
- **Animations**:
  - Pure CSS transitions for scroll state changes and mobile drawer opacity/transform.
- **API Integrations**: None.
- **External Integrations**: None (Direct WhatsApp link was intentionally relocated to Hero, Table, and Floating button to maintain a clean header).

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: Full brand cluster, horizontal list of 5 navigation links with active state indicator, and gold "Request a Quote" CTA button.
- **Tablet (769px – 1024px)**: Desktop navigation links reduce padding (`padding: 6px 10px`), font size tightens to 13.5px, and CTA remains visible.
- **Mobile (<= 768px)**:
  - Desktop nav and desktop CTA are hidden (`display: none`).
  - Mobile hamburger toggle (`.mobile-toggle`) appears on the right.
  - Logo scales down proportionally to fit the 74px bar.
  - Mobile drawer opens as a full-width dropdown below the header with vertical links, arrows, and full-width CTA button.
- **Existing Responsive Issues**: None. Spacing and touch targets comply with mobile tap standards (minimum 44x44px).

## 8. SEO & Accessibility
- **Heading Hierarchy**: Does not contain heading tags directly, which is appropriate for a global landmark header. Brand name is conveyed via the logo image `alt="SHIVOM GLOBAL"` and wrapper link `aria-label="SHIVOM GLOBAL — Indian Tea Sourcing & Export"`.
- **Semantic HTML**: Uses semantic `<header className="site-header">`, `<nav aria-label="Main Navigation">`, `<a>`, and `<button>`.
- **Image Alt Attributes**: `alt="SHIVOM GLOBAL"` on header logo image.
- **ARIA Attributes**:
  - `<nav aria-label="Main Navigation">`
  - Mobile button has `aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}`, `aria-expanded={mobileMenuOpen}`, `aria-controls="mobile-nav-drawer"`.
  - Mobile drawer has `role="dialog"`, `aria-modal="true"`, `aria-label="Site Navigation"`.
  - Icon components have `aria-hidden="true"`.
- **Keyboard Accessibility**:
  - All interactive elements are native `<a>` or `<button>` elements with tabindex 0.
  - ESC key listener automatically closes the mobile drawer when opened.
  - Visual focus indicator enabled across all navigation items.
- **Relevant SEO Considerations**: Anchor links allow search crawlers to discover all 5 primary sections with human-readable anchor labels.

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**:
  - Depends on DOM IDs existing on the page: `hero`, `our-teas`, `tea-by-grade`, `private-label`, `how-it-works`, `why-us`, `requirement-form`.
- **Shared Components**: None.
- **Global CSS Dependencies**:
  - Requires variables from `src/styles/tokens.css`.
  - Requires `.btn`, `.btn-primary` utility classes from `src/styles/index.css`.
- **API Dependencies**: None.
- **Navigation Dependencies**:
  - Prop callbacks: `onNavigate(targetId)` and `onRequestSamples()`.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC01-01` | Scroll-spy re-calculates on every raw scroll event | Wrap scroll listener in `requestAnimationFrame` throttle for high refresh rate displays | Low | Open |
| `SEC01-02` | Mobile drawer does not lock body scroll when open | Add `document.body.style.overflow = 'hidden'` when `mobileMenuOpen` is true | Medium | Open |
| `SEC01-03` | Hardcoded 74px offset in click handler | Reference CSS custom variable or element height dynamically | Low | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - Header is fixed at the top with 74px height.
  - Brand logo renders cleanly on dark background.
  - Scrolled state activates blur and subtle border when scrolling past 20px.
- **Functional Verification**:
  - Clicking any of the 5 nav links scrolls to the correct section with 74px offset.
  - "Request a Quote" CTA triggers the form focus/scroll.
  - Scroll-spy correctly highlights the active section during vertical scrolling.
- **Desktop Verification**:
  - Tested on 1440px and 1280px screen widths. All 5 links and CTA fit without wrapping.
- **Tablet Verification**:
  - Tested on 1024px and 768px screen widths. Smooth transition to mobile toggle at 768px.
- **Mobile Verification**:
  - Tested on 375px and 414px mobile viewports.
  - Drawer opens smoothly, items are easily clickable, pressing ESC or clicking a link closes the drawer.
- **Regression Testing**:
  - Verify z-index (1000) stays above hero canvas and below modal overlays.
- **Performance Checks**:
  - No layout thrashing or stutter during scroll state transition.

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/01_HEADER.md` | Verified against `SiteHeader.tsx` & `src/styles/index.css` |

