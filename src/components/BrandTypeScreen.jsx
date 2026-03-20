import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import Card from './ui/Card';

const BrandTypeScreen = ({ onNext, onBack }) => {
    const { language } = useLanguage();

    const types = [
        {
            id: 'product',
            label: language === 'es' ? 'Producto' : 'Product',
            variant: 'white', // Uses standard white card
            bgClass: 'bg-white',
            textClass: 'text-slate-900',
            borderClass: 'border-transparent'
        },
        {
            id: 'service',
            label: language === 'es' ? 'Servicio' : 'Service',
            variant: 'custom',
            bgClass: 'bg-gradient-to-br from-red-500 to-orange-500', // Button color gradient
            textClass: 'text-white',
            borderClass: 'border-transparent'
        },
        {
            id: 'company',
            label: language === 'es' ? 'Compañía / Empresa' : 'Company',
            variant: 'custom',
            bgClass: 'bg-[#3b38f5]', // Phase 1 Blue
            textClass: 'text-white',
            borderClass: 'border-transparent'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl md:text-5xl font-gabarito font-bold text-white leading-tight">
                    {language === 'es' ? '¿Qué tipo de marca es?' : 'What type of brand is it?'}
                </h1>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full max-w-5xl">
                {types.map((type, index) => (
                    <motion.div
                        key={type.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer w-full md:w-auto flex justify-center"
                        onClick={() => onNext(type.id)}
                    >
                        <div className={`w-full max-w-[280px] h-[180px] md:h-[400px] rounded-[2rem] shadow-2xl flex items-center justify-center p-6 md:p-8 relative overflow-hidden ${type.bgClass} ${type.borderClass}`}>
                            <h2 className={`text-2xl md:text-3xl font-gabarito font-bold text-center z-10 ${type.textClass}`}>
                                {type.label}
                            </h2>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BrandTypeScreen;
