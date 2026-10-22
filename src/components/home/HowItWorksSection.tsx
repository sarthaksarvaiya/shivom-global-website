import React from 'react';
import { Send, FileSearch, CheckCircle2, Ship, ArrowRight } from 'lucide-react';

export interface HowItWorksSectionProps {
  onRequestSamples?: () => void;
  onSubmitRequirement?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onRequestSamples,
  onSubmitRequirement,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Tell Us Your Requirement',
      description: 'Share your required tea type, grade, quantity and destination port.',
      icon: Send,
    },
    {
      num: '02',
      title: 'We Source & Prepare Samples',
      description: 'We identify suitable tea matching your parameters and arrange samples for your evaluation.',
      icon: FileSearch,
    },
    {
      num: '03',
      title: 'Confirm Specification & Price',
      description: 'After sample approval, we confirm final specifications, pricing, payment terms, and delivery schedule.',
      icon: CheckCircle2,
    },
    {
      num: '04',
      title: 'Order & Dispatch',
      description: 'We coordinate packing, statutory export documentation, and dispatch according to agreed terms.',
      icon: Ship,
    },
  ];

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onRequestSamples) {
      onRequestSamples();
    } else if (onSubmitRequirement) {
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
            A simple 4-step process from your initial inquiry and sample evaluation to final order dispatch.
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
            We aim to respond quickly with availability and pricing based on your requirement.
          </div>
          <a 
            href="#requirement-form" 
            onClick={handleCtaClick}
            className="btn btn-primary btn-gold"
            id="btn-how-it-works-submit"
            aria-label="Request Free Samples to start the sourcing process"
          >
            <span>Request Free Samples</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

      </div>
    </section>
  );
};
