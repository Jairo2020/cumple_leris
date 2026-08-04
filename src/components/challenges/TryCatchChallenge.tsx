'use client';

import React, { useState } from 'react';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const TryCatchChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [catchHandler, setCatchHandler] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const options = [
    'aprender_y_seguir()',
    'rendirse()',
    'quedarse_estancado()',
    'ignorar_todo()',
  ];

  const handleSelect = (opt: string) => {
    setCatchHandler(opt);
    setErrorMsg(null);
    soundFx.playClick();
  };

  const handleResolve = () => {
    if (catchHandler === 'aprender_y_seguir()') {
      setIsSuccess(true);
      soundFx.playUnlock();
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setErrorMsg('Esa respuesta al error no permite avanzar. Elige aprender y seguir.');
      soundFx.playError();
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-amber-400 font-mono text-xs mb-2">
          <ShieldAlert className="w-4 h-4" />
          <span>RETO #09 // MANEJO DE EXCEPCIONES</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">{memory.title}</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          {memory.narrativeText}
        </p>

        <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 font-mono">
          <strong className="block text-amber-300 font-semibold mb-0.5">
            Metáfora: {memory.metaphorTitle}
          </strong>
          {memory.metaphorDesc}
        </div>
      </GlassCard>

      <GlassCard className="p-6 space-y-6">
        {/* Editor Try/Catch */}
        <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs space-y-2">
          <div className="text-emerald-400">try &#123;</div>
          <div className="pl-4 text-slate-300">vivir_nuevas_experiencias();</div>
          <div className="text-amber-400">&#125; catch (errorInesperado) &#123;</div>
          <div className="pl-4 text-amber-300 font-bold">
            {catchHandler ? catchHandler : '// Selecciona la acción de resiliencia'}
          </div>
          <div className="text-amber-400">&#125;</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              className={`p-3 rounded-xl font-mono text-xs text-left border transition-all ${
                catchHandler === opt
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:border-amber-500/30 hover:text-slate-200'
              }`}
            >
              <code>{opt}</code>
            </button>
          ))}
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
            <span>¡Excepción manejada con sabiduría! Siempre aprender y seguir.</span>
          </motion.div>
        ) : (
          <button
            onClick={handleResolve}
            disabled={!catchHandler}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
              catchHandler
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <span>Reparar Circuito Try/Catch</span>
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
