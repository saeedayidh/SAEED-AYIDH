import React from 'react';
import { AlertTriangle, Lightbulb } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ActionCardsProps {
  lang: Language;
  onOpenComplaint: () => void;
  onOpenSuggestion: () => void;
}

export const ActionCards: React.FC<ActionCardsProps> = ({
  lang,
  onOpenComplaint,
  onOpenSuggestion,
}) => {
  const t = translations[lang].actionCardsSection;

  return (
    <section id="action-cards" className="py-16 relative border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Complaint Ticket Card */}
          <div className="group rounded-3xl glass-card-dark dark:glass-card-dark light:glass-card-light p-8 flex flex-col md:flex-row items-center gap-6 justify-between transition-all duration-300 hover:-translate-y-1">
            <div className="flex-1 text-right dir-rtl:text-right dir-ltr:text-left">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                  {t.complaintTitle}
                </h3>
              </div>
              <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed font-light mb-6">
                {t.complaintDesc}
              </p>
              <button
                onClick={onOpenComplaint}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 shadow-red-glow glow-button cursor-pointer"
              >
                {t.submitComplaint}
              </button>
            </div>

            {/* Warning Shield Graphic */}
            <div className="w-36 h-36 rounded-2xl bg-black/60 border border-red-900/40 flex items-center justify-center p-2 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
              <img
                src="/assets/card_complaint.png"
                alt="بطاقة شكوى"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Suggestion Ticket Card */}
          <div className="group rounded-3xl glass-card-dark dark:glass-card-dark light:glass-card-light p-8 flex flex-col md:flex-row items-center gap-6 justify-between transition-all duration-300 hover:-translate-y-1">
            <div className="flex-1 text-right dir-rtl:text-right dir-ltr:text-left">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                  {t.suggestionTitle}
                </h3>
              </div>
              <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed font-light mb-6">
                {t.suggestionDesc}
              </p>
              <button
                onClick={onOpenSuggestion}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 shadow-red-glow glow-button cursor-pointer"
              >
                {t.sendSuggestion}
              </button>
            </div>

            {/* Lightbulb Graphic */}
            <div className="w-36 h-36 rounded-2xl bg-black/60 border border-red-900/40 flex items-center justify-center p-2 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
              <img
                src="/assets/card_suggestion.png"
                alt="بطاقة اقتراح"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
