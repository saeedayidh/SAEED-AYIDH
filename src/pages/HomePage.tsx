import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ContentFieldsSection } from '../components/ContentFieldsSection';
import { WorkFieldsSection } from '../components/WorkFieldsSection';
import { ServicesSection } from '../components/ServicesSection';
import { NewsSection } from '../components/NewsSection';
import { ResourcesSection } from '../components/ResourcesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { HelpAndBlogSection } from '../components/HelpAndBlogSection';
import { ActionCardsSection } from '../components/ActionCardsSection';
import { FinalContactCta } from '../components/FinalContactCta';

export const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. مجالات صناعة المحتوى */}
      <ContentFieldsSection />

      {/* 3. مجالات العمل */}
      <WorkFieldsSection />

      {/* 4. خدمات سعيد */}
      <ServicesSection />

      {/* 5. أخبار سعيد */}
      <NewsSection />

      {/* 6. أدوات سعيد */}
      <ResourcesSection />

      {/* 7. أعمال سعيد */}
      <PortfolioSection />

      {/* 8. بطاقة فرص التعاون والشراكة (تواصل معنا - فوق سنترهلب وبلوق سعيد) */}
      <FinalContactCta />

      {/* 9. سعيد سنترهلب + بلوق سعيد */}
      <HelpAndBlogSection />

      {/* 10. بطاقة اقتراح + بطاقة شكاوي */}
      <ActionCardsSection />
    </div>
  );
};
