import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export interface SiteHeaderProps {
  onNavigate?: (targetId: string) => void;
  onRequestSamples?: () => void;
}

interface NavLinkItem {
  id: string;
  label: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 'our-teas', label: 'Tea Sourcing' },
  { id: 'tea-by-grade', label: 'Grades & Specs' },
  { id: 'private-label', label: 'Private Label' },
  { id: 'how-it-works', label: 'Sourcing Flow' },
  { id: 'why-us', label: 'Export Compliance' },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onNavigate, onRequestSamples }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Handle sticky header scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section scroll-spy with smooth detection
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 140; // Detection threshold below 74px header
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(NAV_LINKS[i].id);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Keyboard accessibility: ESC key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Smooth scroll navigation
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(targetId);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 74;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Primary conversion CTA click handler
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
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <div className="header-brand-cluster">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="header-brand-link"
            aria-label="SHIVOM GLOBAL — Indian Tea Sourcing & Export"
          >
            <img
              src="/Shivom_Global_Header_Logo.svg"
              alt="SHIVOM GLOBAL"
              className="header-brand-img"
            />
          </a>
        </div>

        {/* Desktop Navigation Links — 5 Focused Sourcing Links with Scroll-Spy */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Area: Primary Conversion CTA (WhatsApp removed) */}
        <div className="desktop-cta">
          <a
            href="#requirement-form"
            onClick={handleCtaClick}
            className="btn btn-primary header-submit-btn"
            title="Submit tea specifications and request proforma quotation"
          >
            <span>Request a Quote</span>
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Header Actions (Clean Hamburger Toggle Only) */}
        <div className="mobile-header-actions">
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          <div className="mobile-drawer-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                <span>{link.label}</span>
                <ArrowRight size={14} className="mobile-nav-arrow" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mobile-drawer-cta">
            <a
              href="#requirement-form"
              onClick={handleCtaClick}
              className="btn btn-primary btn-mobile-full"
            >
              <span>Request a Quote</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
