import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  BrainCircuit, 
  Store, 
  FileText, 
  BarChart3, 
  Presentation, 
  Bell, 
  Globe, 
  User, 
  ChevronDown, 
  CheckCircle2, 
  PlusCircle, 
  LayoutDashboard,
  Sparkles,
  Download,
  Loader2,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp, NavigationTab } from '../context/AppContext';
import { Language, UserRole } from '../types';
import { generatePptx } from '../utils/exportFormats';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    language, 
    setLanguage, 
    activeRole, 
    setActiveRole, 
    notifications, 
    markNotificationRead,
    backendConnected,
    t
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isDownloadingPpt, setIsDownloadingPpt] = useState(false);

  const handleDownloadPptFromNav = async () => {
    try {
      setIsDownloadingPpt(true);
      await generatePptx({ isSimpleWords: true });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.2 }
      });
    } catch {
      setActiveTab('presentation');
    } finally {
      setIsDownloadingPpt(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: t('home'), icon: <Sprout className="w-4 h-4 text-emerald-600" /> },
    { id: 'prices', label: t('prices'), icon: <TrendingUp className="w-4 h-4 text-emerald-600" /> },
    { id: 'ai-prediction', label: t('aiPrediction'), icon: <BrainCircuit className="w-4 h-4 text-amber-600" /> },
    { id: 'marketplace', label: t('marketplace'), icon: <Store className="w-4 h-4 text-teal-600" />, badge: 'Direct FPO' },
    { id: 'add-produce', label: t('addProduce'), icon: <PlusCircle className="w-4 h-4 text-emerald-700" /> },
    { id: 'deals', label: t('deals'), icon: <FileText className="w-4 h-4 text-indigo-600" /> },
    { id: 'dashboard', label: t('dashboard'), icon: <LayoutDashboard className="w-4 h-4 text-stone-600" /> },
    { id: 'datasources', label: t('datasources'), icon: <Database className="w-4 h-4 text-emerald-700" />, badge: 'Govt APIs' },
    { id: 'admin', label: t('admin'), icon: <BarChart3 className="w-4 h-4 text-stone-600" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Banner for Agri Market Awareness */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-emerald-50 px-4 py-1.5 text-xs flex justify-between items-center font-medium">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500 text-stone-950 font-bold px-2 py-0.5 rounded-sm text-[10px] tracking-wide uppercase">
            Live Mandi Network
          </span>
          <span className="text-emerald-100 font-semibold text-[11px] sm:text-xs">
            Agmarknet Price Discovery • Transport Net-Realization • Direct FPO Procurement
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <button 
            onClick={() => setActiveTab('prices')}
            className="text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold cursor-pointer underline"
          >
            <TrendingUp className="w-3 h-3 text-amber-300" />
            <span>Today's Crop Rates</span>
          </button>
          <span className="hidden md:inline text-stone-500">|</span>
          <button 
            onClick={() => setActiveTab('datasources')}
            className="hidden sm:flex items-center gap-1 text-emerald-200 hover:text-white cursor-pointer font-medium"
          >
            <Database className="w-3 h-3 text-emerald-400" />
            <span>Data Sources</span>
          </button>
          <span className="hidden md:inline text-stone-500">|</span>
          <button
            onClick={() => setActiveTab('presentation')}
            className="hidden md:flex items-center gap-1 text-stone-300 hover:text-white cursor-pointer text-[10px]"
          >
            <Presentation className="w-3 h-3 text-stone-400" />
            <span>Presentation (PPT)</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-stone-900 font-display">
                  Farm<span className="text-emerald-600">pulse</span>
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 rounded-full">
                  Farmer Portal
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block -mt-0.5">
                Price Discovery & Direct Market Linkages
              </p>
            </div>
          </div>

          {/* Center Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-50 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[9px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Primary Action: Sell Produce CTA */}
            <button
              onClick={() => setActiveTab('add-produce')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-all"
              title="List your harvest for verified direct buyers"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List Harvest</span>
              <span className="sm:hidden">Sell</span>
            </button>

            {/* Live Backend Connection Indicator */}
            <div 
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                backendConnected 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-stone-50 text-stone-600 border-stone-200'
              }`}
              title={backendConnected ? 'Backend Server active on port 3000 (Express API connected)' : 'Connecting to backend API...'}
            >
              <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-emerald-500 shadow-xs shadow-emerald-500/50 animate-pulse' : 'bg-amber-400'}`} />
              <span className="font-mono text-[10px] tracking-tight font-semibold">
                {backendConnected ? 'Backend: Live' : 'Backend: Syncing'}
              </span>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangMenuOpen(!isLangMenuOpen);
                  setIsRoleMenuOpen(false);
                  setIsNotifOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 cursor-pointer"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-stone-500" />
                <span className="uppercase font-bold text-[11px]">{language}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Language
                  </div>
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिंदी (Hindi)' },
                    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
                        language === lang.code ? 'text-emerald-700 font-semibold bg-emerald-50/60' : 'text-stone-700'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsRoleMenuOpen(!isRoleMenuOpen);
                  setIsLangMenuOpen(false);
                  setIsNotifOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-xs font-medium text-stone-800 hover:bg-stone-100 cursor-pointer"
                title="Switch User Role"
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline font-semibold">
                  {activeRole === 'farmer' ? 'Kisan: Ramesh P.' : activeRole === 'buyer' ? 'Buyer: Sahyadri' : 'Admin: APMC'}
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>
              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Switch Persona
                  </div>
                  {[
                    { role: 'farmer' as UserRole, title: 'Kisan (Farmer)', sub: 'Ramesh Patil (Hubli, 5.5 Ac)' },
                    { role: 'buyer' as UserRole, title: 'Direct Buyer / FPO', sub: 'Sahyadri Farmer Producer Co.' },
                    { role: 'admin' as UserRole, title: 'APMC Market Officer', sub: 'Agmarknet State Board' }
                  ].map((item) => (
                    <button
                      key={item.role}
                      onClick={() => {
                        setActiveRole(item.role);
                        setIsRoleMenuOpen(false);
                        if (item.role === 'admin') setActiveTab('admin');
                        else if (item.role === 'buyer') setActiveTab('marketplace');
                        else setActiveTab('dashboard');
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-start justify-between hover:bg-emerald-50 cursor-pointer border-b border-stone-100 last:border-none ${
                        activeRole === item.role ? 'bg-emerald-50/70 text-emerald-800 font-medium' : 'text-stone-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-[10px] text-stone-500">{item.sub}</div>
                      </div>
                      {activeRole === item.role && <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsLangMenuOpen(false);
                  setIsRoleMenuOpen(false);
                }}
                className="relative p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>
              {isNotifOpen && (
                <div className="absolute right-0 mt-1 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50">
                  <div className="px-3 py-2 border-b border-stone-100 flex items-center justify-between">
                    <div className="font-semibold text-xs text-stone-900 flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Live Alerts & Updates</span>
                    </div>
                    <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                      {unreadCount} unread
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-stone-100 my-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.actionUrl) {
                            setActiveTab(n.actionUrl as NavigationTab);
                            setIsNotifOpen(false);
                          }
                        }}
                        className={`p-3 text-left hover:bg-stone-50 cursor-pointer transition-colors ${
                          !n.read ? 'bg-emerald-50/40' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-stone-900">{n.title}</span>
                          <span className="text-[10px] text-stone-400">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-1 border-t border-stone-100 text-center">
                    <button
                      onClick={() => {
                        notifications.forEach(n => markNotificationRead(n.id));
                        setIsNotifOpen(false);
                      }}
                      className="text-[11px] text-emerald-700 font-semibold hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Button */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-emerald-500/30 transition-all cursor-pointer"
              title="Farmer Profile & KCC Details"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs border border-emerald-300">
                RP
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Horizontal Bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-stone-100 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'text-emerald-800 bg-emerald-50 font-bold'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[9px]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
