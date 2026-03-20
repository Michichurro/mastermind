import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { archetypes } from '../data/archetypes';
import Card from './ui/Card';
import AnswerCard from './ui/AnswerCard';
import ProgressBar from './ui/ProgressBar';
import { useDraggableCards } from '../hooks/useDraggableCards';

const Phase1Screen = ({ onAnswer, onBack }) => {
    const { language } = useLanguage();

    // Phase 1 Data (4 Options) - Updated Text Casing to match Reference
    const questionData = {
        title: language === 'es' ? 'FASE 1: CALIBRADOR' : 'PHASE 1: CALIBRATOR',
        question: language === 'es' ? 'Si tu marca desaparece mañana, ¿qué pierde el mundo?' : 'If your brand disappears tomorrow, what does the world lose?',
        options: [
            { id: 'sabio', text: language === 'es' ? 'Pierde: Una fuente de conocimiento y soluciones claras.' : 'Loses: A source of knowledge and clear solutions.', image: '/images/archetypes/sabio.svg', color: '#E05066' }, // Action Red
            { id: 'gobernante', text: language === 'es' ? 'Pierde: Orden, calidad y belleza tangible.' : 'Loses: Order, quality and tangible beauty.', image: '/images/archetypes/gobernante.svg', color: '#5CAA8C' }, // Structure Green
            { id: 'bufon', text: language === 'es' ? 'Pierde: Calidez, risas o compañía.' : 'Loses: Warmth, laughter or company.', image: '/images/archetypes/bufon.svg', color: '#6CCDF5' }, // Connection Blue
            { id: 'heroe', text: language === 'es' ? 'Pierde: Valentía y la capacidad de cambiar las cosas.' : 'Loses: Courage and ability to change things.', image: '/images/archetypes/heroe.svg', color: '#F3D55A' }  // Discovery Yellow
        ]
    };

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [animationState, setAnimationState] = useState('entering_question');
    const [typedQuestion, setTypedQuestion] = useState('');

    // Draggable Hook
    const {
        cardPositions,
        setCardPositions,
        draggingCard,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        setDraggingCard
    } = useDraggableCards([]);

    // Mobile Fan Interaction State
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);
    const touchStart = React.useRef(null);
    const touchEnd = React.useRef(null);

    // Mobile Swipe Handlers
    const onTouchStart = (e) => {
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    }

    const onTouchMove = (e) => {
        touchEnd.current = e.targetTouches[0].clientX;
    }

    const onTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current; // + is Left Swipe (Next), - is Right Swipe (Prev)
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            setActiveMobileIndex(prev => Math.min(prev + 1, questionData.options.length - 1));
        }
        if (isRightSwipe) {
            setActiveMobileIndex(prev => Math.max(prev - 1, 0));
        }
    }

    // Consistent Grid Positioning for Phase 1 (Horizontal Row)
    const getGridPosition = (index) => {
        // Horizontal distribution: 15%, 38%, 62%, 85%
        const xPositions = [15, 38, 62, 85];
        const yBase = 60; // Slightly below center

        // Add slight randomness for organic feel (like Phase 2)
        const randomRot = (Math.random() * 4) - 2; // +/- 2 degrees
        const randomY = (Math.random() * 4) - 2;   // +/- 2% Y

        return {
            left: xPositions[index],
            top: yBase + randomY,
            rotate: `${randomRot}deg`
        };
    };

    useEffect(() => {
        // Initialize Positions
        const newPositions = questionData.options.map((_, i) => getGridPosition(i));
        setCardPositions(newPositions);
        setDraggingCard(null);

        // Sequence: Entering -> Typing -> Dealing -> Idle
        setAnimationState('entering_question');
        setTypedQuestion('');

        const typeTimer = setTimeout(() => setAnimationState('typing_text'), 500);
        return () => clearTimeout(typeTimer);
    }, []);

    useEffect(() => {
        if (animationState === 'typing_text') {
            const fullText = questionData.question;
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                charIndex++;
                if (charIndex <= fullText.length) {
                    setTypedQuestion(fullText.slice(0, charIndex));
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => setAnimationState('dealing_answers'), 400); // Wait bit before dealing
                }
            }, 30); // Speed

            return () => clearInterval(typeInterval);
        }
    }, [animationState]);

    useEffect(() => {
        if (animationState === 'dealing_answers') {
            const timer = setTimeout(() => setAnimationState('idle'), 1000); // Allow deal animation to finish
            return () => clearTimeout(timer);
        }
    }, [animationState]);


    const handleAnswer = (option) => {
        if (animationState !== 'idle' || draggingCard !== null) return;
        setAnimationState('exiting');

        // Logic for Phase 1 Scoring (Macro-Filter)
        setTimeout(() => {
            const scores = {};
            scores[option.id] = 10; // 10 points to this archetype representing the group
            onAnswer(scores, option);
        }, 800);
    };



    // Helper to bold the "Pierde:" part with specific coloring
    const renderOptionText = (text, color) => {
        const parts = text.split(':');
        if (parts.length > 1) {
            return (
                <>
                    <span
                        className="font-extrabold text-[2rem] leading-none mb-2 block capitalize"
                        style={{ color: color }}
                    >
                        {parts[0]}:
                    </span>
                    <span className="font-bold text-[#1d0981] text-[1.5rem] leading-tight block">
                        {parts.slice(1).join(':')}
                    </span>
                </>
            );
        }
        return <span className="font-bold text-[#1d0981] text-[1.5rem] leading-tight block">{text}</span>;
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-4 md:p-6 mx-auto animate-fade-in overflow-hidden relative">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-4 left-4 z-50 p-2 rounded-full hover:bg-white/10 transition-colors group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-50 group-hover:opacity-100 transition-opacity"><path d="M15 18l-6-6 6-6" /></svg>
            </button>

            <div className="w-full mb-4 md:mb-12 z-50 relative max-w-7xl mx-auto">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-1/4"></div>
                </div>
            </div>

            {/* Mobile View - Exact Layout Match Reference */}
            <div className="lg:hidden fixed inset-0 flex flex-col overflow-hidden bg-white">

                {/* 1. FIXED TOP: Question Card (Blue) 
                    - Height: 60% (Slightly reduced to allow card to dominate when active).
                */}
                <div className="h-[60%] w-full relative z-0 flex flex-col items-center pt-6 px-4 pointer-events-none">
                    <div className="w-full h-full bg-[#3030f8] rounded-[32px] p-8 flex flex-col relative overflow-hidden pointer-events-auto shadow-sm">

                        {/* Header Text - Pushed to VERY top with negative margin if needed to be safe */}
                        <div className="relative z-10 flex flex-col items-start justify-start h-full">
                            <span className="text-sm font-medium text-white/80 block mb-6">{language === 'es' ? 'Fase 1: Calibrador' : 'Phase 1: Calibrator'}</span>
                            <h2 className="text-white font-gabarito text-[2.6rem] leading-[1.0] font-bold tracking-tight text-left">
                                {questionData.question}
                            </h2>
                        </div>

                        {/* Footer Logo - Bottom Right */}
                        <div className="absolute bottom-6 right-6 z-10 opacity-100">
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full border-[2px] border-white/90"></div>
                                <span className="text-white font-bold text-lg tracking-tight lowercase">mastermind</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. FAN HAND - Pokemon TCG Style Interaction */}
                <div className="absolute bottom-0 left-0 right-0 h-[40%] z-20 overflow-visible pointer-events-none">
                    <div
                        className="w-full h-full relative"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {questionData.options.map((option, index) => {
                            const currentIndex = activeMobileIndex;
                            const offset = index - currentIndex;
                            const isActive = index === currentIndex;

                            // Pokemon TCG Geometry:
                            // Idle: Cards sit in a tight arc at the bottom.
                            // Active: Card SHOOTS up, scales up, and rotates to 0 to become the focus.

                            let rotation = offset * 5; // Tighter arc
                            let translateX = offset * 90; // Tighter overlapping stack
                            let translateY = 140; // Buried deep at bottom
                            let scale = 0.85;
                            let zInput = 20 - Math.abs(offset); // Standard stacking

                            if (isActive) {
                                translateY = -200; // THE "HERO" POP: Adjusted for text safety
                                scale = 1.15; // Hero Scale
                                zInput = 100; // Always on top
                                rotation = 0;
                            } else {
                                // Non-active cards fade and sink slightly to focus attention on Hero
                                scale = 0.75;
                                translateY = 160;
                                // opacity: Math.abs(offset) > 1 ? 0.5 : 1; // Focus effect - This line was commented out in the diff, so I'm removing it.
                            }

                            return (
                                <div
                                    key={option.id}
                                    className="absolute bottom-[-20px] left-1/2 ml-[-125px] w-[250px] h-[360px] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) origin-bottom pointer-events-auto"
                                    style={{
                                        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                                        zIndex: zInput,
                                        // If active, fully opaque. If neighbor, slight fade. Far away, transparent.
                                        opacity: isActive ? 1 : (Math.abs(offset) > 2 ? 0 : 1),
                                    }}
                                    onClick={() => {
                                        if (isActive) handleAnswer(option);
                                        else setActiveMobileIndex(index);
                                    }}
                                >
                                    <AnswerCard
                                        icon={option.image}
                                        color={option.color}
                                        isActive={isActive}
                                        renderText={() => renderOptionText(option.text, option.color)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Desktop View (Holographic Engine) */}
            <div className="hidden lg:block relative w-full h-[800px] flex items-center justify-center" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>

                {/* Central Question Card */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-[300px] h-[450px] transition-all duration-700 ${animationState === 'exiting' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                    <Card variant="black" className="w-full h-full flex flex-col justify-between p-8 shadow-2xl transition-all duration-500 rounded-[2rem] relative overflow-hidden"
                        style={{
                            backgroundColor: '#1d4ed8', // Tailored blue matched to Phase 2
                            transform: animationState === 'entering_question' ? 'scale(0.95)' : 'scale(1)',
                            border: 'none'
                        }}
                    >
                        <div className="flex flex-col h-full relative z-10">
                            {/* Header */}
                            <span className="text-white font-gabarito text-sm mb-6 block font-medium tracking-wide">
                                {questionData.title}
                            </span>

                            {/* Question Text */}
                            <div className="flex-grow flex items-center justify-start pr-4">
                                <h2 className="text-white font-gabarito text-[2.5rem] font-semibold leading-[1.1] tracking-wide">
                                    {animationState === 'idle' || animationState === 'dealing_answers' || animationState === 'exiting' ? questionData.question : typedQuestion}
                                    {animationState === 'typing_text' && <span className="animate-pulse">|</span>}
                                </h2>
                            </div>

                            {/* Footer Logo */}
                            <div className="w-full flex justify-end items-end mt-4">
                                <img src="/images/mastermind-logo.png" alt="Mastermind" className="h-6 w-auto object-contain opacity-90" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Answer Cards */}
                {questionData.options.map((option, index) => {
                    const pos = cardPositions[index] || { top: 50, left: 50, rotate: '0deg' };

                    const isHovered = hoveredIndex === index;
                    const isDragging = draggingCard === index;
                    let style = {};
                    let zIndex = 10;
                    const baseTransform = 'translate(-50%, -50%)';

                    if (isDragging) {
                        style = {
                            top: `${pos.top}%`,
                            left: `${pos.left}%`,
                            transform: `${baseTransform} rotate(0deg) scale(1.05)`,
                            opacity: 0.9,
                            cursor: 'grabbing',
                            transition: 'none'
                        };
                        zIndex = 999;
                    } else if (animationState === 'entering_question' || animationState === 'typing_text') {
                        style = { top: '50%', left: '50%', transform: `${baseTransform} scale(0.5) rotate(${pos.rotate})`, opacity: 0, zIndex: 10 };
                    } else if (animationState === 'dealing_answers') {
                        style = { top: `${pos.top}%`, left: `${pos.left}%`, transform: `${baseTransform} rotate(${pos.rotate})`, opacity: 1, transition: `all 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 150}ms`, zIndex: 20 };
                    } else if (animationState === 'exiting') {
                        const xMove = index % 2 === 0 ? '-150%' : '150%';
                        style = { top: `${pos.top}%`, left: `${pos.left}%`, transform: `translate(${xMove}, -150%) rotate(${Math.random() * 360}deg)`, opacity: 0, transitionDuration: '600ms' };
                    } else {
                        style = {
                            top: `${pos.top}%`,
                            left: `${pos.left}%`,
                            transform: isHovered ? `${baseTransform} rotate(0deg) scale(1.05)` : `${baseTransform} rotate(${pos.rotate})`,
                            opacity: 1,
                            transition: 'all 300ms ease-out'
                        };
                        zIndex = isHovered ? 50 : 20;
                    }

                    return (
                        <div
                            key={option.id}
                            onMouseEnter={() => animationState === 'idle' && !isDragging && setHoveredIndex(index)}
                            onMouseLeave={() => animationState === 'idle' && setHoveredIndex(null)}
                            onMouseDown={(e) => handleMouseDown(e, index, animationState === 'idle')}
                            onDoubleClick={() => handleAnswer(option)}
                            className={`absolute w-[300px] h-[450px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                            style={{ ...style, zIndex }}
                        >
                            <AnswerCard
                                className="w-full h-full"
                                icon={option.image}
                                color={option.color}
                                isHovered={isHovered}
                                renderText={() => renderOptionText(option.text, option.color)}
                            />
                        </div>
                    );
                })}

                {draggingCard !== null && (
                    <div className="hidden lg:block fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-sm font-medium z-50">
                        {language === 'es' ? 'Suelta para colocar la carta' : 'Release to place the card'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Phase1Screen;
