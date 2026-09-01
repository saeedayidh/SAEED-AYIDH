import React, { useState } from 'react';
import { Lightbulb, AlertTriangle, CheckCircle2, Paperclip, Send } from 'lucide-react';

export const ActionCardsSection: React.FC = () => {
  // Suggestion State
  const [sugSubmitted, setSugSubmitted] = useState(false);
  const [sugLoading, setSugLoading] = useState(false);
  const [sugFile, setSugFile] = useState<string>('');

  // Complaint State
  const [cmpSubmitted, setCmpSubmitted] = useState(false);
  const [cmpLoading, setCmpLoading] = useState(false);
  const [cmpFile, setCmpFile] = useState<string>('');

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSugLoading(true);
    setTimeout(() => {
      setSugLoading(false);
      setSugSubmitted(true);
    }, 1000);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCmpLoading(true);
    setTimeout(() => {
      setCmpLoading(false);
      setCmpSubmitted(true);
    }, 1000);
  };

  return (
    <section id="action-cards-section" className="py-20 relative bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Card 1: بطاقة اقتراح */}
          <div className="sba-card p-8 border-amber-500/30 flex flex-col justify-between">
            <div className="space-y-4 mb-6 text-right">
              <div className="flex items-center gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="text-2xl font-black text-white">بطاقة اقتراح</h3>
              </div>
              <p className="text-xs text-[#B8B8B8] leading-relaxed font-light">
                عندك فكرة أو اقتراح يساعدنا في تطوير الموقع أو المحتوى؟ شاركنا اقتراحك.
              </p>
            </div>

            {!sugSubmitted ? (
              <form onSubmit={handleSuggestionSubmit} className="space-y-4 text-right">
                
                {/* الاسم (مطلوب) */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    الاسم <span className="text-[#D51F2B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسمك..."
                    className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* البريد الإلكتروني (مطلوب) */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    البريد الإلكتروني <span className="text-[#D51F2B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* الرسالة (مطلوب) */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    الرسالة <span className="text-[#D51F2B]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="اكتب اقتراحك وفكرتك بالتفصيل..."
                    className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                {/* المرفق (اختياري - صورة / فيديو / ملف) */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1.5">
                    المرفق (اختياري - صورة / فيديو / ملف)
                  </label>
                  <div className="relative flex items-center justify-between p-3 rounded-xl bg-[#080808] border border-dashed border-white/20 text-xs text-gray-400 hover:border-amber-500 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-amber-500" />
                      <span className="truncate">{sugFile ? `الملف: ${sugFile}` : 'رفع صورة، فيديو، أو مستند...'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      onChange={(e) => e.target.files?.[0] && setSugFile(e.target.files[0].name)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sugLoading}
                  className="sba-btn-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sugLoading ? 'جاري إرسال الاقتراح...' : 'إرسال اقتراح'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">تم إرسال اقتراحك بنجاح!</h4>
                <p className="text-xs text-gray-400">شكراً لمشاركتك معنا في تطوير الخدمات والمحتوى.</p>
                <button
                  onClick={() => { setSugSubmitted(false); setSugFile(''); }}
                  className="sba-btn-secondary px-5 py-2 text-xs inline-block cursor-pointer"
                >
                  إرسال اقتراح آخر
                </button>
              </div>
            )}
          </div>

          {/* Card 2: بطاقة شكاوي */}
          <div className="sba-card p-8 border-[#D51F2B]/30 flex flex-col justify-between">
            <div className="space-y-4 mb-6 text-right">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-[#D51F2B]" />
                <h3 className="text-2xl font-black text-white">بطاقة شكاوي</h3>
              </div>
              <p className="text-xs text-[#B8B8B8] leading-relaxed font-light">
                واجهتك مشكلة أو عندك شكوى؟ أرسل التفاصيل وسأراجعها بأقرب وقت.
              </p>
            </div>

            {!cmpSubmitted ? (
              <form onSubmit={handleComplaintSubmit} className="space-y-4 text-right">
                
                {/* الاسم (مطلوب) */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    الاسم <span className="text-[#D51F2B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسمك..."
                    className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D51F2B]"
                  />
                </div>

                {/* البريد الإلكتروني (مطلوب) */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    البريد الإلكتروني <span className="text-[#D51F2B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D51F2B]"
                  />
                </div>

                {/* قسم الشكوى (مطلوب) */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    قسم الشكوى <span className="text-[#D51F2B]">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D51F2B]"
                  >
                    <option value="">اختر قسم الشكوى...</option>
                    <option value="content">قسم المحتوى والمرئيات</option>
                    <option value="services">قسم الخدمات والتطوير</option>
                    <option value="tools">قسم الأدوات والتنزيلات</option>
                    <option value="tech">مشكلة تقنية في الموقع</option>
                    <option value="other">قسم بلاغات عامة</option>
                  </select>
                </div>

                {/* الرسالة (مطلوب) */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    الرسالة <span className="text-[#D51F2B]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="اكتب تفاصيل المشكلة أو الشكوى..."
                    className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D51F2B]"
                  ></textarea>
                </div>

                {/* المرفق (اختياري - صورة / فيديو / ملف) */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1.5">
                    المرفق (اختياري - صورة / فيديو / ملف)
                  </label>
                  <div className="relative flex items-center justify-between p-3 rounded-xl bg-[#080808] border border-dashed border-white/20 text-xs text-gray-400 hover:border-[#D51F2B] transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-[#D51F2B]" />
                      <span className="truncate">{cmpFile ? `الملف: ${cmpFile}` : 'رفع صورة، فيديو، أو مستند...'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      onChange={(e) => e.target.files?.[0] && setCmpFile(e.target.files[0].name)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={cmpLoading}
                  className="sba-btn-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{cmpLoading ? 'جاري إرسال الشكوى...' : 'تقديم شكوى'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">تم تقديم شكواك بنجاح!</h4>
                <p className="text-xs text-gray-400">سيتم مراجعة بلاغك والمرفقات والرد عليك في أقرب وقت.</p>
                <button
                  onClick={() => { setCmpSubmitted(false); setCmpFile(''); }}
                  className="sba-btn-secondary px-5 py-2 text-xs inline-block cursor-pointer"
                >
                  تقديم شكوى أخرى
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
