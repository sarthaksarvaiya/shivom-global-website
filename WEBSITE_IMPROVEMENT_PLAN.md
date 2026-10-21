# SHIVOM GLOBAL — Website Improvement Plan
## Master Strategic & Technical Blueprint for Next Website Phase

**Document Reference:** `SG-WEBSITE-IMPROVEMENT-PLAN-V1.0`  
**Location:** `/Users/sarthak/SHIVOM GLOBAL WEBSITE/WEBSITE_IMPROVEMENT_PLAN.md`  
**Date Established:** 2026-10-21  
**Authoritative Baselined Repositories:** 
- `/Users/sarthak/SHIVOM GLOBAL WEBSITE` (Web Application & Live Production Intake Engine)
- `/Users/sarthak/SHIVOM GLOBAL` (Business Operating System & Trade Intelligence Center)  
**Governance & Source of Truth Status:** Canonical Planning Source of Truth for Website Evolution  
**Implementation Posture:** **PLANNING ONLY — STRICTLY ZERO CODE OR WEBSITE MODIFICATIONS COMMENCED**

---

## 1. CURRENT STATE

### 1.1 Factual Snapshot of Existing Implementation
The public-facing digital gateway of **SHIVOM GLOBAL** currently operates as a high-performance Single Page Application (SPA) engineered with React 18, Vite 6, strict TypeScript 5, and a custom Vanilla CSS design system:

- **Active Production URL:** `https://shivom-global-website.vercel.app/` (Deployed via Vercel).
- **Domain Status:** Operating on Vercel deployment subdomain. Custom corporate domain (`shivomglobal.com` or equivalent) is not yet purchased or mapped; deferred for later acquisition.
- **Local Dev Server:** `http://127.0.0.1:5174/` (HTTP 200 OK verified).
- **Core Technology Stack:**
  - Runtime & Bundler: React 18.3.1 + Vite 6.0.1 (compilation time <1 second, 0 build errors).
  - Language: TypeScript 5.6.3 (strict mode enabled, full type safety).
  - Styling: Vanilla CSS design tokens (`src/styles/tokens.css`) with component utility classes (`src/styles/index.css`). Zero Tailwind CSS runtime dependencies.
  - Iconography: Lucide React (feather-style clean SVG primitives).
  - Typography: Google Fonts webfonts — *Plus Jakarta Sans* (humanist sans-serif for narrative reading) and *Space Grotesk* (technical monospace-inspired display for tea grade acronyms and parameters).
- **Current Single-Page Structure (8 Sequential Homepage Sections):**
  1. `SiteHeader`: Sticky navigation header with official vector logo mounted on a subtle gold-bordered white plaque, desktop anchor navigation, and responsive mobile slide-down drawer (`<1024px`).
  2. `HeroSection`: Atmospheric dark Deep Forest canvas (`#072218`) featuring authentic Assam tea plantation photography (`/images/hero-bg.jpg`), dual conversion CTAs (*Submit Your Requirement* and *Explore Tea Grades*), 3 trust anchor chips, and a 4-item commercial value strip.
  3. `RequirementRouter`: 6-card interactive selector answering *"What Are You Looking For?"* (Bulk Supply, Assam CTC, Orthodox, Private Label, Specific Grade, Export Supply), which smoothly scrolls and pre-selects the form.
  4. `TeaCatalog`: 2x2 presentation grid covering 4 core Indian tea categories (Assam CTC Black Tea, Orthodox Black Tea, Darjeeling GI Specialty, and Indian Green Tea) with organoleptic notes and commercial applications.
  5. `GradeMatrix`: Interactive technical grading table displaying official Tea Board India auction grades (`BOP`, `BOPSM`, `BP`, `PF`, `PD`, `Dust / CD`) with mesh sizing and liquor characteristics.
  6. `ExportProcessFlow`: 6-stage commercial export roadmap (01 Spec Intake $\rightarrow$ 02 Origin Sourcing $\rightarrow$ 03 Sample Cupping $\rightarrow$ 04 Proforma Terms $\rightarrow$ 05 Export Packing & Documentation $\rightarrow$ 06 Port Dispatch & Clearance Support).
  7. `WhyShivomGlobal`: 6 B2B credibility pillars (Requirement-Based Sourcing, Quality Parameters, 25kg Kraft Barrier Packaging, Statutory Export Documentation, Transparent Costing, Direct Founder Communication).
  8. `PrivateLabelSection`: 4-stage OEM roadmap (Formulation, Packaging, Compliance, Trial to Scale) with 4 packaging formats (Kraft Sacks, Stand-Up Pouches, Tea Bags, Metal Tins).
  9. `BuyerRequirementForm`: 11-field commercial lead intake engine with RFC 5322 email regex, international phone validation, honeypot anti-spam trap, and real-time state routing.
  10. `SiteFooter`: Entity disclosures (Sole Proprietorship under Sarthak Sarvaiya, Udyam MSME verified, Bhavnagar HQ, FOB/CIF Incoterms).

### 1.2 Intake & Lead Submission Pipeline Status
- **Backend Architecture (`DEC-WEBSITE-02` Option 4):** Live Dual-Pipeline Serverless Architecture.
- **Serverless Endpoint:** `POST /api/buyer-requirements` (Vercel Node.js Serverless Function).
- **Database Persistence:** Supabase PostgreSQL (`buyer_requirements` table created via migration `20261021000000_buyer_requirements.sql`).
- **Notification Pipeline:** Real-time transactional email dispatch via Resend API to the trade desk (`shivomglobal1010@gmail.com`).
- **Reference Identifier:** Cryptographically generated collision-resistant commercial reference code format: `SG-REQ-YYYYMMDD-XXXX`.
- **Live Verification Status:** Verified in production (commit `5651f86`). Form submissions successfully validate, persist to database, deliver email alerts, and present professional commercial confirmation screens.

### 1.3 Mobile Responsiveness Baseline
- Real mobile viewport testing on iPhone viewports (~393 × 852) verified clean rendering without horizontal overflow (`scrollWidth === clientWidth`), verified touch targets $\ge 44\text{px}$, and verified form CTA text wrapping (commit `d90c382`).

### 1.4 Business & Commercial Context
- **Entity Legal Form:** Sole Proprietorship (`Sarthak Sarvaiya`), Bhavnagar, Gujarat, India (`DEC-003`).
- **Brand Identity:** **SHIVOM GLOBAL** — Product-neutral international merchant export trade identity (`DEC-002`).
- **MSME Status:** Registered under Udyam MSME (`UDYAM-GJ-05-XXXXXXX`).
- **Core Capital Discipline:** *"Buyer-First, Inventory-Last"* (`DEC-001`, `DEC-008`). Total available capital capacity: ₹10,00,000. Currently deployed: **₹0**. Speculative inventory held: **₹0**.
- **Anti-Fabrication Mandate (Rule 02):** Strictly zero fake counters, zero claimed tea garden/plantation ownership, zero unverified certifications, and zero fabricated commercial capabilities.
- **Commercial Outreach Baseline:** Batch 1 outreach dispatched to 5 priority UAE tea prospects (`UAE001` to `UAE005`). 36-candidate UAE Tea Buyer Master Tracker maintained in the Business Operating System (`Task-1-UAE-Buyer-Research/UAE_TEA_BUYER_MASTER.xlsx`).

---

## 2. WHY WE ARE IMPROVING THE WEBSITE

### 2.1 The Strategic Shift: Beyond the Single-Page MVP
The initial website execution successfully proved the foundational technical architecture, verified design system tokens, and delivered a hardened lead capture pipeline. However, as SHIVOM GLOBAL engages international tea importers, blenders, private-label brands, and supermarket procurement managers, the existing single-page structure reveals clear commercial limitations:

1. **Perception Risk (Assam CTC Monoculture):** While Assam CTC is our primary volume benchmark (`DEC-005`), international buyers looking for orthodox black tea, Darjeeling GI reserves, green tea, or custom herbal infusions may perceive SHIVOM GLOBAL as merely an Assam CTC broker rather than an agile, comprehensive Indian tea sourcing and export partner.
2. **Private Label Under-Representation:** Private label is one of the highest-margin, highest-retention segments in the global tea trade. Currently, private label is presented as a single 4-card section on a long scrolling page. It lacks the commercial weight, packaging specifications, barrier material explanations, and MOQ clarity required to win institutional contracts.
3. **Information Architecture Density:** Stacking 8 major sections on a single URL forces buyers to scroll past irrelevant content to find what matches their business model. An importer needing 1x20ft container loads of raw BOP cut has completely different informational requirements than a specialty retail brand seeking 250g nitrogen-flushed stand-up pouches.
4. **Lack of Specification Depth:** Global tea procurement managers operate on technical parameters: mesh sizing, sieve distributions, moisture percentage, water-soluble ash, infusion color density, liquor briskness, and pesticide compliance (FSSAI / GSO 978 / EU MRLs). Concise marketing cards cannot convey the technical rigour required by commercial quality controllers.
5. **SEO & Inbound Lead Invisibility:** A single-page application cannot rank effectively for specific, high-intent commercial queries (e.g., *"bulk orthodox black tea exporter india"*, *"private label tea packaging dubai uae"*, *"darjeeling first flush bulk supplier"*). Dedicated, indexable URLs with structured schema are necessary to capture inbound commercial trade traffic.
6. **Buyer Trust & Credibility Proof:** International buyers committing tens of thousands of dollars on ocean freight require visible proof of export capabilities: sample documentation workflows (Phytosanitary, Certificate of Origin, BL), laboratory testing protocols (NABL partner network), and transparent Mundra Port maritime logistics.

---

## 3. COMMERCIAL OBJECTIVE

The primary commercial objective of the next website phase is to establish SHIVOM GLOBAL as:
> **"A premier, agile, India-based tea sourcing and export partner engineered specifically for international commercial buyers, blenders, private-label brands, and institutional procurement desks."**

### Strategic Commercial Goals:
1. **Drive Qualified Inbound RFQs:** Convert passive international website visitors into structured, actionable commercial requests for quotation that seamlessly feed into the trade desk qualification engine.
2. **Elevate Perceived Enterprise Stature:** Present an international B2B digital presence that equals or exceeds established multinational tea trading houses, while maintaining 100% honesty regarding our merchant export model.
3. **Establish Multi-Category Sourcing Authority:** Communicate verified sourcing capability across primary Indian terroirs (Assam, Darjeeling, Dooars, Nilgiri) and diverse tea manufacturing classifications (CTC, Orthodox, Green, Specialty, Blends).
4. **Position Private Label as a Tier-1 Offering:** Transform private labelling from an incidental feature into a full-fledged commercial capability encompassing custom formulation, barrier packaging, bilingual regulatory compliance, and export logistics.
5. **Protect Capital Discipline (`DEC-001`):** Ensure the website continues to operationalize the "Buyer-First, Inventory-Last" principle by capturing exact buyer specifications before sourcing, preventing speculative procurement.

---

## 4. TARGET AUDIENCE

The website must be intentionally architected to address 7 specific commercial buyer groups across primary export markets (starting with UAE/GCC and expanding globally):

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   SHIVOM GLOBAL TARGET BUYER TAXONOMY                  │
├────────────────────────────────────────────────────────────────────────┤
│ 1. INTERNATIONAL TEA IMPORTERS & COMMODITY TRADING HOUSES              │
│    - Focus: FCL container volumes (10–24 MT), price/kg, Port Mundra    │
│    - Primary Need: Reliable auction lot execution, clean shipping docs │
├────────────────────────────────────────────────────────────────────────┤
│ 2. INDUSTRIAL BLENDERS & CONTRACT PACKING FACILITIES (e.g., UAE/GCC)   │
│    - Focus: Bulk tea for repacking, specific sieve cuts (BOP, BP, Dust)│
│    - Primary Need: Moisture control, consistent cup color, 25kg sacks  │
├────────────────────────────────────────────────────────────────────────┤
│ 3. PRIVATE LABEL TEA BRANDS & EMERGING D2C / RETAIL TEA COMPANIES      │
│    - Focus: Complete OEM shelf-ready products under their brand mark   │
│    - Primary Need: Taste matching, stand-up pouches, tins, low MOQs    │
├────────────────────────────────────────────────────────────────────────┤
│ 4. SUPERMARKET & HYPERMARKET PROCUREMENT MANAGERS                      │
│    - Focus: Retail packaged CTC & tea bags for retail store chains     │
│    - Primary Need: Food authority compliance (GSO/ESMA), barcodes, COA │
├────────────────────────────────────────────────────────────────────────┤
│ 5. HOSPITALITY, HOTEL CHAINS & RESTAURANT GROUPS (HORECA)              │
│    - Focus: High-turnover food-service packs (5kg/10kg) & tea bags     │
│    - Primary Need: High milk reactivity (Karak/Chai), rapid brew time  │
├────────────────────────────────────────────────────────────────────────┤
│ 6. FOODSERVICE DISTRIBUTORS & CASH-AND-CARRY WHOLESALERS               │
│    - Focus: Palletized commercial consignments, reliable repeat supply │
│    - Primary Need: Consistent availability, standard cartons, credit/LC│
├────────────────────────────────────────────────────────────────────────┤
│ 7. SPECIALTY TEA IMPORTERS & GOURMET BOUTIQUES                         │
│    - Focus: High-altitude Darjeeling GI, single-estate Orthodox lots   │
│    - Primary Need: Harvest flush freshness, whole leaf tips, cupping   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. CURRENT WEBSITE STRENGTHS

The existing implementation provides a formidable foundation that will be preserved and leveraged:

| Capability Area | Current Implementation Strength | Repository Verification Status |
|---|---|---|
| **Design System** | Clean Vanilla CSS design tokens (`tokens.css`), sophisticated Deep Forest and Warm Gold palette, responsive typography clamps. | **CONFIRMED** (`tokens.css`) |
| **Brand Assets** | Official vector logo (`Shivom_Global_Logo.svg`) preserved unaltered within an elegant gold-bordered white plaque. Authentic Assam photography in hero. | **CONFIRMED** (`DEC-002`, `DEC-WEBSITE-01`) |
| **Lead Routing** | "What Are You Looking For?" 6-card router bridges buyer intent directly to form fields via smooth scroll and pre-selection. | **CONFIRMED** (`RequirementRouter.tsx`) |
| **Production Pipeline** | Live serverless function (`/api/buyer-requirements`) connected to Supabase PostgreSQL database and Resend transactional email. | **CONFIRMED** (Commit `5651f86`) |
| **Anti-Fabrication** | 100% adherence to Rule 02: zero fake volume counters, zero claimed garden ownership, zero unverified certifications. | **CONFIRMED** (`DEC-007`, Rule 02) |
| **Mobile Stability** | Mobile drawer, responsive flex grids, single-column card stacking, zero horizontal overflow on iPhone viewports. | **CONFIRMED** (Commit `d90c382`) |
| **Code Architecture** | Strict TypeScript interfaces, clean validation functions, zero runtime warnings, production build completes in <1s. | **CONFIRMED** (`npm run build`) |

---

## 6. CURRENT WEBSITE WEAKNESSES / GAPS

To reach institutional commercial standards, the following 10 gaps must be resolved:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     CURRENT WEBSITE ARCHITECTURAL GAPS                 │
├────────────────────────────────────────────────────────────────────────┤
│ GAP-01: Single-Page Architecture limits depth and indexability         │
│ GAP-02: CTC-centric visual balance overshadows multi-tea capabilities  │
│ GAP-03: Private label presented as brief section rather than major hub │
│ GAP-04: Product catalog lacks technical chemistry & mesh datasheets    │
│ GAP-05: Absence of dedicated landing experiences for buyer archetypes  │
│ GAP-06: Export credibility lacks visual document & shipping artifacts  │
│ GAP-07: Lead intake lacks buyer role, target price, and message fields │
│ GAP-08: Zero dedicated SEO metadata, OpenGraph cards, or sitemap.xml   │
│ GAP-09: Unpurchased custom domain (running on *.vercel.app)            │
│ GAP-10: Lack of downloadable commercial spec sheets (PDF datasheets)   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. WHAT WE WANT TO IMPROVE

Below is the exhaustive register of major website improvements. Each improvement is documented using the required governance matrix.

### Major Improvement 01: Multi-Page Information Architecture & Product Routing
- **Objective:** Transition from a single-page long-scroll layout to a hybrid multi-page architecture with dedicated indexable URLs for products, private label, and export capabilities, while retaining a high-converting master homepage.
- **Why It Matters Commercially:** International buyers researching specific products (e.g., Darjeeling FTGFOP1 or Private Label Tea Bags) can land directly on relevant content. Enables link sharing during commercial email outreach.
- **What Will Change:** Introduce client-side routing (React Router) supporting `/`, `/teas/*`, `/private-label`, `/sourcing-export`, and `/submit-requirement`.
- **Priority:** **HIGH**
- **Dependency:** `DEC-WEBSITE-04` (Single-Page vs Multi-Page Router ratification).
- **Verification Required:** Clean client-side route transitions, 404 fallback handling, and Vercel `vercel.json` rewrite routing.
- **Acceptance Criteria:** Every primary product category and service has a dedicated URL that loads in <1s with 0 console errors.

### Major Improvement 02: Sourcing Partner Positioning (Beyond Single-Origin CTC)
- **Objective:** Reposition website messaging from "Assam tea supplier" to "India-wide tea sourcing and export partner".
- **Why It Matters Commercially:** Expands commercial TAM (Total Addressable Market) to buyers seeking multi-origin blending programs (Assam + Dooars + Nilgiri + Darjeeling) without giving the false impression of an ungrounded generalist.
- **What Will Change:** Homepage hero, category cards, and navigation will highlight multi-terroir sourcing capabilities, backed by Tea Board India auction access and regional estate partnerships.
- **Priority:** **CRITICAL**
- **Dependency:** None (purely copy and positioning alignment).
- **Verification Required:** Review against `DEC-002` and `DEC-005` to ensure Assam CTC remains the benchmark while sourcing breadth is accurately framed.
- **Acceptance Criteria:** Hero and headline copy clearly articulate comprehensive Indian tea sourcing subject to buyer specifications.

### Major Improvement 03: Expanded Product Catalogue & Specification-Driven Datasheets
- **Objective:** Replace generic marketing copy with specification-driven technical product profiles for all 8 target tea categories.
- **Why It Matters Commercially:** Industrial tea blenders and supermarket QA managers make purchasing decisions based on particle mesh, moisture limits, and liquor dynamics. Technical datasheets establish immediate trade competence.
- **What Will Change:** Each tea product will feature a standardized technical specification block:
  - Origin & Terroir
  - Manufacturing Classification (CTC, Orthodox, Pan-Fired, Specialty)
  - Available Tea Board Auction Grades
  - Sieve Mesh Particle Sizing
  - Target Organoleptic Parameters (Liquor color, infusion aroma, briskness, milk affinity)
  - Target Chemical Parameters (Moisture $\le 6.5\%–7.0\%$, Total Ash $4.0\%–8.0\%$, Water-Soluble Ash $\ge 45\%$)
  - Commercial Applications & Recommended Uses
  - Standard Export Bulk Packaging & Container Loading Math
  - Direct "Request Specification Quote" CTA
- **Priority:** **HIGH**
- **Dependency:** Verification of non-CTC parameter ranges against Tea Board India standards.
- **Verification Required:** Sieve mesh and chemical ranges verified against `Task-1-UAE-Buyer-Research/provisional_tea_spec_v0.1.md`.
- **Acceptance Criteria:** All tea categories display full technical specifications; zero vague promotional fluff.

### Major Improvement 04: Dedicated Private Label & OEM Contract Packing Hub
- **Objective:** Elevate Private Label into a Tier-1 commercial offering with detailed breakdowns of formulation, barrier packaging, regulatory compliance, and scalable trial batch capabilities.
- **Why It Matters Commercially:** Captures high-margin retail brand contracts. Directly addresses UAE and GCC tea brand owners looking for outsourced OEM production in India.
- **What Will Change:** Build an expanded Private Label section / dedicated page featuring:
  - The 7-Step OEM Sourcing & Packing Journey
  - Detailed Packaging Matrix (Pouches, Embossed Tins, Tea Bags, Foodservice Sacks)
  - Barrier Material Specifications (Kraft paper, multi-layer aluminum foil, degassing valves, nitrogen flushing)
  - Bilingual Regulatory Labeling & Artwork Support (UAE ESMA / GSO standards, Arabic/English typography)
  - Truthful positioning as an export project manager collaborating with vetted, certified processing facilities
- **Priority:** **HIGH**
- **Dependency:** Founder verification of contract co-packer partner capabilities and retail MOQs.
- **Verification Required:** Copy strictly complies with Rule 02 (zero false claims of owning packing factories or machinery).
- **Acceptance Criteria:** Private label section clearly explains the contract packing process and displays tangible packaging options.

### Major Improvement 05: "Who We Serve" Commercial Buyer Segmentation Engine
- **Objective:** Add an interactive buyer segmentation section mapping SHIVOM GLOBAL's capabilities directly to the business models of 4 primary buyer groups (Importers, Blenders, Private Labels, Foodservice).
- **Why It Matters Commercially:** Enables incoming buyers to immediately recognize their operational reality and self-identify within 5 seconds of browsing.
- **What Will Change:** Addition of a responsive 4-column module highlighting typical order sizes, preferred packaging, grade recommendations, and commercial value props for each buyer archetype.
- **Priority:** **MEDIUM**
- **Dependency:** None.
- **Verification Required:** Review against the 36-candidate UAE Buyer Master Tracker to ensure real-world alignment.
- **Acceptance Criteria:** Clicking any buyer segment card routes to the requirement form with appropriate commercial defaults.

### Major Improvement 06: Enhanced Buyer Requirement & RFQ Engine
- **Objective:** Upgrade the current 11-field form into a comprehensive commercial inquiry engine capturing buyer commercial role, target price, and custom commercial messages, while maintaining friction-free mobile intake.
- **Why It Matters Commercially:** Equips the trade desk with complete qualification parameters before the first follow-up call, accelerating quotation drafting.
- **What Will Change:** Integrate optional high-value qualification fields:
  - Buyer Commercial Role (Importer, Blender, Brand Owner, Retailer, Foodservice)
  - Target Price / Indicative Commercial Range (Optional — in USD/kg or AED/kg)
  - Commercial Message / Special Instructions (Textarea)
  - Private Label Flag (Yes / No / Exploring)
- **Priority:** **HIGH**
- **Dependency:** Database schema migration for Supabase `buyer_requirements` table and serverless validation updates.
- **Verification Required:** Full end-to-end test verifying Supabase persistence and Resend email delivery with new fields.
- **Acceptance Criteria:** Form captures extended fields without increasing validation friction; zero regressions on mobile viewports.

### Major Improvement 07: Export Credibility & Statutory Compliance Showcase
- **Objective:** Visually demonstrate SHIVOM GLOBAL's export discipline through auditable documentation workflows, laboratory testing protocols, and transparent port logistics.
- **Why It Matters Commercially:** Overcomes buyer hesitation regarding a new merchant exporter by demonstrating institutional adherence to international trade law.
- **What Will Change:** Introduce dedicated credibility cards covering:
  - Statutory Documentation Suite (Certificate of Origin, Phytosanitary Certificate, Commercial Invoice, Packing List, Bill of Lading)
  - Laboratory Testing Protocol (COA testing through accredited NABL testing partner laboratories)
  - Packaging Integrity (Food-grade virgin LDPE liners + 25kg multi-wall kraft outer sacks + palletization)
  - Maritime Logistics Route (Assam/Kolkata $\rightarrow$ Mundra Port $\rightarrow$ Jebel Ali Port in 3–5 days transit)
- **Priority:** **HIGH**
- **Dependency:** Founder verification of appointed NABL testing laboratory partner name.
- **Verification Required:** Audit against `FIRST_EXPORT_ROADMAP.md` and `DECISIONS.md`.
- **Acceptance Criteria:** Credibility section clearly explains export compliance and logistics without claiming unissued statutory licenses.

### Major Improvement 08: Visual Design Elevation & Product Visuals
- **Objective:** Elevate visual aesthetics to an international luxury-commodity trade standard, integrating high-definition macro tea leaf imagery, liquor cupping visuals, and realistic packaging mockups.
- **Why It Matters Commercially:** Commercial tea buyers judge professionalism through visual poise. High-quality imagery builds immediate confidence.
- **What Will Change:** Curate and integrate authentic tea imagery:
  - Tea grade particle macro photography (BOP, BOPSM, BP, PF, PD, Dust)
  - Cup liquor color swatches and infusions
  - Authentic export sack and retail packaging renders
  - Subtle micro-interactions, smooth hover lifts, and refined tab switches
- **Priority:** **MEDIUM**
- **Dependency:** Asset curation adhering strictly to `DEC-WEBSITE-01` (zero generic stock photos or unverified factory claims).
- **Verification Required:** All photographic assets must represent authentic Indian tea varieties and verified packaging formats.
- **Acceptance Criteria:** Visual presentation is polished, responsive, and tea-focused; zero layout shift (CLS < 0.05).

### Major Improvement 09: Technical SEO Infrastructure & Structured Schema
- **Objective:** Implement comprehensive international B2B SEO metadata, OpenGraph cards, Twitter preview cards, and Schema.org JSON-LD structured data.
- **Why It Matters Commercially:** Ensures search engines correctly index SHIVOM GLOBAL for commercial sourcing terms, and ensures shared links look professional on WhatsApp, LinkedIn, and email.
- **What Will Change:**
  - Add descriptive `<title>` tags and `<meta name="description">` across all views
  - Add OpenGraph (`og:*`) and Twitter Card tags with dedicated 1200x630 social preview image
  - Add Schema.org JSON-LD structured data (`Organization`, `Product`, `BreadcrumbList`)
  - Generate `robots.txt` and `sitemap.xml`
- **Priority:** **HIGH**
- **Dependency:** None (can be implemented in static HTML / Vite plugins).
- **Verification Required:** Validate structured data using Google Rich Results Test tool.
- **Acceptance Criteria:** 100% valid JSON-LD schema, perfect OpenGraph preview on social sharing.

### Major Improvement 10: Performance, Accessibility & Mobile Optimization
- **Objective:** Maintain sub-second load times, achieve Lighthouse scores $\ge 95$ across Performance, Accessibility, Best Practices, and SEO, and guarantee flawless cross-device usability.
- **Why It Matters Commercially:** Overseas buyers frequently evaluate websites on mobile devices over cellular connections while travelling or attending trade fairs.
- **What Will Change:** Asset optimization (WebP/AVIF formats), font preloading, zero layout shifts, accessible ARIA attributes on all interactive elements, and strict keyboard navigation support.
- **Priority:** **HIGH**
- **Dependency:** None.
- **Verification Required:** Google Lighthouse audit and mobile viewport regression testing.
- **Acceptance Criteria:** Lighthouse Performance $\ge 95$, Accessibility $\ge 95$, 0 console warnings.

---

## 8. PROPOSED WEBSITE STRUCTURE

### 8.1 Master Site Architecture (Hybrid Multi-Page Sitemapping)
To balance single-page conversion velocity with multi-page search authority, the following site structure is planned:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                    SHIVOM GLOBAL MASTER SITE ARCHITECTURE              │
├────────────────────────────────────────────────────────────────────────┤
│ / (MASTER HOMEPAGE)                                                    │
│ ├── Section 1: Hero — India Tea Sourcing Gateway                       │
│ ├── Section 2: What We Supply — Tea Categories Overview                │
│ ├── Section 3: Assam CTC — Key Commercial Benchmark Spotlight          │
│ ├── Section 4: Private Label & Contract Packing Solutions              │
│ ├── Section 5: Who We Serve — Buyer Archetypes & Solutions             │
│ ├── Section 6: How It Works — 6-Stage Sourcing & Export Journey        │
│ ├── Section 7: Why SHIVOM GLOBAL — Credibility & Capital Discipline    │
│ ├── Section 8: Interactive Grade Matrix & Technical Explorer           │
│ ├── Section 9: Export Credibility, Documentation & Port Logistics      │
│ ├── Section 10: Commercial Buyer Requirement Form (Direct Intake)       │
│ └── Section 11: Corporate Disclosures, Compliance Strip & Footer       │
├────────────────────────────────────────────────────────────────────────┤
│ /teas (TEA CATALOGUE HUB)                                              │
│ ├── /teas/assam-ctc      - Assam CTC Black Tea (Primary Benchmark)     │
│ ├── /teas/orthodox       - North Indian Orthodox Black Tea             │
│ ├── /teas/darjeeling     - Darjeeling GI Certified Reserve             │
│ ├── /teas/green-tea      - High-Elevation Indian Green Tea             │
│ ├── /teas/specialty      - Nilgiri & Specialty Mountain Teas           │
│ └── /teas/blends         - Flavoured Teas & Custom Herbal Infusions    │
├────────────────────────────────────────────────────────────────────────┤
│ /private-label (PRIVATE LABEL & OEM HUB)                               │
│ ├── OEM Journey & Formulation Matching                                 │
│ ├── Packaging Formats & Barrier Specifications                         │
│ ├── Bilingual Regulatory Compliance (GSO/ESMA)                         │
│ └── Scalable Trial Batches to Full Container Loads                     │
├────────────────────────────────────────────────────────────────────────┤
│ /sourcing-export (EXPORT CREDIBILITY & LOGISTICS GATEWAY)              │
│ ├── Auction Sourcing & Quality Assessment                              │
│ ├── Independent Laboratory COA Protocols (NABL)                        │
│ ├── 25kg Kraft Barrier Packaging & Palletization                       │
│ └── Mundra Port Maritime Transit & Incoterms (FOB/CIF)                 │
├────────────────────────────────────────────────────────────────────────┤
│ /submit-requirement (DEDICATED COMMERCIAL INTAKE DESK)                 │
│ └── Full-screen, focused commercial RFQ engine with parameter summary  │
└────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Proposed Homepage Wireframe Flow (11 Sequenced Sections)
1. **Hero — India Tea Supply for Global Buyers:** High-contrast headline, origin sub-headline, primary CTA (*Submit Commercial Requirement*), secondary CTA (*Explore Tea Categories*), 4 trust anchor chips (Auction Sourcing, Laboratory COA, 25kg Kraft Barrier Packaging, Trade Desk Review SLA).
2. **Tea Categories / What We Supply:** Visual 6-to-8 card gateway introducing the full Indian tea portfolio, clearly distinguishing primary offerings from on-demand sourcing capabilities.
3. **Assam CTC Spotlight:** Dedicated commercial feature on our primary export benchmark (`DEC-005`), explaining particle density, brisk malty liquor, and milk tea performance (Karak/Chai).
4. **Private Label & OEM Solutions:** High-impact commercial banner highlighting custom blending, retail packaging options, and bilingual export compliance through vetted processing facilities.
5. **Who We Serve:** 4-column buyer segmentation card grid (Importers, Industrial Blenders, Private Label Brands, Foodservice).
6. **How It Works (6-Stage Commercial Sourcing Roadmap):** Numbered sequence from Requirement Intake to Sourcing, Cupping, Proforma Terms, Export Packaging, and Port Dispatch.
7. **Why SHIVOM GLOBAL:** 6 institutional credibility pillars detailing our "Buyer-First, Inventory-Last" capital discipline, strict laboratory parameters, barrier export packaging, and direct founder trade desk.
8. **Interactive Tea Grade Matrix:** Technical auction grade selector (BOP, BOPSM, BP, PF, PD, Dust / CD) with Space Grotesk typography, mesh ranges, and sample request triggers.
9. **Export Credibility, Documentation & Port Logistics:** Visual layout of statutory trade documents (Phytosanitary, Certificate of Origin, BL), laboratory testing protocols, and Mundra Port maritime routes.
10. **Commercial Buyer Requirement Engine:** Upgraded 11+ field structured lead intake form with real-time validation, honeypot protection, and database persistence.
11. **Site Footer & Corporate Disclosures:** Entity status disclosure (Sole Proprietorship, Udyam MSME, Bhavnagar HQ), shipping Incoterms, navigation links, and direct trade contact channels.

---

## 9. CONTENT / PRODUCT CATEGORIES

To ensure absolute adherence to Rule 02 (Anti-Fabrication), all product categories are categorized under a strict governance status:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                  TEA CATEGORY GOVERNANCE STATUS MATRIX                 │
├────────────────────────────────────────────────────────────────────────┤
│ [CONFIRMED / PRIMARY BENCHMARK]                                        │
│ 1. Assam CTC Black Tea (Primary working volume benchmark, DEC-005)     │
├────────────────────────────────────────────────────────────────────────┤
│ [CONFIRMED / VERIFIED SOURCING ECOSYSTEM]                              │
│ 2. Orthodox Black Tea (Assam & North Indian Estates)                   │
│ 3. Darjeeling Tea (GI Certified Himalayan Foothills)                   │
│ 4. Indian Green Tea (High-elevation non-fermented)                     │
├────────────────────────────────────────────────────────────────────────┤
│ [PROPOSED / ON-DEMAND SOURCING CAPABILITY]                             │
│ 5. Specialty & Nilgiri Mountain Tea (South Indian high-grown)          │
│ 6. Flavoured Black & Green Teas (Earl Grey, Masala Chai, Cardamom)     │
│ 7. Herbal & Botanical Blends (Tulsi, Chamomile, Ginger, Hibiscus)      │
│ 8. Custom Industrial Blends (Formulated to buyer counter-sample)       │
└────────────────────────────────────────────────────────────────────────┘
```

### Detailed Product Specification Profiles:

#### 1. Assam CTC Black Tea [CONFIRMED / PRIMARY BENCHMARK]
- **Origin:** Brahmaputra Valley, Assam, India.
- **Manufacturing Classification:** Crush, Tear, Curl (CTC).
- **Available Grades:** Broken Orange Pekoe (BOP), BOPSM, Broken Pekoe (BP), Pekoe Fannings (PF), Pekoe Dust (PD), Dust / Churamani Dust (CD).
- **Technical Mesh Parameters:** 14–18 Mesh (BOP) down to 40+ Mesh (Dust).
- **Chemical Standards:** Moisture $\le 6.5\%–7.0\%$, Total Ash $4.0\%–8.0\%$, Water-Soluble Ash $\ge 45\%$, Acid-Insoluble Ash $\le 0.8\%$.
- **Organoleptic Cup Profile:** Deep amber to bright red liquor; bold, pungent, malty briskness; exceptional milk reactivity (ideal for Middle East Karak and South Asian Chai).
- **Commercial Applications:** Commercial tea blending, supermarket retail cartons, quick-brew consumer tea bags, foodservice bulk brewing.
- **Export Packaging:** 25kg multi-wall kraft paper sacks with food-grade virgin LDPE inner liner (heat-sealed), or 50kg woven PP bags with inner liner.
- **Supply Availability:** Year-round from primary Assam auctions and vetted estate partners.
- **Container Capacity:** ~400–480 sacks per 20ft FCL (~10–12 MT); ~900–960 sacks per 40ft HC (~22–24 MT).

#### 2. Orthodox Black Tea [CONFIRMED / VERIFIED SOURCING]
- **Origin:** Upper Assam and Dooars Terroirs, North India.
- **Manufacturing Classification:** Whole Leaf & Broken Orthodox (Roller Table Craft).
- **Available Grades:** Tippy Golden Flowery Orange Pekoe (TGFOP), Flowery Broken Orange Pekoe (FBOP), Broken Orange Pekoe (BOP), BOPF.
- **Organoleptic Cup Profile:** Golden-amber liquor with bright rim; aromatic, complex bouquet with sweet wood, honey, and floral undertones; light to medium astringency.
- **Commercial Applications:** Premium specialty loose-leaf retail, luxury gift packaging, traditional European blends (English Breakfast, Afternoon Tea).
- **Export Packaging:** 20kg–25kg multi-wall paper sacks or export corrugated cartons with moisture-barrier foil liners.
- **Supply Availability:** Sourced against buyer order from seasonal auction lots and direct estate partners.

#### 3. Darjeeling Tea (GI Certified) [CONFIRMED / VERIFIED SOURCING]
- **Origin:** Darjeeling District, Himalayan Foothills, West Bengal, India (Protected Geographical Indication).
- **Manufacturing Classification:** High-Altitude Orthodox (First Flush, Second Flush, Autumnal).
- **Available Grades:** Finest Tippy Golden Flowery Orange Pekoe 1 (FTGFOP1), Super Fine (SFTGFOP1), GFBOP.
- **Organoleptic Cup Profile:** Pale golden to light amber liquor; world-renowned muscatel grape note, vibrant floral fragrance, delicate briskness. Consumed strictly without milk.
- **Commercial Applications:** High-end specialty tea boutiques, gourmet luxury gift boxes, single-estate collector tins.
- **Export Packaging:** 15kg–25kg foil-lined wooden chests or reinforced export cartons.
- **Supply Availability:** Seasonal flush availability (Spring / Summer / Autumn) sourced through certified Darjeeling estates.

#### 4. Indian Green Tea [CONFIRMED / VERIFIED SOURCING]
- **Origin:** High-elevation mountain terroirs (Kangra, Darjeeling, and Nilgiri).
- **Manufacturing Classification:** Non-Fermented / Steam & Pan-Fired.
- **Available Grades:** Whole Leaf Green, Broken Green, Green Fannings.
- **Organoleptic Cup Profile:** Clear pale jade to yellow-green liquor; fresh, vegetal, grassy sweetness with gentle astringency and high antioxidant/catechin retention.
- **Commercial Applications:** Functional wellness tea lines, flavored herbal bases, transparent pyramid tea bags.
- **Export Packaging:** 20kg–25kg multi-wall paper sacks with barrier foil liners.
- **Supply Availability:** Available year-round against buyer specifications.

#### 5. Specialty & Nilgiri Mountain Tea [PROPOSED / ON-DEMAND SOURCING]
- **Origin:** Nilgiri (Blue Mountains), Southern India (elevation 1,000m–2,500m).
- **Manufacturing Classification:** High-Grown Orthodox & Fine Cut.
- **Available Grades:** Orange Pekoe (OP), BOP, Fannings.
- **Organoleptic Cup Profile:** Bright golden liquor, distinct citrus and floral notes, high clarity, non-clouding cold brew characteristics (ideal for iced tea applications).
- **Commercial Applications:** Premium iced tea formulations, boutique blends, specialty retail.
- **Sourcing Posture:** Procured on-demand against confirmed buyer specifications from vetted South Indian auction centres (Coonoor/Cochin).

#### 6. Flavoured Black & Green Teas [PROPOSED / ON-DEMAND SOURCING & CONTRACT PACKING]
- **Profiles:** Earl Grey (Natural Bergamot), Cardamom Infused Chai, Masala Chai (Ginger, Clove, Cinnamon, Black Pepper), Jasmine Green Tea, Mint Green Tea.
- **Formulation:** Natural and nature-identical flavoring infused with premium Indian base teas through vetted contract processing facilities.
- **Commercial Applications:** Private-label supermarket lines, cafe brand retail packs.
- **Sourcing Posture:** Formulated and blended through certified third-party packing partners against buyer taste benchmarks.

#### 7. Herbal & Botanical Infusions [PROPOSED / ON-DEMAND SOURCING & CONTRACT PACKING]
- **Profiles:** Pure Tulsi (Holy Basil), Lemongrass & Ginger, Chamomile Calm, Hibiscus Rose, Turmeric Golden Chai (Caffeine-Free).
- **Ingredients:** 100% natural dried herbs, botanicals, and spices sourced from vetted Indian agricultural partners.
- **Commercial Applications:** Health & wellness brands, organic specialty collections, transparent pyramid tea bags.
- **Sourcing Posture:** Contract-blended and packed to order.

#### 8. Custom Commercial Blends & Counter-Samples [PROPOSED / BUYER-TRIGGERED]
- **Capability:** Matching an international buyer's existing market benchmark or proprietary commercial blend.
- **Execution:** Buyer sends target physical sample $\rightarrow$ trade desk conducts organoleptic sieve and cup analysis $\rightarrow$ formulates matching blend utilizing cost-optimized Indian auction lots $\rightarrow$ dispatches counter-samples for buyer approval prior to contract confirmation.

---

## 10. PRIVATE LABEL POSITIONING

### 10.1 Strategic Mandate & Governance Compliance
To comply strictly with Rule 02 and anti-fabrication governance:
- **What SHIVOM GLOBAL IS:** An agile, export-oriented tea sourcing partner and project management firm coordinating end-to-end private-label delivery for international brands.
- **What SHIVOM GLOBAL IS NOT:** A factory-owning manufacturing conglomerate. The website will **NEVER** claim ownership of industrial tea blending plants, automatic form-fill-seal machines, or packaging factories.
- **Truthful Operating Framework:** Copy will clearly state:
  > *"SHIVOM GLOBAL manages your complete private label program from origin tea selection and taste formulation to contract packaging through vetted, certified Indian processing facilities (FSSAI, ISO 22000 / HACCP compliant), ensuring full destination regulatory compliance and ocean dispatch."*

### 10.2 The 7-Step Private Label Journey

```text
┌────────────────────────────────────────────────────────────────────────┐
│               THE 7-STEP PRIVATE LABEL COMMERCIAL JOURNEY              │
├────────────────────────────────────────────────────────────────────────┤
│ STEP 01: COMMERCIAL BRIEF & TASTE BENCHMARK                            │
│ Buyer defines target market, retail price point, packaging preference, │
│ and either provides benchmark tea samples or selects an origin base.   │
├────────────────────────────────────────────────────────────────────────┤
│ STEP 02: ORIGIN SOURCING & COUNTER-SAMPLE FORMULATION                  │
│ Trade desk sources corresponding auction/estate lots and crafts        │
│ matching blend iterations balanced for cup color, aroma, and cost.     │
├────────────────────────────────────────────────────────────────────────┤
│ STEP 03: PACKAGING FORMAT & BARRIER MATERIAL SELECTION                 │
│ Buyer selects from retail stand-up pouches, embossed metal tins,       │
│ tag-and-string tea bags, or food-service bulk packs.                   │
├────────────────────────────────────────────────────────────────────────┤
│ STEP 04: BILINGUAL REGULATORY COMPLIANCE & ARTWORK                     │
│ Complete review of destination labeling laws (e.g., UAE GSO/ESMA       │
│ English/Arabic standards, nutritional panels, barcodes, batch codes).  │
├────────────────────────────────────────────────────────────────────────┤
│ STEP 05: CONTROLLED TRIAL RUN (PILOT PRODUCTION)                       │
│ Production of manageable trial batch (subject to co-packer MOQs)       │
│ to verify sealing integrity, shelf appearance, and market reaction.   │
├────────────────────────────────────────────────────────────────────────┤
│ STEP 06: INDEPENDENT QUALITY TESTING & COA ISSUANCE                    │
│ Pre-shipment batch testing through accredited NABL partner laboratory  │
│ verifying moisture, microbiology, and chemical safety limits.          │
├────────────────────────────────────────────────────────────────────────┤
│ STEP 07: EXPORT PALLETIZATION & OCEAN LOGISTICS                        │
│ Master corrugated carton packing, pallet shrink-wrapping, container    │
│ stuffing at Mundra Port, and dispatch under FOB or CIF terms.          │
└────────────────────────────────────────────────────────────────────────┘
```

### 10.3 Private Label Packaging Matrix

| Packaging Format | Typical Net Weights | Barrier Material Structure | Primary Target Market / Use | MOQ Status |
|---|---|---|---|---|
| **Retail Stand-Up Pouches (Doypack)** | 100g, 250g, 500g, 1kg | Multi-layer PET/ALU/PE or Kraft/ALU/PE with zip-lock and degassing valve | Supermarket shelves, specialty tea brands, online D2C retail | `NEEDS VERIFICATION` (Co-packer dependent) |
| **Embossed Specialty Metal Tins** | 50g, 100g, 250g | Food-grade tinplate with airtight inner push plug or slip lid | Luxury gourmet retail, gift boxes, single-estate Darjeeling | `NEEDS VERIFICATION` (Co-packer dependent) |
| **Consumer Tea Bags (Single Chamber)** | 2.0g envelope / tag-and-string | Food-grade heat-seal filter paper, individual paper envelope | High-volume retail, hotels, quick-serve restaurants | `NEEDS VERIFICATION` (Co-packer dependent) |
| **Pyramid Mesh Tea Bags** | 2.0g – 2.5g pyramid | Biodegradable PLA cornstarch or woven mesh, transparent infusion | Premium wellness teas, whole leaf orthodox, herbal blends | `NEEDS VERIFICATION` (Co-packer dependent) |
| **Food-Service Commercial Sacks** | 5kg, 10kg, 25kg | 3-ply multi-wall kraft paper sack with heat-sealed food-grade LDPE liner | Commercial chai cafes, cafeterias, industrial repacking | **CONFIRMED** (250 kg trial batches supported) |

---

## 11. BUYER-FOCUSED FEATURES

To ensure the website functions as an effective commercial trade tool rather than a static brochure, the following interactive buyer features are planned:

1. **Enhanced Requirement Router (Audience-Aware):** Expand the current 6-card router into a dynamic buyer selector that pre-configures form fields based on buyer role (Bulk Importer, Commercial Blender, Retail Brand, Foodservice Operator).
2. **Technical Grade & Mesh Visualizer:** Interactive UI demonstrating the particle size progression from BOP (coarse leaf cut, 14–18 mesh) down to Dust (fine powder cut, 40+ mesh), displaying brewing speed and liquor extraction rates.
3. **Container Stuffing & Logistics Calculator:** Interactive calculation tool allowing buyers to estimate container requirements:
   - 1x20ft FCL = ~400–480 bags of 25kg = ~10,000 kg – 12,000 kg (10–12 MT).
   - 1x40ft HC = ~900–960 bags of 25kg = ~22,500 kg – 24,000 kg (22.5–24 MT).
   - Palletized vs Floor Loaded container volume comparisons.
4. **Downloadable Technical Tea Specification Sheets (PDF):** Standardized, professional PDF datasheets summarizing chemistry, sieve analysis, origin terroirs, and packaging options for each tea category, ready for procurement managers to present to their internal evaluation committees.
5. **Counter-Sample Request Workflow:** A dedicated physical sampling guide explaining how international buyers can mail benchmark tea samples to the Bhavnagar trade desk for commercial cupping and price-matching.
6. **Commercial Reference ID Verification:** Ability for buyers who have submitted a requirement to view the live status of their inquiry using their unique reference code (`SG-REQ-YYYYMMDD-XXXX`).

---

## 12. TRUST / EXPORT CREDIBILITY

International trade is built on legal, technical, and logistics transparency. The website will feature a dedicated Export Credibility & Documentation Suite:

### 12.1 The Merchant Export Advantage
Transparently explain the "Buyer-First, Inventory-Last" model as a major quality benefit:
- **Freshness Guarantee:** Tea is freshly drawn from primary auction catalogues and estate harvests against confirmed buyer contracts, eliminating the staleness, mold risk, and aroma degradation associated with warehouse inventory stockpiles.
- **Specification Accuracy:** Sourcing is custom-tailored to the buyer's exact mesh and cup density requirements, rather than forcing a pre-purchased inventory lot upon the customer.

### 12.2 Statutory Entity Disclosures
- **Legal Entity:** Sole Proprietorship (`Sarthak Sarvaiya`).
- **Principal Place of Business:** Bhavnagar, Gujarat, India (`DEC-006`).
- **MSME Recognition:** Udyam MSME Registered (`UDYAM-GJ-05-XXXXXXX`).
- **Pre-Commercial Statutory Roadmap:** Full transparency on export licenses. Export shipments are executed under complete statutory compliance (GST, IEC, Tea Board RCMC, and FSSAI Central License).

### 12.3 Complete Export Documentation Suite
Visual breakdown and explanation of all commercial shipping documents provided with every export consignment:
1. **Commercial Invoice & Packing List:** Detailing net weight, gross weight, batch numbers, HS codes (`0902.30` / `0902.40`), and container numbers.
2. **Certificate of Origin (COO):** Issued by authorized Chamber of Commerce / Export Inspection Council proving authentic Indian terroir.
3. **Phytosanitary Certificate:** Issued by the Directorate of Plant Protection, Quarantine & Storage (Ministry of Agriculture, India) certifying freedom from quarantine pests.
4. **Certificate of Analysis (COA):** Comprehensive batch testing report issued by an accredited independent laboratory verifying moisture, total ash, acid-insoluble ash, and pesticide compliance.
5. **Bill of Lading (BL):** Clean on-board ocean bill of lading from premier shipping lines (Maersk, MSC, Hapag-Lloyd, CMA CGM).

### 12.4 Laboratory Testing & Quality Assurance
- Routine testing of export lots against Indian Food Safety Standards (FSSAI) and destination standards (e.g., UAE GSO 978 standard for black tea).
- Mandatory parameter verification: Moisture ($\le 6.5\%–7.0\%$), Water-soluble ash ($\ge 45\%$), Acid-insoluble ash ($\le 0.8\%$), Alkalinity of water-soluble ash ($1.0\%–2.2\%$), Crude fiber ($\le 16.5\%$).
- Partner Laboratory Protocol: Independent testing coordinated through accredited NABL partner laboratories.

### 12.5 Maritime Logistics & Port Operations
- **Export Gateway:** Port of Mundra (Gujarat) / Nhava Sheva (JNPT, Mumbai). Mundra offers the fastest, most reliable maritime transit to Jebel Ali (Dubai, UAE) with direct sailings in approximately 3–5 days.
- **Incoterms Supported:** FOB (Port of Mundra / JNPT) or CIF (Destination Port, e.g., Jebel Ali, Dammam, Doha, Felixstowe).
- **Export Packaging Integrity:** Multi-wall kraft barrier sacks with heat-sealed food-grade LDPE liners, palletized and shrink-wrapped with desiccants to prevent sea-freight condensation damage.

---

## 13. LEAD / BUYER INQUIRY FLOW

### 13.1 Form Architecture & Extended Qualification Fields
The current 11-field form has proven stable and resilient. For the next phase, the form will evolve into a comprehensive commercial RFQ engine without adding unnecessary friction.

```text
┌────────────────────────────────────────────────────────────────────────┐
│               COMMERCIAL BUYER REQUIREMENT INTAKE SCHEMA               │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION A: COMMERCIAL SOURCING PARAMETERS]                            │
│ 1. Commercial Buyer Role: [Importer | Blender | Brand | Retail | HORECA]│
│ 2. Requirement Type:      [Assam CTC | Orthodox | Darjeeling | Green...]│
│ 3. Tea Grade / Cut:       [BOP | BOPSM | BP | PF | PD | Dust | Custom] │
│ 4. Order Volume Tier:     [Trial 250-500kg | LCL 1-5MT | FCL 10-12MT...]│
│ 5. Packaging Format:      [25kg Kraft | 50kg PP | Pouches | Tea Bags]  │
│ 6. Private Label Needed?: [No (Bulk Only) | Yes (Turnkey OEM) | Exploring]│
│ 7. Destination Country:   [Text input with auto-suggest, e.g. UAE]     │
│ 8. Discharging Port:      [Text input, e.g. Jebel Ali Port, Dubai]     │
│ 9. Indicative Target Price: [Optional — USD/kg or AED/kg]              │
│ 10. Technical Specifications & Message: [Textarea, max 2000 chars]     │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION B: BUYER ENTERPRISE & CONTACT DETAILS]                        │
│ 11. Company Name:         [Mandatory corporate name]                   │
│ 12. Contact Person & Title:[Mandatory procurement officer name]        │
│ 13. Business Email:       [Mandatory RFC 5322 regex validation]        │
│ 14. Phone / WhatsApp:     [Mandatory international phone format]       │
├────────────────────────────────────────────────────────────────────────┤
│ [SECTION C: SECURITY & ANTI-SPAM TRAPS]                                │
│ 15. Honeypot Field:       [Hidden from users, traps automated bots]    │
│ 16. Rate Limiting:        [Max 15 submissions per 10 minutes per IP]   │
└────────────────────────────────────────────────────────────────────────┘
```

### 13.2 Trade Desk Workflow Integration
1. **Client-Side Validation:** Instant inline error alerts, zero page reload, accessible focus management.
2. **Serverless Execution:** Dispatches to `POST /api/buyer-requirements`. Validates payload, strips malicious control characters, enforces rate limits, and verifies honeypot.
3. **Database Record Creation:** Inserts full record into Supabase PostgreSQL table `buyer_requirements`.
4. **Real-Time Notification:** Sends immediate HTML-formatted transactional email alert via Resend API to the Founder's trade desk (`shivomglobal1010@gmail.com`).
5. **Buyer Confirmation Screen:** Generates authoritative reference code (`SG-REQ-YYYYMMDD-XXXX`), displays a full summary of submitted parameters, outlines the next commercial steps (Trade desk review $\rightarrow$ Spec matching $\rightarrow$ Proforma quote), and provides a direct WhatsApp contact trigger.
6. **Internal CRM Synchronization:** Incoming inquiry is mapped into the Business Operating System (BOS) buyer pipeline for qualification against the 36-candidate UAE database.

---

## 14. VISUAL / DESIGN DIRECTION

### 14.1 Aesthetic Philosophy
The visual direction will follow a **"Sophisticated Commodity Trade Desk"** design language:
- Clean, authoritative, international B2B appearance.
- Free of cluttered animations, cartoonish graphics, or generic SaaS aesthetics.
- Inspired by premier international commodity houses, balancing heritage and modern technical precision.
- Strictly avoiding copying any competitor (e.g. Pearl & Waters or DAS Tea Packing), using industry leaders solely as benchmarks for information density and clear commercial taxonomy.

### 14.2 Color System & Visual Balance
- **Deep Forest Green (`#072218` / `#0D3829`):** 25% of visual surface. Used for the sticky header, hero canvas, dark credibility bands, and footer to anchor the site in agricultural heritage and maritime authority.
- **Off-White / Alabaster Light Canvas (`#FBFBFA` / `#FFFFFF`):** 70% of visual surface. Crisp, immaculate light backgrounds for reading specification tables, grade matrices, and product datasheets.
- **Warm Metallic Gold (`#C59B27` / `#D4AF37`):** $\le 5\%$ of visual surface. Strictly reserved for high-intent conversion buttons, active specification badges, and subtle border highlights.
- **Charcoal & Technical Slate (`#111827` / `#374151`):** High-contrast typography ensuring effortless readability of fine technical parameters.

### 14.3 Typography Hierarchy
- **Narrative & Headings:** *Plus Jakarta Sans* (Weights: 500, 600, 700, 800) with responsive typography clamps (`font-size: clamp(2rem, 5vw, 3.25rem)`).
- **Technical Specifications & Grade Acronyms:** *Space Grotesk* (Weights: 500, 700). Applied to all grade codes (`BOP`, `BOPSM`, `Dust`), mesh parameters (`14–18 Mesh`), and laboratory metrics to evoke scientific rigor.

### 14.4 Imagery Guidelines
- Authentic Assam tea plantation landscape in the hero section (`/images/hero-bg.jpg`) with tuned dual-gradient overlays ensuring white text passes WCAG AA contrast standards.
- High-resolution macro photography of tea leaves, dry particles, and infused liquor in white porcelain cupping vessels.
- Clean 3D packaging renders of 25kg multi-wall kraft barrier export sacks and retail private-label packaging.
- Absolute prohibition on generic, unverified stock photography claiming to be "our factory" or "our personal tea gardens".

---

## 15. MOBILE RESPONSIVENESS

Mobile execution is mission-critical. Overseas buyers frequently evaluate suppliers on smartphones. The following mobile standards must be maintained across all viewports (375px, 390px, 412px, 768px, 1024px, 1440px):

1. **Zero Horizontal Overflow:** Guaranteed `scrollWidth === clientWidth` at all screen widths. Strict containment of tables and long text strings.
2. **Accessible Touch Targets:** Minimum button and interactive touch target size of $44\text{px} \times 44\text{px}$ with adequate tap spacing.
3. **Adaptive Table & Grid Stacking:** Multi-column grids (4-column and 3-column) gracefully collapse to 2 columns on tablet (`<1024px`) and 1 column on mobile (`<640px`).
4. **Responsive Form Ergonomics:** Form input fields adopt `font-size: 16px` on iOS viewports to prevent unwanted browser auto-zooming.
5. **Mobile Navigation Drawer:** Slide-down or slide-in mobile navigation with smooth toggle animations, high-contrast link spacing, and direct "Submit Requirement" CTA button.

---

## 16. SEO REQUIREMENTS

To build organic inbound trade equity, every page and component must satisfy the following SEO standards:

### 16.1 Metadata Architecture
- **Homepage Title Tag:** `Indian Tea Exporter & Private Label Sourcing | SHIVOM GLOBAL`
- **Homepage Meta Description:** `Direct requirement-led sourcing of authentic Indian teas (Assam CTC, Orthodox, Darjeeling GI, Green Tea) for international blenders, packers, and private label brands.`
- **Target Commercial Keywords:** `bulk assam ctc tea exporter`, `indian tea sourcing partner`, `private label tea packaging india`, `bulk orthodox tea supplier`, `darjeeling bulk tea export`, `karak tea supplier dubai uae`.

### 16.2 Social Sharing & OpenGraph Protocols
- Full `og:title`, `og:description`, `og:image`, `og:url`, and `og:type` implementation.
- Dedicated OpenGraph image asset (1200 × 630 px) featuring official SHIVOM GLOBAL brandmark, authentic Assam terroir imagery, and B2B positioning narrative.
- Twitter Card tags (`summary_large_image`).

### 16.3 Structured Data (Schema.org JSON-LD)
Embed valid JSON-LD structured data on all pages:
1. **`Organization` Schema:** Specifying legal entity name, trade name, founder, Bhavnagar address, and export contact points.
2. **`Product` Schemas:** Individual product markup for Assam CTC, Orthodox, Darjeeling, and Green Tea including category, export packaging, and origin.
3. **`BreadcrumbList` Schema:** For hierarchical multi-page navigation.

### 16.4 Technical SEO Deliverables
- `sitemap.xml`: Complete XML sitemap listing all public indexable routes.
- `robots.txt`: Explicit search crawler directives allowing full indexing while disallowing internal API endpoints (`/api/*`).
- Canonical URL tags (`<link rel="canonical">`) preventing duplicate content penalties.

---

## 17. TECHNICAL REQUIREMENTS

### 17.1 Frontend Architecture
- **Framework:** React 18 (Single Page Application or React Router multi-page architecture).
- **Tooling:** Vite 6 with `@vitejs/plugin-react` and TypeScript strict mode.
- **Styling:** Modular Vanilla CSS design tokens (`src/styles/tokens.css`) and responsive components (`src/styles/index.css`).
- **Icons:** Lucide React (feather-style clean SVG primitives).

### 17.2 Backend & Serverless Architecture
- **Runtime:** Node.js serverless functions deployed on Vercel (`api/buyer-requirements.ts`).
- **Validation:** Synchronized client-side and server-side validation ensuring payload integrity.
- **Anti-Bot Defenses:** Honeypot traps, IP-based sliding-window rate limiting (15 requests per 10 minutes), and CORS origin protection.

### 17.3 Database Architecture
- **Database Engine:** Supabase PostgreSQL (`ap-south-1` Mumbai / global pool).
- **Table Schema:** `public.buyer_requirements` storing all commercial parameters, timestamps, reference IDs, and client IP hashes.
- **Security:** Strict PostgreSQL Row Level Security (RLS) policies preventing unauthorized public read access while permitting serverless insert operations via secret key.

### 17.4 Email & Transactional Dispatch
- **Provider:** Resend API (or equivalent SMTP service).
- **Template:** Structured HTML notification template detailing buyer company, contact, volume, grade, packaging, port, and technical notes.
- **Delivery Destination:** `shivomglobal1010@gmail.com`.

### 17.5 Hosting & Infrastructure
- **Platform:** Vercel Production Cloud.
- **Deployment Pipeline:** Automatic CI/CD build and deployment triggered on git push to `main`.
- **Domain Configuration:** Future DNS binding for custom apex domain (`shivomglobal.com`) with automated SSL certificate provisioning.

---

## 18. IMPLEMENTATION PHASES

To maintain disciplined engineering control and preserve system stability, the website improvement work is structured across **8 sequential implementation phases**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   8-PHASE WEBSITE IMPROVEMENT ROADMAP                  │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: Planning, Content Architecture & Decision Gates (CURRENT)     │
│ - Authoritative improvement blueprint establishment                    │
│ - Ratification of commercial decisions and verification gates          │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: Homepage Structure & Visual Redesign                          │
│ - Elevation of homepage sections to the 11-section wireframe           │
│ - Multi-terroir visual balance and high-contrast commodity aesthetics │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: Tea Catalogue Hub & Technical Specification Datasheets        │
│ - Dedicated product profiles for 8 tea categories                      │
│ - Standardized chemical, sieve mesh, and cup parameter tables          │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: Dedicated Private Label & OEM Hub                             │
│ - 7-step OEM sourcing and packaging journey                            │
│ - Packaging formats matrix, barrier specs, and bilingual compliance    │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 5: Buyer Inquiry Engine & Trade Desk Hardening                   │
│ - Extended qualification fields (Buyer role, target price, message)   │
│ - Database migration, serverless updates, and email template refinement│
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 6: Trust Proofs, Export Credibility & Logistics Gateway          │
│ - Visual statutory documentation suite and NABL testing protocols      │
│ - Mundra Port logistics, container stuffing math, and Incoterms guide  │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 7: Technical SEO, Metadata, Structured Data & Domain Binding     │
│ - Schema.org JSON-LD, OpenGraph cards, sitemap.xml, robots.txt         │
│ - Custom domain DNS binding and SSL provisioning                       │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 8: Cross-Device Mobile QA, Performance Audits & Founder Sign-Off │
│ - Multi-viewport regression testing (iPhone, Android, Tablet, Desktop) │
│ - Google Lighthouse audit ($\ge 95$ across all categories)              │
│ - Formal Founder production review and acceptance                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 19. PRIORITY LEVELS

To guide orderly execution, all tasks and features are classified into 4 binding priority tiers:

### 19.1 Priority P0 (Critical — Operational Foundation)
- Preserve 100% adherence to Rule 02 (Anti-Fabrication & Truth in Operations).
- Maintain 100% uptime of the production lead submission pipeline (Supabase + Resend).
- Zero mobile horizontal overflow across all viewport widths.
- Truthful positioning of SHIVOM GLOBAL as an India-based tea sourcing partner.

### 19.2 Priority P1 (High — High Commercial Impact)
- Dedicated Private Label section with expanded packaging and compliance depth.
- Specification-driven technical datasheets for Assam CTC, Orthodox, Darjeeling, and Green Tea.
- Enhanced buyer requirement fields (Buyer role, target price, message).
- Complete SEO infrastructure (JSON-LD schema, OpenGraph tags, sitemap.xml).

### 19.3 Priority P2 (Medium — Architectural & Content Depth)
- Hybrid multi-page routing (`/teas/*`, `/private-label`, `/sourcing-export`).
- "Who We Serve" 4-column buyer segmentation module.
- Downloadable technical PDF specification sheets.
- Container loading and freight calculator.

### 19.4 Priority P3 (Low — Advanced Visual Enhancements)
- Interactive particle mesh size visualizer.
- Multi-currency currency converter for indicative price ranges.
- Knowledge base / Indian tea market intelligence articles.

---

## 20. OUT-OF-SCOPE ITEMS

To protect project velocity and prevent scope creep, the following items are formally designated as **STRICTLY OUT OF SCOPE**:

1. **B2C E-Commerce / Shopping Cart:** Zero consumer retail carts, checkout flows, payment gateways (Stripe/Razorpay), or consumer retail shipping. The platform is strictly an international B2B wholesale trade desk.
2. **Live Commodity Auction Bidding Integration:** Zero live API integrations with Tea Board India auction servers or real-time ticker data. Auction sourcing is executed manually through licensed brokers and registered auction buyers.
3. **Client Login / Extranet Portals:** Zero buyer login systems, account dashboards, or password management. All buyer interactions flow through direct commercial trade desk communications.
4. **Impact on Internal BOS Architecture:** Strictly zero modifications, migrations, or public exposure of the internal Business Operating System (`BOS` / `crm_server.py` / `/dashboard`). Public website and internal operating system remain strictly isolated.
5. **Fabricated Plantation or Factory Ownership:** Strictly zero claims or graphics depicting owned tea estates, proprietary blending factories, or heavy machinery.
6. **Third-Party CMS Migration:** Strictly zero migration to WordPress, Shopify, Webflow, or Wix. The codebase remains 100% custom React + TypeScript + Vite.

---

## 21. OPEN DECISIONS / INFORMATION STILL NEEDED

The following register identifies all items requiring Founder decision or external verification before downstream implementation can unlock:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   DECISION & VERIFICATION REGISTER                     │
├────────────────────────────────────────────────────────────────────────┤
│ DEC-WEBSITE-04: Single-Page vs Multi-Page Architecture                 │
│ Status: PENDING FOUNDER RATIFICATION                                   │
│ Choice A: Pure Single Page Application with rich modals / deep links   │
│ Choice B: Hybrid Multi-Page with React Router (/teas, /private-label)  │
│ Recommendation: Choice B (enables deep SEO indexing and clean sharing) │
├────────────────────────────────────────────────────────────────────────┤
│ DEC-WEBSITE-05: Lead Intake Form Field Expansion                       │
│ Status: PENDING FOUNDER RATIFICATION                                   │
│ Choice A: Keep current 11 fields; gather extra details in follow-up    │
│ Choice B: Add 3 optional fields (Buyer Role, Target Price, Message)    │
│ Recommendation: Choice B (higher qualification quality before call)   │
├────────────────────────────────────────────────────────────────────────┤
│ DEC-WEBSITE-06: Custom Domain Acquisition & Mapping                    │
│ Status: PENDING FOUNDER TIMELINE                                       │
│ Action: Purchase shivomglobal.com and map DNS records to Vercel        │
├────────────────────────────────────────────────────────────────────────┤
│ VERIF-01: Appointed NABL Laboratory Partner Name                       │
│ Status: NEEDS VERIFICATION FROM FOUNDER                                │
│ Requirement: Identify specific testing laboratory (e.g. SGS, Eurofins, │
│ or Tea Board accredited lab) before publishing COA partner claims      │
├────────────────────────────────────────────────────────────────────────┤
│ VERIF-02: Contract Packing Partner Minimum Order Quantities (MOQs)     │
│ Status: NEEDS VERIFICATION FROM FOUNDER                                │
│ Requirement: Confirm realistic MOQs for retail pouches, tins, and bags │
│ with Indian co-packing partners before publishing on private label hub │
├────────────────────────────────────────────────────────────────────────┤
│ VERIF-03: Official Trade Desk Response SLA                             │
│ Status: NEEDS VERIFICATION FROM FOUNDER                                │
│ Requirement: Confirm standard inquiry review commitment (e.g., 24h)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 22. ACCEPTANCE CRITERIA

The website improvement work will be considered complete and ready for production sign-off only when the following criteria are met:

### 22.1 Commercial & Content Criteria
- [ ] Website clearly positions SHIVOM GLOBAL as an India-based tea sourcing and export partner across multiple tea categories.
- [ ] Assam CTC is featured as the primary volume benchmark (`DEC-005`), but does not overshadow Orthodox, Darjeeling, and Green Tea capabilities.
- [ ] Private Label is presented with full commercial depth (7-step journey, packaging formats, barrier materials, compliance support).
- [ ] All claims strictly adhere to Rule 02 (zero claimed garden ownership, zero fake factory claims, zero unverified certifications).
- [ ] Product categories display standardized specification blocks (mesh, moisture, ash, organoleptic notes, packaging).

### 22.2 Functional & Lead Intake Criteria
- [ ] Commercial lead intake engine validates all fields cleanly on client and server.
- [ ] Submissions successfully persist to the Supabase `buyer_requirements` table.
- [ ] Transactional notification emails are received by `shivomglobal1010@gmail.com` with complete parameter formatting.
- [ ] Unique reference codes (`SG-REQ-YYYYMMDD-XXXX`) are generated and presented to the buyer.
- [ ] Anti-bot honeypot and IP rate limiting function without false positives.

### 22.3 Technical & Performance Criteria
- [ ] Clean TypeScript compilation (`tsc`) with 0 errors.
- [ ] Production build (`npm run build`) compiles cleanly in <1.5 seconds.
- [ ] Google Lighthouse scores $\ge 95$ across Performance, Accessibility, Best Practices, and SEO.
- [ ] 100% valid Schema.org JSON-LD structured data (`Organization`, `Product`).
- [ ] Zero layout shifts (CLS < 0.05) and First Contentful Paint (FCP < 1.0s).

### 22.4 Mobile & Usability Criteria
- [ ] Zero horizontal overflow (`scrollWidth === clientWidth`) across all viewports (375px to 1440px).
- [ ] Touch targets $\ge 44\text{px} \times 44\text{px}$ across all buttons and inputs.
- [ ] Mobile navigation drawer opens, navigates, and closes smoothly.

---

## 23. IMPLEMENTATION TRACKING & TASK LOG

### Section Implementation Status Matrix
| Section | Component / Module | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Section 1: Hero** | `HeroSection.tsx` | **COMPLETED** | Refined copy, visible tea landscape, full-screen height (`100vh - 76px`), horizontal header logo. |
| **Section 2: What We Supply** | `TeaCategoriesSection.tsx` | **COMPLETED** | 4-category grid (Assam CTC, Orthodox, Darjeeling, Specialty), B2B tone, bottom requirement CTA. |
| **Section 3: Assam CTC Spotlight** | `AssamCtcSpotlight.tsx` | **PENDING** | Next planned implementation step. |
| **Section 4: Private Label Hub** | `PrivateLabelSection.tsx` | **PENDING** | Existing MVP component to be hardened. |
| **Section 5: Who We Serve** | `WhoWeServeSection.tsx` | **PENDING** | Planned 4-archetype buyer grid. |
| **Section 6: How It Works** | `ExportProcessFlow.tsx` | **PENDING** | Existing 6-stage roadmap. |
| **Section 7: Why SHIVOM GLOBAL** | `WhyShivomGlobal.tsx` | **PENDING** | Existing credibility pillars. |
| **Section 8: Interactive Grade Matrix** | `GradeMatrix.tsx` | **PENDING** | Existing interactive grade selector. |
| **Section 9: Export Credibility** | `ExportLogistics.tsx` | **PENDING** | Planned shipping/port documentation module. |
| **Section 10: Buyer Requirement Intake** | `BuyerRequirementForm.tsx`| **PENDING** | Hardened in Phase 4. |
| **Section 11: Site Footer & Disclosures**| `SiteFooter.tsx` | **PENDING** | Existing statutory disclosure footer. |

---

### Detailed Task Log: Section 2 — What We Supply / Tea Categories
- **Status:** `COMPLETED`
- **Files Created / Modified:**
  - `src/components/home/TeaCategoriesSection.tsx` (Created — 4 category cards, accessibility attributes, interactive handlers)
  - `src/components/home/HomePage.tsx` (Modified — positioned Section 2 immediately after HeroSection, connected category selection and grade routing)
  - `src/styles/index.css` (Modified — 2x2 grid layout, individual custom color themes & hover glows for all 4 cards, typography, badge styling, and bottom CTA strip)
- **Category Structure & Color Schemes:**
  1. **Assam CTC Black Tea** (`Core Commercial Benchmark`): Warm Honey Amber & Molten Gold theme. High-volume Indian black tea for commercial blends, tea bags and everyday consumption. Grades: `BOP`, `BOPSM`, `BP`, `PF`, `PD`, `Dust`.
  2. **Orthodox Black Tea** (`Whole & Broken Leaf`): Estate Botanical Green theme. Whole-leaf and orthodox-style Indian teas for differentiated cup profiles and premium applications. Grades: `TGFOP`, `FBOP`, `BOP`, `BOPF`.
  3. **Darjeeling Tea** (`Distinctive Terroir`): Royal Muscatel Plum / Purple theme. Distinctive Darjeeling teas for buyers seeking a recognised Indian origin and differentiated character. Grades: `FTGFOP1`, `SFTGFOP1`, `GFBOP`, `Whole Leaf`.
  4. **Specialty & Regional Teas** (`On-Demand Sourcing`): Maritime Sapphire & Nilgiri Blue theme. Selected Indian origins and tea profiles matched to specific buyer requirements. Language: *Available based on specification and sourcing requirement.* Scope: `High-Elevation Green`, `Nilgiri Terroirs`, `Custom Formulations`.
- **Bottom CTA:** Direct routing to commercial buyer requirement intake (`#requirement-form`) and grade matrix explorer (`#tea-by-grade`).
- **Responsive Behavior:** 2 cards per row on desktop/tablet, 1 column on mobile. Touch targets $\ge 44\text{px}$.
- **Validation:** Clean TypeScript check (`tsc`) and Vite build (`npm run build`). Zero lint errors.
- **Next Recommended Section:** Section 3 — Assam CTC Spotlight.
