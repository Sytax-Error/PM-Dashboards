import { useState, useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  {
    id: "home",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "managers",
    label: "All Managers",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Project Detail",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  home: { title: "PM Dashboard Overview", subtitle: "Welcome back! Here's your project monitoring summary." },
  managers: { title: "All Managers", subtitle: "View projects assigned to specific managers" },
  projects: { title: "Project Details", subtitle: "View and manage all project details" },
  poDetails: { title: "PO/WO Details", subtitle: "Purchase Order / Work Order details" },
  invoiceReceived: { title: "Invoice Received", subtitle: "Invoices received at Billdesk" },
  invoiceBooked: { title: "Invoice Booked", subtitle: "Booked invoice details" },
  taxInvoice: { title: "Tax Invoice", subtitle: "Generated tax invoice details" },
};

import { useLocation, useNavigate } from "react-router-dom";

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine activePage from URL path
  const path = location.pathname;
  const activePage = path === "/" ? "home" : path.split("/")[1];
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowScrollTop(el.scrollTop > 300);
      setHeaderScrolled(el.scrollTop > 8);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset scroll on page change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setShowScrollTop(false);
    setHeaderScrolled(false);
  }, [activePage]);

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (pageId: string) => {
    const target = pageId === "home" ? "/" : `/${pageId}`;
    navigate(target);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  let pageInfo = { ...(pageTitles[activePage] || pageTitles.home) };
  if (!isAdmin && activePage === "managers") {
    pageInfo.title = "Projects Summary";
    pageInfo.subtitle = "Overview of your assigned projects";
  }

  const paginationManagedPages = new Set(["projects", "invoices", "agencies", "reports", "managers"]);
  const showFloatingScrollTop = showScrollTop && !paginationManagedPages.has(activePage);

  return (
    <div className="pm-app-bg h-screen flex overflow-hidden">
      {/* ====== MOBILE OVERLAY ====== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ====== SIDEBAR ====== */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-[#08111f] border-r border-white/5
          flex flex-col h-screen
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "lg:w-[72px]" : "lg:w-72"}
          w-72
        `}
      >
        {/* Logo area */}
        <div className="shrink-0 h-16 flex items-center px-4 border-b border-white/10">
          <div className={`flex items-center gap-3 w-full ${collapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 bg-white/10 ring-1 ring-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-white font-bold text-lg leading-tight">PM Dashboard</h1>
                <p className="text-slate-400 text-xs">Payment Monitoring</p>
              </div>
            )}
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-auto"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation — scrollable */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scroll-dark">
          {navItems.map((item) => {
            if (!isAdmin && item.id === "home") return null;
            
            let label = item.label;
            if (!isAdmin && item.id === "managers") {
              label = "Projects";
            }

            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                title={collapsed ? label : undefined}
                className={`
                  w-full flex items-center gap-3 rounded-xl text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${collapsed ? "justify-center px-2 py-3" : "px-4 py-3"}
                  ${
                    isActive
                      ? "bg-primary-600/20 text-white shadow-sm ring-1 ring-primary-500/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {item.icon}
                {!collapsed && <span>{label}</span>}
                {isActive && !collapsed && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-accent-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="shrink-0 px-3 py-2 border-t border-white/10 hidden lg:block">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-xs font-medium cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>

        {/* User section */}
        <div className="shrink-0 p-3 border-t border-white/10">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : "px-3 py-2"}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              {user?.name?.charAt(0) || "A"}
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{user?.name || "Admin"}</p>
                  <p className="text-slate-400 text-xs truncate">{user?.role}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            )}
          </div>
          {collapsed && (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full mt-2 flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </div>
      </aside>

      {/* ====== MAIN CONTENT ====== */}
      <div className="flex-1 flex flex-col h-screen min-w-0">
        {/* Top bar — sticky */}
        <header
          className={`
            shrink-0 h-16 bg-white/62 backdrop-blur-xl z-30 flex items-center
            transition-shadow duration-200
            ${headerScrolled ? "shadow-sm border-b border-gray-200/80" : "border-b border-gray-200/60"}
          `}
        >
          <div className="flex items-center justify-between w-full px-4 lg:px-8">
            <div className="flex items-center gap-3">
              {/* Hamburger — mobile */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {/* Sidebar toggle — desktop */}
              <button
                type="button"
                onClick={() => setCollapsed((c) => !c)}
                className="hidden lg:flex p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">{pageInfo.title}</h2>
                <p className="text-xs text-gray-500 hidden sm:block">{pageInfo.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
              </button>
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-xs">
                  {user?.name?.charAt(0) || "A"}
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name || "Admin"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content — independent scroll */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto scroll-smooth relative"
        >
          <div className="p-4 lg:p-8 min-h-full">
            {children}
          </div>

          {/* Scroll-to-top button */}
          {showFloatingScrollTop && (
            <button
              type="button"
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg shadow-primary-600/30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer animate-fade-up"
              title="Scroll to top"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
