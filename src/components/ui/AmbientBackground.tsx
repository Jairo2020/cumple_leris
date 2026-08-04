'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AmbientBackgroundProps {
  sunsetMode?: boolean;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ sunsetMode = false }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080a11] transition-colors duration-1000">
      {/* Luz principal 1 (Esq. Sup. Izq) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: sunsetMode ? [0.4, 0.6, 0.4] : [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] ${
          sunsetMode ? 'bg-gradient-to-r from-orange-500/40 to-amber-500/30' : 'bg-cyan-500/20'
        }`}
      />

      {/* Luz principal 2 (Esq. Inf. Der) */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: sunsetMode ? [0.5, 0.7, 0.5] : [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -bottom-40 -right-40 w-[30rem] h-[30rem] rounded-full blur-[140px] ${
          sunsetMode ? 'bg-gradient-to-r from-purple-600/40 to-pink-500/30' : 'bg-purple-600/20'
        }`}
      />

      {/* Luz central tenue */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full blur-[180px] transition-all duration-1000 ${
          sunsetMode
            ? 'bg-radial from-rose-500/15 via-orange-500/10 to-transparent'
            : 'bg-radial from-cyan-500/10 via-purple-500/5 to-transparent'
        }`}
      />
    </div>
  );
};
