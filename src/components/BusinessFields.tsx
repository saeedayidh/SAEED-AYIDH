import React from 'react';
import { Camera, Code, Cpu, Briefcase, TrendingUp, Layers } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface BusinessFieldsProps {
  lang: Language;
}

export const BusinessFields: React.FC<BusinessFieldsProps> = ({ lang }) => {
  const t = translations[lang].businessSection;

  const fields = [
    {
      id: 'coverages',
      title: t.coverages.title,
      desc: t.coverages.desc,
      icon: Camera,
    },
    {
      id: 'uiux',
      title: t.uiux.title,
      desc: t.uiux.desc,
      icon: Code,
    },
    {
      id: 'ai',
      title: t.ai.title,
      desc: t.ai.desc,
      icon: Cpu,
    },
    {
      id: 'bizDev',
      title: t.bizDev.title,
      desc: t.bizDev.desc,
      icon: Briefcase,
    },
    {
      id: 'marketing',
      title: t.digitalMarketing.title,
      desc: t.digitalMarketing.desc,
      icon: TrendingUp,
    },
  ];

  return (
    <section id="business-fields" className="py-20 relative border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-red-950/60 light:bg-red-100 border border-red-800/40 flex items-center justify-center text-red-500">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-gray-900">
            {t.title}
          </h2>
        </div>

        {/* Business Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div
                key={field.id}
                className="group relative rounded-2xl glass-card-dark dark:glass-card-dark light:glass-card-light transition-all duration-300 p-6 flex flex-col items-start justify-between hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/70 light:bg-red-100 border border-red-800/40 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 mb-6 shadow-red-glow">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900 mb-2">
                    {field.title}
                  </h3>
                  <p className="text-xs text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed font-light">
                    {field.desc}
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
