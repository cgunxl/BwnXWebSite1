import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import BacClient from '@/lib/clients/BacClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `BAC Calculator – ${year}`,
    description: `Approximate blood alcohol concentration using Widmark formula.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/bac` }
  };
}

export default function BacPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>BAC Calculator</h1>
      <BacClient lang={lang} />
    </div>
  );
}

