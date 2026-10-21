import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Anchor, 
  MessageCircle, 
  Phone, 
  Mail,
  Building2
} from 'lucide-react';
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
        
        {/* Main 4-Column Footer Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Brand & Entity Registration */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo-plaque">
              <img 
                src="/Shivom_Global_Logo.svg" 
                alt="SHIVOM GLOBAL — Official Brand Mark" 
                className="footer-logo-img"
              />
            </div>

            <p className="footer-brand-desc">
              SHIVOM GLOBAL is an Indian tea merchant export firm dedicated to supplying 
              commercial blenders, packers, and private-label brands across international markets.
            </p>

            <div className="footer-entity-badge">
              <div className="footer-entity-heading">
                Entity Registration & Commercial Base
              </div>
              <div className="footer-entity-item">Sole Proprietorship (Proprietor: {CONTACT_INFO.proprietor})</div>
              <div className="footer-entity-item">Udyam MSME Registered (Govt. of India)</div>
              <div className="footer-entity-item">Principal Base: {CONTACT_INFO.address.display}</div>
            </div>
          </div>

          {/* Column 2: Tea Categories & Grades */}
          <div className="footer-col">
            <h4 className="footer-col-title">Tea Sourcing Portfolio</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="#assam-ctc" onClick={(e) => handleScrollTo(e, 'assam-ctc')} className="footer-nav-link">
                  Assam CTC Black Tea
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-nav-link">
                  Orthodox Black Tea (Whole & Broken Leaf)
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-nav-link">
                  Darjeeling GI Specialty Tea
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-nav-link">
                  Specialty & Regional Teas (On-Demand)
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#tea-by-grade" onClick={(e) => handleScrollTo(e, 'tea-by-grade')} className="footer-nav-link">
                  Commercial Tea Grade Reference Matrix
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#private-label" onClick={(e) => handleScrollTo(e, 'private-label')} className="footer-nav-link">
                  Private Label & OEM Contract Packing Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial Homepage Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Commercial Navigation</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-nav-link">
                  What We Supply (Categories)
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#assam-ctc" onClick={(e) => handleScrollTo(e, 'assam-ctc')} className="footer-nav-link">
                  Assam CTC Spotlight
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#who-we-serve" onClick={(e) => handleScrollTo(e, 'who-we-serve')} className="footer-nav-link">
                  Who We Serve (Buyer Segments)
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#how-we-work" onClick={(e) => handleScrollTo(e, 'how-we-work')} className="footer-nav-link">
                  How We Work (Sourcing Journey)
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#why-us" onClick={(e) => handleScrollTo(e, 'why-us')} className="footer-nav-link">
                  Why SHIVOM GLOBAL
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#export-documentation" onClick={(e) => handleScrollTo(e, 'export-documentation')} className="footer-nav-link">
                  Export & Documentation
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#requirement-form" onClick={(e) => handleScrollTo(e, 'requirement-form')} className="footer-nav-link footer-nav-highlight">
                  Submit Commercial Requirement
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Dedicated Direct Buyer Contact Area */}
          <div className="footer-col">
            <h4 className="footer-col-title">Direct Buyer Contact</h4>
            <p className="footer-contact-lead">
              For tea sourcing, specifications, documentation and export requirements, contact SHIVOM GLOBAL directly.
            </p>
            
            <div className="footer-contact-list">
              {/* Business Name */}
              <div className="footer-contact-item">
                <Building2 size={15} className="footer-contact-icon" aria-hidden="true" />
                <span className="footer-company-name">{CONTACT_INFO.companyName}</span>
              </div>

              {/* WhatsApp (Clickable) */}
              <div className="footer-contact-item">
                <MessageCircle size={15} className="footer-contact-icon" aria-hidden="true" />
                <a
                  href={CONTACT_INFO.whatsapp.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link footer-whatsapp-link"
                  aria-label={CONTACT_INFO.whatsapp.ariaLabel}
                >
                  WhatsApp: {CONTACT_INFO.whatsapp.display}
                </a>
              </div>

              {/* Phone (Clickable dialer) */}
              <div className="footer-contact-item">
                <Phone size={15} className="footer-contact-icon" aria-hidden="true" />
                <a 
                  href={CONTACT_INFO.phone.telLink} 
                  className="footer-contact-link"
                  aria-label={CONTACT_INFO.phone.ariaLabel}
                >
                  Phone: {CONTACT_INFO.phone.display}
                </a>
              </div>

              {/* Email (Clickable mailto) */}
              <div className="footer-contact-item">
                <Mail size={15} className="footer-contact-icon" aria-hidden="true" />
                <a 
                  href={CONTACT_INFO.email.mailtoLink} 
                  className="footer-contact-link"
                  aria-label={CONTACT_INFO.email.ariaLabel}
                >
                  {CONTACT_INFO.email.address}
                </a>
              </div>

              {/* Approved Business Address */}
              <div className="footer-contact-item">
                <MapPin size={15} className="footer-contact-icon" aria-hidden="true" />
                <span>Base: {CONTACT_INFO.address.display}</span>
              </div>

              {/* Shipping Ports */}
              <div className="footer-contact-item">
                <Anchor size={15} className="footer-contact-icon" aria-hidden="true" />
                <span>Loading: {CONTACT_INFO.ports.loading}</span>
              </div>

              {/* Trade Terms */}
              <div className="footer-contact-item">
                <ShieldCheck size={15} className="footer-contact-icon" aria-hidden="true" />
                <span>Trade Terms: {CONTACT_INFO.tradeTerms}</span>
              </div>

              {/* Requirement Form Button */}
              <div className="footer-action-wrap">
                <a 
                  href="#requirement-form" 
                  onClick={(e) => handleScrollTo(e, 'requirement-form')}
                  className="footer-cta-btn"
                  aria-label="Submit commercial tea requirement to SHIVOM GLOBAL"
                >
                  <span>Submit Requirement</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Statutory Disclosure Note */}
        <div className="footer-disclosure-strip">
          <FileText size={16} className="footer-disclosure-icon" aria-hidden="true" />
          <p className="footer-disclosure-text">
            <strong>Commercial Disclosure:</strong> SHIVOM GLOBAL operates as an Indian tea merchant sourcing and export coordination firm. 
            Tea specifications, cup profiles, packaging formats, and commercial pricing are confirmed against individual buyer specifications, 
            formal quotations, and contracted export sales agreements.
          </p>
        </div>

        {/* Bottom Legal & Commercial Sub-Footer */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © 2026 <strong>SHIVOM GLOBAL</strong>. All rights reserved. Indian Registered Commercial Enterprise.
          </div>

          <div className="footer-badges">
            <span className="spec-badge footer-principle-badge">
              Requirement-Led Sourcing • Confirmed Specifications &amp; Terms
            </span>
            <span className="footer-market-scope">
              B2B International Tea Sourcing
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
