import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const AdminResponsiveShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.classList.add('admin-dashboard-route');
    return () => {
      document.documentElement.classList.remove('admin-dashboard-route', 'admin-sidebar-open');
    };
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('admin-sidebar-open', sidebarOpen);
    document.body.style.overflow = sidebarOpen && window.innerWidth < 1024 ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <>
      <style>{`
        html.admin-dashboard-route,
        html.admin-dashboard-route body {
          overflow-x: hidden;
        }

        .admin-mobile-sidebar-button,
        .admin-mobile-sidebar-overlay {
          display: none;
        }

        @media (max-width: 1023px) {
          html.admin-dashboard-route aside {
            position: fixed !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: min(86vw, 320px) !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            z-index: 90 !important;
            padding-top: 78px !important;
            transform: translateX(105%) !important;
            transition: transform 220ms ease !important;
            box-shadow: -18px 0 45px rgba(0, 0, 0, 0.5);
            overscroll-behavior: contain;
          }

          html.admin-dashboard-route.admin-sidebar-open aside {
            transform: translateX(0) !important;
          }

          html.admin-dashboard-route header {
            min-height: 64px !important;
            padding: 10px 12px 10px 64px !important;
            gap: 8px !important;
          }

          html.admin-dashboard-route header > div:first-child {
            min-width: 0 !important;
            gap: 8px !important;
          }

          html.admin-dashboard-route header > div:first-child > span {
            display: none !important;
          }

          html.admin-dashboard-route header > div:last-child {
            gap: 7px !important;
          }

          html.admin-dashboard-route header a,
          html.admin-dashboard-route header button {
            padding: 8px !important;
            min-width: 38px;
            min-height: 38px;
            justify-content: center;
          }

          html.admin-dashboard-route header a > span,
          html.admin-dashboard-route header button > span {
            display: none !important;
          }

          html.admin-dashboard-route main main {
            width: 100% !important;
            min-width: 0 !important;
            padding: 16px !important;
            overflow-x: hidden !important;
          }

          html.admin-dashboard-route input,
          html.admin-dashboard-route textarea,
          html.admin-dashboard-route select,
          html.admin-dashboard-route button {
            max-width: 100%;
          }

          html.admin-dashboard-route table {
            min-width: 640px;
          }

          html.admin-dashboard-route .overflow-x-auto,
          html.admin-dashboard-route [class*="overflow-x-auto"] {
            -webkit-overflow-scrolling: touch;
          }

          .admin-mobile-sidebar-button {
            display: inline-flex;
            position: fixed;
            top: 13px;
            left: 12px;
            z-index: 110;
            width: 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,.12);
            background: #171717;
            color: #fff;
            box-shadow: 0 8px 24px rgba(0,0,0,.35);
          }

          .admin-mobile-sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 80;
            background: rgba(0,0,0,.62);
            opacity: 0;
            pointer-events: none;
            transition: opacity 220ms ease;
            backdrop-filter: blur(2px);
          }

          html.admin-dashboard-route.admin-sidebar-open .admin-mobile-sidebar-overlay {
            opacity: 1;
            pointer-events: auto;
          }
        }

        @media (max-width: 639px) {
          html.admin-dashboard-route main main {
            padding: 12px !important;
          }

          html.admin-dashboard-route [class*="grid-cols-2"],
          html.admin-dashboard-route [class*="grid-cols-3"],
          html.admin-dashboard-route [class*="grid-cols-4"] {
            grid-template-columns: minmax(0, 1fr) !important;
          }

          html.admin-dashboard-route h1 {
            font-size: clamp(1.55rem, 7vw, 2.1rem) !important;
            line-height: 1.25 !important;
          }

          html.admin-dashboard-route h2 {
            line-height: 1.35 !important;
          }
        }
      `}</style>

      <button
        type="button"
        className="admin-mobile-sidebar-button"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label={sidebarOpen ? 'إغلاق قائمة لوحة التحكم' : 'فتح قائمة لوحة التحكم'}
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <button
        type="button"
        className="admin-mobile-sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
        aria-label="إغلاق القائمة الجانبية"
      />

      {children}
    </>
  );
};
