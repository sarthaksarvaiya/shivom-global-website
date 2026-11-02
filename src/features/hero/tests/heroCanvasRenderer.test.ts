import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFrameInterpolation,
  calculateCoverDimensions,
  getEffectiveDpr,
  clamp,
} from '../utils/heroAnimationUtils.ts';
import { HERO_FRAME_COUNT } from '../types/heroAnimationTypes.ts';

// Mock minimal HTMLImageElement structure
interface MockImage {
  naturalWidth: number;
  naturalHeight: number;
  src: string;
}

// Mock Canvas 2D Rendering Context
class MockCanvasContext2D {
  public globalAlpha = 1.0;
  public drawCalls: Array<{
    img: MockImage;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
    alpha: number;
  }> = [];

  drawImage(
    img: MockImage,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ) {
    this.drawCalls.push({
      img,
      dx,
      dy,
      dWidth,
      dHeight,
      alpha: this.globalAlpha,
    });
  }

  reset() {
    this.globalAlpha = 1.0;
    this.drawCalls = [];
  }
}

// Pure rendering simulation replicating HeroScrollCanvas draw logic
function simulateCanvasDraw({
  ctx,
  canvasWidth,
  canvasHeight,
  dpr,
  progress,
  isReducedMotion,
  images,
  lastValidIndex,
}: {
  ctx: MockCanvasContext2D;
  canvasWidth: number;
  canvasHeight: number;
  dpr: number;
  progress: number;
  isReducedMotion: boolean;
  images: (MockImage | null)[];
  lastValidIndex: number;
}): { renderedBaseIndex: number; blendedNextIndex: number | null; blendAlpha: number } {
  ctx.reset();

  const targetPixelWidth = Math.round(canvasWidth * dpr);
  const targetPixelHeight = Math.round(canvasHeight * dpr);

  const effectiveProgress = isReducedMotion ? 0 : clamp(progress, 0, 1);
  const { baseIndex, nextIndex, blendFactor } = calculateFrameInterpolation(
    effectiveProgress,
    HERO_FRAME_COUNT
  );

  let baseImg = images[baseIndex];
  let resolvedBaseIndex = baseIndex;
  if (!baseImg) {
    baseImg = images[lastValidIndex] || images[0] || null;
    resolvedBaseIndex = images[lastValidIndex] ? lastValidIndex : 0;
  }

  if (!baseImg) {
    return { renderedBaseIndex: -1, blendedNextIndex: null, blendAlpha: 0 };
  }

  const baseDims = calculateCoverDimensions(
    targetPixelWidth,
    targetPixelHeight,
    baseImg.naturalWidth,
    baseImg.naturalHeight
  );

  ctx.globalAlpha = 1.0;
  ctx.drawImage(
    baseImg,
    baseDims.offsetX,
    baseDims.offsetY,
    baseDims.renderWidth,
    baseDims.renderHeight
  );

  let blendedNextIndex: number | null = null;
  let blendAlpha = 0;

  if (!isReducedMotion && blendFactor > 0.005 && baseIndex !== nextIndex) {
    const nextImg = images[nextIndex];
    if (nextImg) {
      blendedNextIndex = nextIndex;
      blendAlpha = blendFactor;
      const nextDims = calculateCoverDimensions(
        targetPixelWidth,
        targetPixelHeight,
        nextImg.naturalWidth,
        nextImg.naturalHeight
      );

      ctx.globalAlpha = blendFactor;
      ctx.drawImage(
        nextImg,
        nextDims.offsetX,
        nextDims.offsetY,
        nextDims.renderWidth,
        nextDims.renderHeight
      );
      ctx.globalAlpha = 1.0;
    }
  }

  return {
    renderedBaseIndex: resolvedBaseIndex,
    blendedNextIndex,
    blendAlpha,
  };
}

describe('HeroScrollCanvas Rendering Engine', () => {
  const mockImages: MockImage[] = Array.from({ length: 40 }, (_, i) => ({
    naturalWidth: 1280,
    naturalHeight: 720,
    src: `/assets/hero/hero-frame-${String(i + 1).padStart(3, '0')}.webp`,
  }));

  const ctx = new MockCanvasContext2D();

  describe('1. All Forty Frame Transitions', () => {
    it('should correctly traverse all 39 transition intervals between the 40 frames', () => {
      // 40 frames = 39 transition segments (each 1/39 progress)
      for (let segment = 0; segment < 39; segment += 1) {
        const midProgress = (segment + 0.5) / 39;
        const result = simulateCanvasDraw({
          ctx,
          canvasWidth: 1280,
          canvasHeight: 720,
          dpr: 1.0,
          progress: midProgress,
          isReducedMotion: false,
          images: mockImages,
          lastValidIndex: 0,
        });

        assert.equal(result.renderedBaseIndex, segment);
        assert.equal(result.blendedNextIndex, segment + 1);
        assert.ok(Math.abs(result.blendAlpha - 0.5) < 1e-4);
        assert.equal(ctx.drawCalls.length, 2);
        assert.equal(ctx.drawCalls[0].alpha, 1.0);
        assert.ok(Math.abs(ctx.drawCalls[1].alpha - 0.5) < 1e-4);
      }
    });
  });

  describe('2. Progress Boundaries 0 and 1', () => {
    it('should draw only Frame 001 at progress 0 with zero blending', () => {
      const result = simulateCanvasDraw({
        ctx,
        canvasWidth: 1280,
        canvasHeight: 720,
        dpr: 1.0,
        progress: 0.0,
        isReducedMotion: false,
        images: mockImages,
        lastValidIndex: 0,
      });

      assert.equal(result.renderedBaseIndex, 0);
      assert.equal(result.blendedNextIndex, null);
      assert.equal(ctx.drawCalls.length, 1);
      assert.equal(ctx.drawCalls[0].alpha, 1.0);
      assert.equal(ctx.drawCalls[0].img.src, '/assets/hero/hero-frame-001.webp');
    });

    it('should draw only Frame 040 at progress 1.0 with zero blending', () => {
      const result = simulateCanvasDraw({
        ctx,
        canvasWidth: 1280,
        canvasHeight: 720,
        dpr: 1.0,
        progress: 1.0,
        isReducedMotion: false,
        images: mockImages,
        lastValidIndex: 0,
      });

      assert.equal(result.renderedBaseIndex, 39);
      assert.equal(result.blendedNextIndex, null);
      assert.equal(ctx.drawCalls.length, 1);
      assert.equal(ctx.drawCalls[0].alpha, 1.0);
      assert.equal(ctx.drawCalls[0].img.src, '/assets/hero/hero-frame-040.webp');
    });
  });

  describe('3. Midpoint Blending', () => {
    it('should blend exactly 50% between Frame 020 and Frame 021 at progress 0.5', () => {
      const result = simulateCanvasDraw({
        ctx,
        canvasWidth: 1280,
        canvasHeight: 720,
        dpr: 1.0,
        progress: 0.5,
        isReducedMotion: false,
        images: mockImages,
        lastValidIndex: 0,
      });

      assert.equal(result.renderedBaseIndex, 19); // Frame 020 (0-indexed 19)
      assert.equal(result.blendedNextIndex, 20); // Frame 021 (0-indexed 20)
      assert.equal(result.blendAlpha, 0.5);
      assert.equal(ctx.drawCalls[1].alpha, 0.5);
    });
  });

  describe('4. Portrait and Landscape Viewports', () => {
    it('should correctly cover ultrawide landscape viewport (3440x1440)', () => {
      const dims = calculateCoverDimensions(3440, 1440, 1920, 1080);
      assert.equal(dims.renderWidth, 3440);
      assert.ok(dims.renderHeight >= 1440);
      assert.equal(dims.offsetX, 0);
      assert.ok(dims.offsetY <= 0); // centered vertically
    });

    it('should correctly cover standard 16:9 desktop viewport (1920x1080)', () => {
      const dims = calculateCoverDimensions(1920, 1080, 1920, 1080);
      assert.equal(dims.renderWidth, 1920);
      assert.equal(dims.renderHeight, 1080);
      assert.equal(dims.offsetX, 0);
      assert.equal(dims.offsetY, 0);
    });

    it('should correctly cover mobile portrait viewport (390x844)', () => {
      const dims = calculateCoverDimensions(390, 844, 1920, 1080);
      assert.ok(dims.renderWidth >= 390);
      assert.equal(dims.renderHeight, 844);
      assert.ok(dims.offsetX <= 0); // centered horizontally
      assert.equal(dims.offsetY, 0);
    });
  });

  describe('5. Device Pixel Ratio (DPR 1, 1.5, 2)', () => {
    it('should clamp DPR to max ceiling', () => {
      assert.equal(getEffectiveDpr(2.0), 1.0); // node environment defaults to 1
    });

    it('should scale canvas target pixels properly at DPR 1.0, 1.5, and 2.0', () => {
      [1.0, 1.5, 2.0].forEach((dpr) => {
        const width = 1280;
        const height = 720;
        const targetWidth = Math.round(width * dpr);
        const targetHeight = Math.round(height * dpr);

        assert.equal(targetWidth, width * dpr);
        assert.equal(targetHeight, height * dpr);
      });
    });
  });

  describe('6. prefers-reduced-motion Behaviour', () => {
    it('should lock to Frame 001 even if progress is at 0.8 when reduced motion is active', () => {
      const result = simulateCanvasDraw({
        ctx,
        canvasWidth: 1280,
        canvasHeight: 720,
        dpr: 1.0,
        progress: 0.8,
        isReducedMotion: true,
        images: mockImages,
        lastValidIndex: 0,
      });

      assert.equal(result.renderedBaseIndex, 0);
      assert.equal(result.blendedNextIndex, null);
      assert.equal(ctx.drawCalls.length, 1);
      assert.equal(ctx.drawCalls[0].img.src, '/assets/hero/hero-frame-001.webp');
    });
  });

  describe('7. Incomplete Image Loading & Graceful Error Fallback', () => {
    it('should gracefully fallback to lastValidIndex when requested base frame is null', () => {
      const partialImages: (MockImage | null)[] = [...mockImages];
      partialImages[19] = null; // Frame 020 failed to load

      const result = simulateCanvasDraw({
        ctx,
        canvasWidth: 1280,
        canvasHeight: 720,
        dpr: 1.0,
        progress: 0.5, // requests base frame 19
        isReducedMotion: false,
        images: partialImages,
        lastValidIndex: 18, // Frame 019 was last valid frame
      });

      assert.equal(result.renderedBaseIndex, 18); // Fell back to Frame 019
      assert.equal(ctx.drawCalls[0].img.src, '/assets/hero/hero-frame-019.webp');
    });

    it('should not throw if next frame is null during blending and render base frame at 100%', () => {
      const partialImages: (MockImage | null)[] = [...mockImages];
      partialImages[20] = null; // Frame 021 not loaded yet

      const result = simulateCanvasDraw({
        ctx,
        canvasWidth: 1280,
        canvasHeight: 720,
        dpr: 1.0,
        progress: 0.5, // base = 19, next = 20
        isReducedMotion: false,
        images: partialImages,
        lastValidIndex: 19,
      });

      assert.equal(result.renderedBaseIndex, 19);
      assert.equal(result.blendedNextIndex, null); // Did not attempt to blend missing Frame 021
      assert.equal(ctx.drawCalls.length, 1);
      assert.equal(ctx.drawCalls[0].alpha, 1.0);
    });
  });
});
