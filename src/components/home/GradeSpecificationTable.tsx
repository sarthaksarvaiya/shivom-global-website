import React from 'react';
import { ArrowRight, Info, Check, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

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
            <span className="spec-badge spec-badge-gold">COMMERCIAL GRADE REFERENCE</span>
          </div>
          <h2 id="grade-table-heading" className="grade-matrix-title">
            Tea Grades &amp; Specification Reference
          </h2>
          <p className="grade-matrix-lead">
            Review standard Indian auction cuts and typical commercial applications. Select a grade to pre-fill your requirement or connect directly with our trade desk on WhatsApp.
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
                <th scope="col" style={{ width: '13%' }}>TEA TYPE</th>
                <th scope="col" style={{ width: '17%' }}>GRADE</th>
                <th scope="col" style={{ width: '30%' }}>APPEARANCE &amp; STYLE</th>
                <th scope="col" style={{ width: '22%' }}>TYPICAL USE</th>
                <th scope="col" style={{ width: '18%', textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((item) => {
                const isSelected = selectedGrade === item.code;
                const waLink = CONTACT_INFO.whatsapp.getContextualLink({
                  grade: item.code,
                  category: item.type === 'CTC' ? 'Assam CTC' : 'Orthodox Black Tea',
                  intent: 'sample',
                });

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

                    {/* Action: Select for Form + Quick WhatsApp Link */}
                    <td className="td-act" style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleGradeClick(item.code)}
                          className={`grade-inquire-btn ${isSelected ? 'grade-inquire-btn-active' : ''}`}
                          aria-label={`Select ${item.code} in requirement form`}
                          title={`Select ${item.code} in requirement form`}
                        >
                          {isSelected ? (
                            <>
                              <Check size={13} aria-hidden="true" />
                              <span>Selected</span>
                            </>
                          ) : (
                            <>
                              <span>Specify</span>
                              <ArrowRight size={12} aria-hidden="true" />
                            </>
                          )}
                        </button>

                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grade-wa-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(37, 211, 102, 0.12)',
                            color: '#15803D',
                            border: '1px solid rgba(37, 211, 102, 0.3)',
                            textDecoration: 'none',
                          }}
                          aria-label={`Inquire about ${item.code} on WhatsApp`}
                          title={`Quick WhatsApp inquiry for ${item.code}`}
                        >
                          <MessageCircle size={15} style={{ color: '#25D366' }} aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Specification Note with Truthful Organoleptic & Sample Evaluation Disclosure */}
        <div className="grade-disclaimer-strip">
          <Info size={16} className="grade-disclaimer-icon" aria-hidden="true" />
          <p className="grade-disclaimer-text">
            <strong>Indicative Organoleptic Profile:</strong> Grade characteristics and liquor profiles shown above are indicative standard references. Exact sieve mesh distribution, moisture parameters, and cup strength are verified against physical counter-samples before commercial contract confirmation.
          </p>
        </div>

        {/* Custom Specification Match Strip */}
        <div className="grade-custom-box">
          <div className="grade-custom-left">
            <h3 className="grade-custom-title">
              Have a Target Benchmark Sample or Custom Mesh Specification?
            </h3>
            <p className="grade-custom-copy">
              Send us your target liquor profile, custom sieve requirements, or benchmark details. We evaluate origin availability and provide matching options.
            </p>
          </div>
          <div className="grade-custom-action">
            <button
              type="button"
              onClick={handleCustomInquiry}
              className="grade-custom-btn"
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
