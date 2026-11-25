'use client';

import { useEffect, useRef } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export function SideRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let timerId: number | undefined;

    const runAnimation = async () => {
      const rail = railRef.current;
      const content = contentRef.current;
      if (!rail || !content) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        rail.style.opacity = '1';
        content.style.opacity = '1';
        return;
      }

      await new Promise<void>((resolve) => {
        timerId = window.setTimeout(resolve, 500);
      });
      if (cancelled) return;

      const { createTimeline } = await import('animejs');
      if (cancelled) return;

      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      const tl = createTimeline({
        defaults: { ease: 'outExpo' },
      });

      if (isDesktop) {
        const fullHeight = rail.scrollHeight;
        rail.style.height = '12px';

        tl.add(rail, {
          opacity: [0.4, 1],
          translateX: [-72, 0],
          duration: 380,
        })
          .add(rail, {
            height: [12, fullHeight],
            duration: 420,
            ease: 'outBack(1.1)',
            onComplete: () => {
              rail.style.height = '';
            },
          })
          .add(
            content,
            {
              opacity: [0, 1],
              duration: 280,
            },
            '-=260',
          );
      } else {
        const fullWidth = rail.scrollWidth;
        rail.style.width = '16px';

        tl.add(rail, {
          opacity: [0.4, 1],
          translateY: [32, 0],
          duration: 340,
        })
          .add(rail, {
            width: [16, fullWidth],
            duration: 400,
            ease: 'outBack(1.1)',
            onComplete: () => {
              rail.style.width = '';
            },
          })
          .add(
            content,
            {
              opacity: [0, 1],
              duration: 260,
            },
            '-=240',
          );
      }
    };

    runAnimation();
    return () => {
      cancelled = true;
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  return (
    <aside
      aria-label="Site controls"
      className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 md:bottom-auto md:left-4 lg:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
    >
      <div
        ref={railRef}
        style={{ opacity: 0 }}
        className="overflow-hidden rounded-[2px] border border-slate-300/80 dark:border-zinc-700/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-md"
      >
        <div
          ref={contentRef}
          style={{ opacity: 0 }}
          className="flex flex-row md:flex-col items-center gap-2 p-1.5"
        >
          <ThemeToggle start="bottom-left" />
          <div className="h-6 w-px md:h-px md:w-6 bg-slate-200 dark:bg-zinc-800" aria-hidden="true" />
          <LanguageSwitcher />
        </div>
      </div>
    </aside>
  );
}
