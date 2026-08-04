'use client';

import React from 'react';
import { useMemory } from '@/context/MemoryContext';
import { MEMORIES_DATA } from '@/data/memories';
import { Header } from '@/components/ui/Header';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { Particles } from '@/components/ui/Particles';
import { BootScreen } from '@/components/os/BootScreen';
import { ConstellationMap } from '@/components/map/ConstellationMap';
import { GrandFinale } from '@/components/finale/GrandFinale';

// Importación de los 12 Retos
import { PromiseChallenge } from '@/components/challenges/PromiseChallenge';
import { SunsetChallenge } from '@/components/challenges/SunsetChallenge';
import { EyeContactChallenge } from '@/components/challenges/EyeContactChallenge';
import { GitCommitChallenge } from '@/components/challenges/GitCommitChallenge';
import { CartagenaMapChallenge } from '@/components/challenges/CartagenaMapChallenge';
import { LoopChallenge } from '@/components/challenges/LoopChallenge';
import { SafeBoxChallenge } from '@/components/challenges/SafeBoxChallenge';
import { SqlQueryChallenge } from '@/components/challenges/SqlQueryChallenge';
import { TryCatchChallenge } from '@/components/challenges/TryCatchChallenge';
import { ConsoleChallenge } from '@/components/challenges/ConsoleChallenge';
import { StarConstellationChallenge } from '@/components/challenges/StarConstellationChallenge';
import { MasterVaultChallenge } from '@/components/challenges/MasterVaultChallenge';

import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const {
    isBooted,
    activeMemoryId,
    setActiveMemoryId,
    unlockMemory,
    isFinaleReady,
    showMapView,
    setShowMapView,
  } = useMemory();

  // Mapeo dinámico de los 12 retos por ID
  const renderChallenge = (id: number) => {
    const memory = MEMORIES_DATA.find((m) => m.id === id);
    if (!memory) return null;

    const handleSuccess = () => {
      unlockMemory(id);
      setTimeout(() => {
        if (id === 12) {
          // El reto 12 activa el final
          setActiveMemoryId(null);
          setShowMapView(false);
        } else {
          setActiveMemoryId(null);
        }
      }, 1000);
    };

    switch (id) {
      case 1:
        return <PromiseChallenge memory={memory} onSuccess={handleSuccess} />;
      case 2:
        return <SunsetChallenge memory={memory} onSuccess={handleSuccess} />;
      case 3:
        return <EyeContactChallenge memory={memory} onSuccess={handleSuccess} />;
      case 4:
        return <GitCommitChallenge memory={memory} onSuccess={handleSuccess} />;
      case 5:
        return <LoopChallenge memory={memory} onSuccess={handleSuccess} />;
      case 6:
        return <CartagenaMapChallenge memory={memory} onSuccess={handleSuccess} />;
      case 7:
        return <SafeBoxChallenge memory={memory} onSuccess={handleSuccess} />;
      case 8:
        return <SqlQueryChallenge memory={memory} onSuccess={handleSuccess} />;
      case 9:
        return <TryCatchChallenge memory={memory} onSuccess={handleSuccess} />;
      case 10:
        return <ConsoleChallenge memory={memory} onSuccess={handleSuccess} />;
      case 11:
        return <StarConstellationChallenge memory={memory} onSuccess={handleSuccess} />;
      case 12:
        return <MasterVaultChallenge memory={memory} onSuccess={handleSuccess} />;
      default:
        return null;
    }
  };

  if (!isBooted) {
    return (
      <main className="min-h-screen bg-[#080a11] relative overflow-hidden flex items-center justify-center">
        <AmbientBackground />
        <Particles />
        <BootScreen />
      </main>
    );
  }

  const isShowingFinale = isFinaleReady && activeMemoryId === null && !showMapView;

  return (
    <main className="min-h-screen bg-[#080a11] relative overflow-hidden flex flex-col">
      <AmbientBackground sunsetMode={isShowingFinale} />
      <Particles sunsetMode={isShowingFinale} />
      <Header />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {/* Si está activo un reto específico */}
          {activeMemoryId !== null ? (
            <motion.div
              key={`challenge-${activeMemoryId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <button
                onClick={() => setActiveMemoryId(null)}
                className="flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-slate-900/80 border border-white/10 px-3.5 py-2 rounded-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Mapa de Constelación</span>
              </button>

              {renderChallenge(activeMemoryId)}
            </motion.div>
          ) : isShowingFinale ? (
            /* Vista del Gran Final & El Libro */
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <GrandFinale />
            </motion.div>
          ) : (
            /* Mapa Interactivo de Nodos de Constelación */
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Si ya desencriptó todo pero prefirió volver al mapa, mostrar banner para volver a la carta */}
              {isFinaleReady && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowMapView(false)}
                    className="flex items-center space-x-2 text-xs font-mono text-amber-300 hover:text-amber-200 bg-amber-500/20 border border-amber-500/40 px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse"
                  >
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                    <span>Ver Carta Final &amp; El Libro 📜</span>
                  </button>
                </div>
              )}

              <ConstellationMap />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="w-full border-t border-white/5 py-4 text-center text-[11px] font-mono text-slate-500 relative z-10">
        PROYECTO MEMORIA v4.17 • Desarrollado con afecto y respeto • Cartagena &amp; Turbaco
      </footer>
    </main>
  );
}
