import React from 'react';
import { Package, Flame, Sparkles, Layers, Sliders, Ship, ArrowRight } from 'lucide-react';

export interface RequirementRouterProps {
  onSelectRequirement?: (requirementType: string, defaultGrade?: string) => void;
}

export const RequirementRouter: React.FC<RequirementRouterProps> = ({ onSelectRequirement }) => {
  const routerItems = [
    {
      id: 'bulk-tea',
      category: 'Bulk Export Supply',
      title: 'Bulk Tea Supply',
      spec: '25kg Kraft Sacks',
      icon: Package,
      desc: 'Standardized 25kg multi-wall kraft paper sacks with food-grade virgin LDPE liners. Ideal for blenders, tea packers, and commercial re-baggers.',
      actionText: 'Configure Bulk Supply',
      defaultType: 'Bulk Tea for Repacking',
      defaultGrade: 'BOP',
    },
    {
      id: 'assam-ctc',
      category: 'Single-Origin Tea',
      title: 'Assam CTC Black Tea',
      spec: 'Brisk & Robust Cup',
      icon: Flame,
      desc: 'Deep amber-red liquor, full body, and sharp briskness with high milk reactivity. The commercial foundation for Karak chai, breakfast blends, and catering.',
      actionText: 'Explore Assam CTC',
      defaultType: 'Assam CTC',
      defaultGrade: 'BOPSM',
    },
    {
      id: 'orthodox',
      category: 'Specialty & Aromatic',
      title: 'Orthodox & Specialty',
      spec: 'Whole & Broken Leaf',
      icon: Sparkles,
      desc: 'Carefully sorted orthodox grades (TGFOP, FBOP, BOP) with bright golden infusions, floral bouquets, and complex aromatic sweetness for premium tea lines.',
      actionText: 'Explore Orthodox Teas',
      defaultType: 'Orthodox',
      defaultGrade: 'BOP',
    },
    {
      id: 'private-label',
      category: 'Turnkey Contract Packing',
      title: 'Private Label & OEM',
      spec: 'Custom Branding',
      icon: Layers,
      desc: 'End-to-end custom blend formulation, packaging development, and destination-compliant labeling for overseas supermarkets and retail brands.',
      actionText: 'Configure Private Label',
      defaultType: 'Private Label Retail Product',
      defaultGrade: 'Custom',
    },
    {
      id: 'specific-grade',
      category: 'Precision Sourcing',
      title: 'Specific Grade / Specification',
      spec: 'Target Mesh & Cup',
      icon: Sliders,
      desc: 'Supply matched to your physical benchmark sample, exact particle mesh size, liquor density, or strict destination laboratory criteria (GSO 978 / ISO).',
      actionText: 'Match Custom Specification',
      defaultType: 'Custom Specification',
      defaultGrade: 'BOP',
    },
    {
      id: 'export-supply',
      category: 'International Delivery',
      title: 'Export Supply & Freight',
      spec: 'FOB / CIF Jebel Ali & GCC',
      icon: Ship,
      desc: 'Containerized (FCL) or palletized LCL shipments to major global ports with complete shipping documentation, Phytosanitary, and Certificate of Origin.',
      actionText: 'Request Export Quotation',
      defaultType: 'Bulk Tea for Repacking',
      defaultGrade: 'PF',
    },
  ];

  const handleCardClick = (item: typeof routerItems[0]) => {
    if (onSelectRequirement) {
      onSelectRequirement(item.defaultType, item.defaultGrade);
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
    <section id="what-we-do" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto var(--space-12)' }}>
          <span className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            BUYER REQUIREMENT ROUTER
          </span>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>
            What Are You Looking For?
          </h2>
          <p className="lead">
            Select your operational requirement to discover how SHIVOM GLOBAL structures supply, 
            packaging, and commercial execution for your commercial business model.
          </p>
        </div>

        {/* 6-Card Interactive Router Grid */}
        <div className="grid grid-cols-3">
          {routerItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                className="card card-interactive"
                onClick={() => handleCardClick(item)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  {/* Top Metadata Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <div style={{ 
                      padding: '8px', 
                      backgroundColor: 'rgba(13, 56, 41, 0.06)', 
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-primary-green)',
                      display: 'inline-flex',
                    }}>
                      <IconComponent size={22} />
                    </div>
                    <span className="spec-badge" style={{ fontSize: '0.75rem' }}>
                      {item.spec}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 'var(--space-1)' }}>
                    {item.category}
                  </div>

                  {/* Title & Description */}
                  <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>
                    {item.title}
                  </h3>
                  <div className="card-body" style={{ padding: 0 }}>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 'var(--leading-relaxed)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div style={{ 
                  marginTop: 'var(--space-6)', 
                  paddingTop: 'var(--space-3)', 
                  borderTop: '1px solid var(--border-subtle)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: 'var(--color-primary-green)' 
                }}>
                  <span>{item.actionText}</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
