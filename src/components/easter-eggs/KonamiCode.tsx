'use client';

import React, { useEffect, useState } from 'react';
import { useMemory } from '@/context/MemoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const KonamiCode: React.FC = () => {
  const { triggerKonamiMode, konamiActivated } = useMemory();
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const nextSequence = [...inputSequence, key].slice(-KONAMI_SEQUENCE.length);
      setInputSequence(nextSequence);

      if (nextSequence.join(',').toLowerCase() === KONAMI_SEQUENCE.join(',').toLowerCase()) {
        triggerKonamiMode();
        try {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.4 },
          });
        } catch {
          // Ignorar
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, triggerKonamiMode]);

  if (!konamiActivated) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 p-4 rounded-2xl bg-amber-500/20 border border-amber-400/50 backdrop-blur-xl text-amber-200 shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center space-x-3 text-xs font-mono"
      >
        <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
        <div>
          <strong className="block text-amber-300">¡MODO SECRETO KONAMI ACTIVADO! 🎮</strong>
          <span>Has desbloqueado el protocolo especial de recuerdos infinitos.</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
