'use client';

import { Win98LegalLayout } from '@/components/Win98/Win98Window';
import { useTranslations } from 'next-intl';

export default function TermsOfServicePage() {
  const t = useTranslations('TermsOfService');

  return (
    <Win98LegalLayout title={t('title')}>
      <p>{t('introduction')}</p>

      <h2 className="font-bold pt-2">{t('useOfWebsite.title')}</h2>
      <p>{t('useOfWebsite.p1')}</p>

      <h2 className="font-bold pt-2">{t('intellectualProperty.title')}</h2>
      <p>{t('intellectualProperty.p1')}</p>

      <h2 className="font-bold pt-2">{t('disclaimer.title')}</h2>
      <p>{t('disclaimer.p1')}</p>

      <h2 className="font-bold pt-2">{t('limitationOfLiability.title')}</h2>
      <p>{t('limitationOfLiability.p1')}</p>

      <h2 className="font-bold pt-2">{t('governingLaw.title')}</h2>
      <p>{t('governingLaw.p1')}</p>

      <h2 className="font-bold pt-2">{t('changesToTheseTerms.title')}</h2>
      <p>{t('changesToTheseTerms.p1')}</p>

      <h2 className="font-bold pt-2">{t('contactUs.title')}</h2>
      <p>{t('contactUs.p1')}</p>
    </Win98LegalLayout>
  );
}
