import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import SubscriptionRevenueClient from '@/lib/clients/SubscriptionRevenueClient';
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
  const url = `${origin}${basePath}/${lang}/subscription-revenue`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/subscription-revenue`])
  );
  languages['x-default'] = `${origin}${basePath}/en/subscription-revenue`;
  return {
    title: `${t(lang, 'subscriptionRevenueCalc')} – ${year}`,
    description: `Compute MRR and ARR from active subscribers, price, and discounts.`,
    alternates: { canonical: url, languages }
  };
}

export default function SubscriptionRevenuePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'subscriptionRevenueCalc')}</h1>
      <SubscriptionRevenueClient lang={lang} />
      <FaqHowToClient lang={lang} slug="subscription-revenue" />
    </div>
  );
}

