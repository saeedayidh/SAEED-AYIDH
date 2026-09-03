import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Sparkles } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services-section" className="py-24 relative bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الخدمات والحلول الاحترافية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">خدمات سعيد</h2>
          <p className="text-base sm:text-lg text-[#B8B8B8] font-light leading-relaxed">
            خدمات رقمية وإبداعية للأفراد والمشاريع والعلامات التجارية.
          </p>
          <Link to="/services" className="sba-btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 mt-2">
            <span>عرض جميع الخدمات</span>
            <ChevronLeft className="w-4 h-4 text-[#D51F2B]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
