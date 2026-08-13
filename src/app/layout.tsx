import type { Metadata } from 'next';
import './globals.css';
import { MemoryProvider } from '@/context/MemoryContext';
import { DevHandbookModal } from '@/components/handbook/DevHandbookModal';
import { KonamiCode } from '@/components/easter-eggs/KonamiCode';
import { ConsoleDevTools } from '@/components/easter-eggs/ConsoleDevTools';

export const metadata: Metadata = {
  title: '✨ Cumple Leris • Proyecto Memoria 🩺🌌',
  description: 'Una constelación de recuerdos especiales en Cartagena de Indias dedicados a Leris.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-[#080a11] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <MemoryProvider>
          {children}
          <DevHandbookModal />
          <KonamiCode />
          <ConsoleDevTools />
        </MemoryProvider>
      </body>
    </html>
  );
}
