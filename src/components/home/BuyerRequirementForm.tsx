import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
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
  MessageSquare
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
}

const DEFAULT_FORM_DATA: BuyerRequirementFormData = {
  requirementType: 'Bulk Tea for Repacking',
  grade: 'BOP',
  volume: 'Trial Batch (250 kg – 500 kg)',
  packaging: '25kg Multi-wall Kraft Sack + PE Liner',
  destinationPort: 'Jebel Ali, UAE',
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
}) => {
  const [formData, setFormData] = useState<BuyerRequirementFormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<FieldValidationErrors>({});
  const [formStatus, setFormStatus] = useState<FormStatus>('IDLE');
  const [submissionError, setSubmissionError] = useState<string>('');
  const [submittedRecord, setSubmittedRecord] = useState<BuyerRequirementRecord | null>(null);

  // Honeypot field for anti-bot protection
  const [honeypot, setHoneypot] = useState<string>('');

  // Refs for accessible focus management upon validation error
  const companyInputRef = useRef<HTMLInputElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const portInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  // Synchronize incoming contextual preselection from Hero, Categories, Spotlight, or Grade Matrix
  useEffect(() => {
    if (initialRequirementType) {
      setFormData((prev) => ({ ...prev, requirementType: initialRequirementType }));
      setErrors((prev) => ({ ...prev, requirementType: undefined }));
    }
    if (initialGrade) {
      setFormData((prev) => ({ ...prev, grade: initialGrade }));
      setErrors((prev) => ({ ...prev, grade: undefined }));
    }
  }, [initialRequirementType, initialGrade]);

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
      const record = buildRequirementRecord(formData);
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
      setSubmissionError('Network error communicating with the commercial submission desk. Please verify your connection and try again.');
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
            <span className="spec-badge spec-badge-gold">START A COMMERCIAL DISCUSSION</span>
          </div>
          <h2 id="buyer-engine-heading" className="buyer-engine-title">
            Tell Us What You Need
          </h2>
          <p className="buyer-engine-lead">
            Share your tea requirement and commercial parameters. Our trade desk can review the requirement 
            and coordinate the appropriate sourcing path.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="buyer-engine-card">
          
          {formStatus === 'SUCCESS' && submittedRecord ? (
            /* Authoritative Success State (Actual Backend Reference ID) */
            <div className="buyer-engine-success" role="region" aria-label="Commercial Requirement Confirmation">
              <div className="buyer-success-icon-wrap">
                <CheckCircle2 size={40} className="buyer-success-icon" />
              </div>

              <div className="buyer-success-badge-wrap">
                <span className="spec-badge spec-badge-gold">REQUIREMENT RECEIVED</span>
              </div>

              <h3 className="buyer-success-title">
                Requirement received.
              </h3>
              
              <p className="buyer-success-lead">
                Thank you. Your commercial tea sourcing parameters have been received by the SHIVOM GLOBAL trade desk. 
                Our commercial team will review your specification against origin availability.
              </p>

              <div className="buyer-success-ref-box">
                <span className="buyer-success-ref-label">Commercial Reference:</span>
                <strong className="font-spec buyer-success-ref-val">
                  {submittedRecord.referenceId}
                </strong>
              </div>

              {/* Requirement Summary Snapshot */}
              <div className="buyer-success-summary">
                <div className="buyer-summary-header">
                  <div className="buyer-summary-title">
                    <FileCheck2 size={16} />
                    <span>Commercial Requirement Summary</span>
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
                  <div><strong>Estimated Volume:</strong> {submittedRecord.volume}</div>
                  <div><strong>Packaging Format:</strong> {submittedRecord.packaging}</div>
                  <div><strong>Discharging Port:</strong> {submittedRecord.destinationPort}</div>
                  {submittedRecord.buyerRole && <div><strong>Buyer Role:</strong> {submittedRecord.buyerRole}</div>}
                  {submittedRecord.targetPrice && <div><strong>Target Price:</strong> {submittedRecord.targetPrice}</div>}
                  {submittedRecord.qualitySpecs && <div><strong>Specifications / Notes:</strong> {submittedRecord.qualitySpecs}</div>}
                </div>

                <div className="buyer-summary-timestamp">
                  Captured: {new Date(submittedRecord.submittedAt).toUTCString()} • Secure Submission Desk
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

              {/* GROUP 1: PRODUCT REQUIREMENT */}
              <div className="buyer-form-group-section">
                <div className="buyer-form-section-header">
                  <div className="buyer-section-icon-box">
                    <Layers size={16} />
                  </div>
                  <div className="buyer-section-title-wrap">
                    <span className="buyer-section-num">01</span>
                    <h3 className="buyer-section-title">PRODUCT REQUIREMENT</h3>
                  </div>
                </div>

                <div className="buyer-form-grid-2">
                  {/* Tea Category */}
                  <div className="form-group">
                    <label htmlFor="requirementType" className="form-label form-label-required">
                      Tea Category / Scope
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
                      <option value="Bulk Tea for Repacking">Bulk Tea Supply (25kg Kraft Sacks)</option>
                      <option value="Assam CTC">Assam CTC Black Tea (Core Commercial)</option>
                      <option value="Orthodox">Orthodox Black Tea (Whole & Broken Leaf)</option>
                      <option value="Darjeeling">Darjeeling Specialty Tea (GI Protected)</option>
                      <option value="Green Tea">Indian Mountain Green Tea</option>
                      <option value="Private Label Retail Product">Private Label & OEM Contract Packing</option>
                      <option value="Custom Specification">Custom Specification / Counter-Sample Match</option>
                    </select>
                    {errors.requirementType && (
                      <span id="requirementType-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.requirementType}</span>
                      </span>
                    )}
                  </div>

                  {/* Preferred Grade / Cut */}
                  <div className="form-group">
                    <label htmlFor="grade" className="form-label form-label-required">
                      Grade / Specification
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
                      <option value="BOP">BOP — Broken Orange Pekoe (Full-Bodied Base)</option>
                      <option value="BOPSM">BOPSM — BOP Small / Mixed (Fast Extraction)</option>
                      <option value="BP">BP — Broken Pekoe (Blending Backbone)</option>
                      <option value="PF">PF — Pekoe Fannings (Tea Bags / Quick Brew)</option>
                      <option value="PD">PD — Pekoe Dust (High-Density / Chai / Karak)</option>
                      <option value="Dust">Dust / CD — Commercial Dust (High Yield)</option>
                      <option value="Open to Recommendation">Open to Recommendation (Based on Application)</option>
                      <option value="Custom">Custom Sieve / Counter-Sample Formulation</option>
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
                <div className="form-group">
                  <label htmlFor="qualitySpecs" className="form-label">
                    Target Application & Cup Profile Notes (Optional)
                  </label>
                  <textarea 
                    id="qualitySpecs"
                    name="qualitySpecs"
                    className={`form-textarea ${errors.qualitySpecs ? 'form-input-error' : ''}`}
                    placeholder="e.g. For commercial milk tea / Samovar preparation, target liquor color, leaf appearance, or specific regulatory limits (GSO, EU, etc.)..."
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
                      Helps our trade desk align estate samples to your exact cup and processing expectations.
                    </span>
                  )}
                </div>
              </div>

              {/* GROUP 2: COMMERCIAL REQUIREMENT */}
              <div className="buyer-form-group-section">
                <div className="buyer-form-section-header">
                  <div className="buyer-section-icon-box">
                    <Scale size={16} />
                  </div>
                  <div className="buyer-section-title-wrap">
                    <span className="buyer-section-num">02</span>
                    <h3 className="buyer-section-title">COMMERCIAL REQUIREMENT</h3>
                  </div>
                </div>

                <div className="buyer-form-grid-2">
                  {/* Estimated Volume */}
                  <div className="form-group">
                    <label htmlFor="volume" className="form-label form-label-required">
                      Estimated Quantity / Order Scope
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
                      <option value="Trial Batch (250 kg – 500 kg)">Trial Batch (250 kg – 500 kg)</option>
                      <option value="Commercial LCL (1 – 5 MT)">Commercial LCL (1 – 5 MT)</option>
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
                      <option value="Retail Stand-up Pouches">Retail Stand-up Pouches (100g – 1kg OEM)</option>
                      <option value="Custom Packaging">Custom / Buyer-Branded Packaging</option>
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
                      Discharging Port & Destination Country
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
                        Required to calculate freight routing and landed CIF costing.
                      </span>
                    )}
                  </div>

                  {/* Target Price (Optional) */}
                  <div className="form-group">
                    <label htmlFor="targetPrice" className="form-label">
                      Target Price / Commercial Expectation (Optional)
                    </label>
                    <input 
                      id="targetPrice"
                      name="targetPrice"
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. FOB Kolkata or CIF Jebel Ali target range"
                      value={formData.targetPrice || ''}
                      onChange={(e) => handleFieldChange('targetPrice', e.target.value)}
                      aria-describedby="targetPrice-hint"
                    />
                    <span id="targetPrice-hint" className="form-hint">
                      Optional benchmark for commercial feasibility matching.
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
                    <h3 className="buyer-section-title">BUYER CORPORATE PROFILE</h3>
                  </div>
                </div>

                <div className="buyer-form-grid-2">
                  {/* Company Legal Name */}
                  <div className="form-group">
                    <label htmlFor="companyName" className="form-label form-label-required">
                      Company Legal Name
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

                  {/* Contact Person & Title */}
                  <div className="form-group">
                    <label htmlFor="contactPerson" className="form-label form-label-required">
                      Contact Person & Title
                    </label>
                    <input 
                      ref={contactInputRef}
                      id="contactPerson"
                      name="contactPerson"
                      type="text" 
                      className={`form-input ${errors.contactPerson ? 'form-input-error' : ''}`} 
                      placeholder="e.g. Tariq Mansoor, Procurement Director"
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
                  {/* Corporate Email */}
                  <div className="form-group">
                    <label htmlFor="businessEmail" className="form-label form-label-required">
                      Corporate Business Email
                    </label>
                    <input 
                      ref={emailInputRef}
                      id="businessEmail"
                      name="businessEmail"
                      type="email" 
                      className={`form-input ${errors.businessEmail ? 'form-input-error' : ''}`} 
                      placeholder="procurement@company.com"
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

                  {/* Phone / WhatsApp */}
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
                      Registration Country
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

                {/* Buyer Commercial Role (Optional) */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="buyerRole" className="form-label">
                    Buyer Role (Optional)
                  </label>
                  <select 
                    id="buyerRole"
                    name="buyerRole"
                    className="form-select"
                    value={formData.buyerRole || 'Tea Importer / Trader'}
                    onChange={(e) => handleFieldChange('buyerRole', e.target.value)}
                  >
                    <option value="Tea Importer / Trader">Tea Importer / Trader</option>
                    <option value="Tea Blender / Manufacturer">Tea Blender / Manufacturer</option>
                    <option value="Private Label / Retail Brand">Private Label / Retail Brand</option>
                    <option value="Foodservice / Hospitality">Foodservice / Hospitality</option>
                    <option value="Distributor / Wholesaler">Distributor / Wholesaler</option>
                    <option value="Other">Other Commercial Enterprise</option>
                  </select>
                </div>
              </div>

              {/* GROUP 4: ADDITIONAL CONTEXT */}
              <div className="buyer-form-group-section" style={{ borderBottom: 'none', marginBottom: 'var(--space-4)' }}>
                <div className="buyer-form-section-header">
                  <div className="buyer-section-icon-box">
                    <MessageSquare size={16} />
                  </div>
                  <div className="buyer-section-title-wrap">
                    <span className="buyer-section-num">04</span>
                    <h3 className="buyer-section-title">ADDITIONAL CONTEXT</h3>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="additionalMessage" className="form-label">
                    Additional Message or Sourcing Notes (Optional)
                  </label>
                  <textarea 
                    id="additionalMessage"
                    name="additionalMessage"
                    className="form-textarea"
                    placeholder="Provide any additional context regarding sample requirements, project timelines, target delivery dates, or payment terms..."
                    value={formData.additionalMessage || ''}
                    onChange={(e) => handleFieldChange('additionalMessage', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Reassuring Commercial Sourcing Trust Message */}
              <div className="buyer-form-trust-banner">
                <div className="buyer-trust-icon-box">
                  <Lock size={16} />
                </div>
                <p className="buyer-trust-text">
                  Your requirement is reviewed as a commercial sourcing request. 
                  Final availability, specification, pricing and terms are confirmed during the quotation and sampling process.
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
                        {submissionError || 'Some required commercial fields are missing or contain formatting errors. Please correct the highlighted fields above.'}
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
                          <span className="buyer-error-fallback">
                            <Mail size={13} />
                            <span>Direct Trade Desk: shivomglobal1010@gmail.com</span>
                          </span>
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
                  aria-label="Submit commercial tea requirement"
                >
                  {formStatus === 'SUBMITTING' ? (
                    <span className="buyer-btn-inner">
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Transmitting Commercial Requirement...</span>
                    </span>
                  ) : (
                    <span className="buyer-btn-inner">
                      <span>Submit Commercial Requirement</span>
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
                    <span>Strict B2B Commercial Confidentiality</span>
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
