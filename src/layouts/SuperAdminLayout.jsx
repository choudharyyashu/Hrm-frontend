import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Menu, Globe, User, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const SuperAdminLayout = () => {
  const { user, logout } = useAuth();
  const { t, localization, changeLanguage, supportedLanguages } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowProfileMenu(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 border-r border-slate-200 h-full shadow-sm bg-white z-30 no-print">
        <SuperAdminSidebar />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[40] lg:hidden"
            />
            <motion.div
              initial={{ x: -235 }}
              animate={{ x: 0 }}
              exit={{ x: -235 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[235px] bg-white z-[50] lg:hidden shadow-2xl"
            >
              <SuperAdminSidebar onItemClick={() => setMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-20 shrink-0 shadow-sm no-print">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-500 hover:bg-slate-50 rounded-xl border border-slate-100 shrink-0"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-sky-50 rounded-full border border-sky-100 shrink-0">
              <div className="h-2 w-2 rounded-full bg-sky-500 animate-pulse shrink-0"></div>
              <span className="text-[9px] sm:text-[10px] font-black text-sky-700 uppercase tracking-wider sm:tracking-widest">
                {t('SuperAdmin Portal')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* User Profile / Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center gap-2 sm:gap-3 pl-1 group p-1 sm:p-1.5 pr-2.5 sm:pr-3 rounded-2xl border transition-all cursor-pointer ${
                  showProfileMenu
                    ? 'bg-primary/10 border-primary/30 text-primary shadow-xs'
                    : 'bg-slate-50 hover:bg-primary/5 hover:border-primary/20 border-slate-100 text-slate-700'
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                  {user?.photo ? (
                    <img src={user.photo} alt="user" className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} className="text-slate-400" />
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[12px] font-black text-slate-800 leading-none group-hover:text-primary transition-colors uppercase tracking-tight">
                    {user?.name || 'Super Admin'}
                  </p>
                  <p className="text-[9px] font-bold text-sky-600 mt-1 uppercase tracking-widest">
                    {t('Master Admin')}
                  </p>
                </div>
                <ChevronDown size={14} className="text-slate-400 group-hover:text-primary transition-colors ml-0.5 sm:ml-1" />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowProfileMenu(false)}
                      className="fixed inset-0 z-10 bg-slate-900/5 backdrop-blur-[1px]"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="fixed left-4 right-4 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-slate-100 z-30 overflow-hidden ring-1 ring-slate-900/5 divide-y divide-slate-100"
                    >
                      <div className="p-4 bg-gradient-to-br from-slate-50 to-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 border border-sky-200 flex items-center justify-center font-black shrink-0 overflow-hidden">
                          {user?.photo ? (
                            <img src={user.photo} alt="user" className="w-full h-full object-cover" />
                          ) : (
                            <User size={20} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-black text-slate-800 uppercase tracking-tight truncate">
                            {user?.name || 'Super Admin'}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400 truncate">
                            {user?.email || 'superadmin@hrpilot.com'}
                          </p>
                        </div>
                      </div>

                      <div className="p-2 space-y-1">
                        <Link
                          to="/superadmin/profile"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-black text-slate-700 hover:text-primary hover:bg-primary/5 transition-all group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-primary/10 text-slate-500 group-hover:text-primary flex items-center justify-center transition-colors">
                            <User size={15} />
                          </div>
                          <span className="uppercase tracking-wider">{t('Profile')}</span>
                        </Link>

                        {/* Language Selector */}
                        <div className="px-3.5 py-2 rounded-2xl bg-slate-50/90 border border-slate-100">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 text-slate-700">
                              <div className="w-5 h-5 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                                <Globe size={12} />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                                {t('Language')}
                              </span>
                            </div>
                          </div>
                          <select
                            value={localization?.language || 'English'}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="w-full bg-white border border-slate-200 text-slate-800 text-[11px] font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all shadow-xs"
                          >
                            {supportedLanguages?.map((lang) => (
                              <option key={lang.code} value={lang.name}>
                                {lang.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowProfileMenu(false);
                            logout();
                            window.location.href = '/login';
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-black text-rose-600 hover:bg-rose-50 transition-all group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                            <LogOut size={15} />
                          </div>
                          <span className="uppercase tracking-wider">{t('Logout')}</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-3 sm:p-5 lg:p-6">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
