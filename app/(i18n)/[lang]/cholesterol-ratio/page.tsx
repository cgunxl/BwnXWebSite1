import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import CholesterolRatioClient from '@/lib/clients/CholesterolRatioClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Cholesterol Ratio Calculator – ${year}`,
    description: `Compute Total/HDL ratio (for education; consult clinicians for guidance).`,
    alternates: { canonical: `${origin}${basePath}/${lang}/cholesterol-ratio` }
  };
}

export default function CholesterolRatioPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Cholesterol Ratio Calculator</h1>
      <CholesterolRatioClient lang={lang} />
    </div>
  );
}

