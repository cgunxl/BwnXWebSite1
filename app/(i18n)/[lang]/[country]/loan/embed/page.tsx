import LoanClient from '@/lib/clients/LoanClient';
import { getAllLocales } from '@/lib/i18n';
import { getAllCountries } from '@/lib/countries';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const langs = getAllLocales();
  const countries = getAllCountries();
  return langs.flatMap((lang) => countries.map((country) => ({ lang, country })));
}

export default function EmbedLoan({ params }: { params: { lang: string, country: string } }) {
  const { lang, country } = params;
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 8 }}>
      <LoanClient lang={lang} country={country} />
    </div>
  );
}

