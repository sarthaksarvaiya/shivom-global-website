import React, { useState } from 'react';
import { ArrowRight, Info, Sliders } from 'lucide-react';

export interface GradeMatrixProps {
  onSelectGrade?: (gradeCode: string) => void;
}

interface GradeItem {
  code: string;
  name: string;
  application: string;
  position: string;
  featureTag: string;
}

export const GradeMatrix: React.FC<GradeMatrixProps> = ({ onSelectGrade }) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('BOP');

  const grades: GradeItem[] = [
    {
      code: 'BOP',
      name: 'Broken Orange Pekoe',
      application: 'Commercial blends / full-bodied applications',
      position: 'Larger broken CTC cut',
      featureTag: 'Full-Bodied Base',
    },
    {
      code: 'BOPSM',
      name: 'BOP Small / Mixed',
      application: 'Commercial blends / faster extraction',
      position: 'Smaller granular cut',
      featureTag: 'Rapid Extraction',
    },
    {
      code: 'BP',
      name: 'Broken Pekoe',
      application: 'Blending applications',
      position: 'Medium broken cut',
      featureTag: 'Uniform Granulation',
    },
    {
      code: 'PF',
      name: 'Pekoe Fannings',
      application: 'Tea bags / filter applications',
      position: 'Fine cut',
      featureTag: 'Quick-Infusing',
    },
    {
      code: 'PD',
      name: 'Pekoe Dust',
      application: 'Strong tea / milk tea / commercial applications',
      position: 'Fine granular cut',
      featureTag: 'High-Density Strength',
    },
    {
      code: 'Dust',
      name: 'Commercial Dust',
      application: 'High-strength / foodservice applications',
      position: 'Fine granular cut',
      featureTag: 'Maximum Liquor Yield',
    },
  ];

  const handleGradeAction = (gradeCode: string) => {
    setSelectedGrade(gradeCode);
    if (onSelectGrade) {
      onSelectGrade(gradeCode);
      return;
    }
    const formElement = document.getElementById('requirement-form');
    if (formElement) {
      const headerOffset = 80;
      const elementPosition = formElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleCustomSpecification = () => {
    if (onSelectGrade) {
      onSelectGrade('Custom');
      return;
    }
    const formElement = document.getElementById('requirement-form');
    if (formElement) {
      const headerOffset = 80;
      const elementPosition = formElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="tea-by-grade" className="grade-matrix-section" aria-labelledby="grade-matrix-heading">
      <div className="container">
        
        {/* Section Header */}
        <div className="grade-matrix-header">
          <div className="grade-matrix-eyebrow">
            <span className="spec-badge spec-badge-gold">TEA GRADE REFERENCE</span>
          </div>
          <h2 id="grade-matrix-heading" className="grade-matrix-title">
            Compare Tea Grades by Commercial Application
          </h2>
          <p className="grade-matrix-lead">
            Tea grade selection depends on the intended application, cup profile, extraction requirements and buyer specification.
          </p>
        </div>

        {/* Desktop / Tablet Matrix Table */}
        <div className="grade-matrix-table-wrap" role="region" aria-label="Commercial Tea Grades Matrix">
          <table className="grade-matrix-table">
            <thead>
              <tr>
                <th scope="col" className="th-grade">GRADE</th>
                <th scope="col" className="th-desc">COMMON DESCRIPTION</th>
                <th scope="col" className="th-app">TYPICAL COMMERCIAL APPLICATION</th>
                <th scope="col" className="th-pos">GENERAL POSITION</th>
                <th scope="col" className="th-act">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((item) => {
                const isSelected = selectedGrade === item.code;
                return (
                  <tr 
                    key={item.code} 
                    className={`grade-row ${isSelected ? 'grade-row-selected' : ''}`}
                    onClick={() => setSelectedGrade(item.code)}
                  >
                    <td className="td-grade">
                      <div className="grade-code-badge">
                        <span className="font-spec grade-code-text">{item.code}</span>
                        <span className="grade-feature-pill">{item.featureTag}</span>
                      </div>
                    </td>
                    <td className="td-desc">
                      <div className="grade-full-name">{item.name}</div>
                    </td>
                    <td className="td-app">
                      <div className="grade-app-text">{item.application}</div>
                    </td>
                    <td className="td-pos">
                      <div className="grade-pos-text">{item.position}</div>
                    </td>
                    <td className="td-act">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGradeAction(item.code);
                        }}
                        className={`grade-inquire-btn ${isSelected ? 'grade-inquire-btn-active' : ''}`}
                        aria-label={`Inquire about ${item.code} grade`}
                      >
                        <span>Inquire Grade</span>
                        <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards Layout (rendered when table hidden on small screens) */}
        <div className="grade-matrix-mobile-cards" aria-label="Commercial Tea Grades List">
          {grades.map((item) => {
            const isSelected = selectedGrade === item.code;
            return (
              <div 
                key={item.code} 
                className={`grade-mobile-card ${isSelected ? 'grade-mobile-card-selected' : ''}`}
                onClick={() => setSelectedGrade(item.code)}
              >
                <div className="grade-mobile-top">
                  <div className="grade-code-badge">
                    <span className="font-spec grade-code-text">{item.code}</span>
                    <span className="grade-feature-pill">{item.featureTag}</span>
                  </div>
                  <div className="grade-full-name">{item.name}</div>
                </div>

                <div className="grade-mobile-field">
                  <div className="grade-mobile-label">TYPICAL APPLICATION:</div>
                  <div className="grade-mobile-val">{item.application}</div>
                </div>

                <div className="grade-mobile-field">
                  <div className="grade-mobile-label">GENERAL POSITION:</div>
                  <div className="grade-mobile-val">{item.position}</div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGradeAction(item.code);
                  }}
                  className="grade-mobile-btn"
                  aria-label={`Select ${item.code} grade for inquiry`}
                >
                  <span>Select {item.code} for Requirement</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Specification Disclaimer Note */}
        <div className="grade-disclaimer-strip">
          <Info size={18} className="grade-disclaimer-icon" />
          <p className="grade-disclaimer-text">
            <strong>Specification Note:</strong> Grade descriptions are indicative commercial references. Final grade, cup profile, packing and specification are confirmed against the buyer requirement and sample/quotation stage.
          </p>
        </div>

        {/* Custom Specification Banner */}
        <div className="grade-custom-box">
          <div className="grade-custom-left">
            <div className="grade-custom-badge">
              <Sliders size={15} />
              <span>CUSTOM SPECIFICATIONS & OTHER ORIGINS</span>
            </div>
            <div className="grade-custom-title">
              Looking for Orthodox, Darjeeling, or Custom Sieve Formulations?
            </div>
            <p className="grade-custom-copy">
              Beyond standard Assam CTC grades, we coordinate sourcing for whole-leaf Orthodox grades (TGFOP, FBOP), Darjeeling seasonal invoices, and custom mesh sieve blends matched to your target cup profile.
            </p>
          </div>
          <div className="grade-custom-action">
            <button
              type="button"
              onClick={handleCustomSpecification}
              className="grade-custom-btn"
              aria-label="Discuss custom tea specifications"
            >
              <span>Discuss Custom Specification</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
