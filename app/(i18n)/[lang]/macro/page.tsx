import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import MacroClient from '@/lib/clients/MacroClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Macro Calculator – ${year}`,
    description: `Split daily calories into protein, fat, and carbs grams.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/macro` }
  };
}

export default function MacroPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Macro Calculator</h1>
      <MacroClient lang={lang} />
    </div>
  );
}

