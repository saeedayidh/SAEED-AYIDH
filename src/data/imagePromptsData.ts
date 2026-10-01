import items from './imagePrompts.json';
export type ImagePrompt = typeof items[number];
export type PromptPlatform = 'all' | 'chatgpt' | 'gemini' | 'claude' | 'grok' | 'other';
export const promptPlatforms: { id: PromptPlatform; ar: string; en: string }[] = [
  { id: 'all', ar: 'الكل', en: 'All' }, { id: 'chatgpt', ar: 'شات جي بي تي', en: 'ChatGPT' },
  { id: 'gemini', ar: 'جيميناي', en: 'Gemini' }, { id: 'claude', ar: 'كلود', en: 'Claude' },
  { id: 'grok', ar: 'جروك', en: 'Grok' }, { id: 'other', ar: 'أخرى', en: 'Other' },
];
export const promptCategories = [
  { id: 'all', ar: 'الكل', en: 'All' }, { id: 'portrait', ar: 'بورتريه سينمائي', en: 'Cinematic Portrait' },
  { id: 'scenes', ar: 'مشاهد وشخصيات', en: 'Scenes & Characters' }, { id: 'art', ar: 'فنّي ورسم', en: 'Art & Illustration' },
  { id: 'concepts', ar: 'مفاهيم وتأثيرات', en: 'Concepts & Effects' }, { id: '3d', ar: 'ثري دي ومجسمات', en: '3D & Models' },
  { id: 'mono', ar: 'أبيض وأسود', en: 'Black & White' },
];
export const imagePrompts: ImagePrompt[] = items;
// These are natural-language prompts suitable for multiple image tools.
// Claude is a prompt-writing workflow rather than native photo generation.
export function promptText(item: ImagePrompt, language: 'ar' | 'en', platform: PromptPlatform) {
  const text = language === 'ar' ? item.promptAr : item.promptEn;
  if (platform !== 'claude') return text;
  return (language === 'ar' ? 'صغ برومبتًا احترافيًا جاهزًا لأداة توليد صور بناءً على الوصف التالي. حافظ على شروط الهوية والملامح والشعارات، ولا تنشئ الصورة أو تدّعِ توليدها. أعد البرومبت فقط:\n\n' : 'Write a polished prompt for an image-generation tool from the following brief. Preserve all identity, facial-feature and logo constraints. Do not generate an image or claim to have done so. Return only the prompt:\n\n') + text;
}
export function selectImagePrompts(category: string, query: string, sort: string, platform: PromptPlatform = 'all') {
  const q = query.trim().toLocaleLowerCase();
  return imagePrompts.filter(item => (platform === 'all' || item.platforms.includes(platform)) && (category === 'all' || item.category === category) && `${item.title} ${item.titleEn} ${item.description} ${item.descriptionEn} ${item.promptAr} ${item.promptEn}`.toLocaleLowerCase().includes(q))
    .sort((a, b) => sort === 'name' ? a.title.localeCompare(b.title, 'ar') : Number(b.featured) - Number(a.featured));
}
