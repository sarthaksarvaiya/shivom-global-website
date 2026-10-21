import React from 'react';
import { ArrowRight, Layers, Sparkles, Flame, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

export interface TeaCategoriesSectionProps {
  onSelectCategory?: (categoryName: string, defaultGrade?: string) => void;
  onSubmitRequirement?: () => void;
  onExploreGrades?: () => void;
}

interface TeaCategoryItem {
  id: string;
  themeClass: string;
  title: string;
  badge: string;
  isPrimary?: boolean;
  description: string;
  characteristics: string;
  gradesLabel: string;
  grades: string[];
  actionLabel: string;
  targetGrade?: string;
  icon: React.ElementType;
}

export const TeaCategoriesSection: React.FC<TeaCategoriesSectionProps> = ({
  onSelectCategory,
  onSubmitRequirement,
  onExploreGrades,
}) => {
  const categories: TeaCategoryItem[] = [
    {
      id: 'assam-ctc',
      themeClass: 'tea-card-assam',
      title: 'Assam CTC Black Tea',
      badge: 'Core Commercial Benchmark',
      isPrimary: true,
      description: 'High-volume Indian black tea for commercial blends, tea bags and everyday consumption.',
      characteristics: 'Bold liquor, malty briskness & exceptional milk reactivity (ideal for Karak & Chai)',
      gradesLabel: 'Standard Commercial Grades',
      grades: ['BOP', 'BOPSM', 'BP', 'PF', 'PD', 'Dust'],
      actionLabel: 'Explore Assam CTC',
      targetGrade: 'BOP',
      icon: Flame,
    },
    {
      id: 'orthodox',
      themeClass: 'tea-card-orthodox',
      title: 'Orthodox Black Tea',
      badge: 'Whole & Broken Leaf',
      isPrimary: false,
      description: 'Whole-leaf and orthodox-style Indian teas for differentiated cup profiles and premium applications.',
      characteristics: 'Aromatic floral bouquet, bright golden-amber liquor & traditional roller craft',
      gradesLabel: 'Representative Grades',
      grades: ['TGFOP', 'FBOP', 'BOP', 'BOPF'],
      actionLabel: 'Explore Orthodox',
      targetGrade: 'BOP',
      icon: Layers,
    },
    {
      id: 'darjeeling',
      themeClass: 'tea-card-darjeeling',
      title: 'Darjeeling Tea',
      badge: 'Distinctive Terroir',
      isPrimary: false,
      description: 'Distinctive Darjeeling teas for buyers seeking a recognised Indian origin and differentiated character.',
      characteristics: 'Rare muscatel grape notes, delicate floral fragrance & vibrant light cup',
      gradesLabel: 'Selection Grades',
      grades: ['FTGFOP1', 'SFTGFOP1', 'GFBOP', 'Whole Leaf'],
      actionLabel: 'Explore Darjeeling',
      targetGrade: 'FTGFOP1',
      icon: Sparkles,
    },
    {
      id: 'specialty',
      themeClass: 'tea-card-specialty',
      title: 'Specialty & Regional Teas',
      badge: 'On-Demand Sourcing',
      isPrimary: false,
      description: 'Selected Indian origins and tea profiles matched to specific buyer requirements.',
      characteristics: 'Available based on specification and sourcing requirement.',
      gradesLabel: 'Sourcing Scope',
      grades: ['High-Elevation Green', 'Nilgiri Terroirs', 'Custom Formulations'],
      actionLabel: 'Request Specialty Match',
      targetGrade: 'Custom',
      icon: SlidersHorizontal,
    },
  ];

  const handleCardClick = (category: TeaCategoryItem) => {
    if (onSelectCategory) {
      onSelectCategory(category.title, category.targetGrade);
    } else if (onSubmitRequirement) {
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

  const handleExploreGradesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onExploreGrades) {
      onExploreGrades();
    } else {
      const gradesElement = document.getElementById('tea-by-grade');
      if (gradesElement) {
        const headerOffset = 80;
        const elementPosition = gradesElement.getBoundingClientRect().top;
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
      {/* Anchor alias to ensure existing header link '#what-we-do' continues working */}
      <span id="what-we-do" style={{ display: 'block', position: 'relative', top: '-90px', visibility: 'hidden' }} aria-hidden="true" />
      <span id="what-we-supply" style={{ display: 'block', position: 'relative', top: '-90px', visibility: 'hidden' }} aria-hidden="true" />

      <div className="container">
        
        {/* Section Header */}
        <div className="tea-categories-header">
          <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            WHAT WE SUPPLY
          </div>
          
          <h2 id="categories-heading" className="tea-categories-headline">
            Indian Tea Categories for Commercial Buyers
          </h2>
          
          <p className="tea-categories-lead">
            Source the right Indian tea for your market, application and commercial specification — from high-volume CTC grades to specialty and orthodox teas.
          </p>
        </div>

        {/* 4-Category Grid: 2x2 Layout */}
        <div className="tea-categories-grid" role="list">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                role="listitem"
                className={`tea-category-card ${category.themeClass} ${category.isPrimary ? 'tea-category-card-primary' : ''}`}
                onClick={() => handleCardClick(category)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(category);
                  }
                }}
                aria-label={`${category.title} — ${category.badge}. Click to select and explore.`}
              >
                {/* Unique Terroir Ambient Aura Glow Layer */}
                <div className="tea-category-ambient-glow" aria-hidden="true" />

                <div className="tea-category-card-content">
                  {/* Card Top Metadata: Icon and Badge */}
                  <div className="tea-category-top-row">
                    <div className="tea-category-icon-wrap" aria-hidden="true">
                      <Icon size={18} />
                    </div>
                    
                    <span className={`tea-category-badge tea-category-badge-${category.id}`}>
                      {category.badge}
                    </span>
                  </div>

                  {/* Title & Short 1-2 sentence description */}
                  <h3 className="tea-category-title">
                    {category.title}
                  </h3>

                  <p className="tea-category-description">
                    {category.description}
                  </p>

                  {/* Specification & Representative Grades Block */}
                  <div className="tea-category-specs-box">
                    <div className="tea-category-specs-label">
                      {category.gradesLabel}
                    </div>

                    <div className="tea-category-chips-list">
                      {category.grades.map((grade) => (
                        <span key={grade} className="tea-category-grade-chip font-spec">
                          {grade}
                        </span>
                      ))}
                    </div>

                    <div className="tea-category-char-text">
                      <CheckCircle2 size={14} className="tea-category-check-icon" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <span>{category.characteristics}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="tea-category-action">
                  <span>{category.actionLabel}</span>
                  <ArrowRight size={16} className="tea-category-arrow" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA Strip */}
        <div className="tea-categories-bottom-cta">
          <div className="tea-categories-cta-text">
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: '0 0 4px 0' }}>
              Need a specific tea specification?
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              Submit your target mesh, origin terroirs, liquor profile, or commercial sample match directly to our trade desk.
            </p>
          </div>

          <div className="tea-categories-cta-actions">
            <a 
              href="#requirement-form" 
              onClick={handleCtaClick}
              className="btn btn-primary"
              id="categories-submit-requirement-cta"
            >
              <span>Submit Commercial Requirement</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <a 
              href="#tea-by-grade" 
              onClick={handleExploreGradesClick}
              className="btn btn-secondary"
              id="categories-explore-grades-cta"
            >
              <span>View Grade Matrix</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
