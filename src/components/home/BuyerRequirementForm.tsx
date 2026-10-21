import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  AlertCircle, 
  RefreshCw, 
  Mail, 
  FileCheck2 
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

  // Honeypot field for bot/spam prevention (P4-14)
  const [honeypot, setHoneypot] = useState<string>('');

  // Refs for accessibility focus management (P4-09, P4-12)
  const companyInputRef = useRef<HTMLInputElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const portInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  // Synchronize incoming contextual presets from Router, Catalog, or Grade Matrix (P4-01, P4-02)
  useEffect(() => {
    if (initialRequirementType) {
      setFormData((prev) => ({ ...prev, requirementType: initialRequirementType }));
      // Clear field-level error on preset change
      setErrors((prev) => ({ ...prev, requirementType: undefined }));
    }
    if (initialGrade) {
      setFormData((prev) => ({ ...prev, grade: initialGrade }));
      setErrors((prev) => ({ ...prev, grade: undefined }));
    }
  }, [initialRequirementType, initialGrade]);

  const handleFieldChange = (field: keyof BuyerRequirementFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-level error when user types/selects
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

    // Spam / bot honeypot trap
    if (honeypot) {
      console.warn('Bot submission blocked via honeypot trap.');
      return;
    }

    setFormStatus('VALIDATING');
    setSubmissionError('');

    // Execute comprehensive validation engine (P4-09)
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
      const response = await submitBuyerRequirement(record);
      if (response.success && response.record) {
        setSubmittedRecord(response.record);
        setFormStatus('SUCCESS');
      } else {
        setFormStatus('SUBMISSION_ERROR');
        setSubmissionError(response.error || 'The requirement could not be submitted right now. Your entered parameters have been preserved.');
      }
    } catch (err) {
      setFormStatus('SUBMISSION_ERROR');
      setSubmissionError('The requirement could not be submitted right now. Your entered parameters have been preserved.');
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
    <section id="requirement-form" className="section section-dark" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-12)' }}>
          <span className="spec-badge spec-badge-gold" style={{ marginBottom: 'var(--space-3)' }}>
            DIRECT COMMERCIAL INTAKE
          </span>
          <h2 style={{ color: 'var(--text-inverse)', marginBottom: 'var(--space-4)' }}>
            Tell Us What Tea You Need
          </h2>
          <p className="lead" style={{ color: 'var(--text-inverse-muted)' }}>
            Submit your technical specifications, estimated volume, and destination port. 
            Our commercial export team evaluates lot availability and responds with counter-sample timelines 
            and indicative commercial terms.
          </p>
        </div>

        {/* Form Container Card */}
        <div 
          className="card requirement-form-card" 
          style={{ 
            maxWidth: '860px', 
            margin: '0 auto', 
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-main)',
            boxShadow: 'var(--shadow-elevated)',
            border: '1px solid var(--border-medium)',
          }}
        >
          {formStatus === 'SUCCESS' && submittedRecord ? (
            /* Honest Success & Parameter Summary State (P4-11) */
            <div style={{ textAlign: 'center', padding: 'var(--space-8) var(--space-4)' }} role="region" aria-label="Submission Confirmation">
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(13, 56, 41, 0.08)', 
                color: 'var(--color-primary-green)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)'
              }}>
                <CheckCircle2 size={36} color="var(--color-primary-green)" />
              </div>

              <div style={{ marginBottom: 'var(--space-2)' }}>
                <span className="spec-badge spec-badge-gold" style={{ fontSize: '0.75rem' }}>
                  SPECIFICATION VALIDATED (FRONTEND PREVIEW)
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-3)' }}>
                Requirement Parameters Captured
              </h3>
              
              <p style={{ maxWidth: '620px', margin: '0 auto var(--space-6)', fontSize: '0.9375rem', lineHeight: 'var(--leading-relaxed)' }}>
                Thank you, <strong>{submittedRecord.contactPerson}</strong>. Your commercial tea specification has passed frontend validation. Submission integration is currently in preview mode. You can review your structured requirement parameters below.
              </p>

              <div style={{ 
                backgroundColor: 'var(--bg-surface-subtle)', 
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-6)',
                maxWidth: '560px',
                margin: '0 auto var(--space-6)',
                fontSize: '0.875rem',
                textAlign: 'left',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                boxSizing: 'border-box',
              }}>
                <div style={{ fontWeight: 700, marginBottom: '12px', color: 'var(--color-primary-green)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileCheck2 size={16} />
                    <span>Validated Requirement Summary</span>
                  </span>
                  <span className="font-spec" style={{ fontSize: '0.75rem', color: 'var(--color-accent-gold)', fontWeight: 700 }}>
                    {submittedRecord.referenceId}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div><strong>Company:</strong> {submittedRecord.companyName} ({submittedRecord.country})</div>
                  <div><strong>Contact:</strong> {submittedRecord.contactPerson} &lt;{submittedRecord.businessEmail}&gt; | {submittedRecord.phoneWhatsApp}</div>
                  <div><strong>Tea Scope:</strong> {submittedRecord.requirementType}</div>
                  <div><strong>Grade / Cut:</strong> <span className="font-spec">{submittedRecord.grade}</span></div>
                  <div><strong>Volume Scope:</strong> {submittedRecord.volume}</div>
                  <div><strong>Packaging:</strong> {submittedRecord.packaging}</div>
                  <div><strong>Destination Port:</strong> {submittedRecord.destinationPort}</div>
                  {submittedRecord.qualitySpecs && <div><strong>Quality Details:</strong> {submittedRecord.qualitySpecs}</div>}
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                    Captured: {new Date(submittedRecord.submittedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <button 
                  onClick={handleReset} 
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <RotateCcw size={14} />
                  <span>Configure Another Requirement</span>
                </button>
              </div>
            </div>
          ) : (
            /* Active Form Inputs */
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Invisible Honeypot Anti-Spam Field (P4-14) */}
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

              {/* Part 1: Product & Technical Specs */}
              <div style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary-green)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 'var(--space-4)' }}>
                  1. Tea Specifications & Order Scope
                </div>

                <div className="grid grid-cols-2" style={{ gap: 'var(--space-4)' }}>
                  {/* Requirement Category Handling (P4-01) */}
                  <div className="form-group">
                    <label htmlFor="requirementType" className="form-label form-label-required">Requirement Type</label>
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
                      <option value="Assam CTC">Single-Origin Assam CTC Black Tea</option>
                      <option value="Orthodox">Orthodox Black Tea (Whole & Broken Leaf)</option>
                      <option value="Darjeeling">Darjeeling GI Specialty Tea</option>
                      <option value="Green Tea">Indian Mountain Green Tea</option>
                      <option value="Private Label Retail Product">Private Label / Contract Packing (OEM)</option>
                      <option value="Custom Specification">Custom Specification / Blend Sourcing</option>
                    </select>
                    {errors.requirementType && (
                      <span id="requirementType-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.requirementType}</span>
                      </span>
                    )}
                  </div>

                  {/* Grade / Cut Handling (P4-02) */}
                  <div className="form-group">
                    <label htmlFor="grade" className="form-label form-label-required">Preferred Grade / Cut</label>
                    <select 
                      id="grade"
                      name="grade"
                      className={`form-select font-spec ${errors.grade ? 'form-input-error' : ''}`}
                      value={formData.grade}
                      onChange={(e) => handleFieldChange('grade', e.target.value)}
                      aria-invalid={!!errors.grade}
                      aria-describedby={errors.grade ? 'grade-error' : undefined}
                    >
                      <option value="BOP">BOP — Broken Orange Pekoe</option>
                      <option value="BOPSM">BOPSM — BOP Small</option>
                      <option value="BP">BP — Broken Pekoe</option>
                      <option value="PF">PF — Pekoe Fannings</option>
                      <option value="PD">PD — Pekoe Dust</option>
                      <option value="Dust">Dust / CD — Churamani Dust</option>
                      <option value="Open to Recommendation">Open to Recommendation (Based on Cup)</option>
                      <option value="Custom">Custom Sieve Mesh / Counter-Sample Match</option>
                    </select>
                    {errors.grade && (
                      <span id="grade-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.grade}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: 'var(--space-4)' }}>
                  {/* Quantity / Volume Handling (P4-04) */}
                  <div className="form-group">
                    <label htmlFor="volume" className="form-label form-label-required">Estimated Volume</label>
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

                  {/* Packaging Handling (P4-05) */}
                  <div className="form-group">
                    <label htmlFor="packaging" className="form-label form-label-required">Packaging Preference</label>
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
                      <option value="Retail Stand-up Pouches">Retail Stand-up Pouches (100g – 1kg)</option>
                      <option value="Custom Packaging">Custom / Buyer-Supplied Packaging</option>
                    </select>
                    {errors.packaging && (
                      <span id="packaging-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.packaging}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Destination Handling (P4-06) */}
                <div className="form-group">
                  <label htmlFor="destinationPort" className="form-label form-label-required">Target Discharging Port & Country</label>
                  <input 
                    ref={portInputRef}
                    id="destinationPort"
                    name="destinationPort"
                    type="text" 
                    className={`form-input ${errors.destinationPort ? 'form-input-error' : ''}`} 
                    placeholder="e.g. Jebel Ali Port, UAE / Dammam, KSA / Felixstowe, UK"
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
                    <span id="destinationPort-hint" className="form-hint">Specifying the port enables accurate CIF landed costing.</span>
                  )}
                </div>

                {/* Quality / Specification Handling (P4-07) */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="qualitySpecs" className="form-label">Quality, Mesh, or Laboratory Testing Details</label>
                  <textarea 
                    id="qualitySpecs"
                    name="qualitySpecs"
                    className={`form-textarea ${errors.qualitySpecs ? 'form-input-error' : ''}`}
                    placeholder="Specify mesh sieve distribution, target cup liquor character, maximum moisture limits, or specific regulatory testing (e.g., GSO 978 pesticide limits)..."
                    value={formData.qualitySpecs}
                    onChange={(e) => handleFieldChange('qualitySpecs', e.target.value)}
                    rows={3}
                    aria-invalid={!!errors.qualitySpecs}
                    aria-describedby={errors.qualitySpecs ? 'qualitySpecs-error' : undefined}
                  />
                  {errors.qualitySpecs && (
                    <span id="qualitySpecs-error" className="form-error-msg" role="alert">
                      <AlertCircle size={14} />
                      <span>{errors.qualitySpecs}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Part 2: Commercial Contact Details (P4-08) */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary-green)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 'var(--space-4)' }}>
                  2. Commercial Contact Information
                </div>

                <div className="grid grid-cols-2" style={{ gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label htmlFor="companyName" className="form-label form-label-required">Company Legal Name</label>
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

                  <div className="form-group">
                    <label htmlFor="contactPerson" className="form-label form-label-required">Contact Person & Title</label>
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

                <div className="grid grid-cols-3" style={{ gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label htmlFor="businessEmail" className="form-label form-label-required">Corporate Email</label>
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

                  <div className="form-group">
                    <label htmlFor="phoneWhatsApp" className="form-label form-label-required">WhatsApp / Phone</label>
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

                  <div className="form-group">
                    <label htmlFor="country" className="form-label form-label-required">Buyer Country</label>
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
              </div>

              {/* Error State Banner & Recovery Actions (P4-10) */}
              {(formStatus === 'VALIDATION_ERROR' || formStatus === 'SUBMISSION_ERROR' || submissionError) && (
                <div 
                  className="form-banner-error"
                  role="alert"
                  style={{ marginBottom: 'var(--space-6)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <AlertCircle size={18} color="#991B1B" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 700, marginBottom: '2px' }}>
                        {formStatus === 'SUBMISSION_ERROR' ? 'Submission Temporarily Unavailable' : 'Please Review Required Fields'}
                      </div>
                      <div>
                        {submissionError || 'Some required commercial fields are missing or contain formatting errors. Please correct highlighted fields above.'}
                      </div>
                      {formStatus === 'SUBMISSION_ERROR' && (
                        <div style={{ marginTop: '8px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <button
                            type="submit"
                            className="btn btn-secondary btn-sm"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <RefreshCw size={13} />
                            <span>Retry Submission</span>
                          </button>
                          <span style={{ fontSize: '0.8125rem', color: '#7F1D1D', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Mail size={13} />
                            <span>Alternative: Email inquiry to info@shivomglobal.com</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Action Footer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg btn-requirement-submit" 
                  disabled={formStatus === 'SUBMITTING'}
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700 }}
                >
                  {formStatus === 'SUBMITTING' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <RefreshCw size={18} className="animate-spin" style={{ flexShrink: 0 }} />
                      <span>Validating Requirement Parameters...</span>
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span>Submit Requirement for Commercial Evaluation</span>
                      <Send size={18} style={{ flexShrink: 0 }} />
                    </span>
                  )}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', flexWrap: 'wrap', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FileCheck2 size={13} color="var(--color-primary-green)" style={{ flexShrink: 0 }} />
                    <span>Direct Commercial Desk Review</span>
                  </div>
                  <div>•</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={13} color="var(--color-primary-green)" style={{ flexShrink: 0 }} />
                    <span>Confidential B2B Trade Inquiries Only</span>
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
