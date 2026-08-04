'use client';

import React, { useState } from 'react';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { ShieldCheck, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const MasterVaultChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [switches, setSwitches] = useState({
    afecto: false,
    respeto: false,
    sinceridad: false,
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const isAllOn = switches.afecto && switches.respeto && switches.sinceridad;

  const toggleSwitch = (key: keyof typeof switches) => {
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
    soundFx.playClick();
  };

  const handleUnlockMaster = () => {
    if (isAllOn) {
      setIsSuccess(true);
      soundFx.playCelebration();
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-amber-400 font-mono text-xs mb-2">
          <KeyRound className="w-4 h-4" />
          <span>RETO #12 // CIFRADO MAESTRO DEL CORAZÓN</span>
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
        {/* Panel de Interruptores */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono text-slate-400">
            Activa los 3 interruptores cuánticos de acceso:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { key: 'afecto', label: '1. Afecto Genuino' },
              { key: 'respeto', label: '2. Respeto Mutuo' },
              { key: 'sinceridad', label: '3. Sinceridad' },
            ].map((sw) => {
              const active = switches[sw.key as keyof typeof switches];
              return (
                <button
                  key={sw.key}
                  onClick={() => toggleSwitch(sw.key as keyof typeof switches)}
                  className={`p-4 rounded-xl font-mono text-xs font-semibold border transition-all flex items-center justify-between ${
                    active
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : 'bg-slate-900 border-white/10 text-slate-500 hover:border-amber-500/30'
                  }`}
                >
                  <span>{sw.label}</span>
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      active ? 'bg-amber-400 border-amber-200' : 'bg-slate-800 border-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¡Cifrado Maestro Desbloqueado! Abriendo el regalo final...</span>
          </motion.div>
        ) : (
          <button
            onClick={handleUnlockMaster}
            disabled={!isAllOn}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
              isAllOn
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-pulse'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Desencriptar Archivo Maestro</span>
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
