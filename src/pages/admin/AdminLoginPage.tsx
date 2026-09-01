import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useCMS();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (await login(email, password)) {
      navigate('/admin');
    } else {
      setError('تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور وحاول مرة أخرى.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 dir-rtl text-right">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#121212] border border-[#D51F2B]/30 space-y-6 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#D51F2B]/10 border border-[#D51F2B]/30 flex items-center justify-center mx-auto text-[#D51F2B]">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">لوحة تحكم سعيد بن عايض</h1>
          <p className="text-xs text-gray-400">سجل الدخول لإدارة محتوى ومظهر المنظومة الرقمية بالكامل</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 block">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="بريد حساب الإدارة..."
              autoComplete="username"
              className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D51F2B]"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 block">كلمة المرور المشفرة</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="أدخل كلمة مرور الإدارة..."
              autoComplete="current-password"
              className="w-full px-4 py-3.5 rounded-xl bg-[#080808] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D51F2B]"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-[#D51F2B] font-semibold bg-[#220709] p-3 rounded-lg border border-[#D51F2B]/30">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#D51F2B] hover:bg-[#B5121B] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-red-glow"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'جارٍ التحقق...' : 'تسجيل الدخول للوحة التحكم'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center">
          <a href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
            <span>الرجوع للموقع الرئيسي</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#D51F2B]" />
          </a>
        </div>
      </div>
    </div>
  );
};
