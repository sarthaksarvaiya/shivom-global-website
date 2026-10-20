import React from 'react';
import { 
  FileText, 
  Search, 
  Coffee, 
  FileCheck, 
  PackageCheck, 
  Ship
} from 'lucide-react';

export const ExportProcessFlow: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Requirement & Spec Intake',
      icon: FileText,
      description: 'You share your preferred origin, tea cut, mesh size, required volume, target destination port, and target pricing.',
      output: 'Technical availability & commercial indication in 24h',
    },
    {
      step: '02',
      title: 'Origin Sourcing & Lot Selection',
      icon: Search,
      description: 'We evaluate fresh garden lots and auction catalogues across Assam and North India to locate matching harvest batches.',
      output: 'Vetted estate lot identification & freshness check',
    },
    {
      step: '03',
      title: 'Sample Dispatch & Cupping',
      icon: Coffee,
      description: 'Physical counter-samples are dispatched via express international courier for your organoleptic cupping and laboratory testing.',
      output: 'Buyer sensory sign-off & physical specification match',
    },
    {
      step: '04',
      title: 'Proforma & Commercial Terms',
      icon: FileCheck,
      description: 'Formal Proforma Invoice issued detailing exact FOB/CIF pricing, lead times, packing specifications, and agreed milestones.',
      output: 'Locked commercial contract & production schedule',
    },
    {
      step: '05',
      title: 'Export Packing & Documentation',
      icon: PackageCheck,
      description: 'Packed in 25kg multi-wall kraft paper sacks with food-grade LDPE moisture liners. Full regulatory export certificates issued.',
      output: 'Certificate of Origin, Phytosanitary & Target Testing',
    },
    {
      step: '06',
      title: 'Port Dispatch & Clearance Support',
      icon: Ship,
      description: 'Cargo dispatched via sea freight (FCL/LCL). Full shipping document set surrendered/delivered for destination clearance.',
      output: 'Bill of Lading & port clearance assistance',
    },
  ];

  return (
    <section 
      id="how-we-work" 
      className="section section-dark"
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: 'var(--text-inverse)',
        borderTop: '1px solid var(--border-dark-subtle)',
        borderBottom: '1px solid var(--border-dark-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-12)' }}>
          <span className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            TRANSPARENT SOURCING ROADMAP
          </span>
          <h2 style={{ color: 'var(--text-inverse)', marginBottom: 'var(--space-4)' }}>
            How We Work: From Specification to Port
          </h2>
          <p className="lead" style={{ color: 'var(--text-inverse-muted)' }}>
            A disciplined 6-stage commercial sequence ensuring zero quality ambiguity, 
            verified pre-shipment sampling, and compliant export execution.
          </p>
        </div>

        {/* 6-Step Workflow Grid (Refined Dark Context) */}
        <div className="grid grid-cols-3" style={{ gap: 'var(--space-6)' }}>
          {steps.map((item) => {
            const IconComp = item.icon;
            return (
              <div 
                key={item.step} 
                className="card"
                style={{
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-dark-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-inverse)',
                  height: '100%',
                  transition: 'border-color var(--transition-fast)',
                }}
              >
                <div>
                  {/* Step Number & Icon Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <div style={{
                      padding: '10px',
                      backgroundColor: 'rgba(197, 155, 39, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-accent-gold)',
                      display: 'inline-flex',
                    }}>
                      <IconComp size={22} />
                    </div>
                    <span 
                      className="font-spec" 
                      style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 800, 
                        color: 'var(--color-accent-gold)',
                        opacity: 0.95
                      }}
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="card-title" style={{ fontSize: '1.1875rem', marginBottom: 'var(--space-2)', color: 'var(--text-inverse)' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.9375rem', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)', color: 'var(--text-inverse-muted)' }}>
                    {item.description}
                  </p>
                </div>

                {/* Milestone Output Badge */}
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.07)', 
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  marginTop: 'var(--space-4)',
                }}>
                  <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-accent-gold)', fontWeight: 700, letterSpacing: '0.04em' }}>
                    Stage Deliverable:
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--text-inverse)' }}>
                    {item.output}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Process Guarantee Banner */}
        <div style={{ 
          marginTop: 'var(--space-12)', 
          textAlign: 'center', 
          padding: 'var(--space-6)', 
          backgroundColor: 'rgba(255, 255, 255, 0.04)', 
          border: '1px solid rgba(197, 155, 39, 0.35)',
          borderRadius: 'var(--radius-md)'
        }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-inverse)', margin: 0 }}>
            <strong style={{ color: 'var(--color-accent-gold)' }}>Our Binding Operating Rule:</strong> We never ship speculative warehouse stock. 
            Every order is sourced fresh against your explicit technical specifications and pre-approved counter-samples.
          </p>
        </div>

      </div>
    </section>
  );
};
