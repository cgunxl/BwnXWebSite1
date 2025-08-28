"use client";

import { useMemo, useState } from 'react';

function toDateOnly(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value + 'T00:00:00');
  return Number.isNaN(d.getTime()) ? null : d;
}

function daysInMonth(year: number, monthIndex0: number): number {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

function diffYMD(from: Date, to: Date): { years: number; months: number; days: number } {
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  if (d < 0) {
    m -= 1;
    const dim = daysInMonth(to.getFullYear(), (to.getMonth() + 11) % 12);
    d += dim;
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }
  return { years: y, months: m, days: d };
}

export default function AgeGapClient({ lang }: { lang: string }) {
  const [a, setA] = useState<string>('1990-01-01');
  const [b, setB] = useState<string>('1995-06-15');

  const result = useMemo(() => {
    const da = toDateOnly(a);
    const db = toDateOnly(b);
    if (!da || !db) return null;
    let from = da, to = db;
    if (to < from) [from, to] = [to, from];
    const msPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor((to.getTime() - from.getTime()) / msPerDay);
    const ymd = diffYMD(from, to);
    return { ymd, totalDays };
  }, [a, b]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Person A birth date</label>
          <input className="input" type="date" value={a} onChange={(e)=>setA(e.target.value)} />
        </div>
        <div>
          <label className="label">Person B birth date</label>
          <input className="input" type="date" value={b} onChange={(e)=>setB(e.target.value)} />
        </div>
      </div>
      <div className="result">
        {result ? (
          <>
            <div><strong>Age gap:</strong> {result.ymd.years} years, {result.ymd.months} months, {result.ymd.days} days</div>
            <div><strong>Difference in days:</strong> {result.totalDays}</div>
          </>
        ) : (
          <div>—</div>
        )}
      </div>
    </div>
  );
}

