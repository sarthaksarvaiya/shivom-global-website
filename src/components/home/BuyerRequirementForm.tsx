import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  RotateCcw, 
  AlertCircle, 
  RefreshCw, 
  Sparkles,
  ClipboardList,
  MessageCircle
} from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';
import { 
  BuyerRequirementFormData, 
  BuyerRequirementRecord, 
  FormStatus, 
  FieldValidationErrors 
} from '@/types/buyerRequirement';
import { 
  validateRequirementForm, 
  buildRequirementRecord 
} from '@/utils/requirementValidation';
import { submitBuyerRequirement } from '@/services/submissionAdapter';

export interface BuyerRequirementFormProps {
  initialRequirementType?: string;
  initialGrade?: string;
  initialIntent?: 'sample' | 'quote' | 'packing';
}

interface QuickFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

const DEFAULT_DETAILED_DATA: BuyerRequirementFormData = {
  requirementType: 'Assam CTC',
  grade: 'BOP',
  volume: 'Trial Batch / Initial Order',
  packaging: 'Standard Bulk Export Sacks',
  destinationPort: '',
  qualitySpecs: '',
  companyName: '',
  contactPerson: '',
  businessEmail: '',
  phoneWhatsApp: '',
  country: '',
  buyerRole: 'Tea Importer / Trader',
  targetPrice: '',
  additionalMessage: '',
};

const DEFAULT_QUICK_DATA: QuickFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  message: '',
};

export const BuyerRequirementForm: React.FC<BuyerRequirementFormProps> = ({
  initialRequirementType,
  initialGrade,
  initialIntent = 'sample',
}) => {
  // Form mode: 'quick' (Form A) or 'detailed' (Form B)
  const [formMode, setFormMode] = useState<'quick' | 'detailed'>('quick');

  // Quick form state
  const [quickData, setQuickData] = useState<QuickFormData>(DEFAULT_QUICK_DATA);

  // Detailed form state
  const [detailedData, setDetailedData] = useState<BuyerRequirementFormData>(DEFAULT_DETAILED_DATA);

  // Error and submission states
  const [errors, setErrors] = useState<FieldValidationErrors>({});
  const [formStatus, setFormStatus] = useState<FormStatus>('IDLE');
  const [submissionError, setSubmissionError] = useState<string>('');
  const [submittedRecord, setSubmittedRecord] = useState<BuyerRequirementRecord | null>(null);

  // Honeypot field for anti-bot protection
  const [honeypot, setHoneypot] = useState<string>('');

  // Synchronize incoming contextual preselection
  useEffect(() => {
    if (initialRequirementType) {
      setDetailedData((prev) => ({ ...prev, requirementType: initialRequirementType }));
    }
    if (initialGrade) {
      setDetailedData((prev) => ({ ...prev, grade: initialGrade }));
    }
    if (initialIntent === 'quote') {
      setFormMode('detailed');
    }
  }, [initialRequirementType, initialGrade, initialIntent]);

  // Quick form change handler
  const handleQuickChange = (field: keyof QuickFormData, value: string) => {
    setQuickData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FieldValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field as keyof FieldValidationErrors]: undefined }));
    }
    if (formStatus === 'VALIDATION_ERROR' || formStatus === 'SUBMISSION_ERROR') {
      setSubmissionError('');
    }
  };

  // Detailed form change handler
  const handleDetailedChange = (field: keyof BuyerRequirementFormData, value: string) => {
    setDetailedData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (formStatus === 'VALIDATION_ERROR' || formStatus === 'SUBMISSION_ERROR') {
      setSubmissionError('');
    }
  };

  // Quick form validation
  const validateQuickForm = (): boolean => {
    const newErrors: FieldValidationErrors = {};
    if (!quickData.name.trim() || quickData.name.trim().length < 2) {
      newErrors.contactPerson = 'Your name is required.';
    }
    if (!quickData.company.trim() || quickData.company.trim().length < 2) {
      newErrors.companyName = 'Company name is required.';
    }
    if (!quickData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quickData.email.trim())) {
      newErrors.businessEmail = 'A valid business email is required.';
    }
    if (!quickData.phone.trim() || quickData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phoneWhatsApp = 'Phone or WhatsApp number with country code is required.';
    }
    if (!quickData.country.trim() || quickData.country.trim().length < 2) {
      newErrors.country = 'Country is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Quick form submit
  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    if (!validateQuickForm()) {
      setFormStatus('VALIDATION_ERROR');
      return;
    }

    setFormStatus('SUBMITTING');
    setSubmissionError('');

    try {
      // Map quick form into standard record payload for existing backend
      const normalizedPayload: BuyerRequirementFormData = {
        contactPerson: quickData.name.trim(),
        companyName: quickData.company.trim(),
        businessEmail: quickData.email.trim().toLowerCase(),
        phoneWhatsApp: quickData.phone.trim(),
        country: quickData.country.trim(),
        requirementType: initialRequirementType || 'Assam CTC',
        grade: initialGrade || 'BOP / Open to Recommendation',
        volume: 'Trial Batch (Quick Enquiry / Samples)',
        packaging: 'Standard Bulk Export Sacks',
        destinationPort: `${quickData.country.trim()} (Port TBD)`,
        qualitySpecs: quickData.message.trim() 
          ? `[Form: Quick Enquiry]\n${quickData.message.trim()}`
          : '[Form: Quick Enquiry / Sample Request]',
      };

      const record = buildRequirementRecord(normalizedPayload);
      const response = await submitBuyerRequirement(record, honeypot);

      if (response.success && response.record) {
        setSubmittedRecord(response.record);
        setFormStatus('SUCCESS');
      } else {
        setFormStatus('SUBMISSION_ERROR');
        setSubmissionError(response.error || 'The enquiry could not be sent at this time. Please try again.');
      }
    } catch {
      setFormStatus('SUBMISSION_ERROR');
      setSubmissionError('Network error connecting to the trade desk. Please check your connection and retry.');
    }
  };

  // Detailed form submit
  const handleDetailedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    setFormStatus('VALIDATING');
    setSubmissionError('');

    const validationErrors = validateRequirementForm(detailedData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormStatus('VALIDATION_ERROR');
      return;
    }

    setErrors({});
    setFormStatus('SUBMITTING');

    try {
      const enrichedPayload: BuyerRequirementFormData = {
        ...detailedData,
        qualitySpecs: detailedData.qualitySpecs 
          ? `[Form: Detailed Tea Requirement]\n${detailedData.qualitySpecs}`
          : '[Form: Detailed Tea Requirement]',
      };

      const record = buildRequirementRecord(enrichedPayload);
      const response = await submitBuyerRequirement(record, honeypot);

      if (response.success && response.record) {
        setSubmittedRecord(response.record);
        setFormStatus('SUCCESS');
      } else {
        if (response.details) {
          setErrors(response.details);
        }
        setFormStatus('SUBMISSION_ERROR');
        setSubmissionError(response.error || 'The requirement could not be submitted right now.');
      }
    } catch {
      setFormStatus('SUBMISSION_ERROR');
      setSubmissionError('Network error connecting to the trade desk. Please check your connection and retry.');
    }
  };

  const handleReset = () => {
    setQuickData(DEFAULT_QUICK_DATA);
    setDetailedData(DEFAULT_DETAILED_DATA);
    setErrors({});
    setFormStatus('IDLE');
    setSubmissionError('');
    setSubmittedRecord(null);
  };

  return (
    <section id="requirement-form" className="buyer-engine-section" aria-labelledby="buyer-engine-heading">
      <div className="container">
        
        {/* Section Header — Focused Entirely on the Buyer's Action */}
        <div className="buyer-engine-header" style={{ maxWidth: '680px', margin: '0 auto clamp(2rem, 4vw, 3rem)' }}>
          <h2 id="buyer-engine-heading" className="buyer-engine-title">
            Tell Us What Tea You Need
          </h2>
          <p className="buyer-engine-lead">
            Share your tea requirement with us. Tell us the tea type, grade, quantity and destination, and we'll review the requirement and get back to you.
          </p>

          {/* Form Mode Tabs: Quick Enquiry vs Detailed Tea Requirement */}
          <div className="buyer-form-mode-switch" role="tablist" aria-label="Select enquiry type">
            <button
              type="button"
              role="tab"
              aria-selected={formMode === 'quick'}
              onClick={() => { setFormMode('quick'); setErrors({}); setSubmissionError(''); }}
              className={`mode-switch-btn ${formMode === 'quick' ? 'mode-switch-btn-active' : ''}`}
            >
              <Sparkles size={15} aria-hidden="true" />
              <span>Quick Enquiry / Samples</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={formMode === 'detailed'}
              onClick={() => { setFormMode('detailed'); setErrors({}); setSubmissionError(''); }}
              className={`mode-switch-btn ${formMode === 'detailed' ? 'mode-switch-btn-active' : ''}`}
            >
              <ClipboardList size={15} aria-hidden="true" />
              <span>Detailed Tea Requirement</span>
            </button>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="buyer-engine-card" style={{ maxWidth: '780px', margin: '0 auto' }}>
          
          {formStatus === 'SUCCESS' && submittedRecord ? (
            /* Confirmation State */
            <div className="buyer-engine-success" role="region" aria-label="Requirement Confirmation">
              <div className="buyer-success-icon-wrap">
                <CheckCircle2 size={36} className="buyer-success-icon" />
              </div>

              <h3 className="buyer-success-title">
                Requirement Received
              </h3>
              
              <p className="buyer-success-lead">
                Our trade desk will review the requirement and follow up using the contact details provided.
              </p>

              <div className="buyer-success-ref-box">
                <span className="buyer-success-ref-label">Reference Number:</span>
                <strong className="font-spec buyer-success-ref-val">
                  {submittedRecord.referenceId}
                </strong>
              </div>

              <div className="buyer-success-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <a
                  href={CONTACT_INFO.whatsapp.getLink(
                    `Hi SHIVOM GLOBAL, I have submitted my requirement. My reference number is ${submittedRecord.referenceId}. Please review and advise.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)',
                  }}
                  aria-label={`Follow up on WhatsApp with reference ${submittedRecord.referenceId}`}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>Message Trade Desk on WhatsApp</span>
                </a>

                <button 
                  type="button"
                  onClick={handleReset} 
                  className="buyer-success-reset-btn"
                >
                  <RotateCcw size={15} />
                  <span>Submit Another Requirement</span>
                </button>
              </div>
            </div>
          ) : formMode === 'quick' ? (
            /* FORM A — Quick Contact Form (Default) */
            <form onSubmit={handleQuickSubmit} noValidate className="buyer-form-root">
              {/* Anti-Bot Honeypot */}
              <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <input 
                  type="text" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />
              </div>

              <div className="buyer-form-grid-2">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="quick-name" className="form-label form-label-required">
                    Your Name
                  </label>
                  <input 
                    id="quick-name"
                    type="text" 
                    className={`form-input ${errors.contactPerson ? 'form-input-error' : ''}`} 
                    placeholder="e.g. Tariq Mansoor"
                    value={quickData.name}
                    onChange={(e) => handleQuickChange('name', e.target.value)}
                    autoComplete="name"
                    required
                  />
                  {errors.contactPerson && (
                    <span className="form-error-msg" role="alert">
                      <AlertCircle size={13} />
                      <span>{errors.contactPerson}</span>
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div className="form-group">
                  <label htmlFor="quick-company" className="form-label form-label-required">
                    Company Name
                  </label>
                  <input 
                    id="quick-company"
                    type="text" 
                    className={`form-input ${errors.companyName ? 'form-input-error' : ''}`} 
                    placeholder="e.g. Al-Noor Tea Trading LLC"
                    value={quickData.company}
                    onChange={(e) => handleQuickChange('company', e.target.value)}
                    autoComplete="organization"
                    required
                  />
                  {errors.companyName && (
                    <span className="form-error-msg" role="alert">
                      <AlertCircle size={13} />
                      <span>{errors.companyName}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="buyer-form-grid-3">
                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="quick-email" className="form-label form-label-required">
                    Email Address
                  </label>
                  <input 
                    id="quick-email"
                    type="email" 
                    className={`form-input ${errors.businessEmail ? 'form-input-error' : ''}`} 
                    placeholder="buyer@company.com"
                    value={quickData.email}
                    onChange={(e) => handleQuickChange('email', e.target.value)}
                    autoComplete="email"
                    required
                  />
                  {errors.businessEmail && (
                    <span className="form-error-msg" role="alert">
                      <AlertCircle size={13} />
                      <span>{errors.businessEmail}</span>
                    </span>
                  )}
                </div>

                {/* WhatsApp / Phone */}
                <div className="form-group">
                  <label htmlFor="quick-phone" className="form-label form-label-required">
                    WhatsApp / Phone
                  </label>
                  <input 
                    id="quick-phone"
                    type="tel" 
                    className={`form-input ${errors.phoneWhatsApp ? 'form-input-error' : ''}`} 
                    placeholder="+971 50 XXX XXXX"
                    value={quickData.phone}
                    onChange={(e) => handleQuickChange('phone', e.target.value)}
                    autoComplete="tel"
                    required
                  />
                  {errors.phoneWhatsApp && (
                    <span className="form-error-msg" role="alert">
                      <AlertCircle size={13} />
                      <span>{errors.phoneWhatsApp}</span>
                    </span>
                  )}
                </div>

                {/* Country */}
                <div className="form-group">
                  <label htmlFor="quick-country" className="form-label form-label-required">
                    Country
                  </label>
                  <input 
                    id="quick-country"
                    type="text" 
                    className={`form-input ${errors.country ? 'form-input-error' : ''}`} 
                    placeholder="e.g. United Arab Emirates"
                    value={quickData.country}
                    onChange={(e) => handleQuickChange('country', e.target.value)}
                    autoComplete="country-name"
                    required
                  />
                  {errors.country && (
                    <span className="form-error-msg" role="alert">
                      <AlertCircle size={13} />
                      <span>{errors.country}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                <label htmlFor="quick-message" className="form-label">
                  What tea or samples are you looking for?
                </label>
                <textarea 
                  id="quick-message"
                  className="form-textarea"
                  placeholder="Tell us what tea type, grade or quantity you need, or request sample kits..."
                  value={quickData.message}
                  onChange={(e) => handleQuickChange('message', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Error Alert */}
              {(formStatus === 'VALIDATION_ERROR' || formStatus === 'SUBMISSION_ERROR' || submissionError) && (
                <div className="form-banner-error" role="alert">
                  <AlertCircle size={16} className="buyer-error-icon" />
                  <span className="buyer-error-msg">
                    {submissionError || 'Please complete all required fields highlighted above.'}
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <div className="buyer-form-action-wrap">
                <button 
                  type="submit" 
                  className="buyer-submit-btn" 
                  disabled={formStatus === 'SUBMITTING'}
                  aria-label="Send Enquiry"
                >
                  {formStatus === 'SUBMITTING' ? (
                    <span className="buyer-btn-inner">
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Sending...</span>
                    </span>
                  ) : (
                    <span className="buyer-btn-inner">
                      <span>Submit Sourcing Requirement</span>
                      <Send size={16} />
                    </span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* FORM B — Detailed Tea Requirement */
            <form onSubmit={handleDetailedSubmit} noValidate className="buyer-form-root">
              {/* Anti-Bot Honeypot */}
              <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <input 
                  type="text" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />
              </div>

              {/* Section 1: Buyer Information */}
              <div className="buyer-form-section-title-wrap" style={{ marginBottom: 'var(--space-3)' }}>
                <span className="buyer-section-title" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                  BUYER INFORMATION
                </span>
              </div>

              <div className="buyer-form-grid-2">
                <div className="form-group">
                  <label htmlFor="det-contact" className="form-label form-label-required">
                    Contact Person
                  </label>
                  <input 
                    id="det-contact"
                    type="text" 
                    className={`form-input ${errors.contactPerson ? 'form-input-error' : ''}`} 
                    placeholder="e.g. Tariq Mansoor"
                    value={detailedData.contactPerson}
                    onChange={(e) => handleDetailedChange('contactPerson', e.target.value)}
                    autoComplete="name"
                    required
                  />
                  {errors.contactPerson && <span className="form-error-msg"><AlertCircle size={13} /><span>{errors.contactPerson}</span></span>}
                </div>

                <div className="form-group">
                  <label htmlFor="det-company" className="form-label form-label-required">
                    Company Legal Name
                  </label>
                  <input 
                    id="det-company"
                    type="text" 
                    className={`form-input ${errors.companyName ? 'form-input-error' : ''}`} 
                    placeholder="e.g. Al-Noor Tea Trading LLC"
                    value={detailedData.companyName}
                    onChange={(e) => handleDetailedChange('companyName', e.target.value)}
                    autoComplete="organization"
                    required
                  />
                  {errors.companyName && <span className="form-error-msg"><AlertCircle size={13} /><span>{errors.companyName}</span></span>}
                </div>
              </div>

              <div className="buyer-form-grid-3">
                <div className="form-group">
                  <label htmlFor="det-email" className="form-label form-label-required">
                    Email Address
                  </label>
                  <input 
                    id="det-email"
                    type="email" 
                    className={`form-input ${errors.businessEmail ? 'form-input-error' : ''}`} 
                    placeholder="buyer@company.com"
                    value={detailedData.businessEmail}
                    onChange={(e) => handleDetailedChange('businessEmail', e.target.value)}
                    autoComplete="email"
                    required
                  />
                  {errors.businessEmail && <span className="form-error-msg"><AlertCircle size={13} /><span>{errors.businessEmail}</span></span>}
                </div>

                <div className="form-group">
                  <label htmlFor="det-phone" className="form-label form-label-required">
                    WhatsApp / Phone
                  </label>
                  <input 
                    id="det-phone"
                    type="tel" 
                    className={`form-input ${errors.phoneWhatsApp ? 'form-input-error' : ''}`} 
                    placeholder="+971 50 XXX XXXX"
                    value={detailedData.phoneWhatsApp}
                    onChange={(e) => handleDetailedChange('phoneWhatsApp', e.target.value)}
                    autoComplete="tel"
                    required
                  />
                  {errors.phoneWhatsApp && <span className="form-error-msg"><AlertCircle size={13} /><span>{errors.phoneWhatsApp}</span></span>}
                </div>

                <div className="form-group">
                  <label htmlFor="det-country" className="form-label form-label-required">
                    Country
                  </label>
                  <input 
                    id="det-country"
                    type="text" 
                    className={`form-input ${errors.country ? 'form-input-error' : ''}`} 
                    placeholder="e.g. United Arab Emirates"
                    value={detailedData.country}
                    onChange={(e) => handleDetailedChange('country', e.target.value)}
                    autoComplete="country-name"
                    required
                  />
                  {errors.country && <span className="form-error-msg"><AlertCircle size={13} /><span>{errors.country}</span></span>}
                </div>
              </div>

              {/* Section 2: Tea Requirement */}
              <div className="buyer-form-section-title-wrap" style={{ margin: 'var(--space-4) 0 var(--space-3)' }}>
                <span className="buyer-section-title" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                  TEA &amp; PACKING SPECIFICATION
                </span>
              </div>

              <div className="buyer-form-grid-2">
                <div className="form-group">
                  <label htmlFor="det-category" className="form-label form-label-required">
                    Tea Type
                  </label>
                  <select 
                    id="det-category"
                    className="form-select"
                    value={detailedData.requirementType}
                    onChange={(e) => handleDetailedChange('requirementType', e.target.value)}
                  >
                    <option value="Assam CTC">Assam CTC Black Tea</option>
                    <option value="Orthodox">Orthodox Black Tea</option>
                    <option value="Darjeeling">Darjeeling Specialty Black Tea</option>
                    <option value="Green Tea">Indian Green Tea</option>
                    <option value="Bulk Tea Supply">Bulk Tea Supply (Export Sacks)</option>
                    <option value="Private Label Retail Product">Private Label &amp; OEM Packing</option>
                    <option value="Custom Specification">Custom Sieve Cut / Benchmark Match</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="det-grade" className="form-label form-label-required">
                    Grade
                  </label>
                  <select 
                    id="det-grade"
                    className="form-select font-spec"
                    value={detailedData.grade}
                    onChange={(e) => handleDetailedChange('grade', e.target.value)}
                  >
                    <option value="BOP">BOP — Broken Orange Pekoe</option>
                    <option value="BOPSM">BOPSM — BOP Small</option>
                    <option value="BP">BP — Broken Pekoe</option>
                    <option value="PF">PF — Pekoe Fannings</option>
                    <option value="PD">PD — Pekoe Dust</option>
                    <option value="Dust">Dust / D1</option>
                    <option value="TGFOP">TGFOP — Tippy Golden Flowery Orange Pekoe</option>
                    <option value="FBOP">FBOP — Flowery Broken Orange Pekoe</option>
                    <option value="Open to Recommendation">Open to Recommendation</option>
                    <option value="Custom">Custom Formulation / Target Sample</option>
                  </select>
                </div>
              </div>

              <div className="buyer-form-grid-3">
                <div className="form-group">
                  <label htmlFor="det-volume" className="form-label form-label-required">
                    Quantity Scope
                  </label>
                  <select 
                    id="det-volume"
                    className="form-select"
                    value={detailedData.volume}
                    onChange={(e) => handleDetailedChange('volume', e.target.value)}
                  >
                    <option value="Trial Batch / Initial Order">Trial Batch / Initial Order</option>
                    <option value="LCL (1 – 5 MT)">LCL (1 – 5 MT)</option>
                    <option value="Full Container Load (1x20ft FCL ~10–12 MT)">1x20ft FCL (~10–12 MT)</option>
                    <option value="Multi-Container Contract (2+ FCL)">Multi-Container (2+ FCL)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="det-packaging" className="form-label form-label-required">
                    Packaging Requirement
                  </label>
                  <select 
                    id="det-packaging"
                    className="form-select"
                    value={detailedData.packaging}
                    onChange={(e) => handleDetailedChange('packaging', e.target.value)}
                  >
                    <option value="Standard Bulk Export Sacks">Standard Bulk Export Sacks</option>
                    <option value="Heavy-duty Woven Sacks">Heavy-duty Woven Sacks</option>
                    <option value="Retail Stand-up Pouches">Retail Pouches / Tins (OEM)</option>
                    <option value="Custom Packaging">Custom Packaging to Specification</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="det-port" className="form-label form-label-required">
                    Destination Port
                  </label>
                  <input 
                    id="det-port"
                    type="text" 
                    className={`form-input ${errors.destinationPort ? 'form-input-error' : ''}`} 
                    placeholder="e.g. Jebel Ali / Felixstowe"
                    value={detailedData.destinationPort}
                    onChange={(e) => handleDetailedChange('destinationPort', e.target.value)}
                    required
                  />
                  {errors.destinationPort && <span className="form-error-msg"><AlertCircle size={13} /><span>{errors.destinationPort}</span></span>}
                </div>
              </div>

              <div className="buyer-form-grid-2" style={{ marginTop: 'var(--space-3)' }}>
                {/* Target Price (Optional) */}
                <div className="form-group">
                  <label htmlFor="det-target-price" className="form-label">
                    Target Price Bracket (Optional)
                  </label>
                  <input 
                    id="det-target-price"
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. USD 2.80–3.20/kg CIF Jebel Ali"
                    value={detailedData.targetPrice || ''}
                    onChange={(e) => handleDetailedChange('targetPrice', e.target.value)}
                  />
                </div>

                {/* Sample Requirement */}
                <div className="form-group">
                  <label htmlFor="det-sample-req" className="form-label">
                    Sample Evaluation Required?
                  </label>
                  <select 
                    id="det-sample-req"
                    className="form-select"
                    value={detailedData.buyerRole || 'Sample Evaluation Required'}
                    onChange={(e) => handleDetailedChange('buyerRole', e.target.value)}
                  >
                    <option value="Physical Counter-Samples Required">Yes — Arrange physical counter-samples for cupping</option>
                    <option value="Proforma Quotation First">No — Provide indicative proforma quote first</option>
                    <option value="Specification Match Discussion">Open to discuss sourcing options</option>
                  </select>
                </div>
              </div>

              {/* Section 3: Additional Notes */}
              <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                <label htmlFor="det-specs" className="form-label">
                  Target Specifications, Sieve Cut, or Sample Notes (Optional)
                </label>
                <textarea 
                  id="det-specs"
                  className="form-textarea"
                  placeholder="Provide any specific cup parameters, physical benchmark matching details, or preferred shipment timeline..."
                  value={detailedData.qualitySpecs}
                  onChange={(e) => handleDetailedChange('qualitySpecs', e.target.value)}
                  rows={2}
                />
              </div>

              {/* Error Alert */}
              {(formStatus === 'VALIDATION_ERROR' || formStatus === 'SUBMISSION_ERROR' || submissionError) && (
                <div className="form-banner-error" role="alert">
                  <AlertCircle size={16} className="buyer-error-icon" />
                  <span className="buyer-error-msg">
                    {submissionError || 'Please complete all required fields highlighted above.'}
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <div className="buyer-form-action-wrap">
                <button 
                  type="submit" 
                  className="buyer-submit-btn" 
                  disabled={formStatus === 'SUBMITTING'}
                  aria-label="Submit Tea Requirement"
                >
                  {formStatus === 'SUBMITTING' ? (
                    <span className="buyer-btn-inner">
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Submitting Requirement...</span>
                    </span>
                  ) : (
                    <span className="buyer-btn-inner">
                      <span>Submit Tea Requirement</span>
                      <Send size={16} />
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
