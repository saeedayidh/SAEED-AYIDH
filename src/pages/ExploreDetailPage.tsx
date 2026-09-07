import React from 'react';
import {ArrowRight,Briefcase,Newspaper} from 'lucide-react';
import {useNavigate,useParams} from 'react-router-dom';

type Detail={title:string;description:string;type:'work'|'news'};

const details:Record<string,Detail>={
  'work/demo-work-1':{type:'work',title:'حملة تسويقية تجريبية',description:'نموذج عمل تجريبي يوضح طريقة عرض المشروع والنتائج.'},
  'work/demo-work-2':{type:'work',title:'واجهة مشروع تجريبية',description:'نموذج لتصميم واجهة رقمية مع تفاصيل مختصرة.'},
  'work/demo-work-3':{type:'work',title:'تغطية فعالية تجريبية',description:'نموذج لتغطية ميدانية مع معلومات العمل.'},
  'news/demo-news-1':{type:'news',title:'إعلان مشروع جديد',description:'خبر تجريبي يوضح شكل أخبار المشاريع والإعلانات.'},
  'news/demo-news-2':{type:'news',title:'تغطية فعالية جديدة',description:'خبر تجريبي عن تغطية أو فعالية شارك فيها سعيد.'},
  'news/demo-news-3':{type:'news',title:'تحديث جديد في الموقع',description:'خبر تجريبي عن تحديث أو ميزة جديدة تمت إضافتها.'},
};

export const ExploreDetailPage:React.FC=()=>{
  const{type,id}=useParams();
  const nav=useNavigate();
  const item=details[`${type}/${id}`];
  if(!item)return <div className="min-h-screen bg-[#080808] px-5 pt-32 text-center" dir="rtl"><h1 className="text-3xl font-black">العنصر غير متاح</h1><button onClick={()=>nav(-1)} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-5 py-3 text-sm font-bold"><ArrowRight className="h-4 w-4"/>الرجوع</button></div>;
  const Icon=item.type==='work'?Briefcase:Newspaper;
  return <div className="min-h-screen bg-[#080808] px-5 pb-24 pt-32" dir="rtl"><div className="mx-auto max-w-5xl"><button onClick={()=>nav(-1)} className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-4 py-2.5 text-sm font-bold transition hover:border-[#D51F2B]/60"><ArrowRight className="h-4 w-4 text-[#D51F2B]"/>الرجوع</button><div className="overflow-hidden rounded-3xl border border-white/10 bg-[#101010]"><div className="grid min-h-72 place-items-center bg-[#080808] text-gray-700"><Icon className="h-12 w-12"/></div><div className="p-7 sm:p-10"><span className="text-xs font-black text-[#D51F2B]">{item.type==='work'?'أعمال سعيد':'أخبار سعيد'}</span><h1 className="mt-3 text-3xl font-black sm:text-5xl">{item.title}</h1><p className="mt-5 max-w-3xl text-sm leading-8 text-gray-400 sm:text-base">{item.description}</p></div></div></div></div>;
};