import React from 'react';
import { 
  Globe, 
  Layers, 
  PackageCheck, 
  Coffee, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

export interface WhoWeServeSectionProps {
  onSelectSegment?: (requirementType: string) => void;
  onSubmitRequirement?: () => void;
}

interface BuyerSegmentItem {
  id: string;
  num: string;
  title: string;
  tag: string;
  description: string;
  needs: string[];
  formPreset: string;
  icon: LucideIcon;
  gridSpanClass: string;
}

export const WhoWeServeSection: React.FC<WhoWeServeSectionProps> = ({
  onSelectSegment,
  onSubmitRequirement,
}) => {
  // 5 Commercial Buyer Archetypes (strictly segmented, zero customer fabrication)
  const segments: BuyerSegmentItem[] = [
    {
      id: 'importers-traders',
      num: '01',
      title: 'Tea Importers & Traders',
      tag: 'Import & Redistribution',
      description: 'For businesses sourcing Indian tea for international import, regional redistribution, blending, or commercial resale.',
      needs: [
        'Commercial standard grades (BOP, BOPSM, BP, PF, PD, Dust)',
        '25kg multi-wall kraft paper sacks with food-grade LDPE liner',
        'Specification matching aligned to destination import standards',
        'Export trade documentation (BL, Phytosanitary, Certificate of Origin)',
      ],
      formPreset: 'Bulk Tea for Repacking',
      icon: Globe,
      gridSpanClass: 'segment-card-span-2',
    },
    {
      id: 'blenders-manufacturers',
      num: '02',
      title: 'Tea Blenders & Manufacturers',
      tag: 'Industrial Blending & Processing',
      description: 'For buyers requiring specific tea inputs for commercial blending, flavor infusion, or branded pack production.',
      needs: [
        'Specification-led sourcing matched to target counter-samples',
        'Organoleptic cup liquor, briskness, color depth & malty body',
        'Consistent particle size distribution & mesh cut profiles',
        'Pre-shipment sample verification prior to commercial lot dispatch',
      ],
      formPreset: 'Custom Specification',
      icon: Layers,
      gridSpanClass: 'segment-card-span-2',
    },
    {
      id: 'private-label-retail',
      num: '03',
      title: 'Private-Label & Retail Brands',
      tag: 'Brand Packaging & OEM',
      description: 'For retail brands and distributors looking to source Indian tea and coordinate supply for their own branded product lines.',
      needs: [
        'Single-origin Assam CTC, Orthodox or Darjeeling tea selection',
        'Retail packaging formats (pouches, tins, cartons, tea bags)',
        'Consumer-ready barrier specs coordinated with packing partners',
        'Bilingual compliance & regulatory artwork coordination',
      ],
      formPreset: 'Private Label Retail Product',
      icon: PackageCheck,
      gridSpanClass: 'segment-card-span-2',
    },
    {
      id: 'foodservice-hospitality',
      num: '04',
      title: 'Foodservice & Hospitality',
      tag: 'Hospitality & Commercial Catering',
      description: 'For hotels, restaurants, café chains, caterers, and institutional tea programs requiring high-yield commercial tea formats.',
      needs: [
        'High-strength, high-reactivity grades optimized for Karak & Chai',
        'High-yield commercial foodservice bulk pack formats',
        'Rapid color extraction and strong liquor profile in milk blends',
        'Scheduled commercial repeat supply coordination',
      ],
      formPreset: 'Assam CTC',
      icon: Coffee,
      gridSpanClass: 'segment-card-span-3',
    },
    {
      id: 'distributors-wholesalers',
      num: '05',
      title: 'Distributors & Regional Wholesalers',
      tag: 'Wholesale & Downstream Supply',
      description: 'For distributors and regional wholesalers sourcing Indian tea for downstream retail networks and commercial clients.',
      needs: [
        'Versatile portfolio across primary commercial leaf & dust grades',
        'Palletized containerized ocean freight via Mundra Port',
        'Target destination customs and import compliance (e.g. GCC/GSO)',
        'Full statutory export certification and laboratory COA clearance',
      ],
      formPreset: 'Bulk Tea for Repacking',
      icon: Truck,
      gridSpanClass: 'segment-card-span-3',
    },
  ];

  const handleSegmentClick = (formPreset: string) => {
    if (onSelectSegment) {
      onSelectSegment(formPreset);
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

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onSubmitRequirement) {
      onSubmitRequirement();
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
      id="who-we-serve" 
      className="who-we-serve-section" 
      aria-labelledby="who-we-serve-heading"
    >
      <div className="container">
        
        {/* --- Section Header --- */}
        <div className="who-we-serve-header">
          <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            WHO WE SERVE
          </div>
          <h2 id="who-we-serve-heading" className="who-we-serve-title">
            Built for Commercial Tea Buyers
          </h2>
          <p className="who-we-serve-lead">
            From importers and blenders to private-label brands and foodservice businesses, we source Indian tea around the specification, application and commercial requirements of the buyer.
          </p>
        </div>

        {/* --- 5-Segment Balanced Card Grid (3 Top + 2 Bottom) --- */}
        <div className="who-we-serve-grid">
          {segments.map((seg) => {
            const Icon = seg.icon;
            return (
              <div 
                key={seg.id} 
                className={`who-we-serve-card ${seg.gridSpanClass}`}
                onClick={() => handleSegmentClick(seg.formPreset)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSegmentClick(seg.formPreset);
                  }
                }}
                aria-label={`View requirements for ${seg.title}`}
              >
                {/* Card Top: Number Watermark & Icon */}
                <div className="who-we-serve-card-top">
                  <div className="who-we-serve-icon-wrap" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <div className="who-we-serve-card-meta">
                    <span className="who-we-serve-num font-spec">{seg.num}</span>
                    <span className="who-we-serve-tag font-spec">{seg.tag}</span>
                  </div>
                </div>

                {/* Card Title & Description */}
                <h3 className="who-we-serve-card-title">
                  {seg.title}
                </h3>
                <p className="who-we-serve-card-desc">
                  {seg.description}
                </p>

                {/* Typical Requirements List */}
                <div className="who-we-serve-needs-box">
                  <span className="who-we-serve-needs-label font-spec">
                    TYPICAL REQUIREMENTS
                  </span>
                  <div className="who-we-serve-needs-list">
                    {seg.needs.map((item, idx) => (
                      <div key={idx} className="who-we-serve-need-item">
                        <CheckCircle2 size={14} className="who-we-serve-check-icon" aria-hidden="true" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="who-we-serve-card-action">
                  <span>Match Your Requirement</span>
                  <ChevronRight size={14} className="who-we-serve-arrow" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Buyer-First Principle Statement Banner --- */}
        <div className="who-we-serve-banner">
          <div className="who-we-serve-banner-content">
            <div className="who-we-serve-banner-badge">
              <SlidersHorizontal size={15} aria-hidden="true" />
              <span>BUYER-SPECIFIC COORDINATION</span>
            </div>
            <h3 className="who-we-serve-banner-title">
              Different buyers. Different specifications.
            </h3>
            <p className="who-we-serve-banner-body">
              We start with the requirement — tea category, grade, application, packing, quantity and destination — then coordinate sourcing around the commercial need.
            </p>
            <div className="who-we-serve-banner-footprint font-spec">
              Buyer-First, Inventory-Last • Sourced Around Your Market's Requirement
            </div>
          </div>

          <div className="who-we-serve-banner-action">
            <a 
              href="#requirement-form" 
              className="btn btn-primary btn-gold"
              onClick={handleCtaClick}
              id="btn-who-we-serve-cta"
            >
              <span>Submit Your Commercial Requirement</span>
              <ArrowRight size={16} style={{ marginLeft: '8px' }} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
