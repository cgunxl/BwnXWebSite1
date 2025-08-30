import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { i18n, localeNames, localeFlags } from '@/lib/i18n/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://calculatorhub.com'),
  title: {
    default: 'Calculator Hub - 430+ Free Online Calculators',
    template: '%s | Calculator Hub',
  },
  description: 'Access 430+ free online calculators for finance, health, education, engineering, and more. Available in 17 languages with country-specific calculations.',
  keywords: ['calculator', 'online calculator', 'free calculator', 'financial calculator', 'health calculator', 'BMI calculator', 'loan calculator', 'mortgage calculator'],
  authors: [{ name: 'Calculator Hub' }],
  creator: 'Calculator Hub',
  publisher: 'Calculator Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Calculator Hub - 430+ Free Online Calculators',
    description: 'Access 430+ free online calculators for finance, health, education, engineering, and more.',
    url: 'https://calculatorhub.com',
    siteName: 'Calculator Hub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculator Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator Hub - 430+ Free Online Calculators',
    description: 'Access 430+ free online calculators for finance, health, education, engineering, and more.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://calculatorhub.com',
    languages: Object.fromEntries(
      i18n.locales.map(locale => [
        locale,
        `https://calculatorhub.com/${locale}`
      ])
    ),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}