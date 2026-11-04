export type SourcingTerritory = 
  | 'Assam Terroirs (Brahmaputra Valley / Upper Assam)'
  | 'Darjeeling Himalayan Terroirs'
  | 'High-Elevation Indian Terroirs'
  | 'Pan-India Sourcing by Specification';

export type TeaManufacturingCategory = 
  | 'Assam CTC'
  | 'Assam Orthodox'
  | 'Darjeeling Single-Origin'
  | 'Indian Green Tea';

export type SpecificationStatus = 
  | 'provisional'          // Standard industry reference; verified against target lot
  | 'supplier-confirmed'    // Confirmed against active auction/garden offerings
  | 'verified';            // Laboratory-tested / counter-sample cupped

export interface CommercialGradeSpecification {
  code: string;
  name: string;
  category: TeaManufacturingCategory;
  categorySlug: 'ctc' | 'orthodox' | 'darjeeling' | 'green';
  sourcingTerritory: SourcingTerritory;
  cutClassification: string;       // Standard industrial cut style
  sieveMeshNote: string;            // Commercial sieve guidance
  specificationStatus: SpecificationStatus;
  appearanceStyle: string;
  typicalApplication: string;
  isKarakSuitable?: boolean;
  isTeaBagSuitable?: boolean;
  complianceNote?: string;          // E.g. 'Tea Board of India GI Traceability upon lot allocation'
  marketTags: string[];
  representativeImageWebp: string; // Authentic category-level representative visual
  representativeImageJpg: string;
}

export interface TeaCategoryExplorerItem {
  id: 'ctc' | 'orthodox' | 'darjeeling' | 'green';
  name: string;
  badge: string;
  terroir: string;
  gradeCount: number;
  headline: string;
  description: string;
  imageWebp: string;
  imageJpg: string;
  liquorColorToken: string;
  keyApplications: string[];
}
