"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function StreamingBandwidthClient({ lang }: { lang: string }) {
  const [bitrateMbps, setBitrateMbps] = useState<string>('5');
  const [concurrent, setConcurrent] = useState<string>('100');
  const [headroomPct, setHeadroomPct] = useState<string>('25');

  const result = useMemo(() => {
    const b = Math.max(0, toNumberSafe(bitrateMbps, 0));
    const c = Math.max(0, Math.floor(toNumberSafe(concurrent, 0)));
    const h = Math.max(0, toNumberSafe(headroomPct, 0)) / 100;
    const baseline = b * c;
    const recommended = baseline * (1 + h);
    const gbps = recommended / 1000;
    const monthlyGB = (baseline * 3600 * 24 * 30) / 8 / 1024; // Mbps -> MB/s -> GB
    return { baseline, recommended, gbps, monthlyGB };
  }, [bitrateMbps, concurrent, headroomPct]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Per-stream bitrate (Mbps)</label>
          <input className="input" type="number" min={0} step={0.1} value={bitrateMbps} onChange={(e)=>setBitrateMbps(e.target.value)} />
        </div>
        <div>
          <label className="label">Concurrent viewers</label>
          <input className="input" type="number" min={0} step={1} value={concurrent} onChange={(e)=>setConcurrent(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Headroom (%)</label>
          <input className="input" type="number" min={0} step={1} value={headroomPct} onChange={(e)=>setHeadroomPct(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Baseline throughput:</strong> {result.baseline.toFixed(2)} Mbps</div>
        <div><strong>Recommended capacity:</strong> {result.recommended.toFixed(2)} Mbps ({result.gbps.toFixed(3)} Gbps)</div>
        <div><strong>Monthly egress (est):</strong> {result.monthlyGB.toFixed(2)} GB</div>
      </div>
      <small className="muted">For ABR, use weighted average bitrate. Include CDN offload in planning.</small>
    </div>
  );
}

