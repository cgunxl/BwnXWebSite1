"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function CagrClient({ lang }: { lang: string }) {
  const [startValue, setStartValue] = useState<number>(10000);
  const [endValue, setEndValue] = useState<number>(15000);
  const [years, setYears] = useState<number>(3);

  const cagr = useMemo(() => {
    const pv = Math.max(0.0000001, startValue);
    const fv = Math.max(0, endValue);
    const n = Math.max(0.0000001, years);
    const ratio = fv / pv;
    return Math.pow(ratio, 1 / n) - 1;
  }, [startValue, endValue, years]);

  const totalReturn = useMemo(() => {
    const pv = Math.max(0.0000001, startValue);
    const fv = Math.max(0, endValue);
    return pv === 0 ? 0 : (fv - pv) / pv;
  }, [startValue, endValue]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cagr-pv">Beginning value</label>
          <input id="cagr-pv" className="input" type="number" min={0} step={0.01} value={startValue} onChange={(e) => setStartValue(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="cagr-fv">Ending value</label>
          <input id="cagr-fv" className="input" type="number" min={0} step={0.01} value={endValue} onChange={(e) => setEndValue(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cagr-n">Years</label>
          <input id="cagr-n" className="input" type="number" min={0} step={0.25} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Total return:</strong> {(totalReturn * 100).toFixed(2)}%</div>
        <div><strong>CAGR:</strong> {(cagr * 100).toFixed(2)}% / year</div>
      </div>
    </div>
  );
}

