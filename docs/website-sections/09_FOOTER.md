# 09 — Site Footer (Statutory Transparency & Site Navigation)

## 1. Section Overview
- **Section ID**: `sec-09` / `<footer className="site-footer" role="contentinfo">`
- **Section Name**: Site Footer (Statutory Governance, Navigation & Trade Desk Links)
- **Position on Website**: Base landmark of the document, rendered directly below `BuyerRequirementForm`.
- **Main Purpose**: Deliver statutory corporate transparency (Proprietorship, GSTIN, Udyam MSME numbers), global site navigation to all core sourcing anchors, direct trade desk communication avenues, and international port routing terms.
- **Target Audience**: Overseas buyers conducting due diligence, compliance auditors, logistics coordinators, and prospective clients looking for direct registration verification or quick secondary navigation.
- **Business Objective**: Provide undeniable legal transparency under Indian statutory law (GST & MSME registration), reinforce institutional legitimacy, and ensure persistent contact access at the close of the buyer's page journey.

## 2. Current Implementation
- **Existing Design Description**: Deep Forest executive dark footer (`var(--color-primary-dark): #072218`) organized into a clean 3-column corporate structure with an illuminated statutory disclosure container and a minimal bottom copyright bar.
- **Existing Layout**:
  - **Column 1 (Brand & Verified Entity Transparency)**:
    - High-resolution SVG brand header logo linking to `#hero`.
    - Business description narrative.
    - Verified Statutory Disclosure Box:
      - Proprietorship: Sarthak Sarvaiya
      - Base: Bhavnagar, Gujarat, India
      - Udyam MSME: `UDYAM-GJ-05-0105835`
      - GSTIN: `24KWEPS2703C1ZQ` (highlighted in Warm Gold)
    - Action CTA: "Tell Us What Tea You Need" (small gold button).
  - **Column 2 (Sourcing & Export Navigation)**:
    - 5 smooth-scroll anchor links covering the core sections:
      - Tea Sourcing Portfolio (`#our-teas`)
      - Grades & Specifications (`#tea-by-grade`)
      - Private Label Packaging (`#private-label`)
      - 5-Step Sourcing Flow (`#how-it-works`)
      - Export Compliance & Docs (`#why-us`)
  - **Column 3 (Direct Trade Desk & Logistics)**:
    - Direct WhatsApp Trade Desk link with WhatsApp brand icon.
    - Direct Email link (`shivomglobal1010@gmail.com`).
    - Primary Indian Loading Ports (Mundra, Kandla, Kolkata, JNPT).
    - Incoterms summary (FOB Indian Ports / CIF Destination).
  - **Bottom Copyright Strip**: Full-width container with dynamic copyright year, proprietor notice, and geographic base badge.
- **Visual Elements**:
  - White SVG logo on dark green background.
  - Distinct subtle border framing the statutory box (`rgba(255, 255, 255, 0.1)`).
  - Monospace font (`Space Grotesk`) for registration numbers.
- **Current Functionality**:
  - Smooth-scrolling anchor navigation with an 80px offset matching the header height.
  - Direct WhatsApp link opening web/app with pre-filled greeting.
  - Native `mailto:` link with prefilled subject line.

## 3. Component Mapping
- **React Component Name**: `SiteFooter`
- **Exact Source File Path**: `src/components/layout/SiteFooter.tsx`
- **Related Subcomponents**: None (fully self-contained).
- **Shared Components & Utilities**:
  - `src/constants/contact.ts` (`CONTACT_INFO` for phone, email, and registration numbers).
  - Icons from `lucide-react`: `ArrowRight`, `MessageCircle`, `Mail`.

## 4. Styling Mapping
- **CSS File Paths**:
  - `src/styles/index.css` (Lines 4525–4780: Footer grid, columns, statutory box, navigation list, and responsive adjustments).
  - `src/styles/tokens.css` (Design tokens).
- **Design Tokens**:
  - Colors: `var(--color-primary-dark)` (#072218), `var(--color-gold)` (#C59B27), `var(--text-inverse)` (#FFFFFF), `var(--text-inverse-muted)` (#D1D5DB).
  - Spacing: `var(--space-3)` (12px), `var(--space-4)` (16px), `var(--space-6)` (24px), `var(--space-8)` (32px).
  - Radii: `var(--radius-sm)` (4px), `var(--radius-md)` (8px).
- **Typography**:
  - Section titles: `var(--font-primary)`, uppercase, 0.8125rem.
  - Links: `0.875rem` (14px).
  - Statutory numbers: `var(--font-mono)` (Space Grotesk, `.font-spec`).
- **Layout Behaviour**:
  - Grid: `display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: var(--space-8);`.
  - Stacks into single column below 768px.
- **Animation Styles**:
  - Link hover: Color transition to `var(--color-gold)`.

## 5. Asset Mapping
- **Image Paths**: None.
- **SVG Paths**: `/Shivom_Global_Header_Logo.svg`
- **Video Paths**: None.
- **Icon References**: `ArrowRight`, `MessageCircle`, `Mail`.
- **Fonts**: Plus Jakarta Sans and Space Grotesk.
- **Other Assets**: None.

## 6. Functional Behaviour
- **Buttons and CTAs**:
  - Logo link: Scrolls smoothly to `#hero`.
  - 5 Section Links: Scroll to respective anchor sections (`headerOffset: 80`).
  - "Tell Us What Tea You Need" CTA: Scrolls to `#requirement-form`.
  - WhatsApp Link: Direct window open to `https://wa.me/919737030437?text=...`.
  - Email Link: Direct `mailto:shivomglobal1010@gmail.com?subject=...`.
- **Navigation**: Full internal anchor navigation.
- **Form Behaviour**: N/A.
- **Interactions**: Link hover animations and focus rings.
- **Animations**: CSS transitions (`var(--transition-fast)`).
- **API Integrations**: None.
- **External Integrations**: WhatsApp Web/App and default email client.

## 7. Responsive Behaviour
- **Desktop (>= 1025px)**: 3-column layout with brand & statutory column occupying 40% and navigation/contact columns occupying 30% each.
- **Tablet (769px – 1024px)**: Columns narrow; gap reduces to `var(--space-6)`.
- **Mobile (<= 768px & <= 480px)**:
  - 3-column grid collapses into a single-column stack.
  - Brand and statutory block appear first, followed by navigation links, and finally trade desk contact details.
  - Bottom copyright bar wraps text and centers alignment.
- **Existing Responsive Issues**: None; vertical hierarchy provides seamless readability on mobile.

## 8. SEO & Accessibility
- **Heading Hierarchy**:
  - `<h4>`: "Sourcing & Export"
  - `<h4>`: "Direct Trade Desk"
- **Semantic HTML**: `<footer className="site-footer" role="contentinfo" aria-label="SHIVOM GLOBAL Footer">`, `<ul>`, `<li>`, `<a>`, `<address>` semantics.
- **Image Alt Attributes**: `alt="SHIVOM GLOBAL — Indian Tea Sourcing & Export"` on footer logo.
- **ARIA Attributes**:
  - `role="contentinfo"`, `aria-label="SHIVOM GLOBAL Footer"`.
  - Contact links have explicit `aria-label` matching `CONTACT_INFO.whatsapp.ariaLabel` and `CONTACT_INFO.email.ariaLabel`.
- **Keyboard Accessibility**: All links are keyboard focusable with high-contrast outlines.
- **Relevant SEO Considerations**:
  - Matches Organization structured data in `index.html` (Legal name, GSTIN, Address, ContactPoint).
  - Sitelinks search engine discovery of all core sections.

## 9. Dependencies & Integration
- **Dependencies on Other Website Sections**:
  - Smooth-scrolling targets: `#hero`, `#our-teas`, `#tea-by-grade`, `#private-label`, `#how-it-works`, `#why-us`, `#requirement-form`.
- **Shared Components**:
  - `src/constants/contact.ts`
- **Global CSS Dependencies**:
  - `src/styles/tokens.css`
  - `.container`, `.btn`, `.btn-primary`, `.btn-sm`, `.font-spec`
- **API Dependencies**: None.
- **Navigation Dependencies**: Anchor targets across the page.

## 10. Current Issues & Improvement Backlog

| ID | Issue | Proposed Improvement | Priority | Status |
|---|---|---|---|---|
| `SEC09-01` | No explicit Terms of Service or Privacy Policy link in footer | Add a Privacy Policy / Terms modal or lightweight static disclaimer route | Low | Open |
| `SEC09-02` | MSME registration verification link is text only | Add optional link to official Udyam portal verification guide | Low | Open |

## 11. Testing & Acceptance Criteria
- **Visual Verification**:
  - Brand logo renders cleanly on dark green background.
  - GSTIN and Udyam numbers are clearly legible in the statutory block.
  - Copyright year automatically updates (`new Date().getFullYear()`).
- **Functional Verification**:
  - Clicking any footer navigation link scrolls smoothly to the correct section.
  - Clicking WhatsApp opens chat with Trade Desk.
  - Clicking Email opens mailto client.
- **Desktop Verification**:
  - 3-column layout aligns evenly inside 1240px container.
- **Tablet Verification**:
  - Columns adapt smoothly at 768px.
- **Mobile Verification**:
  - Stacked layout displays cleanly on 375px and 414px viewports without horizontal scroll.
- **Regression Testing**:
  - Check that footer offset does not cut off headings of targeted sections.
- **Performance Checks**:
  - Zero layout shifts (CLS = 0) during footer paint.

## 12. Change History

| Date | Change Description | Files Modified | Verification |
|---|---|---|---|
| 2026-11-02 | Initial technical documentation created from codebase audit | `docs/website-sections/09_FOOTER.md` | Verified against `SiteFooter.tsx` & `src/styles/index.css` |

