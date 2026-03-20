import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);
    const bgmRef = useRef(null);

    // Initial Volume
    useEffect(() => {
        Howler.volume(0.5);
    }, []);

    const toggleMute = () => {
        setIsMuted(prev => {
            const newState = !prev;
            Howler.mute(newState);
            return newState;
        });
    };

    const playBgm = () => {
        // Unlock AudioContext on mobile/browsers
        if (Howler.ctx && Howler.ctx.state === 'suspended') {
            Howler.ctx.resume().then(() => {
                console.log('[Audio] Howler Context Resumed');
            });
        }

        if (bgmRef.current) {
            if (!bgmRef.current.playing()) {
                bgmRef.current.play();
            }
            return;
        }

        console.log('[Audio] Initializing Background Music (Boléro)');
        const bgm = new Howl({
            src: ['/sounds/bolero.mp3'],
            loop: true,
            volume: 1.0, // Max volume to rule out quietness
            html5: false, // Force Web Audio API (Buffer mode)
            format: ['mp3'],
            onload: () => console.log('[Audio] Boléro Loaded (Buffer)'),
            onloaderror: (id, err) => console.warn('[Audio] Missing bolero.mp3', err),
            onplayerror: (id, err) => console.warn('[Audio] Play Error (Autoplay Blocked?)', err)
        });

        bgm.play();
        bgmRef.current = bgm;
    };

    const playSfx = (type) => {
        if (isMuted) return;

        // Map types to filenames
        const map = {
            hover: '/sounds/hover.mp3',
            click: '/sounds/click.mp3',
            select: '/sounds/select.mp3',
            flip: '/sounds/flip.mp3',
            type: '/sounds/type.mp3', // Typing feedback
            transition: '/sounds/transition.mp3'
        };

        const src = map[type];
        if (!src) return;

        const sfx = new Howl({
            src: [src],
            volume: 0.4,
            onloaderror: () => console.warn(`[Audio] Missing SFX: ${src}`)
        });
        sfx.play();
    };

    // Auto-unlock on ANY user interaction
    useEffect(() => {
        const unlockAudio = () => {
            if (Howler.ctx && Howler.ctx.state === 'suspended') {
                Howler.ctx.resume().then(() => {
                    console.log('[Audio] Context Resumed by Interaction');
                    playBgm();
                });
            } else if (!bgmRef.current || !bgmRef.current.playing()) {
                playBgm();
            }
        };

        const events = ['click', 'touchstart', 'keydown', 'mousemove'];
        events.forEach(e => document.addEventListener(e, unlockAudio, { once: true }));

        return () => {
            events.forEach(e => document.removeEventListener(e, unlockAudio));
        };
    }, []);

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playBgm, playSfx }}>
            {children}
        </SoundContext.Provider>
    );
};
