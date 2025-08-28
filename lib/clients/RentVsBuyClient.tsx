"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';
import { calcMortgage } from '@/lib/calculators';

export default function RentVsBuyClient({ lang }: { lang: string }) {
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPercent, setDownPercent] = useState<number>(20);
  const [rateAnnual, setRateAnnual] = useState<number>(6);
  const [years, setYears] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.0); // %/yr of home value
  const [maintenanceRate, setMaintenanceRate] = useState<number>(1.0); // %/yr of home value
  const [closingCosts, setClosingCosts] = useState<number>(5000);
  const [rentMonthly, setRentMonthly] = useState<number>(1800);

  const loanAmount = useMemo(() => Math.max(0, homePrice - (downPercent / 100) * homePrice), [homePrice, downPercent]);
  const mortgage = useMemo(() => calcMortgage(loanAmount, Math.max(0, rateAnnual), Math.max(0, years), Math.max(0, closingCosts)), [loanAmount, rateAnnual, years, closingCosts]);

  const taxMonthly = useMemo(() => (Math.max(0, propertyTaxRate) / 100) * Math.max(0, homePrice) / 12, [propertyTaxRate, homePrice]);
  const maintMonthly = useMemo(() => (Math.max(0, maintenanceRate) / 100) * Math.max(0, homePrice) / 12, [maintenanceRate, homePrice]);
  const ownMonthly = useMemo(() => mortgage.monthly + taxMonthly + maintMonthly, [mortgage.monthly, taxMonthly, maintMonthly]);
  const diff = useMemo(() => ownMonthly - Math.max(0, rentMonthly), [ownMonthly, rentMonthly]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rvb-price">Home price</label>
          <input id="rvb-price" className="input" type="number" min={0} step={1000} value={homePrice} onChange={(e) => setHomePrice(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="rvb-down">Down payment (%)</label>
          <input id="rvb-down" className="input" type="number" min={0} max={100} step={0.1} value={downPercent} onChange={(e) => setDownPercent(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rvb-rate">Rate (APR %)</label>
          <input id="rvb-rate" className="input" type="number" min={0} step={0.01} value={rateAnnual} onChange={(e) => setRateAnnual(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="rvb-years">Years</label>
          <input id="rvb-years" className="input" type="number" min={1} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rvb-tax">Property tax (%/yr)</label>
          <input id="rvb-tax" className="input" type="number" min={0} step={0.01} value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="rvb-maint">Maintenance (%/yr)</label>
          <input id="rvb-maint" className="input" type="number" min={0} step={0.01} value={maintenanceRate} onChange={(e) => setMaintenanceRate(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rvb-close">Closing costs</label>
          <input id="rvb-close" className="input" type="number" min={0} step={100} value={closingCosts} onChange={(e) => setClosingCosts(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="rvb-rent">Rent (monthly)</label>
          <input id="rvb-rent" className="input" type="number" min={0} step={10} value={rentMonthly} onChange={(e) => setRentMonthly(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Loan amount:</strong> {loanAmount.toLocaleString()}</div>
        <div><strong>Mortgage payment:</strong> {mortgage.monthly.toFixed(2)} / mo</div>
        <div><strong>Taxes + maintenance:</strong> {(taxMonthly + maintMonthly).toFixed(2)} / mo</div>
        <div><strong>Owning monthly:</strong> {ownMonthly.toFixed(2)} / mo</div>
        <div><strong>Rent monthly:</strong> {Math.max(0, rentMonthly).toFixed(2)} / mo</div>
        <div><strong>Difference (own - rent):</strong> {diff.toFixed(2)} / mo</div>
      </div>
    </div>
  );
}

