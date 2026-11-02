/**
 * SHIVOM GLOBAL — Hero Scroll Canvas Component
 * GPU-accelerated 2D canvas sequence renderer with stabilized observer lifecycle,
 * sub-frame alpha crossfading, DPR clamping, and prefers-reduced-motion fallback.
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { HERO_FRAME_COUNT, CoverDimensions } from './heroAnimationTypes.ts';
import {
  calculateFrameInterpolation,
  calculateCoverDimensions,
  getEffectiveDpr,
  checkPrefersReducedMotion,
  clamp,
} from './heroAnimationUtils.ts';
import { useHeroImagePreloader } from './useHeroImagePreloader.ts';

export interface HeroScrollCanvasProps {
  /**
   * Normalized scroll progress between 0.0 and 1.0 (from useHeroScrollProgress)
   */
  progress?: number;
  /**
   * Whether reduced motion is enforced. Defaults to system matchMedia preference.
   */
  prefersReducedMotion?: boolean;
  /**
   * Optional custom CSS class name
   */
  className?: string;
  /**
   * Optional inline styles for the canvas element
   */
  style?: React.CSSProperties;
  /**
   * Maximum device pixel ratio limit (default: 2.0)
   */
  maxDpr?: number;
  /**
   * Total frames in sequence (default: 8)
   */
  totalFrames?: number;
  /**
   * Callback invoked once the initial frame is successfully painted to canvas
   */
  onInitialFrameRendered?: () => void;
}

export const HeroScrollCanvas: React.FC<HeroScrollCanvasProps> = ({
  progress = 0,
  prefersReducedMotion: prefersReducedMotionProp,
  className = '',
  style,
  maxDpr = 2.0,
  totalFrames = HERO_FRAME_COUNT,
  onInitialFrameRendered,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const initialPaintNotifiedRef = useRef(false);
  const lastValidIndexRef = useRef<number>(0);

  // Progressive preloader caching all 8 WebP assets
  const { images, isInitialLoaded } = useHeroImagePreloader();

  // Detect reduced-motion preference if not explicitly provided
  const isReducedMotion = prefersReducedMotionProp ?? checkPrefersReducedMotion();

  // Keep latest mutable references for the render loop to decouple from observer lifecycle
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const isReducedMotionRef = useRef(isReducedMotion);
  isReducedMotionRef.current = isReducedMotion;

  const maxDprRef = useRef(maxDpr);
  maxDprRef.current = maxDpr;

  const totalFramesRef = useRef(totalFrames);
  totalFramesRef.current = totalFrames;

  const imagesRef = useRef(images);
  imagesRef.current = images;

  const onInitialFrameRenderedRef = useRef(onInitialFrameRendered);
  onInitialFrameRenderedRef.current = onInitialFrameRendered;

  /**
   * Stable canvas render procedure reading from refs.
   * Zero external dependencies ensures this function reference never changes.
   */
  const renderCanvas = useCallback(() => {
    rafIdRef.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    // 1. Device Pixel Ratio Management
    const dpr = getEffectiveDpr(maxDprRef.current);
    const targetPixelWidth = Math.round(rect.width * dpr);
    const targetPixelHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetPixelWidth || canvas.height !== targetPixelHeight) {
      canvas.width = targetPixelWidth;
      canvas.height = targetPixelHeight;
    }

    // 2. Reduced Motion Fallback
    const currentProgress = isReducedMotionRef.current
      ? 0
      : clamp(progressRef.current, 0, 1);

    const availableImages = imagesRef.current;
    const effectiveFrames = Math.max(
      1,
      Math.min(totalFramesRef.current, availableImages.length || totalFramesRef.current)
    );

    const { baseIndex, nextIndex, blendFactor } = calculateFrameInterpolation(
      currentProgress,
      effectiveFrames
    );

    // 3. Resolve Available Base Image
    let baseImg = availableImages[baseIndex];
    if (!baseImg) {
      // Fallback to last successfully rendered frame or Frame 01
      baseImg = availableImages[lastValidIndexRef.current] || availableImages[0] || null;
    } else {
      lastValidIndexRef.current = baseIndex;
    }

    if (!baseImg) {
      // Still preloading initial frame; avoid painting a blank slate
      return;
    }

    const naturalWidth = baseImg.naturalWidth || 1280;
    const naturalHeight = baseImg.naturalHeight || 720;

    const baseDims: CoverDimensions = calculateCoverDimensions(
      targetPixelWidth,
      targetPixelHeight,
      naturalWidth,
      naturalHeight
    );

    // 4. Draw Base Frame
    ctx.globalAlpha = 1.0;
    ctx.drawImage(
      baseImg,
      baseDims.offsetX,
      baseDims.offsetY,
      baseDims.renderWidth,
      baseDims.renderHeight
    );

    // 5. Alpha Crossfade Next Frame (if loaded and blendFactor > 0.5%)
    if (!isReducedMotionRef.current && blendFactor > 0.005 && baseIndex !== nextIndex) {
      const nextImg = availableImages[nextIndex];
      if (nextImg) {
        const nextNaturalWidth = nextImg.naturalWidth || 1280;
        const nextNaturalHeight = nextImg.naturalHeight || 720;

        const nextDims: CoverDimensions = calculateCoverDimensions(
          targetPixelWidth,
          targetPixelHeight,
          nextNaturalWidth,
          nextNaturalHeight
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

    // 6. Notify Parent on First Successful Paint (via stable ref)
    if (!initialPaintNotifiedRef.current) {
      initialPaintNotifiedRef.current = true;
      if (onInitialFrameRenderedRef.current) {
        onInitialFrameRenderedRef.current();
      }
    }
  }, []);

  /**
   * Schedule render inside requestAnimationFrame.
   * Completely stable across component lifecycle.
   */
  const scheduleRender = useCallback(() => {
    if (rafIdRef.current === null) {
      rafIdRef.current = window.requestAnimationFrame(renderCanvas);
    }
  }, [renderCanvas]);

  // 1. Render trigger when progress, images, or reduced-motion shift
  useEffect(() => {
    scheduleRender();
  }, [scheduleRender, progress, isInitialLoaded, isReducedMotion]);

  // 2. ResizeObserver: Strictly isolated lifecycle that NEVER tears down on scroll progress updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleRender();
      });
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener('resize', scheduleRender, { passive: true });
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', scheduleRender);
      }
    };
  }, [scheduleRender]);

  // 3. Unmount cleanup for any pending animation frame
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`hero-scroll-canvas ${className}`.trim()}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
      role="presentation"
      tabIndex={-1}
    />
  );
};
