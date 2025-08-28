"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function ExponentLogClient({ mode, lang }: { mode: 'exponent'|'logarithm'; lang: string }) {
  const [base, setBase] = useState<number>(10);
  const [x, setX] = useState<number>(2);

  const result = useMemo(() => {
    if (mode === 'exponent') return Math.pow(base, x);
    // logarithm: change of base to natural log
    if (base <= 0 || base === 1 || x <= 0) return NaN;
    return Math.log(x) / Math.log(base);
  }, [mode, base, x]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Base</label>
          <input className="input" type="number" value={base} onChange={(e)=>setBase(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label">X</label>
          <input className="input" type="number" value={x} onChange={(e)=>setX(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Result:</strong> {Number.isFinite(result) ? result : '—'}</div>
      </div>
    </div>
  );
}

