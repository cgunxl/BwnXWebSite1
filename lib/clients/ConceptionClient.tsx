"use client";

import { useMemo, useState } from 'react';

function addDays(date: Date, days: number): Date { const d = new Date(date); d.setDate(d.getDate() + days); return d; }

export default function ConceptionClient({ lang }: { lang: string }) {
  const [edd, setEdd] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 280);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  });
  const df = useMemo(() => new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }), [lang]);
  const eddDate = useMemo(() => new Date(edd), [edd]);
  const conception = useMemo(() => addDays(eddDate, -266), [eddDate]);
  const lmpApprox = useMemo(() => addDays(eddDate, -280), [eddDate]);
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="concep-edd">Estimated due date (EDD)</label>
          <input id="concep-edd" className="input" type="date" value={edd} onChange={(e)=>setEdd(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Estimated conception:</strong> {df.format(conception)}</div>
        <div><strong>Approx. LMP:</strong> {df.format(lmpApprox)}</div>
      </div>
      <small className="muted">Conception date varies; this is an estimate based on average luteal phase length.</small>
    </div>
  );
}

