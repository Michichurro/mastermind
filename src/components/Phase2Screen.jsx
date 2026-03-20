import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { phase2Questions } from '../data/phase2-questions';
import { archetypes } from '../data/archetypes';
import Card from './ui/Card';
import AnswerCard from './ui/AnswerCard';
import ProgressBar from './ui/ProgressBar';
import { useDraggableCards } from '../hooks/useDraggableCards';

const Phase2Screen = ({ onComplete, onBack }) => {
    const { language } = useLanguage();
    const questions = phase2Questions[language] || phase2Questions['es']; // Fallback safely
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [cumulativeScores, setCumulativeScores] = useState({});
    const [selectionHistory, setSelectionHistory] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [animationState, setAnimationState] = useState('entering_question');
    const [typedQuestion, setTypedQuestion] = useState('');
    const [displayedOptions, setDisplayedOptions] = useState([]);

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
        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        // Include "Add New Card" button in index count (length)
        const totalItems = displayedOptions.length; // Strict Game System: Only Options

        if (isLeftSwipe) {
            setActiveMobileIndex(prev => Math.min(prev + 1, totalItems - 1));
        }
        if (isRightSwipe) {
            setActiveMobileIndex(prev => Math.max(prev - 1, 0));
        }
    }

    const handleBackInternal = () => {
        if (currentQuestionIndex > 0) {
            // Go back one question
            setAnimationState('exiting'); // Optional: Add a 'reverse_exiting' state if we want reverse animations
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev - 1);
            }, 300);
        } else {
            // Go back to previous phase
            onBack();
        }
    };

    // Advanced Grid Positioning System
    const getGridPosition = (index, questionIndex = 0) => {
        const isPatternA = questionIndex % 2 === 0;

        // Configuration A (Magenta Pattern)
        const slotsA = [
            { x: 25, y: 30, r: -3 },  // Left Inner Top
            { x: 8, y: 55, r: 2 },    // Left Outer Mid
            { x: 25, y: 80, r: -4 },  // Left Inner Bottom
            { x: 92, y: 30, r: 3 },   // Right Outer Top
            { x: 75, y: 55, r: -2 },  // Right Inner Mid
            { x: 92, y: 80, r: 4 },   // Right Outer Bottom
        ];

        // Configuration B (Cyan Pattern)
        const slotsB = [
            { x: 8, y: 30, r: 2 },    // Left Outer Top
            { x: 25, y: 55, r: -3 },  // Left Inner Mid
            { x: 8, y: 80, r: 5 },    // Left Outer Bottom
            { x: 75, y: 30, r: -2 },  // Right Inner Top
            { x: 92, y: 55, r: 4 },   // Right Outer Mid
            { x: 75, y: 80, r: -5 },  // Right Inner Bottom
        ];

        const slots = isPatternA ? slotsA : slotsB;
        const pos = slots[index % slots.length] || { x: 50, y: 50, r: 0 };
        const finalRot = pos.r + (Math.random() * 2 - 1);

        return {
            left: pos.x,
            top: pos.y,
            rotate: `${finalRot}deg`
        };
    };

    useEffect(() => {
        if (!questions) return;
        const currentQ = questions[currentQuestionIndex];
        if (!currentQ) return;

        setDisplayedOptions(currentQ.options);

        const newPositions = [];
        for (let i = 0; i < currentQ.options.length; i++) {
            newPositions.push(getGridPosition(i, currentQuestionIndex));
        }
        setCardPositions(newPositions);
        setDraggingCard(null);
        setAnimationState('entering_question');
        setTypedQuestion('');

        const typeTimer = setTimeout(() => setAnimationState('typing_text'), 500);
        return () => clearTimeout(typeTimer);
    }, [currentQuestionIndex, language, questions]);

    useEffect(() => {
        if (!questions) return;
        if (animationState === 'typing_text') {
            const currentQ = questions[currentQuestionIndex];
            if (!currentQ) return;

            const fullText = currentQ.question;
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                charIndex++;
                if (charIndex <= fullText.length) {
                    setTypedQuestion(fullText.slice(0, charIndex));
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => setAnimationState('dealing_answers'), 200);
                }
            }, 25);

            return () => clearInterval(typeInterval);
        }
    }, [animationState, currentQuestionIndex, questions]);

    useEffect(() => {
        if (animationState === 'dealing_answers') {
            const timer = setTimeout(() => setAnimationState('idle'), 800);
            return () => clearTimeout(timer);
        }
    }, [animationState]);

    const archetypeColors = archetypes.reduce((acc, arch) => {
        acc[arch.id] = arch.color;
        return acc;
    }, {});

    if (!questions || questions.length === 0) {
        return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    const handleAnswer = (option) => {
        if (animationState !== 'idle' || draggingCard !== null) return;
        setAnimationState('exiting');

        setTimeout(() => {
            const newScores = { ...cumulativeScores };
            newScores[option.archetype] = (newScores[option.archetype] || 0) + option.points;
            setCumulativeScores(newScores);

            const newHistory = [...selectionHistory, {
                question: currentQuestion.question,
                answer: option
            }];
            setSelectionHistory(newHistory);

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                onComplete(newScores, newHistory);
            }
        }, 600);
    };

    const groupIcons = { red: '📚', blue: '💙', yellow: '⚡', green: '🏛️' };
    const getGroupFromArchetype = (archetypeId) => {
        const archetype = archetypes.find(a => a.id === archetypeId);
        return archetype ? archetype.group : null;
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-4 md:p-6 mx-auto animate-fade-in overflow-hidden relative">
            {/* Back Button */}
            <button
                onClick={handleBackInternal}
                className="absolute top-4 left-4 z-50 p-2 rounded-full hover:bg-white/10 transition-colors group"
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
                    className="text-white opacity-50 group-hover:opacity-100 transition-opacity"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <div className="w-full mb-4 md:mb-12 z-50 relative max-w-7xl mx-auto">
                {/* Mobile View - Exact Layout Match Reference */}
                <div className="lg:hidden fixed inset-0 flex flex-col overflow-hidden bg-white">

                    {/* 0. PROGRESS BAR (Absolute Top) */}
                    <div className="absolute top-4 left-0 right-0 z-50 px-6">
                        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                    </div>

                    {/* 1. FIXED TOP: Question Card (Blue) 
                    - Height: 60% (Slightly reduced to allow card to dominate when active).
                */}
                    <div className="h-[60%] w-full relative z-0 flex flex-col items-center pt-6 px-4 pointer-events-none">
                        <div className="w-full h-full bg-[#3030f8] rounded-[32px] p-8 flex flex-col relative overflow-hidden pointer-events-auto shadow-sm">

                            {/* Header Text - Pushed to VERY top with negative margin if needed to be safe */}
                            <div className="relative z-10 flex flex-col items-start justify-start h-full mt-4">
                                <span className="text-sm font-medium text-white/80 block mb-2">{currentQuestion.title}</span>
                                <h2 className="text-white font-gabarito text-[2.4rem] leading-[1.05] font-bold tracking-tight text-left">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            {/* Footer Logo - Bottom Right */}
                            <div className="absolute bottom-6 right-6 z-10 opacity-100">
                                <img src="/images/mastermind-logo.png" alt="mastermind" className="h-5 w-auto object-contain brightness-0 invert opacity-100" />
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
                            {displayedOptions.map((option, index) => {
                                const group = getGroupFromArchetype(option.archetype);
                                const currentIndex = activeMobileIndex;
                                const offset = index - currentIndex;
                                const isActive = index === currentIndex;

                                // Pokemon TCG Geometry:
                                // Idle: Cards sit in a tight arc at the bottom.
                                // Active: Card SHOOTS up, scales up, and rotates to 0 to become the focus.

                                let rotation = offset * 5;
                                let translateX = offset * 90;
                                let translateY = 140;
                                let scale = 0.85;
                                let zInput = 20 - Math.abs(offset);

                                if (isActive) {
                                    translateY = -200; // THE "HERO" POP: Significant overlap
                                    scale = 1.15;
                                    zInput = 100;
                                    rotation = 0;
                                } else {
                                    scale = 0.75;
                                    translateY = 160;
                                }

                                return (
                                    <div
                                        key={`${currentQuestionIndex}-${index}`}
                                        className="absolute bottom-[-20px] left-1/2 ml-[-125px] w-[250px] h-[360px] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) origin-bottom pointer-events-auto"
                                        style={{
                                            transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                                            zIndex: zInput,
                                            opacity: isActive ? 1 : (Math.abs(offset) > 2 ? 0 : (Math.abs(offset) > 1 ? 0.5 : 1))
                                        }}
                                    >
                                        <AnswerCard
                                            className="w-full h-full"
                                            icon={archetypes.find(a => a.id === option.archetype)?.image}
                                            color={archetypeColors[option.archetype]}
                                            text={option.text}
                                            isActive={isActive}
                                            onClick={() => {
                                                if (isActive) handleAnswer(option);
                                                else setActiveMobileIndex(index);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block relative w-full h-[600px] flex items-center justify-center" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>

                    {/* Central Question Card */}
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-[300px] h-[450px] transition-all duration-700 ${animationState === 'exiting' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                        <Card variant="black" className="w-full h-full flex flex-col justify-between p-8 shadow-2xl transition-all duration-500 rounded-[2rem] relative overflow-hidden"
                            style={{
                                backgroundColor: '#1d4ed8', // Tailored blue color (blue-700 approx) 
                                transform: animationState === 'entering_question' ? 'scale(0.95)' : 'scale(1)',
                                border: 'none'
                            }}
                        >
                            {/* Content Container */}
                            <div className="flex flex-col h-full relative z-10">
                                {/* Header */}
                                <span className="text-white font-gabarito text-sm mb-6 block font-medium tracking-wide">
                                    {currentQuestion.title}
                                </span>

                                {/* Question Text - Centered vertically in available space */}
                                <div className="flex-grow flex items-center justify-start pr-4">
                                    <h2 className="text-white font-gabarito text-[2.5rem] font-semibold leading-[1.1] tracking-wide">
                                        {animationState === 'idle' || animationState === 'dealing_answers' || animationState === 'exiting' ? currentQuestion.question : typedQuestion}
                                        {animationState === 'typing_text' && <span className="animate-pulse">|</span>}
                                    </h2>
                                </div>

                                {/* Footer Logo */}
                                <div className="w-full flex justify-end items-end mt-4">
                                    <img
                                        src="/images/mastermind-logo.png"
                                        alt="Mastermind"
                                        className="h-6 w-auto object-contain opacity-90"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {displayedOptions.map((option, index) => {
                        const pos = cardPositions[index] || { top: 50, left: 50, rotate: '0deg' };
                        const group = getGroupFromArchetype(option.archetype);
                        const archetypeData = archetypes.find(a => a.id === option.archetype); // Find data to get SVG path
                        const imagePath = archetypeData ? archetypeData.image : '';

                        const isHovered = hoveredIndex === index;
                        const isDragging = draggingCard === index;
                        let style = {};
                        let zIndex = 10;

                        // BASE TRANSFORM: ALWAYS CENTER
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
                            style = { top: `${pos.top}%`, left: `${pos.left}%`, transform: `${baseTransform} rotate(${pos.rotate})`, opacity: 1, transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 100}ms` };
                            zIndex = 20;
                        } else if (animationState === 'exiting') {
                            const isLeft = pos.left < 50;
                            const isTop = pos.top < 50;
                            const xMove = isLeft ? '-150%' : '150%';
                            const yMove = isTop ? '-150%' : '150%';
                            style = { top: `${pos.top}%`, left: `${pos.left}%`, transform: `translate(${xMove}, ${yMove}) rotate(${Math.random() * 360}deg)`, opacity: 0, transitionDuration: '600ms' };
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
                                key={`${currentQuestionIndex}-${index}-${option.archetype}`}
                                onMouseEnter={() => animationState === 'idle' && !isDragging && setHoveredIndex(index)}
                                onMouseLeave={() => animationState === 'idle' && setHoveredIndex(null)}
                                onMouseDown={(e) => handleMouseDown(e, index, animationState === 'idle')}
                                onDoubleClick={() => handleAnswer(option)}
                                className={`absolute w-[300px] h-[450px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                                style={{ ...style, zIndex }}
                            >
                                {/* NEW ANSWER CARD DESIGN */}
                                <AnswerCard
                                    className="w-full h-full"
                                    icon={imagePath}
                                    color={archetypeColors[option.archetype] || '#e2e8f0'}
                                    text={option.text}
                                    isHovered={isHovered}
                                />
                            </div>
                        );
                    })}

                </div>

                {
                    draggingCard !== null && (
                        <div className="hidden lg:block fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-sm font-medium z-50">
                            {language === 'es' ? 'Suelta para colocar la carta' : 'Release to place the card'}
                        </div>
                    )
                }
            </div>
        </div >
    );
};

export default Phase2Screen;
