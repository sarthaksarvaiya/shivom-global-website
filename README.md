# SHIVOM GLOBAL — International B2B Tea Sourcing & Export Website

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6.svg)](https://www.typescriptlang.org/)
[![CSS](https://img.shields.io/badge/Style-Vanilla%20CSS%20Tokens-0D3829.svg)](src/styles/tokens.css)
[![Status](https://img.shields.io/badge/Status-Production--Ready%20Homepage-C59B27.svg)](#)

> **"Indian Tea Sourced for International Markets — Bulk Supply & Private Label"**  
> Direct requirement-led sourcing of authentic Indian teas (Assam CTC, Orthodox, Darjeeling GI, and Green Tea) engineered specifically for international commercial buyers, blenders, packers, and supermarket private-label procurement managers.

---

## 1. Executive Overview

**SHIVOM GLOBAL** is an Indian merchant export firm based in Bhavnagar, Gujarat, India. This repository contains the public-facing international B2B digital gateway engineered around a strict **"Buyer-First, Inventory-Last"** capital discipline.

Instead of traditional company-first marketing fluff or unverified claims, the platform allows commercial tea buyers to evaluate tea origins, technical particle grades, export packaging, and transparent logistics within **10–15 seconds**, and submit structured sourcing specifications directly to the trade desk.

---

## 2. Core Governance & Business Mandates

All content and architecture strictly adhere to the following ratified business governance rules:

- **`DEC-001` (Core Capital Discipline):** *"Buyer-First, Inventory-Last"* — Strictly zero speculative procurement or warehouse inventory stockpiling. Every shipment is freshly procured against confirmed buyer specifications from primary Assam auctions and vetted estate partners.
- **`DEC-002` (Product-Neutral Corporate Identity):** **SHIVOM GLOBAL** operates as an international merchant export brand identity.
- **`DEC-003` (Legal Entity):** Sole Proprietorship (**Sarthak Sarvaiya**), Bhavnagar, Gujarat, India. Registered under Udyam MSME (`UDYAM-GJ-05-XXXXXXX`).
- **`DEC-005` (Primary Product Benchmark):** Assam CTC BOP as the primary working volume benchmark, flexible to buyer particle requirements.
- **`DEC-008` (Capital Discipline):** ₹0 deployed in speculative stock.
- **Rule 02 (Anti-Fabrication & Truth in Operations):** Strictly zero fake counters, zero unsupported garden ownership claims, zero unverified certifications, and zero fabricated backend confirmations.

---

## 3. Technology Stack

- **Core Framework:** [React 18](https://react.dev/) (Single Page Application)
- **Build Tool & Bundler:** [Vite 6](https://vitejs.dev/) with `@vitejs/plugin-react`
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **Styling System:** Vanilla CSS Design System with CSS Custom Properties / Tokens ([src/styles/tokens.css](src/styles/tokens.css))
- **Iconography:** [Lucide React](https://lucide.dev/)
- **Typography:** Google Fonts — *Plus Jakarta Sans* (Narrative & Headings) & *Space Grotesk* (Technical Tea Specifications & Grade Acronyms)

---

## 4. Homepage Architecture & Features

The public gateway is structured as an intentional 8-section discovery funnel:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER: Sticky Nav + Official Logo Plaque + Mobile Drawer       │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 1: HERO — B2B Positioning & Dual Buyer CTAs                    │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 2: "WHAT ARE YOU LOOKING FOR?" — Buyer Requirement Router      │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 3: OUR TEA — Sourcing Categories & Terroirs (Assam/Darjeeling) │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 4: TEA BY GRADE — Technical Grading Matrix (BOP through Dust)  │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 5: HOW WE WORK — Transparent 6-Stage Sourcing Roadmap          │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 6: WHY BUYERS WORK WITH US — 6 Commercial Credibility Pillars  │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 7: PRIVATE LABEL & PACKAGING — OEM Contract Packing Solutions  │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 8: BUYER REQUIREMENT FORM — 11-Field Lead Intake Engine        │
├────────────────────────────────────────────────────────────────────────┤
│ GLOBAL FOOTER: Legal Disclosures, Sourcing SLA, Entity Status          │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Interactive Components

1. **`SiteHeader`:** Responsive sticky header with official brandmark, desktop anchor links, and mobile slide-down drawer (`<1024px`).
2. **`HeroSection`:** Dark Deep Forest background (`#072218`) with atmospheric tea plantation visuals, primary conversion CTAs, trust chips, and 4 commercial value pillars.
3. **`RequirementRouter`:** 6-card interactive selector (Bulk Supply, Assam CTC, Orthodox, Private Label, Specific Grade, Export Supply) that smoothly scrolls and auto-fills the requirement form.
4. **`TeaCatalog`:** Detailed specifications for Assam CTC, Orthodox Black Tea, Darjeeling GI Specialty, and Indian Mountain Green Tea (cup color, liquor dynamics, milk reactivity, applications).
5. **`GradeMatrix`:** Tea Board India auction taxonomy (BOP, BOPSM, BP, PF, PD, Dust / CD) with interactive specification viewer and quote triggers.
6. **`ExportProcessFlow`:** 6-step commercial roadmap (Intake $\rightarrow$ Sourcing $\rightarrow$ Sampling $\rightarrow$ Proforma $\rightarrow$ Packing $\rightarrow$ Port Dispatch).
7. **`WhyShivomGlobal`:** 6 B2B credibility pillars detailing requirement-based sourcing, laboratory testing, 25kg multi-wall kraft barrier packing, export documentation, and founder communication.
8. **`PrivateLabelSection`:** 4-step OEM journey (Formulation, Packaging, Bilingual Compliance, Scalable Trial Batches) with support for pouches, canisters, tins, and tea bags.
9. **`BuyerRequirementForm`:** Comprehensive 11-field intake engine with client validation (RFC 5322 email regex, international phone validation, field limits), honeypot spam protection, error recovery banner, and structured parameter summary.
10. **`SiteFooter`:** Entity registration disclosure (Sole Proprietorship / Udyam MSME), Bhavnagar base, shipping Incoterms (FOB/CIF), and trade SLA.

---

## 5. Visual Design System

The visual language follows the locked **Phase 2 Design System**:

- **Color Distribution:** Light surfaces ~70% (`#FBFBFA` / `#FFFFFF`), Dark surfaces ~25% (`#0D3829` / `#072218`), Warm Gold accents $\le 5\%$ (`#C59B27`).
- **Official Brandmark Preservation:** Official vector logo (`Shivom_Global_Logo.svg`) retains its original metallic gold gradients and deep maritime navy typography, enclosed in clean white plaques.
- **Button Primitives:** High-contrast Warm Gold conversion buttons (`.btn-primary`), Deep Estate Green outline buttons (`.btn-secondary`), and dark surface variants (`.btn-secondary-dark`).
- **Cards:** Crisp white modules with 1px subtle borders (`#E5E7EB`), 8px radii, and gold hover highlights.

---

## 6. Repository Structure

```text
SHIVOM GLOBAL WEBSITE/
├── public/
│   ├── images/
│   │   └── hero-bg.jpg                  # Authentic Assam tea plantation photography
│   ├── Shivom_Global_Logo.svg           # Official vector brandmark (unaltered)
│   └── Shivom Global Trade.png          # High-resolution raster brand asset
├── src/
│   ├── app/
│   │   └── App.tsx                      # Root application component
│   ├── components/
│   │   ├── foundation/
│   │   │   └── DesignSystemFoundation.tsx # Phase 2 visual foundation test harness
│   │   ├── home/
│   │   │   ├── BuyerRequirementForm.tsx # 11-field commercial lead intake form
│   │   │   ├── ExportProcessFlow.tsx    # 6-step export sequence
│   │   │   ├── GradeMatrix.tsx          # Tea Board auction grading table
│   │   │   ├── HeroSection.tsx          # B2B hero section & CTAs
│   │   │   ├── HomePage.tsx             # Master homepage assembler & state router
│   │   │   ├── PrivateLabelSection.tsx  # OEM & contract packing capabilities
│   │   │   ├── RequirementRouter.tsx    # "What Are You Looking For?" 6-card router
│   │   │   ├── TeaCatalog.tsx           # Terroir & tea classification grid
│   │   │   └── WhyShivomGlobal.tsx      # 6 credibility & integrity pillars
│   │   └── layout/
│   │       ├── SiteFooter.tsx           # Corporate disclosures & legal strip
│   │       └── SiteHeader.tsx           # Sticky navigation & mobile drawer
│   ├── services/
│   │   └── submissionAdapter.ts         # Boundary adapter (PREVIEW mode -> Future Backend)
│   ├── styles/
│   │   ├── index.css                    # Primitives, grid, buttons, cards, typography clamps
│   │   └── tokens.css                   # Core design tokens (colors, fonts, spacing, shadows)
│   ├── types/
│   │   └── buyerRequirement.ts          # TypeScript taxonomies & data schemas
│   ├── utils/
│   │   └── requirementValidation.ts     # Input sanitization, RFC 5322 regex, ref generator
│   └── main.tsx                         # DOM mount entrypoint
├── index.html                           # Semantic HTML5 entrypoint with preconnected fonts
├── package.json                         # Dependencies & npm scripts
├── tsconfig.json                        # Strict TypeScript compiler options
├── vite.config.ts                       # Vite server configuration (port 5174, path alias)
├── WEBSITE_INFORMATION_ARCHITECTURE_AND_PLAN.md # Master architectural blueprint
├── WEBSITE_PHASE_2_DESIGN_SYSTEM_AND_TASK_LOG.md # Phase 2 execution record
├── WEBSITE_PHASE_3_HOMEPAGE_COMPONENTS_AND_TASK_LOG.md # Phase 3 execution record
└── WEBSITE_PHASE_4_BUYER_REQUIREMENT_ENGINE_AND_TASK_LOG.md # Phase 4 execution record
```

---

## 7. Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/sarthaksarvaiya/shivom-global-website.git

# Navigate into the project directory
cd "SHIVOM GLOBAL WEBSITE"

# Install project dependencies
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

The application will be accessible at:  
👉 **`http://127.0.0.1:5174/`**

### Production Build & Verification

Compile TypeScript and build the optimized production bundle:

```bash
npm run build
```

The compiled assets will be written to the `dist/` directory (compiled in < 1 second with 0 errors).

To preview the production build locally:

```bash
npm run preview
```

---

## 8. Current Phase Status & Roadmap

- [x] **Phase 1: Information Architecture & Blueprint** (`COMPLETED & RATIFIED`)
- [x] **Phase 2: Design System & Visual Foundation** (`COMPLETED & RATIFIED`)
- [x] **Phase 3: Homepage Components & Claim Audit** (`COMPLETED & RATIFIED`)
- [x] **Phase 4: Buyer Requirement Engine Hardening** (`COMPLETED & RATIFIED`)
- [ ] **Phase 5: Backend Submission Pipeline & Verification** (`LOCKED — PENDING FOUNDER EXECUTION`)
  - Integration of `DEC-WEBSITE-02` Option 4: Dual Pipeline (Serverless Function + Supabase DB `buyer_requirements` + Transactional Email to `shivomglobal1010@gmail.com`)
  - Verification of 10 Category-B commercial capability claims
  - Real corporate email & WhatsApp channel configuration
- [ ] **Phase 6: Production Hosting & SEO Launch** (`UPCOMING`)
  - Platform deployment (Vercel / Cloudflare Pages)
  - Custom domain binding & SSL certificate
  - OpenGraph / Twitter Cards, `robots.txt`, and `sitemap.xml`

---

## 9. Corporate Information

- **Enterprise Name:** SHIVOM GLOBAL
- **Entity Type:** Sole Proprietorship
- **Founder & Principal:** Sarthak Sarvaiya
- **Headquarters:** Bhavnagar, Gujarat, India
- **Registration:** Udyam MSME Registered (`UDYAM-GJ-05-XXXXXXX`)
- **Primary Sector:** Indian Tea Sourcing & Merchant Export

---

## 10. License

Copyright © 2026 **SHIVOM GLOBAL**. All rights reserved.  
Proprietary commercial software. Unauthorized copying, modification, or distribution is strictly prohibited.
