"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

type Payoff = { months: number; interestTotal: number } | 'tooLow';

function computePayoffMonths(balance: number, apr: number, monthlyPayment: number): Payoff {
  const r = apr / 12;
  if (monthlyPayment <= balance * r) return 'tooLow'; // payment too low to amortize
  let months = 0;
  let b = balance;
  let interestTotal = 0;
  while (b > 0 && months < 1200) {
    const interest = b * r;
    const principal = Math.min(monthlyPayment - interest, b);
    interestTotal += interest;
    b = Math.max(0, b - principal);
    months++;
  }
  return { months, interestTotal };
}

export default function CreditCardClient({ lang }: { lang: string }) {
  const [balance, setBalance] = useState<number>(50000);
  const [apr, setApr] = useState<number>(0.18);
  const [payment, setPayment] = useState<number>(2000);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const res = useMemo(() => computePayoffMonths(balance, apr, payment), [balance, apr, payment]);
  const tooLow = res === 'tooLow';

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cc-balance">Balance</label>
          <input id="cc-balance" className="input" type="number" min={0} value={balance} onChange={(e) => setBalance(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="cc-apr">APR</label>
          <input id="cc-apr" className="input" type="number" min={0} step={0.0001} value={apr} onChange={(e) => setApr(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(apr)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cc-payment">Monthly payment</label>
          <input id="cc-payment" className="input" type="number" min={0} value={payment} onChange={(e) => setPayment(toNumberSafe(e.target.value, 0))} />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}}>
          <button className="button" type="button" disabled>{t(lang, 'results')}</button>
        </div>
      </div>
      <div className="result">
        {tooLow ? (
          <div><strong>Payment too low</strong> to reduce balance. Increase monthly payment.</div>
        ) : (
          <>
            <div><strong>Months to payoff:</strong> {(res as any).months}</div>
            <div><strong>Total interest:</strong> {nf.format((res as any).interestTotal)}</div>
          </>
        )}
      </div>
      <small className="muted">Assumes fixed APR and fixed monthly payment; ignores fees and rate changes.</small>
    </div>
  );
}

