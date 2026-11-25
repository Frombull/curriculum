'use client';

import { Win98LegalLayout } from '@/components/Win98/Win98Window';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
  const t = useTranslations('PrivacyPolicy');

  return (
    <Win98LegalLayout title={t('title')}>
      <p>{t('introduction')}</p>

      <h2 className="font-bold pt-2">{t('informationWeCollect.title')}</h2>
      <p>{t('informationWeCollect.p1')}</p>

      <h2 className="font-bold pt-2">{t('howWeUseYourInformation.title')}</h2>
      <p>{t('howWeUseYourInformation.p1')}</p>

      <h2 className="font-bold pt-2">{t('cookies.title')}</h2>
      <p>{t('cookies.p1')}</p>

      <h2 className="font-bold pt-2">{t('thirdPartyServices.title')}</h2>
      <p>{t('thirdPartyServices.p1')}</p>

      <h2 className="font-bold pt-2">{t('security.title')}</h2>
      <p>{t('security.p1')}</p>

      <h2 className="font-bold pt-2">{t('changesToThisPolicy.title')}</h2>
      <p>{t('changesToThisPolicy.p1')}</p>

      <h2 className="font-bold pt-2">{t('contactUs.title')}</h2>
      <p>{t('contactUs.p1')}</p>
    </Win98LegalLayout>
  );
}
