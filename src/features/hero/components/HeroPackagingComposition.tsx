import React from 'react';
import { Award, Check, Sparkles } from 'lucide-react';

interface HeroPackagingCompositionProps {
  prefersReducedMotion?: boolean;
}

export const HeroPackagingComposition: React.FC<HeroPackagingCompositionProps> = ({
  prefersReducedMotion = false,
}) => {
  return (
    <div
      className={`hero-packaging-wrapper ${prefersReducedMotion ? 'reduced-motion' : ''}`}
      role="img"
      aria-label="Realistic 3D composition of Shivom Global export tea packaging formats sitting on a natural slate stone platform"
    >
      {/* Ambient Radial Spotlight behind packaging */}
      <div className="hero-packaging-ambient-glow" aria-hidden="true" />

      {/* Floating Quality Assurance Seal */}
      <div className="hero-packaging-floating-badge" aria-hidden="true">
        <Sparkles size={13} className="hero-badge-icon" />
        <span>Export Specification • Counter-Sample Tested</span>
      </div>

      {/* Main 3D Perspective Stage */}
      <div className="hero-packaging-stage">

        {/* 1. Left Product: 25kg Commercial Multi-Wall Kraft Export Sack */}
        <div className="packaging-item kraft-sack" aria-hidden="true">
          <div className="kraft-sack-body">
            {/* Top Stitch / Crepe Tape Seal */}
            <div className="kraft-sack-stitch-tape">
              <span className="kraft-stitch-line" />
            </div>

            {/* Industrial Commercial Export Stencil */}
            <div className="kraft-sack-stencil">
              <div className="kraft-stencil-brand">SHIVOM GLOBAL</div>
              <div className="kraft-stencil-spec">ASSAM CTC TEA</div>
              <div className="kraft-stencil-grade">GRADE: BOPSM</div>
              <div className="kraft-stencil-meta">
                <span>NET: 25.0 KG</span>
                <span>ORIGIN: INDIA</span>
              </div>
              <div className="kraft-stencil-seal">
                <Check size={10} />
                <span>EXPORT LOT SG-2026</span>
              </div>
            </div>

            {/* Crease & Shadow Overlays */}
            <div className="kraft-sack-crease" />
          </div>
          {/* Realistic Multi-Layered Contact Shadows on Stone Platform */}
          <div className="product-contact-shadow-group" aria-hidden="true">
            <span className="contact-shadow-tight sack-tight" />
            <span className="contact-shadow-soft sack-soft" />
            <span className="contact-shadow-cast sack-cast" />
          </div>
          <div className="packaging-contact-shadow sack-shadow" aria-hidden="true" />
        </div>

        {/* 2. Centerpiece Product: Luxury Matte Black Stand-Up Foil Pouch (500g) */}
        <div className="packaging-item standup-pouch" aria-hidden="true">
          <div className="standup-pouch-body">
            {/* Heat-Sealed Top & Tear Notches */}
            <div className="pouch-top-seal">
              <span className="pouch-tear-notch left" />
              <div className="pouch-seal-ridges" />
              <span className="pouch-tear-notch right" />
            </div>

            {/* Matte Pouch Surface & Specular Highlight */}
            <div className="pouch-sheen-overlay" />

            {/* Gold Foil Hot-Stamped Label */}
            <div className="pouch-label-card">
              <div className="pouch-crest">
                <span className="pouch-crest-symbol">✦</span>
                <span className="pouch-crest-text">SHIVOM GLOBAL</span>
                <span className="pouch-crest-symbol">✦</span>
              </div>

              <div className="pouch-tea-type">ASSAM ORTHODOX</div>
              <div className="pouch-tea-grade">WHOLE LEAF TGFOP</div>

              <div className="pouch-label-divider">
                <span className="pouch-divider-line" />
                <span className="pouch-divider-diamond">♦</span>
                <span className="pouch-divider-line" />
              </div>

              <p className="pouch-provenance">SINGLE ESTATE SELECTION • UPPER ASSAM</p>

              <div className="pouch-stamp-row">
                <span className="pouch-foil-badge">
                  <Award size={10} />
                  <span>100% PURE TEA</span>
                </span>
                <span className="pouch-net-wt">500 G</span>
              </div>
            </div>

            {/* Bottom Gusset Fold & Volume Curve */}
            <div className="pouch-bottom-gusset" />
          </div>
          {/* Realistic Multi-Layered Contact Shadows on Stone Platform */}
          <div className="product-contact-shadow-group" aria-hidden="true">
            <span className="contact-shadow-tight pouch-tight" />
            <span className="contact-shadow-soft pouch-soft" />
            <span className="contact-shadow-cast pouch-cast" />
          </div>
          <div className="packaging-contact-shadow pouch-shadow" aria-hidden="true" />
        </div>

        {/* 3. Right Product: Luxury Cylindrical Dark Green & Gold Tea Canister */}
        <div className="packaging-item metal-tin" aria-hidden="true">
          <div className="tin-container">
            {/* Metallic Brushed Gold Cap */}
            <div className="tin-cap">
              <div className="tin-cap-rim" />
              <div className="tin-cap-sheen" />
            </div>

            {/* Dark Emerald Metal Body with Curved Cylinder Highlight */}
            <div className="tin-body">
              <div className="tin-cylinder-sheen" />
              
              <div className="tin-label">
                <span className="tin-brand-title">SHIVOM</span>
                <span className="tin-product-name">DARJEELING</span>
                <span className="tin-flush-tag">FIRST FLUSH</span>
                <span className="tin-gi-tag">HIMALAYAN RESERVE</span>
              </div>
            </div>

            {/* Base Rim */}
            <div className="tin-base-rim" />
          </div>
          {/* Realistic Multi-Layered Contact Shadows on Stone Platform */}
          <div className="product-contact-shadow-group" aria-hidden="true">
            <span className="contact-shadow-tight tin-tight" />
            <span className="contact-shadow-soft tin-soft" />
            <span className="contact-shadow-cast tin-cast" />
          </div>
          <div className="packaging-contact-shadow tin-shadow" aria-hidden="true" />
        </div>

        {/* 4. Natural Slate Stone Platform (Pedestal) */}
        <div className="stone-platform" aria-hidden="true">
          {/* Top Surface (Faceted Polygon with Slate Texture & Specular Light) */}
          <div className="stone-surface">
            {/* Surface Texture Highlights */}
            <div className="stone-surface-sheen" />
            <div className="stone-beveled-edge" />

            {/* Ambient Occlusion Footings Under Products & Bowl */}
            <div className="stone-contact-footings">
              <span className="stone-footing footing-left" />
              <span className="stone-footing footing-center" />
              <span className="stone-footing footing-right" />
              <span className="stone-footing footing-bowl" />
            </div>

            {/* Scattered Loose Orthodox Golden Tea Leaves on the Stone */}
            <div className="scattered-tea-leaves">
              <span className="tea-leaf leaf-1" />
              <span className="tea-leaf leaf-2" />
              <span className="tea-leaf leaf-3" />
              <span className="tea-leaf leaf-4" />
              <span className="tea-leaf leaf-5" />
              <span className="tea-leaf leaf-6" />
              <span className="tea-leaf leaf-7" />
              <span className="tea-leaf leaf-8" />
              <span className="tea-leaf leaf-9" />
            </div>
          </div>

          {/* Front Facet / Chiseled Stone Thickness */}
          <div className="stone-front-facet">
            <div className="stone-facet-depth" />
            <div className="stone-facet-base-rim" />
          </div>

          {/* Heavy Natural Ground Shadow */}
          <div className="stone-ground-shadow" />
        </div>

        {/* 5. Natural Foreground Elements: Handcrafted Wooden Tea Bowl & Fresh Green Tea Sprout */}
        <div className="platform-foreground-ensemble" aria-hidden="true">
          {/* Artisanal Carved Wooden Tea Bowl with Loose Black Tea */}
          <div className="wooden-tea-bowl-wrapper">
            <div className="wooden-tea-bowl">
              {/* Outer bowl body with natural acacia/teak wood grain */}
              <div className="bowl-body">
                <div className="bowl-wood-grain" />
                <div className="bowl-wood-highlight" />
              </div>

              {/* Bowl interior rim & cupping cavity */}
              <div className="bowl-interior">
                {/* Mound of fresh loose orthodox black tea leaves */}
                <div className="loose-black-tea-mound">
                  <span className="tea-grain g1" />
                  <span className="tea-grain g2" />
                  <span className="tea-grain g3" />
                  <span className="tea-grain g4" />
                  <span className="tea-grain g5" />
                  <span className="tea-grain g6" />
                  <span className="tea-grain g7" />
                  <span className="tea-grain g8" />
                </div>
              </div>
            </div>

            {/* Tight contact shadow beneath wooden bowl */}
            <div className="bowl-contact-shadow" />
          </div>

          {/* Fresh Living Green Tea Sprout (Two leaves and a bud) */}
          <div className="fresh-tea-sprout">
            <svg
              className="tea-sprout-svg"
              viewBox="0 0 68 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Stem */}
              <path
                d="M32 52 C30 42, 28 32, 26 24"
                stroke="#3D2817"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Left Leaf (Fresh tender green) */}
              <path
                d="M26 26 C16 24, 4 30, 2 40 C10 44, 22 36, 26 26 Z"
                fill="url(#leafGradLeft)"
                stroke="#2D5A27"
                strokeWidth="0.8"
              />
              {/* Left Leaf Midrib */}
              <path
                d="M26 26 C18 30, 10 36, 3 40"
                stroke="#68A845"
                strokeWidth="0.9"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Center Upright Leaf / Bud */}
              <path
                d="M26 24 C24 12, 30 2, 36 2 C40 10, 34 20, 26 24 Z"
                fill="url(#leafGradCenter)"
                stroke="#35682D"
                strokeWidth="0.8"
              />
              {/* Right Leaf (Broad mature flush) */}
              <path
                d="M28 26 C38 20, 56 18, 64 26 C58 36, 42 36, 28 26 Z"
                fill="url(#leafGradRight)"
                stroke="#244B1F"
                strokeWidth="0.8"
              />
              {/* Right Leaf Midrib */}
              <path
                d="M28 26 C40 25, 52 24, 63 26"
                stroke="#5C9E3D"
                strokeWidth="0.9"
                strokeLinecap="round"
                opacity="0.85"
              />
              <defs>
                <linearGradient id="leafGradLeft" x1="2" y1="40" x2="26" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4A8532" />
                  <stop offset="60%" stopColor="#6EAF45" />
                  <stop offset="100%" stopColor="#8ED35C" />
                </linearGradient>
                <linearGradient id="leafGradCenter" x1="26" y1="24" x2="36" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#5E9E3C" />
                  <stop offset="60%" stopColor="#8ACD57" />
                  <stop offset="100%" stopColor="#AEE676" />
                </linearGradient>
                <linearGradient id="leafGradRight" x1="28" y1="26" x2="64" y2="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2E6325" />
                  <stop offset="50%" stopColor="#4C8B33" />
                  <stop offset="100%" stopColor="#75BE49" />
                </linearGradient>
              </defs>
            </svg>
            <div className="sprout-contact-shadow" />
          </div>
        </div>

      </div>
    </div>
  );
};

