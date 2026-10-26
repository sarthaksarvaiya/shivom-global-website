import React from 'react';
import { ArrowRight, Globe2, MessageCircle, Mail, Package, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

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
      {/* Background layer */}
      <div className="hero-bg-layer" aria-hidden="true" />

      <div className="container hero-container">
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
    </section>
  );
};
