import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { siteData } from '../data/siteData';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-[#D51F2B] bg-[#191919] px-4 py-1.5 rounded-full border border-white/10">
          التواصل المباشر
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">تواصل مع سعيد بن عايض</h1>
        <p className="text-base sm:text-lg text-[#B8B8B8] font-light max-w-xl mx-auto">
          أرحب باستفساراتك، مقترحات المشاريع، وفرص التعاون والتغطيات.
        </p>
      </div>

      <div className="sba-card p-8 sm:p-12">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 text-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  placeholder="أدخل اسمك الكريم..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D51F2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  placeholder="example@domain.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D51F2B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-2">موضوع التواصل / اسم المشروع</label>
              <input
                type="text"
                required
                placeholder="عنوان استفسارك أو مشروعك..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D51F2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-2">التفاصيل والرسالة</label>
              <textarea
                rows={5}
                required
                placeholder="اكتب تفاصيل الاستفسار أو الطلب..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D51F2B]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="sba-btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black text-white">تم إرسال رسالتك بنجاح!</h3>
            <p className="text-sm text-[#B8B8B8] max-w-md mx-auto">
              شكراً لتواصلك مع سعيد بن عايض. سيتم مراجعة رسالتك والتواصل معك في أقرب وقت.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="sba-btn-secondary px-6 py-2.5 text-xs inline-block cursor-pointer"
            >
              إرسال رسالة أخرى
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
