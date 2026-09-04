import React,{createContext,useContext,useEffect,useState} from 'react';

export type SiteLanguage='ar'|'en';
type LanguageContextValue={language:SiteLanguage;setLanguage:(v:SiteLanguage)=>void;toggleLanguage:()=>void;isArabic:boolean};
const LanguageContext=createContext<LanguageContextValue|undefined>(undefined);

export const LanguageProvider:React.FC<{children:React.ReactNode}>=({children})=>{
 const [language,setLanguageState]=useState<SiteLanguage>(()=>localStorage.getItem('sba_language')==='en'?'en':'ar');
 const setLanguage=(v:SiteLanguage)=>{setLanguageState(v);localStorage.setItem('sba_language',v)};
 const toggleLanguage=()=>setLanguage(language==='ar'?'en':'ar');
 useEffect(()=>{document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr'},[language]);
 return <LanguageContext.Provider value={{language,setLanguage,toggleLanguage,isArabic:language==='ar'}}>{children}</LanguageContext.Provider>;
};
export const useLanguage=()=>{const c=useContext(LanguageContext);if(!c)throw new Error('useLanguage must be used within LanguageProvider');return c};
