import { siteData } from './siteData';
import { ContentFieldItem, NewsItem, ToolItem, PortfolioItem, ServiceItem, BlogPostItem } from '../types';

export interface ThemeSettings {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  footerBg: string;
  link: string;
  linkHover: string;
}

export interface GlobalSettings {
  websiteName: string;
  nameArabic: string;
  nameEnglish: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  defaultSeoImage: string;
  contactEmail: string;
  whatsapp: string;
  copyrightText: string;
  socials: {
    x: string;
    instagram: string;
    tiktok: string;
    snapchat: string;
    youtube: string;
    linkedin: string;
  };
}

export interface NavItemConfig {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
  isEnabled: boolean;
  order: number;
}

export interface NavbarSettings {
  logoWidthDesktop: number;
  contactBtnLabel: string;
  contactBtnUrl: string;
  links: NavItemConfig[];
}

export interface HeroSettings {
  heading: string;
  description: string;
  portraitUrl: string;
  isVisible: boolean;
  buttons: { label: string; url: string; isPrimary: boolean }[];
  socials: { name: string; url: string; icon: string }[];
}

export interface SectionConfig {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  isVisible: boolean;
  order: number;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadDate: string;
}

export interface SubmissionItem {
  id: string;
  type: 'suggestion' | 'complaint' | 'contact';
  name: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
  attachmentUrl?: string;
  date: string;
  status: 'جديد' | 'قيد المراجعة' | 'تم الحل' | 'مغلق';
  adminNotes?: string;
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
}

export interface CMSDataStore {
  theme: ThemeSettings;
  global: GlobalSettings;
  navbar: NavbarSettings;
  hero: HeroSettings;
  sections: SectionConfig[];
  contentFields: ContentFieldItem[];
  news: NewsItem[];
  blog: BlogPostItem[];
  tools: ToolItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  pages: PageContent[];
  media: MediaFile[];
  submissions: SubmissionItem[];
}

// Initial Default CMS Data loaded directly from current approved siteData
export const defaultCMSData: CMSDataStore = {
  theme: {
    primary: '#D51F2B',
    secondary: '#B5121B',
    accent: '#E52E3C',
    background: '#080808',
    surface: '#121212',
    card: '#151515',
    text: '#FFFFFF',
    muted: '#B8B8B8',
    border: 'rgba(255, 255, 255, 0.1)',
    footerBg: '#050505',
    link: '#D51F2B',
    linkHover: '#E52E3C'
  },
  global: {
    websiteName: siteData.brand.name,
    nameArabic: siteData.brand.name,
    nameEnglish: siteData.brand.nameEnglish,
    description: siteData.brand.bio,
    logoUrl: '/assets/sba_logo_transparent.png',
    faviconUrl: '/assets/logo_sba.png',
    defaultSeoImage: '/assets/saeed_banner_new.png',
    contactEmail: siteData.brand.email,
    whatsapp: siteData.brand.whatsapp,
    copyrightText: `© 2026 ${siteData.brand.name} — جميع الحقوق محفوظة.`,
    socials: siteData.brand.socials
  },
  navbar: {
    logoWidthDesktop: 65,
    contactBtnLabel: 'تواصل معنا',
    contactBtnUrl: '/contact',
    links: [
      { id: 'n1', label: 'الرئيسية', url: '/', isExternal: false, isEnabled: true, order: 1 },
      { id: 'n2', label: 'مجالات المحتوى', url: '/#content-fields', isExternal: false, isEnabled: true, order: 2 },
      { id: 'n3', label: 'مجالات العمل', url: '/#work-fields', isExternal: false, isEnabled: true, order: 3 },
      { id: 'n4', label: 'خدمات سعيد', url: '/services', isExternal: false, isEnabled: true, order: 4 },
      { id: 'n5', label: 'أخبار سعيد', url: '/news', isExternal: false, isEnabled: true, order: 5 },
      { id: 'n6', label: 'أعمال سعيد', url: '/works', isExternal: false, isEnabled: true, order: 6 },
      { id: 'n7', label: 'أدوات سعيد', url: '/resources', isExternal: false, isEnabled: true, order: 7 },
      { id: 'n8', label: 'عن سعيد', url: '/about', isExternal: false, isEnabled: true, order: 8 },
      { id: 'n9', label: 'بلوق سعيد', url: '/blog', isExternal: false, isEnabled: true, order: 9 }
    ]
  },
  hero: {
    heading: 'سعيد بن عايض',
    description: 'صانع محتوى ومطور أعمال، أعمل في صناعة المحتوى والتسويق والذكاء الاصطناعي وبناء التجارب والواجهات الرقمية.',
    portraitUrl: '/assets/saeed_portrait_new.jpg',
    isVisible: true,
    buttons: [
      { label: 'تواصل معي', url: '/contact', isPrimary: true },
      { label: 'استكشف أعمالي', url: '/works', isPrimary: false }
    ],
    socials: [
      { name: 'X', url: siteData.brand.socials.x, icon: 'twitter' },
      { name: 'Instagram', url: siteData.brand.socials.instagram, icon: 'instagram' },
      { name: 'TikTok', url: siteData.brand.socials.tiktok, icon: 'tiktok' },
      { name: 'Snapchat', url: siteData.brand.socials.snapchat, icon: 'snapchat' },
      { name: 'YouTube', url: siteData.brand.socials.youtube, icon: 'youtube' },
      { name: 'LinkedIn', url: siteData.brand.socials.linkedin, icon: 'linkedin' }
    ]
  },
  sections: [
    { id: 'hero', title: 'البنر الرئيسي', subtitle: '', badge: 'هوية سعيد', isVisible: true, order: 1 },
    { id: 'content-fields', title: 'مجالات صناعة المحتوى', subtitle: 'محتوى متنوع بهوية مختلفة لكل مجال.', badge: 'صناعة المحتوى الإبداعي', isVisible: true, order: 2 },
    { id: 'work-fields', title: 'مجالات العمل والتطوير', subtitle: 'حلول متكاملة لبناء الحضور الرقمي والنمو المستمر.', badge: 'التطوير والاستراتيجية', isVisible: true, order: 3 },
    { id: 'services', title: 'خدمات سعيد', subtitle: 'خدمات احترافية مصممة خصيصاً لتلبية احتياجات العلامات والمشاريع.', badge: 'الخدمات والاستشارات', isVisible: true, order: 4 },
    { id: 'news', title: 'أخبار سعيد', subtitle: 'آخر الأخبار والتغطيات وإعلانات المشاريع والشراكات الجديدة.', badge: 'المركز الإخباري والتغطيات', isVisible: true, order: 5 },
    { id: 'resources', title: 'أدوات سعيد', subtitle: 'مكتبة أدوات متكاملة تشمل البرومبت، واجهات الساعات، الخلفيات، الفلاتر والاختصارات.', badge: 'المكتبة والأدوات الحصرية', isVisible: true, order: 6 },
    { id: 'portfolio', title: 'أعمال سعيد', subtitle: 'مقتطفات استثنائية ونماذج واقعية منفذة للعملاء والمشاريع التجارية.', badge: 'معرض الأعمال والشركاء', isVisible: true, order: 7 }
  ],
  contentFields: siteData.contentFields,
  news: siteData.news,
  blog: siteData.blogPosts,
  tools: siteData.tools,
  services: siteData.services,
  portfolio: siteData.portfolio,
  pages: [
    { id: 'about', title: 'عن سعيد بن عايض', slug: 'about', content: siteData.brand.bio, isPublished: true },
    { id: 'privacy', title: 'سياسة الخصوصية', slug: 'privacy', content: 'نلتزم في موقع سعيد بن عايض بحماية خصوصيتك وبياناتك الشخصية بأعلى معايير الأمان والتشفير.', isPublished: true },
    { id: 'terms', title: 'الشروط والأحكام', slug: 'terms', content: 'استخدامك للموقع والأدوات والخدمات المتاحة يعني موافقتك الكاملة على الشروط والأحكام.', isPublished: true }
  ],
  media: [
    { id: 'm1', name: 'saeed_portrait_new.jpg', url: '/assets/saeed_portrait_new.jpg', type: 'image', size: '1.2 MB', uploadDate: '2026-08-28' },
    { id: 'm2', name: 'sba_logo_transparent.png', url: '/assets/sba_logo_transparent.png', type: 'image', size: '450 KB', uploadDate: '2026-08-28' },
    { id: 'm3', name: 'content_vlogs.png', url: '/assets/content_vlogs.png', type: 'image', size: '890 KB', uploadDate: '2026-08-28' }
  ],
  submissions: [
    {
      id: 'sub-1',
      type: 'suggestion',
      name: 'عبدالله العتيبي',
      email: 'abdullah@example.com',
      message: 'اقترح إضافة قسم خاص بدورة إعداد الفلاتر السينمائية في لايت روم.',
      date: '28 أغسطس 2026',
      status: 'جديد'
    },
    {
      id: 'sub-2',
      type: 'contact',
      name: 'محمد الغامدي',
      email: 'm.ghamdi@example.com',
      message: 'نرغب في التعاون الاستراتيجي مع سعيد بن عايض لإدارة حملة تسويق عقارية.',
      date: '26 أغسطس 2026',
      status: 'قيد المراجعة'
    }
  ]
};

const STORAGE_KEY = 'saeed_cms_data';

// Local Storage & Server Sync Manager
export const loadCMSData = (): CMSDataStore => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultCMSData, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load local CMS data', e);
  }
  return defaultCMSData;
};

export const saveCMSData = (data: CMSDataStore): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Apply CSS Variables Live to DOM
    applyThemeVariables(data.theme);
  } catch (e) {
    console.error('Failed to save local CMS data', e);
  }
};

export const applyThemeVariables = (theme: ThemeSettings): void => {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-background', theme.background);
  root.style.setProperty('--color-surface', theme.surface);
  root.style.setProperty('--color-card', theme.card);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-muted', theme.muted);
  root.style.setProperty('--color-border', theme.border);
  root.style.setProperty('--color-footer-bg', theme.footerBg);
  root.style.setProperty('--color-link', theme.link);
  root.style.setProperty('--color-link-hover', theme.linkHover);
};
