# SHIVOM GLOBAL — International B2B Website
## Phase 1: Information Architecture & Implementation Blueprint

**Document Reference:** `SG-WEBSITE-PHASE-01-IA`  
**Location:** `00_CONTROL_CENTER/PHASE_TRACKING/WEBSITE_PHASE_1_INFORMATION_ARCHITECTURE_AND_IMPLEMENTATION_PLAN.md`  
**Date Established:** 2026-10-20  
**Status:** COMPLETED & RATIFIED BY FOUNDER (2026-10-20)  
**Authoritative Baseline:** `00_CONTROL_CENTER/PROJECT_STATUS.md`, `DECISIONS.md`, `TASKS.md`, `Task-1-UAE-Buyer-Research/provisional_tea_spec_v0.1.md`, `relative_product_data.md`  
**Core Governance Mandates:**
- `DEC-001`: Core Capital Discipline — "Buyer-First, Inventory-Last" (Strictly zero speculative procurement)
- `DEC-002`: Product-Neutral Corporate Identity — **SHIVOM GLOBAL**
- `DEC-003`: Legal Entity Structure as Sole Proprietorship (Sarthak Sarvaiya)
- `DEC-005`: Assam CTC BOP as Primary Working Product Benchmark (Flexible to buyer demand)
- `DEC-007`: Control Center as Single Authoritative Source of Truth
- `DEC-008`: Capital Capacity ₹10,00,000 (Available Capacity; ₹0 Deployed; ₹0 Inventory)
- `BLK-004`: Pre-commercial statutory gate (Zero unsupported claims or unverified credentials)

---

## 1. Executive Summary & Website Strategic Objective

SHIVOM GLOBAL requires a high-credibility, professional B2B digital gateway engineered specifically for **international commercial tea buyers** (importers, blenders, tea packers, supermarket private-label procurement managers, and specialty distributors).

### The Strategic Shift: Company-First vs. Buyer-First
- **Traditional Company-First Approach (Rejected):** Focuses internally on company history, flowery descriptions of misty tea gardens, vague promises of "unmatched quality", and generic contact forms. This forces foreign buyers to search through marketing fluff to discover whether the firm can fulfill their specific grade, mesh, packing, and destination compliance requirements.
- **New Buyer-First Approach (Approved Core Thesis):**
  > **"Tell us what tea you need; we show you how SHIVOM GLOBAL can supply it."**

The website must enable an international commercial buyer to ascertain within **10–15 seconds**:
1. **What SHIVOM GLOBAL supplies:** Bulk Indian tea and customized private-label export solutions.
2. **What types/origins are available:** Assam CTC, Orthodox, Darjeeling, and Green Tea sourced directly from vetted Indian tea ecosystems.
3. **What grades and technical specifications can be fulfilled:** Primary commercial cuts (BOP, BOPSM, BP, PF, PD, Dust) and custom blend profiles.
4. **Service modalities:** Both containerized bulk supply (25kg multi-wall kraft bags) and OEM / private-label packing.
5. **How the sourcing and export process works:** Transparent, auditable 6-stage commercial roadmap from inquiry to destination port.
6. **Why buyers can trust SHIVOM GLOBAL:** Direct requirement-led sourcing, independent laboratory testing (FSSAI / GSO 978 compliance), barrier export packaging, full documentation, and agile owner communication.
7. **How to submit a requirement immediately:** Frictionless, highly structured tea requirement intake engine.

---

## 2. Reference Architecture Analysis: DAS Tea Packing FZE

### Reference Context
- Reference URL: [https://www.dasteapacking.com/](https://www.dasteapacking.com/) (Ajman Free Zone, UAE — also tracked in repository as prospect `UAE002`).
- **Purpose of Reference:** Reviewed strictly for **Information Architecture (IA) and Content Clarity**, NOT for copying visual design, branding, copy, imagery, or web technology.

### Key Architectural Strengths Observed & Adopted
| Reference Architectural Feature | Value for International Tea Buyers | How SHIVOM GLOBAL Adapts This Feature |
|---|---|---|
| **Immediate Value Proposition** | Visitor knows within 5 seconds that the entity blends, packs, and exports tea. | Hero immediately establishes: *"Indian Tea Sourced for International Markets — Bulk Supply & Private Label"*. |
| **Clear Separation of Offerings** | Distinguishes custom blends, loose tea, packaging options, and private label into distinct visual pathways. | Dedicated **"What Are You Looking For?"** interactive router categorizing blenders, private labels, bulk buyers, and grade specialists. |
| **Requirement-Led Navigation** | Buyer navigates by their commercial operational model rather than company chronology. | Direct jumps to: Bulk Supply, CTC Grades, Orthodox, Private Label, or Custom Specs. |
| **Clear Private-Label Capability** | Explains the OEM journey (tea selection $\rightarrow$ blending $\rightarrow$ packaging $\rightarrow$ export) in plain business language. | Transparent 4-step Private Label section explaining formulation, barrier packaging, regulatory compliance, and export. |
| **Commercial Content Clarity** | Concise, professional language free of unnecessary marketing fluff. | Technical tea specifications, mesh descriptions, liquor characteristics, and export packaging standards. |

---

## 3. Existing Repository Audit & Preservation Register

### 3.1 What Currently Exists in the Repository
The repository `/Users/sarthak/SHIVOM GLOBAL` currently contains the enterprise **Business Operating System (BOS)**:
1. **Internal BOS Web App (React 18 + Vite + TypeScript):**
   - Routes: Executive Command Center (`/dashboard`), 38-Buyer CRM (`/commercial/*`), Financial Workbench (`/finance/*`), Operations Roadmaps (`/operations/*`), Export Logistics (`/export/*`), and Governance (`/tasks`, `/decisions`).
   - Route `/` currently redirects directly to `/dashboard`.
   - Connected to live Supabase PostgreSQL (`ap-south-1`) with Founder MFA authentication (`DEC-011`).
2. **Brand & Visual Assets:**
   - Vector Logo: `Shivom_Global_Logo.svg` featuring metallic gold gradients (`#CA8A04`, `#FACC15`, `#EAB308`) and deep maritime navy typography (`#1E3A8A`, `#0F172A`).
   - Raster Brand Assets: `Shivom Global Trade.png`, `Indian Tea Export Roadmap to UAE.png`.
3. **Commercial Form Prototypes:**
   - `09_BUSINESS_DOCUMENTS/DEPLOYABLE_SUPPLIER_FORM/index.html`: Fully styled bilingual (English/Gujarati) requirement intake form with tea grading fields, packaging options, and payment terms.
4. **Authoritative Tea Specifications:**
   - `Task-1-UAE-Buyer-Research/provisional_tea_spec_v0.1.md`: Laboratory parameters (moisture, ash, water-soluble ash, pesticide residue testing standards).
   - `relative_product_data.md`: Tea Board auction grading hierarchy (BOP, BOPSM, BP, PF, PD, Dust) and organoleptic cupping standards.

### 3.2 What MUST Be Preserved (Strict Non-Negotiables)
- **Zero Impact on BOS:** The internal BOS dashboard (`/dashboard`, Supabase backend, CRM data, financial engines) must remain 100% operational and isolated from public website visitors.
- **Brand Identity Continuity:** The approved trade name **SHIVOM GLOBAL** (`DEC-002`) and official vector brandmark must be preserved.
- **Capital Discipline & Truthfulness:** Website copy must never invent warehouse stock, claim owned tea gardens, show fake volume counters, or claim unissued statutory licenses (`DEC-001`, `DEC-008`, `BLK-004`).

---

## 4. Proposed Website Information Architecture (Homepage Blueprint)

The homepage is structured as an intentional buyer discovery funnel consisting of **8 unified functional sections**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER: Sticky Navigation + Logo + Direct "Submit Requirement"  │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 1: HERO — B2B Positioning & Dual Buyer CTAs                    │
│ "Indian Tea Sourced for International Markets"                         │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 2: "WHAT ARE YOU LOOKING FOR?" — Buyer Requirement Router      │
│ [Bulk Tea] [Assam CTC] [Orthodox] [Private Label] [Specific Grade] [Export]│
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 3: OUR TEA — Sourcing Categories & Origins                     │
│ [Assam CTC] [Orthodox Black Tea] [Darjeeling] [Green Tea]             │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 4: TEA BY GRADE — Technical Specifications & Grading Matrix    │
│ [BOP] [BOPSM] [BP] [PF] [PD] [Dust / CD] [Custom Blend Specs]         │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 5: HOW WE WORK — Transparent Sourcing & Export Journey         │
│ Requirement ➔ Sourcing ➔ Sample ➔ Confirmation ➔ Packing ➔ Shipment   │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 6: WHY BUYERS WORK WITH US — Commercial Diligence & Credibility│
│ Requirement-Led | Lab Tested | Export Barrier Packing | Direct Comms  │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 7: PRIVATE LABEL & PACKAGING — Custom Blending & OEM Supply    │
│ Formulation ➔ Packaging Options ➔ Labeling & Compliance ➔ Global Export│
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 8: FINAL BUYER REQUIREMENT CTA — "Tell Us What Tea You Need"   │
│ Interactive Commercial Lead Intake Engine with Preset Integration     │
├────────────────────────────────────────────────────────────────────────┤
│ GLOBAL FOOTER: Corporate Disclosure, Registrations & Direct Contacts   │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Detailed Section-by-Section Blueprint

#### Global Header & Navigation
- **Brand Mark:** Official `Shivom_Global_Logo.svg` vector.
- **Navigation Links:**
  - `Our Teas` (Anchor to Section 3)
  - `Tea by Grade` (Anchor to Section 4)
  - `How We Work` (Anchor to Section 5)
  - `Private Label` (Anchor to Section 7)
  - `Why Us` (Anchor to Section 6)
- **Primary Header Action:** `"Submit Tea Requirement"` (High-contrast gold button routing directly to Section 8).

---

#### Section 1: Hero — International B2B Positioning
- **Core Message:** Professional, requirement-led Indian tea supply for overseas blenders, packers, and distributors.
- **Main Headline:**
  > **Indian Tea Sourced for International Markets**
- **Sub-headline:**
  > Reliable B2B supply of bulk Indian teas and private-label packaging. Tell us your grade, mesh, volume, and target destination — we source and deliver to your exact commercial specification.
- **Dual Call-to-Actions (CTAs):**
  - Primary CTA (Filled Warm Gold): `"Submit Your Requirement"` $\rightarrow$ smooth scrolls to Section 8 form.
  - Secondary CTA (Outlined Deep Green): `"Explore Tea Grades"` $\rightarrow$ smooth scrolls to Section 4 grading matrix.
- **Trust Anchors (Subtle Micro-Badges):**
  - Direct Origin Sourcing (Assam & North Indian Terroirs)
  - Commercial Bulk & Private Label Capabilities
  - Strict Laboratory & Mesh Specification Matching

---

#### Section 2: "What Are You Looking For?" (Buyer Requirement Router)
- **Purpose:** Solves the primary buyer question immediately: *"Does this company cater to my exact business model?"*
- **Layout:** 6 clean, interactive selection cards. Clicking any card activates a filter or smoothly guides the buyer to the corresponding section or pre-selects the category in the Requirement Form:
  1. **Bulk Tea Supply:** Standard 25kg export packaging for repackers, blenders, and commercial tea branders.
  2. **Assam CTC:** Robust, high-color, brisk black tea ideal for daily blends, samovar preparation, and Karak chai.
  3. **Orthodox & Specialty:** Whole leaf and broken grades with aromatic floral notes for premium tea lines.
  4. **Private Label & OEM:** Custom blending, retail packaging, and brand creation services for international labels.
  5. **Specific Grade / Specification:** Sourcing to buyer's exact mesh size, leaf appearance, cup liquor, and price point.
  6. **Export Supply:** Direct containerized or LCL cargo handling with complete export documentation and sea freight to major global ports.

---

#### Section 3: Our Tea (Categories & Origins)
- **Purpose:** Present the core categories of Indian tea available through SHIVOM GLOBAL's sourcing network without exaggerating inventory holdings.
- **Categories Presented:**
  1. **Assam CTC Black Tea:**
     - *Origin:* Brahmaputra Valley, Assam, India.
     - *Cup Profile:* Deep amber-red liquor, full-bodied, brisk, pronounced malty notes. Excellent milk reactivity.
     - *Commercial Applications:* Milk tea blends, Karak chai formulations, food service, mass-market retail.
     - *Available Cuts:* BOP, BOPSM, BP, PF, PD, Dust.
  2. **Orthodox Black Tea:**
     - *Origin:* Assam & North Indian estates.
     - *Cup Profile:* Bright golden liquor, aromatic, crisp astringency, complex sweet-wood notes.
     - *Commercial Applications:* Premium loose leaf retail, breakfast blends, afternoon teas.
     - *Available Cuts:* TGFOP, FBOP, BOP, BOPF.
  3. **Darjeeling Tea:**
     - *Origin:* Darjeeling foothills (GI certified origin).
     - *Cup Profile:* Delicate golden-yellow cup, floral bouquet, renowned muscatel flavor profile.
     - *Commercial Applications:* Specialty tea boutiques, high-end retail packaging, gift collections.
  4. **Green Tea:**
     - *Origin:* Selected Indian mountain gardens.
     - *Cup Profile:* Light, clear liquor, fresh vegetal aroma, smooth with minimal bitterness.
     - *Commercial Applications:* Wellness blends, flavored tea bases, retail tea bags.

---

#### Section 4: Tea by Grade (Technical Specifications & Grading Matrix)
- **Purpose:** Build immediate credibility with experienced commercial tea tasters and buyers who speak in technical grades rather than consumer adjectives.
- **Layout:** Structured technical grid/cards mapping Tea Board India auction-standard grades:

| Grade Acronym | Full Grade Name | Particle Characteristics | Liquor & Cup Dynamics | Primary Commercial Use Case |
|---|---|---|---|---|
| **BOP** | Broken Orange Pekoe | Coarser cut, uniform broken leaf particles | Balanced liquor, rich body, pleasant briskness | Traditional English/Irish breakfast, premium loose retail |
| **BOPSM** | Broken Orange Pekoe Small | Medium particle cut, clean granulation | Stronger color extraction, brisk liquor | Blended commercial teas, samovar tea |
| **BP** | Broken Pekoe | Heavier, rounded particle size | Smooth liquor, full cup body, steady extraction | Commercial base tea for blenders and packers |
| **PF** | Pekoe Fannings | Fine, granular particle size | Fast infusion, intense reddish color, sharp briskness | Tea bags, quick-brew blends, Gulf Karak tea |
| **PD** | Pekoe Dust | Very fine, high-density granules | Instant deep colour, heavy liquor, robust astringency | Commercial catering, samovar, high-yield milk tea |
| **Dust / CD** | Churamani Dust | Ultra-fine tea cut | Maximum color density and briskness in shortest brew time | Mass-market quick-brew tea bags and commercial chai |
| **Custom Specs** | Tailored Blend Formulation | Mesh-sieved to buyer's particle size | Formulated to match buyer's benchmark sample & target price | Direct counter-sample formulation |

---

#### Section 5: How We Work (The Sourcing & Export Journey)
- **Purpose:** Demystify the procurement process and give international buyers complete confidence in transaction transparency and delivery security.
- **The 6-Step Commercial Sequence:**
  1. **Step 1: Requirement & Specification Intake:** Buyer submits target tea type, grade, particle mesh, packaging type, destination port, and target price.
  2. **Step 2: Tea Selection & Origin Sourcing:** We evaluate fresh garden lots and auction catalogues across Assam and Indian production centers to identify matching batches.
  3. **Step 3: Sample Dispatch & Sensory Evaluation:** Counter-samples are prepared and couriered to the buyer for cupping, sensory appraisal, and laboratory validation.
  4. **Step 4: Commercial Terms & Proforma Confirmation:** Once the sample is approved, we issue a clear Proforma Invoice detailing FOB/CIF pricing, payment milestones, and production lead times.
  5. **Step 5: Export Packing & Quality Documentation:** Tea is packed in export-grade moisture-barrier bags with required markings. Full documentation generated: Certificate of Origin, Phytosanitary Certificate, and Laboratory Test Reports (COA).
  6. **Step 6: Shipment & Port Delivery:** Cargo dispatched via sea (or air for express lots), shipping documents surrendered/transferred, and customs tracking supported until discharge.

---

#### Section 6: Why Buyers Work With Us (Commercial Credibility)
- **Purpose:** Differentiate SHIVOM GLOBAL from generic traders through disciplined, requirement-based sourcing and rigorous trade execution.
- **Core Pillars (Zero Fake Claims):**
  1. **Requirement-Based Sourcing:** We do not push stale warehouse stock onto buyers. Every shipment is sourced specifically to match the buyer's active specifications and harvest freshness.
  2. **Strict Quality Verification:** Physical mesh sieve testing, organoleptic cupping, and independent NABL-accredited laboratory verification (moisture, ash, pesticide limits).
  3. **Standardized Export Packaging:** Standard multi-wall kraft paper sacks with food-grade LDPE inner liners, palletized and shrink-wrapped for maritime protection.
  4. **Comprehensive Export Documentation:** Impeccable paperwork for customs clearance (Certificate of Origin, Phytosanitary, Commercial Invoice, Packing List, Certificate of Analysis).
  5. **Direct Founder Agility:** Direct communication with the founder. Fast responses, clear status tracking, and flexible commercial problem-solving without bureaucratic layers.

---

#### Section 7: Private Label & Co-Packing Solutions
- **Purpose:** Present OEM/private label capabilities clearly, establishing SHIVOM GLOBAL as a strategic contract partner for retail brands and distributors.
- **The 4-Step Private Label Journey:**
  1. **Blend Formulation:** Matching your existing market benchmark or engineering a distinct proprietary taste profile.
  2. **Packaging Flexibility:** Bulk export packaging (25kg), food-service sacks (5kg/10kg), or retail-ready consumer packaging (pouches, tins, cartons) through vetted packaging partners.
  3. **Branding & Regulatory Labeling:** Bilingual label layout assistance, ingredient declarations, nutrition facts, and destination-specific compliance (e.g., GSO packaging standards for the Gulf).
  4. **Scalable Batch Flexibility:** Sizing initial production runs to allow market testing before committing to large-scale container loads.

---

#### Section 8: Final Buyer Requirement CTA ("Tell Us What Tea You Need")
- **Purpose:** High-conversion, friction-free commercial intake mechanism replacing dead-end generic contact forms.
- **Structured Fields:**
  1. *Tea Category:* [Assam CTC / Orthodox Black / Darjeeling / Green / Open to Recommendation]
  2. *Preferred Grade:* [BOP / BOPSM / BP / PF / PD / Dust / Custom Specification]
  3. *Business Requirement:* [Bulk Tea for Repacking / Blend Base / Private Label Retail Product / Sample Request]
  4. *Estimated Order Quantity:* [Trial Batch (250–500 kg) / 1–5 MT / 1x20ft FCL (~10–12 MT) / Larger]
  5. *Preferred Packaging:* [25kg Multi-wall Kraft Sack + PE Liner / 50kg PP Bag / Retail Packaging / Custom]
  6. *Target Destination:* [Country and Discharging Sea/Air Port, e.g., Jebel Ali, UAE]
  7. *Specific Quality / Lab Criteria:* [Text box for mesh, moisture limit, or specific pesticide standards]
  8. *Commercial Contact:* [Company Name, Contact Person, Business Email, WhatsApp / Phone, Country]
- **Commitment Promise:**
  > *"We review commercial requirements within 24 business hours and respond with technical availability, sample timelines, and indicative pricing."*

---

#### Global Footer
- **Corporate Transparency:**
  - Entity Name: **SHIVOM GLOBAL**
  - Registered Base: Bhavnagar, Gujarat, India
  - Entity Classification: Sole Proprietorship (`DEC-003`) / Udyam MSME Registered (`UDYAM-GJ-05-XXXXXXX`)
- **Direct Communication:** Official business email, dedicated WhatsApp trade line.
- **Navigation Shortcuts:** Teas, Grades, Sourcing Process, Private Label, Requirement Intake.
- **Compliance & Legal:** Copyright notice, Privacy Policy, Terms of Trade.

---

## 5. Visual Direction & Design Tokens

### Core Design Philosophy
- **Style:** Premium, restrained, credible B2B export house.
- **Tone:** Authoritative, transparent, clean, and modern.
- **Inspiration:** Clean European and Gulf commodity trading houses; minimal clutter, rich typography, generous whitespace.

### Approved Color Palette
```css
:root {
  /* Primary Brand Canvas */
  --color-primary-green: #0d3829;     /* Deep Estate Green (Credibility & Agriculture) */
  --color-primary-dark: #072218;      /* Rich Deep Forest / Header Background */
  --color-accent-gold: #c59b27;       /* Warm Metallic Gold (Premium Tea / Accent) */
  --color-accent-gold-hover: #b0871d; /* Darker Gold for interactive states */
  --color-gold-sheen: #fef08a;        /* Soft gold highlight */
  
  /* Backgrounds & Surfaces */
  --bg-page: #fbfbfa;                 /* Warm Off-White / Natural Paper Tone */
  --bg-surface: #ffffff;              /* Crisp White for Cards & Content Modules */
  --bg-surface-subtle: #f4f5f3;       /* Subtle Grey-Green Tint for Alt Sections */
  --bg-dark-section: #0a1f17;         /* Deep Green-Navy for Hero and CTA sections */
  
  /* Typography & Borders */
  --text-main: #111827;               /* Near-black for maximum contrast and legibility */
  --text-muted: #4b5563;              /* Balanced Slate for body copy and descriptions */
  --text-dim: #9ca3af;                /* Subtle text for meta details and secondary labels */
  --border-subtle: #e5e7eb;           /* Clean, minimal card border */
  --border-accent: rgba(197, 155, 39, 0.3); /* Subtle gold framing */

  /* Typography Fonts */
  --font-heading: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Space Grotesk', monospace; /* Used for grades, mesh sizes, and specs */
}
```

### Visual Anti-Patterns (Strictly Avoided)
- ❌ NO generic bright green clip-art leaves or cartoon tea cups.
- ❌ NO low-resolution or generic stock photos of smiling models in tea gardens.
- ❌ NO fake animated counters (*"10,000+ Happy Clients"*, *"50+ Countries"*).
- ❌ NO unsupported claims (*"World's Best Tea"*, *"Unmatched Global Leader"*).
- ❌ NO carousel sliders that hide content from buyers on mobile.
- ❌ NO copying DAS Tea Packing's Wix layout, images, or CSS.

---

## 6. Component Reusability & Asset Audit

### 6.1 Reusable Assets from Existing Repository
| Asset / Code | Source Location | Reusability Plan |
|---|---|---|
| **Vector Brandmark** | `/Users/sarthak/SHIVOM GLOBAL/Shivom_Global_Logo.svg` | Reused directly in Header, Footer, and Hero as official SVG brandmark. |
| **Bilingual Form Schema** | `09_BUSINESS_DOCUMENTS/DEPLOYABLE_SUPPLIER_FORM/index.html` | Extract vetted form fields (grades, packing options, incoterms, buyer details) for Section 8. |
| **Technical Parameters** | `Task-1-UAE-Buyer-Research/provisional_tea_spec_v0.1.md` | Extract authentic ISO/FSSAI/GSO parameter ranges (moisture, ash, packing specs) for Section 4 & 6. |
| **Tea Grade Taxonomy** | `relative_product_data.md` | Use Tea Board India auction grade definitions (BOP, BOPSM, BP, PF, PD, Dust) for Section 4. |
| **Export Sequence** | `Export-Roadmap/FIRST_EXPORT_ROADMAP.md` | Maps directly to the 6-step "How We Work" visual flow in Section 5. |

### 6.2 New Components to Be Built
1. `SiteHeader`: Responsive sticky navigation with mobile drawer and quick CTA.
2. `HeroSection`: B2B positioning banner with dual action buttons and trust chips.
3. `RequirementRouter`: 6-card interactive selector routing commercial buyers.
4. `TeaCatalog`: Category cards detailing Assam CTC, Orthodox, Darjeeling, and Green Tea.
5. `GradeMatrix`: Technical specifications table/cards for commercial grades (BOP through Dust).
6. `ExportProcessFlow`: Visual 6-step roadmap from requirement submission to port delivery.
7. `WhyShivomGlobal`: Clean 5-pillar B2B credibility grid.
8. `PrivateLabelSection`: 4-step OEM / private label explanation with packaging cards.
9. `BuyerRequirementForm`: Comprehensive interactive lead capture with category auto-selection.
10. `SiteFooter`: Full legal, statutory, and direct communication footer.

---

## 7. Pre-Copy Verification: Missing Commercial & Business Information

In accordance with `DEC-001`, `DEC-008`, and `BLK-004`, website copy must reflect **verified factual reality**. The following items must be verified before finalizing public-facing copy:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ PRE-COPY VERIFICATION CHECKLIST (Must Verify Before Launch)           │
├────────────────────────────────────────────────────────────────────────┤
│ [ ] 1. Official Corporate Email Domain (e.g. exports@shivomglobal.com) │
│ [ ] 2. Dedicated International WhatsApp / Trade Phone Number           │
│ [ ] 3. GSTIN / IEC Disclosure Posture (Display upon issuance only)     │
│ [ ] 4. Third-Party Packaging Partner Capabilities for Private Label    │
│ [ ] 5. Accredited Laboratory Partners (e.g. SGS / NABL-certified labs)  │
│ [ ] 6. Gateway Export Ports (e.g. Kolkata/Haldia for Assam, Mundra)    │
│ [ ] 7. Minimum Order Quantities (MOQs) for Trial Batches vs. FCL       │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Official Corporate Communication Channels:**
   - Need confirmed business inquiry email address and WhatsApp business number for the public website.
2. **Statutory Identifier Display Policy:**
   - Udyam MSME registration is officially granted (`UDYAM-GJ-05-XXXXXXX`).
   - GSTIN and IEC are currently in-progress with the CA (`BLK-001`, `BLK-002`).
   - *Rule:* The website will proudly state Indian registered enterprise status, but will NOT display placeholder registration numbers.
3. **Private-Label Packaging Partner Scope:**
   - Confirm partner capabilities for consumer packaging (e.g., loose pouches, heat-sealed foil, tea bags) vs. bulk sacks (25kg kraft paper) to ensure OEM promises match exact fulfillment capabilities.
4. **Third-Party Testing Laboratories:**
   - Confirm specific NABL-accredited laboratories used for pre-shipment Certificates of Analysis (COA) to accurately reference testing rigor.
5. **Port Logistics & Standard Incoterms:**
   - Confirm primary dispatch ports (Kolkata Port for direct Assam rail/road cargo; Mundra/Kandla for Western India sea lines) and standard offered terms (FOB Indian Port / CIF Jebel Ali & GCC / CFR).
6. **Minimum Order Quantities (MOQ):**
   - Confirm exploratory trial MOQ (e.g. 250 kg / 500 kg air/LCL) vs. commercial container loads (1 x 20ft FCL ~10–12 MT).

---

## 8. Implementation Staging Roadmap (For Subsequent Execution Phases)

> [!NOTE]
> Execution remains strictly gated. No coding will begin until the founder formally reviews and approves this blueprint.

```text
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: PLANNING & ALIGNMENT (THIS DOCUMENT)                         │
│ Blueprint, IA, Governance Alignment & Information Gap Identification  │
│ [STATUS: PROPOSED — PENDING OWNER RATIFICATION]                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: FOUNDATION & DESIGN SYSTEM TOKENS                            │
│ Vanilla CSS tokens, Typography, Responsive Grid & Reusable UI Shell    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 3: COMPONENT DEVELOPMENT & PAGE ASSEMBLY                         │
│ Build 8 Homepage Sections (Hero, Router, Catalog, Grades, Process,     │
│ Why Us, Private Label, and Requirement Form)                           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 4: REQUIREMENT INTAKE & LEAD INTEGRATION                         │
│ Form validation, interactive preset filters, and submission handling   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 5: CONTENT VERIFICATION & MOBILE AUDIT                           │
│ Cross-check claims against verified data; multi-viewport mobile test   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 6: PRODUCTION PACKAGING & DEPLOYMENT PREPARATION                 │
│ SEO metadata, OpenGraph tags, asset optimization & hosting readiness   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Next Steps for Founder Review

The Founder (Sarthak Sarvaiya) is requested to review:
1. Does this 8-section buyer-first homepage architecture accurately reflect the intended commercial positioning?
2. Are the tea categories (Assam CTC, Orthodox, Darjeeling, Green) and grading matrix (BOP, BOPSM, BP, PF, PD, Dust) aligned with our sourcing direction?
3. Are the missing commercial details (email, WhatsApp, packaging partners, MOQs) noted accurately for upcoming verification?
4. Upon founder approval, we will proceed to Stage 2 (Design System & Reusable UI Shell).
