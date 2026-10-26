import React from 'react';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

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
    <footer className="site-footer" role="contentinfo" aria-label="SHIVOM GLOBAL Footer">
      <div className="container">
        
        {/* Compact 3-Column Footer Grid */}
        <div className="footer-compact-grid">
          
          {/* Column 1: Brand & Verified Entity Transparency */}
          <div className="footer-compact-col footer-col-brand" style={{ maxWidth: '340px' }}>
            <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')} className="footer-logo-link">
              <img 
                src="/Shivom_Global_Header_Logo.svg" 
                alt="SHIVOM GLOBAL — Indian Tea Sourcing & Export" 
                className="footer-compact-logo"
              />
            </a>
            <p className="footer-compact-desc" style={{ marginTop: '8px', lineHeight: 1.45 }}>
              Indian tea sourcing &amp; export business coordinating bulk supply and private-label packaging to international specifications.
            </p>

            {/* Factual Statutory Disclosure Block */}
            <div style={{
              marginTop: 'var(--space-3)',
              padding: '10px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: 'var(--text-inverse-muted)',
              lineHeight: 1.5,
            }}>
              <div><strong>Proprietorship:</strong> Sarthak Sarvaiya</div>
              <div><strong>Base:</strong> Bhavnagar, Gujarat, India</div>
              <div><strong>Udyam MSME:</strong> <span className="font-spec">UDYAM-GJ-05-0105835</span></div>
              <div><strong>GSTIN:</strong> <span className="font-spec" style={{ color: 'var(--color-accent-gold)' }}>24KWEPS2703C1ZQ</span></div>
            </div>

            <div style={{ marginTop: 'var(--space-3)' }}>
              <a 
                href="#requirement-form" 
                onClick={(e) => handleScrollTo(e, 'requirement-form')}
                className="btn btn-primary btn-sm footer-compact-cta"
              >
                <span>Tell Us What Tea You Need</span>
                <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation (Sourcing & Export) */}
          <div className="footer-compact-col">
            <h4 className="footer-compact-title">Sourcing &amp; Export</h4>
            <ul className="footer-compact-list">
              <li>
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-compact-link">
                  Tea Sourcing Portfolio
                </a>
              </li>
              <li>
                <a href="#tea-by-grade" onClick={(e) => handleScrollTo(e, 'tea-by-grade')} className="footer-compact-link">
                  Grades &amp; Specifications
                </a>
              </li>
              <li>
                <a href="#private-label" onClick={(e) => handleScrollTo(e, 'private-label')} className="footer-compact-link">
                  Private Label Packaging
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')} className="footer-compact-link">
                  5-Step Sourcing Flow
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleScrollTo(e, 'why-us')} className="footer-compact-link">
                  Export Compliance &amp; Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Trade Desk */}
          <div className="footer-compact-col">
            <h4 className="footer-compact-title">Direct Trade Desk</h4>
            <ul className="footer-compact-list">
              <li>
                <a
                  href={CONTACT_INFO.whatsapp.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-compact-link footer-compact-wa"
                  aria-label={CONTACT_INFO.whatsapp.ariaLabel}
                >
                  <MessageCircle size={14} style={{ color: '#25D366' }} aria-hidden="true" />
                  <span>WhatsApp: {CONTACT_INFO.whatsapp.display}</span>
                </a>
              </li>
              <li>
                <a 
                  href={CONTACT_INFO.email.mailtoLink} 
                  className="footer-compact-link"
                  aria-label={CONTACT_INFO.email.ariaLabel}
                >
                  <Mail size={14} aria-hidden="true" />
                  <span>{CONTACT_INFO.email.address}</span>
                </a>
              </li>
              <li>
                <span className="footer-compact-link" style={{ color: 'var(--text-inverse-muted)', cursor: 'default' }}>
                  Ports: Mundra, Kandla, Kolkata, JNPT
                </span>
              </li>
              <li>
                <span className="footer-compact-link" style={{ color: 'var(--text-inverse-muted)', cursor: 'default' }}>
                  Terms: FOB Indian Ports / CIF Destination
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Minimal Copyright Bar with Buyer-First Governance Note */}
        <div className="footer-compact-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <p className="footer-copyright-text" style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} <strong>SHIVOM GLOBAL</strong> (Proprietor: Sarthak Sarvaiya). All rights reserved.
          </p>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>
            Buyer-First Sourcing Desk &bull; Bhavnagar, Gujarat, India
          </span>
        </div>

      </div>
    </footer>
  );
};
