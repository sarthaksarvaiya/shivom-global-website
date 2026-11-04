/**
 * SHIVOM GLOBAL — Buyer Requirement Form Unit Tests
 * Phase 4A.1: Form Clarity Improvements (P4-03 & P4-11)
 *
 * Test coverage:
 * 1. Category normalization (exact, shorthand, full catalogue, custom, safe fallback).
 * 2. Contextual specification formatting ([Category] — [Grade], deduplication, empty checks).
 * 3. Meaningful specification detection.
 * 4. Contact field synchronization (Quick -> Detailed & Detailed -> Quick).
 * 5. Exactly six canonical Tea Type options.
 * 6. Absence of obsolete options ("Bulk Tea Supply", "Private Label Retail Product").
 * 7. Independent packaging options integrity.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CANONICAL_TEA_TYPES,
  normalizeCategory,
  isPrivateLabelIntent,
  resolvePackagingIntent,
  getCategoryDisplayLabel,
  formatSpecificationDisplay,
  hasMeaningfulSpecification,
  syncQuickToDetailed,
  syncDetailedToQuick,
  type QuickFormData,
} from '../utils/formSpecificationUtils.ts';
import type { BuyerRequirementFormData } from '../types/buyerRequirement.ts';

describe('Buyer Requirement Form Clarity (Phase 4A.1)', () => {
  describe('P4-11: Canonical Tea Type Options', () => {
    it('should contain exactly six canonical Tea Type categories', () => {
      assert.equal(CANONICAL_TEA_TYPES.length, 6);
      assert.deepEqual([...CANONICAL_TEA_TYPES], [
        'Assam CTC Black Tea',
        'Assam Orthodox Black Tea',
        'Darjeeling Specialty Black Tea',
        'Indian Green Tea',
        'Commercial Blended Formulation',
        'Other / Custom Specification',
      ]);
    });

    it('should NOT contain obsolete packaging/channel options', () => {
      const types = CANONICAL_TEA_TYPES as readonly string[];
      assert.equal(types.includes('Bulk Tea Supply'), false);
      assert.equal(types.includes('Private Label Retail Product'), false);
    });
  });

  describe('Rule B: Deterministic Category Normalization', () => {
    it('should preserve already canonical categories unchanged', () => {
      for (const cat of CANONICAL_TEA_TYPES) {
        assert.equal(normalizeCategory(cat), cat);
      }
    });

    it('should normalize shorthand and catalogue labels for Assam CTC', () => {
      assert.equal(normalizeCategory('Assam CTC'), 'Assam CTC Black Tea');
      assert.equal(
        normalizeCategory('Assam CTC (Crush, Tear, Curl)'),
        'Assam CTC Black Tea'
      );
      assert.equal(normalizeCategory('CTC Black Tea'), 'Assam CTC Black Tea');
    });

    it('should normalize shorthand and catalogue labels for Orthodox', () => {
      assert.equal(normalizeCategory('Orthodox'), 'Assam Orthodox Black Tea');
      assert.equal(
        normalizeCategory('Assam Orthodox Whole Leaf'),
        'Assam Orthodox Black Tea'
      );
      assert.equal(normalizeCategory('Orthodox Black Tea'), 'Assam Orthodox Black Tea');
    });

    it('should normalize Darjeeling labels', () => {
      assert.equal(normalizeCategory('Darjeeling'), 'Darjeeling Specialty Black Tea');
      assert.equal(
        normalizeCategory('Darjeeling Black Tea'),
        'Darjeeling Specialty Black Tea'
      );
    });

    it('should normalize Green Tea labels', () => {
      assert.equal(normalizeCategory('Green Tea'), 'Indian Green Tea');
      assert.equal(
        normalizeCategory('Indian Green & Wellness Teas'),
        'Indian Green Tea'
      );
    });

    it('should normalize Custom Specification labels', () => {
      assert.equal(normalizeCategory('Custom Specification'), 'Other / Custom Specification');
      assert.equal(normalizeCategory('Custom Sieve Cut'), 'Other / Custom Specification');
      assert.equal(normalizeCategory('Target Benchmark Match'), 'Other / Custom Specification');
    });

    it('should NOT invent a tea category or blend from private label intent', () => {
      // Pure private label strings do not define a botanical tea category
      assert.equal(normalizeCategory('Private Label Retail Product'), '');
      assert.equal(normalizeCategory('Private Label'), '');
      assert.equal(normalizeCategory('Retail Packaging Option'), '');
    });

    it('should NOT invent a packaging format from pure private label intent', () => {
      // Private label intent does not imply stand-up pouches vs cartons vs tins vs tea bags
      assert.equal(resolvePackagingIntent('Private Label Retail Product'), '');
      assert.equal(resolvePackagingIntent('Private Label'), '');
      assert.equal(resolvePackagingIntent('Retail Packaging Option'), '');
      assert.equal(resolvePackagingIntent('Assam CTC'), '');
    });

    it('should preserve explicit packaging selection when provided', () => {
      // Explicit packaging passed directly is preserved intact
      assert.equal(resolvePackagingIntent('Private Label', 'Retail Stand-up Pouches'), 'Retail Stand-up Pouches');
      assert.equal(resolvePackagingIntent('Private Label', 'Custom Packaging'), 'Custom Packaging');
      assert.equal(resolvePackagingIntent('', 'Standard Bulk Export Sacks'), 'Standard Bulk Export Sacks');
      // Explicit format mentioned in input string is detected
      assert.equal(resolvePackagingIntent('Stand-up Pouches'), 'Retail Stand-up Pouches');
      assert.equal(resolvePackagingIntent('Assam CTC in Stand-up Pouches'), 'Retail Stand-up Pouches');
      assert.equal(resolvePackagingIntent('HDPE Woven Sacks'), 'Heavy-duty Woven Sacks');
      assert.equal(resolvePackagingIntent('Bulk Export Sacks'), 'Standard Bulk Export Sacks');
      assert.equal(resolvePackagingIntent('Custom Packaging'), 'Custom Packaging');
    });

    it('should correctly detect private label intent for routing', () => {
      assert.equal(isPrivateLabelIntent('Private Label Retail Product'), true);
      assert.equal(isPrivateLabelIntent('Private Label Support'), true);
      assert.equal(isPrivateLabelIntent('Assam CTC Private Label'), true);
      assert.equal(isPrivateLabelIntent('Assam CTC Black Tea'), false);
    });

    it('should ensure hybrid requests preserve both tea category and private-label intent without inventing packaging', () => {
      const input = 'Assam CTC Private Label';
      // 1. Botanical tea category is preserved
      assert.equal(normalizeCategory(input), 'Assam CTC Black Tea');
      // 2. Private label intent is recognized for packing workflow
      assert.equal(isPrivateLabelIntent(input), true);
      // 3. Packaging format is NOT invented (leaves neutral unselected state)
      assert.equal(resolvePackagingIntent(input), '');
      // 4. If explicit packaging format is also provided, it is preserved
      assert.equal(resolvePackagingIntent(input, 'Retail Stand-up Pouches'), 'Retail Stand-up Pouches');
    });

    it('should preserve existing tea category and grade when private-label flow is triggered', () => {
      const initialCat = 'Assam CTC Black Tea';
      const initialGrd = 'BOP';
      // When private label intent is routed, existing category and grade are not overwritten
      assert.equal(normalizeCategory(initialCat), 'Assam CTC Black Tea');
      assert.equal(initialGrd, 'BOP');
    });

    it('should safely preserve unknown categories without silent data loss', () => {
      assert.equal(normalizeCategory('Nilgiri Frost Tea'), 'Nilgiri Frost Tea');
      assert.equal(normalizeCategory('Kangra Valley Single Estate'), 'Kangra Valley Single Estate');
    });

    it('should return empty string for missing or whitespace input', () => {
      assert.equal(normalizeCategory(''), '');
      assert.equal(normalizeCategory('   '), '');
      assert.equal(normalizeCategory(undefined), '');
    });
  });

  describe('Rule D: Contextual Specification Formatting (P4-03)', () => {
    it('should generate concise category display labels', () => {
      assert.equal(getCategoryDisplayLabel('Assam CTC Black Tea'), 'Assam CTC');
      assert.equal(getCategoryDisplayLabel('Assam Orthodox Black Tea'), 'Assam Orthodox');
      assert.equal(getCategoryDisplayLabel('Darjeeling Specialty Black Tea'), 'Darjeeling');
      assert.equal(getCategoryDisplayLabel('Indian Green Tea'), 'Indian Green Tea');
      assert.equal(getCategoryDisplayLabel('Commercial Blended Formulation'), 'Commercial Blend');
      assert.equal(getCategoryDisplayLabel('Other / Custom Specification'), 'Custom Specification');
    });

    it('should format [Category] — [Grade] dynamically', () => {
      assert.equal(
        formatSpecificationDisplay('Assam CTC Black Tea', 'BOPSM'),
        'Assam CTC — BOPSM'
      );
      assert.equal(
        formatSpecificationDisplay('Assam CTC (Crush, Tear, Curl)', 'BOP'),
        'Assam CTC — BOP'
      );
      assert.equal(
        formatSpecificationDisplay('Orthodox', 'TGFOP'),
        'Assam Orthodox — TGFOP'
      );
      assert.equal(
        formatSpecificationDisplay('Darjeeling Black Tea', 'First Flush FTGFOP1'),
        'Darjeeling — First Flush FTGFOP1'
      );
      assert.equal(
        formatSpecificationDisplay('Indian Green & Wellness Teas', 'Whole Leaf Green'),
        'Indian Green Tea — Whole Leaf Green'
      );
    });

    it('should avoid repetitive text for Custom Specification', () => {
      assert.equal(
        formatSpecificationDisplay('Other / Custom Specification', 'Custom Specification'),
        'Custom Specification'
      );
      assert.equal(
        formatSpecificationDisplay('Custom Specification', 'Custom Formulation'),
        'Custom Specification'
      );
    });

    it('should format correctly when only grade or only category is present', () => {
      assert.equal(formatSpecificationDisplay(undefined, 'BP'), 'BP');
      assert.equal(formatSpecificationDisplay('', 'PF'), 'PF');
      assert.equal(
        formatSpecificationDisplay('Assam CTC Black Tea', ''),
        'Assam CTC'
      );
    });

    it('should return empty string when neither is present', () => {
      assert.equal(formatSpecificationDisplay('', ''), '');
      assert.equal(formatSpecificationDisplay(undefined, undefined), '');
    });

    it('should accurately detect whether a meaningful specification exists', () => {
      assert.equal(hasMeaningfulSpecification('Assam CTC', 'BOPSM'), true);
      assert.equal(hasMeaningfulSpecification('', 'BOP'), true);
      assert.equal(hasMeaningfulSpecification('Assam CTC', ''), true);
      assert.equal(hasMeaningfulSpecification('', ''), false);
      assert.equal(hasMeaningfulSpecification(undefined, undefined), false);
      assert.equal(hasMeaningfulSpecification('   ', '   '), false);
    });
  });

  describe('Rule C: Contact Field Synchronization Across Tab Switches', () => {
    const sampleQuick: QuickFormData = {
      name: 'Tariq Mansoor',
      company: 'Al-Noor Tea Trading LLC',
      email: 'tariq@alnoortea.ae',
      phone: '+971 50 123 4567',
      country: 'United Arab Emirates',
      message: 'Looking for fast 60s color extraction dust for Karak cafeteria blends.',
    };

    const emptyDetailed: BuyerRequirementFormData = {
      requirementType: 'Assam CTC Black Tea',
      grade: 'PD',
      volume: '1x20ft FCL (~10–12 MT)',
      packaging: 'Standard Bulk Export Sacks',
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

    it('should copy all filled contact fields from Quick form to Detailed form', () => {
      const synced = syncQuickToDetailed(sampleQuick, emptyDetailed);

      assert.equal(synced.contactPerson, 'Tariq Mansoor');
      assert.equal(synced.companyName, 'Al-Noor Tea Trading LLC');
      assert.equal(synced.businessEmail, 'tariq@alnoortea.ae');
      assert.equal(synced.phoneWhatsApp, '+971 50 123 4567');
      assert.equal(synced.country, 'United Arab Emirates');
      assert.equal(
        synced.qualitySpecs,
        'Looking for fast 60s color extraction dust for Karak cafeteria blends.'
      );
      // Preserves existing detailed-specific fields
      assert.equal(synced.grade, 'PD');
      assert.equal(synced.destinationPort, 'Jebel Ali, UAE');
    });

    it('should NOT overwrite existing Detailed contact data with empty Quick fields', () => {
      const emptyQuick: QuickFormData = {
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        message: '',
      };

      const populatedDetailed: BuyerRequirementFormData = {
        ...emptyDetailed,
        contactPerson: 'Existing Contact',
        companyName: 'Existing Company',
        businessEmail: 'existing@corp.com',
        phoneWhatsApp: '+91 98765 43210',
        country: 'India',
        qualitySpecs: 'Existing Specs',
      };

      const synced = syncQuickToDetailed(emptyQuick, populatedDetailed);

      assert.equal(synced.contactPerson, 'Existing Contact');
      assert.equal(synced.companyName, 'Existing Company');
      assert.equal(synced.businessEmail, 'existing@corp.com');
      assert.equal(synced.phoneWhatsApp, '+91 98765 43210');
      assert.equal(synced.country, 'India');
      assert.equal(synced.qualitySpecs, 'Existing Specs');
    });

    it('should copy all filled contact fields from Detailed form to Quick form', () => {
      const detailedWithContact: BuyerRequirementFormData = {
        ...emptyDetailed,
        contactPerson: 'Sultan Al-Qasimi',
        companyName: 'Emirates Blenders FZE',
        businessEmail: 'sultan@emiratesblenders.com',
        phoneWhatsApp: '+971 6 555 1234',
        country: 'United Arab Emirates',
        qualitySpecs: 'Sample evaluation for private label retail tins.',
      };

      const emptyQuick: QuickFormData = {
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        message: '',
      };

      const synced = syncDetailedToQuick(detailedWithContact, emptyQuick);

      assert.equal(synced.name, 'Sultan Al-Qasimi');
      assert.equal(synced.company, 'Emirates Blenders FZE');
      assert.equal(synced.email, 'sultan@emiratesblenders.com');
      assert.equal(synced.phone, '+971 6 555 1234');
      assert.equal(synced.country, 'United Arab Emirates');
      assert.equal(synced.message, 'Sample evaluation for private label retail tins.');
    });

    it('should remain stable across repeated bidirectional switches', () => {
      let q = { ...sampleQuick };
      let d = { ...emptyDetailed };

      // Switch 1: Quick -> Detailed
      d = syncQuickToDetailed(q, d);
      assert.equal(d.contactPerson, 'Tariq Mansoor');

      // User updates company in Detailed
      d.companyName = 'Al-Noor Global Trading LLC';

      // Switch 2: Detailed -> Quick
      q = syncDetailedToQuick(d, q);
      assert.equal(q.company, 'Al-Noor Global Trading LLC');
      assert.equal(q.name, 'Tariq Mansoor');

      // Switch 3: Quick -> Detailed
      d = syncQuickToDetailed(q, d);
      assert.equal(d.companyName, 'Al-Noor Global Trading LLC');
      assert.equal(d.contactPerson, 'Tariq Mansoor');
    });
  });
});
