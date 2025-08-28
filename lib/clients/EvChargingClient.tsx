"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function EvChargingClient({ lang }: { lang: string }) {
  const [batteryKwh, setBatteryKwh] = useState<string>('60');
  const [startSocPct, setStartSocPct] = useState<string>('10');
  const [targetSocPct, setTargetSocPct] = useState<string>('80');
  const [chargerKw, setChargerKw] = useState<string>('7.4');
  const [efficiencyPct, setEfficiencyPct] = useState<string>('90');
  const [ratePerKwh, setRatePerKwh] = useState<string>('0');

  const result = useMemo(() => {
    const cap = Math.max(0, toNumberSafe(batteryKwh, 0));
    const s = Math.min(100, Math.max(0, toNumberSafe(startSocPct, 0)));
    const t = Math.min(100, Math.max(0, toNumberSafe(targetSocPct, 0)));
    const kw = Math.max(0.1, toNumberSafe(chargerKw, 0));
    const eff = Math.min(0.99, Math.max(0.1, toNumberSafe(efficiencyPct, 0) / 100));
    const rate = Math.max(0, toNumberSafe(ratePerKwh, 0));
    const deltaPct = Math.max(0, t - s) / 100;
    const energyToAdd = cap * deltaPct; // kWh into battery
    const gridEnergy = energyToAdd / eff; // kWh from grid considering losses
    const hours = gridEnergy / kw;
    const cost = gridEnergy * rate;
    return { energyToAdd, gridEnergy, hours, cost };
  }, [batteryKwh, startSocPct, targetSocPct, chargerKw, efficiencyPct, ratePerKwh]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Battery Capacity (kWh)</label>
          <input className="input" type="number" min={0} step={0.1} value={batteryKwh} onChange={(e)=>setBatteryKwh(e.target.value)} />
        </div>
        <div>
          <label className="label">Start SoC (%)</label>
          <input className="input" type="number" min={0} max={100} step={1} value={startSocPct} onChange={(e)=>setStartSocPct(e.target.value)} />
        </div>
        <div>
          <label className="label">Target SoC (%)</label>
          <input className="input" type="number" min={0} max={100} step={1} value={targetSocPct} onChange={(e)=>setTargetSocPct(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Charger Power (kW)</label>
          <input className="input" type="number" min={0.1} step={0.1} value={chargerKw} onChange={(e)=>setChargerKw(e.target.value)} />
        </div>
        <div>
          <label className="label">Efficiency (%)</label>
          <input className="input" type="number" min={10} max={99} step={1} value={efficiencyPct} onChange={(e)=>setEfficiencyPct(e.target.value)} />
        </div>
        <div>
          <label className="label">Rate (per kWh)</label>
          <input className="input" type="number" min={0} step={0.01} value={ratePerKwh} onChange={(e)=>setRatePerKwh(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Energy Added (kWh):</strong> {result.energyToAdd.toFixed(2)}</div>
        <div><strong>Grid Energy (kWh):</strong> {result.gridEnergy.toFixed(2)}</div>
        <div><strong>Estimated Time (hours):</strong> {Number.isFinite(result.hours) ? result.hours.toFixed(2) : ''}</div>
        <div><strong>Estimated Cost:</strong> {Number.isFinite(result.cost) ? result.cost.toFixed(2) : ''}</div>
      </div>
    </div>
  );
}

