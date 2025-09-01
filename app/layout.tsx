import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { i18n, localeNames, localeFlags } from '@/lib/i18n/config';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bwnxcalculator.com'),
  title: {
    default: 'BwnXCalculator - 430+ Free Online Calculators',
    template: '%s | BwnXCalculator',
  },
  description: 'Access 430+ free online calculators for finance, health, education, engineering, and more. Available in 17 languages with country-specific calculations.',
  keywords: ['calculator', 'online calculator', 'free calculator', 'financial calculator', 'health calculator', 'BMI calculator', 'loan calculator', 'mortgage calculator'],
  authors: [{ name: 'BwnXCalculator' }],
  creator: 'BwnXCalculator',
  publisher: 'BwnXCalculator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'BwnXCalculator - 430+ Free Online Calculators',
    description: 'Access 430+ free online calculators for finance, health, education, engineering, and more.',
    url: 'https://bwnxcalculator.com',
    siteName: 'BwnXCalculator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BwnXCalculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BwnXCalculator - 430+ Free Online Calculators',
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
    canonical: 'https://bwnxcalculator.com',
    languages: Object.fromEntries(
      i18n.locales.map(locale => [
        locale,
        `https://bwnxcalculator.com/${locale}`
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
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}