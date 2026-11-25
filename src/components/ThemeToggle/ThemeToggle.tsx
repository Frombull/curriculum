'use client';
// Adapted from beui.dev/components/motion/theme-toggle

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

export type ThemeVariant = 'rectangle' | 'circle' | 'blinds';

export type RectStart =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'bottom-up';

const THEME_VARIANTS: ThemeVariant[] = ['rectangle', 'circle', 'blinds'];
const VT_STYLE_ID = 'beui-theme-toggle-vt';
const EASE_OUT_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)';

const VT_CSS = `
html[data-beui-vt] body {
  transition: none !important;
}
html[data-beui-vt="rectangle"]::view-transition-old(root) {
  animation: none;
  mix-blend-mode: normal;
}
html[data-beui-vt="rectangle"]::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: beui-rect-reveal 400ms ease-out;
}
html[data-beui-vt="circle"]::view-transition-old(root) {
  animation: none;
  mix-blend-mode: normal;
}
html[data-beui-vt="circle"]::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: beui-circle-reveal 700ms cubic-bezier(0.4, 0, 0.2, 1);
}
html[data-beui-vt="blinds"]::view-transition-old(root) {
  animation: none;
  mix-blend-mode: normal;
}
@property --beui-vt-slat {
  syntax: "<length>";
  inherits: false;
  initial-value: 72px;
}
html[data-beui-vt="blinds"]::view-transition-new(root) {
  mix-blend-mode: normal;
  mask-image: linear-gradient(
    90deg,
    #000 0 var(--beui-vt-slat),
    transparent calc(var(--beui-vt-slat) + 20px)
  );
  mask-size: 72px 100%;
  mask-repeat: repeat;
  animation: beui-blinds-reveal 700ms ${EASE_OUT_CSS};
}
@keyframes beui-rect-reveal {
  from { clip-path: var(--beui-vt-from, inset(100% 0 0 0)); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes beui-circle-reveal {
  from { clip-path: circle(0% at var(--beui-vt-origin, 50% 100%)); }
  to   { clip-path: circle(150% at var(--beui-vt-origin, 50% 100%)); }
}
@keyframes beui-blinds-reveal {
  from { --beui-vt-slat: -20px; }
  to   { --beui-vt-slat: 72px; }
}
`;

const RECT_FROM: Record<RectStart, string> = {
  'top-left': 'inset(0 100% 100% 0)',
  'top-right': 'inset(0 0 100% 100%)',
  'bottom-left': 'inset(100% 100% 0 0)',
  'bottom-right': 'inset(100% 0 0 100%)',
  center: 'inset(50% 50% 50% 50%)',
  'bottom-up': 'inset(100% 0 0 0)',
};

const CIRCLE_ORIGIN: Record<RectStart, string> = {
  'top-left': '0% 0%',
  'top-right': '100% 0%',
  'bottom-left': '0% 100%',
  'bottom-right': '100% 100%',
  center: '50% 50%',
  'bottom-up': '50% 100%',
};

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

function applyThemeToDom(nextDark: boolean) {
  const root = document.documentElement;
  if (nextDark) {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
    root.style.backgroundColor = '#09090b';
    root.style.color = '#fafafa';
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
    root.style.backgroundColor = '#f8fafc';
    root.style.color = '#0f172a';
    localStorage.setItem('theme', 'light');
  }
}

export function ThemeToggle({ start = 'top-right' }: { start?: RectStart }) {
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const [variantIndex, setVariantIndex] = useState(0);

  useEffect(() => {
    if (document.getElementById(VT_STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = VT_STYLE_ID;
    el.textContent = VT_CSS;
    document.head.appendChild(el);
  }, []);

  const toggle = () => {
    const nextDark = !isDark;
    const variant = THEME_VARIANTS[variantIndex];
    setVariantIndex((prev) => (prev + 1) % THEME_VARIANTS.length);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('startViewTransition' in document)) {
      applyThemeToDom(nextDark);
      return;
    }

    const root = document.documentElement;
    if (variant === 'rectangle') {
      root.style.setProperty('--beui-vt-from', RECT_FROM[start]);
      root.dataset.beuiVt = 'rectangle';
    } else if (variant === 'blinds') {
      root.dataset.beuiVt = 'blinds';
    } else {
      root.style.setProperty('--beui-vt-origin', CIRCLE_ORIGIN[start]);
      root.dataset.beuiVt = 'circle';
    }

    const vt = (
      document as Document & {
        startViewTransition(cb: () => void): { finished: Promise<void> };
      }
    ).startViewTransition(() => {
      flushSync(() => {
        applyThemeToDom(nextDark);
      });
    });

    vt.finished.finally(() => {
      delete root.dataset.beuiVt;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-[2px] text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors hover:cursor-pointer [&>svg]:fill-none"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
