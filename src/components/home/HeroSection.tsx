import React from 'react';
import { ArrowRight, Globe2, MessageCircle, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

export interface HeroSectionProps {
  onSubmitRequirement?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSubmitRequirement,
}) => {
  const handlePrimaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onSubmitRequirement) {
      onSubmitRequirement();
    } else {
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
            Indian Tea Sourcing<br className="hero-headline-br" /> for Global Buyers
          </h1>

          {/* Short B2B Supporting Copy */}
          <p className="hero-narrative">
            Supplying quality Assam CTC, Orthodox, Darjeeling, and Green teas for international importers, blenders, and retail brands.
          </p>

          {/* Dual Action CTAs */}
          <div className="hero-cta-group">
            <a 
              href="#requirement-form" 
              onClick={handlePrimaryClick}
              className="btn btn-primary btn-lg"
              id="hero-primary-cta"
              aria-label="Submit Buyer Requirement"
            >
              <span>Submit Buyer Requirement</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>

            <a 
              href={CONTACT_INFO.whatsapp.getLink()} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-dark btn-lg hero-wa-cta-btn"
              id="hero-secondary-cta"
              aria-label={CONTACT_INFO.whatsapp.ariaLabel}
            >
              <MessageCircle size={18} aria-hidden="true" style={{ color: '#25D366' }} />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Direct Buyer Contact Access Strip */}
          <div className="hero-direct-contact" role="region" aria-label="Direct trade desk contact channels">
            <span className="hero-contact-lead font-spec">DIRECT CONTACT:</span>
            <div className="hero-contact-links">
              <a 
                href={CONTACT_INFO.phone.telLink} 
                className="hero-contact-link"
                aria-label={CONTACT_INFO.phone.ariaLabel}
              >
                <Phone size={13} aria-hidden="true" />
                <span>Call: {CONTACT_INFO.phone.display}</span>
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
