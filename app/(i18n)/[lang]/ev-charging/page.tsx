import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import EvChargingClient from '@/lib/clients/EvChargingClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'evChargingCalc')} – ${year}`,
    description: `EV charging time and cost from battery size, charger power, and efficiency.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/ev-charging` }
  };
}

export default function EvChargingPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'evChargingCalc')}</h1>
      <EvChargingClient lang={lang} />
      <FaqHowToClient lang={lang} slug="ev-charging" />
    </div>
  );
}

