import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Plan401kClient from '@/lib/clients/Plan401kClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `401k Calculator – ${year}`,
    description: `Project 401(k) growth with employee contribution and employer match.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/401k` }
  };
}

export default function K401Page({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>401(k) Calculator</h1>
      <Plan401kClient lang={lang} />
      <FaqHowToClient lang={lang} slug="401k" />
    </div>
  );
}

