import React,{useEffect,useMemo,useState}from'react';
import{ArrowLeft,ArrowRight,Heart,Home}from'lucide-react';
import{Link,useNavigate}from'react-router-dom';
import{FavoriteItem,getFavorites}from'../lib/siteInteractions';
import{FavoriteButton}from'../components/FavoriteButton';
import{useLanguage}from'../context/LanguageContext';

type FavoriteGroup={key:string;titleAr:string;titleEn:string;explore:string;items:FavoriteItem[]};

const groupMeta=[
  {key:'fields',titleAr:'مجالات سعيد',titleEn:'Saeed Fields',explore:'/#content-fields'},
  {key:'services',titleAr:'خدمات سعيد',titleEn:'Saeed Services',explore:'/services'},
  {key:'products',titleAr:'منتجات سعيد',titleEn:'Saeed Products',explore:'/#products-section'},
  {key:'news',titleAr:'أخبار سعيد',titleEn:'Saeed News',explore:'/news'},
  {key:'content',titleAr:'محتوى سعيد',titleEn:'Saeed Content',explore:'/'},
  {key:'tools',titleAr:'أدوات وموارد سعيد',titleEn:'Saeed Tools & Resources',explore:'/resources'},
  {key:'other',titleAr:'مفضلات أخرى',titleEn:'Other Favorites',explore:'/'}
];

const groupKey=(x:FavoriteItem)=>{
  const t=(x.type||'').toLowerCase(),id=(x.id||'').toLowerCase(),url=(x.url||'').toLowerCase();
  if(t.includes('مجال')||t.includes('field')||id.startsWith('content-')||url.startsWith('/content/'))return'fields';
  if(t.includes('خدمة')||t.includes('service')||id.startsWith('service-')||url.startsWith('/services/'))return'services';
  if(t.includes('منتج')||t.includes('product')||id.startsWith('product-')||url.startsWith('/products/'))return'products';
  if(t.includes('خبر')||t.includes('news')||id.startsWith('news-')||url.startsWith('/news/'))return'news';
  if(t.includes('أداة')||t.includes('tool')||id.startsWith('tool-')||url.startsWith('/tools/'))return'tools';
  if(t.includes('محتوى')||t.includes('content')||id.startsWith('card-')||url.startsWith('/saeed-item/'))return'content';
  return'other';
};

export const FavoritesPage:React.FC=()=>{
  const[items,setItems]=useState<FavoriteItem[]>(()=>getFavorites());
  const nav=useNavigate();
  const{isArabic}=useLanguage();
  const Arrow=isArabic?ArrowLeft:ArrowRight;
  useEffect(()=>{const h=()=>setItems(getFavorites());window.addEventListener('sba-favorites-changed',h as EventListener);return()=>window.removeEventListener('sba-favorites-changed',h as EventListener)},[]);
  const groups=useMemo<FavoriteGroup[]>(()=>groupMeta.map(g=>({...g,items:items.filter(x=>groupKey(x)===g.key)})).filter(g=>g.items.length>0),[items]);
  const go=(u:string)=>{if(u.startsWith('/#')){nav('/');setTimeout(()=>document.getElementById(u.slice(2))?.scrollIntoView({behavior:'smooth'}),150)}else nav(u)};
  const back=()=>{if(window.history.length>1)nav(-1);else nav('/')};
  return <div className="min-h-screen bg-[#080808] px-5 pb-24 pt-32" dir={isArabic?'rtl':'ltr'}>
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex justify-start"><button type="button" onClick={back} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-4 py-2.5 text-sm font-bold text-white transition hover:border-[#D51F2B]/60 hover:bg-[#151515]"><Home className="h-4 w-4 text-[#D51F2B]"/>{isArabic?'الرئيسية':'Home'}</button></div>
      <div className="mb-12 text-center"><Heart className="mx-auto h-8 w-8 fill-[#D51F2B] text-[#D51F2B]"/><h1 className="mt-3 text-4xl font-black">{isArabic?'المفضلة':'Favorites'}</h1><p className="mt-3 text-gray-500">{isArabic?'كل العناصر اللي حفظتها، مرتبة حسب أقسام الموقع.':'Everything you saved, organized by site section.'}</p></div>
      {!items.length?<div className="rounded-3xl border border-white/10 bg-[#111] p-12 text-center text-gray-500">{isArabic?'ما عندك عناصر في المفضلة إلى الآن.':'You do not have any favorites yet.'}</div>:
      <div className="space-y-14">{groups.map(group=><section key={group.key}>
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <h2 className="text-xl font-black text-white sm:text-2xl">{isArabic?group.titleAr:group.titleEn}</h2>
          <button type="button" onClick={()=>go(group.explore)} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-[#151515] px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#D51F2B]/60">
            {isArabic?'استكشف الكل':'Explore All'}<Arrow className="h-4 w-4 text-[#D51F2B]"/>
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{group.items.map(x=><article key={x.id} className="relative flex min-h-[180px] flex-col rounded-2xl border border-white/10 bg-[#111] p-5 transition hover:border-[#D51F2B]/60">
          <FavoriteButton id={x.id} title={x.title} url={x.url} type={x.type} className="absolute left-4 top-4 z-10"/>
          <div className="pe-12"><span className="text-xs font-bold text-[#D51F2B]">{x.type}</span><h3 className="mt-3 text-lg font-black text-white">{x.title}</h3></div>
          <div className="mt-auto pt-6"><button type="button" onClick={()=>go(x.url)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#191919] px-4 py-3 text-xs font-black text-white transition hover:border-[#D51F2B]">{isArabic?'استكشف الآن':'Explore Now'}<Arrow className="h-4 w-4 text-[#D51F2B]"/></button></div>
        </article>)}</div>
      </section>)}</div>}
    </div>
  </div>
};