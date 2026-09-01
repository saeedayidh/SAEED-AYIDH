import React from 'react';
import { ResourcesSection } from '../components/ResourcesSection';

export const ResourcesPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
        <span className="text-xs font-bold text-[#D51F2B] bg-[#191919] px-4 py-1.5 rounded-full border border-white/10">
          المكتبة والأدوات
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">أدوات وموارد سعيد بن عايض</h1>
        <p className="text-base sm:text-lg text-[#B8B8B8] max-w-2xl mx-auto font-light">
          استعرض وحمّل البرومبت، واجهات الساعات، خلفيات الجوال 4K، الفلاتر، الاختصارات وصفحة الحسابات الموحدة.
        </p>
      </div>

      <ResourcesSection />
    </div>
  );
};
