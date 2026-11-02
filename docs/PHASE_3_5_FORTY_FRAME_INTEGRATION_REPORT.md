# SHIVOM GLOBAL — Phase 3.5: 40-Frame Hero Scroll Animation Integration

**Production Implementation Report: 40-Frame Cinematic Scroll Sequence**

---

## 1. Executive Summary

As requested, the hero section has been upgraded from the previous 8-frame sequence to the **40-frame animation sequence** sourced from `public/assets/ezgif-44c01c3f4777df02-jpg/`.

All 40 frames were converted to highly compressed, production-grade WebP files at **1280 × 720** (16:9 standard ratio) and seamlessly integrated into the React 18 Canvas rendering pipeline. The scroll track remains tuned to the approved **190vh** travel distance, ensuring a rich, fluid, cinematic experience without trapping the visitor.

---

## 2. 40-Frame Asset Audit & Technical Specifications

| Property | Value | Notes |
| :--- | :--- | :--- |
| **Asset Directory** | `public/assets/hero/` | `hero-frame-001.webp` through `hero-frame-040.webp` |
| **Total Frames** | 40 frames | Sourced from `ezgif-44c01c3f4777df02-jpg` |
| **Dimensions** | 1280 × 720 px | Exact 16:9 widescreen aspect ratio |
| **Format** | WebP (VP8, YUV420p) | High-compression photographic encoding |
| **Total Sequence Size** | **4.11 MB** | ~102 KB average per frame |
| **First Frame Size** | **203 KB** | Prioritized exclusively for sub-second first paint |

---

## 3. Visual Verification

### Full 40-Frame Sequence Contact Sheet (8 × 5 Grid)
![40-Frame Sequence Contact Sheet](/Users/sarthak/.gemini/antigravity/brain/77b0d56d-f3ff-48e7-9f94-c5aadeceeacd/hero_40_contact_sheet.webp)

---

### Sequence Milestones & UI Progression

#### 1. Beginning of Scroll (Progress: 0.0 — Frame 001)
![Hero Sequence Start](/Users/sarthak/.gemini/antigravity/brain/77b0d56d-f3ff-48e7-9f94-c5aadeceeacd/hero_40_start.webp)
* **Visual State**: Visitor lands on page. Frame 001 paints immediately. Clean, unobscured hero presentation. Micro gold progress bar initiates at 0%.

---

#### 2. Sequence Midpoint (Progress: 0.5 — Frame 020 / 021 Blend)
![Hero Sequence Midpoint](/Users/sarthak/.gemini/antigravity/brain/77b0d56d-f3ff-48e7-9f94-c5aadeceeacd/hero_40_midpoint.webp)
* **Visual State**: Visitor scrolls smoothly. Canvas sub-frame alpha crossfade renders a 50/50 blend between Frame 020 and 021. Micro progress bar reaches 50%.

---

#### 3. Sequence Completion (Progress: 1.0 — Frame 040)
![Hero Sequence Completion](/Users/sarthak/.gemini/antigravity/brain/77b0d56d-f3ff-48e7-9f94-c5aadeceeacd/hero_40_end.webp)
* **Visual State**: 100% progress reached. The sticky section immediately unpins and smoothly transitions into the **Tea Sourcing Categories** section below.

---

## 4. Key Architectural Changes

### 1. Type Definitions & Constants (`src/components/home/hero/heroAnimationTypes.ts`)
* Updated `HERO_FRAME_COUNT = 40`.
* Dynamically generate `HERO_FRAMES` array mapping frames `001` to `040` with 3-digit zero padding:
  ```typescript
  export const HERO_FRAME_COUNT = 40;
  export const HERO_FRAMES: readonly HeroFrameMetadata[] = Array.from(
    { length: HERO_FRAME_COUNT },
    (_, i) => {
      const id = i + 1;
      const padded = String(id).padStart(3, '0');
      return {
        id,
        filename: `hero-frame-${padded}.webp`,
        url: `/assets/hero/hero-frame-${padded}.webp`,
        label: `Frame ${String(id).padStart(2, '0')}`,
        milestone: 'Indian Tea Sourcing Journey',
      };
    }
  );
  ```

### 2. High-Performance Two-Phase Preloader (`src/components/home/hero/useHeroImagePreloader.ts`)
* **Phase 1**: Priority 1 exclusively loads Frame 001 first for immediate first paint without network congestion.
* **Phase 2**: Controlled concurrent queue (`MAX_CONCURRENCY = 4`) streams the remaining 39 frames in narrative order using browser HTTP/2 multiplexing.
* **Resilient**: Any missing or slow frame triggers graceful fallback to the nearest loaded frame without blocking the queue.

### 3. GPU Canvas Rendering (`src/components/home/hero/HeroScrollCanvas.tsx`)
* Stabilized `ResizeObserver` lifecycle remains strictly decoupled from scroll events.
* Alpha blending continuously evaluates all 39 sub-frame intervals (`0.0` to `1.0`).
* Clamped device pixel ratio (DPR ≤ 2.0) prevents mobile memory pressure.

### 4. Hero Section & Indicator UX (`src/components/home/HeroSection.tsx`)
* Scroll track fixed at **190vh** travel.
* Removed floating `.hero-narrative-badge` for an ultra-clean, cinematic aesthetic that leaves the visuals completely unobstructed.
* Retained subtle 3px gold micro progress line (`hero-progress-track`) with accessible `role="progressbar"` tracking `0%` to `100%`.
* Static image fallback and `prefers-reduced-motion` compliance 100% preserved.

---

## 5. Verification & Testing

### Unit Test Suite
Ran `node --test src/components/home/hero/*.test.ts`:
```
✔ heroAnimationUtils (14 tests passed)
✔ HeroScrollCanvas Rendering Engine (11 tests passed - all 39 transitions, boundaries, DPR, aspect ratios)
✔ Hero Animation Lifecycle & Stability Verification (7 tests passed - observer stability, preloader queue)
Total: 32 tests, 0 failures, 0 regressions (Duration: 177ms)
```

### Production Build
Ran `npm run build` (`tsc && vite build`):
```
✓ 1596 modules transformed.
dist/index.html                   6.45 kB │ gzip:  2.28 kB
dist/assets/index-CK0C8Utl.css  118.92 kB │ gzip: 18.82 kB
dist/assets/index-2SyB6Mia.js   244.60 kB │ gzip: 71.91 kB
✓ built in 1.43s with 0 errors
```

---

## 6. Strict Boundary Verification

* **Business Copy & CTAs**: Unchanged (H1, secondary button, WhatsApp direct desk link, direct contact email and phone are 100% intact).
* **Backend Integrations**: Zero changes to Supabase, Resend, buyer enquiry APIs, dashboard, or contact forms.
* **Dependencies**: Zero new npm packages added.
* **Deployment**: Local integration only. No production deployment performed.
