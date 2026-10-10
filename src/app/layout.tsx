import type { Metadata, Viewport } from 'next';
import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
  themeColor: '#080d0c',
};

export const metadata: Metadata = {
  title: 'ARTHAŚĀSTRA — Secure Dispatch Lab | IKS Cryptography & Statecraft',
  description:
    'An educational digital exhibition and cryptography laboratory inspired by Kauṭilya’s Arthaśāstra. Explore classical ciphers, royal seal message authentication (HMAC-SHA-256), clearance policy enforcement, and cryptanalysis.',
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
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-obsidian-950 text-ivory-100 min-h-screen selection:bg-bronze-500 selection:text-obsidian-950`}
      >
        {children}
      </body>
    </html>
  );
}
