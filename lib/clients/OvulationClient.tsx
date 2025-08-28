"use client";

import { useMemo, useState } from 'react';

function addDays(date: Date, days: number): Date { const d = new Date(date); d.setDate(d.getDate() + days); return d; }

export default function OvulationClient({ lang }: { lang: string }) {
  const [lmp, setLmp] = useState<string>(() => {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  });
  const [cycleLen, setCycleLen] = useState<number>(28);
  const df = useMemo(() => new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }), [lang]);

  const lmpDate = useMemo(() => new Date(lmp), [lmp]);
  const ovulation = useMemo(() => addDays(lmpDate, Math.round(cycleLen) - 14), [lmpDate, cycleLen]);
  const fertileStart = useMemo(() => addDays(ovulation, -5), [ovulation]);
  const fertileEnd = useMemo(() => addDays(ovulation, 1), [ovulation]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ovu-lmp">First day of last period (LMP)</label>
          <input id="ovu-lmp" className="input" type="date" value={lmp} onChange={(e)=>setLmp(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="ovu-cycle">Cycle length (days)</label>
          <input id="ovu-cycle" className="input" type="number" min={20} max={45} value={cycleLen} onChange={(e)=>setCycleLen(Number(e.target.value)||28)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Estimated ovulation:</strong> {df.format(ovulation)}</div>
        <div><strong>Fertile window:</strong> {df.format(fertileStart)} – {df.format(fertileEnd)}</div>
      </div>
      <small className="muted">Estimates based on average physiology; consider LH tests and clinician guidance.</small>
    </div>
  );
}

