import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    // Get initial language from localStorage or default to Spanish
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('brandSoulLanguage');
        return saved || 'es';
    });

    // Save language preference to localStorage
    useEffect(() => {
        localStorage.setItem('brandSoulLanguage', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'es' : 'en');
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
