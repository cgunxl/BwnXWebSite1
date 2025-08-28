"use client";

import { useMemo, useState } from 'react';
import { t } from '@/lib/i18n';
import Link from 'next/link';
import { REGISTRY } from '@/lib/registry';
import { COUNTRY_LABELS, FAQ_CONTENT, CountryCode, FaqHowTo } from '@/lib/faqContent';

type Props = {
  lang: string;
  slug: string; // e.g., 'roi', 'car-loan', 'bmi'
  defaultCountry?: CountryCode;
};

function getAvailableCountries(slug: string, preferred?: CountryCode[]): CountryCode[] {
  const map = FAQ_CONTENT[slug] || {};
  const keys = Object.keys(map) as CountryCode[];
  if (!keys.length) return [];
  const order: CountryCode[] = preferred && preferred.length ? preferred : ['GLOBAL','TH','US','UK','IN','EU'];
  const set = new Set<CountryCode>();
  for (const k of order) if ((map as any)[k]) set.add(k);
  for (const k of keys) set.add(k);
  return Array.from(set);
}

export default function FaqHowToClient({ lang, slug, defaultCountry = 'GLOBAL' }: Props) {
  const available = useMemo(() => getAvailableCountries(slug), [slug]);
  const initial = useMemo<CountryCode>(() => {
    if (available.includes(defaultCountry)) return defaultCountry;
    if (available.includes('GLOBAL')) return 'GLOBAL';
    return available[0] as CountryCode;
  }, [available, defaultCountry]);
  const [country, setCountry] = useState<CountryCode>(initial);

  const content = useMemo(() => {
    const map = FAQ_CONTENT[slug] || {};
    const byCountry: FaqHowTo | undefined = (map[country] || map.GLOBAL) as FaqHowTo | undefined;
    return byCountry;
  }, [slug, country]);

  const related = useMemo(() => getRelated(slug), [slug]);

  if (!content && (!related || related.length === 0)) {
    return null;
  }

  return (
    <section className="card fade-swap" style={{ marginTop: 16, position: 'relative' }}>
      {available.length > 1 ? (
        <div className="form-row" style={{ alignItems: 'center', marginBottom: 8 }}>
          <div>
            <label className="label" htmlFor={`country-${slug}`}>{t(lang, 'selectCountry')}</label>
            <select
              id={`country-${slug}`}
              className="input"
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryCode)}
              onClick={(e) => {
                const el = (e.currentTarget as HTMLElement).closest('section');
                if (el) {
                  el.classList.remove('fade-swap');
                  void el.offsetWidth;
                  el.classList.add('fade-swap');
                }
              }}
            >
              {available.map((c) => (
                <option key={c} value={c}>{COUNTRY_LABELS[c]}</option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      {content?.useCases?.length ? (
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ marginBottom: 8 }}>{t(lang, 'useCases')}</h2>
          <ul className="ul">
            {content.useCases.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {content?.howTo?.length ? (
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ marginBottom: 8 }}>{t(lang, 'howToUse')}</h2>
          <ol className="ol">
            {content.howTo.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      ) : null}

      {content?.faqs?.length ? (
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ marginBottom: 8 }}>{t(lang, 'faq')}</h2>
          <div className="faq">
            {content.faqs.map((qa, i) => (
              <details key={i} className="accordion">
                <summary><strong>{qa.question}</strong></summary>
                <div style={{ paddingTop: 8 }}>{qa.answer}</div>
              </details>
            ))}
          </div>
        </div>
      ) : null}

      {content?.references?.length ? (
        <div>
          <h2 style={{ marginBottom: 8 }}>{t(lang, 'sources')}</h2>
          <ol>
            {content.references.map((r, i) => (
              <li key={i}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.label}</a></li>
            ))}
          </ol>
        </div>
      ) : null}

      {related?.length ? (
        <div style={{ marginTop: 12 }}>
          <h2 style={{ marginBottom: 8 }}>{t(lang, 'relatedCalcs')}</h2>
          <ul className="ul">
            {related.map((r, i) => {
              const entry = REGISTRY.find(e => e.id === r.id);
              if (!entry) return null;
              const href = entry.path(lang) as any;
              return (
                <li key={i}>
                  <Link href={href}>{t(lang, entry.titleKey)}</Link>
                  {r.reason ? <span style={{ color: 'var(--muted)', marginLeft: 8 }}>— {r.reason}</span> : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

type RelatedItem = { id: any; reason?: string };

function getRelated(slug: string): RelatedItem[] {
  switch (slug) {
    // Health cross-links
    case 'bmi':
      return [
        { id: 'tdee', reason: 'Use BMI inputs to estimate daily energy' },
        { id: 'calorie', reason: 'Turn TDEE into daily calorie targets' }
      ];
    case 'bmr':
      return [
        { id: 'tdee', reason: 'Multiply BMR by activity to get TDEE' },
        { id: 'calorie', reason: 'Apply goal to set daily calories' }
      ];
    case 'tdee':
      return [
        { id: 'calorie', reason: 'Convert TDEE to goals (loss/gain/maintain)' },
        { id: 'macro', reason: 'Split calories into protein, fat, carbs' }
      ];
    case 'calorie':
      return [
        { id: 'macro', reason: 'Translate calories into macro grams' },
        { id: 'protein-intake', reason: 'Ensure adequate daily protein' }
      ];
    case 'macro':
      return [
        { id: 'calorie', reason: 'Confirm total calorie target' },
        { id: 'protein-intake', reason: 'Set minimum protein for results' }
      ];
    case 'protein-intake':
      return [
        { id: 'macro', reason: 'Balance fat and carbs around protein' },
        { id: 'tdee', reason: 'Confirm energy needs for your activity' }
      ];
    // Finance cross-links
    case 'loan':
      return [
        { id: 'amortization', reason: 'Download your full payment schedule' },
        { id: 'refinance', reason: 'Compare current payment vs new rate' },
        { id: 'mortgage', reason: 'Home loan with taxes and closing costs' }
      ];
    case 'mortgage':
      return [
        { id: 'house-affordability', reason: 'Estimate max home price from income' },
        { id: 'ltv', reason: 'See loan-to-value and equity' },
        { id: 'amortization', reason: 'Get full mortgage schedule' }
      ];
    case 'car-loan':
      return [
        { id: 'loan', reason: 'Compare with generic loan terms' },
        { id: 'markup', reason: 'Price from dealer cost and markup' }
      ];
    case 'credit-card':
      return [
        { id: 'debt-payoff', reason: 'Plan avalanche/snowball payoff' },
        { id: 'simple-interest', reason: 'Compare against simple interest' }
      ];
    case 'compound':
      return [
        { id: 'savings', reason: 'Target amount to reach a goal' },
        { id: 'roi', reason: 'Evaluate investment performance' }
      ];
    case 'savings':
      return [
        { id: 'compound', reason: 'Project growth with compounding' },
        { id: 'emergency-fund', reason: 'Plan your safety net' }
      ];
    case 'retirement':
      return [
        { id: '401k', reason: 'Add employer match to plan' },
        { id: 'roth-ira', reason: 'Tax-advantaged growth scenario' }
      ];
    case '401k':
      return [
        { id: 'retirement', reason: 'Combine accounts for total nest egg' },
        { id: 'roth-ira', reason: 'Complementary IRA growth' }
      ];
    case 'roth-ira':
      return [
        { id: 'retirement', reason: 'See full retirement picture' },
        { id: '401k', reason: 'Employer-sponsored plan comparison' }
      ];
    case 'tax':
      return [
        { id: 'salary', reason: 'See net salary after taxes' },
        { id: 'paycheck', reason: 'Monthly take-home after deductions' },
        { id: 'sales-tax', reason: 'Tax on purchases' }
      ];
    case 'vat':
      return [
        { id: 'sales-tax', reason: 'Alternate sales tax naming' },
        { id: 'discount', reason: 'Compute price after discount + tax' }
      ];
    case 'property-tax':
      return [
        { id: 'mortgage', reason: 'Include taxes into mortgage planning' },
        { id: 'house-affordability', reason: 'Taxes affect affordability' }
      ];
    case 'inflation':
      return [
        { id: 'roi', reason: 'Compare nominal vs real returns' },
        { id: 'npv-irr', reason: 'Discount cash flows with inflation' }
      ];
    case 'roi':
      return [
        { id: 'npv-irr', reason: 'Evaluate projects with cash flows' },
        { id: 'wacc', reason: 'Choose discount rate baseline' },
        { id: 'cagr', reason: 'Compare with annualized growth' }
      ];
    case 'cagr':
      return [
        { id: 'roi', reason: 'Compare total vs annualized returns' },
        { id: 'npv-irr', reason: 'Cash-flow based project analysis' }
      ];
    case 'ebitda-margin':
      return [
        { id: 'profit-margin', reason: 'Compare margin definitions' },
        { id: 'enterprise-value', reason: 'Use EV/EBITDA multiples' }
      ];
    case 'enterprise-value':
      return [
        { id: 'wacc', reason: 'Use in valuation models' },
        { id: 'ebitda-margin', reason: 'Build EV/EBITDA' }
      ];
    case 'stock-return':
      return [
        { id: 'dividend', reason: 'Break out dividend income and yield' },
        { id: 'roi', reason: 'Compare against other assets' }
      ];
    case 'dividend':
      return [
        { id: 'stock-return', reason: 'Total return with price + dividends' }
      ];
    case 'currency':
      return [
        { id: 'currency-arbitrage', reason: 'Simulate triangular arbitrage' }
      ];
    case 'crypto-profit':
      return [
        { id: 'bitcoin-mining', reason: 'Compare trading vs mining' },
        { id: 'eth-gas', reason: 'Include transaction gas fees' }
      ];
    case 'bitcoin-mining':
      return [
        { id: 'crypto-profit', reason: 'Account for trade profitability' }
      ];
    case 'eth-gas':
      return [
        { id: 'crypto-profit', reason: 'Factor gas into profit' }
      ];
    case 'nft-profit':
      return [
        { id: 'crypto-profit', reason: 'Royalties and marketplace fees' }
      ];
    case 'paycheck':
      return [
        { id: 'salary', reason: 'Annualize your take-home pay' },
        { id: 'tax', reason: 'Understand taxes driving deductions' }
      ];
    case 'salary':
      return [
        { id: 'paycheck', reason: 'Monthly breakdown from salary' }
      ];
    case 'hourly-wage':
      return [
        { id: 'salary', reason: 'Convert hourly to annual' },
        { id: 'overtime', reason: 'Include OT in weekly pay' }
      ];
    case 'overtime':
      return [
        { id: 'hourly-wage', reason: 'Base wage and annual conversion' }
      ];
    case 'freelancer-rate':
      return [
        { id: 'hourly-wage', reason: 'Cross-check hourly equivalence' },
        { id: 'markup', reason: 'Set price from cost + margin' }
      ];
    case 'business-loan':
      return [
        { id: 'loan', reason: 'Compare with personal loan terms' },
        { id: 'break-even', reason: 'Revenue needed to cover costs' }
      ];
    case 'refinance':
      return [
        { id: 'loan', reason: 'Baseline vs new terms' },
        { id: 'mortgage', reason: 'Refi home loan scenario' }
      ];
    case 'debt-payoff':
      return [
        { id: 'credit-card', reason: 'APR and minimum payments' }
      ];
    case 'amortization':
      return [
        { id: 'loan', reason: 'Compute monthly payment inputs' },
        { id: 'mortgage', reason: 'Schedule for mortgages' }
      ];
    case 'lease':
      return [
        { id: 'car-loan', reason: 'Compare leasing vs financing' }
      ];
    case 'break-even':
      return [
        { id: 'profit-margin', reason: 'Margins drive break-even point' },
        { id: 'markup', reason: 'Price setting affects BEP' }
      ];
    case 'profit-margin':
      return [
        { id: 'markup', reason: 'Translate markup to margin' }
      ];
    case 'markup':
      return [
        { id: 'profit-margin', reason: 'Check implied margin' }
      ];
    case 'discount':
      return [
        { id: 'sales-tax', reason: 'Final price with tax and discount' }
      ];
    case 'sales-tax':
      return [
        { id: 'vat', reason: 'Compare VAT vs sales tax' }
      ];
    default:
      return [];
  }
}

