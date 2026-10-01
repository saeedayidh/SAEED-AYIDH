import React from 'react';
import type { SmartLinkTheme } from '../lib/smartLinks';

export async function prepareSmartImage(file: File, banner: boolean) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) throw new Error('image');
  const source = URL.createObjectURL(file);
  try {
    const image = new Image(); image.src = source;
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error('image')); });
    const ratio = Math.min(1, (banner ? 1280 : 600) / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio)); canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
    canvas.getContext('2d')!.drawImage(image, 0, 0, canvas.width, canvas.height);
    const result = canvas.toDataURL('image/webp', .85);
    if (result.length > 1400000) throw new Error('image');
    return result;
  } finally { URL.revokeObjectURL(source); }
}

export function SmartLinkAppearance({ theme, onChange, isArabic, onImage, onRemove, avatar, banner }: {
  theme: SmartLinkTheme; onChange: (theme: SmartLinkTheme) => void; isArabic: boolean;
  onImage: (file: File, banner: boolean) => void; onRemove: (banner: boolean) => void; avatar?: string; banner?: string;
}) {
  const colors = [['background', 'الخلفية', 'Background'], ['card', 'بطاقات الروابط', 'Link cards'], ['text', 'النص الرئيسي', 'Main text'], ['secondary', 'النص الثانوي', 'Secondary text'], ['accent', 'لون التمييز', 'Accent']] as const;
  return <div className="space-y-5 rounded-2xl border border-white/10 bg-[#101010] p-5">
    <h2 className="text-sm font-black text-white">{isArabic ? 'الصورة والبنر والألوان' : 'Photo, banner and colors'}</h2>
    <div className="grid gap-4 sm:grid-cols-2">{[false, true].map(isBanner => <div key={String(isBanner)}>
      <label className="block text-xs font-bold text-gray-400">{isBanner ? (isArabic ? 'بنر الصفحة (اختياري)' : 'Banner (optional)') : (isArabic ? 'الصورة الشخصية (اختياري)' : 'Profile photo (optional)')}
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) onImage(file, isBanner); event.target.value = ''; }} className="mt-2 block w-full text-[10px] text-gray-500 file:me-2 file:rounded-lg file:border-0 file:bg-[#222] file:px-3 file:py-2 file:text-xs file:text-white"/>
      </label>{(isBanner ? banner : avatar) && <button type="button" onClick={() => onRemove(isBanner)} className="mt-2 text-[11px] text-[#ED1C2E]">{isArabic ? 'إزالة الصورة' : 'Remove image'}</button>}
    </div>)}</div>
    <p className="text-[11px] leading-6 text-gray-500">{isArabic ? 'JPG أو PNG أو WebP، حتى 10 ميجابايت. تظهر الصورة الشخصية فوق البنر، وتُستخدم صورة شخص افتراضية إذا تركتها فارغة.' : 'JPG, PNG or WebP, up to 10 MB. Your photo overlaps the banner; a generic person icon appears when no photo is added.'}</p>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{colors.map(([key, ar, en]) => <label key={key} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#151515] p-2 text-[11px] text-gray-400"><input type="color" value={theme[key]} onChange={event => onChange({ ...theme, [key]: event.target.value })} className="h-8 w-8 shrink-0 cursor-pointer bg-transparent"/><span>{isArabic ? ar : en}</span></label>)}</div>
    <label className="block text-xs text-gray-400">{isArabic ? 'قوة لون التمييز' : 'Accent intensity'} <span>{theme.intensity}%</span><input type="range" min="0" max="100" value={theme.intensity} onChange={event => onChange({ ...theme, intensity: Number(event.target.value) })} className="mt-3 w-full accent-[#D51F2B]"/></label>
  </div>;
}
