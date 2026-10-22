import React, { useState } from 'react';
import { 
  Package, 
  Layers, 
  CheckCircle2, 
  MessageCircle,
  FileCheck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export interface WhyShivomGlobalProps {
  onRequestSamples?: () => void;
  onSubmitRequirement?: () => void;
}

export const WhyShivomGlobal: React.FC<WhyShivomGlobalProps> = ({ 
  onRequestSamples,
  onSubmitRequirement 
}) => {
  const [expandedPillar, setExpandedPillar] = useState<number>(0);

  const pillars = [
    {
      num: '01',
      tag: 'Risk-Free Onboarding',
      title: 'Flexible Commercial Quantities',
      icon: Package,
      shortDesc: 'Start with manageable trial shipments to test cup acceptance and consumer response in your target market before scaling order volumes.',
      expandedDetail: 'No arbitrary MOQ constraints. We calibrate order sizing to your container, packaging format, and trial requirements.',
    },
    {
      num: '02',
      tag: 'Origin Traceability',
      title: 'Requirement-Based Sourcing',
      icon: Layers,
      shortDesc: 'We source strictly from your desired leaf grade, mesh sieve size, and liquor strength via established Indian plantation networks.',
      expandedDetail: 'Direct access to Brahmaputra Valley estate lots and Kolkata / Guwahati primary auction catalogs for lot consistency.',
    },
    {
      num: '03',
      tag: 'Quality Pre-Verification',
      title: 'Physical Pre-Shipment Samples',
      icon: CheckCircle2,
      shortDesc: 'Buyers evaluate actual physical tea samples for dry leaf appearance, aroma, and cup profile prior to committing to commercial contracts.',
      expandedDetail: 'Every commercial dispatch is matched against your approved counter-sample to prevent specification mismatch.',
    },
    {
      num: '04',
      tag: 'Zero Intermediaries',
      title: 'Direct Trade Desk Access',
      icon: MessageCircle,
      shortDesc: 'You communicate directly with our trade desk from your initial inquiry through sampling, proforma invoicing, and ocean vessel dispatch.',
      expandedDetail: 'Zero agency markups or broker delays. Direct WhatsApp and email coordination on container loading schedules.',
    },
  ];

  const complianceDocuments = [
    {
      name: 'Phytosanitary Certificate',
      desc: 'Plant quarantine inspection validating freedom from pests and compliance with destination country import regulations.',
    },
    {
      name: 'Certificate of Origin (COO)',
      desc: 'Issued by Chamber of Commerce / authorized statutory bodies certifying authentic 100% Indian tea origin.',
    },
    {
      name: 'Tea Board of India Clearance',
      desc: 'Official registered exporter batch verification and export license documentation.',
    },
    {
      name: 'Ocean Bill of Lading (B/L) & Commercial Set',
      desc: 'Clean on-board ocean B/L, packing list with tare/gross weights, and commercial proforma invoice.',
    },
  ];

  const handleInquire = () => {
    if (onRequestSamples) {
      onRequestSamples();
      return;
    }
    if (onSubmitRequirement) {
      onSubmitRequirement();
      return;
    }
    const formElement = document.getElementById('requirement-form');
    if (formElement) {
      const headerOffset = 80;
      const elementPosition = formElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="why-us" className="why-shivom-section" aria-labelledby="why-shivom-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="why-shivom-header text-center">
          <div className="why-shivom-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
            <span className="spec-badge spec-badge-gold">SOURCING CREDIBILITY</span>
          </div>
          <h2 id="why-shivom-title" className="why-shivom-title">
            Built for International Tea Buyers
          </h2>
          <p className="why-shivom-lead" style={{ maxWidth: '640px', margin: '0 auto' }}>
            We eliminate broker layers and arbitrary constraints by operating as a transparent Indian origin sourcing and export coordination desk.
          </p>
        </div>

        {/* Asymmetric Split-Screen Compliance Console (Replaces 4 generic cards) */}
        <div className="compliance-console-wrap">
          
          {/* Left Console: Export Readiness & Statutory Documentation Terminal */}
          <div className="compliance-terminal-card">
            <div>
              <div className="compliance-terminal-top">
                <div className="compliance-status-pill">
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Verified Export Clearance</span>
                </div>
                <h3 className="compliance-terminal-title">
                  Statutory Export Compliance &amp; Documentation
                </h3>
                <p className="compliance-terminal-subtitle">
                  Every international consignment from SHIVOM GLOBAL is processed with complete statutory trade documentation for frictionless customs clearance at your port.
                </p>
              </div>

              {/* Verified Checklist */}
              <ul className="compliance-checklist" role="list">
                {complianceDocuments.map((doc, idx) => (
                  <li key={idx} className="compliance-check-item" role="listitem">
                    <span className="compliance-check-icon" aria-hidden="true">
                      <FileCheck size={14} />
                    </span>
                    <div>
                      <div className="compliance-item-name">{doc.name}</div>
                      <p className="compliance-item-desc">{doc.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="compliance-terminal-footer">
              <span style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                FOB &amp; CIF Terms Available
              </span>
              <button
                type="button"
                onClick={handleInquire}
                className="btn btn-primary btn-sm"
                aria-label="Request export documentation checklist & samples"
              >
                <span>Request Sample &amp; Specs</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Console: Interactive Buyer Value Pillars */}
          <div className="compliance-pillars-stack">
            {pillars.map((pt, idx) => {
              const Icon = pt.icon;
              const isExpanded = idx === expandedPillar;

              return (
                <div
                  key={pt.num}
                  className={`pillar-interactive-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => setExpandedPillar(idx)}
                  onMouseEnter={() => setExpandedPillar(idx)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                >
                  <div className="pillar-card-top-row">
                    <div className="pillar-card-title-group">
                      <div className="pillar-card-icon-box" aria-hidden="true">
                        <Icon size={18} />
                      </div>
                      <h4 className="pillar-card-title">{pt.title}</h4>
                    </div>
                    <span className="pillar-card-tag font-spec">{pt.tag}</span>
                  </div>

                  <p className="pillar-card-desc">
                    {pt.shortDesc}
                  </p>

                  {isExpanded && (
                    <div style={{ marginTop: '8px', paddingLeft: '50px', fontSize: '0.8125rem', color: 'var(--color-primary-green)', fontWeight: 600 }}>
                      ✓ {pt.expandedDetail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
