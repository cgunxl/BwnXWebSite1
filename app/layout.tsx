import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BwnXCalculator - 430 Calculators in 17 Languages',
  description: 'Comprehensive calculator hub for finance, health, education, engineering, and more. Available in 17 languages with 430 specialized calculators.',
  keywords: 'calculator, finance, health, education, math, free, online, multilingual',
  authors: [{ name: 'BwnXCalculator Team' }],
  creator: 'BwnXCalculator',
  publisher: 'BwnXCalculator',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bwnxcalculator.com',
    title: 'BwnXCalculator - 430 Calculators in 17 Languages',
    description: 'Comprehensive calculator hub for finance, health, education, engineering, and more.',
    siteName: 'BwnXCalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BwnXCalculator - 430 Calculators in 17 Languages',
    description: 'Comprehensive calculator hub for finance, health, education, engineering, and more.',
    creator: '@bwnxcalculator',
  },
  alternates: {
    canonical: 'https://bwnxcalculator.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-bg-deep">
          {children}
        </div>
      </body>
    </html>
  );
}