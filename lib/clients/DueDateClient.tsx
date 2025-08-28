"use client";

import { useMemo, useState } from 'react';

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export default function DueDateClient({ lang }: { lang: string }) {
  const [lmp, setLmp] = useState<string>(() => {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  });
  const [cycleLen, setCycleLen] = useState<number>(28);

  const df = useMemo(() => new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }), [lang]);

  const lmpDate = useMemo(() => new Date(lmp), [lmp]);
  const edd = useMemo(() => addDays(lmpDate, 280 + (Math.round(cycleLen) - 28)), [lmpDate, cycleLen]);
  const w12 = useMemo(() => addDays(lmpDate, 84), [lmpDate]);
  const w20 = useMemo(() => addDays(lmpDate, 140), [lmpDate]);
  const w37 = useMemo(() => addDays(lmpDate, 259), [lmpDate]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="due-lmp">First day of last period (LMP)</label>
          <input id="due-lmp" className="input" type="date" value={lmp} onChange={(e)=>setLmp(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="due-cycle">Cycle length (days)</label>
          <input id="due-cycle" className="input" type="number" min={20} max={45} value={cycleLen} onChange={(e)=>setCycleLen(Number(e.target.value)||28)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Estimated Due Date (EDD):</strong> {df.format(edd)}</div>
        <div><strong>End of 1st trimester (12w):</strong> {df.format(w12)}</div>
        <div><strong>Anatomy scan (≈20w):</strong> {df.format(w20)}</div>
        <div><strong>Term (≥37w):</strong> {df.format(w37)}</div>
      </div>
      <small className="muted">Estimate based on Naegele’s rule; actual due date varies. For medical decisions, consult clinicians.</small>
    </div>
  );
}

