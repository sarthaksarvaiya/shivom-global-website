import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Anchor, 
  Mail, 
  FileText
} from 'lucide-react';

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
    <footer id="footer" className="site-footer" aria-label="Site Footer and Corporate Disclosures">
      <div className="container">
        
        {/* Main Footer 4-Column Grid */}
        <div className="footer-top-grid">
          
          {/* Column 1: Brand & Entity Transparency */}
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <img 
                src="/Shivom_Global_Header_Logo.svg" 
                alt="SHIVOM GLOBAL" 
                className="footer-logo-img"
              />
            </div>

            <p className="footer-brand-desc">
              SHIVOM GLOBAL is an Indian tea sourcing and export coordination firm dedicated to supplying 
              commercial blenders, packers, and private-label brands across international destinations.
            </p>

            <div className="footer-entity-card">
              <div className="footer-entity-heading">
                Entity Registration & Commercial Base
              </div>
              <div className="footer-entity-item">Sole Proprietorship (Proprietor: Sarthak Sarvaiya)</div>
              <div className="footer-entity-item">Udyam MSME Registered (Govt. of India)</div>
              <div className="footer-entity-item">Principal Base: Bhavnagar, Gujarat, India</div>
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

          {/* Column 4: Trade Desk & Export Logistics */}
          <div className="footer-col">
            <h4 className="footer-col-title">Trade Desk & Logistics</h4>
            
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={15} className="footer-contact-icon" />
                <span>Base: Bhavnagar, Gujarat, India</span>
              </div>

              <div className="footer-contact-item">
                <Anchor size={15} className="footer-contact-icon" />
                <span>Loading Ports: Kolkata, Haldia, Mundra, Nhava Sheva (JNPT)</span>
              </div>

              <div className="footer-contact-item">
                <ShieldCheck size={15} className="footer-contact-icon" />
                <span>Trade Terms: FOB Indian Ports / CIF Destination Ports</span>
              </div>

              <div className="footer-contact-item">
                <Mail size={15} className="footer-contact-icon" />
                <span>Trade Desk: inquiries@shivomglobal.com</span>
              </div>

              <div className="footer-action-wrap">
                <a 
                  href="#requirement-form" 
                  onClick={(e) => handleScrollTo(e, 'requirement-form')}
                  className="footer-cta-btn"
                  aria-label="Submit commercial tea requirement to SHIVOM GLOBAL"
                >
                  <span>Submit Requirement</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Statutory Disclosure Note */}
        <div className="footer-disclosure-strip">
          <FileText size={16} className="footer-disclosure-icon" />
          <p className="footer-disclosure-text">
            <strong>Commercial Disclosure:</strong> SHIVOM GLOBAL operates as an Indian tea merchant sourcing and export coordination firm. 
            Tea specifications, cup profiles, packaging formats, and commercial pricing are confirmed against individual buyer specifications, 
            formal quotations, and contracted export sales agreements.
          </p>
        </div>

        {/* Bottom Legal & Governance Sub-Footer */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © 2026 <strong>SHIVOM GLOBAL</strong>. All rights reserved. Indian Registered Commercial Enterprise.
          </div>

          <div className="footer-badges">
            <span className="spec-badge footer-principle-badge">
              Buyer-First, Inventory-Last • Sourced Against Confirmed Parameters
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
