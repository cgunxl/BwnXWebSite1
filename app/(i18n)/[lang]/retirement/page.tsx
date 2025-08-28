import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import RetirementClient from '@/lib/clients/RetirementClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Retirement Calculator – ${year}`,
    description: `Project retirement savings with monthly contributions, expected return, inflation, and withdrawal rate.`
    ,alternates: { canonical: `${origin}${basePath}/${lang}/retirement` }
  };
}

export default function RetirementPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Retirement Calculator</h1>
      <RetirementClient lang={lang} />
      <FaqHowToClient lang={lang} slug="retirement" />
    </div>
  );
}

