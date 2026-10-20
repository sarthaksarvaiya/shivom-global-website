import React, { useState } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { HeroSection } from '@/components/home/HeroSection';
import { RequirementRouter } from '@/components/home/RequirementRouter';
import { TeaCatalog } from '@/components/home/TeaCatalog';
import { GradeMatrix } from '@/components/home/GradeMatrix';
import { ExportProcessFlow } from '@/components/home/ExportProcessFlow';
import { WhyShivomGlobal } from '@/components/home/WhyShivomGlobal';
import { PrivateLabelSection } from '@/components/home/PrivateLabelSection';
import { BuyerRequirementForm } from '@/components/home/BuyerRequirementForm';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const HomePage: React.FC = () => {
  const [formRequirementType, setFormRequirementType] = useState<string>('Bulk Tea for Repacking');
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

  const handleSelectRequirement = (type: string, grade?: string) => {
    setFormRequirementType(type);
    if (grade) {
      setFormGrade(grade);
    }
    scrollToForm();
  };

  const handleSelectCategory = (categoryName: string) => {
    setFormRequirementType(categoryName);
    scrollToForm();
  };

  const handleSelectGrade = (gradeCode: string) => {
    setFormGrade(gradeCode);
    scrollToForm();
  };

  const handleStartPrivateLabel = () => {
    setFormRequirementType('Private Label Retail Product');
    scrollToForm();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
      {/* P3-01: Site Header */}
      <SiteHeader />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }}>
        {/* P3-02: Hero Section */}
        <HeroSection 
          onSubmitRequirement={scrollToForm}
          onExploreGrades={scrollToGrades}
        />

        {/* P3-03: Requirement Router */}
        <RequirementRouter 
          onSelectRequirement={handleSelectRequirement}
        />

        {/* P3-04: Tea Catalog */}
        <TeaCatalog 
          onSelectCategory={handleSelectCategory}
        />

        {/* P3-05: Grade Matrix */}
        <GradeMatrix 
          onSelectGrade={handleSelectGrade}
        />

        {/* P3-06: Export Process Flow */}
        <ExportProcessFlow />

        {/* P3-07: Why Buyers Work With Us */}
        <WhyShivomGlobal />

        {/* P3-08: Private Label & Co-Packing */}
        <PrivateLabelSection 
          onStartPrivateLabel={handleStartPrivateLabel}
        />

        {/* P3-09: Buyer Requirement Form */}
        <BuyerRequirementForm 
          initialRequirementType={formRequirementType}
          initialGrade={formGrade}
        />
      </main>

      {/* P3-10: Site Footer */}
      <SiteFooter />
    </div>
  );
};
