import { hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Header } from '@/components/Header/Header';
import Providers from '@/components/Providers';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  const title = isEn ? 'Marco Di Toro | Resume' : 'Marco Di Toro | Currículo';
  const description = isEn
    ? 'Full-Stack Developer, Software Engineering student and Telecommunications Technician.'
    : 'Técnico em Telecomunicações, Engenheiro de Software, desenvolvedor.';
  const ogDescription = isEn
    ? 'Professional resume of Marco Di Toro.'
    : 'Currículo profissional de Marco Di Toro.';

  return {
    metadataBase: new URL('https://marcoditoro.com.br'),
    title,
    description,
    keywords:
      'Marco Di Toro, Engenheiro de Software, Software Engineer, Full-Stack Developer, TypeScript, React, Next.js, C#, Python, AWS, Inatel',
    authors: [{ name: 'Marco Di Toro' }],
    creator: 'Marco Di Toro',
    publisher: 'Marco Di Toro',
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_US' : 'pt_BR',
      alternateLocale: isEn ? 'pt_BR' : 'en_US',
      url: `https://marcoditoro.com.br/${locale}`,
      title: 'Marco Di Toro',
      description: ogDescription,
      siteName: 'Marco Di Toro',
      images: [
        {
          url: '/og',
          width: 1200,
          height: 630,
          alt: 'Marco Di Toro',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Marco Di Toro',
      description: ogDescription,
      images: ['/og'],
    },
    alternates: {
      canonical: `https://marcoditoro.com.br/${locale}`,
      languages: {
        'pt-BR': 'https://marcoditoro.com.br/pt',
        'en-US': 'https://marcoditoro.com.br/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
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
})();`,
          }}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#4f46e5" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#09090b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/profile_picture.jpg" />
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
