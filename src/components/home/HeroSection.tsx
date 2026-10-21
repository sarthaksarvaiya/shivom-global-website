import React from 'react';
import { ArrowRight, Globe2 } from 'lucide-react';

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

        </div>
      </div>
    </section>
  );
};
