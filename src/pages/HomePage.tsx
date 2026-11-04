import React, { useState } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { HeroSection } from '@/features/hero/components/HeroSection';
import { TeaCategoriesSection } from '@/features/tea-catalog/components/TeaCategoriesSection';
import { GradeSpecificationTable } from '@/features/tea-catalog/components/GradeSpecificationTable';
import { PrivateLabelSection } from '@/features/private-label/components/PrivateLabelSection';
import { HowItWorksSection } from '@/features/export-process/components/HowItWorksSection';
import { WhyShivomGlobal } from '@/features/company/components/WhyShivomGlobal';
import { BuyerRequirementForm } from '@/features/buyer-requirement/components/BuyerRequirementForm';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

export const HomePage: React.FC = () => {
  const [formRequirementType, setFormRequirementType] = useState<string>('');
  const [formGrade, setFormGrade] = useState<string>('');
  const [formIntent, setFormIntent] = useState<'sample' | 'quote' | 'packing'>('sample');

  const scrollToForm = () => {
    const formElement = document.getElementById('requirement-form');
    if (formElement) {
      const headerOffset = 80;
      const elementPosition = formElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToGrades = () => {
    const gradesElement = document.getElementById('tea-by-grade');
    if (gradesElement) {
      const headerOffset = 80;
      const elementPosition = gradesElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleRequestSamples = () => {
    setFormIntent('sample');
    scrollToForm();
  };

  const handleSubmitRequirement = () => {
    setFormIntent('quote');
    scrollToForm();
  };

  const handleSelectCategory = (categoryName: string, gradeCode?: string) => {
    setFormRequirementType(categoryName);
    if (gradeCode) {
      setFormGrade(gradeCode);
    }
    setFormIntent('sample');
    scrollToForm();
  };

  const handleSelectGrade = (gradeCode: string) => {
    setFormGrade(gradeCode);
    if (gradeCode.includes(' · ')) {
      // Multi-grade buyer sample shortlist selection
      setFormRequirementType('Commercial Blended Formulation');
      setFormIntent('sample');
    } else if (gradeCode.startsWith('FTGFOP1 (FF)') || gradeCode.startsWith('TGFOP1 (SF)')) {
      setFormRequirementType('Darjeeling Specialty Black Tea');
      setFormIntent('quote');
    } else if (gradeCode.startsWith('Green')) {
      setFormRequirementType('Indian Green Tea');
      setFormIntent('quote');
    } else if (
      gradeCode === 'FTGFOP1' || 
      gradeCode === 'TGFOP' || 
      gradeCode === 'FBOP' || 
      gradeCode === 'BOP (Orth)'
    ) {
      setFormRequirementType('Assam Orthodox Black Tea');
      setFormIntent('quote');
    } else if (gradeCode === 'Custom Specification') {
      setFormRequirementType('Other / Custom Specification');
      setFormIntent('quote');
    } else {
      setFormRequirementType('Assam CTC Black Tea');
      setFormIntent('quote');
    }
    scrollToForm();
  };

  const handleStartPrivateLabel = () => {
    // Retain existing tea category if already selected; do not invent a tea category from packaging intent
    setFormIntent('packing');
    scrollToForm();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
      {/* Site Header */}
      <SiteHeader onRequestSamples={handleRequestSamples} />

      {/* Main 8 Core Sections in Exact Order */}
      <main style={{ flexGrow: 1 }}>
        {/* Section 1: Hero / Top Section */}
        <HeroSection 
          onRequestSamples={handleRequestSamples}
          onSubmitRequirement={handleSubmitRequirement}
        />

        {/* Section 2: Tea Range */}
        <TeaCategoriesSection 
          onSelectCategory={handleSelectCategory}
          onExploreGrades={scrollToGrades}
        />

        {/* Section 3: One Tea Grade / Specification Table */}
        <GradeSpecificationTable 
          onSelectGrade={handleSelectGrade}
          selectedGrade={formGrade}
        />

        {/* Section 4: Private Label / Custom Packing */}
        <PrivateLabelSection 
          onStartPrivateLabel={handleStartPrivateLabel}
        />

        {/* Section 5: How It Works (Simple 4-Step Flow) */}
        <HowItWorksSection 
          onRequestSamples={handleRequestSamples}
          onSubmitRequirement={handleSubmitRequirement}
        />

        {/* Section 6: Why SHIVOM GLOBAL (Practical Reasons + Buyer Basics) */}
        <WhyShivomGlobal 
          onRequestSamples={handleRequestSamples}
          onSubmitRequirement={handleSubmitRequirement}
        />

        {/* Section 7: Buyer Requirements / Contact (Tell Us What Tea You Need) */}
        <BuyerRequirementForm 
          initialRequirementType={formRequirementType}
          initialGrade={formGrade}
          initialIntent={formIntent}
        />
      </main>

      {/* Site Footer */}
      <SiteFooter />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default HomePage;
