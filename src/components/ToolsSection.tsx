import React from 'react';
import { Sliders } from 'lucide-react';
import { Language, ToolItem } from '../types';
import { translations } from '../i18n/translations';

interface ToolsSectionProps {
  lang: Language;
  onSelectTool: (tool: ToolItem) => void;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ lang, onSelectTool }) => {
  const t = translations[lang].toolsSection;

  const tools: (ToolItem & { img: string })[] = [
    {
      id: 'shortcuts',
      titleKey: t.shortcuts.title,
      descKey: t.shortcuts.desc,
      iconName: 'Zap',
      category: 'System',
      img: '/assets/tool_shortcuts.png',
    },
    {
      id: 'socialHub',
      titleKey: t.socialHub.title,
      descKey: t.socialHub.desc,
      iconName: 'Share2',
      category: 'Web',
      img: '/assets/tool_social.png',
    },
    {
      id: 'filters',
      titleKey: t.filters.title,
      descKey: t.filters.desc,
      iconName: 'Sparkles',
      category: 'Presets',
      img: '/assets/tool_filters.png',
    },
    {
      id: 'wallpapers',
      titleKey: t.wallpapers.title,
      descKey: t.wallpapers.desc,
      iconName: 'Image',
      category: 'Graphics',
      img: '/assets/tool_wallpapers.png',
    },
    {
      id: 'watchFaces',
      titleKey: t.watchFaces.title,
      descKey: t.watchFaces.desc,
      iconName: 'Watch',
      category: 'UI/UX',
      img: '/assets/tool_watch.png',
    },
    {
      id: 'prompts',
      titleKey: t.prompts.title,
      descKey: t.prompts.desc,
      iconName: 'Terminal',
      category: 'AI',
      img: '/assets/tool_prompts.png',
    },
  ];

  return (
    <section id="tools" className="py-20 relative border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-red-950/60 light:bg-red-100 border border-red-800/40 flex items-center justify-center text-red-500">
            <Sliders className="w-5 h-5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-gray-900">
            {t.title}
          </h2>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="group relative rounded-2xl glass-card-dark dark:glass-card-dark light:glass-card-light transition-all duration-300 p-4 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Tool Image Preview */}
              <div className="w-full h-28 rounded-xl overflow-hidden mb-3 bg-black/60 border border-red-900/30">
                <img src={tool.img} alt={tool.titleKey} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white dark:text-white light:text-gray-900 mb-1 text-center">
                  {tool.titleKey}
                </h3>
                <p className="text-xs text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed font-light mb-4 line-clamp-2 text-center">
                  {tool.descKey}
                </p>
              </div>

              {/* Browse Now Button */}
              <button
                onClick={() => onSelectTool(tool)}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold text-red-400 dark:text-red-400 light:text-red-600 bg-red-950/40 light:bg-red-50 border border-red-900/30 light:border-red-200 hover:bg-red-600 hover:text-white transition-all cursor-pointer text-center"
              >
                {t.browseNow}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
