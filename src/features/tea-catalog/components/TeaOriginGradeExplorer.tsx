import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  Info, 
  Check, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Eye, 
  Plus 
} from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';
import { CommercialGradeSpecification, TeaCategoryExplorerItem } from '../types/gradeMatrix';
import { COMMERCIAL_GRADES_CATALOG, TEA_CATEGORIES_EXPLORER } from '../data/commercialGradesData';
import { GradeSpecificationDrawer } from './GradeSpecificationDrawer';
import { SampleShortlistBar } from './SampleShortlistBar';

export interface TeaOriginGradeExplorerProps {
  onSelectGrade?: (gradeCode: string) => void;
  selectedGrade?: string;
}

type FilterCategoryKey = 'ALL' | 'ctc' | 'orthodox' | 'darjeeling' | 'green';

export const TeaOriginGradeExplorer: React.FC<TeaOriginGradeExplorerProps> = ({
  onSelectGrade,
  selectedGrade,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<FilterCategoryKey>('ALL');
  const [drawerGrade, setDrawerGrade] = useState<CommercialGradeSpecification | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [isShortlistDismissed, setIsShortlistDismissed] = useState<boolean>(false);

  const gradesSectionRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const filterOptions = [
    { key: 'ALL' as const, label: 'All Sourcing Grades' },
    { key: 'ctc' as const, label: 'Assam CTC' },
    { key: 'orthodox' as const, label: 'Assam Orthodox' },
    { key: 'darjeeling' as const, label: 'Darjeeling Single-Origin' },
    { key: 'green' as const, label: 'Indian Green Tea' },
  ];

  const filteredGrades = activeCategoryFilter === 'ALL'
    ? COMMERCIAL_GRADES_CATALOG
    : COMMERCIAL_GRADES_CATALOG.filter((g) => g.categorySlug === activeCategoryFilter);

  // Smooth scroll to buyer form
  const scrollToForm = () => {
    const formElement = document.getElementById('requirement-form');
    if (formElement) {
      const headerOffset = 80;
      const elementPosition = formElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scroll to grade collection when category card is clicked
  const handleCategoryCardClick = (catSlug: 'ctc' | 'orthodox' | 'darjeeling' | 'green') => {
    setActiveCategoryFilter(catSlug);
    if (gradesSectionRef.current) {
      const headerOffset = 85;
      const elementPosition = gradesSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Keyboard navigation for tablist
  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;
    const totalTabs = filterOptions.length;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % totalTabs;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (currentIndex - 1 + totalTabs) % totalTabs;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = totalTabs - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== null) {
      const nextKey = filterOptions[nextIndex].key;
      setActiveCategoryFilter(nextKey);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  // Single grade selection
  const handleSingleGradeSelect = (gradeCode: string) => {
    if (onSelectGrade) {
      onSelectGrade(gradeCode);
    } else {
      scrollToForm();
    }
  };

  // Shortlist management
  const handleToggleShortlist = (gradeCode: string) => {
    setIsShortlistDismissed(false);
    setShortlist((prev) => {
      if (prev.includes(gradeCode)) {
        return prev.filter((c) => c !== gradeCode);
      }
      return [...prev, gradeCode];
    });
  };

  const handleRemoveFromShortlist = (gradeCode: string) => {
    setShortlist((prev) => prev.filter((c) => c !== gradeCode));
  };

  const handleClearShortlist = () => {
    setShortlist([]);
  };

  const handleProceedWithShortlist = (selectedCodes: string[]) => {
    setIsShortlistDismissed(true);
    const formattedSelection = selectedCodes.join(' · ');
    if (onSelectGrade) {
      onSelectGrade(formattedSelection);
    } else {
      scrollToForm();
    }
  };

  // Drawer control
  const handleOpenDrawer = (grade: CommercialGradeSpecification) => {
    setDrawerGrade(grade);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleCustomInquiry = () => {
    if (onSelectGrade) {
      onSelectGrade('Custom Specification');
    } else {
      scrollToForm();
    }
  };

  return (
    <section 
      id="tea-by-grade" 
      className="tea-explorer-section" 
      aria-labelledby="tea-explorer-heading"
    >
      <div className="container">

        {/* ==================================================================
            A. Editorial Hero — Tea Collection Introduction
            ================================================================== */}
        <header className="tea-explorer-hero">
          <div className="tea-explorer-eyebrow">
            <span className="spec-badge spec-badge-gold">INDIAN TEA SOURCING COLLECTION</span>
          </div>

          <h2 id="tea-explorer-heading" className="tea-explorer-title">
            Discover the Character of Indian Tea
          </h2>

          <p className="tea-explorer-lead">
            Explore India's distinguished tea-growing regions, commercial grades and specialty selections. 
            Every sourcing requirement is evaluated against buyer specifications and supplier availability.
          </p>

          {/* Sourcing Metrics Highlight Strip */}
          <div className="tea-explorer-metrics font-spec" role="region" aria-label="Sourcing portfolio overview">
            <div className="tea-explorer-metric-item">
              <span className="tea-explorer-metric-num">14</span>
              <span className="tea-explorer-metric-label">Commercial Sourcing Grades</span>
            </div>
            <div className="tea-explorer-metric-sep" aria-hidden="true">&bull;</div>
            <div className="tea-explorer-metric-item">
              <span className="tea-explorer-metric-num">4</span>
              <span className="tea-explorer-metric-label">Distinct Terroir Categories</span>
            </div>
            <div className="tea-explorer-metric-sep" aria-hidden="true">&bull;</div>
            <div className="tea-explorer-metric-item">
              <span className="tea-explorer-metric-num">100%</span>
              <span className="tea-explorer-metric-label">Pre-Shipment Counter-Samples</span>
            </div>
            <div className="tea-explorer-metric-sep" aria-hidden="true">&bull;</div>
            <div className="tea-explorer-metric-item">
              <span className="tea-explorer-metric-num">3–5 Days</span>
              <span className="tea-explorer-metric-label">Gujarat Ports to Port Jebel Ali</span>
            </div>
          </div>
        </header>

        {/* ==================================================================
            B. Visual Tea Category Explorer (4 Distinct Category Cards)
            ================================================================== */}
        <section className="tea-explorer-category-deck" aria-label="Indian Tea Manufacturing Categories">
          <div className="tea-explorer-cat-grid">
            {TEA_CATEGORIES_EXPLORER.map((cat: TeaCategoryExplorerItem) => {
              const isCatActive = activeCategoryFilter === cat.id;

              return (
                <article 
                  key={cat.id} 
                  className={`tea-explorer-cat-card ${isCatActive ? 'tea-explorer-cat-card-active' : ''}`}
                >
                  {/* Category Image Banner with Visual Frame */}
                  <div className="tea-explorer-cat-media">
                    <picture>
                      <source srcSet={cat.imageWebp} type="image/webp" />
                      <img 
                        src={cat.imageJpg} 
                        alt={`${cat.name} authentic leaf and infusion`} 
                        className="tea-explorer-cat-img"
                        loading="lazy"
                      />
                    </picture>
                    <div className="tea-explorer-cat-badge font-spec">
                      {cat.badge}
                    </div>
                  </div>

                  {/* Category Content */}
                  <div className="tea-explorer-cat-body">
                    <div className="tea-explorer-cat-terroir font-spec">
                      <Compass size={13} aria-hidden="true" />
                      <span>{cat.terroir}</span>
                    </div>

                    <h3 className="tea-explorer-cat-name">{cat.name}</h3>
                    <p className="tea-explorer-cat-headline">{cat.headline}</p>
                    <p className="tea-explorer-cat-desc">{cat.description}</p>

                    {/* Applications List */}
                    <div className="tea-explorer-cat-apps font-spec">
                      {cat.keyApplications.map((app, aIdx) => (
                        <span key={aIdx} className="tea-explorer-cat-app-pill">
                          {app}
                        </span>
                      ))}
                    </div>

                    {/* Action Button: Explore Grades */}
                    <button
                      type="button"
                      onClick={() => handleCategoryCardClick(cat.id)}
                      className={`tea-explorer-cat-btn ${isCatActive ? 'tea-explorer-cat-btn-active' : ''}`}
                      aria-label={`Explore ${cat.name} grades`}
                    >
                      <span>Explore Grades</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ==================================================================
            C. Interactive Visual Grade Collection
            ================================================================== */}
        <section 
          ref={gradesSectionRef} 
          className="tea-explorer-grades-section" 
          aria-labelledby="grades-collection-heading"
        >
          {/* Collection Filter & Heading Bar */}
          <div className="tea-explorer-grades-toolbar">
            <div className="tea-explorer-grades-title-wrap">
              <h3 id="grades-collection-heading" className="tea-explorer-grades-heading">
                Commercial Grade Specifications
              </h3>
              <p className="tea-explorer-grades-sub">
                Select any grade to view technical parameters or shortlist sample lots.
              </p>
            </div>

            {/* WAI-ARIA Filter Tablist */}
            <div 
              className="tea-explorer-tablist" 
              role="tablist" 
              aria-label="Filter tea grades by category"
            >
              {filterOptions.map((opt, idx) => {
                const isActive = activeCategoryFilter === opt.key;
                return (
                  <button
                    key={opt.key}
                    ref={(el) => { tabRefs.current[idx] = el; }}
                    type="button"
                    role="tab"
                    id={`explorer-tab-${opt.key}`}
                    aria-selected={isActive}
                    aria-controls={`explorer-panel-${opt.key}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveCategoryFilter(opt.key)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`tea-explorer-tab-btn ${isActive ? 'tea-explorer-tab-btn-active' : ''}`}
                  >
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Responsive Visual Grid of Grade Cards */}
          <div 
            id={`explorer-panel-${activeCategoryFilter}`}
            role="tabpanel"
            aria-labelledby={`explorer-tab-${activeCategoryFilter}`}
            className="tea-explorer-grades-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredGrades.map((grade: CommercialGradeSpecification) => {
                const isSelected = selectedGrade === grade.code;
                const isShortlisted = shortlist.includes(grade.code);
                const waLink = CONTACT_INFO.whatsapp.getContextualLink({
                  grade: grade.code,
                  category: grade.category,
                  intent: 'sample',
                });

                return (
                  <motion.article
                    layout
                    key={grade.code}
                    className={`tea-grade-card ${isSelected ? 'tea-grade-card-selected' : ''} ${isShortlisted ? 'tea-grade-card-shortlisted' : ''}`}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Grade Card Top Header */}
                    <div className="tea-grade-card-header">
                      <div className="tea-grade-card-code-wrap">
                        <span className="font-spec tea-grade-card-code">{grade.code}</span>
                        {grade.isKarakSuitable && (
                          <span className="grade-tag-karak" title="Recommended for Karak Chai and High-Color Brewing">
                            Karak Chai
                          </span>
                        )}
                        {grade.isTeaBagSuitable && (
                          <span className="grade-tag-teabag" title="Optimized for Single-Serve & Pyramid Tea Bags">
                            Tea Bags
                          </span>
                        )}
                      </div>
                      <span className="tea-grade-card-cat font-spec">{grade.category}</span>
                    </div>

                    {/* Grade Title & Sourcing Territory */}
                    <h4 className="tea-grade-card-name">{grade.name}</h4>
                    <div className="tea-grade-card-territory font-spec">
                      <span>{grade.sourcingTerritory}</span>
                    </div>

                    {/* Representative Photography Thumbnail with Subtle Frame */}
                    <div className="tea-grade-card-media">
                      <picture>
                        <source srcSet={grade.representativeImageWebp} type="image/webp" />
                        <img
                          src={grade.representativeImageJpg}
                          alt={`${grade.category} representative visual`}
                          className="tea-grade-card-img"
                          loading="lazy"
                        />
                      </picture>
                      <span className="tea-grade-card-img-label font-spec">
                        Representative {grade.category} Visual
                      </span>
                    </div>

                    {/* Technical Parameters Excerpt */}
                    <div className="tea-grade-card-specs">
                      <div className="tea-grade-card-spec-row">
                        <span className="tea-grade-card-spec-label">Cut &amp; Sieve:</span>
                        <span className="tea-grade-card-spec-val font-spec">
                          {grade.cutClassification} &bull; {grade.sieveMeshNote}
                        </span>
                      </div>
                      <div className="tea-grade-card-spec-row">
                        <span className="tea-grade-card-spec-label">Leaf &amp; Cup:</span>
                        <span className="tea-grade-card-spec-val">
                          {grade.appearanceStyle}
                        </span>
                      </div>
                      <div className="tea-grade-card-spec-row">
                        <span className="tea-grade-card-spec-label">Application:</span>
                        <span className="tea-grade-card-spec-val">
                          {grade.typicalApplication}
                        </span>
                      </div>
                    </div>

                    {/* Market Tags */}
                    <div className="grade-market-tags" style={{ margin: '8px 0 12px' }}>
                      {grade.marketTags.map((tag, tIdx) => (
                        <span key={tIdx} className="grade-market-tag font-spec">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Statutory Compliance Note */}
                    {grade.complianceNote && (
                      <div className="tea-grade-card-compliance font-spec">
                        <ShieldCheck size={12} aria-hidden="true" />
                        <span>{grade.complianceNote}</span>
                      </div>
                    )}

                    {/* Card Actions Row */}
                    <div className="tea-grade-card-actions">
                      {/* View Specifications Drawer Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenDrawer(grade)}
                        className="tea-grade-card-spec-btn"
                        aria-label={`View detailed technical specifications for ${grade.code}`}
                      >
                        <Eye size={13} aria-hidden="true" />
                        <span>Specs</span>
                      </button>

                      {/* Add to Shortlist Toggle Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleShortlist(grade.code)}
                        className={`tea-grade-card-shortlist-btn ${isShortlisted ? 'tea-grade-card-shortlist-btn-active' : ''}`}
                        aria-label={isShortlisted ? `Remove ${grade.code} from shortlist` : `Add ${grade.code} to sample shortlist`}
                        title={isShortlisted ? 'Remove from Sample Shortlist' : 'Add to Sample Shortlist'}
                      >
                        {isShortlisted ? (
                          <>
                            <Check size={13} aria-hidden="true" />
                            <span>Shortlisted</span>
                          </>
                        ) : (
                          <>
                            <Plus size={13} aria-hidden="true" />
                            <span>Sample</span>
                          </>
                        )}
                      </button>

                      {/* 1-Click Specify Button (Direct to Form) */}
                      <button
                        type="button"
                        onClick={() => handleSingleGradeSelect(grade.code)}
                        className={`tea-grade-card-specify-btn ${isSelected ? 'tea-grade-card-specify-btn-active' : ''}`}
                        aria-label={`Select ${grade.code} in requirement form`}
                        title={`Select ${grade.code} in requirement form`}
                      >
                        {isSelected ? (
                          <>
                            <Check size={13} aria-hidden="true" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <>
                            <span>Specify</span>
                            <ArrowRight size={12} aria-hidden="true" />
                          </>
                        )}
                      </button>

                      {/* WhatsApp Instant Trigger */}
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tea-grade-card-wa-btn"
                        aria-label={`Inquire about ${grade.code} on WhatsApp`}
                        title={`Instant WhatsApp inquiry for ${grade.code}`}
                      >
                        <MessageCircle size={15} aria-hidden="true" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* ==================================================================
            D. Indicative Sourcing Disclaimer & Quality Protocol
            ================================================================== */}
        <div className="tea-explorer-protocol-panel" role="note">
          <div className="tea-explorer-protocol-header">
            <div className="tea-explorer-protocol-icon-wrap" aria-hidden="true">
              <Info size={16} className="tea-explorer-protocol-icon" />
            </div>
            <h4 className="tea-explorer-protocol-heading">
              Indicative Sourcing Protocol
            </h4>
          </div>
          <p className="tea-explorer-protocol-body">
            Listed grades represent standard Indian auction manufacturing cuts and regional sourcing capabilities. Specifications and cup profiles reflect indicative standards. Final sieve curve analysis, bulk density and organoleptic characteristics are validated through physical pre-shipment counter-samples prior to contract confirmation.
          </p>
        </div>

        {/* ==================================================================
            E. Custom Benchmark Matching & Sieve Profiling Callout Box
            ================================================================== */}
        <div className="tea-explorer-custom-panel">
          <div className="tea-explorer-custom-content">
            <div className="tea-explorer-custom-badge font-spec">
              <Sparkles size={13} aria-hidden="true" />
              <span>CUSTOM PARTICLE &amp; LIQUOR PROFILING</span>
            </div>
            <h3 className="tea-explorer-custom-title">
              Have a Target Benchmark Sample or Custom Sieve Specification?
            </h3>
            <p className="tea-explorer-custom-desc">
              Send us your target liquor profile, custom mesh sieve distribution, or competitor benchmark details. 
              Our trade desk matches active origin auction lots and arranges calibrated counter-samples.
            </p>
          </div>
          <div className="tea-explorer-custom-action">
            <button
              type="button"
              onClick={handleCustomInquiry}
              className="tea-explorer-custom-btn"
              aria-label="Request custom tea specification"
            >
              <span>Tell Us Your Specification</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>

      {/* ====================================================================
          Technical Specification Drawer / Panel
          ==================================================================== */}
      <GradeSpecificationDrawer
        grade={drawerGrade}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onSelectForQuote={handleSingleGradeSelect}
        onToggleShortlist={handleToggleShortlist}
        isShortlisted={drawerGrade ? shortlist.includes(drawerGrade.code) : false}
      />

      {/* ====================================================================
          Lightweight Buyer Sample Shortlist Floating Bar
          ==================================================================== */}
      <SampleShortlistBar
        shortlist={shortlist}
        onRemoveGrade={handleRemoveFromShortlist}
        onClearAll={handleClearShortlist}
        onProceedToForm={handleProceedWithShortlist}
        onDismiss={() => setIsShortlistDismissed(true)}
        isDismissed={isShortlistDismissed}
      />
    </section>
  );
};
