import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageSquare, Send, Tag, Sparkles } from 'lucide-react';
import { siteData } from '../data/siteData';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const service = siteData.services.find((s) => s.id === id) || siteData.services[0];

  const handleWhatsappContact = () => {
    const text = encodeURIComponent(`مرحباً سعيد بن عايض، أود الاستفسار عن خدمة: ${service.title}`);
    window.open(`https://wa.me/${siteData.brand.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151515] border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:border-[#D51F2B] transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 text-[#D51F2B]" />
          <span>الرجوع للخدمات</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Right Side: Service Details */}
        <div className="lg:col-span-7 space-y-8 text-right">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
              <Tag className="w-3.5 h-3.5" />
              <span>{service.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {service.title}
            </h1>

            {/* Price Badge */}
            <div className="inline-block px-5 py-2.5 rounded-2xl bg-[#280305] border border-[#D51F2B]/40">
              <span className="text-xs text-gray-300 ml-2">سعر الخدمة:</span>
              <span className="text-xl sm:text-2xl font-black text-[#D51F2B]">{service.price}</span>
            </div>

            <p className="text-base sm:text-lg text-[#B8B8B8] leading-relaxed font-light pt-2">
              {service.description}
            </p>
          </div>

          {/* Service Features Section */}
          <div className="sba-card p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D51F2B]" />
              <span>مميزات الخدمة</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#080808] border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-[#D51F2B] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Contact Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleWhatsappContact}
              className="sba-btn-primary px-8 py-4 text-sm flex items-center gap-3 cursor-pointer shadow-red-glow"
            >
              <MessageSquare className="w-5 h-5" />
              <span>تواصل الآن عبر الواتساب</span>
            </button>

            <Link
              to="/contact"
              className="sba-btn-secondary px-8 py-4 text-sm flex items-center gap-2.5 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#D51F2B]" />
              <span>تواصل معنا عبر النموذج</span>
            </Link>
          </div>

        </div>

        {/* Left Side: Service Image Box */}
        <div className="lg:col-span-5">
          <div className="sba-card p-3 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-80 sm:h-96 object-cover rounded-xl border border-white/10"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
