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
          
          {/* Column 1: Brand & Sample CTA */}
          <div className="footer-compact-col footer-col-brand">
            <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')} className="footer-logo-link">
              <img 
                src="/Shivom_Global_Header_Logo.svg" 
                alt="SHIVOM GLOBAL" 
                className="footer-compact-logo"
              />
            </a>
            <p className="footer-compact-desc">
              Indian tea supply for international buyers.
            </p>
            <div style={{ marginTop: 'var(--space-3)' }}>
              <a 
                href="#requirement-form" 
                onClick={(e) => handleScrollTo(e, 'requirement-form')}
                className="btn btn-primary btn-sm footer-compact-cta"
              >
                <span>Request Free Samples</span>
                <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore (4 Key Links Only) */}
          <div className="footer-compact-col">
            <h4 className="footer-compact-title">Explore</h4>
            <ul className="footer-compact-list">
              <li>
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-compact-link">
                  Tea Range
                </a>
              </li>
              <li>
                <a href="#tea-by-grade" onClick={(e) => handleScrollTo(e, 'tea-by-grade')} className="footer-compact-link">
                  Grades
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')} className="footer-compact-link">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleScrollTo(e, 'why-us')} className="footer-compact-link">
                  Why Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-compact-col">
            <h4 className="footer-compact-title">Contact</h4>
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
                <a 
                  href="#requirement-form" 
                  onClick={(e) => handleScrollTo(e, 'requirement-form')}
                  className="footer-compact-link"
                >
                  Contact Form
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Minimal Copyright Bar */}
        <div className="footer-compact-bottom">
          <p className="footer-copyright-text">
            &copy; {new Date().getFullYear()} <strong>SHIVOM GLOBAL</strong>. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
