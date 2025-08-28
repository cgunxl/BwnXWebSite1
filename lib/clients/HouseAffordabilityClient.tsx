"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function paymentFactor(monthlyRate: number, totalMonths: number): number {
  if (totalMonths <= 0) return NaN;
  if (monthlyRate <= 0) return 1 / totalMonths;
  return monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths));
}

export default function HouseAffordabilityClient({ lang }: { lang: string }) {
  const [annualIncome, setAnnualIncome] = useState<string>('1200000');
  const [downPayment, setDownPayment] = useState<string>('300000');
  const [ratePct, setRatePct] = useState<string>('6.5');
  const [years, setYears] = useState<string>('30');
  const [propertyTaxPct, setPropertyTaxPct] = useState<string>('0.6'); // % of home value per year
  const [insuranceMonthly, setInsuranceMonthly] = useState<string>('1500');
  const [hoaMonthly, setHoaMonthly] = useState<string>('0');
  const [otherDebtsMonthly, setOtherDebtsMonthly] = useState<string>('0');
  const [dtiPct, setDtiPct] = useState<string>('36');

  const result = useMemo(() => {
    const incomeYear = Math.max(0, toNumberSafe(annualIncome, 0));
    const dp = Math.max(0, toNumberSafe(downPayment, 0));
    const r = Math.max(0, toNumberSafe(ratePct, 0)) / 100 / 12;
    const n = Math.max(1, Math.floor(toNumberSafe(years, 0))) * 12;
    const taxRateAnnual = Math.max(0, toNumberSafe(propertyTaxPct, 0)) / 100;
    const ins = Math.max(0, toNumberSafe(insuranceMonthly, 0));
    const hoa = Math.max(0, toNumberSafe(hoaMonthly, 0));
    const other = Math.max(0, toNumberSafe(otherDebtsMonthly, 0));
    const dti = Math.max(0, toNumberSafe(dtiPct, 0)) / 100;

    const monthlyIncome = incomeYear / 12;
    const monthlyDTICeiling = monthlyIncome * dti;
    const a = paymentFactor(r, n); // payment per 1 unit of principal
    const taxMonthlyFactor = taxRateAnnual / 12; // monthly tax per 1 unit of price

    const denom = a + taxMonthlyFactor;
    if (!Number.isFinite(denom) || denom <= 0) {
      return { homePrice: NaN, loanAmount: NaN, pAndI: NaN, taxes: NaN, allIn: NaN };
    }
    const rhs = monthlyDTICeiling - ins - hoa - other + a * dp;
    const homePrice = rhs / denom;
    const loanAmount = Math.max(0, homePrice - dp);
    const pAndI = a * loanAmount;
    const taxes = taxMonthlyFactor * homePrice;
    const allIn = pAndI + taxes + ins + hoa + other;

    return { homePrice, loanAmount, pAndI, taxes, allIn };
  }, [annualIncome, downPayment, ratePct, years, propertyTaxPct, insuranceMonthly, hoaMonthly, otherDebtsMonthly, dtiPct]);

  const nf = useMemo(() => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }), []);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Annual Income</label>
          <input className="input" type="number" min={0} value={annualIncome} onChange={(e)=>setAnnualIncome(e.target.value)} />
        </div>
        <div>
          <label className="label">Down Payment</label>
          <input className="input" type="number" min={0} value={downPayment} onChange={(e)=>setDownPayment(e.target.value)} />
        </div>
        <div>
          <label className="label">Interest Rate (%/yr)</label>
          <input className="input" type="number" min={0} step={0.01} value={ratePct} onChange={(e)=>setRatePct(e.target.value)} />
        </div>
        <div>
          <label className="label">Term (years)</label>
          <input className="input" type="number" min={1} step={1} value={years} onChange={(e)=>setYears(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Property Tax (% of value/yr)</label>
          <input className="input" type="number" min={0} step={0.01} value={propertyTaxPct} onChange={(e)=>setPropertyTaxPct(e.target.value)} />
        </div>
        <div>
          <label className="label">Home Insurance (monthly)</label>
          <input className="input" type="number" min={0} value={insuranceMonthly} onChange={(e)=>setInsuranceMonthly(e.target.value)} />
        </div>
        <div>
          <label className="label">HOA (monthly)</label>
          <input className="input" type="number" min={0} value={hoaMonthly} onChange={(e)=>setHoaMonthly(e.target.value)} />
        </div>
        <div>
          <label className="label">Other Debts (monthly)</label>
          <input className="input" type="number" min={0} value={otherDebtsMonthly} onChange={(e)=>setOtherDebtsMonthly(e.target.value)} />
        </div>
        <div>
          <label className="label">Max DTI (%)</label>
          <input className="input" type="number" min={0} step={0.1} value={dtiPct} onChange={(e)=>setDtiPct(e.target.value)} />
        </div>
      </div>

      <div className="result">
        <div><strong>Max Home Price:</strong> {nf.format(result.homePrice)}</div>
        <div><strong>Estimated Loan Amount:</strong> {nf.format(result.loanAmount)}</div>
        <div><strong>Monthly P&I:</strong> {nf.format(result.pAndI)}</div>
        <div><strong>Monthly Property Tax:</strong> {nf.format(result.taxes)}</div>
        <div><strong>All-in Housing + Debts (DTI):</strong> {nf.format(result.allIn)}</div>
      </div>
    </div>
  );
}

