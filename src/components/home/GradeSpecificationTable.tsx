import React from 'react';
import { ArrowRight, Sliders, Info, Check } from 'lucide-react';

export interface GradeSpecificationTableProps {
  onSelectGrade?: (gradeCode: string) => void;
  selectedGrade?: string;
}

export interface TeaGradeItem {
  code: string;
  name: string;
  category: string;
  particleProfile: string;
  cupCharacter: string;
  typicalApplication: string;
  highlightTag?: string;
}

export const GradeSpecificationTable: React.FC<GradeSpecificationTableProps> = ({
  onSelectGrade,
  selectedGrade,
}) => {
  const grades: TeaGradeItem[] = [
    {
      code: 'BOP',
      name: 'Broken Orange Pekoe',
      category: 'Assam CTC',
      particleProfile: 'Bold, robust granular leaf cut (largest CTC grade)',
      cupCharacter: 'Rich amber-red liquor, full body, balanced infusion',
      typicalApplication: 'Bulk blending foundation, traditional loose-leaf retail packets',
      highlightTag: 'Bold Leaf',
    },
    {
      code: 'BOPSM',
      name: 'Broken Orange Pekoe Small',
      category: 'Assam CTC',
      particleProfile: 'Medium-to-bold even granular cut',
      cupCharacter: 'Deep amber cup, brisk strength, excellent milk reactivity',
      typicalApplication: 'High-selling consumer packet teas, strong family blends',
      highlightTag: 'Brisk & Balanced',
    },
    {
      code: 'BP',
      name: 'Broken Pekoe',
      category: 'Assam CTC',
      particleProfile: 'Medium granular size with consistent density',
      cupCharacter: 'Bright reddish-amber infusion, sharp briskness, rich aroma',
      typicalApplication: 'Everyday strong tea blends, milk chai, food service',
      highlightTag: 'Strong Infusion',
    },
    {
      code: 'PF',
      name: 'Pekoe Fannings',
      category: 'Assam CTC',
      particleProfile: 'Fine, uniform granular sizing (quick percolation)',
      cupCharacter: 'Rapid deep color release, punchy malt flavor, high liquor yield',
      typicalApplication: 'Standard tea bags, single-serve filter packs, instant Karak',
      highlightTag: 'Rapid Extraction',
    },
    {
      code: 'PD',
      name: 'Pekoe Dust',
      category: 'Assam CTC',
      particleProfile: 'Fine granular dust with high surface area',
      cupCharacter: 'Intense dark liquor, instantaneous extraction, rich body in milk',
      typicalApplication: 'Hotels, restaurants, street chai vendors, vending machines',
      highlightTag: 'Maximum Yield',
    },
    {
      code: 'Dust / D1',
      name: 'Dust 1 (Finest Cut)',
      category: 'Assam CTC',
      particleProfile: 'Micro-cut granular particles for maximum percolation',
      cupCharacter: 'Maximum color intensity, bold astringency, instant infusion',
      typicalApplication: 'Commercial foodservice, institutional catering, chai blends',
      highlightTag: 'Instant Color',
    },
    {
      code: 'TGFOP',
      name: 'Tippy Golden Flowery Orange Pekoe',
      category: 'Orthodox',
      particleProfile: 'Long wiry whole leaf with delicate golden tips',
      cupCharacter: 'Bright golden liquor, floral aroma, subtle sweet-wood notes',
      typicalApplication: 'Premium loose-leaf tins, specialty tea boutiques, gift packs',
      highlightTag: 'Whole Leaf Tip',
    },
    {
      code: 'FBOP',
      name: 'Flowery Broken Orange Pekoe',
      category: 'Orthodox',
      particleProfile: 'Neatly broken orthodox leaf with silver/golden tips',
      cupCharacter: 'Deep golden-amber cup, rich bouquet, pleasant astringency',
      typicalApplication: 'English breakfast blends, loose tea retail, luxury hospitality',
      highlightTag: 'Aromatic Broken',
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
            <span className="spec-badge spec-badge-gold">TEA GRADE REFERENCE</span>
          </div>
          <h2 id="grade-table-heading" className="grade-matrix-title">
            Tea Grade &amp; Specification Table
          </h2>
          <p className="grade-matrix-lead">
            Compare leaf particle size, cup character, and intended applications to identify the right grade for your market.
          </p>
        </div>

        {/* Mobile Horizontal Scroll Hint */}
        <div className="grade-table-scroll-hint font-spec" aria-hidden="true">
          <span>&larr; Scroll horizontally to view all specifications &rarr;</span>
        </div>

        {/* Authoritative Grade Table */}
        <div className="grade-matrix-table-wrap" role="region" aria-label="Authoritative Tea Grades Table" tabIndex={0}>
          <table className="grade-matrix-table">
            <thead>
              <tr>
                <th scope="col" className="th-grade">GRADE</th>
                <th scope="col" className="th-cat">CATEGORY</th>
                <th scope="col" className="th-desc">FULL NAME &amp; PARTICLE PROFILE</th>
                <th scope="col" className="th-cup">CUP &amp; LIQUOR CHARACTER</th>
                <th scope="col" className="th-app">TYPICAL APPLICATIONS</th>
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
                  >
                    {/* Grade Code */}
                    <td className="td-grade">
                      <div className="grade-code-badge">
                        <span className="font-spec grade-code-text">{item.code}</span>
                        {item.highlightTag && (
                          <span className="grade-feature-pill">{item.highlightTag}</span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="td-cat font-spec" style={{ fontSize: '0.8125rem', color: 'var(--color-primary-green)', fontWeight: 600 }}>
                      {item.category}
                    </td>

                    {/* Name & Particle Profile */}
                    <td className="td-desc">
                      <div className="grade-full-name">{item.name}</div>
                      <div className="grade-profile-detail">{item.particleProfile}</div>
                    </td>

                    {/* Cup & Liquor Character */}
                    <td className="td-cup">
                      <div className="grade-cup-text">{item.cupCharacter}</div>
                    </td>

                    {/* Application */}
                    <td className="td-app">
                      <div className="grade-app-text">{item.typicalApplication}</div>
                    </td>

                    {/* Action */}
                    <td className="td-act">
                      <button
                        type="button"
                        onClick={() => handleGradeClick(item.code)}
                        className={`grade-inquire-btn ${isSelected ? 'grade-inquire-btn-active' : ''}`}
                        aria-label={`Select ${item.code} for requirement inquiry`}
                      >
                        {isSelected ? (
                          <>
                            <Check size={14} aria-hidden="true" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <>
                            <span>Select Grade</span>
                            <ArrowRight size={13} aria-hidden="true" />
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
          <Info size={18} className="grade-disclaimer-icon" aria-hidden="true" />
          <p className="grade-disclaimer-text">
            <strong>Specification Note:</strong> Grade descriptions represent standard industry baselines. Mesh sizes, moisture content (max 6.5%&ndash;7.0%), liquor density, and packaging formats are confirmed against your requirement and pre-shipment samples.
          </p>
        </div>

        {/* Custom Specification Action */}
        <div className="grade-custom-box">
          <div className="grade-custom-left">
            <div className="grade-custom-badge font-spec">
              <Sliders size={14} aria-hidden="true" />
              <span>CUSTOM FORMULATIONS</span>
            </div>
            <div className="grade-custom-title">
              Require a Custom Sieve Cut, Unique Mesh, or Specific Benchmark Sample?
            </div>
            <p className="grade-custom-copy">
              We match physical target samples, custom sieve distributions, and specific liquor strengths across Assam CTC and Orthodox gardens.
            </p>
          </div>
          <div className="grade-custom-action">
            <button
              type="button"
              onClick={handleCustomInquiry}
              className="btn btn-primary btn-sm"
              aria-label="Request custom tea blend or sieve specification"
            >
              <span>Request Custom Specification</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
