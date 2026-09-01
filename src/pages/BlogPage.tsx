import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Calendar, ArrowLeft, Clock } from 'lucide-react';
import { siteData } from '../data/siteData';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const BlogPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEO title="بلوق سعيد" description="مدونة سعيد بن عايض الشخصية للمقالات والأفكار ورؤى تطوير الأعمال والذكاء الاصطناعي." />

      <Breadcrumbs items={[{ label: 'بلوق سعيد' }]} />

      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
          <PenTool className="w-3.5 h-3.5" />
          <span>المقالات والرؤى الشخصية</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white">بلوق سعيد</h1>
        <p className="text-base sm:text-lg text-[#B8B8B8] font-light">
          مدونتي الشخصية التي أشارك فيها المقالات والتجارب والأفكار والمحتوى المتخصص.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {siteData.blogPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug || post.id}`}
            className="sba-card group p-6 flex flex-col justify-between cursor-pointer space-y-4"
          >
            <div className="space-y-3">
              <div className="h-44 rounded-xl overflow-hidden bg-[#111111] border border-white/10 relative">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-[#080808]/90 text-[10px] font-bold text-[#D51F2B] border border-white/10">
                  {post.category}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#D51F2B]" />
                  <span>{post.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span>{post.readingTime}</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#D51F2B] transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-[#B8B8B8] leading-relaxed font-light line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gray-300 group-hover:text-[#D51F2B] transition-colors">
              <span>قراءة المقال الكامل</span>
              <ArrowLeft className="w-4 h-4 text-[#D51F2B] group-hover:-translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
