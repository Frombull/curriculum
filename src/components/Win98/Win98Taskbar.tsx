'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { NotepadIcon, Win98FlagIcon } from './Win98Icons';

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark');
}

function getServerThemeSnapshot() {
  return false;
}

function toggleThemeDom(nextDark: boolean) {
  const root = document.documentElement;
  if (nextDark) {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
    root.style.backgroundColor = '#132626';
    root.style.color = '#e0e0e0';
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
    root.style.backgroundColor = '#008080';
    root.style.color = '#000000';
    localStorage.setItem('theme', 'light');
  }
}

export function Win98Taskbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const tFooter = useTranslations('footer');
  const tHome = useTranslations('HomePage');

  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const [startOpen, setStartOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('12:00');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString(locale === 'pt' ? 'pt-BR' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateClock();
    const id = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(id);
  }, [locale]);

  useEffect(() => {
    if (!startOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [startOpen]);

  const handleToggleLocale = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt';
    router.replace(pathname, { locale: nextLocale, scroll: false });
  };

  const handleTaskbarWindowClick = () => {
    if (pathname !== '/') {
      router.push('/');
      return;
    }
    window.dispatchEvent(new CustomEvent('win98-toggle-minimize'));
  };

  const isPt = locale === 'pt';

  return (
    <div ref={menuRef} className="no-print fixed bottom-0 left-0 right-0 z-50">
      {/* Start Menu Popup */}
      {startOpen && (
        <div className="win98-outset absolute bottom-9 left-0.5 w-64 flex shadow-xl z-50">
          {/* Vertical Sidebar */}
          <div className="w-7 bg-[#000080] dark:bg-[#1b365d] text-white flex items-end justify-center pb-2 select-none">
            <span
              className="font-win98 text-xs font-bold tracking-wider whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              MarcoOS <span className="font-normal opacity-80">98</span>
            </span>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-1 text-xs font-win98">
            <Link
              href="/"
              onClick={() => setStartOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white"
            >
              <NotepadIcon className="w-4 h-4" />
              <span>Marco_Di_Toro_CV.md</span>
            </Link>

            <a
              href="/CV_Marco_Di_Toro.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setStartOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white"
            >
              <span className="w-4 text-center">📄</span>
              <span>{tHome('contactSection.downloadButton')} (PDF)</span>
            </a>

            <div className="border-t border-[var(--win-border-dark)] border-b border-b-[var(--win-border-light)] my-1" />

            <a
              href="https://github.com/Frombull"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setStartOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white"
            >
              <span className="w-4 text-center">💻</span>
              <span>GitHub (Frombull)</span>
            </a>

            <a
              href="https://linkedin.com/in/marcoditoro/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setStartOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white"
            >
              <span className="w-4 text-center">🔗</span>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/Frombull/site-feliz"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setStartOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#000080] hover:text-white"
            >
              <span className="w-4 text-center">📦</span>
              <span>{tFooter('sourceCode')}</span>
            </a>

            <div className="border-t border-[var(--win-border-dark)] border-b border-b-[var(--win-border-light)] my-1" />

            <Link
              href="/privacy-policy"
              onClick={() => setStartOpen(false)}
              className="flex items-center gap-2 px-3 py-1 hover:bg-[#000080] hover:text-white"
            >
              <span className="w-4 text-center">🔒</span>
              <span>{tFooter('privacyPolicy')}</span>
            </Link>
            <Link
              href="/terms-of-service"
              onClick={() => setStartOpen(false)}
              className="flex items-center gap-2 px-3 py-1 hover:bg-[#000080] hover:text-white"
            >
              <span className="w-4 text-center">📜</span>
              <span>{tFooter('termsOfService')}</span>
            </Link>
            <Link
              href="/cookies-policy"
              onClick={() => setStartOpen(false)}
              className="flex items-center gap-2 px-3 py-1 hover:bg-[#000080] hover:text-white"
            >
              <span className="w-4 text-center">🍪</span>
              <span>{tFooter('cookiesPolicy')}</span>
            </Link>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <footer className="win98-outset h-9 px-1 flex items-center justify-between gap-1.5 select-none">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => setStartOpen((v) => !v)}
            className={`win98-btn px-2 h-7 flex items-center gap-1.5 font-win98 text-xs font-bold shrink-0 ${
              startOpen ? 'win98-btn-active' : ''
            }`}
          >
            <Win98FlagIcon className="w-4 h-4" />
            <span>{isPt ? 'Iniciar' : 'Start'}</span>
          </button>

          <div className="h-6 w-[2px] border-l border-[var(--win-border-dark)] border-r border-[var(--win-border-light)] mx-0.5" />

          <button
            type="button"
            onClick={handleTaskbarWindowClick}
            className="win98-btn px-2.5 h-7 flex items-center gap-1.5 font-win98 text-xs max-w-[240px] truncate"
            title="Marco_Di_Toro_CV.md - Notepad++"
          >
            <NotepadIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate font-bold">Marco_Di_Toro_CV.md - Notepad++</span>
          </button>
        </div>

        {/* System Tray */}
        <div className="win98-inset-gray h-7 px-1.5 flex items-center gap-1.5 text-[11px] font-win98 shrink-0">
          <button
            type="button"
            onClick={handleToggleLocale}
            title={isPt ? 'Switch to English' : 'Mudar para Português'}
            className="win98-btn px-1.5 h-5 text-[10px] font-bold uppercase"
          >
            {locale.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={() => toggleThemeDom(!isDark)}
            title={isDark ? 'Classic Win98 Light' : 'Notepad++ Dark'}
            className="win98-btn px-1.5 h-5 text-[10px] font-bold"
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <span className="px-1 font-npp text-[11px]" suppressHydrationWarning>
            {timeStr}
          </span>
        </div>
      </footer>
    </div>
  );
}
