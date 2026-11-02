import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  const isScrolledRef = useRef(false);
  const activeSectionRef = useRef('');
  const rafIdRef = useRef<number | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  // Unified scroll listener with requestAnimationFrame throttling to eliminate layout thrashing
  useEffect(() => {
    const checkScrollState = () => {
      rafIdRef.current = null;
      const currentScrollY = window.scrollY;

      // 1. Scrolled backdrop state (20px threshold)
      const scrolled = currentScrollY > 20;
      if (scrolled !== isScrolledRef.current) {
        isScrolledRef.current = scrolled;
        setIsScrolled(scrolled);
      }

      // 2. Active section detection (140px threshold below 74px header)
      const scrollPosition = currentScrollY + 140;
      let detectedSection = '';

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            detectedSection = NAV_LINKS[i].id;
            break;
          }
        }
      }

      if (detectedSection !== activeSectionRef.current) {
        activeSectionRef.current = detectedSection;
        setActiveSection(detectedSection);
      }
    };

    const handleScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(checkScrollState);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial evaluation on mount
    checkScrollState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Background scroll locking when mobile menu is open (with scrollbar compensation)
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar shift on desktop/tablet emulators
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [mobileMenuOpen]);

  // Keyboard accessibility: ESC key closes mobile menu and restores focus to hamburger toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Smooth scroll navigation with accurate 74px header offset
  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
  }, [onNavigate]);

  // Primary conversion CTA click handler
  const handleCtaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onRequestSamples) {
      onRequestSamples();
    } else {
      handleLinkClick(e, 'requirement-form');
    }
  }, [onRequestSamples, handleLinkClick]);

  return (
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`} role="banner">
      <div className="header-container">
        {/* Brand Logo */}
        <div className="header-brand-cluster">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="header-brand-link"
            aria-label="SHIVOM GLOBAL — Indian Tea Sourcing & Export (Return to top)"
          >
            <img
              src="/Shivom_Global_Header_Logo.svg"
              alt="SHIVOM GLOBAL"
              width="192"
              height="48"
              className="header-brand-img"
            />
          </a>
        </div>

        {/* Desktop Navigation Links — 5 Focused Sourcing Links with Live Scroll-Spy */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Action Area: Primary Conversion CTA */}
        <div className="desktop-cta">
          <a
            href="#requirement-form"
            onClick={handleCtaClick}
            className="btn btn-primary header-submit-btn"
            title="Submit tea specifications and request proforma quotation"
          >
            <span>Request a Quote</span>
            <ArrowRight size={14} className="header-cta-icon" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Header Actions (Clean Hamburger Toggle) */}
        <div className="mobile-header-actions">
          <button
            ref={toggleButtonRef}
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop Scrim for Focus & Click-Outside to Close */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

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
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={14} className="mobile-nav-arrow" aria-hidden="true" />
                </a>
              );
            })}
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
