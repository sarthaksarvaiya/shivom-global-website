import React from 'react';
import { 
  Package, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Search, 
  Sliders, 
  CheckCircle2, 
  Truck,
  Ship,
  Anchor,
  MapPin
} from 'lucide-react';

export interface PrivateLabelSectionProps {
  onStartPrivateLabel?: (formatTitle?: string, packagingFormat?: string) => void;
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
      packagingFormat: 'Standard Bulk Export Sacks',
      spec: 'Multi-wall paper sacks (25kg – 55kg) or woven sacks lined with food-grade LDPE, tailored to destination port and handling facilities.',
      features: [
        'Standard export palletization and container stuffing coordinated for ocean freight',
        'Export stenciling, garden marks, net/gross weights, and batch traceability codes',
        'Moisture barrier protection structured for tropical and long-transit ocean voyages',
      ],
      moq: 'Quantities discussed on requirement',
      bestFor: 'Blenders, commercial repackers, and wholesale tea distributors.',
      icon: Package,
    },
    {
      id: 'custom-packing',
      badge: 'CUSTOM BULK OPTIONS',
      title: 'Custom Bulk Packing',
      subtitle: 'Flexible Container Packaging',
      packagingFormat: 'Heavy-duty Woven Sacks',
      spec: 'Heavy-duty woven polypropylene or reinforced multi-ply sacks structured around buyer warehouse handling specifications.',
      features: [
        'Packaging construction matched to destination handling and mechanical discharge',
        'Tare weights and bag sizing structured around buyer handling facilities',
        'Multi-grade consolidation and destination shipping marks per container',
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
      packagingFormat: 'Retail Stand-up Pouches',
      spec: 'Stand-up zipper pouches (100g – 1kg), metal tin canisters, or tagged pyramid tea bags coordinated via commercial packing partners.',
      features: [
        'Retail packaging coordinated through vetted third-party commercial packing units',
        'Buyer branding, bilingual labeling, and barcode application per destination regulations',
        'Trial packaging runs discussed subject to co-packer minimum batch requirements',
      ],
      moq: 'Trial batches discussed on requirement',
      bestFor: 'Supermarket retail brands, hospitality private labels, and brand creators.',
      icon: Sparkles,
    },
  ];

  const containerSpecs = [
    {
      id: 'fcl-20',
      badge: 'STANDARD 20FT FCL',
      title: '1x20ft Full Container Load',
      capacity: '~10–12 Metric Tons (MT)',
      sacksCount: '220 – 240 Standard Export Sacks',
      stuffingMethod: 'Floor-stuffed with heavy kraft liners & dunnage bags, or 10 ISPM-15 export pallets',
      bestFor: 'Single-origin garden invoices, regional tea wholesalers, and custom blend importers.',
      icon: Ship,
    },
    {
      id: 'fcl-40',
      badge: 'HIGH-VOLUME 40FT HC',
      title: '1x40ft High Cube Container',
      capacity: '~22–24 Metric Tons (MT)',
      sacksCount: '440 – 480 Standard Export Sacks',
      stuffingMethod: 'High-density loading with container desiccant poles & moisture-barrier ceiling protection',
      bestFor: 'Commercial packaging factories, Karak chai blenders, and supermarket private-label programs.',
      icon: Layers,
    },
    {
      id: 'lcl-trial',
      badge: 'LCL TRIAL BATCH',
      title: 'LCL Consolidated Consignment',
      capacity: '1 – 5 Metric Tons (MT)',
      sacksCount: '20 – 100 Multi-Wall Sacks on Pallets',
      stuffingMethod: 'Fumigated heat-treated timber pallets (ISPM-15), reinforced edge guards & stretch wrap',
      bestFor: 'Initial trial consignments, specialty Darjeeling invoices, and new market formulation testing.',
      icon: Package,
    },
  ];

  const transitRoutes = [
    {
      origin: 'Mundra Port / Kandla (Gujarat)',
      destination: 'Port Jebel Ali (Dubai)',
      region: 'United Arab Emirates & GCC',
      transitTime: '3 – 5 Days',
      frequency: 'Daily / Weekly Direct Feeders',
    },
    {
      origin: 'Mundra Port (Gujarat)',
      destination: 'Dammam / Jeddah Port',
      region: 'Kingdom of Saudi Arabia',
      transitTime: '6 – 8 Days',
      frequency: 'Direct Gulf Liner Services',
    },
    {
      origin: 'Mundra Port (Gujarat)',
      destination: 'Felixstowe / Rotterdam / Hamburg',
      region: 'United Kingdom & Northern Europe',
      transitTime: '18 – 22 Days',
      frequency: 'Scheduled Direct Ocean Liners',
    },
    {
      origin: 'Mundra Port (Gujarat)',
      destination: 'Alexandria / Port Said',
      region: 'Egypt & North Africa',
      transitTime: '12 – 15 Days',
      frequency: 'Direct Mediterranean Feeders',
    },
    {
      origin: 'Kolkata Port (West Bengal)',
      destination: 'Singapore / Port Klang',
      region: 'Southeast Asia Trade Hubs',
      transitTime: '7 – 10 Days',
      frequency: 'Direct Bay of Bengal Lines',
    },
  ];

  const coordinationSteps = [
    {
      num: '01',
      title: 'Tea Sourcing & Cupping',
      focus: 'DIRECT ESTATE CAPABILITY',
      desc: 'We source targeted tea grades—Assam CTC, Orthodox, Darjeeling, or Green Tea—directly through auction channels and vetted garden relationships to your exact cup profile.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Packaging Specification',
      focus: 'PARTNER SOURCING',
      desc: 'We align on packaging formats (pouches, tins, multi-wall sacks, or pyramid tea bags) with qualified packaging converters to match destination market regulations.',
      icon: Sliders,
    },
    {
      num: '03',
      title: 'Counter-Sample Evaluation',
      focus: 'BUYER VERIFICATION',
      desc: 'Pre-shipment counter-samples and packaging mockups are dispatched for your physical organoleptic evaluation and approval before commercial packing commences.',
      icon: CheckCircle2,
    },
    {
      num: '04',
      title: 'Contract Packing & Export',
      focus: 'COORDINATED DISPATCH',
      desc: 'Contract packing is executed with specialized packing units, followed by palletization, container loading, and standard export documentation to your destination port.',
      icon: Truck,
    },
  ];

  const handleActionClick = (formatTitle?: string, packagingFormat?: string) => {
    if (onStartPrivateLabel) {
      onStartPrivateLabel(formatTitle, packagingFormat);
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
        
        {/* 1. Editorial Introduction & Photographic Showcase */}
        <div className="private-label-showcase">
          <div className="private-label-showcase-copy">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
              PACKING &amp; PRIVATE LABEL SUPPORT
            </div>
            <h2 id="private-label-heading" className="private-label-title">
              Private Label &amp; Contract Packaging Support
            </h2>
            <p className="private-label-lead">
              We coordinate custom retail packaging and bulk container programs for international tea brands, supermarket labels, and foodservice operators through vetted commercial packing partners.
            </p>
            <p className="private-label-subtext">
              From origin leaf selection across Assam and Darjeeling to destination-compliant pouches, tins, and pyramid tea bags, our trade desk manages specification alignment, counter-sample evaluation, and export logistics.
            </p>

            <div className="private-label-quote-box">
              <span className="private-label-quote-sub font-spec">
                COMMERCIAL COORDINATION MODEL
              </span>
              <p className="private-label-quote-text">
                "All private-label packaging and contract packing operations are coordinated through specialized third-party commercial packaging units, structured to your market regulations and subject to run feasibility."
              </p>
            </div>
          </div>

          <div className="private-label-visual-card">
            <img 
              src="/images/private-label-packaging.jpg" 
              alt="Sample private label tea packaging showing matte forest green stand-up pouch, tin canister, pyramid tea bags, and cupped tea liquor on timber table"
              className="private-label-image"
              width="1200"
              height="800"
            />
            <div className="private-label-image-caption">
              <span className="private-label-caption-badge font-spec">PACKAGING EXAMPLES</span>
              <span className="private-label-caption-text">
                Stand-up pouches, tins &amp; tea bags coordinated via commercial packing partners
              </span>
            </div>
          </div>
        </div>

        {/* 2. Supported Packaging Formats (3 Cards) */}
        <div className="private-label-formats-block">
          <div className="private-label-subtitle-wrap">
            <h3 className="private-label-subheading">
              Supported Packaging Formats &amp; Specifications
            </h3>
            <p className="private-label-subintro">
              Whether you require standard bulk multi-wall paper sacks for repacking or shelf-ready consumer formats, packaging configurations are coordinated to buyer requirements.
            </p>
          </div>

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
                    <h4 className="format-card-title">{opt.title}</h4>
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
                      onClick={() => handleActionClick(opt.title, opt.packagingFormat)}
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
        </div>

        {/* 3. Ocean Logistics, Container Stuffing & Transit Benchmarks (Option 2) */}
        <div className="private-label-logistics-block">
          <div className="private-label-subtitle-wrap">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-2)' }}>
              OCEAN LOGISTICS &amp; CONTAINER METRICS
            </div>
            <h3 className="private-label-subheading">
              Container Loading Capacities &amp; Ocean Transit Benchmarks
            </h3>
            <p className="private-label-subintro">
              Direct ocean freight from India's premier export gateways with calibrated multi-wall barrier packaging to preserve dry leaf aromatics, moisture content (&le; 8%), and cup briskness across tropical voyages.
            </p>
          </div>

          {/* Container Capacities Grid */}
          <div className="container-specs-grid" role="list" aria-label="Container Loading Specifications">
            {containerSpecs.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.id} className="container-spec-card" role="listitem">
                  <div className="container-spec-top">
                    <span className="container-spec-badge font-spec">{c.badge}</span>
                    <div className="container-spec-icon-box" aria-hidden="true">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h4 className="container-spec-title">{c.title}</h4>

                  <div className="container-spec-metric-row">
                    <div className="container-metric-item">
                      <span className="container-metric-label font-spec">NET WEIGHT SCOPE</span>
                      <strong className="container-metric-val font-spec">{c.capacity}</strong>
                    </div>
                    <div className="container-metric-item">
                      <span className="container-metric-label font-spec">SACKS STUFFING</span>
                      <strong className="container-metric-val font-spec">{c.sacksCount}</strong>
                    </div>
                  </div>

                  <div className="container-spec-handling">
                    <span className="container-handling-label font-spec">STUFFING &amp; HANDLING</span>
                    <p className="container-handling-val">{c.stuffingMethod}</p>
                  </div>

                  <div className="container-spec-best">
                    <span className="container-best-label font-spec">RECOMMENDED FOR</span>
                    <p className="container-best-val">{c.bestFor}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ocean Transit Matrix Table Card */}
          <div className="transit-matrix-card">
            <div className="transit-matrix-header">
              <div className="transit-matrix-title-wrap">
                <div className="transit-matrix-icon-pill" aria-hidden="true">
                  <Anchor size={18} />
                </div>
                <div>
                  <h4 className="transit-matrix-title">Strategic Export Gateways &amp; Ocean Transit Times</h4>
                  <p className="transit-matrix-sub">Indicative port-to-port ocean transit from primary Indian maritime hubs</p>
                </div>
              </div>
              <span className="transit-matrix-tag font-spec">INCOTERMS 2020: FOB &amp; CIF</span>
            </div>

            <div className="transit-table-wrapper">
              <table className="transit-table" aria-label="Port Transit Times and Frequencies">
                <thead>
                  <tr>
                    <th scope="col">Origin Dispatch Port</th>
                    <th scope="col">Destination Port</th>
                    <th scope="col">Destination Region</th>
                    <th scope="col">Est. Ocean Transit</th>
                    <th scope="col">Sailing Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {transitRoutes.map((route, rIdx) => (
                    <tr key={rIdx}>
                      <td className="font-spec origin-cell">
                        <MapPin size={13} className="table-pin-icon" aria-hidden="true" />
                        <span>{route.origin}</span>
                      </td>
                      <td className="dest-port-cell">
                        <strong>{route.destination}</strong>
                      </td>
                      <td className="region-cell">{route.region}</td>
                      <td className="transit-time-cell">
                        <span className="transit-time-pill font-spec">{route.transitTime}</span>
                      </td>
                      <td className="frequency-cell font-spec">{route.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quality & Quarantine Protection Footer */}
            <div className="transit-protection-footer font-spec">
              <div className="protection-item">
                <ShieldCheck size={15} className="protection-icon" aria-hidden="true" />
                <span><strong>Moisture Preservation:</strong> Multi-wall kraft paper + food-grade LDPE liner guarantees destination moisture &le; 8%.</span>
              </div>
              <div className="protection-item">
                <Check size={15} className="protection-icon" aria-hidden="true" />
                <span><strong>Phytosanitary &amp; Fumigation:</strong> Full statutory export quarantine clearance and container fumigation included.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 4-Stage Coordination Workflow */}
        <div className="private-label-workflow-block">
          <div className="private-label-subtitle-wrap">
            <h3 className="private-label-subheading">
              How We Coordinate Your Private Label Program
            </h3>
            <p className="private-label-subintro">
              A transparent, 4-stage coordination model ensuring product integrity from tea garden selection to destination port arrival.
            </p>
          </div>

          <div className="private-label-steps-grid" role="list">
            {coordinationSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="private-label-step-card" role="listitem">
                  <div className="private-label-step-header">
                    <span className="private-label-step-num font-spec">{step.num}</span>
                    <div className="private-label-step-icon-wrap" aria-hidden="true">
                      <StepIcon size={18} />
                    </div>
                  </div>
                  <h4 className="private-label-step-title">{step.title}</h4>
                  <span className="private-label-step-focus font-spec">{step.focus}</span>
                  <p className="private-label-step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <p className="private-label-workflow-disclaimer font-spec">
            * SHIVOM GLOBAL coordinates procurement and contract packing through specialized third-party facilities. Turnaround times and minimum order runs vary by packaging format and are confirmed upon requirement review.
          </p>
        </div>

        {/* 4. Commercial Inquiry CTA Banner */}
        <div className="private-label-capabilities-box">
          <div className="private-label-capabilities-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
              <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-inverse)', margin: 0 }}>
                Discuss Your Destination Packaging &amp; Labeling Needs
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(var(--primitive-white-rgb), var(--alpha-85))', lineHeight: 1.5 }}>
              Whether you require standard bulk export packaging or custom private-label retail packing, our trade desk can coordinate packaging specifications, counter-samples, and trade terms based on your requirement.
            </p>
          </div>

          <div className="private-label-capabilities-right">
            <button 
              type="button"
              onClick={() => handleActionClick()}
              className="btn btn-primary"
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
