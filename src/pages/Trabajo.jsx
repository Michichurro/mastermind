import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

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

const projects = [
  {
    title: 'Alma Coffee Co.',
    category: { es: 'Identidad de Marca', en: 'Brand Identity' },
    year: '2025',
    color: '#E05066',
    desc: {
      es: 'Identidad visual completa para una marca de café de especialidad. Desde el naming hasta el packaging.',
      en: 'Complete visual identity for a specialty coffee brand. From naming to packaging.',
    },
  },
  {
    title: 'Zenith Studio',
    category: { es: 'Branding + Web', en: 'Branding + Web' },
    year: '2025',
    color: '#6CCDF5',
    desc: {
      es: 'Rediseño de marca y sitio web para un estudio de arquitectura contemporánea.',
      en: 'Brand redesign and website for a contemporary architecture studio.',
    },
  },
  {
    title: 'Patagonia Roots',
    category: { es: 'Estrategia de Marca', en: 'Brand Strategy' },
    year: '2024',
    color: '#5CAA8C',
    desc: {
      es: 'Estrategia de posicionamiento y comunicación para una ONG de conservación ambiental.',
      en: 'Positioning and communication strategy for an environmental conservation NGO.',
    },
  },
  {
    title: 'Nova Wellness',
    category: { es: 'Identidad Visual', en: 'Visual Identity' },
    year: '2024',
    color: '#F3D55A',
    desc: {
      es: 'Sistema de identidad visual y contenido para redes sociales de un centro de bienestar.',
      en: 'Visual identity system and social media content for a wellness center.',
    },
  },
  {
    title: 'Meridian Tech',
    category: { es: 'Branding', en: 'Branding' },
    year: '2024',
    color: '#2b38f5',
    desc: {
      es: 'Marca completa para una startup fintech. Logo, guidelines y presencia digital.',
      en: 'Complete brand for a fintech startup. Logo, guidelines, and digital presence.',
    },
  },
  {
    title: 'Tierra Viva',
    category: { es: 'Contenido + Redes', en: 'Content + Social' },
    year: '2023',
    color: '#E05066',
    desc: {
      es: 'Estrategia de contenido y gestión de redes sociales para una marca de productos orgánicos.',
      en: 'Content strategy and social media management for an organic products brand.',
    },
  },
];

const Trabajo = () => {
  const { language, t } = useLanguage();
  const s = t.site?.trabajo || {};
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
        <Reveal>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/30 font-gabarito mb-3 block">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-gabarito font-bold text-white mb-6">
            {s.title || 'Trabajo'}
          </h1>
          <p className="text-lg text-white/50 max-w-2xl font-gabarito leading-relaxed">
            {s.description || 'Cada proyecto es un viaje de descubrimiento. No empezamos diseñando — empezamos preguntando, escuchando, entendiendo.'}
          </p>
        </Reveal>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <button
                onClick={() => setSelectedProject(project)}
                className="group block w-full text-left cursor-pointer"
              >
                <div
                  className="aspect-[16/10] rounded-2xl border border-white/10 mb-4 overflow-hidden relative group-hover:border-white/20 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}05 100%)`,
                  }}
                >
                  {/* Decorative initial */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[8rem] md:text-[10rem] font-gabarito font-bold opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 transform select-none"
                      style={{ color: project.color }}
                    >
                      {project.title[0]}
                    </span>
                  </div>
                  {/* Category pill */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-bold font-gabarito border"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                        backgroundColor: `${project.color}10`,
                      }}
                    >
                      {project.category[language]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-gabarito font-bold text-white group-hover:text-white/80 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <span className="text-xs text-white/30 font-gabarito">{project.year}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-2xl w-full bg-[#1d0981]/95 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <span
              className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-bold font-gabarito border inline-block mb-6"
              style={{
                color: selectedProject.color,
                borderColor: `${selectedProject.color}40`,
                backgroundColor: `${selectedProject.color}10`,
              }}
            >
              {selectedProject.category[language]}
            </span>

            <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-white mb-4">
              {selectedProject.title}
            </h2>
            <p className="text-white/50 font-gabarito leading-relaxed mb-6">
              {selectedProject.desc[language]}
            </p>
            <div className="flex items-center gap-4 text-sm text-white/30 font-gabarito">
              <span>{selectedProject.year}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{selectedProject.category[language]}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Trabajo;
