'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { Particles } from '@/components/ui/Particles';
import { ShieldAlert, ArrowLeft, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#080a11] relative overflow-hidden flex items-center justify-center p-6">
      <AmbientBackground />
      <Particles />

      <GlassCard className="w-full max-w-md p-8 border-rose-500/30 text-center space-y-6 relative z-10">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 w-16 h-16 mx-auto flex items-center justify-center shadow-lg">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-rose-400 font-semibold px-2.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">
            ERROR 404 // SECTOR NO ENCONTRADO
          </span>
          <h1 className="text-xl font-bold text-slate-100">
            Fragmento de Memoria Inexistente
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Esta ruta no contiene recuerdos. Todos los momentos especiales están a salvo en la constelación principal.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-white/5 font-mono text-[11px] text-cyan-400 text-left">
          <code>$ memory.find(&quot;sector_lost&quot;) =&gt; null</code>
        </div>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium text-xs shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Sistema Principal</span>
        </Link>
      </GlassCard>
    </main>
  );
}
