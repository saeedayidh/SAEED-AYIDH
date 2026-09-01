export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export interface MediaGalleryItem {
  url: string;
  caption?: string;
}

export interface VideoEmbedItem {
  type: 'youtube' | 'vimeo' | 'local';
  url: string;
  title?: string;
}

export interface LinkItem {
  title: string;
  url: string;
  type?: 'external' | 'download' | 'social';
  badge?: string;
}

export interface ContentFieldItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  intro?: string;
  image: string;
  categoryTag: string;
  fullContent?: string;
  galleryImages?: string[];
  videos?: VideoEmbedItem[];
  externalLinks?: LinkItem[];
  socialLinks?: LinkItem[];
  featuredItems?: string[];
  latestNewsSlugs?: string[];
}

export interface WorkFieldItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  features: string[];
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  contentParagraphs?: string[];
  headings?: string[];
  galleryImages?: string[];
  videos?: VideoEmbedItem[];
  externalLinks?: LinkItem[];
  sourceLinks?: LinkItem[];
  relatedNewsSlugs?: string[];
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: 'البرومبت' | 'واجهات الساعات' | 'خلفيات الجوال' | 'الفلاتر' | 'الاختصارات' | 'صفحة حسابات';
  image: string;
  link?: string;
  description?: string;
  whatItDoes?: string;
  howToUse?: string[];
  screenshots?: string[];
  videoTutorial?: VideoEmbedItem;
  downloadUrl?: string;
  externalLinks?: LinkItem[];
  requirements?: string[];
  compatibility?: string[];
  // Category specific fields:
  promptText?: string;
  wallpaperResolution?: string;
  watchFaceCompatibility?: string[];
  shortcutSetupGuide?: string[];
  filterBeforeAfter?: { before: string; after: string };
  relatedToolsSlugs?: string[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  category: 'التغطيات' | 'التسويق' | 'المحتوى' | 'التطوير' | 'التصوير';
  tagline?: string;
  description: string;
  year: string;
  logoImage: string;
  projectImage: string;
  overview?: string;
  challenge?: string;
  myRole?: string;
  delivered?: string[];
  processSteps?: { title: string; desc: string }[];
  results?: string[];
  galleryImages?: string[];
  videos?: VideoEmbedItem[];
  externalLinks?: LinkItem[];
  services?: string[];
  relatedWorkSlugs?: string[];
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  coverImage: string;
  excerpt: string;
  contentParagraphs: string[];
  headings?: string[];
  galleryImages?: string[];
  videos?: VideoEmbedItem[];
  externalLinks?: LinkItem[];
  quotes?: string[];
  likes: number;
  dislikes: number;
  favoritesCount: number;
  relatedBlogSlugs?: string[];
}
