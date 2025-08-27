"use client";

import { useMemo, useState } from 'react';
import { calcLoan } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function BusinessLoanClient({ lang }: { lang: string }) {
  const [amount, setAmount] = useState<number>(1000000);
  const [apr, setApr] = useState<number>(0.12);
  const [years, setYears] = useState<number>(3);
  const [originationPct, setOriginationPct] = useState<number>(0.02);
  const [closing, setClosing] = useState<number>(10000);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const principal = Math.max(0, amount * (1 + Math.max(0, originationPct)) + Math.max(0, closing));
  const res = useMemo(() => calcLoan(principal, Math.max(0, apr) * 100, years), [principal, apr, years]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bl-amount">Loan amount</label>
          <input id="bl-amount" className="input" type="number" min={0} value={amount} onChange={(e) => setAmount(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bl-apr">APR</label>
          <input id="bl-apr" className="input" type="number" min={0} step={0.0001} value={apr} onChange={(e) => setApr(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(apr)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bl-years">{t(lang, 'years')}</label>
          <input id="bl-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bl-orig">Origination fee</label>
          <input id="bl-orig" className="input" type="number" min={0} step={0.0001} value={originationPct} onChange={(e) => setOriginationPct(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(originationPct)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bl-closing">Closing costs</label>
          <input id="bl-closing" className="input" type="number" min={0} step={1} value={closing} onChange={(e) => setClosing(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Financed principal:</strong> {nf.format(principal)}</div>
        <div><strong>{t(lang, 'monthlyPayment')}:</strong> {nf.format(res.monthly)}</div>
        <div><strong>{t(lang, 'totalRepayment')}:</strong> {nf.format(res.total)}</div>
        <div><strong>{t(lang, 'totalInterest')}:</strong> {nf.format(res.interest)}</div>
      </div>
      <small className="muted">Assumes amortizing term loan; fees financed into principal.</small>
    </div>
  );
}

