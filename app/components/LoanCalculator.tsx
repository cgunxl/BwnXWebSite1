'use client';

import { useMemo, useState } from 'react';
import { t } from '../../lib/i18n';
import { calcLoan } from '../../lib/calculators';

export default function LoanCalculator({ lang }: { lang: string }) {
  const [principal, setPrincipal] = useState<number>(20000);
  const [rate, setRate] = useState<number>(7.5);
  const [years, setYears] = useState<number>(5);
  const result = useMemo(() => calcLoan(principal || 0, rate || 0, years || 0), [principal, rate, years]);
  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);
  return (
    <div className="grid">
      <div className="card half">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label className="label">{t(lang,'principal')}</label>
            <input className="input" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} min={0} step="100" />
          </div>
          <div className="field">
            <label className="label">{t(lang,'interestRate')}</label>
            <input className="input" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} min={0} step="0.1" />
          </div>
          <div className="field">
            <label className="label">{t(lang,'years')}</label>
            <input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} min={0} step="1" />
          </div>
        </form>
      </div>
      <div className="card half">
        <div className="result">
          <div><strong>{t(lang,'monthlyPayment')}:</strong> {nf.format(result.monthly || 0)}</div>
          <div><strong>{t(lang,'totalRepayment')}:</strong> {nf.format(result.total || 0)}</div>
          <div><strong>{t(lang,'totalInterest')}:</strong> {nf.format(result.interest || 0)}</div>
        </div>
      </div>
    </div>
  );
}

