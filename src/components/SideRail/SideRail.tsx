'use client';

import { useEffect, useRef } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export function SideRail() {
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadAnime = async () => {
      const { animate } = await import('animejs');
      if (!railRef.current) return;
      animate(railRef.current, {
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo',
        delay: 200,
      });
    };
    loadAnime();
  }, []);

  return (
    <aside
      ref={railRef}
      aria-label="Site controls"
      style={{ opacity: 0 }}
      className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 md:bottom-auto md:left-4 lg:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 flex flex-row md:flex-col items-center gap-2 p-1.5 rounded-[2px] border border-slate-200/80 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md shadow-sm"
    >
      <ThemeToggle start="bottom-left" />
      <div className="h-5 w-px md:h-px md:w-5 bg-slate-200 dark:bg-zinc-800" aria-hidden="true" />
      <LanguageSwitcher />
    </aside>
  );
}
