'use client';

import React, { useState } from 'react';
import { useMemory } from '@/context/MemoryContext';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Database, Search, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const SqlQueryChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const { activeHintLevel } = useMemory();
  const [persona, setPersona] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const targetPersona = 'Leris';

  const handleQuery = () => {
    if (persona.trim().toLowerCase() === targetPersona.toLowerCase()) {
      setIsSuccess(true);
      setErrorMsg(null);
      soundFx.playUnlock();
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setErrorMsg(`Persona no encontrada en la consulta. Usa el sistema de ayuda (💡) para obtener pistas.`);
      soundFx.playError();
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-xs mb-2">
          <Database className="w-4 h-4" />
          <span>RETO #08 // CONSULTA SQL DE RECUERDOS</span>
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
        {/* Editor de SQL Query */}
        <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs space-y-3">
          <div className="text-cyan-400 font-semibold">SELECT * FROM recuerdos</div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span>WHERE persona = &apos;</span>
            <input
              type="text"
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              placeholder="..."
              className="bg-slate-900 border border-cyan-500/40 rounded px-2.5 py-1 text-amber-300 font-bold focus:outline-none w-32"
            />
            <span>&apos;</span>
          </div>
          <div className="text-slate-400">ORDER BY fecha ASC;</div>
        </div>

        {activeHintLevel >= 3 && (
          <button
            onClick={() => {
              setPersona('Leris');
              soundFx.playClick();
            }}
            className="text-xs text-amber-400 hover:text-amber-300 underline font-mono"
          >
            💡 Auto-completar nombre: Leris
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
            <span>[12 registros encontrados] Consulta ejecutada con éxito.</span>
          </motion.div>
        ) : (
          <button
            onClick={handleQuery}
            disabled={!persona}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
              persona
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Ejecutar Consulta SQL</span>
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
