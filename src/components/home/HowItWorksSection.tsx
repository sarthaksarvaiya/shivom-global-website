import React from 'react';
import { Send, FileSearch, FileCheck2, Ship, ArrowRight } from 'lucide-react';

export interface HowItWorksSectionProps {
  onSubmitRequirement?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onSubmitRequirement,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Share Your Requirement',
      description: 'Submit your target tea category, preferred grade, volume, destination port, and packaging format.',
      icon: Send,
    },
    {
      num: '02',
      title: 'Requirement Review',
      description: 'We evaluate your specification against current harvest availability and prepare representative lot samples for cupping sign-off.',
      icon: FileSearch,
    },
    {
      num: '03',
      title: 'Quotation & Documentation',
      description: 'Receive formal pricing (FOB or CIF), agreed payment schedule, technical specifications, and destination documentation details.',
      icon: FileCheck2,
    },
    {
      num: '04',
      title: 'Order, Packing & Export',
      description: 'We coordinate lot preparation, export-grade moisture barrier packaging, statutory clearance, and ocean container dispatch.',
      icon: Ship,
    },
  ];

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onSubmitRequirement) {
      onSubmitRequirement();
    } else {
      const formElement = document.getElementById('requirement-form');
      if (formElement) {
        const headerOffset = 80;
        const elementPosition = formElement.getBoundingClientRect().top;
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
      id="how-it-works" 
      className="how-it-works-section theme-ivory" 
      aria-labelledby="how-it-works-heading"
    >
      {/* Anchor alias to ensure #how-we-work continues functioning */}
      <span id="how-we-work" style={{ display: 'block', position: 'relative', top: '-90px', visibility: 'hidden' }} aria-hidden="true" />

      <div className="container">
        
        {/* Section Header */}
        <div className="how-it-works-header">
          <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            SOURCING PROCESS
          </div>
          <h2 id="how-it-works-heading" className="how-it-works-title">
            How It Works
          </h2>
          <p className="how-it-works-lead">
            A simple, transparent four-step process from your initial inquiry to final export dispatch.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="how-it-works-grid" role="list">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={st.num} className="how-it-works-step-card" role="listitem">
                <div className="step-card-top">
                  <div className="step-card-icon-wrap" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <span className="step-card-num font-spec">{st.num}</span>
                </div>

                <h3 className="step-card-title">
                  {st.title}
                </h3>

                <p className="step-card-desc">
                  {st.description}
                </p>

                {idx < steps.length - 1 && (
                  <div className="step-card-connector" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>

        {/* Reassurance Strip & Conversion CTA */}
        <div className="how-it-works-bottom">
          <div className="how-it-works-reassurance">
            Each inquiry is reviewed directly by our trade desk before issuing formal quotations or terms.
          </div>
          <a 
            href="#requirement-form" 
            onClick={handleCtaClick}
            className="btn btn-primary btn-gold"
            id="btn-how-it-works-submit"
            aria-label="Submit buyer requirement to start sourcing"
          >
            <span>Submit Buyer Requirement</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

      </div>
    </section>
  );
};
