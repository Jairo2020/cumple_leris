'use client';

import React, { useState } from 'react';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Repeat, Smile, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const LoopChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [sonrisas, setSonrisas] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const targetSonrisas = 100;

  const handleHoldConversation = () => {
    if (sonrisas < targetSonrisas) {
      const next = Math.min(targetSonrisas, sonrisas + 10);
      setSonrisas(next);
      soundFx.playClick();

      if (next >= targetSonrisas && !isSuccess) {
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
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-xs mb-2">
          <Repeat className="w-4 h-4" />
          <span>RETO #{memory.id < 10 ? `0${memory.id}` : memory.id} // BUCLE INFINITO DE COMODIDAD</span>
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
        {/* Monitor del Bucle while */}
        <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs space-y-3">
          <div className="text-slate-400">
            <code>while (conversacionActiva &amp;&amp; comodidadTotal) &#123;</code>
          </div>
          <div className="pl-4 text-cyan-300">
            <code>sonrisas++; // Contador actual: {sonrisas}</code>
          </div>
          <div className="text-slate-400">
            <code>&#125;</code>
          </div>
        </div>

        {/* Barra de Comodidad acumulada */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1 text-amber-400">
              <Smile className="w-4 h-4" /> Comodidad en la Conversación:
            </span>
            <span className="text-cyan-400 font-semibold">{sonrisas}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full border border-white/10 overflow-hidden p-0.5">
            <motion.div
              animate={{ width: `${sonrisas}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-400 rounded-full"
            />
          </div>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¡Bucle resuelto! &quot;Conversaciones que uno desearía repetir&quot;.</span>
          </motion.div>
        ) : (
          <button
            onClick={handleHoldConversation}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Avanzar Conversación (sonrisas++)</span>
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
