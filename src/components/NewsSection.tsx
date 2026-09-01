import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ChevronLeft, Calendar } from 'lucide-react';
import { siteData } from '../data/siteData';

export const NewsSection: React.FC = () => {
  return (
    <section id="news-section" className="py-24 relative bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Centered in Middle */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
            <Newspaper className="w-3.5 h-3.5" />
            <span>المركز الإخباري والتغطيات</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            أخبار سعيد
          </h2>
          <p className="text-base sm:text-lg text-[#B8B8B8] font-light leading-relaxed">
            آخر الأخبار والتغطيات وإعلانات المشاريع والشراكات الجديدة.
          </p>

          <Link
            to="/news"
            className="sba-btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 mt-2"
          >
            <span>عرض جميع الأخبار</span>
            <ChevronLeft className="w-4 h-4 text-[#D51F2B]" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.news.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.slug || item.id}`}
              className="sba-card group p-5 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div>
                <div className="h-44 rounded-xl overflow-hidden mb-4 bg-[#111111] relative border border-white/10">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-[#080808]/85 backdrop-blur-md text-[10px] font-bold text-[#D51F2B] border border-white/10">
                    {item.category}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#D51F2B]" />
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#D51F2B] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#B8B8B8] leading-relaxed font-light line-clamp-2">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#D51F2B] group-hover:translate-x-[-4px] transition-transform">
                <span>اقرأ الخبر الكامل</span>
                <ChevronLeft className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
