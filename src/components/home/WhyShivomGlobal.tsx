import React from 'react';
import { 
  Package, 
  Layers, 
  CheckCircle2, 
  MessageCircle,
  Clock,
  CreditCard,
  Anchor,
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
  const points = [
    {
      num: '01',
      title: 'Trial Quantities',
      description: 'Start with manageable trial shipments to test quality and customer response in your market before scaling order volumes.',
      icon: Package,
    },
    {
      num: '02',
      title: 'Requirement-Based Sourcing',
      description: 'We work from your required tea grade, quantity, packing and destination, sourcing tea through established Indian supply channels.',
      icon: Layers,
    },
    {
      num: '03',
      title: 'Samples Before Commitment',
      description: 'Buyers can evaluate physical samples for appearance, aroma, and cup profile before placing a larger order.',
      icon: CheckCircle2,
    },
    {
      num: '04',
      title: 'Direct Communication',
      description: 'You have one direct point of contact from your initial enquiry through sampling, quotation, and order coordination.',
      icon: MessageCircle,
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
        <div className="why-shivom-header">
          <div className="why-shivom-eyebrow">
            <span className="spec-badge spec-badge-gold">WHY SHIVOM GLOBAL</span>
          </div>
          <h2 id="why-shivom-title" className="why-shivom-title">
            Practical Sourcing for Tea Buyers
          </h2>
          <p className="why-shivom-lead">
            We focus on clear communication, verified samples, and straightforward execution without unnecessary intermediaries.
          </p>
        </div>

        {/* 4 Practical Buyer Value Points Grid */}
        <div className="why-shivom-grid" role="list" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div key={pt.num} className="why-pillar-card" role="listitem">
                <div className="why-pillar-top">
                  <span className="why-pillar-num font-spec">{pt.num}</span>
                  <div className="why-pillar-icon-box" aria-hidden="true">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                </div>

                <div className="why-pillar-body">
                  <h3 className="why-pillar-heading">{pt.title}</h3>
                  <p className="why-pillar-desc">{pt.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buyer Basics Strip — Trading Conditions at a Glance */}
        <div className="buyer-basics-strip" role="region" aria-label="Buyer Basics and Trading Conditions">
          <div className="buyer-basics-header">
            <h3 className="buyer-basics-title">Buyer Basics at a Glance</h3>
            <span className="font-spec buyer-basics-tag">KEY CONDITIONS</span>
          </div>

          <div className="buyer-basics-grid">
            <div className="buyer-basic-item">
              <div className="buyer-basic-icon-box">
                <Package size={18} aria-hidden="true" />
              </div>
              <div>
                <span className="buyer-basic-label font-spec">ORDER QUANTITIES</span>
                <p className="buyer-basic-value">Flexible commercial quantities based on tea, specification, packaging and buyer requirements.</p>
              </div>
            </div>

            <div className="buyer-basic-item">
              <div className="buyer-basic-icon-box">
                <CreditCard size={18} aria-hidden="true" />
              </div>
              <div>
                <span className="buyer-basic-label font-spec">PAYMENT TERMS</span>
                <p className="buyer-basic-value">Agreed based on order size, buyer profile and transaction requirements (Bank Transfer / Advance / LC as agreed)</p>
              </div>
            </div>

            <div className="buyer-basic-item">
              <div className="buyer-basic-icon-box">
                <Clock size={18} aria-hidden="true" />
              </div>
              <div>
                <span className="buyer-basic-label font-spec">TYPICAL LEAD TIME</span>
                <p className="buyer-basic-value">Depends on tea availability, packing requirements, order quantity and destination</p>
              </div>
            </div>

            <div className="buyer-basic-item">
              <div className="buyer-basic-icon-box">
                <Anchor size={18} aria-hidden="true" />
              </div>
              <div>
                <span className="buyer-basic-label font-spec">EXPORT COMPLIANCE &amp; LOGISTICS</span>
                <p className="buyer-basic-value">Full export paperwork (Phytosanitary, Certificate of Origin, Tea Board clearance, BL) with shipping via appropriate Indian ports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Direct Inquiry CTA Strip */}
        <div className="why-principle-banner" style={{ marginTop: 'var(--space-6)' }}>
          <div className="why-principle-left">
            <h3 className="why-principle-title" style={{ margin: '0 0 6px 0', fontSize: '1.25rem' }}>
              Have a Specific Tea Grade or Inquiry?
            </h3>
            <p className="why-principle-copy" style={{ margin: 0 }}>
              Share your required tea type, grade, quantity, and destination with our trade desk for prompt review and samples.
            </p>
          </div>

          <div className="why-principle-action">
            <button
              type="button"
              onClick={handleInquire}
              className="btn btn-primary btn-gold"
              aria-label="Request Free Samples or Submit Sourcing Requirement"
              id="btn-why-us-inquire"
            >
              <span>Request Free Samples</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
