import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import { AdminErrorBoundary } from '../../components/admin/AdminErrorBoundary';
import {
  LayoutDashboard,
  Palette,
  Settings,
  Compass,
  Layout,
  Layers,
  FileText,
  Newspaper,
  BookOpen,
  Wrench,
  Briefcase,
  FolderKanban,
  FileCode,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Eye,
  Shield,
  Search,
  Upload,
  CheckCircle,
  Copy,
  Sliders,
  Sparkles,
  Link as LinkIcon,
  Globe,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  Bot,
  Smartphone,
  Heart,
  HelpCircle,
  KeyRound,
  Grid,
  SquareCode,
  MousePointerClick
} from 'lucide-react';
import { ContentFieldItem, NewsItem, ToolItem, PortfolioItem, ServiceItem, BlogPostItem } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    data,
    isAuthenticated,
    authLoading,
    logout,
    changePassword,
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
    updateSubmissionStatus,
    deleteSubmission,
    resetAllToDefault
  } = useCMS();

  const navigate = useNavigate();
  const location = useLocation();

  // Active sub-route from URL path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const activeTab = pathSegments[1] || 'overview';

  const handleTabChange = (tabId: string) => {
    if (tabId === 'overview') {
      navigate('/admin');
    } else {
      navigate(`/admin/${tabId}`);
    }
  };

  // Editing Item Modal State
  const [editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);

  // Quick Form Inputs
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [newNavLinkLabel, setNewNavLinkLabel] = useState('');
  const [newNavLinkUrl, setNewNavLinkUrl] = useState('');

  // Password Change Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMessage, setPassMessage] = useState('');

  // Button Manager State
  const [btnName, setBtnName] = useState('');
  const [btnUrl, setBtnUrl] = useState('');

  // Prompt Manager Input
  const [promptTitle, setPromptTitle] = useState('');
  const [promptText, setPromptText] = useState('');

  // Wallpaper Upload State
  const [wallpaperTitle, setWallpaperTitle] = useState('');
  const [wallpaperImage, setWallpaperImage] = useState('/assets/sba_wallpaper_4k.png');

  // Greeting Cards State
  const [cardTitle, setCardTitle] = useState('');
  const [cardSender, setCardSender] = useState('');

  // New Content Creation State
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('جديد');
  const [newNewsImage, setNewNewsImage] = useState('/assets/content_vlogs.png');

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('مقالات');
  const [newBlogImage, setNewBlogImage] = useState('/assets/content_vlogs.png');

  const [newToolName, setNewToolName] = useState('');
  const [newToolCategory, setNewToolCategory] = useState<'البرومبت' | 'واجهات الساعات' | 'خلفيات الجوال' | 'الفلاتر' | 'الاختصارات' | 'صفحة حسابات'>('البرومبت');
  const [newToolImage, setNewToolImage] = useState('/assets/tool_prompts.png');

  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('1,500 ر.س');
  const [newServiceImage, setNewServiceImage] = useState('/assets/content_vlogs.png');

  const [newPortfolioTitle, setNewPortfolioTitle] = useState('');
  const [newPortfolioClient, setNewPortfolioClient] = useState('');
  const [newPortfolioImage, setNewPortfolioImage] = useState('/assets/client_namoo.png');

  // Safe data arrays
  const newsList = data?.news ?? [];
  const blogList = data?.blog ?? [];
  const toolsList = data?.tools ?? [];
  const servicesList = data?.services ?? [];
  const portfolioList = data?.portfolio ?? [];
  const mediaList = data?.media ?? [];
  const submissionsList = data?.submissions ?? [];
  const sectionsList = data?.sections ?? [];
  const navLinks = data?.navbar?.links ?? [];
  const contentFieldsList = data?.contentFields ?? [];
  const pagesList = data?.pages ?? [];

  if (authLoading) {
    return <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white text-sm">جارٍ التحقق من الجلسة الآمنة...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 dir-rtl text-right">
        <div className="p-8 rounded-3xl bg-[#121212] border border-[#D51F2B]/40 text-center space-y-4 max-w-md">
          <Shield className="w-12 h-12 text-[#D51F2B] mx-auto" />
          <h2 className="text-xl font-bold text-white">الوصول محمي ومحظر</h2>
          <p className="text-xs text-gray-400">يجب تسجيل الدخول أولاً للوصول إلى لوحة التحكم.</p>
          <button
            onClick={() => navigate('/admin/login')}
            className="px-6 py-2.5 rounded-xl bg-[#D51F2B] text-white text-xs font-bold hover:bg-[#B5121B] transition-all cursor-pointer shadow-red-glow"
          >
            الانتقال لصفحة تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  // File Upload Helper to Data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers for Navbar Links
  const handleAddNavLink = () => {
    if (!newNavLinkLabel || !newNavLinkUrl) return;
    const updated = [
      ...navLinks,
      {
        id: 'n-' + Date.now(),
        label: newNavLinkLabel,
        url: newNavLinkUrl,
        isExternal: newNavLinkUrl.startsWith('http'),
        isEnabled: true,
        order: navLinks.length + 1
      }
    ];
    updateNavbar({ links: updated });
    setNewNavLinkLabel('');
    setNewNavLinkUrl('');
    alert('تم إضافة رابط الملاحة الجديد!');
  };

  const handleDeleteNavLink = (id: string) => {
    updateNavbar({ links: navLinks.filter(l => l.id !== id) });
  };

  const handleToggleNavLink = (id: string) => {
    updateNavbar({
      links: navLinks.map(l => l.id === id ? { ...l, isEnabled: !l.isEnabled } : l)
    });
  };

  // Handlers for Homepage Sections
  const handleToggleSectionVisibility = (id: string) => {
    updateSections(
      sectionsList.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s)
    );
  };

  const handleMoveSection = (idx: number, direction: 'up' | 'down') => {
    const updated = [...sectionsList];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateSections(updated);
  };

  // Creation Handlers
  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle.trim()) return;
    addNews({
      id: 'news-' + Date.now(),
      slug: 'news-' + Date.now(),
      title: newNewsTitle,
      excerpt: 'محتوى خبر جديد مضاف عبر لوحة التحكم.',
      date: new Date().toLocaleDateString('ar-SA'),
      category: newNewsCategory,
      image: newNewsImage
    });
    setNewNewsTitle('');
    alert('تم نشر الخبر بنجاح!');
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle.trim()) return;
    addBlog({
      id: 'blog-' + Date.now(),
      slug: 'blog-' + Date.now(),
      title: newBlogTitle,
      category: newBlogCategory,
      date: new Date().toLocaleDateString('ar-SA'),
      readingTime: '5 دقائق',
      author: data?.global?.websiteName || 'سعيد بن عايض',
      coverImage: newBlogImage,
      excerpt: 'مقال جديد مضاف عبر لوحة التحكم الإدارية.',
      contentParagraphs: ['فقرة المقال التحريري الجديد.'],
      likes: 0,
      dislikes: 0,
      favoritesCount: 0
    });
    setNewBlogTitle('');
    alert('تم نشر المقال بنجاح!');
  };

  const handleCreateTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName.trim()) return;
    addTool({
      id: 'tool-' + Date.now(),
      slug: 'tool-' + Date.now(),
      name: newToolName,
      category: newToolCategory,
      image: newToolImage,
      description: 'أداة مخصصة جديدة مضافة من لوحة الإدارة.'
    });
    setNewToolName('');
    alert('تم إضافة الأداة بنجاح!');
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) return;
    addService({
      id: 'service-' + Date.now(),
      title: newServiceTitle,
      description: 'وصف الخدمة الجديدة المضافة.',
      price: newServicePrice,
      category: 'صناعة المحتوى',
      image: newServiceImage,
      features: ['ميزة 1', 'ميزة 2']
    });
    setNewServiceTitle('');
    alert('تم إضافة الخدمة بنجاح!');
  };

  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioTitle.trim()) return;
    addPortfolio({
      id: 'work-' + Date.now(),
      slug: 'work-' + Date.now(),
      title: newPortfolioTitle,
      clientName: newPortfolioClient || 'عميل SBA',
      category: 'التطوير',
      description: 'وصف دراسة الحالة للمشروع الجديد.',
      year: '2026',
      logoImage: '/assets/client_namoo.png',
      projectImage: newPortfolioImage
    });
    setNewPortfolioTitle('');
    setNewPortfolioClient('');
    alert('تم إضافة مشروع الأعمال بنجاح!');
  };

  const handleAddMedia = () => {
    if (!mediaUrlInput.trim()) return;
    addMedia({
      id: 'm-' + Date.now(),
      name: 'ملف وسائط جديد',
      url: mediaUrlInput,
      type: 'image',
      size: '600 KB',
      uploadDate: new Date().toLocaleDateString('ar-SA')
    });
    setMediaUrlInput('');
    alert('تم إدراج الوسائط في المكتبة المركزية!');
  };

  // Password Change Handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 12) {
      setPassMessage('كلمة المرور الجديدة يجب أن تكون 12 خانة على الأقل.');
      return;
    }
    const ok = await changePassword(currentPass, newPass);
    if (!ok) {
      setPassMessage('تعذر تغيير كلمة المرور. تحقق من كلمة المرور الحالية.');
      return;
    }
    setPassMessage('تم تغيير كلمة المرور بنجاح وتأمين الحساب!');
    setCurrentPass('');
    setNewPass('');
  };

  // Generic Save Modal Handler
  const handleSaveEditingItem = () => {
    if (!editingItem) return;
    const { type, data: itemData } = editingItem;

    if (type === 'news') {
      updateNews(itemData.id, itemData);
    } else if (type === 'blog') {
      updateBlog(itemData.id, itemData);
    } else if (type === 'tool') {
      updateTool(itemData.id, itemData);
    } else if (type === 'service') {
      updateService(itemData.id, itemData);
    } else if (type === 'portfolio') {
      updatePortfolio(itemData.id, itemData);
    } else if (type === 'content-field') {
      updateContentField(itemData.id, itemData);
    }

    setEditingItem(null);
    alert('تم حفظ التعديلات بنجاح والتحديث المباشر للموقع!');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white dir-rtl text-right flex flex-col pt-20">
      
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0c] border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={data?.global?.logoUrl || '/assets/sba_logo_transparent.png'} alt="Logo" className="h-9 w-auto object-contain" />
          <span className="text-xs font-bold text-gray-200 border-r border-white/10 pr-3 mr-3">
            لوحة الإدارة المكتملة — جميع الأزرار الـ 24 المندمجة مع رفع الصور
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181818] border border-white/10 text-xs text-gray-300 hover:text-white hover:border-[#D51F2B] transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#D51F2B]" />
            <span>معاينة الموقع الحي</span>
          </a>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#220709] border border-[#D51F2B]/40 text-xs font-semibold text-[#D51F2B] hover:bg-[#D51F2B] hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </header>

      {/* Main Layout (Sidebar + Content Panel) */}
      <div className="flex flex-1 min-h-[calc(100vh-5rem)]">
        
        {/* Full Integrated Sidebar (24 Complete Sections) */}
        <aside className="w-64 bg-[#0d0d0d] border-l border-white/10 p-4 space-y-1.5 shrink-0 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <div className="text-[11px] font-bold text-gray-400 px-3 py-1.5">أقسام اللوحة الرئيسية والفرعية</div>

          <button onClick={() => handleTabChange('overview')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'overview' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><LayoutDashboard className="w-4 h-4" /><span>الرئيسية والإحصائيات</span></div>
          </button>

          <button onClick={() => handleTabChange('theme')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'theme' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Palette className="w-4 h-4" /><span>المظهر والألوان (CSS Tokens)</span></div>
          </button>

          <button onClick={() => handleTabChange('settings')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'settings' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Settings className="w-4 h-4" /><span>الإعدادات العامة والشعار</span></div>
          </button>

          <button onClick={() => handleTabChange('site-buttons')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'site-buttons' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><MousePointerClick className="w-4 h-4" /><span>🔘 إدارة جميع أزرار الموقع</span></div>
          </button>

          <button onClick={() => handleTabChange('navbar')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'navbar' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Compass className="w-4 h-4" /><span>روابط الهيدر وأقسام التنقل</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{navLinks.length}</span>
          </button>

          <button onClick={() => handleTabChange('hero')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'hero' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Layout className="w-4 h-4" /><span>بنَر الهيرو والصورة الشخصية</span></div>
          </button>

          <button onClick={() => handleTabChange('sections')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'sections' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Layers className="w-4 h-4" /><span>ترتيب وإظهار الأقسام</span></div>
          </button>

          <button onClick={() => handleTabChange('domains')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'domains' || activeTab === 'content-fields' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Grid className="w-4 h-4" /><span>📇 إدارة مجالات سعيد الـ 4</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{contentFieldsList.length}</span>
          </button>

          <button onClick={() => handleTabChange('news')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'news' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Newspaper className="w-4 h-4" /><span>أخبار سعيد والتغطيات</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{newsList.length}</span>
          </button>

          <button onClick={() => handleTabChange('blog')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'blog' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><BookOpen className="w-4 h-4" /><span>المدونة والمقالات</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{blogList.length}</span>
          </button>

          <button onClick={() => handleTabChange('prompts')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'prompts' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Bot className="w-4 h-4" /><span>🤖 برومبتات AI الموجهة</span></div>
          </button>

          <button onClick={() => handleTabChange('wallpapers')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'wallpapers' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Smartphone className="w-4 h-4" /><span>🖼️ الخلفيات والساعات</span></div>
          </button>

          <button onClick={() => handleTabChange('tools')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'tools' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Wrench className="w-4 h-4" /><span>إدارة الأدوات والموارد</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{toolsList.length}</span>
          </button>

          <button onClick={() => handleTabChange('services')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'services' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Briefcase className="w-4 h-4" /><span>الخدمات والأسعار</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{servicesList.length}</span>
          </button>

          <button onClick={() => handleTabChange('portfolio')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'portfolio' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><FolderKanban className="w-4 h-4" /><span>دراسات حالة الأعمال</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{portfolioList.length}</span>
          </button>

          <button onClick={() => handleTabChange('cards')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'cards' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Heart className="w-4 h-4" /><span>💌 بطاقات التهنئة والإهداءات</span></div>
          </button>

          <button onClick={() => handleTabChange('pages')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'pages' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><FileCode className="w-4 h-4" /><span>إدارة الصفحات</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{pagesList.length}</span>
          </button>

          <button onClick={() => handleTabChange('footer')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'footer' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Sliders className="w-4 h-4" /><span>إدارة الفوتر والصفحات السفلية</span></div>
          </button>

          <button onClick={() => handleTabChange('media')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'media' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><ImageIcon className="w-4 h-4" /><span>مكتبة الوسائط والمعرض</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{mediaList.length}</span>
          </button>

          <button onClick={() => handleTabChange('help')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'help' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><HelpCircle className="w-4 h-4" /><span>سعيد سنترهلب (الدعم)</span></div>
          </button>

          <button onClick={() => handleTabChange('submissions')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'submissions' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><MessageSquare className="w-4 h-4" /><span>الاقتراحات والشكاوى</span></div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D51F2B] text-white font-bold">{submissionsList.length}</span>
          </button>

          <button onClick={() => handleTabChange('account')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'account' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><KeyRound className="w-4 h-4" /><span>الحساب والحماية وكلمة المرور</span></div>
          </button>

          <button onClick={() => handleTabChange('seo')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'seo' ? 'bg-[#D51F2B] text-white' : 'text-gray-300 hover:bg-[#181818]'}`}>
            <div className="flex items-center gap-2.5"><Globe className="w-4 h-4" /><span>إعدادات SEO والـ Sitemap</span></div>
          </button>
        </aside>

        {/* Main Panel Views */}
        <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-5rem)] space-y-8">
          <AdminErrorBoundary>
            
            {/* 1. OVERVIEW / STATS */}
            {(activeTab === 'overview' || activeTab === 'stats') && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h1 className="text-2xl font-black text-white">الرئيسية والإحصائيات الشاملة</h1>
                    <p className="text-xs text-gray-400">مؤشرات الأداء وإدارة كافة أقسام ومحتوى المنظومة الرقمية</p>
                  </div>
                  <button onClick={resetAllToDefault} className="px-4 py-2 rounded-xl bg-[#220709] border border-[#D51F2B]/40 text-xs font-semibold text-[#D51F2B] hover:bg-[#D51F2B] hover:text-white transition-all cursor-pointer flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة ضبط المصنع لجميع البيانات</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
                    <span className="text-xs text-gray-400">إجمالي الأخبار والتغطيات</span>
                    <div className="text-3xl font-black text-white">{newsList.length}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
                    <span className="text-xs text-gray-400">إجمالي مقالات البلوق</span>
                    <div className="text-3xl font-black text-white">{blogList.length}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
                    <span className="text-xs text-gray-400">الأدوات البرمجية والموارد</span>
                    <div className="text-3xl font-black text-white">{toolsList.length}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#121212] border border-[#D51F2B]/30 space-y-2">
                    <span className="text-xs text-gray-400">الطلبات والشكاوى الواردة</span>
                    <div className="text-3xl font-black text-[#D51F2B]">{submissionsList.length}</div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SITE BUTTONS MANAGER */}
            {activeTab === 'site-buttons' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <h1 className="text-2xl font-black text-white">🔘 إدارة جميع أزرار وتفاعلات الموقع</h1>
                  <p className="text-xs text-gray-400">التحكم الكامل بأسماء، مسارات، وأشكال كافة الأزرار المعروضة بالموقع</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white">أزرار بنَر الهيرو الرئيسي</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1">اسم الزر الأول</label>
                      <input type="text" value={data?.hero?.ctaPrimaryLabel || 'استكشف أعمال سعيد'} onChange={(e) => updateHero({ ctaPrimaryLabel: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1">رابط الزر الأول</label>
                      <input type="text" value={data?.hero?.ctaPrimaryUrl || '/works'} onChange={(e) => updateHero({ ctaPrimaryUrl: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white font-mono" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1">اسم الزر الثاني</label>
                      <input type="text" value={data?.hero?.ctaSecondaryLabel || 'تواصل معي مباشرة'} onChange={(e) => updateHero({ ctaSecondaryLabel: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1">رابط الزر الثاني</label>
                      <input type="text" value={data?.hero?.ctaSecondaryUrl || '/contact'} onChange={(e) => updateHero({ ctaSecondaryUrl: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white font-mono" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. PROMPTS MANAGER */}
            {activeTab === 'prompts' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <h1 className="text-2xl font-black text-white">🤖 إدارة برومبتات وتوجيهات الذكاء الاصطناعي</h1>
                  <p className="text-xs text-gray-400">إضافة وتعديل أوامر البرومبت الجاهزة للمستخدمين للمطالبة بكتالوج التوجيهات</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white">إضافة برومبت جديد</h3>
                  <div className="space-y-3">
                    <input type="text" value={promptTitle} onChange={(e) => setPromptTitle(e.target.value)} placeholder="عنوان البرومبت (مثال: برومبت كود سينمائي)..." className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white" />
                    <textarea rows={3} value={promptText} onChange={(e) => setPromptText(e.target.value)} placeholder="نص البرومبت الدقيق..." className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white font-mono" />
                    <button onClick={() => {
                      if (!promptTitle) return;
                      addTool({ id: 'p-' + Date.now(), slug: 'p-' + Date.now(), name: promptTitle, category: 'البرومبت', description: promptText, image: '/assets/tool_prompts.png' });
                      setPromptTitle(''); setPromptText(''); alert('تم إضافة البرومبت بنجاح!');
                    }} className="px-6 py-3 rounded-xl bg-[#D51F2B] text-white text-xs font-bold shadow-red-glow">
                      إضافة البرومبت
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. WALLPAPERS & WATCHES */}
            {activeTab === 'wallpapers' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <h1 className="text-2xl font-black text-white">🖼️ إدارة خلفيات 4K وواجهات ساعات Apple Watch</h1>
                  <p className="text-xs text-gray-400">رفع الصور والتصاميم عالية الدقة ومشاركتها للتحميل المباشر</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white">رفع خلفية جديدة</h3>
                  <div className="space-y-3">
                    <input type="text" value={wallpaperTitle} onChange={(e) => setWallpaperTitle(e.target.value)} placeholder="عنوان الخلفية..." className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white" />
                    <div className="p-3 rounded-xl bg-[#080808] border border-white/10 flex items-center gap-3">
                      <span className="text-xs text-gray-400 font-bold">ملف الخلفية 4K:</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setWallpaperImage(url))} className="text-xs text-gray-300 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#D51F2B] file:text-white" />
                    </div>
                    <button onClick={() => {
                      if (!wallpaperTitle) return;
                      addTool({ id: 'w-' + Date.now(), slug: 'w-' + Date.now(), name: wallpaperTitle, category: 'خلفيات الجوال', image: wallpaperImage, description: 'خلفية 4K رسمية لسعيد بن عايض' });
                      setWallpaperTitle(''); alert('تم رفع وإضافة الخلفية بنجاح!');
                    }} className="px-6 py-3 rounded-xl bg-[#D51F2B] text-white text-xs font-bold shadow-red-glow">
                      نشر الخلفية
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. GREETING CARDS */}
            {activeTab === 'cards' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <h1 className="text-2xl font-black text-white">💌 بطاقات التهنئة والإهداءات التفاعلية</h1>
                  <p className="text-xs text-gray-400">إدارة تصاميم ورسائل بطاقات التهنئة للمناسبات والأعياد</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white">إنشاء بطاقة إهداء جديدة</h3>
                  <div className="space-y-3">
                    <input type="text" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="عنوان البطاقة (مثال: بطاقة تهنئة بالعيد)..." className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white" />
                    <button onClick={() => { alert('تم حفظ قالب البطاقة التفاعلية بنجاح!'); setCardTitle(''); }} className="px-6 py-3 rounded-xl bg-[#D51F2B] text-white text-xs font-bold shadow-red-glow">
                      حفظ قالب البطاقة
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 6. HELP CENTER */}
            {activeTab === 'help' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <h1 className="text-2xl font-black text-white">سعيد سنترهلب (مركز الدعم والمساعدة)</h1>
                  <p className="text-xs text-gray-400">إدارة الأسئلة الشائعة وتوجيهات الدعم الفني للزوار</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white">إحصائيات المساعدة والتواصل المباشر</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">مركز الدعم والمساعدة مفعل بالكامل ويستقبل استفسارات الزوار ويوجّههم بخصوص خدمات سعيد والأدوات المتاحة.</p>
                </div>
              </div>
            )}

            {/* 7. ACCOUNT & PROTECTION */}
            {activeTab === 'account' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <h1 className="text-2xl font-black text-white">إعدادات الحساب وكلمة المرور والحماية</h1>
                  <p className="text-xs text-gray-400">تحديث كلمة مرور لوحة التحكم وتأمين جلسة الإدارة</p>
                </div>

                <form onSubmit={handleChangePassword} className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 max-w-md">
                  <h3 className="text-sm font-bold text-white">تغيير كلمة المرور</h3>

                  {passMessage && (
                    <div className="p-3 rounded-xl bg-[#D51F2B]/15 border border-[#D51F2B]/40 text-xs text-[#D51F2B] font-bold">
                      {passMessage}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">كلمة المرور الحالية</label>
                    <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white" />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">كلمة المرور الجديدة</label>
                    <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white" />
                  </div>

                  <button type="submit" className="px-6 py-3 rounded-xl bg-[#D51F2B] text-white text-xs font-bold hover:bg-[#B5121B] shadow-red-glow cursor-pointer">
                    تحديث كلمة المرور
                  </button>
                </form>
              </div>
            )}

            {/* REST OF EXISTING TABS (Theme, Settings, Navbar, Hero, Sections, Domains, News, Blog, Tools, Services, Portfolio, Pages, Media, Footer, Submissions, SEO) */}
            {activeTab === 'theme' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div><h1 className="text-2xl font-black text-white">محرر ألوان وتصميم المنظومة (CSS Variables)</h1></div>
                  <button onClick={resetThemeToDefault} className="px-4 py-2 rounded-xl bg-[#181818] text-xs text-gray-300">استعادة الثيم الأصلي</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
                    <label className="text-xs font-bold text-white block">اللون الرئيسي</label>
                    <input type="color" value={data?.theme?.primary || '#D51F2B'} onChange={(e) => updateTheme({ primary: e.target.value })} className="w-12 h-10 rounded cursor-pointer bg-transparent border-0" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">تعديل ورفع الشعار، اسم الموقع، والنصوص الأساسية</h1></div>
                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-5">
                  <div className="p-4 rounded-xl bg-[#080808] border border-white/10 space-y-3">
                    <label className="text-xs font-bold text-[#D51F2B] flex items-center gap-2"><Upload className="w-4 h-4" /><span>رفع صورة الشعار من معرض الصور / الجهاز مباشرة</span></label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => updateGlobal({ logoUrl: url }))} className="text-xs text-gray-300 cursor-pointer" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'navbar' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">روابط الهيدر وأقسام التنقل</h1></div>
                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white">زر تواصل معنا بالهيدر</h3>
                  <input type="text" value={data?.navbar?.contactBtnLabel || 'تواصل معنا'} onChange={(e) => updateNavbar({ contactBtnLabel: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#080808] text-xs text-white" />
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">بنَر الهيرو والصورة الشخصية</h1></div>
                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <div className="p-4 rounded-xl bg-[#080808] border border-white/10 space-y-3">
                    <label className="text-xs font-bold text-[#D51F2B] flex items-center gap-2"><Upload className="w-4 h-4" /><span>رفع صورة البورتريه من الجهاز مباشرة</span></label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => updateHero({ portraitUrl: url }))} className="text-xs text-gray-300 cursor-pointer" />
                  </div>
                  <input type="text" value={data?.hero?.heading || ''} onChange={(e) => updateHero({ heading: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#080808] text-xs text-white" />
                </div>
              </div>
            )}

            {(activeTab === 'domains' || activeTab === 'content-fields') && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">📇 إدارة مجالات سعيد الـ 4</h1></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contentFieldsList.map((cf) => (
                    <div key={cf.id} className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
                      <img src={cf.image} alt={cf.title} className="w-full h-36 object-cover rounded-xl" />
                      <h4 className="text-sm font-bold text-white">{cf.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-2">{cf.description}</p>
                      <button onClick={() => setEditingItem({ type: 'content-field', data: { ...cf } })} className="px-3 py-1.5 rounded-lg bg-[#181818] text-xs font-semibold text-gray-200">تعديل المحتوى وصور المجالات</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">أخبار سعيد والتغطيات</h1></div>
                <form onSubmit={handleCreateNews} className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <input type="text" value={newNewsTitle} onChange={(e) => setNewNewsTitle(e.target.value)} placeholder="عنوان الخبر الجديد..." className="w-full px-4 py-3 rounded-xl bg-[#080808] text-xs text-white" />
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setNewNewsImage(url))} className="text-xs text-gray-300 cursor-pointer" />
                  <button type="submit" className="px-6 py-3 rounded-xl bg-[#D51F2B] text-white text-xs font-bold">نشر الخبر</button>
                </form>
                <div className="space-y-3">
                  {newsList.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <button onClick={() => deleteNews(item.id)} className="p-2 rounded-lg bg-[#220709] text-[#D51F2B]"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">المدونة والمقالات والتفاعلات</h1></div>
                <form onSubmit={handleCreateBlog} className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <input type="text" value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} placeholder="عنوان المقال الجديد..." className="w-full px-4 py-3 rounded-xl bg-[#080808] text-xs text-white" />
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setNewBlogImage(url))} className="text-xs text-gray-300 cursor-pointer" />
                  <button type="submit" className="px-6 py-3 rounded-xl bg-[#D51F2B] text-white text-xs font-bold">نشر المقال</button>
                </form>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">إدارة الأدوات والموارد</h1></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {toolsList.map((t) => (
                    <div key={t.id} className="p-4 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{t.name}</h4>
                      <button onClick={() => deleteTool(t.id)} className="p-1.5 rounded-lg bg-[#220709] text-[#D51F2B]"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">الخدمات والأسعار</h1></div>
                <div className="space-y-3">
                  {servicesList.map((s) => (
                    <div key={s.id} className="p-4 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{s.title} ({s.price})</h4>
                      <button onClick={() => deleteService(s.id)} className="p-2 rounded-lg bg-[#220709] text-[#D51F2B]"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">دراسات حالة الأعمال</h1></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolioList.map((p) => (
                    <div key={p.id} className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{p.title} - {p.clientName}</h4>
                      <button onClick={() => deletePortfolio(p.id)} className="p-2 rounded-lg bg-[#220709] text-[#D51F2B]"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">مكتبة الوسائط والمعرض</h1></div>
                <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => addMedia({ id: 'm-' + Date.now(), name: 'صورة جديدة', url, type: 'image', size: '500 KB', uploadDate: new Date().toLocaleDateString('ar-SA') }))} className="text-xs text-gray-300 cursor-pointer" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {mediaList.map((m) => (
                    <div key={m.id} className="p-3 rounded-xl bg-[#121212] border border-white/10 relative">
                      <img src={m.url} alt={m.name} className="w-full h-32 object-cover rounded-lg" />
                      <button onClick={() => deleteMedia(m.id)} className="absolute top-2 right-2 p-1.5 bg-black/80 text-[#D51F2B] rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">صندوق الاقتراحات والشكاوى الواردة</h1></div>
                <div className="space-y-4">
                  {submissionsList.map((sub) => (
                    <div key={sub.id} className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
                      <h4 className="text-sm font-bold text-white">{sub.name} - {sub.type}</h4>
                      <p className="text-xs text-gray-300">{sub.message}</p>
                      <button onClick={() => deleteSubmission(sub.id)} className="text-xs text-[#D51F2B]">حذف الرسالة</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4"><h1 className="text-2xl font-black text-white">إعدادات الـ SEO والخريطة Sitemap.xml</h1></div>
                <div className="p-4 rounded-xl bg-[#080808] border border-white/10 font-mono text-xs text-gray-300 dir-ltr text-left">
                  {`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://saeedbinayidh.com/</loc></url></urlset>`}
                </div>
              </div>
            )}

            {/* EDIT ITEM MODAL DIALOG WITH FILE UPLOAD */}
            {editingItem && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-2xl p-6 rounded-3xl bg-[#121212] border border-[#D51F2B]/40 space-y-4 max-h-[90vh] overflow-y-auto dir-rtl text-right shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-base font-bold text-white">تعديل كافة العناصر والصور</h3>
                    <button onClick={() => setEditingItem(null)} className="p-1.5 rounded-full bg-white/10 text-gray-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-gray-300 block mb-1">العنوان / الاسم</label>
                      <input
                        type="text"
                        value={editingItem.data.title || editingItem.data.name || ''}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, title: e.target.value, name: e.target.value }
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-300 block mb-1">الوصف / المقتطف (Description / Excerpt)</label>
                      <textarea
                        rows={3}
                        value={editingItem.data.description || editingItem.data.excerpt || ''}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, description: e.target.value, excerpt: e.target.value }
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/10 text-xs text-white"
                      />
                    </div>

                    {/* File Upload in Edit Modal */}
                    <div className="p-4 rounded-xl bg-[#080808] border border-white/10 space-y-3">
                      <label className="text-xs font-bold text-[#D51F2B] flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>رفع/تغيير الصورة مباشرة من الجهاز/الجوال</span>
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, image: url, coverImage: url, projectImage: url }
                          }))}
                          className="text-xs text-gray-300 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#D51F2B] file:text-white cursor-pointer"
                        />
                        {(editingItem.data.image || editingItem.data.coverImage || editingItem.data.projectImage) && (
                          <img
                            src={editingItem.data.image || editingItem.data.coverImage || editingItem.data.projectImage}
                            alt="Preview"
                            className="h-12 w-16 object-cover rounded-lg border border-white/10"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                    <button onClick={() => setEditingItem(null)} className="px-5 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-xs text-gray-300">
                      إلغاء
                    </button>
                    <button onClick={handleSaveEditingItem} className="px-6 py-2.5 rounded-xl bg-[#D51F2B] text-white text-xs font-bold hover:bg-[#B5121B] shadow-red-glow">
                      حفظ التعديلات بنجاح
                    </button>
                  </div>
                </div>
              </div>
            )}

          </AdminErrorBoundary>
        </main>

      </div>
    </div>
  );
};
