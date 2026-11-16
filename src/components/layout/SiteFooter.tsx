import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Mail, 
  ArrowUp, 
  ShieldCheck, 
  Anchor, 
  Clock, 
  Lock, 
  CheckCircle2, 
  MapPin 
} from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';
import { BRAND_CONFIG } from '@/constants/branding';

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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="site-footer" role="contentinfo" aria-label="SHIVOM GLOBAL Enterprise Footer">
      <div className="container">
        
        {/* 4-Column Balanced Enterprise Grid */}
        <div className="footer-enterprise-grid">
          
          {/* Column 1: Brand & Verified Entity Transparency */}
          <div className="footer-enterprise-col footer-col-identity">
            <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')} className="footer-logo-link" aria-label="SHIVOM GLOBAL Homepage">
              {BRAND_CONFIG.logoPath ? (
                <img 
                  src={BRAND_CONFIG.logoPath} 
                  alt={BRAND_CONFIG.logoAlt} 
                  className="footer-enterprise-logo"
                />
              ) : (
                <div className="footer-brand-mark">
                  <span className="footer-brand-title">{BRAND_CONFIG.legalName}</span>
                  <span className="footer-brand-tagline">{BRAND_CONFIG.subTagline}</span>
                </div>
              )}
            </a>
            <p className="footer-enterprise-desc">
              India-based tea sourcing and export business coordinating primary garden auction lots, bulk container logistics, and private-label packaging to international buyer specifications.
            </p>
          </div>

          {/* Column 2: Tea Origins & Sourcing Matrix */}
          <div className="footer-enterprise-col">
            <h4 className="footer-col-heading">Tea Origins &amp; Grades</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-link">
                  Assam CTC Granular &amp; Dust
                </a>
              </li>
              <li>
                <a href="#tea-by-grade" onClick={(e) => handleScrollTo(e, 'tea-by-grade')} className="footer-link">
                  Assam Orthodox Leaf (FTGFOP / TGFOP)
                </a>
              </li>
              <li>
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-link">
                  Darjeeling Single-Origin Flush
                </a>
              </li>
              <li>
                <a href="#our-teas" onClick={(e) => handleScrollTo(e, 'our-teas')} className="footer-link">
                  Indian Green Tea (Whole Leaf &amp; Fannings)
                </a>
              </li>
              <li>
                <a href="#tea-by-grade" onClick={(e) => handleScrollTo(e, 'tea-by-grade')} className="footer-link">
                  14 Commercial Grade Specifications
                </a>
              </li>
              <li>
                <a href="#private-label" onClick={(e) => handleScrollTo(e, 'private-label')} className="footer-link">
                  Private Label Packaging &amp; Pouches
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Logistics & Trade Governance */}
          <div className="footer-enterprise-col">
            <h4 className="footer-col-heading">Trade &amp; Logistics</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#private-label" onClick={(e) => handleScrollTo(e, 'private-label')} className="footer-link">
                  Container Stuffing (20ft &amp; 40ft FCL)
                </a>
              </li>
              <li>
                <a href="#private-label" onClick={(e) => handleScrollTo(e, 'private-label')} className="footer-link">
                  Ocean Transit Times (3–5d to UAE)
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')} className="footer-link">
                  Two-Phase Quality Export Flow
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleScrollTo(e, 'why-us')} className="footer-link">
                  Official Export Documentation Kit
                </a>
              </li>
              <li>
                <a href="#procurement-faq" onClick={(e) => handleScrollTo(e, 'procurement-faq')} className="footer-link">
                  Institutional Procurement FAQ
                </a>
              </li>
              <li>
                <a href="#requirement-form" onClick={(e) => handleScrollTo(e, 'requirement-form')} className="footer-link footer-link-gold">
                  Request Pre-Shipment Counter-Samples
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Trade Desk & Communications */}
          <div className="footer-enterprise-col footer-col-desk">
            <h4 className="footer-col-heading">Direct Trade Desk</h4>
            
            {/* SLA Badge */}
            <div className="footer-sla-badge font-spec">
              <Clock size={13} aria-hidden="true" />
              <span>24–48h Commercial Response SLA</span>
            </div>

            <ul className="footer-contact-links">
              <li>
                <a
                  href={CONTACT_INFO.whatsapp.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link footer-wa-link"
                  aria-label={CONTACT_INFO.whatsapp.ariaLabel}
                >
                  <MessageCircle size={15} className="footer-wa-icon" aria-hidden="true" />
                  <span>WhatsApp: {CONTACT_INFO.whatsapp.display}</span>
                </a>
              </li>
              <li>
                <a 
                  href={CONTACT_INFO.email.mailtoLink} 
                  className="footer-contact-link"
                  aria-label={CONTACT_INFO.email.ariaLabel}
                >
                  <Mail size={15} aria-hidden="true" />
                  <span>{CONTACT_INFO.email.address}</span>
                </a>
              </li>
              <li className="footer-static-info">
                <MapPin size={15} aria-hidden="true" />
                <span>Primary Loading: Mundra &amp; Kolkata Ports</span>
              </li>
            </ul>

            <div className="footer-cta-wrap">
              <a 
                href="#requirement-form" 
                onClick={(e) => handleScrollTo(e, 'requirement-form')}
                className="btn btn-primary btn-sm footer-primary-cta"
              >
                <span>Tell Us What Tea You Need</span>
                <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

        {/* Commercial Trade Terms & Port Gateway Ribbon (Option B / C) */}
        <div className="footer-gateway-ribbon" role="region" aria-label="Port Gateways & Commercial Terms">
          <div className="gateway-ribbon-item">
            <Anchor size={15} className="gateway-icon" aria-hidden="true" />
            <span><strong>Mundra Port (Gujarat):</strong> 3–5 Days direct ocean transit to Port Jebel Ali (Dubai, UAE)</span>
          </div>
          <div className="gateway-ribbon-sep" aria-hidden="true">&bull;</div>
          <div className="gateway-ribbon-item">
            <CheckCircle2 size={15} className="gateway-icon" aria-hidden="true" />
            <span><strong>IncoTerms 2020:</strong> FOB Indian Ports &amp; CIF Destination Worldwide</span>
          </div>
          <div className="gateway-ribbon-sep" aria-hidden="true">&bull;</div>
          <div className="gateway-ribbon-item">
            <ShieldCheck size={15} className="gateway-icon" aria-hidden="true" />
            <span><strong>Payment:</strong> Irrevocable LC at Sight &amp; Commercial T/T (30/70)</span>
          </div>
        </div>

        {/* Commercial Confidentiality & Trade Privacy Notice */}
        <div className="footer-confidentiality-notice">
          <Lock size={14} className="confidentiality-icon" aria-hidden="true" />
          <p className="confidentiality-text">
            <strong>Commercial Confidentiality Guarantee:</strong> All tea specifications, target price brackets, cupping benchmarks, and buyer contact details submitted to SHIVOM GLOBAL are held strictly confidential and never shared with third-party brokers, competing buyers, or marketing agencies.
          </p>
        </div>

        {/* Bottom Minimal Copyright Bar with Back to Top */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-info">
            <p className="footer-copyright-line">
              &copy; {new Date().getFullYear()} <strong>SHIVOM GLOBAL</strong> (Proprietor: Sarthak Sarvaiya). All rights reserved.
            </p>
            <span className="footer-location-sub">
              Bhavnagar, Gujarat, India &bull; Indian Tea Origin Sourcing &amp; Export Desk
            </span>
          </div>

          <button 
            type="button"
            onClick={handleScrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top of page"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>

      </div>
    </footer>
  );
};
