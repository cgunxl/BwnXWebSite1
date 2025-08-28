"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function ApiUsageClient({ lang }: { lang: string }) {
  const [requests, setRequests] = useState<string>('1000000');
  const [pricePerThousand, setPricePerThousand] = useState<string>('0.50');
  const [avgLatencyMs, setAvgLatencyMs] = useState<string>('200');

  const result = useMemo(() => {
    const r = Math.max(0, Math.floor(toNumberSafe(requests, 0)));
    const ppt = Math.max(0, toNumberSafe(pricePerThousand, 0));
    const lat = Math.max(0, toNumberSafe(avgLatencyMs, 0));
    const cost = (r / 1000) * ppt;
    const totalComputeHours = (r * lat) / 1000 / 3600;
    return { cost, totalComputeHours };
  }, [requests, pricePerThousand, avgLatencyMs]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Requests (per month)</label>
          <input className="input" type="number" min={0} value={requests} onChange={(e)=>setRequests(e.target.value)} />
        </div>
        <div>
          <label className="label">Price per 1,000 requests</label>
          <input className="input" type="number" min={0} step={0.01} value={pricePerThousand} onChange={(e)=>setPricePerThousand(e.target.value)} />
        </div>
        <div>
          <label className="label">Avg latency (ms)</label>
          <input className="input" type="number" min={0} step={1} value={avgLatencyMs} onChange={(e)=>setAvgLatencyMs(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Estimated cost:</strong> {result.cost.toFixed(2)}</div>
        <div><strong>Total compute time:</strong> {result.totalComputeHours.toFixed(2)} hours</div>
      </div>
      <small className="muted">Adjust for free tiers and tiered pricing as needed.</small>
    </div>
  );
}

