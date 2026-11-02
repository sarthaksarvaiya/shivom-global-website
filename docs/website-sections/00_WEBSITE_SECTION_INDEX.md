# 00 — Master Website Section Index | SHIVOM GLOBAL

> **Central Technical Control Document**  
> **Repository**: `SHIVOM GLOBAL WEBSITE`  
> **Last Updated**: 2026-11-02  
> **Documentation System**: `docs/website-sections/`  
> **Single Source of Truth**: Active codebase (`src/`, `public/`, `api/`, `supabase/`)

---

## 1. Website Overview

**SHIVOM GLOBAL** (`https://shivom-global-website.vercel.app/`) is a specialized B2B Indian tea sourcing and bulk export desk based in Bhavnagar, Gujarat, India (Proprietor: Sarthak Sarvaiya; GSTIN: `24KWEPS2703C1ZQ`; Udyam MSME: `UDYAM-GJ-05-0105835`). 

The website functions as an institutional trade desk connecting international tea importers, commercial blenders, packaging distributors, and supermarket private-label brands across the GCC (UAE, Saudi Arabia), Europe, North America, and Central Asia with authentic Indian origin tea production centers (Assam Brahmaputra Valley, Upper Assam terroirs, Darjeeling Himalayan foothills, and high-elevation green tea terroirs).

### Core Architectural Principles
1. **Buyer-First Sourcing (Zero Inventory Push)**: The platform never presents speculative standing stock; every commercial arrangement is structured around buyer-specified grades, mesh cuts, volume requirements, and destination ports.
2. **Organoleptic Pre-Verification**: Commercial contracts are preceded by physical counter-sample cupping to verify dry leaf appearance, liquor infusion, and extraction briskness.
3. **Statutory Export Readiness**: Institutional compliance with Indian statutory trade documentation (Phytosanitary Certificates, Chamber of Commerce Certificates of Origin, Ocean Bills of Lading, Customs Shipping Bills).
4. **Single-Page Architecture with Section Modularization**: The entire user journey is contained within an optimized, single-page application (SPA) with smooth-scrolling anchors, allowing developers to refactor, style, or enhance one section at a time without breaking adjacent features.

---

## 2. Current Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Core Framework** | React | `^18.3.1` | Component-based UI view layer |
| **Language** | TypeScript | `^5.6.3` | Strict static typing across components, models & API payloads |
| **Build & Dev Tool** | Vite | `^6.0.1` | Ultra-fast HMR and optimized production bundling |
| **Animation Engine** | Motion (Framer Motion) | `^14.9.0` | Declarative transitions, tab layouts, and accessibility reductions |
| **Iconography** | Lucide React | `^0.468.0` | Consistent vector iconography |
| **Styling & Tokens** | Vanilla CSS + Design Tokens | Native CSS3 | Zero-runtime CSS variables (`tokens.css` & `index.css`) |
| **Canvas Engine** | HTML5 2D Canvas | Native GPU | 40-frame scroll-driven leaf cupping sequence with rAF scrubbing |
| **Serverless Backend** | Node.js Serverless Function | Node 18+ (Vercel) | `POST /api/buyer-requirements` endpoint with rate limiting |
| **Database** | Supabase (PostgreSQL) | PostgreSQL 15 | Relational table `public.buyer_requirements` with RLS protection |
| **Transactional Email**| Resend / Email API | REST API | Automated trade desk notification dispatched to `shivomglobal1010@gmail.com` |
| **Typography** | Google Fonts | Web Fonts | Plus Jakarta Sans (Primary/Display) & Space Grotesk (Monospace specs) |

---

## 3. Section Tracking & Status Table

| ID | Section Name | Documentation File | Implementation Status | Documentation Status | Priority |
|---|---|---|---|---|---|
| `sec-01` | Site Header & Navigation | [`01_HEADER.md`](./01_HEADER.md) | **Implemented** | Complete | P1 (Core Nav) |
| `sec-02` | Hero Section & Scroll Canvas | [`02_HERO_SECTION.md`](./02_HERO_SECTION.md) | **Implemented** | Complete | P1 (Visual/Hero) |
| `sec-03` | Tea Categories & Sourcing Portfolio | [`03_TEA_CATEGORIES.md`](./03_TEA_CATEGORIES.md) | **Implemented** | Complete | P1 (Core Product) |
| `sec-04` | Tea Origins & Grades Specification Table | [`04_TEA_ORIGINS_AND_GRADES.md`](./04_TEA_ORIGINS_AND_GRADES.md) | **Implemented** | Complete | P1 (Spec Data) |
| `sec-05` | Private Label & Packaging Support | [`05_PRIVATE_LABEL.md`](./05_PRIVATE_LABEL.md) | **Implemented** | Complete | P2 (Service Scope) |
| `sec-06` | Sourcing & Export Pathway (How It Works) | [`06_EXPORT_PROCESS.md`](./06_EXPORT_PROCESS.md) | **Implemented** | Complete | P2 (Buyer Trust) |
| `sec-07` | Why SHIVOM GLOBAL (Compliance Console) | [`07_WHY_SHIVOM_GLOBAL.md`](./07_WHY_SHIVOM_GLOBAL.md) | **Implemented** | Complete | P2 (Credibility) |
| `sec-08` | Buyer Requirement Engine & Form | [`08_BUYER_REQUIREMENT_FORM.md`](./08_BUYER_REQUIREMENT_FORM.md) | **Implemented** | Complete | P0 (Conversion) |
| `sec-09` | Site Footer & Statutory Governance | [`09_FOOTER.md`](./09_FOOTER.md) | **Implemented** | Complete | P1 (Compliance) |
| `sec-10` | Floating WhatsApp Action Trigger | [`10_WHATSAPP_FLOAT.md`](./10_WHATSAPP_FLOAT.md) | **Implemented** | Complete | P1 (Direct Lead) |

---

## 4. Complete Website Section Sequence & Structural Breakdown

The homepage renders components inside `src/pages/HomePage.tsx` in the exact visual and structural sequence detailed below:

```mermaid
graph TD
  A[SiteHeader (sec-01)] --> B[HeroSection (sec-02)]
  B --> C[TeaCategoriesSection (sec-03)]
  C --> D[GradeSpecificationTable (sec-04)]
  D --> E[PrivateLabelSection (sec-05)]
  E --> F[HowItWorksSection (sec-06)]
  F --> G[WhyShivomGlobal (sec-07)]
  G --> H[BuyerRequirementForm (sec-08)]
  H --> I[SiteFooter (sec-09)]
  A -. Floating Overlay .-> J[WhatsAppFloat (sec-10)]
```

### Detailed Sequential Roster

#### 1. Site Header (`sec-01`)
- **Anchor**: `<header className="site-header">`
- **Component**: [`SiteHeader.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/components/layout/SiteHeader.tsx)
- **CSS**: `src/styles/index.css` (lines 490–630)
- **Primary Purpose**: Sticky brand presence, 5-link desktop navigation with scroll-spy, mobile navigation drawer, and persistent "Request a Quote" CTA.
- **Assets**: `/Shivom_Global_Header_Logo.svg`
- **Dependencies**: Lucide icons (`Menu`, `X`, `ArrowRight`).

#### 2. Hero Section (`sec-02`)
- **Anchor**: `<div id="hero" className="hero-scroll-track">`
- **Component**: [`HeroSection.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/hero/components/HeroSection.tsx)
- **Subcomponents**: `HeroScrollCanvas.tsx`, `useHeroScrollProgress.ts`, `useHeroImagePreloader.ts`, `heroAnimationUtils.ts`
- **CSS**: `src/styles/index.css` (lines 830–1050)
- **Primary Purpose**: 40-frame GPU-accelerated scroll animation depicting tea leaf cupping, H1 brand claim, 3 buyer trading highlights, dual action CTAs, and direct contact strip.
- **Assets**: 40 WebP frames (`/assets/hero/hero-frame-001.webp` to `hero-frame-040.webp`), fallback image `/images/indian_tea_landscape_hero.jpg`.
- **Dependencies**: `src/constants/contact.ts`.

#### 3. Tea Categories (`sec-03`)
- **Anchor**: `<section id="our-teas" className="tea-categories-section">`
- **Component**: [`TeaCategoriesSection.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/components/TeaCategoriesSection.tsx)
- **CSS**: `src/styles/index.css` (lines 1060–1615, 6200–6850)
- **Primary Purpose**: Introductory sourcing spectrum banner plus interactive 4-category Sourcing Console (Assam CTC, Assam Orthodox, Darjeeling, Green Tea) with liquor swatches, organoleptic cupping grid, and grade preselection.
- **Assets**: 4 photography assets (`/images/assam-ctc-spotlight.jpg`, `/images/assam-orthodox.jpg`, `/images/darjeeling-single-origin.jpg`, `/images/indian-green-tea.jpg`).
- **Dependencies**: `motion/react`, `src/constants/contact.ts`.

#### 4. Tea Origins & Grades Specification Table (`sec-04`)
- **Anchor**: `<section id="tea-by-grade" className="grade-matrix-section">`
- **Component**: [`GradeSpecificationTable.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/tea-catalog/components/GradeSpecificationTable.tsx)
- **CSS**: `src/styles/index.css` (lines 3334–3750)
- **Primary Purpose**: Technical 5-column reference table detailing 8 primary Indian auction cuts (CTC BOP, BOPSM, BP, PF, PD, Dust / Orthodox TGFOP, FBOP), manufacturing filters, organoleptic disclaimer, and custom mesh inquiry box.
- **Assets**: Inline vector icons.
- **Dependencies**: `motion/react`, `src/constants/contact.ts`.

#### 5. Private Label & Contract Packaging (`sec-05`)
- **Anchor**: `<section id="private-label" className="private-label-section">`
- **Component**: [`PrivateLabelSection.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/private-label/components/PrivateLabelSection.tsx)
- **CSS**: `src/styles/index.css` (lines 1620–2290)
- **Primary Purpose**: 3-tier packaging capabilities (Standard Bulk Export Sacks, Flexible Custom Container Packing, Retail Pouches/Tins/Bags) and destination compliance coordination banner.
- **Assets**: Editorial packaging asset `public/images/private-label-packaging.jpg` (library asset).
- **Dependencies**: Lucide icons (`Package`, `Sparkles`, `Layers`, `ShieldCheck`).

#### 6. Sourcing & Export Pathway (`sec-06`)
- **Anchor**: `<section id="how-it-works" className="how-it-works-section theme-ivory">`
- **Component**: [`HowItWorksSection.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/export-process/components/HowItWorksSection.tsx)
- **CSS**: `src/styles/index.css` (lines 5269–5520, 2582–3060)
- **Primary Purpose**: 5-stage operational milestone flow (Share Requirement -> Match Sourcing -> Counter-Sample Arranged -> Buyer Cupping Evaluation -> Commercial Discussion & Export) and live sample evaluation policy ribbon with pulsing status indicator.
- **Assets**: Inline vector icons.
- **Dependencies**: Lucide icons (`Send`, `FileSearch`, `Package`, `CheckCircle2`, `Ship`).

#### 7. Why SHIVOM GLOBAL (`sec-07`)
- **Anchor**: `<section id="why-us" className="why-shivom-section">`
- **Component**: [`WhyShivomGlobal.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/company/components/WhyShivomGlobal.tsx)
- **CSS**: `src/styles/index.css` (lines 3110–3330)
- **Primary Purpose**: Asymmetric split-screen credibility console: Left terminal showcases statutory trade documentation (Phyto, COO, Customs Shipping Bills, B/L) and loading ports (Mundra, Kandla, Kolkata, JNPT); Right console provides 4 interactive expandable trading pillars (Flexible Quantities, Requirement Sourcing, Physical Counter-Samples, Direct Desk).
- **Assets**: Inline vector icons.
- **Dependencies**: Lucide icons (`FileCheck`, `ShieldCheck`, `Package`, `Layers`, `CheckCircle2`, `MessageCircle`).

#### 8. Buyer Requirement Engine (`sec-08`)
- **Anchor**: `<section id="requirement-form" className="buyer-engine-section">`
- **Component**: [`BuyerRequirementForm.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/buyer-requirement/components/BuyerRequirementForm.tsx)
- **Subcomponents & Services**: `requirementValidation.ts`, `submissionAdapter.ts`, `buyerRequirement.ts`, `api/buyer-requirements.ts`
- **CSS**: `src/styles/index.css` (lines 4128–4520)
- **Primary Purpose**: Dual-mode quotation engine (Form A: Quick Enquiry / Samples vs Form B: Detailed Specification), honeypot anti-bot validation, API dispatch, Supabase PostgreSQL persistence, Resend email notification, and verified reference ID confirmation screen.
- **Assets**: Inline vector icons.
- **Dependencies**: `motion/react`, `api/buyer-requirements.ts`, `src/constants/contact.ts`.

#### 9. Site Footer (`sec-09`)
- **Anchor**: `<footer className="site-footer" role="contentinfo">`
- **Component**: [`SiteFooter.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/components/layout/SiteFooter.tsx)
- **CSS**: `src/styles/index.css` (lines 4525–4780)
- **Primary Purpose**: 3-column corporate footer with statutory business disclosure box (Proprietorship: Sarthak Sarvaiya, Udyam MSME, GSTIN), full internal navigation, loading ports summary, and copyright notice.
- **Assets**: `/Shivom_Global_Header_Logo.svg`.
- **Dependencies**: `src/constants/contact.ts`.

#### 10. WhatsApp Floating Trigger (`sec-10`)
- **Anchor**: `<a className="whatsapp-float">`
- **Component**: [`WhatsAppFloat.tsx`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/components/layout/WhatsAppFloat.tsx)
- **CSS**: `src/styles/index.css` (lines 5044–5095)
- **Primary Purpose**: Fixed floating action button in bottom-right corner offering 1-click messaging to the trade desk with delayed entrance (1,000ms) to preserve initial paint metrics.
- **Assets**: Inline WhatsApp vector brand SVG.
- **Dependencies**: `src/constants/contact.ts`.

---

## 5. Global Shared Dependencies & Cross-Cutting Architecture

### 1. Canonical Contact Constants (`src/constants/contact.ts`)
- **Single Source of Truth**: Contains official trade desk phone (`+91 97370 30437`), email (`shivomglobal1010@gmail.com`), statutory GSTIN (`24KWEPS2703C1ZQ`), Udyam MSME number (`UDYAM-GJ-05-0105835`), and loading port definitions.
- **Dynamic Helper Functions**:
  - `CONTACT_INFO.whatsapp.getLink(customMessage?)`: Returns encoded WhatsApp URL.
  - `CONTACT_INFO.whatsapp.getContextualLink(params)`: Generates custom messages based on category, grade, volume, and destination.

### 2. Design System Tokens (`src/styles/tokens.css`)
- **Brand Palette (65–25–10 Rule)**:
  - 65% Base: Deep Estate Green (`--color-primary`: `#0D3829`), Deep Forest (`--color-primary-dark`: `#072218`), Warm Off-White (`--bg-page`: `#FBFBFA`).
  - 25% Terroir & Surfaces: Sage Green (`--color-sage`: `#9CAF88`), Soft Sage Tint (`--color-sage-light`: `#E8EFE3`), White (`--bg-surface`: `#FFFFFF`).
  - 10% Interactive Accent: Burnt Amber (`--color-accent`: `#CC5500`), Warm Gold (`--color-gold`: `#C59B27`).
- **Typography Scale**: `Plus Jakarta Sans` (Display & Body) and `Space Grotesk` (Technical monospace specs).
- **8px Base Grid**: `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-6` (24px), `--space-8` (32px), `--space-12` (48px), `--space-16` (64px).

### 3. Serverless Backend & Database Architecture
- **API Handler**: `api/buyer-requirements.ts` running as a Vercel Serverless Function (Node.js).
- **Database Schema**: `supabase/migrations/20261021000000_buyer_requirements.sql`.
- **Row-Level Security (RLS)**: Enforced on `public.buyer_requirements`; public anon access revoked; writes handled via `service_role` backend key.

---

## 6. Consolidated Improvement Backlog

| Backlog ID | Section | Category | Description | Priority | Status |
|---|---|---|---|---|---|
| `SEC01-01` | Header | Performance | Throttle scroll-spy with `requestAnimationFrame` for high-Hz displays | Low | **Resolved** (2026-11-02) |
| `SEC01-02` | Header | UX | Lock `document.body` scroll when mobile navigation drawer is open | Medium | **Resolved** (2026-11-02) |
| `SEC01-03` | Header | Layout | Align header container with `var(--container-max-width, 1240px)` site grid | Medium | **Resolved** (2026-11-02) |
| `SEC02-01` | Hero | Performance | Implement progressive idle-loading for non-critical hero canvas frames (frames 5–40) | Medium | Open |
| `SEC03-01` | Categories | Accessibility | Implement complete WAI-ARIA Left/Right keyboard tab switching pattern | Medium | Open |
| `SEC04-01` | Grades | Feature | Add Darjeeling and Green Tea rows to the main grade matrix table | Medium | Open |
| `SEC05-01` | Private Label | Visual | Integrate visual editorial photography (`private-label-packaging.jpg`) into card layout | Medium | Open |
| `SEC07-02` | Why Shivom | Accessibility | Explicitly handle Enter/Space keydown events on interactive pillar cards | Medium | Open |
| `SEC08-01` | Form | Feature | Add optional specification document / lab report file upload (< 5MB) | Medium | Open |
| `SEC08-02` | Form | UX | Implement country autocomplete dropdown with ISO-3166 standards | Low | Open |
| `SEC10-01` | WhatsApp Float | Mobile UX | Auto-reposition or hide floating button when user is actively filling Form fields | Medium | Open |

---

## 7. Change Management & Verification Protocol

When modifying any section:
1. Consult the individual section document (`01_HEADER.md` through `10_WHATSAPP_FLOAT.md`).
2. Implement code changes strictly within that section's mapped directory.
3. Verify responsive layout, keyboard accessibility, and browser console output.
4. Record the date, description, and affected files in that section's **Section 12 (Change History)**.
5. Update this Master Index tracking table to reflect the new implementation or documentation state.

