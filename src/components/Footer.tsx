import React from'react';import{Link}from'react-router-dom';import{Send}from'lucide-react';import{useCMS}from'../context/CMSContext';
const officialBrandIcons:Record<string,string>={
snapchat:'https://cdn.simpleicons.org/snapchat/D51F2B',
tiktok:'https://cdn.simpleicons.org/tiktok/D51F2B',
instagram:'https://cdn.simpleicons.org/instagram/D51F2B',
x:'https://cdn.simpleicons.org/x/D51F2B',
threads:'https://cdn.simpleicons.org/threads/D51F2B',
facebook:'https://cdn.simpleicons.org/facebook/D51F2B',
linkedin:'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg',
whatsapp:'https://cdn.simpleicons.org/whatsapp/D51F2B',
youtube:'https://cdn.simpleicons.org/youtube/D51F2B',
telegram:'https://cdn.simpleicons.org/telegram/D51F2B',
discord:'https://cdn.simpleicons.org/discord/D51F2B'
};const SocialIcon=({name}:{name:string})=>{const src=officialBrandIcons[(name||'').toLowerCase()];return <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D51F2B]/35 bg-[#D51F2B]/10">{src&&<img src={src} alt="" aria-hidden="true" className="h-5 w-5 object-contain" style={name.toLowerCase()==='linkedin'?{filter:'brightness(0) saturate(100%) invert(21%) sepia(95%) saturate(3690%) hue-rotate(343deg) brightness(91%) contrast(92%)'}:undefined}/>}</span>};
export const Footer:React.FC=()=>{const{data}=useCMS();const g:any=data.global,footer=g.footer||{};const email=String(g.contactEmail||'').trim(),phone=String(g.whatsapp||'').trim(),validEmail=email&&!/^hello@saeedbinayidh\.com$/i.test(email),validPhone=phone&&!/500000000/.test(phone.replace(/\D/g,''));const officialMainAccounts:any[]=[
{id:'snapchat',platform:'Snapchat',group:'سعيد بن عايض',url:'https://snapchat.com/t/3nSldj5H',enabled:true},
{id:'tiktok',platform:'TikTok',group:'سعيد بن عايض',url:'https://www.tiktok.com/@saeedbinayidh?_r=1&_t=ZS-9A7lzCWCL7l',enabled:true},
{id:'instagram',platform:'Instagram',group:'سعيد بن عايض',url:'https://www.instagram.com/saeed.ayidh?stkn=ZnFnN3g2aTh5ZHVk&utm_source=qr',enabled:true},
{id:'x',platform:'X',group:'سعيد بن عايض',url:'https://x.com/saeedbinayidh?s=11&t=o5zhmgF9bZG_mQ47HMhFEg',enabled:true},
{id:'threads',platform:'Threads',group:'سعيد بن عايض',url:'https://www.threads.com/@saeed.ayidh?igshid=NTc4MTIwNjQ2YQ==',enabled:true},
{id:'facebook',platform:'Facebook',group:'سعيد بن عايض',url:'https://www.facebook.com/share/1ByHdx5BC4/?mibextid=wwXIfr',enabled:true},
{id:'linkedin',platform:'LinkedIn',group:'سعيد بن عايض',url:'https://www.linkedin.com/company/saeedbinayidh/',enabled:true}
];const officialStoryAccounts:any[]=[
{id:'stories-tiktok',platform:'TikTok',group:'قصص سعيد',url:'https://www.tiktok.com/@eczv?_r=1&_t=ZS-9A7oiOQREP6',enabled:true},
{id:'stories-x',platform:'X',group:'قصص سعيد',url:'https://x.com/bkn8?s=11&t=o5zhmgF9bZG_mQ47HMhFEg',enabled:true}
];const officialVlogsAccounts:any[]=[
{id:'vlogs-tiktok',platform:'TikTok',group:'فلوقات سعيد',url:'https://www.tiktok.com/@8g2o?_r=1&_t=ZS-9A7otuVplY5',enabled:true},
{id:'vlogs-instagram',platform:'Instagram',group:'فلوقات سعيد',url:'https://www.instagram.com/19e3?stkn=MTdsYW1oNHFxc3dpOA==',enabled:true},
{id:'vlogs-x',platform:'X',group:'فلوقات سعيد',url:'https://x.com/19e3?s=11&t=o5zhmgF9bZG_mQ47HMhFEg',enabled:true},
{id:'vlogs-threads',platform:'Threads',group:'فلوقات سعيد',url:'https://www.threads.com/@19e3?igshid=NTc4MTIwNjQ2YQ==',enabled:true}
];const officialMusicAccounts:any[]=[
{id:'music-tiktok',platform:'TikTok',group:'سعيد ميوزك',url:'https://www.tiktok.com/@.3jh?_r=1&_t=ZS-9A7pdosl5s4',enabled:true},
{id:'music-instagram',platform:'Instagram',group:'سعيد ميوزك',url:'https://www.instagram.com/8gpq?stkn=MTQyMm9meXBwbGd2NQ==',enabled:true},
{id:'music-x',platform:'X',group:'سعيد ميوزك',url:'https://x.com/axt9?s=11&t=o5zhmgF9bZG_mQ47HMhFEg',enabled:true},
{id:'music-threads',platform:'Threads',group:'سعيد ميوزك',url:'https://www.threads.com/@8gpq?igshid=NTc4MTIwNjQ2YQ==',enabled:true}
];const savedAccounts=(g.socialAccounts||[]).filter((x:any)=>x.enabled!==false&&x.url&&(x.group||'سعيد بن عايض')!=='سعيد بن عايض');const accounts=[...officialMainAccounts,...officialStoryAccounts,...officialVlogsAccounts,...officialMusicAccounts,...savedAccounts.filter((x:any)=>!['قصص سعيد','فلوقات سعيد','سعيد ميوزك','القصائد والشيلات'].includes(x.group||''))];const officialMainChannels:any[]=[
{id:'whatsapp-channel',platform:'WhatsApp',group:'سعيد بن عايض',url:'https://whatsapp.com/channel/0029Vb7qd6O2phHPutLJoC0t',enabled:true},
{id:'youtube-channel',platform:'YouTube',group:'سعيد بن عايض',url:'https://youtube.com/@saeedayidh?si=Hd4R8mpoGNNFVNU9',enabled:true},
{id:'telegram-channel',platform:'Telegram',group:'سعيد بن عايض',url:'https://t.me/saeedbinayidh',enabled:true}
];const officialStoryChannels:any[]=[
{id:'stories-youtube',platform:'YouTube',group:'قصص سعيد',url:'https://youtube.com/@storiessaeed?si=ZDbpT_4lKt4igrd_',enabled:true}
];const officialVlogsChannels:any[]=[
{id:'vlogs-youtube',platform:'YouTube',group:'فلوقات سعيد',url:'https://youtube.com/@vlogssaeed?si=M5IbTVj4A8mzNTNa',enabled:true}
];const officialMusicChannels:any[]=[
{id:'music-whatsapp',platform:'WhatsApp',group:'سعيد ميوزك',url:'https://whatsapp.com/channel/0029VazcQoa4Y9lvLtItYE2O',enabled:true},
{id:'music-youtube-1',platform:'YouTube',group:'سعيد ميوزك',url:'https://youtube.com/@saeedbinayidh?si=cK-ufwWCh7Qtio7v',enabled:true},
{id:'music-youtube-2',platform:'YouTube',group:'سعيد ميوزك',url:'https://youtube.com/@saeed_ayidh?si=y6oU_FmYqmo2r0Qo',enabled:true},
{id:'music-youtube-3',platform:'YouTube',group:'سعيد ميوزك',url:'https://youtube.com/@saeedbinayidh1?si=sme7Mh_qbQwhOlDo',enabled:true},
{id:'music-telegram',platform:'Telegram',group:'سعيد ميوزك',url:'https://t.me/SaeedAyidh',enabled:true}
];const savedChannels=(g.channels||[]).filter((x:any)=>x.enabled!==false&&x.url&&(x.group||'سعيد بن عايض')!=='سعيد بن عايض');const channels=[...officialMainChannels,...officialStoryChannels,...officialVlogsChannels,...officialMusicChannels,...savedChannels.filter((x:any)=>!['قصص سعيد','فلوقات سعيد','سعيد ميوزك','القصائد والشيلات'].includes(x.group||''))];const groups:any[]=[
{id:'main',title:'سعيد بن عايض',enabled:true,order:1},
{id:'stories',title:'قصص سعيد',enabled:true,order:2},
{id:'vlogs',title:'فلوقات سعيد',enabled:true,order:3},
{id:'music',title:'سعيد ميوزك',enabled:true,order:4}
];const saeedLinks:any[]=(g.saeedPageLinks||[]).filter((x:any)=>x.enabled!==false&&x.url).sort((a:any,b:any)=>(a.order||0)-(b.order||0));const entertainment:any[]=[
{id:'events',title:'سعيد ايفنتس',links:[{id:'events-discord',platform:'Discord',url:'https://discord.gg/wEygwYG5M'}]},
{id:'empire',title:'امبراطورية سعيد',links:[
{id:'empire-discord',platform:'Discord',url:'https://discord.gg/wEygwYG5M'},
{id:'empire-telegram',platform:'Telegram',url:'https://t.me/EmpireSaeed'},
{id:'empire-tiktok',platform:'TikTok',url:'https://tiktok.me/group/ZSyovPALD/'},
{id:'empire-instagram',platform:'Instagram',url:'https://ig.me/j/Aba4nSKowp5Bz4sV/'}
]}];const bottom:any[]=(g.footerBottomLinks?.length?g.footerBottomLinks:[{id:'map',title:'خريطة سعيد',url:'/page/saeed-map',enabled:true,order:1},{id:'recruitment',title:'سعيد ريكروتمنت',url:'/page/saeed-recruitment',enabled:true,order:2}]).filter((x:any)=>x.enabled!==false&&x.url).sort((a:any,b:any)=>(a.order||0)-(b.order||0));const item=(x:any)=>(x.url||'').startsWith('/')?<Link key={x.id} to={x.url} className="rounded-xl border border-white/10 bg-[#111] p-3 font-bold text-white hover:border-[#D51F2B]">{x.title}</Link>:<a key={x.id} href={x.url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-[#111] p-3 font-bold text-white hover:border-[#D51F2B]">{x.title}</a>;const socialItem=(x:any,label:string)=><a key={x.id} href={x.url} target="_blank" rel="noreferrer" className="flex min-h-14 items-center gap-3 rounded-2xl bg-[#111] px-3 py-2 text-sm font-bold text-gray-200 transition hover:bg-[#151515] hover:text-white"><SocialIcon name={label}/><span>{label}</span></a>;return <footer className="relative border-t border-white/10 bg-[#050505] pb-10 pt-12 text-xs text-gray-400 sm:pt-16"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8" dir="rtl"><div className="mb-12 flex flex-col items-center space-y-4 text-center"><Link to="/" className="flex justify-center"><img src={g.logoUrl||'/assets/sba_logo_transparent.png'} alt={g.websiteName} className="h-20 w-auto max-w-[210px] object-contain sm:h-24"/></Link><p className="mx-auto max-w-2xl text-center leading-relaxed">{footer.about||g.description}</p>{validEmail&&<a href={`mailto:${email}`} className="block font-mono font-bold text-[#D51F2B]">{email}</a>}{validPhone&&<a href={`https://wa.me/${phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="block font-mono text-gray-300">{phone}</a>}<Link to={data.navbar.contactBtnUrl||'/contact'} className="sba-btn-primary inline-flex items-center justify-center gap-2 px-7 py-3"><Send className="h-4 w-4"/>{data.navbar.contactBtnLabel||'تواصل معنا'}</Link></div><section className="border-t border-white/10 pt-8"><div className="mb-8 text-center"><h2 className="text-3xl font-black text-white">صفحات سعيد</h2></div>{saeedLinks.length>0&&<div className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{saeedLinks.map(item)}</div>}{groups.map((group:any)=>{const a=accounts.filter((x:any)=>(x.group||'سعيد بن عايض')===group.title),ch=channels.filter((x:any)=>(x.group||'سعيد بن عايض')===group.title);return <div key={group.id} className="mb-10"><h3 className="mb-5 text-center text-2xl font-black text-[#D51F2B]">{group.title}</h3><div className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-4 sm:p-6"><div className="mb-5 grid grid-cols-2 gap-4 border-b border-white/10 pb-4"><h4 className="text-center text-base font-black text-white">حسابات سعيد</h4><h4 className="text-center text-base font-black text-white">قنوات سعيد</h4></div><div className="grid grid-cols-2 gap-4"><div className="space-y-3">{a.map((x:any)=>socialItem(x,x.platform||x.name||'حساب'))}</div><div className="space-y-3 border-r border-white/10 pr-4">{ch.map((x:any)=>socialItem(x,x.platform||x.name||'قناة'))}</div></div></div></div>})}</section><section className="border-t border-white/10 pt-7"><h2 className="mb-5 text-center text-2xl font-black text-white">صفحات الترفيه</h2><div className="grid gap-4 sm:grid-cols-2">{entertainment.map((page:any)=><div key={page.id} className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-4 sm:p-6"><h3 className="mb-4 text-center text-xl font-black text-[#D51F2B]">{page.title}</h3><div className="space-y-3">{page.links.map((x:any)=>socialItem(x,x.platform))}</div></div>)}</div></section><div className="mt-10 border-t border-white/10 pt-7"><p className="mb-5 text-center">{g.copyrightText||'© 2026 سعيد بن عايض — جميع الحقوق محفوظة.'}</p><div className="grid grid-cols-2 gap-3">{bottom.map(item)}</div></div></div></footer>};