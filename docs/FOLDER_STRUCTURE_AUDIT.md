# SHIVOM GLOBAL — Project Folder Structure Audit

**Document Version:** 1.0.0\
**Phase:** SG-PHASE-3B.1-AUDIT\
**Status:** Architectural Baseline Assessment\
**Project:** SHIVOM GLOBAL WEBSITE (`https://shivom-global-website.vercel.app/`)\
**Audit Timestamp:** 2026-11-02T16:45:00+05:30\

---

## 1. Executive Summary & Git Repository State

This audit evaluates the codebase structure of the SHIVOM GLOBAL B2B tea sourcing and export website. The objective is to establish an enterprise-grade, domain-separated architecture following React 18, Vite 6, and TypeScript 5 best practices.

### Current Git Baseline
- **Branch:** `main` (in sync with `origin/main`)
- **HEAD Commit:** `e4f8e99dd014bfd25292425c96f45a699608c6b7`
- **Staged Files:** Exactly 84 files staged (Phase 3A design tokens, 40-frame hero sequence, RFQ validation, documentation relocation, and zero-defect whitespace remediation).
- **Untracked Local Files:** `public/Shivom_Global_Header_Logo.svg.bak` (safely preserved logo backup).
- **Ignored Directories:** `.env.local`, `.gemini/`, `public/assets/ezgif-44c01c3f4777df02-jpg/`, `reference-assets/hero/`.

---

## 2. Inventory of Current Project Structure

The project currently comprises 103 tracked/staged source and asset files organized as follows:

```text
SHIVOM GLOBAL WEBSITE/
├── api/
│   └── buyer-requirements.ts                 # Dual-pipeline commercial enquiry endpoint
├── public/
│   ├── assets/
│   │   ├── ezgif-44c01c3f4777df02-jpg/       # [Git-ignored] 40 raw extraction JPEGs (2.3 MB)
│   │   └── hero/                             # 40 Active WebP hero sequence frames
│   ├── images/                               # 7 Authentic tea catalog photographs
│   ├── robots.txt, sitemap.xml
│   ├── Shivom Global Trade.png               # Legacy raster image (1.9 MB)
│   ├── Shivom_Global_Header_Logo.svg         # Primary header logo
│   └── Shivom_Global_Logo.svg                # Favicon brandmark
├── reference-assets/                         # [Git-ignored] 19 auxiliary WebP files (4.48 MB)
│   └── hero/
├── src/
│   ├── app/App.tsx                           # Application shell
│   ├── main.tsx                              # React DOM mount point
│   ├── components/
│   │   ├── archive/                          # 10 Deprecated legacy components
│   │   ├── home/                             # 8 Sectional components + HomePage orchestrator
│   │   │   └── hero/                         # Hero canvas subsystem (5 source + 3 test files)
│   │   └── layout/                           # 3 Site shell components (Header, Footer, WhatsApp)
│   ├── constants/contact.ts                  # Business registration, phone, WhatsApp data
│   ├── services/submissionAdapter.ts         # Client API submission adapter
│   ├── styles/                               # tokens.css & index.css
│   ├── types/buyerRequirement.ts             # RFQ types & taxonomies
│   └── utils/requirementValidation.ts        # Client form validation rules
├── supabase/migrations/                      # SQL schema definitions
└── docs/                                     # 18 Technical specifications & logs
```

---

## 3. Detailed Architectural Findings

### 3.1 Page Container Misplaced Inside Sectional Components
- **File:** `src/components/home/HomePage.tsx`
- **Issue:** `HomePage.tsx` is located inside `src/components/home/`. However, it is not a modular section or UI component. It manages page-level cross-cutting state (`formRequirementType`, `formGrade`, `formIntent`), smooth scrolling coordinates (`scrollToForm`, `scrollToGrades`), and assembles the layout (`SiteHeader`, sections, `SiteFooter`, `WhatsAppFloat`).
- **Impact:** Lacks a dedicated `src/pages/` boundary, which will complicate future routing (e.g., adding `/catalog`, `/certifications`, or `/contact` routes).

### 3.2 Mixing Business Responsibilities in `src/components/home/`
- **Issue:** All homepage sections currently reside in `src/components/home/` regardless of their underlying domain:
  - Catalog & Grade Matrices: `TeaCategoriesSection.tsx`, `GradeSpecificationTable.tsx`
  - Commercial RFQ Engine: `BuyerRequirementForm.tsx`
  - Private Label / Packaging: `PrivateLabelSection.tsx`
  - Procurement Logistics: `HowItWorksSection.tsx`
  - Corporate Credentials: `WhyShivomGlobal.tsx`
- **Impact:** Section components that share zero state or logic are lumped together simply because they render on the same landing page.

### 3.3 Fragmentation of the Buyer Requirement (RFQ) Engine
- **Files Involved:**
  - UI Component: `src/components/home/BuyerRequirementForm.tsx`
  - Types: `src/types/buyerRequirement.ts`
  - Validation: `src/utils/requirementValidation.ts`
  - API Service: `src/services/submissionAdapter.ts`
- **Issue:** These four files form a single cohesive commercial capability (inquiry submission to `/api/buyer-requirements`). None of the supporting files are used by any other feature.
- **Impact:** Maintenance requires navigating across 4 top-level directories (`components/`, `types/`, `utils/`, `services/`).

### 3.4 Dead Legacy Code in `src/components/archive/` (10 Files)
- **Files:** `AboutSarthakSection.tsx`, `AssamCtcSpotlight.tsx`, `DesignSystemFoundation.tsx`, `ExportCredibilitySection.tsx`, `ExportProcessFlow.tsx`, `GradeMatrix.tsx`, `HowWeWorkSection.tsx`, `RequirementRouter.tsx`, `TeaCatalog.tsx`, `WhoWeServeSection.tsx`.
- **Issue:** None of these 10 files are imported by active application code.
- **Impact:** Residing inside `src/` means TypeScript must type-check and compile them during every build. They clutter IDE searches and create confusion over which components are active.

### 3.5 Test Co-Location vs Centralized Test Strategy
- **Files:** `src/components/home/hero/heroAnimationUtils.test.ts`, `heroCanvasRenderer.test.ts`, `heroLifecycle.test.ts`.
- **Issue:** Test files are mixed inside `src/components/home/hero/`. While feature co-location has merits, there is no top-level test runner configured in `package.json`, and no dedicated test directory structure.

---

## 4. Documentation Comparison: Root vs `docs/` Rules Files

A byte-by-byte differential analysis was conducted between root rules files and their counterparts in `docs/`:

```bash
diff -u AGENTS.md docs/AGENTS.md    # Exit code: 0 (Identical)
diff -u GEMINI.md docs/GEMINI.md    # Exit code: 0 (Identical)
diff -u AGENTS.md GEMINI.md         # Exit code: 0 (Identical)
```

### Analysis:
- Both `docs/AGENTS.md` and `docs/GEMINI.md` are **100% byte-for-byte identical** to root `AGENTS.md` and `GEMINI.md`.
- **Root Files Purpose:** Required by Antigravity IDE and Gemini CLI for automated workspace rule ingestion.
- **`docs/` Files Purpose:** Serves as the centralized documentation repository archive.
- **Policy Recommendation:** Retain both without modification or deletion, as explicitly instructed in Phase 3B.1.

---

## 5. Test Configuration & Execution Assessment

### 5.1 Test Runner Configuration
- **Package Manifest (`package.json`):** Contains no testing dependencies (`vitest`, `jest`, `mocha` are absent). No `"test"` script is defined.
- **Node Environment:** Node.js version is `v22.23.1`.
- **Execution Capability:** The three test suites utilize Node's native test runner (`node:test`) and assertion library (`node:assert/strict`).
- **Verification Execution:**
  ```bash
  node --test "src/components/home/hero/*.test.ts"
  ```
  **Result:** All **32 tests across 18 suites execute and pass natively** in 107ms with zero extra dependencies:
  - `heroAnimationUtils.test.ts`: 15 passed, 0 failed.
  - `heroCanvasRenderer.test.ts`: 12 passed, 0 failed.
  - `heroLifecycle.test.ts`: 5 passed, 0 failed.

### 5.2 TypeScript & Bundler Dependencies
- `tsconfig.json` specifies `"include": ["src", "api"]`. Because the test files are located inside `src/`, `tsc --noEmit` validates their types during `npm run build`.
- Vite's production module graph begins at `src/main.tsx` and never imports `*.test.ts`, ensuring zero test code leaks into `dist/`.
- **Recommendation:** Do not move test files during Phase 3B. Retain them co-located within `src/features/hero/` until a formal testing framework or dedicated `tests/` directory is established.
