"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function ElectricityBillClient({ lang }: { lang: string }) {
  const [usageKWh, setUsageKWh] = useState<string>('350');
  const [ratePerKWh, setRatePerKWh] = useState<string>('4.00');
  const [ftPerKWh, setFtPerKWh] = useState<string>('0.50');
  const [serviceFee, setServiceFee] = useState<string>('38.22');
  const [taxPercent, setTaxPercent] = useState<string>('7');

  const breakdown = useMemo(() => {
    const kwh = Math.max(0, toNumberSafe(usageKWh, 0));
    const rate = Math.max(0, toNumberSafe(ratePerKWh, 0));
    const ft = Math.max(0, toNumberSafe(ftPerKWh, 0));
    const svc = Math.max(0, toNumberSafe(serviceFee, 0));
    const vat = Math.max(0, toNumberSafe(taxPercent, 0)) / 100;

    const energyCharge = kwh * rate;
    const ftCharge = kwh * ft;
    const subtotal = energyCharge + ftCharge + svc;
    const tax = subtotal * vat;
    const total = subtotal + tax;
    return { kwh, energyCharge, ftCharge, serviceFee: svc, subtotal, tax, total };
  }, [usageKWh, ratePerKWh, ftPerKWh, serviceFee, taxPercent]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Usage (kWh)</label>
          <input className="input" type="number" min={0} value={usageKWh} onChange={(e)=>setUsageKWh(e.target.value)} />
        </div>
        <div>
          <label className="label">Energy rate (per kWh)</label>
          <input className="input" type="number" min={0} step={0.01} value={ratePerKWh} onChange={(e)=>setRatePerKWh(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Fuel tariff Ft (per kWh)</label>
          <input className="input" type="number" min={0} step={0.01} value={ftPerKWh} onChange={(e)=>setFtPerKWh(e.target.value)} />
        </div>
        <div>
          <label className="label">Service fee</label>
          <input className="input" type="number" min={0} step={0.01} value={serviceFee} onChange={(e)=>setServiceFee(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Tax (%)</label>
          <input className="input" type="number" min={0} step={0.1} value={taxPercent} onChange={(e)=>setTaxPercent(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Energy charge:</strong> {breakdown.energyCharge.toFixed(2)}</div>
        <div><strong>Ft charge:</strong> {breakdown.ftCharge.toFixed(2)}</div>
        <div><strong>Service fee:</strong> {breakdown.serviceFee.toFixed(2)}</div>
        <div><strong>Subtotal:</strong> {breakdown.subtotal.toFixed(2)}</div>
        <div><strong>Tax:</strong> {breakdown.tax.toFixed(2)}</div>
        <div><strong>Total bill:</strong> {breakdown.total.toFixed(2)}</div>
      </div>
      <small className="muted">Adjust Ft and VAT according to your local utility. Tiered tariffs are not modeled here.</small>
    </div>
  );
}

