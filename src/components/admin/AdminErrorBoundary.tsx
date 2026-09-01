import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AdminErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Admin Error Boundary caught an exception:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-3xl bg-[#121212] border border-[#D51F2B]/40 text-center space-y-5 max-w-lg mx-auto my-12 dir-rtl text-right">
          <div className="w-16 h-16 rounded-2xl bg-[#D51F2B]/10 border border-[#D51F2B]/30 flex items-center justify-center mx-auto text-[#D51F2B]">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          <h2 className="text-xl font-bold text-white text-center">تعذر تحميل هذا القسم</h2>
          
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            حدث خطأ غير متوقع أثناء عرض بيانات هذا القسم الإداري. تم تسجيل تفاصيل الخطأ في المنظومة.
          </p>

          {this.state.error && (
            <div className="p-3 rounded-xl bg-[#080808] border border-white/10 text-[11px] font-mono text-[#D51F2B] text-left dir-ltr overflow-x-auto">
              {this.state.error.toString()}
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D51F2B] text-white text-xs font-bold hover:bg-[#B5121B] transition-all cursor-pointer shadow-red-glow"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة المحاولة</span>
            </button>
            <a
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white text-xs font-semibold hover:border-white/20 transition-all"
            >
              <Home className="w-4 h-4 text-[#D51F2B]" />
              <span>العودة للرئيسية</span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
