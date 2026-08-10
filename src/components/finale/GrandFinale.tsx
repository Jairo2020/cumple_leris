'use client';

import React, { useState, useEffect } from 'react';
import { useMemory } from '@/context/MemoryContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { soundFx } from '@/utils/audio';
import { getStoredLetterRead, saveStoredLetterRead } from '@/utils/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, BookOpen, Star, Stethoscope, Terminal, MapPin, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const LETTER_TEXT = `Leris,

Ha sido algo verdaderamente bonito haberte conocido.

Recordar aquellos días en Cartagena —las miradas silenciosas durante el almuerzo, y tu sonrisa radiante como el sol después de la lluvia, traspasando hasta las más densas nubes. La noche en que el pastor nos presentó y tuvimos la oportunidad de hablar por primera vez entre risas y una gran comodidad, y el sábado 18 cuando me animé a decirte que quería que nos conociéramos mejor porque vi en ti a una chica totalmente diferente, fuera de lo común— me llena de gratitud y una gran sonrisa.

Aprecio mucho tu pasión por las estrellas y las galaxias, por ende he diseñado un poco la temática de la web inspirado en lo que me dijiste, ver las estrellas en una noche estrellada, esa curiosidad tan bonita por el universo, y por supuesto tu vocación como médica, ejerciendo con tanto corazón y dedicación para llevar salud, cuidado y paz a quienes te rodean.

Le pido a Dios que en este nuevo año de vida que inicia este 13 de Agosto te bendiga grandemente en cada paso que des, que cuide tu vida y la de tu familia en donde quiera que se encuentre, y que el 2026 esté repleto de salud, proyectos cumplidos y una inmensa alegría.

Espero que sigamos construyendo buenos recuerdos, descubriendo las cosas bonitas que podemos darnos y compartiendo conversaciones sinceras a lo largo del tiempo.

Con mucho cariño:
Jairo Rohatan Zapata

¡Felicidades por llegar hasta aquí y vivir el proceso! Me siento muy contento por este logro tuyo.

¡Feliz cumpleaños, Leris! • 13 de Agosto de 2026 ✨🌌🩺`;

export const GrandFinale: React.FC = () => {
  const { setShowMapView } = useMemory();

  // Verificar de forma sincrónica en estado inicial si la carta ya fue leída previamente
  const [alreadyRead, setAlreadyRead] = useState<boolean>(() => getStoredLetterRead());
  const [displayedText, setDisplayedText] = useState<string>(() =>
    getStoredLetterRead() ? LETTER_TEXT : ''
  );
  const [isLetterFinished, setIsLetterFinished] = useState<boolean>(() =>
    getStoredLetterRead()
  );
  const [isGiftOpened, setIsGiftOpened] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<'heart' | 'doctor' | null>(null);

  useEffect(() => {
    // Si la carta YA fue leída previamente, mostrar de una y NO ejecutar ningún temporizador
    if (getStoredLetterRead()) {
      setDisplayedText(LETTER_TEXT);
      setIsLetterFinished(true);
      setAlreadyRead(true);
      return;
    }

    // Si es la PRIMERA VEZ, ejecutar la animación de máquina de escribir
    let index = 0;
    const timer = setInterval(() => {
      if (index < LETTER_TEXT.length) {
        setDisplayedText(LETTER_TEXT.substring(0, index + 1));
        if (index % 4 === 0) {
          soundFx.playTypewriter();
        }
        index++;
      } else {
        clearInterval(timer);
        setIsLetterFinished(true);
        setAlreadyRead(true);
        // Guardar en LocalStorage solo cuando la lectura inicial haya finalizado
        saveStoredLetterRead(true);
      }
    }, 35);

    return () => clearInterval(timer);
  }, []);

  const handleOpenBookGift = () => {
    setIsGiftOpened(true);
    soundFx.playCelebration();

    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f97316', '#a855f7', '#38bdf8', '#f59e0b', '#ec4899'],
      });
    } catch {
      // Ignorar si confetti falla
    }
  };

  const handleHeartClick = () => {
    setActiveModal('heart');
    soundFx.playCelebration();
  };

  const handleDoctorClick = () => {
    setActiveModal('doctor');
    soundFx.playUnlock();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 relative z-10 py-6">
      {/* Botón superior para volver al mapa inicial */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowMapView(true)}
          className="flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-slate-900/80 border border-white/10 px-4 py-2 rounded-xl transition-all shadow-lg hover:border-cyan-500/40"
        >
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>Volver al Mapa de Constelación</span>
        </button>

        {alreadyRead && (
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5" /> Carta revelada previamente
          </span>
        )}
      </div>

      {/* Carta principal */}
      <GlassCard className="p-6 sm:p-10 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.25)] bg-slate-950/85">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          {/* Elemento Interactivo del Corazón */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleHeartClick}
            className="flex items-center space-x-2 text-amber-400 font-mono text-xs cursor-pointer hover:text-rose-300 transition-colors group"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse group-hover:scale-110 transition-transform" />
            <span>MENSAJE DESENCRIPTADO // CARTA DE CUMPLEAÑOS 2026</span>
          </motion.div>

          {/* Elemento Interactivo de la Doctora */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDoctorClick}
            className="flex items-center space-x-2 text-xs font-mono text-purple-300 cursor-pointer hover:text-purple-200 transition-colors group"
          >
            <Stethoscope className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span>Dra. Leris • Cartagena &amp; Turbaco</span>
          </motion.div>
        </div>

        {/* Texto de la Carta */}
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-line font-sans text-slate-200 text-sm sm:text-base leading-relaxed tracking-wide">
            {displayedText}
            {!isLetterFinished && <span className="animate-pulse text-amber-400 font-bold">|</span>}
          </p>
        </div>
      </GlassCard>

      {/* Desbloqueo del Misterio Final: El Libro */}
      <AnimatePresence>
        {isLetterFinished && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
          >
            {!isGiftOpened ? (
              <GlassCard className="p-8 border-purple-500/30 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-widest block">
                    ✨ El Último Misterio Desbloqueado • Misión 2026
                  </span>
                  <h3 className="text-lg font-bold text-slate-100">
                    Existe una historia que trasciende las pantallas...
                  </h3>
                </div>

                {/* Caja de regalo animada galáctica */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenBookGift}
                  className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-orange-500 via-purple-600 to-pink-500 p-0.5 shadow-[0_0_40px_rgba(249,115,22,0.4)] cursor-pointer flex items-center justify-center group"
                >
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center space-y-2 group-hover:bg-slate-900 transition-colors">
                    <Gift className="w-12 h-12 text-amber-400 group-hover:animate-bounce" />
                    <span className="text-[10px] font-mono text-purple-200 font-bold">
                      ABRIR REGALO
                    </span>
                  </div>
                </motion.div>

                <p className="text-xs text-slate-400">
                  Haz clic en el regalo para revelar la sorpresa final.
                </p>
              </GlassCard>
            ) : (
              /* Ilustración y Mensaje del Libro Físico */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <GlassCard className="p-8 sm:p-10 border-amber-500/40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 shadow-[0_0_60px_rgba(245,158,11,0.3)] space-y-6">
                  {/* Ilustración del Libro envuelto */}
                  <div className="w-48 h-60 mx-auto rounded-2xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl p-4 flex flex-col items-center justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-purple-500/10 to-transparent pointer-events-none" />

                    <div className="flex items-center space-x-1 text-amber-400 text-xs font-mono">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>CAPÍTULO II • 2026</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <BookOpen className="w-14 h-14" />
                    </div>

                    <div className="text-center font-mono text-[10px] text-amber-200 uppercase tracking-widest font-semibold">
                      EL LIBRO FÍSICO
                    </div>
                  </div>

                  {/* Mensajes finales */}
                  <div className="space-y-4 max-w-lg mx-auto">
                    <p className="text-sm sm:text-base italic text-amber-100 font-medium leading-relaxed">
                      &quot;Las mejores historias siempre esconden nuevos misterios. Por eso pensé que el siguiente capítulo no debía estar en una pantalla... Sino entre las páginas de un libro.&quot;
                    </p>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs space-y-2">
                      <p className="font-semibold text-sm">
                        📦 Espero de corazón que llegue muy pronto a tus manos (y si por cosas de los envíos llega un par de días después de tu cumpleaños, tómalo como la prórroga especial del misterio).
                      </p>
                      <p className="text-amber-200">
                        Este es solo el comienzo del siguiente capítulo. ¡Feliz cumpleaños, Leris! 🎂✨🌌🩺
                      </p>
                    </div>
                  </div>
                </GlassCard>

                {/* Pista Secreta para abrir la Consola */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center justify-center space-x-2 shadow-lg max-w-md mx-auto"
                >
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    🔍 <strong>Pista Secreta:</strong> Existen detalles técnicos guardados en la consola del navegador. Si deseas curiosear o descubrir el comando oculto, ¡puedes buscarlo o preguntarme! ✨
                  </span>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Interactivo del Corazón */}
      <AnimatePresence>
        {activeModal === 'heart' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/40 shadow-[0_0_60px_rgba(244,63,94,0.35)] space-y-5"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 text-rose-400 font-mono text-xs">
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400 animate-pulse" />
                <span className="uppercase tracking-widest font-bold">Reflexión Sincera // La Semilla</span>
              </div>

              <h3 className="text-xl font-bold text-slate-100 leading-snug">
                Construir con paciencia, fe y verdad...
              </h3>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-100 text-sm leading-relaxed space-y-3 font-sans">
                <p>
                  Las mejores historias no se improvisan ni se apresuran. Se construyen día a día alimentando una <strong>amistad verdadera</strong>, la <strong>confianza</strong>, el <strong>respeto</strong>, la <strong>sinceridad</strong> y una profunda fe en Dios.
                </p>
                <p>
                  Si alimentamos esa amistad y esa confianza en Dios con paciencia, confío de todo corazón en que podremos llegar juntos al mejor de los finales. ✨🙏❤️
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md"
                >
                  Guardar en el corazón ✨
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Interactivo de la Doctora */}
      <AnimatePresence>
        {activeModal === 'doctor' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.35)] space-y-5"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 text-purple-400 font-mono text-xs">
                <Stethoscope className="w-6 h-6 text-purple-400 animate-bounce" />
                <span className="uppercase tracking-widest font-bold">Homenaje // Vocación Médica</span>
              </div>

              <h3 className="text-xl font-bold text-slate-100 leading-snug">
                Dra. Leris • Guiada en cada paso
              </h3>

              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-100 text-sm leading-relaxed space-y-3 font-sans">
                <p>
                  Ser médica va mucho más allá de una profesión: es la hermosa vocación de brindar salud, tranquilidad y cuidado a las personas con una empatía auténtica.
                </p>
                <p>
                  Sé que en las decisiones difíciles Dios te habla de una manera muy especial, y confío plenamente en que lo seguirá haciendo siempre para guiar tu sabiduría, tus manos y tu vida en cada jornada, Dra. Leris. 🩺✨🌌
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-md"
                >
                  Dra. Leris 🩺✨
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
