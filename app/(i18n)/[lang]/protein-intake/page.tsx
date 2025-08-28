import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Link from 'next/link';
import ProteinIntakeClient from '@/lib/clients/ProteinIntakeClient';
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
  const url = `${origin}${basePath}/${lang}/protein-intake`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/protein-intake`])
  );
  languages['x-default'] = `${origin}${basePath}/en/protein-intake`;
  return {
    title: `Protein Intake Calculator – ${year}`,
    description: `Daily protein needs by goal and body weight (g/kg).`,
    alternates: { canonical: url, languages }
  };
}

export default function ProteinIntakePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Protein Intake Calculator</h1>
      <ProteinIntakeClient lang={lang} />
      <FaqHowToClient lang={lang} slug="protein-intake" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/macro`}>Macro</Link>
        <Link className="button ghost" href={`/${lang}/tdee`}>TDEE</Link>
      </nav>
    </div>
  );
}

