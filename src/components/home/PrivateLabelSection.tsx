import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Coffee, 
  PackageCheck, 
  SlidersHorizontal,
  ShieldCheck,
  LucideIcon
} from 'lucide-react';

export interface PrivateLabelSectionProps {
  onStartPrivateLabel?: () => void;
  onExploreCategories?: () => void;
}

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  focus: string;
  icon: LucideIcon;
}

interface PackagingFormat {
  title: string;
  subtitle: string;
  specs: string;
  bestFor: string;
}

export const PrivateLabelSection: React.FC<PrivateLabelSectionProps> = ({ 
  onStartPrivateLabel,
  onExploreCategories 
}) => {
  // 4-Stage Private Label Coordination Workflow
  const workflowSteps: WorkflowStep[] = [
    {
      step: '01',
      title: 'Tea Selection',
      focus: 'Origin & Grade Alignment',
      description: 'Select the Indian tea category (Assam CTC, Orthodox, Darjeeling, Specialty) and grade profile according to your target market, cup preference and commercial parameters.',
      icon: Coffee,
    },
    {
      step: '02',
      title: 'Specification & Sampling',
      focus: 'Counter-Sample Cupping',
      description: 'Align organoleptic liquor dynamics, particle size distribution, and statutory destination standards with counter-samples before commercial confirmation.',
      icon: SlidersHorizontal,
    },
    {
      step: '03',
      title: 'Packaging Coordination',
      focus: 'Vetted Packing Partners',
      description: 'Coordinate packaging format, barrier material specifications, and regulatory artwork requirements (including bilingual labeling) with qualified packing partners.',
      icon: PackageCheck,
    },
    {
      step: '04',
      title: 'Export & Dispatch',
      focus: 'Documentation & Logistics',
      description: 'Coordinate independent laboratory testing, Phytosanitary certification, Certificate of Origin, and export container dispatch for the confirmed order.',
      icon: ShieldCheck,
    },
  ];

  // Representative Packaging Formats (Non-fabricated options)
  const packagingFormats: PackagingFormat[] = [
    {
      title: 'Bulk Commercial Sacks',
      subtitle: 'Institutional & Repacking',
      specs: '25kg multi-wall kraft paper sacks with food-grade LDPE liner',
      bestFor: 'Importers, blenders & regional packing operations',
    },
    {
      title: 'Retail Stand-Up Pouches',
      subtitle: 'Consumer Shelf-Ready',
      specs: '100g, 250g, 500g, 1kg barrier pouches (matte, kraft, zip-lock)',
      bestFor: 'Supermarket retail, specialty tea brands & e-commerce',
    },
    {
      title: 'Tea Bags & Filter Packs',
      subtitle: 'Single & Double Chamber',
      specs: 'Standard envelope & tag, pyramid, or tagless filter formats',
      bestFor: 'High-convenience consumer packs & hospitality supply',
    },
    {
      title: 'Foodservice & Tins',
      subtitle: 'Hospitality & Specialty',
      specs: 'Large foodservice catering packs & specialty brushed metal tins',
      bestFor: 'Hotels, restaurant chains, cafes & premium gift lines',
    },
  ];

  // Informational Checklist: What the Buyer Provides
  const buyerChecklist = [
    'Target Market & Destination Country (e.g., UAE, GCC, UK, Europe)',
    'Tea Category & Preferred Grade (Assam CTC, Orthodox, Darjeeling, Specialty)',
    'Target Pack Format & Sizing (Pouches, Cartons, Tins, Tea Bags, or Bulk Sacks)',
    'Estimated Order Quantity (Trial batch or full container load)',
    'Artwork, Branding & Regulatory Requirements (e.g., bilingual English/Arabic labeling)',
  ];

  const handleActionClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
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

  const handleExploreCategoriesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onExploreCategories) {
      onExploreCategories();
    } else {
      const categoriesElement = document.getElementById('our-teas');
      if (categoriesElement) {
        const headerOffset = 80;
        const elementPosition = categoriesElement.getBoundingClientRect().top;
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
        
        {/* --- 1. Top Showcase: Editorial Pitch & Visual Prototype --- */}
        <div className="private-label-showcase">
          <div className="private-label-showcase-copy">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
              PRIVATE LABEL • OEM
            </div>

            <h2 id="private-label-heading" className="private-label-title">
              Build Your Tea Brand with Indian Tea Supply
            </h2>

            <p className="private-label-lead">
              Source Indian tea for your own brand, with commercial specifications, packaging requirements and supply coordination aligned to your market.
            </p>

            <p className="private-label-subtext">
              From tea selection and sampling to private-label packing coordination and export documentation, we work around your requirements. Coordinated through qualified supply and contract packing partners.
            </p>

            {/* Core Value Proposition Quote Banner */}
            <div className="private-label-quote-box">
              <span className="private-label-quote-text">
                &ldquo;Your brand. Your specification. Indian tea sourced and coordinated around your requirements.&rdquo;
              </span>
              <span className="private-label-quote-sub">
                B2B Sourcing & Coordination Partner • Anti-Fabrication Discipline
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="private-label-actions">
              <a 
                href="#requirement-form" 
                className="btn btn-primary btn-gold"
                onClick={handleActionClick}
                id="btn-start-private-label"
              >
                <span>Start a Private-Label Requirement</span>
                <ArrowRight size={16} style={{ marginLeft: '8px' }} aria-hidden="true" />
              </a>

              <a 
                href="#our-teas" 
                className="btn btn-secondary"
                onClick={handleExploreCategoriesClick}
                id="btn-pl-view-categories"
              >
                <span>Explore Tea Categories</span>
              </a>
            </div>
          </div>

          {/* Neutral Unbranded Visual Prototype */}
          <div className="private-label-visual-col">
            <div className="private-label-visual-card">
              <img 
                src="/images/private-label-packaging.jpg" 
                alt="Private Label tea packaging mockup showing dark green pouch with PRIVATE LABEL print, brushed metal canister and filter tea bags with loose Assam CTC tea sample"
                width={600}
                height={450}
                loading="lazy"
                className="private-label-image"
              />
              <div className="private-label-image-caption">
                <span className="private-label-caption-badge font-spec">OEM COORDINATION</span>
                <span className="private-label-caption-text">Private Label Mockup • Packaging arranged to buyer artwork & spec</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. Sourcing Distinction: Bulk Supply vs Private Label --- */}
        <div className="private-label-distinction-grid">
          <div className="private-label-distinction-card distinction-bulk">
            <div className="distinction-tag font-spec">BULK TEA SUPPLY</div>
            <h3 className="distinction-title">Commercial Bulk Supply</h3>
            <p className="distinction-desc">
              For tea importers, blenders, and regional packers who handle their own packaging facilities.
            </p>
            <div className="distinction-feature-list">
              <div className="distinction-feature-item">
                <CheckCircle2 size={16} className="distinction-check" aria-hidden="true" />
                <span>Standard 25kg multi-wall kraft paper sacks with food-grade poly-liner</span>
              </div>
              <div className="distinction-feature-item">
                <CheckCircle2 size={16} className="distinction-check" aria-hidden="true" />
                <span>Single-origin lots or standard commercial grade profiles (BOP, BOPSM, BP, PF, PD)</span>
              </div>
              <div className="distinction-feature-item">
                <CheckCircle2 size={16} className="distinction-check" aria-hidden="true" />
                <span>Containerized ocean dispatch via Mundra Port with full export documentation</span>
              </div>
            </div>
          </div>

          <div className="private-label-distinction-card distinction-oem">
            <div className="distinction-tag font-spec">PRIVATE LABEL / OEM</div>
            <h3 className="distinction-title">Your Brand Packaging</h3>
            <p className="distinction-desc">
              For brand owners, retailers, and foodservice operators who want shelf-ready finished goods.
            </p>
            <div className="distinction-feature-list">
              <div className="distinction-feature-item">
                <CheckCircle2 size={16} className="distinction-check gold" aria-hidden="true" />
                <span>Finished consumer packs: stand-up pouches, rigid tins, cartons or tea bags</span>
              </div>
              <div className="distinction-feature-item">
                <CheckCircle2 size={16} className="distinction-check gold" aria-hidden="true" />
                <span>Bilingual artwork coordination (e.g. Arabic/English GSO/ESMA standards)</span>
              </div>
              <div className="distinction-feature-item">
                <CheckCircle2 size={16} className="distinction-check gold" aria-hidden="true" />
                <span>Coordinated with qualified and vetted contract packing partners</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. 4-Stage Private Label Coordination Workflow --- */}
        <div className="private-label-workflow-block">
          <div className="private-label-subtitle-wrap">
            <div className="spec-badge spec-badge-green" style={{ marginBottom: 'var(--space-2)' }}>
              HOW PRIVATE LABEL WORKS
            </div>
            <h3 className="private-label-subheading">
              Four-Stage Private-Label Coordination
            </h3>
            <p className="private-label-subintro">
              A transparent, structured commercial process from initial origin selection to final export dispatch.
            </p>
          </div>

          <div className="private-label-steps-grid">
            {workflowSteps.map((st) => {
              const IconComp = st.icon;
              return (
                <div key={st.step} className="private-label-step-card">
                  <div className="private-label-step-header">
                    <span className="private-label-step-num font-spec">
                      {st.step}
                    </span>
                    <div className="private-label-step-icon-wrap" aria-hidden="true">
                      <IconComp size={18} />
                    </div>
                  </div>

                  <h4 className="private-label-step-title">
                    {st.title}
                  </h4>

                  <div className="private-label-step-focus font-spec">
                    {st.focus}
                  </div>

                  <p className="private-label-step-desc">
                    {st.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="private-label-workflow-disclaimer font-spec">
            * Note: All private-label arrangements are coordinated with qualified supply and packing partners, subject to product specification, packaging format and order parameters.
          </div>
        </div>

        {/* --- 4. Supported Packaging Formats --- */}
        <div className="private-label-formats-block">
          <div className="private-label-subtitle-wrap">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-2)' }}>
              PACKAGING FORMATS
            </div>
            <h3 className="private-label-subheading">
              Representative Packaging Options
            </h3>
            <p className="private-label-subintro">
              Representative examples arranged through packing partners. Formats, materials, and barrier properties are aligned to your product and market requirements.
            </p>
          </div>

          <div className="private-label-formats-grid">
            {packagingFormats.map((fmt) => (
              <div key={fmt.title} className="private-label-format-card">
                <div className="format-card-header">
                  <h4 className="format-card-title">{fmt.title}</h4>
                  <span className="format-card-subtitle">{fmt.subtitle}</span>
                </div>

                <div className="format-spec-box">
                  <span className="format-spec-label font-spec">REPRESENTATIVE SPEC</span>
                  <p className="format-spec-val">{fmt.specs}</p>
                </div>

                <div className="format-best-for">
                  <span className="format-best-label font-spec">TYPICAL APPLICATION</span>
                  <p className="format-best-val">{fmt.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 5. What the Buyer Can Provide Checklist & Direct CTA --- */}
        <div className="private-label-checklist-strip">
          <div className="checklist-left-col">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-2)' }}>
              PROJECT SCOPING
            </div>
            <h3 className="checklist-title">
              What to Share for a Private-Label Inquiry
            </h3>
            <p className="checklist-desc">
              To evaluate feasibility and coordinate with packing partners, sharing your target parameters helps our trade desk review your requirement accurately:
            </p>

            <div className="checklist-items-grid">
              {buyerChecklist.map((item, idx) => (
                <div key={idx} className="checklist-item">
                  <CheckCircle2 size={16} className="checklist-check-icon" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Action Box */}
          <div className="checklist-right-box">
            <div className="checklist-box-inner">
              <span className="checklist-box-badge font-spec">CONFIDENTIAL REVIEW</span>
              <h4 className="checklist-box-heading">
                Ready to Discuss Your Brand's Tea Supply?
              </h4>
              <p className="checklist-box-text">
                Submit your target parameters. Our trade desk evaluates tea origin options, packaging feasibility, and indicative lead times.
              </p>

              <button 
                onClick={handleActionClick}
                className="btn btn-primary btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
                id="btn-checklist-submit-requirement"
              >
                <span>Start a Private-Label Requirement</span>
                <ArrowRight size={16} style={{ marginLeft: '8px' }} aria-hidden="true" />
              </button>

              <div className="checklist-box-guarantee font-spec">
                Trade Desk Direct Review • Confidential Commercial Inquiry
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
