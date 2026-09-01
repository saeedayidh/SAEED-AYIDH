import React from 'react';
import { PenTool, Headphones, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface BlogAndHelpProps {
  lang: Language;
}

export const BlogAndHelp: React.FC<BlogAndHelpProps> = ({ lang }) => {
  const t = translations[lang].blogAndHelpSection;
  const isRtl = lang === 'ar';

  return (
    <section id="blog-help" className="py-16 relative border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Saeed Blog Card */}
          <div className="group rounded-3xl glass-card-dark dark:glass-card-dark light:glass-card-light p-8 flex flex-col md:flex-row items-center gap-6 justify-between transition-all duration-300 hover:-translate-y-1">
            <div className="flex-1 text-right dir-rtl:text-right dir-ltr:text-left">
              <div className="flex items-center gap-2 mb-3">
                <PenTool className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                  {t.blogTitle}
                </h3>
              </div>
              <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed font-light mb-6">
                {t.blogDesc}
              </p>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-red-950/60 dark:bg-red-950/60 light:bg-red-50 text-red-400 dark:text-red-400 light:text-red-700 border border-red-800/40 light:border-red-200 hover:bg-red-600 hover:text-white transition-all cursor-pointer">
                <span>{t.visitBlog}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Visual Notebook Graphic */}
            <div className="w-36 h-36 rounded-2xl bg-black/60 border border-red-900/40 flex items-center justify-center p-2 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
              <img
                src="/assets/blog_notebook.png"
                alt="بلوغ سعيد"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Saeed Help Center Card */}
          <div className="group rounded-3xl glass-card-dark dark:glass-card-dark light:glass-card-light p-8 flex flex-col md:flex-row items-center gap-6 justify-between transition-all duration-300 hover:-translate-y-1">
            <div className="flex-1 text-right dir-rtl:text-right dir-ltr:text-left">
              <div className="flex items-center gap-2 mb-3">
                <Headphones className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                  {t.helpTitle}
                </h3>
              </div>
              <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed font-light mb-6">
                {t.helpDesc}
              </p>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-red-950/60 dark:bg-red-950/60 light:bg-red-50 text-red-400 dark:text-red-400 light:text-red-700 border border-red-800/40 light:border-red-200 hover:bg-red-600 hover:text-white transition-all cursor-pointer">
                <span>{t.enterHelp}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Visual Headset Graphic */}
            <div className="w-36 h-36 rounded-2xl bg-black/60 border border-red-900/40 flex items-center justify-center p-2 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
              <img
                src="/assets/help_headphones.png"
                alt="سعيد سنترهلب"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
