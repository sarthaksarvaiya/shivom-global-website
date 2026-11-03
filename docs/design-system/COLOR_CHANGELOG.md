# SHIVOM GLOBAL — Colour System Changelog

All notable changes, refactors, token additions, and palette migrations for the SHIVOM GLOBAL website colour system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to Semantic Versioning.

---

## [1.1.0] — 2026-11-02

### Added
- **Three-Tier Architecture in `src/styles/tokens.css`**:
  - **Tier 1 (Primitives)**: Raw values, RGB channels (`--primitive-green-900-rgb`, `--primitive-green-950-rgb`, `--primitive-gold-500-rgb`, `--primitive-amber-600-rgb`, `--primitive-white-rgb`, `--primitive-whatsapp-rgb`), and standard alpha scale tokens (`--alpha-02` through `--alpha-95`).
  - **Tier 2 (Semantics)**: Functional mappings for brand foundations, surfaces, typography, borders, feedback alerts, third-party communication channels (`--color-whatsapp`), and product identification (`--color-liquor-ctc`, `--color-liquor-orthodox`, `--color-liquor-darjeeling`, `--color-liquor-green`).
  - **Tier 3 (Components)**: Purposeful scoped tokens for Header, Buttons, Cards, Tables, Forms, and Footer.

### Changed
- **Migrated Global Stylesheet (`src/styles/index.css`)**:
  - Migrated **74** Harvest Gold `rgba(197, 155, 39, <alpha>)` declarations to `rgba(var(--primitive-gold-500-rgb), <alpha>)`.
  - Migrated **60** Estate Green `rgba(13, 56, 41, <alpha>)` declarations to `rgba(var(--primitive-green-900-rgb), <alpha>)`.
  - Migrated **28** Deep Forest `rgba(7, 34, 24, <alpha>)` declarations to `rgba(var(--primitive-green-950-rgb), <alpha>)`.
  - Migrated **56** White `rgba(255, 255, 255, <alpha>)` declarations to `rgba(var(--primitive-white-rgb), <alpha>)`.
  - Migrated **4** WhatsApp `rgba(37, 211, 102, <alpha>)` declarations to `rgba(var(--primitive-whatsapp-rgb), <alpha>)`.
  - Migrated **8** WhatsApp `#25D366` hex declarations to `var(--color-whatsapp)`.
  - Migrated **16** Warm border `#E5E0D5` hex declarations to `var(--border-subtle-warm)`.
  - Migrated **21** Muted body text `color: #4B5563` declarations to `color: var(--text-muted)`.
  - Migrated **14** Deep amber text `color: #92400E` declarations to `color: var(--color-amber-deep)`.
  - Migrated **8** Warning text `color: #B45309` declarations to `color: var(--color-warning-text)`.
  - Migrated **55** Primary Green `#0D3829` hex declarations to `var(--color-primary-green)`.
  - Migrated **12** Forest Dark `#072218` hex declarations to `var(--color-primary-dark)`.
  - Migrated **55** Pure White text `color: #FFFFFF` declarations to `color: var(--text-inverse)`.
  - Migrated **45** Pure White background `background(-color): #FFFFFF` declarations to `background(-color): var(--bg-surface)`.
- **Migrated React Component Inline Styles (`src/**/*.tsx`)**:
  - `TeaCategoriesSection.tsx`: Liquor colors mapped to `var(--color-liquor-*)` with safe fallbacks; WhatsApp icon mapped to `var(--color-whatsapp)`.
  - `HeroSection.tsx`: Multi-layer atmospheric linear gradients mapped to `rgba(var(--primitive-green-950-rgb), ...)`; WhatsApp icon and direct trade desk contact mapped to `var(--color-whatsapp)`.
  - `BuyerRequirementForm.tsx`: Success state direct WhatsApp button mapped to `var(--color-whatsapp)`, `var(--text-inverse)`, and `rgba(var(--primitive-whatsapp-rgb), 0.3)`.
  - `GradeSpecificationTable.tsx`: Instant Quote WhatsApp row action mapped to `rgba(var(--primitive-whatsapp-rgb), 0.12)`, `var(--color-success-text)`, and `var(--color-whatsapp)`.
  - `SiteFooter.tsx`: Statutory disclosure box mapped to `rgba(var(--primitive-white-rgb), var(--alpha-04))` and `var(--alpha-10)`; WhatsApp channel and copyright text mapped to tokens.
  - `WhyShivomGlobal.tsx` & `PrivateLabelSection.tsx`: Card text colors mapped to `rgba(var(--primitive-white-rgb), var(--alpha-85))` and `var(--alpha-70)`.

### Verified
- **Migration Scale Reconciled**: 456 declarations in `src/styles/index.css` and 32 inline styles across React components (488 total declarations; 552 color occurrences removed in Git diff).
- **TypeScript**: `npx tsc --noEmit` verified with exit code 0 (0 errors).
- **Production Build**: `npm run build` bundles in 1.41s with exit code 0 and 0 missing variable errors.
- **Visual Parity**: Computed styles and color mathematics are 100% equivalent to pre-migration baseline. Full visual parity remains unverified by browser automation screenshots due to absence of a headless browser comparison harness.

### Documented Technical Debt & Intentional Exceptions
- **11 Card Substrate Gradients**: Micro-calibrated multi-stop tea liquor gradients (e.g., `#FEF7EC`, `#FAF2DF`, `#F8F3EA`, `#EEF8F1`) preserved for authentic terroir depth.
- **39 Black Drop Shadows**: Standard physical lighting drop-shadows `rgba(0, 0, 0, alpha)` preserved.
- **Tailwind Utility Neutrals**: Deeply nested metadata chips preserved for upcoming section-by-section improvements.

---

## [1.0.0] — 2026-11-02

### Added
- **Centralised Colour Management System**: Initial creation of the colour system documentation suite under `docs/design-system/`.
- **System Documentation**:
  - `docs/design-system/README.md`: System overview, core governance rules, and token consumption principles.
  - `docs/design-system/COLOR_SYSTEM.md`: Comprehensive audit of `tokens.css`, inventory of 84 hardcoded hex colors, 110 raw rgba values, component leaks, and architectural root cause analysis.
  - `docs/design-system/COLOR_PALETTE_OPTIONS.md`: 50-point evaluation rubric and five prospective brand directions (Baseline, Premium Tea Heritage, Modern Luxury, Natural Organic, Contemporary B2B Export, Minimal Corporate).
  - `docs/design-system/COLOR_USAGE_GUIDELINES.md`: Definitive color allocations for all 10 homepage sections, UI primitives (buttons, cards, forms, typography, badges).
  - `docs/design-system/COLOR_CHANGELOG.md`: Version control audit log for color tokens.

### Documented (Baseline State)
- Codified current baseline production palette:
  - Primary Base Green: `#0D3829` (`var(--color-primary-dark)`)
  - Primary Forest Dark: `#072218` (`var(--color-primary-forest)`)
  - Accent Harvest Gold: `#C59B27` (`var(--color-accent-gold)`)
  - Accent Burnt Amber: `#CC5500` (`var(--color-accent-gold-dark)`)
  - Canvas Warm Off-White: `#FBFBFA` (`var(--bg-page)`)
  - Surface Pure White: `#FFFFFF` (`var(--bg-surface)`)
  - Subtle Warm Ivory: `#F5F1E8` (`var(--color-tea-cream)`)
  - Botanical Sage: `#9CAF88` (`var(--color-tea-green)`)
  - Deep Charcoal Ink Text: `#1A2E26` (`var(--text-main)`)
  - Muted Leaf Slate Text: `#4A5D4E` (`var(--text-muted)`)

### Integrity & Safety Guarantee
- **Zero Visual Changes**: No changes made to website visual appearance.
- **Zero Code Modifications**: No CSS token values, stylesheet rules, TSX components, or asset files were modified.
- **Production Baseline Preserved**: Current production palette remains active and fully functional.

