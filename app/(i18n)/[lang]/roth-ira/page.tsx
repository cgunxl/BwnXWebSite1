import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import RothIraClient from '@/lib/clients/RothIraClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Roth IRA Calculator – ${year}`,
    description: `Project Roth IRA balance based on annual contributions and growth.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/roth-ira` }
  };
}

export default function RothIraPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Roth IRA Calculator</h1>
      <RothIraClient lang={lang} />
      <FaqHowToClient lang={lang} slug="roth-ira" />
    </div>
  );
}

