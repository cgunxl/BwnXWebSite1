import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import LeaseClient from '@/lib/clients/LeaseClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Lease Calculator – ${year}`,
    description: `Estimate monthly lease payment from cap cost, residual, money factor and fees.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/lease` }
  };
}

export default function LeasePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Lease Calculator</h1>
      <LeaseClient lang={lang} />
    </div>
  );
}

