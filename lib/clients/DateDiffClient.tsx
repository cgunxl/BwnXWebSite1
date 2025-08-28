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
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    d += prevMonth.getDate();
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }
  return { years: y, months: m, days: d };
}

export default function DateDiffClient({ lang }: { lang: string }) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState<string>('2023-01-01');
  const [end, setEnd] = useState<string>(todayStr);
  const [inclusive, setInclusive] = useState<boolean>(false);

  const result = useMemo(() => {
    const a = toDateOnly(start);
    const b = toDateOnly(end);
    if (!a || !b) return null;
    let from = a, to = b;
    if (to < from) [from, to] = [to, from];
    const msPerDay = 24 * 60 * 60 * 1000;
    let totalDays = Math.floor((to.getTime() - from.getTime()) / msPerDay);
    if (inclusive) totalDays += 1;
    const ymd = diffYMD(from, to);
    const weeks = Math.floor(totalDays / 7);
    const hours = totalDays * 24;
    const minutes = hours * 60;
    return { totalDays, weeks, ymd, hours, minutes };
  }, [start, end, inclusive]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Start date</label>
          <input className="input" type="date" value={start} onChange={(e)=>setStart(e.target.value)} />
        </div>
        <div>
          <label className="label">End date</label>
          <input className="input" type="date" value={end} onChange={(e)=>setEnd(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <label className="checkbox">
          <input type="checkbox" checked={inclusive} onChange={(e)=>setInclusive(e.target.checked)} />
          <span style={{ marginLeft: 8 }}>Inclusive (count both start and end)</span>
        </label>
      </div>
      <div className="result">
        {result ? (
          <>
            <div><strong>Total days:</strong> {result.totalDays}</div>
            <div><strong>Weeks:</strong> {result.weeks}</div>
            <div><strong>Years/Months/Days:</strong> {result.ymd.years}y {result.ymd.months}m {result.ymd.days}d</div>
            <div><strong>Hours:</strong> {result.hours}</div>
            <div><strong>Minutes:</strong> {result.minutes}</div>
          </>
        ) : (
          <div>—</div>
        )}
      </div>
    </div>
  );
}

