import React from 'react';
import { Link } from 'react-router-dom';
import BrandSoulApp from '../BrandSoulApp';
import { useLanguage } from '../context/LanguageContext';

const BrandSoulPage = () => {
  const { t } = useLanguage();
  const s = t.site?.brandSoul || {};

  return (
    <div className="min-h-screen bg-[var(--color-brand-deep-blue)]">
      {/* Minimal top bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 cursor-pointer text-sm font-gabarito"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {s.backToSite || 'Volver al sitio'}
        </Link>
        <span className="text-xs text-white/20 font-gabarito tracking-widest uppercase hidden sm:block">
          Brand Soul Discovery
        </span>
      </div>

      {/* Mount the original Brand Soul app */}
      <BrandSoulApp />
    </div>
  );
};

export default BrandSoulPage;
