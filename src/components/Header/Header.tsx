'use client';

import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { Moon, Sun } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function Header() {
  const locale = useLocale();
  const [darkMode, setDarkMode] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDarkMode = savedTheme === 'dark' || (!savedTheme && systemDark);
    const root = document.documentElement;

    root.classList.toggle('dark', shouldUseDarkMode);
    root.dataset.theme = shouldUseDarkMode ? 'dark' : 'light';
    root.style.colorScheme = shouldUseDarkMode ? 'dark' : 'light';
    root.style.backgroundColor = shouldUseDarkMode ? '#090a0f' : '#f7f8fb';
    setDarkMode(shouldUseDarkMode);
  }, [locale]);

  const toggleDarkMode = () => {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);
    document.documentElement.classList.toggle('dark', nextDarkMode);
    document.documentElement.dataset.theme = nextDarkMode ? 'dark' : 'light';
    document.documentElement.style.colorScheme = nextDarkMode ? 'dark' : 'light';
    document.documentElement.style.backgroundColor = nextDarkMode ? '#090a0f' : '#f7f8fb';
    localStorage.setItem('theme', nextDarkMode ? 'dark' : 'light');
  };

  return (
    <aside
      aria-label="Controles de aparência e idioma"
      className="fixed right-4 top-12 z-50 flex flex-col items-stretch overflow-visible rounded-2xl border border-slate-200/80 bg-white/85 shadow-[0_14px_40px_-22px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-[0_14px_44px_-20px_rgba(0,0,0,0.85)] md:right-6 md:top-16"
    >
      <button
        type="button"
        onClick={toggleDarkMode}
        className="group flex h-14 w-14 items-center justify-center rounded-t-2xl border-b border-slate-200/80 text-slate-600 transition-colors hover:bg-slate-100/70 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-indigo-300"
        aria-label={darkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
        title={darkMode ? 'Tema claro' : 'Tema escuro'}
      >
        {darkMode ? <Sun size={19} /> : <Moon size={19} />}
      </button>
      <LanguageSwitcher />
    </aside>
  );
}
