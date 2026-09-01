import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MediaSystem } from '../components/MediaSystem';
import { Wrench, Copy, Check, Download, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

export const ToolDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  // Find tool by slug or id
  const tool = siteData.tools.find(t => t.slug === slug || t.id === slug) || siteData.tools[0];

  // Related tools
  const relatedTools = siteData.tools.filter(t => t.id !== tool.id && t.category === tool.category).slice(0, 3);

  const handleCopyPrompt = () => {
    if (tool.promptText) {
      navigator.clipboard.writeText(tool.promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20">
      <SEO
        title={tool.name}
        description={tool.description || tool.name}
        image={tool.image}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'أدوات سعيد', link: '/resources' },
            { label: tool.name }
          ]}
        />

        {/* Tool Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#180305] via-[#100203] to-[#080808] border border-white/10 p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-right">
              <span className="px-3.5 py-1 rounded-full bg-[#D51F2B]/15 border border-[#D51F2B]/30 text-xs font-semibold text-[#D51F2B] inline-flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>{tool.category}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl font-black text-white">
                {tool.name}
              </h1>

              <p className="text-gray-300 text-sm sm:text-base font-light">
                {tool.description}
              </p>
            </div>

            <img
              src={tool.image}
              alt={tool.name}
              className="w-32 h-32 object-cover rounded-2xl border border-white/10 shadow-lg shrink-0"
            />
          </div>
        </div>

        {/* Category Specific Actions & Details */}

        {/* 1. Prompt Specific Block */}
        {tool.category === 'البرومبت' && tool.promptText && (
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#D51F2B]/30 space-y-4 text-right mb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">Prompt Copy Box</span>
              <h3 className="text-sm font-bold text-white">النص والأمر (Prompt)</h3>
            </div>
            
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 font-mono text-xs text-gray-200 leading-relaxed dir-ltr text-left overflow-x-auto select-all">
              {tool.promptText}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D51F2B] text-white text-xs font-bold hover:bg-[#B5121B] transition-all cursor-pointer shadow-red-glow"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ بنجاح!' : 'نسخ البرومبت الأن'}</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. Filter Before / After Comparison */}
        {tool.category === 'الفلاتر' && tool.filterBeforeAfter && (
          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 text-right mb-8">
            <h3 className="text-sm font-bold text-white">معاينة قبل وبعد الفلتر</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs text-gray-400 block text-center">قبل الفلتر</span>
                <img src={tool.filterBeforeAfter.before} alt="قبل" className="w-full h-48 object-cover rounded-xl border border-white/10" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#D51F2B] block text-center">بعد فلتر SBA السينمائي</span>
                <img src={tool.filterBeforeAfter.after} alt="بعد" className="w-full h-48 object-cover rounded-xl border border-[#D51F2B]" />
              </div>
            </div>
          </div>
        )}

        {/* 3. Wallpaper Resolution & Download */}
        {tool.category === 'خلفيات الجوال' && tool.wallpaperResolution && (
          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3 text-right mb-8">
            <h3 className="text-sm font-bold text-white">دقة وتفاصيل الخلفية</h3>
            <p className="text-xs text-gray-300">الدقة الحالية: <span className="font-bold text-[#D51F2B]">{tool.wallpaperResolution}</span></p>
            {tool.downloadUrl && (
              <a
                href={tool.downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D51F2B] text-white text-xs font-bold hover:bg-[#B5121B] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>تنزيل الخلفية بالدقة الكاملة 4K</span>
              </a>
            )}
          </div>
        )}

        {/* General Tool Overview & Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-right">
          {/* What it does */}
          {tool.whatItDoes && (
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#D51F2B]" />
                <span>ماذا تقدم هذه الأداة؟</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {tool.whatItDoes}
              </p>
            </div>
          )}

          {/* Compatibility & Requirements */}
          {(tool.compatibility || tool.requirements) && (
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D51F2B]" />
                <span>التوافق والمتطلبات</span>
              </h3>
              <div className="space-y-2 text-xs text-gray-300">
                {tool.compatibility && (
                  <div>
                    <span className="font-semibold text-white">الأجهزة المتوافقة: </span>
                    <span>{tool.compatibility.join(' • ')}</span>
                  </div>
                )}
                {tool.requirements && (
                  <div>
                    <span className="font-semibold text-white">المتطلبات: </span>
                    <span>{tool.requirements.join(' • ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Instructions / How to use */}
        {(tool.howToUse || tool.shortcutSetupGuide) && (
          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 text-right mb-8">
            <h3 className="text-sm font-bold text-white">طريقة الاستخدام والخطوات</h3>
            <ol className="space-y-2 text-xs sm:text-sm text-gray-300 list-decimal list-inside leading-relaxed">
              {(tool.howToUse || tool.shortcutSetupGuide)?.map((step, idx) => (
                <li key={idx} className="p-2.5 rounded-lg bg-[#181818] border border-white/5">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Media & Downloads */}
        <MediaSystem
          galleryImages={tool.screenshots}
          videos={tool.videoTutorial ? [tool.videoTutorial] : undefined}
          externalLinks={tool.externalLinks}
          downloads={tool.downloadUrl ? [{ title: `تنزيل ${tool.name}`, url: tool.downloadUrl }] : undefined}
        />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/10 text-right space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#D51F2B]" />
              <span>أدوات ذات صلة</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/tools/${rel.slug}`}
                  className="group rounded-xl p-4 bg-[#121212] border border-white/10 hover:border-[#D51F2B] transition-all space-y-3"
                >
                  <img src={rel.image} alt={rel.name} className="w-full h-32 object-cover rounded-lg" />
                  <span className="text-[11px] text-[#D51F2B] font-semibold">{rel.category}</span>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#D51F2B] transition-colors line-clamp-2">
                    {rel.name}
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
