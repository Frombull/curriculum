'use client';

import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';

type ProvidersProps = {
    children: React.ReactNode;
    messages: AbstractIntlMessages;
    locale: string;
};

export default function Providers({ children, messages, locale }: ProvidersProps) {
    return (
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="America/Sao_Paulo">
            {children}
        </NextIntlClientProvider>
    );
} 