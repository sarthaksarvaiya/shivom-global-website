import React from 'react';
import { ArrowRight, Globe2, MessageCircle, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

export interface HeroSectionProps {
  onExploreCategories?: () => void;
  onExploreGrades?: () => void;
  onSubmitRequirement?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCategories,
  onExploreGrades,
  onSubmitRequirement,
}) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
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

  const handlePrimaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onSubmitRequirement) {
      e.preventDefault();
      onSubmitRequirement();
    } else {
      handleScrollTo(e, 'requirement-form');
    }
  };

  const handleSecondaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onExploreCategories) {
      e.preventDefault();
      onExploreCategories();
    } else if (onExploreGrades) {
      e.preventDefault();
      onExploreGrades();
    } else {
      handleScrollTo(e, 'our-teas');
    }
  };

  return (
    <section 
      id="hero" 
      className="hero-section"
      aria-label="Indian Tea Sourcing Overview"
    >
      {/* Background layer displaying the authentic Indian tea landscape */}
      <div className="hero-bg-layer" aria-hidden="true" />

      <div className="container hero-container">
        <div className="hero-content">
          
          {/* Eyebrow Badge */}
          <div className="hero-eyebrow-badge">
            <Globe2 size={14} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
            <span>INDIA TEA SOURCING &bull; COMMERCIAL EXPORT</span>
          </div>

          {/* Primary Main H1 Headline */}
          <h1 className="hero-headline">
            Indian Tea Sourcing<br className="hero-headline-br" /> for Global Buyers
          </h1>

          {/* Short B2B Supporting Copy (1-2 lines on desktop) */}
          <p className="hero-narrative">
            Requirement-led sourcing of Indian teas for international commercial buyers, from bulk supply to private-label packaging.
          </p>

          {/* Dual Action CTAs */}
          <div className="hero-cta-group">
            <a 
              href="#requirement-form" 
              onClick={handlePrimaryClick}
              className="btn btn-primary btn-lg"
              id="hero-primary-cta"
              aria-label="Submit Commercial Requirement"
            >
              <span>Submit Commercial Requirement</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>

            <a 
              href="#our-teas" 
              onClick={handleSecondaryClick}
              className="btn btn-secondary-dark btn-lg"
              id="hero-secondary-cta"
              aria-label="Explore Tea Categories"
            >
              <span>Explore Tea Categories</span>
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
                className="hero-contact-wa"
                aria-label={CONTACT_INFO.whatsapp.ariaLabel}
              >
                <MessageCircle size={14} aria-hidden="true" />
                <span>WhatsApp ({CONTACT_INFO.whatsapp.display})</span>
              </a>
              <span className="hero-contact-sep" aria-hidden="true">•</span>
              <a 
                href={CONTACT_INFO.phone.telLink} 
                className="hero-contact-link"
                aria-label={CONTACT_INFO.phone.ariaLabel}
              >
                <Phone size={13} aria-hidden="true" />
                <span>Call Us</span>
              </a>
              <span className="hero-contact-sep" aria-hidden="true">•</span>
              <a 
                href={CONTACT_INFO.email.mailtoLink} 
                className="hero-contact-link"
                aria-label={CONTACT_INFO.email.ariaLabel}
              >
                <Mail size={13} aria-hidden="true" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
