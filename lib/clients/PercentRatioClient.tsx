"use client";

import { useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function PercentRatioClient({ mode, lang }: { mode: 'percentage'|'ratio'; lang: string }) {
  const [a, setA] = useState<number>(20);
  const [b, setB] = useState<number>(50);
  const [p, setP] = useState<number>(10);

  const percent = (a / (b || 1)) * 100;
  const part = (p / 100) * a;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      {mode === 'percentage' ? (
        <div className="form-row">
          <div>
            <label className="label">Part</label>
            <input className="input" type="number" value={a} onChange={(e)=>setA(toNumberSafe(e.target.value, 0))} />
          </div>
          <div>
            <label className="label">Whole</label>
            <input className="input" type="number" value={b} onChange={(e)=>setB(toNumberSafe(e.target.value, 0))} />
          </div>
        </div>
      ) : (
        <div className="form-row">
          <div>
            <label className="label">Value</label>
            <input className="input" type="number" value={a} onChange={(e)=>setA(toNumberSafe(e.target.value, 0))} />
          </div>
          <div>
            <label className="label">Percent (%)</label>
            <input className="input" type="number" value={p} onChange={(e)=>setP(toNumberSafe(e.target.value, 0))} />
          </div>
        </div>
      )}
      <div className="result">
        {mode === 'percentage' ? (
          <div><strong>Percentage:</strong> {Number.isFinite(percent) ? percent.toFixed(2) + '%' : '—'}</div>
        ) : (
          <div><strong>Part:</strong> {Number.isFinite(part) ? part : '—'}</div>
        )}
      </div>
    </div>
  );
}

