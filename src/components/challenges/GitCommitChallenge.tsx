'use client';

import React, { useState } from 'react';
import { useMemory } from '@/context/MemoryContext';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { GitCommit, Terminal, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const GitCommitChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const { activeHintLevel } = useMemory();
  const [commitMsg, setCommitMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const targetMsg = 'feat: donde todo empezo';
  const validMessages = [
    'feat: donde todo empezo',
    'feat: donde todo empezó',
    'feat: el comienzo',
    'feat: presentacion oficial',
  ];

  const handleCommit = () => {
    const clean = commitMsg.trim().toLowerCase();
    if (validMessages.some((m) => m.toLowerCase() === clean)) {
      setIsSuccess(true);
      setErrorMsg(null);
      soundFx.playUnlock();
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setErrorMsg(`Mensaje de commit incorrecto. Consulta el sistema de ayuda (💡) para obtener pistas.`);
      soundFx.playError();
    }
  };

  const handleAutoFill = () => {
    setCommitMsg(targetMsg);
    soundFx.playClick();
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-purple-400 font-mono text-xs mb-2">
          <GitCommit className="w-4 h-4" />
          <span>RETO #04 // PROTOCOLO GIT COMMIT</span>
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
        {/* Simulador de Terminal Git */}
        <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-slate-500 border-b border-white/5 pb-2">
            <span className="flex items-center gap-1.5 text-purple-400">
              <Terminal className="w-4 h-4" /> terminal git
            </span>
            <span>rama: principal</span>
          </div>

          <div className="text-slate-400 space-y-1">
            <p>$ git add recuerdos/viernes_noche.ts</p>
            <p className="text-emerald-400">
              [preparado] Cambios listos para guardar en la memoria
            </p>
          </div>

          <div className="pt-2">
            <label className="block text-slate-400 mb-1">
              $ git commit -m &quot;...&quot;
            </label>
            <input
              type="text"
              value={commitMsg}
              onChange={(e) => setCommitMsg(e.target.value)}
              placeholder="Ingresa el mensaje de commit..."
              className="w-full bg-slate-900 border border-purple-500/30 rounded-lg p-2.5 text-purple-200 font-mono text-xs focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* Solo mostrar botón de auto-completar si el usuario activó la Pista Nivel 3 */}
        {activeHintLevel >= 3 && (
          <button
            onClick={handleAutoFill}
            className="text-xs text-amber-400 hover:text-amber-300 underline font-mono"
          >
            💡 Auto-completar respuesta: feat: donde todo empezo
          </button>
        )}

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
            <span>[principal 1705a1b] Commit guardado. El comienzo registrado.</span>
          </motion.div>
        ) : (
          <button
            onClick={handleCommit}
            disabled={!commitMsg}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
              commitMsg
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <GitCommit className="w-4 h-4" />
            <span>Ejecutar Git Commit</span>
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
