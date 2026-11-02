/**
 * SHIVOM GLOBAL — Hero Image Preloader Hook
 * Progressively loads and caches the 8 WebP hero frames.
 * Prioritizes Frame 01 first to avoid network congestion, then loads remaining frames
 * with a controlled queue strategy while gracefully handling network errors.
 */

import { useState, useEffect, useRef } from 'react';
import { HERO_FRAME_URLS } from '../types/heroAnimationTypes.ts';
import type { HeroPreloaderState } from '../types/heroAnimationTypes.ts';

export function useHeroImagePreloader(
  urls: readonly string[] = HERO_FRAME_URLS
): HeroPreloaderState {
  const [state, setState] = useState<HeroPreloaderState>(() => ({
    images: new Array(urls.length).fill(null),
    isInitialLoaded: false,
    isAllLoaded: false,
    loadedCount: 0,
    hasError: false,
    errorIndices: [],
  }));

  // Create a deterministic serialization key to handle URL changes safely
  const urlsKey = urls.join('|');
  const urlsRef = useRef(urls);
  urlsRef.current = urls;

  useEffect(() => {
    let isCancelled = false;
    const currentUrls = [...urlsRef.current];
    const total = currentUrls.length;
    const imageElements: (HTMLImageElement | null)[] = new Array(total).fill(null);
    let resolvedCount = 0;
    const errors: number[] = [];

    if (total === 0) {
      setState({
        images: [],
        isInitialLoaded: true,
        isAllLoaded: true,
        loadedCount: 0,
        hasError: false,
        errorIndices: [],
      });
      return;
    }

    const updateState = () => {
      if (isCancelled) return;
      setState({
        images: [...imageElements],
        isInitialLoaded: imageElements[0] !== null,
        isAllLoaded: resolvedCount === total,
        loadedCount: resolvedCount,
        hasError: errors.length > 0,
        errorIndices: [...errors],
      });
    };

    /**
     * Loads a single image by index.
     * Invokes onDone callback upon success or failure.
     */
    const fetchImage = (index: number, onDone?: () => void) => {
      if (isCancelled || index >= total) return;

      const img = new Image();
      img.decoding = 'async';

      img.onload = () => {
        if (isCancelled) return;
        imageElements[index] = img;
        resolvedCount += 1;
        updateState();
        if (onDone) onDone();
      };

      img.onerror = () => {
        if (isCancelled) return;
        errors.push(index);
        resolvedCount += 1; // Mark resolved so preloader is not permanently blocked
        updateState();
        if (onDone) onDone();
      };

      img.src = currentUrls[index];
    };

    /**
     * Controlled sequential queue for remaining frames (002 to 040).
     * Downloads images in narrative sequence to match the direction of user scrolling.
     */
    const startRemainingQueue = () => {
      if (isCancelled || total <= 1) return;

      let nextIndexToLoad = 1;
      const MAX_CONCURRENCY = 4; // Controlled pool: loads 4 at a time for fast multi-frame caching without network choke
      let activeWorkers = 0;

      const runWorker = () => {
        if (isCancelled) return;
        if (nextIndexToLoad >= total) return;

        const currentIndex = nextIndexToLoad;
        nextIndexToLoad += 1;
        activeWorkers += 1;

        fetchImage(currentIndex, () => {
          activeWorkers -= 1;
          runWorker();
        });
      };

      // Spawn up to MAX_CONCURRENCY concurrent worker streams
      const workersToSpawn = Math.min(MAX_CONCURRENCY, total - 1);
      for (let w = 0; w < workersToSpawn; w += 1) {
        runWorker();
      }
    };

    // Priority 1: Exclusively load Frame 01 first to maximize bandwidth and achieve fastest first paint
    fetchImage(0, () => {
      // Priority 2: Only begin remaining frames after Frame 01 has resolved
      startRemainingQueue();
    });

    return () => {
      isCancelled = true;
      // Detach handlers to prevent memory leaks and state updates
      imageElements.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [urlsKey]);

  return state;
}
