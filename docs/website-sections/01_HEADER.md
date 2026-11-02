# 01 — Site Header (Header & Navigation)

## 1. Section Overview
- **Section ID**: `sec-01` / `<header className="site-header" role="banner">`
- **Section Name**: Site Header & Navigation
- **Position on Website**: Top of viewport, persistent across scroll (`position: sticky; top: 0; z-index: 1000`). Renders as the first landmark component on the page.
- **Main Purpose**: Provides corporate identity branding, sticky navigation across the 5 core sourcing sections with rAF-throttled scroll-spy detection, immediate access to direct quote submission, background scroll locking on mobile, and accessible drawer navigation.
- **Target Audience**: International B2B tea importers, overseas procurement managers, tea blenders, packaging brand partners who need rapid navigation across the sourcing portfolio, grade specifications, and direct quotation intake.
- **Business Objective**: Establish institutional credibility through clean corporate presentation, maintain continuous conversion pathway via the persistent "Request a Quote" CTA button, and facilitate frictionless one-click scrolling to key commercial decision points.

## 2. Current Implementation
- **Existing Design Description**: Deep Forest dark background (`var(--color-primary-dark): #072218`) with crisp Warm Gold (`var(--color-gold): #C59B27`) active indicators. When scrolled past 20px, it dynamically transitions into a high-density blurred backdrop (`rgba(7, 34, 24, 0.96)`, `backdrop-filter: blur(16px)`) with a subtle gold-tinted bottom border (`rgba(197, 155, 39, 0.28)`) and an elevated drop shadow.
- **Existing Layout**: Single horizontal flex container (`.header-container`) constrained to `var(--container-max-width, 1240px)` matching the rest of the site with 74px fixed height (`height: 74px`). Left: Brand logo; Center: 5 desktop navigation links; Right: Primary conversion CTA ("Request a Quote"). On screens <= 1024px, desktop navigation and desktop CTA collapse into a clean 44x44px hamburger button with a full-screen blurred backdrop scrim and an animated modal drawer.
- **Content Structure**:
  - Brand Logo anchor linking to `#hero` with explicit width (192px), height (48px), and 4:1 aspect-ratio hints to eliminate layout shifts.
  - Desktop Navigation (`<nav aria-label="Main Navigation">`) containing 5 text anchor links:
    1. "Tea Sourcing" (`#our-teas`)
    2. "Grades & Specs" (`#tea-by-grade`)
    3. "Private Label" (`#private-label`)
    4. "Sourcing Flow" (`#how-it-works`)
    5. "Export Compliance" (`#why-us`)
  - Primary Action CTA: "Request a Quote" linking to `#requirement-form` with animated right chevron arrow micro-interaction.
  - Mobile Menu Toggle: Accessible `<button>` (44x44px min tap area) with `ref`, toggling between `Menu` (24px) and `X` (24px) icons.
  - Mobile Backdrop Scrim (`.mobile-drawer-backdrop`): Fixed semi-transparent blurred backdrop covering viewport below header, enabling 1-click outside to close.
  - Mobile Drawer (`#mobile-nav-drawer`): Vertical link stack with chevron arrows, active status borders, and full-width "Request a Quote" conversion button.
- **Visual Elements**:
  - High-resolution SVG brand header logo: `/Shivom_Global_Header_Logo.svg`.
  - Gold underlines and active background tints on active navigation links.
  - Smooth backdrop-filter blur on scroll with zero layout jitter.
- **Current Functionality**:
  - Single consolidated scroll listener utilizing `requestAnimationFrame` throttling, completely eliminating DOM layout thrashing.
  - Reference-guarded state updates (`isScrolledRef` & `activeSectionRef`) preventing redundant React re-renders when scroll state has not changed.
  - Background body scroll locking (`document.body.style.overflow = 'hidden'`) with scrollbar-shift compensation while mobile drawer is open.
  - Keyboard accessibility: Pressing `Escape` closes the mobile drawer and automatically restores focus to the hamburger toggle.
  - Clicking the backdrop scrim closes the mobile drawer.
  - Smooth scrolling calculation (`headerOffset: 74px`) when clicking navigation anchors.
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
  - `src/styles/index.css` (Lines 490–650: Header core classes; Lines 650–785: Mobile drawer, backdrop scrim, and responsive media queries).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--color-primary-dark)` (#072218), `var(--color-accent-gold)` (#C59B27), `var(--color-accent-gold-hover)` (#B0871D), `var(--text-inverse)` (#FFFFFF), `var(--text-inverse-muted)` (#D1D5DB).
  - Spacing: `var(--space-2)` (8px), `var(--space-3)` (12px), `var(--space-4)` (16px), `var(--space-6)` (24px).
  - Layout: `var(--container-max-width, 1240px)`, `height: 74px`.
  - Radii: `var(--radius-sm)` (4px), `var(--radius-md)` (8px), `var(--radius-full)` (9999px).
  - Transitions: `var(--transition-fast)` (150ms), `var(--transition-normal)` (200ms).
- **Typography**:
  - Font: `var(--font-primary)` (Plus Jakarta Sans).
  - Weights: `var(--weight-semibold)` (600), `var(--weight-bold)` (700).
  - Font Sizes: `0.875rem` (14px) for desktop navigation links, `0.9375rem` (15px) for CTA button.
- **Layout Behaviour**:
  - Desktop: `display: flex; justify-content: space-between; align-items: center;`.
  - Sticky: `position: sticky; top: 0; z-index: 1000;`.
  - Container aligned with site grid: `max-width: var(--container-max-width, 1240px); margin: 0 auto;`.
- **Animation Styles**:
  - Background transition on scroll: `will-change: background-color, border-color, box-shadow; transition: background-color var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);`.
  - Link underline slide-in: CSS `::after` pseudo-element with `transform: scaleX(0.5)` to `scaleX(1)`.
  - Arrow micro-interaction: `.header-submit-btn:hover .header-cta-icon { transform: translateX(2px); }`.
  - Drawer slide: `@keyframes mobileDrawerSlide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`.
  - Backdrop fade: `@keyframes backdropFadeIn { from { opacity: 0; } to { opacity: 1; } }`.

## 5. Asset Mapping
- **Image Paths**: None.
- **SVG Paths**: `/Shivom_Global_Header_Logo.svg` (Rendered via `<img className="header-brand-img" src="/Shivom_Global_Header_Logo.svg" alt="SHIVOM GLOBAL" width="192" height="48" />`).
- **Video Paths**: None.
- **Icon References**: `Menu`, `X`, `ArrowRight` from `lucide-react`.
- **Fonts**: Plus Jakarta Sans (Google Fonts loaded via `index.html`).
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - Brand Logo: Scrolls page smoothly to `#hero`.
  - 5 Navigation Links: Smooth-scroll to corresponding section anchors (`#our-teas`, `#tea-by-grade`, `#private-label`, `#how-it-works`, `#why-us`) taking into account the 74px sticky header height offset.
  - "Request a Quote" CTA: Invokes `onRequestSamples()` prop if supplied, or falls back to smooth-scrolling to `#requirement-form`.
  - Mobile Menu Toggle: Flips `mobileMenuOpen` boolean state; returns focus on close.
  - Backdrop Scrim: 1-click dismisses mobile drawer.
- **Navigation**:
  - Pure anchor navigation using browser `window.scrollTo({ top: offsetPosition, behavior: 'smooth' })`.
  - Scroll-spy dynamically adds `.active` and `aria-current="page"` to the current section's nav link.
- **Form Behaviour**: N/A.
- **Interactions**:
  - Hover states on links show gold text, subtle background tint, and underline animation.
  - Primary button hover darkens background, elevates slightly, and slides the arrow icon forward.
  - Keyboard focus rings using `outline: 2px solid var(--color-accent-gold); outline-offset: 2px/3px;`.
- **Animations**:
  - Pure CSS transitions for scroll state changes and mobile drawer opacity/transform.
  - Respects `prefers-reduced-motion: reduce`.
- **API Integrations**: None.
- **External Integrations**: None.

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: Full brand cluster, horizontal list of 5 navigation links with active state indicator, and gold "Request a Quote" CTA button. Container matches 1240px site grid.
- **Tablet & Laptop (768px – 1024px)**:
  - Collapses cleanly to mobile toggle and brand logo.
  - Logo height scales to 42px (max-width 250px).
- **Mobile (375px – 767px)**:
  - Logo height scales to 36px (max-width 200px).
  - Toggle button has 44x44px minimum tap target.
  - Mobile drawer links have min-height 48px with full-width CTA button.
  - Body scroll is locked while drawer is open.
- **Small Mobile (320px – 374px)**:
  - Logo height scales to 32px (max-width 170px).
  - Container padding tightens to 12px (`var(--space-3)`).
  - No horizontal page overflow or text truncation.
- **Existing Responsive Issues**: None. All breakpoints verified.

## 8. SEO & Accessibility
- **Heading Hierarchy**: Does not contain heading tags directly; appropriate for a global landmark header. Brand name is conveyed via the logo image `alt="SHIVOM GLOBAL"` and wrapper link `aria-label="SHIVOM GLOBAL — Indian Tea Sourcing & Export (Return to top)"`.
- **Semantic HTML**: Uses semantic `<header className="site-header" role="banner">`, `<nav aria-label="Main Navigation">`, `<a>`, and `<button>`.
- **Image Alt Attributes**: `alt="SHIVOM GLOBAL" width="192" height="48"` on header logo image with `aspect-ratio: 288 / 72`.
- **ARIA Attributes**:
  - `<header role="banner">`
  - `<nav aria-label="Main Navigation">`
  - Active links have `aria-current="page"`
  - Mobile toggle button has `aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}`, `aria-expanded={mobileMenuOpen}`, `aria-controls="mobile-nav-drawer"`.
  - Mobile drawer has `role="dialog"`, `aria-modal="true"`, `aria-label="Site Navigation"`.
  - Backdrop has `aria-hidden="true"`.
  - Icon components have `aria-hidden="true"`.
- **Keyboard Accessibility**:
  - All interactive elements are native `<a>` or `<button>` elements with tabindex 0.
  - Explicit `:focus-visible` outlines using Warm Gold with offset.
  - ESC key listener automatically closes the mobile drawer and refocuses the hamburger toggle via `toggleButtonRef`.
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
| `SEC01-01` | Scroll-spy re-calculates on every raw scroll event | Wrap scroll listener in `requestAnimationFrame` throttle for high refresh rate displays | Low | **Resolved** (2026-11-02) |
| `SEC01-02` | Mobile drawer does not lock body scroll when open | Add `document.body.style.overflow = 'hidden'` when `mobileMenuOpen` is true | Medium | **Resolved** (2026-11-02) |
| `SEC01-03` | Hardcoded 74px offset in click handler | Reference CSS custom variable or element height dynamically | Low | **Resolved** (2026-11-02) |
| `SEC01-04` | Desktop container 1440px misaligned with 1240px site content | Align header container with `var(--container-max-width, 1240px)` | Medium | **Resolved** (2026-11-02) |
| `SEC01-05` | Missing click-outside backdrop on mobile drawer | Implement `.mobile-drawer-backdrop` scrim with blur and 1-click dismiss | Medium | **Resolved** (2026-11-02) |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - Header is fixed at the top with 74px height.
  - Brand logo renders cleanly without layout shift (`aspect-ratio: 288 / 72`).
  - Scrolled state activates blur and subtle gold border when scrolling past 20px.
  - CTA button arrow micro-interaction operates smoothly on hover.
- **Functional Verification**:
  - Clicking any of the 5 nav links scrolls to the correct section with 74px offset.
  - "Request a Quote" CTA triggers the form focus/scroll.
  - Scroll-spy correctly highlights the active section during vertical scrolling without layout thrashing.
  - Clicking mobile drawer links closes menu and scrolls smoothly to target.
  - Clicking outside mobile drawer on backdrop scrim closes drawer.
- **Desktop Verification**:
  - Tested on 1440px and 1280px screen widths. Logo and CTA align with site grid. All 5 links fit without wrapping.
- **Tablet Verification**:
  - Tested on 1024px and 768px screen widths. Smooth transition to mobile toggle at 1024px.
- **Mobile Verification**:
  - Tested on 375px and 414px mobile viewports.
  - Tested on 320px small mobile viewports (logo scales to 32px, padding tightens).
  - Drawer opens smoothly, body scroll is locked, pressing ESC closes drawer and restores focus.
- **Regression Testing**:
  - Verify z-index (1000) stays above hero canvas and below modal overlays.
  - Verify that body scroll is restored upon drawer close or unmount.
- **Performance Checks**:
  - Scroll event runs at 60fps / 120fps with zero layout thrashing or stutter.
  - Production build bundle size verified.

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/01_HEADER.md` | Verified against `SiteHeader.tsx` & `src/styles/index.css` |
| 2026-11-02 | **Part 01 Header Improvement**: Implemented rAF-throttled scroll listener with reference guards; background body scroll locking with scrollbar shift compensation; mobile backdrop scrim for 1-click close; keyboard ESC focus restoration; container grid alignment to 1240px; explicit logo dimensions & aspect-ratio; accessible `:focus-visible` rings and `aria-current="page"`. | `src/components/layout/SiteHeader.tsx`, `src/styles/index.css`, `docs/website-sections/01_HEADER.md` | Verified via `tsc && vite build` (pass, 0 errors) |
