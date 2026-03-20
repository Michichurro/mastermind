import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { to: '/trabajo', label: t.site?.nav?.trabajo || 'Trabajo' },
    { to: '/estudio', label: t.site?.nav?.estudio || 'Estudio' },
    { to: '/brand-soul', label: 'Brand Soul' },
    { to: '/contacto', label: t.site?.nav?.contacto || 'Contacto' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[var(--color-bg)]">
      <div className="w-full px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="inline-block cursor-pointer">
              <span className="text-3xl font-bold tracking-tighter text-white uppercase">
                Mastermind
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-gabarito">
              {t.site?.footer?.tagline || 'Estudio creativo de branding, identidad de marca y estrategia.'}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-8">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">
              {t.site?.footer?.navigation || 'Navegación'}
            </h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors duration-300 font-gabarito"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">
              {t.site?.footer?.contact || 'Contacto'}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:estudio.mastermind@gmail.com"
                className="text-sm font-bold tracking-widest text-white/40 hover:text-white transition-colors duration-300 font-gabarito uppercase"
              >
                estudio.mastermind@gmail.com
              </a>
              <a
                href="tel:+595994346663"
                className="text-sm font-bold tracking-widest text-white/40 hover:text-white transition-colors duration-300 font-gabarito uppercase"
              >
                +595 994 346 663
              </a>
              
              {/* Social links */}
              <div className="flex gap-8 mt-6">
                <a href="https://www.instagram.com/themastermindlab/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors duration-300" aria-label="Instagram">
                  Instagram
                </a>
                <a href="https://www.linkedin.com/company/themastermindlab/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
          <p>
            © {new Date().getFullYear()} Mastermind Estudio Creativo
          </p>
          <p>
            {t.site?.footer?.rights || 'Todos los derechos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
