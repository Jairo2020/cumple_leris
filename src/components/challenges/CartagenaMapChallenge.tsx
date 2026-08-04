'use client';

import React, { useState } from 'react';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Compass, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const CartagenaMapChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [visited, setVisited] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const waypoints = [
    { id: 1, name: 'Torre del Reloj', x: 20, y: 70 },
    { id: 2, name: 'Plaza de San Pedro', x: 45, y: 55 },
    { id: 3, name: 'Calles Coloniales', x: 75, y: 35 },
    { id: 4, name: 'Las Murallas de Noche', x: 85, y: 75 },
  ];

  const handlePointClick = (id: number) => {
    const expected = visited.length + 1;
    if (id === expected) {
      const updated = [...visited, id];
      setVisited(updated);
      soundFx.playClick();

      if (updated.length === 4) {
        setIsSuccess(true);
        soundFx.playUnlock();
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } else {
      soundFx.playError();
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-amber-400 font-mono text-xs mb-2">
          <Compass className="w-4 h-4" />
          <span>RETO #{memory.id < 10 ? `0${memory.id}` : memory.id} // RUTA POR LA CIUDAD AMURALLADA</span>
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
        {/* Mapa interactivo de Cartagena */}
        <div className="relative w-full h-72 sm:h-80 bg-slate-950 rounded-2xl border border-white/10 overflow-hidden p-4">
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

          {/* SVG para trazar líneas de la ruta caminada */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {visited.map((pointId, idx) => {
              if (idx === 0) return null;
              const prev = waypoints.find((w) => w.id === visited[idx - 1]);
              const curr = waypoints.find((w) => w.id === pointId);
              if (!prev || !curr) return null;
              return (
                <line
                  key={idx}
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${curr.x}%`}
                  y2={`${curr.y}%`}
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {/* Puntos interactivos del mapa */}
          {waypoints.map((wp) => {
            const isVisited = visited.includes(wp.id);
            const isNext = visited.length + 1 === wp.id;

            return (
              <button
                key={wp.id}
                onClick={() => handlePointClick(wp.id)}
                style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full border text-xs font-mono transition-all flex items-center justify-center ${
                  isVisited
                    ? 'bg-amber-500 border-amber-300 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.6)] font-bold'
                    : isNext
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-bounce'
                    : 'bg-slate-900 border-white/10 text-slate-500 opacity-60'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="ml-1 hidden sm:inline">{wp.name}</span>
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
            <span>¡Ruta completada! Uno de los recuerdos más bonitos del viaje.</span>
          </motion.div>
        ) : (
          <p className="text-center font-mono text-xs text-slate-400">
            Haz clic en los puntos del mapa en orden (1 al 4) para recorrer la Ciudad Amurallada.
          </p>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
