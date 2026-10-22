import React, { useState } from 'react';
import { Send, FileSearch, CheckCircle2, Ship, ArrowRight } from 'lucide-react';

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
      title: 'Submit Your Requirement',
      timeBadge: 'Step 01 • Day 1',
      deliverable: 'Requirement Profile',
      description: 'Share your tea variety, grade, target liquor profile, estimated volume, and destination seaport.',
      icon: Send,
    },
    {
      num: '02',
      stepNumber: 2,
      title: 'Source & Dispatch Samples',
      timeBadge: '48–72 Hours SLA',
      deliverable: 'Physical Courier Samples',
      description: 'We identify origin plantation lots and dispatch physical tea samples via air express for your sensory cup evaluation.',
      icon: FileSearch,
    },
    {
      num: '03',
      stepNumber: 3,
      title: 'Confirm Specification & Price',
      timeBadge: 'Post-Approval',
      deliverable: 'Proforma Invoice & Terms',
      description: 'Once you approve the sample cup, we lock in specifications, commercial pricing, payment terms, and delivery schedule.',
      icon: CheckCircle2,
    },
    {
      num: '04',
      stepNumber: 4,
      title: 'Statutory Export & Dispatch',
      timeBadge: 'Scheduled Ocean Delivery',
      deliverable: 'Phytosanitary & Bill of Lading',
      description: 'We coordinate batch packing, Tea Board export documentation, customs clearance, and containerized ocean shipment.',
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

        {/* Process Pathway (Replaces 4 disconnected cards with connected interactive timeline) */}
        <div className="process-pathway-wrap">
          <div className="process-pathway-track" role="list">
            {steps.map((st) => {
              const Icon = st.icon;
              const isActive = st.stepNumber <= activeStep;
              const isSelected = st.stepNumber === activeStep;

              return (
                <div 
                  key={st.num} 
                  className={`process-step-node ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}`}
                  role="listitem"
                  onClick={() => setActiveStep(st.stepNumber)}
                  onMouseEnter={() => setActiveStep(st.stepNumber)}
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
                  <strong>Fast Sample Dispatch:</strong> Origin evaluation samples dispatched via DHL / FedEx with active international tracking within 48–72 hours of inquiry review.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCtaClick}
              className="process-commitment-btn"
              aria-label="Start Step 01: Request Free Samples"
            >
              <span>Start With Step 01: Request Samples</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
