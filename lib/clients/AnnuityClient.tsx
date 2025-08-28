"use client";
import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function fvAnnuity(payment: number, rate: number, n: number, due: boolean): number {
  if (rate === 0) return payment * n * (due ? 1 : 1);
  const fvOrdinary = payment * ((Math.pow(1 + rate, n) - 1) / rate);
  return due ? fvOrdinary * (1 + rate) : fvOrdinary;
}

function pvAnnuity(payment: number, rate: number, n: number, due: boolean): number {
  if (rate === 0) return payment * n * (due ? 1 : 1);
  const pvOrdinary = payment * (1 - Math.pow(1 + rate, -n)) / rate;
  return due ? pvOrdinary * (1 + rate) : pvOrdinary;
}

export default function AnnuityClient({ lang }: { lang: string }) {
  const [payment, setPayment] = useState<string>('1000');
  const [rate, setRate] = useState<string>('6');
  const [periods, setPeriods] = useState<string>('10');
  const [type, setType] = useState<'ordinary' | 'due'>('ordinary');

  const { pv, fv } = useMemo(() => {
    const pmt = toNumberSafe(payment, 0);
    const r = toNumberSafe(rate, 0) / 100;
    const n = Math.max(0, Math.floor(toNumberSafe(periods, 0)));
    const due = type === 'due';
    return {
      pv: pvAnnuity(pmt, r, n, due),
      fv: fvAnnuity(pmt, r, n, due)
    };
  }, [payment, rate, periods, type]);

  const fmt = (x: number) => (Number.isFinite(x) ? x.toFixed(4) : '');

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        <label>
          <div>Payment per period</div>
          <input value={payment} onChange={(e) => setPayment(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Rate per period (%)</div>
          <input value={rate} onChange={(e) => setRate(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Number of periods</div>
          <input value={periods} onChange={(e) => setPeriods(e.target.value)} inputMode="numeric" />
        </label>
        <label>
          <div>Annuity type</div>
          <select value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="ordinary">Ordinary (end of period)</option>
            <option value="due">Annuity due (beginning)</option>
          </select>
        </label>
      </div>
      <div className="result" style={{ marginTop: 12 }}>
        <div>Present Value: <b>{fmt(pv)}</b></div>
        <div>Future Value: <b>{fmt(fv)}</b></div>
      </div>
    </div>
  );
}

