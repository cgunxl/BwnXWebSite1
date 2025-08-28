"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

type Unit = 'MB'|'GB'|'TB';

function toMB(value: number, unit: Unit): number {
  if (unit === 'MB') return value;
  if (unit === 'GB') return value * 1024;
  if (unit === 'TB') return value * 1024 * 1024;
  return value;
}

export default function DataTransferClient({ lang }: { lang: string }) {
  const [size, setSize] = useState<string>('500');
  const [unit, setUnit] = useState<Unit>('GB');
  const [durationHours, setDurationHours] = useState<string>('24');

  const result = useMemo(() => {
    const s = Math.max(0, toNumberSafe(size, 0));
    const h = Math.max(0, toNumberSafe(durationHours, 0));
    const mb = toMB(s, unit);
    const seconds = h * 3600;
    if (seconds === 0) return { avgMbps: NaN, avgMBps: NaN };
    const avgMBps = mb / seconds;
    const avgMbps = avgMBps * 8;
    return { avgMbps, avgMBps };
  }, [size, unit, durationHours]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Data size</label>
          <input className="input" type="number" min={0} value={size} onChange={(e)=>setSize(e.target.value)} />
        </div>
        <div>
          <label className="label">Unit</label>
          <select className="input" value={unit} onChange={(e)=>setUnit(e.target.value as Unit)}>
            <option>MB</option>
            <option>GB</option>
            <option>TB</option>
          </select>
        </div>
        <div>
          <label className="label">Duration (hours)</label>
          <input className="input" type="number" min={0} value={durationHours} onChange={(e)=>setDurationHours(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Average throughput:</strong> {Number.isFinite(result.avgMbps) ? result.avgMbps.toFixed(2) + ' Mbps' : '—'} ({Number.isFinite(result.avgMBps) ? result.avgMBps.toFixed(2) + ' MB/s' : '—'})</div>
      </div>
    </div>
  );
}

