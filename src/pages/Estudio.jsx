import React from 'react';
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

const Estudio = () => {
  const { t } = useLanguage();
  const s = t.site?.estudio || {};

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <Reveal>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-gabarito font-bold text-white mb-8 leading-[0.95]">
            Mastermind
          </h1>
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl text-white/60 font-gabarito leading-relaxed">
              {s.intro || 'Somos un estudio creativo que cree en una cosa simple: las marcas que se conocen a sí mismas, construyen mejor. No empezamos diseñando. Empezamos preguntando.'}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Filosofía */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <div>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#ff0000] font-gabarito mb-4 block">
                {s.philosophyLabel || 'Filosofía'}
              </span>
              <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-white mb-6 leading-tight">
                {s.philosophyTitle || 'El proceso importa tanto como el resultado'}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <p className="text-white/50 font-gabarito leading-relaxed">
                {s.philosophyP1 || 'Creemos que detrás de cada marca memorable hay un proceso de descubrimiento genuino. No se trata de seguir tendencias o copiar lo que funciona para otros — se trata de encontrar lo que es auténticamente tuyo.'}
              </p>
              <p className="text-white/50 font-gabarito leading-relaxed">
                {s.philosophyP2 || 'Nuestro enfoque combina pensamiento estratégico con intuición creativa. Hacemos preguntas incómodas, desafiamos suposiciones y buscamos verdades que otros ignoran. Porque una marca construida sobre su verdad es una marca que perdura.'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Arquetipos del estudio */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <Reveal>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/30 font-gabarito mb-4 block">
            {s.archetypesLabel || 'Nuestros Arquetipos'}
          </span>
          <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-white mb-12 leading-tight">
            {s.archetypesTitle || 'Explorador + Sabio'}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal delay={0}>
            <div className="p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 h-full">
              <div className="w-12 h-12 rounded-full bg-[#F3D55A]/20 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F3D55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
              <h3 className="text-2xl font-gabarito font-bold text-white mb-3">
                {s.explorerTitle || 'El Explorador'}
              </h3>
              <p className="text-white/40 font-gabarito leading-relaxed">
                {s.explorerDesc || 'Nos mueve la curiosidad. Creemos que las mejores respuestas vienen de hacer las preguntas correctas. No nos conformamos con lo superficial — cavamos hasta encontrar la esencia.'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 h-full">
              <div className="w-12 h-12 rounded-full bg-[#6CCDF5]/20 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6CCDF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-gabarito font-bold text-white mb-3">
                {s.sageTitle || 'El Sabio'}
              </h3>
              <p className="text-white/40 font-gabarito leading-relaxed">
                {s.sageDesc || 'Valoramos el conocimiento genuino sobre la opinión rápida. Cada decisión de diseño tiene un por qué. Cada estrategia está respaldada por entendimiento profundo, no por intuición ciega.'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cómo trabajamos — Process */}
      <section className="py-20 pb-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <Reveal>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/30 font-gabarito mb-4 block">
            {s.processLabel || 'Proceso'}
          </span>
          <h2 className="text-3xl md:text-4xl font-gabarito font-bold text-white mb-16 leading-tight">
            {s.processTitle || 'Cómo trabajamos'}
          </h2>
        </Reveal>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/10 to-transparent" />

          <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            {[
              {
                num: '01',
                title: s.step1Title || 'Discovery',
                desc: s.step1Desc || 'Escuchamos, investigamos y hacemos las preguntas que importan. Entendemos el contexto, la audiencia y lo que hace única a tu marca.',
                color: '#E05066',
              },
              {
                num: '02',
                title: s.step2Title || 'Estrategia',
                desc: s.step2Desc || 'Definimos el posicionamiento, la personalidad y la voz de tu marca. Creamos el mapa antes de construir el camino.',
                color: '#6CCDF5',
              },
              {
                num: '03',
                title: s.step3Title || 'Diseño',
                desc: s.step3Desc || 'Damos forma visual a todo lo descubierto. Identidad, sistema de marca y piezas de comunicación que hablan por vos.',
                color: '#F3D55A',
              },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.15}>
                <div className="relative text-center md:text-left">
                  <span
                    className="text-5xl font-gabarito font-bold opacity-20 block mb-4"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </span>
                  <h3 className="text-xl font-gabarito font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/40 font-gabarito leading-relaxed max-w-xs mx-auto md:mx-0">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Estudio;
