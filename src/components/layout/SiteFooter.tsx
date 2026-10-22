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
              SHIVOM GLOBAL is an Indian tea merchant export firm supplying tea to 
              blenders, packers, and private-label brands across international markets.
            </p>

            <div className="footer-entity-badge">
              <div className="footer-entity-heading">
                Enterprise Details &amp; Operational Base
              </div>
              <div className="footer-entity-item">Sole Proprietorship (Proprietor: {CONTACT_INFO.proprietor})</div>
              <div className="footer-entity-item">Udyam MSME Registered (Govt. of India)</div>
              <div className="footer-entity-item">Operational Base: {CONTACT_INFO.address.display}</div>
            </div>
          </div>

          {/* Column 2: Tea Portfolio */}
          <div className="footer-col">
            <h4 className="footer-col-title">Tea Range</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-nav-link">
                  Assam CTC Black Tea
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-nav-link">
                  Orthodox Black Tea
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-nav-link">
                  Darjeeling Specialty Tea
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-nav-link">
                  Indian Green Tea
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#tea-by-grade" onClick={(e) => handleScrollTo(e, 'tea-by-grade')} className="footer-nav-link">
                  Tea Grade Specification Table
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#private-label" onClick={(e) => handleScrollTo(e, 'private-label')} className="footer-nav-link">
                  Custom Packing &amp; Private Label
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Site Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-nav-link">
                  Teas We Supply
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#tea-by-grade" onClick={(e) => handleScrollTo(e, 'tea-by-grade')} className="footer-nav-link">
                  Grade Table
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#private-label" onClick={(e) => handleScrollTo(e, 'private-label')} className="footer-nav-link">
                  Packaging Options
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')} className="footer-nav-link">
                  How It Works
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#why-us" onClick={(e) => handleScrollTo(e, 'why-us')} className="footer-nav-link">
                  Why SHIVOM GLOBAL
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#about-sarthak" onClick={(e) => handleScrollTo(e, 'about-sarthak')} className="footer-nav-link">
                  About Sarthak
                </a>
              </li>
              <li className="footer-nav-item">
                <a href="#requirement-form" onClick={(e) => handleScrollTo(e, 'requirement-form')} className="footer-nav-link footer-nav-highlight">
                  Request Free Samples
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Dedicated Direct Buyer Contact Area */}
          <div className="footer-col">
            <h4 className="footer-col-title">Direct Trade Desk</h4>
            <p className="footer-contact-lead">
              For tea sourcing, sample evaluation, quotations and export requirements, contact Sarthak directly.
            </p>
            
            <div className="footer-contact-list">
              {/* Business Name */}
              <div className="footer-contact-item">
                <Building2 size={15} className="footer-contact-icon" aria-hidden="true" />
                <span className="footer-company-name">{CONTACT_INFO.companyName}</span>
              </div>

              {/* WhatsApp */}
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

              {/* Phone */}
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

              {/* Email */}
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

              {/* Address */}
              <div className="footer-contact-item">
                <MapPin size={15} className="footer-contact-icon" aria-hidden="true" />
                <span>Base: {CONTACT_INFO.address.display}</span>
              </div>

              {/* Shipping Ports */}
              <div className="footer-contact-item">
                <Anchor size={15} className="footer-contact-icon" aria-hidden="true" />
                <span>Export Ports: {CONTACT_INFO.ports.loading}</span>
              </div>

              {/* Trade Terms */}
              <div className="footer-contact-item">
                <ShieldCheck size={15} className="footer-contact-icon" aria-hidden="true" />
                <span>Trade Terms: {CONTACT_INFO.tradeTerms}</span>
              </div>

              {/* Request Samples Button */}
              <div className="footer-action-wrap">
                <a 
                  href="#requirement-form" 
                  onClick={(e) => handleScrollTo(e, 'requirement-form')}
                  className="footer-cta-btn"
                  aria-label="Request Free Samples from SHIVOM GLOBAL"
                >
                  <span>Request Free Samples</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Disclosure Note */}
        <div className="footer-disclosure-strip">
          <FileText size={16} className="footer-disclosure-icon" aria-hidden="true" />
          <p className="footer-disclosure-text">
            <strong>Export Disclosure:</strong> SHIVOM GLOBAL operates as an Indian tea export merchant firm. Tea specifications, sample evaluations, packaging formats, and pricing are confirmed against confirmed buyer requirements and formal export agreements.
          </p>
        </div>

        {/* Bottom Legal Sub-Footer */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            &copy; 2026 <strong>SHIVOM GLOBAL</strong>. All rights reserved. Registered Indian Enterprise.
          </div>

          <div className="footer-badges">
            <span className="spec-badge footer-principle-badge">
              Trial MOQ 250 kg &bull; Samples Available &bull; Direct Trade Desk
            </span>
            <span className="footer-market-scope">
              B2B Indian Tea Export
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
