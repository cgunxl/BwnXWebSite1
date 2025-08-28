"use client";

import { useMemo, useState } from 'react';

export default function CoinFlipClient({ lang }: { lang: string }) {
  const [flips, setFlips] = useState<string>('10');

  const result = useMemo(() => {
    const n = Math.max(1, Math.min(10000, parseInt(flips || '1', 10)));
    const arr: ('H'|'T')[] = [];
    let heads = 0;
    for (let i = 0; i < n; i++) {
      const v = Math.random() < 0.5 ? 'H' : 'T';
      if (v === 'H') heads++;
      arr.push(v);
    }
    const tails = n - heads;
    return { sequence: arr.join(' '), heads, tails };
  }, [flips]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Flips</label>
          <input className="input" type="number" min={1} max={10000} value={flips} onChange={(e)=>setFlips(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Heads:</strong> {result.heads} | <strong>Tails:</strong> {result.tails}</div>
        <div style={{ wordBreak: 'break-word' }}>{result.sequence}</div>
      </div>
      <small className="muted">Pseudo-random generator; for fairness-critical uses consider a cryptographic RNG.</small>
    </div>
  );
}

