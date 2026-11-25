'use client';

import { Win98LegalLayout } from '@/components/Win98/Win98Window';
import { useTranslations } from 'next-intl';

export default function CookiesPolicyPage() {
  const t = useTranslations('CookiesPolicy');

  return (
    <Win98LegalLayout title={t('title')}>
      <p>{t('introduction')}</p>

      <h2 className="font-bold pt-2">{t('whatAreCookies.title')}</h2>
      <p>{t('whatAreCookies.p1')}</p>

      <h2 className="font-bold pt-2">{t('howWeUseCookies.title')}</h2>
      <p>{t('howWeUseCookies.p1')}</p>

      <h2 className="font-bold pt-2">{t('managingCookies.title')}</h2>
      <p>{t('managingCookies.p1')}</p>

      <h2 className="font-bold pt-2">{t('changesToThisPolicy.title')}</h2>
      <p>{t('changesToThisPolicy.p1')}</p>

      <h2 className="font-bold pt-2">{t('contactUs.title')}</h2>
      <p>{t('contactUs.p1')}</p>
    </Win98LegalLayout>
  );
}
