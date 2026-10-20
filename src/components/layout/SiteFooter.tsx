import React from 'react';
import { MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const SiteFooter: React.FC = () => {
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
    <footer 
      id="footer"
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: 'var(--text-inverse)',
        borderTop: '1px solid var(--border-dark-subtle)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-12)',
      }}
    >
      <div className="container">
        
        {/* Main Footer 4-Column Grid */}
        <div 
          className="grid grid-cols-4" 
          style={{ 
            gap: 'var(--space-8)', 
            paddingBottom: 'var(--space-12)', 
            borderBottom: '1px solid var(--border-dark-subtle)' 
          }}
        >
          
          {/* Column 1: Brand & Corporate Disclosure */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ 
              display: 'inline-flex',
              backgroundColor: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-sm)',
              width: 'fit-content',
            }}>
              <img 
                src="/Shivom_Global_Logo.svg" 
                alt="SHIVOM GLOBAL — Official Logo" 
                style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
              />
            </div>

            <p style={{ color: 'var(--text-inverse-muted)', fontSize: '0.875rem', lineHeight: 'var(--leading-relaxed)' }}>
              SHIVOM GLOBAL is an Indian tea merchant export firm dedicated to supplying 
              commercial blenders, packers, and private-label brands across international markets.
            </p>

            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              padding: '10px 12px', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border-dark-subtle)',
              fontSize: '0.75rem',
              color: 'var(--text-inverse-muted)',
            }}>
              <div style={{ fontWeight: 700, color: 'var(--color-accent-gold)', marginBottom: '2px' }}>
                Entity Registration & Compliance
              </div>
              <div>Sole Proprietorship (Sarthak Sarvaiya)</div>
              <div>Udyam MSME: Verified on File</div>
              <div>Principal Base: Bhavnagar, Gujarat, India</div>
            </div>
          </div>

          {/* Column 2: Tea Categories & Terroirs */}
          <div>
            <h4 style={{ color: 'var(--text-inverse)', fontSize: '1rem', marginBottom: 'var(--space-4)', letterSpacing: '0.02em' }}>
              Tea Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li>
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  Assam CTC Black Tea
                </a>
              </li>
              <li>
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  Orthodox Black Tea
                </a>
              </li>
              <li>
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  Darjeeling GI Specialty
                </a>
              </li>
              <li>
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  Indian Mountain Green Tea
                </a>
              </li>
              <li>
                <a href="#tea-by-grade" onClick={(e) => handleScrollTo(e, 'tea-by-grade')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  Custom Sieve & Blend Formulations
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial Navigation */}
          <div>
            <h4 style={{ color: 'var(--text-inverse)', fontSize: '1rem', marginBottom: 'var(--space-4)', letterSpacing: '0.02em' }}>
              Commercial Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li>
                <a href="#what-we-do" onClick={(e) => handleScrollTo(e, 'what-we-do')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  Bulk Supply Solutions (25kg)
                </a>
              </li>
              <li>
                <a href="#tea-by-grade" onClick={(e) => handleScrollTo(e, 'tea-by-grade')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  Tea by Grade (BOP, BP, PF, PD, Dust)
                </a>
              </li>
              <li>
                <a href="#how-we-work" onClick={(e) => handleScrollTo(e, 'how-we-work')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  How We Work (6-Step Roadmap)
                </a>
              </li>
              <li>
                <a href="#private-label" onClick={(e) => handleScrollTo(e, 'private-label')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  Private Label & OEM Solutions
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleScrollTo(e, 'why-us')} className="nav-link" style={{ fontSize: '0.875rem' }}>
                  Why Buyers Work With Us
                </a>
              </li>
              <li>
                <a href="#requirement-form" onClick={(e) => handleScrollTo(e, 'requirement-form')} className="nav-link" style={{ fontSize: '0.875rem', color: 'var(--color-accent-gold)', fontWeight: 600 }}>
                  Submit Tea Requirement
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Sourcing & Inquiry SLA */}
          <div>
            <h4 style={{ color: 'var(--text-inverse)', fontSize: '1rem', marginBottom: 'var(--space-4)', letterSpacing: '0.02em' }}>
              Export Coordination
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: '0.875rem', color: 'var(--text-inverse-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} color="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Principal Base: Bhavnagar, Gujarat, India</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Clock size={16} color="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Commercial Review SLA: 24 Business Hours</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Shipping Incoterms: FOB Indian Ports / CIF Global Ports</span>
              </div>

              <div style={{ marginTop: 'var(--space-2)' }}>
                <a 
                  href="#requirement-form" 
                  onClick={(e) => handleScrollTo(e, 'requirement-form')}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Submit Requirement</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Governance Sub-Footer */}
        <div style={{ 
          paddingTop: 'var(--space-6)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 'var(--space-4)',
          fontSize: '0.8125rem',
          color: 'var(--text-dim)',
        }}>
          <div>
            © 2026 <strong>SHIVOM GLOBAL</strong>. All rights reserved. Registered Indian Enterprise.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <span className="spec-badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', color: 'var(--color-gold-sheen)' }}>
              "Buyer-First, Inventory-Last" (DEC-001)
            </span>
            <span>B2B Commercial Tea Sourcing</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
