import React from 'react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldAlert } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20 text-right">
      <SEO title="سياسة الخصوصية" description="سياسة الخصوصية وحماية البيانات الشخصية الخاصة بموقع سعيد بن عايض." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'سياسة الخصوصية' }]} />
        <div className="p-8 rounded-3xl bg-[#121212] border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <ShieldAlert className="w-6 h-6 text-[#D51F2B]" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">سياسة الخصوصية وحماية البيانات</h1>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            نلتزم في موقع سعيد بن عايض (www.saeedbinayidh.com) بحماية خصوصيتك وبياناتك الشخصية بأعلى معايير الأمان والتشفير.
          </p>
          <div className="space-y-4 text-xs text-gray-300">
            <h3 className="text-sm font-bold text-white">1. جمع البيانات</h3>
            <p className="leading-relaxed">نجمع فقط البيانات الأساسية اللازمة لتقديم الخدمات والاستشارات والإجابة على الاستفسارات وبطاقات الشكاوى والاقتراحات.</p>
            <h3 className="text-sm font-bold text-white">2. استخدام المعلومات</h3>
            <p className="leading-relaxed">تُستخدم معلوماتك فقط لتلبية الطلبات، التواصل، وتحسين تجربة التصفح داخل الموقع.</p>
            <h3 className="text-sm font-bold text-white">3. حماية البيانات والتخزين المحلي</h3>
            <p className="leading-relaxed">يستخدم الموقع تقنيات التخزين المحلي (LocalStorage) لحفظ تفضيلاتك والمحفوظات بأمان كامل على جهازك.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
