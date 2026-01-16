
import React from 'react';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import Timeline from '../components/Timeline';
import AnalyticsBadge from '../components/AnalyticsBadge';
import TourGuide from '../components/TourGuide';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Play } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const restartTour = () => {
    window.dispatchEvent(new CustomEvent('start-tour'));
  };

  return (
    <main className="relative min-h-screen">
      <TourGuide />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 py-6 px-10 flex justify-between items-center backdrop-blur-sm bg-slate-950/20">
        <div className="font-display font-extrabold text-2xl tracking-tighter cursor-default">
          JAY.<span className="text-fuchsia-500">S</span>
        </div>
        <div className="hidden md:flex gap-10 items-center">
          {['Portfolio', 'Experience', 'Connect'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">{item}</a>
          ))}
          <a
            id="terminal-link"
            href="#/admin-dashboard"
            className="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
          >
            Terminal
          </a>
        </div>
      </nav>

      <Hero />
      <div id="portfolio-section"><BentoGrid /></div>
      <div id="experience-section"><Timeline /></div>

      {/* Footer */}
      <footer id="connect-section" className="py-20 border-t border-white/5 bg-slate-950 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="font-display font-extrabold text-3xl tracking-tighter mb-4">
              JAY.<span className="text-fuchsia-500">S</span>
            </div>
            <p className="text-slate-500 max-w-sm">Cybersecurity Analyst and Web Developer based in Udaipur, Rajasthan. Securing the modern web.</p>
            
            <button 
              onClick={restartTour}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold text-slate-400 hover:text-white"
            >
              <Play className="w-3 h-3 fill-current" />
              Replay Guide Tour
            </button>
          </div>
          <div className="flex gap-8">
            <a href="https://github.com/Jaysinghvi-04" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">GitHub</a>
            <a href="https://linkedin.com/in/jay-singhvi-9498a1339" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">LinkedIn</a>
            <a href="mailto:jaysinghvi54@gmail.com" className="text-slate-400 hover:text-white">Email</a>
          </div>
          <p className="text-slate-700 text-sm">© 2025 Jay Singhvi. Built with Precision.</p>
        </div>
      </footer>

      <AnalyticsBadge />
    </main>
  );
};

export default Portfolio;
