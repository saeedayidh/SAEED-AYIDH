import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

export const FinalContactCta: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-20 border border-white/20 shadow-2xl text-center space-y-8 min-h-[440px] flex items-center justify-center">
          
          {/* Background Image: Saeed's Banner Image (Full Brightness & Original Vibrant Red Color) */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/saeed_banner_new.png"
              alt="خلفية سعيد بن عايض وشعار SBA"
              className="w-full h-full object-cover object-center opacity-100 filter brightness-105 contrast-105"
            />
            {/* Very Subtle Darkening Overlay only for text readability */}
            <div className="absolute inset-0 bg-black/30 backdrop-brightness-95"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            
            <span className="text-xs font-extrabold uppercase tracking-widest text-white bg-black/60 px-6 py-2.5 rounded-full inline-block border border-white/30 backdrop-blur-md shadow-lg">
              فرص التعاون والشراكة
            </span>

            <h2 className="text-3xl sm:text-6xl font-black text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              لنصنع شيئاً مميزاً معاً
            </h2>

            <p className="text-base sm:text-xl text-white font-medium max-w-xl mx-auto leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
              إذا كان لديك مشروع أو فكرة أو تعاون، يسعدنا التواصل معك وتحويل الرؤية إلى واقع استثنائي.
            </p>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#B5121B] font-extrabold text-sm hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>تواصل معنا</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
