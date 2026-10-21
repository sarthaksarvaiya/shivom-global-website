/**
 * SHIVOM GLOBAL — Buyer Requirement Validation & Sanitization Engine
 * Phase: SG-WEBSITE-PHASE-04
 */

import { BuyerRequirementFormData, FieldValidationErrors, BuyerRequirementRecord } from '../types/buyerRequirement';

/**
 * Standard RFC 5322 compliant email regex for corporate email validation
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * International telephone format validator
 * Allows optional leading +, digits, spaces, hyphens, and parenthesis.
 * Must contain between 7 and 18 actual digits.
 */
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{5,20}$/;

/**
 * Sanitize and trim string input
 */
export const sanitizeInput = (val: string): string => {
  return val.trim();
};

/**
 * Validate all fields of BuyerRequirementFormData
 * Returns a dictionary of errors. If valid, errors object is empty.
 */
export const validateRequirementForm = (data: BuyerRequirementFormData): FieldValidationErrors => {
  const errors: FieldValidationErrors = {};

  // 1. Requirement Type
  if (!sanitizeInput(data.requirementType)) {
    errors.requirementType = 'Please select a requirement type.';
  }

  // 2. Preferred Grade / Cut
  if (!sanitizeInput(data.grade)) {
    errors.grade = 'Please select a preferred grade or specification.';
  }

  // 3. Volume Scope
  if (!sanitizeInput(data.volume)) {
    errors.volume = 'Please specify your estimated volume scope.';
  }

  // 4. Packaging Preference
  if (!sanitizeInput(data.packaging)) {
    errors.packaging = 'Please select your packaging preference.';
  }

  // 5. Target Discharging Port & Country
  const cleanPort = sanitizeInput(data.destinationPort);
  if (!cleanPort) {
    errors.destinationPort = 'Discharging port and country are required for CIF costing.';
  } else if (cleanPort.length < 3) {
    errors.destinationPort = 'Please provide a valid destination port name (min 3 characters).';
  } else if (cleanPort.length > 120) {
    errors.destinationPort = 'Port description cannot exceed 120 characters.';
  }

  // 6. Quality Details (Optional, but length bounded)
  const cleanQuality = sanitizeInput(data.qualitySpecs);
  if (cleanQuality.length > 2000) {
    errors.qualitySpecs = 'Quality specifications cannot exceed 2,000 characters.';
  }

  // 7. Company Legal Name
  const cleanCompany = sanitizeInput(data.companyName);
  if (!cleanCompany) {
    errors.companyName = 'Company legal name is required for commercial qualification.';
  } else if (cleanCompany.length < 2) {
    errors.companyName = 'Company name must be at least 2 characters.';
  } else if (cleanCompany.length > 120) {
    errors.companyName = 'Company name cannot exceed 120 characters.';
  }

  // 8. Contact Person & Title
  const cleanContact = sanitizeInput(data.contactPerson);
  if (!cleanContact) {
    errors.contactPerson = 'Contact person and professional title are required.';
  } else if (cleanContact.length < 2) {
    errors.contactPerson = 'Contact name must be at least 2 characters.';
  } else if (cleanContact.length > 100) {
    errors.contactPerson = 'Contact name cannot exceed 100 characters.';
  }

  // 9. Corporate Email
  const cleanEmail = sanitizeInput(data.businessEmail);
  if (!cleanEmail) {
    errors.businessEmail = 'Corporate business email is required.';
  } else if (!EMAIL_REGEX.test(cleanEmail)) {
    errors.businessEmail = 'Please enter a valid corporate email address (e.g. procurement@company.com).';
  }

  // 10. WhatsApp / Telephone
  const cleanPhone = sanitizeInput(data.phoneWhatsApp);
  const digitsOnly = cleanPhone.replace(/\D/g, '');
  if (!cleanPhone) {
    errors.phoneWhatsApp = 'WhatsApp or phone number with country code is required.';
  } else if (digitsOnly.length < 7 || digitsOnly.length > 18 || !PHONE_PATTERN.test(cleanPhone)) {
    errors.phoneWhatsApp = 'Please enter a valid international phone format (e.g. +971 50 123 4567).';
  }

  // 11. Buyer Country
  const cleanCountry = sanitizeInput(data.country);
  if (!cleanCountry) {
    errors.country = 'Please enter your company registration country.';
  } else if (cleanCountry.length < 2) {
    errors.country = 'Country name must be at least 2 characters.';
  } else if (cleanCountry.length > 80) {
    errors.country = 'Country name cannot exceed 80 characters.';
  }

  return errors;
};

/**
 * Generate a cryptographically structured reference identifier
 * Format: SG-REQ-YYYYMMDD-XXXX
 */
export const generateRequirementReference = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `SG-REQ-${year}${month}${day}-${rand}`;
};

/**
 * Build a sanitized commercial requirement record
 */
export const buildRequirementRecord = (data: BuyerRequirementFormData): BuyerRequirementRecord => {
  const specsParts: string[] = [];
  if (data.buyerRole && data.buyerRole.trim()) {
    specsParts.push(`Buyer Role: ${data.buyerRole.trim()}`);
  }
  if (data.targetPrice && data.targetPrice.trim()) {
    specsParts.push(`Target Price / Commercial Term: ${data.targetPrice.trim()}`);
  }
  if (data.qualitySpecs && data.qualitySpecs.trim()) {
    specsParts.push(`Technical Specs: ${data.qualitySpecs.trim()}`);
  }
  if (data.additionalMessage && data.additionalMessage.trim()) {
    specsParts.push(`Additional Message: ${data.additionalMessage.trim()}`);
  }
  const assembledQualitySpecs = specsParts.length > 0 ? specsParts.join('\n\n') : sanitizeInput(data.qualitySpecs || '');

  return {
    requirementType: sanitizeInput(data.requirementType),
    grade: sanitizeInput(data.grade),
    volume: sanitizeInput(data.volume),
    packaging: sanitizeInput(data.packaging),
    destinationPort: sanitizeInput(data.destinationPort),
    qualitySpecs: assembledQualitySpecs.slice(0, 2000),
    companyName: sanitizeInput(data.companyName),
    contactPerson: sanitizeInput(data.contactPerson),
    businessEmail: sanitizeInput(data.businessEmail),
    phoneWhatsApp: sanitizeInput(data.phoneWhatsApp),
    country: sanitizeInput(data.country),
    buyerRole: data.buyerRole ? sanitizeInput(data.buyerRole) : undefined,
    targetPrice: data.targetPrice ? sanitizeInput(data.targetPrice) : undefined,
    additionalMessage: data.additionalMessage ? sanitizeInput(data.additionalMessage) : undefined,
    referenceId: generateRequirementReference(),
    submittedAt: new Date().toISOString(),
    schemaVersion: '1.0.0',
  };
};
