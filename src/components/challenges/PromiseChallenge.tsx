'use client';

import React, { useState } from 'react';
import { useMemory } from '@/context/MemoryContext';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Code2, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const PromiseChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const options = [
    'Promesa.rechazar("Destino incierto")',
    'Promesa.resolver("Cartagena de Indias")',
    'nueva Promesa(() => { /* pendiente */ })',
    'lanzarError("Sin conexión")',
  ];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setErrorMsg(null);
    soundFx.playClick();
  };

  const handleVerify = () => {
    if (selectedOption === 'Promesa.resolver("Cartagena de Indias")') {
      setIsSuccess(true);
      soundFx.playUnlock();
      setTimeout(() => {
        onSuccess();
      }, 1200);
    } else {
      setErrorMsg('Esa promesa no desbloquea la memoria de Cartagena. Inténtalo de nuevo.');
      soundFx.playError();
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado del Reto */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-xs mb-2">
          <Code2 className="w-4 h-4" />
          <span>RETO #01 // RESOLUCIÓN DE PROMESAS</span>
        </div>
        <h2 className="text-xl font-bold text-slate-100">{memory.title}</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          {memory.narrativeText}
        </p>

        {/* Explicación de la metáfora */}
        <div className="mt-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 font-mono">
          <strong className="block text-cyan-300 font-semibold mb-0.5">
            Metáfora: {memory.metaphorTitle}
          </strong>
          {memory.metaphorDesc}
        </div>
      </GlassCard>

      {/* Árbol interactivo del Reto */}
      <GlassCard className="p-6 space-y-6">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span>Selecciona el bloque de Promesa para iniciar el viaje:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                className={`p-4 rounded-xl font-mono text-xs text-left transition-all border ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                <code>{opt}</code>
              </button>
            );
          })}
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
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>¡Promesa resuelta con éxito! Restaurando fragmento...</span>
          </motion.div>
        ) : (
          <button
            onClick={handleVerify}
            disabled={!selectedOption}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
              selectedOption
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <span>Ejecutar Promesa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
