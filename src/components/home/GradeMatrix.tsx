import React, { useState } from 'react';
import { Sliders, ArrowRight, CheckCircle2, Info } from 'lucide-react';

export interface GradeMatrixProps {
  onSelectGrade?: (gradeCode: string) => void;
}

export const GradeMatrix: React.FC<GradeMatrixProps> = ({ onSelectGrade }) => {
  const [activeGradeIndex, setActiveGradeIndex] = useState<number>(0);

  const grades = [
    {
      code: 'BOP',
      name: 'Broken Orange Pekoe',
      category: 'Primary Broken Leaf Cut',
      mesh: '14 – 18 Mesh',
      infusionTime: '3 – 5 min',
      strengthRating: 7, // out of 10
      colorRating: 7,
      cutCharacteristics: 'Coarser, uniform broken leaf particles with minimal stalk/fibre.',
      liquorProfile: 'Balanced liquor, rich malty body, pleasant brisk astringency with golden ring.',
      idealFor: 'Traditional loose-leaf retail, classic English & Irish breakfast blends, gourmet packaging.',
      standardPack: '25kg Multi-wall Kraft Sack',
    },
    {
      code: 'BOPSM',
      name: 'Broken Orange Pekoe Small',
      category: 'Medium Broken Leaf Cut',
      mesh: '18 – 24 Mesh',
      infusionTime: '2 – 3 min',
      strengthRating: 8,
      colorRating: 8,
      cutCharacteristics: 'Medium broken leaf cut with clean granulation and high bulk density.',
      liquorProfile: 'Stronger color extraction, rich red infusion, brisk cup with outstanding milk affinity.',
      idealFor: 'Commercial daily tea blends, samovar preparation, high-turnover consumer brands.',
      standardPack: '25kg Multi-wall Kraft Sack',
    },
    {
      code: 'BP',
      name: 'Broken Pekoe',
      category: 'Heavy Granular Leaf Cut',
      mesh: '16 – 20 Mesh',
      infusionTime: '3 – 4 min',
      strengthRating: 8,
      colorRating: 8,
      cutCharacteristics: 'Rounded, heavier grain particles providing steady, consistent liquor extraction.',
      liquorProfile: 'Deep reddish-brown liquor, smooth cup body, full and rounded mouthfeel.',
      idealFor: 'Commercial blend base for tea packers and international commodity importers.',
      standardPack: '25kg Multi-wall Kraft Sack',
    },
    {
      code: 'PF',
      name: 'Pekoe Fannings',
      category: 'Fine Granular Cut',
      mesh: '24 – 30 Mesh',
      infusionTime: '1 – 2 min',
      strengthRating: 9,
      colorRating: 9,
      cutCharacteristics: 'Fine, clean, high-density granular particles designed for fast infusion.',
      liquorProfile: 'Instant bright reddish-amber liquor, sharp briskness, rapid extraction with milk.',
      idealFor: 'Quick-brew tea bags, hotel & restaurant blends, Gulf Karak tea formulations.',
      standardPack: '25kg Multi-wall Kraft Sack',
    },
    {
      code: 'PD',
      name: 'Pekoe Dust',
      category: 'Dense Dust Cut',
      mesh: '30 – 40 Mesh',
      infusionTime: '< 1 min',
      strengthRating: 10,
      colorRating: 10,
      cutCharacteristics: 'Very fine, heavy, uniform granules providing immediate liquor release.',
      liquorProfile: 'Deep reddish-black cup, heavy liquor density, maximum astringent strength.',
      idealFor: 'High-yield commercial catering, samovar milk tea, street chai stalls, strong Karak blends.',
      standardPack: '25kg Multi-wall Kraft Sack',
    },
    {
      code: 'Dust / CD',
      name: 'Churamani Dust',
      category: 'Ultra-Fine Commercial Cut',
      mesh: '40+ Mesh',
      infusionTime: 'Instant',
      strengthRating: 10,
      colorRating: 10,
      cutCharacteristics: 'Ultra-fine granular cut delivering maximum yield per kilogram of tea leaf.',
      liquorProfile: 'Maximum dark color intensity and strong briskness in seconds.',
      idealFor: 'Economical high-volume commercial catering, mass-market tea bags, instant milk tea chai.',
      standardPack: '25kg Multi-wall Kraft Sack',
    },
  ];

  const activeGrade = grades[activeGradeIndex];

  const handleRequestGrade = (gradeCode: string) => {
    if (onSelectGrade) {
      onSelectGrade(gradeCode);
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
    <section id="tea-by-grade" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-12)' }}>
          <span className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            TEA BOARD AUCTION STANDARDS
          </span>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>
            Tea by Grade & Specification
          </h2>
          <p className="lead">
            Standard Indian commercial auction gradings and custom sieve formulations. 
            Evaluate particle sizing, mesh dimensions, liquor extraction dynamics, and commercial use cases.
          </p>
        </div>

        {/* Grade Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-8)' 
        }}>
          {grades.map((grade, idx) => (
            <button
              key={grade.code}
              onClick={() => setActiveGradeIndex(idx)}
              className={`spec-badge ${activeGradeIndex === idx ? 'spec-badge-gold' : ''}`}
              style={{
                fontSize: '0.9375rem',
                padding: '10px 18px',
                cursor: 'pointer',
                border: activeGradeIndex === idx ? '1px solid var(--color-accent-gold)' : '1px solid var(--border-subtle)',
                backgroundColor: activeGradeIndex === idx ? 'var(--color-primary-dark)' : 'var(--bg-surface)',
                color: activeGradeIndex === idx ? 'var(--color-accent-gold)' : 'var(--text-main)',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span>{grade.code}</span>
            </button>
          ))}
        </div>

        {/* Active Grade Deep-Dive Spotlight Card */}
        <div className="card grade-spotlight-card" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }} className="grade-spotlight-grid">
            
            {/* Left Column: Grade Overview & Sizing */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                <span className="spec-badge spec-badge-gold" style={{ fontSize: '0.875rem' }}>
                  {activeGrade.code}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {activeGrade.category}
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-4)', color: 'var(--text-main)' }}>
                {activeGrade.name}
              </h3>

              <p style={{ fontSize: '0.9375rem', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                {activeGrade.cutCharacteristics}
              </p>

              {/* Technical Attributes Box */}
              <div style={{ 
                backgroundColor: 'var(--bg-surface-subtle)', 
                borderRadius: 'var(--radius-sm)', 
                padding: 'var(--space-4)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Mesh Sieve Size:</span>
                  <span className="font-spec" style={{ fontWeight: 700, color: 'var(--color-primary-green)' }}>
                    {activeGrade.mesh}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Infusion Time:</span>
                  <span className="font-spec" style={{ fontWeight: 700, color: 'var(--color-primary-green)' }}>
                    {activeGrade.infusionTime}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Standard Packaging:</span>
                  <span className="font-spec" style={{ fontWeight: 700, color: 'var(--color-primary-green)' }}>
                    {activeGrade.standardPack}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Liquor & Applications */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ marginBottom: 'var(--space-3)' }}>Liquor Profile & Cup Character</h4>
                <p style={{ fontSize: '0.9375rem', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
                  {activeGrade.liquorProfile}
                </p>

                <h4 style={{ marginBottom: 'var(--space-2)' }}>Recommended Commercial Application</h4>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: 'var(--space-6)' }}>
                  <CheckCircle2 size={18} color="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                    {activeGrade.idealFor}
                  </span>
                </div>

                {/* Sourcing Note */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-dim)', backgroundColor: 'var(--bg-page)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                  <Info size={14} color="var(--color-primary-green)" />
                  <span>Available in both straight estate lots and custom blended formulations.</span>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
                <button 
                  onClick={() => handleRequestGrade(activeGrade.code)}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span>Request Quotation for {activeGrade.code} Grade</span>
                    <ArrowRight size={16} style={{ flexShrink: 0 }} />
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Custom Specification Banner */}
        <div style={{ 
          marginTop: 'var(--space-8)', 
          maxWidth: '960px', 
          margin: 'var(--space-8) auto 0',
          padding: 'var(--space-6)', 
          backgroundColor: 'var(--color-primary-dark)', 
          color: 'var(--text-inverse)', 
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent-gold)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              <Sliders size={16} />
              <span>Tailored Blend Formulations</span>
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>
              Need a Custom Mesh Size, Price Target, or Counter-Sample Match?
            </div>
            <p style={{ color: 'var(--text-inverse-muted)', fontSize: '0.875rem', marginTop: '2px', maxWidth: '640px' }}>
              Send us your target liquor profile, mesh sieve distribution, or physical counter-sample. We formulate and source matching lots.
            </p>
          </div>
          <button 
            onClick={() => handleRequestGrade('Custom Specification')}
            className="btn btn-secondary-dark btn-sm"
          >
            <span>Configure Custom Blend</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};
