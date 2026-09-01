import React from 'react';
import { Mic, Video, BookOpen, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ContentFieldsProps {
  lang: Language;
}

export const ContentFields: React.FC<ContentFieldsProps> = ({ lang }) => {
  const t = translations[lang].contentSection;
  const isRtl = lang === 'ar';

  const cards = [
    {
      id: 'sheylat',
      title: t.sheylat.title,
      desc: t.sheylat.desc,
      icon: Mic,
      img: '/assets/content_sheylat.png',
    },
    {
      id: 'vlogs',
      title: t.vlogs.title,
      desc: t.vlogs.desc,
      icon: Video,
      img: '/assets/content_vlogs.png',
    },
    {
      id: 'stories',
      title: t.stories.title,
      desc: t.stories.desc,
      icon: BookOpen,
      img: '/assets/content_stories.png',
    },
    {
      id: 'gaming',
      title: t.gaming.title,
      desc: t.gaming.desc,
      icon: Gamepad2,
      img: '/assets/content_gaming.png',
    },
  ];

  return (
    <section id="content-fields" className="py-20 relative border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-red-950/60 light:bg-red-100 border border-red-800/40 flex items-center justify-center text-red-500">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-gray-900">
            {t.title}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group relative rounded-2xl overflow-hidden glass-card-dark dark:glass-card-dark light:glass-card-light transition-all duration-300 p-6 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Visual Top Preview */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-5 bg-black/60 border border-red-900/30">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>

                {/* View More Action Link */}
                <div className="pt-5 mt-4 border-t border-red-900/20 light:border-red-100 flex items-center justify-start text-xs font-semibold text-red-500 group-hover:text-red-400 gap-1 cursor-pointer">
                  <span>{t.viewMore}</span>
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
