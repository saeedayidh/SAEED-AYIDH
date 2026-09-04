import React, { useEffect, useRef } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AdminEnhancements: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { saveChanges, hasUnsavedChanges, isSaving, lastSavedAt } = useCMS();
  const rootRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<{ index: number; start: number | null; end: number | null } | null>(null);

  const rememberFocus = () => {
    const root = rootRef.current;
    const active = document.activeElement as HTMLInputElement | HTMLTextAreaElement | null;
    if (!root || !active || !root.contains(active) || !['INPUT', 'TEXTAREA'].includes(active.tagName)) return;
    const fields = Array.from(root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input:not([type="file"]), textarea'));
    const index = fields.indexOf(active);
    if (index >= 0) focusRef.current = { index, start: active.selectionStart, end: active.selectionEnd };
  };

  useEffect(() => {
    const saved = focusRef.current;
    if (!saved || document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
    const fields = Array.from(rootRef.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input:not([type="file"]), textarea') || []);
    const field = fields[saved.index];
    if (field) {
      field.focus({ preventScroll: true });
      if (saved.start !== null && saved.end !== null) {
        try { field.setSelectionRange(saved.start, saved.end); } catch { /* unsupported input type */ }
      }
    }
  });

  return (
    <div ref={rootRef} onInputCapture={rememberFocus} className="min-h-screen">
      {children}
      <div className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-24px)] max-w-md -translate-x-1/2 lg:bottom-6 lg:left-6 lg:w-auto lg:translate-x-0" dir="rtl">
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-[#111]/95 p-2.5 shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            disabled={isSaving || !hasUnsavedChanges}
            onClick={saveChanges}
            className="flex grow items-center justify-center gap-2 rounded-xl bg-[#D51F2B] px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#2a2a2a] disabled:text-gray-500 lg:grow-0"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}
          </button>
          <div className="min-w-0 px-1 text-[11px]">
            {hasUnsavedChanges ? (
              <span className="flex items-center gap-1.5 text-amber-300"><AlertCircle className="h-3.5 w-3.5" /> توجد تعديلات غير محفوظة</span>
            ) : (
              <span className="flex items-center gap-1.5 text-green-400"><CheckCircle2 className="h-3.5 w-3.5" /> {lastSavedAt ? 'تم الحفظ' : 'لا توجد تعديلات'}</span>
            )}
          </div>
        </div>
      </div>
      <div className="h-24 lg:h-0" />
    </div>
  );
};
