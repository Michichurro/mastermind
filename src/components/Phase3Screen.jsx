import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { phase3Keywords } from '../data/phase3-keywords';
import { archetypes } from '../data/archetypes';

const Phase3Screen = ({ onComplete, onBack }) => {
    const { language } = useLanguage();
    const data = phase3Keywords[language];
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    const toggleKeyword = (keyword) => {
        if (selectedKeywords.find(k => k.id === keyword.id)) {
            // Deselect
            setSelectedKeywords(selectedKeywords.filter(k => k.id !== keyword.id));
        } else {
            // Select only if less than 3
            if (selectedKeywords.length < 3) {
                setSelectedKeywords([...selectedKeywords, keyword]);
            }
        }
    };

    const handleContinue = () => {
        // Calculate scores from selected keywords
        const scores = {};
        selectedKeywords.forEach(keyword => {
            scores[keyword.archetype] = keyword.points;
        });
        onComplete(scores, selectedKeywords);
    };

    const isSelected = (keywordId) => {
        return selectedKeywords.some(k => k.id === keywordId);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-7xl mx-auto animate-fade-in relative">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-0 left-6 md:top-8 md:left-8 p-2 rounded-full hover:bg-white/10 transition-colors group z-50"
                aria-label="Go Back"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400 group-hover:text-white transition-colors"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <div className="text-center mb-12 mt-12 md:mt-0">
                <h2 className="text-4xl md:text-5xl font-gabarito font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    {data.title}
                </h2>
                <p className="text-xl text-slate-300 mb-2 font-gabarito">{data.subtitle}</p>
                <p className="text-sm text-slate-400 font-gabarito">
                    {data.instruction} ({selectedKeywords.length}/3)
                </p>
            </div>

            {/* Grid for Keywords */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-12">
                {data.keywords.map((keyword) => {
                    const selected = isSelected(keyword.id);
                    const archData = archetypes.find(a => a.id === keyword.archetype);
                    const borderColor = archData ? archData.color : '#cbd5e1'; // fallback slate-300
                    const iconPath = archData ? archData.image : '';

                    return (
                        <button
                            key={keyword.id}
                            onClick={() => toggleKeyword(keyword)}
                            disabled={!selected && selectedKeywords.length >= 3}
                            className={`
                                relative flex items-center justify-center gap-4 rounded-[2rem] font-bold text-lg transition-all duration-300
                                bg-white
                                ${selected
                                    ? 'scale-105 shadow-[0_0_30px_-5px_var(--border-color)] z-10'
                                    : 'hover:scale-105 hover:shadow-lg'
                                }
                                ${!selected && selectedKeywords.length >= 3 ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer'}
                            `}
                            style={{
                                border: `4px solid ${borderColor}`,
                                padding: '50px 20px', // Requested 50px spacing (vertical/around text somewhat). "50px between text and borders". 
                                // To strictly satisfy "between text and borders", I can use a large padding. 
                                // However, horizontal padding of 50px might break the grid on smaller screens.
                                // I will aim for vertical padding 40-50px and reasonable horizontal.
                                '--border-color': borderColor
                            }}
                        >
                            {/* Icon */}
                            {iconPath && (
                                <img
                                    src={iconPath}
                                    alt={keyword.archetype}
                                    className="h-12 w-12 object-contain"
                                />
                            )}

                            {/* Text */}
                            <span className="text-[#1d0981] uppercase tracking-wide">
                                {keyword.text}
                            </span>
                        </button>
                    );
                })}
            </div>

            <button
                onClick={handleContinue}
                disabled={selectedKeywords.length !== 3}
                className={`
                    px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300
                    ${selectedKeywords.length === 3
                        ? 'bg-white text-slate-900 hover:scale-105 cursor-pointer shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]'
                        : 'bg-white/20 text-slate-500 cursor-not-allowed'
                    }
                `}
            >
                {language === 'es' ? 'Continuar' : 'Continue'} →
            </button>
        </div>
    );
};

export default Phase3Screen;
