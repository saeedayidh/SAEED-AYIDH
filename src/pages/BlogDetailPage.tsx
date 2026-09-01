import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MediaSystem } from '../components/MediaSystem';
import {
  getEngagementState,
  toggleLike,
  toggleDislike,
  toggleFavorite
} from '../utils/engagement';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Quote
} from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find blog item by slug or id
  const post = siteData.blogPosts.find(b => b.slug === slug || b.id === slug) || siteData.blogPosts[0];

  // Related blog posts
  const relatedPosts = siteData.blogPosts.filter(b => b.id !== post.id).slice(0, 3);

  // Local Storage Engagement State
  const [engagement, setEngagement] = useState(() => getEngagementState(post.id));
  const [likesCount, setLikesCount] = useState(post.likes);
  const [dislikesCount, setDislikesCount] = useState(post.dislikes);

  useEffect(() => {
    setEngagement(getEngagementState(post.id));
  }, [post.id]);

  const handleLike = () => {
    const nextState = toggleLike(post.id);
    setEngagement(nextState);
    if (nextState.liked) {
      setLikesCount(prev => prev + 1);
      if (engagement.disliked) setDislikesCount(prev => Math.max(0, prev - 1));
    } else {
      setLikesCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleDislike = () => {
    const nextState = toggleDislike(post.id);
    setEngagement(nextState);
    if (nextState.disliked) {
      setDislikesCount(prev => prev + 1);
      if (engagement.liked) setLikesCount(prev => Math.max(0, prev - 1));
    } else {
      setDislikesCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleFavorite = () => {
    const nextState = toggleFavorite(post.id);
    setEngagement(nextState);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط المقال للحافظة!');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        type="article"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'بلوق سعيد', link: '/blog' },
            { label: post.title }
          ]}
        />

        {/* Article Meta Header */}
        <div className="space-y-4 text-right mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-[#D51F2B]/15 border border-[#D51F2B]/30 text-xs font-semibold text-[#D51F2B] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{post.category}</span>
            </span>

            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{post.date}</span>
            </span>

            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>وقت القراءة: {post.readingTime}</span>
            </span>

            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-500" />
              <span>الكاتب: {post.author}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            {post.excerpt}
          </p>

          {/* Engagement Actions Bar */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-b border-white/10 py-3">
            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  engagement.liked
                    ? 'bg-[#D51F2B] border-[#D51F2B] text-white'
                    : 'bg-[#151515] border-white/10 text-gray-300 hover:text-white hover:border-[#D51F2B]'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>إعجاب ({likesCount})</span>
              </button>

              {/* Dislike Button */}
              <button
                onClick={handleDislike}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  engagement.disliked
                    ? 'bg-[#220709] border-[#D51F2B] text-[#D51F2B]'
                    : 'bg-[#151515] border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>لم يعجبني ({dislikesCount})</span>
              </button>

              {/* Save / Favorite Button */}
              <button
                onClick={handleFavorite}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  engagement.favorited
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-[#151515] border-white/10 text-gray-300 hover:text-amber-400'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>{engagement.favorited ? 'تم الحفظ في المحفوظات' : 'حفظ المقال'}</span>
              </button>
            </div>

            {/* Share Action */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#151515] border border-white/10 text-xs text-gray-300 hover:text-white hover:border-[#D51F2B] transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#D51F2B]" />
              <span>مشاركة المقال</span>
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121212] mb-8">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Article Content Paragraphs & Quotes */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 space-y-6 text-right mb-10">
          {post.contentParagraphs.map((para, idx) => (
            <div key={idx} className="space-y-3">
              {post.headings && post.headings[idx] && (
                <h2 className="text-xl font-bold text-white pt-3 border-r-2 border-[#D51F2B] pr-3">
                  {post.headings[idx]}
                </h2>
              )}
              <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
                {para}
              </p>

              {/* Quote Block if available */}
              {post.quotes && post.quotes[idx] && (
                <blockquote className="p-5 my-4 rounded-xl bg-[#1c0608] border-r-4 border-[#D51F2B] flex items-start gap-3">
                  <Quote className="w-6 h-6 text-[#D51F2B] shrink-0 mt-1" />
                  <p className="text-sm sm:text-base font-semibold text-white italic">
                    "{post.quotes[idx]}"
                  </p>
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Media System */}
        <MediaSystem
          galleryImages={post.galleryImages}
          videos={post.videos}
          externalLinks={post.externalLinks}
        />

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/10 text-right space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D51F2B]" />
              <span>مقالات ذات صلة</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="group rounded-xl p-4 bg-[#121212] border border-white/10 hover:border-[#D51F2B] transition-all space-y-3"
                >
                  <img src={rel.coverImage} alt={rel.title} className="w-full h-32 object-cover rounded-lg" />
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
