"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

function mfReturn(navBuy: number, navSell: number, expenseRatio: number, years: number) {
  const gross = navSell / Math.max(1e-9, navBuy) - 1;
  const annualGross = Math.pow(1 + gross, 1 / Math.max(1, years)) - 1;
  const annualNet = Math.max(0, annualGross - expenseRatio);
  const net = Math.pow(1 + annualNet, Math.max(1, years)) - 1;
  return { gross, annualGross, annualNet, net };
}

export default function MutualFundClient({ lang }: { lang: string }) {
  const [navBuy, setNavBuy] = useState<number>(10);
  const [navSell, setNavSell] = useState<number>(15);
  const [expense, setExpense] = useState<number>(0.015);
  const [years, setYears] = useState<number>(5);

  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const res = useMemo(() => mfReturn(navBuy, navSell, expense, years), [navBuy, navSell, expense, years]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mf-buy">NAV (buy)</label>
          <input id="mf-buy" className="input" type="number" min={0} step={0.0001} value={navBuy} onChange={(e) => setNavBuy(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="mf-sell">NAV (sell)</label>
          <input id="mf-sell" className="input" type="number" min={0} step={0.0001} value={navSell} onChange={(e) => setNavSell(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mf-exp">Expense ratio (annual)</label>
          <input id="mf-exp" className="input" type="number" min={0} step={0.0001} value={expense} onChange={(e) => setExpense(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="mf-years">Years</label>
          <input id="mf-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Total return (net):</strong> {pf.format(res.net)}</div>
        <div><strong>CAGR (gross):</strong> {pf.format(res.annualGross)}</div>
        <div><strong>CAGR (net):</strong> {pf.format(res.annualNet)}</div>
      </div>
      <small className="muted">Simplified: net = (1 + grossCAGR - expense)^years - 1; ignores loads/taxes.</small>
    </div>
  );
}

