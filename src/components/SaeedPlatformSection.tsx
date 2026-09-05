import React from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';

export type PlatformButton={label:string;url:string;enabled:boolean;labelEn?:string};
export type PlatformItem={id:string;title:string;description:string;badge:string;imageUrl:string;videoUrl:string;enabled:boolean;order:number;buttons:PlatformButton[];titleEn?:string;descriptionEn?:string;badgeEn?:string;group?:string};
export type SaeedPlatform={enabled:boolean;badge:string;title:string;description:string;items:PlatformItem[]};
export const retiredPlatformIds=new Set(['now','content','collab','orders','newsroom','accounts','channels','tools','ai']);
export const platformGroups=[
 {id:'fields',ar:'مجالات سعيد',en:'Saeed Fields',descAr:'الألعاب والقصص والصوت وما ينشره سعيد.',descEn:'Gaming, stories, audio and everything Saeed publishes.'},
 {id:'services',ar:'خدمات سعيد',en:'Saeed Services',descAr:'الخدمات والملف الإعلامي.',descEn:'Services and media profile.'},
 {id:'projects',ar:'مشاريع سعيد',en:'Saeed Projects',descAr:'المشاريع والمواعيد والإطلاقات والأرقام.',descEn:'Projects, schedules, launches and milestones.'},
 {id:'centers',ar:'مراكز سعيد',en:'Saeed Centers',descAr:'الهوية الرقمية وروابط سعيد الرسمية.',descEn:'Saeed’s digital identity and official links.'},
 {id:'community',ar:'مجتمع سعيد',en:'Saeed Community',descAr:'اقتراحات الجمهور والتصويت والأسئلة والإشعارات والتحديثات.',descEn:'Suggestions, polls, questions, notifications and updates.'},
 {id:'tools',ar:'أدوات وموارد سعيد',en:'Saeed Tools & Resources',descAr:'الخلفيات والمختبر والبحث والمفضلة وتجربة العرض.',descEn:'Wallpapers, labs, search, favorites and viewing features.'}
];
const rows:[string,string,string,string,string,string,string][]=[
 ['archive','أرشيف سعيد','خط زمني مرتب لأعمال ومشاريع سعيد من البداية إلى اليوم.','الأرشيف','Saeed Archive','A timeline of Saeed’s work and projects.','fields'],
 ['play','سعيد بلاي','الألعاب والبثوث والكليبات وأبرز لحظات اللعب.','الألعاب','Saeed Play','Gaming, streams, clips and standout gameplay moments.','fields'],
 ['stories','قصص سعيد','مكتبة للقصص بتصنيفات وأغلفة وصفحات مستقلة.','القصص','Saeed Stories','A categorized story library with dedicated pages.','fields'],
 ['music','سعيد ميوزك','القصائد والشيلات والأعمال الصوتية في مكان واحد.','الصوت','Saeed Music','Poetry and audio releases in one place.','fields'],
 ['frame','سعيد فريم','خدمات التصوير والتغطيات والباقات ونماذج الأعمال.','التصوير','Saeed Frame','Photography, coverage packages and selected work.','services'],
 ['press','الملف الإعلامي','ملف إعلامي جاهز للشركات والجهات.','الإعلام','Press Kit','A ready-to-share media profile.','services'],
 ['schedule','جدول سعيد','المقاطع والبثوث والمشاريع والفعاليات القادمة.','القادم','Saeed Schedule','Upcoming videos, streams, projects and events.','projects'],
 ['countdown','عداد الإطلاق','عداد تنازلي لأي عمل أو مشروع جديد.','الإطلاق','Launch Countdown','Countdowns for upcoming releases and projects.','projects'],
 ['numbers','أعمال سعيد بالأرقام','إحصائيات المحتوى والمشاريع والخبرة والتغطيات.','الأرقام','Saeed in Numbers','Content, project and experience statistics.','projects'],
 ['projects','خريطة مشاريع سعيد','عرض مشاريع سعيد وعلاقة كل مشروع بالهوية الرئيسية.','المشاريع','Project Map','A visual map of Saeed’s projects.','projects'],
 ['id','هوية سعيد الرقمية','بطاقة رقمية شخصية قابلة للمشاركة مع رمز استجابة سريعة وروابط.','الهوية','Saeed Digital ID','A shareable digital identity card with QR and links.','centers'],
 ['ideas','اقتراح محتوى','استقبال اقتراحات القصص والفلوقات والألعاب والمقاطع.','الاقتراحات','Content Suggestions','Submit ideas for stories, vlogs, games and videos.','community'],
 ['polls','تصويت الجمهور','تصويت الجمهور على المحتوى القادم والاختيارات.','التصويت','Audience Polls','Vote on upcoming content and choices.','community'],
 ['questions','أسئلة سعيد','استقبال أسئلة الجمهور وعرض الإجابات المختارة.','الأسئلة','Saeed Q&A','Collect questions and publish selected answers.','community'],
 ['notify','إشعارات سعيد','اختيار أنواع المحتوى التي يريد الزائر متابعتها.','الإشعارات','Saeed Notifications','Choose which content to follow.','community'],
 ['whatsnew','ما الجديد؟','عرض آخر إضافات وتحديثات الموقع.','التحديثات','What’s New','See the latest site additions and updates.','community'],
 ['wallpapers','خلفيات سعيد','مكتبة خلفيات للجوال والكمبيوتر.','الخلفيات','Saeed Wallpapers','A wallpaper library for mobile and desktop.','tools'],
 ['labs','مختبر سعيد','تجارب الذكاء الاصطناعي والواجهات والأفكار الجديدة.','المختبر','Saeed Labs','Experiments in AI, interfaces and new ideas.','tools'],
 ['search','البحث الشامل','بحث واحد داخل القصص والأخبار والبلوق والأعمال والأدوات.','البحث','Universal Search','Search stories, news, blog posts, work and tools.','tools'],
 ['favorites','المفضلة','حفظ المحتوى والأدوات للرجوع لها لاحقًا.','المفضلة','Favorites','Save content and tools to revisit later.','tools'],
 ['cinema','الوضع السينمائي','تجربة مشاهدة وقراءة مظلمة ومركزة للمحتوى.','العرض','Cinema Mode','A focused dark viewing and reading experience.','tools'],
 ['analytics','إحصائيات الموقع','إحصائيات الإدارة عن الزيارات والاستخدام والطلبات.','الإحصائيات','Site Analytics','Admin insights for visits, usage and requests.','tools']
];
export const defaultPlatformItems:PlatformItem[]=rows.map((x,i)=>({id:x[0],title:x[1],description:x[2],badge:x[3],titleEn:x[4],descriptionEn:x[5],badgeEn:'',group:x[6],imageUrl:'',videoUrl:'',enabled:true,order:i+1,buttons:[{label:'استكشف',labelEn:'Explore',url:`/saeed/${x[0]}`,enabled:true}]}));
export const defaultSaeedPlatform:SaeedPlatform={enabled:true,badge:'',title:'',description:'',items:defaultPlatformItems};
const fallbackGroup:Record<string,string>={archive:'fields',play:'fields',stories:'fields',music:'fields',frame:'services',press:'services',schedule:'projects',countdown:'projects',numbers:'projects',projects:'projects',id:'centers',ideas:'community',polls:'community',questions:'community',notify:'community',whatsnew:'community',wallpapers:'tools',labs:'tools',search:'tools',favorites:'tools',cinema:'tools',analytics:'tools'};
export const SaeedPlatformSection:React.FC=()=>{const{data}=useCMS();const{language,isArabic}=useLanguage();const platform:SaeedPlatform=(data.global as any).saeedPlatform||defaultSaeedPlatform;if(!platform.enabled)return null;const all=(platform.items||[]).filter(x=>x.enabled&&!retiredPlatformIds.has(x.id));const text=(item:PlatformItem,key:'title'|'description'|'badge')=>language==='en'?((item as any)[`${key}En`]||item[key]):item[key];return <div id="saeed-sections">{platformGroups.map((group,gIndex)=>{const items=all.filter(x=>(x.group||fallbackGroup[x.id]||'fields')===group.id).sort((a,b)=>a.order-b.order);if(!items.length)return null;return <section key={group.id} id={`saeed-${group.id}`} className={`border-t border-white/5 py-20 sm:py-24 ${gIndex%2===0?'bg-[#090909]':'bg-[#0c0c0c]'}`} dir={isArabic?'rtl':'ltr'}><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-10 max-w-3xl"><div className="mb-3 text-xs font-black text-[#D51F2B]">{isArabic?'سعيد بن عايض':'Saeed Bin Ayidh'}</div><h2 className="text-3xl font-black sm:text-5xl">{isArabic?group.ar:group.en}</h2><p className="mt-4 leading-8 text-gray-400">{isArabic?group.descAr:group.descEn}</p></div><div className="divide-y divide-white/10 border-y border-white/10">{items.map(item=><article key={item.id} className="grid gap-5 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:py-9"><div className="min-w-0"><div className="mb-2 text-[11px] font-black text-[#D51F2B]">{text(item,'badge')}</div><h3 className="text-xl font-black sm:text-2xl">{text(item,'title')}</h3><p className="mt-2 max-w-3xl text-sm leading-7 text-gray-400">{text(item,'description')}</p>{(item.imageUrl||item.videoUrl)&&<div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black">{item.imageUrl&&<img src={item.imageUrl} alt={text(item,'title')} className="max-h-80 w-full object-cover"/>}{item.videoUrl&&<video src={item.videoUrl} controls playsInline preload="metadata" className="max-h-96 w-full object-contain"/>}</div>}</div><div className="flex flex-wrap gap-2 sm:justify-end">{(item.buttons||[]).filter(b=>b.enabled&&b.label).map((b,i)=><a key={`${item.id}-${i}`} href={b.url&&b.url!=='#'?b.url:`/saeed/${item.id}`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-bold transition hover:border-[#D51F2B] hover:text-[#E52E3C]">{language==='en'?(b.labelEn||'Explore'):b.label}<ArrowUpLeft className="h-3.5 w-3.5"/></a>)}</div></article>)}</div></div></section>})}</div>};
