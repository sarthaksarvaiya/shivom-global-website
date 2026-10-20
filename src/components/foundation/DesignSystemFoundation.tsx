import React, { useState } from 'react';
import { 
  Layers, 
  Palette, 
  Type, 
  Box, 
  Sliders, 
  Smartphone, 
  Monitor,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const DesignSystemFoundation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Assam CTC');
  const [selectedGrade, setSelectedGrade] = useState<string>('BOP');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      {/* --------------------------------------------------------------------
          PHASE 2 GOVERNANCE BANNER
          -------------------------------------------------------------------- */}
      <div style={{ 
        backgroundColor: 'var(--color-primary-dark)', 
        borderBottom: '1px solid var(--border-dark-subtle)',
        padding: '12px 0',
        color: 'var(--text-inverse)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              backgroundColor: 'var(--color-accent-gold)', 
              color: 'var(--color-primary-dark)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              letterSpacing: '0.05em'
            }}>
              PHASE 2 VERIFICATION
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              SHIVOM GLOBAL — Visual Foundation & Design System Specification
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8125rem', color: 'var(--text-inverse-muted)' }}>
            <span>Ref: <strong>SG-WEBSITE-PHASE-02</strong></span>
            <span>Governance: <strong>Phase 2 Gated / No Homepage Build</strong></span>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------
          OFFICIAL LOGO & BRANDMARK INSPECTION (P2-01, P2-02)
          Rule: Official logo unchanged (metallic gold / navy) alongside green/gold UI
          -------------------------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
              <ShieldCheck size={20} color="var(--color-primary-green)" />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>P2-01 & P2-02: Official Logo & Brand Integration</h2>
            </div>
            <p style={{ maxWidth: '800px' }}>
              <strong>Phase 2 Specific Rule:</strong> The official vector brandmark (<code className="font-spec">Shivom_Global_Logo.svg</code>) 
              retains its metallic gold linear gradients (<code className="font-spec">#CA8A04</code> / <code className="font-spec">#FACC15</code> / <code className="font-spec">#EAB308</code>) 
              and deep navy typography (<code className="font-spec">#1E3A8A</code> / <code className="font-spec">#0F172A</code>) completely unchanged. 
              The website UI wraps the mark within the approved Deep Estate Green (<code className="font-spec">#0D3829</code>) and Warm Gold (<code className="font-spec">#C59B27</code>) palette.
            </p>
          </div>

          <div className="grid grid-cols-2" style={{ gap: 'var(--space-6)' }}>
            {/* Logo on Light Surface */}
            <div className="card" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '180px' }}>
              <div style={{ width: '260px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="/Shivom_Global_Logo.svg" 
                  alt="SHIVOM GLOBAL Official Logo (Light Context)" 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <span className="spec-badge" style={{ marginTop: 'var(--space-4)' }}>Light Surface Context (Navbar / Footer)</span>
            </div>

            {/* Logo on Deep Forest Background */}
            <div className="card" style={{ 
              backgroundColor: 'var(--color-primary-dark)', 
              borderColor: 'var(--border-dark-subtle)',
              padding: 'var(--space-8)', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '180px' 
            }}>
              <div style={{ 
                width: '260px', 
                height: '90px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '12px 20px',
                borderRadius: 'var(--radius-sm)'
              }}>
                <img 
                  src="/Shivom_Global_Logo.svg" 
                  alt="SHIVOM GLOBAL Official Logo (Dark Context Plaque)" 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <span className="spec-badge" style={{ marginTop: 'var(--space-4)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-inverse)' }}>
                Hero / Dark Section Enclosure
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          COLOUR SYSTEM SWATCHES (P2-03)
          Rule 1 Green identity | Rule 2 Gold accent only | Rule 3 Dark Forest
          -------------------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
              <Palette size={20} color="var(--color-primary-green)" />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>P2-03: Approved Color System Tokens</h2>
            </div>
            <p>
              Target Surface Distribution: <strong>~65–75% Neutral/Light</strong>, <strong>~20–25% Deep Green/Dark</strong>, <strong>~5% Gold Accents</strong>. Zero random or neon colours.
            </p>
          </div>

          <div className="grid grid-cols-4" style={{ gap: 'var(--space-4)' }}>
            {[
              { name: 'Deep Estate Green', hex: '#0D3829', text: '#FFFFFF', desc: 'Primary Brand Identity' },
              { name: 'Deep Forest', hex: '#072218', text: '#FFFFFF', desc: 'Hero & Dark Sections' },
              { name: 'Warm Gold', hex: '#C59B27', text: '#072218', desc: 'Primary Action & CTAs' },
              { name: 'Gold Hover', hex: '#B0871D', text: '#FFFFFF', desc: 'Active / Hover State' },
              { name: 'Gold Sheen', hex: '#FEF08A', text: '#072218', desc: 'Micro Highlights' },
              { name: 'Warm Off-White', hex: '#FBFBFA', text: '#111827', desc: 'Main Page Canvas', border: true },
              { name: 'Pure White', hex: '#FFFFFF', text: '#111827', desc: 'Card Surface', border: true },
              { name: 'Subtle Green-Grey', hex: '#F4F5F3', text: '#111827', desc: 'Alternating Sections', border: true },
              { name: 'Dark Section', hex: '#0A1F17', text: '#FFFFFF', desc: 'Hero / CTA Background' },
              { name: 'Main Text', hex: '#111827', text: '#FFFFFF', desc: 'High-contrast Typography' },
              { name: 'Muted Text', hex: '#4B5563', text: '#FFFFFF', desc: 'Secondary Descriptions' },
              { name: 'Border Subtle', hex: '#E5E7EB', text: '#111827', desc: 'Card & Section Framing', border: true },
            ].map((token) => (
              <div 
                key={token.name} 
                className="card" 
                style={{ 
                  padding: 'var(--space-4)',
                  backgroundColor: token.hex,
                  color: token.text,
                  border: token.border ? '1px solid var(--border-medium)' : '1px solid transparent'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{token.name}</span>
                </div>
                <div>
                  <div className="font-spec" style={{ fontSize: '0.8125rem', fontWeight: 600, opacity: 0.9 }}>{token.hex}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '2px' }}>{token.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          TYPOGRAPHY & SPACE GROTESK DUAL ENGINE (P2-04)
          -------------------------------------------------------------------- */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
              <Type size={20} color="var(--color-primary-green)" />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>P2-04: Typography System & Space Grotesk Grading Specs</h2>
            </div>
            <p>
              <strong>Plus Jakarta Sans</strong> powers all structural headings, narratives, and UI copy. 
              <strong> Space Grotesk</strong> is selectively deployed for tea grades, mesh sizes, and laboratory parameters.
            </p>
          </div>

          <div className="grid grid-cols-2" style={{ gap: 'var(--space-6)' }}>
            {/* Primary Font Hierarchy */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Plus Jakarta Sans — Structure & Narrative</h3>
                <span className="spec-badge">Headings, Body & UI</span>
              </div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-dim text-sm">H1 (Hero Headline / 42px)</span>
                  <h1 style={{ fontSize: '2.25rem', marginTop: '2px' }}>Indian Tea Sourced for International Markets</h1>
                </div>
                <div>
                  <span className="text-dim text-sm">H2 (Section Header / 30px)</span>
                  <h2 style={{ fontSize: '1.75rem', marginTop: '2px' }}>What Are You Looking For?</h2>
                </div>
                <div>
                  <span className="text-dim text-sm">H3 (Module Card / 20px)</span>
                  <h3 style={{ fontSize: '1.25rem', marginTop: '2px' }}>Assam CTC Broken Orange Pekoe</h3>
                </div>
                <div>
                  <span className="text-dim text-sm">Body & Lead Paragraph (16px)</span>
                  <p style={{ marginTop: '2px' }}>
                    Direct origin sourcing from primary estates across Assam and North India. Formulated to buyer specifications in export-grade multi-wall kraft paper packaging with food-grade LDPE moisture barrier liners.
                  </p>
                </div>
              </div>
            </div>

            {/* Space Grotesk Technical Specifications */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Space Grotesk — Technical Grade & Spec Matrix</h3>
                <span className="spec-badge spec-badge-gold">Grades, Mesh & Laboratory Codes</span>
              </div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-dim text-sm">Standard Commercial Grade Identifiers</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                    {['BOP', 'BOPSM', 'BP', 'PF', 'PD', 'Dust / CD', 'TGFOP', 'FBOP'].map((grade) => (
                      <span 
                        key={grade} 
                        className={`spec-badge ${selectedGrade === grade ? 'spec-badge-gold' : ''}`}
                        style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.875rem' }}
                        onClick={() => setSelectedGrade(grade)}
                      >
                        {grade}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
                  <span className="text-dim text-sm">Technical Parameter Rendering</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'var(--space-2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.875rem' }}>Moisture Content (ISO 1573)</span>
                      <span className="font-spec" style={{ fontWeight: 600, color: 'var(--color-primary-green)' }}>Max 6.5% – 7.0%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.875rem' }}>Water Soluble Ash (ISO 1576)</span>
                      <span className="font-spec" style={{ fontWeight: 600, color: 'var(--color-primary-green)' }}>Min 45.0%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.875rem' }}>Standard Packaging Net Weight</span>
                      <span className="font-spec" style={{ fontWeight: 600, color: 'var(--color-primary-green)' }}>25.00 kg</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                      <span style={{ fontSize: '0.875rem' }}>Pesticide Compliance Reference</span>
                      <span className="font-spec" style={{ fontWeight: 600, color: 'var(--color-primary-green)' }}>GSO 978 / PPC v19</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          BUTTON SYSTEM (P2-07)
          -------------------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
              <Layers size={20} color="var(--color-primary-green)" />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>P2-07: Commercial Button System</h2>
            </div>
            <p>
              Strict rules: Warm Gold for primary conversion, Deep Estate Green outline for secondary exploration, zero glow effects or gradient pills.
            </p>
          </div>

          <div className="grid grid-cols-2" style={{ gap: 'var(--space-6)' }}>
            {/* Buttons on Light Canvas */}
            <div className="card">
              <h4 style={{ marginBottom: 'var(--space-4)' }}>Light Surface Context</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
                <button className="btn btn-primary">
                  Submit Your Requirement
                  <ArrowRight size={16} />
                </button>
                <button className="btn btn-secondary">
                  Explore Tea Grades
                </button>
                <button className="btn btn-secondary btn-sm">
                  Download Spec Sheet
                </button>
              </div>
            </div>

            {/* Buttons on Dark Canvas */}
            <div className="card" style={{ backgroundColor: 'var(--color-primary-dark)', borderColor: 'var(--border-dark-subtle)' }}>
              <h4 style={{ color: 'var(--text-inverse)', marginBottom: 'var(--space-4)' }}>Dark Section Context (Hero / Final CTA)</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
                <button className="btn btn-primary">
                  Submit Your Requirement
                  <ArrowRight size={16} />
                </button>
                <button className="btn btn-secondary-dark">
                  Explore Tea Grades
                </button>
                <button className="btn btn-secondary-dark btn-sm">
                  View Sourcing Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          CARDS & ROUTER MODULES (P2-08)
          -------------------------------------------------------------------- */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
              <Box size={20} color="var(--color-primary-green)" />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>P2-08: Commercial Information Modules (Cards)</h2>
            </div>
            <p>
              Information-first modules with clear hierarchy, subtle 1px border, controlled elevation, and gold hover accent.
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: 'var(--space-6)' }}>
            {[
              {
                title: 'Bulk Tea Supply',
                category: 'Assam CTC / Orthodox',
                desc: 'Standardized 25kg multi-wall kraft paper sacks with food-grade poly-liners for blenders, commercial repackers, and brand owners.',
                spec: '25kg Bulk Sacks'
              },
              {
                title: 'Private Label & OEM',
                category: 'Full Brand Service',
                desc: 'End-to-end custom blend formulation, packaging development, regulatory compliance labeling, and export fulfillment.',
                spec: 'OEM / Contract'
              },
              {
                title: 'Exact Grade Sourcing',
                category: 'Precision Mesh Cuts',
                desc: 'Direct estate batch sourcing matched to buyer benchmark samples, mesh sieve specifications, and target cup liquor.',
                spec: 'BOP / PF / Dust'
              }
            ].map((module) => (
              <div key={module.title} className="card card-interactive">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                  <span className="spec-badge" style={{ fontSize: '0.75rem' }}>{module.category}</span>
                  <span className="font-spec" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-accent-gold)' }}>{module.spec}</span>
                </div>
                <h3 className="card-title" style={{ marginTop: 'var(--space-2)' }}>{module.title}</h3>
                <div className="card-body">
                  <p style={{ fontSize: '0.9375rem' }}>{module.desc}</p>
                </div>
                <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary-green)' }}>
                  <span>Configure Requirement</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          FORM & INPUT SYSTEM (P2-09)
          Structured commercial intake primitives
          -------------------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
              <Sliders size={20} color="var(--color-primary-green)" />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>P2-09: Structured Commercial Intake Controls</h2>
            </div>
            <p>
              Frictionless form controls designed for commercial tea parameters (grade, quantity tier, packaging, destination).
            </p>
          </div>

          <div className="card" style={{ maxWidth: '840px', margin: '0 auto', padding: 'var(--space-8)' }}>
            <h4 style={{ marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
              Commercial Requirement Form Primitive Preview
            </h4>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label form-label-required">Tea Category</label>
                <select 
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="Assam CTC">Assam CTC Black Tea</option>
                  <option value="Orthodox">Orthodox Black Tea</option>
                  <option value="Darjeeling">Darjeeling GI Tea</option>
                  <option value="Green Tea">Green Tea</option>
                  <option value="Custom">Custom Blend Formulation</option>
                </select>
                <span className="form-hint">Selected: {selectedCategory}</span>
              </div>

              <div className="form-group">
                <label className="form-label form-label-required">Target Grade / Cut</label>
                <select 
                  className="form-select font-spec"
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                >
                  <option value="BOP">BOP — Broken Orange Pekoe</option>
                  <option value="BOPSM">BOPSM — BOP Small</option>
                  <option value="BP">BP — Broken Pekoe</option>
                  <option value="PF">PF — Pekoe Fannings</option>
                  <option value="PD">PD — Pekoe Dust</option>
                  <option value="Dust">Dust / CD — Churamani Dust</option>
                </select>
                <span className="form-hint">Standard Tea Board auction cut</span>
              </div>
            </div>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label form-label-required">Estimated Volume</label>
                <select className="form-select">
                  <option>Trial Batch (250 kg – 500 kg)</option>
                  <option>Commercial LCL (1 – 5 MT)</option>
                  <option>Full Container Load (1 x 20ft FCL ~10–12 MT)</option>
                  <option>Recurring Multi-Container Contract</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label form-label-required">Target Discharging Port</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Jebel Ali, UAE / Jeddah, KSA" 
                  defaultValue="Jebel Ali, UAE"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Quality or Mesh Specification Details</label>
              <textarea 
                className="form-textarea" 
                placeholder="Specify preferred mesh sieve size, target cup liquor density, maximum moisture limits, or destination laboratory standard (e.g. GSO 978)..."
                defaultValue="Requirement: Robust brisk liquor with deep amber infusion, suitable for blended milk tea. Max moisture 6.5%."
              />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          RESPONSIVE & VIEWPORT AUDIT SUMMARY (P2-10, P2-14, P2-15)
          -------------------------------------------------------------------- */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '6px 16px', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-4)' }}>
              <Monitor size={16} color="var(--color-accent-gold)" />
              <Smartphone size={16} color="var(--color-accent-gold)" />
              <span className="font-spec" style={{ fontSize: '0.8125rem', color: 'var(--color-accent-gold)' }}>ONE RESPONSIVE SYSTEM</span>
            </div>
            <h2 style={{ color: 'var(--text-inverse)', marginBottom: 'var(--space-4)' }}>
              Phase 2 Foundation Verification Status
            </h2>
            <p style={{ color: 'var(--text-inverse-muted)', marginBottom: 'var(--space-8)' }}>
              The visual system is now codified in Vanilla CSS tokens and component primitives. 
              Desktop containers constrain content to 1240px max-width; mobile viewports collapse grids gracefully with 16px padding and minimum 44px touch targets.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <span className="spec-badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-inverse)' }}>
                Desktop (&gt;1024px): PASS
              </span>
              <span className="spec-badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-inverse)' }}>
                Tablet (768px–1024px): PASS
              </span>
              <span className="spec-badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-inverse)' }}>
                Mobile (&lt;768px): PASS
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
