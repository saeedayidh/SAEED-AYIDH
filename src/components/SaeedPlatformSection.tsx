import React from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';

export type PlatformButton = { label:string; url:string; enabled:boolean; labelEn?:string };
export type PlatformItem = { id:string; title:string; description:string; badge:string; imageUrl:string; videoUrl:string; enabled:boolean; order:number; buttons:PlatformButton[]; titleEn?:string; descriptionEn?:string; badgeEn?:string };
export type SaeedPlatform = { enabled:boolean; badge:string; title:string; description:string; items:PlatformItem[] };

const content:[string,string,string,string,string,string][]=[
 ['now','سعيد الآن','آخر ما نزل من قصص وفلوقات وشيلات وبثوث ومشاريع.','الآن','Saeed Now','Latest stories, vlogs, audio releases, streams and projects.'],
 ['content','مركز المحتوى','بوابة تجمع القصص والفلوقات والقصائد والشيلات والألعاب.','المحتوى','Content Hub','Stories, vlogs, poetry, audio releases and gaming in one place.'],
 ['archive','أرشيف سعيد','خط زمني مرتب لأعمال ومشاريع سعيد من البداية إلى اليوم.','الأرشيف','Saeed Archive','A timeline of Saeed’s work and projects from the beginning until today.'],
 ['play','سعيد بلاي','الألعاب والبثوث والكليبات وأبرز لحظات اللعب.','الألعاب','Saeed Play','Gaming, streams, clips and standout gameplay moments.'],
 ['stories','قصص سعيد','مكتبة للقصص بتصنيفات وأغلفة وصفحات مستقلة.','القصص','Saeed Stories','A categorized story library with covers and dedicated pages.'],
 ['music','سعيد ميوزك','القصائد والشيلات والأعمال الصوتية في مكان واحد.','الصوت','Saeed Music','Poetry and audio releases in one place.'],
 ['frame','سعيد فريم','خدمات التصوير والتغطيات والباقات ونماذج الأعمال.','التصوير','Saeed Frame','Photography, coverage packages and selected work.'],
 ['newsroom','غرفة أخبار سعيد','إعلانات المشاريع والتحديثات والأعمال القادمة.','الأخبار','Saeed Newsroom','Project announcements, updates and upcoming releases.'],
 ['schedule','جدول سعيد','المقاطع والبثوث والمشاريع والفعاليات القادمة.','القادم','Saeed Schedule','Upcoming videos, streams, projects and events.'],
 ['countdown','عداد الإطلاق','عداد تنازلي لأي عمل أو مشروع جديد.','الإطلاق','Launch Countdown','Countdowns for upcoming releases and projects.'],
 ['numbers','أعمال سعيد بالأرقام','إحصائيات المحتوى والمشاريع والخبرة والتغطيات.','الأرقام','Saeed in Numbers','Content, projects, experience and coverage statistics.'],
 ['projects','خريطة مشاريع سعيد','عرض مشاريع سعيد وعلاقة كل مشروع بالهوية الرئيسية.','المشاريع','Project Map','A visual map of Saeed’s projects and how they connect.'],
 ['accounts','مركز حسابات سعيد','الحسابات الرسمية مرتبة ومميزة.','الحسابات','Accounts Center','All official accounts organized in one place.'],
 ['channels','مركز قنوات سعيد','قنوات سعيد وتخصص كل قناة وأحدث محتواها.','القنوات','Channels Center','Saeed’s channels, their focus and latest content.'],
 ['id','هوية سعيد الرقمية','بطاقة رقمية شخصية قابلة للمشاركة مع رمز استجابة سريعة وروابط.','الهوية','Saeed Digital ID','A shareable digital identity card with QR and links.'],
 ['press','الملف الإعلامي','ملف إعلامي جاهز للشركات والجهات.','الإعلام','Press Kit','A ready-to-share media profile for brands and organizations.'],
 ['collab','طلب تعاون','نموذج للشركات والأفراد للإعلانات والتغطيات والتعاون.','التعاون','Collaboration Request','A request form for campaigns, coverage and collaborations.'],
 ['orders','حالة الطلب','متابعة حالة طلبات الخدمات من الإرسال حتى الاكتمال.','الطلبات','Order Status','Track service requests from submission to completion.'],
 ['ideas','اقتراح محتوى','استقبال اقتراحات القصص والفلوقات والألعاب والمقاطع.','الاقتراحات','Content Suggestions','Submit ideas for stories, vlogs, games and videos.'],
 ['polls','تصويت الجمهور','تصويت الجمهور على المحتوى القادم والاختيارات.','التصويت','Audience Polls','Let the audience vote on upcoming content and choices.'],
 ['questions','أسئلة سعيد','استقبال أسئلة الجمهور وعرض الإجابات المختارة.','الأسئلة','Saeed Q&A','Collect audience questions and publish selected answers.'],
 ['wallpapers','خلفيات سعيد','مكتبة خلفيات للجوال والكمبيوتر.','الخلفيات','Saeed Wallpapers','A wallpaper library for mobile and desktop.'],
 ['tools','أدوات سعيد','برومبتات واختصارات وقوالب وفلاتر وموارد.','الأدوات','Saeed Tools','Prompts, shortcuts, templates, filters and resources.'],
 ['labs','مختبر سعيد','تجارب الذكاء الاصطناعي والواجهات والأفكار الجديدة.','المختبر','Saeed Labs','Experiments in AI, interfaces and new ideas.'],
 ['ai','ذكاء سعيد','أدوات ذكاء اصطناعي صغيرة تحمل هوية سعيد.','الذكاء','Saeed AI','Small AI tools built around Saeed’s brand.'],
 ['search','البحث الشامل','بحث واحد داخل القصص والأخبار والبلوق والأعمال والأدوات.','البحث','Universal Search','Search stories, news, blog posts, work and tools from one place.'],
 ['favorites','المفضلة','حفظ المحتوى والأدوات للرجوع لها لاحقًا.','المفضلة','Favorites','Save content and tools to revisit later.'],
 ['cinema','الوضع السينمائي','تجربة مشاهدة وقراءة مظلمة ومركزة للمحتوى.','العرض','Cinema Mode','A focused dark viewing and reading experience.'],
 ['whatsnew','ما الجديد؟','عرض آخر إضافات وتحديثات الموقع.','التحديثات','What’s New','See the latest additions and site updates.'],
 ['notify','إشعارات سعيد','اختيار أنواع المحتوى التي يريد الزائر متابعتها.','الإشعارات','Saeed Notifications','Choose which types of content to follow.'],
 ['analytics','إحصائيات الموقع','إحصائيات الإدارة عن الزيارات والاستخدام والطلبات.','الإحصائيات','Site Analytics','Admin insights for visits, usage and requests.']
];

export const defaultPlatformItems:PlatformItem[]=content.map((x,i)=>({id:x[0],title:x[1],description:x[2],badge:x[3],titleEn:x[4],descriptionEn:x[5],badgeEn:'',imageUrl:'',videoUrl:'',enabled:true,order:i+1,buttons:[{label:'استكشف',labelEn:'Explore',url:`/saeed/${x[0]}`,enabled:true}]}));
export const defaultSaeedPlatform:SaeedPlatform={enabled:true,badge:'',title:'',description:'',items:defaultPlatformItems};

const groupDefs=[
 {id:'fields',ar:'مجالات سعيد',en:'Saeed Fields',descAr:'المحتوى والألعاب والقصص والصوت وما ينشره سعيد.',descEn:'Content, gaming, stories, audio and everything Saeed publishes.',ids:['now','content','archive','play','stories','music']},
 {id:'services',ar:'خدمات سعيد',en:'Saeed Services',descAr:'الخدمات والتعاون والملف الإعلامي ومتابعة الطلبات.',descEn:'Services, collaborations, media profile and request tracking.',ids:['frame','press','collab','orders']},
 {id:'projects',ar:'مشاريع سعيد',en:'Saeed Projects',descAr:'الأخبار والمشاريع والمواعيد والإطلاقات والأرقام.',descEn:'News, projects, schedules, launches and milestones.',ids:['newsroom','schedule','countdown','numbers','projects']},
 {id:'centers',ar:'مراكز سعيد',en:'Saeed Centers',descAr:'الحسابات والقنوات والهوية الرقمية وكل روابط سعيد الرسمية.',descEn:'Official accounts, channels and Saeed’s digital identity.',ids:['accounts','channels','id']},
 {id:'community',ar:'مجتمع سعيد',en:'Saeed Community',descAr:'اقتراحات الجمهور والتصويت والأسئلة والإشعارات والتحديثات.',descEn:'Suggestions, polls, questions, notifications and updates.',ids:['ideas','polls','questions','notify','whatsnew']},
 {id:'tools',ar:'أدوات سعيد',en:'Saeed Tools',descAr:'الخلفيات والأدوات والمختبر والذكاء والبحث والمفضلة وتجربة العرض.',descEn:'Wallpapers, tools, labs, AI, search, favorites and viewing features.',ids:['wallpapers','tools','labs','ai','search','favorites','cinema','analytics']}
];

export const SaeedPlatformSection:React.FC=()=>{
 const {data}=useCMS(); const {language,isArabic}=useLanguage(); const platform:SaeedPlatform=(data.global as any).saeedPlatform||defaultSaeedPlatform;
 if(!platform.enabled)return null;
 const all=(platform.items||[]).filter(x=>x.enabled);
 const text=(item:PlatformItem,key:'title'|'description'|'badge')=>language==='en'?((item as any)[`${key}En`]||item[key]):item[key];
 return <div id="saeed-sections">{groupDefs.map((group,gIndex)=>{const items=group.ids.map(id=>all.find(x=>x.id===id)).filter(Boolean) as PlatformItem[];if(!items.length)return null;return <section key={group.id} id={`saeed-${group.id}`} className={`border-t border-white/5 py-20 sm:py-24 ${gIndex%2===0?'bg-[#090909]':'bg-[#0c0c0c]'}`} dir={isArabic?'rtl':'ltr'}><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-10 max-w-3xl"><div className="mb-3 text-xs font-black text-[#D51F2B]">{isArabic?'سعيد بن عايض':'Saeed Bin Ayidh'}</div><h2 className="text-3xl font-black sm:text-5xl">{isArabic?group.ar:group.en}</h2><p className="mt-4 leading-8 text-gray-400">{isArabic?group.descAr:group.descEn}</p></div><div className="divide-y divide-white/10 border-y border-white/10">{items.map((item,index)=><article key={item.id} className="grid gap-5 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:py-9"><div className="min-w-0"><div className="mb-2 text-[11px] font-black text-[#D51F2B]">{text(item,'badge')}</div><h3 className="text-xl font-black sm:text-2xl">{text(item,'title')}</h3><p className="mt-2 max-w-3xl text-sm leading-7 text-gray-400">{text(item,'description')}</p>{(item.imageUrl||item.videoUrl)&&<div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black">{item.imageUrl&&<img src={item.imageUrl} alt={text(item,'title')} className="max-h-80 w-full object-cover"/>}{item.videoUrl&&<video src={item.videoUrl} controls playsInline preload="metadata" className="max-h-96 w-full object-contain"/>}</div>}</div><div className="flex flex-wrap gap-2 sm:justify-end">{(item.buttons||[]).filter(b=>b.enabled&&b.label).map((b,i)=><a key={`${item.id}-${i}`} href={b.url&&b.url!=='#'?b.url:`/saeed/${item.id}`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-bold transition hover:border-[#D51F2B] hover:text-[#E52E3C]">{language==='en'?(b.labelEn||'Explore'):b.label}<ArrowUpLeft className="h-3.5 w-3.5"/></a>)}</div></article>)}</div></div></section>})}</div>;
};
