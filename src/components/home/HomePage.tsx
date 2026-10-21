import React, { useState } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { HeroSection } from '@/components/home/HeroSection';
import { TeaCategoriesSection } from '@/components/home/TeaCategoriesSection';
import { GradeSpecificationTable } from '@/components/home/GradeSpecificationTable';
import { PrivateLabelSection } from '@/components/home/PrivateLabelSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { WhyShivomGlobal } from '@/components/home/WhyShivomGlobal';
import { BuyerRequirementForm } from '@/components/home/BuyerRequirementForm';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

export const HomePage: React.FC = () => {
  const [formRequirementType, setFormRequirementType] = useState<string>('Assam CTC');
  const [formGrade, setFormGrade] = useState<string>('BOP');

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

  const handleSelectCategory = (categoryName: string) => {
    setFormRequirementType(categoryName);
    scrollToForm();
  };

  const handleSelectGrade = (gradeCode: string) => {
    setFormGrade(gradeCode);
    if (gradeCode === 'TGFOP' || gradeCode === 'FBOP') {
      setFormRequirementType('Orthodox');
    } else if (gradeCode === 'Custom Specification') {
      setFormRequirementType('Custom Specification');
    } else {
      setFormRequirementType('Assam CTC');
    }
    scrollToForm();
  };

  const handleStartPrivateLabel = () => {
    setFormRequirementType('Private Label Retail Product');
    scrollToForm();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
      {/* Site Header */}
      <SiteHeader />

      {/* Main 7 Core Sections in Exact Order */}
      <main style={{ flexGrow: 1 }}>
        {/* Section 1: Top / Hero Section */}
        <HeroSection 
          onSubmitRequirement={scrollToForm}
        />

        {/* Section 2: Teas (Categories) */}
        <TeaCategoriesSection 
          onSelectCategory={handleSelectCategory}
          onExploreGrades={scrollToGrades}
        />

        {/* Section 3: One Authoritative Tea Grade / Specification Table */}
        <GradeSpecificationTable 
          onSelectGrade={handleSelectGrade}
          selectedGrade={formGrade}
        />

        {/* Section 4: Private Label & Custom Packaging */}
        <PrivateLabelSection 
          onStartPrivateLabel={handleStartPrivateLabel}
        />

        {/* Section 5: How It Works (Simple 4-Step Process) */}
        <HowItWorksSection 
          onSubmitRequirement={scrollToForm}
        />

        {/* Section 6: Why SHIVOM GLOBAL (6 Focused Buyer Benefits) */}
        <WhyShivomGlobal 
          onSubmitRequirement={scrollToForm}
        />

        {/* Section 7: Contact (Direct Channels + Structured Requirement Form) */}
        <BuyerRequirementForm 
          initialRequirementType={formRequirementType}
          initialGrade={formGrade}
        />
      </main>

      {/* Site Footer */}
      <SiteFooter />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />
    </div>
  );
};
