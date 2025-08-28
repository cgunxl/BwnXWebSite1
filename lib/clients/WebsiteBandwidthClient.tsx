"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function WebsiteBandwidthClient({ lang }: { lang: string }) {
  const [pageWeightMB, setPageWeightMB] = useState<string>('2');
  const [visitsPerMonth, setVisitsPerMonth] = useState<string>('100000');
  const [pagesPerVisit, setPagesPerVisit] = useState<string>('2');
  const [overheadPct, setOverheadPct] = useState<string>('30');

  const result = useMemo(() => {
    const w = Math.max(0, toNumberSafe(pageWeightMB, 0));
    const v = Math.max(0, Math.floor(toNumberSafe(visitsPerMonth, 0)));
    const p = Math.max(0, toNumberSafe(pagesPerVisit, 0));
    const oh = Math.max(0, toNumberSafe(overheadPct, 0)) / 100;
    const totalMb = w * v * p;
    const totalGB = totalMb / 1024;
    const secondsPerMonth = 30 * 24 * 3600;
    const avgMbps = (totalMb * 8) / secondsPerMonth;
    const recommendedMbps = avgMbps * (1 + oh);
    const recommendedGbps = recommendedMbps / 1000;
    return { totalGB, avgMbps, recommendedMbps, recommendedGbps };
  }, [pageWeightMB, visitsPerMonth, pagesPerVisit, overheadPct]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Average page weight (MB)</label>
          <input className="input" type="number" min={0} step={0.01} value={pageWeightMB} onChange={(e)=>setPageWeightMB(e.target.value)} />
        </div>
        <div>
          <label className="label">Visits per month</label>
          <input className="input" type="number" min={0} step={1} value={visitsPerMonth} onChange={(e)=>setVisitsPerMonth(e.target.value)} />
        </div>
        <div>
          <label className="label">Pages per visit</label>
          <input className="input" type="number" min={0} step={0.1} value={pagesPerVisit} onChange={(e)=>setPagesPerVisit(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Overhead / headroom (%)</label>
          <input className="input" type="number" min={0} step={1} value={overheadPct} onChange={(e)=>setOverheadPct(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Monthly transfer:</strong> {result.totalGB.toFixed(2)} GB</div>
        <div><strong>Average throughput:</strong> {result.avgMbps.toFixed(2)} Mbps</div>
        <div><strong>Recommended capacity:</strong> {result.recommendedMbps.toFixed(2)} Mbps ({result.recommendedGbps.toFixed(3)} Gbps)</div>
      </div>
      <small className="muted">Uses 30-day month approximation. Include caching/CDN effects in page weight if applicable.</small>
    </div>
  );
}

