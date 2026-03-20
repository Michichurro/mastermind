import React, { useState } from 'react';
import { SoundProvider, useSound } from './context/SoundContext';
import WelcomeScreen from './components/WelcomeScreen';
import BrandNameScreen from './components/BrandNameScreen';
import BrandTypeScreen from './components/BrandTypeScreen';
import Phase1Screen from './components/Phase1Screen';
import Phase2Screen from './components/Phase2Screen';
import Phase3Screen from './components/Phase3Screen';
import Phase4LeadCapture from './components/Phase4LeadCapture';
import ResultsScreen from './components/ResultsScreen';
import LanguageToggle from './components/LanguageToggle';
import SoundToggle from './components/ui/SoundToggle';

function AppContent() {
  const { playBgm, playSfx } = useSound();
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome, brand_name, brand_type, phase1, phase2, phase3, lead_capture, results
  const [brandContext, setBrandContext] = useState({ name: '', type: '' });

  // Store scores per phase
  const [phase1Scores, setPhase1Scores] = useState({});
  const [phase2Scores, setPhase2Scores] = useState({});
  const [phase3Scores, setPhase3Scores] = useState({});

  // Store selection history for final recap
  const [selectionHistory, setSelectionHistory] = useState({
    phase1: null,
    phase2: [],
    phase3: []
  });

  // --- Forward Navigation Handlers ---

  const startDiscovery = () => {
    playSfx('click');
    playBgm(); // Start Boléro loop if not already playing
    setCurrentScreen('brand_type'); // Start with Type Selection
    setPhase1Scores({});
    setPhase2Scores({});
    setPhase3Scores({});
    setSelectionHistory({ phase1: null, phase2: [], phase3: [] });
    setBrandContext({ name: '', type: '' });
  };

  const handleBrandTypeSubmit = (type) => {
    playSfx('click');
    setBrandContext(prev => ({ ...prev, type }));
    setCurrentScreen('brand_name'); // Then Name Input
  };

  const handleBrandNameSubmit = (name) => {
    playSfx('click');
    setBrandContext(prev => ({ ...prev, name }));
    setCurrentScreen('phase1'); // Then Start Quiz
  };

  const handlePhase1Complete = (scores, selectedOption) => {
    playSfx('transition');
    setPhase1Scores(scores);
    setSelectionHistory(prev => ({ ...prev, phase1: selectedOption }));
    setCurrentScreen('phase2');
  };

  const handlePhase2Complete = (scores, history) => {
    playSfx('transition');
    setPhase2Scores(scores);
    setSelectionHistory(prev => ({ ...prev, phase2: history }));
    setCurrentScreen('phase3');
  };

  const handlePhase3Complete = (scores, keywords) => {
    playSfx('transition');
    setPhase3Scores(scores);
    setSelectionHistory(prev => ({ ...prev, phase3: keywords }));
    setCurrentScreen('lead_capture');
  };

  const handleLeadCaptureComplete = (leadData) => {
    playSfx('transition');
    console.log("Lead Data Captured:", leadData, brandContext);
    // playBgm('results'); // Boléro continues playing
    setCurrentScreen('results');
  };

  const restartDiscovery = () => {
    playSfx('click');
    playBgm('welcome');
    setCurrentScreen('welcome');
    setPhase1Scores({});
    setPhase2Scores({});
    setPhase3Scores({});
    setSelectionHistory({ phase1: null, phase2: [], phase3: [] });
    setBrandContext({ name: '', type: '' });
  };

  // --- Backward Navigation Handlers ---

  const handleBackToWelcome = () => {
    playSfx('click');
    setCurrentScreen('welcome');
  };

  const handleBackToBrandType = () => {
    playSfx('click');
    setCurrentScreen('brand_type');
  };

  const handleBackToBrandName = () => {
    playSfx('click');
    setCurrentScreen('brand_name');
  };

  const handleBackToPhase1 = () => {
    playSfx('click');
    setCurrentScreen('phase1');
  };

  const handleBackToPhase2 = () => {
    playSfx('click');
    setCurrentScreen('phase2');
  };

  const handleBackToPhase3 = () => {
    playSfx('click');
    setCurrentScreen('phase3');
  };

  const handleBackToLeadCapture = () => {
    playSfx('click');
    setCurrentScreen('lead_capture');
  }


  // --- Score Calculation ---

  const calculateTotalScores = () => {
    const total = { ...phase1Scores };

    // Merge Phase 2
    Object.entries(phase2Scores).forEach(([key, val]) => {
      total[key] = (total[key] || 0) + val;
    });

    // Merge Phase 3
    Object.entries(phase3Scores).forEach(([key, val]) => {
      total[key] = (total[key] || 0) + val;
    });

    return total;
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <header className="fixed top-6 right-6 z-50 flex items-center gap-4 pointer-events-auto">
        <SoundToggle />
        <LanguageToggle />
      </header>

      <main className="relative z-10">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onStart={startDiscovery} />
        )}

        {currentScreen === 'brand_type' && (
          <BrandTypeScreen
            onNext={handleBrandTypeSubmit}
            onBack={handleBackToWelcome}
          />
        )}

        {currentScreen === 'brand_name' && (
          <BrandNameScreen
            onNext={handleBrandNameSubmit}
            onBack={handleBackToBrandType}
            brandType={brandContext.type}
          />
        )}

        {currentScreen === 'phase1' && (
          <Phase1Screen
            onAnswer={handlePhase1Complete}
            onBack={handleBackToBrandName}
          />
        )}

        {currentScreen === 'phase2' && (
          <Phase2Screen
            onComplete={handlePhase2Complete}
            onBack={handleBackToPhase1}
          />
        )}

        {currentScreen === 'phase3' && (
          <Phase3Screen
            onComplete={handlePhase3Complete}
            onBack={handleBackToPhase2}
          />
        )}

        {currentScreen === 'lead_capture' && (
          <Phase4LeadCapture
            onComplete={handleLeadCaptureComplete}
            onBack={handleBackToPhase3}
          />
        )}

        {currentScreen === 'results' && (
          <ResultsScreen
            scores={calculateTotalScores()}
            history={selectionHistory}
            onRestart={restartDiscovery}
            onBack={handleBackToLeadCapture}
          />
        )}
      </main>
    </div>
  );
}

function BrandSoulApp() {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
}

export default BrandSoulApp;
