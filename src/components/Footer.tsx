import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Footer: React.FC = () => {
  const { data } = useCMS();
  const globalAny = data.global as any;
  const accounts = (globalAny.socialAccounts || []).filter((item: any) => item.enabled && item.url);
  const channels = (globalAny.channels || []).filter((item: any) => item.enabled && item.url);

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 text-gray-400 text-xs pt-12 sm:pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 mb-10 sm:mb-14 text-right" dir="rtl">
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="inline-block py-1"><img src={data.global.logoUrl || '/assets/sba_logo_transparent.png'} alt={data.global.websiteName} className="h-16 sm:h-20 w-auto max-w-[180px] object-contain" /></Link>
            <p className="text-gray-400 leading-relaxed font-light text-xs max-w-sm">{data.global.description}</p>
            <a href={`mailto:${data.global.contactEmail}`} className="text-xs font-mono font-bold text-[#D51F2B] hover:underline block">{data.global.contactEmail}</a>
            <Link to={data.navbar.contactBtnUrl || '/contact'} className="sba-btn-primary w-full sm:w-auto py-3 px-6 text-xs flex items-center justify-center gap-2 text-center"><Send className="w-3.5 h-3.5" /><span>{data.navbar.contactBtnLabel || 'تواصل معنا'}</span></Link>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">صفحات سعيد</h4>
            <ul className="space-y-2.5">{data.navbar.links.filter(x => x.isEnabled).slice(0, 8).map(link => <li key={link.id}><Link to={link.url || '/'} className="hover:text-[#D51F2B]">{link.label}</Link></li>)}</ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">الحسابات</h4>
            <ul className="space-y-2.5">{accounts.length ? accounts.map((account: any) => <li key={account.id}><a href={account.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#D51F2B]">{account.iconImage && <img src={account.iconImage} alt="" className="h-5 w-5 object-contain" />}<span>{account.platform}{account.username ? ` — ${account.username}` : ''}</span></a></li>) : <li className="text-gray-600">لا توجد حسابات مفعلة</li>}</ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">القنوات</h4>
            <ul className="space-y-2.5">{channels.length ? channels.map((channel: any) => <li key={channel.id}><a href={channel.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#D51F2B]">{channel.iconImage && <img src={channel.iconImage} alt="" className="h-5 w-5 object-contain" />}<span>{channel.name}</span></a></li>) : <li className="text-gray-600">لا توجد قنوات مضافة</li>}</ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white pb-2 border-b border-white/10">المساعدة</h4>
            <ul className="space-y-2.5"><li><Link to="/centerhelp" className="hover:text-[#D51F2B]">سعيد سنترهلب</Link></li><li><Link to="/suggestion" className="hover:text-[#D51F2B]">بطاقة اقتراح</Link></li><li><Link to="/complaint" className="hover:text-[#D51F2B]">بطاقة شكوى</Link></li><li><Link to="/contact" className="hover:text-[#D51F2B]">تواصل معنا</Link></li></ul>
          </div>
        </div>

        <div className="pt-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4" dir="rtl">
          <p>{data.global.copyrightText || '© 2026 سعيد بن عايض — جميع الحقوق محفوظة.'}</p>
          <div className="flex items-center gap-6"><Link to="/privacy" className="hover:text-gray-300">سياسة الخصوصية</Link><Link to="/terms" className="hover:text-gray-300">الشروط والأحكام</Link></div>
        </div>
      </div>
    </footer>
  );
};
