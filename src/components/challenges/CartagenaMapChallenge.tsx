'use client';

import React, { useState } from 'react';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Compass, MapPin, CheckCircle2, Sparkles, CompassIcon, CloudFog, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

export const CartagenaMapChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [visited, setVisited] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  // Estado para el evento simulado de "Aparente Pérdida y Reencuentro con la Luz"
  const [lostPhase, setLostPhase] = useState<'fog' | 'found' | 'cleared'>('fog');

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

  const handleSeekLight = () => {
    setLostPhase('found');
    soundFx.playCelebration();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#38bdf8', '#f59e0b', '#a855f7', '#10b981'],
      });
    } catch {
      // Ignorar
    }
  };

  const handleClearFog = () => {
    setLostPhase('cleared');
    soundFx.playUnlock();
  };

  return (
    <div className="space-y-6 relative">
      {/* Modal / Experiencia Simulada de Pérdida en la Niebla y Reencuentro con Dios */}
      <AnimatePresence>
        {lostPhase !== 'cleared' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_60px_rgba(56,189,248,0.3)] space-y-6 text-center"
            >
              {lostPhase === 'fog' ? (
                /* Fase 1: Aparente pérdida en la mitad del camino */
                <div className="space-y-5">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <CloudFog className="w-10 h-10 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block font-semibold">
                      ⚠️ MITAD DEL RECORRIDO ESTELAR • ALERTA DE NAVEGACIÓN
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                      El camino parece haberse cubierto de niebla...
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    En la mitad de esta constelación, las señales parecen haberse desorientado momentáneamente en la oscuridad de la noche.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-xs text-cyan-200 font-mono italic">
                    &quot;A veces en la vida nos sentimos desorientados... pero nunca estamos solos.&quot;
                  </div>

                  <button
                    onClick={handleSeekLight}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Buscar la Luz con Fe &amp; Confianza en Dios 🙏</span>
                  </button>
                </div>
              ) : (
                /* Fase 2: Reencuentro, revelación de luz y superación juntos */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                    <Sun className="w-10 h-10 animate-spin" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest block font-semibold">
                      ✨ LUZ ENCONTRADA // EL CAMINO DE VUELTA
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-amber-100">
                      ¡La oscuridad se disipa y el camino resurge!
                    </h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-100 text-xs sm:text-sm leading-relaxed space-y-3 font-sans text-left">
                    <p>
                      En la vida y en el camino compartido, pueden llegar momentos de aparente pérdida o incertidumbre... pero <strong>con la ayuda de Dios siempre hay un camino de vuelta</strong>.
                    </p>
                    <p>
                      No hay noche tan oscura que apague la fe. Caminando juntos y confiando en Él, siempre se puede salir adelante. ✨🙏🌌
                    </p>
                  </div>

                  <button
                    onClick={handleClearFog}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reencontrar el Camino &amp; Continuar el Acertijo 🚀</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
