import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CMSDataStore,
  loadCMSData,
  saveCMSData,
  applyThemeVariables,
  defaultCMSData,
  ThemeSettings,
  GlobalSettings,
  NavbarSettings,
  HeroSettings,
  SectionConfig,
  SubmissionItem,
  MediaFile
} from '../data/cmsStorage';
import { ContentFieldItem, NewsItem, ToolItem, PortfolioItem, ServiceItem, BlogPostItem } from '../types';

interface CMSContextType {
  data: CMSDataStore;
  isAuthenticated: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  updateTheme: (theme: Partial<ThemeSettings>) => void;
  resetThemeToDefault: () => void;
  updateGlobal: (global: Partial<GlobalSettings>) => void;
  updateNavbar: (navbar: Partial<NavbarSettings>) => void;
  updateHero: (hero: Partial<HeroSettings>) => void;
  updateSections: (sections: SectionConfig[]) => void;
  
  // CMS Item Mutations
  addContentField: (item: ContentFieldItem) => void;
  updateContentField: (id: string, item: Partial<ContentFieldItem>) => void;
  deleteContentField: (id: string) => void;

  addNews: (item: NewsItem) => void;
  updateNews: (id: string, item: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;

  addBlog: (item: BlogPostItem) => void;
  updateBlog: (id: string, item: Partial<BlogPostItem>) => void;
  deleteBlog: (id: string) => void;

  addTool: (item: ToolItem) => void;
  updateTool: (id: string, item: Partial<ToolItem>) => void;
  deleteTool: (id: string) => void;

  addService: (item: ServiceItem) => void;
  updateService: (id: string, item: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  addPortfolio: (item: PortfolioItem) => void;
  updatePortfolio: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: string) => void;

  addMedia: (file: MediaFile) => void;
  deleteMedia: (id: string) => void;

  addSubmission: (sub: Omit<SubmissionItem, 'id' | 'date' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: SubmissionItem['status'], notes?: string) => void;
  deleteSubmission: (id: string) => void;

  resetAllToDefault: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const ADMIN_AUTH_KEY = 'saeed_admin_authenticated';

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSDataStore>(loadCMSData);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });

  useEffect(() => {
    applyThemeVariables(data.theme);
  }, [data.theme]);

  const updateStateAndSave = (newData: CMSDataStore) => {
    setData(newData);
    saveCMSData(newData);
  };

  const login = (pass: string): boolean => {
    // Default secure password check (saeed2026! or admin)
    if (pass === 'saeed2026!' || pass === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const updateTheme = (themeUpdates: Partial<ThemeSettings>) => {
    const updatedTheme = { ...data.theme, ...themeUpdates };
    updateStateAndSave({ ...data, theme: updatedTheme });
  };

  const resetThemeToDefault = () => {
    updateStateAndSave({ ...data, theme: defaultCMSData.theme });
  };

  const updateGlobal = (globalUpdates: Partial<GlobalSettings>) => {
    updateStateAndSave({ ...data, global: { ...data.global, ...globalUpdates } });
  };

  const updateNavbar = (navbarUpdates: Partial<NavbarSettings>) => {
    updateStateAndSave({ ...data, navbar: { ...data.navbar, ...navbarUpdates } });
  };

  const updateHero = (heroUpdates: Partial<HeroSettings>) => {
    updateStateAndSave({ ...data, hero: { ...data.hero, ...heroUpdates } });
  };

  const updateSections = (sections: SectionConfig[]) => {
    updateStateAndSave({ ...data, sections });
  };

  // Content Fields
  const addContentField = (item: ContentFieldItem) => {
    updateStateAndSave({ ...data, contentFields: [item, ...data.contentFields] });
  };
  const updateContentField = (id: string, item: Partial<ContentFieldItem>) => {
    updateStateAndSave({
      ...data,
      contentFields: data.contentFields.map(cf => cf.id === id ? { ...cf, ...item } : cf)
    });
  };
  const deleteContentField = (id: string) => {
    updateStateAndSave({
      ...data,
      contentFields: data.contentFields.filter(cf => cf.id !== id)
    });
  };

  // News
  const addNews = (item: NewsItem) => {
    updateStateAndSave({ ...data, news: [item, ...data.news] });
  };
  const updateNews = (id: string, item: Partial<NewsItem>) => {
    updateStateAndSave({
      ...data,
      news: data.news.map(n => n.id === id ? { ...n, ...item } : n)
    });
  };
  const deleteNews = (id: string) => {
    updateStateAndSave({ ...data, news: data.news.filter(n => n.id !== id) });
  };

  // Blog
  const addBlog = (item: BlogPostItem) => {
    updateStateAndSave({ ...data, blog: [item, ...data.blog] });
  };
  const updateBlog = (id: string, item: Partial<BlogPostItem>) => {
    updateStateAndSave({
      ...data,
      blog: data.blog.map(b => b.id === id ? { ...b, ...item } : b)
    });
  };
  const deleteBlog = (id: string) => {
    updateStateAndSave({ ...data, blog: data.blog.filter(b => b.id !== id) });
  };

  // Tools
  const addTool = (item: ToolItem) => {
    updateStateAndSave({ ...data, tools: [item, ...data.tools] });
  };
  const updateTool = (id: string, item: Partial<ToolItem>) => {
    updateStateAndSave({
      ...data,
      tools: data.tools.map(t => t.id === id ? { ...t, ...item } : t)
    });
  };
  const deleteTool = (id: string) => {
    updateStateAndSave({ ...data, tools: data.tools.filter(t => t.id !== id) });
  };

  // Services
  const addService = (item: ServiceItem) => {
    updateStateAndSave({ ...data, services: [item, ...data.services] });
  };
  const updateService = (id: string, item: Partial<ServiceItem>) => {
    updateStateAndSave({
      ...data,
      services: data.services.map(s => s.id === id ? { ...s, ...item } : s)
    });
  };
  const deleteService = (id: string) => {
    updateStateAndSave({ ...data, services: data.services.filter(s => s.id !== id) });
  };

  // Portfolio
  const addPortfolio = (item: PortfolioItem) => {
    updateStateAndSave({ ...data, portfolio: [item, ...data.portfolio] });
  };
  const updatePortfolio = (id: string, item: Partial<PortfolioItem>) => {
    updateStateAndSave({
      ...data,
      portfolio: data.portfolio.map(p => p.id === id ? { ...p, ...item } : p)
    });
  };
  const deletePortfolio = (id: string) => {
    updateStateAndSave({ ...data, portfolio: data.portfolio.filter(p => p.id !== id) });
  };

  // Media
  const addMedia = (file: MediaFile) => {
    updateStateAndSave({ ...data, media: [file, ...data.media] });
  };
  const deleteMedia = (id: string) => {
    updateStateAndSave({ ...data, media: data.media.filter(m => m.id !== id) });
  };

  // Submissions (Suggestions, Complaints, Contact)
  const addSubmission = (sub: Omit<SubmissionItem, 'id' | 'date' | 'status'>) => {
    const newItem: SubmissionItem = {
      ...sub,
      id: 'sub-' + Date.now(),
      date: new Date().toLocaleDateString('ar-SA'),
      status: 'جديد'
    };
    updateStateAndSave({ ...data, submissions: [newItem, ...data.submissions] });
  };

  const updateSubmissionStatus = (id: string, status: SubmissionItem['status'], notes?: string) => {
    updateStateAndSave({
      ...data,
      submissions: data.submissions.map(s => s.id === id ? { ...s, status, adminNotes: notes || s.adminNotes } : s)
    });
  };

  const deleteSubmission = (id: string) => {
    updateStateAndSave({ ...data, submissions: data.submissions.filter(s => s.id !== id) });
  };

  const resetAllToDefault = () => {
    updateStateAndSave(defaultCMSData);
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        isAuthenticated,
        login,
        logout,
        updateTheme,
        resetThemeToDefault,
        updateGlobal,
        updateNavbar,
        updateHero,
        updateSections,
        addContentField,
        updateContentField,
        deleteContentField,
        addNews,
        updateNews,
        deleteNews,
        addBlog,
        updateBlog,
        deleteBlog,
        addTool,
        updateTool,
        deleteTool,
        addService,
        updateService,
        deleteService,
        addPortfolio,
        updatePortfolio,
        deletePortfolio,
        addMedia,
        deleteMedia,
        addSubmission,
        updateSubmissionStatus,
        deleteSubmission,
        resetAllToDefault
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
