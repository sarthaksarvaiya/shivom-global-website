import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

export interface SiteHeaderProps {
  onNavigate?: (targetId: string) => void;
  onRequestSamples?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onNavigate, onRequestSamples }) => {
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

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onRequestSamples) {
      onRequestSamples();
    } else {
      handleLinkClick(e, 'requirement-form');
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
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '74px' }}>
        {/* Brand Logo & Positioning */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="header-brand-link"
            aria-label="SHIVOM GLOBAL — Indian Tea Sourcing & Export"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <img 
              src="/Shivom_Global_Header_Logo.svg" 
              alt="SHIVOM GLOBAL — Indian Tea Sourcing & Export" 
              className="header-brand-img"
            />
            <span className="header-subtitle-tag font-spec" style={{
              fontSize: '0.6875rem',
              color: 'var(--color-accent-gold)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
              borderLeft: '1px solid rgba(197, 155, 39, 0.4)',
              paddingLeft: '10px',
              lineHeight: 1.2,
              display: 'none', // Shown on desktop via CSS or media queries
            }}>
              Indian Tea Sourcing &amp; Export
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links — 5 Focused Sourcing Links */}
        <nav 
          className="desktop-nav"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'clamp(1rem, 1.8vw, 1.75rem)',
            margin: '0 var(--space-4)'
          }}
          aria-label="Main Navigation"
        >
          <a 
            href="#our-teas" 
            onClick={(e) => handleLinkClick(e, 'our-teas')}
            className="nav-link"
            style={{ whiteSpace: 'nowrap' }}
          >
            Tea Sourcing
          </a>
          <a 
            href="#tea-by-grade" 
            onClick={(e) => handleLinkClick(e, 'tea-by-grade')}
            className="nav-link"
            style={{ whiteSpace: 'nowrap' }}
          >
            Grades &amp; Specs
          </a>
          <a 
            href="#private-label" 
            onClick={(e) => handleLinkClick(e, 'private-label')}
            className="nav-link"
            style={{ whiteSpace: 'nowrap' }}
          >
            Private Label
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => handleLinkClick(e, 'how-it-works')}
            className="nav-link"
            style={{ whiteSpace: 'nowrap' }}
          >
            Sourcing Flow
          </a>
          <a 
            href="#why-us" 
            onClick={(e) => handleLinkClick(e, 'why-us')}
            className="nav-link"
            style={{ whiteSpace: 'nowrap' }}
          >
            Export Compliance
          </a>
        </nav>

        {/* Desktop Action Area: WhatsApp + Primary CTA (Request Requirement / Quote) */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
          <a
            href={CONTACT_INFO.whatsapp.getLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="header-whatsapp-pill"
            aria-label={CONTACT_INFO.whatsapp.ariaLabel}
            title={`WhatsApp: ${CONTACT_INFO.whatsapp.display}`}
          >
            <MessageCircle size={15} style={{ color: '#25D366' }} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          {/* Primary CTA: Request Requirement / Quote */}
          <a 
            href="#requirement-form" 
            onClick={handleCtaClick}
            className="btn btn-primary btn-sm header-submit-btn"
            style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
            title="Submit tea specifications and request proforma quotation"
          >
            <span>Request Requirement / Quote</span>
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Header Actions */}
        <div className="mobile-header-actions">
          <a
            href={CONTACT_INFO.whatsapp.getLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-header-wa-btn"
            aria-label="Direct WhatsApp Contact"
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
            padding: 'var(--space-5) var(--space-4) var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          <a 
            href="#our-teas" 
            onClick={(e) => handleLinkClick(e, 'our-teas')}
            className="mobile-nav-link"
          >
            Tea
          </a>
          <a 
            href="#tea-by-grade" 
            onClick={(e) => handleLinkClick(e, 'tea-by-grade')}
            className="mobile-nav-link"
          >
            Grades
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => handleLinkClick(e, 'how-it-works')}
            className="mobile-nav-link"
          >
            How It Works
          </a>
          <a 
            href="#why-us" 
            onClick={(e) => handleLinkClick(e, 'why-us')}
            className="mobile-nav-link"
          >
            Why Us
          </a>
          <a 
            href="#requirement-form" 
            onClick={(e) => handleLinkClick(e, 'requirement-form')}
            className="mobile-nav-link"
          >
            Contact
          </a>

          <div style={{ paddingTop: 'var(--space-2)' }}>
            <a 
              href="#requirement-form" 
              onClick={handleCtaClick}
              className="btn btn-primary btn-mobile-full"
              style={{ padding: '12px', fontSize: '0.9375rem', justifyContent: 'center' }}
            >
              <span>Request Requirement / Quote</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
