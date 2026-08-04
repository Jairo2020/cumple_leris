'use client';

import React from 'react';
import { useMemory } from '@/context/MemoryContext';
import { Lightbulb, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HintDrawerProps {
  hints: [string, string, string];
}

export const HintDrawer: React.FC<HintDrawerProps> = ({ hints }) => {
  const { activeHintLevel, setHintLevel } = useMemory();

  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-amber-400 font-medium text-xs">
          <Lightbulb className="w-4 h-4 animate-bounce" />
          <span>Sistema de Ayuda Integrado</span>
        </div>

        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((level) => {
            const isUnlocked = activeHintLevel >= level;
            return (
              <button
                key={level}
                onClick={() => setHintLevel(level)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all border ${
                  isUnlocked
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 border-white/10 hover:border-amber-500/30 hover:text-slate-200'
                }`}
              >
                💡 Pista {level}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeHintLevel > 0 && (
          <motion.div
            key={activeHintLevel}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-sm leading-relaxed"
          >
            <div className="flex items-start space-x-3">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 uppercase font-semibold shrink-0 mt-0.5">
                Nivel {activeHintLevel}
              </span>
              <p>{hints[activeHintLevel - 1]}</p>
            </div>
            {activeHintLevel < 3 && (
              <button
                onClick={() => setHintLevel(activeHintLevel + 1)}
                className="mt-3 flex items-center space-x-1 text-xs text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
              >
                <span>¿Aún necesitas más detalles? Ver Pista {activeHintLevel + 1}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
