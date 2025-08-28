import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import ConceptionClient from '@/lib/clients/ConceptionClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Conception Date Calculator – ${year}`,
    description: `Estimate conception date from due date (EDD).`,
    alternates: { canonical: `${origin}${basePath}/${lang}/conception` }
  };
}

export default function ConceptionPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Conception Date Calculator</h1>
      <ConceptionClient lang={lang} />
      <FaqHowToClient lang={lang} slug="conception" />
    </div>
  );
}

