import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { publicEnglish } from '../i18n/publicEnglish';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'سعيد بن عايض | صانع محتوى ومطور أعمال، أعمل في صناعة المحتوى والتسويق والذكاء الاصطناعي وبناء الواجهات الرقمية.',
  image = '/assets/saeed_banner_new.png',
  url,
  type = 'website'
}) => {
  const { language } = useLanguage();
  const translate = (value:string) => { if(language!=='en') return value; if(publicEnglish[value]) return publicEnglish[value]; let out=value; for(const [ar,en] of Object.entries(publicEnglish).sort((a,b)=>b[0].length-a[0].length)) if(out.includes(ar)) out=out.split(ar).join(en); return out; };
  const localizedTitle=translate(title),localizedDescription=translate(description);
  const fullTitle = `${localizedTitle} | ${language==='en'?'Saeed Bin Ayidh':'سعيد بن عايض'}`;
  const currentUrl = url || window.location.href;

  useEffect(() => {
    // Dynamic Document Title
    document.title = fullTitle;

    // Helper to set meta attribute
    const setMeta = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.replace('meta[name="', '').replace('"]', '');
          element.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const property = selector.replace('meta[property="', '').replace('"]', '');
          element.setAttribute('property', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', localizedDescription);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', localizedDescription);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[property="og:url"]', 'content', currentUrl);
    setMeta('meta[property="og:type"]', 'content', type);
  }, [fullTitle, localizedDescription, image, currentUrl, type]);

  return null;
};
