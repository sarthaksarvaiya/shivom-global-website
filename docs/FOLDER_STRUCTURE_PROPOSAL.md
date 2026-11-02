# SHIVOM GLOBAL — Project Folder Structure Proposal & Migration Plan

**Document Version:** 1.0.0\
**Phase:** SG-PHASE-3B.1-PROPOSAL\
**Status:** Architecture Specification Awaiting Implementation Approval\
**Project:** SHIVOM GLOBAL WEBSITE (`https://shivom-global-website.vercel.app/`)\
**Timestamp:** 2026-11-02T16:45:00+05:30\

---

## 1. Executive Summary & Approved Decisions

Following the Phase 3B audit and user guidance in Phase 3B.1, the target architecture decomposes the application by **business responsibility** rather than grouping unrelated sections simply because they appear on the homepage.

### Approved Directions & Corrections:
1. **Pages Layer (`src/pages/`)**: Relocate `HomePage.tsx` to establish a dedicated page view layer.
2. **Hero Feature (`src/features/hero/`)**: Encapsulate the scroll-driven hero sequence (components, hooks, math utilities, types, and co-located tests).
3. **Commercial RFQ Engine (`src/features/buyer-requirement/`)**: Unify form UI, validation rules, data contracts, and client submission adapter into a cohesive feature module.
4. **Tea Catalog (`src/features/tea-catalog/`)**: Group category cards (`TeaCategoriesSection.tsx`) and technical grade matrices (`GradeSpecificationTable.tsx`).
5. **Private Label (`src/features/private-label/`)**: Isolate packaging solutions and OEM manufacturing (`PrivateLabelSection.tsx`).
6. **Export Process (`src/features/export-process/`)**: Isolate the 4-stage procurement workflow (`HowItWorksSection.tsx`).
7. **Company & Credibility (`src/features/company/`)**: Isolate corporate pillars, compliance standards, and value proposition (`WhyShivomGlobal.tsx`).
8. **Archive Isolation (`archive/components/`)**: Move 10 unreferenced legacy components out of `src/components/archive/` to root `archive/components/`, relieving TypeScript from scanning dead code while preserving 100% of the files.
9. **Tests Kept Co-Located**: Tests remain within `src/features/hero/` during this phase to maintain compatibility with `tsconfig.json` and Node native runner.
10. **Rule Documentation Preserved**: Retain both root and `docs/` copies of `AGENTS.md` and `GEMINI.md`.

---

## 2. Revised Target Folder Tree

```text
SHIVOM GLOBAL WEBSITE/
│
├── api/                                      # Vercel Serverless Functions
│   └── buyer-requirements.ts                 # Dual-pipeline commercial enquiry endpoint
│
├── public/                                   # Static assets served at root
│   ├── assets/
│   │   ├── ezgif-44c01c3f4777df02-jpg/       # [Git-ignored] 40 raw extraction JPEGs (2.3 MB)
│   │   └── hero/                             # 40 Production WebP animation frames
│   ├── images/                               # Production tea catalog photographs
│   ├── robots.txt, sitemap.xml
│   ├── Shivom_Global_Header_Logo.svg         # Primary header logo
│   └── Shivom_Global_Logo.svg                # Favicon brandmark
│
├── reference-assets/                         # [Git-ignored] 19 auxiliary WebP files (4.48 MB)
│   └── hero/
│
├── src/
│   ├── main.tsx                              # Application entry point
│   │
│   ├── app/                                  # Application Shell & Routing
│   │   └── App.tsx                           # Main app wrapper
│   │
│   ├── pages/                                # Page-level Views
│   │   └── HomePage.tsx                      # Homepage container & scroll orchestrator
│   │
│   ├── components/                           # Shared / Global UI Components
│   │   └── layout/                           # Global site shell chrome
│   │       ├── SiteHeader.tsx                # Accessible navigation header
│   │       ├── SiteFooter.tsx                # Corporate footer
│   │       └── WhatsAppFloat.tsx             # Floating WhatsApp quick-action
│   │
│   ├── features/                             # Domain-Driven Feature Modules
│   │   │
│   │   ├── hero/                             # Hero Scroll-Driven Canvas Subsystem
│   │   │   ├── components/
│   │   │   │   ├── HeroSection.tsx           # Hero section presentation & narrative
│   │   │   │   └── HeroScrollCanvas.tsx      # Canvas renderer & rAF drawing engine
│   │   │   ├── hooks/
│   │   │   │   ├── useHeroImagePreloader.ts  # Concurrent WebP asset preloader
│   │   │   │   └── useHeroScrollProgress.ts  # Scroll offset & progress tracking hook
│   │   │   ├── utils/
│   │   │   │   └── heroAnimationUtils.ts     # Cover math, easing, and progress mapping
│   │   │   ├── types/
│   │   │   │   └── heroAnimationTypes.ts     # Strict types & frame count constants
│   │   │   └── tests/                        # Hero unit tests (co-located)
│   │   │       ├── heroAnimationUtils.test.ts # Math unit tests (Node:test)
│   │   │       ├── heroCanvasRenderer.test.ts # Canvas mock tests (Node:test)
│   │   │       └── heroLifecycle.test.ts     # Lifecycle & preloader tests (Node:test)
│   │   │
│   │   ├── buyer-requirement/                # Commercial RFQ & Sample Request Engine
│   │   │   ├── components/
│   │   │   │   └── BuyerRequirementForm.tsx  # Multi-tier inquiry & sample request form
│   │   │   ├── services/
│   │   │   │   └── submissionAdapter.ts      # Client API submission to /api/buyer-requirements
│   │   │   ├── utils/
│   │   │   │   └── requirementValidation.ts  # RFC-5322 validation & input sanitization
│   │   │   └── types/
│   │   │       └── buyerRequirement.ts       # RFQ data contracts, volume tiers, grades
│   │   │
│   │   ├── tea-catalog/                      # Commercial Catalog & Grade Specifications
│   │   │   ├── components/
│   │   │   │   ├── TeaCategoriesSection.tsx  # Tabbed category cards & authentic photography
│   │   │   │   └── GradeSpecificationTable.tsx # Technical grade matrices & cuts
│   │   │
│   │   ├── private-label/                    # OEM & Custom Packaging Solutions
│   │   │   └── components/
│   │   │       └── PrivateLabelSection.tsx   # Private label packaging solutions
│   │   │
│   │   ├── export-process/                   # Global Procurement & Logistics
│   │   │   └── components/
│   │   │       └── HowItWorksSection.tsx     # 4-stage export procurement workflow
│   │   │
│   │   └── company/                          # Corporate Identity & Credibility
│   │       └── components/
│   │           └── WhyShivomGlobal.tsx       # Corporate pillars & value proposition
│   │
│   ├── constants/                            # Cross-cutting constants
│   │   └── contact.ts                        # Canonical company data, GSTIN, phone, WhatsApp
│   │
│   └── styles/                               # Centralized styling & design tokens
│       ├── tokens.css                        # Single source of truth CSS tokens
│       └── index.css                         # Global CSS & component utility rules
│
├── archive/                                  # Deprecated / Legacy Archive (OUTSIDE src/)
│   └── components/                           # 10 unreferenced components safely preserved
│       ├── AboutSarthakSection.tsx
│       ├── AssamCtcSpotlight.tsx
│       ├── DesignSystemFoundation.tsx
│       ├── ExportCredibilitySection.tsx
│       ├── ExportProcessFlow.tsx
│       ├── GradeMatrix.tsx
│       ├── HowWeWorkSection.tsx
│       ├── RequirementRouter.tsx
│       ├── TeaCatalog.tsx
│       └── WhoWeServeSection.tsx
│
├── supabase/                                 # Database migrations & schemas
│   └── migrations/
│       └── 20261021000000_buyer_requirements.sql
│
├── docs/                                     # Centralized technical documentation
│   ├── AGENTS.md, GEMINI.md
│   ├── DESIGN_SYSTEM.md
│   ├── QA_RULES.md
│   ├── HERO_ASSET_AUDIT.md
│   ├── FOLDER_STRUCTURE_AUDIT.md
│   ├── FOLDER_STRUCTURE_PROPOSAL.md
│   └── ... (historical reports)
│
├── AGENTS.md                                 # Primary agent operational rules
├── GEMINI.md                                 # Primary Gemini CLI rules
├── index.html                                # HTML shell
├── package.json                              # Dependencies & build scripts
├── package-lock.json                         # Lockfile
├── tsconfig.json                             # TypeScript bundler compiler options
├── vercel.json                               # Vercel serverless routing
├── vite.config.ts                            # Vite configuration & dev API middleware
└── README.md                                 # Project documentation
```

---

## 3. Exact Source-to-Destination Migration Table

| # | Current Path | Proposed Path | Domain / Responsibility | Risk |
|:---:|---|---|---|:---:|
| **1** | `src/components/home/HomePage.tsx` | `src/pages/HomePage.tsx` | Page view layer | Low |
| **2** | `src/components/home/HeroSection.tsx` | `src/features/hero/components/HeroSection.tsx` | Hero sequence view | Low |
| **3** | `src/components/home/hero/HeroScrollCanvas.tsx` | `src/features/hero/components/HeroScrollCanvas.tsx` | Hero canvas renderer | Low |
| **4** | `src/components/home/hero/useHeroImagePreloader.ts` | `src/features/hero/hooks/useHeroImagePreloader.ts` | Hero image preloader | Low |
| **5** | `src/components/home/hero/useHeroScrollProgress.ts` | `src/features/hero/hooks/useHeroScrollProgress.ts` | Hero scroll tracking | Low |
| **6** | `src/components/home/hero/heroAnimationUtils.ts` | `src/features/hero/utils/heroAnimationUtils.ts` | Hero math & scaling | Low |
| **7** | `src/components/home/hero/heroAnimationTypes.ts` | `src/features/hero/types/heroAnimationTypes.ts` | Hero interfaces & constants | Low |
| **8** | `src/components/home/hero/heroAnimationUtils.test.ts` | `src/features/hero/tests/heroAnimationUtils.test.ts` | Hero math tests | Low |
| **9** | `src/components/home/hero/heroCanvasRenderer.test.ts` | `src/features/hero/tests/heroCanvasRenderer.test.ts` | Hero canvas tests | Low |
| **10** | `src/components/home/hero/heroLifecycle.test.ts` | `src/features/hero/tests/heroLifecycle.test.ts` | Hero lifecycle tests | Low |
| **11** | `src/components/home/BuyerRequirementForm.tsx` | `src/features/buyer-requirement/components/BuyerRequirementForm.tsx` | RFQ inquiry form | Low |
| **12** | `src/services/submissionAdapter.ts` | `src/features/buyer-requirement/services/submissionAdapter.ts` | RFQ submission adapter | Low |
| **13** | `src/utils/requirementValidation.ts` | `src/features/buyer-requirement/utils/requirementValidation.ts` | RFQ validation logic | Low |
| **14** | `src/types/buyerRequirement.ts` | `src/features/buyer-requirement/types/buyerRequirement.ts` | RFQ data types | Low |
| **15** | `src/components/home/TeaCategoriesSection.tsx` | `src/features/tea-catalog/components/TeaCategoriesSection.tsx` | Tea catalog categories | Low |
| **16** | `src/components/home/GradeSpecificationTable.tsx` | `src/features/tea-catalog/components/GradeSpecificationTable.tsx` | Technical grade matrix | Low |
| **17** | `src/components/home/PrivateLabelSection.tsx` | `src/features/private-label/components/PrivateLabelSection.tsx` | OEM packaging solutions | Low |
| **18** | `src/components/home/HowItWorksSection.tsx` | `src/features/export-process/components/HowItWorksSection.tsx` | Procurement process | Low |
| **19** | `src/components/home/WhyShivomGlobal.tsx` | `src/features/company/components/WhyShivomGlobal.tsx` | Corporate credentials | Low |
| **20** | `src/components/archive/*` (10 files) | `archive/components/*` | Legacy preservation outside `src/` | Very Low |

---

## 4. Import Dependency Mapping (Before vs After)

### A. `src/app/App.tsx`
```diff
- import { HomePage } from '@/components/home/HomePage';
+ import { HomePage } from '@/pages/HomePage';
```

### B. `src/pages/HomePage.tsx`
```diff
  import { SiteHeader } from '@/components/layout/SiteHeader';
- import { HeroSection } from '@/components/home/HeroSection';
- import { TeaCategoriesSection } from '@/components/home/TeaCategoriesSection';
- import { GradeSpecificationTable } from '@/components/home/GradeSpecificationTable';
- import { PrivateLabelSection } from '@/components/home/PrivateLabelSection';
- import { HowItWorksSection } from '@/components/home/HowItWorksSection';
- import { WhyShivomGlobal } from '@/components/home/WhyShivomGlobal';
- import { BuyerRequirementForm } from '@/components/home/BuyerRequirementForm';
+ import { HeroSection } from '@/features/hero/components/HeroSection';
+ import { TeaCategoriesSection } from '@/features/tea-catalog/components/TeaCategoriesSection';
+ import { GradeSpecificationTable } from '@/features/tea-catalog/components/GradeSpecificationTable';
+ import { PrivateLabelSection } from '@/features/private-label/components/PrivateLabelSection';
+ import { HowItWorksSection } from '@/features/export-process/components/HowItWorksSection';
+ import { WhyShivomGlobal } from '@/features/company/components/WhyShivomGlobal';
+ import { BuyerRequirementForm } from '@/features/buyer-requirement/components/BuyerRequirementForm';
  import { SiteFooter } from '@/components/layout/SiteFooter';
  import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
```

### C. `src/features/hero/components/HeroSection.tsx`
```diff
- import { HeroScrollCanvas } from './hero/HeroScrollCanvas';
- import { HERO_FRAME_COUNT } from './hero/heroAnimationTypes';
+ import { HeroScrollCanvas } from './HeroScrollCanvas';
+ import { HERO_FRAME_COUNT } from '../types/heroAnimationTypes';
```

### D. `src/features/hero/components/HeroScrollCanvas.tsx`
```diff
- import { HeroAnimationConfig, FrameInterpolation } from './heroAnimationTypes';
- import { useHeroImagePreloader } from './useHeroImagePreloader';
- import { useHeroScrollProgress } from './useHeroScrollProgress';
- import { calculateFrameInterpolation, calculateCoverDimensions, getEffectiveDpr } from './heroAnimationUtils';
+ import { HeroAnimationConfig, FrameInterpolation } from '../types/heroAnimationTypes';
+ import { useHeroImagePreloader } from '../hooks/useHeroImagePreloader';
+ import { useHeroScrollProgress } from '../hooks/useHeroScrollProgress';
+ import { calculateFrameInterpolation, calculateCoverDimensions, getEffectiveDpr } from '../utils/heroAnimationUtils';
```

### E. `src/features/buyer-requirement/components/BuyerRequirementForm.tsx`
```diff
- import { BuyerRequirementFormData, FormStatus, FieldValidationErrors } from '../../types/buyerRequirement';
- import { validateRequirementForm, sanitizeInput, hasValidationErrors } from '../../utils/requirementValidation';
- import { submitBuyerRequirement } from '../../services/submissionAdapter';
+ import { BuyerRequirementFormData, FormStatus, FieldValidationErrors } from '../types/buyerRequirement';
+ import { validateRequirementForm, sanitizeInput, hasValidationErrors } from '../utils/requirementValidation';
+ import { submitBuyerRequirement } from '../services/submissionAdapter';
```

### F. `src/features/buyer-requirement/services/submissionAdapter.ts`
```diff
- import { BuyerRequirementRecord } from '../types/buyerRequirement';
+ import { BuyerRequirementRecord } from '../types/buyerRequirement';
```

### G. `src/features/buyer-requirement/utils/requirementValidation.ts`
```diff
- import { BuyerRequirementFormData, FieldValidationErrors, BuyerRequirementRecord } from '../types/buyerRequirement';
+ import { BuyerRequirementFormData, FieldValidationErrors, BuyerRequirementRecord } from '../types/buyerRequirement';
```

---

## 5. Test Suite Strategy & Assessment

- **Current Status**: All 32 unit tests pass natively under Node 22 (`node --test`).
- **Co-Location Choice**: By placing the 3 test files in `src/features/hero/tests/`, they remain within the `src/` boundary defined in `tsconfig.json` (`"include": ["src", "api"]`).
- **Zero Configuration Drift**: `tsc --noEmit` continues to validate types across tests without requiring edits to `tsconfig.json`.
- **Future Test Runner**: When Vitest or Jest is formally added to `package.json`, test scripts can point to `src/features/**/tests/*.test.ts` or `tests/`.

---

## 6. Archive Preservation Strategy

- **10 Files Preserved**: `AboutSarthakSection.tsx`, `AssamCtcSpotlight.tsx`, `DesignSystemFoundation.tsx`, `ExportCredibilitySection.tsx`, `ExportProcessFlow.tsx`, `GradeMatrix.tsx`, `HowWeWorkSection.tsx`, `RequirementRouter.tsx`, `TeaCatalog.tsx`, `WhoWeServeSection.tsx`.
- **Destination**: Moved from `src/components/archive/` to root `archive/components/`.
- **Integrity**: Every byte, comment, and export is 100% preserved.
- **Benefits**:
  - Relieves `tsc` from compiling 10 inactive files during every build.
  - Keeps `src/` 100% dedicated to production active source code.
  - Leaves the files easily inspectable in version control.

---

## 7. Git Impact Analysis & Recommendation

> [!IMPORTANT]
> **Recommended Staging Workflow:**
> Currently, 84 files are staged in the Git index representing Phase 3A.
> If file moves are executed while those 84 files are staged, Git's rename detection will attempt to correlate simultaneous content modifications with file relocations across dozens of paths.
>
> **Safest Execution Sequence:**
> 1. User authorizes commit of the 84 staged files:
>    `feat(core): consolidate design tokens, 40-frame hero sequence, and documentation`
> 2. Create and execute the Phase 3B folder relocations on a clean working tree.
> 3. Verify `git status` shows clean `R100` renames.
> 4. Validate `npx tsc --noEmit` and `npm run build`.
> 5. Stage and commit Phase 3B cleanly:
>    `refactor(architecture): organize features by business responsibility and isolate legacy archive`
