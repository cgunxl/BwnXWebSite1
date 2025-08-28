import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import CountdownClient from '@/lib/clients/CountdownClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Countdown Timer – ${year}`,
    description: `Live countdown to a target date and time.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/countdown` }
  };
}

export default function CountdownPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Countdown Timer</h1>
      <CountdownClient lang={lang} />
      <FaqHowToClient lang={lang} slug="countdown" />
    </div>
  );
}

