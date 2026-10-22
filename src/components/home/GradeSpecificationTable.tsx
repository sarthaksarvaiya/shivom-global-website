import React from 'react';
import { ArrowRight, Info, Check } from 'lucide-react';

export interface GradeSpecificationTableProps {
  onSelectGrade?: (gradeCode: string) => void;
  selectedGrade?: string;
}

export interface TeaGradeRow {
  type: 'CTC' | 'Orthodox';
  code: string;
  name: string;
  style: string;
  typicalUse: string;
}

export const GradeSpecificationTable: React.FC<GradeSpecificationTableProps> = ({
  onSelectGrade,
  selectedGrade,
}) => {
  const grades: TeaGradeRow[] = [
    {
      type: 'CTC',
      code: 'BOP',
      name: 'Broken Orange Pekoe',
      style: 'Largest CTC grade, robust granular leaf',
      typicalUse: 'Bulk blending foundation, packet tea',
    },
    {
      type: 'CTC',
      code: 'BOPSM',
      name: 'BOP Small',
      style: 'Medium-to-bold even granular cut',
      typicalUse: 'Consumer packet tea, family blends',
    },
    {
      type: 'CTC',
      code: 'BP',
      name: 'Broken Pekoe',
      style: 'Medium granular size, consistent density',
      typicalUse: 'Everyday strong tea, milk chai, food service',
    },
    {
      type: 'CTC',
      code: 'PF',
      name: 'Pekoe Fannings',
      style: 'Fine particles, rapid color and liquor release',
      typicalUse: 'Tea bags, single-serve packs, quick brew',
    },
    {
      type: 'CTC',
      code: 'PD',
      name: 'Pekoe Dust',
      style: 'Fine granular dust, instantaneous extraction',
      typicalUse: 'Chai vendors, Karak, vending machines',
    },
    {
      type: 'CTC',
      code: 'Dust / D1',
      name: 'Dust 1',
      style: 'Micro-cut granular particles, maximum color yield',
      typicalUse: 'Foodservice, catering, strong commercial chai',
    },
    {
      type: 'Orthodox',
      code: 'TGFOP',
      name: 'Tippy Golden Flowery Orange Pekoe',
      style: 'Whole wiry leaf with delicate golden tips',
      typicalUse: 'Specialty loose-leaf tins, premium gift packs',
    },
    {
      type: 'Orthodox',
      code: 'FBOP',
      name: 'Flowery Broken Orange Pekoe',
      style: 'Aromatic broken leaf with tips, balanced cup',
      typicalUse: 'English breakfast blends, loose tea retail',
    },
  ];

  const handleGradeClick = (gradeCode: string) => {
    if (onSelectGrade) {
      onSelectGrade(gradeCode);
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

  const handleCustomInquiry = () => {
    if (onSelectGrade) {
      onSelectGrade('Custom Specification');
    }
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
  };

  return (
    <section id="tea-by-grade" className="grade-matrix-section" aria-labelledby="grade-table-heading">
      <div className="container">
        
        {/* Section Header */}
        <div className="grade-matrix-header">
          <div className="grade-matrix-eyebrow">
            <span className="spec-badge spec-badge-gold">SINGLE SOURCE OF TRUTH</span>
          </div>
          <h2 id="grade-table-heading" className="grade-matrix-title">
            Tea Grade &amp; Specification Table
          </h2>
          <p className="grade-matrix-lead">
            Review available tea grades, leaf appearance, and typical uses. Click any grade to pre-fill your free sample request.
          </p>
        </div>

        {/* Mobile Horizontal Scroll Hint */}
        <div className="grade-table-scroll-hint font-spec" aria-hidden="true">
          <span>&larr; Scroll horizontally to view full table &rarr;</span>
        </div>

        {/* Authoritative Single Grade Table */}
        <div className="grade-matrix-table-wrap" role="region" aria-label="Tea Grades Specification Table" tabIndex={0}>
          <table className="grade-matrix-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '15%' }}>TEA TYPE</th>
                <th scope="col" style={{ width: '18%' }}>GRADE</th>
                <th scope="col" style={{ width: '32%' }}>APPEARANCE &amp; STYLE</th>
                <th scope="col" style={{ width: '23%' }}>TYPICAL USE</th>
                <th scope="col" style={{ width: '12%', textAlign: 'center' }}>SAMPLE</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((item) => {
                const isSelected = selectedGrade === item.code;
                return (
                  <tr 
                    key={item.code} 
                    className={`grade-row ${isSelected ? 'grade-row-selected' : ''}`}
                  >
                    {/* Tea Type */}
                    <td className="td-cat font-spec" style={{ fontWeight: 700, color: 'var(--color-primary-green)' }}>
                      {item.type}
                    </td>

                    {/* Grade Code & Full Name */}
                    <td className="td-grade">
                      <div className="grade-code-badge">
                        <span className="font-spec grade-code-text">{item.code}</span>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.name}
                      </div>
                    </td>

                    {/* Appearance & Style */}
                    <td className="td-desc">
                      <div style={{ color: 'var(--text-main)', fontSize: '0.9375rem' }}>
                        {item.style}
                      </div>
                    </td>

                    {/* Typical Use */}
                    <td className="td-app">
                      <div className="grade-app-text">
                        {item.typicalUse}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="td-act" style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleGradeClick(item.code)}
                        className={`grade-inquire-btn ${isSelected ? 'grade-inquire-btn-active' : ''}`}
                        aria-label={`Select ${item.code} for sample request`}
                      >
                        {isSelected ? (
                          <>
                            <Check size={13} aria-hidden="true" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <>
                            <span>Request</span>
                            <ArrowRight size={12} aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Specification Note */}
        <div className="grade-disclaimer-strip">
          <Info size={16} className="grade-disclaimer-icon" aria-hidden="true" />
          <p className="grade-disclaimer-text">
            <strong>Sample Evaluation:</strong> Tea samples for the above grades are arranged based on your required volume and target market. Sieve size, moisture parameters, and cup strength are confirmed against physical samples before order commitment.
          </p>
        </div>

        {/* Custom Specification Match Strip */}
        <div className="grade-custom-box">
          <div className="grade-custom-left">
            <div className="grade-custom-title" style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
              Have a Target Benchmark Sample or Custom Mesh Specification?
            </div>
            <p className="grade-custom-copy" style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Send us your target liquor profile, custom sieve requirements, or benchmark details. We evaluate origin availability and provide matching options.
            </p>
          </div>
          <div className="grade-custom-action">
            <button
              type="button"
              onClick={handleCustomInquiry}
              className="btn btn-secondary btn-sm"
              aria-label="Request custom tea specification"
            >
              <span>Tell Us Your Specification</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
