/**
 * SHIVOM GLOBAL — Hero Scroll Progress Hook
 * Measures normalized scroll progress through the hero container with rAF throttling,
 * passive listeners, intersection tracking, and prefers-reduced-motion fallback.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { HERO_FRAME_COUNT } from '../types/heroAnimationTypes.ts';
import type { HeroScrollProgressState } from '../types/heroAnimationTypes.ts';
import { calculateFrameInterpolation, checkPrefersReducedMotion, clamp } from '../utils/heroAnimationUtils.ts';

export function useHeroScrollProgress(
  containerRef: React.RefObject<HTMLElement | null>,
  totalFrames: number = HERO_FRAME_COUNT,
  headerOffset: number = 74
): HeroScrollProgressState {
  const [state, setState] = useState<HeroScrollProgressState>(() => {
    const reducedMotion = checkPrefersReducedMotion();
    const initialInterpolation = calculateFrameInterpolation(0, totalFrames);
    return {
      progress: 0,
      ...initialInterpolation,
      isInView: true,
      prefersReducedMotion: reducedMotion,
    };
  });

  const rafIdRef = useRef<number | null>(null);
  const isInViewRef = useRef(true);
  const prefersReducedMotionRef = useRef(state.prefersReducedMotion);

  const computeProgress = useCallback(() => {
    rafIdRef.current = null;

    if (prefersReducedMotionRef.current) {
      const fallback = calculateFrameInterpolation(0, totalFrames);
      setState((prev) => ({
        ...prev,
        progress: 0,
        ...fallback,
        isInView: isInViewRef.current,
        prefersReducedMotion: true,
      }));
      return;
    }

    const container = containerRef.current;
    if (!container || !isInViewRef.current) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const stickyHeight = Math.max(viewportHeight - headerOffset, 100);
    const totalScrollable = rect.height - stickyHeight;

    let progress = 0;
    if (totalScrollable > 0) {
      const currentScroll = headerOffset - rect.top;
      progress = clamp(currentScroll / totalScrollable, 0, 1);
    }

    const interpolation = calculateFrameInterpolation(progress, totalFrames);

    setState((prev) => {
      // Prevent unnecessary re-renders if progress has not meaningfully shifted
      if (
        Math.abs(prev.progress - progress) < 0.0001 &&
        prev.isInView === isInViewRef.current &&
        prev.prefersReducedMotion === prefersReducedMotionRef.current
      ) {
        return prev;
      }

      return {
        progress,
        ...interpolation,
        isInView: isInViewRef.current,
        prefersReducedMotion: prefersReducedMotionRef.current,
      };
    });
  }, [containerRef, totalFrames, headerOffset]);

  const scheduleUpdate = useCallback(() => {
    if (rafIdRef.current === null) {
      rafIdRef.current = window.requestAnimationFrame(computeProgress);
    }
  }, [computeProgress]);

  // 1. Reduced Motion Preference Listener
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = (e: MediaQueryListEvent | MediaQueryList) => {
      prefersReducedMotionRef.current = e.matches;
      scheduleUpdate();
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMotionPreference);
    } else {
      // Legacy browser fallback
      mediaQuery.addListener(updateMotionPreference);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', updateMotionPreference);
      } else {
        mediaQuery.removeListener(updateMotionPreference);
      }
    };
  }, [scheduleUpdate]);

  // 2. IntersectionObserver for viewport awareness
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          const inView = entry.isIntersecting;
          isInViewRef.current = inView;
          if (inView) {
            scheduleUpdate();
          } else {
            setState((prev) => (prev.isInView ? { ...prev, isInView: false } : prev));
          }
        }
      },
      {
        root: null,
        threshold: [0, 0.1, 0.5, 1.0],
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, scheduleUpdate]);

  // 3. Passive Scroll and Resize Listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScrollOrResize = () => {
      if (isInViewRef.current && !prefersReducedMotionRef.current) {
        scheduleUpdate();
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    // Initial computation on mount
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [scheduleUpdate]);

  return state;
}
