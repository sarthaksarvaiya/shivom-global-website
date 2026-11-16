import React, { useState } from 'react';
import { 
  Package, 
  Layers, 
  CheckCircle2, 
  MessageCircle,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

export interface WhyShivomGlobalProps {
  onRequestSamples?: () => void;
  onSubmitRequirement?: () => void;
}

export const WhyShivomGlobal: React.FC<WhyShivomGlobalProps> = ({ 
  onRequestSamples,
  onSubmitRequirement 
}) => {
  const [expandedPillar, setExpandedPillar] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pillars = [
    {
      num: '01',
      tag: 'Commercial Scope',
      title: 'Flexible Quantities',
      icon: Package,
      shortDesc: 'Trial and commercial quantities can be discussed based on tea grade, sourcing availability, packaging and destination.',
      expandedDetail: 'For larger commercial shipments, container-load quantities can be arranged according to buyer requirements. Smaller trial quantities can also be discussed for evaluation before scaling.',
    },
    {
      num: '02',
      tag: 'Requirement Sourcing',
      title: 'Requirement-Based Sourcing',
      icon: Layers,
      shortDesc: 'We work with appropriate sourcing channels to match buyer requirements with suitable Indian tea lots across primary production centers.',
      expandedDetail: 'We identify suitable sourcing options based on your specification, origin preference and current market availability.',
    },
    {
      num: '03',
      tag: 'Quality Pre-Verification',
      title: 'Physical Counter-Samples',
      icon: CheckCircle2,
      shortDesc: 'Representative physical counter-samples can be arranged for dry leaf evaluation, aroma, and cup profile prior to commercial contracts.',
      expandedDetail: 'Commercial consignments are matched against approved counter-samples to ensure specification adherence.',
    },
    {
      num: '04',
      tag: 'Direct Desk',
      title: 'Direct Trade Desk Access',
      icon: MessageCircle,
      shortDesc: 'You communicate directly with our trade desk from your initial inquiry through sampling, proforma discussion, and export coordination.',
      expandedDetail: 'Direct WhatsApp and email communication on specifications, commercial terms, and export arrangements.',
    },
  ];

  const complianceDocuments = [
    {
      name: 'Phytosanitary Certificate',
      authority: 'Directorate of Plant Protection, Ministry of Agriculture',
      desc: 'Statutory plant quarantine inspection certifying complete freedom from pests, weed seeds, and compliance with destination import laws.',
    },
    {
      name: 'Certificate of Origin (COO)',
      authority: 'Chamber of Commerce / Authorized Statutory Agency',
      desc: 'Certifies 100% authentic Indian tea origin, qualifying for preferential customs tariff under bilateral pacts including India-UAE CEPA.',
    },
    {
      name: 'Certificate of Analysis (COA)',
      authority: 'Accredited Analytical Testing Laboratory',
      desc: 'Independent testing verifying moisture content ≤ 8%, total ash, water-soluble extract, organoleptic profile, and pesticide residue safety.',
    },
    {
      name: 'Commercial Invoice & Packing List',
      authority: 'Shivom Global Export Documentation Desk',
      desc: 'Detailed commercial documentation showing garden invoice lot numbers, net/tare/gross weights, container/seal numbers, and IncoTerms.',
    },
    {
      name: 'Clean on Board Ocean Bill of Lading (B/L)',
      authority: 'Accredited Ocean Carrier (MSC / Maersk / CMA CGM)',
      desc: 'Primary negotiable document of title confirming ocean container receipt in apparent good condition for direct destination discharge.',
    },
    {
      name: 'Container Fumigation & Quarantine Certificate',
      authority: 'Licensed Quarantine Fumigation Agency',
      desc: 'Certified methyl bromide / phosphine container fumigation with ISPM-15 compliance for timber pallets and container dry stuffing.',
    },
  ];

  const faqItems = [
    {
      q: 'What is the Minimum Order Quantity (MOQ) for international buyers?',
      a: 'We structure procurement to support both trial evaluation and commercial container shipments. For new market testing, trial formulations, or single-origin invoices, we coordinate palletized LCL consignments starting from 1 to 5 Metric Tons (MT). Full commercial supply is coordinated as 1x20ft FCL (~10–12 MT) or 1x40ft High Cube FCL (~22–24 MT) for optimal ocean container freight economics.',
    },
    {
      q: 'How do physical pre-shipment counter-samples work, and what is the dispatch timeline?',
      a: 'In bulk tea export, sensory verification in the cup comes first. We draw representative counter-samples (100g–250g) directly from active candidate auction or garden invoice lots. Samples are vacuum-sealed in airtight, moisture-proof barrier pouches and dispatched via express air courier (DHL / FedEx) within 24–48 hours of requirement review. Commercial contracts and proforma invoices proceed only upon your formal written tasting approval.',
    },
    {
      q: 'What international payment terms and IncoTerms are supported?',
      a: 'We facilitate secure institutional trade via Irrevocable Documentary Letter of Credit (LC at Sight) issued by prime international banks, as well as Telegraphic Transfer (T/T) with standard commercial milestone terms (30% advance commitment upon sample approval, 70% balance against presentation of copy shipping documents and Bill of Lading). All quotations are structured on FOB Indian Ports (Mundra, Kandla, Kolkata) or CIF Destination Port (e.g. Jebel Ali, Dammam, Felixstowe) under IncoTerms 2020.',
    },
    {
      q: 'Can we request custom blending (e.g. Karak Chai) or private-label retail packaging?',
      a: 'Yes. We coordinate custom organoleptic formulation matching your target benchmark liquor—such as high-color, brisk CTC Dust/PD blends for Middle Eastern Karak Chai, or whole-leaf Orthodox and Darjeeling blends. We also coordinate retail private-label packaging (stand-up zipper pouches, tin canisters, pyramid tea bags) through qualified commercial packaging converters.',
    },
    {
      q: 'How is dry leaf moisture integrity and consistency protected during ocean transit?',
      a: 'Indian teas are packed at origin in heavy-duty 4-ply or 5-ply multi-wall kraft paper sacks with food-grade LDPE liners or heat-sealed aluminum foil barriers. This prevents humidity ingress during equatorial sea voyages, ensuring dry leaf moisture remains strictly ≤ 8% at destination destuffing, with consistent liquor strength, aroma, and color yield.',
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
                  <span>Export Coordination &amp; Documentation</span>
                </div>
                <h3 className="compliance-terminal-title">
                  Statutory Export Compliance &amp; Documentation
                </h3>
                <p className="compliance-terminal-subtitle">
                  Export consignments are coordinated with applicable statutory trade documentation per shipment. Buyer-specific documentation and legalization requirements can be discussed during quotation and order preparation.
                </p>
              </div>

              {/* Verified Checklist */}
              <ul className="compliance-checklist" role="list">
                {complianceDocuments.map((doc, idx) => (
                  <li key={idx} className="compliance-check-item" role="listitem">
                    <span className="compliance-check-icon" aria-hidden="true">
                      <FileCheck size={14} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <div className="compliance-item-name-row">
                        <span className="compliance-item-name">{doc.name}</span>
                        <span className="compliance-authority-tag font-spec">{doc.authority}</span>
                      </div>
                      <p className="compliance-item-desc">{doc.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="compliance-terminal-footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'rgba(var(--primitive-white-rgb), var(--alpha-85))', fontWeight: 600 }}>
                  FOB Indian Loading Ports &amp; CIF Destination Ports (e.g. Mundra, Nhava Sheva, Kolkata, Jebel Ali)
                </span>
                <button
                  type="button"
                  onClick={handleInquire}
                  className="btn btn-primary btn-sm"
                  aria-label="Discuss export requirements and trade terms"
                >
                  <span>Discuss Requirements &amp; Terms</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'rgba(var(--primitive-white-rgb), var(--alpha-70))', margin: 0, lineHeight: 1.4 }}>
                *Commercial pricing depends on grade, origin, quantity, packaging, destination and prevailing market conditions. Transit time and final freight depend on vessel schedule, booking, origin port, destination and shipment conditions.
              </p>
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

        {/* Institutional Procurement FAQ (Option 3) */}
        <div id="procurement-faq" className="procurement-faq-block" aria-labelledby="procurement-faq-heading">
          <div className="procurement-faq-header text-center">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-2)' }}>
              PROCUREMENT FAQ
            </div>
            <h3 id="procurement-faq-heading" className="procurement-faq-title">
              Frequently Asked Commercial &amp; Trade Questions
            </h3>
            <p className="procurement-faq-lead">
              Clear answers to the most common questions international tea importers, wholesale distributors, and brand owners ask before initiating an inquiry.
            </p>
          </div>

          <div className="procurement-faq-accordion" role="region" aria-label="Trade FAQ Accordion">
            {faqItems.map((item, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div 
                  key={fIdx} 
                  className={`faq-item-card ${isOpen ? 'faq-item-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${fIdx}`}
                    id={`faq-question-${fIdx}`}
                  >
                    <span className="faq-question-text">
                      <HelpCircle size={17} className="faq-question-icon" aria-hidden="true" />
                      <span>{item.q}</span>
                    </span>
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`} aria-hidden="true" />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${fIdx}`}
                      role="region"
                      aria-labelledby={`faq-question-${fIdx}`}
                      className="faq-answer-panel"
                    >
                      <p className="faq-answer-text">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Trade Reassurance Bar */}
          <div className="faq-trade-reassurance">
            <div className="faq-reassurance-text">
              <strong>Have a customized specification or destination port requirement?</strong>
              <span>Our trade desk provides tailored commercial quotations within 24–48 hours.</span>
            </div>
            <div className="faq-reassurance-actions">
              <button
                type="button"
                onClick={handleInquire}
                className="btn btn-primary btn-sm"
              >
                <span>Tell Us What Tea You Need</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
              <a
                href={CONTACT_INFO.whatsapp.getLink('Hello SHIVOM GLOBAL Trade Desk, I have a commercial procurement question.')}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-wa-link"
              >
                <MessageCircle size={15} aria-hidden="true" />
                <span>WhatsApp Trade Desk</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
