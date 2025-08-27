import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import SipClient from '@/lib/clients/SipClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/sip`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/sip`])
  );
  languages['x-default'] = `${origin}${basePath}/en/sip`;
  return {
    title: `SIP Calculator – ${year}`,
    description: `Systematic Investment Plan future value and wealth gain.`,
    alternates: { canonical: url, languages }
  };
}

export default function SipPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>SIP Calculator (India)</h1>
      <SipClient lang={lang} />
    </div>
  );
}

