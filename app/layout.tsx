import './globals.css';
import type { Metadata } from 'next';
import HeaderClient from '@/lib/HeaderClient';
import { getAllLocales } from '@/lib/i18n';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const siteUrl = new URL(basePath || '/', origin).toString().replace(/\/$/, '');

  const languages = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}`])
  );

  const ogImage = `${origin}${basePath}/og.png`;

  return {
    metadataBase: new URL(origin),
    title: 'Finance Hub',
    description: 'Multi-language finance calculators for loans, mortgages, taxes, and insurance.',
    alternates: {
      canonical: siteUrl,
      languages
    },
    openGraph: {
      type: 'website',
      url: siteUrl,
      siteName: 'Finance Hub',
      title: 'Finance Hub',
      description: 'Multi-language finance calculators for loans, mortgages, taxes, and insurance.',
      images: [ogImage]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Finance Hub',
      description: 'Multi-language finance calculators for loans, mortgages, taxes, and insurance.',
      images: [ogImage]
    },
    icons: {
      icon: `${basePath}/icon.svg`,
      apple: `${basePath}/icon.svg`,
      other: [
        { rel: 'manifest', url: `${basePath}/manifest.webmanifest` }
      ]
    },
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#0b1020' }
    ]
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only skip-link">Skip to content</a>
        <HeaderClient />
        {/* Ad Slot Top */}
        <div id="ad-top" style={{minHeight:'90px'}}></div>
        {/* TODO: paste your ad script here */}
        {/* Google Analytics */}
        {/* TODO: paste GA4 script here */}
        <main id="main" className="container" role="main">
          {children}
        </main>
        {/* Ad Slot Bottom */}
        <div id="ad-bottom" style={{minHeight:'90px'}}></div>
      </body>
    </html>
  );
}

 
