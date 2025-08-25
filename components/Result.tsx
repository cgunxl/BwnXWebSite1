"use client";
import type { Locale } from '@/i18n/config';
import { getLabels } from '@/i18n/config';
import { marketOf } from '@/lib/markets';
import type { CountryKey } from '@/lib/markets';

export default function Result({ locale, country, currencySymbol, summary }: { locale: Locale; country: CountryKey; currencySymbol: string; summary: { payment: number; totalInterest: number; totalCost: number } }) {
  const L = getLabels(locale);
  const m = marketOf(country);
  return (
    <section className="card" aria-live="polite">
      <div className="grid-2">
        <div>
          <div className="inline"><strong>{L.monthlyPayment}:</strong> <span>{currencySymbol}{summary.payment.toFixed(2)}</span></div>
          <div className="inline"><strong>{L.totalInterest}:</strong> <span>{currencySymbol}{summary.totalInterest.toFixed(2)}</span></div>
          <div className="inline"><strong>{L.totalCost}:</strong> <span>{currencySymbol}{summary.totalCost.toFixed(2)}</span></div>
        </div>
        <div>
          <div className="muted"><strong>{m.display}</strong> — {m.fees.map(f => `${f.name}: ${f.value}`).join(' · ')}</div>
          <div className="spacer" />
          <button type="button">View latest rates</button>
        </div>
      </div>
    </section>
  );
}
