"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

type Summary = { months: number; interest: number };

function simulatePayoff(balance: number, apr: number, monthlyPayment: number, extra: number = 0): Summary {
  const r = Math.max(0, apr) / 12;
  const payment = Math.max(0, monthlyPayment) + Math.max(0, extra);
  let b = Math.max(0, balance);
  let months = 0;
  let interest = 0;
  if (payment <= b * r) {
    return { months: Infinity as any, interest: Infinity as any };
  }
  while (b > 0 && months < 1200) {
    const i = b * r;
    const principal = Math.min(payment - i, b);
    interest += i;
    b = Math.max(0, b - principal);
    months++;
  }
  return { months, interest };
}

export default function DebtPayoffClient({ lang }: { lang: string }) {
  const [balance, setBalance] = useState<number>(200000);
  const [apr, setApr] = useState<number>(0.18);
  const [payment, setPayment] = useState<number>(5000);
  const [extra, setExtra] = useState<number>(0);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const res = useMemo(() => simulatePayoff(balance, apr, payment, extra), [balance, apr, payment, extra]);

  const tooLow = !isFinite(res.months as any);
  const years = tooLow ? 0 : Math.floor(res.months / 12);
  const monthsRemain = tooLow ? 0 : res.months % 12;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="dp-bal">Balance</label>
          <input id="dp-bal" className="input" type="number" min={0} value={balance} onChange={(e) => setBalance(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="dp-apr">APR</label>
          <input id="dp-apr" className="input" type="number" min={0} step={0.0001} value={apr} onChange={(e) => setApr(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(apr)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="dp-pay">Monthly payment</label>
          <input id="dp-pay" className="input" type="number" min={0} value={payment} onChange={(e) => setPayment(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="dp-extra">Extra per month</label>
          <input id="dp-extra" className="input" type="number" min={0} value={extra} onChange={(e) => setExtra(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        {tooLow ? (
          <div>Payment too low to amortize. Increase monthly payment.</div>
        ) : (
          <>
            <div><strong>Time to payoff:</strong> {years} years {monthsRemain} months</div>
            <div><strong>Total interest:</strong> {nf.format(res.interest)}</div>
          </>
        )}
      </div>
      <small className="muted">Assumes fixed APR and fixed monthly outflow; ignores fees and rate changes.</small>
    </div>
  );
}

