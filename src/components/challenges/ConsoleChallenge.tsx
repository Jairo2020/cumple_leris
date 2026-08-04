'use client';

import React, { useState } from 'react';
import { useMemory } from '@/context/MemoryContext';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Terminal, CheckCircle2, Play, Sparkles, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const ConsoleChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const { activeHintLevel } = useMemory();
  const [cmd, setCmd] = useState<string>('');
  const [history, setHistory] = useState<Array<{ text: string; type: 'user' | 'system' | 'secret' }>>([
    { text: '// Consola de inspección. Prueba curiosear escribiendo comandos como "ayuda" o "secreto"...', type: 'system' },
  ]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleExecute = (overrideCmd?: string) => {
    const inputToUse = overrideCmd !== undefined ? overrideCmd : cmd;
    const cleanCmd = inputToUse.trim().toLowerCase();
    if (!cleanCmd) return;

    soundFx.playClick();
    const newHistory = [...history, { text: `> ${inputToUse}`, type: 'user' as const }];

    if (
      cleanCmd === 'secreto' ||
      cleanCmd === 'sonrisa' ||
      cleanCmd === 'espontanea' ||
      cleanCmd === 'alegria' ||
      cleanCmd === 'desbloquear' ||
      cleanCmd.includes('secreto') ||
      cleanCmd.includes('sonrisa')
    ) {
      newHistory.push({
        text: '✨ [SECRETO REVELADO] Eres una persona alegre, espontánea y con una sonrisa única que irradia luz en cualquier lugar donde estés. 🌟',
        type: 'secret',
      });
      setHistory(newHistory);
      setIsSuccess(true);
      soundFx.playUnlock();
      setTimeout(() => {
        onSuccess();
      }, 2500);
    } else if (cleanCmd === 'ayuda' || cleanCmd === 'help') {
      newHistory.push({
        text: '[SISTEMA] Comandos para curiosear: "buscar", "curiosear", "secreto", "sonrisa".',
        type: 'system',
      });
      setHistory(newHistory);
    } else if (cleanCmd === 'buscar' || cleanCmd === 'curiosear') {
      newHistory.push({
        text: '[INSPECCIÓN] Curioseando en los sectores del corazón... Pista encontrada: la palabra clave es "secreto".',
        type: 'system',
      });
      setHistory(newHistory);
    } else {
      newHistory.push({
        text: `[SISTEMA] Comando '${inputToUse}' no reconocido. Prueba escribir 'ayuda' o 'secreto'.`,
        type: 'system',
      });
      setHistory(newHistory);
      soundFx.playError();
    }

    setCmd('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute();
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-xs mb-2">
          <Terminal className="w-4 h-4" />
          <span>RETO #10 // CURIOSEANDO EN LA CONSOLA</span>
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
        {/* Terminal interactiva de inspección */}
        <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs space-y-3 min-h-[200px] max-h-[300px] overflow-y-auto custom-scrollbar flex flex-col justify-between">
          <div className="space-y-2">
            {history.map((h, idx) => (
              <div
                key={idx}
                className={
                  h.type === 'user'
                    ? 'text-cyan-400 font-semibold'
                    : h.type === 'secret'
                    ? 'text-amber-300 font-bold p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse'
                    : 'text-slate-400'
                }
              >
                {h.text}
              </div>
            ))}
          </div>

          {!isSuccess && (
            <div className="flex items-center space-x-2 text-cyan-400 pt-2 border-t border-white/5">
              <span>&gt;</span>
              <input
                type="text"
                value={cmd}
                onChange={(e) => setCmd(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe 'secreto' o 'ayuda'..."
                className="w-full bg-transparent border-none text-cyan-200 font-mono text-xs focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Botones rápidos de curiosear */}
        {!isSuccess && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
              <Search className="w-3.5 h-3.5" /> Curiosear:
            </span>
            <button
              onClick={() => handleExecute('ayuda')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all"
            >
              ayuda
            </button>
            <button
              onClick={() => handleExecute('curiosear')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all"
            >
              curiosear
            </button>
            {activeHintLevel >= 3 && (
              <button
                onClick={() => handleExecute('secreto')}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono transition-all underline"
              >
                💡 revelar secreto
              </button>
            )}
          </div>
        )}

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¡Mensaje secreto desbloqueado! Tu sonrisa irradia el lugar donde estés.</span>
          </motion.div>
        ) : (
          <button
            onClick={() => handleExecute()}
            disabled={!cmd.trim()}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
              cmd.trim()
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Ejecutar Comando</span>
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
