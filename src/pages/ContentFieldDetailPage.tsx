import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MediaSystem } from '../components/MediaSystem';
import { Layers, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ContentFieldDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find item by slug or id
  const field = siteData.contentFields.find(f => f.slug === slug || f.id === slug) || siteData.contentFields[0];

  const relatedNews = siteData.news.filter(n => field.latestNewsSlugs?.includes(n.slug) || n.category.includes(field.title));

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20">
      <SEO
        title={field.title}
        description={field.description}
        image={field.image}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'مجالات المحتوى', link: '/#content-fields' },
            { label: field.title }
          ]}
        />

        {/* Editorial Field Hero Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#190305] via-[#100203] to-[#080808] border border-white/10 p-6 sm:p-10 mb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="w-full lg:w-[60%] space-y-4 text-right">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D51F2B]/15 border border-[#D51F2B]/30 text-xs font-semibold text-[#D51F2B]">
                <Layers className="w-3.5 h-3.5" />
                <span>{field.categoryTag}</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                {field.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                {field.intro || field.description}
              </p>
            </div>

            <div className="w-full lg:w-[35%] flex justify-center">
              <img
                src={field.image}
                alt={field.title}
                className="w-full max-w-[320px] h-auto rounded-2xl border border-white/10 shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Content Layout (Main column + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8 text-right">
            {/* Full Editorial Description */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                عن مجال {field.title}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                {field.fullContent || field.description}
              </p>
            </div>

            {/* Featured Highlights */}
            {field.featuredItems && field.featuredItems.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">أبرز المحطات والأعمال المميزة</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {field.featuredItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#181818] border border-white/5 text-xs text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#D51F2B] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reusable Media System */}
            <MediaSystem
              galleryImages={field.galleryImages}
              videos={field.videos}
              externalLinks={field.externalLinks}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Latest Category News */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 text-right">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                أحدث الأخبار في هذا المجال
              </h3>
              {relatedNews.length > 0 ? (
                <div className="space-y-3">
                  {relatedNews.map((newsItem) => (
                    <Link
                      key={newsItem.id}
                      to={`/news/${newsItem.slug}`}
                      className="block p-3 rounded-xl bg-[#181818] border border-white/5 hover:border-[#D51F2B]/50 transition-all group"
                    >
                      <h4 className="text-xs font-semibold text-white group-hover:text-[#D51F2B] transition-colors line-clamp-2">
                        {newsItem.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 mt-1 block">{newsItem.date}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">لا توجد أخبار حديثة مسجلة بهذا المجال حالياً.</p>
              )}
            </div>

            {/* Social Links */}
            {field.socialLinks && field.socialLinks.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 text-right">
                <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                  روابط المنصات والتواصل
                </h3>
                <div className="flex flex-col gap-2">
                  {field.socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-[#181818] border border-white/5 text-xs text-gray-300 hover:text-white hover:border-[#D51F2B] transition-all"
                    >
                      <span>{s.title}</span>
                      <ArrowLeft className="w-3.5 h-3.5 text-[#D51F2B]" />
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
