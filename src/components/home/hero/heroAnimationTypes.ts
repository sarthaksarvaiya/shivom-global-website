/**
 * SHIVOM GLOBAL — Hero Animation Foundation
 * Type definitions & configuration constants for scroll-driven hero sequence
 */

export interface HeroFrameMetadata {
  id: number;
  filename: string;
  url: string;
  label: string;
  milestone: string;
}

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

export const HERO_FRAME_URLS: readonly string[] = HERO_FRAMES.map((f) => f.url);

export interface HeroPreloaderState {
  /** Array of preloaded HTML Image elements (or null if still loading/failed) */
  images: (HTMLImageElement | null)[];
  /** Whether the critical first frame has loaded and is ready for initial render */
  isInitialLoaded: boolean;
  /** Whether all frames in the sequence have completed loading */
  isAllLoaded: boolean;
  /** Total count of successfully loaded images */
  loadedCount: number;
  /** True if any image failed to load */
  hasError: boolean;
  /** Zero-based indices of any images that failed */
  errorIndices: number[];
}

export interface FrameInterpolation {
  /** Index of the primary base frame being displayed */
  baseIndex: number;
  /** Index of the subsequent frame being blended into */
  nextIndex: number;
  /** Blend factor between 0.0 (100% base frame) and 1.0 (100% next frame) */
  blendFactor: number;
  /** Continuous virtual index across the sequence (e.g. 0.0 to 7.0) */
  virtualIndex: number;
}

export interface HeroScrollProgressState extends FrameInterpolation {
  /** Normalized scroll progress clamped between 0.0 and 1.0 */
  progress: number;
  /** Whether the hero container is currently in the viewport */
  isInView: boolean;
  /** Whether the user has requested reduced motion */
  prefersReducedMotion: boolean;
}

export interface CoverDimensions {
  renderWidth: number;
  renderHeight: number;
  offsetX: number;
  offsetY: number;
}

export interface HeroAnimationConfig {
  /** Total frames in the sequence (default: 8) */
  frameCount?: number;
  /** Height multiplier for the sticky scroll track (default: 2.5 = 250vh) */
  trackHeightMultiplier?: number;
  /** Maximum device pixel ratio to prevent mobile VRAM exhaustion (default: 2) */
  maxDpr?: number;
}
