import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { siteData } from '../data/siteData';

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
        <span className="text-xs font-bold text-[#D51F2B] bg-[#191919] px-4 py-1.5 rounded-full border border-white/10">
          دليل الخدمات الكامل
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">خدمات سعيد الرقمية والإبداعية</h1>
        <p className="text-base sm:text-lg text-[#B8B8B8] max-w-2xl mx-auto font-light">
          استكشف كافة الخدمات المتاحة للأفراد والمؤسسات وتواصل لبدء تنفيذ مشروعك.
        </p>
      </div>

      <ServicesSection />
    </div>
  );
};
