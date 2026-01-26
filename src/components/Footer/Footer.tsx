'use client';

import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import Link from "next/link";

export function Footer() {
    const t = useTranslations('footer');
    const locale = useLocale();

    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-slate-200/70 dark:border-zinc-800 mt-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
            <div className="grid md:grid-cols-2 gap-10 text-center md:text-left items-start">

              {/* Coluna */}
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-zinc-200">{t('navigation')}</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li><a href="#about" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300">{t('about')}</a></li>
                  <li><a href="#experience" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300">{t('experience')}</a></li>
                  <li><a href="#projects" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300">{t('projects')}</a></li>
                  <li><a href="#contact" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300">{t('contact')}</a></li>
                </ul>
              </div>

              {/* Coluna */}
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-zinc-200">{t('connect')}</h4>
                <div className="flex justify-center md:justify-start items-center gap-4 mt-2">
                  <a href="https://github.com/Frombull" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                    className="text-slate-600 hover:text-indigo-700 dark:text-zinc-400 dark:hover:text-indigo-300 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="text-slate-600 hover:text-indigo-700 dark:text-zinc-400 dark:hover:text-indigo-300 transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Line */}
            <div className="mt-10 pt-6 border-t border-slate-200/70 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center text-sm">
              <p className="text-slate-600 dark:text-zinc-400 text-center sm:text-left mb-4 sm:mb-0">
                {t('developedWith')} <br/>
              </p>

              <div className="flex gap-4">
                <Link
                  href="https://github.com/Frombull/site-feliz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  {t('sourceCode')}
                </Link>

                <Link href={`/${locale}/privacy-policy`} 
                  className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  aria-label={t('privacyPolicy')}
                >
                  {t('privacyPolicy')}
                </Link>

                <Link href={`/${locale}/terms-of-service`} 
                  className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  aria-label={t('termsOfService')}
                >
                  {t('termsOfService')}
                </Link>

                <Link href={`/${locale}/cookies-policy`} 
                  className="text-slate-600 dark:text-zinc-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  aria-label={t('cookiesPolicy')}
                >
                  {t('cookiesPolicy')}
                </Link>
              </div>
            </div>
          </div>
        </footer>
    );
}