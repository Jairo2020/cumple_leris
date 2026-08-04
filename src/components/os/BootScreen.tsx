'use client';

import React, { useState, useEffect } from 'react';
import { useMemory } from '@/context/MemoryContext';
import { soundFx } from '@/utils/audio';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, KeyRound } from 'lucide-react';

const BOOT_LOGS = [
  'NÚCLEO DE MEMORIA CUÁNTICA v4.17.0 (x86_64-cartagena)',
  'Inicializando Motor de Reconstrucción de Recuerdos...',
  'Montando bóveda de almacenamiento local [ESTADO_OK]',
  'Escaneando sectores cifrados en busca de fragmentos de memoria...',
  'SECTOR #01: Bloque de Resolución de Promesa encontrado [BLOQUEADO]',
  'SECTOR #02: Espectro fotográfico del Atardecer del Viernes encontrado [BLOQUEADO]',
  'SECTOR #03: Frecuencia de Onda de Miradas Cruzadas encontrada [BLOQUEADO]',
  'SECTOR #04: Hash de Commit Git #1705 encontrado [BLOQUEADO]',
  'SECTOR #05: Mapa Vectorial de la Ciudad Amurallada encontrado [BLOQUEADO]',
  'Analizando firma de seguridad y cifrado...',
  'VEREDICTO: Se encontraron recuerdos protegidos.',
  'Acceso restringido: Solo la persona autorizada puede reconstruir estos archivos.',
];

export const BootScreen: React.FC = () => {
  const { completeBootSequence } = useMemory();
  const [logIndex, setLogIndex] = useState<number>(0);
  const [isReadyToStart, setIsReadyToStart] = useState<boolean>(false);

  useEffect(() => {
    if (logIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setLogIndex((prev) => prev + 1);
        soundFx.playTypewriter();
      }, 350);
      return () => clearTimeout(timer);
    } else {
      const readyTimer = setTimeout(() => {
        setIsReadyToStart(true);
        soundFx.playUnlock();
      }, 500);
      return () => clearTimeout(readyTimer);
    }
  }, [logIndex]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-slate-950/90 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.15)] overflow-hidden backdrop-blur-xl"
      >
        {/* Barra superior de Terminal OS */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span>protocolo_reconstruccion_recuerdos.sh</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">v4.17</span>
        </div>

        {/* Consola de logs */}
        <div className="p-6 font-mono text-xs sm:text-sm space-y-2 min-h-[260px] max-h-[360px] overflow-y-auto">
          {BOOT_LOGS.slice(0, logIndex).map((log, idx) => {
            const isHighlight = log.includes('VEREDICTO') || log.includes('Acceso restringido');
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start space-x-2 ${
                  isHighlight ? 'text-amber-300 font-semibold' : 'text-slate-300'
                }`}
              >
                <span className="text-cyan-500 select-none">&gt;</span>
                <span>{log}</span>
              </motion.div>
            );
          })}

          {logIndex < BOOT_LOGS.length && (
            <div className="flex items-center space-x-2 text-cyan-400">
              <span className="text-cyan-500 select-none">&gt;</span>
              <span className="animate-pulse">_</span>
            </div>
          )}
        </div>

        {/* Botón de acceso tras boot completado */}
        <AnimatePresence>
          {isReadyToStart && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border-t border-white/10 bg-slate-900/50 space-y-4 text-center"
            >
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm space-y-1">
                <div className="flex items-center justify-center space-x-2 font-semibold text-amber-300">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Se encontraron recuerdos protegidos.</span>
                </div>
                <p className="text-xs text-slate-300">
                  Solo una persona puede desencriptar estos fragmentos y descubrir la historia.
                </p>
              </div>

              <button
                onClick={completeBootSequence}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium text-sm shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Iniciar Desencriptación de Memorias</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
