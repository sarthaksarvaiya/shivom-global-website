import React from 'react';
import { Flame, Sparkles, ArrowRight, Check } from 'lucide-react';

export interface TeaCategoriesSectionProps {
  onSelectCategory?: (categoryName: string, gradeCode?: string) => void;
  onExploreGrades?: () => void;
}

export const TeaCategoriesSection: React.FC<TeaCategoriesSectionProps> = ({
  onSelectCategory,
  onExploreGrades,
}) => {
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
            TEA RANGE
          </div>
          
          <h2 id="categories-heading" className="tea-categories-headline">
            Teas We Supply
          </h2>
          
          <p className="tea-categories-lead">
            We source Indian teas according to your required grade, quantity, and cup profile. 
            All teas are available for sample evaluation prior to placing an order.
          </p>
        </div>

        {/* 2-Column Consolidated Origin & Category Cards */}
        <div className="tea-range-grid" role="list">
          
          {/* Card 1: Assam Tea (Core Sourcing) */}
          <div className="tea-range-card" role="listitem">
            <div className="tea-range-card-header">
              <div className="tea-range-icon-box">
                <Flame size={20} aria-hidden="true" />
              </div>
              <div>
                <span className="spec-badge spec-badge-green font-spec">PRIMARY ORIGIN</span>
                <h3 className="tea-range-title">Assam Tea</h3>
                <span className="tea-range-origin font-spec">Origin: Brahmaputra Valley, Assam</span>
              </div>
            </div>

            <p className="tea-range-desc">
              Strong, full-bodied black teas renowned for rich amber liquor, malty notes, and excellent strength in milk.
            </p>

            <div className="tea-range-group">
              <div className="tea-range-group-title">
                <strong>Assam CTC (Crush, Tear, Curl)</strong>
              </div>
              <ul className="tea-range-list">
                <li>
                  <Check size={14} className="tea-range-check" aria-hidden="true" />
                  <span><strong>Broken Grades:</strong> BOP, BOPSM, BP &mdash; ideal for strong cup blends and packet teas</span>
                </li>
                <li>
                  <Check size={14} className="tea-range-check" aria-hidden="true" />
                  <span><strong>Fannings:</strong> PF &mdash; quick extraction for tea bags and instant strength</span>
                </li>
                <li>
                  <Check size={14} className="tea-range-check" aria-hidden="true" />
                  <span><strong>Dust Grades:</strong> PD, Dust / D1 &mdash; high yield and deep color for chai and catering</span>
                </li>
              </ul>
            </div>

            <div className="tea-range-group" style={{ marginTop: 'var(--space-3)' }}>
              <div className="tea-range-group-title">
                <strong>Assam Orthodox</strong>
              </div>
              <ul className="tea-range-list">
                <li>
                  <Check size={14} className="tea-range-check" aria-hidden="true" />
                  <span><strong>Leaf &amp; Broken Grades:</strong> TGFOP (whole leaf with golden tips), FBOP (aromatic broken leaf)</span>
                </li>
              </ul>
            </div>

            <div className="tea-range-card-footer">
              <button
                type="button"
                onClick={() => handleCategorySampleRequest('Assam CTC', 'BOP')}
                className="btn btn-primary btn-sm"
                aria-label="Request samples for Assam Tea"
              >
                <span>Request Assam Tea Samples</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Card 2: Other Indian Teas (Darjeeling & Green Tea) */}
          <div className="tea-range-card" role="listitem">
            <div className="tea-range-card-header">
              <div className="tea-range-icon-box" style={{ background: 'rgba(197, 155, 39, 0.12)', color: 'var(--color-accent-gold)' }}>
                <Sparkles size={20} aria-hidden="true" />
              </div>
              <div>
                <span className="spec-badge spec-badge-gold font-spec">SPECIALTY &amp; WELLNESS</span>
                <h3 className="tea-range-title">Other Indian Teas</h3>
                <span className="tea-range-origin font-spec">Origins: Darjeeling &amp; High-Elevation Terroirs</span>
              </div>
            </div>

            <p className="tea-range-desc">
              Carefully sourced regional teas for specialty retail, gourmet tea lines, and wellness blends.
            </p>

            <div className="tea-range-group">
              <div className="tea-range-group-title">
                <strong>Darjeeling Black Tea</strong>
              </div>
              <ul className="tea-range-list">
                <li>
                  <Check size={14} className="tea-range-check" aria-hidden="true" />
                  <span><strong>Specialty Harvests:</strong> First Flush &amp; Second Flush whole-leaf selections</span>
                </li>
                <li>
                  <Check size={14} className="tea-range-check" aria-hidden="true" />
                  <span><strong>Cup Profile:</strong> Delicate muscatel aroma, floral notes, crisp golden liquor</span>
                </li>
                <li>
                  <Check size={14} className="tea-range-check" aria-hidden="true" />
                  <span><strong>Best For:</strong> Luxury loose-leaf retail, gift packs, and single-origin tea menus</span>
                </li>
              </ul>
            </div>

            <div className="tea-range-group" style={{ marginTop: 'var(--space-3)' }}>
              <div className="tea-range-group-title">
                <strong>Indian Green Tea</strong>
              </div>
              <ul className="tea-range-list">
                <li>
                  <Check size={14} className="tea-range-check" aria-hidden="true" />
                  <span><strong>Clean &amp; Unoxidized:</strong> Whole leaf and fannings with clear jade cup</span>
                </li>
                <li>
                  <Check size={14} className="tea-range-check" aria-hidden="true" />
                  <span><strong>Best For:</strong> Wellness tea brands, flavored herbal blending, and pyramid tea bags</span>
                </li>
              </ul>
            </div>

            <div className="tea-range-card-footer">
              <button
                type="button"
                onClick={() => handleCategorySampleRequest('Darjeeling', 'TGFOP')}
                className="btn btn-secondary btn-sm"
                aria-label="Request samples for Specialty Indian Teas"
              >
                <span>Request Specialty Samples</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>

        {/* Section Bottom Quick Link to Grade Specification Table */}
        <div className="tea-categories-bottom-cta">
          <div className="tea-categories-cta-text">
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: '0 0 4px 0' }}>
              Looking for exact particle sizes and cup characteristics?
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              Compare particle sizing, cup strength, and typical applications in our single Grade Specification Table below.
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
