'use client';

import React, { useState } from 'react';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Lock, Unlock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const SafeBoxChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [digit1, setDigit1] = useState<number>(0);
  const [digit2, setDigit2] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fecha clave: 1 y 7 (Día 17)
  const isUnlocked = digit1 === 1 && digit2 === 7;

  const cycleDigit1 = () => {
    setDigit1((prev) => (prev + 1) % 10);
    setErrorMsg(null);
    soundFx.playClick();
  };

  const cycleDigit2 = () => {
    setDigit2((prev) => (prev + 1) % 10);
    setErrorMsg(null);
    soundFx.playClick();
  };

  const handleOpenSafe = () => {
    if (isUnlocked) {
      setIsSuccess(true);
      soundFx.playUnlock();
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setErrorMsg('Combinación errónea. Recuerda el día clave del Congreso.');
      soundFx.playError();
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-purple-400 font-mono text-xs mb-2">
          <Lock className="w-4 h-4" />
          <span>RETO #07 // CAJA FUERTE DIGITAL</span>
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
        {/* Dial interactivo de la Caja Fuerte */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 max-w-sm mx-auto flex flex-col items-center space-y-6">
          <div className="p-4 rounded-full bg-slate-900 border border-white/10 text-purple-400 shadow-xl">
            {isSuccess ? (
              <Unlock className="w-8 h-8 text-emerald-400" />
            ) : (
              <Lock className="w-8 h-8 text-purple-400" />
            )}
          </div>

          <div className="flex items-center space-x-4 font-mono text-3xl font-bold">
            <button
              onClick={cycleDigit1}
              className="w-16 h-20 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 hover:border-purple-400 hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg"
            >
              {digit1}
            </button>

            <span className="text-slate-600 font-sans text-xl">-</span>

            <button
              onClick={cycleDigit2}
              className="w-16 h-20 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 hover:border-purple-400 hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg"
            >
              {digit2}
            </button>
          </div>

          <p className="text-[11px] text-slate-400 font-mono text-center">
            Haz clic en los dígitos para girar los diales y encontrar la combinación de memoria.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
            ⚠️ {errorMsg}
          </div>
        )}

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¡Caja Fuerte abierta! La esencia de Turbaco restaurada.</span>
          </motion.div>
        ) : (
          <button
            onClick={handleOpenSafe}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verificar Combinación</span>
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
