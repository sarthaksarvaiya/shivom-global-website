import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Flame, Sparkles, Leaf, Award, ArrowRight, Check, Compass, Droplet, MessageCircle, ChevronDown } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

export interface TeaCategoriesSectionProps {
  onSelectCategory?: (categoryName: string, gradeCode?: string) => void;
  onExploreGrades?: () => void;
}

export interface TeaGradeDetail {
  code: string;
  name: string;
  application: string;
}

export interface TeaCategoryData {
  id: string;
  tabLabel: string;
  name: string;
  origin: string;
  image: string;
  imageAlt: string;
  liquorColor: string;
  liquorName: string;
  tagline: string;
  description: string;
  organoleptic: {
    liquor: string;
    body: string;
    aroma: string;
    milk: string;
  };
  grades: TeaGradeDetail[];
  specs: string[];
  defaultGrade: string;
  icon: React.ElementType;
}

const TEA_CATEGORIES: TeaCategoryData[] = [
  {
    id: 'assam-ctc',
    tabLabel: 'Assam CTC',
    name: 'Assam CTC (Crush, Tear, Curl)',
    origin: 'Brahmaputra Valley, Assam',
    image: '/images/assam-ctc-spotlight.jpg',
    imageAlt: 'Authentic Assam CTC granular black tea with rich amber liquor cupping',
    liquorColor: 'var(--color-liquor-ctc, #8B2500)',
    liquorName: 'Deep Amber to Bright Red',
    tagline: 'Bold, Malty Amber Cup for High-Strength Blends & Packet Teas',
    description: 'Sourced to match your target particle cut, briskness, and extraction depth. Renowned worldwide for heavy body, rich infusion, and immediate milk reactivity for commercial packet blends, quick-brew tea bags, and Karak chai.',
    organoleptic: {
      liquor: 'Heavy, Vibrant Amber & High Briskness',
      body: 'Full-Bodied Granular Density',
      aroma: 'Rich Malty Assam Notes',
      milk: 'Exceptional (Immediate Color & Depth)',
    },
    grades: [
      { code: 'BOP', name: 'Broken Orange Pekoe', application: 'Largest CTC cut with bold granular leaf. Foundation for supermarket packet teas and commercial base blending.' },
      { code: 'BOPSM', name: 'BOP Small', application: 'Medium-to-bold even granular cut. Suitable for consumer packet tea brands and family breakfast blends.' },
      { code: 'BP', name: 'Broken Pekoe', application: 'Medium granular size with consistent density. Popular for strong everyday tea, food service, and chai.' },
      { code: 'PF', name: 'Pekoe Fannings', application: 'Fine granular cut offering rapid color and liquor release. Engineered for high-speed tea-bag packaging.' },
      { code: 'PD', name: 'Pekoe Dust', application: 'Fine granular dust providing instantaneous liquor extraction. Ideal for Karak chai vendors and vending.' },
      { code: 'Dust / D1', name: 'Dust 1', application: 'Micro-cut granular particles with maximum cup yield. Preferred for foodservice catering and commercial chai.' },
    ],
    specs: [
      'Lot-matched sourcing across accredited Brahmaputra Valley gardens',
      'Standard bulk packaging: 40–55 kg multi-wall craft paper sacks with food-grade poly-liner',
      'Palletized container load (20ft / 40ft FCL) and LCL sample consignments coordinated',
      'Full export documentation: Certificate of Origin, Phytosanitary, and lab testing compliance',
    ],
    defaultGrade: 'BOP',
    icon: Flame,
  },
  {
    id: 'assam-orthodox',
    tabLabel: 'Assam Orthodox',
    name: 'Assam Orthodox Whole Leaf',
    origin: 'Upper Assam Terroirs',
    image: '/images/assam-orthodox.jpg',
    imageAlt: 'Upper Assam Orthodox whole black tea leaves with golden tips and golden liquor cupping',
    liquorColor: 'var(--color-liquor-orthodox, #C27803)',
    liquorName: 'Golden Amber with Bright Rim',
    tagline: 'Traditional Rolled Leaf with Golden Tips & Caramel Malt Notes',
    description: 'Rolled using traditional orthodox methods to preserve leaf geometry, delicate tips, and essential oils. Delivers complex caramel malt sweetness and an aromatic golden-amber cup sought after by specialty blenders and premium loose-leaf brands.',
    organoleptic: {
      liquor: 'Medium-Brisk, Golden-Amber Cup',
      body: 'Smooth, Refined Rolled Leaf Body',
      aroma: 'Caramelized Malt, Honey & Sweet Floral',
      milk: 'Moderate (Best Black or with a Splash of Milk)',
    },
    grades: [
      { code: 'FTGFOP1', name: 'Finest Tippy Golden Flowery Orange Pekoe 1', application: 'Intact wiry whole leaf with abundant golden tips. Prime choice for boutique loose-leaf gift tins.' },
      { code: 'TGFOP', name: 'Tippy Golden Flowery Orange Pekoe', application: 'High tip content and elegant rolled leaf. Foundation grade for specialty loose-leaf retail packaging.' },
      { code: 'FBOP', name: 'Flowery Broken Orange Pekoe', application: 'Aromatic broken leaf with golden tips. Balanced cup strength and aroma for English & Irish Breakfast blends.' },
      { code: 'BOPF', name: 'Broken Orange Pekoe Fannings', application: 'Fine orthodox cut with rapid liquor release. Perfect for specialty whole-flavor pyramid tea bags.' },
    ],
    specs: [
      'Hand-selected from select Upper Assam estate lots during peak quality periods',
      'Moisture-protective bulk packaging in foil-lined cartons or multi-wall lined paper sacks',
      'Counter-sample dispatch with lot-specific moisture, particle, and cupping parameters',
      'Suitable for gourmet retail tins, European loose-leaf blends, and specialty tea boutiques',
    ],
    defaultGrade: 'TGFOP',
    icon: Award,
  },
  {
    id: 'darjeeling',
    tabLabel: 'Darjeeling Single Origin',
    name: 'Darjeeling Black Tea',
    origin: 'Darjeeling Himalayan Foothills',
    image: '/images/darjeeling-single-origin.jpg',
    imageAlt: 'Darjeeling single origin black tea leaves with pale golden-amber muscatel liquor cup',
    liquorColor: 'var(--color-liquor-darjeeling, #D99B26)',
    liquorName: 'Pale Golden to Ripe Amber',
    tagline: 'Renowned Muscatel Flavor & Delicate Floral Bouquet',
    description: 'Cultivated at elevations up to 2,000 meters in the Himalayan foothills. Renowned globally as the "Champagne of Teas" for its rare muscatel grape sweetness, crisp mountain vibrancy, and delicate floral bouquet.',
    organoleptic: {
      liquor: 'Delicate, Luminous Golden-Amber',
      body: 'Crisp, Light-to-Medium Himalayan Terroir',
      aroma: 'Distinct Muscatel Grape & Mountain Floral',
      milk: 'Self-Drank (Enjoyed Strictly Without Milk)',
    },
    grades: [
      { code: 'First Flush FTGFOP1', name: 'First Flush Whole Leaf', application: 'Early spring harvest whole leaf with silver tips. Yields crisp floral vibrancy and a delicate light cup.' },
      { code: 'Second Flush TGFOP', name: 'Second Flush Muscatel', application: 'Peak summer harvest with iconic muscatel grape note and rich amber cup. The world-renowned benchmark.' },
      { code: 'Autumnal Harvest', name: 'Autumnal Whole Leaf', application: 'Post-monsoon harvest delivering a rounded copper-amber liquor with smooth caramel notes.' },
    ],
    specs: [
      'Seasonal harvest sourcing aligned with plucking flushes (March through November)',
      'Specialized moisture-barrier export foil packaging to protect delicate volatile top-notes',
      'Ideal for luxury tea gift tins, gourmet hospitality, and single-origin estate menus',
      'Certificate of Origin and complete traceability documentation provided per shipment',
    ],
    defaultGrade: 'Second Flush TGFOP',
    icon: Sparkles,
  },
  {
    id: 'green-wellness',
    tabLabel: 'Green & Specialty',
    name: 'Indian Green & Wellness Teas',
    origin: 'High-Elevation Terroirs, India',
    image: '/images/indian-green-tea.jpg',
    imageAlt: 'Authentic Indian whole green tea leaves with clear jade green tea infusion',
    liquorColor: 'var(--color-liquor-green, #4E8A3C)',
    liquorName: 'Clear Pale Green to Light Jade',
    tagline: 'Gently Processed Unoxidized Leaf with Jade Cup Clarity',
    description: 'Carefully pan-fired or steamed immediately after plucking to halt enzymatic oxidation. Preserves natural green chlorophyll, active catechins, and clean herbaceous sweetness for modern health, wellness, and botanical blending lines.',
    organoleptic: {
      liquor: 'Clean, Pale Jade Cup Clarity',
      body: 'Smooth, Herbaceous & Refreshing',
      aroma: 'Fresh Vegetal, Grassy & Sweet Botanical',
      milk: 'Not Applicable (Pure Green Infusion)',
    },
    grades: [
      { code: 'Whole Leaf Green', name: 'High-Elevation Whole Leaf', application: 'Gently rolled whole leaf preserving antioxidant catechins. Clear jade liquor for premium loose tea.' },
      { code: 'Green Tea Fannings', name: 'Green Pekoe Fannings', application: 'Fine particle cut engineered for rapid extraction in single-serve standard and pyramid green tea bags.' },
      { code: 'Herbal Cut', name: 'Botanical Blending Cut', application: 'Balanced cut designed to blend uniformly with dried herbs, mint, lemon peel, jasmine, and chamomile.' },
    ],
    specs: [
      'Low bitterness profile achieved through controlled thermal fixation at source',
      'Neutral, high-clarity blending foundation for citrus, mint, and functional wellness formulations',
      'Export packing in vacuum barrier bulk bags or moisture-proof barrier multi-wall sacks',
      'Lab tested for pesticide residue compliance to meet international destination standards',
    ],
    defaultGrade: 'Whole Leaf Green',
    icon: Leaf,
  },
];

export const TeaCategoriesSection: React.FC<TeaCategoriesSectionProps> = ({
  onSelectCategory,
  onExploreGrades,
}) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const activeCategory = TEA_CATEGORIES[activeCategoryIndex];

  // Track selected grade within active category
  const [selectedGradeCode, setSelectedGradeCode] = useState<string>(activeCategory.defaultGrade);

  // Accessibility: detect reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // Sync selected grade code when changing categories
  const handleSelectCategoryTab = (index: number) => {
    setActiveCategoryIndex(index);
    setSelectedGradeCode(TEA_CATEGORIES[index].defaultGrade);
  };

  const currentGradeDetail =
    activeCategory.grades.find((g) => g.code === selectedGradeCode) || activeCategory.grades[0];

  const handleCategorySampleRequest = (category: string, gradeCode?: string) => {
    const targetGrade = gradeCode || selectedGradeCode || activeCategory.defaultGrade;
    if (onSelectCategory) {
      onSelectCategory(category, targetGrade);
    } else {
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
    }
  };

  const handleGradeBadgeClick = (gradeCode: string) => {
    setSelectedGradeCode(gradeCode);
  };

  const handleScrollToConsole = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const consoleEl = document.getElementById('tea-catalog-console');
    if (consoleEl) {
      const headerOffset = 70;
      const elementPosition = consoleEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleGradeTableClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onExploreGrades) {
      onExploreGrades();
    } else {
      const tableElement = document.getElementById('tea-by-grade');
      if (tableElement) {
        const headerOffset = 80;
        const elementPosition = tableElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section
      id="our-teas"
      className="tea-categories-section"
      aria-labelledby="categories-heading"
    >
      <div className="container">

        {/* =========================================================================
            PART 1: THE SOURCING SPECTRUM & PROTOCOL SCREEN
            ========================================================================= */}
        <div className="tea-sourcing-intro-screen">
          {/* Section Header */}
          <div className="tea-categories-header text-center">
            <div className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
              INDIAN TEA SOURCING SPECTRUM
            </div>

            <h2 id="categories-heading" className="tea-categories-headline">
              Tea Categories Sourced to Your Requirement
            </h2>

            <p className="tea-categories-lead">
              We work with appropriate sourcing channels to match buyer requirements with suitable Indian tea lots across primary production regions based on your requested grade, target cup profile, and destination compliance.
            </p>

            <p className="tea-categories-disclaimer">
              Grades shown represent sourcing categories, not standing inventory. Availability depends on current origin, lot, season and buyer specification.
            </p>
          </div>

          {/* 3-Step Sourcing Protocol Cards */}
          <div className="tea-protocol-banner" role="region" aria-label="Export sourcing workflow">
            <div className="tea-protocol-item">
              <span className="tea-protocol-num font-spec">01</span>
              <div className="tea-protocol-info">
                <span className="tea-protocol-title">Specification Matching</span>
                <span className="tea-protocol-desc">Target grade cut, mesh particle size &amp; liquor profile</span>
              </div>
            </div>
            <div className="tea-protocol-divider" aria-hidden="true" />
            <div className="tea-protocol-item">
              <span className="tea-protocol-num font-spec">02</span>
              <div className="tea-protocol-info">
                <span className="tea-protocol-title">Pre-Shipment Cupping</span>
                <span className="tea-protocol-desc">Physical counter-samples dispatched for buyer sign-off</span>
              </div>
            </div>
            <div className="tea-protocol-divider" aria-hidden="true" />
            <div className="tea-protocol-item">
              <span className="tea-protocol-num font-spec">03</span>
              <div className="tea-protocol-info">
                <span className="tea-protocol-title">Container Export Dispatch</span>
                <span className="tea-protocol-desc">Lot allocation, phytosanitary checks &amp; maritime export</span>
              </div>
            </div>
          </div>

          {/* Smooth Scroll Cue to Part 2 */}
          <div className="tea-intro-scroll-wrap text-center">
            <a
              href="#tea-catalog-console"
              onClick={handleScrollToConsole}
              className="tea-scroll-cue-btn font-spec"
              aria-label="Scroll down to tea variety explorer"
            >
              <span>EXPLORE TEA ORIGINS &amp; GRADES</span>
              <ChevronDown size={14} className="tea-bounce-icon" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* =========================================================================
            PART 2: THE INTERACTIVE SOURCING CONSOLE SCREEN
            ========================================================================= */}
        <div id="tea-catalog-console" className="tea-sourcing-console-screen">

          {/* Category Navigation Tabs */}
          <div className="tea-category-nav-bar" role="tablist" aria-label="Tea categories selector">
            {TEA_CATEGORIES.map((cat, idx) => {
              const isActive = idx === activeCategoryIndex;
              const TabIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tea-panel-${cat.id}`}
                  id={`tea-tab-${cat.id}`}
                  type="button"
                  onClick={() => handleSelectCategoryTab(idx)}
                  className={`tea-category-tab ${isActive ? 'active' : ''}`}
                >
                  <span className="tea-tab-icon-wrap" aria-hidden="true">
                    <TabIcon size={16} />
                  </span>
                  <span className="tea-tab-text">{cat.tabLabel}</span>
                  {isActive && <span className="tea-tab-active-indicator" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {/* Full-Featured Split B2B Sourcing Console with Dynamic Terroir Ambient Theme */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              id={`tea-panel-${activeCategory.id}`}
              role="tabpanel"
              aria-labelledby={`tea-tab-${activeCategory.id}`}
              className={`tea-sourcing-console tea-console-theme-${activeCategory.id}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
            {/* Left Column: Visual Leaf & Terroir Sensory Profile */}
            <div className="tea-console-visual">
              {/* Authentic Leaf Photography Frame */}
              <div className="tea-visual-frame">
                <img
                  src={activeCategory.image}
                  alt={activeCategory.imageAlt}
                  className="tea-visual-img"
                  width={640}
                  height={420}
                  loading="lazy"
                />

                {/* Visual Badges Overlay */}
                <div className="tea-visual-overlay-strip">
                  <span className="tea-visual-origin-tag">
                    <Compass size={13} aria-hidden="true" />
                    <span>{activeCategory.origin}</span>
                  </span>
                  <span className="tea-liquor-indicator">
                    <span
                      className="tea-liquor-swatch"
                      style={{ backgroundColor: activeCategory.liquorColor }}
                      aria-hidden="true"
                    />
                    <span>{activeCategory.liquorName}</span>
                  </span>
                </div>
              </div>

              {/* Indicative Organoleptic Profile Sensory Matrix */}
              <div className="tea-sensory-panel">
                <div className="tea-sensory-header">
                  <div className="tea-sensory-title-row">
                    <span className="tea-sensory-title">Indicative Organoleptic Profile</span>
                    <Droplet size={14} style={{ color: 'var(--color-accent-gold)' }} aria-hidden="true" />
                  </div>
                  <span className="tea-sensory-disclaimer">
                    *Indicative cup profile. Final characteristics vary by origin estate, lot, season and processing.
                  </span>
                </div>

                <div className="tea-sensory-grid">
                  <div className="tea-organoleptic-item">
                    <span className="tea-organoleptic-label font-spec">LIQUOR DEPTH</span>
                    <span className="tea-organoleptic-val">{activeCategory.organoleptic.liquor}</span>
                  </div>

                  <div className="tea-organoleptic-item">
                    <span className="tea-organoleptic-label font-spec">BODY &amp; TEXTURE</span>
                    <span className="tea-organoleptic-val">{activeCategory.organoleptic.body}</span>
                  </div>

                  <div className="tea-organoleptic-item">
                    <span className="tea-organoleptic-label font-spec">AROMA PROFILE</span>
                    <span className="tea-organoleptic-val">{activeCategory.organoleptic.aroma}</span>
                  </div>

                  <div className="tea-organoleptic-item">
                    <span className="tea-organoleptic-label font-spec">MILK AFFINITY</span>
                    <span className="tea-organoleptic-val">{activeCategory.organoleptic.milk}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Technical Sourcing Specifications & Conversion */}
            <div className="tea-console-specs">
              {/* Category Header */}
              <div className="tea-spec-header-block">
                <div className="tea-spec-meta-row">
                  <span className="spec-badge spec-badge-gold font-spec">
                    COUNTER-SAMPLES ON REQUEST
                  </span>
                </div>
                <h3 className="tea-console-heading">{activeCategory.name}</h3>
                <div className="tea-console-tagline">{activeCategory.tagline}</div>
                <p className="tea-console-desc">{activeCategory.description}</p>
              </div>

              {/* Grade Selection with Live In-Context Technical Spec */}
              <div className="tea-grade-selection-block">
                <div className="tea-grade-selection-header">
                  <span className="tea-section-subtitle">Export Sourcing Grades</span>
                  <span className="tea-selection-hint">Select grade to inspect application</span>
                </div>

                <div className="tea-grades-pill-wrap" role="group" aria-label="Available tea grades">
                  {activeCategory.grades.map((grd) => {
                    const isSelected = grd.code === selectedGradeCode;
                    return (
                      <motion.button
                        key={grd.code}
                        type="button"
                        onClick={() => handleGradeBadgeClick(grd.code)}
                        className={`tea-grade-badge-interactive ${isSelected ? 'active' : ''}`}
                        aria-pressed={isSelected}
                        title={`Select ${grd.name} (${grd.code})`}
                        whileHover={shouldReduceMotion ? {} : { y: -2 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                      >
                        <span className="tea-grade-code">{grd.code}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Selected Grade In-Context Technical Callout with Animated Cross-Fade */}
                <AnimatePresence mode="wait">
                  {currentGradeDetail && (
                    <motion.div
                      key={selectedGradeCode}
                      className="tea-active-grade-callout"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="tea-active-grade-top">
                        <span className="tea-active-grade-badge font-spec">{currentGradeDetail.code}</span>
                        <span className="tea-active-grade-name">{currentGradeDetail.name}</span>
                      </div>
                      <p className="tea-active-grade-app">
                        <strong>Target Application:</strong> {currentGradeDetail.application}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sourcing & Packaging Specifications */}
              <div className="tea-specs-features-block">
                <div className="tea-section-subtitle">Sourcing &amp; Packing Specifications</div>
                <ul className="tea-specs-list">
                  {activeCategory.specs.map((spc, idx) => (
                    <li key={idx} className="tea-specs-list-item">
                      <Check size={14} className="tea-specs-check-icon" aria-hidden="true" />
                      <span>{spc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sourcing Desk Actions */}
              <div className="tea-console-actions-block">
                <button
                  type="button"
                  onClick={() => handleCategorySampleRequest(activeCategory.name, selectedGradeCode)}
                  className="btn btn-primary btn-md tea-sample-cta-btn"
                  aria-label={`Request ${activeCategory.name} (${selectedGradeCode}) Counter-Samples`}
                >
                  <span>Request {selectedGradeCode} Counter-Samples</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                <a
                  href={CONTACT_INFO.whatsapp.getLink(
                    `Hi SHIVOM GLOBAL, I am reviewing your ${activeCategory.name} (${selectedGradeCode}) specifications and would like to discuss sourcing options.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark btn-sm tea-whatsapp-btn"
                  aria-label={`Chat on WhatsApp about ${activeCategory.name} ${selectedGradeCode}`}
                >
                  <MessageCircle size={15} style={{ color: 'var(--color-whatsapp)' }} aria-hidden="true" />
                  <span>Discuss on WhatsApp ({selectedGradeCode})</span>
                </a>
              </div>
            </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section Bottom Quick Link to Grade Specification Table */}
        <div className="tea-categories-bottom-cta">
          <div className="tea-categories-cta-text">
            <h4 className="tea-bottom-cta-heading">
              Looking for exact particle sizes and technical mesh sieve data?
            </h4>
            <p className="tea-bottom-cta-subtext">
              Compare particle sizing, cup strength, and blend applications in our single Grade Specification Table below.
            </p>
          </div>

          <div className="tea-categories-cta-actions">
            <a
              href="#tea-by-grade"
              onClick={handleGradeTableClick}
              className="btn btn-secondary btn-sm"
              id="btn-view-grades-table"
            >
              <span>View Grade Specification Table</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
