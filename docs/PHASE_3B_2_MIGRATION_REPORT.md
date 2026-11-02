# SHIVOM GLOBAL — Phase 3B.2 Folder Migration Report

**Document Version:** 1.0.0\
**Phase:** SG-PHASE-3B.2-MIGRATION\
**Status:** Successfully Executed & Validated (Unstaged Working Tree)\
**Project:** SHIVOM GLOBAL WEBSITE (`https://shivom-global-website.vercel.app/`)\
**Execution Timestamp:** 2026-11-02T16:58:00+05:30\
**Base Commit (Phase 3A):** `dace5e70be002413a01b77e9fa595d3364687610`\

---

## 1. Executive Summary

In accordance with `docs/FOLDER_STRUCTURE_PROPOSAL.md` and user authorization in Phase 3B.2, the project structure of the SHIVOM GLOBAL website has been reorganized into a **domain-driven, feature-first** architecture.

### Key Outcomes:
- **Pages Layer Established:** `HomePage.tsx` moved to `src/pages/HomePage.tsx`.
- **Domain Decomposition:** Separate features created for `hero`, `buyer-requirement`, `tea-catalog`, `private-label`, `export-process`, and `company`.
- **Legacy Components Isolated:** 10 unreferenced legacy components relocated from `src/components/archive/` to root `archive/components/`.
- **Test Integrity Preserved:** All 32 unit tests execute and pass natively under Node 22 (`node --test`).
- **Production Build Clean:** `npm run build` succeeds in 1.72s with zero TypeScript compiler errors.
- **Git Compliance:** All changes remain strictly **unstaged** per instructions.

---

## 2. Old vs New Folder Trees

### Old Folder Tree (`src/` Scope)
```text
src/
├── app/App.tsx
├── main.tsx
├── components/
│   ├── archive/                      # 10 Deprecated components
│   │   ├── AboutSarthakSection.tsx
│   │   ├── AssamCtcSpotlight.tsx
│   │   ├── DesignSystemFoundation.tsx
│   │   ├── ExportCredibilitySection.tsx
│   │   ├── ExportProcessFlow.tsx
│   │   ├── GradeMatrix.tsx
│   │   ├── HowWeWorkSection.tsx
│   │   ├── RequirementRouter.tsx
│   │   ├── TeaCatalog.tsx
│   │   └── WhoWeServeSection.tsx
│   ├── home/                         # Mixed sections & full page container
│   │   ├── BuyerRequirementForm.tsx
│   │   ├── GradeSpecificationTable.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HomePage.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── PrivateLabelSection.tsx
│   │   ├── TeaCategoriesSection.tsx
│   │   ├── WhyShivomGlobal.tsx
│   │   └── hero/                     # Canvas renderer, hooks, math, and tests
│   │       ├── HeroScrollCanvas.tsx
│   │       ├── heroAnimationTypes.ts
│   │       ├── heroAnimationUtils.ts
│   │       ├── heroAnimationUtils.test.ts
│   │       ├── heroCanvasRenderer.test.ts
│   │       ├── heroLifecycle.test.ts
│   │       ├── useHeroImagePreloader.ts
│   │       └── useHeroScrollProgress.ts
│   └── layout/
│       ├── SiteFooter.tsx
│       ├── SiteHeader.tsx
│       └── WhatsAppFloat.tsx
├── constants/contact.ts
├── services/submissionAdapter.ts
├── styles/tokens.css, index.css
├── types/buyerRequirement.ts
└── utils/requirementValidation.ts
```

### New Folder Tree (Domain-First Architecture)
```text
SHIVOM GLOBAL WEBSITE/
├── api/
│   └── buyer-requirements.ts
├── public/
│   ├── assets/hero/                  # 40 WebP production frames
│   ├── images/                       # Authentic tea photography
│   └── Shivom_Global_Header_Logo.svg
├── archive/
│   └── components/                   # 10 Historical legacy components (OUTSIDE src/)
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
├── src/
│   ├── main.tsx
│   ├── app/
│   │   └── App.tsx
│   ├── pages/
│   │   └── HomePage.tsx              # Page view & scroll orchestrator
│   ├── components/
│   │   └── layout/                   # Global site shell chrome
│   │       ├── SiteFooter.tsx
│   │       ├── SiteHeader.tsx
│   │       └── WhatsAppFloat.tsx
│   ├── features/
│   │   ├── hero/                     # Hero animation subsystem
│   │   │   ├── components/
│   │   │   │   ├── HeroScrollCanvas.tsx
│   │   │   │   └── HeroSection.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useHeroImagePreloader.ts
│   │   │   │   └── useHeroScrollProgress.ts
│   │   │   ├── types/
│   │   │   │   └── heroAnimationTypes.ts
│   │   │   ├── utils/
│   │   │   │   └── heroAnimationUtils.ts
│   │   │   └── tests/                # Co-located unit tests (Node:test)
│   │   │       ├── heroAnimationUtils.test.ts
│   │   │       ├── heroCanvasRenderer.test.ts
│   │   │       └── heroLifecycle.test.ts
│   │   ├── buyer-requirement/        # Commercial RFQ engine
│   │   │   ├── components/
│   │   │   │   └── BuyerRequirementForm.tsx
│   │   │   ├── services/
│   │   │   │   └── submissionAdapter.ts
│   │   │   ├── types/
│   │   │   │   └── buyerRequirement.ts
│   │   │   └── utils/
│   │   │       └── requirementValidation.ts
│   │   ├── tea-catalog/              # Tea catalog & specifications
│   │   │   └── components/
│   │   │       ├── GradeSpecificationTable.tsx
│   │   │       └── TeaCategoriesSection.tsx
│   │   ├── private-label/            # OEM & private label packaging
│   │   │   └── components/
│   │   │       └── PrivateLabelSection.tsx
│   │   ├── export-process/           # Procurement process workflow
│   │   │   └── components/
│   │   │       └── HowItWorksSection.tsx
│   │   └── company/                  # Corporate identity & credentials
│   │       └── components/
│   │           └── WhyShivomGlobal.tsx
│   ├── constants/contact.ts
│   └── styles/tokens.css, index.css
├── docs/
│   ├── FOLDER_STRUCTURE_AUDIT.md
│   ├── FOLDER_STRUCTURE_PROPOSAL.md
│   ├── PHASE_3B_2_MIGRATION_REPORT.md
│   └── ... (historical phase reports)
└── reference-assets/hero/             # [Git-ignored] 19 auxiliary WebPs
```

---

## 3. Exact Files Relocated (29 Files Total)

| # | Original Path | New Path | Feature / Domain |
|:---:|---|---|---|
| 1 | `src/components/home/HomePage.tsx` | `src/pages/HomePage.tsx` | Pages Layer |
| 2 | `src/components/home/HeroSection.tsx` | `src/features/hero/components/HeroSection.tsx` | Hero |
| 3 | `src/components/home/hero/HeroScrollCanvas.tsx` | `src/features/hero/components/HeroScrollCanvas.tsx` | Hero |
| 4 | `src/components/home/hero/useHeroImagePreloader.ts` | `src/features/hero/hooks/useHeroImagePreloader.ts` | Hero |
| 5 | `src/components/home/hero/useHeroScrollProgress.ts` | `src/features/hero/hooks/useHeroScrollProgress.ts` | Hero |
| 6 | `src/components/home/hero/heroAnimationUtils.ts` | `src/features/hero/utils/heroAnimationUtils.ts` | Hero |
| 7 | `src/components/home/hero/heroAnimationTypes.ts` | `src/features/hero/types/heroAnimationTypes.ts` | Hero |
| 8 | `src/components/home/hero/heroAnimationUtils.test.ts` | `src/features/hero/tests/heroAnimationUtils.test.ts` | Hero (Test) |
| 9 | `src/components/home/hero/heroCanvasRenderer.test.ts` | `src/features/hero/tests/heroCanvasRenderer.test.ts` | Hero (Test) |
| 10 | `src/components/home/hero/heroLifecycle.test.ts` | `src/features/hero/tests/heroLifecycle.test.ts` | Hero (Test) |
| 11 | `src/components/home/BuyerRequirementForm.tsx` | `src/features/buyer-requirement/components/BuyerRequirementForm.tsx` | Buyer Requirement |
| 12 | `src/services/submissionAdapter.ts` | `src/features/buyer-requirement/services/submissionAdapter.ts` | Buyer Requirement |
| 13 | `src/utils/requirementValidation.ts` | `src/features/buyer-requirement/utils/requirementValidation.ts` | Buyer Requirement |
| 14 | `src/types/buyerRequirement.ts` | `src/features/buyer-requirement/types/buyerRequirement.ts` | Buyer Requirement |
| 15 | `src/components/home/TeaCategoriesSection.tsx` | `src/features/tea-catalog/components/TeaCategoriesSection.tsx` | Tea Catalog |
| 16 | `src/components/home/GradeSpecificationTable.tsx` | `src/features/tea-catalog/components/GradeSpecificationTable.tsx` | Tea Catalog |
| 17 | `src/components/home/PrivateLabelSection.tsx` | `src/features/private-label/components/PrivateLabelSection.tsx` | Private Label |
| 18 | `src/components/home/HowItWorksSection.tsx` | `src/features/export-process/components/HowItWorksSection.tsx` | Export Process |
| 19 | `src/components/home/WhyShivomGlobal.tsx` | `src/features/company/components/WhyShivomGlobal.tsx` | Company |
| 20 | `src/components/archive/AboutSarthakSection.tsx` | `archive/components/AboutSarthakSection.tsx` | Legacy Archive |
| 21 | `src/components/archive/AssamCtcSpotlight.tsx` | `archive/components/AssamCtcSpotlight.tsx` | Legacy Archive |
| 22 | `src/components/archive/DesignSystemFoundation.tsx` | `archive/components/DesignSystemFoundation.tsx` | Legacy Archive |
| 23 | `src/components/archive/ExportCredibilitySection.tsx` | `archive/components/ExportCredibilitySection.tsx` | Legacy Archive |
| 24 | `src/components/archive/ExportProcessFlow.tsx` | `archive/components/ExportProcessFlow.tsx` | Legacy Archive |
| 25 | `src/components/archive/GradeMatrix.tsx` | `archive/components/GradeMatrix.tsx` | Legacy Archive |
| 26 | `src/components/archive/HowWeWorkSection.tsx` | `archive/components/HowWeWorkSection.tsx` | Legacy Archive |
| 27 | `src/components/archive/RequirementRouter.tsx` | `archive/components/RequirementRouter.tsx` | Legacy Archive |
| 28 | `src/components/archive/TeaCatalog.tsx` | `archive/components/TeaCatalog.tsx` | Legacy Archive |
| 29 | `src/components/archive/WhoWeServeSection.tsx` | `archive/components/WhoWeServeSection.tsx` | Legacy Archive |

---

## 4. Import Updates

Targeted import adjustments were applied to exactly 10 files:

1. **`src/app/App.tsx`**: Updated `import { HomePage } from '@/pages/HomePage';`.
2. **`src/pages/HomePage.tsx`**: Updated 7 section imports to their new feature locations (`@/features/hero/...`, `@/features/tea-catalog/...`, `@/features/private-label/...`, `@/features/export-process/...`, `@/features/company/...`, `@/features/buyer-requirement/...`).
3. **`src/features/hero/components/HeroSection.tsx`**: Updated imports for canvas, hooks, and types.
4. **`src/features/hero/components/HeroScrollCanvas.tsx`**: Updated imports to `../types/`, `../hooks/`, and `../utils/`.
5. **`src/features/hero/hooks/useHeroImagePreloader.ts`**: Updated import to `../types/heroAnimationTypes.ts`.
6. **`src/features/hero/hooks/useHeroScrollProgress.ts`**: Updated imports to `../types/` and `../utils/`.
7. **`src/features/hero/utils/heroAnimationUtils.ts`**: Updated import to `../types/heroAnimationTypes.ts`.
8. **`src/features/hero/tests/heroAnimationUtils.test.ts`**: Updated import to `../utils/heroAnimationUtils.ts`.
9. **`src/features/hero/tests/heroCanvasRenderer.test.ts`**: Updated imports to `../utils/` and `../types/`.
10. **`src/features/buyer-requirement/components/BuyerRequirementForm.tsx`**: Updated imports to local feature types, validation, and submission adapter.

---

## 5. Archive Dependency Findings

- Pre-migration inspection confirmed all 10 legacy files import only `react` and `lucide-react`, except `ExportProcessFlow.tsx` which imports `./HowWeWorkSection` (also preserved in `archive/components/`).
- Relocation from `src/components/archive/` to `archive/components/` leaves zero dangling references and removes 10 unreferenced files from TypeScript's active compilation pipeline.

---

## 6. Verification & Test Execution Results

```bash
# 1. TypeScript Compilation
$ npx tsc --noEmit
Exit Code: 0 (Zero type errors)

# 2. Native Unit Tests (Node 22)
$ node --test "src/features/hero/tests/*.test.ts"
Exit Code: 0
  heroAnimationUtils: 15 passed, 0 failed
  HeroScrollCanvas: 12 passed, 0 failed
  heroLifecycle: 5 passed, 0 failed
  Total: 32 tests across 18 suites (All passed in 118ms)

# 3. Production Vite Build
$ npm run build
Exit Code: 0 (Built in 1.72s)
  dist/index.html                   6.45 kB │ gzip:   2.28 kB
  dist/assets/index-DGbvN4Xv.css  121.67 kB │ gzip:  19.56 kB
  dist/assets/index-DP5T-KjM.js   391.12 kB │ gzip: 122.44 kB

# 4. Whitespace Check
$ git diff --check
Exit Code: 0 (No whitespace errors)
```

---

## 7. Git Working Tree Status (Unstaged)

Per strict instructions (*"After migration, leave all changes unstaged. Do not run git add... Do not commit"*), all modifications remain unstaged in the working tree:

```text
 M src/app/App.tsx
 D src/components/archive/AboutSarthakSection.tsx ... (10 files)
 D src/components/home/BuyerRequirementForm.tsx ... (8 files)
 D src/components/home/hero/HeroScrollCanvas.tsx ... (8 files)
 D src/services/submissionAdapter.ts
 D src/types/buyerRequirement.ts
 D src/utils/requirementValidation.ts
?? archive/
?? docs/FOLDER_STRUCTURE_AUDIT.md
?? docs/FOLDER_STRUCTURE_PROPOSAL.md
?? docs/PHASE_3B_2_MIGRATION_REPORT.md
?? public/Shivom_Global_Header_Logo.svg.bak
?? src/features/
?? src/pages/
```

- **Unresolved Issues:** None.
- **Commit Readiness:** The migration is fully verified, non-breaking, and ready for your staging/commit instruction.
