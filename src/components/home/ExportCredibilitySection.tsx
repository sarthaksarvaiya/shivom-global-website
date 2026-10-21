import React from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  FileCheck, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export interface ExportCredibilitySectionProps {
  onSubmitRequirement?: () => void;
}

export const ExportCredibilitySection: React.FC<ExportCredibilitySectionProps> = ({ 
  onSubmitRequirement 
}) => {
  const documentGroups = [
    {
      title: 'Commercial Documents',
      subtitle: 'Core Trade Instruments',
      icon: FileSpreadsheet,
      badge: 'Standard Workflow',
      items: [
        'Commercial Invoice',
        'Packing List',
        'Quotation / Proforma Documentation',
      ],
      description: 'Standard commercial records detailing product grades, lot quantities, container marks, net/gross weights, and commercial terms.',
    },
    {
      title: 'Shipping & Export Documentation',
      subtitle: 'Freight & Handover Paperwork',
      icon: FileText,
      badge: 'Shipment-Dependent',
      items: [
        'Shipping documentation (Bill of Lading / Waybill)',
        'Transport & gate pass documentation',
        'Applicable Indian export paperwork',
      ],
      description: 'Coordinated with contracted freight forwarders and ocean/air carriers for smooth customs clearance at origin and port of discharge.',
    },
    {
      title: 'Product & Compliance Documentation',
      subtitle: 'Where Applicable by Destination',
      icon: FileCheck,
      badge: 'Order-Specific',
      items: [
        'Product specifications & technical parameters',
        'Certificate / test documentation (where agreed)',
        'Origin-related documentation (Certificate of Origin)',
        'Other destination-specific import paperwork',
      ],
      description: 'Arranged against agreed buyer parameters and destination regulations. Specific laboratory tests or origin paperwork are defined at confirmation.',
    },
  ];

  const exportSequence = [
    { step: '01', title: 'Buyer Requirement' },
    { step: '02', title: 'Commercial Confirmation' },
    { step: '03', title: 'Packing' },
    { step: '04', title: 'Documentation' },
    { step: '05', title: 'Dispatch' },
    { step: '06', title: 'Destination' },
  ];

  const handleInquire = () => {
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
    <section id="export-documentation" className="export-cred-section" aria-labelledby="export-cred-heading">
      <div className="container">
        
        {/* Section Header */}
        <div className="export-cred-header">
          <div className="export-cred-eyebrow">
            <span className="spec-badge spec-badge-gold">EXPORT & DOCUMENTATION</span>
          </div>
          <h2 id="export-cred-heading" className="export-cred-title">
            Prepared for Commercial Export
          </h2>
          <p className="export-cred-lead">
            Export requirements depend on the product, destination, shipment and buyer requirements. 
            We coordinate the applicable commercial and shipping documentation for confirmed orders.
          </p>
        </div>

        {/* 2-Column Split: Overview & Credibility on Left, Document Cards on Right */}
        <div className="export-cred-split-grid">
          
          {/* Left Column: Context & Credibility Statement */}
          <div className="export-cred-overview">
            <h3 className="export-overview-title">
              Disciplined Coordination from Port of Origin to Discharge
            </h3>
            
            <p className="export-overview-text">
              International tea shipments require careful alignment between commercial invoices, 
              customs filings, phytosanitary requirements, and carrier documentation. 
              Rather than offering generic promises, our trade desk coordinates each document package 
              around the actual destination country, trade lane, and buyer regulatory requirements.
            </p>

            {/* Factual Credibility Statement Box */}
            <div className="export-statement-card">
              <div className="export-statement-icon-wrap">
                <ShieldCheck size={24} className="export-statement-icon" />
              </div>
              <div className="export-statement-content">
                <div className="export-statement-tag">OPERATIONAL POLICY</div>
                <div className="export-statement-quote">
                  "Documentation is coordinated according to the agreed product, shipment and destination requirements."
                </div>
                <p className="export-statement-sub">
                  We review documentary requirements prior to contract signing so commercial expectations, 
                  statutory filings, and inspection parameters are agreed in advance.
                </p>
              </div>
            </div>

            <div className="export-destination-note">
              <div className="export-destination-label">DESTINATION COMPLIANCE REVIEW:</div>
              <p className="export-destination-text">
                Whether shipping to the Middle East (GCC), Europe, Central Asia, North America, or Africa, 
                we coordinate with licensed export partners and accredited testing facilities to supply the specific 
                paperwork required for customs clearance at your port.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Structured Document Category Cards */}
          <div className="export-docs-column">
            {documentGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.title} className="export-doc-card">
                  <div className="export-doc-header">
                    <div className="export-doc-icon-box">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <div className="export-doc-title-wrap">
                      <div className="export-doc-badge">{group.badge}</div>
                      <h4 className="export-doc-title">{group.title}</h4>
                    </div>
                  </div>

                  <p className="export-doc-desc">{group.description}</p>

                  <div className="export-doc-checklist">
                    {group.items.map((item, idx) => (
                      <div key={idx} className="export-doc-item">
                        <CheckCircle2 size={15} className="export-doc-check" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Strip: Simple Export Flow Sequence */}
        <div className="export-flow-container">
          <div className="export-flow-heading-row">
            <h3 className="export-flow-heading">Export Coordination Flow</h3>
            <span className="export-flow-sub">From requirement qualification to port arrival</span>
          </div>

          <div className="export-flow-timeline">
            {exportSequence.map((item, index) => (
              <div key={item.step} className="export-flow-step">
                <div className="export-flow-node">
                  <span className="export-flow-num">{item.step}</span>
                  {index < exportSequence.length - 1 && <span className="export-flow-connector" />}
                </div>
                <div className="export-flow-label">{item.title}</div>
              </div>
            ))}
          </div>

          <div className="export-flow-action">
            <button
              type="button"
              onClick={handleInquire}
              className="export-flow-btn"
              aria-label="Discuss export documentation with our trade desk"
            >
              <span>Discuss Commercial Export Requirements</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
