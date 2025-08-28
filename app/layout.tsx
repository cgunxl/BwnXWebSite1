import './globals.css';
import type { Metadata, Viewport } from 'next';
import HeaderClient from '@/lib/HeaderClient';
import { getAllLocales } from '@/lib/i18n';
import FooterClient from '@/lib/FooterClient';
import ConsentBannerClient from '@/lib/ConsentBannerClient';
import Analytics from '@/lib/Analytics';
import AdsClient from '@/lib/AdsClient';
import { Suspense } from 'react';

export const revalidate = 86400;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1020' }
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const siteUrl = new URL(basePath || '/', origin).toString().replace(/\/$/, '');

  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}`])
  );
  languages['x-default'] = `${origin}${basePath}/en`;

  const ogImage = `${origin}${basePath}/og.png`;

  return {
    metadataBase: new URL(origin),
    title: 'BwnX Free Calculator',
    description: 'Beautiful, fast calculators for finance, health, science, and more in 17 languages.',
    alternates: {
      canonical: siteUrl,
      languages
    },
    openGraph: {
      type: 'website',
      url: siteUrl,
      siteName: 'BwnX Free Calculator',
      title: 'BwnX Free Calculator',
      description: 'Beautiful, fast calculators for finance, health, science, and more in 17 languages.',
      images: [ogImage]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'BwnX Free Calculator',
      description: 'Beautiful, fast calculators for finance, health, science, and more in 17 languages.',
      images: [ogImage]
    },
    icons: {
      icon: `${basePath}/icon.svg`,
      apple: `${basePath}/icon.svg`,
      other: [
        { rel: 'manifest', url: `${basePath}/manifest.webmanifest` }
      ]
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const siteUrl = new URL(basePath || '/', origin).toString().replace(/\/$/, '');

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <a href="#main" className="sr-only skip-link">Skip to content</a>
        <HeaderClient />
        {/* Ad Slot Top */}
        <div id="ad-top" style={{minHeight:'90px'}}></div>
        <Suspense fallback={null}>
          <ConsentBannerClient />
          <Analytics />
          <AdsClient />
        </Suspense>
        <main id="main" className="container" role="main">
          {children}
        </main>
        {/* Ad Slot Bottom */}
        <div id="ad-bottom" style={{minHeight:'90px'}}></div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'BwnX Free Calculator',
            url: siteUrl,
            inLanguage: getAllLocales().join(',')
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'BwnX Free Calculator',
            url: siteUrl
          }) }}
        />
        <FooterClient />
      </body>
    </html>
  );
}

 
