import React, { useEffect, useRef } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { AdvancedAdminControls } from './AdvancedAdminControls';

export const AdminEnhancements: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { saveChanges, hasUnsavedChanges, isSaving } = useCMS();
  const rootRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<{ index: number; start: number | null; end: number | null } | null>(null);
  const rememberFocus = () => { const root=rootRef.current; const active=document.activeElement as HTMLInputElement|HTMLTextAreaElement|null; if(!root||!active||!root.contains(active)||!['INPUT','TEXTAREA'].includes(active.tagName))return; const fields=Array.from(root.querySelectorAll<HTMLInputElement|HTMLTextAreaElement>('input:not([type="file"]), textarea')); const index=fields.indexOf(active); if(index>=0)focusRef.current={index,start:active.selectionStart,end:active.selectionEnd}; };
  useEffect(()=>{const saved=focusRef.current;if(!saved||document.activeElement?.tagName==='INPUT'||document.activeElement?.tagName==='TEXTAREA')return;const fields=Array.from(rootRef.current?.querySelectorAll<HTMLInputElement|HTMLTextAreaElement>('input:not([type="file"]), textarea')||[]);const field=fields[saved.index];if(field){field.focus({preventScroll:true});if(saved.start!==null&&saved.end!==null){try{field.setSelectionRange(saved.start,saved.end)}catch{}}}});
  return <div ref={rootRef} onInputCapture={rememberFocus} className="min-h-screen">
    {children}<AdvancedAdminControls/>
    {hasUnsavedChanges&&<div className="fixed bottom-4 left-1/2 z-[190] w-[calc(100%-24px)] max-w-md -translate-x-1/2" dir="rtl"><div className="flex items-center gap-3 rounded-2xl border border-amber-400/25 bg-[#111]/95 p-2.5 shadow-2xl backdrop-blur-xl"><button type="button" disabled={isSaving} onClick={saveChanges} className="flex grow items-center justify-center gap-2 rounded-xl bg-[#D51F2B] px-5 py-3 text-sm font-black text-white disabled:opacity-60"><Save className="h-4 w-4"/>{isSaving?'جارٍ الحفظ...':'احفظ التعديلات'}</button><span className="flex shrink-0 items-center gap-1.5 px-1 text-[11px] text-amber-300"><AlertCircle className="h-3.5 w-3.5"/> غير محفوظ</span></div></div>}
  </div>;
};