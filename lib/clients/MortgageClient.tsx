"use client";

import { useMemo, useState } from 'react';
import { calcMortgage } from '@/lib/calculators';
import { t } from '@/lib/i18n';

export default function MortgageClient({ lang }: { lang: string }) {
  const [principal, setPrincipal] = useState<number>(300000);
  const [rate, setRate] = useState<number>(6.75);
  const [years, setYears] = useState<number>(30);
  const [closing, setClosing] = useState<number>(6000);

  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD' }), [lang]);
  const result = useMemo(() => calcMortgage(principal, rate, years, closing), [principal, rate, years, closing]);

  return (
    <div className="card" style={{marginTop: 12}}>
      <div className="form-row">
        <div>
          <div className="label">{t(lang, 'principal')}</div>
          <input className="input" type="number" min={0} value={principal} onChange={(e) => setPrincipal(parseFloat(e.target.value || '0'))} />
        </div>
        <div>
          <div className="label">{t(lang, 'interestRate')}</div>
          <input className="input" type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(parseFloat(e.target.value || '0'))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <div className="label">{t(lang, 'years')}</div>
          <input className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(parseFloat(e.target.value || '0'))} />
        </div>
        <div>
          <div className="label">{t(lang, 'closingCosts')}</div>
          <input className="input" type="number" min={0} step={1} value={closing} onChange={(e) => setClosing(parseFloat(e.target.value || '0'))} />
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