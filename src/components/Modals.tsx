import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Lightbulb, Send, Download } from 'lucide-react';
import { Language, ToolItem } from '../types';
import { translations } from '../i18n/translations';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

// 1. Complaint Modal Component
export const ComplaintModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang].modals;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-card-dark dark:glass-card-dark light:glass-card-light p-6 sm:p-8 border border-red-900/50 shadow-2xl">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white bg-red-950/40 border border-red-900/40 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-red-950/80 border border-red-800/40 text-red-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                  {translations[lang].actionCardsSection.complaintTitle}
                </h3>
                <p className="text-xs text-gray-400">{translations[lang].actionCardsSection.complaintDesc}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-right dir-rtl:text-right dir-ltr:text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-300 light:text-gray-700 mb-1.5">{t.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-red-950/30 light:bg-gray-50 border border-red-900/40 light:border-gray-300 text-sm text-white light:text-gray-900 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 light:text-gray-700 mb-1.5">{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-red-950/30 light:bg-gray-50 border border-red-900/40 light:border-gray-300 text-sm text-white light:text-gray-900 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 light:text-gray-700 mb-1.5">{t.messageLabel}</label>
                <textarea
                  rows={4}
                  required
                  placeholder={t.complaintPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-red-950/30 light:bg-gray-50 border border-red-900/40 light:border-gray-300 text-sm text-white light:text-gray-900 focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 shadow-red-glow cursor-pointer disabled:opacity-50"
              >
                {loading ? t.submitting : t.submit}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h4 className="text-2xl font-extrabold text-white dark:text-white light:text-gray-900 mb-2">{t.successTitle}</h4>
            <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600 mb-6">{t.successDesc}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-red-700 hover:bg-red-600 cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Suggestion Modal Component
export const SuggestionModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang].modals;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-card-dark dark:glass-card-dark light:glass-card-light p-6 sm:p-8 border border-red-900/50 shadow-2xl">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white bg-red-950/40 border border-red-900/40 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-800/40 text-amber-500">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                  {translations[lang].actionCardsSection.suggestionTitle}
                </h3>
                <p className="text-xs text-gray-400">{translations[lang].actionCardsSection.suggestionDesc}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-right dir-rtl:text-right dir-ltr:text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-300 light:text-gray-700 mb-1.5">{t.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-red-950/30 light:bg-gray-50 border border-red-900/40 light:border-gray-300 text-sm text-white light:text-gray-900 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 light:text-gray-700 mb-1.5">{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-red-950/30 light:bg-gray-50 border border-red-900/40 light:border-gray-300 text-sm text-white light:text-gray-900 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 light:text-gray-700 mb-1.5">{t.messageLabel}</label>
                <textarea
                  rows={4}
                  required
                  placeholder={t.suggestionPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-red-950/30 light:bg-gray-50 border border-red-900/40 light:border-gray-300 text-sm text-white light:text-gray-900 focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 shadow-red-glow cursor-pointer disabled:opacity-50"
              >
                {loading ? t.submitting : t.submit}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h4 className="text-2xl font-extrabold text-white dark:text-white light:text-gray-900 mb-2">{t.successTitle}</h4>
            <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600 mb-6">{t.successDesc}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-red-700 hover:bg-red-600 cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Contact Modal Component
export const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang].modals;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-card-dark dark:glass-card-dark light:glass-card-light p-6 sm:p-8 border border-red-900/50 shadow-2xl">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white bg-red-950/40 border border-red-900/40 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-red-950/80 border border-red-800/40 text-red-500">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                  {translations[lang].nav.contact}
                </h3>
                <p className="text-xs text-gray-400">سعيد بن عايض | Saeed Bin Ayidh</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-right dir-rtl:text-right dir-ltr:text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-300 light:text-gray-700 mb-1.5">{t.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-red-950/30 light:bg-gray-50 border border-red-900/40 light:border-gray-300 text-sm text-white light:text-gray-900 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 light:text-gray-700 mb-1.5">{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-red-950/30 light:bg-gray-50 border border-red-900/40 light:border-gray-300 text-sm text-white light:text-gray-900 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 light:text-gray-700 mb-1.5">{t.messageLabel}</label>
                <textarea
                  rows={4}
                  required
                  placeholder={t.contactPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-red-950/30 light:bg-gray-50 border border-red-900/40 light:border-gray-300 text-sm text-white light:text-gray-900 focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 shadow-red-glow cursor-pointer disabled:opacity-50"
              >
                {loading ? t.submitting : t.submit}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h4 className="text-2xl font-extrabold text-white dark:text-white light:text-gray-900 mb-2">{t.successTitle}</h4>
            <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600 mb-6">{t.successDesc}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-red-700 hover:bg-red-600 cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 4. Tool Preview Modal Component
interface ToolModalProps {
  tool: ToolItem | null;
  onClose: () => void;
  lang: Language;
}

export const ToolPreviewModal: React.FC<ToolModalProps> = ({ tool, onClose, lang }) => {
  const t = translations[lang].modals;

  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl glass-card-dark dark:glass-card-dark light:glass-card-light p-6 sm:p-8 border border-red-900/50 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white bg-red-950/40 border border-red-900/40 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-950 text-white flex items-center justify-center mx-auto mb-5 shadow-red-glow">
          <Download className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">{tool.category}</span>
        <h3 className="text-2xl font-extrabold text-white dark:text-white light:text-gray-900 mb-3">{tool.titleKey}</h3>
        <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed mb-6">{tool.descKey}</p>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert(`تم تحويلك لتحميل أداة: ${tool.titleKey}`);
            onClose();
          }}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 flex items-center justify-center gap-2 shadow-red-glow cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{t.downloadBtn}</span>
        </a>
      </div>
    </div>
  );
};
