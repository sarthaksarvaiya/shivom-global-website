import React, { useState } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { HeroSection } from '@/components/home/HeroSection';
import { TeaCategoriesSection } from '@/components/home/TeaCategoriesSection';
import { AssamCtcSpotlight } from '@/components/home/AssamCtcSpotlight';
import { PrivateLabelSection } from '@/components/home/PrivateLabelSection';
import { WhoWeServeSection } from '@/components/home/WhoWeServeSection';
import { HowWeWorkSection } from '@/components/home/HowWeWorkSection';
import { GradeMatrix } from '@/components/home/GradeMatrix';
import { WhyShivomGlobal } from '@/components/home/WhyShivomGlobal';
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

  const scrollToAssamCtc = () => {
    const assamElement = document.getElementById('assam-ctc');
    if (assamElement) {
      const headerOffset = 80;
      const elementPosition = assamElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectCategory = (categoryName: string, defaultGrade?: string) => {
    if (categoryName.toLowerCase().includes('assam ctc')) {
      scrollToAssamCtc();
      return;
    }
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

        {/* Section 3: Assam CTC Spotlight */}
        <AssamCtcSpotlight 
          onSubmitRequirement={(grade) => {
            setFormRequirementType('Assam CTC');
            if (grade) setFormGrade(grade);
            scrollToForm();
          }}
          onViewAllCategories={scrollToCategories}
          onSelectGrade={(gradeCode) => {
            setFormRequirementType('Assam CTC');
            setFormGrade(gradeCode);
            scrollToForm();
          }}
        />

        {/* Section 4: Private Label & OEM Contract Packing Hub */}
        <PrivateLabelSection 
          onStartPrivateLabel={handleStartPrivateLabel}
          onExploreCategories={scrollToCategories}
        />

        {/* Section 5: Who We Serve — Commercial Buyer Segmentation */}
        <WhoWeServeSection 
          onSelectSegment={(preset) => {
            setFormRequirementType(preset);
            scrollToForm();
          }}
          onSubmitRequirement={scrollToForm}
        />

        {/* Section 6: How We Work — Commercial Sourcing & Export Journey */}
        <HowWeWorkSection 
          onSubmitRequirement={scrollToForm}
          onExploreCategories={scrollToCategories}
        />

        {/* Section 8: Interactive Grade Matrix */}
        <GradeMatrix 
          onSelectGrade={handleSelectGrade}
        />

        {/* P3-07: Why Buyers Work With Us */}
        <WhyShivomGlobal />

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
