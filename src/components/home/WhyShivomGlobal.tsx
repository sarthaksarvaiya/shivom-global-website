import React from 'react';
import { 
  Layers, 
  Globe2, 
  FileCheck2, 
  Boxes, 
  PackageCheck, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export interface WhyShivomGlobalProps {
  onSubmitRequirement?: () => void;
}

export const WhyShivomGlobal: React.FC<WhyShivomGlobalProps> = ({ onSubmitRequirement }) => {
  const points = [
    {
      num: '01',
      title: 'Specification-Led Sourcing',
      description: 'Every lot is procured and tested around your required particle size, liquor profile, and target parameters.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Multiple Origin Terroirs',
      description: 'Access to primary Assam auctions and vetted estate gardens across Assam, Darjeeling, and North India.',
      icon: Globe2,
    },
    {
      num: '03',
      title: 'Export Documentation Support',
      description: 'Full statutory export documentation provided: Certificate of Origin, Phytosanitary, laboratory COA, and Bill of Lading.',
      icon: FileCheck2,
    },
    {
      num: '04',
      title: 'Flexible Order Formats',
      description: 'Support structured around trial orders (250kg–500kg), commercial LCL shipments, and multi-container (FCL) contracts.',
      icon: Boxes,
    },
    {
      num: '05',
      title: 'Private-Label Capabilities',
      description: 'Custom packaging solutions from 25kg bulk moisture-barrier sacks to retail-ready pouches, tins, and tea bags.',
      icon: PackageCheck,
    },
    {
      num: '06',
      title: 'Direct Trade Desk Contact',
      description: 'Direct communication with trade desk decision-makers for quick quotes, sample dispatch, and straightforward problem-solving.',
      icon: MessageCircle,
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
            Built for International Tea Buyers
          </h2>
          <p className="why-shivom-lead">
            We coordinate Indian tea sourcing around your exact grade, application, packing, and destination market requirements.
          </p>
        </div>

        {/* 6 Value Points Grid */}
        <div className="why-shivom-grid" role="list">
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

        {/* Bottom Reassurance Banner */}
        <div className="why-principle-banner">
          <div className="why-principle-left">
            <h3 className="why-principle-title" style={{ margin: '0 0 6px 0', fontSize: '1.25rem' }}>
              Have a Specific Tea Requirement or Benchmark Sample?
            </h3>
            <p className="why-principle-copy" style={{ margin: 0 }}>
              Share your target specifications, target price, or sample parameters with our trade desk for prompt evaluation.
            </p>
          </div>

          <div className="why-principle-action">
            <button
              type="button"
              onClick={handleInquire}
              className="btn btn-primary btn-gold"
              aria-label="Discuss your tea sourcing requirement"
              id="btn-why-us-inquire"
            >
              <span>Submit Sourcing Requirement</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
