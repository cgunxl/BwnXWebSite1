import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Link from 'next/link';
import CalorieClient from '@/lib/clients/CalorieClient';
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
  const url = `${origin}${basePath}/${lang}/calorie`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/calorie`])
  );
  languages['x-default'] = `${origin}${basePath}/en/calorie`;
  return {
    title: `Calorie Calculator – ${year}`,
    description: `Estimate daily calories from BMR, TDEE and goal (maintain, loss, gain).`,
    alternates: { canonical: url, languages }
  };
}

export default function CaloriePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Calorie Calculator</h1>
      <CalorieClient lang={lang} />
      <FaqHowToClient lang={lang} slug="calorie" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/bmr`}>BMR</Link>
        <Link className="button ghost" href={`/${lang}/tdee`}>TDEE</Link>
        <Link className="button ghost" href={`/${lang}/macro`}>Macro</Link>
      </nav>
    </div>
  );
}

