import React from 'react';
import { Package, Sparkles, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export interface PrivateLabelSectionProps {
  onStartPrivateLabel?: () => void;
  onExploreCategories?: () => void;
}

export const PrivateLabelSection: React.FC<PrivateLabelSectionProps> = ({
  onStartPrivateLabel,
}) => {
  const packagingOptions = [
    {
      title: 'Bulk Export Supply (25kg)',
      subtitle: 'For Blenders & Packers',
      spec: 'Multi-wall kraft paper sacks with food-grade virgin LDPE liner',
      bestFor: 'Commercial blenders, wholesale re-baggers, and brand owners with local packaging facilities.',
      icon: Package,
    },
    {
      title: 'Retail Packaging & Tins',
      subtitle: 'Shelf-Ready Finished Goods',
      spec: 'Resealable stand-up pouches (foil-lined), metal tins, and printed folding cartons',
      bestFor: 'Supermarket retail brands, specialty tea shops, and corporate gift lines requiring custom branding.',
      icon: Sparkles,
    },
    {
      title: 'Tea Bags & Single-Serve',
      subtitle: 'Hospitality & Retail Packs',
      spec: 'Single-chamber, tagged envelope, or biodegradable pyramid mesh bags',
      bestFor: 'Foodservice operators, hotels, airlines, and branded retail tea bag lines.',
      icon: Layers,
    },
  ];

  const capabilities = [
    'Custom blend formulation matched to your target physical sample or cup profile',
    'Bilingual regulatory labeling (Arabic/English for GCC markets, ESMA, and international standards)',
    'Coordinated with qualified and accredited contract packing partners',
    'Containerized ocean dispatch via Mundra and Kolkata ports with complete export documentation',
  ];

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (onStartPrivateLabel) {
      onStartPrivateLabel();
    } else {
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
    }
  };

  return (
    <section 
      id="private-label" 
      className="private-label-section"
      aria-labelledby="private-label-heading"
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="private-label-header">
          <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            CUSTOM PACKAGING &amp; OEM
          </div>
          <h2 id="private-label-heading" className="private-label-title">
            Private Label &amp; Packaging Solutions
          </h2>
          <p className="private-label-lead">
            Whether you need 25kg bulk kraft sacks for repacking or shelf-ready branded packaging, we coordinate tea selection, packaging specifications, and export preparation around your brand.
          </p>
        </div>

        {/* 3 Packaging Option Cards */}
        <div className="private-label-formats-grid" role="list">
          {packagingOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.title} className="private-label-format-card" role="listitem">
                <div className="format-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(13, 56, 41, 0.08)', color: 'var(--color-primary-green)' }}>
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <span className="font-spec" style={{ fontSize: '0.75rem', color: 'var(--color-accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {opt.subtitle}
                    </span>
                  </div>
                  <h3 className="format-card-title">{opt.title}</h3>
                </div>

                <div className="format-spec-box">
                  <span className="format-spec-label font-spec">PACKAGING SPECIFICATION</span>
                  <p className="format-spec-val">{opt.spec}</p>
                </div>

                <div className="format-best-for">
                  <span className="format-best-label font-spec">TYPICAL APPLICATION</span>
                  <p className="format-best-val">{opt.bestFor}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Execution Capabilities Strip */}
        <div className="private-label-capabilities-box">
          <div className="private-label-capabilities-left">
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: 'var(--space-3)' }}>
              End-to-End Packaging Coordination
            </h4>
            <div className="private-label-caps-list">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="private-label-cap-item">
                  <CheckCircle2 size={16} className="cap-check-icon" aria-hidden="true" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="private-label-capabilities-right">
            <button 
              type="button"
              onClick={handleActionClick}
              className="btn btn-primary btn-gold"
              id="btn-start-private-label"
              aria-label="Inquire about private label tea packaging"
            >
              <span>Inquire About Private Label</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <div className="font-spec" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px', textAlign: 'center' }}>
              Subject to order parameters and packaging MOQ
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
