"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function SleepClient({ lang }: { lang: string }) {
  const [wakeHour, setWakeHour] = useState<number>(7);
  const [cycles, setCycles] = useState<number>(5); // 90 min per cycle

  const totalMin = useMemo(() => Math.max(1, cycles) * 90 + 15, [cycles]); // +15min to fall asleep
  const bedtimeHour = useMemo(() => {
    const wakeMin = Math.round(wakeHour * 60);
    let bedMin = wakeMin - totalMin;
    while (bedMin < 0) bedMin += 24 * 60;
    const h = Math.floor(bedMin / 60) % 24;
    const m = bedMin % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
  }, [wakeHour, totalMin]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sl-wake">Wake time (hour 0–23)</label>
          <input id="sl-wake" className="input" type="number" min={0} max={23} step={1} value={wakeHour} onChange={(e) => setWakeHour(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="sl-cycles">Sleep cycles</label>
          <input id="sl-cycles" className="input" type="number" min={1} step={1} value={cycles} onChange={(e) => setCycles(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Suggested bedtime:</strong> {bedtimeHour}</div>
        <small className="muted">Assumes 90‑minute cycles and ~15 minutes to fall asleep.</small>
      </div>
    </div>
  );
}

