import React from 'react';
import { 
  Compass, 
  Layers, 
  Boxes, 
  Ship, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export interface WhyShivomGlobalProps {
  onSubmitRequirement?: () => void;
}

export const WhyShivomGlobal: React.FC<WhyShivomGlobalProps> = ({ onSubmitRequirement }) => {
  const pillars = [
    {
      numeral: '01',
      title: 'Buyer-First Sourcing',
      icon: Compass,
      description: 'We begin with the buyer\'s requirement and identify suitable sourcing options around the requested specification.',
      tag: 'Requirement-Led',
    },
    {
      numeral: '02',
      title: 'Specification-Led Selection',
      icon: Layers,
      description: 'Tea category, grade, application, cup profile and commercial requirements are considered before sourcing and sampling.',
      tag: 'Application-Matched',
    },
    {
      numeral: '03',
      title: 'Flexible Commercial Formats',
      icon: Boxes,
      description: 'Support can be structured around bulk tea supply, private-label requirements and different commercial packing formats depending on the order.',
      tag: 'Bulk & OEM Formats',
    },
    {
      numeral: '04',
      title: 'Export Coordination',
      icon: Ship,
      description: 'We coordinate the commercial, packing and documentation requirements needed to move an agreed order toward export.',
      tag: 'Documentation & Transit',
    },
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
    <section id="why-us" className="why-shivom-section" aria-labelledby="why-shivom-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="why-shivom-header">
          <div className="why-shivom-eyebrow">
            <span className="spec-badge spec-badge-gold">WHY SHIVOM GLOBAL</span>
          </div>
          <h2 id="why-shivom-title" className="why-shivom-title">
            A Sourcing Partner Built Around the Buyer
          </h2>
          <p className="why-shivom-lead">
            We coordinate Indian tea sourcing around the buyer's specification, application, 
            packing requirements and commercial destination rather than treating every requirement 
            as a standard product order.
          </p>
        </div>

        {/* 4 Core Value Pillars Grid */}
        <div className="why-shivom-grid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.numeral} className="why-pillar-card">
                <div className="why-pillar-top">
                  <span className="why-pillar-num">{pillar.numeral}</span>
                  <div className="why-pillar-icon-box">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                </div>

                <div className="why-pillar-body">
                  <div className="why-pillar-tag">{pillar.tag}</div>
                  <h3 className="why-pillar-heading">{pillar.title}</h3>
                  <p className="why-pillar-desc">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Principle Highlight Banner */}
        <div className="why-principle-banner">
          <div className="why-principle-left">
            <div className="why-principle-badge">
              <ShieldCheck size={18} className="why-principle-shield-icon" />
              <span>COMMERCIAL SOURCING PRINCIPLE</span>
            </div>
            <h3 className="why-principle-title">Requirement-Led, Confirmation-Driven</h3>
            <p className="why-principle-copy">
              Our model is designed around confirmed commercial requirements. Specifications, pricing, and availability are verified before any commercial commitment is made.
            </p>
          </div>

          <div className="why-principle-action">
            <button
              type="button"
              onClick={handleInquire}
              className="why-principle-btn"
              aria-label="Discuss your commercial tea requirement"
            >
              <span>Discuss Your Requirement</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
