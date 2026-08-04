'use client';

import React, { useState } from 'react';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Activity, Eye, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const EyeContactChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [freq, setFreq] = useState<number>(10);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const targetFreq = 17; // Viernes 17 de Mayo
  const isAligned = freq === targetFreq;

  const handleFreqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFreq(Number(e.target.value));
    soundFx.playClick();
  };

  const handleSynchronize = () => {
    if (isAligned) {
      setIsSuccess(true);
      soundFx.playUnlock();
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-xs mb-2">
          <Activity className="w-4 h-4" />
          <span>RETO #03 // SINCRONIZACIÓN DE ONDAS</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">{memory.title}</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          {memory.narrativeText}
        </p>

        <div className="mt-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 font-mono">
          <strong className="block text-cyan-300 font-semibold mb-0.5">
            Metáfora: {memory.metaphorTitle}
          </strong>
          {memory.metaphorDesc}
        </div>
      </GlassCard>

      <GlassCard className="p-6 space-y-6">
        {/* Visualizador de Ondas SVG */}
        <div className="h-40 bg-slate-950 rounded-2xl border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 z-10">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Eye className="w-4 h-4" /> Frecuencia de Mirada
            </span>
            <span className="text-amber-400 font-semibold">{freq} Hz</span>
          </div>

          <svg className="w-full h-24 stroke-cyan-400 fill-none" viewBox="0 0 500 100">
            <path
              d={`M 0 50 Q 50 ${50 - freq * 2}, 100 50 T 200 50 T 300 50 T 400 50 T 500 50`}
              strokeWidth="2"
              className="transition-all duration-200"
            />
            {isAligned && (
              <path
                d={`M 0 50 Q 50 ${50 - freq * 2}, 100 50 T 200 50 T 300 50 T 400 50 T 500 50`}
                stroke="#f59e0b"
                strokeWidth="3"
                className="animate-pulse"
              />
            )}
          </svg>

          {isAligned && (
            <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px] flex items-center justify-center">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse">
                ✨ Resonancia Exacta Alcanzada (17 Hz)
              </span>
            </div>
          )}
        </div>

        {/* Dial de Frecuencia */}
        <div className="space-y-2 max-w-md mx-auto">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>Ajustar Frecuencia del Viernes:</span>
            <span className="text-cyan-400 font-semibold">{freq} Hz</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={freq}
            onChange={handleFreqChange}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¡Miradas sincronizadas! Memoria unlocked.</span>
          </motion.div>
        ) : (
          <button
            onClick={handleSynchronize}
            disabled={!isAligned}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
              isAligned
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] animate-pulse'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Sincronizar Mirada</span>
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
