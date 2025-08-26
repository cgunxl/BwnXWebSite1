"use client";

import { useMemo, useState } from 'react';
import { calcLoan } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function LoanClient({ lang }: { lang: string }) {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(7.5);
  const [years, setYears] = useState<number>(3);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const result = useMemo(() => calcLoan(principal, rate, years), [principal, rate, years]);

  return (
    <div className="card" style={{marginTop: 12}}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="loan-principal">{t(lang, 'principal')}</label>
          <input id="loan-principal" className="input" type="number" min={0} value={principal} onChange={(e) => setPrincipal(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="loan-rate">{t(lang, 'interestRate')}</label>
          <input id="loan-rate" className="input" type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="loan-years">{t(lang, 'years')}</label>
          <input id="loan-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}} aria-hidden>
          <button className="button" type="button" disabled>{t(lang, 'results')}</button>
        </div>
      </div>
      <div className="result">
        <div><strong>{t(lang, 'monthlyPayment')}:</strong> {nf.format(result.monthly || 0)}</div>
        <div><strong>{t(lang, 'totalRepayment')}:</strong> {nf.format(result.total || 0)}</div>
        <div><strong>{t(lang, 'totalInterest')}:</strong> {nf.format(result.interest || 0)}</div>
      </div>
    </div>
  );
}