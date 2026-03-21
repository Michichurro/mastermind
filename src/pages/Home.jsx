import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';

// Scroll-reveal animation wrapper
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const { t } = useLanguage();
  const s = t.site?.home || {};
  const displayProjects = projects.slice(0, 4);

  return (
    <div className="overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12">
        <div className="relative z-10 w-full pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[14vw] md:text-[12vw] font-bold leading-[0.8] mb-12 uppercase">
              {s.heroTitle || 'No diseñamos marcas.'}
              <br />
              <span className="text-white/20">
                {s.heroTitleAccent || 'Las descubrimos.'}
              </span>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mt-12 border-t border-white/10 pt-12">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-2xl text-white/60 leading-tight max-w-xl font-gabarito"
            >
              {s.heroSubtitle || 'Mastermind es un estudio creativo que ayuda a marcas y emprendedores a encontrar su esencia antes de diseñar.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4 font-mono text-xs font-bold uppercase tracking-widest"
            >
              <Link
                to="/brand-soul"
                className="group flex items-center gap-2 border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-500"
              >
                {s.ctaPrimary || 'Descubrí tu marca'}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute bottom-12 left-12 font-mono text-[10px] uppercase tracking-[0.3em]"
        >
          Scroll to explore ↓
        </motion.div>
      </section>

      {/* ═══════════════════════════ WORK PREVIEW ═══════════════════════════ */}
      <section className="py-32 px-6 lg:px-12 border-t border-white/5">
        <Reveal>
          <div className="flex items-baseline justify-between mb-24">
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter">
              {s.workTitle || 'Proyectos'}
            </h2>
            <Link
              to="/trabajo"
              className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
            >
              (03) View All
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-32">
          {displayProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1} className={i % 2 === 1 ? 'lg:mt-32' : ''}>
              <Link
                to="/trabajo"
                className="group block w-full"
              >
                <div className="aspect-[16/10] bg-white/5 border border-white/10 mb-8 overflow-hidden relative group-hover:border-white/30 transition-all duration-700">
                   <div 
                     className="absolute inset-0 grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                     style={{
                       background: project.image ? `url(${project.image}) center/cover no-repeat` : `linear-gradient(135deg, ${project.color}20 0%, ${project.color}05 100%)`
                     }}
                   >
                     {!project.image && (
                       <div className="absolute inset-0 flex items-center justify-center">
                         <span className="text-[10rem] font-bold text-white/[0.05]" style={{ color: project.color }}>
                            {project.title[0]}
                         </span>
                       </div>
                     )}
                   </div>
                </div>
                
                <div className="flex justify-between items-start border-t border-white/10 pt-6">
                  <div>
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest block mb-2" style={{ color: project.color }}>
                       0{i + 1} — {project.category.es /* simple fallback */}
                    </span>
                    <h3 className="text-3xl font-bold uppercase group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-white/20">
                    ({project.year})
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ SERVICES ═══════════════════════════ */}
      <section className="py-32 px-6 lg:px-12 bg-white text-black">
        <Reveal>
          <div className="max-w-4xl mb-32">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] mb-8 block">
              {s.servicesLabel || 'Servicios'}
            </span>
            <h2 className="text-5xl md:text-8xl font-bold uppercase leading-[0.9] tracking-tighter">
              {s.servicesTitle || 'Branding con intención.'}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
          {[
            {
              title: s.service1Title || 'Identidad de Marca',
              desc: s.service1Desc || 'Diseñamos sistemas visuales que comunican quién sos. Logo, tipografía y lenguaje visual.',
            },
            {
              title: s.service2Title || 'Estrategia de Marca',
              desc: s.service2Desc || 'Definimos el posicionamiento, la voz y la personalidad de tu marca.',
            },
            {
              title: s.service3Title || 'Contenido Digital',
              desc: s.service3Desc || 'Creamos contenido visual estratégico que conecta con tu audiencia real.',
            },
          ].map((service, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-t border-black/10 pt-8 h-full">
                <span className="font-mono text-[10px] font-bold mb-6 block">(0{i+1})</span>
                <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm opacity-60 leading-relaxed max-w-xs font-gabarito">
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ FINAL CTA ═══════════════════════════ */}
      <section className="py-48 px-6 lg:px-12 text-center flex flex-col items-center">
        <Reveal>
          <h2 className="text-[10vw] font-bold uppercase leading-[0.8] mb-16 tracking-tighter max-w-6xl mx-auto">
            {s.finalCtaTitle || '¿Hablamos?'}
          </h2>
          <Link
            to="/contacto"
            className="group inline-flex items-center gap-6 text-2xl md:text-4xl font-bold uppercase border-b-4 border-white pb-2 hover:text-white/40 hover:border-white/40 transition-all duration-500"
          >
            {s.finalCtaButton || 'Start a project'}
            <span className="group-hover:rotate-45 transition-transform duration-500">↗</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
