
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="hero-section" className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/20 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-5xl"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/5 border border-white/10 rounded-full text-white/60">
          Cybersecurity Analyst | Web Developer
        </span>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.9] mb-8">
          JAY <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">SINGHVI</span>.
        </h1>
        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Red Hat Certified System Administrator (RHCSA) specializing in Network Security, System Hardening, and Penetration Testing. Automating vulnerability assessments and orchestrating secure Linux environments.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <button className="px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-200 transition-colors">
            View My Work
          </button>
          <a href="mailto:jaysinghvi54@gmail.com" className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm">
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-fuchsia-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
