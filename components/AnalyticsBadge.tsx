
import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const AnalyticsBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-fuchsia-500/30 rounded-full shadow-[0_0_20px_rgba(217,70,239,0.15)]"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
      </span>
      <span className="text-xs font-medium text-fuchsia-300 tracking-wider uppercase">System Logging Active</span>
      <Activity className="w-3 h-3 text-fuchsia-400 ml-1" />
    </motion.div>
  );
};

export default AnalyticsBadge;
