import React from 'react';
import { ArrowRight, Globe2, MessageCircle, Phone, Mail, Package, CheckCircle2, DollarSign } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

export interface HeroSectionProps {
  onRequestSamples?: () => void;
  onSubmitRequirement?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestSamples,
  onSubmitRequirement,
}) => {
  const handleSampleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onRequestSamples) {
      onRequestSamples();
    } else if (onSubmitRequirement) {
      onSubmitRequirement();
    } else {
      scrollToForm();
    }
  };

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
            Indian Tea Sourcing<br className="hero-headline-br" /> for Global Buyers
          </h1>

          {/* Plain B2B Trader Message */}
          <p className="hero-narrative">
            We supply Indian tea based on your required grade, quantity, packing and destination. 
            Evaluate tea samples before placing an order, with trial quantities starting from <strong>250 kg</strong>.
          </p>

          {/* Hero Buyer Key Highlights Row */}
          <div className="hero-highlights-strip" role="region" aria-label="Key trading terms at a glance">
            <div className="hero-highlight-pill">
              <Package size={14} className="hero-highlight-icon" aria-hidden="true" />
              <span>Trial MOQ from <strong>250 kg</strong></span>
            </div>
            <div className="hero-highlight-pill">
              <CheckCircle2 size={14} className="hero-highlight-icon" aria-hidden="true" />
              <span><strong>Free Samples</strong> Available</span>
            </div>
            <div className="hero-highlight-pill">
              <DollarSign size={14} className="hero-highlight-icon" aria-hidden="true" />
              <span>Pricing Based on Actual Specs</span>
            </div>
          </div>

          {/* Dual Action CTAs: Request Free Samples (Primary) & Tell Us Your Requirement (Secondary) */}
          <div className="hero-cta-group">
            <a 
              href="#requirement-form" 
              onClick={handleSampleClick}
              className="btn btn-primary btn-lg hero-primary-btn"
              id="hero-primary-cta"
              aria-label="Request Free Tea Samples"
            >
              <span>Request Free Samples</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>

            <a 
              href="#requirement-form" 
              onClick={handleRequirementClick}
              className="btn btn-secondary-dark btn-lg hero-secondary-btn"
              id="hero-secondary-cta"
              aria-label="Tell Us Your Requirement"
            >
              <span>Tell Us Your Requirement</span>
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
