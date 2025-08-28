"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function CurrencyArbClient({ lang }: { lang: string }) {
  const [amount, setAmount] = useState<string>('1000');
  const [aToB, setAToB] = useState<string>('1.1');
  const [bToC, setBToC] = useState<string>('0.9');
  const [cToA, setCToA] = useState<string>('1.05');
  const [feesPct, setFeesPct] = useState<string>('0.2');

  const result = useMemo(() => {
    const amt = Math.max(0, toNumberSafe(amount, 0));
    const r1 = Math.max(0, toNumberSafe(aToB, 0));
    const r2 = Math.max(0, toNumberSafe(bToC, 0));
    const r3 = Math.max(0, toNumberSafe(cToA, 0));
    const f = Math.max(0, toNumberSafe(feesPct, 0)) / 100;
    const afterFee = (x: number) => x * (1 - f);
    let b = afterFee(amt * r1);
    let c = afterFee(b * r2);
    let a = afterFee(c * r3);
    const profit = a - amt;
    const roi = amt === 0 ? 0 : profit / amt;
    return { finalA: a, profit, roi };
  }, [amount, aToB, bToC, cToA, feesPct]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Start amount (A)</label>
          <input className="input" type="number" min={0} value={amount} onChange={(e)=>setAmount(e.target.value)} />
        </div>
        <div>
          <label className="label">Rate A→B</label>
          <input className="input" type="number" min={0} step={0.0001} value={aToB} onChange={(e)=>setAToB(e.target.value)} />
        </div>
        <div>
          <label className="label">Rate B→C</label>
          <input className="input" type="number" min={0} step={0.0001} value={bToC} onChange={(e)=>setBToC(e.target.value)} />
        </div>
        <div>
          <label className="label">Rate C→A</label>
          <input className="input" type="number" min={0} step={0.0001} value={cToA} onChange={(e)=>setCToA(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Fees per leg (%)</label>
          <input className="input" type="number" min={0} step={0.01} value={feesPct} onChange={(e)=>setFeesPct(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Final amount (A):</strong> {result.finalA.toFixed(2)}</div>
        <div><strong>Profit:</strong> {result.profit.toFixed(2)}</div>
        <div><strong>ROI:</strong> {(result.roi * 100).toFixed(2)}%</div>
      </div>
      <small className="muted">Triangular arbitrage model with simple per-leg fee. Real markets include slippage and spread.</small>
    </div>
  );
}

