import React from 'react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20 text-right">
      <SEO title="الشروط والأحكام" description="الشروط والأحكام والاستخدام لموقع سعيد بن عايض الرقمي." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'الشروط والأحكام' }]} />
        <div className="p-8 rounded-3xl bg-[#121212] border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <FileText className="w-6 h-6 text-[#D51F2B]" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">الشروط والأحكام</h1>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            أهلاً بك في موقع سعيد بن عايض. استخدامك للموقع والأدوات والخدمات المتاحة يعني موافقتك الكاملة على الشروط التالية:
          </p>
          <div className="space-y-4 text-xs text-gray-300">
            <h3 className="text-sm font-bold text-white">1. الملكية الفكرية</h3>
            <p className="leading-relaxed">جميع المحتويات والأدوات والبرومبت والتصاميم والشعارات مملوكة لسعيد بن عايض ومحمية بموجب قوانين الملكية الفكرية.</p>
            <h3 className="text-sm font-bold text-white">2. الاستخدام العادل للأدوات</h3>
            <p className="leading-relaxed">يُسمح باستخدام الأدوات والخلفيات والاختصارات للأغراض الشخصية والتجارية المشروعة ويُمنع إعادة بيعها كمنتجات مستقلة دون إذن.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
