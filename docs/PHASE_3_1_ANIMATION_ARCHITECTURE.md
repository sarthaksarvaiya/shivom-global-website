# SHIVOM GLOBAL — PHASE 3.1: HERO ANIMATION ARCHITECTURE
**Scroll-Driven 8-Frame Visual Narrative Architecture**

* **Document**: `PHASE_3_1_ANIMATION_ARCHITECTURE.md`
* **Status**: Proposed & Ready for Review
* **Target Stack**: React 18, Vite 6, TypeScript 5, Vanilla CSS
* **Input Assets**: `public/assets/hero/hero-frame-01.webp` through `hero-frame-08.webp`

---

## 1. Codebase & Architectural Inspection

### 1.1 Existing Technical Stack
* **Framework**: React 18.3.1 (`react`, `react-dom`)
* **Build Tool**: Vite 6.0.1
* **Language**: TypeScript 5.6.3
* **Styling**: Vanilla CSS with strict CSS Variable design tokens (`tokens.css`, `index.css`)
* **Iconography**: `lucide-react`
* **Animation Dependencies**: **None**. No GSAP, Framer Motion, or external canvas engines are installed. The architecture is pure Vanilla CSS + React.

### 1.2 Current Hero Section Implementation
* **Component Path**: `src/components/home/HeroSection.tsx`
* **Layout Structure**:
  * Outer `<section id="hero" className="hero-section">` with `min-height: calc(100vh - 76px)`.
  * Background `<div className="hero-bg-layer" aria-hidden="true" />` applying dual linear gradient overlays on top of a static raster image (`/images/indian_tea_landscape_hero.jpg`).
  * Foreground `<div className="container hero-container">` containing headline, value proposition badges, dual CTAs, and trade desk contact strip (`z-index: 2`).
* **Design Token Integration**:
  * Dark container base: `--color-primary-dark` (`#072218`)
  * Gradient overlays: `rgba(7, 34, 24, 0.88)` tapering to transparent
  * Accents: `--color-accent-gold` (`#C59B27`), Sage Green accents (`#9CAF88`)
  * Spacing & Grid: 8px modular scale (`--space-1` through `--space-30`)

---

## 2. Comparative Evaluation of Implementation Approaches

| Evaluation Criterion | Approach A: HTML5 `<canvas>` Image Sequence | Approach B: CSS Crossfade (`<img>` Stack) | Approach C: Video Scrubbing (`<video>`) |
| :--- | :--- | :--- | :--- |
| **Visual Smoothness** | **Excellent (60–120 FPS)**. Sub-pixel rendering and programmatic linear alpha blending between adjacent frames. | **Good**. Crossfade can be smooth, but rapid scrolling causes layer thrashing and stepped transitions. | **Poor / Stuttering**. Video keyframe (I-frame) seeks introduce significant frame drop and latency when scrubbing backward. |
| **Scroll Synchronization** | **Instantaneous**. `requestAnimationFrame` loop calculates fractional scroll progress with zero delay. | **Fair**. Discrete class switches or CSS variable updates trigger reflows/recalculations on every scroll tick. | **Unacceptable**. `video.currentTime` updates are asynchronously throttled by browser media engines (often at 15–30Hz). |
| **Browser Performance** | **High**. GPU-accelerated 2D canvas context. No DOM reflows, minimal paint cycles. | **Moderate**. 8 full-bleed DOM elements with large WebP textures active in composite tree. | **Poor**. Continuous hardware video decoder engagement causes high CPU/battery draw. |
| **Mobile Performance** | **High**. Maintains 60 FPS when DPR is clamped to 1.5–2.0. Clean memory footprint. | **Fair**. iOS Safari often demotes stacked layers or runs into memory warnings on low-tier devices. | **Critical Failure**. Mobile Safari and Android aggressively throttle video playback and seek events during touch scrolling. |
| **Memory Footprint** | **~66 MB VRAM** (8 preloaded 1920×1080 textures). Predictable, leak-free memory profile. | **~75–90 MB VRAM + DOM**. 8 separate DOM elements + composite layers in browser compositor. | **Unpredictable**. Heavy video decoder cache and buffer overhead. |
| **Accessibility & Reduced Motion** | **Seamless**. Instantly locks to static Frame 01 when `prefers-reduced-motion` is active. Hero text remains semantic HTML. | **Good**. Can toggle visibility via media queries. | **Fair**. Requires pausing/disabling video tag and falling back to image. |
| **Implementation Complexity** | **Moderate**. Requires a custom React hook and canvas drawing loop. Zero external dependencies. | **Low**. Straightforward CSS layering, but achieving continuous sub-frame blending is cumbersome. | **High**. Requires complex seek throttling, canvas capture, or video frame syncing workarounds. |

---

## 3. Architecture Recommendation

### **Recommended Choice: Approach A — HTML5 `<canvas>` Sequence with Fractional Frame Blending**

### Key Justifications:
1. **Preserves Vanilla Stack**: Implements a lightweight, zero-dependency custom React hook and canvas renderer conforming strictly to the project's rule against unnecessary libraries.
2. **True Continuous Scrubbing**: Rather than abrupt discrete steps (1 ➔ 2 ➔ 3), the canvas architecture implements **linear alpha crossfading** between adjacent frames:
   $$\text{Progress} \rightarrow \text{Frame } i \ (1.0 - \alpha) + \text{Frame } (i + 1) \ (\alpha)$$
   This creates a cinematic, fluid narrative transformation even with 8 discrete milestone frames.
3. **Rock-Solid Reliability on Mobile**: Clamping device pixel ratio and rendering to a single canvas eliminates mobile browser composite layer thrashing and avoids video seek lag completely.
4. **Non-Destructive Content Overlay**: The existing semantic HTML hero markup (H1 headline, value proposition, CTAs, direct contact channels) remains 100% untouched above the canvas layer (`z-index: 2`).

---

## 4. Technical Architecture & Component Specification

```
src/components/home/
├── HeroSection.tsx                 <-- Orchestrates container, text & canvas
└── hero/
    ├── HeroScrollCanvas.tsx        <-- Canvas rendering component
    ├── useHeroScrollProgress.ts    <-- Scroll measurement & progress hook (rAF)
    ├── useHeroImagePreloader.ts    <-- Preloader state machine (WebP caching)
    └── heroAnimationTypes.ts       <-- Type definitions & constants
```

### 4.1 Component Hierarchy & Structure

```
[ HeroSection (sticky parent container: height 250vh - 300vh) ]
  │
  ├── [ HeroStickyViewport (position: sticky, top: 0, height: 100vh) ]
  │     │
  │     ├── [ HeroScrollCanvas (canvas: width 100%, height: 100%, z-index: 1) ]
  │     │     └── 8 Preloaded WebP Frames drawn with Cover Scale & Alpha Blending
  │     │
  │     ├── [ HeroVignetteOverlay (gradient overlay, z-index: 2) ]
  │     │     └── Preserves Deep Forest contrast & text readability
  │     │
  │     └── [ HeroContentContainer (semantic HTML, z-index: 3) ]
  │           └── Eyebrow, H1 Headline, CTAs, Contact Strip
  │
  └── [ Scroll Anchor / Transition to next section ]
```

### 4.2 State Management & Hooks

#### 1. `useHeroImagePreloader`
* **Purpose**: Progressively load and cache all 8 WebP images into HTML `Image` memory objects.
* **State**:
  * `images`: `HTMLImageElement[]`
  * `isLoaded`: `boolean` (true when Frame 01 is ready for immediate display)
  * `allLoaded`: `boolean` (true when all 8 frames are decoded)
  * `loadProgress`: `number` (0 to 8)
* **Strategy**:
  * Frame 01 is loaded immediately with high priority.
  * Frames 02–08 are loaded asynchronously in sequence.
  * Canvas begins rendering Frame 01 instantly—zero blank state or layout shift.

#### 2. `useHeroScrollProgress`
* **Purpose**: Calculate normalized scroll progress $P \in [0.0, 1.0]$ based on the scroll position of the hero track.
* **Formula**:
  $$P = \text{clamp}\left(\frac{-\text{rect.top}}{\text{rect.height} - \text{viewportHeight}}, 0.0, 1.0\right)$$
* **Performance Control**:
  * Employs passive scroll event listeners.
  * Schedules position updates inside `window.requestAnimationFrame`.
  * Flags execution only when the hero container intersects the viewport (`IntersectionObserver`).

### 4.3 Frame Transition & Blending Logic

With $N = 8$ frames, normalized progress $P \in [0, 1]$ maps across $N - 1 = 7$ transition intervals:

1. **Continuous Virtual Index**:
   $$V = P \times 7$$
2. **Base Frame Index**:
   $$i = \min(\lfloor V \rfloor, 6)$$
3. **Next Frame Index**:
   $$j = i + 1$$
4. **Interpolation Weight ($\alpha$)**:
   $$\alpha = V - i$$

#### Canvas Draw Operation (per rAF tick):
```typescript
// Clear canvas
ctx.clearRect(0, 0, width, height);

// Draw base frame (1.0 opacity)
ctx.globalAlpha = 1.0;
drawCoverImage(ctx, images[i], width, height);

// Crossfade next frame smoothly
if (alpha > 0.01 && images[j]) {
  ctx.globalAlpha = alpha;
  drawCoverImage(ctx, images[j], width, height);
}
```

### 4.4 Responsive Scaling & Aspect Ratio (`object-fit: cover`)
To ensure pixel-perfect rendering across ultrawide monitors, standard laptops, tablets, and mobile phones, a dedicated `drawCoverImage` helper maintains the authentic 16:9 aspect ratio centered:

```typescript
function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) {
  const imgRatio = 16 / 9;
  const canvasRatio = canvasWidth / canvasHeight;
  let renderWidth = canvasWidth;
  let renderHeight = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasRatio > imgRatio) {
    renderHeight = canvasWidth / imgRatio;
    offsetY = (canvasHeight - renderHeight) / 2;
  } else {
    renderWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - renderWidth) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
}
```

### 4.5 Accessibility & `prefers-reduced-motion`
* In accordance with **Rule 6** of the project guidelines, users with motion sensitivities must be accommodated:
  * Media query listener: `window.matchMedia('(prefers-reduced-motion: reduce)')`.
  * When reduced motion is detected:
    * The scroll listener is detached.
    * The hero section reverts to standard single-viewport height (`min-height: calc(100vh - 76px)`).
    * Canvas statically displays `hero-frame-01.webp`.
    * No scroll trapping or extended track height is rendered.

### 4.6 Error Handling & Fallback
* If WebP decoding fails or network errors prevent loading subsequent frames:
  * The canvas retains the last successfully loaded frame.
  * If the initial load fails completely, the component falls back to the existing static CSS background (`url('/images/indian_tea_landscape_hero.jpg')`).

---

## 5. Implementation Roadmap (Phases 3.2 – 3.4)

* **Phase 3.2**: Create modular hooks (`useHeroImagePreloader.ts`, `useHeroScrollProgress.ts`) and unit tests.
* **Phase 3.3**: Build `HeroScrollCanvas.tsx` component with cover scaling, rAF throttling, and alpha blending.
* **Phase 3.4**: Integrate canvas into `HeroSection.tsx` behind existing content without touching existing text, CTAs, or backend hooks.
* **Phase 3.5**: Performance verification (Core Web Vitals, 60fps mobile verification, reduced-motion test).

---

## 6. Conclusion & Recommendation

The **HTML5 Canvas Image Sequence** provides the highest visual fidelity, smoothest scroll response, and lowest architectural risk for the Shivom Global website. It strictly adheres to all project rules:
* Zero new external dependencies.
* Preserves React 18 / Vite / TypeScript / Vanilla CSS architecture.
* 100% accessible and respects motion preferences.
* Keeps existing text, CTAs, and layout intact.
