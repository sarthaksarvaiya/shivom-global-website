import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageCircle, Mail, Phone } from 'lucide-react';

export interface SiteHeaderProps {
  onNavigate?: (sectionId: string) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

        {/* Desktop CTA Button */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <a
            href="https://wa.me/919737030437?text=Hi%20SHIVOM%20GLOBAL%2C%20I%20would%20like%20to%20discuss%20a%20tea%20requirement."
            target="_blank"
            rel="noopener noreferrer"
            className="header-whatsapp-btn"
            aria-label="Chat with SHIVOM GLOBAL on WhatsApp"
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>
          <a 
            href="#requirement-form" 
            onClick={(e) => handleLinkClick(e, 'requirement-form')}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 700 }}
          >
            <span>Submit Requirement</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
          style={{
            display: 'none',
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

          {/* Mobile Contact Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4) 0', borderTop: '1px solid var(--border-dark-subtle)' }}>
            <a
              href="https://wa.me/919737030437?text=Hi%20SHIVOM%20GLOBAL%2C%20I%20would%20like%20to%20discuss%20a%20tea%20requirement."
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-contact-link mobile-contact-whatsapp"
              aria-label="WhatsApp SHIVOM GLOBAL"
            >
              <MessageCircle size={18} />
              <span>+91 97370 30437</span>
            </a>
            <a
              href="mailto:shivomglobal1010@gmail.com"
              className="mobile-contact-link"
              aria-label="Email SHIVOM GLOBAL"
            >
              <Mail size={16} />
              <span>shivomglobal1010@gmail.com</span>
            </a>
            <a
              href="tel:+919737030437"
              className="mobile-contact-link"
              aria-label="Call SHIVOM GLOBAL"
            >
              <Phone size={16} />
              <span>+91 97370 30437</span>
            </a>
          </div>

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
