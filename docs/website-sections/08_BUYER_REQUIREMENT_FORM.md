# 08 — Buyer Requirement Form (Dual-Mode Sourcing Engine & API Integration)

## 1. Section Overview
- **Section ID**: `sec-08` / `<section id="requirement-form" className="buyer-engine-section">`
- **Section Name**: Buyer Requirement Engine (Dual-Mode Sourcing & Quotation Form)
- **Position on Website**: Section 7 of the main content flow, rendered directly below `WhyShivomGlobal` and preceding `SiteFooter`.
- **Main Purpose**: Provide an institutional intake engine enabling international tea buyers to submit commercial sourcing requirements, request physical counter-samples, and obtain proforma quotations via either a streamlined 5-field Quick Enquiry form or a granular 12-field Detailed Specification form.
- **Target Audience**: Corporate tea procurement officers, international importers, tea blenders, private-label brand creators, and overseas tea packaging distributors.
- **Business Objective**: Serve as the website's primary conversion engine, capturing verified B2B buyer leads with cryptographically generated tracking references, persisting records to a secure Supabase PostgreSQL database, and triggering automated trade desk email notifications.

## 2. Current Implementation
- **Existing Design Description**: Executive corporate intake terminal with a clean, focused single-card container, tabbed mode switcher, dynamic contextual preselection, inline field validation, anti-bot honeypot protection, and a verified reference confirmation screen.
- **Existing Layout**:
  - **Section Header**: Centered H2 title ("Tell Us What Tea You Need"), explanatory lead copy, and a 2-tab mode switcher (`.buyer-form-mode-switch`):
    - Tab 1: "Quick Enquiry / Samples" (`formMode === 'quick'`, default)
    - Tab 2: "Detailed Tea Requirement" (`formMode === 'detailed'`)
  - **Form Container Card**: MaxWidth 780px card with subtle border and elevation (`.buyer-engine-card`).
  - **Form A (Quick Enquiry / Samples)**:
    - 2-column grid for Name and Company.
    - 2-column grid for Corporate Email and WhatsApp/Phone.
    - Full-width Country field.
    - Message / Quality details textarea.
    - Primary Submit Button: "Submit Quick Enquiry" (`.buyer-form-submit-btn`).
  - **Form B (Detailed Tea Requirement)**:
    - Part 1: Commercial Tea Specifications (Requirement Type, Grade/Cut, Volume Tier, Packaging Format, Destination Port, Quality Details).
    - Part 2: Corporate Identity & Communication (Company Name, Contact Person, Corporate Email, WhatsApp/Phone, Country, Target Price, Additional Message).
    - Primary Submit Button: "Submit Commercial Requirement".
  - **Success Confirmation Screen**:
    - Animated entrance via `motion.div`.
    - Verification checkmark icon (`CheckCircle2`).
    - Reference Number display box (`SG-REQ-YYYYMMDD-XXXX`).
    - Instant WhatsApp follow-up button with prefilled reference ID.
    - "Submit Another Requirement" reset button.
- **Visual Elements**:
  - Monospace reference codes (`.font-spec`).
  - Required field indicators (`form-label-required`).
  - Inline error alerts (`AlertCircle`).
  - Success banner with brand green accent.
- **Current Functionality**:
  - Contextual synchronization: Automatically listens to `initialRequirementType`, `initialGrade`, and `initialIntent` props from prior sections.
  - Strict client-side regex and length validation before network dispatch.
  - Dual-mode switching preserves previously entered fields where shared.
  - Seamless form submission to `POST /api/buyer-requirements`.

## 3. Component Mapping
- **React Component Name**: `BuyerRequirementForm`
- **Exact Source File Path**: `src/features/buyer-requirement/components/BuyerRequirementForm.tsx`
- **Related Subcomponents & Modules**:
  - `src/features/buyer-requirement/types/buyerRequirement.ts` (Types & Taxonomies)
  - `src/features/buyer-requirement/utils/requirementValidation.ts` (Validation rules & sanitization)
  - `src/features/buyer-requirement/services/submissionAdapter.ts` (Network adapter)
- **Shared Components & Utilities**:
  - `src/constants/contact.ts` (`CONTACT_INFO` for WhatsApp follow-up links)
  - `motion`, `AnimatePresence`, `useReducedMotion` from `motion/react`
  - Icons from `lucide-react`: `Send`, `CheckCircle2`, `RotateCcw`, `AlertCircle`, `RefreshCw`, `Sparkles`, `ClipboardList`, `MessageCircle`

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 4128–4520: Buyer engine section, card, mode switcher, form inputs, error states, and success screen).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--bg-card)` (#FFFFFF), `var(--border-medium)` (#D1D5DB), `var(--border-strong)` (#9CA3AF), `var(--color-primary-green)` (#0D3829), `var(--color-gold)` (#C59B27), `var(--color-error-text)` (#DC2626), `var(--color-error-bg)` (#FEF2F2).
  - Spacing: `var(--space-2)` (8px), `var(--space-3)` (12px), `var(--space-4)` (16px), `var(--space-6)` (24px).
  - Radii: `var(--radius-sm)` (4px), `var(--radius-md)` (8px), `var(--radius-lg)` (12px).
  - Focus: `var(--focus-ring)` (`0 0 0 3px rgba(13, 56, 41, 0.20)`).
- **Typography**:
  - Form labels: `0.875rem` (14px), font-weight 600.
  - Form inputs: `1rem` (16px, prevents auto-zoom on mobile Safari).
  - Reference ID: `var(--font-mono)` (Space Grotesk, 18px bold).
- **Layout Behaviour**:
  - Two-column responsive grid: `.buyer-form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }`.
  - Stacks to 1 column on screens `<= 640px`.
- **Animation Styles**:
  - Tab and state cross-fade using Motion `AnimatePresence`.

## 5. Asset Mapping
- **Image Paths**: None.
- **SVG Paths**: None (inline Lucide icons).
- **Video Paths**: None.
- **Icon References**: `Send`, `CheckCircle2`, `RotateCcw`, `AlertCircle`, `RefreshCw`, `Sparkles`, `ClipboardList`, `MessageCircle`.
- **Fonts**: Plus Jakarta Sans and Space Grotesk.
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - Mode Switch Buttons: Toggles between Form A ("Quick Enquiry") and Form B ("Detailed Requirement").
  - Form Submit Button: Submits form with loading spinner (`RefreshCw` spinning).
  - WhatsApp Follow-up Button (Success state): Opens WhatsApp targeting trade desk with message: `"Hi SHIVOM GLOBAL, I have submitted my requirement. My reference number is [SG-REQ-...]. Please review and advise."`.
  - Reset Button: Clears form and returns to initial state.
- **Navigation**:
  - Section anchor `#requirement-form`.
- **Form Behaviour**:
  - **Quick Form Validation**:
    - Name: Required, >= 2 characters.
    - Company: Required, >= 2 characters.
    - Email: Required, RFC 5322 regex match.
    - Phone: Required, 7 to 18 digits.
    - Country: Required, >= 2 characters.
  - **Detailed Form Validation**:
    - All quick fields plus Requirement Type, Grade, Volume, Packaging, and Destination Port (>= 3 chars).
  - **Honeypot Protection**: Hidden input `website_hp` at position `-9999px`. Submissions with text in this field are dropped or rejected server-side.
- **Interactions**:
  - Input focus triggers gold/green focus ring.
  - Typing in an errored field immediately clears that field's error message.
- **Animations**: Motion transitions respect `useReducedMotion()`.
- **API Integrations**:
  - `POST /api/buyer-requirements`
  - Request headers: `'Content-Type': 'application/json'`
  - Request payload: Normalized `BuyerRequirementRecord` + `website_hp`.
  - Response payload: `{ success: true, mode: 'LIVE', referenceId: 'SG-REQ-YYYYMMDD-XXXX', message: '...' }`.
- **External Integrations**:
  - **Supabase Database**: Inserts into `public.buyer_requirements` table (RLS enabled).
  - **Resend / Email API**: Dispatches HTML email notification to `shivomglobal1010@gmail.com`.
  - **WhatsApp API**: Contextual follow-up redirection via `CONTACT_INFO.whatsapp.getLink()`.

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: MaxWidth 780px centered form card. Inputs render in balanced 2-column pairs.
- **Tablet (769px – 1024px)**: Form maintains 2-column layout; padding reduces to `var(--space-6)`.
- **Mobile (<= 768px & <= 480px)**:
  - Form grids collapse to a single column (`grid-template-columns: 1fr`).
  - Inputs enforce `font-size: 16px` to prevent iOS Safari view zooming.
  - Mode switcher buttons stack or flex with compact padding.
  - Submit button expands to 100% width with min-height 48px for thumb comfort.
- **Existing Responsive Issues**: None; form fields and buttons adapt smoothly across all breakpoints.

## 8. SEO & Accessibility
- **Heading Hierarchy**:
  - `<h2>`: "Tell Us What Tea You Need" (`id="buyer-engine-heading"`)
  - `<h3>`: "Requirement Received" (in confirmation view)
- **Semantic HTML**: `<section id="requirement-form" aria-labelledby="buyer-engine-heading">`, `<form noValidate>`, `<label htmlFor="...">`, `<input>`, `<select>`, `<textarea>`, `<button type="submit">`.
- **Image Alt Attributes**: N/A.
- **ARIA Attributes**:
  - Mode switch: `role="tablist"`, `role="tab"`, `aria-selected={true/false}`.
  - Success view: `role="region" aria-label="Requirement Confirmation"`.
  - Error messages: `role="alert"`.
  - Required labels: Marked visually and programmatically.
- **Keyboard Accessibility**:
  - Native form controls with sequential tab navigation.
  - Form submit triggerable with `Enter` key inside text inputs.
- **Relevant SEO Considerations**:
  - Prerendered HTML in `index.html` provides alternative contact channels (WhatsApp, Email) for clients without JavaScript.

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**:
  - Target destination for CTAs in Header (01), Hero (02), Categories (03), Grades (04), Private Label (05), Export Process (06), Why Shivom (07), and Footer (09).
- **Shared Components & Utilities**:
  - `src/constants/contact.ts`
  - `src/features/buyer-requirement/services/submissionAdapter.ts`
  - `src/features/buyer-requirement/utils/requirementValidation.ts`
  - `src/features/buyer-requirement/types/buyerRequirement.ts`
- **Global CSS Dependencies**:
  - `src/styles/tokens.css`
  - `.container`, `.btn`, `.btn-primary`, `.font-spec`
- **API Dependencies**:
  - Backend function: `api/buyer-requirements.ts`
  - Database: Supabase PostgreSQL (`public.buyer_requirements`)
  - Environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `EMAIL_API_KEY`, `EMAIL_TO`, `EMAIL_FROM`.
- **Navigation Dependencies**: Anchor `#requirement-form`.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC08-01` | Form B does not offer file upload for buyer target sample specifications | Add optional PDF/Image upload (< 5MB) for tea specification sheets or lab reports | Medium | Open |
| `SEC08-02` | Country input is free text in both forms | Implement standardized country autocomplete dropdown with ISO-3166 codes | Low | Open |
| `SEC08-03` | Destination port field has no autocomplete | Provide quick-select pills for major tea discharge ports (Jebel Ali, Hamburg, Rotterdam, Colombo) | Low | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - Mode switcher toggles cleanly between Quick and Detailed forms.
  - Required labels show red asterisks.
  - Error messages appear below invalid inputs with warning icon and red text.
  - Success view renders reference ID prominently.
- **Functional Verification**:
  - Preselection props from other sections correctly populate fields.
  - Submitting empty form highlights invalid fields and blocks network request.
  - Valid submission sends POST request to `/api/buyer-requirements`.
  - Success screen displays valid reference ID and WhatsApp follow-up button works.
- **Desktop Verification**:
  - 2-column input grid aligns with uniform spacing at 1440px and 1280px.
- **Tablet Verification**:
  - Inputs maintain comfortable padding at 768px.
- **Mobile Verification**:
  - Inputs stack into a single column on 375px and 414px viewports without horizontal scroll.
  - Touch target on submit button is at least 48px high.
- **Regression Testing**:
  - Ensure API failure falls back gracefully to a controlled error message without crashing React.
- **Performance Checks**:
  - Input keystroke latency < 16ms (no unnecessary parent re-renders).

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/08_BUYER_REQUIREMENT_FORM.md` | Verified against `BuyerRequirementForm.tsx`, `api/buyer-requirements.ts`, & Supabase migration |

