import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MediaSystem } from '../components/MediaSystem';
import { Newspaper, Calendar, Share2, ArrowRight } from 'lucide-react';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find news item by slug or id
  const newsItem = siteData.news.find(n => n.slug === slug || n.id === slug) || siteData.news[0];

  // Related news
  const relatedNews = siteData.news.filter(n => n.id !== newsItem.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الخبر للحافظة!');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20">
      <SEO
        title={newsItem.title}
        description={newsItem.excerpt}
        image={newsItem.image}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'أخبار سعيد', link: '/news' },
            { label: newsItem.title }
          ]}
        />

        {/* Article Meta Header */}
        <div className="space-y-4 text-right mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-[#D51F2B]/15 border border-[#D51F2B]/30 text-xs font-semibold text-[#D51F2B] flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{newsItem.category}</span>
            </span>

            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{newsItem.date}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            {newsItem.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            {newsItem.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151515] border border-white/10 text-xs text-gray-300 hover:text-white hover:border-[#D51F2B] transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#D51F2B]" />
              <span>مشاركة الخبر</span>
            </button>
          </div>
        </div>

        {/* Main Cover Image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121212] mb-8">
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Full Article Content */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 space-y-6 text-right mb-10">
          {newsItem.contentParagraphs ? (
            newsItem.contentParagraphs.map((para, idx) => (
              <div key={idx} className="space-y-2">
                {newsItem.headings && newsItem.headings[idx] && (
                  <h2 className="text-xl font-bold text-white pt-2 border-r-2 border-[#D51F2B] pr-3">
                    {newsItem.headings[idx]}
                  </h2>
                )}
                <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
                  {para}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-300 text-base leading-relaxed">{newsItem.excerpt}</p>
          )}
        </div>

        {/* Media System (Gallery, Videos, Links, Source) */}
        <MediaSystem
          galleryImages={newsItem.galleryImages}
          videos={newsItem.videos}
          externalLinks={newsItem.externalLinks || newsItem.sourceLinks}
        />

        {/* Related News Section */}
        {relatedNews.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/10 text-right space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#D51F2B]" />
              <span>أخبار ذات صلة</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedNews.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/news/${rel.slug}`}
                  className="group rounded-xl p-4 bg-[#121212] border border-white/10 hover:border-[#D51F2B] transition-all space-y-3"
                >
                  <img src={rel.image} alt={rel.title} className="w-full h-32 object-cover rounded-lg" />
                  <span className="text-[11px] text-[#D51F2B] font-semibold">{rel.category}</span>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#D51F2B] transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
