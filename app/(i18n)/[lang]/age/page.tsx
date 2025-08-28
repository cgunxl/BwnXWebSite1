import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import AgeClient from '@/lib/clients/AgeClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Age Calculator – ${year}`,
    description: `Find exact age in years, months, days, total days lived, and days to next birthday.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/age` }
  };
}

export default function AgePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Age Calculator</h1>
      <AgeClient lang={lang} />
      <FaqHowToClient lang={lang} slug="age" />
    </div>
  );
}

