'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMemory } from '@/context/MemoryContext';
import { soundFx } from '@/utils/audio';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Lock, Unlock, Sparkles } from 'lucide-react';

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
  'Acceso restringido: Solo una persona puede desencriptar estos fragmentos y descubrir la historia.',
];

const VALID_COMMANDS = [
  'sinceridad',
  'sincero',
  'fe',
  'confianza',
  'respeto',
  'leris',
  '1308',
  'desencriptar',
];

export const BootScreen: React.FC = () => {
  const { completeBootSequence } = useMemory();
  const [logIndex, setLogIndex] = useState<number>(0);
  const [isReadyForCommand, setIsReadyForCommand] = useState<boolean>(false);
  const [commandInput, setCommandInput] = useState<string>('');
  const [commandLogs, setCommandLogs] = useState<string[]>([]);
  const [isButtonUnlocked, setIsButtonUnlocked] = useState<boolean>(false);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setLogIndex((prev) => prev + 1);
        soundFx.playTypewriter();
      }, 350);
      return () => clearTimeout(timer);
    } else {
      const readyTimer = setTimeout(() => {
        setIsReadyForCommand(true);
        soundFx.playClick();
      }, 400);
      return () => clearTimeout(readyTimer);
    }
  }, [logIndex]);

  useEffect(() => {
    // Auto-scroll al final del log al agregar nuevo contenido
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logIndex, commandLogs, isButtonUnlocked]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = commandInput.trim().toLowerCase();

    if (!cleaned) return;

    if (VALID_COMMANDS.includes(cleaned)) {
      soundFx.playUnlock();
      setIsButtonUnlocked(true);
      setCommandLogs((prev) => [
        ...prev,
        `> leris@memoria:~$ ${commandInput}`,
        `> [SISTEMA_OK] ¡Clave "${cleaned}" aceptada! Sistema de recuerdos desbloqueado. 🔓✨`,
      ]);
      setCommandInput('');
    } else {
      soundFx.playError();
      setCommandLogs((prev) => [
        ...prev,
        `> leris@memoria:~$ ${commandInput}`,
        `> [ERROR] Clave no reconocida. Ingrese la palabra clave de autorización.`,
      ]);
      setCommandInput('');
    }
  };

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
        <div className="p-6 font-mono text-xs sm:text-sm space-y-2 min-h-[280px] max-h-[380px] overflow-y-auto custom-scrollbar">
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

          {/* Logs ejecutados por comando del usuario */}
          {commandLogs.map((cLog, cIdx) => (
            <div
              key={`cmd-log-${cIdx}`}
              className={cLog.includes('[SISTEMA_OK]') ? 'text-emerald-400 font-bold' : cLog.includes('[ERROR]') ? 'text-rose-400' : 'text-cyan-300'}
            >
              {cLog}
            </div>
          ))}

          {/* Prompt Interactivo para ingresar la clave */}
          {isReadyForCommand && !isButtonUnlocked && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleCommandSubmit}
              className="pt-3 border-t border-cyan-500/20 space-y-2"
            >
              <div className="flex items-center space-x-2 text-cyan-300 font-mono">
                <span className="text-emerald-400 font-bold select-none">leris@memoria:~$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Ingrese la clave de autorización..."
                  className="flex-1 bg-transparent border-b border-cyan-500/40 focus:border-cyan-300 focus:outline-none text-cyan-200 px-1 py-1 font-mono text-xs sm:text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 px-3.5 py-1 rounded-lg transition-all"
                >
                  Ejecutar ↵
                </button>
              </div>
            </motion.form>
          )}

          <div ref={consoleEndRef} />
        </div>

        {/* Zona inferior del Botón de Acceso */}
        <AnimatePresence>
          {isReadyForCommand && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border-t border-white/10 bg-slate-900/50 space-y-4 text-center"
            >
              {!isButtonUnlocked ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm space-y-1">
                  <div className="flex items-center justify-center space-x-2 font-semibold text-amber-300">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Se encontraron recuerdos protegidos.</span>
                  </div>
                  <p className="text-slate-300 font-medium">
                    Solo una persona puede desencriptar estos fragmentos y descubrir la historia.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-medium flex items-center justify-center space-x-2"
                >
                  <Unlock className="w-4 h-4 text-emerald-400" />
                  <span>¡Autorización Concedida! El sistema está listo para comenzar.</span>
                </motion.div>
              )}

              <button
                onClick={completeBootSequence}
                disabled={!isButtonUnlocked}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isButtonUnlocked
                    ? 'bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] animate-pulse cursor-pointer transform hover:-translate-y-0.5'
                    : 'bg-slate-900 border border-slate-700 text-slate-500 opacity-50 cursor-not-allowed'
                }`}
              >
                {isButtonUnlocked ? (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                    <span>Iniciar Desencriptación de Memorias</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-slate-500" />
                    <span>Botón Bloqueado (Ingrese la clave arriba)</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
