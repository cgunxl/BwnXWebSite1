import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import MarkupClient from '@/lib/clients/MarkupClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Markup Calculator – ${year}`,
    description: `Compute price from cost and markup; see implied margin.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/markup` }
  };
}

export default function MarkupPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Markup Calculator</h1>
      <MarkupClient lang={lang} />
    </div>
  );
}

