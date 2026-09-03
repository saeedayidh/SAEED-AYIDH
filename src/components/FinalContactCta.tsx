import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const FinalContactCta: React.FC = () => {
  const { data } = useCMS();
  const cta = (data.global as any).cta || {
    badge: 'فرص التعاون والشراكة',
    title: 'لنصنع شيئاً مميزاً معاً',
    description: 'إذا كان لديك مشروع أو فكرة أو تعاون، يسعدنا التواصل معك وتحويل الرؤية إلى واقع استثنائي.',
    buttonLabel: 'تواصل معنا',
    buttonUrl: '/contact',
    bannerUrl: '/assets/saeed_banner_new.png'
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative w-full min-h-[220px] sm:min-h-[300px] lg:min-h-[340px] rounded-[28px] overflow-hidden border border-white/15 shadow-2xl flex items-center justify-center text-center">
          <img src={cta.bannerUrl} alt={cta.badge || cta.title} className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-8 sm:py-10 space-y-4 sm:space-y-5">
            <span className="text-[11px] sm:text-xs font-extrabold text-white bg-black/55 px-5 py-2 rounded-full inline-block border border-white/25 backdrop-blur-sm">{cta.badge || 'فرص التعاون والشراكة'}</span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">{cta.title}</h2>
            <p className="text-sm sm:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed">{cta.description}</p>
            <Link to={cta.buttonUrl || '/contact'} className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white text-[#B5121B] font-extrabold text-sm hover:bg-gray-100 transition-all shadow-2xl"><Send className="w-4 h-4" /><span>{cta.buttonLabel || 'تواصل معنا'}</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
};
