"use client";
import { useMemo, useState } from 'react';
import LoanForm from '@/components/LoanForm';
import Result from '@/components/Result';
import AmortTable from '@/components/AmortTable';
import { amortize } from '@/lib/loan';
import type { Locale } from '@/i18n/config';
import type { CountryKey } from '@/lib/markets';

export default function CalculatorClient({ locale, country, currencySymbol, defaultAPR }: { locale: Locale; country: CountryKey; currencySymbol: string; defaultAPR: number }) {
  const [state, setState] = useState({ principal: 200000, rate: defaultAPR, years: 30, feePct: 0, payment: 0 });
  const result = useMemo(() => amortize(state.principal + (state.principal * (state.feePct / 100)), state.rate, state.years), [state]);
  const summary = { payment: result.payment, totalInterest: result.totalInterest, totalCost: result.payment * result.schedule.length };

  return (
    <div>
      <LoanForm locale={locale} currencySymbol={currencySymbol} defaultAPR={defaultAPR} onChange={setState} />
      <div className="spacer" />
      <Result locale={locale} country={country} currencySymbol={currencySymbol} summary={summary} />
      <div className="spacer" />
      <AmortTable locale={locale} rows={result.schedule} currencySymbol={currencySymbol} />
    </div>
  );
}
