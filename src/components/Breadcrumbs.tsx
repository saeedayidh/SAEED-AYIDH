import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, ArrowRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, showBackButton = true }) => {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex flex-wrap items-center justify-between gap-4 py-4 text-xs sm:text-sm text-gray-400 border-b border-white/10 mb-8" aria-label="Breadcrumb">
      {/* Breadcrumb Trail */}
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link to="/" className="flex items-center gap-1.5 hover:text-[#D51F2B] transition-colors">
            <Home className="w-4 h-4 text-[#D51F2B]" />
            <span>الرئيسية</span>
          </Link>
        </li>

        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <li className="text-gray-600">
              <ChevronLeft className="w-3.5 h-3.5" />
            </li>
            <li>
              {item.link ? (
                <Link to={item.link} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-medium line-clamp-1">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>

      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#151515] border border-white/10 text-gray-300 hover:text-white hover:border-[#D51F2B]/40 hover:bg-[#1a0507] transition-all text-xs font-semibold cursor-pointer"
        >
          <ArrowRight className="w-3.5 h-3.5 text-[#D51F2B]" />
          <span>الرجوع للسابقة</span>
        </button>
      )}
    </nav>
  );
};
