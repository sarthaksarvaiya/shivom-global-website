/**
 * SHIVOM GLOBAL — Buyer Requirement Types & Taxonomies
 */

export type RequirementCategory =
  | 'Bulk Tea for Repacking'
  | 'Assam CTC'
  | 'Orthodox'
  | 'Darjeeling'
  | 'Green Tea'
  | 'Private Label Retail Product'
  | 'Custom Specification';

export type TeaGradeOption =
  | 'BOP'
  | 'BOPSM'
  | 'BP'
  | 'PF'
  | 'PD'
  | 'Dust'
  | 'Open to Recommendation'
  | 'Custom';

export type VolumeTierOption =
  | 'Trial Batch (250 kg – 500 kg)'
  | 'Commercial LCL (1 – 5 MT)'
  | 'Full Container Load (1x20ft FCL ~10–12 MT)'
  | 'Multi-Container Contract (2+ FCL)';

export type PackagingOption =
  | '25kg Multi-wall Kraft Sack + PE Liner'
  | '50kg Woven PP Bag + Liner'
  | 'Retail Stand-up Pouches'
  | 'Custom Packaging';

export type FormStatus =
  | 'IDLE'
  | 'VALIDATING'
  | 'SUBMITTING'
  | 'SUCCESS'
  | 'VALIDATION_ERROR'
  | 'SUBMISSION_ERROR';

export interface BuyerRequirementFormData {
  requirementType: string;
  grade: string;
  volume: string;
  packaging: string;
  destinationPort: string;
  qualitySpecs: string;
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  phoneWhatsApp: string;
  country: string;
  buyerRole?: string;
  targetPrice?: string;
  additionalMessage?: string;
}

export interface BuyerRequirementRecord extends BuyerRequirementFormData {
  referenceId: string;
  submittedAt: string;
  schemaVersion: '1.0.0';
}

export type FieldValidationErrors = Partial<Record<keyof BuyerRequirementFormData, string>>;
