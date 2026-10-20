import React from 'react';
import { 
  Target, 
  FlaskConical, 
  PackageCheck, 
  FileCheck2, 
  Calculator, 
  UserCheck,
  ShieldAlert
} from 'lucide-react';

export const WhyShivomGlobal: React.FC = () => {
  const pillars = [
    {
      title: 'Requirement-Based Sourcing',
      category: 'Zero Speculative Stock',
      icon: Target,
      description: 'We do not push aging warehouse inventory onto buyers. Every shipment is freshly procured directly from primary Assam auctions and vetted estate partners to match your exact commercial order.',
    },
    {
      title: 'Strict Quality Parameters',
      category: 'Laboratory Verified',
      icon: FlaskConical,
      description: 'Pre-shipment batch testing for moisture (max 6.5%–7.0%), total ash, water-soluble ash, and GSO 978 / FSSAI pesticide residue limits conducted by accredited testing laboratories.',
    },
    {
      title: 'Export-Grade Packaging',
      category: 'Maritime Barrier Protection',
      icon: PackageCheck,
      description: 'Standard 25kg multi-wall kraft paper sacks with food-grade virgin LDPE moisture liners. Palletized, shrink-wrapped, and banded to prevent moisture ingress during humid ocean transits.',
    },
    {
      title: 'Complete Export Documentation',
      category: 'Seamless Customs Handover',
      icon: FileCheck2,
      description: 'Full statutory paperwork delivered promptly: Certificate of Origin, Phytosanitary Certificate, Commercial Invoice, Detailed Packing List, Bill of Lading, and Certificate of Analysis (COA).',
    },
    {
      title: 'Transparent Commercial Costing',
      category: 'FOB / CIF Clarity',
      icon: Calculator,
      description: 'Clear, uninflated commercial quotations detailing ex-factory tea costs, export packaging, testing certifications, and sea freight milestones to your discharging port.',
    },
    {
      title: 'Direct Founder Communication',
      category: 'Fast Decision-Making',
      icon: UserCheck,
      description: 'Direct collaboration with the founder. Rapid inquiry response times, transparent stock availability reports, and flexible commercial problem-solving without corporate bureaucracy.',
    },
  ];

  return (
    <section id="why-us" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-12)' }}>
          <span className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            COMMERCIAL INTEGRITY & DILIGENCE
          </span>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>
            Why International Buyers Work With Us
          </h2>
          <p className="lead">
            Built for commercial tea blenders, packers, and importers who demand specification accuracy, 
            verified testing, export-barrier packaging, and reliable execution.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-3" style={{ gap: 'var(--space-6)' }}>
          {pillars.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <div 
                key={pillar.title} 
                className="card card-interactive"
                style={{
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <div style={{
                      padding: '10px',
                      backgroundColor: 'rgba(13, 56, 41, 0.06)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-primary-green)',
                      display: 'inline-flex',
                    }}>
                      <IconComp size={22} />
                    </div>
                    <span className="spec-badge" style={{ fontSize: '0.75rem' }}>
                      {pillar.category}
                    </span>
                  </div>

                  <h3 className="card-title" style={{ fontSize: '1.1875rem', marginBottom: 'var(--space-2)' }}>
                    {pillar.title}
                  </h3>

                  <div className="card-body" style={{ padding: 0 }}>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 'var(--leading-relaxed)' }}>
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Governance Commitment Strip */}
        <div style={{ 
          marginTop: 'var(--space-12)',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-primary-dark)',
          color: 'var(--text-inverse)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(197, 155, 39, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--color-accent-gold)' }}>
              <ShieldAlert size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-inverse)' }}>
                Our Operating Standard: No Speculation, No Fake Claims
              </div>
              <div style={{ color: 'var(--text-inverse-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
                We do not invent garden capacities or show fake counters. Every lot is verifiable, authentic, and contract-backed.
              </div>
            </div>
          </div>
          <span className="spec-badge spec-badge-gold" style={{ fontSize: '0.8125rem' }}>
            DEC-001 & DEC-008 COMPLIANT
          </span>
        </div>

      </div>
    </section>
  );
};
