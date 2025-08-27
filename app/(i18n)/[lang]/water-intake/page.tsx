import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import WaterIntakeClient from '@/lib/clients/WaterIntakeClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Water Intake Calculator – ${year}`,
    description: `Estimate daily water needs from body weight and exercise time.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/water-intake` }
  };
}

export default function WaterIntakePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Water Intake Calculator</h1>
      <WaterIntakeClient lang={lang} />
    </div>
  );
}

