import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe2, 
  Package, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Workflow 
} from 'lucide-react';

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
      aria-label="Commercial Tea Sourcing Overview"
    >
      {/* Background layer with authentic Indian tea landscape photography */}
      <div className="hero-bg-layer" aria-hidden="true" />

      <div className="container hero-container">
        {/* Main 2-Column Desktop Grid / Stacked Mobile Layout */}
        <div className="hero-grid">
          
          {/* Left Column: Commercial Positioning, Headline, Narrative & CTAs */}
          <div className="hero-content">
            
            {/* Commercial Eyebrow Badge */}
            <div className="hero-eyebrow-badge">
              <Globe2 size={15} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
              <span>INDIA TEA SOURCING &bull; COMMERCIAL EXPORT</span>
            </div>

            {/* Primary Main H1 Headline */}
            <h1 className="hero-headline">
              Indian Tea Sourcing for Global Buyers
            </h1>

            {/* Value Narrative Body */}
            <p className="hero-narrative">
              Requirement-led sourcing of bulk Indian teas and private-label packaging for international commercial buyers. 
              From specification matching and origin lot selection to sampling and export documentation — coordinated directly 
              against your commercial parameters.
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
                <Layers size={17} style={{ marginRight: '6px' }} aria-hidden="true" />
                <span>Explore Tea Categories</span>
              </a>
            </div>

            {/* Compact Trust Qualification Strip */}
            <div className="hero-trust-anchors" aria-label="Core Commercial Qualifications">
              <div className="hero-trust-chip">
                <CheckCircle2 size={15} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
                <span>Requirement-Led Sourcing</span>
              </div>
              <div className="hero-trust-chip">
                <CheckCircle2 size={15} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
                <span>Indian Tea Categories</span>
              </div>
              <div className="hero-trust-chip">
                <CheckCircle2 size={15} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
                <span>Export Documentation</span>
              </div>
              <div className="hero-trust-chip">
                <CheckCircle2 size={15} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
                <span>Commercial Trade Desk</span>
              </div>
            </div>

          </div>

          {/* Right Column: Commercial Sourcing Model Panel */}
          <div className="hero-panel-col">
            <div className="hero-sourcing-panel">
              <div className="hero-panel-header">
                <div className="hero-panel-eyebrow">
                  <Workflow size={13} color="var(--color-accent-gold)" aria-hidden="true" />
                  <span>COMMERCIAL SOURCING MODEL</span>
                </div>
                <div className="hero-panel-title">
                  Specification-Led Execution
                </div>
              </div>

              <div className="hero-panel-steps">
                <div className="hero-step-item">
                  <span className="hero-step-num font-spec">01</span>
                  <div className="hero-step-body">
                    <div className="hero-step-title">Specification Intake</div>
                    <div className="hero-step-desc">Target particle cut, volume, packaging & destination port</div>
                  </div>
                </div>

                <div className="hero-step-item">
                  <span className="hero-step-num font-spec">02</span>
                  <div className="hero-step-body">
                    <div className="hero-step-title">Origin Lot Sourcing</div>
                    <div className="hero-step-desc">Assam, Darjeeling & North Indian primary auction ecosystems</div>
                  </div>
                </div>

                <div className="hero-step-item">
                  <span className="hero-step-num font-spec">03</span>
                  <div className="hero-step-body">
                    <div className="hero-step-title">Sampling & Verification</div>
                    <div className="hero-step-desc">Organoleptic cupping evaluation & lab parameter check</div>
                  </div>
                </div>

                <div className="hero-step-item">
                  <span className="hero-step-num font-spec">04</span>
                  <div className="hero-step-body">
                    <div className="hero-step-title">Packaging & Dispatch</div>
                    <div className="hero-step-desc">25kg barrier sacks or OEM retail packs to Port Mundra</div>
                  </div>
                </div>
              </div>

              <div className="hero-panel-footer">
                <ShieldCheck size={14} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
                <span>Sourced Fresh to Order &bull; Zero Speculative Stock</span>
              </div>
            </div>
          </div>

        </div>

        {/* Commercial Pillar Strip Across Base of Hero */}
        <div className="hero-pillars-grid" aria-label="Commercial Sourcing Pillars">
          <div className="hero-pillar-item">
            <div className="hero-pillar-icon" aria-hidden="true">
              <Globe2 size={18} />
            </div>
            <div>
              <div className="hero-pillar-label">Origins Sourced</div>
              <div className="hero-pillar-value">Assam, Darjeeling & Terroirs</div>
            </div>
          </div>

          <div className="hero-pillar-item">
            <div className="hero-pillar-icon" aria-hidden="true">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="hero-pillar-label">Grading Standards</div>
              <div className="hero-pillar-value font-spec">BOP, BOPSM, BP, PF, PD, Dust</div>
            </div>
          </div>

          <div className="hero-pillar-item">
            <div className="hero-pillar-icon" aria-hidden="true">
              <Package size={18} />
            </div>
            <div>
              <div className="hero-pillar-label">Export Formats</div>
              <div className="hero-pillar-value">Bulk (25kg Kraft) & Private Label</div>
            </div>
          </div>

          <div className="hero-pillar-item">
            <div className="hero-pillar-icon" aria-hidden="true">
              <Clock size={18} />
            </div>
            <div>
              <div className="hero-pillar-label">Commercial Review</div>
              <div className="hero-pillar-value">Direct Trade Desk Assessment</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
