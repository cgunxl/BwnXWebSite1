import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import EmergencyFundClient from '@/lib/clients/EmergencyFundClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'emergencyFundCalc')} – ${year}`,
    description: `Calculate your emergency fund target and how long to reach it.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/emergency-fund` }
  };
}

export default function EmergencyFundPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'emergencyFundCalc')}</h1>
      <EmergencyFundClient lang={lang} />
      <FaqHowToClient lang={lang} slug="emergency-fund" />
    </div>
  );
}

