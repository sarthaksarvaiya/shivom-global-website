import { CONTACT_INFO } from '@/constants/contact';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  MessageCircle, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  AlertCircle, 
  RefreshCw, 
  Mail, 
  FileCheck2, 
  Lock, 
  Layers, 
  Scale, 
  Building2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
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

const DEFAULT_FORM_DATA: BuyerRequirementFormData = {
  requirementType: 'Assam CTC',
  grade: 'BOP',
  volume: 'Trial Batch (250 kg – 500 kg)',
  packaging: '25kg Multi-wall Kraft Sack + PE Liner',
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

export const BuyerRequirementForm: React.FC<BuyerRequirementFormProps> = ({
  initialRequirementType,
  initialGrade,
  initialIntent = 'sample',
}) => {
  const [formData, setFormData] = useState<BuyerRequirementFormData>(DEFAULT_FORM_DATA);
  const [inquiryIntent, setInquiryIntent] = useState<'sample' | 'quote' | 'packing'>(initialIntent);
  const [errors, setErrors] = useState<FieldValidationErrors>({});
  const [formStatus, setFormStatus] = useState<FormStatus>('IDLE');
  const [submissionError, setSubmissionError] = useState<string>('');
  const [submittedRecord, setSubmittedRecord] = useState<BuyerRequirementRecord | null>(null);

  // Honeypot field for anti-bot protection
  const [honeypot, setHoneypot] = useState<string>('');

  // Refs for accessible focus management upon validation error
  const portInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  // Synchronize incoming contextual preselection
  useEffect(() => {
    if (initialRequirementType) {
      setFormData((prev) => ({ ...prev, requirementType: initialRequirementType }));
      setErrors((prev) => ({ ...prev, requirementType: undefined }));
    }
    if (initialGrade) {
      setFormData((prev) => ({ ...prev, grade: initialGrade }));
      setErrors((prev) => ({ ...prev, grade: undefined }));
    }
    if (initialIntent) {
      setInquiryIntent(initialIntent);
    }
  }, [initialRequirementType, initialGrade, initialIntent]);

  const handleFieldChange = (field: keyof BuyerRequirementFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (formStatus === 'VALIDATION_ERROR' || formStatus === 'SUBMISSION_ERROR') {
      setSubmissionError('');
    }
  };

  const focusFirstError = (validationErrors: FieldValidationErrors) => {
    if (validationErrors.destinationPort) {
      portInputRef.current?.focus();
    } else if (validationErrors.companyName) {
      companyInputRef.current?.focus();
    } else if (validationErrors.contactPerson) {
      contactInputRef.current?.focus();
    } else if (validationErrors.businessEmail) {
      emailInputRef.current?.focus();
    } else if (validationErrors.phoneWhatsApp) {
      phoneInputRef.current?.focus();
    } else if (validationErrors.country) {
      countryInputRef.current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Silent trap for automated bot spam
    if (honeypot) {
      console.warn('Submission discarded via honeypot trap.');
      return;
    }

    setFormStatus('VALIDATING');
    setSubmissionError('');

    // Comprehensive client-side validation
    const validationErrors = validateRequirementForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormStatus('VALIDATION_ERROR');
      focusFirstError(validationErrors);
      return;
    }

    setErrors({});
    setFormStatus('SUBMITTING');

    try {
      // Append inquiry intent to quality specs so it flows safely into database and email notification
      const intentNote = inquiryIntent === 'sample' 
        ? '[Primary Action: Request Free Samples for Evaluation]'
        : inquiryIntent === 'packing'
        ? '[Primary Action: Discuss Custom Packing & Private Label]'
        : '[Primary Action: Price Quotation & Order Inquiry]';

      const enrichedFormData: BuyerRequirementFormData = {
        ...formData,
        qualitySpecs: formData.qualitySpecs 
          ? `${intentNote}\n${formData.qualitySpecs}` 
          : intentNote,
      };

      const record = buildRequirementRecord(enrichedFormData);
      const response = await submitBuyerRequirement(record, honeypot);
      if (response.success && response.record) {
        setSubmittedRecord(response.record);
        setFormStatus('SUCCESS');
      } else {
        if (response.details) {
          setErrors(response.details);
        }
        setFormStatus('SUBMISSION_ERROR');
        setSubmissionError(
          response.error || 'The requirement could not be submitted right now. Your entered parameters have been preserved.'
        );
      }
    } catch {
      setFormStatus('SUBMISSION_ERROR');
      setSubmissionError('Network error communicating with the submission desk. Please verify your connection and try again.');
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM_DATA);
    setErrors({});
    setFormStatus('IDLE');
    setSubmissionError('');
    setSubmittedRecord(null);
  };

  return (
    <section id="requirement-form" className="buyer-engine-section" aria-labelledby="buyer-engine-heading">
      <div className="container">
        
        {/* Section Header */}
        <div className="buyer-engine-header">
          <div className="buyer-engine-eyebrow">
            <span className="spec-badge spec-badge-gold">DIRECT TRADE DESK</span>
          </div>
          <h2 id="buyer-engine-heading" className="buyer-engine-title">
            Tell Us What Tea You Need
          </h2>
          <p className="buyer-engine-lead">
            Share the tea grade, quantity, packing requirement and destination. We'll review your requirement and respond with the available options.
          </p>
        </div>

        {/* Direct Contact Channels Strip */}
        <div className="contact-direct-strip" role="region" aria-label="Direct trade desk contact options">
          <div className="contact-direct-top">
            <h3 className="contact-direct-title">Direct Contact Channels</h3>
            <p className="contact-direct-desc">
              Reach Sarthak directly via WhatsApp, Phone, or Email for immediate answers regarding grades, samples, or export pricing:
            </p>
          </div>

          <div className="contact-direct-grid">
            <a 
              href={CONTACT_INFO.whatsapp.getLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-direct-card card-whatsapp"
              aria-label={CONTACT_INFO.whatsapp.ariaLabel}
            >
              <div className="contact-direct-icon-wrap wa-icon-wrap" aria-hidden="true">
                <MessageCircle size={20} />
              </div>
              <div className="contact-direct-info">
                <span className="contact-direct-type">WhatsApp Trade Desk</span>
                <span className="contact-direct-val">{CONTACT_INFO.whatsapp.display}</span>
              </div>
            </a>

            <a 
              href={CONTACT_INFO.phone.telLink} 
              className="contact-direct-card card-phone"
              aria-label={CONTACT_INFO.phone.ariaLabel}
            >
              <div className="contact-direct-icon-wrap phone-icon-wrap" aria-hidden="true">
                <Phone size={18} />
              </div>
              <div className="contact-direct-info">
                <span className="contact-direct-type">Call Sarthak</span>
                <span className="contact-direct-val">{CONTACT_INFO.phone.display}</span>
              </div>
            </a>

            <a 
              href={CONTACT_INFO.email.mailtoLink} 
              className="contact-direct-card card-email"
              aria-label={CONTACT_INFO.email.ariaLabel}
            >
              <div className="contact-direct-icon-wrap email-icon-wrap" aria-hidden="true">
                <Mail size={18} />
              </div>
              <div className="contact-direct-info">
                <span className="contact-direct-type">Email Directly</span>
                <span className="contact-direct-val">{CONTACT_INFO.email.address}</span>
              </div>
            </a>
          </div>

          <div className="contact-direct-footer-note">
            <MapPin size={14} aria-hidden="true" />
            <span>Operational Base: <strong>{CONTACT_INFO.address.display}</strong> &bull; {CONTACT_INFO.entityType}</span>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="buyer-engine-card">
          
          {formStatus === 'SUCCESS' && submittedRecord ? (
            /* Authoritative Success State (Actual Backend Reference ID) */
            <div className="buyer-engine-success" role="region" aria-label="Requirement Confirmation">
              <div className="buyer-success-icon-wrap">
                <CheckCircle2 size={40} className="buyer-success-icon" />
              </div>

              <div className="buyer-success-badge-wrap">
                <span className="spec-badge spec-badge-gold">INQUIRY RECEIVED</span>
              </div>

              <h3 className="buyer-success-title">
                {inquiryIntent === 'sample' ? 'Sample Request Received' : 'Requirement Received'}
              </h3>
              
              <p className="buyer-success-lead">
                Thank you. Your tea requirement has been received by Sarthak at the SHIVOM GLOBAL trade desk. 
                We will review your specifications against current tea availability and contact you promptly.
              </p>

              <div className="buyer-success-ref-box">
                <span className="buyer-success-ref-label">Reference ID:</span>
                <strong className="font-spec buyer-success-ref-val">
                  {submittedRecord.referenceId}
                </strong>
              </div>

              {/* Requirement Summary Snapshot */}
              <div className="buyer-success-summary">
                <div className="buyer-summary-header">
                  <div className="buyer-summary-title">
                    <FileCheck2 size={16} />
                    <span>Inquiry Summary</span>
                  </div>
                  <span className="font-spec buyer-summary-ref">
                    {submittedRecord.referenceId}
                  </span>
                </div>

                <div className="buyer-summary-grid">
                  <div><strong>Company:</strong> {submittedRecord.companyName} ({submittedRecord.country})</div>
                  <div><strong>Contact:</strong> {submittedRecord.contactPerson} &lt;{submittedRecord.businessEmail}&gt;</div>
                  <div><strong>Phone / WhatsApp:</strong> {submittedRecord.phoneWhatsApp}</div>
                  <div><strong>Tea Category:</strong> {submittedRecord.requirementType}</div>
                  <div><strong>Preferred Grade:</strong> <span className="font-spec">{submittedRecord.grade}</span></div>
                  <div><strong>Quantity Scope:</strong> {submittedRecord.volume}</div>
                  <div><strong>Packaging Format:</strong> {submittedRecord.packaging}</div>
                  <div><strong>Destination Port:</strong> {submittedRecord.destinationPort}</div>
                  {submittedRecord.buyerRole && <div><strong>Business Type:</strong> {submittedRecord.buyerRole}</div>}
                  {submittedRecord.qualitySpecs && <div><strong>Specifications / Notes:</strong> {submittedRecord.qualitySpecs}</div>}
                </div>

                <div className="buyer-summary-timestamp">
                  Captured: {new Date(submittedRecord.submittedAt).toUTCString()} &bull; Direct Trade Desk
                </div>
              </div>

              <div className="buyer-success-actions">
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
          ) : (
            /* Active Form Inputs */
            <form onSubmit={handleSubmit} noValidate className="buyer-form-root">
              
              {/* Anti-Bot Honeypot Field */}
              <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="website_hp">Leave this field blank</label>
                <input 
                  type="text" 
                  id="website_hp" 
                  name="website_hp" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  tabIndex={-1} 
                  autoComplete="off"
                />
              </div>

              {/* INTENT SELECTOR BAR: Samples vs Quotation vs Custom Packing */}
              <div className="buyer-intent-selector-wrap" role="group" aria-label="Choose your primary inquiry intent">
                <span className="buyer-intent-label font-spec">PRIMARY INQUIRY GOAL:</span>
                <div className="buyer-intent-tabs">
                  <button
                    type="button"
                    onClick={() => setInquiryIntent('sample')}
                    className={`buyer-intent-tab ${inquiryIntent === 'sample' ? 'buyer-intent-tab-active' : ''}`}
                    aria-pressed={inquiryIntent === 'sample'}
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Request Free Samples</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInquiryIntent('quote')}
                    className={`buyer-intent-tab ${inquiryIntent === 'quote' ? 'buyer-intent-tab-active' : ''}`}
                    aria-pressed={inquiryIntent === 'quote'}
                  >
                    <Send size={14} aria-hidden="true" />
                    <span>Get Price Quotation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInquiryIntent('packing')}
                    className={`buyer-intent-tab ${inquiryIntent === 'packing' ? 'buyer-intent-tab-active' : ''}`}
                    aria-pressed={inquiryIntent === 'packing'}
                  >
                    <Layers size={14} aria-hidden="true" />
                    <span>Custom Packing &amp; Private Label</span>
                  </button>
                </div>
              </div>

              {/* GROUP 1: TEA SPECIFICATION */}
              <div className="buyer-form-group-section">
                <div className="buyer-form-section-header">
                  <div className="buyer-section-icon-box">
                    <Layers size={16} />
                  </div>
                  <div className="buyer-section-title-wrap">
                    <span className="buyer-section-num">01</span>
                    <h3 className="buyer-section-title">TEA SPECIFICATION</h3>
                  </div>
                </div>

                <div className="buyer-form-grid-2">
                  {/* Tea Category */}
                  <div className="form-group">
                    <label htmlFor="requirementType" className="form-label form-label-required">
                      Tea Category
                    </label>
                    <select 
                      id="requirementType"
                      name="requirementType"
                      className={`form-select ${errors.requirementType ? 'form-input-error' : ''}`}
                      value={formData.requirementType}
                      onChange={(e) => handleFieldChange('requirementType', e.target.value)}
                      aria-invalid={!!errors.requirementType}
                      aria-describedby={errors.requirementType ? 'requirementType-error' : undefined}
                    >
                      <option value="Assam CTC">Assam CTC Black Tea</option>
                      <option value="Orthodox">Orthodox Black Tea</option>
                      <option value="Darjeeling">Darjeeling Specialty Black Tea</option>
                      <option value="Green Tea">Indian Green Tea</option>
                      <option value="Bulk Tea for Repacking">Bulk Tea for Repacking (25kg Sacks)</option>
                      <option value="Private Label Retail Product">Private Label &amp; Custom Packing</option>
                      <option value="Custom Specification">Custom Formulation / Benchmark Match</option>
                    </select>
                    {errors.requirementType && (
                      <span id="requirementType-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.requirementType}</span>
                      </span>
                    )}
                  </div>

                  {/* Preferred Grade */}
                  <div className="form-group">
                    <label htmlFor="grade" className="form-label form-label-required">
                      Grade / Cut
                    </label>
                    <select 
                      id="grade"
                      name="grade"
                      className={`form-select font-spec ${errors.grade ? 'form-input-error' : ''}`}
                      value={formData.grade}
                      onChange={(e) => handleFieldChange('grade', e.target.value)}
                      aria-invalid={!!errors.grade}
                      aria-describedby={errors.grade ? 'grade-error' : undefined}
                    >
                      <option value="BOP">BOP — Broken Orange Pekoe (Broken leaf, strong liquor)</option>
                      <option value="BOPSM">BOPSM — BOP Small (Even granular cut)</option>
                      <option value="BP">BP — Broken Pekoe (Medium broken leaf, strong cup)</option>
                      <option value="PF">PF — Pekoe Fannings (Fine particles, tea bags)</option>
                      <option value="PD">PD — Pekoe Dust (Fine grade, strong liquor / chai)</option>
                      <option value="Dust">Dust / D1 (Finest cut, maximum color)</option>
                      <option value="TGFOP">TGFOP — Tippy Golden Flowery Orange Pekoe (Whole leaf tips)</option>
                      <option value="FBOP">FBOP — Flowery Broken Orange Pekoe (Aromatic broken leaf)</option>
                      <option value="Open to Recommendation">Open to Recommendation (Based on Application)</option>
                      <option value="Custom">Custom Sieve / Benchmark Sample</option>
                    </select>
                    {errors.grade && (
                      <span id="grade-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.grade}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Target Application & Quality Details */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="qualitySpecs" className="form-label">
                    Cup Profile or Application Notes (Optional)
                  </label>
                  <textarea 
                    id="qualitySpecs"
                    name="qualitySpecs"
                    className={`form-textarea ${errors.qualitySpecs ? 'form-input-error' : ''}`}
                    placeholder="e.g. Target liquor color, strength in milk, leaf particle preference, or sample delivery address..."
                    value={formData.qualitySpecs}
                    onChange={(e) => handleFieldChange('qualitySpecs', e.target.value)}
                    rows={2}
                    aria-invalid={!!errors.qualitySpecs}
                    aria-describedby={errors.qualitySpecs ? 'qualitySpecs-error' : 'qualitySpecs-hint'}
                  />
                  {errors.qualitySpecs ? (
                    <span id="qualitySpecs-error" className="form-error-msg" role="alert">
                      <AlertCircle size={14} />
                      <span>{errors.qualitySpecs}</span>
                    </span>
                  ) : (
                    <span id="qualitySpecs-hint" className="form-hint">
                      Include sample delivery details or target cup requirements here.
                    </span>
                  )}
                </div>
              </div>

              {/* GROUP 2: ORDER & SHIPPING SPECIFICATIONS */}
              <div className="buyer-form-group-section">
                <div className="buyer-form-section-header">
                  <div className="buyer-section-icon-box">
                    <Scale size={16} />
                  </div>
                  <div className="buyer-section-title-wrap">
                    <span className="buyer-section-num">02</span>
                    <h3 className="buyer-section-title">ORDER &amp; SHIPPING PARAMETERS</h3>
                  </div>
                </div>

                <div className="buyer-form-grid-2">
                  {/* Estimated Volume */}
                  <div className="form-group">
                    <label htmlFor="volume" className="form-label form-label-required">
                      Quantity Scope
                    </label>
                    <select 
                      id="volume"
                      name="volume"
                      className={`form-select ${errors.volume ? 'form-input-error' : ''}`}
                      value={formData.volume}
                      onChange={(e) => handleFieldChange('volume', e.target.value)}
                      aria-invalid={!!errors.volume}
                      aria-describedby={errors.volume ? 'volume-error' : undefined}
                    >
                      <option value="Trial Batch (250 kg – 500 kg)">Trial Batch (250 kg – 500 kg) — Recommended for initial orders</option>
                      <option value="LCL (1 – 5 MT)">LCL (1 – 5 MT)</option>
                      <option value="Full Container Load (1x20ft FCL ~10–12 MT)">Full Container Load (1x20ft FCL ~10–12 MT)</option>
                      <option value="Multi-Container Contract (2+ FCL)">Multi-Container Contract (2+ FCL)</option>
                    </select>
                    {errors.volume && (
                      <span id="volume-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.volume}</span>
                      </span>
                    )}
                  </div>

                  {/* Packaging Format */}
                  <div className="form-group">
                    <label htmlFor="packaging" className="form-label form-label-required">
                      Packing Format
                    </label>
                    <select 
                      id="packaging"
                      name="packaging"
                      className={`form-select ${errors.packaging ? 'form-input-error' : ''}`}
                      value={formData.packaging}
                      onChange={(e) => handleFieldChange('packaging', e.target.value)}
                      aria-invalid={!!errors.packaging}
                      aria-describedby={errors.packaging ? 'packaging-error' : undefined}
                    >
                      <option value="25kg Multi-wall Kraft Sack + PE Liner">25kg Multi-wall Kraft Sack + LDPE Liner (Standard Export)</option>
                      <option value="50kg Woven PP Bag + Liner">50kg Woven PP Bag + Inner Liner</option>
                      <option value="Retail Stand-up Pouches">Retail Pouches / Tins (OEM)</option>
                      <option value="Custom Packaging">Custom Packaging Requirement</option>
                    </select>
                    {errors.packaging && (
                      <span id="packaging-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.packaging}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="buyer-form-grid-2">
                  {/* Destination Port & Country */}
                  <div className="form-group">
                    <label htmlFor="destinationPort" className="form-label form-label-required">
                      Destination Port &amp; Country
                    </label>
                    <input 
                      ref={portInputRef}
                      id="destinationPort"
                      name="destinationPort"
                      type="text" 
                      className={`form-input ${errors.destinationPort ? 'form-input-error' : ''}`} 
                      placeholder="e.g. Jebel Ali, UAE / Dammam, KSA / Felixstowe, UK"
                      value={formData.destinationPort}
                      onChange={(e) => handleFieldChange('destinationPort', e.target.value)}
                      aria-invalid={!!errors.destinationPort}
                      aria-describedby={errors.destinationPort ? 'destinationPort-error' : 'destinationPort-hint'}
                      required
                    />
                    {errors.destinationPort ? (
                      <span id="destinationPort-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.destinationPort}</span>
                      </span>
                    ) : (
                      <span id="destinationPort-hint" className="form-hint">
                        Needed to calculate freight routes and destination quotation.
                      </span>
                    )}
                  </div>

                  {/* Target Price (Optional) */}
                  <div className="form-group">
                    <label htmlFor="targetPrice" className="form-label">
                      Target Price (Optional)
                    </label>
                    <input 
                      id="targetPrice"
                      name="targetPrice"
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. FOB Indian port or CIF target range"
                      value={formData.targetPrice || ''}
                      onChange={(e) => handleFieldChange('targetPrice', e.target.value)}
                      aria-describedby="targetPrice-hint"
                    />
                    <span id="targetPrice-hint" className="form-hint">
                      Helps us recommend grades within your budget.
                    </span>
                  </div>
                </div>
              </div>

              {/* GROUP 3: BUYER DETAILS */}
              <div className="buyer-form-group-section">
                <div className="buyer-form-section-header">
                  <div className="buyer-section-icon-box">
                    <Building2 size={16} />
                  </div>
                  <div className="buyer-section-title-wrap">
                    <span className="buyer-section-num">03</span>
                    <h3 className="buyer-section-title">BUYER CONTACT DETAILS</h3>
                  </div>
                </div>

                <div className="buyer-form-grid-2">
                  {/* Company Name */}
                  <div className="form-group">
                    <label htmlFor="companyName" className="form-label form-label-required">
                      Company Name
                    </label>
                    <input 
                      ref={companyInputRef}
                      id="companyName"
                      name="companyName"
                      type="text" 
                      className={`form-input ${errors.companyName ? 'form-input-error' : ''}`} 
                      placeholder="e.g. Al-Noor Tea Trading LLC"
                      value={formData.companyName}
                      onChange={(e) => handleFieldChange('companyName', e.target.value)}
                      autoComplete="organization"
                      aria-invalid={!!errors.companyName}
                      aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                      required
                    />
                    {errors.companyName && (
                      <span id="companyName-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.companyName}</span>
                      </span>
                    )}
                  </div>

                  {/* Contact Person */}
                  <div className="form-group">
                    <label htmlFor="contactPerson" className="form-label form-label-required">
                      Contact Person
                    </label>
                    <input 
                      ref={contactInputRef}
                      id="contactPerson"
                      name="contactPerson"
                      type="text" 
                      className={`form-input ${errors.contactPerson ? 'form-input-error' : ''}`} 
                      placeholder="e.g. Tariq Mansoor"
                      value={formData.contactPerson}
                      onChange={(e) => handleFieldChange('contactPerson', e.target.value)}
                      autoComplete="name"
                      aria-invalid={!!errors.contactPerson}
                      aria-describedby={errors.contactPerson ? 'contactPerson-error' : undefined}
                      required
                    />
                    {errors.contactPerson && (
                      <span id="contactPerson-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.contactPerson}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="buyer-form-grid-3">
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="businessEmail" className="form-label form-label-required">
                      Email Address
                    </label>
                    <input 
                      ref={emailInputRef}
                      id="businessEmail"
                      name="businessEmail"
                      type="email" 
                      className={`form-input ${errors.businessEmail ? 'form-input-error' : ''}`} 
                      placeholder="buyer@company.com"
                      value={formData.businessEmail}
                      onChange={(e) => handleFieldChange('businessEmail', e.target.value)}
                      autoComplete="email"
                      aria-invalid={!!errors.businessEmail}
                      aria-describedby={errors.businessEmail ? 'businessEmail-error' : undefined}
                      required
                    />
                    {errors.businessEmail && (
                      <span id="businessEmail-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.businessEmail}</span>
                      </span>
                    )}
                  </div>

                  {/* WhatsApp / Phone */}
                  <div className="form-group">
                    <label htmlFor="phoneWhatsApp" className="form-label form-label-required">
                      WhatsApp / Phone
                    </label>
                    <input 
                      ref={phoneInputRef}
                      id="phoneWhatsApp"
                      name="phoneWhatsApp"
                      type="tel" 
                      className={`form-input ${errors.phoneWhatsApp ? 'form-input-error' : ''}`} 
                      placeholder="+971 50 XXX XXXX"
                      value={formData.phoneWhatsApp}
                      onChange={(e) => handleFieldChange('phoneWhatsApp', e.target.value)}
                      autoComplete="tel"
                      aria-invalid={!!errors.phoneWhatsApp}
                      aria-describedby={errors.phoneWhatsApp ? 'phoneWhatsApp-error' : undefined}
                      required
                    />
                    {errors.phoneWhatsApp && (
                      <span id="phoneWhatsApp-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.phoneWhatsApp}</span>
                      </span>
                    )}
                  </div>

                  {/* Buyer Country */}
                  <div className="form-group">
                    <label htmlFor="country" className="form-label form-label-required">
                      Country
                    </label>
                    <input 
                      ref={countryInputRef}
                      id="country"
                      name="country"
                      type="text" 
                      className={`form-input ${errors.country ? 'form-input-error' : ''}`} 
                      placeholder="e.g. United Arab Emirates"
                      value={formData.country}
                      onChange={(e) => handleFieldChange('country', e.target.value)}
                      autoComplete="country-name"
                      aria-invalid={!!errors.country}
                      aria-describedby={errors.country ? 'country-error' : undefined}
                      required
                    />
                    {errors.country && (
                      <span id="country-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.country}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Buyer Business Type */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="buyerRole" className="form-label">
                    Business Type (Optional)
                  </label>
                  <select 
                    id="buyerRole"
                    name="buyerRole"
                    className="form-select"
                    value={formData.buyerRole || 'Tea Importer / Trader'}
                    onChange={(e) => handleFieldChange('buyerRole', e.target.value)}
                  >
                    <option value="Tea Importer / Trader">Tea Importer / Trader</option>
                    <option value="Tea Blender / Manufacturer">Tea Blender / Packer</option>
                    <option value="Private Label / Retail Brand">Private Label / Retail Brand</option>
                    <option value="Foodservice / Hospitality">Foodservice / Hospitality</option>
                    <option value="Distributor / Wholesaler">Distributor / Wholesaler</option>
                    <option value="Other">Other Enterprise</option>
                  </select>
                </div>
              </div>

              {/* GROUP 4: ADDITIONAL SOURCING NOTES */}
              <div className="buyer-form-group-section" style={{ borderBottom: 'none', marginBottom: 'var(--space-4)' }}>
                <div className="buyer-form-section-header">
                  <div className="buyer-section-icon-box">
                    <MessageSquare size={16} />
                  </div>
                  <div className="buyer-section-title-wrap">
                    <span className="buyer-section-num">04</span>
                    <h3 className="buyer-section-title">ADDITIONAL NOTES</h3>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="additionalMessage" className="form-label">
                    Additional Sourcing or Sample Notes (Optional)
                  </label>
                  <textarea 
                    id="additionalMessage"
                    name="additionalMessage"
                    className="form-textarea"
                    placeholder="Provide any additional details regarding your sample requirements, target timeline, or special instructions..."
                    value={formData.additionalMessage || ''}
                    onChange={(e) => handleFieldChange('additionalMessage', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              {/* Direct Trade Desk Trust Banner */}
              <div className="buyer-form-trust-banner">
                <div className="buyer-trust-icon-box">
                  <Lock size={16} />
                </div>
                <p className="buyer-trust-text">
                  Your requirement is reviewed directly by Sarthak at the SHIVOM GLOBAL trade desk. All details are kept confidential.
                </p>
              </div>

              {/* Error Alert Banner */}
              {(formStatus === 'VALIDATION_ERROR' || formStatus === 'SUBMISSION_ERROR' || submissionError) && (
                <div className="form-banner-error" role="alert">
                  <div className="buyer-error-content">
                    <AlertCircle size={18} className="buyer-error-icon" />
                    <div style={{ flexGrow: 1 }}>
                      <div className="buyer-error-title">
                        {formStatus === 'SUBMISSION_ERROR' ? 'Submission Temporarily Unavailable' : 'Please Review Required Fields'}
                      </div>
                      <div className="buyer-error-msg">
                        {submissionError || 'Some required fields are missing or contain formatting errors. Please correct the highlighted fields above.'}
                      </div>
                      {formStatus === 'SUBMISSION_ERROR' && (
                        <div className="buyer-error-actions">
                          <button
                            type="submit"
                            className="btn btn-secondary btn-sm"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <RefreshCw size={13} />
                            <span>Retry Submission</span>
                          </button>
                          <a href={CONTACT_INFO.email.mailtoLink} className="buyer-error-fallback" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Mail size={13} />
                            <span>Direct Email: {CONTACT_INFO.email.address}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Final Submit Action & Micro-Trust Badges */}
              <div className="buyer-form-action-wrap">
                <button 
                  type="submit" 
                  className="buyer-submit-btn" 
                  disabled={formStatus === 'SUBMITTING'}
                  aria-label={inquiryIntent === 'sample' ? 'Request Free Tea Samples' : 'Send Buyer Requirement'}
                >
                  {formStatus === 'SUBMITTING' ? (
                    <span className="buyer-btn-inner">
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Sending Requirement...</span>
                    </span>
                  ) : (
                    <span className="buyer-btn-inner">
                      <span>{inquiryIntent === 'sample' ? 'Request Free Samples' : 'Send Buyer Requirement'}</span>
                      <Send size={18} />
                    </span>
                  )}
                </button>

                <div className="buyer-micro-badges">
                  <div className="buyer-badge-item">
                    <FileCheck2 size={13} color="var(--color-primary-green)" />
                    <span>Direct Trade Desk Intake</span>
                  </div>
                  <span className="buyer-badge-dot">•</span>
                  <div className="buyer-badge-item">
                    <ShieldCheck size={13} color="var(--color-primary-green)" />
                    <span>Strict B2B Confidentiality</span>
                  </div>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
