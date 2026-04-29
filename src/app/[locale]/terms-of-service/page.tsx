'use client';

import { useTranslations } from 'next-intl';

export default function TermsOfServicePage() {
  const t = useTranslations('TermsOfService');

  return (
    <div className="relative bg-slate-50 dark:bg-zinc-950 min-h-screen font-sans pt-20">
      <div
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.15] dark:opacity-[0.3] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>
      <main className="relative z-10 container mx-auto p-4 md:px-8">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2px] border border-slate-200/70 dark:border-zinc-800 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-zinc-50 mb-6">{t('title')}</h1>
          
          <div className="space-y-4 text-slate-700 dark:text-zinc-300">
            <p>{t('introduction')}</p>
            
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-50 pt-4">{t('useOfWebsite.title')}</h2>
            <p>{t('useOfWebsite.p1')}</p>
            
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-50 pt-4">{t('intellectualProperty.title')}</h2>
            <p>{t('intellectualProperty.p1')}</p>
            
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-50 pt-4">{t('disclaimer.title')}</h2>
            <p>{t('disclaimer.p1')}</p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-50 pt-4">{t('limitationOfLiability.title')}</h2>
            <p>{t('limitationOfLiability.p1')}</p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-50 pt-4">{t('governingLaw.title')}</h2>
            <p>{t('governingLaw.p1')}</p>
            
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-50 pt-4">{t('changesToTheseTerms.title')}</h2>
            <p>{t('changesToTheseTerms.p1')}</p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-50 pt-4">{t('contactUs.title')}</h2>
            <p>{t('contactUs.p1')}</p>
          </div>
        </div>
      </main>
    </div>
  );
} 