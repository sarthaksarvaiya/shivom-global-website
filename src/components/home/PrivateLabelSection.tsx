import React from 'react';
import { Package, Sparkles, Layers, ArrowRight } from 'lucide-react';

export interface PrivateLabelSectionProps {
  onStartPrivateLabel?: () => void;
}

export const PrivateLabelSection: React.FC<PrivateLabelSectionProps> = ({
  onStartPrivateLabel,
}) => {
  const packagingOptions = [
    {
      title: 'Bulk Tea Supply',
      spec: '25kg multi-wall kraft paper sacks with food-grade LDPE liner',
      bestFor: 'Blenders, wholesale packers, and brands with their own repacking facilities.',
      icon: Package,
    },
    {
      title: 'Custom Packing',
      spec: '50kg woven PP bags, customized sack weights, or bulk pack sizes',
      bestFor: 'Institutional buyers, catering operations, and regional tea distributors.',
      icon: Layers,
    },
    {
      title: 'Private Label Requirements',
      spec: 'Retail pouches, tins, or tea bags coordinated with partner packaging facilities',
      bestFor: 'Supermarket retail brands, hospitality lines, and specialty private labels.',
      icon: Sparkles,
    },
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
            PACKING &amp; PRIVATE LABEL
          </div>
          <h2 id="private-label-heading" className="private-label-title">
            Custom Packing &amp; Private Label
          </h2>
          <p className="private-label-lead">
            Need tea under your own brand? Share your packing and quantity requirements and we can discuss the available options.
          </p>
        </div>

        {/* 3 Packaging Option Cards */}
        <div className="private-label-formats-grid" role="list">
          {packagingOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.title} className="private-label-format-card" role="listitem">
                <div className="format-card-header">
                  <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'rgba(13, 56, 41, 0.08)', color: 'var(--color-primary-green)', width: 'fit-content', marginBottom: '12px' }}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="format-card-title">{opt.title}</h3>
                </div>

                <div className="format-spec-box">
                  <span className="format-spec-label font-spec">FORMAT</span>
                  <p className="format-spec-val">{opt.spec}</p>
                </div>

                <div className="format-best-for">
                  <span className="format-best-label font-spec">TYPICAL USE</span>
                  <p className="format-best-val">{opt.bestFor}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Short Discussion Action Strip */}
        <div className="private-label-capabilities-box" style={{ marginTop: 'var(--space-6)' }}>
          <div className="private-label-capabilities-left">
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', margin: '0 0 6px 0' }}>
              Discuss Your Packaging Requirements
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              From standard 25kg export sacks to retail-ready formats, we work from your target market and packaging specifications.
            </p>
          </div>

          <div className="private-label-capabilities-right">
            <button 
              type="button"
              onClick={handleActionClick}
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
