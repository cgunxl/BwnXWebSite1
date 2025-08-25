import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from './components/Header';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Finance Hub',
  description: 'High-CPC financial calculators with multilingual support and dark mode.',
  metadataBase: new URL('https://example.com')
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="page container fade-in">{children}</main>
        <footer className="container" style={{padding:'24px 0', color:'var(--muted)'}}>
          <div id="ad-bottom" className="ad-slot"></div>
          <p style={{marginTop:12}}>© {new Date().getFullYear()} Finance Hub</p>
        </footer>
      </body>
    </html>
  );
}

 
