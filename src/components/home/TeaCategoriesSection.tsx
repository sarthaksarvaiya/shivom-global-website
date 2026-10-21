import React from 'react';
import { Flame, Sparkles, Mountain, Leaf, ArrowRight, LucideIcon } from 'lucide-react';

export interface TeaCategoriesSectionProps {
  onSelectCategory?: (categoryName: string) => void;
  onExploreGrades?: () => void;
}

interface TeaCategoryItem {
  id: string;
  title: string;
  origin: string;
  badge: string;
  description: string;
  character: string;
  applications: string;
  icon: LucideIcon;
}

export const TeaCategoriesSection: React.FC<TeaCategoriesSectionProps> = ({
  onSelectCategory,
  onExploreGrades,
}) => {
  const categories: TeaCategoryItem[] = [
    {
      id: 'assam-ctc',
      title: 'Assam CTC Black Tea',
      origin: 'Brahmaputra Valley, Assam',
      badge: 'High-Volume Core Supply',
      description: 'Granular crushed, curled, and torn black tea delivering rich amber liquor, brisk cup strength, and superior milk reactivity.',
      character: 'Full-bodied, malt-forward, deep amber liquor',
      applications: 'Everyday packet tea, strong Karak & Chai, tea bags, and blending',
      icon: Flame,
    },
    {
      id: 'orthodox',
      title: 'Orthodox Black Tea',
      origin: 'Assam & North Indian Terroirs',
      badge: 'Whole & Broken Leaf',
      description: 'Traditionally rolled leaf that preserves intact leaf tips, delivering an aromatic cup with bright golden-amber liquor.',
      character: 'Aromatic, subtle floral notes, bright golden liquor',
      applications: 'Premium loose-leaf tins, specialty retail, traditional breakfast blends',
      icon: Sparkles,
    },
    {
      id: 'darjeeling',
      title: 'Darjeeling Tea (GI Certified)',
      origin: 'Himalayan Foothills, West Bengal',
      badge: 'Specialty Reserve',
      description: 'World-renowned high-altitude Himalayan tea celebrated for its unique muscatel flavor, floral bouquet, and delicate golden cup.',
      character: 'Muscatel grape notes, floral aroma, crisp briskness',
      applications: 'Gourmet boutiques, luxury gift packaging, single-estate lines',
      icon: Mountain,
    },
    {
      id: 'green-tea',
      title: 'Indian Green Tea',
      origin: 'High-Elevation Mountain Terroirs',
      badge: 'Natural & Wellness',
      description: 'Steamed and pan-fired carefully after plucking to halt oxidation, preserving natural antioxidants, catechins, and clean vegetal sweetness.',
      character: 'Clear jade liquor, fresh vegetal finish, clean sweetness',
      applications: 'Wellness tea brands, flavored herbal blends, pyramid tea bags',
      icon: Leaf,
    },
  ];

  const handleCardClick = (catTitle: string) => {
    if (onSelectCategory) {
      onSelectCategory(catTitle);
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
        <div className="tea-categories-header">
          <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            TEAS WE SUPPLY
          </div>
          
          <h2 id="categories-heading" className="tea-categories-headline">
            Indian Tea Categories
          </h2>
          
          <p className="tea-categories-lead">
            We source authentic Indian teas matched to your market requirements — from robust Assam CTC grades to orthodox and specialty harvests.
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
                className={`tea-category-card tea-card-${category.id}`}
                onClick={() => handleCardClick(category.title)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(category.title);
                  }
                }}
                aria-label={`${category.title} — ${category.badge}. Click to select.`}
              >
                <div className="tea-category-card-content">
                  {/* Top Row: Icon and Badge */}
                  <div className="tea-category-top-row">
                    <div className="tea-category-icon-wrap" aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    
                    <span className="tea-category-badge">
                      {category.badge}
                    </span>
                  </div>

                  {/* Title & Origin */}
                  <h3 className="tea-category-title">
                    {category.title}
                  </h3>
                  <div className="tea-category-origin font-spec">
                    Origin: {category.origin}
                  </div>

                  {/* Description */}
                  <p className="tea-category-description">
                    {category.description}
                  </p>

                  {/* Cup Character & Application Highlights */}
                  <div className="tea-category-specs-box">
                    <div className="tea-category-char-row">
                      <strong>Cup Profile:</strong> {category.character}
                    </div>
                    <div className="tea-category-char-row">
                      <strong>Applications:</strong> {category.applications}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="tea-category-action">
                  <span>Inquire About {category.title.split(' ')[0]}</span>
                  <ArrowRight size={16} className="tea-category-arrow" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Strip */}
        <div className="tea-categories-bottom-cta">
          <div className="tea-categories-cta-text">
            <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: '0 0 4px 0' }}>
              Looking for exact leaf grades, sieve mesh sizes, or bulk density?
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              Compare particle sizing, cup strength, and typical applications in our authoritative grade table below.
            </p>
          </div>

          <div className="tea-categories-cta-actions">
            <a 
              href="#tea-by-grade" 
              onClick={handleGradeTableClick}
              className="btn btn-secondary"
              id="btn-view-grades-table"
            >
              <span>View Grade Specification Table</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
