import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ArrowRight, MessageCircle, ShieldCheck, Check, Sparkles, AlertCircle, FileText, Package } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';
import { CommercialGradeSpecification } from '../types/gradeMatrix';

export interface GradeSpecificationDrawerProps {
  grade: CommercialGradeSpecification | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForQuote: (gradeCode: string) => void;
  onToggleShortlist: (gradeCode: string) => void;
  isShortlisted: boolean;
}

export const GradeSpecificationDrawer: React.FC<GradeSpecificationDrawerProps> = ({
  grade,
  isOpen,
  onClose,
  onSelectForQuote,
  onToggleShortlist,
  isShortlisted,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Escape key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!grade) return null;

  const waLink = CONTACT_INFO.whatsapp.getContextualLink({
    grade: grade.code,
    category: grade.category,
    intent: 'sample',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="tea-spec-drawer-overlay" onClick={onClose} aria-hidden="true">
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="spec-drawer-title"
            className="tea-spec-drawer"
            onClick={(e) => e.stopPropagation()}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Drawer Header */}
            <div className="tea-spec-drawer-header">
              <div className="tea-spec-drawer-header-meta">
                <span className="spec-badge spec-badge-gold">{grade.category}</span>
                <span className="tea-spec-drawer-status-pill font-spec">
                  {grade.specificationStatus === 'supplier-confirmed' ? 'Supplier Confirmed' : 'Provisional Reference'}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="tea-spec-drawer-close-btn"
                aria-label="Close technical specification drawer"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Content Scroll Area */}
            <div className="tea-spec-drawer-body">
              {/* Product Identification Banner */}
              <div className="tea-spec-drawer-hero">
                <div className="tea-spec-drawer-code-wrap">
                  <span className="font-spec tea-spec-drawer-code">{grade.code}</span>
                  {grade.isKarakSuitable && (
                    <span className="grade-tag-karak">Karak Chai Standard</span>
                  )}
                  {grade.isTeaBagSuitable && (
                    <span className="grade-tag-teabag">Tea Bag Suitable</span>
                  )}
                </div>
                <h2 id="spec-drawer-title" className="tea-spec-drawer-title">
                  {grade.name}
                </h2>
                <div className="tea-spec-drawer-territory">
                  <strong>Sourcing Territory:</strong> {grade.sourcingTerritory}
                </div>
              </div>

              {/* Representative Visual Frame */}
              <div className="tea-spec-drawer-image-frame">
                <picture>
                  <source srcSet={grade.representativeImageWebp} type="image/webp" />
                  <img
                    src={grade.representativeImageJpg}
                    alt={`${grade.category} representative authentic leaf`}
                    className="tea-spec-drawer-img"
                    loading="lazy"
                  />
                </picture>
                <div className="tea-spec-drawer-img-caption font-spec">
                  Representative visual for {grade.category} &bull; Exact leaf appearance and density evaluated via pre-shipment lot counter-samples.
                </div>
              </div>

              {/* Section 1: Appearance & Cup Characteristics */}
              <div className="tea-spec-drawer-section">
                <h3 className="tea-spec-drawer-section-title">
                  <Sparkles size={16} aria-hidden="true" />
                  <span>Appearance &amp; Cup Characteristics</span>
                </h3>
                <div className="tea-spec-drawer-grid-2">
                  <div className="tea-spec-drawer-item">
                    <span className="tea-spec-drawer-label">Cut Classification</span>
                    <span className="tea-spec-drawer-val font-spec">{grade.cutClassification}</span>
                  </div>
                  <div className="tea-spec-drawer-item">
                    <span className="tea-spec-drawer-label">Sieve Profile</span>
                    <span className="tea-spec-drawer-val font-spec">{grade.sieveMeshNote}</span>
                  </div>
                </div>
                <div className="tea-spec-drawer-item" style={{ marginTop: '12px' }}>
                  <span className="tea-spec-drawer-label">Dry Leaf &amp; Infusion Style</span>
                  <p className="tea-spec-drawer-desc">{grade.appearanceStyle}</p>
                </div>
              </div>

              {/* Section 2: Commercial Target Applications */}
              <div className="tea-spec-drawer-section">
                <h3 className="tea-spec-drawer-section-title">
                  <Package size={16} aria-hidden="true" />
                  <span>Commercial Target Applications</span>
                </h3>
                <p className="tea-spec-drawer-desc" style={{ marginBottom: '10px' }}>
                  {grade.typicalApplication}
                </p>
                <div className="grade-market-tags">
                  {grade.marketTags.map((tag, idx) => (
                    <span key={idx} className="grade-market-tag font-spec">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Section 3: Technical Information & Sieve Protocol */}
              <div className="tea-spec-drawer-section">
                <h3 className="tea-spec-drawer-section-title">
                  <FileText size={16} aria-hidden="true" />
                  <span>Technical &amp; Sieve Protocol</span>
                </h3>
                <div className="tea-spec-drawer-note-box">
                  <AlertCircle size={15} className="tea-spec-drawer-note-icon" aria-hidden="true" />
                  <p className="tea-spec-drawer-note-text">
                    <strong>Laboratory Sieve Distribution:</strong> Particle millimeter dimensions and sieve curves (microns / &mu;m) are customized to buyer packing machinery specifications. Exact bulk density and moisture limits (&le; 7.5%) are validated against supplier lot test certificates prior to stuffing.
                  </p>
                </div>
              </div>

              {/* Section 4: Sourcing Verification & Authenticity */}
              <div className="tea-spec-drawer-section">
                <h3 className="tea-spec-drawer-section-title">
                  <ShieldCheck size={16} aria-hidden="true" />
                  <span>Origin Verification &amp; Export Compliance</span>
                </h3>
                <ul className="tea-spec-drawer-compliance-list font-spec">
                  <li>
                    <strong>Sourcing Mode:</strong> Evaluated against buyer lot mandate (Zero speculative inventory push).
                  </li>
                  {grade.complianceNote && (
                    <li>
                      <strong>Statutory Provenance:</strong> {grade.complianceNote}
                    </li>
                  )}
                  <li>
                    <strong>Pre-Shipment Sampling:</strong> Complimentary courier counter-samples dispatched for organoleptic evaluation.
                  </li>
                  <li>
                    <strong>Export Documentation:</strong> Accompanied by Phytosanitary Certificate, Chamber of Commerce COO, and Ocean Bill of Lading.
                  </li>
                </ul>
              </div>
            </div>

            {/* Drawer Fixed Footer Actions */}
            <div className="tea-spec-drawer-footer">
              <div className="tea-spec-drawer-footer-actions">
                <button
                  type="button"
                  onClick={() => {
                    onSelectForQuote(grade.code);
                    onClose();
                  }}
                  className="tea-spec-drawer-primary-btn"
                >
                  <span>Request Quotation for {grade.code}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>

                <div className="tea-spec-drawer-footer-row">
                  <button
                    type="button"
                    onClick={() => onToggleShortlist(grade.code)}
                    className={`tea-spec-drawer-shortlist-btn ${isShortlisted ? 'tea-spec-drawer-shortlist-btn-active' : ''}`}
                    aria-label={isShortlisted ? `Remove ${grade.code} from sample shortlist` : `Add ${grade.code} to sample shortlist`}
                  >
                    {isShortlisted ? (
                      <>
                        <Check size={15} aria-hidden="true" />
                        <span>Shortlisted in Samples</span>
                      </>
                    ) : (
                      <>
                        <span>Add to Sample Shortlist</span>
                      </>
                    )}
                  </button>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tea-spec-drawer-wa-btn"
                    aria-label={`Inquire about ${grade.code} on WhatsApp`}
                    title={`Instant WhatsApp Inquiry for ${grade.code}`}
                  >
                    <MessageCircle size={17} aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
