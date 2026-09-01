import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Paperclip } from 'lucide-react';

export const ComplaintPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] border border-white/10 text-xs font-semibold text-[#D51F2B]">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>مركز معالجة البلاغات</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">بطاقة شكاوي</h1>
        <p className="text-base sm:text-lg text-[#B8B8B8] font-light max-w-xl mx-auto">
          واجهتك مشكلة أو عندك شكوى؟ أرسل التفاصيل وسأراجعها بأقرب وقت.
        </p>
      </div>

      <div className="sba-card p-8 sm:p-12 border-[#D51F2B]/30">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 text-right">
            
            {/* Required Field: الاسم */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-2">
                الاسم <span className="text-[#D51F2B]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="أدخل اسمك الكريم..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D51F2B]"
              />
            </div>

            {/* Required Field: البريد الإلكتروني */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-2">
                البريد الإلكتروني <span className="text-[#D51F2B]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="example@domain.com"
                className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D51F2B]"
              />
            </div>

            {/* Required Field: قسم الشكوى */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-2">
                قسم الشكوى <span className="text-[#D51F2B]">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D51F2B]"
              >
                <option value="">اختر قسم الشكوى...</option>
                <option value="content">قسم المحتوى والمرئيات</option>
                <option value="services">قسم الخدمات والتطوير</option>
                <option value="tools">قسم الأدوات والتنزيلات</option>
                <option value="tech">مشكلة تقنية في الموقع</option>
                <option value="other">قسم بلاغات عامة</option>
              </select>
            </div>

            {/* Required Field: الرسالة */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-2">
                الرسالة وتفاصيل الشكوى <span className="text-[#D51F2B]">*</span>
              </label>
              <textarea
                rows={5}
                required
                placeholder="اكتب تفاصيل الشكوى أو المشكلة بالتفصيل..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D51F2B]"
              ></textarea>
            </div>

            {/* Optional Field: المرفق (صورة / فيديو / ملف) */}
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">
                المرفق (اختياري - صورة / فيديو / ملف)
              </label>
              <div className="relative flex items-center justify-between p-3.5 rounded-xl bg-[#080808] border border-dashed border-white/20 text-xs text-gray-400 hover:border-[#D51F2B] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Paperclip className="w-4 h-4 text-[#D51F2B]" />
                  <span>{fileName ? `الملف المحدد: ${fileName}` : 'انقر لرفع صورة، فيديو، أو مستند...'}</span>
                </div>
                <input
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="sba-btn-primary w-full py-4 text-sm font-bold cursor-pointer disabled:opacity-50"
            >
              {loading ? 'جاري إرسال الشكوى...' : 'تقديم شكوى'}
            </button>
          </form>
        ) : (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black text-white">تم تقديم شكواك بنجاح!</h3>
            <p className="text-sm text-[#B8B8B8] max-w-md mx-auto">
              سيتم مراجعة الشكوى والمرفقات من قبل قسم المعالجة والرد عليك في أقرب وقت.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFileName('');
              }}
              className="sba-btn-secondary px-6 py-2.5 text-xs inline-block cursor-pointer"
            >
              تقديم شكوى أخرى
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
