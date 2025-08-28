import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import WebsiteBandwidthClient from '@/lib/clients/WebsiteBandwidthClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Website Bandwidth Calculator – ${year}`,
    description: `Estimate monthly transfer and recommended bandwidth from traffic and page weight.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/website-bandwidth` }
  };
}

export default function WebsiteBandwidthPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Website Bandwidth Calculator</h1>
      <WebsiteBandwidthClient lang={lang} />
      <FaqHowToClient lang={lang} slug="website-bandwidth" />
    </div>
  );
}

