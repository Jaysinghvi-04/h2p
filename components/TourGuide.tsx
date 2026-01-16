
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, MousePointer2 } from 'lucide-react';

interface Step {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const steps: Step[] = [
  {
    target: '#hero-section',
    title: 'Welcome to Jay\'s Universe',
    content: 'Start your journey here. Jay is a Cybersecurity Analyst and Web Developer bridging the gap between security and aesthetics.',
    position: 'center'
  },
  {
    target: '#terminal-link',
    title: 'The Intelligence Terminal',
    content: 'Curious about real-time traffic? This hidden gateway leads to the Admin Dashboard where live visitor analytics are processed.',
    position: 'bottom'
  },
  {
    target: '#portfolio-section',
    title: 'Selected Works',
    content: 'Explore a curated collection of cybersecurity tools and full-stack applications Jay has built.',
    position: 'top'
  },
  {
    target: '#experience-section',
    title: 'Professional Journey',
    content: 'Trace Jay\'s certifications, education, and leadership roles through this interactive timeline.',
    position: 'top'
  },
  {
    target: '#connect-section',
    title: 'Let\'s Connect',
    content: 'Ready to collaborate? Reach out via LinkedIn, GitHub, or secure email here.',
    position: 'top'
  }
];

const TourGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const updateCoords = useCallback(() => {
    if (currentStep < 0 || currentStep >= steps.length) return;
    
    const element = document.querySelector(steps[currentStep].target);
    if (element) {
      const rect = element.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      });
      
      // Smooth scroll to target
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep]);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('lumina_tour_complete');
    if (!hasSeenTour) {
      setTimeout(() => setCurrentStep(0), 2000);
    }

    const startTourListener = () => {
      setCurrentStep(0);
    };

    window.addEventListener('start-tour', startTourListener);
    return () => window.removeEventListener('start-tour', startTourListener);
  }, []);

  useEffect(() => {
    updateCoords();
    window.addEventListener('resize', updateCoords);
    window.addEventListener('scroll', updateCoords);
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords);
    };
  }, [updateCoords]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setCurrentStep(-1);
    localStorage.setItem('lumina_tour_complete', 'true');
  };

  if (currentStep === -1) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dim Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] pointer-events-auto"
        onClick={handleComplete}
      />

      {/* Spotlight Effect */}
      <div 
        className="absolute transition-all duration-500 ease-in-out border-2 border-fuchsia-500/50 rounded-2xl shadow-[0_0_50px_rgba(217,70,239,0.3)] bg-white/5"
        style={{
          top: coords.top - 8,
          left: coords.left - 8,
          width: coords.width + 16,
          height: coords.height + 16,
          zIndex: 101
        }}
      />

      {/* Tooltip Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="absolute z-[102] pointer-events-auto w-[320px] bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
          style={{
            top: steps[currentStep].position === 'bottom' ? coords.top + coords.height + 30 : 
                 steps[currentStep].position === 'center' ? window.innerHeight / 2 - 100 :
                 coords.top - 220,
            left: Math.max(20, Math.min(window.innerWidth - 340, coords.left + coords.width / 2 - 160)),
          }}
        >
          {/* Decorative Gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500" />
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-fuchsia-400">
              <MousePointer2 className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Guide step {currentStep + 1}/{steps.length}</span>
            </div>
            <button onClick={handleComplete} className="p-1 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="font-display text-xl font-bold mb-2 text-white">{steps[currentStep].title}</h4>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            {steps[currentStep].content}
          </p>

          <div className="flex justify-between items-center">
            <button 
              onClick={handleComplete}
              className="text-xs font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest"
            >
              Skip Tour
            </button>
            <div className="flex gap-2">
              <button 
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`p-2 rounded-xl border border-white/10 ${currentStep === 0 ? 'opacity-30' : 'hover:bg-white/5'}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl font-bold text-xs transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TourGuide;
