'use client';

import React from 'react';
import { useMemory } from '@/context/MemoryContext';
import { MEMORIES_DATA } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export const ConstellationMap: React.FC = () => {
  const { unlockedIds, setActiveMemoryId, isFinaleReady } = useMemory();

  // Encontrar el siguiente nodo que el usuario puede jugar
  const nextAvailableId = Math.min(
    12,
    Math.max(...unlockedIds, 0) + (unlockedIds.length < 12 ? 1 : 0)
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Banner de Estado del Mapa */}
      <GlassCard className="p-6 border-cyan-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
              <MapPin className="w-4 h-4" />
              <span>MAPA DE CONSTELACIÓN // RECUERDOS EN CARTAGENA</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
              Constelación de Memorias
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Cada nodo representa un fragmento cifrado. Resuelve los acertijos para iluminar el firmamento.
            </p>
          </div>

          {isFinaleReady ? (
            <button
              onClick={() => setActiveMemoryId(12)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-pulse flex items-center space-x-2 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Revelar Gran Final & El Libro</span>
            </button>
          ) : (
            <div className="text-right font-mono text-xs text-slate-400 bg-slate-900/80 border border-white/10 px-4 py-2 rounded-xl">
              <span>Siguiente Fragmento: </span>
              <span className="text-cyan-300 font-semibold">#{nextAvailableId}</span>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Contenedor Visual del Mapa de Nodos */}
      <GlassCard className="relative p-4 sm:p-8 min-h-[500px] sm:min-h-[600px] overflow-hidden flex items-center justify-center">
        {/* Fondo sutil con cuadrícula y líneas de la constelación */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Dibujar líneas entre nodos consecutivos */}
          {MEMORIES_DATA.map((memory, idx) => {
            if (idx === MEMORIES_DATA.length - 1) return null;
            const nextMem = MEMORIES_DATA[idx + 1];
            const isUnlocked = unlockedIds.includes(memory.id) && unlockedIds.includes(nextMem.id);

            return (
              <line
                key={`line-${memory.id}`}
                x1={`${memory.nodePosition.x}%`}
                y1={`${memory.nodePosition.y}%`}
                x2={`${nextMem.nodePosition.x}%`}
                y2={`${nextMem.nodePosition.y}%`}
                stroke={isUnlocked ? 'url(#lineGrad)' : '#334155'}
                strokeWidth={isUnlocked ? '2.5' : '1.2'}
                strokeDasharray={isUnlocked ? 'none' : '4 4'}
              />
            );
          })}
        </svg>

        {/* Nodos de Memorias */}
        <div className="relative w-full h-[460px] sm:h-[540px]">
          {MEMORIES_DATA.map((memory) => {
            const isUnlocked = unlockedIds.includes(memory.id);
            const isNext = memory.id === nextAvailableId && !isUnlocked;
            const isLocked = !isUnlocked && !isNext;

            return (
              <div
                key={memory.id}
                style={{
                  left: `${memory.nodePosition.x}%`,
                  top: `${memory.nodePosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-10"
              >
                <motion.button
                  whileHover={{ scale: isLocked ? 1 : 1.18 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => {
                    if (!isLocked) {
                      setActiveMemoryId(memory.id);
                    }
                  }}
                  disabled={isLocked}
                  className={`group relative flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 ${
                    isUnlocked
                      ? 'bg-slate-900 border-2 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.5)] text-cyan-300'
                      : isNext
                      ? 'bg-purple-950 border-2 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.6)] text-purple-200 animate-bounce'
                      : 'bg-slate-950/80 border border-slate-700 text-slate-600 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {/* Icono de estado */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                    {isUnlocked ? (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                    ) : isNext ? (
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 animate-spin" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-500" />
                    )}
                  </div>

                  {/* Tooltip / Etiqueta del Nodo */}
                  <div className="absolute top-full mt-2 w-32 sm:w-40 text-center pointer-events-none z-20">
                    <span
                      className={`block font-mono text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-md border ${
                        isUnlocked
                          ? 'bg-slate-900/90 text-cyan-200 border-cyan-500/30'
                          : isNext
                          ? 'bg-purple-900/90 text-purple-200 border-purple-500/40'
                          : 'bg-slate-950/80 text-slate-500 border-white/5'
                      }`}
                    >
                      #{memory.id} {memory.title}
                    </span>
                  </div>
                </motion.button>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Tarjetas rápidas de estado de memorias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MEMORIES_DATA.map((memory) => {
          const isUnlocked = unlockedIds.includes(memory.id);
          const isNext = memory.id === nextAvailableId && !isUnlocked;

          return (
            <GlassCard
              key={memory.id}
              onClick={() => {
                if (!(!isUnlocked && !isNext)) {
                  setActiveMemoryId(memory.id);
                }
              }}
              interactive={isUnlocked || isNext}
              glowColor={isUnlocked ? 'cyan' : isNext ? 'purple' : 'none'}
              className={`p-4 ${!isUnlocked && !isNext ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block">
                    {memory.dateTag}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-200 mt-0.5">
                    {memory.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                    {memory.subtitle}
                  </p>
                </div>
                {isUnlocked ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                    Desbloqueado
                  </span>
                ) : isNext ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0 flex items-center gap-1">
                    <span>Jugar</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                ) : (
                  <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
