import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import ExponentLogClient from '@/lib/clients/ExponentLogClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Exponent Calculator – ${year}`,
    description: `Compute a^x for given base and exponent.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/exponent` }
  };
}

export default function ExponentPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Exponent Calculator</h1>
      <ExponentLogClient lang={lang} mode="exponent" />
      <FaqHowToClient lang={lang} slug="exponent" />
    </div>
  );
}

