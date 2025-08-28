import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import ROICalcClient from '@/lib/clients/ROICalcClient';
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
  const url = `${origin}${basePath}/${lang}/roi`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/roi`])
  );
  languages['x-default'] = `${origin}${basePath}/en/roi`;
  return {
    title: `ROI Calculator – ${year}`,
    description: `Compute Return on Investment and CAGR.`,
    alternates: { canonical: url, languages }
  };
}

export default function ROIPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>ROI Calculator</h1>
      <ROICalcClient lang={lang} />
      <FaqHowToClient lang={lang} slug="roi" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/stock-return`}>Stock Return</Link>
      </nav>
    </div>
  );
}

