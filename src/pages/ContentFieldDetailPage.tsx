import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteData } from '../data/siteData';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MediaSystem } from '../components/MediaSystem';
import { Layers, ArrowLeft, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { publicEnglish } from '../i18n/publicEnglish';

const musicWorks=[
  {id:'montazer-eidik',title:'منتظر عيدك',titleEn:'Montazer Eidik',url:'https://youtu.be/HTMf4szHdT4?si=rB60wXFjhXZqWf1q',videoId:'HTMf4szHdT4'},
  {id:'leh-ya-habibi',title:'ليه ياحبي؟',titleEn:'Leh Ya Habibi?',url:'https://youtu.be/6R0QhHRap60?si=VW-IoKCVg5VixKkS',videoId:'6R0QhHRap60'}
];
const musicAccounts=[
  {id:'music-snapchat',platform:'Snapchat',url:'https://snapchat.com/t/3nSldj5H'},
  {id:'music-tiktok',platform:'TikTok',url:'https://www.tiktok.com/@.3jh?_r=1&_t=ZS-9A7pdosl5s4'},
  {id:'music-instagram',platform:'Instagram',url:'https://www.instagram.com/8gpq?stkn=MTQyMm9meXBwbGd2NQ=='},
  {id:'music-x',platform:'X',url:'https://x.com/axt9?s=11&t=o5zhmgF9bZG_mQ47HMhFEg'},
  {id:'music-threads',platform:'Threads',url:'https://www.threads.com/@8gpq?igshid=NTc4MTIwNjQ2YQ=='}
];
const musicChannels=[
  {id:'music-whatsapp',platform:'WhatsApp',url:'https://whatsapp.com/channel/0029VazcQoa4Y9lvLtItYE2O'},
  {id:'music-youtube-1',platform:'YouTube',labelAr:'YouTube',labelEn:'YouTube',url:'https://youtube.com/@saeedbinayidh?si=cK-ufwWCh7Qtio7v'},
  {id:'music-youtube-2',platform:'YouTube',labelAr:'YouTube',labelEn:'YouTube',url:'https://youtube.com/@saeed_ayidh?si=y6oU_FmYqmo2r0Qo'},
  {id:'music-youtube-3',platform:'YouTube',labelAr:'YouTube',labelEn:'YouTube',url:'https://youtube.com/@saeedbinayidh1?si=sme7Mh_qbQwhOlDo'},
  {id:'music-telegram',platform:'Telegram',url:'https://t.me/SaeedAyidh'}
];
const brandIcons:Record<string,string>={
  snapchat:'https://cdn.simpleicons.org/snapchat/D51F2B',
  tiktok:'https://cdn.simpleicons.org/tiktok/D51F2B',
  instagram:'https://cdn.simpleicons.org/instagram/D51F2B',
  x:'https://cdn.simpleicons.org/x/D51F2B',
  threads:'https://cdn.simpleicons.org/threads/D51F2B',
  whatsapp:'https://cdn.simpleicons.org/whatsapp/D51F2B',
  youtube:'https://cdn.simpleicons.org/youtube/D51F2B',
  telegram:'https://cdn.simpleicons.org/telegram/D51F2B'
};

export const ContentFieldDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useCMS();
  const { isArabic } = useLanguage();
  const fallback = siteData.contentFields.find((f:any) => f.slug === slug || f.id === slug) || siteData.contentFields[0];
  const field:any = (data.contentFields || []).find((f:any) => f.slug === slug || f.id === slug) || fallback;
  const isMusic=field.id==='sheylat'||slug==='poems';
  const tr = (value:any, explicit?:any) => {
    if (isArabic || typeof value !== 'string') return value;
    return (typeof explicit === 'string' && explicit.trim()) ? explicit : (publicEnglish[value] || value);
  };
  const title = isMusic?(isArabic?'سعيد بن عايض':'Saeed Bin Ayidh'):tr(field.title, field.titleEn);
  const description = tr(field.description, field.descriptionEn);
  const intro = tr(field.intro || field.description, field.introEn || field.descriptionEn);
  const categoryTag = tr(field.categoryTag, field.categoryTagEn || field.categoryEn);
  const fullContent = tr(field.fullContent || field.description, field.fullContentEn || field.descriptionEn);
  const heroImage=isMusic?'https://gcdn.picsart.com/editing-temp/208b1b8b-2dde-4df8-9747-c474ce4275d9.jpeg':field.image;
  const relatedNews = isMusic?[]:(data.news || []).filter((n:any) =>
    field.latestNewsSlugs?.includes?.(n.slug) ||
    (typeof n.category === 'string' && typeof field.title === 'string' && n.category.includes(field.title))
  );
  const BackArrow = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20" dir={isArabic ? 'rtl' : 'ltr'}>
      <SEO title={title} description={description} image={heroImage} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: isArabic ? 'مجالات المحتوى' : 'Content Fields', link: '/#content-fields' },
          { label: title }
        ]} />

        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#190305] via-[#100203] to-[#080808] border border-white/10 p-6 sm:p-10 mb-10">
          <div className={isMusic?'flex flex-col gap-7':'flex flex-col lg:flex-row items-center justify-between gap-8'}>
            <div className={isMusic?'w-full space-y-4 text-start':'w-full lg:w-[60%] space-y-4 text-start'}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D51F2B]/15 border border-[#D51F2B]/30 text-xs font-semibold text-[#D51F2B]">
                <Layers className="w-3.5 h-3.5" /><span>{categoryTag}</span>
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">{title}</h1>
              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">{intro}</p>
            </div>
            <div className={isMusic?'w-full':'w-full lg:w-[35%] flex justify-center'}>
              <img src={heroImage} alt={title} className={isMusic?'block w-full aspect-[1536/514] rounded-2xl border border-white/10 shadow-2xl object-cover':'w-full max-w-[320px] h-auto rounded-2xl border border-white/10 shadow-2xl object-cover'} />
            </div>
          </div>
        </div>

        <div className={isMusic?'space-y-8':'grid grid-cols-1 lg:grid-cols-3 gap-10'}>
          <div className={isMusic?'space-y-8 text-start':'lg:col-span-2 space-y-8 text-start'}>
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                {isArabic ? `عن مجال ${field.title}` : `About ${title}`}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">{fullContent}</p>
            </div>

            {isMusic ? (
              <>
                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <h3 className="text-lg font-bold text-white">{isArabic?'أبرز الأعمال':'Featured Works'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {musicWorks.map(work=>(
                      <a key={work.id} href={work.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 p-4 rounded-xl bg-[#181818] border border-white/5 text-sm font-bold text-white hover:border-[#D51F2B]/60 hover:text-[#D51F2B] transition-all">
                        <span>{isArabic?work.title:work.titleEn}</span><BackArrow className="w-4 h-4 text-[#D51F2B] shrink-0"/>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-5">
                  <h3 className="text-lg font-bold text-white">{isArabic?'أعمالي':'My Works'}</h3>
                  <div dir="ltr" className="overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex w-max gap-5 pb-2">
                      {musicWorks.map(work=>(
                        <div key={work.id} dir={isArabic?'rtl':'ltr'} className="w-[290px] sm:w-[360px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
                          <div className="aspect-video w-full overflow-hidden bg-black">
                            <iframe src={`https://www.youtube.com/embed/${work.videoId}?rel=0`} title={isArabic?work.title:work.titleEn} loading="lazy" className="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-white">{isArabic?work.title:work.titleEn}</h4>
                            <a href={work.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-3 text-xs font-bold hover:border-[#D51F2B]/60">
                              <Play className="h-3.5 w-3.5"/>{isArabic?'تشغيل':'Play'}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {field.featuredItems && field.featuredItems.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                    <h3 className="text-lg font-bold text-white">{isArabic ? 'أبرز المحطات والأعمال المميزة' : 'Featured Highlights & Works'}</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {field.featuredItems.map((item:string, idx:number) => (
                        <li key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#181818] border border-white/5 text-xs text-gray-200">
                          <CheckCircle2 className="w-4 h-4 text-[#D51F2B] shrink-0" /><span>{tr(item, field.featuredItemsEn?.[idx])}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <MediaSystem
                  galleryImages={field.galleryImages}
                  videos={(field.videos || []).map((v:any)=>({...v,title:tr(v.title,v.titleEn)}))}
                  externalLinks={(field.externalLinks || []).map((x:any)=>({...x,title:tr(x.title,x.titleEn),badge:tr(x.badge,x.badgeEn)}))}
                />
              </>
            )}
          </div>

          {isMusic ? (
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-6 text-start">
              <h3 className="text-center text-xl font-bold text-white border-b border-white/10 pb-4">{isArabic?'سعيد ميوزك':'Saeed Music'}</h3>
              <div className="space-y-3">
                <h4 className="text-center text-sm font-black text-[#D51F2B]">{isArabic?'حسابات سعيد':'Saeed Accounts'}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {musicAccounts.map(item=><MusicSocialLink key={item.id} item={item} label={item.platform}/>)}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-center text-sm font-black text-[#D51F2B]">{isArabic?'قنوات سعيد':'Saeed Channels'}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {musicChannels.map(item=><MusicSocialLink key={item.id} item={item} label={isArabic?(item.labelAr||item.platform):(item.labelEn||item.platform)}/>)}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 text-start">
                <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">{isArabic ? 'أحدث الأخبار في هذا المجال' : 'Latest News in This Field'}</h3>
                {relatedNews.length > 0 ? (
                  <div className="space-y-3">
                    {relatedNews.map((newsItem:any) => (
                      <Link key={newsItem.id} to={`/news/${newsItem.slug}`} className="block p-3 rounded-xl bg-[#181818] border border-white/5 hover:border-[#D51F2B]/50 transition-all group">
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#D51F2B] transition-colors line-clamp-2">{tr(newsItem.title,newsItem.titleEn)}</h4>
                        <span className="text-[11px] text-gray-400 mt-1 block">{tr(newsItem.date,newsItem.dateEn)}</span>
                      </Link>
                    ))}
                  </div>
                ) : <p className="text-xs text-gray-400">{isArabic ? 'لا توجد أخبار حديثة مسجلة بهذا المجال حالياً.' : 'No recent news is currently available in this field.'}</p>}
              </div>

              {field.socialLinks && field.socialLinks.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 text-start">
                  <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">{isArabic ? 'روابط المنصات والتواصل' : 'Platform & Contact Links'}</h3>
                  <div className="flex flex-col gap-2">
                    {field.socialLinks.map((s:any, idx:number) => (
                      <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-[#181818] border border-white/5 text-xs text-gray-300 hover:text-white hover:border-[#D51F2B] transition-all">
                        <span>{tr(s.title,s.titleEn)}</span><BackArrow className="w-3.5 h-3.5 text-[#D51F2B]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MusicSocialLink=({item,label}:{item:any;label:string})=>{
  const src=brandIcons[String(item.platform||'').toLowerCase()];
  return <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center rounded-xl border border-white/10 bg-[#181818] px-4 py-3 text-center font-bold text-white hover:border-[#D51F2B]/60 transition-all">
    <span className="grid w-44 grid-cols-[1fr_2.25rem] items-center gap-3">
      <span className="text-center text-sm">{label}</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D51F2B]/35 bg-[#D51F2B]/10">{src&&<img src={src} alt="" aria-hidden="true" className="h-5 w-5 object-contain"/>}</span>
    </span>
  </a>
};
