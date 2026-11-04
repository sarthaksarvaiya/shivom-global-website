import React from 'react';
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
  Anchor
} from 'lucide-react';

export interface HowItWorksSectionProps {
  onRequestSamples?: () => void;
  onSubmitRequirement?: () => void;
  onExploreGrades?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onRequestSamples,
  onSubmitRequirement,
  onExploreGrades,
}) => {
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
    const gradesSection = document.getElementById('tea-by-grade') || document.getElementById('grades') || document.getElementById('grade-specifications');
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

  return (
    <section
      id="how-it-works"
      className="how-it-works-section theme-ivory"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        {/* 1. Editorial Introduction & Sensory Cupping Showcase */}
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
              Four structured steps to define specifications, evaluate representative samples, and confirm liquor suitability before any commercial order commitment.
            </p>
          </div>

          <div className="export-step-grid" role="list">
            {/* Step 01 */}
            <div className="export-step-card" role="listitem">
              <div className="export-step-card-top">
                <div className="export-step-number" aria-hidden="true">01</div>
                <span className="export-step-deliverable font-spec">SPECIFICATION INTAKE</span>
              </div>
              <div className="export-step-card-body">
                <div className="export-step-title-row">
                  <div className="export-step-icon-box" aria-hidden="true">
                    <Send size={18} />
                  </div>
                  <h4 className="export-step-card-title">Share Requirement</h4>
                </div>
                <p className="export-step-card-desc">
                  Buyer provides target tea category (CTC, Orthodox, Darjeeling, Green), specific grade, liquor profile, estimated bulk volume, packaging preference, and destination port.
                </p>
              </div>
              <div className="export-step-card-footer">
                <button
                  type="button"
                  onClick={handleStartRequirement}
                  className="export-step-btn export-step-btn-primary"
                  aria-label="Submit Requirement: Open Detailed Specification Form"
                >
                  <span>Submit Requirement</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Step 02 */}
            <div className="export-step-card" role="listitem">
              <div className="export-step-card-top">
                <div className="export-step-number" aria-hidden="true">02</div>
                <span className="export-step-deliverable font-spec">LOT SOURCING</span>
              </div>
              <div className="export-step-card-body">
                <div className="export-step-title-row">
                  <div className="export-step-icon-box" aria-hidden="true">
                    <FileSearch size={18} />
                  </div>
                  <h4 className="export-step-card-title">Sourcing Identification</h4>
                </div>
                <p className="export-step-card-desc">
                  We screen active auction catalogs, primary garden invoices, and regional producer offerings across Assam, Darjeeling, and Nilgiri to identify available lots matching your target liquor profile.
                </p>
              </div>
              <div className="export-step-card-footer">
                <button
                  type="button"
                  onClick={handleExploreGrades}
                  className="export-step-btn export-step-btn-subtle"
                  aria-label="Review Grade Specifications"
                >
                  <span>Review Grade Specs</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Step 03 */}
            <div className="export-step-card" role="listitem">
              <div className="export-step-card-top">
                <div className="export-step-number" aria-hidden="true">03</div>
                <span className="export-step-deliverable font-spec">AIR SAMPLE DISPATCH</span>
              </div>
              <div className="export-step-card-body">
                <div className="export-step-title-row">
                  <div className="export-step-icon-box" aria-hidden="true">
                    <Package size={18} />
                  </div>
                  <h4 className="export-step-card-title">Physical Counter-Sample</h4>
                </div>
                <p className="export-step-card-desc">
                  Representative physical counter-samples drawn from candidate lots are prepared and dispatched via international air courier directly to your laboratory for sensory inspection.
                </p>
              </div>
              <div className="export-step-card-footer">
                <button
                  type="button"
                  onClick={handleRequestSamples}
                  className="export-step-btn export-step-btn-primary"
                  aria-label="Request Counter-Samples: Open Quick Sample Form"
                >
                  <span>Request Counter-Samples</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Step 04 */}
            <div className="export-step-card export-step-card-approval" role="listitem">
              <div className="export-step-card-top">
                <div className="export-step-number" aria-hidden="true">04</div>
                <span className="export-step-deliverable font-spec">CUPPING APPROVAL</span>
              </div>
              <div className="export-step-card-body">
                <div className="export-step-title-row">
                  <div className="export-step-icon-box" aria-hidden="true">
                    <CheckCircle2 size={18} />
                  </div>
                  <h4 className="export-step-card-title">Buyer Cupping Approval</h4>
                </div>
                <p className="export-step-card-desc">
                  Buyer evaluates dry leaf style, infusion color, aroma, strength, and cup briskness. Commercial contracting begins exclusively upon your written counter-sample approval.
                </p>
              </div>
              <div className="export-step-card-footer">
                <div className="export-approval-stamp">
                  <Check size={14} className="export-approval-check" aria-hidden="true" />
                  <span>Sign-Off Milestone · Unlocks Phase 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PHASE 02: Commercial Execution Console (Step 05) */}
        <div className="export-phase-wrap export-phase-2-console">
          <div className="export-console-header">
            <div className="export-phase-badge-row">
              <span className="export-phase-badge export-phase-badge-gold font-spec">PHASE 02</span>
              <span className="export-phase-tag export-phase-tag-gold font-spec">COMMERCIAL EXECUTION · POST-APPROVAL DISPATCH</span>
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
                  Following written sample approval, we align contract pricing, packaging, phytosanitary paperwork, and container logistics to your destination port.
                </p>
              </div>
            </div>
          </div>

          <div className="export-console-deliverables-grid">
            <div className="export-console-card">
              <div className="export-console-card-icon">
                <FileText size={18} />
              </div>
              <h4 className="export-console-card-title">Commercial Terms &amp; Invoicing</h4>
              <p className="export-console-card-text">
                Volume confirmation, milestone payment terms, and clear commercial pricing on FOB Indian Port (Mundra / Kolkata) or CIF Destination Port basis.
              </p>
            </div>

            <div className="export-console-card">
              <div className="export-console-card-icon">
                <Layers size={18} />
              </div>
              <h4 className="export-console-card-title">Packaging &amp; Contract Packing</h4>
              <p className="export-console-card-text">
                Coordination of standard multi-wall paper sacks, woven bulk bags, or customized retail pouches/tins through qualified packing partners.
              </p>
            </div>

            <div className="export-console-card">
              <div className="export-console-card-icon">
                <ShieldCheck size={18} />
              </div>
              <h4 className="export-console-card-title">Statutory Export Paperwork</h4>
              <p className="export-console-card-text">
                Issuance of Tea Board of India export clearance, Phytosanitary Certificate, Certificate of Origin, and Certificate of Analysis.
              </p>
            </div>

            <div className="export-console-card">
              <div className="export-console-card-icon">
                <Anchor size={18} />
              </div>
              <h4 className="export-console-card-title">Container Stuffing &amp; Port Freight</h4>
              <p className="export-console-card-text">
                Container inspection, secure stuffing, fumigation, customs clearance, and Bill of Lading dispatch with ocean vessel tracking.
              </p>
            </div>
          </div>

          {/* Console Bottom Action Ribbon */}
          <div className="export-console-action-ribbon">
            <div className="export-console-reassurance">
              <span className="export-pulse-dot" aria-hidden="true" />
              <p className="export-console-reassurance-text">
                <strong>Commercial Governance:</strong> Operational sourcing and ocean logistics are coordinated directly with verified gardens, packing facilities, and accredited shipping lines. Sourcing terms are agreed upon proforma invoice.
              </p>
            </div>

            <button
              type="button"
              onClick={handleStartRequirement}
              className="export-console-cta-btn"
              aria-label="Submit Export Requirement: Open Detailed Specification Form"
            >
              <span>Submit Export Requirement</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
