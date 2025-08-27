import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import OvertimeClient from '@/lib/clients/OvertimeClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Overtime Pay Calculator – ${year}`,
    description: `Compute overtime pay with an OT multiplier and total weekly pay.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/overtime` }
  };
}

export default function OvertimePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Overtime Pay Calculator</h1>
      <OvertimeClient lang={lang} />
    </div>
  );
}

