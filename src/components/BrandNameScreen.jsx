import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { motion } from 'framer-motion';

const BrandNameScreen = ({ onNext, onBack, brandType }) => {
    const { language } = useLanguage();
    const { playSfx } = useSound();
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
        playSfx('type');
    };

    const getDynamicQuestion = () => {
        if (language === 'es') {
            switch (brandType) {
                case 'product': return '¿Cuál es el nombre de tu producto?';
                case 'service': return '¿Cuál es el nombre de tu servicio?';
                case 'company': return '¿Cuál es el nombre de tu empresa?';
                default: return '¿Cuál es el nombre de tu marca, producto o servicio?';
            }
        } else {
            switch (brandType) {
                case 'product': return 'What is the name of your product?';
                case 'service': return 'What is the name of your service?';
                case 'company': return 'What is the name of your company?';
                default: return 'What is the name of your brand, product, or service?';
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim().length > 0) {
            onNext(name);
        }
    };

    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 pb-32 md:pb-6 relative overflow-hidden">

            {/* Background Particles (Optional, minimal) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute bg-indigo-500 rounded-full opacity-10 blur-3xl"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                        }}
                    />
                ))}
            </div>

            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
            </button>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-2xl text-center"
            >
                <h1 className="text-3xl md:text-5xl font-gabarito font-bold text-white mb-12 leading-tight">
                    {getDynamicQuestion()}
                </h1>

                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                    <input
                        type="text"
                        value={name}
                        onChange={handleChange}
                        placeholder={language === 'es' ? 'Escribe aquí...' : 'Type here...'}
                        className="w-full bg-transparent border-b-2 border-white/20 text-white text-center text-3xl md:text-4xl py-4 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-white/20 font-gabarito"
                        autoFocus
                    />

                    <button
                        type="submit"
                        disabled={name.trim().length === 0}
                        className={`mt-4 px-12 py-4 rounded-full font-bold text-lg tracking-widest uppercase transition-all duration-300 ${name.trim().length > 0
                            ? 'bg-[#ff0000] text-white hover:scale-105 shadow-[0_0_20px_rgba(255,0,0,0.4)]'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        {language === 'es' ? 'CONTINUAR' : 'CONTINUE'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default BrandNameScreen;
