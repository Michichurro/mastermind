import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/trabajo', label: t.site?.nav?.trabajo || 'Trabajo' },
    { to: '/estudio', label: t.site?.nav?.estudio || 'Estudio' },
    { to: '/brand-soul', label: 'Brand Soul' },
    { to: '/contacto', label: t.site?.nav?.contacto || 'Contacto' },
  ];

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    }).toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference border-b border-white/10 lg:border-none">
      <div className="w-full px-6 py-6">
        {/* Desktop Layout: 3 Columns */}
        <div className="hidden lg:grid grid-cols-3 items-center w-full">
          {/* Column 1: Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight text-white font-gabarito">
            Mastermind
          </Link>

          {/* Column 2: Contact (Centered) */}
          <div className="flex justify-center">
            <Link 
              to="/contacto" 
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-300 font-gabarito"
            >
              <span>{t.site?.nav?.contacto || 'Contacto'}</span>
              <motion.span
                animate={{ y: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </Link>
          </div>

          {/* Column 3: Stats/Time (Right) */}
          <div className="flex justify-end items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 font-mono">
            <div className="flex items-center gap-4">
              <span>Local time</span>
              <span className="text-white/80 w-24 tabular-nums">{formatTime(currentTime)}</span>
            </div>
            
            {/* Language Toggle in a minimalist way */}
            <button
              onClick={toggleLanguage}
              className="hover:text-white transition-colors duration-300"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
        </div>

        {/* Mobile Layout: Simplified 2 Columns */}
        <div className="lg:hidden flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-white font-gabarito">
            Mastermind
          </Link>
          
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest font-mono"
          >
            {isMobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8"
          >
             {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-4xl font-bold font-gabarito tracking-tighter ${
                    isActive ? 'text-white' : 'text-white/20'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            <button
              onClick={toggleLanguage}
              className="mt-8 text-sm font-mono text-white/40 uppercase tracking-widest"
            >
              {language === 'es' ? 'English' : 'Español'}
            </button>
            
            <button
              onClick={() => setIsMobileOpen(false)}
              className="fixed bottom-12 text-xs font-mono text-white/60 uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full"
            >
              Close Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
