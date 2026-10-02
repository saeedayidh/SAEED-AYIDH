import React,{useEffect,useRef}from'react';
import{Link}from'react-router-dom';
import{Briefcase,ChevronLeft,ExternalLink}from'lucide-react';
import{useLanguage}from'../context/LanguageContext';
import{FavoriteButton}from'./FavoriteButton';
import{ShareButton}from'./ShareButton';
import{featuredWorks}from'../data/worksData';

export const PortfolioSection:React.FC=()=>{const{isArabic}=useLanguage();
 const rail=useRef<HTMLDivElement>(null);
 const gesture=useRef<{x:number;scroll:number;pointer:number}|null>(null);
 const dragged=useRef(false),paused=useRef(false),focused=useRef(false);
 useEffect(()=>{
  if(featuredWorks.length<2||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const timer=window.setInterval(()=>{
   const node=rail.current;if(!node||gesture.current||paused.current||focused.current)return;
   const max=node.scrollWidth-node.clientWidth;if(max<=1)return;
   const step=(node.firstElementChild as HTMLElement).offsetWidth+24;
   node.scrollTo({left:node.scrollLeft>=max-4?0:Math.min(max,node.scrollLeft+step),behavior:'smooth'});
  },4600);
  return()=>window.clearInterval(timer);
 },[]);
 return <section id="portfolio-section" className="relative border-t border-white/5 bg-[#080808] py-24" dir={isArabic?'rtl':'ltr'}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 text-center"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#191919] px-4 py-1.5 text-xs font-semibold text-[#D51F2B]"><Briefcase className="h-3.5 w-3.5"/><span>{isArabic?'معرض الأعمال':'Portfolio'}</span></div><h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">{isArabic?'أعمال سعيد':'Saeed Works'}</h2><p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-[#B8B8B8] sm:text-lg">{isArabic?'أعمال ومشاريع سعيد الرقمية.':'Saeed’s digital work and projects.'}</p></div><div ref={rail} dir="ltr" role="region" aria-label={isArabic?'أعمال سعيد — اسحب لاستعراض الأعمال':'Saeed Works — swipe to browse'} tabIndex={0}
 className="flex items-stretch gap-6 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
 onPointerEnter={e=>{if(e.pointerType==='mouse')paused.current=true}} onPointerLeave={()=>{paused.current=false}}
 onFocusCapture={()=>{focused.current=true}} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))focused.current=false}}
 onPointerDown={e=>{dragged.current=false;if(e.button===0)gesture.current={x:e.clientX,scroll:e.currentTarget.scrollLeft,pointer:e.pointerId}}}
 onPointerMove={e=>{const g=gesture.current;if(e.pointerType!=='mouse'||!g||g.pointer!==e.pointerId)return;const delta=e.clientX-g.x;if(Math.abs(delta)>8){dragged.current=true;e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.scrollLeft=g.scroll-delta;e.preventDefault()}}}
 onPointerUp={()=>{gesture.current=null}} onPointerCancel={()=>{gesture.current=null}}
 onClickCapture={e=>{if(dragged.current){e.preventDefault();e.stopPropagation()}}} onDragStart={e=>e.preventDefault()}>
{featuredWorks.map((work:any)=>{const url=`/work/${work.slug}`;return <article key={work.id} dir={isArabic?'rtl':'ltr'} className="sba-card relative flex w-[78%] shrink-0 flex-col overflow-hidden p-4 sm:w-[46%] sm:p-6"><FavoriteButton id={`work-${work.id}`} title={work.title} url={url} type={isArabic?'عمل':'Work'} className="absolute left-4 top-4 z-10"/><ShareButton title={work.title} url={url} className="absolute left-14 top-4 z-10"/><div className="mb-5 flex aspect-[2/1] w-full shrink-0 items-center justify-center"><img src={work.bannerUrl} alt={work.title} className="block h-auto max-h-full w-full rounded-2xl border border-white/10 object-contain" loading="lazy"/></div><div className="mb-3 flex min-h-12 shrink-0 items-center gap-3"><img src={work.logoUrl} alt={work.title} className="h-12 w-12 shrink-0 object-contain" loading="lazy"/><h3 className="text-xl font-black text-white">{work.title}</h3></div><p className="mt-2 flex-1 text-sm leading-7 text-[#B8B8B8]">{isArabic?work.shortDescription:work.shortDescriptionEn}</p><div className={`mt-6 grid gap-3 border-t border-white/5 pt-5 ${work.previewUrl?'sm:grid-cols-2':''}`}>{work.previewUrl&&<a href={work.previewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-[#D51F2B]/40 bg-[#D51F2B]/15 px-5 py-3 text-xs font-black text-white hover:bg-[#D51F2B]/25"><ExternalLink className="h-4 w-4 text-[#D51F2B]"/>{isArabic?'معاينة العمل':'Preview Work'}</a>}<Link to={url} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#191919] px-5 py-3 text-xs font-black text-white hover:border-[#D51F2B]">{isArabic?'استكشاف':'Explore'}<ChevronLeft className="h-4 w-4 text-[#D51F2B]"/></Link></div></article>})}</div></div></section>};