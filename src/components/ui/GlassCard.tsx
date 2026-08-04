'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: 'cyan' | 'purple' | 'amber' | 'rose' | 'none';
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowColor = 'none',
  interactive = false,
  ...props
}) => {
  const glowClasses = {
    none: '',
    cyan: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] hover:border-cyan-500/40',
    purple: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:border-purple-500/40',
    amber: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:border-amber-500/40',
    rose: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.25)] hover:border-rose-500/40',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'backdrop-blur-xl bg-slate-950/70 border border-white/10 rounded-2xl shadow-xl transition-all duration-300',
          interactive && 'cursor-pointer transform hover:-translate-y-1',
          glowClasses[glowColor],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
