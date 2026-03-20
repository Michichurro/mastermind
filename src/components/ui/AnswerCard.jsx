import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AnswerCard = ({
    text,
    icon,
    color,
    isActive = false,
    isHovered = false,
    onClick,
    className = "",
    isSummary = false, // New prop for smaller display in results
    renderText // Optional custom text renderer (for Phase 1 prefix)
}) => {
    const { language } = useLanguage();

    // Adjust sizes based on isSummary prop
    const paddingClass = isSummary ? 'p-4' : 'p-6';
    const iconContainerClass = isSummary ? 'mb-2' : 'mt-4 mb-4 lg:mb-6';
    const iconSizeClass = isSummary ? 'h-24 w-24' : 'h-24 w-24 lg:h-32 lg:w-32';
    const textSizeClass = isSummary ? 'text-[1.2rem] leading-tight' : 'text-[1.5rem] lg:text-[1.8rem] leading-tight';

    return (
        <div
            onClick={onClick}
            className={`w-full h-full bg-white rounded-[24px] flex flex-col items-center ${paddingClass} relative overflow-hidden transition-all duration-300 transform ${isActive || isHovered ? 'shadow-2xl' : 'shadow-sm'} ${className}`}
            style={{
                border: `12px solid ${color}`,
            }}
        >
            {/* Top Icon - COLORED using mask */}
            <div className={`w-full flex justify-center ${iconContainerClass}`}>
                <div className={`${iconSizeClass} transition-all duration-300`}
                    style={{
                        backgroundColor: color,
                        maskImage: `url('${icon}')`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: `url('${icon}')`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center'
                    }}
                />
            </div>

            {/* Text Content */}
            <div className="flex-grow flex flex-col items-center justify-center text-center z-10 w-full px-2">
                <div className={`font-gabarito font-bold text-[#1d0981] ${textSizeClass} w-full break-words`}>
                    {renderText ? renderText() : text}
                </div>
            </div>

            {/* Mobile Action Hint (only if active) */}
            {isActive && (
                <div className="absolute bottom-4 text-[#1d0981]/50 text-[10px] uppercase font-bold tracking-widest animate-pulse lg:hidden">
                    {language === 'es' ? 'Tocar para elegir' : 'Tap to select'}
                </div>
            )}
        </div>
    );
};

export default AnswerCard;
