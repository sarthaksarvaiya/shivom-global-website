import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Coffee, 
  PackageCheck, 
  Sparkles, 
  SlidersHorizontal,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

export interface AssamCtcSpotlightProps {
  onSubmitRequirement?: (grade?: string) => void;
  onViewAllCategories?: () => void;
  onSelectGrade?: (gradeCode: string) => void;
}

interface CtcGradeItem {
  code: string;
  name: string;
  particleProfile: string;
  representativeUse: string;
  liquorYield: string;
}

interface ApplicationItem {
  title: string;
  focusGrades: string;
  description: string;
  icon: LucideIcon;
}

export const AssamCtcSpotlight: React.FC<AssamCtcSpotlightProps> = ({
  onSubmitRequirement,
  onViewAllCategories,
  onSelectGrade,
}) => {
  // Core commercial CTC grades supported by verified project & trade data
  const ctcGrades: CtcGradeItem[] = [
    {
      code: 'BOP',
      name: 'Broken Orange Pekoe',
      particleProfile: 'Standard primary commercial cut',
      representativeUse: 'Strong commercial blends & full-bodied base packs',
      liquorYield: 'Rich amber-red liquor with deep malty backbone',
    },
    {
      code: 'BOPSM',
      name: 'BOP Small / Mixed',
      particleProfile: 'Smaller granular cut for fast extraction',
      representativeUse: 'High-color commercial blends & strong tea formulations',
      liquorYield: 'Quick color release & robust briskness in cup',
    },
    {
      code: 'BP',
      name: 'Broken Pekoe',
      particleProfile: 'Medium-bold granular grain profile',
      representativeUse: 'Uniform commercial blending backbone',
      liquorYield: 'Balanced cup strength, rounded body & clean finish',
    },
    {
      code: 'PF',
      name: 'Pekoe Fannings',
      particleProfile: 'Fine, even-cut fanning particles',
      representativeUse: 'Commercial tea bag manufacturing & instant infusion',
      liquorYield: 'High extraction efficiency and rapid infusion rate',
    },
    {
      code: 'PD',
      name: 'Pekoe Dust',
      particleProfile: 'Fine granular particle profile',
      representativeUse: 'High-strength milk tea (Karak / Chai) & commercial catering',
      liquorYield: 'Intense color development with strong milk reactivity',
    },
    {
      code: 'Dust',
      name: 'Commercial Dust',
      particleProfile: 'Highest density micro-granular cut',
      representativeUse: 'High-yield catering, foodservice & concentrated brews',
      liquorYield: 'Maximum liquor yield per kilogram with heavy cup density',
    },
  ];

  // Commercial applications supported by verified business positioning
  const applications: ApplicationItem[] = [
    {
      title: 'Tea Bags & Filter Packs',
      focusGrades: 'PF • PD',
      description: 'Fine-cut fannings and dust engineered for high extraction rates, rapid color release, and clean percolation through standard filter papers.',
      icon: Layers,
    },
    {
      title: 'Commercial Bulk Blending',
      focusGrades: 'BOP • BOPSM • BP',
      description: 'Uniform granular cuts selected to provide consistent density, robust malty aroma, and rich amber color foundation for proprietary tea blends.',
      icon: Coffee,
    },
    {
      title: 'Private Label Formulations',
      focusGrades: 'BOP • BOPSM • PF',
      description: 'Tailored grade selections packed in export-grade 25kg multi-wall barrier kraft sacks, coordinated for private brand repacking.',
      icon: PackageCheck,
    },
    {
      title: 'Foodservice & Karak Chai',
      focusGrades: 'PD • Dust • BOPSM',
      description: 'High-reactivity dust and small-cut grades formulated to withstand rolling boiling with milk and spices without losing astringency or color.',
      icon: Sparkles,
    },
  ];

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, gradeCode?: string) => {
    e.preventDefault();
    if (onSubmitRequirement) {
      onSubmitRequirement(gradeCode || 'BOP');
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

  const handleCategoriesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onViewAllCategories) {
      onViewAllCategories();
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

  const handleGradeSelect = (gradeCode: string) => {
    if (onSelectGrade) {
      onSelectGrade(gradeCode);
    } else if (onSubmitRequirement) {
      onSubmitRequirement(gradeCode);
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
      id="assam-ctc" 
      className="assam-ctc-section" 
      aria-labelledby="assam-ctc-heading"
    >
      <div className="container">
        
        {/* --- 1. Top Showcase: Copy & Authentic Visual --- */}
        <div className="assam-ctc-showcase">
          <div className="assam-ctc-showcase-copy">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
              ASSAM CTC
            </div>

            <h2 id="assam-ctc-heading" className="assam-ctc-title">
              Assam CTC Sourced to Your Commercial Specification
            </h2>

            <p className="assam-ctc-lead">
              Assam CTC is a core commercial tea category in our sourcing portfolio, with grades selected according to cup profile, application, volume and buyer specification.
            </p>

            <p className="assam-ctc-subtext">
              From strong blend components to tea-bag applications, we coordinate sourcing around the specification that matters to your market.
            </p>

            {/* Sourcing parameters bullet chips */}
            <div className="assam-ctc-params-list">
              <div className="assam-ctc-param-item">
                <CheckCircle2 size={16} className="assam-ctc-check-icon" aria-hidden="true" />
                <span><strong>Origin:</strong> Assam (Brahmaputra Valley)</span>
              </div>
              <div className="assam-ctc-param-item">
                <CheckCircle2 size={16} className="assam-ctc-check-icon" aria-hidden="true" />
                <span><strong>Standard Packaging:</strong> 25kg multi-wall kraft sack with food-grade poly-liner</span>
              </div>
              <div className="assam-ctc-param-item">
                <CheckCircle2 size={16} className="assam-ctc-check-icon" aria-hidden="true" />
                <span><strong>Process:</strong> Unblended Indian Crush, Tear, Curl (CTC) black tea</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="assam-ctc-actions">
              <a 
                href="#requirement-form" 
                className="btn btn-primary btn-gold"
                onClick={(e) => handleCtaClick(e, 'BOP')}
                id="btn-submit-assam-ctc"
              >
                <span>Submit Assam CTC Requirement</span>
                <ArrowRight size={16} style={{ marginLeft: '8px' }} aria-hidden="true" />
              </a>

              <a 
                href="#our-teas" 
                className="btn btn-secondary"
                onClick={handleCategoriesClick}
                id="btn-view-all-teas"
              >
                <span>View All Tea Categories</span>
              </a>
            </div>
          </div>

          {/* Authentic Visual Frame */}
          <div className="assam-ctc-visual-col">
            <div className="assam-ctc-visual-card">
              <img 
                src="/images/assam-ctc-spotlight.jpg" 
                alt="Authentic processed Assam CTC black tea granular texture with cupping bowl"
                width={600}
                height={450}
                loading="lazy"
                className="assam-ctc-image"
              />
              <div className="assam-ctc-image-caption">
                <span className="assam-ctc-caption-badge font-spec">COMMERCIAL SPEC</span>
                <span className="assam-ctc-caption-text">Authentic granular CTC cut • Sourced to buyer parameter</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. Buyer-First Statement Banner --- */}
        <div className="assam-ctc-buyer-first-banner">
          <div className="assam-ctc-banner-badge">
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span>BUYER-FIRST SOURCING PRINCIPLE</span>
          </div>
          <h3 className="assam-ctc-banner-title">
            The right grade depends on the requirement.
          </h3>
          <p className="assam-ctc-banner-body">
            We match sourcing to your required grade, cup profile, application, packing format and commercial parameters before moving to sampling and quotation.
          </p>
          <div className="assam-ctc-banner-footprint font-spec">
            Specification-Matched Sourcing • Lot Testing Prior to Dispatch
          </div>
        </div>

        {/* --- 3. Core CTC Commercial Grade Reference Cards --- */}
        <div className="assam-ctc-grades-block">
          <div className="assam-ctc-section-subtitle-wrap">
            <div className="spec-badge spec-badge-green" style={{ marginBottom: 'var(--space-2)' }}>
              CORE COMMERCIAL GRADES
            </div>
            <h3 className="assam-ctc-grades-heading">
              Commercial Grade Portfolio
            </h3>
            <p className="assam-ctc-grades-intro">
              Representative commercial references. Particle size distribution, cup strength, and bulk density are verified against buyer requirements during the quotation stage.
            </p>
          </div>

          <div className="assam-ctc-grades-grid">
            {ctcGrades.map((grade) => (
              <div 
                key={grade.code} 
                className="assam-ctc-grade-card"
                onClick={() => handleGradeSelect(grade.code)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleGradeSelect(grade.code);
                  }
                }}
                aria-label={`Select grade ${grade.code} (${grade.name})`}
              >
                <div className="assam-ctc-grade-card-top">
                  <span className="assam-ctc-grade-code font-spec">
                    {grade.code}
                  </span>
                  <span className="assam-ctc-grade-meta-tag">
                    COMMERCIAL
                  </span>
                </div>

                <h4 className="assam-ctc-grade-name">
                  {grade.name}
                </h4>

                <div className="assam-ctc-grade-detail">
                  <span className="assam-ctc-detail-label">Particle Profile</span>
                  <span className="assam-ctc-detail-val">{grade.particleProfile}</span>
                </div>

                <div className="assam-ctc-grade-detail">
                  <span className="assam-ctc-detail-label">Liquor & Cup Character</span>
                  <span className="assam-ctc-detail-val">{grade.liquorYield}</span>
                </div>

                <div className="assam-ctc-grade-app-box">
                  <span className="assam-ctc-app-label">Representative Application:</span>
                  <span className="assam-ctc-app-val">{grade.representativeUse}</span>
                </div>

                <div className="assam-ctc-grade-action">
                  <span>Select Grade</span>
                  <ChevronRight size={14} className="assam-ctc-arrow-icon" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 4. Commercial Applications --- */}
        <div className="assam-ctc-applications-block">
          <div className="assam-ctc-section-subtitle-wrap">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-2)' }}>
              APPLICATIONS
            </div>
            <h3 className="assam-ctc-grades-heading">
              Sourced for Your Commercial End Use
            </h3>
            <p className="assam-ctc-grades-intro">
              The required cut, density, and liquor performance depend directly on your packaging format and consumption profile.
            </p>
          </div>

          <div className="assam-ctc-applications-grid">
            {applications.map((app) => {
              const Icon = app.icon;
              return (
                <div key={app.title} className="assam-ctc-app-card">
                  <div className="assam-ctc-app-card-header">
                    <div className="assam-ctc-app-icon-wrap" aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <span className="assam-ctc-app-focus-pill font-spec">
                      {app.focusGrades}
                    </span>
                  </div>

                  <h4 className="assam-ctc-app-title">
                    {app.title}
                  </h4>

                  <p className="assam-ctc-app-desc">
                    {app.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- 5. Bottom Commercial Reassurance Strip --- */}
        <div className="assam-ctc-bottom-strip">
          <div className="assam-ctc-bottom-strip-text">
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: '0 0 4px 0' }}>
              Require a custom mesh size or specific cup liquor profile?
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              Share your target mesh distribution, liquor strength, or target pricing parameters. We evaluate availability and provide representative lot parameters.
            </p>
          </div>

          <div className="assam-ctc-bottom-strip-action">
            <a 
              href="#requirement-form" 
              className="btn btn-primary btn-gold"
              onClick={(e) => handleCtaClick(e, 'BOP')}
              id="btn-bottom-assam-ctc-inquiry"
            >
              <span>Submit Sourcing Requirement</span>
              <ArrowRight size={16} style={{ marginLeft: '8px' }} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
