import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import DueDateClient from '@/lib/clients/DueDateClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Pregnancy Due Date Calculator – ${year}`,
    description: `Estimate due date (EDD) from LMP and cycle length.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/pregnancy-due-date` }
  };
}

export default function PregnancyDueDatePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Pregnancy Due Date Calculator</h1>
      <DueDateClient lang={lang} />
      <FaqHowToClient lang={lang} slug="pregnancy-due-date" />
    </div>
  );
}

