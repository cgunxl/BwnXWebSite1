"use client";

import { useMemo, useState } from 'react';

function parseNumbers(input: string): number[] {
  return input
    .split(/[^-+0-9.eE]+/)
    .filter(Boolean)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n));
}

export default function AverageClient({ lang }: { lang: string }) {
  const [raw, setRaw] = useState<string>('1, 2, 3, 4, 5');
  const nums = useMemo(() => parseNumbers(raw), [raw]);
  const { sum, mean } = useMemo(() => {
    const s = nums.reduce((a, b) => a + b, 0);
    const m = nums.length ? s / nums.length : 0;
    return { sum: s, mean: m };
  }, [nums]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label" htmlFor="avg-input">Numbers (comma/space/newline separated)</label>
          <textarea id="avg-input" className="input" rows={4} value={raw} onChange={(e) => setRaw(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Count:</strong> {nums.length}</div>
        <div><strong>Sum:</strong> {sum}</div>
        <div><strong>Average:</strong> {Number.isFinite(mean) ? mean : 0}</div>
      </div>
    </div>
  );
}

