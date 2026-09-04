import React from 'react';
import { ArrowRight, ArrowUpLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { defaultSaeedPlatform, SaeedPlatform } from '../components/SaeedPlatformSection';

export const SaeedPlatformPage:React.FC=()=>{
 const {id}=useParams(); const {data}=useCMS(); const platform:SaeedPlatform=(data.global as any).saeedPlatform||defaultSaeedPlatform;
 const item=(platform.items||[]).find(x=>x.id===id&&x.enabled);
 if(!item)return <div className="mx-auto max-w-5xl px-5 py-32 text-center" dir="rtl"><h1 className="text-3xl font-black">القسم غير متاح</h1><a href="/#saeed-world" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-5 py-3 text-sm font-bold"><ArrowRight className="h-4 w-4"/>العودة لعالم سعيد</a></div>;
 return <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32" dir="rtl">
  <a href="/#saeed-world" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"><ArrowRight className="h-4 w-4"/>عالم سعيد</a>
  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010]">
   {item.imageUrl&&<img src={item.imageUrl} alt={item.title} className="max-h-[520px] w-full object-cover"/>}
   {item.videoUrl&&<video src={item.videoUrl} controls playsInline className="max-h-[620px] w-full bg-black object-contain"/>}
   <div className="p-7 sm:p-12"><span className="rounded-full bg-[#D51F2B]/10 px-3 py-1 text-xs font-black text-[#E52E3C]">{item.badge}</span><h1 className="mt-5 text-4xl font-black sm:text-6xl">{item.title}</h1><p className="mt-6 max-w-3xl whitespace-pre-wrap text-base leading-9 text-gray-400 sm:text-lg">{item.description}</p><div className="mt-9 flex flex-wrap gap-3">{(item.buttons||[]).filter(b=>b.enabled&&b.label).map((b,i)=><a key={i} href={b.url&&b.url!=='#'?b.url:`/saeed/${item.id}`} className="inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-5 py-3 text-sm font-black">{b.label}<ArrowUpLeft className="h-4 w-4"/></a>)}</div></div>
  </div>
 </div>
};
