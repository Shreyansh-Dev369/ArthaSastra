import type { Metadata, Viewport } from 'next';
import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#070a09',
};

export const metadata: Metadata = {
  title: 'ARTHAŚĀSTRA — Secure Dispatch Lab | IKS Cryptography & Statecraft',
  description:
    'An educational digital exhibition and interactive cryptography laboratory inspired by Kauṭilya’s Arthaśāstra. Explore classical ciphers, royal seal message authentication (HMAC-SHA-256), clearance policy enforcement, and cryptanalysis.',
  keywords: [
    'Arthashastra',
    'Kautilya',
    'Indian Knowledge Systems',
    'IKS',
    'Cryptography',
    'HMAC-SHA-256',
    'Caesar Cipher',
    'Vigenère Cipher',
    'Cryptanalysis',
    'Index of Coincidence',
    'Chi-Square Heuristic',
    'Information Security',
  ],
  authors: [{ name: 'Arthaśāstra IKS Research Lab' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('arthasastra-theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${cinzel.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-theme-canvas text-theme-primary min-h-screen selection:bg-theme-bronze selection:text-theme-canvas transition-colors duration-200`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
