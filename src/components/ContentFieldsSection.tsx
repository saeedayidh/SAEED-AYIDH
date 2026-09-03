import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const ContentFieldsSection: React.FC = () => {
  const { data } = useCMS();
  const section = data.sections.find(s => s.id === 'content-fields');
  if (section && !section.isVisible) return null;

  return (
    <section id="content-fields" className="py-24 relative bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]"><Sparkles className="w-3.5 h-3.5" /><span>{section?.badge || 'صناعة المحتوى الإبداعي'}</span></div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{section?.title || 'مجالات صناعة المحتوى'}</h2>
          <p className="text-base sm:text-lg text-[#B8B8B8] font-light">{section?.subtitle || 'محتوى متنوع بهوية مختلفة لكل مجال.'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.contentFields.map((field) => (
            <Link key={field.id} to={`/content/${field.slug || field.id}`} className="sba-card group overflow-hidden flex flex-col justify-between p-6 cursor-pointer">
              <div className="relative h-48 rounded-xl overflow-hidden mb-6 bg-[#080808] border border-white/10">
                {field.image ? <img src={field.image} alt={field.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="grid h-full place-items-center text-xs text-gray-600">بدون صورة</div>}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-[#080808]/80 backdrop-blur-md text-[10px] font-bold text-[#D51F2B] border border-white/10">{field.categoryTag}</div>
              </div>
              <div className="space-y-2 mb-6"><h3 className="text-xl font-bold text-white group-hover:text-[#D51F2B] transition-colors">{field.title}</h3><p className="text-xs text-[#B8B8B8] leading-relaxed font-light line-clamp-3">{field.description}</p></div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-white transition-colors"><span>استكشف المحتوى الكامل</span><ArrowLeft className="w-4 h-4 text-[#D51F2B] group-hover:-translate-x-1 transition-transform" /></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
