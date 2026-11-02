# 02 — Hero Section (Scroll Animation & Value Proposition)

## 1. Section Overview
- **Section ID**: `sec-02` / `<div id="hero" className="hero-scroll-track">`
- **Section Name**: Homepage Hero Section (Interactive Scroll Canvas & Primary Value Proposition)
- **Position on Website**: Directly below the sticky header. Renders as Section 1 of the main content flow.
- **Main Purpose**: Immediately communicate SHIVOM GLOBAL's core business identity as an authentic, buyer-first Indian tea sourcing and bulk export desk, provide immediate proof of product through an organoleptic 40-frame tea animation, and offer instant commercial inquiry avenues.
- **Target Audience**: Overseas commercial tea buyers, tea blenders, supermarket brand procurement directors, tea packing companies in the Middle East (GCC), Europe, North America, and Central Asia seeking direct Indian origin supply.
- **Business Objective**: Maximize first-impression authority, differentiate against generic middlemen through visual terroir credibility, and drive high-intent conversions via the primary CTA ("Tell Us What Tea You Need") and secondary trade desk WhatsApp channel.

## 2. Current Implementation
- **Existing Design Description**: Deep Forest aesthetic (`var(--color-primary-dark): #072218`) combining a 40-frame interactive scroll canvas sequence depicting the tea leaf-to-liquor transformation with a sophisticated multi-directional gradient overlay for WCAG AA text contrast.
- **Existing Layout**:
  - Sticky scroll viewport container: Outer track is `190vh` high (`.hero-scroll-track`), housing a sticky viewport (`position: sticky; top: 74px; height: calc(100vh - 74px)`).
  - 5-layer stacked composition:
    - **Layer 0**: Baseline static background image (`.hero-bg-layer`, z-index 0) using `/images/indian_tea_landscape_hero.jpg` ensuring zero blank flashes during network loading.
    - **Layer 1**: 2D Canvas sequence (`.hero-canvas-layer`, z-index 1) rendering 40 WebP animation frames with sub-frame alpha crossfading.
    - **Layer 2**: Gradient vignette overlay (`.hero-gradient-overlay`, z-index 2) blending horizontal (90deg) and vertical (180deg) Deep Forest overlays for typography legibility.
    - **Layer 3**: Semantic foreground content (`.hero-container`, z-index 3) constrained to `1240px` with a responsive two-column grid:
      - Left Column (`.hero-content`):
        - Eyebrow Badge: Amber badge with globe icon + "INDIAN TEA SOURCING • BULK & PRIVATE LABEL EXPORT".
        - Large Elegant Serif Heading: "Source the Indian Tea You Need" rendered in `var(--font-serif)` (Playfair Display).
        - Narrative Copy: Plain B2B trader message for international buyers.
        - Dual CTAs: Primary Amber CTA ("Tell Us What Tea You Need") + Secondary Outlined Enquiry CTA ("WhatsApp Trade Desk").
        - Three Trust Indicators: Buyer-First Sourcing, Counter-Sample Cupping, Global Port Logistics.
        - Direct Contact Strip: Direct links to WhatsApp and trade email.
      - Right Column (`.hero-visual-column`):
        - `HeroPackagingComposition`: Layered 3D composition with natural slate stone pedestal, stand-up foil pouch, luxury tin caddy, kraft bulk sack, and loose whole tea leaves.
    - **Layer 4**: Bottom scroll progress indicator (`.hero-progress-track`, z-index 4) rendering a gold progress line.
- **Visual Elements**:
  - 40 sequential WebP frames (`hero-frame-001.webp` to `hero-frame-040.webp`).
  - Warm Gold accents (`#C59B27`) on badges and progress indicators.
  - High-contrast text on Deep Forest green background.
- **Current Functionality**:
  - Interactive scrub: Scrolling down scrubs through the 40 frames of the tea leaf cupping journey.
  - Alpha crossfading: Smooth interpolation between adjacent frames prevents frame jumping.
  - Device pixel ratio clamping: DPR clamped to 2.0 to conserve mobile GPU VRAM.
  - Full `prefers-reduced-motion` compliance: Automatically disables sticky scrolling and canvas scrubbing for users with motion sensitivity.

## 3. Component Mapping
- **React Component Name**: `HeroSection`
- **Exact Source File Path**: `src/features/hero/components/HeroSection.tsx`
- **Related Subcomponents & Modules**:
  - `src/features/hero/components/HeroScrollCanvas.tsx` (Canvas renderer)
  - `src/features/hero/components/HeroPackagingComposition.tsx` (Realistic 3D packaging composition on slate stone platform)
  - `src/features/hero/hooks/useHeroScrollProgress.ts` (Scroll progress tracker)
  - `src/features/hero/hooks/useHeroImagePreloader.ts` (Progressive image loader)
  - `src/features/hero/utils/heroAnimationUtils.ts` (Interpolation & canvas math)
  - `src/features/hero/types/heroAnimationTypes.ts` (TypeScript types and frame constants)
- **Shared Components & Utilities**:
  - `src/constants/contact.ts` (`CONTACT_INFO` for WhatsApp links and email)
  - Icons from `lucide-react`: `ArrowRight`, `Globe2`, `MessageCircle`, `Mail`, `Package`, `CheckCircle2`

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 830–1050: Hero layout, responsive typography, highlight pills, contact links).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--color-primary-dark)` (#072218), `var(--color-accent-gold)` (#C59B27), `var(--text-inverse)` (#FFFFFF), `var(--text-muted)` (#4B5563).
  - Spacing: `var(--space-3)` (12px), `var(--space-4)` (16px), `var(--space-6)` (24px), `var(--space-8)` (32px).
  - Layout: `var(--container-max-width)` (1240px).
  - Transitions: `var(--transition-fast)`, `var(--transition-normal)`.
- **Typography**:
  - H1 Headline: `clamp(2rem, 4vw + 1rem, 3.25rem)` (32px to 52px), weight 800 (`--weight-extrabold`).
  - Narrative: `1.125rem` (18px) lead body text.
  - Highlight Pills: `0.8125rem` (13px).
  - Monospace tags: `var(--font-mono)` (Space Grotesk) on technical badges.
- **Layout Behaviour**:
  - Track: `height: 190vh; width: 100%; position: relative;`.
  - Viewport: `position: sticky; top: 74px; height: calc(100vh - 74px); display: flex; align-items: center;`.
- **Animation Styles**:
  - GPU-accelerated canvas 2D context (`{ alpha: false }`).
  - RequestAnimationFrame (rAF) throttle on scroll calculation.
  - Linear opacity crossfade (`ctx.globalAlpha = 1 - blendFactor` and `blendFactor`).

## 5. Asset Mapping
- **Image Paths**:
  - Fallback background: `/images/indian_tea_landscape_hero.jpg` (1920x1080 JPEG).
- **SVG Paths**: None (Lucide SVGs inline).
- **Video Paths**: None (Replaced by lighter, performant WebP canvas sequence).
- **Icon References**:
  - `Globe2` (Eyebrow badge & Highlight pill)
  - `Package` (Buyer-First sourcing pill)
  - `CheckCircle2` (Counter-samples pill)
  - `ArrowRight` (Primary CTA)
  - `MessageCircle` (WhatsApp button & link)
  - `Mail` (Direct email link)
- **Fonts**: Plus Jakarta Sans and Space Grotesk.
- **Other Assets**:
  - 40 WebP frame assets located at `/public/assets/hero/`:
    `hero-frame-001.webp` through `hero-frame-040.webp` (Total sequence weight: ~3.8 MB).

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - "Tell Us What Tea You Need" (Primary): Triggers `onSubmitRequirement` callback or smooth-scrolls to `#requirement-form`.
  - "WhatsApp Trade Desk" (Secondary): Opens WhatsApp Web / Mobile app with pre-filled message: `"Hi SHIVOM GLOBAL, I would like to discuss an Indian tea sourcing requirement."`.
  - Direct WhatsApp Text Link: Opens WhatsApp directly.
  - Direct Email Link: Opens default mail client targeting `shivomglobal1010@gmail.com`.
- **Navigation**: Smooth scroll down to `#requirement-form` (offset 80px).
- **Form Behaviour**: N/A (Redirects to Section 08).
- **Interactions**:
  - Scrolling through the 190vh track smoothly scrubs the canvas animation through 40 frames.
  - Hover states on CTAs brighten backgrounds and scale icons.
- **Animations**:
  - Canvas render loop throttled via `requestAnimationFrame`.
  - Dynamic `blendFactor` calculation in `calculateFrameInterpolation`.
- **API Integrations**: None directly in this section.
- **External Integrations**: WhatsApp API (`https://wa.me/919737030437?text=...`).

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**:
  - Hero content container maxWidth 620px aligned to the left half, allowing the right-side visual canvas to shine.
  - Highlight strip is horizontal flex row.
  - CTA group is horizontal flex row.
- **Tablet (769px – 1024px)**:
  - Hero content container maxWidth expands to 540px.
  - Highlight strip wraps gracefully.
  - Dual CTAs remain side by side or wrap if viewport is narrow.
- **Mobile (<= 768px & <= 480px)**:
  - Gradient overlay shifts to vertical dark gradient (`rgba(7, 34, 24, 0.85)` to `0.95`) ensuring full text legibility over canvas.
  - H1 font size reduces via `clamp()` to 28px–32px.
  - Highlight strip renders as stacked pills or 2-column grid.
  - Dual CTAs stack vertically (`width: 100%`) with minimum 48px tap targets.
  - On devices with reduced motion, track height defaults to `auto` with normal document flow.
- **Existing Responsive Issues**: On very short mobile viewports (e.g. landscape phone height < 500px), the sticky viewport content can extend beyond the screen height; users scroll naturally through the track.

## 8. SEO & Accessibility
- **Heading Hierarchy**:
  - `<h1>`: "Source the Indian Tea You Need" (The single primary H1 of the entire homepage).
- **Semantic HTML**: `<section aria-label="Indian Tea Sourcing Overview">`, `<h1>`, `<p>`, `<a>`, `<div role="region">`.
- **Image Alt Attributes**: Canvas and background layers have `aria-hidden="true"` since they are purely decorative visual atmospheric enhancements.
- **ARIA Attributes**:
  - Eyebrow and highlight regions: `role="region" aria-label="Key trading terms at a glance"`.
  - Direct contact strip: `role="region" aria-label="Direct trade desk contact channels"`.
  - Progress bar: `role="progressbar" aria-label="Tea sourcing journey scroll progress" aria-valuenow={...}`.
  - Decorative icons: `aria-hidden="true"`.
- **Keyboard Accessibility**:
  - Focusable CTAs and contact links with standard tab ordering and visible focus rings.
- **Relevant SEO Considerations**:
  - Matches the prerendered HTML shell in `index.html` where search crawlers read: `"SHIVOM GLOBAL — Indian Tea Sourcing & Export Desk"`.
  - Contains high-value B2B keyword anchors: "Assam CTC", "Orthodox", "Darjeeling", "Green Tea", "Counter-Samples", "Bulk Export".

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**:
  - Form submission targets `#requirement-form` (Section 08).
- **Shared Components**:
  - `src/constants/contact.ts`
- **Global CSS Dependencies**:
  - `src/styles/tokens.css`
  - `.container`, `.btn`, `.btn-primary`, `.btn-secondary-dark`, `.font-spec`
- **API Dependencies**: None.
- **Navigation Dependencies**: Anchor `#requirement-form`.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC02-01` | Preloader total weight is ~3.8 MB for all 40 frames | Implement progressive loading: Load Frame 1 and keyframes first, then idle-load remaining frames with `requestIdleCallback` | Medium | Open |
| `SEC02-02` | Preloader hook file header comment says "8 WebP hero frames" from Phase 3 legacy | Update docstring comments in `useHeroImagePreloader.ts` to reflect the 40-frame sequence | Low | Open |
| `SEC02-03` | Canvas resizing on mobile orientation change triggers full re-render | Debounce resize observer callback in `HeroScrollCanvas.tsx` | Low | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - H1 headline is crisp, high-contrast, and completely legible against the background.
  - Canvas renders smoothly behind text without obscuring foreground text.
  - Zero blank hero background during initial network load (Layer 0 fallback works).
- **Functional Verification**:
  - Scrolling vertically advances frame sequence from Frame 01 to Frame 40.
  - Clicking "Tell Us What Tea You Need" scrolls directly to `#requirement-form`.
  - Clicking "WhatsApp Trade Desk" opens WhatsApp with correct contextual greeting.
- **Desktop Verification**:
  - Verified on 1440px / 1920px viewports at 60fps scroll.
- **Tablet Verification**:
  - Verified on iPad portrait and landscape orientations.
- **Mobile Verification**:
  - Verified on iPhone / Android mobile viewports.
  - Dual CTAs stack cleanly with full width and finger-friendly hit areas.
- **Regression Testing**:
  - Confirm `prefers-reduced-motion` completely turns off scroll scrubbing.
- **Performance Checks**:
  - Canvas paints in under 16ms per frame (>= 60fps).
  - Zero memory leaks during component unmount.

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/02_HERO_SECTION.md` | Verified against `HeroSection.tsx`, `HeroScrollCanvas.tsx`, & assets |

