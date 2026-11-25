'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const LOCALES = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex flex-row md:flex-col items-center gap-1 p-0.5 rounded-[2px] bg-slate-100/80 dark:bg-zinc-900/80"
    >
      {LOCALES.map(({ code, label }) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleChangeLocale(code)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`w-9 h-9 flex items-center justify-center rounded-[2px] font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              active
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100'
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
