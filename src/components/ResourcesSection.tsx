import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Wrench, ChevronLeft, Layers, ArrowLeft } from 'lucide-react';
import { siteData } from '../data/siteData';

export const ResourcesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // Exact requested category stack order
  const categoriesStack = [
    { title: 'البرومبت', id: 'البرومبت' },
    { title: 'واجهات الساعات', id: 'واجهات الساعات' },
    { title: 'الخلفيات', id: 'خلفيات الجوال' },
    { title: 'الفلاتر', id: 'الفلاتر' },
    { title: 'الاختصارات', id: 'الاختصارات' },
    { title: 'صفحة حسابات', id: 'صفحة حسابات' }
  ];

  const filteredCategories = selectedCategory === 'الكل'
    ? categoriesStack
    : categoriesStack.filter((cat) => cat.id === selectedCategory || cat.title === selectedCategory);

  return (
    <section id="resources-section" className="py-24 relative bg-[#0D0D0D] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Centered in Middle */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
            <Wrench className="w-3.5 h-3.5" />
            <span>المكتبة والأدوات الحصرية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            أدوات سعيد
          </h2>
          <p className="text-base sm:text-lg text-[#B8B8B8] font-light leading-relaxed">
            مكتبة أدوات متكاملة تشمل البرومبت، واجهات الساعات، الخلفيات، الفلاتر والاختصارات.
          </p>

          <Link
            to="/resources"
            className="sba-btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 mt-2"
          >
            <span>عرض جميع الأدوات</span>
            <ChevronLeft className="w-4 h-4 text-[#D51F2B]" />
          </Link>
        </div>

        {/* Top Control Bar Card: Search + Sort Dropdown */}
        <div className="sba-card p-5 mb-14 flex flex-col md:flex-row items-center gap-4 bg-[#151515] border border-white/10">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث في أدوات سعيد..."
              className="w-full pl-4 pr-11 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D51F2B]"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-[#D51F2B]" />
            <span className="text-xs font-bold text-gray-300 shrink-0">فرز:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-60 px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D51F2B] cursor-pointer"
            >
              {siteData.toolsCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Stacked Tool Category Rows */}
        <div className="space-y-12">
          {filteredCategories.map((catObj) => {
            const categoryTools = siteData.tools.filter((tool) => {
              const matchesCat = tool.category === catObj.id || tool.category.includes(catObj.title);
              const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
              return matchesCat && matchesSearch;
            });

            if (categoryTools.length === 0 && searchTerm) return null;

            return (
              <div key={catObj.id} className="sba-card p-6 sm:p-8 space-y-6 border border-white/10 bg-[#111111]">
                
                {/* Category Title & Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#280305] border border-[#D51F2B]/40 flex items-center justify-center text-[#D51F2B]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {catObj.title}
                    </h3>
                  </div>

                  <span className="text-xs text-gray-400 bg-[#191919] px-3 py-1 rounded-full border border-white/5">
                    {categoryTools.length} أدوات
                  </span>
                </div>

                {/* Horizontal Tool Cards Row / Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {(categoryTools.length > 0 ? categoryTools : siteData.tools.slice(0, 4)).map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tools/${tool.slug || tool.id}`}
                      className="p-4 rounded-xl bg-[#080808] border border-white/10 hover:border-[#D51F2B] hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="h-32 rounded-lg overflow-hidden mb-3 bg-[#151515] border border-white/5 relative">
                          <img
                            src={tool.image}
                            alt={tool.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#D51F2B] transition-colors leading-snug line-clamp-1">
                          {tool.name}
                        </h4>
                      </div>

                      <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-semibold text-[#D51F2B]">
                        <span>استعرض الأداة الكاملة</span>
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
