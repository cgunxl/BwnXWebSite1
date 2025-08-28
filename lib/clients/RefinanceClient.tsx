"use client";

import { useMemo, useState } from 'react';
import { calcLoan } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function RefinanceClient({ lang }: { lang: string }) {
  const [balance, setBalance] = useState<number>(2500000);
  const [currentApr, setCurrentApr] = useState<number>(0.065);
  const [monthsRemaining, setMonthsRemaining] = useState<number>(300);

  const [newApr, setNewApr] = useState<number>(0.055);
  const [newYears, setNewYears] = useState<number>(25);
  const [closingCosts, setClosingCosts] = useState<number>(50000);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);

  const currentMonthly = useMemo(() => {
    const years = monthsRemaining / 12;
    return calcLoan(balance, currentApr * 100, years).monthly;
  }, [balance, currentApr, monthsRemaining]);

  const newMonthly = useMemo(() => calcLoan(balance + closingCosts, newApr * 100, newYears).monthly, [balance, closingCosts, newApr, newYears]);
  const monthlyDelta = newMonthly - currentMonthly;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rf-bal">Current balance</label>
          <input id="rf-bal" className="input" type="number" min={0} value={balance} onChange={(e) => setBalance(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="rf-apr">Current APR</label>
          <input id="rf-apr" className="input" type="number" min={0} step={0.0001} value={currentApr} onChange={(e) => setCurrentApr(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rf-rem">Months remaining</label>
          <input id="rf-rem" className="input" type="number" min={1} step={1} value={monthsRemaining} onChange={(e) => setMonthsRemaining(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rf-newapr">New APR</label>
          <input id="rf-newapr" className="input" type="number" min={0} step={0.0001} value={newApr} onChange={(e) => setNewApr(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="rf-years">New term (years)</label>
          <input id="rf-years" className="input" type="number" min={1} step={1} value={newYears} onChange={(e) => setNewYears(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rf-close">Closing costs</label>
          <input id="rf-close" className="input" type="number" min={0} step={1} value={closingCosts} onChange={(e) => setClosingCosts(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Current monthly:</strong> {nf.format(currentMonthly)}</div>
        <div><strong>New monthly:</strong> {nf.format(newMonthly)}</div>
        <div><strong>Change:</strong> {nf.format(monthlyDelta)} per month</div>
      </div>
      <small className="muted">This comparison ignores time value of money; for NPV analyze cashflows.</small>
    </div>
  );
}

