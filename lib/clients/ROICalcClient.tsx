"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function ROICalcClient({ lang }: { lang: string }) {
  const [gain, setGain] = useState<number>(120000);
  const [cost, setCost] = useState<number>(100000);
  const [periodYears, setPeriodYears] = useState<number>(1);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const roi = (gain - cost) / (cost || 1);
  const cagr = Math.pow(Math.max(0.000001, gain / Math.max(1, cost)), 1 / Math.max(1, periodYears)) - 1;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="roi-gain">Ending value</label>
          <input id="roi-gain" className="input" type="number" min={0} value={gain} onChange={(e) => setGain(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="roi-cost">Initial cost</label>
          <input id="roi-cost" className="input" type="number" min={0} value={cost} onChange={(e) => setCost(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="roi-years">Years</label>
          <input id="roi-years" className="input" type="number" min={1} step={1} value={periodYears} onChange={(e) => setPeriodYears(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>ROI:</strong> {pf.format(roi)}</div>
        <div><strong>CAGR:</strong> {pf.format(cagr)}</div>
      </div>
      <small className="muted">ROI = (Gain - Cost)/Cost; CAGR = (Ending/Beginning)^(1/Years) - 1</small>
    </div>
  );
}

