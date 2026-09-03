import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu, X, LayoutDashboard, Settings, Image as ImageIcon, MousePointerClick,
  Layers, Users, Radio, Newspaper, BookOpen, Briefcase, Wrench, FolderKanban,
  Grid3X3, Shield, LogOut, Eye, Plus, Trash2, Upload, Save, ChevronLeft
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

const inputClass = 'w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-3 py-2.5 text-sm text-white outline-none focus:border-[#D51F2B]';
const cardClass = 'rounded-2xl border border-white/10 bg-[#111111] p-4 sm:p-5';
const labelClass = 'block text-xs font-bold text-gray-300 mb-2';

type SocialAccount = {
  id: string;
  platform: string;
  username: string;
  url: string;
  iconImage: string;
  enabled: boolean;
};

type ChannelItem = {
  id: string;
  name: string;
  platform: string;
  url: string;
  description: string;
  iconImage: string;
  enabled: boolean;
};

const platformNames = [
  'Instagram', 'TikTok', 'Snapchat', 'X / Twitter', 'Threads', 'YouTube',
  'Telegram', 'Jaco', 'Facebook', 'LinkedIn', 'Reddit', 'WhatsApp'
];

const oldSocialKey: Record<string, string> = {
  'Instagram': 'instagram', 'TikTok': 'tiktok', 'Snapchat': 'snapchat',
  'X / Twitter': 'x', 'YouTube': 'youtube', 'LinkedIn': 'linkedin'
};

export const AdminDashboardPage: React.FC = () => {
  const {
    data, isAuthenticated, authLoading, logout, changePassword,
    updateGlobal, updateNavbar, updateHero, updateSections,
    addContentField, updateContentField, deleteContentField,
    addNews, updateNews, deleteNews,
    addBlog, updateBlog, deleteBlog,
    addService, updateService, deleteService,
    addTool, updateTool, deleteTool,
    addPortfolio, updatePortfolio, deletePortfolio
  } = useCMS();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState('overview');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMessage, setPassMessage] = useState('');

  const globalAny = data?.global as any;
  const defaultAccounts = useMemo<SocialAccount[]>(() => platformNames.map((platform, index) => {
    const key = oldSocialKey[platform];
    const oldUrl = key ? globalAny?.socials?.[key] || '' : '';
    return {
      id: `social-${index + 1}`,
      platform,
      username: '',
      url: oldUrl,
      iconImage: '',
      enabled: Boolean(oldUrl)
    };
  }), [globalAny?.socials]);

  const socialAccounts: SocialAccount[] = globalAny?.socialAccounts?.length ? globalAny.socialAccounts : defaultAccounts;
  const channels: ChannelItem[] = globalAny?.channels || [];
  const cta = globalAny?.cta || {
    badge: 'فرص التعاون والشراكة',
    title: 'لنصنع شيئاً مميزاً معاً',
    description: 'إذا كان لديك مشروع أو فكرة أو تعاون، يسعدنا التواصل معك وتحويل الرؤية إلى واقع استثنائي.',
    buttonLabel: 'تواصل معنا',
    buttonUrl: '/contact',
    bannerUrl: '/assets/saeed_banner_new.png'
  };

  const readImage = (file: File | undefined, done: (value: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === 'string' && done(reader.result);
    reader.readAsDataURL(file);
  };

  const updateAccount = (id: string, patch: Partial<SocialAccount>) => {
    const next = socialAccounts.map(item => item.id === id ? { ...item, ...patch } : item);
    updateGlobal({ socialAccounts: next } as any);
  };

  const updateChannel = (id: string, patch: Partial<ChannelItem>) => {
    updateGlobal({ channels: channels.map(item => item.id === id ? { ...item, ...patch } : item) } as any);
  };

  const tabs = [
    ['overview', 'الرئيسية', LayoutDashboard],
    ['identity', 'الهوية والوصف والصور', Settings],
    ['hero', 'البنر الرئيسي', ImageIcon],
    ['buttons', 'الأزرار والتنقل', MousePointerClick],
    ['sections', 'أقسام الصفحة', Layers],
    ['accounts', 'الحسابات', Users],
    ['channels', 'القنوات', Radio],
    ['content-fields', 'مجالات المحتوى', Grid3X3],
    ['news', 'الأخبار', Newspaper],
    ['blog', 'المدونة', BookOpen],
    ['services', 'الخدمات', Briefcase],
    ['tools', 'الأدوات', Wrench],
    ['portfolio', 'الأعمال', FolderKanban],
    ['security', 'الحساب والحماية', Shield]
  ] as const;

  const chooseTab = (value: string) => {
    setTab(value);
    setSidebarOpen(false);
  };

  if (authLoading) return <div className="min-h-screen bg-[#080808] grid place-items-center text-white">جارٍ تحميل لوحة التحكم...</div>;
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#080808] grid place-items-center p-4"><button onClick={() => navigate('/admin/login')} className="rounded-xl bg-[#D51F2B] px-6 py-3 font-bold text-white">تسجيل الدخول للوحة التحكم</button></div>;
  }

  const SectionTitle = ({ title, desc }: { title: string; desc?: string }) => (
    <div className="mb-6"><h1 className="text-2xl sm:text-3xl font-black text-white">{title}</h1>{desc && <p className="mt-2 text-sm text-gray-400">{desc}</p>}</div>
  );

  const ImageControl = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
    <div className={cardClass}>
      <label className={labelClass}>{label}</label>
      {value && <img src={value} alt={label} className="mb-3 h-36 w-full rounded-xl object-cover bg-black" />}
      <input value={value || ''} onChange={e => onChange(e.target.value)} className={inputClass} placeholder="رابط الصورة أو المسار" />
      <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-[#171717] px-3 py-3 text-xs font-bold text-gray-200">
        <Upload className="h-4 w-4" /> رفع صورة من الجهاز
        <input type="file" accept="image/*" className="hidden" onChange={e => readImage(e.target.files?.[0], onChange)} />
      </label>
    </div>
  );

  const GenericList = ({ type }: { type: 'news' | 'blog' | 'services' | 'tools' | 'portfolio' | 'content-fields' }) => {
    const config: any = {
      news: { title: 'أخبار سعيد', list: data.news, titleKey: 'title', descKey: 'excerpt', imageKey: 'image', add: addNews, update: updateNews, remove: deleteNews },
      blog: { title: 'المدونة والمقالات', list: data.blog, titleKey: 'title', descKey: 'excerpt', imageKey: 'coverImage', add: addBlog, update: updateBlog, remove: deleteBlog },
      services: { title: 'الخدمات والأسعار', list: data.services, titleKey: 'title', descKey: 'description', imageKey: 'image', add: addService, update: updateService, remove: deleteService },
      tools: { title: 'الأدوات والموارد', list: data.tools, titleKey: 'name', descKey: 'description', imageKey: 'image', add: addTool, update: updateTool, remove: deleteTool },
      portfolio: { title: 'أعمال سعيد', list: data.portfolio, titleKey: 'title', descKey: 'description', imageKey: 'projectImage', add: addPortfolio, update: updatePortfolio, remove: deletePortfolio },
      'content-fields': { title: 'مجالات صناعة المحتوى', list: data.contentFields, titleKey: 'title', descKey: 'description', imageKey: 'image', add: addContentField, update: updateContentField, remove: deleteContentField }
    };
    const c = config[type];

    const makeBlank = () => {
      const t = Date.now();
      if (type === 'news') c.add({ id:`news-${t}`, slug:`news-${t}`, title:'عنصر جديد', excerpt:'', date:new Date().toLocaleDateString('ar-SA'), category:'عام', image:'' });
      if (type === 'blog') c.add({ id:`blog-${t}`, slug:`blog-${t}`, title:'مقال جديد', category:'مقالات', date:new Date().toLocaleDateString('ar-SA'), readingTime:'5 دقائق', author:data.global.websiteName, coverImage:'', excerpt:'', contentParagraphs:[''], likes:0, dislikes:0, favoritesCount:0 });
      if (type === 'services') c.add({ id:`service-${t}`, title:'خدمة جديدة', description:'', price:'', category:'عام', image:'', features:[] });
      if (type === 'tools') c.add({ id:`tool-${t}`, slug:`tool-${t}`, name:'أداة جديدة', category:'البرومبت', image:'', description:'' });
      if (type === 'portfolio') c.add({ id:`work-${t}`, slug:`work-${t}`, title:'عمل جديد', clientName:'', category:'التطوير', description:'', year:String(new Date().getFullYear()), logoImage:'', projectImage:'' });
      if (type === 'content-fields') c.add({ id:`field-${t}`, slug:`field-${t}`, title:'مجال جديد', description:'', image:'', categoryTag:'مجال' });
    };

    return <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><SectionTitle title={c.title} desc="تعديل الاسم والوصف والصورة مباشرة من هنا." /><button onClick={makeBlank} className="inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-4 py-2.5 text-xs font-bold text-white"><Plus className="h-4 w-4" /> إضافة عنصر</button></div>
      <div className="space-y-4">{c.list.map((item: any) => <div key={item.id} className={cardClass}>
        <div className="grid gap-4 lg:grid-cols-[160px_1fr]">
          <div>
            {item[c.imageKey] ? <img src={item[c.imageKey]} alt="" className="h-32 w-full rounded-xl object-cover" /> : <div className="grid h-32 place-items-center rounded-xl bg-black text-xs text-gray-600">بدون صورة</div>}
            <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#181818] p-2 text-[11px]"><Upload className="h-3.5 w-3.5" /> رفع صورة<input type="file" accept="image/*" className="hidden" onChange={e => readImage(e.target.files?.[0], value => c.update(item.id, { [c.imageKey]: value }))} /></label>
          </div>
          <div className="space-y-3">
            <input className={inputClass} value={item[c.titleKey] || ''} onChange={e => c.update(item.id, { [c.titleKey]: e.target.value })} placeholder="الاسم / العنوان" />
            <textarea className={`${inputClass} min-h-24`} value={item[c.descKey] || ''} onChange={e => c.update(item.id, { [c.descKey]: e.target.value })} placeholder="الوصف" />
            <input className={inputClass} value={item[c.imageKey] || ''} onChange={e => c.update(item.id, { [c.imageKey]: e.target.value })} placeholder="رابط الصورة" />
            <button onClick={() => c.remove(item.id)} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-bold text-red-400"><Trash2 className="h-4 w-4" /> حذف</button>
          </div>
        </div>
      </div>)}</div>
    </>;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#080808] text-white">
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#0b0b0b]/95 px-3 sm:px-5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#171717] lg:hidden" aria-label="فتح القائمة"><Menu className="h-5 w-5" /></button>
          <img src={data.global.logoUrl || '/assets/sba_logo_transparent.png'} alt="SBA" className="h-9 w-auto" />
          <span className="hidden text-xs font-bold text-gray-300 sm:block">لوحة تحكم سعيد بن عايض</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#171717]" aria-label="معاينة الموقع"><Eye className="h-4 w-4" /></a>
          <button onClick={logout} className="grid h-10 w-10 place-items-center rounded-xl border border-red-500/25 bg-red-950/30 text-red-400" aria-label="تسجيل الخروج"><LogOut className="h-4 w-4" /></button>
        </div>
      </header>

      {sidebarOpen && <button onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-[55] bg-black/65 lg:hidden" aria-label="إغلاق القائمة" />}
      <aside className={`fixed right-0 top-0 z-[60] h-dvh w-[84vw] max-w-[310px] border-l border-white/10 bg-[#0d0d0d] pt-16 transition-transform lg:w-72 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute left-3 top-3 lg:hidden"><button onClick={() => setSidebarOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl bg-[#181818]"><X className="h-5 w-5" /></button></div>
        <div className="h-full overflow-y-auto p-3 pb-8">
          <p className="mb-2 px-3 text-[11px] font-bold text-gray-500">إدارة الموقع</p>
          {tabs.map(([id, label, Icon]) => <button key={id} onClick={() => chooseTab(id)} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-xs font-bold transition ${tab === id ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}><Icon className="h-4 w-4 shrink-0" /><span className="grow">{label}</span><ChevronLeft className="h-3.5 w-3.5 opacity-40" /></button>)}
        </div>
      </aside>

      <main className="min-h-screen pt-16 lg:pr-72">
        <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {tab === 'overview' && <><SectionTitle title="لوحة التحكم" desc="التحكم في الصور والبنرات والوصف والأزرار والحسابات والقنوات ومحتوى الموقع." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
            ['الأخبار', data.news.length], ['الخدمات', data.services.length], ['الأعمال', data.portfolio.length], ['الأدوات', data.tools.length]
          ].map(([name, count]) => <div key={String(name)} className={cardClass}><div className="text-sm text-gray-400">{name}</div><div className="mt-2 text-3xl font-black">{count}</div></div>)}</div></>}

          {tab === 'identity' && <><SectionTitle title="الهوية والوصف والصور" /><div className="grid gap-4 lg:grid-cols-2"><div className={`${cardClass} space-y-4`}>
            <div><label className={labelClass}>اسم الموقع</label><input className={inputClass} value={data.global.websiteName} onChange={e => updateGlobal({ websiteName: e.target.value })} /></div>
            <div><label className={labelClass}>الاسم العربي</label><input className={inputClass} value={data.global.nameArabic} onChange={e => updateGlobal({ nameArabic: e.target.value })} /></div>
            <div><label className={labelClass}>الاسم الإنجليزي</label><input className={inputClass} value={data.global.nameEnglish} onChange={e => updateGlobal({ nameEnglish: e.target.value })} /></div>
            <div><label className={labelClass}>الوصف العام</label><textarea className={`${inputClass} min-h-32`} value={data.global.description} onChange={e => updateGlobal({ description: e.target.value })} /></div>
            <div><label className={labelClass}>البريد</label><input className={inputClass} value={data.global.contactEmail} onChange={e => updateGlobal({ contactEmail: e.target.value })} /></div>
            <div><label className={labelClass}>واتساب</label><input className={inputClass} value={data.global.whatsapp} onChange={e => updateGlobal({ whatsapp: e.target.value })} /></div>
          </div><div className="space-y-4"><ImageControl label="شعار الموقع" value={data.global.logoUrl} onChange={v => updateGlobal({ logoUrl: v })} /><ImageControl label="صورة SEO / البنر الافتراضي" value={data.global.defaultSeoImage} onChange={v => updateGlobal({ defaultSeoImage: v })} /></div></div></>}

          {tab === 'hero' && <><SectionTitle title="البنر الرئيسي" desc="تعديل النص والصورة والأزرار وبنر التعاون." /><div className="grid gap-4 lg:grid-cols-2"><div className={`${cardClass} space-y-4`}>
            <div><label className={labelClass}>العنوان</label><input className={inputClass} value={data.hero.heading} onChange={e => updateHero({ heading: e.target.value })} /></div>
            <div><label className={labelClass}>الوصف</label><textarea className={`${inputClass} min-h-32`} value={data.hero.description} onChange={e => updateHero({ description: e.target.value })} /></div>
            {data.hero.buttons.map((b, i) => <div key={i} className="grid gap-2 sm:grid-cols-2"><input className={inputClass} value={b.label} onChange={e => updateHero({ buttons: data.hero.buttons.map((x, j) => j === i ? { ...x, label: e.target.value } : x) })} placeholder="اسم الزر" /><input className={inputClass} value={b.url} onChange={e => updateHero({ buttons: data.hero.buttons.map((x, j) => j === i ? { ...x, url: e.target.value } : x) })} placeholder="رابط الزر" /></div>)}
          </div><ImageControl label="الصورة الشخصية في البنر" value={data.hero.portraitUrl} onChange={v => updateHero({ portraitUrl: v })} /></div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2"><div className={`${cardClass} space-y-3`}><div><label className={labelClass}>عنوان بنر التعاون</label><input className={inputClass} value={cta.title} onChange={e => updateGlobal({ cta: { ...cta, title: e.target.value } } as any)} /></div><div><label className={labelClass}>وصف بنر التعاون</label><textarea className={`${inputClass} min-h-24`} value={cta.description} onChange={e => updateGlobal({ cta: { ...cta, description: e.target.value } } as any)} /></div><div className="grid gap-2 sm:grid-cols-2"><input className={inputClass} value={cta.buttonLabel} onChange={e => updateGlobal({ cta: { ...cta, buttonLabel: e.target.value } } as any)} /><input className={inputClass} value={cta.buttonUrl} onChange={e => updateGlobal({ cta: { ...cta, buttonUrl: e.target.value } } as any)} /></div></div><ImageControl label="صورة بنر التعاون" value={cta.bannerUrl} onChange={v => updateGlobal({ cta: { ...cta, bannerUrl: v } } as any)} /></div></>}

          {tab === 'buttons' && <><SectionTitle title="الأزرار والتنقل" /><div className="space-y-4"><div className={cardClass}><div className="mb-3 grid gap-2 sm:grid-cols-2"><div><label className={labelClass}>اسم زر التواصل</label><input className={inputClass} value={data.navbar.contactBtnLabel} onChange={e => updateNavbar({ contactBtnLabel: e.target.value })} /></div><div><label className={labelClass}>رابط زر التواصل</label><input className={inputClass} value={data.navbar.contactBtnUrl} onChange={e => updateNavbar({ contactBtnUrl: e.target.value })} /></div></div></div>{data.navbar.links.map(link => <div key={link.id} className={cardClass}><div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]"><input className={inputClass} value={link.label} onChange={e => updateNavbar({ links: data.navbar.links.map(x => x.id === link.id ? { ...x, label: e.target.value } : x) })} /><input className={inputClass} value={link.url} onChange={e => updateNavbar({ links: data.navbar.links.map(x => x.id === link.id ? { ...x, url: e.target.value } : x) })} /><button onClick={() => updateNavbar({ links: data.navbar.links.map(x => x.id === link.id ? { ...x, isEnabled: !x.isEnabled } : x) })} className={`rounded-xl px-3 py-2 text-xs font-bold ${link.isEnabled ? 'bg-green-950 text-green-400' : 'bg-gray-900 text-gray-500'}`}>{link.isEnabled ? 'ظاهر' : 'مخفي'}</button><button onClick={() => updateNavbar({ links: data.navbar.links.filter(x => x.id !== link.id) })} className="rounded-xl border border-red-500/30 px-3 text-red-400"><Trash2 className="h-4 w-4" /></button></div></div>)}<button onClick={() => updateNavbar({ links: [...data.navbar.links, { id:`n-${Date.now()}`, label:'رابط جديد', url:'/', isExternal:false, isEnabled:true, order:data.navbar.links.length + 1 }] })} className="inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-4 py-3 text-xs font-bold"><Plus className="h-4 w-4" /> إضافة زر / رابط</button></div></>}

          {tab === 'sections' && <><SectionTitle title="أقسام الصفحة" desc="تعديل اسم كل قسم ووصفه والشارة وإظهاره أو إخفاؤه." /><div className="space-y-4">{data.sections.map(section => <div key={section.id} className={cardClass}><div className="grid gap-3 lg:grid-cols-3"><input className={inputClass} value={section.title} onChange={e => updateSections(data.sections.map(x => x.id === section.id ? { ...x, title:e.target.value } : x))} /><input className={inputClass} value={section.badge} onChange={e => updateSections(data.sections.map(x => x.id === section.id ? { ...x, badge:e.target.value } : x))} /><button onClick={() => updateSections(data.sections.map(x => x.id === section.id ? { ...x, isVisible:!x.isVisible } : x))} className={`rounded-xl px-3 py-2 text-xs font-bold ${section.isVisible ? 'bg-green-950 text-green-400' : 'bg-gray-900 text-gray-500'}`}>{section.isVisible ? 'القسم ظاهر' : 'القسم مخفي'}</button></div><textarea className={`${inputClass} mt-3 min-h-20`} value={section.subtitle} onChange={e => updateSections(data.sections.map(x => x.id === section.id ? { ...x, subtitle:e.target.value } : x))} /></div>)}</div></>}

          {tab === 'accounts' && <><SectionTitle title="الحسابات" desc="الحسابات منفصلة عن القنوات. تقدر ترفع صورة أيقونة لكل تطبيق بنفسك." /><div className="grid gap-4 md:grid-cols-2">{socialAccounts.map(account => <div key={account.id} className={cardClass}><div className="mb-4 flex items-center gap-3">{account.iconImage ? <img src={account.iconImage} alt="" className="h-12 w-12 rounded-xl object-cover" /> : <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#1b1b1b] text-[10px] text-gray-500">أيقونة</div>}<div className="font-black">{account.platform}</div></div><div className="space-y-3"><input className={inputClass} value={account.username} onChange={e => updateAccount(account.id, { username:e.target.value })} placeholder="اسم المستخدم" /><input className={inputClass} value={account.url} onChange={e => updateAccount(account.id, { url:e.target.value })} placeholder="رابط الحساب" /><input className={inputClass} value={account.iconImage} onChange={e => updateAccount(account.id, { iconImage:e.target.value })} placeholder="رابط صورة التطبيق" /><label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 p-3 text-xs"><Upload className="h-4 w-4" /> رفع صورة أيقونة التطبيق<input type="file" accept="image/*" className="hidden" onChange={e => readImage(e.target.files?.[0], value => updateAccount(account.id, { iconImage:value }))} /></label><button onClick={() => updateAccount(account.id, { enabled:!account.enabled })} className={`w-full rounded-xl py-2 text-xs font-bold ${account.enabled ? 'bg-green-950 text-green-400' : 'bg-gray-900 text-gray-500'}`}>{account.enabled ? 'الحساب ظاهر' : 'الحساب مخفي'}</button></div></div>)}</div></>}

          {tab === 'channels' && <><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><SectionTitle title="القنوات" desc="قسم مستقل للقنوات، وليس حسابات التواصل." /><button onClick={() => updateGlobal({ channels:[...channels, { id:`channel-${Date.now()}`, name:'قناة جديدة', platform:'YouTube', url:'', description:'', iconImage:'', enabled:true }] } as any)} className="inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-4 py-2.5 text-xs font-bold"><Plus className="h-4 w-4" /> إضافة قناة</button></div><div className="space-y-4">{channels.length === 0 && <div className={`${cardClass} text-sm text-gray-500`}>ما فيه قنوات مضافة حتى الآن. اضغط «إضافة قناة».</div>}{channels.map(channel => <div key={channel.id} className={cardClass}><div className="grid gap-4 lg:grid-cols-[100px_1fr]"><div>{channel.iconImage ? <img src={channel.iconImage} className="h-24 w-24 rounded-xl object-cover" alt="" /> : <div className="grid h-24 w-24 place-items-center rounded-xl bg-black text-xs text-gray-600">صورة</div>}<label className="mt-2 flex cursor-pointer justify-center rounded-lg border border-white/10 p-2 text-[10px]"><Upload className="ml-1 h-3 w-3" /> رفع<input type="file" accept="image/*" className="hidden" onChange={e => readImage(e.target.files?.[0], v => updateChannel(channel.id, { iconImage:v }))} /></label></div><div className="space-y-3"><div className="grid gap-2 sm:grid-cols-2"><input className={inputClass} value={channel.name} onChange={e => updateChannel(channel.id, { name:e.target.value })} placeholder="اسم القناة" /><input className={inputClass} value={channel.platform} onChange={e => updateChannel(channel.id, { platform:e.target.value })} placeholder="المنصة" /></div><input className={inputClass} value={channel.url} onChange={e => updateChannel(channel.id, { url:e.target.value })} placeholder="رابط القناة" /><textarea className={`${inputClass} min-h-20`} value={channel.description} onChange={e => updateChannel(channel.id, { description:e.target.value })} placeholder="وصف القناة" /><div className="flex gap-2"><button onClick={() => updateChannel(channel.id, { enabled:!channel.enabled })} className={`rounded-lg px-3 py-2 text-xs font-bold ${channel.enabled ? 'bg-green-950 text-green-400' : 'bg-gray-900 text-gray-500'}`}>{channel.enabled ? 'ظاهرة' : 'مخفية'}</button><button onClick={() => updateGlobal({ channels:channels.filter(x => x.id !== channel.id) } as any)} className="rounded-lg border border-red-500/30 px-3 text-red-400"><Trash2 className="h-4 w-4" /></button></div></div></div></div>)}</div></>}

          {tab === 'content-fields' && <GenericList type="content-fields" />}
          {tab === 'news' && <GenericList type="news" />}
          {tab === 'blog' && <GenericList type="blog" />}
          {tab === 'services' && <GenericList type="services" />}
          {tab === 'tools' && <GenericList type="tools" />}
          {tab === 'portfolio' && <GenericList type="portfolio" />}

          {tab === 'security' && <><SectionTitle title="الحساب والحماية" /><form onSubmit={async e => { e.preventDefault(); if (newPass.length < 12) { setPassMessage('كلمة المرور الجديدة لازم تكون 12 خانة على الأقل.'); return; } const ok = await changePassword(currentPass, newPass); setPassMessage(ok ? 'تم تغيير كلمة المرور. سجّل دخولك من جديد.' : 'تعذر تغيير كلمة المرور. تأكد من الحالية.'); }} className={`${cardClass} max-w-xl space-y-4`}><div><label className={labelClass}>كلمة المرور الحالية</label><input type="password" className={inputClass} value={currentPass} onChange={e => setCurrentPass(e.target.value)} /></div><div><label className={labelClass}>كلمة المرور الجديدة</label><input type="password" className={inputClass} value={newPass} onChange={e => setNewPass(e.target.value)} /></div>{passMessage && <p className="text-xs text-gray-300">{passMessage}</p>}<button className="inline-flex items-center gap-2 rounded-xl bg-[#D51F2B] px-5 py-3 text-xs font-bold"><Save className="h-4 w-4" /> حفظ كلمة المرور</button></form></>}
        </div>
      </main>
    </div>
  );
};
