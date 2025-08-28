import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import FreelancerRateClient from '@/lib/clients/FreelancerRateClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Freelancer Rate Calculator – ${year}`,
    description: `Calculate suggested hourly rate from target net income, taxes, and overhead.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/freelancer-rate` }
  };
}

export default function FreelancerRatePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Freelancer Rate Calculator</h1>
      <FreelancerRateClient lang={lang} />
    </div>
  );
}

