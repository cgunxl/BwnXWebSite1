'use client';

import { useMemo, useState } from 'react';
import { t } from '../../lib/i18n';
import { calcMortgage } from '../../lib/calculators';

export default function MortgageCalculator({ lang }: { lang: string }) {
  const [principal, setPrincipal] = useState<number>(350000);
  const [rate, setRate] = useState<number>(6.8);
  const [years, setYears] = useState<number>(30);
  const [closing, setClosing] = useState<number>(6000);
  const result = useMemo(() => calcMortgage(principal || 0, rate || 0, years || 0, closing || 0), [principal, rate, years, closing]);
  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);
  return (
    <div className="grid">
      <div className="card half">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label className="label">{t(lang,'principal')}</label>
            <input className="input" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} min={0} step="1000" />
          </div>
          <div className="field">
            <label className="label">{t(lang,'interestRate')}</label>
            <input className="input" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} min={0} step="0.1" />
          </div>
          <div className="field">
            <label className="label">{t(lang,'years')}</label>
            <input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} min={0} step="1" />
          </div>
          <div className="field">
            <label className="label">{t(lang,'closingCosts')}</label>
            <input className="input" type="number" value={closing} onChange={(e) => setClosing(Number(e.target.value))} min={0} step="100" />
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

