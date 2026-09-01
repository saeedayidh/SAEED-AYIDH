import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ChevronLeft } from 'lucide-react';
import { siteData } from '../data/siteData';

export const PortfolioSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('الكل');

  const categories = ['الكل', 'التطوير', 'التغطيات', 'التسويق', 'المحتوى'];

  const filteredItems = activeTab === 'الكل'
    ? siteData.portfolio
    : siteData.portfolio.filter((item) => item.category === activeTab);

  return (
    <section id="portfolio-section" className="py-24 relative bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Centered in Middle */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>معرض الأعمال والشركاء</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            أعمال سعيد
          </h2>
          <p className="text-base sm:text-lg text-[#B8B8B8] font-light leading-relaxed">
            مقتطفات استثنائية ونماذج واقعية منفذة للعملاء والمشاريع التجارية.
          </p>

          <Link
            to="/works"
            className="sba-btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 mt-2"
          >
            <span>مشاهدة كل الأعمال</span>
            <ChevronLeft className="w-4 h-4 text-[#D51F2B]" />
          </Link>
        </div>

        {/* Filter Categories Centered */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 pb-4 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-[#B5121B] text-white shadow-md'
                  : 'bg-[#151515] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              to={`/work/${item.slug || item.id}`}
              className="sba-card group p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div className="space-y-4">
                <div className="h-48 rounded-xl overflow-hidden bg-[#080808] border border-white/10 relative">
                  <img src={item.projectImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  <div className="absolute top-3 right-3 px-3 py-1 rounded bg-[#080808]/90 backdrop-blur-md text-xs font-bold text-white border border-white/10 flex items-center gap-2">
                    <img src={item.logoImage} alt={item.clientName} className="w-4 h-4 rounded-full object-cover" />
                    <span>{item.clientName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="text-[#D51F2B] font-bold">{item.category}</span>
                  <span>{item.year}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#D51F2B] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#B8B8B8] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gray-300 group-hover:text-[#D51F2B] transition-colors">
                <span>عرض دراسة الحالة كاملة</span>
                <ChevronLeft className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
