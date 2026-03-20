import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { archetypes } from '../data/archetypes';
import { useSound } from '../context/SoundContext';

const WelcomeScreen = ({ onStart }) => {
    const { playBgm, playSfx } = useSound();

    // Play Welcome BGM on mount
    useEffect(() => {
        playBgm('welcome');
    }, [playBgm]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e) => {
        if (isMobile) return; // Disable tilt on mobile
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) - 0.5;
        const y = (e.clientY / innerHeight) - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const radius = isMobile ? 260 : 420; // Reduced from 550 to tighter frame text
    const totalCards = 12;
    const angleStep = 360 / totalCards;

    const [entranceDone, setEntranceDone] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setEntranceDone(true);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    // 1. WRAPPER VARIANTS (Stable Hit Box)
    const wrapperVariants = {
        hidden: { opacity: 0, x: 0, y: 0 },
        visible: (index) => {
            const angleDeg = index * angleStep;
            const zVal = Math.floor(Math.sin((angleDeg * Math.PI) / 180) * 100);
            return {
                opacity: 1,
                zIndex: 200 + zVal,
                x: Math.cos((angleDeg * Math.PI) / 180) * radius,
                y: Math.sin((angleDeg * Math.PI) / 180) * radius,
                rotate: angleDeg + 90,
                transition: { delay: index * 0.1, duration: 0.8, ease: "backOut" }
            };
        },
        rest: (index) => {
            const angleDeg = index * angleStep;
            const zVal = Math.floor(Math.sin((angleDeg * Math.PI) / 180) * 100);
            return {
                opacity: 1,
                zIndex: 200 + zVal,
                x: Math.cos((angleDeg * Math.PI) / 180) * radius,
                y: Math.sin((angleDeg * Math.PI) / 180) * radius,
                rotate: angleDeg + 90,
                transition: { delay: 0, duration: 0.5, ease: "easeOut" }
            };
        },
        hover: {
            zIndex: 500,
            transition: { duration: 0, delay: 0 }
        }
    };

    // 2. VISUAL CHILD VARIANTS (The Pop)
    const visualVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1 },
        rest: {
            scale: 1,
            translateZ: 0,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        },
        hover: {
            scale: isMobile ? 1.05 : 1.25,
            translateZ: isMobile ? 50 : 200,
            transition: {
                translateZ: { duration: 0, delay: 0 },
                scale: { type: "spring", stiffness: 300, damping: 20 }
            }
        }
    };

    // 3. FLIP VARIANTS
    const flipVariants = {
        rest: { rotateY: 0, transition: { duration: 0.5 } },
        visible: { rotateY: 0 },
        hover: {
            rotateY: 180,
            transition: { duration: 0.6, ease: "backOut" }
        }
    };

    // Unlock audio on first interaction
    const handleUnlockAudio = () => {
        playBgm('welcome'); // Play welcome BGM after unlocking audio context
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden perspective-1000"
            onClick={handleUnlockAudio} // Unlock audio on any click
            onMouseMove={handleMouseMove}
            onTouchMove={(e) => e.stopPropagation()}
        >
            {/* 3D Carousel Layer - Perfectly Centered */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500">
                <motion.div
                    className="relative w-0 h-0 preserve-3d"
                    style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                >
                    {archetypes.map((arch, index) => (
                        <motion.div
                            key={arch.id}
                            custom={index}
                            variants={wrapperVariants}
                            initial="hidden"
                            animate={entranceDone ? "rest" : "visible"}
                            whileHover="hover"
                            onMouseEnter={() => !isMobile && playSfx('hover')}
                            onClick={() => playSfx('flip')}
                            // Sync rounded-xl with visual content
                            className="absolute top-1/2 left-1/2 pointer-events-auto rounded-xl"
                            style={{
                                width: isMobile ? '100px' : '182px',
                                height: isMobile ? '140px' : '260px',
                                marginLeft: isMobile ? '-50px' : '-91px',
                                marginTop: isMobile ? '-70px' : '-130px', // Center Point Offset logic remains for the ITEM itself
                            }}
                        >
                            {/* ... visual container ... */}
                            <motion.div
                                className="w-full h-full perspective-1000"
                                variants={visualVariants} // Uses updated visualVariants
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* ... flip logic ... */}
                                <motion.div
                                    className="relative w-full h-full preserve-3d"
                                    variants={flipVariants}
                                    style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                                >
                                    {/* FRONT: Card Back */}
                                    <div className="absolute inset-0 backface-hidden rounded-xl shadow-2xl overflow-hidden">
                                        <img
                                            src="/images/card-back-blue.png"
                                            alt="Mastermind"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* BACK: Archetype Image */}
                                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                                        <img src={arch.cardImage} alt={arch.name.es} className="w-full h-full object-cover rounded-xl shadow-2xl" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Content Layer - Perfectly Centered */}
            <motion.div
                className="relative z-10 text-center pointer-events-none flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="bg-transparent p-4 min-w-[300px] pointer-events-auto flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-gabarito font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 mb-8 leading-tight tracking-tight drop-shadow-2xl">
                        Descubrí<br />la personalidad<br />de tu marca
                    </h1>
                    <button onClick={onStart} className="group relative px-12 py-5 bg-[#ff0000] text-white rounded-full font-bold text-lg tracking-widest uppercase overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.6)]">
                        <span className="relative z-10">Comenzar</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </motion.div>

            {/* Fixed Footer */}
            <div className="absolute bottom-8 left-0 right-0 z-50 flex items-center justify-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                <img
                    src="/images/mastermind-logo.png"
                    alt="Mastermind"
                    className="h-6 w-auto object-contain brightness-0 invert"
                />
                <div className="h-4 w-px bg-white/30"></div>
                <a
                    href="https://www.instagram.com/themastermindlab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-xs font-bold tracking-widest uppercase hover:text-indigo-300 transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    @themastermindlab
                </a>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div key={i} className="absolute bg-white rounded-full opacity-20"
                        initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, scale: Math.random() * 0.5 + 0.5 }}
                        animate={{ y: [null, Math.random() * -100], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
                        style={{ width: Math.random() * 4 + 1 + 'px', height: Math.random() * 4 + 1 + 'px' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default WelcomeScreen;
