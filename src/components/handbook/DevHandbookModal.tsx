'use client';

import React from 'react';
import { useMemory } from '@/context/MemoryContext';
import { HANDBOOK_ENTRIES } from '@/data/handbook';
import { X, BookOpen, Code2, HeartHandshake, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DevHandbookModal: React.FC = () => {
  const { isHandbookOpen, toggleHandbook } = useMemory();

  if (!isHandbookOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900/90 border border-purple-500/30 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.2)] flex flex-col overflow-hidden"
        >
          {/* Encabezado del Modal */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-950/50">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
                  Developer Handbook
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                    Manual del Desarrollador
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Conceptos de ingeniería de software explicados a través de la calidez de la amistad.
                </p>
              </div>
            </div>

            <button
              onClick={toggleHandbook}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 border border-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de entradas */}
          <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HANDBOOK_ENTRIES.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-purple-500/30 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-purple-300">
                      {entry.concept}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-white/5">
                      {entry.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-amber-300 flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-amber-400" />
                      {entry.analogyTitle}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {entry.analogyDesc}
                    </p>
                  </div>

                  {/* Snippet de Código ilustrativo */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-white/5 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                    <pre><code>{entry.codeSnippet}</code></pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pie del Modal */}
          <div className="p-4 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Aprender la lógica del código mientras compartimos momentos.
            </span>
            <button
              onClick={toggleHandbook}
              className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/40 text-purple-200 border border-purple-500/40 rounded-xl font-medium transition-all"
            >
              Cerrar Manual
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
