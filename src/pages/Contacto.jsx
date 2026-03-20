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

const Contacto = () => {
  const { t } = useLanguage();
  const s = t.site?.contacto || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    message: '',
    archetype: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <section className="pt-16 pb-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <Reveal>
            <div className="lg:pt-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-gabarito font-bold text-white mb-6 leading-[0.95]">
                {s.title || 'Hablemos'}
              </h1>
              <p className="text-lg text-white/50 font-gabarito leading-relaxed mb-10 max-w-md">
                {s.subtitle || 'Si ya completaste Brand Soul, llená el formulario con tus resultados y agendamos una llamada.'}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 font-gabarito mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:estudio.mastermind@gmail.com"
                    className="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer font-gabarito"
                  >
                    estudio.mastermind@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 font-gabarito mb-2">
                    {s.scheduleLabel || 'Agenda una llamada'}
                  </h3>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer font-gabarito"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {s.calendlyLink || 'Calendly (próximamente)'}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={0.15}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[2rem] bg-white/5 border border-white/10 p-10 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-[#5CAA8C]/20 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5CAA8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-gabarito font-bold text-white mb-3">
                  {s.thankYouTitle || '¡Mensaje enviado!'}
                </h3>
                <p className="text-white/50 font-gabarito">
                  {s.thankYouDesc || 'Te contactaremos pronto para coordinar.'}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] bg-white/5 border border-white/10 p-8 md:p-10 space-y-6"
              >
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 font-gabarito mb-2 block">
                    {s.nameLabel || 'Nombre'} *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white font-gabarito placeholder:text-white/20 focus:outline-none focus:border-[#2b38f5]/50 focus:ring-1 focus:ring-[#2b38f5]/30 transition-all duration-200"
                    placeholder={s.namePlaceholder || 'Tu nombre'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 font-gabarito mb-2 block">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white font-gabarito placeholder:text-white/20 focus:outline-none focus:border-[#2b38f5]/50 focus:ring-1 focus:ring-[#2b38f5]/30 transition-all duration-200"
                    placeholder={s.emailPlaceholder || 'tu@email.com'}
                  />
                </div>

                {/* Brand name */}
                <div>
                  <label htmlFor="contact-brand" className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 font-gabarito mb-2 block">
                    {s.brandLabel || 'Nombre de marca'}
                  </label>
                  <input
                    id="contact-brand"
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white font-gabarito placeholder:text-white/20 focus:outline-none focus:border-[#2b38f5]/50 focus:ring-1 focus:ring-[#2b38f5]/30 transition-all duration-200"
                    placeholder={s.brandPlaceholder || 'El nombre de tu marca o proyecto'}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 font-gabarito mb-2 block">
                    {s.messageLabel || 'Mensaje'} *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white font-gabarito placeholder:text-white/20 focus:outline-none focus:border-[#2b38f5]/50 focus:ring-1 focus:ring-[#2b38f5]/30 transition-all duration-200 resize-none"
                    placeholder={s.messagePlaceholder || 'Contanos sobre tu proyecto...'}
                  />
                </div>

                {/* Archetype (optional) */}
                <div>
                  <label htmlFor="contact-archetype" className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 font-gabarito mb-2 block">
                    {s.archetypeLabel || '¿Cuál fue tu arquetipo principal?'}
                    <span className="text-white/20 ml-1">({s.optional || 'opcional'})</span>
                  </label>
                  <input
                    id="contact-archetype"
                    type="text"
                    name="archetype"
                    value={formData.archetype}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white font-gabarito placeholder:text-white/20 focus:outline-none focus:border-[#2b38f5]/50 focus:ring-1 focus:ring-[#2b38f5]/30 transition-all duration-200"
                    placeholder={s.archetypePlaceholder || 'Ej: El Explorador'}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#ff0000] text-white rounded-xl font-bold text-base tracking-wide uppercase hover:bg-red-600 hover:shadow-[0_0_30px_rgba(255,0,0,0.2)] transition-all duration-300 cursor-pointer font-gabarito"
                >
                  {s.submitButton || 'Enviar mensaje'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
