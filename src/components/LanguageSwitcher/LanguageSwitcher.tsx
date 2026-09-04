'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

const locales = [
  {
    code: 'en',
    label: 'English',
    flag: '/flags/flag_us.svg'
  },
  {
    code: 'pt',
    label: 'Português',
    flag: '/flags/flag_br.svg'
  }
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const current = locales.find(l => l.code === locale);

  const handleChangeLocale = (newLocale: string) => {
    const root = document.documentElement;
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';

    localStorage.setItem('theme', currentTheme);
    setOpen(false);
    router.replace(pathname, { locale: newLocale });

    requestAnimationFrame(() => {
      root.classList.toggle('dark', currentTheme === 'dark');
      root.style.colorScheme = currentTheme;
    });
  };

  return (
    <div className="relative z-50 inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-b-2xl text-slate-600 transition-colors hover:bg-slate-100/70 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-indigo-300"
        aria-label={`Alterar idioma. Idioma atual: ${current?.label}`}
        aria-expanded={open}
      >
        {current?.flag && (
          <Image
            src={current.flag}
            alt={`${current.code} flag`}
            width={20}
            height={20}
            className="rounded-sm shadow-sm"
          />
        )}
      </button>

      {open && (
        <div className="absolute right-[calc(100%+0.65rem)] top-0 w-44 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/95">
          <div>
            {locales.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => handleChangeLocale(code)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  code === locale
                    ? 'bg-indigo-50 font-semibold text-indigo-900 dark:bg-indigo-500/10 dark:text-indigo-200'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-white/5'
                }`}
              >
                <Image
                  src={flag}
                  alt={`${code} flag`}
                  width={20}
                  height={20}
                  className="rounded-sm shadow-sm"
                />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
