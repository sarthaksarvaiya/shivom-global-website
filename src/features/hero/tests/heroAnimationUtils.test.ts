import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  calculateFrameInterpolation,
  calculateCoverDimensions,
  getEffectiveDpr,
} from '../utils/heroAnimationUtils.ts';

describe('heroAnimationUtils', () => {
  describe('clamp', () => {
    it('should constrain numbers within [min, max]', () => {
      assert.equal(clamp(0.5, 0, 1), 0.5);
      assert.equal(clamp(-0.2, 0, 1), 0);
      assert.equal(clamp(1.5, 0, 1), 1);
      assert.equal(clamp(10, 20, 50), 20);
      assert.equal(clamp(100, 20, 50), 50);
    });

    it('should return min if value is NaN', () => {
      assert.equal(clamp(NaN, 0, 1), 0);
    });
  });

  describe('calculateFrameInterpolation', () => {
    it('should handle start boundary (progress = 0)', () => {
      const result = calculateFrameInterpolation(0, 8);
      assert.equal(result.baseIndex, 0);
      assert.equal(result.nextIndex, 1);
      assert.equal(result.blendFactor, 0);
      assert.equal(result.virtualIndex, 0);
    });

    it('should clamp negative progress to 0', () => {
      const result = calculateFrameInterpolation(-0.5, 8);
      assert.equal(result.baseIndex, 0);
      assert.equal(result.nextIndex, 1);
      assert.equal(result.blendFactor, 0);
      assert.equal(result.virtualIndex, 0);
    });

    it('should handle exact midpoint progress (progress = 0.5)', () => {
      // 8 frames means 7 intervals (0 to 7)
      // 0.5 * 7 = 3.5 => baseIndex: 3, nextIndex: 4, blendFactor: 0.5
      const result = calculateFrameInterpolation(0.5, 8);
      assert.equal(result.baseIndex, 3);
      assert.equal(result.nextIndex, 4);
      assert.equal(result.blendFactor, 0.5);
      assert.equal(result.virtualIndex, 3.5);
    });

    it('should handle end boundary (progress = 1.0)', () => {
      const result = calculateFrameInterpolation(1.0, 8);
      assert.equal(result.baseIndex, 7);
      assert.equal(result.nextIndex, 7);
      assert.equal(result.blendFactor, 0);
      assert.equal(result.virtualIndex, 7);
    });

    it('should clamp progress greater than 1.0 to the final frame', () => {
      const result = calculateFrameInterpolation(1.8, 8);
      assert.equal(result.baseIndex, 7);
      assert.equal(result.nextIndex, 7);
      assert.equal(result.blendFactor, 0);
      assert.equal(result.virtualIndex, 7);
    });

    it('should calculate discrete step boundaries accurately', () => {
      // Step 1: 1 / 7 progress
      const result1 = calculateFrameInterpolation(1 / 7, 8);
      assert.equal(result1.baseIndex, 1);
      assert.equal(result1.nextIndex, 2);
      assert.ok(Math.abs(result1.blendFactor) < 1e-6);

      // Step 6: 6 / 7 progress
      const result6 = calculateFrameInterpolation(6 / 7, 8);
      assert.equal(result6.baseIndex, 6);
      assert.equal(result6.nextIndex, 7);
      assert.ok(Math.abs(result6.blendFactor) < 1e-6);
    });

    it('should handle edge case where totalFrames <= 1', () => {
      const result = calculateFrameInterpolation(0.5, 1);
      assert.equal(result.baseIndex, 0);
      assert.equal(result.nextIndex, 0);
      assert.equal(result.blendFactor, 0);
      assert.equal(result.virtualIndex, 0);
    });

    it('should calculate 40-frame sequence transitions accurately', () => {
      // Start (progress = 0)
      const start = calculateFrameInterpolation(0, 40);
      assert.equal(start.baseIndex, 0);
      assert.equal(start.nextIndex, 1);
      assert.equal(start.blendFactor, 0);

      // Midpoint (progress = 0.5): 0.5 * 39 = 19.5
      const mid = calculateFrameInterpolation(0.5, 40);
      assert.equal(mid.baseIndex, 19);
      assert.equal(mid.nextIndex, 20);
      assert.equal(mid.blendFactor, 0.5);

      // End (progress = 1.0)
      const end = calculateFrameInterpolation(1.0, 40);
      assert.equal(end.baseIndex, 39);
      assert.equal(end.nextIndex, 39);
      assert.equal(end.blendFactor, 0);
    });
  });

  describe('calculateCoverDimensions', () => {
    it('should return identical dimensions when aspect ratios match exactly', () => {
      const result = calculateCoverDimensions(1920, 1080, 1920, 1080);
      assert.equal(result.renderWidth, 1920);
      assert.equal(result.renderHeight, 1080);
      assert.equal(result.offsetX, 0);
      assert.equal(result.offsetY, 0);
    });

    it('should scale by width and crop vertically when canvas is wider than 16:9', () => {
      // Ultrawide canvas: 2560x1080 (ratio 2.37 > 1.778)
      const result = calculateCoverDimensions(2560, 1080, 1920, 1080);
      assert.equal(result.renderWidth, 2560);
      assert.equal(Math.round(result.renderHeight), 1440);
      assert.equal(result.offsetX, 0);
      assert.equal(Math.round(result.offsetY), -180); // centered vertically
    });

    it('should scale by height and crop horizontally when canvas is narrower than 16:9', () => {
      // Mobile portrait canvas: 375x812 (ratio 0.46 < 1.778)
      const result = calculateCoverDimensions(375, 812, 1920, 1080);
      assert.equal(result.renderHeight, 812);
      assert.equal(Math.round(result.renderWidth), Math.round(812 * (16 / 9)));
      assert.equal(result.offsetY, 0);
      assert.ok(result.offsetX < 0); // centered horizontally
    });

    it('should return zero dimensions for invalid or negative canvas size', () => {
      const result = calculateCoverDimensions(0, 0, 1920, 1080);
      assert.deepEqual(result, {
        renderWidth: 0,
        renderHeight: 0,
        offsetX: 0,
        offsetY: 0,
      });
    });
  });

  describe('getEffectiveDpr', () => {
    it('should return 1 when window is undefined or clamp to maxDpr', () => {
      assert.equal(getEffectiveDpr(2.0), 1);
    });
  });
});
