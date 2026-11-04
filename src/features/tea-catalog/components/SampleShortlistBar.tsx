import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ArrowRight, Layers, Trash2 } from 'lucide-react';

export interface SampleShortlistBarProps {
  shortlist: string[];
  onRemoveGrade: (gradeCode: string) => void;
  onClearAll: () => void;
  onProceedToForm: (shortlist: string[]) => void;
  onDismiss?: () => void;
  isDismissed?: boolean;
}

export const SampleShortlistBar: React.FC<SampleShortlistBarProps> = ({
  shortlist,
  onRemoveGrade,
  onClearAll,
  onProceedToForm,
  onDismiss,
  isDismissed = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shortlist.length === 0 || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.aside
        role="region"
        aria-label="Buyer Sample Shortlist"
        aria-live="polite"
        className="sample-shortlist-bar"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container sample-shortlist-container">
          {/* Left: Summary Count & Badge */}
          <div className="sample-shortlist-left">
            <div className="sample-shortlist-badge">
              <Layers size={16} aria-hidden="true" />
              <span className="font-spec">Sample Shortlist</span>
              <span className="sample-shortlist-count">{shortlist.length}</span>
            </div>
            <p className="sample-shortlist-hint font-spec">
              Selected grades will populate your buyer sample inquiry.
            </p>
          </div>

          {/* Center: Interactive Pills of Shortlisted Grades */}
          <div className="sample-shortlist-pills" role="list" aria-label="Shortlisted tea grades">
            {shortlist.map((code) => (
              <span key={code} role="listitem" className="sample-shortlist-pill font-spec">
                <span>{code}</span>
                <button
                  type="button"
                  onClick={() => onRemoveGrade(code)}
                  className="sample-shortlist-pill-remove"
                  aria-label={`Remove ${code} from sample shortlist`}
                  title={`Remove ${code}`}
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>

          {/* Right: Actions (Clear All & Proceed) */}
          <div className="sample-shortlist-actions">
            <button
              type="button"
              onClick={onClearAll}
              className="sample-shortlist-clear-btn font-spec"
              aria-label="Clear all shortlisted grades"
            >
              <Trash2 size={13} aria-hidden="true" />
              <span>Clear</span>
            </button>

            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="sample-shortlist-clear-btn font-spec"
                aria-label="Minimize sample shortlist bar"
                title="Minimize shortlist bar"
              >
                <X size={13} aria-hidden="true" />
                <span>Dismiss</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onProceedToForm(shortlist)}
              className="sample-shortlist-proceed-btn"
              aria-label="Proceed to review requirements with shortlisted grades"
            >
              <span>Review Requirements</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
