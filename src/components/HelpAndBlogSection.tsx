import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, PenTool, ArrowLeft } from 'lucide-react';

export const HelpAndBlogSection: React.FC = () => {
  return (
    <section id="help-blog" className="py-20 relative bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: سعيد سنترهلب */}
          <div className="sba-card group p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 justify-between">
            <div className="flex-1 space-y-4 text-right">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#191919] border border-white/10 text-[#D51F2B]">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">سعيد سنترهلب</h3>
              </div>

              <p className="text-sm text-[#B8B8B8] leading-relaxed font-light">
                مركز المساعدة والدعم الخاص بموقع سعيد، للوصول إلى الأسئلة الشائعة والشروحات وطرق التواصل والدعم الفني.
              </p>

              <Link
                to="/centerhelp"
                className="sba-btn-secondary inline-flex items-center gap-2.5 px-6 py-3 text-xs"
              >
                <span>الدخول إلى سعيد سنترهلب</span>
                <ArrowLeft className="w-4 h-4 text-[#D51F2B]" />
              </Link>
            </div>

            {/* Visual Headset Graphic */}
            <div className="w-36 h-36 rounded-2xl bg-[#080808] border border-white/10 p-3 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-inner">
              <img
                src="/assets/help_headphones.png"
                alt="سعيد سنترهلب"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Card 2: بلوق سعيد */}
          <div className="sba-card group p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 justify-between">
            <div className="flex-1 space-y-4 text-right">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#191919] border border-white/10 text-[#D51F2B]">
                  <PenTool className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">بلوق سعيد</h3>
              </div>

              <p className="text-sm text-[#B8B8B8] leading-relaxed font-light">
                مدونتي الشخصية التي أشارك فيها المقالات والتجارب والأفكار والمحتوى المتخصص في المحتوى والأعمال.
              </p>

              <Link
                to="/blog"
                className="sba-btn-secondary inline-flex items-center gap-2.5 px-6 py-3 text-xs"
              >
                <span>زيارة بلوق سعيد</span>
                <ArrowLeft className="w-4 h-4 text-[#D51F2B]" />
              </Link>
            </div>

            {/* Visual Journal Graphic */}
            <div className="w-36 h-36 rounded-2xl bg-[#080808] border border-white/10 p-3 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-inner">
              <img
                src="/assets/blog_notebook.png"
                alt="بلوق سعيد"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
