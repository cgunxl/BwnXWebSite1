import { marketOf } from '@/lib/markets';
import type { CountryKey } from '@/lib/markets';
import type { Locale } from '@/i18n/config';
import { termByLocale } from '@/i18n/templates';

type QA = { q: string; a: string };

export function buildFAQ(locale: Locale, country: CountryKey): QA[] {
  const m = marketOf(country);
  const term = termByLocale(locale);
  const items: QA[] = [];
  items.push({ q: `How is ${m.localTerm} calculated?`, a: `${term} uses the annuity formula with interest spread across the term.` });
  items.push({ q: `Is there a prepayment penalty in ${m.display}?`, a: `Check your contract: ${m.fees.find(f => f.name.toLowerCase().includes('pre'))?.value || 'Varies by lender'}.` });
  items.push({ q: `What fees/taxes apply?`, a: m.fees.map(f => `${f.name}: ${f.value}`).join('; ') + '.' });
  for (const b of m.bullets.slice(0, 3)) items.push({ q: b, a: 'Consider this when comparing offers.' });
  return items.slice(0, 6);
}

export default function FAQ({ locale, country }: { locale: Locale; country: CountryKey }) {
  const items = buildFAQ(locale, country);
  return (
    <section className="card">
      <h2>FAQ</h2>
      <div>
        {items.map((it, idx) => (
          <details key={idx}>
            <summary>{it.q}</summary>
            <p className="muted">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
