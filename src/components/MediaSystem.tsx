import React, { useState } from 'react';
import { VideoEmbedItem, LinkItem } from '../types';
import { ExternalLink, Download, Play, Image as ImageIcon, X } from 'lucide-react';

interface MediaSystemProps {
  singleImage?: { url: string; caption?: string };
  galleryImages?: string[];
  videos?: VideoEmbedItem[];
  externalLinks?: LinkItem[];
  downloads?: { title: string; url: string; size?: string }[];
}

export const MediaSystem: React.FC<MediaSystemProps> = ({
  singleImage,
  galleryImages,
  videos,
  externalLinks,
  downloads
}) => {
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);

  return (
    <div className="w-full space-y-8 my-8">
      {/* 1. Single Featured Image */}
      {singleImage && (
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111111] group">
          <img
            src={singleImage.url}
            alt={singleImage.caption || 'صورة المحتوى'}
            className="w-full h-auto max-h-[480px] object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={() => setActiveLightbox(singleImage.url)}
          />
          {singleImage.caption && (
            <div className="p-3 bg-[#111111]/90 border-t border-white/10 text-xs text-gray-300 text-center">
              {singleImage.caption}
            </div>
          )}
        </div>
      )}

      {/* 2. Image Gallery (Grid + Lightbox) */}
      {galleryImages && galleryImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-300 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#D51F2B]" />
            <span>معرض الصور ({galleryImages.length})</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden border border-white/10 bg-[#141414] aspect-video group cursor-pointer"
                onClick={() => setActiveLightbox(imgUrl)}
              >
                <img
                  src={imgUrl}
                  alt={`معرض صورة ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs bg-[#D51F2B] text-white px-3 py-1 rounded-full font-semibold">توفير المعاينة</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Video Embeds */}
      {videos && videos.length > 0 && (
        <div className="space-y-4">
          {videos.map((vid, idx) => (
            <div key={idx} className="space-y-2">
              {vid.title && (
                <h4 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#D51F2B]" />
                  <span>{vid.title}</span>
                </h4>
              )}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                {vid.type === 'local' ? (
                  <video src={vid.url} controls className="w-full h-full object-cover" />
                ) : (
                  <iframe
                    src={vid.url}
                    title={vid.title || 'عرض الفيديو'}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Downloads Section */}
      {downloads && downloads.length > 0 && (
        <div className="space-y-3 p-5 rounded-2xl bg-[#141414] border border-[#D51F2B]/20">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-[#D51F2B]" />
            <span>الملفات القابلة للتنزيل</span>
          </h4>
          <div className="flex flex-col gap-3">
            {downloads.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#1c1c1c] border border-white/10 hover:border-[#D51F2B] hover:bg-[#220709] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D51F2B]/10 flex items-center justify-center text-[#D51F2B] group-hover:bg-[#D51F2B] group-hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">{item.title}</h5>
                    {item.size && <span className="text-[11px] text-gray-400">{item.size}</span>}
                  </div>
                </div>
                <span className="text-xs font-bold text-[#D51F2B] group-hover:translate-x-[-4px] transition-transform">تنزيل الأن ←</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 5. External Link Cards */}
      {externalLinks && externalLinks.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-2">
          {externalLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#181818] border border-white/15 text-xs text-gray-200 hover:text-white hover:border-[#D51F2B] hover:bg-[#200507] transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D51F2B]" />
              <span>{link.title}</span>
              {link.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D51F2B]/20 text-[#D51F2B] font-semibold">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveLightbox(null)}>
          <button className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-[#D51F2B] transition-colors">
            <X className="w-6 h-6" />
          </button>
          <img src={activeLightbox} alt="معاينة المكبرة" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        </div>
      )}
    </div>
  );
};
