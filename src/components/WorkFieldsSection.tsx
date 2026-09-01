import React from 'react';
import { TrendingUp, Briefcase, Cpu, Layout, Camera, Layers } from 'lucide-react';
import { siteData } from '../data/siteData';

export const WorkFieldsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return TrendingUp;
      case 'Briefcase': return Briefcase;
      case 'Cpu': return Cpu;
      case 'Layout': return Layout;
      default: return Camera;
    }
  };

  return (
    <section id="work-fields" className="py-24 relative bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
            <Layers className="w-3.5 h-3.5" />
            <span>الخبرات والحلول المتقدمة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            مجالات العمل
          </h2>
          <p className="text-base sm:text-lg text-[#B8B8B8] font-light">
            حلول واحترافية متكاملة للمشاريع والعلامات التجارية الشريكة.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {siteData.workFields.map((field) => {
            const Icon = getIcon(field.iconName);
            return (
              <div
                key={field.id}
                className="sba-card group p-6 flex flex-col justify-between items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#191919] border border-white/10 flex items-center justify-center text-[#D51F2B] mb-6 group-hover:bg-[#B5121B] group-hover:text-white transition-all shadow-md">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D51F2B] transition-colors">
                    {field.title}
                  </h3>
                  <p className="text-xs text-[#B8B8B8] leading-relaxed font-light">
                    {field.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
