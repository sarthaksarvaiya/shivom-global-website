# SHIVOM GLOBAL — Phase 4: Master Issue Register
## Comprehensive Audit Findings, Severity Classifications & Remediation Matrix

> **Document Status**: Complete & Authoritative  
> **Target Platform**: `https://shivom-global-website.vercel.app/`  
> **Baseline Date**: 2026-11-03  
> **Reference Documents**: `docs/WEBSITE_PHASE_4_AUDIT.md`, `docs/PHASE_4_BUYER_JOURNEY.md`

---

## 1. Issue Severity Classification System

| Severity | Definition | Commercial & Operational Impact | Target SLA |
|---|---|---|---|
| **P0 (Blocker)** | Critical system breakdown, data loss vulnerability, or fatal conversion flaw | Inquiries dropped or lost; server 500 error; zero buyer confirmation | Immediate / Phase 4A |
| **P1 (High)** | Severe commercial friction, major information gap, or trade mismatch | UAE buyers hesitate or drop off; missing core products (Karak, Darjeeling in SEC04) | Phase 4A / 4B |
| **P2 (Medium)** | Usability defect, ontological confusion, or missed commercial positioning | Unclear MOQs, dropdown ambiguity, mobile button overlap, missing CEPA benefit | Phase 4B / 4C |
| **P3 (Polish)** | Enhancement, minor accessibility gap, metadata enrichment, or visual refinement | Missing JSON-LD schemas, keyboard events on cards, GST timezone display | Phase 4C |

---

## 2. Master Issue Register Table

| Issue ID | Scope / Section | Severity | Summary / Title | Affected Components / Files |
|---|---|---|---|---|
| `P4-01` | Backend / API (`sec-08`) | **P0** | Supabase Dependency Single-Point-of-Failure: Missing Env Vars Return Hard 500 | `api/buyer-requirements.ts` |
| `P4-02` | Backend / Form (`sec-08`) | **P0** | Absence of Automated Transactional Buyer Acknowledgment Email | `api/buyer-requirements.ts`, Resend API |
| `P4-03` | Form UI (`sec-08`) | **P1** | Form A Contextual Blindness: Pre-Selected Grade Hidden in Quick Form | `src/features/buyer-requirement/components/BuyerRequirementForm.tsx` |
| `P4-04` | Catalog & Specs (`sec-03`/`04`)| **P1** | Suboptimal Prominence for UAE Karak Chai Market (CTC Dust/PD/D1) | `TeaCategoriesSection.tsx`, `GradeSpecificationTable.tsx` (SEC04 **Resolved**) |
| `P4-05` | Grade Matrix (`sec-04`) | **P1** | Complete Absence of Darjeeling & Green Tea Grades in Reference Table | `src/features/tea-catalog/components/GradeSpecificationTable.tsx` (**Resolved**) |
| `P4-06` | Commercial Positioning (`sec-02`/`07`)| **P1** | Unleveraged Logistics Speed Advantage: Mundra/Kandla to Jebel Ali (3–5 Days) | `HeroSection.tsx`, `WhyShivomGlobal.tsx`, `SiteFooter.tsx` |
| `P4-07` | Packaging (`sec-05`) | **P1** | Complete Absence of Baseline MOQs & UAE Food Regulatory Standards | `src/features/private-label/components/PrivateLabelSection.tsx` |
| `P4-08` | Export Process (`sec-06`) | **P1** | Operational Ambiguity: Missing Sampling Turnaround SLAs & Payment Terms | `src/features/export-process/components/HowItWorksSection.tsx` |
| `P4-09` | Hero Visual (`sec-02`) | **P2** | Hero Right Column Pure CSS 3D Composition vs Authentic Photography | `HeroPackagingComposition.tsx`, `HeroSection.tsx` |
| `P4-10` | Compliance (`sec-07`) | **P2** | Unclaimed Commercial Incentive: Zero Duty Under India-UAE CEPA | `src/features/company/components/WhyShivomGlobal.tsx` |
| `P4-11` | Form B UI (`sec-08`) | **P2** | Ontological Category Confusion in "Tea Type" Dropdown | `BuyerRequirementForm.tsx` |
| `P4-12` | Form B UI (`sec-08`) | **P2** | Destination Port & Country Free-Text Lacks Gulf Port Fast-Select Pills | `BuyerRequirementForm.tsx` |
| `P4-13` | Header Nav (`sec-01`) | **P2** | Desktop Header Lacks Direct Phone/WhatsApp Number & Office Hours | `src/components/layout/SiteHeader.tsx` |
| `P4-14` | Mobile UI (`sec-10`) | **P2** | Floating WhatsApp Button Obscures Form Input Fields on Small Screens | `src/components/layout/WhatsAppFloat.tsx`, `index.css` |
| `P4-15` | Technical SEO | **P3** | JSON-LD Structured Data Lacks Commodity Products & Offer Catalog | `index.html` |
| `P4-16` | Trade Desk / Governance (`sec-09`)| **P3** | Trade Desk Operating Hours Lack Gulf Standard Time (GST = UTC+4) | `SiteFooter.tsx`, `SiteHeader.tsx` |
| `P4-17` | Accessibility (`sec-07`) | **P3** | Interactive Value Pillar Cards Lack Keyboard Enter/Space Handler | `WhyShivomGlobal.tsx` |
| `P4-18` | Form Feature (`sec-08`) | **P3** | Lack of Technical Specification / COA File Attachment (<5MB) | `BuyerRequirementForm.tsx`, `api/buyer-requirements.ts` |

---

## 3. Detailed Finding Profiles

---

### Finding P4-01: Supabase Dependency Single-Point-of-Failure (P0 — Blocker)

- **Scope**: Backend API (`api/buyer-requirements.ts`).
- **Evidence**:
  ```typescript
  // lines 538-547 in api/buyer-requirements.ts
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    sendJsonResponse(500, {
      success: false,
      error: 'We could not submit your requirement at this time. Please try again.',
    });
    return;
  }
  // lines 603-609:
  if (!dbInsertSuccess) {
    sendJsonResponse(500, {
      success: false,
      error: 'We could not submit your requirement at this time. Please try again.',
    });
    return;
  }
  ```
- **Buyer Impact**: If Supabase credentials are missing or the database endpoint experiences downtime, the submission fails with an unhelpful error. The buyer leaves without reaching the trade desk.
- **Business Impact**: Total lead loss. Even though transactional email (Resend) could have successfully alerted the trade desk, the hard gate on Supabase blocks all email dispatch.
- **Recommended Action**: Implement an asynchronous fallback queue: if Supabase fails or credentials are unset in staging/dev, attempt email dispatch directly with an internal `[DB_UNAVAILABLE]` flag, generate the Reference ID, and alert the trade desk so no buyer inquiry is lost.
- **Affected Files**: `api/buyer-requirements.ts`.
- **Verification Method**: Test API invocation with mocked invalid Supabase credentials; verify email is dispatched and controlled success is returned.

---

### Finding P4-02: Absence of Automated Transactional Buyer Acknowledgment Email (P0 — Blocker)

- **Scope**: Backend Inquiry Pipeline (`api/buyer-requirements.ts`, `submissionAdapter.ts`).
- **Evidence**:
  - The API dispatches an email solely to `process.env.EMAIL_TO` (`shivomglobal1010@gmail.com`).
  - No transactional message is sent to `sanitized.businessEmail`.
- **Buyer Impact**: The buyer submits a high-value commercial inquiry but receives zero written confirmation in their corporate inbox. They have no paper trail, no confirmed reference number to cite internally, and no SLA on when to expect a response.
- **Business Impact**: High buyer abandonment and duplicate submissions. In international trade, corporate procurement officers require an instant automated email confirmation to log the RFQ in their enterprise ERP.
- **Recommended Action**: Update `api/buyer-requirements.ts` to dispatch a clean, professional, bilingual (or English) transactional confirmation email to `sanitized.businessEmail` via Resend, containing:
  1. Authoritative Reference Number (`SG-REQ-YYYYMMDD-XXXX`).
  2. Summary of submitted specifications (Grade, Volume, Packaging, Destination Port).
  3. Stated Trade Desk SLA (Response within 24 business hours).
  4. Direct 1-click WhatsApp follow-up link.
- **Affected Files**: `api/buyer-requirements.ts`.
- **Verification Method**: Submit test inquiry with valid recipient email; inspect inbox for arrival within 15 seconds.

---

### Finding P4-03: Form A Contextual Blindness — Pre-Selected Grade Hidden in UI (P1 — High)

- **Scope**: Form UI (`src/features/buyer-requirement/components/BuyerRequirementForm.tsx`).
- **Evidence**:
  - In `HomePage.tsx`, clicking "Specify BOP" calls `handleSelectGrade('BOP')`, which scrolls to `#requirement-form`.
  - In `BuyerRequirementForm.tsx`, `formMode` defaults to `'quick'` (Form A).
  - Form A renders: Name, Company, Email, Phone, Country, Message.
  - The pre-selected category (`Assam CTC`) and grade (`BOP`) are passed silently to `buildRequirementRecord()`, but **nowhere appears in Form A's rendered visual UI**.
- **Buyer Impact**: Cognitive confusion. The buyer took an explicit action to specify "Assam CTC BOP", but lands on a generic form showing only personal contact inputs. They assume the website failed to capture their selection and re-type the grade in the message box.
- **Business Impact**: Form abandonment due to perceived lack of responsiveness or system glitch.
- **Recommended Action**: In Form A, add a contextual preselection summary pill directly above the form fields:
  ```html
  <div class="quick-form-context-pill">
    <span>Requirement: <strong>Assam CTC — BOPSM</strong></span>
    <button type="button" class="btn-change-spec">Change</button>
  </div>
  ```
- **Affected Files**: `src/features/buyer-requirement/components/BuyerRequirementForm.tsx`, `src/styles/index.css`.
- **Verification Method**: Click "Specify" on any grade in SEC04; verify Form A immediately displays the active grade badge.

---

### Finding P4-04: Suboptimal Prominence for UAE Karak Chai Market (CTC Dust/PD/D1) (P1 — High) [RESOLVED]

- **Status**: **RESOLVED** (2026-11-04)
- **Remediation**:
  1. Highlighted Karak chai suitability across Pekoe Dust (`PD`) and Dust 1 (`Dust / D1`) in `commercialGradesData.ts` with prominent `[Karak Chai]` tags and dedicated high-extraction profiles.
  2. Integrated dedicated visual cards and technical specification drawers in `TeaOriginGradeExplorer.tsx` detailing instant liquor yield with evaporated milk.
  3. Added explicit Karak Chai designations in `BuyerRequirementForm.tsx` dropdown options.
- **Affected Files**: `src/features/tea-catalog/components/TeaOriginGradeExplorer.tsx`, `src/features/tea-catalog/data/commercialGradesData.ts`, `src/features/buyer-requirement/components/BuyerRequirementForm.tsx`.
- **Verification Method**: Browser inspection and responsive visual capture on desktop and mobile viewports.

---

### Finding P4-05: Complete Absence of Darjeeling & Green Tea Grades in Reference Table (P1 — High) [RESOLVED]

- **Status**: **RESOLVED** (2026-11-04)
- **Remediation**:
  1. Expanded commercial grade catalog to 14 entries in `commercialGradesData.ts`, incorporating Darjeeling First Flush (`FTGFOP1 (FF)`), Darjeeling Second Flush (`TGFOP1 (SF)`), Indian Green Tea Whole Leaf (`Green Whole Leaf`), and Green Tea Bag Sieve Cut (`Green Fannings`).
  2. Implemented 4-category visual explorer cards with authentic photography and WAI-ARIA tab navigation filtering across all 4 manufacturing classifications.
  3. Linked Darjeeling entries with statutory GI-compliance and Tea Board registration provenance disclosures.
- **Affected Files**: `src/features/tea-catalog/components/TeaOriginGradeExplorer.tsx`, `src/features/tea-catalog/data/commercialGradesData.ts`, `src/features/tea-catalog/types/gradeMatrix.ts`.
- **Verification Method**: Browser inspection of category tabs, drawer specifications, and Form B dropdown pre-population across all 14 grades.

---

### Finding P4-06: Unleveraged Logistics Speed Advantage — Mundra/Kandla to Jebel Ali (3–5 Days) (P1 — High)

- **Scope**: Commercial Positioning (`sec-02`, `sec-07`, `sec-09`).
- **Evidence**:
  - The website mentions ports generically: *"Mundra, Kandla, Kolkata, JNPT"* and *"FOB Indian Ports & CIF Worldwide"*.
  - It nowhere states that container shipments from Gujarat ports (Mundra / Kandla) reach Port Jebel Ali (Dubai) in just **3 to 5 days ocean transit**.
- **Buyer Impact**: Buyers comparing Indian tea against Kenyan tea (Mombasa: 12–16 days) or Sri Lankan tea (Colombo: 7–10 days) or East Indian tea (Kolkata: 12–18 days) do not realize SHIVOM GLOBAL's Gujarat base provides the fastest ocean freight corridor to the Gulf.
- **Business Impact**: Forfeits a major competitive differentiator for inventory turns and urgent supply replenishment.
- **Recommended Action**: Integrate the Western Corridor shipping advantage into the Hero trust strip, Section 07 ports description, and Section 09 footer:
  > *"Direct Western Corridor Shipping: Fast 3–5 Day Ocean Transit from Gujarat Gateways (Mundra/Kandla) to Port Jebel Ali, UAE."*
- **Affected Files**: `src/features/hero/components/HeroSection.tsx`, `src/features/company/components/WhyShivomGlobal.tsx`, `src/components/layout/SiteFooter.tsx`.
- **Verification Method**: Verify copy across Hero, Section 07, and Footer.

---

### Finding P4-07: Complete Absence of Baseline MOQs & Food Packaging Compliance (P1 — High)

- **Scope**: Private Label & Packaging (`src/features/private-label/components/PrivateLabelSection.tsx`).
- **Evidence**:
  - Every card states: *"Quantities discussed on requirement"*, *"Flexible bulk consolidations"*, *"Trial batches discussed on requirement"*.
  - No mention of UAE food packaging regulatory standards (ESMA, Dubai Municipality, Arabic/English bilingual labeling, FoodWatch registration).
- **Buyer Impact**: Institutional brands assume SHIVOM GLOBAL either lacks actual contract packaging capacity or requires prohibitive multi-container minimums.
- **Business Impact**: Disqualifies high-margin private label inquiries.
- **Recommended Action**:
  1. Provide realistic commercial volume guidance:
     - *Bulk Sacks*: From 1 Pallet (~1 MT trial) to 1x20ft FCL (~10–12 MT).
     - *Retail Pouches / Tins*: From 2,500 units per SKU.
     - *Tea Bags*: From 50,000 envelopes (single or double chamber).
  2. Add a compliance statement on destination packaging support:
     - *"Packaging coordinated in compliance with destination import regulations, including bilingual Arabic/English nutritional labeling, barcode integration, and food-grade barrier certificates."*
- **Affected Files**: `src/features/private-label/components/PrivateLabelSection.tsx`.
- **Verification Method**: Review Section 05 rendered cards in desktop and mobile viewports.

---

### Finding P4-08: Operational Ambiguity — Missing Sampling Turnaround SLAs & Payment Terms (P1 — High)

- **Scope**: Sourcing Flow (`src/features/export-process/components/HowItWorksSection.tsx`).
- **Evidence**:
  - Step 03 mentions *"Representative counter-samples can be arranged"* without specifying turnaround time or courier carrier.
  - Step 05 mentions *"commercial discussion and payment milestones"* without identifying standard international payment instruments.
  - Sample courier cost policy (who pays for international air courier) is omitted.
- **Buyer Impact**: Importers worry about delayed samples or unstandardized payment demands (e.g. 100% advance wire transfer).
- **Business Impact**: Delays pipeline velocity; increases qualification drop-off.
- **Recommended Action**:
  1. Add sampling SLA: *"Counter-samples dispatched within 3–5 working days via international air courier (DHL/FedEx/Aramex)"*.
  2. State standard commercial trade instruments: *"Commercial contracts structured on standard international payment terms: Irrevocable Letter of Credit (LC) at sight, Telegraphic Transfer (TT: 30% advance deposit, 70% against Bill of Lading copy), or Documents Against Payment (CAD/DP) for approved trading partners"*.
  3. Clarify courier policy: *"Sample tea is provided complimentary for qualified commercial inquiries; courier airfreight structured by mutual arrangement"*.
- **Affected Files**: `src/features/export-process/components/HowItWorksSection.tsx`.
- **Verification Method**: Inspect Section 06 step descriptions.

---

### Finding P4-09: Hero Right Column Pure CSS 3D Composition vs Authentic Photography (P2 — Medium)

- **Scope**: Hero Section (`HeroPackagingComposition.tsx`, `HeroSection.tsx`).
- **Evidence**:
  - The right column of the hero is a 300-line pure CSS 3D composition simulating a slate stone pedestal, kraft sack, black pouch, and canister.
  - Rule 8 specifies: *"Use premium, authentic Indian tea photography"*.
- **Buyer Impact**: While visually creative, institutional B2B buyers can perceive pure CSS vector graphics as a design prototype rather than an established commercial export desk.
- **Business Impact**: Subtle dampening of first-impression institutional gravitas.
- **Recommended Action**: Maintain the CSS composition as a fallback/interactive element, but consider introducing an authentic photograph or hybrid composition of actual export sacks and tea leaves on a sampling table in a future phase.
- **Affected Files**: `src/features/hero/components/HeroPackagingComposition.tsx`.
- **Verification Method**: Visual audit across viewports.

---

### Finding P4-10: Unclaimed Commercial Incentive — Zero Duty Under India-UAE CEPA (P2 — Medium)

- **Scope**: Compliance & Trust (`src/features/company/components/WhyShivomGlobal.tsx`).
- **Evidence**:
  - Section 07 lists standard export documents (Phytosanitary, Certificate of Origin, Shipping Bill, Bill of Lading).
  - It does not mention the **India-UAE Comprehensive Economic Partnership Agreement (CEPA)**, which grants preferential zero customs duty on Indian tea imports into the UAE.
- **Buyer Impact**: Buyers are not reminded of the direct tariff savings of sourcing directly from an Indian exporter with Chamber of Commerce COO certification.
- **Business Impact**: Missed opportunity to highlight a 5% customs duty savings compared to non-CEPA origins.
- **Recommended Action**: In Section 07's Certificate of Origin card, add:
  > *"Qualifies for preferential zero-duty or reduced tariff entry into the UAE under the India-UAE Comprehensive Economic Partnership Agreement (CEPA)."*
- **Affected Files**: `src/features/company/components/WhyShivomGlobal.tsx`.
- **Verification Method**: Inspect compliance checklist items in Section 07.

---

### Finding P4-11: Ontological Category Confusion in Form B "Tea Type" Dropdown (P2 — Medium)

- **Scope**: Form B Inputs (`BuyerRequirementForm.tsx`).
- **Evidence**:
  - The dropdown for "Tea Type" contains:
    - `Assam CTC` (botanical/processing category)
    - `Orthodox` (botanical/processing category)
    - `Darjeeling` (origin category)
    - `Green Tea` (botanical category)
    - `Bulk Tea Supply` (packaging/volume model — not a tea type!)
    - `Private Label Retail Product` (business format — not a tea type!)
    - `Custom Specification` (grading attribute — not a tea type!)
- **Buyer Impact**: Buyers find it confusing to choose between "Assam CTC" and "Bulk Tea Supply" when they want bulk Assam CTC.
- **Business Impact**: Distorted lead categorization in Supabase.
- **Recommended Action**: Restructure the dropdown into clean botanical/origin tea categories:
  - `Assam CTC Black Tea`
  - `Assam Orthodox Black Tea`
  - `Darjeeling Specialty Black Tea`
  - `Indian Green Tea`
  - `Blended Commercial Formulation`
  - `Other / Custom Specification`
  (Packaging format is already handled by the separate Packaging dropdown).
- **Affected Files**: `src/features/buyer-requirement/components/BuyerRequirementForm.tsx`.
- **Verification Method**: Inspect dropdown options in Form B.

---

### Finding P4-12: Destination Port & Country Free-Text Lacks Gulf Port Fast-Select Pills (P2 — Medium)

- **Scope**: Form B Inputs (`BuyerRequirementForm.tsx`).
- **Evidence**:
  - `destinationPort` is an unassisted `<input type="text">` with placeholder `"e.g. Jebel Ali / Felixstowe"`.
- **Buyer Impact**: Increases typing effort on mobile devices.
- **Business Impact**: Inconsistent port names in database (e.g. "Dubai", "Jebel Ali", "DXB", "UAE").
- **Recommended Action**: Add quick-select pills directly below the port input:
  `[ Jebel Ali (UAE) ]` `[ Hamriyah / Sharjah (UAE) ]` `[ Dammam (KSA) ]` `[ Jeddah (KSA) ]` `[ Shuwaikh (Kuwait) ]` `[ Other ]`.
- **Affected Files**: `src/features/buyer-requirement/components/BuyerRequirementForm.tsx`.
- **Verification Method**: Click port pill; verify input field updates instantly.

---

### Finding P4-13: Desktop Header Navigation Lacks Direct Phone/WhatsApp Number (P2 — Medium)

- **Scope**: Site Header (`src/components/layout/SiteHeader.tsx`).
- **Evidence**:
  - Header displays Logo, 5 Nav links, and "Request a Quote" CTA button.
  - Direct telephone / WhatsApp number is omitted from the top bar.
- **Buyer Impact**: Gulf B2B buyers who prefer calling or WhatsApping immediately must scroll to the footer or hunt for the floating trigger.
- **Business Impact**: Reduced immediate outbound contact conversion.
- **Recommended Action**: Add a compact direct trade desk phone/WhatsApp link in the header utility area or adjacent to the CTA:
  `WhatsApp: +91 97370 30437`.
- **Affected Files**: `src/components/layout/SiteHeader.tsx`, `src/styles/index.css`.
- **Verification Method**: Inspect desktop header at 1440px and 1280px.

---

### Finding P4-14: Floating WhatsApp Button Obscures Form Input Fields on Small Screens (P2 — Medium)

- **Scope**: Mobile Layout (`src/components/layout/WhatsAppFloat.tsx`).
- **Evidence**:
  - Fixed position: `bottom: 24px; right: 20px; z-index: 99;`.
  - On 375px/390px screens, when the user scrolls through `#requirement-form`, the circular button hovers over the right edge of input fields and the submit button.
- **Buyer Impact**: Accidental taps on the floating button while trying to type in form fields or tap the submit button.
- **Business Impact**: Mobile form abandonment.
- **Recommended Action**: Add an intersection observer or CSS rule to hide the floating button or reduce its opacity when `#requirement-form` is actively in viewport or focused on mobile.
- **Affected Files**: `src/components/layout/WhatsAppFloat.tsx`, `src/styles/index.css`.
- **Verification Method**: Test on mobile emulator (375×812); focus on form inputs; observe floating button behavior.

---

### Finding P4-15: JSON-LD Structured Data Lacks Commodity Products & Offer Catalog (P3 — Polish)

- **Scope**: Technical SEO (`index.html`).
- **Evidence**:
  - JSON-LD script defines `Organization` and `WebSite` schemas.
  - Specific B2B product catalog entries (`Product` or `ItemList` for Assam CTC, Orthodox, Darjeeling) are missing.
- **Buyer Impact**: None directly in UI; impacts search crawler semantic indexing.
- **Business Impact**: Reduced rich snippet eligibility in Google B2B search.
- **Recommended Action**: Expand JSON-LD `@graph` in `index.html` to include an `ItemList` of offered tea sourcing categories.
- **Affected Files**: `index.html`.
- **Verification Method**: Validate via Google Rich Results Test.

---

### Finding P4-16: Trade Desk Operating Hours Lack Gulf Standard Time (GST = UTC+4) (P3 — Polish)

- **Scope**: Trade Desk & Footer (`SiteFooter.tsx`, `SiteHeader.tsx`).
- **Evidence**:
  - Working hours are either unspecified or described vaguely as *"Mon – Sat (Trade Desk Direct Intake)"*.
- **Buyer Impact**: Gulf buyers do not know whether the trade desk aligns with their working week (Sunday–Thursday or Monday–Friday) or hours.
- **Business Impact**: UAE buyers in Dubai (GST = UTC+4) are only 1.5 hours behind India (IST = UTC+5:30). Highlighting this minimal time difference reinforces real-time accessibility.
- **Recommended Action**: Add clear timezone reference in Footer: *"Trade Desk Intake: Mon – Sat, 08:30 – 19:00 GST / IST"*.
- **Affected Files**: `src/components/layout/SiteFooter.tsx`, `src/constants/contact.ts`.
- **Verification Method**: Verify footer rendered text.

---

### Finding P4-17: Interactive Value Pillar Cards Lack Keyboard Enter/Space Handler (P3 — Polish)

- **Scope**: Accessibility (`src/features/company/components/WhyShivomGlobal.tsx`).
- **Evidence**:
  - The 4 pillar cards have `role="button"` and `tabIndex={0}`, with `onClick` and `onMouseEnter`.
  - Missing `onKeyDown` handler for `Enter` and `Space`.
- **Buyer Impact**: Keyboard-only and assistive technology users cannot expand pillar details using standard keyboard commands.
- **Business Impact**: Minor accessibility compliance gap against WCAG 2.1.1 (Keyboard).
- **Recommended Action**: Add `onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedPillar(idx); } }}`.
- **Affected Files**: `src/features/company/components/WhyShivomGlobal.tsx`.
- **Verification Method**: Tab to pillar card; press Enter/Space; verify card expands.

---

### Finding P4-18: Lack of Technical Specification / COA File Attachment (<5MB) (P3 — Polish)

- **Scope**: Form Feature (`BuyerRequirementForm.tsx`, `api/buyer-requirements.ts`).
- **Evidence**:
  - The form is pure text inputs; buyers cannot attach a Certificate of Analysis (COA), packaging artwork, or photo of their benchmark tea.
- **Buyer Impact**: Buyers must submit text first, then initiate an external WhatsApp or email exchange to transmit documents.
- **Business Impact**: Adds one extra step to the technical evaluation loop.
- **Recommended Action**: Evaluate adding an optional client-side file attachment (<5MB PDF/JPEG/PNG) stored temporarily in Supabase Storage or sent via Resend attachment in Phase 5.
- **Affected Files**: `BuyerRequirementForm.tsx`, `api/buyer-requirements.ts`.
- **Verification Method**: File upload acceptance test.

