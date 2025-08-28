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

export default function AgeClient({ lang }: { lang: string }) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [birth, setBirth] = useState<string>('1990-01-01');
  const [asOf, setAsOf] = useState<string>(todayStr);

  const result = useMemo(() => {
    const b = toDateOnly(birth);
    const t = toDateOnly(asOf);
    if (!b || !t) return null;
    if (t < b) return null;
    const ymd = diffYMD(b, t);
    const msPerDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor((t.getTime() - b.getTime()) / msPerDay);
    // Next birthday
    const thisYear = t.getFullYear();
    let next = new Date(thisYear, b.getMonth(), b.getDate());
    if (next < t) next = new Date(thisYear + 1, b.getMonth(), b.getDate());
    const daysToBirthday = Math.ceil((next.getTime() - t.getTime()) / msPerDay);
    return { ymd, totalDays, daysToBirthday };
  }, [birth, asOf]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Birth date</label>
          <input className="input" type="date" value={birth} onChange={(e)=>setBirth(e.target.value)} />
        </div>
        <div>
          <label className="label">As of</label>
          <input className="input" type="date" value={asOf} onChange={(e)=>setAsOf(e.target.value)} />
        </div>
      </div>
      <div className="result">
        {result ? (
          <>
            <div><strong>Age:</strong> {result.ymd.years} years, {result.ymd.months} months, {result.ymd.days} days</div>
            <div><strong>Total days lived:</strong> {result.totalDays}</div>
            <div><strong>Days until next birthday:</strong> {result.daysToBirthday}</div>
          </>
        ) : (
          <div>—</div>
        )}
      </div>
    </div>
  );
}

