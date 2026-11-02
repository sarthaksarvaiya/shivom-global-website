# 10 — WhatsApp Floating Button (Direct Trade Desk Float)

## 1. Section Overview
- **Section ID**: `sec-10` / `<a className="whatsapp-float">`
- **Section Name**: Floating WhatsApp Trade Desk Trigger
- **Position on Website**: Fixed floating element in the bottom-right corner of the viewport (`position: fixed; bottom: 24px; right: 24px; z-index: 999`).
- **Main Purpose**: Provide instant, omnipresent access to the direct SHIVOM GLOBAL WhatsApp trade desk (+91 97370 30437) regardless of scroll position, catering to international buyers who prefer messaging over web forms.
- **Target Audience**: B2B tea traders, overseas procurement agents, and buyers browsing from mobile devices or messaging-centric regions (GCC, Middle East, Europe, South Asia).
- **Business Objective**: Maximize conversion rate by reducing communication friction to zero, capturing high-intent leads who require instant responses on price, lot availability, or sample dispatch.

## 2. Current Implementation
- **Existing Design Description**: Circular or rounded-pill floating action button rendered in official WhatsApp brand green (`#25D366`) with crisp white SVG iconography, subtle elevation shadow, and an expanding text label on hover/desktop.
- **Existing Layout**:
  - Fixed position: `bottom: 24px; right: 24px;` (adapts to `bottom: 20px; right: 16px;` on mobile).
  - Flex layout: Center-aligned SVG icon followed by `.whatsapp-float-label` ("WhatsApp").
  - Subtle entrance animation: Starts with `opacity: 0; transform: translateY(16px)` and transitions to `.whatsapp-float-visible` (`opacity: 1; transform: translateY(0)`).
- **Content Structure**:
  - Anchor tag linking to `CONTACT_INFO.whatsapp.getLink()`.
  - Authentic vector WhatsApp brand mark SVG (`viewBox="0 0 24 24"`, 26px x 26px).
  - Text label: `<span className="whatsapp-float-label">WhatsApp</span>`.
- **Visual Elements**:
  - WhatsApp brand green background (`#25D366`).
  - White SVG icon and white typography.
  - Elevating box-shadow on hover: `box-shadow: 0 4px 14px rgba(37, 211, 102, 0.45)`.
- **Current Functionality**:
  - Delayed entrance: A 1,000ms delay (`setTimeout`) delays appearance until after the initial paint, eliminating layout shifts and visual flash.
  - Direct deep link to WhatsApp Web or native mobile app with preloaded text: `"Hi SHIVOM GLOBAL, I would like to discuss a tea sourcing requirement."`.

## 3. Component Mapping
- **React Component Name**: `WhatsAppFloat`
- **Exact Source File Path**: `src/components/layout/WhatsAppFloat.tsx`
- **Related Subcomponents**: None (fully self-contained).
- **Shared Components & Utilities**:
  - `src/constants/contact.ts` (`CONTACT_INFO` for WhatsApp number and default greeting generator).

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 5044–5095: Base float styles, visibility transitions, hover/focus states, and mobile media queries).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--color-whatsapp)` (#25D366), `var(--text-inverse)` (#FFFFFF).
  - Radii: `var(--radius-full)` (9999px).
  - Shadows: `0 4px 12px rgba(0, 0, 0, 0.15)`.
  - Transitions: `var(--transition-normal)` (200ms cubic-bezier).
- **Typography**:
  - Label: `var(--font-primary)` (Plus Jakarta Sans), 0.875rem, font-weight 700.
- **Layout Behaviour**:
  - `position: fixed; z-index: 999; display: flex; align-items: center; gap: 8px;`.
- **Animation Styles**:
  - Entrance transition: `opacity 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)`.
  - Hover bounce: `transform: scale(1.04) translateY(-2px)`.

## 5. Asset Mapping
- **Image Paths**: None.
- **SVG Paths**: Inline authentic WhatsApp SVG path in JSX.
- **Video Paths**: None.
- **Icon References**: Inline SVG (26x26).
- **Fonts**: Plus Jakarta Sans.
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - Floating link: Opens `https://wa.me/919737030437?text=...` in a new browser tab (`target="_blank" rel="noopener noreferrer"`).
- **Navigation**: External redirection to WhatsApp application or web portal.
- **Form Behaviour**: N/A.
- **Interactions**:
  - Hover expands button shadow and slightly lifts position.
  - Visible focus ring for keyboard users (`outline: 3px solid #25D366; outline-offset: 2px`).
- **Animations**: Timed CSS opacity/transform fade-in.
- **API Integrations**: None.
- **External Integrations**: WhatsApp Click-to-Chat protocol (`wa.me`).

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: Shows full floating pill with icon and "WhatsApp" label; position at `bottom: 24px; right: 24px;`.
- **Tablet (769px – 1024px)**: Maintains pill layout or collapses label to compact circle depending on screen real estate.
- **Mobile (<= 768px & <= 640px)**:
  - Collapses to circular icon button (`width: 52px; height: 52px; border-radius: 50%`) with label hidden or minimized.
  - Position adjusted to `bottom: 20px; right: 16px;` to prevent obscuring mobile content.
  - Z-index (999) keeps it above page content but below mobile navigation drawer (z-index 1000).
- **Existing Responsive Issues**: On mobile, ensure the float button does not obscure submit buttons or input fields when scrolling near the bottom of `#requirement-form`.

## 8. SEO & Accessibility
- **Heading Hierarchy**: N/A (interactive floating utility).
- **Semantic HTML**: `<a className="whatsapp-float" target="_blank" rel="noopener noreferrer">`.
- **Image Alt Attributes**: SVG has `aria-hidden="true"`.
- **ARIA Attributes**:
  - `aria-label={CONTACT_INFO.whatsapp.ariaLabel}` ("Chat with SHIVOM GLOBAL Trade Desk on WhatsApp").
  - `title="WhatsApp: +91 97370 30437"`.
- **Keyboard Accessibility**: Fully focusable via standard Tab navigation; Space and Enter trigger navigation.
- **Relevant SEO Considerations**: Anchor links to verified WhatsApp trade desk number matching Organization schema data in `index.html`.

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**: None (global overlay).
- **Shared Components**:
  - `src/constants/contact.ts`
- **Global CSS Dependencies**:
  - `src/styles/tokens.css`
- **API Dependencies**: None.
- **Navigation Dependencies**: None.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC10-01` | Floating button might cover form submit buttons on short mobile screens | Add scroll listener to hide float when user enters `#requirement-form` or position above keyboard | Medium | Open |
| `SEC10-02` | Button text is static; does not indicate online / office hours | Add small active status badge indicating trade desk response hours | Low | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - Float appears smoothly after 1 second delay.
  - WhatsApp green is vibrant and icon is sharp.
  - Button maintains fixed position during vertical page scroll.
- **Functional Verification**:
  - Clicking button opens WhatsApp in new tab with preloaded greeting.
  - Hover and focus states operate cleanly.
- **Desktop Verification**:
  - Floats at bottom-right 24px with label visible.
- **Tablet Verification**:
  - Stays clear of main content margins at 768px.
- **Mobile Verification**:
  - Fits neatly at bottom-right 16px without blocking critical interactive elements.
- **Regression Testing**:
  - Verify that mobile navigation drawer overlays above the WhatsApp float.
- **Performance Checks**:
  - Lightweight timer (1s) causes zero layout reflow or performance impact.

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/10_WHATSAPP_FLOAT.md` | Verified against `WhatsAppFloat.tsx` & `src/styles/index.css` |

