import React, { useState } from 'react';
import { Flame, Sparkles, Leaf, Award, ArrowRight, Check, Compass, Droplet } from 'lucide-react';

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
  meters: {
    strength: number;
    body: number;
    aroma: number;
    milk: number;
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
    description: 'Sourced directly from established Assam plantations and primary auctions. Revered for rich body, deep briskness, and a robust amber-copper infusion that takes milk exceptionally well.',
    glowColor: 'rgba(212, 175, 55, 0.25)',
    meters: {
      strength: 95,
      body: 90,
      aroma: 85,
      milk: 100,
    },
    grades: ['BOP', 'BOPSM', 'BP', 'PF', 'PD', 'Dust / D1'],
    specs: [
      'Broken Grades (BOP, BP): Full body for strong packet teas and commercial blends',
      'Fannings (PF): Rapid liquor extraction engineered for high-speed tea-bag production',
      'Dust Grades (PD, D1): High cup yield and intense color for catering and traditional chai',
      'Standard Packing: 25kg / 30kg multi-wall kraft paper sacks with food-grade LDPE liner',
    ],
    defaultGrade: 'BOP',
    icon: Flame,
  },
  {
    id: 'assam-orthodox',
    tabLabel: 'Assam Orthodox',
    name: 'Assam Orthodox Whole Leaf',
    origin: 'Upper Assam Estate Selections',
    tagline: 'Traditional Rolled Leaf with Golden Tips & Caramel Malt Notes',
    description: 'Selectively harvested and traditionally rolled to keep leaf structure intact. Offers refined caramel malt sweetness, rich complexity, and an aromatic golden-amber cup.',
    glowColor: 'rgba(197, 155, 39, 0.28)',
    meters: {
      strength: 75,
      body: 80,
      aroma: 92,
      milk: 70,
    },
    grades: ['FTGFOP1', 'TGFOP', 'FBOP', 'BOPF'],
    specs: [
      'Tippy Whole Leaf (FTGFOP1, TGFOP): Rich golden tips for specialty loose-leaf retail',
      'Aromatic Brokens (FBOP): Exceptional aroma and liquor strength for premium blends',
      'Export Destinations: Widely demanded in Europe, Middle East, and specialty boutique brands',
      'Flexible Supply: Standard bulk sacks or customized repack quantities available',
    ],
    defaultGrade: 'TGFOP',
    icon: Award,
  },
  {
    id: 'darjeeling',
    tabLabel: 'Darjeeling Single Origin',
    name: 'Darjeeling Black Tea',
    origin: 'Darjeeling Himalayan Foothills',
    tagline: 'The Champagne of Teas — Renowned Muscatel & Floral Bouquet',
    description: 'High-elevation mountain terroirs producing world-celebrated seasonal harvests. First Flush brings crisp floral vibrancy; Second Flush yields the signature ripe muscatel grape profile.',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    meters: {
      strength: 60,
      body: 65,
      aroma: 100,
      milk: 25,
    },
    grades: ['First Flush FTGFOP1', 'Second Flush TGFOP', 'Autumnal Harvest'],
    specs: [
      'Single-Estate Provenance: 100% pure Himalayan terroirs with certified origin tracking',
      'Distinct Muscatel Flavor: Delicate floral top-notes with a lingering sweet finish',
      'Best Application: Luxury loose-leaf gift tins, gourmet hospitality, and single-origin menus',
      'Preservation Packing: Foil-sealed vacuum bags inside rigid protective cartons',
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
    description: 'Fresh tea leaves steam-heated or pan-fired shortly after plucking to halt oxidation. Preserves natural green polyphenols, catechins, and clean herbaceous sweetness.',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    meters: {
      strength: 50,
      body: 55,
      aroma: 90,
      milk: 0,
    },
    grades: ['Whole Leaf Green', 'Green Tea Fannings', 'Herbal Cut'],
    specs: [
      'Clean & Clear: Light jade liquor without bitter astringency when brewed correctly',
      'Blending Foundation: Excellent neutral base for jasmine, mint, citrus, and wellness blends',
      'Packaging Formats: Suitable for pyramid nylon mesh bags, loose canisters, or bulk supply',
      'High Polyphenol Content: Preserves maximum natural antioxidants and active catechins',
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
            INDIAN TEA SPECTRUM
          </div>
          
          <h2 id="categories-heading" className="tea-categories-headline">
            Explore Origin Teas &amp; Cup Profiles
          </h2>
          
          <p className="tea-categories-lead" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Direct origin sourcing calibrated to your market requirements. Switch between tea categories to inspect cup characteristics, available export grades, and sample options.
          </p>
        </div>

        {/* Dynamic Category Navigation Bar */}
        <div className="tea-explorer-wrap">
          <div className="tea-explorer-nav" role="tablist" aria-label="Tea categories selector">
            {TEA_CATEGORIES.map((cat, idx) => {
              const isActive = idx === activeCategoryIndex;
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
                  <span className="tea-explorer-tab-dot" aria-hidden="true" />
                  <span>{cat.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Single Sourcing Console (Replaces 2 generic cards) */}
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

            {/* Left Console: Overview & Sensory Radar Meters */}
            <div className="tea-explorer-main">
              <div>
                <div className="tea-explorer-badge-row">
                  <span className="tea-origin-pill">
                    <Compass size={14} aria-hidden="true" />
                    <span>{activeCategory.origin}</span>
                  </span>
                  <span className="spec-badge spec-badge-gold font-spec">
                    SAMPLES AVAILABLE
                  </span>
                </div>

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
                <div className="tea-sensory-title">
                  <span>Cup Character &amp; Sensory Metrics</span>
                  <Droplet size={14} style={{ color: 'var(--color-accent-gold)' }} aria-hidden="true" />
                </div>

                <div className="tea-sensory-grid">
                  <div className="tea-meter-item">
                    <div className="tea-meter-label-row">
                      <span>Liquor Strength</span>
                      <span className="font-spec">{activeCategory.meters.strength}%</span>
                    </div>
                    <div className="tea-meter-track" aria-hidden="true">
                      <div className="tea-meter-fill" style={{ width: `${activeCategory.meters.strength}%` }} />
                    </div>
                  </div>

                  <div className="tea-meter-item">
                    <div className="tea-meter-label-row">
                      <span>Body &amp; Briskness</span>
                      <span className="font-spec">{activeCategory.meters.body}%</span>
                    </div>
                    <div className="tea-meter-track" aria-hidden="true">
                      <div className="tea-meter-fill" style={{ width: `${activeCategory.meters.body}%` }} />
                    </div>
                  </div>

                  <div className="tea-meter-item">
                    <div className="tea-meter-label-row">
                      <span>Aroma Complexity</span>
                      <span className="font-spec">{activeCategory.meters.aroma}%</span>
                    </div>
                    <div className="tea-meter-track" aria-hidden="true">
                      <div className="tea-meter-fill" style={{ width: `${activeCategory.meters.aroma}%` }} />
                    </div>
                  </div>

                  <div className="tea-meter-item">
                    <div className="tea-meter-label-row">
                      <span>Milk Affinity</span>
                      <span className="font-spec">{activeCategory.meters.milk}%</span>
                    </div>
                    <div className="tea-meter-track" aria-hidden="true">
                      <div className="tea-meter-fill" style={{ width: `${activeCategory.meters.milk}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Console: Grades & Direct Sample Action */}
            <div className="tea-explorer-specs">
              <div>
                <div className="tea-specs-section-title">
                  <span>Available Export Grades</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-gold)', fontWeight: 600 }}>Click grade to request</span>
                </div>

                <div className="tea-grades-pill-wrap">
                  {activeCategory.grades.map((grd) => (
                    <button
                      key={grd}
                      type="button"
                      onClick={() => handleGradeBadgeClick(grd)}
                      className="tea-grade-badge-interactive"
                      title={`Request sample for ${grd}`}
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
                  aria-label={`Request ${activeCategory.name} Samples`}
                >
                  <ActiveIcon size={16} aria-hidden="true" />
                  <span>Request {activeCategory.tabLabel} Samples</span>
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
