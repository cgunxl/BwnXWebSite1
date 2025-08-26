"use client";

import { useMemo, useState } from 'react';
import { calcMortgage } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';

export default function MortgageClient({ lang }: { lang: string }) {
  const [principal, setPrincipal] = useState<number>(300000);
  const [rate, setRate] = useState<number>(6.75);
  const [years, setYears] = useState<number>(30);
  const [closing, setClosing] = useState<number>(6000);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const result = useMemo(() => calcMortgage(principal, rate, years, closing), [principal, rate, years, closing]);

  return (
    <div className="card" style={{marginTop: 12}}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mortgage-principal">{t(lang, 'principal')}</label>
          <input id="mortgage-principal" className="input" type="number" min={0} value={principal} onChange={(e) => setPrincipal(parseFloat(e.target.value || '0'))} />
        </div>
        <div>
          <label className="label" htmlFor="mortgage-rate">{t(lang, 'interestRate')}</label>
          <input id="mortgage-rate" className="input" type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(parseFloat(e.target.value || '0'))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mortgage-years">{t(lang, 'years')}</label>
          <input id="mortgage-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(parseFloat(e.target.value || '0'))} />
        </div>
        <div>
          <label className="label" htmlFor="mortgage-closing">{t(lang, 'closingCosts')}</label>
          <input id="mortgage-closing" className="input" type="number" min={0} step={1} value={closing} onChange={(e) => setClosing(parseFloat(e.target.value || '0'))} />
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