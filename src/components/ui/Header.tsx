'use client';

import React from 'react';
import { useMemory } from '@/context/MemoryContext';
import { Volume2, VolumeX, BookOpen, RotateCcw, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const {
    unlockedIds,
    isMuted,
    toggleMute,
    toggleHandbook,
    resetProgress,
    isFinaleReady,
  } = useMemory();

  const totalMemories = 12;
  const progressPercent = Math.round((unlockedIds.length / totalMemories) * 100);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/65 border-b border-white/10 px-4 py-3 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Marca / Logotipo del Sistema */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-semibold tracking-wider text-slate-200 uppercase">
                PROYECTO MEMORIA
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                v4.17
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Unidad de Desencriptación de Recuerdos Cifrados
            </p>
          </div>
        </div>

        {/* Barra de Progreso y Acciones */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Indicador de Progreso de Nodos */}
          <div className="flex items-center space-x-3 bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-xl">
            <div className="w-24 sm:w-32 bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className={`h-full rounded-full ${
                  isFinaleReady
                    ? 'bg-gradient-to-r from-amber-400 to-rose-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                }`}
              />
            </div>
            <span className="font-mono text-xs text-slate-300 font-medium">
              {unlockedIds.length}/{totalMemories}
            </span>
          </div>

          {/* Botón Developer Handbook */}
          <button
            onClick={toggleHandbook}
            title="Manual del Desarrollador"
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Manual Dev</span>
          </button>

          {/* Botón de Silencio */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Activar Sonido' : 'Silenciar'}
            className="p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 rounded-xl transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Botón Reiniciar Progreso */}
          <button
            onClick={() => {
              if (confirm('¿Deseas reiniciar el progreso de desencriptación?')) {
                resetProgress();
              }
            }}
            title="Reiniciar Progreso"
            className="p-2 text-slate-400 hover:text-rose-400 bg-slate-900/80 hover:bg-slate-800 border border-white/10 rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
