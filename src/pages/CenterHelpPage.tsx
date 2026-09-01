import React from 'react';
import { Headphones, HelpCircle, FileText, MessageSquare } from 'lucide-react';
import { siteData } from '../data/siteData';

export const CenterHelpPage: React.FC = () => {
  const faqs = [
    {
      q: 'كيف يمكنني طلب خدمة أو استشارة تطوير أعمال؟',
      a: 'يمكنك التواصل المباشر عبر صفحة التواصل أو حجز موعد استشاري للاتفاق على خطة العمل.'
    },
    {
      q: 'هل تتوفر خدمات التغطيات الميدانية خارج المنطقة؟',
      a: 'نعم، يتم ترتيب وتنسيق التغطيات للمؤتمرات والفعاليات في مختلف المناطق وفق جداول مسبقة.'
    },
    {
      q: 'كيف يمكنني استخدام وتنزيل أدوات وموارد سعيد؟',
      a: 'جميع البرومبت والخلفيات والاختصارات متاحة مجاناً ومباشرة للتنزيل عبر قسم الأدوات والموارد.'
    }
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fade-in">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
          <Headphones className="w-3.5 h-3.5" />
          <span>مركز الدعم والدعم الفني</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white">سعيد سنترهلب</h1>
        <p className="text-base sm:text-lg text-[#B8B8B8] font-light">
          مركز المساعدة والدعم الخاص بموقع سعيد، للوصول إلى الأسئلة الشائعة والشروحات وطرق التواصل.
        </p>
      </div>

      {/* FAQ Accordion Grid */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="sba-card p-6 space-y-2">
            <div className="flex items-center gap-3 text-lg font-bold text-white">
              <HelpCircle className="w-5 h-5 text-[#D51F2B]" />
              <span>{item.q}</span>
            </div>
            <p className="text-sm text-[#B8B8B8] leading-relaxed font-light pr-8">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
