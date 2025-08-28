"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function SimpleInterestClient({ lang }: { lang: string }) {
  const [principal, setPrincipal] = useState<number>(10000);
  const [ratePercent, setRatePercent] = useState<number>(5);
  const [years, setYears] = useState<number>(3);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const interest = useMemo(() => {
    const r = Math.max(0, ratePercent) / 100;
    const tYears = Math.max(0, years);
    const p = Math.max(0, principal);
    return p * r * tYears;
  }, [principal, ratePercent, years]);

  const total = useMemo(() => principal + interest, [principal, interest]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="si-principal">{t(lang, 'principal')}</label>
          <input id="si-principal" className="input" type="number" min={0} value={principal} onChange={(e) => setPrincipal(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="si-rate">{t(lang, 'interestRate')}</label>
          <input id="si-rate" className="input" type="number" min={0} step={0.01} value={ratePercent} onChange={(e) => setRatePercent(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(ratePercent / 100)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="si-years">{t(lang, 'years')}</label>
          <input id="si-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }} aria-hidden>
          <button className="button" type="button" disabled>{t(lang, 'results')}</button>
        </div>
      </div>
      <div className="result">
        <div><strong>Interest:</strong> {nf.format(interest)}</div>
        <div><strong>Total amount:</strong> {nf.format(total)}</div>
      </div>
      <small className="muted">Formula: I = P × r × t</small>
    </div>
  );
}

