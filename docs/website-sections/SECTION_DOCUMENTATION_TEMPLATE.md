# Section Documentation Template — SHIVOM GLOBAL

> **Instructions for Developers**: 
> 1. Copy this template to create a new section documentation file (e.g., `11_NEW_SECTION.md`).
> 2. Fill out all 12 sections based strictly on the actual implementation in the codebase.
> 3. Do not invent source code paths, component names, or features. If something is unknown or unverified, mark it as `"Not Verified"`.
> 4. Use exact relative paths from the repository root (e.g., `src/features/...`).
> 5. Keep documentation technical, complete, and concise.

---

# [Section Name]

## 1. Section Overview
- **Section ID**: `[e.g., sec-01 or HTML anchor ID like #our-teas]`
- **Section Name**: `[Human-readable title of the section]`
- **Position on Website**: `[Ordinal position on the page, e.g., Section 1 of 10, rendered directly below SiteHeader]`
- **Main Purpose**: `[What this section accomplishes for the buyer]`
- **Target Audience**: `[Specific buyer persona, e.g., International tea importers, packet tea blenders, private-label brand owners]`
- **Business Objective**: `[Core commercial goal, e.g., Lead capture, spec validation, sample request generation]`

## 2. Current Implementation
- **Existing Design Description**: `[Detailed description of visual layout, background, themes, framing]`
- **Existing Layout**: `[Grid, flexbox, split-screen, sticky container, container max-width]`
- **Content Structure**: `[Headings, paragraphs, badges, data rows, tables, lists, CTAs]`
- **Visual Elements**: `[Icons, imagery, canvas animations, badges, borders, gradients]`
- **Current Functionality**: `[Interactive states, tab switching, filtering, dialog toggling, scroll events]`

## 3. Component Mapping
- **React Component Name**: `[e.g., ExportProcessSection]`
- **Exact Source File Path**: `[e.g., src/features/export-process/components/HowItWorksSection.tsx]`
- **Related Subcomponents**: `[List any child or internal subcomponents, or 'None (self-contained)']`
- **Shared Components**: `[List any shared layout/ui components used, e.g., SiteHeader, WhatsAppFloat]`

## 4. Styling Mapping
- **CSS File Paths**: `[e.g., src/styles/index.css (lines X–Y), src/styles/tokens.css]`
- **Design Tokens**: `[Tokens utilized, e.g., --color-primary-dark, --color-gold, --space-8, --radius-md]`
- **Typography**: `[Fonts utilized: --font-primary (Plus Jakarta Sans), --font-mono (Space Grotesk), weights, clamp font sizes]`
- **Colors**: `[Palette tokens used for backgrounds, borders, typography, accents]`
- **Spacing**: `[Padding, margins, gap scales using 8px base grid tokens]`
- **Layout Behaviour**: `[CSS flex, grid, sticky positioning, overflow rules]`
- **Animation Styles**: `[Framer Motion/Motion transitions, CSS transitions, keyframes, scroll triggers]`

## 5. Asset Mapping
- **Image Paths**: `[Exact paths from /public, e.g., /images/assam-ctc-spotlight.jpg, or 'None']`
- **SVG Paths**: `[Exact paths from /public, e.g., /Shivom_Global_Header_Logo.svg, or 'None']`
- **Video Paths**: `[Exact paths or 'None']`
- **Icon References**: `[Lucide icons imported, e.g., ArrowRight, Check, Package from 'lucide-react']`
- **Fonts**: `['Plus Jakarta Sans' (Primary), 'Space Grotesk' (Monospace specs)]`
- **Other Assets**: `[Canvas frame sequences, audio, json, etc.]`

## 6. Functional Behaviour
- **Buttons and CTAs**: `[Every button/link, its label, target, and click handler]`
- **Navigation**: `[Internal smooth scrolling anchors, external links, tabs, drawers]`
- **Form Behaviour**: `[Inputs, selects, textareas, validation logic, honeypots, state synchronization]`
- **Interactions**: `[Hover effects, focus rings, clicks, active state toggles, keyboard controls]`
- **Animations**: `[Motion transitions, AnimatePresence, rAF loops, hardware-accelerated transforms]`
- **API Integrations**: `[Vercel Serverless Functions, REST endpoints, payload structures, or 'None']`
- **External Integrations**: `[WhatsApp Trade Desk API (wa.me), Mailto links, Supabase DB, Resend Email API]`

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: `[Desktop layout, grid columns, padding, navigation style]`
- **Tablet (769px – 1024px)**: `[Tablet layout adjustments, wrapping, container padding]`
- **Mobile (<= 768px & <= 480px)**: `[Mobile layout, single-column stacks, hamburger drawer, horizontal scroll]`
- **Existing Responsive Issues**: `[Document any observed text truncation, overflow, or spacing anomalies]`

## 8. SEO & Accessibility
- **Heading Hierarchy**: `[H1, H2, H3, H4 hierarchy analysis, semantic sequencing]`
- **Semantic HTML**: `[Use of <header>, <nav>, <section>, <main>, <article>, <table>, <button>, <a>]`
- **Image Alt Attributes**: `[Detailed alt text audit for all images and decorative aria-hidden tags]`
- **ARIA Attributes**: `[aria-label, aria-expanded, aria-controls, aria-labelledby, role attributes]`
- **Keyboard Accessibility**: `[Tab order, focus-visible outlines, Enter/Space/Escape key handlers]`
- **Relevant SEO Considerations**: `[Keywords, Schema.org entities, OpenGraph tags, prerendered HTML shell]`

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**: `[Cross-section state, scroll triggers, anchor targets]`
- **Shared Components**: `[Dependencies on layout primitives, contact constants, utility hooks]`
- **Global CSS Dependencies**: `[Dependencies on reset, tokens.css, utility classes (.container, .btn, .font-spec)]`
- **API Dependencies**: `[Dependencies on /api/buyer-requirements, Supabase, Resend]`
- **Navigation Dependencies**: `[Anchor IDs (#hero, #our-teas, #tea-by-grade, #private-label, #how-it-works, #why-us, #requirement-form)]`

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `[SEC-01]` | `[Observed issue in current implementation]` | `[Recommended enhancement]` | `[Low/Medium/High]` | `[Open/In Progress/Resolved]` |

## 11. Testing & Acceptance Criteria
- **Visual Verification**: `[Visual checkpoints, alignment, brand color adherence, typography]`
- **Functional Verification**: `[Click handlers, form inputs, state sync, links, WhatsApp redirection]`
- **Desktop Verification**: `[Verification on 1440px / 1280px viewports]`
- **Tablet Verification**: `[Verification on 1024px / 768px viewports]`
- **Mobile Verification**: `[Verification on 414px / 375px viewports]`
- **Regression Testing**: `[Check that modifications do not break adjacent sections or global styles]`
- **Performance Checks**: `[FPS, Core Web Vitals (LCP, CLS, INP), DOM node count, bundle size]`

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial documentation created from source inspection | `docs/website-sections/...` | Verified against source files |

