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
- **Typography:** Google Fonts — *Plus Jakarta Sans* (Narrative & Headings) & *Space Grotesk* (Technical Tea Specifications & Grade Acron## 4. Homepage Architecture & Features

The public gateway is structured as an intentional 8-section discovery funnel:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER: Sticky Nav + Official Logo + Contextual CTAs + Drawer   │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 1: HERO — B2B Sourcing Positioning & Dual Buyer CTAs           │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 2: TEA CATEGORIES — Sourced to Buyer Requirement               │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 3: GRADE & SPECIFICATION TABLE — Particle & Cup Matrix         │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 4: PRIVATE LABEL & PACKAGING — OEM & Contract Packaging Support│
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 5: HOW IT WORKS — Truthful 5-Stage Sourcing & Evaluation Flow  │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 6: WHY SHIVOM GLOBAL — Commercial Clarity & Export Compliance  │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 7: BUYER REQUIREMENT FORM — Dual-Mode Intake Engine            │
├────────────────────────────────────────────────────────────────────────┤
│ GLOBAL FOOTER: Statutory Entity Disclosures (GSTIN / Udyam MSME)       │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Interactive Components

1. **`SiteHeader`:** Responsive sticky header with official brandmark, "Indian Tea Sourcing & Export" positioning, desktop anchor links, and mobile slide-down drawer.
2. **`HeroSection`:** Dark Deep Forest background (`#072218`) with atmospheric tea visuals, requirement-first H1 ("Source the Indian Tea You Need"), primary CTA ("Tell Us What Tea You Need"), and direct WhatsApp Trade Desk CTA.
3. **`TeaCategoriesSection`:** 4 major categories (Assam CTC, Orthodox Black Tea, Darjeeling Specialty, Indian Green Tea) framed around buyer requirement sourcing with organoleptic disclaimer.
4. **`GradeSpecificationTable`:** Technical grading matrix (BOP, BOPSM, BP, PF, PD, Dust / CD, TGFOP, FBOP) with contextual WhatsApp inquiry buttons per grade.
5. **`PrivateLabelSection`:** 4-step OEM journey (Tea Sourcing & Custom Blending, Retail Packaging Selection, Label Compliance, Flexible Trial Batches) coordinated through vetted food-grade packaging partners.
6. **`HowItWorksSection`:** Truthful 5-step sample and sourcing journey (01 Share Requirement, 02 We Match Requirement, 03 Counter-Sample Arranged, 04 Buyer Evaluation, 05 Commercial Discussion & Export).
7. **`WhyShivomGlobal`:** 6 B2B credibility pillars detailing requirement-led sourcing, quality assurance, 25kg multi-wall kraft barrier packaging, export clearance documentation, and founder communication.
8. **`BuyerRequirementForm`:** Dual-mode intake engine (Quick Quote & Detailed Requirement) capturing essential trade parameters (port, quantity, grade, target price, sample requirement) connected to `/api/buyer-requirements`.
9. **`SiteFooter`:** Statutory registration disclosure (Proprietorship: Sarthak Sarvaiya | GSTIN: `24KWEPS2703C1ZQ` | Udyam MSME Registered), Bhavnagar base, and commercial trade desk contacts.
10. **`WhatsAppFloat`:** Floating quick-access WhatsApp button configured to the verified Trade Desk number (+91 97370 30437).

---

## 5. Visual Design System

The visual language follows the locked design system:

- **Color Distribution:** Light surfaces ~70% (`#FBFBFA` / `#FFFFFF`), Dark surfaces ~25% (`#0D3829` / `#072218`), Warm Gold accents $\le 5\%$ (`#C59B27`).
- **Official Brandmark Preservation:** Official vector logo (`Shivom_Global_Logo.svg`) retains its original metallic gold gradients and deep maritime navy typography.
- **Button Primitives:** High-contrast Warm Gold conversion buttons (`.btn-primary`), Deep Estate Green outline buttons (`.btn-secondary`), and dark surface variants (`.btn-secondary-dark`).
- **Cards:** Crisp white modules with 1px subtle borders (`#E5E7EB`), 8px radii, and gold hover highlights.

---

## 6. Repository Structure

```text
SHIVOM GLOBAL WEBSITE/
├── api/
│   └── buyer-requirements.ts        # Serverless backend (Supabase DB + Resend email dispatch)
├── public/
│   ├── images/
│   │   └── indian_tea_landscape_hero.jpg # Hero landscape visual
│   ├── robots.txt                   # Search crawler directives
│   ├── sitemap.xml                  # XML sitemap
│   ├── Shivom_Global_Logo.svg       # Official vector brandmark (favicon)
│   ├── Shivom_Global_Header_Logo.svg# Primary header logo
│   └── Shivom Global Trade.png      # Social sharing OpenGraph asset (1254x1254)
├── src/
│   ├── app/
│   │   └── App.tsx                  # Root application component
│   ├── components/
│   │   ├── home/
│   │   │   ├── BuyerRequirementForm.tsx     # Section 7: Lead intake engine
│   │   │   ├── GradeSpecificationTable.tsx  # Section 3: Technical grading matrix
│   │   │   ├── HeroSection.tsx              # Section 1: Hero & B2B CTAs
│   │   │   ├── HomePage.tsx                 # Master 8-section assembler
│   │   │   ├── HowItWorksSection.tsx        # Section 5: Truthful 5-step sourcing flow
│   │   │   ├── PrivateLabelSection.tsx      # Section 4: OEM & packaging support
│   │   │   ├── TeaCategoriesSection.tsx     # Section 2: Requirement-led tea categories
│   │   │   └── WhyShivomGlobal.tsx          # Section 6: Commercial & export credibility
│   │   ├── layout/
│   │   │   ├── SiteFooter.tsx               # Global footer with statutory disclosures
│   │   │   ├── SiteHeader.tsx               # Sticky navigation with B2B positioning
│   │   │   └── WhatsAppFloat.tsx            # Floating trade desk contact
│   │   └── archive/                         # Isolated archived legacy components
│   ├── constants/
│   │   └── contact.ts                       # Contact details, GSTIN, & dynamic WhatsApp helper
│   ├── services/
│   │   └── submissionAdapter.ts             # Live API dispatch to /api/buyer-requirements
│   ├── styles/
│   │   ├── index.css                        # Layout primitives, grids, cards, responsive rules
│   │   └── tokens.css                       # Core design tokens
│   ├── types/
│   │   └── buyerRequirement.ts              # TypeScript schemas
│   ├── utils/
│   │   └── requirementValidation.ts         # RFC 5322 regex validation & sanitization
│   └── main.tsx                             # DOM mount entrypoint
├── index.html                               # Semantic HTML5 with complete OG/Twitter/Schema.org
├── package.json                             # Dependencies & build scripts
├── tsconfig.json                            # Strict TypeScript configuration
└── vite.config.ts                           # Vite configuration
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

The compiled assets will be written to the `dist/` directory (compiled in < 1.5 seconds with 0 errors).

To preview the production bundle locally:

```bash
npm run preview
```

---

## 8. Verified Corporate Information

- **Enterprise Name:** SHIVOM GLOBAL
- **Entity Type:** Sole Proprietorship
- **Proprietor:** Sarthak Sarvaiya
- **Headquarters:** Bhavnagar, Gujarat, India
- **Statutory Tax Identification (GSTIN):** `24KWEPS2703C1ZQ`
- **MSME Status:** Registered (Govt. of India Udyam MSME)
- **Primary Business:** Indian Tea Sourcing & Merchant Export
- **Trade Desk WhatsApp:** +91 97370 30437
- **Official Email:** shivomglobal1010@gmail.com

---

## 9. Current Phase Status & Roadmap

- [x] **Phase 1: Information Architecture & Blueprint** (`COMPLETED & RATIFIED`)
- [x] **Phase 2: Design System & Visual Foundation** (`COMPLETED & RATIFIED`)
- [x] **Phase 3: Homepage Components & Claim Audit** (`COMPLETED & RATIFIED`)
- [x] **Phase 4: Buyer Requirement Engine Hardening** (`COMPLETED & RATIFIED`)
- [x] **Phase 5: Backend Dual Pipeline & Dynamic WhatsApp** (`COMPLETED & VERIFIED`)
  - Integration of `/api/buyer-requirements` dual-pipeline (Supabase DB `buyer_requirements` + Resend notification to `shivomglobal1010@gmail.com`)
  - Dynamic grade-specific WhatsApp inquiry URLs with structured trade parameters
  - Statutory GSTIN (`24KWEPS2703C1ZQ`) and Udyam MSME integration
- [x] **Phase 6: Production SEO & Link Sharing** (`COMPLETED & VERIFIED`)
  - OpenGraph / Twitter Cards for social previews (WhatsApp, LinkedIn)
  - Canonical URL, robots.txt, and XML sitemap
  - Schema.org JSON-LD structured business entity metadata

---

## 10. License

Copyright © 2026 **SHIVOM GLOBAL**. All rights reserved.  
Proprietary commercial software. Unauthorized copying, modification, or distribution is strictly prohibited.
