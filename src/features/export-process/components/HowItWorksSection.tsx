import React, { useState } from 'react';
import {
  Send,
  FileSearch,
  Package,
  CheckCircle2,
  Ship,
  ArrowRight,
  ShieldCheck,
  Check,
  FileText,
  Layers,
  Anchor,
  LucideIcon
} from 'lucide-react';

export interface HowItWorksSectionProps {
  onRequestSamples?: () => void;
  onSubmitRequirement?: () => void;
  onExploreGrades?: () => void;
}

interface MilestoneData {
  stepNumber: number;
  stepFormatted: string;
  deliverableBadge: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  detailsHeading: string;
  parameters: { label: string; desc: string }[];
  operationalNotice?: string;
  actionType: 'requirement' | 'grades' | 'samples';
  actionLabel: string;
  actionAria: string;
}

const MILESTONES: MilestoneData[] = [
  {
    stepNumber: 1,
    stepFormatted: '01',
    deliverableBadge: 'SPECIFICATION INTAKE',
    title: 'Requirement Intake',
    icon: Send,
    summary: 'Define your procurement parameters across tea type, grade, liquor target, volume, packaging, and port of arrival.',
    detailsHeading: 'Parameters Collected for Sourcing Intake:',
    parameters: [
      { label: 'Tea Category', desc: 'Assam CTC, Orthodox, Darjeeling Single-Origin, or Indian Green Tea' },
      { label: 'Specific Grade', desc: 'Target commercial grade (e.g., BP, BOP, FTGFOP1, TGFOP, Fannings, Dust)' },
      { label: 'Liquor Profile', desc: 'Color depth, cup briskness, body density, and extraction characteristics' },
      { label: 'Estimated Volume', desc: 'Trial consignment, palletized batch, or full container load (FCL 20ft / 40ft)' },
      { label: 'Packaging Format', desc: 'Multi-wall paper sacks, woven bulk sacks, or custom retail tins/pouches' },
      { label: 'Destination Port', desc: 'Port of entry for freight quotation, transit calculations, and documentation' },
    ],
    operationalNotice: 'Submitted specifications are processed by our export desk to match active catalog offerings without inventory bias.',
    actionType: 'requirement',
    actionLabel: 'Submit Requirement',
    actionAria: 'Submit Requirement: Open Detailed Specification Form',
  },
  {
    stepNumber: 2,
    stepFormatted: '02',
    deliverableBadge: 'ORIGIN & LOT SOURCING',
    title: 'Origin & Lot Sourcing',
    icon: FileSearch,
    summary: 'We screen primary garden offerings and auction catalogs to identify available lots matching your exact target profile.',
    detailsHeading: 'Sourcing Identification & Lot Screening:',
    parameters: [
      { label: 'Origin Identification', desc: 'Direct sourcing across Assam Brahmaputra Valley, Darjeeling Hills, or Nilgiri terroirs' },
      { label: 'Auction & Estate Channels', desc: 'Screening weekly Guwahati, Kolkata, Siliguri, and Cochin auctions alongside garden invoices' },
      { label: 'Specification Matching', desc: 'Organoleptic benchmarking of lot samples against your target liquor and leaf standards' },
      { label: 'Availability Verification', desc: 'Confirmation of active lot volume, harvest freshness, and producer reserve levels' },
    ],
    operationalNotice: 'We maintain independent sourcing desk operations across major tea auction centers and vetted tea garden estates.',
    actionType: 'grades',
    actionLabel: 'Review Grade Specs',
    actionAria: 'Review Commercial Grade Specifications',
  },
  {
    stepNumber: 3,
    stepFormatted: '03',
    deliverableBadge: 'COUNTER-SAMPLE DISPATCH',
    title: 'Counter-Sample Preparation',
    icon: Package,
    summary: 'Representative physical samples drawn from candidate lots are prepared and dispatched directly for sensory evaluation.',
    detailsHeading: 'Sample Drawing & Logistics Coordination:',
    parameters: [
      { label: 'Representative Lot Drawing', desc: 'Samples drawn directly from candidate garden invoices or auction catalog offerings' },
      { label: 'Moisture-Barrier Packaging', desc: 'Packed in airtight, nitrogen-sealed moisture-proof foil pouches with full lot markings' },
      { label: 'Express Courier Dispatch', desc: 'Dispatched via international express air courier (DHL, FedEx) with tracking documentation' },
      { label: 'Lot Reservation', desc: 'Candidate lot volumes are tentatively earmarked during the buyer cupping window' },
    ],
    operationalNotice: 'Counter-samples are coordinated subject to origin lot availability and international air courier logistics. We do not make unsubstantiated claims of unconditional free delivery or 24-hour arrivals.',
    actionType: 'samples',
    actionLabel: 'Request Counter-Samples',
    actionAria: 'Request Counter-Samples: Open Sample Enquiry Form',
  },
  {
    stepNumber: 4,
    stepFormatted: '04',
    deliverableBadge: 'CUPPING APPROVAL',
    title: 'Sensory Evaluation & Approval',
    icon: CheckCircle2,
    summary: 'Evaluate leaf appearance, infusion liquor, aroma, and briskness. Commercial commitment begins strictly after your approval.',
    detailsHeading: 'The 4 Core Quality Evaluation Parameters:',
    parameters: [
      { label: '1. Leaf Appearance', desc: 'Dry leaf style, particle uniformity, tip ratio, twist, bloom, and cleanliness' },
      { label: '2. Infusion Liquor', desc: 'Liquor clarity, brightness, color depth (golden-amber to burgundy), and sediment' },
      { label: '3. Aroma Profile', desc: 'Dry leaf nose, steeped infusion bouquet, floral/malt notes, and absence of taint' },
      { label: '4. Cup Briskness', desc: 'Palate vitality, strength, briskness, astringency balance, and milk response' },
    ],
    operationalNotice: 'Buyer-First Governance: Commercial contracts, proforma invoices, and container bookings proceed exclusively upon buyer formal written counter-sample approval.',
    actionType: 'samples',
    actionLabel: 'Request Counter-Samples',
    actionAria: 'Request Counter-Samples: Open Sample Enquiry Form',
  },
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onRequestSamples,
  onSubmitRequirement,
  onExploreGrades,
}) => {
  // Active milestone selection: Step 1 active by default
  const [activeMilestone, setActiveMilestone] = useState<number>(1);

  const scrollToForm = () => {
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
  };

  const scrollToGrades = () => {
    const gradesSection =
      document.getElementById('tea-by-grade') ||
      document.getElementById('grades') ||
      document.getElementById('grade-specifications');
    if (gradesSection) {
      const headerOffset = 80;
      const elementPosition = gradesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleStartRequirement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onSubmitRequirement) {
      onSubmitRequirement();
    } else {
      scrollToForm();
    }
  };

  const handleRequestSamples = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onRequestSamples) {
      onRequestSamples();
    } else {
      scrollToForm();
    }
  };

  const handleExploreGrades = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onExploreGrades) {
      onExploreGrades();
    } else {
      scrollToGrades();
    }
  };

  const handleMilestoneSelect = (stepNumber: number) => {
    setActiveMilestone(stepNumber);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, stepNumber: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveMilestone(stepNumber);
    }
  };

  return (
    <section
      id="how-it-works"
      className="how-it-works-section theme-ivory"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        {/* 1. Top Editorial Showcase & Cupping Lab Media */}
        <div className="export-editorial-showcase">
          <div className="export-editorial-copy">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
              STRUCTURED SOURCING FLOW
            </div>
            <h2 id="how-it-works-heading" className="export-section-title">
              The Sourcing &amp; Export Pathway
            </h2>
            <p className="export-section-lead">
              A structured two-phase operational framework designed to evaluate dry leaf quality, cup characteristics, and commercial terms before financial commitment.
            </p>

            {/* Sensory Verification Manifesto Box */}
            <div className="export-cupping-manifesto">
              <div className="export-manifesto-header">
                <ShieldCheck size={20} className="export-manifesto-icon" aria-hidden="true" />
                <h3 className="export-manifesto-title">Sensory Verification Before Commercial Commitment</h3>
              </div>
              <p className="export-manifesto-text">
                In bulk tea export, commercial confidence is established in the tasting cup. SHIVOM GLOBAL operates on a buyer-first sourcing protocol: physical counter-samples are drawn, dispatched, and evaluated for dry leaf appearance, liquor infusion, and cup briskness before proforma invoices, deposits, or export contracts are initiated.
              </p>

              <div className="export-manifesto-pillars">
                <div className="export-pillar-item">
                  <Check size={14} className="export-pillar-check" aria-hidden="true" />
                  <span><strong>Pre-Commitment Samples:</strong> Representative lots dispatched for physical laboratory evaluation</span>
                </div>
                <div className="export-pillar-item">
                  <Check size={14} className="export-pillar-check" aria-hidden="true" />
                  <span><strong>Invoice-Matched Dispatch:</strong> Export container lots match approved counter-sample specifications</span>
                </div>
                <div className="export-pillar-item">
                  <Check size={14} className="export-pillar-check" aria-hidden="true" />
                  <span><strong>Transparent Incoterms:</strong> Clear FOB Indian Ports (Mundra / Kolkata) or CIF Destination Port pricing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Cupping Photography */}
          <div className="export-editorial-media">
            <div className="export-photo-frame">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/darjeeling-single-origin-640w.webp 640w, /images/darjeeling-single-origin.webp 1200w"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
                <img
                  src="/images/darjeeling-single-origin.jpg"
                  alt="Authentic tea cupping and sensory evaluation: whole dry leaf Indian tea on slate alongside white porcelain tasting cups with clear steeped tea liquor"
                  className="export-photo-img"
                  width="600"
                  height="448"
                  loading="eager"
                />
              </picture>
              <div className="export-photo-caption">
                <div className="export-photo-badge font-spec">SENSORY EVALUATION LAB</div>
                <p className="export-photo-desc">
                  Dry leaf style, infusion liquor, and cup briskness verified prior to proforma invoicing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PHASE 01: Pre-Commitment Verification (Steps 01-04) */}
        <div className="export-phase-wrap export-phase-1">
          <div className="export-phase-header">
            <div className="export-phase-badge-row">
              <span className="export-phase-badge font-spec">PHASE 01</span>
              <span className="export-phase-tag font-spec">PRE-COMMITMENT VERIFICATION · ZERO FINANCIAL RISK</span>
            </div>
            <h3 className="export-phase-title">Leaf Quality, Origin Matching &amp; Cupping Sign-Off</h3>
            <p className="export-phase-desc">
              Four structured operational milestones to define specifications, evaluate representative samples, and confirm liquor suitability before any commercial order commitment.
            </p>
          </div>

          {/* Interactive Milestone Cards Grid */}
          <div className="export-step-grid" role="list" aria-label="Phase 1 Verification Milestones">
            {MILESTONES.map((m) => {
              const Icon = m.icon;
              const isActive = activeMilestone === m.stepNumber;
              const isCompleted = activeMilestone > m.stepNumber;

              return (
                <div
                  key={m.stepNumber}
                  className={`export-step-card ${isActive ? 'export-step-card-active' : ''} ${
                    isCompleted ? 'export-step-card-completed' : ''
                  } ${m.stepNumber === 4 ? 'export-step-card-approval' : ''}`}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, m.stepNumber)}
                  onClick={() => handleMilestoneSelect(m.stepNumber)}
                  aria-expanded={isActive}
                  aria-controls={`milestone-detail-${m.stepNumber}`}
                  aria-label={`Step ${m.stepFormatted}: ${m.title}${isActive ? ' (Selected)' : isCompleted ? ' (Completed)' : ''}`}
                >
                  <div className="export-step-card-top">
                    <div
                      className={`export-step-number ${
                        isCompleted ? 'export-step-number-completed' : ''
                      } ${isActive ? 'export-step-number-active' : ''}`}
                      aria-hidden="true"
                    >
                      {isCompleted ? <Check size={16} /> : m.stepFormatted}
                    </div>
                    <span className="export-step-deliverable font-spec">{m.deliverableBadge}</span>
                  </div>

                  <div className="export-step-card-body">
                    <div className="export-step-title-row">
                      <div className="export-step-icon-box" aria-hidden="true">
                        <Icon size={18} />
                      </div>
                      <h4 className="export-step-card-title">{m.title}</h4>
                    </div>
                    <p className="export-step-card-desc">{m.summary}</p>

                    {/* Operational Details (Contextual Disclosure Engine) */}
                    <div
                      id={`milestone-detail-${m.stepNumber}`}
                      className={`export-step-detail-drawer ${isActive ? 'drawer-open' : ''}`}
                      role="region"
                      aria-labelledby={`milestone-title-${m.stepNumber}`}
                    >
                      <div className="export-step-detail-inner">
                        <span className="export-step-detail-heading font-spec">
                          {m.detailsHeading}
                        </span>
                        <ul className="export-step-parameter-list">
                          {m.parameters.map((param, pIdx) => (
                            <li key={pIdx} className="export-step-parameter-item">
                              <span className="param-label">{param.label}:</span>{' '}
                              <span className="param-desc">{param.desc}</span>
                            </li>
                          ))}
                        </ul>

                        {m.operationalNotice && (
                          <div className="export-step-notice">
                            <span className="export-step-notice-text">{m.operationalNotice}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="export-step-card-footer" onClick={(e) => e.stopPropagation()}>
                    {m.actionType === 'requirement' && (
                      <button
                        type="button"
                        onClick={handleStartRequirement}
                        className="export-step-btn export-step-btn-primary"
                        aria-label={m.actionAria}
                      >
                        <span>{m.actionLabel}</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </button>
                    )}

                    {m.actionType === 'grades' && (
                      <button
                        type="button"
                        onClick={handleExploreGrades}
                        className="export-step-btn export-step-btn-subtle"
                        aria-label={m.actionAria}
                      >
                        <span>{m.actionLabel}</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </button>
                    )}

                    {m.actionType === 'samples' && (
                      <button
                        type="button"
                        onClick={handleRequestSamples}
                        className="export-step-btn export-step-btn-primary"
                        aria-label={m.actionAria}
                      >
                        <span>{m.actionLabel}</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </button>
                    )}

                    {m.stepNumber === 4 && (
                      <div className="export-approval-stamp" style={{ marginTop: 'var(--space-2)' }}>
                        <Check size={14} className="export-approval-check" aria-hidden="true" />
                        <span>Sign-Off Milestone · Unlocks Phase 2</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Phase 1 Verification Callout Banner with Primary Sample CTA */}
          <div className="export-phase-1-banner">
            <div className="export-phase-1-banner-copy">
              <span className="export-phase-1-banner-badge font-spec">ZERO FINANCIAL RISK</span>
              <p className="export-phase-1-banner-text">
                Evaluate physical counter-samples in your own facility before committing to commercial contracts or deposits.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRequestSamples}
              className="export-phase-1-cta-btn"
              aria-label="Request Counter-Samples: Open Sample Inquiry Form"
            >
              <span>Request Counter-Samples</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 3. PHASE 02: Commercial Execution & Export Console (Step 05) */}
        <div className="export-phase-wrap export-phase-2-console">
          <div className="export-console-header">
            <div className="export-phase-badge-row">
              <span className="export-phase-badge export-phase-badge-gold font-spec">PHASE 02</span>
              <span className="export-phase-tag export-phase-tag-gold font-spec">
                COMMERCIAL EXECUTION · POST-APPROVAL DISPATCH
              </span>
            </div>
            <div className="export-console-title-row">
              <div className="export-console-icon-box" aria-hidden="true">
                <Ship size={24} />
              </div>
              <div>
                <h3 className="export-console-title">
                  Step 05 — Commercial Formalization, Export Clearance &amp; Ocean Freight
                </h3>
                <p className="export-console-desc">
                  Following formal written sample approval, commercial execution proceeds with contracted pricing, packaging, phytosanitary clearance, and scheduled container logistics.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Commercial Execution Deliverables covering the 8 operational milestones */}
          <div className="export-console-deliverables-grid">
            {/* Block 1: Quantity & Pricing */}
            <div className="export-console-card">
              <div className="export-console-card-icon">
                <FileText size={18} />
              </div>
              <h4 className="export-console-card-title">Final Quantity &amp; FOB / CIF Pricing</h4>
              <p className="export-console-card-text">
                Metric ton volume confirmation, contracted lot batches, and clear commercial pricing on FOB Indian Port (Mundra / Kolkata / Nhava Sheva) or CIF Destination Port basis.
              </p>
            </div>

            {/* Block 2: Packaging Specifications */}
            <div className="export-console-card">
              <div className="export-console-card-icon">
                <Layers size={18} />
              </div>
              <h4 className="export-console-card-title">Packaging Specifications &amp; Packing</h4>
              <p className="export-console-card-text">
                Execution of multi-wall paper sacks (25kg–55kg), food-grade woven sacks, or custom retail tins/pouches coordinated through vetted packaging converters.
              </p>
            </div>

            {/* Block 3: Payment Milestones & Proforma Invoice */}
            <div className="export-console-card">
              <div className="export-console-card-icon">
                <ShieldCheck size={18} />
              </div>
              <h4 className="export-console-card-title">Payment Milestones &amp; Proforma Invoice</h4>
              <p className="export-console-card-text">
                Formal proforma invoice issued upon written sample approval with agreed milestone terms (Advance / Irrevocable LC / CAD) and commercial contract terms.
              </p>
            </div>

            {/* Block 4: Statutory Documentation & Freight */}
            <div className="export-console-card">
              <div className="export-console-card-icon">
                <Anchor size={18} />
              </div>
              <h4 className="export-console-card-title">Export Documentation &amp; Port Freight</h4>
              <p className="export-console-card-text">
                Tea Board of India export clearance, Phytosanitary Certificate, Certificate of Origin, container inspection, fumigation, customs clearance, and Bill of Lading dispatch.
              </p>
            </div>
          </div>

          {/* Console Bottom Action Ribbon */}
          <div className="export-console-action-ribbon">
            <div className="export-console-reassurance">
              <span className="export-pulse-dot" aria-hidden="true" />
              <p className="export-console-reassurance-text">
                <strong>Commercial Governance:</strong> Operational sourcing and ocean logistics are coordinated directly with verified gardens, packing facilities, and accredited shipping lines. Commercial terms are agreed upon proforma invoice.
              </p>
            </div>

            <button
              type="button"
              onClick={handleStartRequirement}
              className="export-console-cta-btn"
              aria-label="Submit Commercial Requirement: Open Detailed Specification Form"
            >
              <span>Submit Commercial Requirement</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
