import React, { useState } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { HeroSection } from '@/components/home/HeroSection';
import { TeaCategoriesSection } from '@/components/home/TeaCategoriesSection';
import { GradeMatrix } from '@/components/home/GradeMatrix';
import { ExportProcessFlow } from '@/components/home/ExportProcessFlow';
import { WhyShivomGlobal } from '@/components/home/WhyShivomGlobal';
import { PrivateLabelSection } from '@/components/home/PrivateLabelSection';
import { BuyerRequirementForm } from '@/components/home/BuyerRequirementForm';
import { SiteFooter } from '@/components/layout/SiteFooter';

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

  const scrollToCategories = () => {
    const categoriesElement = document.getElementById('our-teas');
    if (categoriesElement) {
      const headerOffset = 80;
      const elementPosition = categoriesElement.getBoundingClientRect().top;
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

  const handleSelectCategory = (categoryName: string, defaultGrade?: string) => {
    setFormRequirementType(categoryName);
    if (defaultGrade) {
      setFormGrade(defaultGrade);
    }
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
      {/* Site Header */}
      <SiteHeader />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }}>
        {/* Section 1: Hero Section */}
        <HeroSection 
          onSubmitRequirement={scrollToForm}
          onExploreCategories={scrollToCategories}
          onExploreGrades={scrollToGrades}
        />

        {/* Section 2: What We Supply — Tea Categories Overview */}
        <TeaCategoriesSection 
          onSelectCategory={handleSelectCategory}
          onSubmitRequirement={scrollToForm}
          onExploreGrades={scrollToGrades}
        />

        {/* Section 8: Interactive Grade Matrix */}
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
