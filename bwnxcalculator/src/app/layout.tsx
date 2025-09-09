import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bwnxcalculator.vercel.app'),
  title: 'BwnXCalculator',
  description: 'Multilingual calculator hub for finance, health, education, engineering, and lifestyle.',
  authors: [{ name: 'BwnXCalculator' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-waves`}>{children}</body>
    </html>
  );
}

