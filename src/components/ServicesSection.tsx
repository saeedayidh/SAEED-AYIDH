import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';
import { siteData } from '../data/siteData';

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  const filteredServices = activeCategory === 'الكل'
    ? siteData.services
    : siteData.services.filter((s) => s.category === activeCategory);

  return (
    <section id="services-section" className="py-24 relative bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Centered in Middle (عناوين في الوسط) */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الخدمات والحلول الاحترافية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            خدمات سعيد
          </h2>
          <p className="text-base sm:text-lg text-[#B8B8B8] font-light leading-relaxed">
            خدمات رقمية وإبداعية مقسمة بأسعار واضحة للأفراد والمشاريع والعلامات التجارية.
          </p>

          <Link
            to="/services"
            className="sba-btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 mt-2"
          >
            <span>عرض جميع الخدمات</span>
            <ChevronLeft className="w-4 h-4 text-[#D51F2B]" />
          </Link>
        </div>

        {/* Category Filter Tabs Centered */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 pb-4 border-b border-white/5">
          {siteData.serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#B5121B] text-white shadow-md'
                  : 'bg-[#151515] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="sba-card group p-6 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Service Image Preview */}
                <div className="h-40 rounded-xl overflow-hidden mb-5 bg-[#080808] border border-white/10 relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-[#080808]/85 backdrop-blur-md text-[10px] font-bold text-[#D51F2B] border border-white/10">
                    {service.category}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D51F2B] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-xs text-[#B8B8B8] leading-relaxed font-light mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Service Price Display (أسعار الخدمات تحت الوصف) */}
                <div className="mb-6 p-2.5 rounded-xl bg-[#080808] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">سعر الخدمة:</span>
                  <span className="text-sm font-black text-[#D51F2B]">{service.price}</span>
                </div>
              </div>

              {/* Card Bottom Buttons: "عرض الخدمة" + "تواصل الآن" */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                <Link
                  to={`/services/${service.id}`}
                  className="flex-1 py-2.5 rounded-xl bg-[#191919] border border-white/10 text-xs font-bold text-white hover:bg-[#B5121B] hover:border-[#D51F2B] transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>عرض الخدمة</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#D51F2B]" />
                </Link>

                <Link
                  to="/contact"
                  className="py-2.5 px-3 rounded-xl bg-[#D51F2B]/20 border border-[#D51F2B]/40 text-xs font-bold text-[#D51F2B] hover:bg-[#D51F2B] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                  title="تواصل الآن"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>تواصل الآن</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
