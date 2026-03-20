import React, { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { archetypes } from '../data/archetypes';
import BrandCarousel from './ui/BrandCarousel';
import AnswerCard from './ui/AnswerCard';
import { exportElementAsPdf } from '../utils/exportPdf';

const ResultsScreen = ({ scores, onRestart, history }) => {
    const { language, t } = useLanguage();
    const pdfRef = useRef(null);
    const [isExporting, setIsExporting] = useState(false);

    const handleExportPdf = async () => {
        if (!pdfRef.current || isExporting) return;
        setIsExporting(true);
        await exportElementAsPdf(pdfRef.current, 'brand-soul-discovery-resultado');
        setIsExporting(false);
    };

    // Calculate total points scored
    const totalPoints = Object.values(scores).reduce((sum, score) => sum + score, 0);

    // Calculate top 3 archetypes with percentages
    const sortedArchetypes = Object.entries(scores)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
        .slice(0, 3)
        .map(([id, score]) => {
            const archetype = archetypes.find(a => a.id === id);
            const percentage = Math.round((score / totalPoints) * 100);
            return { archetype, score, percentage };
        })
        .filter(item => item.archetype);

    const [primary, secondary, tertiary] = sortedArchetypes;

    return (
        <div ref={pdfRef} className="min-h-screen p-6 py-12 max-w-7xl mx-auto animate-fade-in flex flex-col items-center" style={{ background: '#1e1b4b' }}>
            {/* Header / Title */}
            <div className="text-center mb-12 md:mb-20 mt-8 md:mt-12">
                <h1 className="text-4xl md:text-7xl font-gabarito font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white leading-tight">
                    {language === 'es' ? 'El Alma de tu Marca' : 'Your Brand Soul'}
                </h1>
                <p className="text-slate-300 text-lg md:text-2xl font-gabarito font-light px-6">
                    {language === 'es'
                        ? 'Estos son los arquetipos que definen tu esencia'
                        : 'Here are the archetypes that define your essence'}
                </p>
            </div>

            {/* Podium Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 md:mb-40 items-end w-full max-w-7xl pt-10 md:pt-32 px-4 md:px-0">

                {/* Secondary - Left/Second */}
                <div className="order-2 lg:order-1 flex justify-center w-full">
                    <div className="w-full max-w-sm">
                        {secondary && (
                            <ArchetypeCard
                                data={secondary}
                                rank={language === 'es' ? 'EL ESTILO' : 'THE STYLE'}
                                subtitle={language === 'es' ? 'Te expresas como' : 'You express yourself as'}
                                delay="animate-slide-up-delay-200"
                                size="medium"
                            />
                        )}
                    </div>
                </div>

                {/* Primary - Center/First (Tallest) - Adjusted translation to be relative to the new spacing */}
                <div className="order-1 lg:order-2 lg:-translate-y-24 z-20">
                    {primary && (
                        <ArchetypeCard
                            data={primary}
                            rank={language === 'es' ? 'EL ALMA' : 'THE SOUL'}
                            subtitle={language === 'es' ? `Representa el ${primary.percentage}% de tu identidad` : `Represents ${primary.percentage}% of your identity`}
                            delay="animate-slide-up"
                            size="large"
                            isPrimary
                        />
                    )}
                </div>

                {/* Tertiary - Right/Third */}
                <div className="order-3 lg:order-3">
                    {tertiary && (
                        <ArchetypeCard
                            data={tertiary}
                            rank={language === 'es' ? 'EL INGREDIENTE SECRETO' : 'THE SECRET INGREDIENT'}
                            subtitle={language === 'es' ? 'Tu diferenciador oculto es' : 'Your hidden differentiator is'}
                            delay="animate-slide-up-delay-400"
                            size="small"
                        />
                    )}
                </div>
            </div>

            {/* Final Strategic CTA */}
            <div className="w-full max-w-4xl bg-gradient-to-br from-white/10 to-white/5 rounded-[3rem] p-10 md:p-16 text-center border border-white/10 shadow-2xl mb-24 relative overflow-hidden group hover:border-white/30 transition-colors duration-500">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <h2 className="text-3xl md:text-5xl font-gabarito font-bold text-white mb-6 leading-tight">
                    {language === 'es' ? 'Transforma este resultado en Estrategia' : 'Turn this Result into Strategy'}
                </h2>
                <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                    {language === 'es'
                        ? 'Lleva estos arquetipos al siguiente nivel. Diseñemos juntos una estrategia de comunicación digital coherente, impactante y alineada con la verdadera esencia de tu marca.'
                        : 'Take these archetypes to the next level. Let\'s design together a digital communication strategy that is coherent, impactful, and aligned with your brand\'s true essence.'}
                </p>
                <a
                    href="mailto:estudio.mastermind@gmail.com?subject=Estrategia%20de%20Marca%20-%20Resultados%20Brand%20Soul"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-[#ff0000] text-white rounded-full font-bold text-lg tracking-widest uppercase hover:bg-red-600 hover:shadow-[0_0_40px_rgba(255,0,0,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                >
                    <span>{language === 'es' ? 'Contactar a Mastermind' : 'Contact Mastermind'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </a>
            </div>

            {/* Selection Summary */}
            {history && (
                <div className="w-full max-w-5xl mb-24">
                    <h3 className="text-2xl md:text-3xl font-gabarito font-bold text-center mb-12 text-white/50">
                        {language === 'es' ? 'Tu Viaje de Descubrimiento' : 'Your Discovery Journey'}
                    </h3>

                    <div className="space-y-12">
                        {/* Phase 1 */}
                        {history.phase1 && (
                            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Fase 1: Calibrador</h4>
                                <div className="flex justify-center md:justify-start">
                                    <div className="w-64 aspect-[3/4]">
                                        <AnswerCard
                                            text={history.phase1.text}
                                            icon={history.phase1.image}
                                            color={history.phase1.color}
                                            isActive={false}
                                            isHovered={false}
                                            isSummary={true}
                                            className="pointer-events-none scale-100" // pointer-events-none to prevent hover effects if desired, or keep them
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Phase 2 */}
                        {history.phase2 && history.phase2.length > 0 && (
                            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Fase 2: Entrevista Ciega</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {history.phase2.map((item, idx) => {
                                        const archData = archetypes.find(a => a.id === item.answer.archetype);
                                        // Fallback if no archData (shouldn't happen)
                                        const color = archData ? archData.color : '#cbd5e1';
                                        const icon = archData ? archData.image : '';

                                        return (
                                            <div key={idx} className="flex flex-col gap-3">
                                                <div className="text-xs text-slate-500 text-center h-8 flex items-center justify-center">{item.question}</div>
                                                <div className="w-full aspect-[3/4]">
                                                    <AnswerCard
                                                        text={item.answer.text}
                                                        icon={icon}
                                                        color={color}
                                                        isActive={false}
                                                        isHovered={false}
                                                        isSummary={true}
                                                        className="pointer-events-none"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Phase 3 */}
                        {history.phase3 && history.phase3.length > 0 && (
                            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Fase 3: ADN de Palabras</h4>
                                <div className="flex flex-wrap gap-3">
                                    {history.phase3.map((keyword, idx) => {
                                        const archData = archetypes.find(a => a.id === keyword.archetype);
                                        return (
                                            <div key={idx} className="px-5 py-3 rounded-full border border-white/20 bg-white/5 text-white font-gabarito text-sm flex items-center gap-3">
                                                {archData && (
                                                    <div className="h-4 w-4" style={{
                                                        backgroundColor: archData.color,
                                                        maskImage: `url('${archData.image}')`,
                                                        maskSize: 'contain',
                                                        maskRepeat: 'no-repeat',
                                                        maskPosition: 'center',
                                                        WebkitMaskImage: `url('${archData.image}')`,
                                                        WebkitMaskSize: 'contain',
                                                        WebkitMaskRepeat: 'no-repeat',
                                                        WebkitMaskPosition: 'center'
                                                    }} />
                                                )}
                                                {keyword.text}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Export + Restart buttons */}
            <div className="text-center pb-12 flex flex-col items-center gap-6">

                {/* PDF Export Button */}
                <button
                    onClick={handleExportPdf}
                    disabled={isExporting}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 rounded-full font-bold text-base tracking-widest uppercase hover:bg-indigo-50 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-wait"
                >
                    {isExporting ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                            </svg>
                            <span>{language === 'es' ? 'Generando PDF...' : 'Generating PDF...'}</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            <span>{language === 'es' ? 'Exportar como PDF' : 'Export as PDF'}</span>
                        </>
                    )}
                </button>

                <button
                    onClick={onRestart}
                    className="px-8 py-3 text-slate-400 hover:text-white transition-colors text-sm uppercase tracking-widest border-b border-transparent hover:border-white"
                >
                    {language === 'es' ? 'Repetir la experiencia' : 'Retake the experience'}
                </button>
            </div>
        </div>
    );
};

const ArchetypeCard = ({ data, rank, subtitle, delay, size, isPrimary = false }) => {
    const { language } = useLanguage();
    const { archetype, percentage } = data;

    // Use Archetype color for glow, default to indigo/white
    const glowColor = archetype.color || '#818cf8';

    const sizeClasses = {
        large: 'scale-100 z-10', // Removed scale-110, adjusted z-index
        medium: 'scale-95 opacity-90 hover:opacity-100 z-0',
        small: 'scale-90 opacity-80 hover:opacity-100 z-0'
    };

    return (
        <div className={`${delay} ${sizeClasses[size]} transition-all duration-500 origin-bottom group`}>
            {/* NEW CARD DESIGN: Glow Effect on Hover using box-shadow */}
            <div
                className={`
                    rounded-[2.5rem] overflow-hidden p-8 md:p-10
                    bg-white/5 backdrop-blur-xl border border-white/10
                    transition-all duration-500 h-full flex flex-col relative
                    group-hover:border-white/30
                `}
                style={{
                    // Dynamic shadow based on archetype color
                    boxShadow: isPrimary
                        ? `0 0 40px -10px ${glowColor}60` // Default glow for primary
                        : '0 10px 30px -10px rgba(0,0,0,0.5)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 50px -10px ${glowColor}80, 0 0 20px ${glowColor}40`;
                    e.currentTarget.style.borderColor = `${glowColor}80`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = isPrimary
                        ? `0 0 40px -10px ${glowColor}60`
                        : '0 10px 30px -10px rgba(0,0,0,0.5)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
            >

                {/* Visual "Spotlight" Gradient Background (Subtle) */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`
                    }}
                />

                {/* Card Image */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 shadow-2xl transition-transform duration-700 group-hover:translate-y-[-5px]">
                    <img
                        src={archetype.cardImage}
                        alt={archetype.name[language]}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Card Info */}
                <div className="relative z-10">
                    <div className={`
                        text-xs font-bold tracking-[0.2em] uppercase mb-3
                        ${isPrimary ? 'text-indigo-300' : 'text-slate-400'}
                    `}>
                        {rank}
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <h3 className={`
                            font-gabarito font-bold leading-none
                            ${isPrimary ? 'text-4xl md:text-5xl text-white' : 'text-3xl text-slate-200'}
                            group-hover:text-white transition-colors duration-300
                        `}>
                            {archetype.name[language]}
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className={`
                                h-1 flex-grow rounded-full
                                ${isPrimary ? 'bg-white/30' : 'bg-white/10'}
                             `}>
                                <div className={`h-full rounded-full transition-all duration-500`} style={{ width: `${percentage}%`, backgroundColor: glowColor }} />
                            </div>
                            <span className="font-mono text-xs opacity-60">{percentage}%</span>
                        </div>
                    </div>

                    <p className={`text-sm md:text-base leading-relaxed mb-6 font-gabarito font-light ${isPrimary ? 'text-slate-300' : 'text-slate-400'} group-hover:text-slate-200 transition-colors`}>
                        {subtitle}. {archetype.description[language]}
                    </p>

                    {/* Brand Carousel */}
                    {archetype.examples && (
                        <div className="mt-auto border-t border-white/10 pt-6 group-hover:border-white/30 transition-colors">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3 font-bold opacity-70 group-hover:text-slate-400">
                                {language === 'es' ? 'Marcas' : 'Brands'}
                            </p>
                            <BrandCarousel brands={archetype.examples} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultsScreen;
