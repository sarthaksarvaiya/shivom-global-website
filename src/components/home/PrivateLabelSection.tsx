import React from 'react';
import { 
  Beaker, 
  Package, 
  FileCheck, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export interface PrivateLabelSectionProps {
  onStartPrivateLabel?: () => void;
}

export const PrivateLabelSection: React.FC<PrivateLabelSectionProps> = ({ onStartPrivateLabel }) => {
  const steps = [
    {
      num: '01',
      title: 'Blend Formulation & Counter-Sampling',
      icon: Beaker,
      desc: 'Send us your existing market benchmark sample or flavor target. Our team crafts matching blend iterations balanced for cup color, aroma, strength, and price point.',
    },
    {
      num: '02',
      title: 'Packaging Selection & Sizing',
      icon: Package,
      desc: 'Choose from food-service bulk packs, retail stand-up foil pouches with degassing valves, rigid metal tins, or tag-and-string tea bag formats through vetted contract packing partners.',
    },
    {
      num: '03',
      title: 'Bilingual Compliance & Artwork',
      icon: FileCheck,
      desc: 'Full support for destination food authority standards (e.g., UAE ESMA / GSO standards, English/Arabic regulatory typography, nutritional panels, and statutory batch numbering).',
    },
    {
      num: '04',
      title: 'Trial Run to Scalable Export',
      icon: TrendingUp,
      desc: 'Launch with controlled trial volumes to test market absorption, shelf life, and retail velocity before scaling to full 20ft container consignments.',
    },
  ];

  const packagingFormats = [
    { name: 'Bulk Food-Service Sacks', spec: '5 kg – 25 kg Multi-wall Kraft' },
    { name: 'Retail Stand-Up Pouches', spec: '100g, 250g, 500g, 1kg (Zip/Heat-sealed)' },
    { name: 'Consumer Tea Bags', spec: 'Single chamber / Pyramid (Envelope/Tag)' },
    { name: 'Specialty Metal Tins', spec: '50g – 250g Embossed Gift Tins' },
  ];

  const handleAction = () => {
    if (onStartPrivateLabel) {
      onStartPrivateLabel();
    }

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
  };

  return (
    <section id="private-label" className="section" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-12)' }}>
          <span className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            CONTRACT PACKING & BRAND SOLUTIONS
          </span>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>
            Private Label & Custom Blending Solutions
          </h2>
          <p className="lead">
            From custom taste formulation to retail packaging and export compliance. 
            We collaborate with vetted processing partners to deliver shelf-ready or food-service tea lines for international brands.
          </p>
        </div>

        {/* 4-Step OEM Journey Grid */}
        <div className="grid grid-cols-4" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
          {steps.map((st) => {
            const IconComp = st.icon;
            return (
              <div 
                key={st.num} 
                className="card"
                style={{
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <div style={{
                      padding: '8px',
                      backgroundColor: 'rgba(13, 56, 41, 0.06)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-primary-green)',
                      display: 'inline-flex',
                    }}>
                      <IconComp size={20} />
                    </div>
                    <span className="font-spec" style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-accent-gold)' }}>
                      {st.num}
                    </span>
                  </div>

                  <h3 className="card-title" style={{ fontSize: '1.0625rem', marginBottom: 'var(--space-2)' }}>
                    {st.title}
                  </h3>

                  <div className="card-body" style={{ padding: 0 }}>
                    <p style={{ fontSize: '0.875rem', lineHeight: 'var(--leading-relaxed)' }}>
                      {st.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Packaging Formats Available Strip */}
        <div className="card" style={{ padding: 'var(--space-8)', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }} className="grade-spotlight-grid">
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary-green)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 'var(--space-1)' }}>
                Packaging Versatility
              </div>
              <h3 style={{ fontSize: '1.375rem', marginBottom: 'var(--space-3)' }}>
                Supported Private Label Formats
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                Whether you need bulk master cartons for your local repacking facility or finished consumer-facing packages ready for supermarket shelves, we structure packaging to your exact commercial market.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {packagingFormats.map((fmt) => (
                  <div key={fmt.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <CheckCircle2 size={18} color="var(--color-accent-gold)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-main)' }}>{fmt.name}:</span>
                    <span className="font-spec" style={{ fontSize: '0.875rem', color: 'var(--color-primary-green)' }}>{fmt.spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Call to Action Module */}
            <div style={{ 
              backgroundColor: 'var(--color-primary-dark)', 
              color: 'var(--text-inverse)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
              <div>
                <span className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
                  TURNKEY PRIVATE LABEL PARTNERSHIP
                </span>
                <h4 style={{ color: 'var(--text-inverse)', fontSize: '1.25rem', marginBottom: 'var(--space-3)' }}>
                  Have an Existing Brand or New Tea Project?
                </h4>
                <p style={{ color: 'var(--text-inverse-muted)', fontSize: '0.9375rem', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                  Share your packaging specifications, brand vision, and expected volume. We coordinate counter-samples, carton layouts, and indicative production costs.
                </p>
              </div>

              <button 
                onClick={handleAction}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Discuss Private Label Project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
