import React, { useState } from 'react';
import { Send, FileSearch, Package, CheckCircle2, Ship, ArrowRight } from 'lucide-react';

export interface HowItWorksSectionProps {
  onRequestSamples?: () => void;
  onSubmitRequirement?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onRequestSamples,
  onSubmitRequirement,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: '01',
      stepNumber: 1,
      title: 'Share Requirement',
      timeBadge: 'Step 01',
      deliverable: 'Specification Intake',
      description: 'Tell us your required tea category, grade, target liquor profile, estimated quantity, packaging format, and destination port.',
      icon: Send,
    },
    {
      num: '02',
      stepNumber: 2,
      title: 'We Match the Requirement',
      timeBadge: 'Step 02',
      deliverable: 'Origin Sourcing Search',
      description: 'We identify matching Indian tea lots across primary production centers and auction catalogues based on your exact commercial parameters.',
      icon: FileSearch,
    },
    {
      num: '03',
      stepNumber: 3,
      title: 'Counter-Sample Arranged',
      timeBadge: 'Step 03',
      deliverable: 'Physical Dry Leaf Sample',
      description: 'Representative physical samples (250g–500g) are prepared for buyer evaluation, subject to lot availability and courier logistics.',
      icon: Package,
    },
    {
      num: '04',
      stepNumber: 4,
      title: 'Buyer Evaluation',
      timeBadge: 'Step 04',
      deliverable: 'Sensory Cupping Sign-off',
      description: 'Buyer evaluates leaf appearance, extraction rate, aroma, and cup briskness to confirm market suitability before placing an order.',
      icon: CheckCircle2,
    },
    {
      num: '05',
      stepNumber: 5,
      title: 'Commercial Discussion & Export',
      timeBadge: 'Step 05',
      deliverable: 'Proforma Invoice & Dispatch',
      description: 'Upon sample approval, we confirm final volume, packaging, FOB/CIF pricing, payment milestones, and statutory export paperwork.',
      icon: Ship,
    },
  ];

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
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
        <div className="how-it-works-header text-center">
          <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            STRUCTURED SOURCING FLOW
          </div>
          <h2 id="how-it-works-heading" className="how-it-works-title">
            The Sourcing &amp; Export Pathway
          </h2>
          <p className="how-it-works-lead" style={{ maxWidth: '640px', margin: '0 auto' }}>
            A transparent 4-stage operational pathway designed to eliminate risk for international tea importers before commercial order commitment.
          </p>
        </div>

        {/* Process Pathway (Connected interactive timeline with individual spaced milestone cards) */}
        <div className="process-pathway-wrap">
          <div className="process-pathway-track" role="list">
            {steps.map((st) => {
              const Icon = st.icon;
              const isCompleted = st.stepNumber < activeStep;
              const isCurrent = st.stepNumber === activeStep;

              return (
                <div 
                  key={st.num} 
                  className={`process-step-node ${isCurrent ? 'selected active' : isCompleted ? 'completed' : ''}`}
                  role="listitem"
                  onClick={() => setActiveStep(st.stepNumber)}
                  onMouseEnter={() => setActiveStep(st.stepNumber)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStep(st.stepNumber);
                    }
                  }}
                  aria-label={`Step ${st.num}: ${st.title}`}
                >
                  <div className="process-step-header">
                    <div className="process-step-indicator" aria-hidden="true">
                      <span>{st.num}</span>
                    </div>
                    <span className="process-step-time-badge font-spec">
                      {st.timeBadge}
                    </span>
                  </div>

                  <div className="process-step-body">
                    <div className="process-step-icon-row">
                      <div className="process-step-icon-box" aria-hidden="true">
                        <Icon size={18} />
                      </div>
                      <span className="process-step-deliverable font-spec">
                        {st.deliverable}
                      </span>
                    </div>

                    <h3 className="process-step-title">
                      {st.title}
                    </h3>

                    <p className="process-step-desc">
                      {st.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connected Live Commitment Ribbon */}
          <div className="process-commitment-ribbon">
            <div className="process-commitment-left">
              <span className="process-pulse-dot" aria-hidden="true" />
              <div>
                <p className="process-commitment-text">
                  <strong>Sample Evaluation Policy:</strong> Representative dry leaf samples are prepared to match your grade and cup profile. International air courier dispatch is coordinated following requirement qualification.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCtaClick}
              className="process-commitment-btn"
              aria-label="Start Step 01: Submit Your Requirement"
            >
              <span>Start With Step 01: Share Requirement</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
