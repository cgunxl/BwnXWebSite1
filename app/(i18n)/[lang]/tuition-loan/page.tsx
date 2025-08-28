import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Link from 'next/link';
import TuitionLoanClient from '@/lib/clients/TuitionLoanClient';
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
  const url = `${origin}${basePath}/${lang}/tuition-loan`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/tuition-loan`])
  );
  languages['x-default'] = `${origin}${basePath}/en/tuition-loan`;
  return {
    title: `Tuition Loan Calculator – ${year}`,
    description: `Student loan payment, total interest, and deferment interest.`,
    alternates: { canonical: url, languages }
  };
}

export default function TuitionLoanPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Tuition Loan Calculator</h1>
      <TuitionLoanClient lang={lang} />
      <FaqHowToClient lang={lang} slug="tuition-loan" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/loan`}>Loan</Link>
        <Link className="button ghost" href={`/${lang}/amortization`}>Amortization</Link>
      </nav>
    </div>
  );
}

