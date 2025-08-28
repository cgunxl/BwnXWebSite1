"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function ConversionRateClient({ lang }: { lang: string }) {
  const [visits, setVisits] = useState<number>(10000);
  const [conversions, setConversions] = useState<number>(250);

  const conversionRate = useMemo(() => {
    const v = Math.max(1, Math.floor(visits));
    const c = Math.max(0, Math.floor(conversions));
    return (c / v) * 100;
  }, [visits, conversions]);

  const avgLeadsPer1000 = useMemo(() => (conversionRate / 100) * 1000, [conversionRate]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cr-visits">Visits</label>
          <input id="cr-visits" className="input" type="number" min={1} step={1} value={visits} onChange={(e) => setVisits(toNumberSafe(e.target.value, 1))} />
        </div>
        <div>
          <label className="label" htmlFor="cr-conv">Conversions</label>
          <input id="cr-conv" className="input" type="number" min={0} step={1} value={conversions} onChange={(e) => setConversions(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Conversion rate:</strong> {conversionRate.toFixed(2)}%</div>
        <div><strong>Leads per 1,000 visits:</strong> {avgLeadsPer1000.toFixed(1)}</div>
      </div>
    </div>
  );
}

