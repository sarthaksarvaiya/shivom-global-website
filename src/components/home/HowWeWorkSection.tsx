import React from 'react';
import { 
  FileText, 
  SlidersHorizontal, 
  Search, 
  Coffee, 
  FileCheck, 
  Ship, 
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ArrowUpRight,
  LucideIcon
} from 'lucide-react';

export interface HowWeWorkSectionProps {
  onSubmitRequirement?: () => void;
  onExploreCategories?: () => void;
}

interface ProcessStep {
  step: string;
  title: string;
  tag: string;
  description: string;
  icon: LucideIcon;
}

export const HowWeWorkSection: React.FC<HowWeWorkSectionProps> = ({
  onSubmitRequirement,
  onExploreCategories,
}) => {
  const steps: ProcessStep[] = [
    {
      step: '01',
      title: 'Share Your Requirement',
      tag: 'Requirement Intake',
      description: 'Tell us what you need — tea category, grade, application, quantity, packing format and destination.',
      icon: FileText,
    },
    {
      step: '02',
      title: 'Review the Specification',
      tag: 'Specification Review',
      description: 'We review the requested tea type, grade, application and commercial parameters to understand the actual sourcing requirement.',
      icon: SlidersHorizontal,
    },
    {
      step: '03',
      title: 'Source Suitable Lots',
      tag: 'Origin Sourcing',
      description: "We identify suitable Indian tea sourcing options against the buyer's specification and commercial requirement.",
      icon: Search,
    },
    {
      step: '04',
      title: 'Sampling & Verification',
      tag: 'Sample Verification',
      description: 'Where applicable, samples and relevant specifications are reviewed before moving toward commercial confirmation.',
      icon: Coffee,
    },
    {
      step: '05',
      title: 'Confirm the Commercial Specification',
      tag: 'Commercial Confirmation',
      description: 'Tea specification, quantity, packing, pricing and commercial terms are confirmed before execution.',
      icon: FileCheck,
    },
    {
      step: '06',
      title: 'Packing & Export Coordination',
      tag: 'Export Coordination',
      description: 'Once confirmed, packing, documentation and dispatch requirements are coordinated for the agreed shipment.',
      icon: Ship,
    },
  ];

  const whatWeNeedItems = [
    { label: 'Tea Category', detail: 'CTC, Orthodox, Darjeeling or Specialty' },
    { label: 'Grade / Specification', detail: 'Primary cut, mesh size, or target profile' },
    { label: 'Application', detail: 'Commercial blending, tea bags, Karak, or retail' },
    { label: 'Estimated Quantity', detail: 'Trial consignment, container load, or annual volume' },
    { label: 'Packing Format', detail: '25kg kraft sacks, retail pouches, or custom packs' },
    { label: 'Destination', detail: 'Target port, country, and import regulatory standards' },
    { label: 'Commercial Terms', detail: 'Target pricing, delivery milestone, and Incoterms' },
  ];

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSubmitRequirement) {
      onSubmitRequirement();
    } else {
      const formElement = document.getElementById('requirement-form');
      if (formElement) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = formElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreCategories) {
      onExploreCategories();
    } else {
      const catElement = document.getElementById('our-teas');
      if (catElement) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = catElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section 
      id="how-we-work" 
      className="section how-we-work-section"
      aria-labelledby="how-we-work-heading"
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="how-we-work-header">
          <div className="how-we-work-eyebrow font-spec">
            HOW WE WORK
          </div>
          <h2 id="how-we-work-heading" className="how-we-work-title">
            From Requirement to Shipment
          </h2>
          <p className="how-we-work-lead">
            Share your commercial requirement, and we coordinate the sourcing process around your tea specification, application, quantity, packing and destination. Each requirement is reviewed before sourcing, sampling and commercial confirmation.
          </p>
        </div>

        {/* 6-Step Commercial Workflow Process */}
        <div className="how-we-work-process-wrap">
          <div className="how-we-work-grid">
            {steps.map((item, idx) => {
              const IconComp = item.icon;
              const isLastInRowDesktop = idx === 2 || idx === 5;
              return (
                <div 
                  key={item.step} 
                  className="how-we-work-step-card"
                  tabIndex={0}
                  aria-label={`Step ${item.step}: ${item.title}`}
                >
                  {/* Step Header: Icon, Number & Badge */}
                  <div className="how-we-work-step-top">
                    <div className="how-we-work-icon-box">
                      <IconComp size={20} aria-hidden="true" />
                    </div>
                    <div className="how-we-work-step-meta">
                      <span className="how-we-work-step-tag font-spec">
                        {item.tag}
                      </span>
                      <span className="how-we-work-step-number font-spec">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Step Body */}
                  <div className="how-we-work-step-content">
                    <h3 className="how-we-work-step-title">
                      {item.title}
                    </h3>
                    <p className="how-we-work-step-desc">
                      {item.description}
                    </p>
                  </div>

                  {/* Step Sequence Footprint indicator */}
                  <div className="how-we-work-step-footer">
                    <span className="how-we-work-step-indicator font-spec">
                      STAGE {item.step} OF 06
                    </span>
                    {!isLastInRowDesktop && (
                      <div className="how-we-work-step-next-hint" aria-hidden="true">
                        <span>Next</span>
                        <ArrowRight size={12} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buyer-First Principle Highlight Statement */}
        <div className="how-we-work-principle-card">
          <div className="how-we-work-principle-tag font-spec">
            COMMERCIAL SOURCING PRINCIPLE
          </div>
          <h3 className="how-we-work-principle-title">
            Buyer-First, Inventory-Last
          </h3>
          <p className="how-we-work-principle-text">
            We begin with the requirement rather than assuming a fixed product or inventory position. Sourcing, sampling, and commercial specifications are coordinated specifically around the buyer’s confirmed target profile and application.
          </p>
        </div>

        {/* What We Need to Start Block */}
        <div className="how-we-work-checklist-block">
          <div className="how-we-work-checklist-header">
            <div className="how-we-work-checklist-badge font-spec">
              <HelpCircle size={14} aria-hidden="true" />
              <span>INQUIRY SCOPING</span>
            </div>
            <h3 className="how-we-work-checklist-title">
              What We Need to Start
            </h3>
            <p className="how-we-work-checklist-intro">
              To evaluate availability and coordinate sourcing efficiently, buyers typically share these commercial parameters when submitting an inquiry:
            </p>
          </div>

          <div className="how-we-work-params-grid">
            {whatWeNeedItems.map((param, pIdx) => (
              <div key={pIdx} className="how-we-work-param-item">
                <div className="how-we-work-param-top">
                  <CheckCircle2 size={15} className="how-we-work-param-check" aria-hidden="true" />
                  <span className="how-we-work-param-name font-spec">{param.label}</span>
                </div>
                <span className="how-we-work-param-detail">{param.detail}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="how-we-work-cta-wrap">
            <a 
              href="#requirement-form" 
              className="btn btn-primary btn-gold how-we-work-primary-btn"
              onClick={handleCtaClick}
              id="btn-how-we-work-submit"
            >
              <span>Submit Your Commercial Requirement</span>
              <ArrowRight size={16} aria-hidden="true" style={{ marginLeft: '8px' }} />
            </a>

            <a 
              href="#our-teas" 
              className="btn how-we-work-secondary-btn"
              onClick={handleExploreClick}
              id="btn-how-we-work-categories"
            >
              <span>Explore Tea Categories</span>
              <ArrowUpRight size={15} aria-hidden="true" style={{ marginLeft: '6px' }} />
            </a>
          </div>
          <div className="how-we-work-cta-note">
            Inquiries feed directly into our commercial requirement engine. No speculative commitments or automated purchase checkout.
          </div>
        </div>

      </div>
    </section>
  );
};
