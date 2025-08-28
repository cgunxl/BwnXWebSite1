"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function SolarPanelClient({ lang }: { lang: string }) {
  const [monthlyKwh, setMonthlyKwh] = useState<string>('400');
  const [sunHoursPerDay, setSunHoursPerDay] = useState<string>('4.5');
  const [panelWatt, setPanelWatt] = useState<string>('400');
  const [systemLossPct, setSystemLossPct] = useState<string>('20');

  const result = useMemo(() => {
    const kwh = Math.max(0, toNumberSafe(monthlyKwh, 0));
    const sun = Math.max(0, toNumberSafe(sunHoursPerDay, 0));
    const watt = Math.max(1, toNumberSafe(panelWatt, 400));
    const loss = Math.min(0.95, Math.max(0, toNumberSafe(systemLossPct, 0) / 100));
    const perPanelKwhPerDay = (watt / 1000) * sun * (1 - loss);
    const monthlyPerPanel = perPanelKwhPerDay * 30;
    const panels = monthlyPerPanel > 0 ? Math.ceil(kwh / monthlyPerPanel) : Infinity;
    const systemSizeKw = (panels * watt) / 1000;
    return { panels, systemSizeKw, monthlyPerPanel };
  }, [monthlyKwh, sunHoursPerDay, panelWatt, systemLossPct]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Monthly Usage (kWh)</label>
          <input className="input" type="number" min={0} step={1} value={monthlyKwh} onChange={(e)=>setMonthlyKwh(e.target.value)} />
        </div>
        <div>
          <label className="label">Avg Sun Hours / Day</label>
          <input className="input" type="number" min={0} step={0.1} value={sunHoursPerDay} onChange={(e)=>setSunHoursPerDay(e.target.value)} />
        </div>
        <div>
          <label className="label">Panel Wattage (W)</label>
          <input className="input" type="number" min={1} step={1} value={panelWatt} onChange={(e)=>setPanelWatt(e.target.value)} />
        </div>
        <div>
          <label className="label">System Losses (%)</label>
          <input className="input" type="number" min={0} max={95} step={1} value={systemLossPct} onChange={(e)=>setSystemLossPct(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Estimated Panels Needed:</strong> {Number.isFinite(result.panels) ? result.panels : '∞'}</div>
        <div><strong>System Size (kW):</strong> {Number.isFinite(result.systemSizeKw) ? result.systemSizeKw.toFixed(2) : ''}</div>
        <div><strong>Output per Panel (kWh/month):</strong> {result.monthlyPerPanel.toFixed(1)}</div>
      </div>
    </div>
  );
}

