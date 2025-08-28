"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function TriangleAreaClient({ lang }: { lang: string }) {
  const [base, setBase] = useState<string>('10');
  const [height, setHeight] = useState<string>('6');
  const [a, setA] = useState<string>('3');
  const [b, setB] = useState<string>('4');
  const [c, setC] = useState<string>('5');
  const [mode, setMode] = useState<'bh'|'sides'>('bh');

  const area = useMemo(() => {
    if (mode === 'bh') {
      const B = Math.max(0, toNumberSafe(base, 0));
      const H = Math.max(0, toNumberSafe(height, 0));
      return 0.5 * B * H;
    }
    const A = Math.max(0, toNumberSafe(a, 0));
    const B2 = Math.max(0, toNumberSafe(b, 0));
    const C = Math.max(0, toNumberSafe(c, 0));
    const s = (A + B2 + C) / 2;
    const under = s * (s - A) * (s - B2) * (s - C);
    if (under <= 0) return NaN;
    return Math.sqrt(under);
  }, [mode, base, height, a, b, c]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Mode</label>
          <select className="input" value={mode} onChange={(e)=>setMode(e.target.value as any)}>
            <option value="bh">Base & Height</option>
            <option value="sides">3 Sides (Heron’s formula)</option>
          </select>
        </div>
      </div>
      {mode === 'bh' ? (
        <div className="form-row">
          <div>
            <label className="label">Base (b)</label>
            <input className="input" type="number" min={0} value={base} onChange={(e)=>setBase(e.target.value)} />
          </div>
          <div>
            <label className="label">Height (h)</label>
            <input className="input" type="number" min={0} value={height} onChange={(e)=>setHeight(e.target.value)} />
          </div>
        </div>
      ) : (
        <div className="form-row">
          <div>
            <label className="label">Side a</label>
            <input className="input" type="number" min={0} value={a} onChange={(e)=>setA(e.target.value)} />
          </div>
          <div>
            <label className="label">Side b</label>
            <input className="input" type="number" min={0} value={b} onChange={(e)=>setB(e.target.value)} />
          </div>
          <div>
            <label className="label">Side c</label>
            <input className="input" type="number" min={0} value={c} onChange={(e)=>setC(e.target.value)} />
          </div>
        </div>
      )}
      <div className="result">
        <div><strong>Area:</strong> {Number.isFinite(area) ? area : '—'}</div>
      </div>
    </div>
  );
}

