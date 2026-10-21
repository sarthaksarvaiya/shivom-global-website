import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageCircle, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

export interface SiteHeaderProps {
  onNavigate?: (targetId: string) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (onNavigate) {
      onNavigate(targetId);
      return;
    }

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
    <header 
      className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(7, 34, 24, 0.98)' : 'var(--color-primary-dark)',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${isScrolled ? 'rgba(197, 155, 39, 0.25)' : 'var(--border-dark-subtle)'}`,
        transition: 'all var(--transition-normal)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Brand Logo — Integrated Directly into Dark Green Header */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, 'hero')}
          className="header-brand-link"
          aria-label="SHIVOM GLOBAL Home"
        >
          <img 
            src="/Shivom_Global_Header_Logo.svg" 
            alt="SHIVOM GLOBAL — Indian Tea Exporter" 
            className="header-brand-img"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav 
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}
          aria-label="Main Navigation"
        >
          <a 
            href="#what-we-do" 
            onClick={(e) => handleLinkClick(e, 'what-we-do')}
            className="nav-link"
          >
            Capabilities
          </a>
          <a 
            href="#our-teas" 
            onClick={(e) => handleLinkClick(e, 'our-teas')}
            className="nav-link"
          >
            Our Teas
          </a>
          <a 
            href="#tea-by-grade" 
            onClick={(e) => handleLinkClick(e, 'tea-by-grade')}
            className="nav-link"
          >
            Tea by Grade
          </a>
          <a 
            href="#how-we-work" 
            onClick={(e) => handleLinkClick(e, 'how-we-work')}
            className="nav-link"
          >
            How We Work
          </a>
          <a 
            href="#private-label" 
            onClick={(e) => handleLinkClick(e, 'private-label')}
            className="nav-link"
          >
            Private Label
          </a>
          <a 
            href="#why-us" 
            onClick={(e) => handleLinkClick(e, 'why-us')}
            className="nav-link"
          >
            Why Us
          </a>
        </nav>

        {/* Desktop Direct Contact & Requirement CTA Group */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {/* Direct Contact Cluster: WhatsApp | Call | Email */}
          <div className="header-contact-group" role="region" aria-label="Direct Buyer Contact Channels">
            <a
              href={CONTACT_INFO.whatsapp.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="header-contact-item header-contact-whatsapp"
              aria-label={CONTACT_INFO.whatsapp.ariaLabel}
              title={`WhatsApp: ${CONTACT_INFO.whatsapp.display}`}
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span className="header-contact-label">WhatsApp</span>
            </a>

            <span className="header-contact-divider" aria-hidden="true">|</span>

            <a
              href={CONTACT_INFO.phone.telLink}
              className="header-contact-item header-contact-phone"
              aria-label={CONTACT_INFO.phone.ariaLabel}
              title={`Call Us: ${CONTACT_INFO.phone.display}`}
            >
              <Phone size={14} aria-hidden="true" />
              <span className="header-contact-label">Call</span>
            </a>

            <span className="header-contact-divider" aria-hidden="true">|</span>

            <a
              href={CONTACT_INFO.email.mailtoLink}
              className="header-contact-item header-contact-email"
              aria-label={CONTACT_INFO.email.ariaLabel}
              title={`Email: ${CONTACT_INFO.email.address}`}
            >
              <Mail size={14} aria-hidden="true" />
              <span className="header-contact-label">Email</span>
            </a>
          </div>

          {/* Primary Sourcing Requirement CTA */}
          <a 
            href="#requirement-form" 
            onClick={(e) => handleLinkClick(e, 'requirement-form')}
            className="btn btn-primary btn-sm header-submit-btn"
            style={{ fontWeight: 700 }}
          >
            <span>Submit Requirement</span>
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Header Direct Contact & Hamburger Actions */}
        <div className="mobile-header-actions">
          <a
            href={CONTACT_INFO.whatsapp.getLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-header-wa-btn"
            aria-label="Direct WhatsApp Contact with Trade Desk"
            title="WhatsApp SHIVOM GLOBAL"
          >
            <MessageCircle size={18} aria-hidden="true" />
          </a>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-inverse)',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer"
          style={{
            backgroundColor: 'var(--color-primary-dark)',
            borderTop: '1px solid var(--border-dark-subtle)',
            padding: 'var(--space-6) var(--space-4) var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          {/* Priority Direct Buyer Contact Card */}
          <div className="mobile-drawer-contact-card">
            <div className="mobile-drawer-contact-title">
              Direct Buyer Contact
            </div>
            <div className="mobile-drawer-contact-lead">
              Reach our trade desk directly for sourcing, specifications & export pricing:
            </div>
            
            <div className="mobile-drawer-contact-actions">
              <a
                href={CONTACT_INFO.whatsapp.getLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-contact-tile tile-whatsapp"
                aria-label="Chat with SHIVOM GLOBAL on WhatsApp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <div className="mobile-tile-text">
                  <span className="mobile-tile-label">WhatsApp</span>
                  <span className="mobile-tile-val">{CONTACT_INFO.whatsapp.display}</span>
                </div>
              </a>

              <a
                href={CONTACT_INFO.phone.telLink}
                className="mobile-contact-tile tile-phone"
                aria-label="Call SHIVOM GLOBAL directly"
              >
                <Phone size={17} aria-hidden="true" />
                <div className="mobile-tile-text">
                  <span className="mobile-tile-label">Phone</span>
                  <span className="mobile-tile-val">{CONTACT_INFO.phone.display}</span>
                </div>
              </a>

              <a
                href={CONTACT_INFO.email.mailtoLink}
                className="mobile-contact-tile tile-email"
                aria-label="Email SHIVOM GLOBAL directly"
              >
                <Mail size={17} aria-hidden="true" />
                <div className="mobile-tile-text">
                  <span className="mobile-tile-label">Email</span>
                  <span className="mobile-tile-val">{CONTACT_INFO.email.address}</span>
                </div>
              </a>
            </div>
          </div>

          <a 
            href="#what-we-do" 
            onClick={(e) => handleLinkClick(e, 'what-we-do')}
            className="mobile-nav-link"
          >
            Capabilities
          </a>
          <a 
            href="#our-teas" 
            onClick={(e) => handleLinkClick(e, 'our-teas')}
            className="mobile-nav-link"
          >
            Our Teas
          </a>
          <a 
            href="#tea-by-grade" 
            onClick={(e) => handleLinkClick(e, 'tea-by-grade')}
            className="mobile-nav-link"
          >
            Tea by Grade
          </a>
          <a 
            href="#how-we-work" 
            onClick={(e) => handleLinkClick(e, 'how-we-work')}
            className="mobile-nav-link"
          >
            How We Work
          </a>
          <a 
            href="#private-label" 
            onClick={(e) => handleLinkClick(e, 'private-label')}
            className="mobile-nav-link"
          >
            Private Label & OEM
          </a>
          <a 
            href="#why-us" 
            onClick={(e) => handleLinkClick(e, 'why-us')}
            className="mobile-nav-link"
          >
            Why Buyers Work With Us
          </a>

          <div style={{ paddingTop: 'var(--space-2)' }}>
            <a 
              href="#requirement-form" 
              onClick={(e) => handleLinkClick(e, 'requirement-form')}
              className="btn btn-primary btn-mobile-full"
              style={{ padding: '14px', fontSize: '1rem' }}
            >
              <span>Submit Requirement</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
