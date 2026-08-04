'use client';

import React, { useState } from 'react';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Sparkles, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const StarConstellationChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [clickedStars, setClickedStars] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const stars = [
    { id: 1, x: 25, y: 30 },
    { id: 2, x: 70, y: 25 },
    { id: 3, x: 50, y: 55 },
    { id: 4, x: 20, y: 80 },
    { id: 5, x: 80, y: 75 },
  ];

  const handleStarClick = (id: number) => {
    if (!clickedStars.includes(id)) {
      const updated = [...clickedStars, id];
      setClickedStars(updated);
      soundFx.playClick();

      if (updated.length === 5) {
        setIsSuccess(true);
        soundFx.playUnlock();
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-purple-400 font-mono text-xs mb-2">
          <Sparkles className="w-4 h-4" />
          <span>RETO #11 // TRAZADO DE CONSTELACIÓN</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">{memory.title}</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          {memory.narrativeText}
        </p>

        <div className="mt-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 font-mono">
          <strong className="block text-purple-300 font-semibold mb-0.5">
            Metáfora: {memory.metaphorTitle}
          </strong>
          {memory.metaphorDesc}
        </div>
      </GlassCard>

      <GlassCard className="p-6 space-y-6">
        {/* Firmamento Estelar */}
        <div className="relative w-full h-64 sm:h-72 bg-slate-950 rounded-2xl border border-white/10 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {clickedStars.map((starId, idx) => {
              if (idx === 0) return null;
              const prev = stars.find((s) => s.id === clickedStars[idx - 1]);
              const curr = stars.find((s) => s.id === starId);
              if (!prev || !curr) return null;
              return (
                <line
                  key={idx}
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${curr.x}%`}
                  y2={`${curr.y}%`}
                  stroke="#a855f7"
                  strokeWidth="2.5"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {stars.map((s) => {
            const isClicked = clickedStars.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => handleStarClick(s.id)}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-full transition-all ${
                  isClicked
                    ? 'bg-purple-500 text-white border-2 border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.8)]'
                    : 'bg-slate-900/80 text-purple-300 border border-purple-500/30 hover:scale-125'
                }`}
              >
                <Star className="w-5 h-5 fill-current" />
              </button>
            );
          })}
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¡Constelación unida! El firmamento brilla con plenitud.</span>
          </motion.div>
        ) : (
          <p className="text-center font-mono text-xs text-slate-400">
            Haz clic en las 5 estrellas iluminadas para conectar la constelación ({clickedStars.length}/5).
          </p>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
