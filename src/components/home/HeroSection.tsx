import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Globe2, Package, Clock } from 'lucide-react';

export interface HeroSectionProps {
  onExploreGrades?: () => void;
  onSubmitRequirement?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGrades,
  onSubmitRequirement,
}) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="hero-section"
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: 'var(--text-inverse)',
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-16)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-dark-subtle)',
      }}
    >
      {/* 
        HERO BACKGROUND IMAGE & ATMOSPHERIC OVERLAY LAYER
        Authentic Assam tea plantation photography with tuned Deep Forest brand overlay.
        Preserves 75-80% darkening behind headline for white text legibility, while reducing 
        edge darkening to 40-55% so the tea plantation, rolling hills, and textures are clearly recognizable.
      */}
      <div 
        className="hero-bg-layer"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(
              180deg, 
              rgba(7, 34, 24, 0.42) 0%, 
              rgba(7, 34, 24, 0.52) 42%, 
              rgba(7, 34, 24, 0.65) 100%
            ),
            radial-gradient(
              ellipse at 50% 38%, 
              rgba(7, 34, 24, 0.65) 0%, 
              rgba(7, 34, 24, 0.32) 55%, 
              rgba(7, 34, 24, 0.10) 85%
            ),
            url('/images/hero-bg.jpg')
          `,
          backgroundSize: 'auto, auto, cover',
          backgroundPosition: 'center, center, center 35%',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          zIndex: 1,
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Trust Eyebrow Badge */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: 'rgba(255, 255, 255, 0.08)', 
            border: '1px solid rgba(197, 155, 39, 0.3)', 
            padding: '6px 14px', 
            borderRadius: 'var(--radius-full)', 
            marginBottom: 'var(--space-6)' 
          }}>
            <Globe2 size={16} color="var(--color-accent-gold)" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-accent-gold)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              International Tea Sourcing & Export Gateway
            </span>
          </div>

          {/* Primary Main Headline */}
          <h1 style={{ color: 'var(--text-inverse)', marginBottom: 'var(--space-6)', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Indian Tea Sourced for International Markets
          </h1>

          {/* Value Narrative Body */}
          <p className="lead" style={{ color: 'var(--text-inverse-muted)', maxWidth: '740px', margin: '0 auto var(--space-8)', fontSize: '1.1875rem', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
            Reliable B2B supply of bulk Indian teas and customized private-label packaging. 
            Tell us your preferred origin, grade, volume, and discharging port — we source, test, 
            and deliver to your exact commercial specification.
          </p>

          {/* Dual Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-12)' }}>
            <a 
              href="#requirement-form" 
              onClick={(e) => {
                if (onSubmitRequirement) {
                  e.preventDefault();
                  onSubmitRequirement();
                } else {
                  handleScrollTo(e, 'requirement-form');
                }
              }}
              className="btn btn-primary btn-lg"
              style={{ fontWeight: 700, boxShadow: '0 4px 14px rgba(197, 155, 39, 0.35)' }}
            >
              <span>Submit Your Requirement</span>
              <ArrowRight size={18} />
            </a>

            <a 
              href="#tea-by-grade" 
              onClick={(e) => {
                if (onExploreGrades) {
                  e.preventDefault();
                  onExploreGrades();
                } else {
                  handleScrollTo(e, 'tea-by-grade');
                }
              }}
              className="btn btn-secondary-dark btn-lg"
            >
              <span>Explore Tea Grades</span>
            </a>
          </div>

          {/* Core Trust Anchors */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'var(--space-6)', color: 'var(--text-inverse-muted)', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-accent-gold)" />
              <span>Direct Origin Sourcing (Assam & North India)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-accent-gold)" />
              <span>Bulk Supply (25kg Sacks) & Private Label Solutions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-accent-gold)" />
              <span>Target Laboratory & Mesh Specification Matching</span>
            </div>
          </div>
        </div>

        {/* Commercial Pillar Strip (Zero Fake Counters) */}
        <div 
          style={{
            marginTop: 'var(--space-16)',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid var(--border-dark-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-sm)', color: 'var(--color-accent-gold)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Globe2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-inverse-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Origins Sourced</div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-inverse)', marginTop: '2px' }}>Assam, Darjeeling & Terroirs</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-sm)', color: 'var(--color-accent-gold)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-inverse-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grading Standards</div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-inverse)', marginTop: '2px' }} className="font-spec">BOP, BOPSM, BP, PF, PD, Dust</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-sm)', color: 'var(--color-accent-gold)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Package size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-inverse-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Export Packaging</div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-inverse)', marginTop: '2px' }}>25kg Multi-wall Kraft + Liner</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <div style={{ padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-sm)', color: 'var(--color-accent-gold)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-inverse-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Commercial Review</div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-inverse)', marginTop: '2px' }}>24h Business Hour Assessment</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
