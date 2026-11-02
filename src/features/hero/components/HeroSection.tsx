import React from 'react';
import { ArrowRight, Globe2, MessageCircle, Mail, Package, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';
import { HeroPackagingComposition } from './HeroPackagingComposition.tsx';

export interface HeroSectionProps {
  onRequestSamples?: () => void;
  onSubmitRequirement?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSubmitRequirement,
}) => {
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
    <section
      id="hero"
      className="hero-section"
      aria-label="Indian Tea Sourcing Overview"
    >
      {/* Layer 0: Static Tea Plantation Background Image */}
      <div
        className="hero-bg-layer"
        aria-hidden="true"
      />

      {/* Layer 1: Directional Overlay Concentrated Behind Left Text Column */}
      <div
        className="hero-gradient-overlay"
        aria-hidden="true"
      />

      {/* Layer 2: Foreground Content (Two-Column Responsive Grid) */}
      <div className="container hero-container">
        <div className="hero-grid">

          {/* Left Content Column */}
          <div className="hero-content">

            {/* Amber Eyebrow Badge */}
            <div className="hero-eyebrow-badge">
              <Globe2 size={13} className="hero-eyebrow-icon" aria-hidden="true" />
              <span>INDIAN TEA SOURCING &bull; BULK &amp; PRIVATE LABEL EXPORT</span>
            </div>

            {/* Large Elegant Serif Heading */}
            <h1 className="hero-headline">
              Source the Indian Tea<br className="hero-headline-br" /> You Need
            </h1>

            {/* Plain B2B Trader Message */}
            <p className="hero-narrative">
              Assam CTC, Orthodox, Darjeeling, Green Tea and specialty commercial grades — sourced to your exact specification, verified through counter-samples, and coordinated for international export.
            </p>

            {/* Dual Action CTAs: Amber Primary CTA & Secondary Outlined Enquiry CTA */}
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
                className="btn btn-secondary-outline btn-lg hero-secondary-btn"
                id="hero-secondary-cta"
                aria-label="WhatsApp Trade Desk"
              >
                <MessageCircle size={18} style={{ color: 'var(--color-whatsapp)' }} aria-hidden="true" />
                <span>WhatsApp Trade Desk</span>
              </a>
            </div>

            {/* Three Trust Indicators */}
            <div className="hero-trust-strip" role="region" aria-label="Commercial Trust & Quality Guarantees">
              <div className="hero-trust-item">
                <div className="hero-trust-icon-box">
                  <Package size={15} aria-hidden="true" />
                </div>
                <div className="hero-trust-copy">
                  <span className="hero-trust-title">Buyer-First Sourcing</span>
                  <span className="hero-trust-desc">Zero Inventory Push • Sourced to Spec</span>
                </div>
              </div>

              <div className="hero-trust-item">
                <div className="hero-trust-icon-box">
                  <CheckCircle2 size={15} aria-hidden="true" />
                </div>
                <div className="hero-trust-copy">
                  <span className="hero-trust-title">Counter-Sample Cupping</span>
                  <span className="hero-trust-desc">Pre-Shipment Organoleptic Verification</span>
                </div>
              </div>

              <div className="hero-trust-item">
                <div className="hero-trust-icon-box">
                  <Globe2 size={15} aria-hidden="true" />
                </div>
                <div className="hero-trust-copy">
                  <span className="hero-trust-title">Global Port Logistics</span>
                  <span className="hero-trust-desc">FOB Indian Ports &amp; CIF Worldwide</span>
                </div>
              </div>
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
                  <MessageCircle size={13} aria-hidden="true" style={{ color: 'var(--color-whatsapp)' }} />
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

          {/* Right Visual Column: Realistic 3D Packaging Composition on Stone Platform */}
          <div className="hero-visual-column">
            <HeroPackagingComposition />
          </div>

        </div>
      </div>
    </section>
  );
};
