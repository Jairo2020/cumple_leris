'use client';

import { useEffect } from 'react';
import { useMemory } from '@/context/MemoryContext';
import { MEMORIES_DATA } from '@/data/memories';
import { soundFx } from '@/utils/audio';
import confetti from 'canvas-confetti';

declare global {
  interface Window {
    __memoria_logged__?: boolean;
    memoria?: {
      ayuda: () => void;
      mensajeSecreto: () => void;
      constelacion: () => void;
      recetaSalud: () => void;
      fotografiaAtardecer: () => void;
      curiosidades: () => void;
      sonidoBrisa: () => void;
      desbloquearTodo: () => void;
      galaxia: () => void;
      pistas: () => void;
    };
  }
}

export const ConsoleDevTools: React.FC = () => {
  const { unlockAllMemories } = useMemory();

  useEffect(() => {
    // Imprimir bienvenida gráfica estilizada solo una vez por sesión de navegador
    if (!window.__memoria_logged__) {
      window.__memoria_logged__ = true;

      console.log(
        '%c ✨ PROYECTO MEMORIA // Misión 13 de Agosto de 2026 ✨ %c',
        'background: linear-gradient(90deg, #f97316, #a855f7, #38bdf8); color: #ffffff; font-weight: bold; font-size: 14px; padding: 6px 14px; border-radius: 8px;',
        'color: #38bdf8; font-size: 12px;'
      );

      console.log(
        '%c "Si estás leyendo esto en la consola, tu curiosidad es brillante. ¡Hola, Leris! 🩺✨🌌" %c',
        'color: #f59e0b; font-style: italic; font-size: 13px; font-weight: bold;',
        'color: auto;'
      );

      console.log(
        '%c 💡 Escribe  memoria.ayuda()  en la consola para desplegar todos los comandos secretos. %c',
        'color: #38bdf8; font-family: monospace; font-size: 11px; font-weight: bold;',
        'color: auto;'
      );
    }

    // Exponer conjunto completo de comandos en window.memoria
    window.memoria = {
      ayuda: () => {
        soundFx.playClick();
        console.log(
          '%c 🛠️ MENÚ DE COMANDOS SECRETOS EN LA CONSOLA DE PROYECTO MEMORIA 🛠️ \n' +
            '─────────────────────────────────────────────────────────────\n' +
            '1. memoria.mensajeSecreto()    -> Lee una carta oculta de felicitación.\n' +
            '2. memoria.constelacion()       -> Muestra el firmamento en arte galáctico.\n' +
            '3. memoria.recetaSalud()        -> La fórmula médica de la alegría de Leris.\n' +
            '4. memoria.fotografiaAtardecer()-> Arte ASCII del atardecer del 17 de Julio.\n' +
            '5. memoria.curiosidades()       -> 3 datos curiosos de estrellas y medicina.\n' +
            '6. memoria.sonidoBrisa()        -> Escucha un acorde armónico en vivo.\n' +
            '7. memoria.galaxia()            -> Lanza una ráfaga estelar de confeti.\n' +
            '8. memoria.pistas()             -> Revela las respuestas de los 12 retos.\n' +
            '9. memoria.desbloquearTodo()    -> Desbloquea de inmediato los 12 fragmentos.\n' +
            '─────────────────────────────────────────────────────────────',
          'color: #a855f7; font-family: monospace; font-size: 12px; font-weight: bold;'
        );
      },

      mensajeSecreto: () => {
        soundFx.playUnlock();
        console.log(
          '%c ✨ NOTA SECRETA // DEDICATORIA F12 ✨ \n\n' +
            'Leris,\n' +
            'Tu combinación entre vocación médica, pasión por el universo y esa sonrisa alegre que irradia paz donde estés es algo extraordinario.\n' +
            'Gracias por hacer el mundo más bonito. ¡Feliz Cumpleaños 13 de Agosto de 2026! 🎂🩺✨🌌',
          'background: #0f172a; color: #f59e0b; font-size: 13px; padding: 12px; border: 1.5px solid #f59e0b; border-radius: 10px; font-family: sans-serif;'
        );
      },

      constelacion: () => {
        soundFx.playUnlock();
        console.log(
          '%c' +
            '        .        .      *         .         .  *\n' +
            '  *       .         .        .        .       \n' +
            '     .        ★  GALAXIA LERIS 2026 ★    .     \n' +
            '        *       .       .        .        .   \n' +
            '  .        .        *        .       .       *\n' +
            '  "Cada estrella en el firmamento guarda un bonito recuerdo." 🌌✨',
          'color: #38bdf8; font-family: monospace; font-size: 12px; font-weight: bold;'
        );
      },

      recetaSalud: () => {
        soundFx.playClick();
        console.log(
          '%c 🩺 PRESCRIPCIÓN MÉDICA DE BUENA ENERGÍA 🩺 \n' +
            '───────────────────────────────────────────\n' +
            '• Dosis recomendada: Risa espontánea infinitas veces al día.\n' +
            '• Principio activo: Empatía pura y luz propia (1000 mg).\n' +
            '• Indicación: Curar corazones y contagiar paz a quienes te rodean.\n' +
            '• Contraindicación: Cero días tristes este 2026. 💙✨',
          'color: #34d399; font-family: monospace; font-size: 12px; font-weight: bold;'
        );
      },

      fotografiaAtardecer: () => {
        soundFx.playClick();
        console.log(
          '%c' +
            '   [ATARDECER EN CARTAGENA • VIERNES 17 DE JULIO]\n' +
            '   ~~~~~~~~~~~~~~ 🌅 ~~~~~~~~~~~~~~\n' +
            '      🌴   *  .  🔮  .  *   🌴\n' +
            '     /\\/\\    TONOS VIOLETAS    /\\/\\\n' +
            '    ~~~~~~  Bajo las palmeras  ~~~~~~\n' +
            '   "Se venía algo muy bonito..." ✨',
          'color: #f97316; font-family: monospace; font-size: 12px; font-weight: bold;'
        );
      },

      curiosidades: () => {
        soundFx.playClick();
        console.log(
          '%c 🔍 CURIOSIDADES DEL PROYECTO 🔍 \n' +
            '1. ⭐ La constelación contiene más de 100 partículas renderizadas en tiempo real mediante Canvas.\n' +
            '2. 🩺 El efecto de audio máquina de escribir genera sintetizadores armónicos en vivo usando Web Audio API.\n' +
            '3. 🌊 Todos los acertijos están inspirados en la historia real vivida en Cartagena de Indias.',
          'color: #fbbf24; font-family: monospace; font-size: 11px;'
        );
      },

      sonidoBrisa: () => {
        soundFx.playUnlock();
        console.log('🔊 Reproduciendo acordes armónicos en la consola Web Audio API...');
      },

      galaxia: () => {
        soundFx.playCelebration();
        console.log('🌌 ¡Lanzando ráfaga estelar en la pantalla!');
        try {
          confetti({
            particleCount: 160,
            spread: 120,
            origin: { y: 0.5 },
            colors: ['#38bdf8', '#a855f7', '#f97316', '#f59e0b', '#ec4899'],
          });
        } catch {
          // Ignorar
        }
      },

      pistas: () => {
        soundFx.playClick();
        console.log('%c 📜 RESPUESTAS Y COMBINACIONES DE LOS 12 RETOS 📜', 'color: #38bdf8; font-weight: bold;');
        MEMORIES_DATA.forEach((m) => {
          console.log(`• Reto #${m.id} [${m.title}]: ${m.hints[2]}`);
        });
      },

      desbloquearTodo: () => {
        unlockAllMemories();
        console.log(
          '%c 🚀 [SISTEMA] ¡Los 12 fragmentos han sido desencriptados! %c',
          'color: #10b981; font-weight: bold; font-size: 13px;',
          'color: auto;'
        );
      },
    };
  }, [unlockAllMemories]);

  return null;
};
