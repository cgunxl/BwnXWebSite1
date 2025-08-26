import './globals.css';
import type { Metadata } from 'next';
import HeaderClient from '@/lib/HeaderClient';

export const metadata: Metadata = {
  title: 'Finance Hub',
  description: 'Multi-language finance calculators for loans, mortgages, taxes, and insurance.'
};

export const revalidate = 86400;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HeaderClient />
        {/* Ad Slot Top */}
        <div id="ad-top" style={{minHeight:'90px'}}></div>
        {/* TODO: paste your ad script here */}
        {/* Google Analytics */}
        {/* TODO: paste GA4 script here */}
        <main className="container">
          {children}
        </main>
        {/* Ad Slot Bottom */}
        <div id="ad-bottom" style={{minHeight:'90px'}}></div>
      </body>
    </html>
  );
}

 
