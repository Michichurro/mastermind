import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Card from './ui/Card';

const Phase4LeadCapture = ({ onComplete, onBack }) => {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate DB delay
        setTimeout(() => {
            setLoading(false);
            // Pass lead data to parent (to be handled or ignored based on architecture)
            onComplete({ name, email });
        }, 1000);
    };

    const handleSkip = () => {
        onComplete(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in relative overflow-hidden">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-6 left-6 z-50 p-2 rounded-full hover:bg-white/10 transition-colors group"
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
                    className="text-white/50 group-hover:text-white transition-colors"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* Background Atmosphere - Removed Purple Gradients, kept clean or Brand Blue */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                {/* Optional: Subtle Brand Blue Glow if needed, otherwise clean */}
            </div>

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-gabarito font-bold mb-4 text-white">
                        {t.leadCapture.title}
                    </h2>
                    <p className="text-lg text-white/80">
                        {t.leadCapture.subtitle}
                    </p>
                </div>

                <div className="p-8 backdrop-blur-sm bg-black/20 border border-white/10 rounded-[2rem]">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <input
                                type="text"
                                placeholder={t.leadCapture.namePlaceholder}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-white/20 px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#ff0000] transition-colors font-gabarito text-lg"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder={t.leadCapture.emailPlaceholder}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-white/20 px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#ff0000] transition-colors font-gabarito text-lg"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full py-4 rounded-full font-bold text-lg tracking-widest uppercase transition-all duration-300 mt-4
                                bg-[#ff0000] text-white hover:scale-[1.02] shadow-[0_0_20px_rgba(255,0,0,0.3)]
                                ${loading ? 'opacity-70 cursor-wait' : ''}
                            `}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                t.leadCapture.ctaButton
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-white/40 mb-4">{t.leadCapture.disclaimer}</p>
                        <button
                            onClick={handleSkip}
                            className="text-sm text-white/50 hover:text-white underline decoration-white/30 hover:decoration-white transition-all"
                        >
                            {t.leadCapture.skipButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Phase4LeadCapture;
