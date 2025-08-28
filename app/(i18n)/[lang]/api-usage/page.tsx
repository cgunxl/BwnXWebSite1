import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import ApiUsageClient from '@/lib/clients/ApiUsageClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `API Usage Calculator – ${year}`,
    description: `Estimate costs for API requests and compute time given pricing and latency.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/api-usage` }
  };
}

export default function ApiUsagePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>API Usage Calculator</h1>
      <ApiUsageClient lang={lang} />
      <FaqHowToClient lang={lang} slug="api-usage" />
    </div>
  );
}

