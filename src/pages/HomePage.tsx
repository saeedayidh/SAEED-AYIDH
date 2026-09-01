import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ContentFieldsSection } from '../components/ContentFieldsSection';
import { WorkFieldsSection } from '../components/WorkFieldsSection';
import { ServicesSection } from '../components/ServicesSection';
import { NewsSection } from '../components/NewsSection';
import { HelpAndBlogSection } from '../components/HelpAndBlogSection';
import { ActionCardsSection } from '../components/ActionCardsSection';
import { FinalContactCta } from '../components/FinalContactCta';

export const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <ContentFieldsSection />
      <WorkFieldsSection />
      <ServicesSection />
      <NewsSection />
      <FinalContactCta />
      <HelpAndBlogSection />
      <ActionCardsSection />
    </div>
  );
};
