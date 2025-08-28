"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

type SpeedUnit = 'Mbps'|'MBps'|'KBps';

function toMBps(speed: number, unit: SpeedUnit): number {
  if (unit === 'MBps') return speed;
  if (unit === 'Mbps') return speed / 8; // 8 bits per byte
  if (unit === 'KBps') return speed / 1024; // 1024 KB in MB
  return speed;
}

export default function DownloadTimeClient({ lang }: { lang: string }) {
  const [sizeMB, setSizeMB] = useState<string>('1000');
  const [speed, setSpeed] = useState<string>('100');
  const [unit, setUnit] = useState<SpeedUnit>('Mbps');
  const [overhead, setOverhead] = useState<string>('10');

  const result = useMemo(() => {
    const size = Math.max(0, toNumberSafe(sizeMB, 0));
    const s = Math.max(0, toNumberSafe(speed, 0));
    const oh = Math.max(0, toNumberSafe(overhead, 0)) / 100;
    const mbps = toMBps(s, unit);
    const effective = mbps * (1 - oh);
    if (effective <= 0) return { seconds: NaN } as any;
    const seconds = size / effective;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.ceil(seconds % 60);
    return { seconds, hours, minutes, secs, effectiveMBps: effective };
  }, [sizeMB, speed, unit, overhead]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">File size (MB)</label>
          <input className="input" type="number" min={0} value={sizeMB} onChange={(e)=>setSizeMB(e.target.value)} />
        </div>
        <div>
          <label className="label">Link speed</label>
          <input className="input" type="number" min={0} value={speed} onChange={(e)=>setSpeed(e.target.value)} />
        </div>
        <div>
          <label className="label">Unit</label>
          <select className="input" value={unit} onChange={(e)=>setUnit(e.target.value as SpeedUnit)}>
            <option>Mbps</option>
            <option>MBps</option>
            <option>KBps</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Protocol overhead (%)</label>
          <input className="input" type="number" min={0} max={90} value={overhead} onChange={(e)=>setOverhead(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Effective speed:</strong> {Number.isFinite(result?.effectiveMBps) ? result.effectiveMBps.toFixed(2) + ' MB/s' : '—'}</div>
        <div><strong>Time:</strong> {Number.isFinite(result?.seconds) ? `${result.hours}h ${result.minutes}m ${result.secs}s` : '—'}</div>
      </div>
      <small className="muted">Effective throughput accounts for protocol overhead. Mbps = megabits/s; MBps = megabytes/s.</small>
    </div>
  );
}

