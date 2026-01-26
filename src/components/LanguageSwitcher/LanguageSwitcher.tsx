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
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-zinc-200 bg-white dark:bg-zinc-950 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-md transition-colors hover:cursor-pointer shadow-sm border border-slate-200/70 dark:border-zinc-800"
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
        <span className="uppercase">{current?.code}</span>
        <svg
          className={`w-4 h-4 ml-1 transform transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white dark:bg-zinc-950 ring-1 ring-black/5 border border-slate-200/70 dark:border-zinc-800">
          <div className="py-1">
            {locales.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => handleChangeLocale(code)}
                className={`flex items-center gap-2 px-4 py-2 w-full text-left text-sm ${
                  code === locale
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 font-semibold text-indigo-900 dark:text-indigo-200'
                    : 'text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900'
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
