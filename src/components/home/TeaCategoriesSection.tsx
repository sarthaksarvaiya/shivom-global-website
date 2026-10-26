import React, { useState } from 'react';
import { Flame, Sparkles, Leaf, Award, ArrowRight, Check, Compass, Droplet, ChevronLeft, ChevronRight } from 'lucide-react';

export interface TeaCategoriesSectionProps {
  onSelectCategory?: (categoryName: string, gradeCode?: string) => void;
  onExploreGrades?: () => void;
}

interface TeaCategoryData {
  id: string;
  tabLabel: string;
  name: string;
  origin: string;
  tagline: string;
  description: string;
  glowColor: string;
  organoleptic: {
    liquor: string;
    body: string;
    aroma: string;
    milk: string;
  };
  grades: string[];
  specs: string[];
  defaultGrade: string;
  icon: React.ElementType;
}

const TEA_CATEGORIES: TeaCategoryData[] = [
  {
    id: 'assam-ctc',
    tabLabel: 'Assam CTC',
    name: 'Assam CTC (Crush, Tear, Curl)',
    origin: 'Brahmaputra Valley, Assam',
    tagline: 'Bold, Malty Amber Cup for High-Strength Blends & Packet Teas',
    description: 'We identify suitable sourcing options based on your required particle cut, briskness and liquor depth. Revered for rich body, strong infusion, and exceptional milk reactivity for commercial blends, tea bags, and Karak chai.',
    glowColor: 'rgba(212, 175, 55, 0.25)',
    organoleptic: {
      liquor: 'Heavy & High-Briskness',
      body: 'Full-Bodied Granular Cup',
      aroma: 'Rich Malty Assam Amber',
      milk: 'Exceptional (Ideal for Karak & Chai)',
    },
    grades: ['BOP', 'BOPSM', 'BP', 'PF', 'PD', 'Dust / D1'],
    specs: [
      'Broken Grades (BOP, BP): Full body for packet teas and commercial brand blending',
      'Fannings (PF): Rapid liquor release engineered for high-speed tea-bag packaging lines',
      'Dust Grades (PD, D1): High cup yield and heavy color for foodservice, catering, and Karak chai',
      'Export Packaging: Bulk packaging formats coordinated according to buyer requirements and selected tea lots',
    ],
    defaultGrade: 'BOP',
    icon: Flame,
  },
  {
    id: 'assam-orthodox',
    tabLabel: 'Assam Orthodox',
    name: 'Assam Orthodox Whole Leaf',
    origin: 'Upper Assam Terroirs',
    tagline: 'Traditional Rolled Leaf with Golden Tips & Caramel Malt Notes',
    description: 'We identify suitable Orthodox sourcing options based on leaf style, tip content and target liquor aroma. Offers refined caramel malt sweetness, rich complexity, and an aromatic golden-amber cup for premium loose-leaf packaging.',
    glowColor: 'rgba(197, 155, 39, 0.28)',
    organoleptic: {
      liquor: 'Medium-Brisk, Golden Cup',
      body: 'Smooth, Rolled Leaf Density',
      aroma: 'Caramel Malt & Floral Notes',
      milk: 'Moderate (Best Black or Light Milk)',
    },
    grades: ['FTGFOP1', 'TGFOP', 'FBOP', 'BOPF'],
    specs: [
      'Tippy Whole Leaf (FTGFOP1, TGFOP): Intact golden tips for specialty loose-leaf retail',
      'Aromatic Brokens (FBOP): Balanced aroma and cup strength for traditional breakfast blends',
      'Commercial Suitability: Popular in Middle East, European, and specialty boutique markets',
      'Packaging Options: Bulk export packaging or retail repack formats coordinated upon discussion',
    ],
    defaultGrade: 'TGFOP',
    icon: Award,
  },
  {
    id: 'darjeeling',
    tabLabel: 'Darjeeling Single Origin',
    name: 'Darjeeling Black Tea',
    origin: 'Darjeeling Himalayan Foothills',
    tagline: 'Renowned Muscatel Flavor & Delicate Floral Bouquet',
    description: 'High-elevation mountain terroirs producing world-celebrated seasonal harvests. First Flush brings crisp floral vibrancy; Second Flush yields the signature ripe muscatel grape profile.',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    organoleptic: {
      liquor: 'Delicate, Pale Amber',
      body: 'Light, Crisp Himalayan Terroir',
      aroma: 'Muscatel Grape & Floral Bouquet',
      milk: 'Self-Drank (Consumed Without Milk)',
    },
    grades: ['First Flush FTGFOP1', 'Second Flush TGFOP', 'Autumnal Harvest'],
    specs: [
      'High-Elevation Himalayan Terroirs: Sourced against buyer order during seasonal plucking cycles',
      'Distinct Muscatel Flavor: Delicate floral top-notes with a lingering sweet finish',
      'Best Application: Luxury loose-leaf gift tins, gourmet hospitality, and single-origin menus',
      'Export Packaging: Moisture-protective bulk or vacuum packaging coordinated based on lot and buyer order',
    ],
    defaultGrade: 'TGFOP',
    icon: Sparkles,
  },
  {
    id: 'green-wellness',
    tabLabel: 'Green & Specialty',
    name: 'Indian Green & Wellness Teas',
    origin: 'High-Elevation Terroirs, India',
    tagline: 'Gently Processed Unoxidized Leaf with Jade Cup Clarity',
    description: 'Fresh tea leaves steam-heated or pan-fired shortly after harvest to halt oxidation. Preserves natural green polyphenols, catechins, and clean herbaceous sweetness for health and wellness lines.',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    organoleptic: {
      liquor: 'Gentle, Unoxidized Clarity',
      body: 'Clean Herbaceous Infusion',
      aroma: 'Fresh Vegetal & Jade Top-Notes',
      milk: 'Not Applicable (Green Infusion)',
    },
    grades: ['Whole Leaf Green', 'Green Tea Fannings', 'Herbal Cut'],
    specs: [
      'Clean & Clear: Light jade liquor without bitter astringency when brewed correctly',
      'Blending Foundation: Excellent neutral base for jasmine, mint, citrus, and herbal blends',
      'Packaging Formats: Coordinated for pyramid mesh bags, loose canisters, or bulk export sacks',
      'High Polyphenol Content: Preserves natural antioxidants and active catechins',
    ],
    defaultGrade: 'Whole Leaf Green',
    icon: Leaf,
  },
];

export const TeaCategoriesSection: React.FC<TeaCategoriesSectionProps> = ({
  onSelectCategory,
  onExploreGrades,
}) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const activeCategory = TEA_CATEGORIES[activeCategoryIndex];
  const ActiveIcon = activeCategory.icon;

  const handlePrevCategory = () => {
    setActiveCategoryIndex((prev) => (prev > 0 ? prev - 1 : TEA_CATEGORIES.length - 1));
  };

  const handleNextCategory = () => {
    setActiveCategoryIndex((prev) => (prev < TEA_CATEGORIES.length - 1 ? prev + 1 : 0));
  };

  const handleCategorySampleRequest = (category: string, defaultGrade?: string) => {
    if (onSelectCategory) {
      onSelectCategory(category, defaultGrade);
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

  const handleGradeBadgeClick = (gradeCode: string) => {
    handleCategorySampleRequest(activeCategory.name, gradeCode);
  };

  const handleGradeTableClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onExploreGrades) {
      onExploreGrades();
    } else {
      const tableElement = document.getElementById('tea-by-grade');
      if (tableElement) {
        const headerOffset = 80;
        const elementPosition = tableElement.getBoundingClientRect().top;
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
      id="our-teas" 
      className="tea-categories-section"
      aria-labelledby="categories-heading"
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="tea-categories-header text-center">
          <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            INDIAN TEA SOURCING SPECTRUM
          </div>
          
          <h2 id="categories-heading" className="tea-categories-headline">
            Tea Categories Sourced to Your Requirement
          </h2>
          
          <p className="tea-categories-lead" style={{ maxWidth: '760px', margin: '0 auto' }}>
            We work with appropriate sourcing channels to match buyer requirements with suitable Indian tea lots across primary production regions based on your requested grade, target cup profile, and destination compliance.
          </p>

          <div style={{ marginTop: 'var(--space-2)', fontSize: '0.8125rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
            Grades shown represent sourcing categories, not standing inventory. Availability depends on current origin, lot, season and buyer specification.
          </div>
        </div>

        {/* Sourcing Specification Matching Sequence Bar */}
        <div className="tea-matching-sequence-bar" role="region" aria-label="Specification matching methodology">
          <span className="tea-sequence-lead font-spec">SPECIFICATION MATCHING:</span>
          <div className="tea-sequence-steps">
            <span className="tea-seq-step">Grade Selection</span>
            <span className="tea-seq-arrow" aria-hidden="true">&rarr;</span>
            <span className="tea-seq-step">Particle Cut</span>
            <span className="tea-seq-arrow" aria-hidden="true">&rarr;</span>
            <span className="tea-seq-step">Cup Profile</span>
            <span className="tea-seq-arrow" aria-hidden="true">&rarr;</span>
            <span className="tea-seq-step">Application</span>
            <span className="tea-seq-arrow" aria-hidden="true">&rarr;</span>
            <span className="tea-seq-step">Counter-Sample Sign-Off</span>
            <span className="tea-seq-arrow" aria-hidden="true">&rarr;</span>
            <span className="tea-seq-step tea-seq-step-final">Commercial Quote</span>
          </div>
        </div>

        {/* Dynamic Category Navigation Bar with Obvious Visual Selector */}
        <div className="tea-explorer-wrap">
          {/* Explicit Selector Cue */}
          <div className="tea-explorer-selector-cue" aria-hidden="true">
            <span className="tea-cue-dot" />
            <span className="tea-cue-text">CHOOSE TEA ORIGIN / VARIETY TO PREVIEW CUP &amp; GRADES:</span>
          </div>

          <div className="tea-explorer-nav" role="tablist" aria-label="Tea categories selector">
            {TEA_CATEGORIES.map((cat, idx) => {
              const isActive = idx === activeCategoryIndex;
              const TabIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tea-panel-${cat.id}`}
                  id={`tea-tab-${cat.id}`}
                  type="button"
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`tea-explorer-tab ${isActive ? 'active' : ''}`}
                >
                  <span className="tea-tab-icon-wrap" aria-hidden="true">
                    <TabIcon size={16} />
                  </span>
                  <span className="tea-tab-text">{cat.tabLabel}</span>
                  {isActive && <span className="tea-explorer-tab-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {/* Interactive Single Sourcing Console */}
          <div 
            id={`tea-panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`tea-tab-${activeCategory.id}`}
            className="tea-explorer-console"
          >
            {/* Dynamic Ambient Liquor Glow Effect */}
            <div 
              className="tea-explorer-glow" 
              style={{ background: activeCategory.glowColor }} 
              aria-hidden="true"
            />

            {/* In-Console Quick Variety Stepper Bar */}
            <div className="tea-console-nav-strip">
              <div className="tea-explorer-badge-row">
                <span className="tea-origin-pill">
                  <Compass size={14} aria-hidden="true" />
                  <span>{activeCategory.origin}</span>
                </span>
                <span className="spec-badge spec-badge-gold font-spec">
                  COUNTER-SAMPLES ON REQUEST
                </span>
              </div>

              {/* Direct Next / Prev Switcher */}
              <div className="tea-console-stepper" aria-label="Cycle tea varieties">
                <span className="tea-console-counter font-spec">
                  VARIETY {activeCategoryIndex + 1} OF {TEA_CATEGORIES.length}
                </span>
                <div className="tea-stepper-btn-group">
                  <button
                    type="button"
                    onClick={handlePrevCategory}
                    className="tea-stepper-btn"
                    title="Previous tea variety"
                    aria-label="Previous tea variety"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                    <span className="stepper-btn-label">Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextCategory}
                    className="tea-stepper-btn"
                    title="Next tea variety"
                    aria-label="Next tea variety"
                  >
                    <span className="stepper-btn-label">Next</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Left Console: Overview & Sensory Radar Meters */}
            <div className="tea-explorer-main">
              <div>
                <h3 className="tea-explorer-name">
                  {activeCategory.name}
                </h3>

                <div className="tea-explorer-tagline">
                  {activeCategory.tagline}
                </div>

                <p className="tea-explorer-desc">
                  {activeCategory.description}
                </p>
              </div>

              {/* Sensory Character Meters */}
              <div className="tea-sensory-panel">
                <div className="tea-sensory-title" style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span>Indicative Organoleptic Profile</span>
                    <Droplet size={14} style={{ color: 'var(--color-accent-gold)' }} aria-hidden="true" />
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', fontWeight: 400, lineHeight: 1.3 }}>
                    *Indicative cup profile. Final characteristics vary by origin, lot, season and processing.
                  </span>
                </div>

                <div className="tea-sensory-grid">
                  <div className="tea-organoleptic-item">
                    <span className="tea-organoleptic-label font-spec">LIQUOR STRENGTH</span>
                    <span className="tea-organoleptic-val">{activeCategory.organoleptic.liquor}</span>
                  </div>

                  <div className="tea-organoleptic-item">
                    <span className="tea-organoleptic-label font-spec">BODY &amp; TEXTURE</span>
                    <span className="tea-organoleptic-val">{activeCategory.organoleptic.body}</span>
                  </div>

                  <div className="tea-organoleptic-item">
                    <span className="tea-organoleptic-label font-spec">AROMA &amp; FLAVOR</span>
                    <span className="tea-organoleptic-val">{activeCategory.organoleptic.aroma}</span>
                  </div>

                  <div className="tea-organoleptic-item">
                    <span className="tea-organoleptic-label font-spec">MILK AFFINITY</span>
                    <span className="tea-organoleptic-val">{activeCategory.organoleptic.milk}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Console: Grades & Direct Sample Action */}
            <div className="tea-explorer-specs">
              <div>
                <div className="tea-specs-section-title">
                  <span>Export Sourcing Grades</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-gold)', fontWeight: 600 }}>Click grade to request specification</span>
                </div>

                <div className="tea-grades-pill-wrap">
                  {activeCategory.grades.map((grd) => (
                    <button
                      key={grd}
                      type="button"
                      onClick={() => handleGradeBadgeClick(grd)}
                      className="tea-grade-badge-interactive"
                      title={`Request specification for ${grd}`}
                    >
                      <span>{grd}</span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </button>
                  ))}
                </div>

                <div className="tea-specs-section-title" style={{ marginTop: 'var(--space-4)' }}>
                  <span>Sourcing &amp; Packing Specifications</span>
                </div>

                <ul className="tea-specs-list">
                  {activeCategory.specs.map((spc, idx) => (
                    <li key={idx} className="tea-specs-list-item">
                      <Check size={14} className="tea-specs-check-icon" aria-hidden="true" />
                      <span>{spc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tea-specs-cta-wrap">
                <button
                  type="button"
                  onClick={() => handleCategorySampleRequest(activeCategory.name, activeCategory.defaultGrade)}
                  className="btn btn-primary btn-md"
                  style={{ width: '100%', justifyContent: 'center' }}
                  aria-label={`Request ${activeCategory.name} Counter-Samples`}
                >
                  <ActiveIcon size={16} aria-hidden="true" />
                  <span>Request {activeCategory.tabLabel} Counter-Samples</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Section Bottom Quick Link to Grade Specification Table */}
        <div className="tea-categories-bottom-cta">
          <div className="tea-categories-cta-text">
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: '0 0 4px 0' }}>
              Looking for exact particle sizes and technical mesh sieve data?
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              Compare particle sizing, cup strength, and blend applications in our single Grade Specification Table below.
            </p>
          </div>

          <div className="tea-categories-cta-actions">
            <a 
              href="#tea-by-grade" 
              onClick={handleGradeTableClick}
              className="btn btn-secondary btn-sm"
              id="btn-view-grades-table"
            >
              <span>View Grade Specification Table</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
