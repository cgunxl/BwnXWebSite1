import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Loan Calculator',
    template: '%s',
  },
  description: 'Ultra-fast international loan calculator with amortization and SEO-ready pages.',
  openGraph: {
    type: 'website',
    title: 'Loan Calculator',
    description: 'Ultra-fast international loan calculator with amortization and SEO-ready pages.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = cookies().get('NEXT_LOCALE')?.value || 'en';
  return (
    <html lang={lang}>
      <head>
        {/** Preconnects (commented) */}
        {/**
         * TODO: paste GA4 tag
         * <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
         * <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXX');` }} />
         */}
        {/**
         * TODO: paste Adsterra/Ezoic/Mediavine script
         * <script src="https://ad-network.example/tag.js" async></script>
         */}
      </head>
      <body>
        <div id="ad-slot" style={{ minHeight: 90 }} />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
