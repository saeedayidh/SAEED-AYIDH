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
  authLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  updateTheme: (theme: Partial<ThemeSettings>) => void;
  resetThemeToDefault: () => void;
  updateGlobal: (global: Partial<GlobalSettings>) => void;
  updateNavbar: (navbar: Partial<NavbarSettings>) => void;
  updateHero: (hero: Partial<HeroSettings>) => void;
  updateSections: (sections: SectionConfig[]) => void;
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

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSDataStore>(loadCMSData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    applyThemeVariables(data.theme);
  }, [data.theme]);

  useEffect(() => {
    let active = true;
    fetch('/api/admin/session', { credentials: 'same-origin' })
      .then(r => r.ok ? r.json() : { authenticated: false })
      .then(result => { if (active) setIsAuthenticated(Boolean(result.authenticated)); })
      .catch(() => { if (active) setIsAuthenticated(false); })
      .finally(() => { if (active) setAuthLoading(false); });
    return () => { active = false; };
  }, []);

  const updateStateAndSave = (newData: CMSDataStore) => {
    setData(newData);
    saveCMSData(newData);
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password: pass })
      });
      if (!response.ok) return false;
      setIsAuthenticated(true);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try { await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }); } catch { }
    setIsAuthenticated(false);
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ currentPassword, newPassword })
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const updateTheme = (themeUpdates: Partial<ThemeSettings>) => {
    const updatedTheme = { ...data.theme, ...themeUpdates };
    updateStateAndSave({ ...data, theme: updatedTheme });
  };

  const resetThemeToDefault = () => updateStateAndSave({ ...data, theme: defaultCMSData.theme });
  const updateGlobal = (globalUpdates: Partial<GlobalSettings>) => updateStateAndSave({ ...data, global: { ...data.global, ...globalUpdates } });
  const updateNavbar = (navbarUpdates: Partial<NavbarSettings>) => updateStateAndSave({ ...data, navbar: { ...data.navbar, ...navbarUpdates } });
  const updateHero = (heroUpdates: Partial<HeroSettings>) => updateStateAndSave({ ...data, hero: { ...data.hero, ...heroUpdates } });
  const updateSections = (sections: SectionConfig[]) => updateStateAndSave({ ...data, sections });

  const addContentField = (item: ContentFieldItem) => updateStateAndSave({ ...data, contentFields: [item, ...data.contentFields] });
  const updateContentField = (id: string, item: Partial<ContentFieldItem>) => updateStateAndSave({ ...data, contentFields: data.contentFields.map(cf => cf.id === id ? { ...cf, ...item } : cf) });
  const deleteContentField = (id: string) => updateStateAndSave({ ...data, contentFields: data.contentFields.filter(cf => cf.id !== id) });
  const addNews = (item: NewsItem) => updateStateAndSave({ ...data, news: [item, ...data.news] });
  const updateNews = (id: string, item: Partial<NewsItem>) => updateStateAndSave({ ...data, news: data.news.map(n => n.id === id ? { ...n, ...item } : n) });
  const deleteNews = (id: string) => updateStateAndSave({ ...data, news: data.news.filter(n => n.id !== id) });
  const addBlog = (item: BlogPostItem) => updateStateAndSave({ ...data, blog: [item, ...data.blog] });
  const updateBlog = (id: string, item: Partial<BlogPostItem>) => updateStateAndSave({ ...data, blog: data.blog.map(b => b.id === id ? { ...b, ...item } : b) });
  const deleteBlog = (id: string) => updateStateAndSave({ ...data, blog: data.blog.filter(b => b.id !== id) });
  const addTool = (item: ToolItem) => updateStateAndSave({ ...data, tools: [item, ...data.tools] });
  const updateTool = (id: string, item: Partial<ToolItem>) => updateStateAndSave({ ...data, tools: data.tools.map(t => t.id === id ? { ...t, ...item } : t) });
  const deleteTool = (id: string) => updateStateAndSave({ ...data, tools: data.tools.filter(t => t.id !== id) });
  const addService = (item: ServiceItem) => updateStateAndSave({ ...data, services: [item, ...data.services] });
  const updateService = (id: string, item: Partial<ServiceItem>) => updateStateAndSave({ ...data, services: data.services.map(s => s.id === id ? { ...s, ...item } : s) });
  const deleteService = (id: string) => updateStateAndSave({ ...data, services: data.services.filter(s => s.id !== id) });
  const addPortfolio = (item: PortfolioItem) => updateStateAndSave({ ...data, portfolio: [item, ...data.portfolio] });
  const updatePortfolio = (id: string, item: Partial<PortfolioItem>) => updateStateAndSave({ ...data, portfolio: data.portfolio.map(p => p.id === id ? { ...p, ...item } : p) });
  const deletePortfolio = (id: string) => updateStateAndSave({ ...data, portfolio: data.portfolio.filter(p => p.id !== id) });
  const addMedia = (file: MediaFile) => updateStateAndSave({ ...data, media: [file, ...data.media] });
  const deleteMedia = (id: string) => updateStateAndSave({ ...data, media: data.media.filter(m => m.id !== id) });

  const addSubmission = (sub: Omit<SubmissionItem, 'id' | 'date' | 'status'>) => {
    const newItem: SubmissionItem = { ...sub, id: 'sub-' + Date.now(), date: new Date().toLocaleDateString('ar-SA'), status: 'جديد' };
    updateStateAndSave({ ...data, submissions: [newItem, ...data.submissions] });
  };
  const updateSubmissionStatus = (id: string, status: SubmissionItem['status'], notes?: string) => updateStateAndSave({ ...data, submissions: data.submissions.map(s => s.id === id ? { ...s, status, adminNotes: notes || s.adminNotes } : s) });
  const deleteSubmission = (id: string) => updateStateAndSave({ ...data, submissions: data.submissions.filter(s => s.id !== id) });
  const resetAllToDefault = () => updateStateAndSave(defaultCMSData);

  return (
    <CMSContext.Provider value={{ data, isAuthenticated, authLoading, login, logout, changePassword, updateTheme, resetThemeToDefault, updateGlobal, updateNavbar, updateHero, updateSections, addContentField, updateContentField, deleteContentField, addNews, updateNews, deleteNews, addBlog, updateBlog, deleteBlog, addTool, updateTool, deleteTool, addService, updateService, deleteService, addPortfolio, updatePortfolio, deletePortfolio, addMedia, deleteMedia, addSubmission, updateSubmissionStatus, deleteSubmission, resetAllToDefault }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
};
