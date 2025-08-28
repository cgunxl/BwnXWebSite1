import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import DtiClient from '@/lib/clients/DtiClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'dtiCalc')} – ${year}`,
    description: `Debt-to-Income ratio (DTI) calculator with category guidance.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/dti` }
  };
}

export default function DtiPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'dtiCalc')}</h1>
      <DtiClient lang={lang} />
      <FaqHowToClient lang={lang} slug="dti" />
    </div>
  );
}

