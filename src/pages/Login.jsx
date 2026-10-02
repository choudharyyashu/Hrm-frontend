import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  Mail, 
  HelpCircle, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Fingerprint, 
  MapPin, 
  Wallet, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Activity,
  Globe,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/axios';

import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { useSettings } from '../context/SettingsContext';

const Login = () => {
  const { login } = useAuth();
  const { showAlert } = useUI();
  const { t, localization, changeLanguage, supportedLanguages } = useSettings();
  
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const [role, setRole] = useState('');
  
  // States for Login
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // States for Enquiry
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [enquiryLoading, setEnquiryLoading] = useState(false);

  // States for Forgot Password
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1 = Request code, 2 = Verify code & Reset
  const [forgotUserId, setForgotUserId] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);
  const [forgotTargetEmail, setForgotTargetEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const navigate = useNavigate();

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/login', {
        userId: credentials.userId,
        password: credentials.password,
        role: role
      });
      
      const { token, user } = response.data;
      login(user, token);
      
      const dbRole = user.role?.toLowerCase() || '';
      if (dbRole === 'superadmin' || dbRole === 'master admin' || dbRole === 'masteradmin') {
        navigate('/superadmin');
      } else if (['admin', 'hr', 'hr admin'].includes(dbRole)) {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || 'Login failed. Please check credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryLoading(true);
    try {
      await api.post('/public/enquiry', enquiryForm);
      showAlert(t('Your enquiry has been sent to the Super Admin.'), 'success');
      setShowEnquiryModal(false);
      setEnquiryForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Failed to send enquiry:', err);
      showAlert(t('Failed to send enquiry. Please try again.'), 'error');
    } finally {
      setEnquiryLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotUserId) return;
    
    setForgotLoading(true);
    try {
      const res = await api.post('/public/forgot-password-request', { userId: forgotUserId });
      setForgotTargetEmail(res.data.email || forgotUserId);
      setForgotStep(2);
      showAlert(res.data.message || t('Verification code sent to your Gmail.'), 'success');
    } catch (err) {
      console.error('Failed to send password request:', err);
      showAlert(err.response?.data?.message || t('Failed to send reset code.'), 'error');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotOtp || !forgotNewPassword) {
      return showAlert(t('Please enter verification code and new password.'), 'warning');
    }
    if (forgotNewPassword.length < 6) {
      return showAlert(t('Password must be at least 6 characters long.'), 'warning');
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      return showAlert(t('Passwords do not match.'), 'error');
    }

    setForgotLoading(true);
    try {
      const res = await api.post('/public/reset-password-verify', {
        email: forgotTargetEmail || forgotUserId,
        otp: forgotOtp,
        newPassword: forgotNewPassword
      });
      showAlert(res.data.message || t('Password reset successfully! Please log in.'), 'success');
      setShowForgotModal(false);
      setCredentials(prev => ({ ...prev, userId: forgotTargetEmail || forgotUserId, password: forgotNewPassword }));
      setForgotStep(1);
      setForgotOtp('');
      setForgotNewPassword('');
      setForgotConfirmPassword('');
    } catch (err) {
      console.error('Failed to reset password:', err);
      showAlert(err.response?.data?.message || t('Invalid code or failed to reset password.'), 'error');
    } finally {
      setForgotLoading(false);
    }
  };

  const currentLangObj = (supportedLanguages || []).find(l => 
    l.name.toLowerCase() === (localization.language || '').toLowerCase() ||
    l.code.toLowerCase() === (localization.language || '').toLowerCase()
  ) || { name: localization.language || 'English', flag: '🌐', code: 'en' };

  return (
    <div className="min-h-screen bg-[#0A0F1D] flex overflow-hidden font-sans">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full flex flex-col md:flex-row min-h-screen"
      >
        {/* Left Side - Colorful Showcase Banner (Desktop Only) */}
        <div className="md:w-1/2 lg:w-[52%] xl:w-[55%] p-10 lg:p-14 flex flex-col justify-between text-white relative overflow-hidden bg-[#0A0F1D] hidden md:flex border-r border-white/10">
          {/* Vibrant Background Lighting Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/30 blur-[130px] rounded-full pointer-events-none -z-0 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/25 blur-[140px] rounded-full pointer-events-none -z-0"></div>
          <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none -z-0"></div>
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"></div>

          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl p-1.5 flex items-center justify-center shadow-xl shadow-cyan-500/25 border border-white/40 group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <img src="/logo.png" alt="HR Pilot Pro" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-heading font-extrabold text-2xl tracking-tight text-white block leading-none">
                    HR PILOT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">PRO</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase leading-none mt-1 block">
                    {t('Cloud Enterprise')}
                  </span>
                </div>
              </Link>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-glass">
                <Sparkles size={13} className="text-cyan-400" />
                <span>{t('v3.0 Live Platform')}</span>
              </div>
            </div>

            {/* Headline & Value Proposition */}
            <div className="max-w-xl mt-12 lg:mt-14">
              <h2 className="text-3xl lg:text-4xl xl:text-[44px] font-heading font-extrabold text-white mb-4 leading-[1.18] tracking-tight">
                {t('Intelligent Workforce &')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                  {t('Automated Payroll SaaS')}
                </span>
              </h2>
              <p className="text-slate-300 text-sm lg:text-base leading-relaxed font-normal">
                {t('Manage AI biometric attendance, 3D face verification, live GPS geofencing, and instant salary processing in one unified enterprise portal.')}
              </p>
            </div>

            {/* Feature Cards Grid (Real & Colorful) */}
            <div className="mt-8 grid grid-cols-1 gap-3 max-w-lg">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition-all group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Fingerprint size={20} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('AI Face & Biometric Verification')}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{t('High-speed facial recognition with real-time liveness detection.')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition-all group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('GPS Geofencing & Mobile Punch')}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{t('Radius-locked mobile clock-ins with live device integrity check.')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition-all group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Wallet size={20} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">{t('1-Click Zero-Error Payroll')}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{t('Instant salary calculations, contributions, tax deductions & PDF payslips.')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security / Trust Assurance (Authentic) */}
          <div className="relative z-10 mt-auto pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>{t('256-Bit SSL Encrypted')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cyan-400" />
              <span>{t('Real-Time Cloud Sync')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-indigo-400" />
              <span>{t('Multi-Tenant Architecture')}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 lg:w-[48%] xl:w-[45%] min-h-screen p-5 sm:p-8 md:p-12 lg:p-14 bg-[#0A0F1D] md:bg-[#F8FAFC] flex flex-col justify-between items-center relative">
          
          {/* Top Bar for Mobile View */}
          <div className="w-full max-w-md flex md:hidden items-center justify-between pt-1 pb-3 mb-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-white rounded-xl p-1 flex items-center justify-center shadow-md shrink-0">
                <img src="/logo.png" alt="HR Pilot Pro" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white md:text-slate-900 tracking-tight">
                HR PILOT <span className="text-cyan-400 md:text-primary font-black">PRO</span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Mobile Language Switcher */}
              <div className="relative">
                <select 
                  value={localization.language || 'English'}
                  onChange={(e) => changeLanguage(e.target.value)}
                  aria-label={t('Select Language')}
                  className="bg-white/10 border border-white/15 text-white rounded-full text-xs font-bold py-1.5 px-3 outline-none cursor-pointer"
                >
                  {(supportedLanguages || []).map(lang => (
                    <option key={lang.code} value={lang.name} className="bg-slate-900 text-white">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <Link 
                to="/" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 md:bg-white border border-white/15 md:border-slate-200 text-slate-200 md:text-slate-700 font-bold text-xs shadow-xs active:scale-95 transition-all backdrop-blur-md"
              >
                <span>← {t('Back')}</span>
              </Link>
            </div>
          </div>

          {/* Desktop Top Right Bar: Language Selector + Back to Website */}
          <div className="hidden md:flex absolute top-8 right-8 items-center gap-3 z-30">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-slate-200 hover:border-primary/40 text-slate-700 font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Globe size={14} className="text-primary" />
                <span className="text-xs">{currentLangObj.flag}</span>
                <span className="text-xs">{currentLangObj.name}</span>
                <ChevronDown size={12} className={`text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50 overflow-hidden"
                  >
                    {(supportedLanguages || []).map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          changeLanguage(lang.name);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                          (localization.language || '').toLowerCase() === lang.name.toLowerCase()
                            ? 'bg-primary text-white'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                        {(localization.language || '').toLowerCase() === lang.name.toLowerCase() && (
                          <CheckCircle2 size={13} className="text-white" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Back to Website Button */}
            <Link 
              to="/" 
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-primary font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>{t('Back to Website')}</span>
            </Link>
          </div>

          {/* Center Form Container */}
          <div className="w-full max-w-md my-auto bg-slate-900/90 md:bg-white p-6 sm:p-8 md:p-8 lg:p-9 rounded-3xl shadow-2xl md:shadow-xl md:shadow-slate-200/60 border border-white/10 md:border-slate-100 backdrop-blur-xl md:backdrop-blur-none">
            <div className="mb-6 sm:mb-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-wider mb-3">
                <Sparkles size={12} className="text-primary" />
                <span>{t('Secure Portal Access')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white md:text-slate-900 tracking-tight">
                {t('Welcome Back')}
              </h3>
              <p className="text-slate-400 md:text-slate-500 text-xs sm:text-sm font-medium mt-1">
                {t('Enter your credentials to access your enterprise dashboard')}
              </p>
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-4 p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex flex-col"
                >
                  <p className="text-xs font-bold leading-relaxed">{t(error)}</p>
                  
                  {(error.toLowerCase().includes('suspended') || error.toLowerCase().includes('inactive')) && (
                    <button 
                      onClick={() => setShowEnquiryModal(true)}
                      className="mt-2 text-[10px] font-black uppercase tracking-widest bg-rose-600 text-white px-3 py-1.5 rounded-lg hover:bg-rose-700 transition-colors shadow-sm self-start flex items-center gap-2"
                    >
                      <HelpCircle size={14} /> {t('Contact Support')}
                    </button>
                  )}
                </motion.div>
              )}
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5" autoComplete="off">
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300 md:text-slate-500 ml-1">
                  {t('Email / User ID')}
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder={t('Enter your email or ID')} 
                    className="w-full bg-white/5 md:bg-slate-50 border border-white/10 md:border-slate-200 rounded-xl py-3 sm:py-3.5 pl-11 sm:pl-12 pr-4 text-xs sm:text-sm font-bold text-white md:text-slate-800 focus:bg-white/10 md:focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all outline-none placeholder:text-slate-500 placeholder:font-medium"
                    value={credentials.userId}
                    onChange={(e) => setCredentials({...credentials, userId: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300 md:text-slate-500">
                    {t('Password')}
                  </label>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (credentials.userId) {
                        setForgotUserId(credentials.userId);
                      }
                      setForgotStep(1);
                      setShowForgotModal(true);
                    }} 
                    className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-cyan-400 md:text-primary hover:underline transition-colors cursor-pointer"
                  >
                    {t('Forgot?')}
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder={t('Enter your password')} 
                    className="w-full bg-white/5 md:bg-slate-50 border border-white/10 md:border-slate-200 rounded-xl py-3 sm:py-3.5 pl-11 sm:pl-12 pr-11 sm:pr-12 text-xs sm:text-sm font-bold text-white md:text-slate-800 focus:bg-white/10 md:focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all outline-none placeholder:text-slate-500 placeholder:font-medium"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 md:hover:text-slate-600 transition-colors p-1 rounded-md"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-gradient-to-r from-primary via-indigo-600 to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white rounded-xl py-3.5 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{t('Authenticating...')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('Secure Sign In')}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-7 text-center border-t border-white/10 md:border-slate-100 pt-5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                © {new Date().getFullYear()} HR PILOT PRO SYSTEM • {t('Enterprise Ready', 'Enterprise Ready')}
              </p>
              <button type="button" onClick={() => setShowEnquiryModal(true)} className="text-[10px] font-black text-cyan-400 md:text-primary hover:underline transition-colors uppercase tracking-widest mt-1.5">
                {t('Need Help? Contact Support')}
              </button>
            </div>
          </div>

          {/* Bottom spacer for balance */}
          <div className="hidden md:block"></div>
        </div>
      </motion.div>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {showEnquiryModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40" 
              onClick={() => setShowEnquiryModal(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 20, scale: 0.95 }} 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-2xl w-full shadow-2xl flex flex-col pointer-events-auto overflow-hidden" style={{ maxWidth: '400px' }}>
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none">{t('Contact Support')}</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t('Submit an enquiry')}</p>
                    </div>
                  </div>
                  <button onClick={() => setShowEnquiryModal(false)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                    <X size={20}/>
                  </button>
                </div>
                
                <form onSubmit={handleEnquirySubmit} className="flex flex-col">
                  <div className="p-5 space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('Your Name *')}</label>
                      <input required type="text" value={enquiryForm.name} onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})} className="input-field w-full" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('Email Address *')}</label>
                      <input required type="email" value={enquiryForm.email} onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})} className="input-field w-full" placeholder="john@company.com" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('Mobile Number *')}</label>
                      <input required type="text" value={enquiryForm.phone} onChange={e => setEnquiryForm({...enquiryForm, phone: e.target.value})} className="input-field w-full" placeholder="+1234567890" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('Subject *')}</label>
                      <input required type="text" value={enquiryForm.subject} onChange={e => setEnquiryForm({...enquiryForm, subject: e.target.value})} className="input-field w-full" placeholder={t('Account suspended issue', 'Account suspended issue')} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('Message *')}</label>
                      <textarea required value={enquiryForm.message} onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})} className="input-field w-full min-h-[80px] resize-none" placeholder={t('Please describe your issue...')}></textarea>
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                    <button type="button" onClick={() => setShowEnquiryModal(false)} className="px-5 py-2.5 text-[11px] font-black text-slate-600 hover:bg-slate-200 rounded-xl transition-colors uppercase tracking-widest">{t('Cancel')}</button>
                    <button type="submit" disabled={enquiryLoading} className="btn-primary px-6 py-2.5 text-[11px] font-black uppercase tracking-widest shadow-md hover:shadow-lg disabled:opacity-50">
                      {enquiryLoading ? t('Sending...') : t('Send Enquiry')}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40" 
              onClick={() => setShowForgotModal(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 20, scale: 0.95 }} 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl w-full shadow-2xl flex flex-col pointer-events-auto overflow-hidden border border-slate-100" style={{ maxWidth: '420px' }}>
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none">
                        {forgotStep === 1 ? t('Reset Password') : t('Verify & Set Password')}
                      </h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {forgotStep === 1 ? t('Gmail Verification') : t('Step 2 of 2')}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => { setShowForgotModal(false); setForgotStep(1); }} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                    <X size={20}/>
                  </button>
                </div>
                
                {forgotStep === 1 ? (
                  <form onSubmit={handleForgotPassword} className="flex flex-col">
                    <div className="p-5 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {t('Enter your registered account Email or User ID. A secure 6-digit verification code will be sent to your Gmail.')}
                      </p>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                          {t('Account Email / ID *')}
                        </label>
                        <input 
                          required 
                          type="text" 
                          value={forgotUserId} 
                          onChange={e => setForgotUserId(e.target.value)} 
                          className="input-field w-full text-xs font-bold" 
                          placeholder={t('Enter your registered email or ID')} 
                        />
                      </div>
                    </div>
                    <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                      <button type="button" onClick={() => setShowForgotModal(false)} className="px-4 py-2.5 text-[11px] font-black text-slate-600 hover:bg-slate-200 rounded-xl transition-colors uppercase tracking-widest">{t('Cancel')}</button>
                      <button type="submit" disabled={forgotLoading} className="btn-primary px-5 py-2.5 text-[11px] font-black uppercase tracking-widest shadow-md hover:shadow-lg disabled:opacity-50">
                        {forgotLoading ? t('Sending...') : t('Send Reset Code')}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleResetPasswordSubmit} className="flex flex-col">
                    <div className="p-5 space-y-3.5">
                      <div className="p-3 bg-primary/5 border border-primary/15 rounded-xl text-center">
                        <p className="text-[11px] text-slate-600">
                          {t('We sent a 6-digit code to', 'We sent a 6-digit code to')} <strong className="text-primary">{forgotTargetEmail}</strong>
                        </p>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                          {t('6-Digit Code *')}
                        </label>
                        <input 
                          required 
                          type="text" 
                          maxLength={6}
                          value={forgotOtp} 
                          onChange={e => setForgotOtp(e.target.value)} 
                          className="input-field w-full text-center text-base font-black tracking-widest text-primary" 
                          placeholder="123456" 
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                          {t('New Password *')}
                        </label>
                        <div className="relative">
                          <input 
                            required 
                            type={showForgotNewPassword ? "text" : "password"} 
                            value={forgotNewPassword} 
                            onChange={e => setForgotNewPassword(e.target.value)} 
                            className="input-field w-full text-xs font-bold pr-10" 
                            placeholder={t('Minimum 6 characters')} 
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowForgotNewPassword(!showForgotNewPassword)} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                          >
                            {showForgotNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                          {t('Confirm New Password *')}
                        </label>
                        <div className="relative">
                          <input 
                            required 
                            type={showForgotConfirmPassword ? "text" : "password"} 
                            value={forgotConfirmPassword} 
                            onChange={e => setForgotConfirmPassword(e.target.value)} 
                            className="input-field w-full text-xs font-bold pr-10" 
                            placeholder={t('Repeat new password')} 
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                          >
                            {showForgotConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50">
                      <button 
                        type="button" 
                        onClick={() => setForgotStep(1)} 
                        className="text-[10px] font-black text-slate-500 hover:text-primary uppercase tracking-wider underline cursor-pointer"
                      >
                        {t('Resend / Change Email')}
                      </button>
                      <button 
                        type="submit" 
                        disabled={forgotLoading} 
                        className="btn-primary px-5 py-2.5 text-[11px] font-black uppercase tracking-widest shadow-md hover:shadow-lg disabled:opacity-50"
                      >
                        {forgotLoading ? t('Updating...', 'Updating...') : t('Set Password')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Login;

