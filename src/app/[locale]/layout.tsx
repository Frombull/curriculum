import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { Header } from '@/components/Header/Header';
import '@/app/globals.css';
import { Metadata } from 'next';
import Providers from '@/components/Providers';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Marco Di Toro | Currículo',
  description: 'Técnico em Telecomunicações, Engenheiro de Software, desenvolvedor.',
  keywords: 'Marco Di Toro, Engenheiro de Software, Desenvolvedor Full-Stack, C#, Python, React, AWS, Inatel, WatchGuard Technologies',
  authors: [{ name: 'Marco Di Toro' }],
  creator: 'Marco Di Toro',
  publisher: 'Marco Di Toro',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    url: 'https://marcoditoro.com.br',
    title: 'Marco Di Toro',
    description: 'Currículo profissional de Marco Di Toro.',
    siteName: 'Marco Di Toro',
    images: [
      {
        url: '/profile_picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Marco Di Toro',
      },
    ],
  },
  verification: {
    google: '----------',
  },
  alternates: {
    canonical: 'https://marcoditoro.com.br',
    languages: {
      'pt-BR': 'https://marcoditoro.com.br/pt',
      'en-US': 'https://marcoditoro.com.br/en',
    },
  },
};
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming "locale" is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
 
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = stored === 'dark' || (!stored && prefersDark);
    const root = document.documentElement;
    if (shouldDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      root.style.backgroundColor = '#09090b';
      root.style.color = '#fafafa';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      root.style.backgroundColor = '#f8fafc';
      root.style.color = '#0f172a';
    }
    root.classList.add('theme-ready');
  } catch (_) {}
})();`
          }}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#4f46e5" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#09090b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/profile_picture.png" />
      </head>
      <body>
        <Providers messages={messages} locale={locale}>
          <Header />
          <main role="main" id="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}