import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import BmiClient from '@/lib/clients/BmiClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `BMI Calculator – ${year}`,
    description: `Body Mass Index (BMI) calculator based on WHO categories.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/bmi` }
  };
}

export default function BmiPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>BMI Calculator</h1>
      <BmiClient lang={lang} />
    </div>
  );
}

