import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Link from 'next/link';
import RentVsBuyClient from '@/lib/clients/RentVsBuyClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/rent-vs-buy`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/rent-vs-buy`])
  );
  languages['x-default'] = `${origin}${basePath}/en/rent-vs-buy`;
  return {
    title: `Rent vs Buy Calculator – ${year}`,
    description: `Compare renting vs buying including mortgage, property tax, maintenance, and closing costs.`,
    alternates: { canonical: url, languages }
  };
}

export default function RentVsBuyPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Rent vs Buy Calculator</h1>
      <RentVsBuyClient lang={lang} />
      <FaqHowToClient lang={lang} slug="rent-vs-buy" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/mortgage`}>Mortgage</Link>
        <Link className="button ghost" href={`/${lang}/property-tax`}>Property Tax</Link>
      </nav>
    </div>
  );
}

