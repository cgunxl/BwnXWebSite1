"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function LeaseClient({ lang }: { lang: string }) {
  const [capCost, setCapCost] = useState<number>(900000);
  const [residual, setResidual] = useState<number>(0.55); // 55% of MSRP
  const [moneyFactor, setMoneyFactor] = useState<number>(0.0025); // ~= APR/2400
  const [termMonths, setTermMonths] = useState<number>(36);
  const [fees, setFees] = useState<number>(15000);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const residualValue = capCost * Math.max(0, residual);
  const depreciation = (capCost - residualValue) / Math.max(1, termMonths);
  const financeCharge = (capCost + residualValue) * Math.max(0, moneyFactor);
  const basePayment = depreciation + financeCharge;
  const monthly = basePayment + (fees / Math.max(1, termMonths));

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ls-cap">Cap cost (MSRP)</label>
          <input id="ls-cap" className="input" type="number" min={0} value={capCost} onChange={(e) => setCapCost(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="ls-res">Residual %</label>
          <input id="ls-res" className="input" type="number" min={0} step={0.001} value={residual} onChange={(e) => setResidual(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ls-mf">Money factor</label>
          <input id="ls-mf" className="input" type="number" min={0} step={0.00001} value={moneyFactor} onChange={(e) => setMoneyFactor(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="ls-term">Term (months)</label>
          <input id="ls-term" className="input" type="number" min={1} step={1} value={termMonths} onChange={(e) => setTermMonths(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ls-fees">Fees (total)</label>
          <input id="ls-fees" className="input" type="number" min={0} step={1} value={fees} onChange={(e) => setFees(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Residual value:</strong> {nf.format(residualValue)}</div>
        <div><strong>Monthly payment:</strong> {nf.format(monthly)}</div>
      </div>
      <small className="muted">Simplified lease math; excludes tax on payments and drive-off cash adjustments.</small>
    </div>
  );
}

