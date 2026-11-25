import './globals.css';

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const shouldDark = stored === 'dark';
    const root = document.documentElement;
    if (shouldDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      root.style.backgroundColor = '#132626';
      root.style.color = '#e0e0e0';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      root.style.backgroundColor = '#008080';
      root.style.color = '#000000';
    }
    root.classList.add('theme-ready');
  } catch (_) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#008080" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#132626" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/profile_picture.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
