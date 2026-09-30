import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MediaSystem } from '../components/MediaSystem';
import { Layers, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { publicEnglish } from '../i18n/publicEnglish';

export const ContentFieldDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useCMS();
  const { language, isArabic } = useLanguage();
  const fallback = siteData.contentFields.find((f:any) => f.slug === slug || f.id === slug) || siteData.contentFields[0];
  const field:any = (data.contentFields || []).find((f:any) => f.slug === slug || f.id === slug) || fallback;
  const tr = (value:any, explicit?:any) => {
    if (isArabic || typeof value !== 'string') return value;
    return (typeof explicit === 'string' && explicit.trim()) ? explicit : (publicEnglish[value] || value);
  };
  const title = tr(field.title, field.titleEn);
  const description = tr(field.description, field.descriptionEn);
  const intro = tr(field.intro || field.description, field.introEn || field.descriptionEn);
  const categoryTag = tr(field.categoryTag, field.categoryTagEn || field.categoryEn);
  const fullContent = tr(field.fullContent || field.description, field.fullContentEn || field.descriptionEn);
  const relatedNews = (data.news || []).filter((n:any) =>
    field.latestNewsSlugs?.includes?.(n.slug) ||
    (typeof n.category === 'string' && typeof field.title === 'string' && n.category.includes(field.title))
  );
  const BackArrow = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20" dir={isArabic ? 'rtl' : 'ltr'}>
      <SEO title={title} description={description} image={field.image} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: isArabic ? 'مجالات المحتوى' : 'Content Fields', link: '/#content-fields' },
          { label: title }
        ]} />

        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#190305] via-[#100203] to-[#080808] border border-white/10 p-6 sm:p-10 mb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="w-full lg:w-[60%] space-y-4 text-start">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D51F2B]/15 border border-[#D51F2B]/30 text-xs font-semibold text-[#D51F2B]">
                <Layers className="w-3.5 h-3.5" /><span>{categoryTag}</span>
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">{title}</h1>
              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">{intro}</p>
            </div>
            <div className="w-full lg:w-[35%] flex justify-center">
              <img src={field.image} alt={title} className="w-full max-w-[320px] h-auto rounded-2xl border border-white/10 shadow-2xl object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8 text-start">
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                {isArabic ? `عن مجال ${field.title}` : `About ${title}`}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">{fullContent}</p>
            </div>

            {field.featuredItems && field.featuredItems.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">{isArabic ? 'أبرز المحطات والأعمال المميزة' : 'Featured Highlights & Works'}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {field.featuredItems.map((item:string, idx:number) => (
                    <li key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#181818] border border-white/5 text-xs text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#D51F2B] shrink-0" /><span>{tr(item, field.featuredItemsEn?.[idx])}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <MediaSystem
              galleryImages={field.galleryImages}
              videos={(field.videos || []).map((v:any)=>({...v,title:tr(v.title,v.titleEn)}))}
              externalLinks={(field.externalLinks || []).map((x:any)=>({...x,title:tr(x.title,x.titleEn),badge:tr(x.badge,x.badgeEn)}))}
            />
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 text-start">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">{isArabic ? 'أحدث الأخبار في هذا المجال' : 'Latest News in This Field'}</h3>
              {relatedNews.length > 0 ? (
                <div className="space-y-3">
                  {relatedNews.map((newsItem:any) => (
                    <Link key={newsItem.id} to={`/news/${newsItem.slug}`} className="block p-3 rounded-xl bg-[#181818] border border-white/5 hover:border-[#D51F2B]/50 transition-all group">
                      <h4 className="text-xs font-semibold text-white group-hover:text-[#D51F2B] transition-colors line-clamp-2">{tr(newsItem.title,newsItem.titleEn)}</h4>
                      <span className="text-[11px] text-gray-400 mt-1 block">{tr(newsItem.date,newsItem.dateEn)}</span>
                    </Link>
                  ))}
                </div>
              ) : <p className="text-xs text-gray-400">{isArabic ? 'لا توجد أخبار حديثة مسجلة بهذا المجال حالياً.' : 'No recent news is currently available in this field.'}</p>}
            </div>

            {field.socialLinks && field.socialLinks.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 text-start">
                <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">{isArabic ? 'روابط المنصات والتواصل' : 'Platform & Contact Links'}</h3>
                <div className="flex flex-col gap-2">
                  {field.socialLinks.map((s:any, idx:number) => (
                    <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-[#181818] border border-white/5 text-xs text-gray-300 hover:text-white hover:border-[#D51F2B] transition-all">
                      <span>{tr(s.title,s.titleEn)}</span><BackArrow className="w-3.5 h-3.5 text-[#D51F2B]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
