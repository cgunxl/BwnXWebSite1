"use client";
import { useEffect, useMemo, useState } from 'react';
import { emi } from '@/lib/loan';
import type { Locale } from '@/i18n/config';
import { getLabels } from '@/i18n/config';

export type LoanFormProps = {
  locale: Locale;
  currencySymbol: string;
  defaultAPR: number;
  onChange?: (data: { principal: number; rate: number; years: number; feePct: number; payment: number }) => void;
};

export default function LoanForm({ locale, currencySymbol, defaultAPR, onChange }: LoanFormProps) {
  const L = getLabels(locale);
  const [principal, setPrincipal] = useState<number>(200000);
  const [rate, setRate] = useState<number>(defaultAPR);
  const [years, setYears] = useState<number>(30);
  const [feePct, setFeePct] = useState<number>(0);

  const payment = useMemo(() => {
    const base = emi(principal + (principal * (feePct / 100)), rate, years);
    return isFinite(base) ? base : 0;
  }, [principal, rate, years, feePct]);

  useEffect(() => {
    onChange?.({ principal, rate, years, feePct, payment });
  }, [principal, rate, years, feePct, payment, onChange]);

  return (
    <form className="card" onSubmit={(e) => e.preventDefault()} aria-label="loan-form">
      <div className="grid-2">
        <div>
          <label htmlFor="principal">{L.principal}</label>
          <input id="principal" type="number" inputMode="decimal" min={0} value={principal} onChange={e => setPrincipal(Number(e.target.value))} aria-describedby="principal-help" />
          <div className="muted" id="principal-help">{currencySymbol}</div>
        </div>
        <div>
          <label htmlFor="rate">{L.rate}</label>
          <input id="rate" type="number" inputMode="decimal" min={0} step={0.01} value={rate} onChange={e => setRate(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="years">{L.years}</label>
          <input id="years" type="number" inputMode="numeric" min={1} step={1} value={years} onChange={e => setYears(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="feePct">{L.fee}</label>
          <input id="feePct" type="number" inputMode="decimal" min={0} step={0.1} value={feePct} onChange={e => setFeePct(Number(e.target.value))} />
        </div>
      </div>
      <div className="spacer" />
      <div className="inline">
        <strong>{L.monthlyPayment}:</strong>
        <span>{currencySymbol}{payment.toFixed(2)}</span>
      </div>
    </form>
  );
}
