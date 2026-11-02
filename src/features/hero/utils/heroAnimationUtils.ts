/**
 * SHIVOM GLOBAL — Hero Animation Utilities
 * Pure mathematical, layout, and device helper functions with zero side effects
 */

import { HERO_FRAME_COUNT } from '../types/heroAnimationTypes.ts';
import type { CoverDimensions, FrameInterpolation } from '../types/heroAnimationTypes.ts';

/**
 * Constrains a numeric value between a minimum and maximum boundary.
 */
export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * Maps normalized scroll progress [0.0, 1.0] to a continuous frame interpolation state.
 *
 * @param progress Normalized progress clamped between 0.0 and 1.0
 * @param totalFrames Total number of frames in the sequence (default: HERO_FRAME_COUNT)
 * @returns FrameInterpolation containing baseIndex, nextIndex, blendFactor, and virtualIndex
 */
export function calculateFrameInterpolation(
  progress: number,
  totalFrames: number = HERO_FRAME_COUNT
): FrameInterpolation {
  if (totalFrames <= 1) {
    return {
      baseIndex: 0,
      nextIndex: 0,
      blendFactor: 0,
      virtualIndex: 0,
    };
  }

  const clampedProgress = clamp(progress, 0, 1);
  const maxIndex = totalFrames - 1;
  const virtualIndex = clampedProgress * maxIndex;

  // At or beyond 100% progress, lock to the final frame
  if (clampedProgress >= 1) {
    return {
      baseIndex: maxIndex,
      nextIndex: maxIndex,
      blendFactor: 0,
      virtualIndex: maxIndex,
    };
  }

  const baseIndex = Math.min(Math.floor(virtualIndex), maxIndex - 1);
  const nextIndex = baseIndex + 1;
  const blendFactor = virtualIndex - baseIndex;

  return {
    baseIndex,
    nextIndex,
    blendFactor,
    virtualIndex,
  };
}

/**
 * Computes destination rectangle dimensions and offsets to achieve
 * an `object-fit: cover` aspect ratio crop centered inside a target canvas.
 *
 * @param canvasWidth Target canvas viewport width
 * @param canvasHeight Target canvas viewport height
 * @param imageWidth Source image natural width
 * @param imageHeight Source image natural height
 */
export function calculateCoverDimensions(
  canvasWidth: number,
  canvasHeight: number,
  imageWidth: number,
  imageHeight: number
): CoverDimensions {
  if (canvasWidth <= 0 || canvasHeight <= 0 || imageWidth <= 0 || imageHeight <= 0) {
    return {
      renderWidth: 0,
      renderHeight: 0,
      offsetX: 0,
      offsetY: 0,
    };
  }

  const canvasRatio = canvasWidth / canvasHeight;
  const imageRatio = imageWidth / imageHeight;

  let renderWidth = canvasWidth;
  let renderHeight = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasRatio > imageRatio) {
    // Canvas is wider than image aspect ratio — scale by width, crop vertical
    renderHeight = canvasWidth / imageRatio;
    offsetY = (canvasHeight - renderHeight) / 2;
  } else {
    // Canvas is taller than image aspect ratio — scale by height, crop horizontal
    renderWidth = canvasHeight * imageRatio;
    offsetX = (canvasWidth - renderWidth) / 2;
  }

  return {
    renderWidth,
    renderHeight,
    offsetX,
    offsetY,
  };
}

/**
 * Returns the effective device pixel ratio (DPR), clamped to a maximum ceiling
 * to prevent excessive GPU VRAM consumption on high-density mobile screens.
 *
 * @param maxDpr Upper bound limit (default: 2.0)
 */
export function getEffectiveDpr(maxDpr: number = 2.0): number {
  if (typeof window === 'undefined') {
    return 1;
  }
  const rawDpr = window.devicePixelRatio || 1;
  return clamp(rawDpr, 1, maxDpr);
}

/**
 * Checks whether the user has enabled the prefers-reduced-motion media query.
 */
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
