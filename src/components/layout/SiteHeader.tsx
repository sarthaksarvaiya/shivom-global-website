import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

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
        {/* Brand Logo Enclosure — Retains Official Logo Unaltered with Refined Gold Framing */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, 'hero')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            backgroundColor: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(197, 155, 39, 0.35)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
            height: '48px',
            transition: 'border-color var(--transition-fast)',
          }}
          aria-label="SHIVOM GLOBAL Home"
        >
          <img 
            src="/Shivom_Global_Logo.svg" 
            alt="SHIVOM GLOBAL — Indian Tea Exporter" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
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
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
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

          <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-dark-subtle)' }}>
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
