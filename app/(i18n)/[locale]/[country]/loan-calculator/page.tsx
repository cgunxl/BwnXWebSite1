import type { Metadata } from 'next';
import CalculatorClient from '@/components/CalculatorClient';
import FAQ from '@/components/FAQ';
import SchemaFAQ from '@/components/SchemaFAQ';
import { LOCALES, COUNTRIES, type Locale, type Country, getLabels } from '@/i18n/config';
import { buildTitle, buildDescription, termByLocale, countryDisplay } from '@/i18n/templates';
import { marketOf } from '@/lib/markets';
import { buildHreflang, canonical } from '@/lib/seo';

export const revalidate = 86400;

type Params = { params: { locale: Locale; country: Country } };

export function generateStaticParams() {
  const out: { locale: Locale; country: Country }[] = [];
  for (const l of LOCALES) for (const c of COUNTRIES) out.push({ locale: l as Locale, country: c as Country });
  return out;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, country } = params;
  const year = new Date().getFullYear();
  const title = buildTitle(locale, country, year);
  const description = buildDescription(locale, country);
  const alternates = buildHreflang(locale, country, '/loan-calculator');
  const url = canonical(locale, country);
  return {
    title,
    description,
    alternates: { ...alternates, canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function Page({ params }: Params) {
  const { locale, country } = params;
  const L = getLabels(locale);
  const m = marketOf(country);
  const year = new Date().getFullYear();

  return (
    <div>
      <header>
        <h1>{`${termByLocale(locale)} – ${countryDisplay(country)} ${year}`}</h1>
        <p className="muted">{buildDescription(locale, country)}</p>
      </header>

      <CalculatorClient locale={locale} country={country} currencySymbol={m.symbol} defaultAPR={m.exampleAPR} />

      <section className="card">
        <h2>{L.examples}</h2>
        <ul>
          <li>Example 1: {m.symbol}200,000 at {m.exampleAPR}% for 30 years.</li>
          <li>Example 2: {m.symbol}20,000 at {Math.max(2, m.exampleAPR - 1)}% for 5 years.</li>
        </ul>
      </section>

      <section className="card">
        <h2>{L.feesNotes}</h2>
        <ul>
          {m.fees.map((f, idx) => (<li key={idx}><strong>{f.name}:</strong> {f.value}</li>))}
          {m.bullets.map((b, idx) => (<li key={`b-${idx}`}>{b}</li>))}
        </ul>
      </section>

      <FAQ locale={locale} country={country} />
      <SchemaFAQ locale={locale} country={country} />

      <nav className="card">
        <h3>Related</h3>
        <ul>
          <li><a href={`/${locale}/${country}/auto-loan-calculator`}>Auto Loan Calculator</a></li>
          <li><a href={`/${locale}/${country}/personal-loan-calculator`}>Personal Loan Calculator</a></li>
          <li><a href={`/${locale}/${country}/refinance-calculator`}>Refinance Calculator</a></li>
        </ul>
        <p className="muted">(Coming soon)</p>
      </nav>

      {/* WebApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: `${termByLocale(locale)} – ${countryDisplay(country)}`,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web',
          inLanguage: locale,
          url: canonical(locale, country),
        }) }}
      />

      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
            { '@type': 'ListItem', position: 2, name: `${countryDisplay(country)}`, item: `/${locale}/${country}` },
            { '@type': 'ListItem', position: 3, name: `${termByLocale(locale)}`, item: `/${locale}/${country}/loan-calculator` },
          ],
        }) }}
      />
    </div>
  );
}
