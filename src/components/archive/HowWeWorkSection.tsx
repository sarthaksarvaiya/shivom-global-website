import React, { useState } from 'react';
import { 
  FileText, 
  SlidersHorizontal, 
  Search, 
  Coffee, 
  FileCheck, 
  Ship, 
  ArrowRight,
  ArrowLeft,
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
  buyerProvides: string;
  shivomCoordinates: string;
  keyDeliverable: string;
  icon: LucideIcon;
}

export const HowWeWorkSection: React.FC<HowWeWorkSectionProps> = ({
  onSubmitRequirement,
  onExploreCategories,
}) => {
  // Active step index for the Cardless Stepper inspector (0 to 5)
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps: ProcessStep[] = [
    {
      step: '01',
      title: 'Share Your Requirement',
      tag: 'Requirement Intake',
      description: 'Tell us what you need — tea category, grade, application, quantity, packing format and destination.',
      buyerProvides: 'Tea category (CTC, Orthodox, Darjeeling, Specialty), target grade/cut, end-use application, estimated quantity, packing preference, and target discharge port.',
      shivomCoordinates: 'Initial feasibility assessment against origin availability and harvest calendars, followed by prompt trade desk acknowledgement.',
      keyDeliverable: 'Logged commercial inquiry profile & parameter scoping',
      icon: FileText,
    },
    {
      step: '02',
      title: 'Review the Specification',
      tag: 'Specification Review',
      description: 'We review the requested tea type, grade, application and commercial parameters to understand the actual sourcing requirement.',
      buyerProvides: 'Organoleptic targets (liquor color, body, milk reactivity), particle sizing constraints, and destination statutory food safety compliance criteria.',
      shivomCoordinates: 'Review of mesh distribution, cup profile feasibility, harvest seasonality, and destination import regulations (e.g., GSO / EU MRL parameters).',
      keyDeliverable: 'Confirmed technical & organoleptic sourcing specification',
      icon: SlidersHorizontal,
    },
    {
      step: '03',
      title: 'Source Suitable Lots',
      tag: 'Origin Sourcing',
      description: "We identify suitable Indian tea sourcing options against the buyer's specification and commercial requirement.",
      buyerProvides: 'Delivery milestones, shipping window requirements, and commercial target pricing parameters.',
      shivomCoordinates: 'Evaluation of auction catalogues and primary garden lots across Assam and North India to identify matching batches aligned to the buyer specification.',
      keyDeliverable: 'Qualified origin lot options matching commercial parameters',
      icon: Search,
    },
    {
      step: '04',
      title: 'Sampling & Verification',
      tag: 'Sample Verification',
      description: 'Where applicable, samples and relevant specifications are reviewed before moving toward commercial confirmation.',
      buyerProvides: 'Sensory cupping evaluation, infusion testing in intended application, and physical parameter sign-off.',
      shivomCoordinates: 'Coordination of representative counter-samples and technical lot sheets for buyer evaluation where applicable prior to contract commitment.',
      keyDeliverable: 'Buyer sensory sign-off & technical sample alignment',
      icon: Coffee,
    },
    {
      step: '05',
      title: 'Confirm the Commercial Specification',
      tag: 'Commercial Confirmation',
      description: 'Tea specification, quantity, packing, pricing and commercial terms are confirmed before execution.',
      buyerProvides: 'Sign-off on Proforma Invoice terms, agreed payment schedule, and packaging artwork/marking instructions.',
      shivomCoordinates: 'Formal Proforma Invoice issuance specifying tea grade, net weight, barrier packaging, agreed Incoterms (FOB/CIF), and dispatch timeline.',
      keyDeliverable: 'Binding Proforma Invoice & locked production schedule',
      icon: FileCheck,
    },
    {
      step: '06',
      title: 'Packing & Export Coordination',
      tag: 'Export Coordination',
      description: 'Once confirmed, packing, documentation and dispatch requirements are coordinated for the agreed shipment.',
      buyerProvides: 'Consignee details, destination customs requirements, and clearing agent handover instructions.',
      shivomCoordinates: 'Export packaging execution (25kg multi-wall kraft barrier sacks / agreed format), statutory documentation (Phytosanitary, Certificate of Origin, BL), and ocean port dispatch.',
      keyDeliverable: 'Complete statutory shipping dossier & dispatched cargo tracking',
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

  const activeStep = steps[activeStepIndex];

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
      className="section how-we-work-section theme-ivory"
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

        {/* =========================================================================
            COMMERCIAL STEPPER & STAGE INSPECTOR
           ========================================================================= */}
        <div className="cardless-stepper-view">
          
          {/* Interactive Milestone Rail (No Cards) */}
          <div className="cardless-stepper-rail" role="tablist" aria-label="Commercial stages">
            {steps.map((item, idx) => {
              const isActive = idx === activeStepIndex;
              const isPassed = idx < activeStepIndex;
              return (
                <button
                  key={item.step}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`stepper-node-btn ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                  onClick={() => setActiveStepIndex(idx)}
                  id={`btn-stepper-step-${item.step}`}
                >
                  <div className="stepper-node-indicator font-spec">
                    <span>{item.step}</span>
                  </div>
                  <div className="stepper-node-text">
                    <span className="stepper-node-tag font-spec">STAGE {item.step}</span>
                    <span className="stepper-node-title">{item.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stage Showcase Inspector (Completely Open Typography - ZERO CARDS) */}
          <div className="cardless-inspector-showcase">
            
            {/* Top Watermark & Header */}
            <div className="inspector-showcase-header">
              <span className="inspector-watermark font-spec" aria-hidden="true">
                {activeStep.step}
              </span>

              <div className="inspector-header-meta">
                <span className="inspector-stage-tag font-spec">
                  STAGE {activeStep.step} OF 06 • {activeStep.tag.toUpperCase()}
                </span>
                <h3 className="inspector-stage-title">
                  {activeStep.title}
                </h3>
                <p className="inspector-stage-summary">
                  {activeStep.description}
                </p>
              </div>
            </div>

            {/* Typographic Role Alignment (Open text columns, zero card containers) */}
            <div className="inspector-details-flow">
              
              <div className="inspector-flow-col">
                <div className="inspector-flow-header">
                  <span className="inspector-flow-icon font-spec">01</span>
                  <h4 className="inspector-flow-title font-spec">WHAT BUYER SPECIFIES</h4>
                </div>
                <p className="inspector-flow-body">
                  {activeStep.buyerProvides}
                </p>
              </div>

              <div className="inspector-flow-col">
                <div className="inspector-flow-header">
                  <span className="inspector-flow-icon font-spec">02</span>
                  <h4 className="inspector-flow-title font-spec">HOW WE COORDINATE SOURCING</h4>
                </div>
                <p className="inspector-flow-body">
                  {activeStep.shivomCoordinates}
                </p>
              </div>

            </div>

            {/* Stage Outcome Banner & Navigator */}
            <div className="inspector-footer-bar">
              <div className="inspector-deliverable-item font-spec">
                <CheckCircle2 size={16} className="deliverable-check-icon" aria-hidden="true" />
                <span><strong>Stage Deliverable:</strong> {activeStep.keyDeliverable}</span>
              </div>

              <div className="inspector-nav-buttons">
                <button
                  type="button"
                  className="btn inspector-nav-btn prev-btn"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  aria-label="Previous commercial stage"
                  id="btn-inspector-prev"
                >
                  <ArrowLeft size={14} aria-hidden="true" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  className="btn inspector-nav-btn next-btn"
                  disabled={activeStepIndex === steps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                  aria-label="Next commercial stage"
                  id="btn-inspector-next"
                >
                  <span>Next Stage</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

          </div>

          {/* Sourcing Approach Strip */}
          <div className="cardless-principle-strip">
            <div className="principle-strip-badge font-spec">OUR SOURCING APPROACH</div>
            <h3 className="principle-strip-title">Requirement-Led Sourcing</h3>
            <p className="principle-strip-text">
              We begin with your commercial requirement. Every lot, sample, and specification is sourced and verified around your target application and destination market.
            </p>
          </div>

          {/* What We Need to Start Scoping Block */}
          <div className="cardless-scoping-section">
            <div className="scoping-section-header">
              <div className="scoping-badge font-spec">
                <HelpCircle size={14} aria-hidden="true" />
                <span>INQUIRY SCOPING</span>
              </div>
              <h3 className="scoping-title">What We Need to Start</h3>
              <p className="scoping-intro">
                To evaluate availability and coordinate sourcing efficiently, buyers typically share these commercial parameters when submitting an inquiry:
              </p>
            </div>

            <div className="cardless-params-row">
              {whatWeNeedItems.map((param, idx) => (
                <div key={idx} className="cardless-param-cell">
                  <div className="param-cell-top">
                    <CheckCircle2 size={14} className="param-cell-icon" aria-hidden="true" />
                    <span className="param-cell-label font-spec">{param.label}</span>
                  </div>
                  <span className="param-cell-desc">{param.detail}</span>
                </div>
              ))}
            </div>

            {/* Conversion CTAs */}
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
              Inquiries are reviewed directly by our commercial trade desk. Each requirement is assessed individually before any commitment or quotation is issued.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
