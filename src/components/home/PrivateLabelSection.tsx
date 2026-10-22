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
      badge: 'PRIMARY EXPORT STANDARD',
      title: 'Bulk Tea Supply',
      subtitle: 'Standard Multi-Wall Paper Sacks',
      spec: '20kg – 25kg multi-wall kraft paper sacks with food-grade LDPE inner liner',
      features: [
        'Hermetically sealed liner protecting freshness & aroma',
        'Standard export palletization for 20ft & 40ft ocean FCLs',
        'Official Tea Board & garden markings with batch tracking'
      ],
      moq: 'From 1x 20ft FCL (~10–12 MT)',
      bestFor: 'Blenders, wholesale packers, and regional tea packagers.',
      icon: Package,
    },
    {
      id: 'custom-packing',
      badge: 'VOLUME & FLEXIBLE BULK',
      title: 'Custom Packing',
      subtitle: 'High-Capacity Woven PP Sacks',
      spec: '35kg – 50kg heavy-duty woven polypropylene bags or custom container sacks',
      features: [
        'High-tensile tear & puncture-resistant outer woven mesh',
        'Custom tare weights calibrated to destination handling lines',
        'Multi-grade consolidation & bilingual export stencils'
      ],
      moq: 'Flexible bulk consolidations',
      bestFor: 'Institutional buyers, catering operations, and commercial distributors.',
      icon: Layers,
    },
    {
      id: 'private-label',
      badge: 'RETAIL & BRAND READY',
      title: 'Private Label & OEM',
      subtitle: 'Retail Pouches, Tins & Tea Bags',
      spec: 'Stand-up zipper pouches, airtight tin caddies, or pyramid tea bags',
      features: [
        'Custom printed foil pouches (100g, 250g, 500g, 1kg) & tin canisters',
        'Biodegradable pyramid or double-chamber envelope tea bags',
        'Coordinated with FSSC 22000 & ISO-certified blending partners'
      ],
      moq: 'Low MOQ trial runs available',
      bestFor: 'Supermarket retail brands, luxury hospitality lines, and specialty private labels.',
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
            PACKING &amp; PRIVATE LABEL
          </div>
          <h2 id="private-label-heading" className="private-label-title">
            Custom Packing &amp; Private Label
          </h2>
          <p className="private-label-lead" style={{ margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
            From auction-standard bulk export sacks to consumer-ready private labeling. Tailored to your destination port regulations, shelf specifications, and branding requirements.
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
              Whether you need food-grade export liners for containerized shipping or full turnkey private label packing with barcode compliance, our tea export desk assists with specifications and samples.
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
