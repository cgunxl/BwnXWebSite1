"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

type EffUnit = 'l/100km' | 'kmpl' | 'mpg-us';

function toKmpl(value: number, unit: EffUnit): number {
  if (!Number.isFinite(value) || value <= 0) return NaN;
  if (unit === 'kmpl') return value;
  if (unit === 'l/100km') return value === 0 ? NaN : 100 / value;
  // mpg (US) -> km/L
  if (unit === 'mpg-us') return (value * 1.609344) / 3.785411784;
  return NaN;
}

export default function FuelCostClient({ lang }: { lang: string }) {
  const [distanceKm, setDistanceKm] = useState<string>('100');
  const [pricePerL, setPricePerL] = useState<string>('40');
  const [effValue, setEffValue] = useState<string>('15');
  const [effUnit, setEffUnit] = useState<EffUnit>('kmpl');

  const { liters, cost, kmpl } = useMemo(() => {
    const d = Math.max(0, toNumberSafe(distanceKm, 0));
    const price = Math.max(0, toNumberSafe(pricePerL, 0));
    const v = Math.max(0, toNumberSafe(effValue, 0));
    const kmpl = toKmpl(v, effUnit);
    if (!Number.isFinite(kmpl) || kmpl <= 0) return { liters: NaN, cost: NaN, kmpl };
    const liters = d / kmpl;
    const cost = liters * price;
    return { liters, cost, kmpl };
  }, [distanceKm, pricePerL, effValue, effUnit]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Distance (km)</label>
          <input className="input" type="number" min={0} value={distanceKm} onChange={(e)=>setDistanceKm(e.target.value)} />
        </div>
        <div>
          <label className="label">Fuel price (per L)</label>
          <input className="input" type="number" min={0} value={pricePerL} onChange={(e)=>setPricePerL(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Efficiency</label>
          <input className="input" type="number" min={0} value={effValue} onChange={(e)=>setEffValue(e.target.value)} />
        </div>
        <div>
          <label className="label">Unit</label>
          <select className="input" value={effUnit} onChange={(e)=>setEffUnit(e.target.value as EffUnit)}>
            <option value="kmpl">km/L</option>
            <option value="l/100km">L/100km</option>
            <option value="mpg-us">mpg (US)</option>
          </select>
        </div>
      </div>
      <div className="result">
        <div><strong>Fuel needed:</strong> {Number.isFinite(liters) ? liters.toFixed(3) + ' L' : '—'}</div>
        <div><strong>Estimated cost:</strong> {Number.isFinite(cost) ? cost.toFixed(2) : '—'}</div>
      </div>
      <small className="muted">Calculation uses km/L internally. mpg is converted to km/L.</small>
    </div>
  );
}

