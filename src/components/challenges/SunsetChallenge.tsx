'use client';

import React, { useState } from 'react';
import { MemoryFragment } from '@/data/memories';
import { GlassCard } from '@/components/ui/GlassCard';
import { HintDrawer } from '@/components/ui/HintDrawer';
import { soundFx } from '@/utils/audio';
import { Sun, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeProps {
  memory: MemoryFragment;
  onSuccess: () => void;
}

// Helper para resolver la ruta de imágenes respetando el subdominio basePath de GitHub Pages (/cumple_leris)
const getImagePath = (path?: string): string => {
  const target = path || '/images/friday_sunset.jpg';
  if (target.startsWith('http') || target.startsWith('data:')) return target;
  const basePath = process.env.NODE_ENV === 'production' ? '/cumple_leris' : '';
  const cleanPath = target.startsWith('/') ? target : `/${target}`;
  return `${basePath}${cleanPath}`;
};

export const SunsetChallenge: React.FC<ChallengeProps> = ({ memory, onSuccess }) => {
  const [focus, setFocus] = useState<number>(20);
  const [brightness, setBrightness] = useState<number>(30);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const blurAmount = Math.max(0, (100 - focus) / 8);
  const brightnessAmount = 0.3 + (brightness / 100) * 0.7;
  const isRestored = focus >= 85 && brightness >= 85;

  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocus(Number(e.target.value));
    soundFx.playClick();
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(e.target.value));
    soundFx.playClick();
  };

  const handleRestore = () => {
    if (isRestored) {
      setIsSuccess(true);
      soundFx.playUnlock();
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  };

  const currentImageSrc = getImagePath(memory.image);

  return (
    <div className="space-y-6">
      {/* Encabezado del Reto */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 text-amber-400 font-mono text-xs mb-2">
          <Sun className="w-4 h-4" />
          <span>RETO #02 // RESTAURACIÓN CROMÁTICA DE MEMORIA</span>
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

      {/* Visor interactivo de la Imagen del Atardecer */}
      <GlassCard className="p-6 space-y-6">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 aspect-[4/3] max-w-lg mx-auto flex items-center justify-center">
          {/* Fotografía Real del Atardecer con resolución dinámica de subruta */}
          <motion.img
            src={currentImageSrc}
            alt="Atardecer del Viernes"
            style={{
              filter: `blur(${blurAmount}px) brightness(${brightnessAmount})`,
            }}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Superposición sutil de restauración */}
          {isRestored && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6"
            >
              <div className="text-white space-y-1">
                <span className="text-xs font-mono text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Atardecer del Viernes • 17 de Julio
                </span>
                <p className="text-sm font-semibold italic text-amber-100">
                  &quot;El cielo avisando que algo lindo estaba a punto de comenzar...&quot;
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sliders de Control */}
        <div className="space-y-4 max-w-md mx-auto">
          {/* Slider Enfoque */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Enfoque Óptico:</span>
              <span className="text-amber-400 font-semibold">{focus}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={focus}
              onChange={handleFocusChange}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Slider Espectro de Luz */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Brillo del Atardecer:</span>
              <span className="text-amber-400 font-semibold">{brightness}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={brightness}
              onChange={handleBrightnessChange}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>

        {/* Botón de Confirmación */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¡Fotografía restaurada! Se venía algo lindo...</span>
          </motion.div>
        ) : (
          <button
            onClick={handleRestore}
            disabled={!isRestored}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
              isRestored
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-pulse cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Restaurar Fotografía del Atardecer</span>
          </button>
        )}

        <HintDrawer hints={memory.hints} />
      </GlassCard>
    </div>
  );
};
