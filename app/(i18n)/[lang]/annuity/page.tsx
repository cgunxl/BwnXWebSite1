import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import AnnuityClient from '@/lib/clients/AnnuityClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'annuityCalc')} – ${year}`,
    description: 'Present and future value of ordinary annuities and annuities due.',
    alternates: { canonical: `${origin}${basePath}/${lang}/annuity` }
  };
}

export default function AnnuityPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'annuityCalc')}</h1>
      <AnnuityClient lang={lang} />
      <FaqHowToClient lang={lang} slug="annuity" />
    </div>
  );
}

