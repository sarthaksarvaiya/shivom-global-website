import React, { useRef, useState } from 'react';
import { ArrowRight, Globe2, MessageCircle, Mail, Package, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';
import { HeroScrollCanvas } from './hero/HeroScrollCanvas.tsx';
import { useHeroScrollProgress } from './hero/useHeroScrollProgress.ts';
import { HERO_FRAME_COUNT } from './hero/heroAnimationTypes.ts';

export interface HeroSectionProps {
  onRequestSamples?: () => void;
  onSubmitRequirement?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSubmitRequirement,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);

  // Hook into normalized scroll progress (0.0 to 1.0) with 74px header offset
  const { progress, prefersReducedMotion } = useHeroScrollProgress(
    trackRef,
    HERO_FRAME_COUNT,
    74
  );

  const handleRequirementClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onSubmitRequirement) {
      onSubmitRequirement();
    } else {
      scrollToForm();
    }
  };

  const scrollToForm = () => {
    const element = document.getElementById('requirement-form');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      id="hero"
      ref={trackRef}
      className="hero-scroll-track"
      style={{
        position: 'relative',
        width: '100%',
        height: prefersReducedMotion ? 'auto' : '190vh',
      }}
    >
      <section
        className="hero-section hero-sticky-viewport"
        aria-label="Indian Tea Sourcing Overview"
        style={{
          position: prefersReducedMotion ? 'relative' : 'sticky',
          top: prefersReducedMotion ? 'auto' : '74px',
          height: prefersReducedMotion ? 'auto' : 'calc(100vh - 74px)',
          minHeight: 'calc(100vh - 74px)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Layer 0: Baseline Static Image Fallback (Guarantees zero blank hero during loading) */}
        <div
          className="hero-bg-layer"
          aria-hidden="true"
          style={{ zIndex: 0 }}
        />

        {/* Layer 1: GPU-Accelerated Hero Scroll Canvas */}
        <div
          className="hero-canvas-layer"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            opacity: isCanvasReady ? 1 : 0,
            transition: 'opacity var(--transition-normal)',
          }}
        >
          <HeroScrollCanvas
            progress={progress}
            prefersReducedMotion={prefersReducedMotion}
            onInitialFrameRendered={() => setIsCanvasReady(true)}
          />
        </div>

        {/* Layer 2: Deep Forest Gradient Overlay for High-Contrast Text Legibility */}
        <div
          className="hero-gradient-overlay"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(7, 34, 24, 0.90) 0%,
                rgba(7, 34, 24, 0.80) 40%,
                rgba(7, 34, 24, 0.40) 65%,
                rgba(7, 34, 24, 0.10) 85%,
                rgba(7, 34, 24, 0.0) 100%
              ),
              linear-gradient(
                180deg,
                rgba(7, 34, 24, 0.40) 0%,
                rgba(7, 34, 24, 0.0) 25%,
                rgba(7, 34, 24, 0.0) 75%,
                rgba(7, 34, 24, 0.60) 100%
              )
            `,
          }}
        />

        {/* Layer 3: Foreground Content (100% Preserved Semantic HTML) */}
        <div className="container hero-container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="hero-content">

            {/* Eyebrow Badge */}
            <div className="hero-eyebrow-badge">
              <Globe2 size={14} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
              <span>INDIAN TEA SOURCING &bull; BULK EXPORT</span>
            </div>

            {/* Primary Main H1 Headline */}
            <h1 className="hero-headline">
              Source the Indian Tea<br className="hero-headline-br" /> You Need
            </h1>

            {/* Plain B2B Trader Message */}
            <p className="hero-narrative">
              Assam CTC, Orthodox, Darjeeling, Green Tea and specialty commercial grades — sourced to your exact specification, verified through counter-samples, and coordinated for international export.
            </p>

            {/* Hero Buyer Key Highlights Row */}
            <div className="hero-highlights-strip" role="region" aria-label="Key trading terms at a glance">
              <div className="hero-highlight-pill">
                <Package size={14} className="hero-highlight-icon" aria-hidden="true" />
                <span><strong>Buyer-First Sourcing</strong> (Zero Inventory Push)</span>
              </div>
              <div className="hero-highlight-pill">
                <CheckCircle2 size={14} className="hero-highlight-icon" aria-hidden="true" />
                <span><strong>Counter-Samples</strong> for Cup Evaluation</span>
              </div>
              <div className="hero-highlight-pill">
                <Globe2 size={14} className="hero-highlight-icon" aria-hidden="true" />
                <span><strong>Bulk &amp; Private Label</strong> Export</span>
              </div>
            </div>

            {/* Dual Action CTAs: Tell Us What Tea You Need (Primary) & WhatsApp Trade Desk (Secondary) */}
            <div className="hero-cta-group">
              <a
                href="#requirement-form"
                onClick={handleRequirementClick}
                className="btn btn-primary btn-lg hero-primary-btn"
                id="hero-primary-cta"
                aria-label="Tell Us What Tea You Need"
              >
                <span>Tell Us What Tea You Need</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <a
                href={CONTACT_INFO.whatsapp.getLink('Hi SHIVOM GLOBAL, I would like to discuss an Indian tea sourcing requirement.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary-dark btn-lg hero-secondary-btn"
                id="hero-secondary-cta"
                aria-label="WhatsApp Trade Desk"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <MessageCircle size={18} style={{ color: '#25D366' }} aria-hidden="true" />
                <span>WhatsApp Trade Desk</span>
              </a>
            </div>

            {/* Direct Buyer Contact Access Strip */}
            <div className="hero-direct-contact" role="region" aria-label="Direct trade desk contact channels">
              <span className="hero-contact-lead font-spec">DIRECT CONTACT:</span>
              <div className="hero-contact-links">
                <a
                  href={CONTACT_INFO.whatsapp.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-contact-link hero-wa-link"
                  aria-label={CONTACT_INFO.whatsapp.ariaLabel}
                >
                  <MessageCircle size={13} aria-hidden="true" style={{ color: '#25D366' }} />
                  <span>WhatsApp: {CONTACT_INFO.whatsapp.display}</span>
                </a>
                <span className="hero-contact-sep" aria-hidden="true">•</span>
                <a
                  href={CONTACT_INFO.email.mailtoLink}
                  className="hero-contact-link"
                  aria-label={CONTACT_INFO.email.ariaLabel}
                >
                  <Mail size={13} aria-hidden="true" />
                  <span>{CONTACT_INFO.email.address}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Layer 4: Subtle Bottom Scroll-Progress Line */}
        {!prefersReducedMotion && (
          <div
            className="hero-progress-track"
            role="progressbar"
            aria-label="Tea sourcing journey scroll progress"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.min(Math.max(progress * 100, 0), 100)}%`,
                backgroundColor: 'var(--color-accent-gold)',
                boxShadow: '0 0 8px rgba(197, 155, 39, 0.5)',
                transition: 'width 40ms linear',
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
};
