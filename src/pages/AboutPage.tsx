import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { siteData } from '../data/siteData';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-right">
          <span className="text-xs font-bold text-[#D51F2B] bg-[#191919] px-4 py-1.5 rounded-full border border-white/10">
            عن سعيد بن عايض
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            رؤية مبتكرة في صناعة المحتوى وتطوير الأعمال
          </h1>
          <p className="text-base sm:text-lg text-[#B8B8B8] leading-relaxed font-light">
            {siteData.brand.bio}
          </p>
          <div className="space-y-3 pt-2 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#D51F2B]" />
              <span>خبرة متميزة في التخطيط وصناعة المحتوى المرئي والصوتي</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#D51F2B]" />
              <span>استراتيجيات تطوير الأعمال وبناء الواجهات الرقمية الفاخرة</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#D51F2B]" />
              <span>تقديم حلول الذكاء الاصطناعي والأتمتة الذكية للمشاريع</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="sba-card p-3 max-w-md w-full">
            <img src="/assets/saeed_portrait.png" alt="سعيد بن عايض" className="w-full h-auto rounded-xl object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};
