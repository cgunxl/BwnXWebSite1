import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import SolarPanelClient from '@/lib/clients/SolarPanelClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'solarPanelCalc')} – ${year}`,
    description: `Estimate number of solar panels and system size to offset your usage.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/solar-panel` }
  };
}

export default function SolarPanelPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'solarPanelCalc')}</h1>
      <SolarPanelClient lang={lang} />
      <FaqHowToClient lang={lang} slug="solar-panel" />
    </div>
  );
}

