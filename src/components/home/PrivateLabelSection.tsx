import React from 'react';
import { Package, Sparkles, Layers, ArrowRight, Check, ShieldCheck } from 'lucide-react';

export interface PrivateLabelSectionProps {
  onStartPrivateLabel?: (formatTitle?: string) => void;
}

export const PrivateLabelSection: React.FC<PrivateLabelSectionProps> = ({
  onStartPrivateLabel,
}) => {
  const packagingOptions = [
    {
      id: 'bulk-sacks',
      badge: 'BULK SOURCING FORMAT',
      title: 'Bulk Export Packaging',
      subtitle: 'Standard Bulk Sacks',
      spec: 'Bulk packaging formats can be discussed based on quantity, destination and buyer specification',
      features: [
        'Export packaging can be coordinated according to buyer requirements and the selected tea lot',
        'Standard export palletization and container loading coordinated for ocean freight',
        'Standard export stenciling and lot traceability markings'
      ],
      moq: 'Quantities discussed on requirement',
      bestFor: 'Blenders, commercial repackers, and wholesale distributors.',
      icon: Package,
    },
    {
      id: 'custom-packing',
      badge: 'CUSTOM BULK OPTIONS',
      title: 'Custom Bulk Packing',
      subtitle: 'Flexible Container Packaging',
      spec: 'Heavy-duty woven or multi-ply sacks coordinated according to buyer order',
      features: [
        'Packaging construction matched to destination handling and storage requirements',
        'Tare weights and bag sizing structured around buyer handling facilities',
        'Multi-grade consolidation and destination shipping marks'
      ],
      moq: 'Flexible bulk consolidations',
      bestFor: 'Commercial buyers, catering operations, and institutional importers.',
      icon: Layers,
    },
    {
      id: 'private-label',
      badge: 'RETAIL & BRAND READY',
      title: 'Private Label Support',
      subtitle: 'Retail Pouches, Tins & Tea Bags',
      spec: 'Stand-up pouches, tin canisters, or envelope/pyramid tea bags',
      features: [
        'Retail packaging coordinated through suitable commercial packaging partners',
        'Custom branding, labeling, and barcoding coordinated according to market regulations',
        'Trial packaging batches discussed subject to product and run requirements',
      ],
      moq: 'Trial batches discussed on requirement',
      bestFor: 'Supermarket retail brands, hospitality private labels, and brand creators.',
      icon: Sparkles,
    },
  ];

  const handleActionClick = (formatTitle?: string) => {
    if (onStartPrivateLabel) {
      onStartPrivateLabel(formatTitle);
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
        
        {/* Section Header - Centered & Premium */}
        <div className="private-label-header text-center" style={{ maxWidth: '740px', margin: '0 auto clamp(2rem, 4vw, 3rem)' }}>
          <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            PACKING &amp; PRIVATE LABEL SUPPORT
          </div>
          <h2 id="private-label-heading" className="private-label-title">
            Private Label &amp; Contract Packaging Support
          </h2>
          <p className="private-label-lead" style={{ margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
            We can coordinate tea sourcing and packaging requirements for private-label programs through suitable commercial partners, subject to product, packaging and quantity requirements.
          </p>
        </div>

        {/* 3 Balanced Packaging Option Cards */}
        <div className="private-label-formats-grid" role="list">
          {packagingOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.id} className="private-label-format-card" role="listitem">
                <div className="format-card-top-bar">
                  <span className="format-card-tier-badge font-spec">
                    {opt.badge}
                  </span>
                  <div className="format-card-icon-pill" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="format-card-header">
                  <h3 className="format-card-title">{opt.title}</h3>
                  <span className="format-card-subtitle">{opt.subtitle}</span>
                </div>

                <div className="format-spec-box">
                  <span className="format-spec-label font-spec">CONTAINER SPECIFICATION</span>
                  <p className="format-spec-val">{opt.spec}</p>
                </div>

                <div className="format-features-list">
                  <span className="format-features-heading font-spec">KEY EXPORT ADVANTAGES</span>
                  <ul className="format-features-ul">
                    {opt.features.map((feat, idx) => (
                      <li key={idx} className="format-feature-item">
                        <Check size={14} className="format-feature-icon" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="format-meta-footer">
                  <div className="format-best-for">
                    <span className="format-best-label font-spec">SUITABLE FOR</span>
                    <p className="format-best-val">{opt.bestFor}</p>
                  </div>

                  <div className="format-moq-row">
                    <span className="format-moq-label font-spec">VOLUME SCALE</span>
                    <span className="format-moq-val">{opt.moq}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleActionClick(opt.title)}
                    className="btn btn-outline-gold format-inquire-btn"
                    aria-label={`Inquire about ${opt.title}`}
                  >
                    <span>Inquire {opt.title}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Short Discussion Action Strip */}
        <div className="private-label-capabilities-box">
          <div className="private-label-capabilities-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={18} style={{ color: '#D4AF37' }} aria-hidden="true" />
              <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Discuss Your Destination Packaging &amp; Labeling Needs
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.5 }}>
              Whether you require standard bulk export packaging or custom private-label retail packing, our trade desk can coordinate packaging specifications, counter-samples, and trade terms based on your requirement.
            </p>
          </div>

          <div className="private-label-capabilities-right">
            <button 
              type="button"
              onClick={() => handleActionClick()}
              className="btn btn-primary btn-gold"
              id="btn-start-private-label"
              aria-label="Discuss private label and custom packing options"
            >
              <span>Discuss Packaging Options</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
