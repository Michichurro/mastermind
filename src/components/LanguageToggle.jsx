import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="">
            <button
                onClick={toggleLanguage}
                className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Toggle language"
            >
                <span className="text-sm font-medium text-white">
                    {language === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
                </span>
                <svg
                    className="w-4 h-4 text-white/70 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                </svg>
            </button>
        </div>
    );
};

export default LanguageToggle;
