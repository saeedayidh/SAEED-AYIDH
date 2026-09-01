import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MediaSystem } from '../components/MediaSystem';
import { Briefcase, Calendar, CheckCircle, ExternalLink, Target, Award, UserCheck } from 'lucide-react';

export const WorkDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find work item by slug or id
  const project = siteData.portfolio.find(p => p.slug === slug || p.id === slug) || siteData.portfolio[0];

  // Related work projects
  const relatedProjects = siteData.portfolio.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20">
      <SEO
        title={project.title}
        description={project.description}
        image={project.projectImage}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'أعمال سعيد', link: '/works' },
            { label: project.title }
          ]}
        />

        {/* Project Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#180305] via-[#100203] to-[#080808] border border-white/10 p-6 sm:p-10 mb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="w-full lg:w-[60%] space-y-4 text-right">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3.5 py-1 rounded-full bg-[#D51F2B]/15 border border-[#D51F2B]/30 text-xs font-semibold text-[#D51F2B] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{project.category}</span>
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>عام {project.year}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                {project.tagline || project.description}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
                <span className="font-semibold text-white">العميل:</span>
                <span className="px-3 py-1 rounded-lg bg-[#181818] border border-white/10 text-gray-200">{project.clientName}</span>
              </div>
            </div>

            <div className="w-full lg:w-[35%] flex justify-center">
              <img
                src={project.projectImage}
                alt={project.title}
                className="w-full max-w-[340px] h-auto rounded-2xl border border-white/10 shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Project Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8 text-right">
            {/* Overview */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-[#D51F2B]" />
                <span>نظرة عامة على المشروع (Overview)</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                {project.overview || project.description}
              </p>
            </div>

            {/* Challenge & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.challenge && (
                <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
                  <h3 className="text-sm font-bold text-white">التحدي والمشكلة</h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">{project.challenge}</p>
                </div>
              )}
              {project.myRole && (
                <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#D51F2B]" />
                    <span>دوري والمسؤوليات</span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">{project.myRole}</p>
                </div>
              )}
            </div>

            {/* What Was Delivered */}
            {project.delivered && project.delivered.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white">أبرز ما تم تسليمه وإنجازه</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.delivered.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#181818] border border-white/5 text-xs text-gray-200">
                      <CheckCircle className="w-4 h-4 text-[#D51F2B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results & Impact */}
            {project.results && project.results.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#180507] border border-[#D51F2B]/30 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#D51F2B]" />
                  <span>النتائج والأثر الملموس</span>
                </h3>
                <div className="space-y-2">
                  {project.results.map((res, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#111111] border border-white/10 text-xs text-gray-200 font-semibold">
                      {res}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media & Links */}
            <MediaSystem
              galleryImages={project.galleryImages}
              videos={project.videos}
              externalLinks={project.externalLinks}
            />
          </div>

          {/* Sidebar Metadata */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 text-right">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                تفاصيل بطاقة المشروع
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-400 block">العميل</span>
                  <span className="font-bold text-white">{project.clientName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">التصنيف</span>
                  <span className="font-bold text-[#D51F2B]">{project.category}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">السنة</span>
                  <span className="font-bold text-white">{project.year}</span>
                </div>
                {project.services && (
                  <div>
                    <span className="text-gray-400 block mb-1">الخدمات المستخدمة</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.services.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-[#1c1c1c] text-[11px] text-gray-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Client Logo Card */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 text-center space-y-3">
              <img src={project.logoImage} alt={project.clientName} className="w-20 h-20 object-contain mx-auto rounded-xl bg-[#181818] p-2" />
              <h4 className="text-xs font-bold text-white">{project.clientName}</h4>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/10 text-right space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#D51F2B]" />
              <span>مشاريع أعمال أخرى</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/work/${rel.slug}`}
                  className="group rounded-xl p-4 bg-[#121212] border border-white/10 hover:border-[#D51F2B] transition-all space-y-3"
                >
                  <img src={rel.projectImage} alt={rel.title} className="w-full h-36 object-cover rounded-lg" />
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
