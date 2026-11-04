/**
 * SHIVOM GLOBAL — Form Specification & Synchronization Utilities
 * Phase 4A.1: Form Clarity Improvements (P4-03 & P4-11)
 *
 * Provides deterministic category normalization, specification label formatting,
 * and bi-directional contact state preservation between Form A and Form B.
 */

import type { BuyerRequirementFormData } from '../types/buyerRequirement.ts';

/**
 * Exactly six approved canonical Tea Type categories (P4-11)
 * Replaces non-botanical options ("Bulk Tea Supply", "Private Label Retail Product").
 */
export const CANONICAL_TEA_TYPES = [
  'Assam CTC Black Tea',
  'Assam Orthodox Black Tea',
  'Darjeeling Specialty Black Tea',
  'Indian Green Tea',
  'Commercial Blended Formulation',
  'Other / Custom Specification',
] as const;

export type CanonicalTeaType = (typeof CANONICAL_TEA_TYPES)[number];

export interface QuickFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

/**
 * Detects whether an incoming raw string indicates private label / OEM retail packaging intent.
 * Used to route to the packaging inquiry flow without falsely classifying it as a botanical tea category.
 */
export function isPrivateLabelIntent(raw?: string): boolean {
  if (!raw || typeof raw !== 'string') return false;
  const lower = raw.toLowerCase();
  return lower.includes('private label') || lower.includes('retail product') || lower.includes('retail packaging');
}

/**
 * Resolves packaging preference without inventing unstated formats.
 * If an explicit packaging format is supplied, it is preserved.
 * Pure private-label intent does NOT force a specific format (such as stand-up pouches)
 * because private-label orders can involve pouches, tins, cartons, tea bags, or custom formats.
 * When no explicit packaging preference is provided, returns empty string ("")
 * leaving the packaging selection in its neutral unselected state.
 */
export function resolvePackagingIntent(raw?: string, explicitPackaging?: string): string {
  if (explicitPackaging && typeof explicitPackaging === 'string' && explicitPackaging.trim()) {
    return explicitPackaging.trim();
  }
  if (raw && typeof raw === 'string') {
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();
    // Check for explicit packaging keywords in the raw input
    if (lower.includes('stand-up pouch') || lower.includes('retail pouch') || lower.includes('pouches')) {
      return 'Retail Stand-up Pouches';
    }
    if (lower.includes('woven sack') || lower.includes('hdpe')) {
      return 'Heavy-duty Woven Sacks';
    }
    if (lower.includes('bulk export sack') || lower.includes('kraft sack') || lower.includes('paper sack') || lower.includes('standard bulk')) {
      return 'Standard Bulk Export Sacks';
    }
    if (lower.includes('custom packaging')) {
      return 'Custom Packaging';
    }
  }
  // No explicit packaging preference supplied — do not invent one
  return '';
}

/**
 * Deterministic normalization of incoming tea category names (Rule B)
 * Handles shorthand strings, full catalogue titles, and custom specifications.
 * Unknown strings are safely trimmed and preserved without silent data loss.
 *
 * NOTE: Private label intent is strictly separated from botanical tea categories.
 * Pure private label intent strings (e.g., "Private Label Retail Product") return ""
 * rather than inventing a tea category, while hybrid requests (e.g., "Assam CTC Private Label")
 * retain their proper botanical tea category ("Assam CTC Black Tea").
 */
export function normalizeCategory(raw?: string): string {
  if (!raw || typeof raw !== 'string') return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';

  // Canonical exact match
  if ((CANONICAL_TEA_TYPES as readonly string[]).includes(trimmed)) {
    return trimmed;
  }

  const lower = trimmed.toLowerCase();

  // Assam CTC variants (shorthand and full catalogue title)
  if (lower.includes('ctc') || lower.includes('crush, tear, curl')) {
    return 'Assam CTC Black Tea';
  }

  // Orthodox variants (shorthand and full catalogue title)
  if (lower.includes('orthodox')) {
    return 'Assam Orthodox Black Tea';
  }

  // Darjeeling variants
  if (lower.includes('darjeeling')) {
    return 'Darjeeling Specialty Black Tea';
  }

  // Green Tea variants (including green wellness)
  if (lower.includes('green')) {
    return 'Indian Green Tea';
  }

  // Commercial blend variants (genuine tea blends)
  if (lower.includes('blend') || lower.includes('formulation')) {
    return 'Commercial Blended Formulation';
  }

  // Custom / Sieve cut / benchmark matching variants
  if (lower.includes('custom') || lower.includes('sieve') || lower.includes('benchmark')) {
    return 'Other / Custom Specification';
  }

  // Pure private label intent strings do not define a tea category
  if (isPrivateLabelIntent(trimmed)) {
    return '';
  }

  // Safe fallback for unmapped strings: preserve the buyer's specification
  return trimmed;
}

/**
 * Concise display label for category in contextual badges
 */
export function getCategoryDisplayLabel(category: string): string {
  const norm = normalizeCategory(category);
  if (norm === 'Assam CTC Black Tea') return 'Assam CTC';
  if (norm === 'Assam Orthodox Black Tea') return 'Assam Orthodox';
  if (norm === 'Darjeeling Specialty Black Tea') return 'Darjeeling';
  if (norm === 'Indian Green Tea') return 'Indian Green Tea';
  if (norm === 'Commercial Blended Formulation') return 'Commercial Blend';
  if (norm === 'Other / Custom Specification') return 'Custom Specification';
  return category.trim();
}

/**
 * Format contextual specification display string: `[Category] — [Grade]` (Rule D)
 * Avoids repetitive phrases like "Custom Specification — Custom Specification".
 */
export function formatSpecificationDisplay(category?: string, grade?: string): string {
  const normCat = category ? normalizeCategory(category) : '';
  const cleanGrade = grade && grade.trim() && grade !== 'Open to Recommendation' ? grade.trim() : '';
  const catDisplay = normCat ? getCategoryDisplayLabel(normCat) : '';

  if (catDisplay && cleanGrade) {
    if (catDisplay === 'Custom Specification' && cleanGrade.toLowerCase().includes('custom')) {
      return 'Custom Specification';
    }
    return `${catDisplay} — ${cleanGrade}`;
  }

  if (cleanGrade) {
    return cleanGrade;
  }

  if (catDisplay) {
    return catDisplay;
  }

  return '';
}

/**
 * Determine whether a meaningful, specific tea specification exists (Rule D)
 * Returns false when specification is completely empty or unselected.
 */
export function hasMeaningfulSpecification(category?: string, grade?: string): boolean {
  const formatted = formatSpecificationDisplay(category, grade);
  return formatted.length > 0;
}

/**
 * Synchronize common contact fields from Quick form to Detailed form (Rule C)
 * Preserves populated target values; does not overwrite with empty strings.
 */
export function syncQuickToDetailed(
  quick: QuickFormData,
  detailed: BuyerRequirementFormData
): BuyerRequirementFormData {
  return {
    ...detailed,
    contactPerson: quick.name.trim() || detailed.contactPerson,
    companyName: quick.company.trim() || detailed.companyName,
    businessEmail: quick.email.trim() || detailed.businessEmail,
    phoneWhatsApp: quick.phone.trim() || detailed.phoneWhatsApp,
    country: quick.country.trim() || detailed.country,
    qualitySpecs: quick.message.trim() || detailed.qualitySpecs,
  };
}

/**
 * Synchronize common contact fields from Detailed form to Quick form (Rule C)
 * Preserves populated target values; does not overwrite with empty strings.
 */
export function syncDetailedToQuick(
  detailed: BuyerRequirementFormData,
  quick: QuickFormData
): QuickFormData {
  return {
    ...quick,
    name: detailed.contactPerson.trim() || quick.name,
    company: detailed.companyName.trim() || quick.company,
    email: detailed.businessEmail.trim() || quick.email,
    phone: detailed.phoneWhatsApp.trim() || quick.phone,
    country: detailed.country.trim() || quick.country,
    message: detailed.qualitySpecs.trim() || quick.message,
  };
}
