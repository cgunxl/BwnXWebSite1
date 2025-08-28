"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';
import { calcLoan } from '@/lib/calculators';

export default function CarLoanClient({ lang }: { lang: string }) {
  const [price, setPrice] = useState<number>(800000);
  const [down, setDown] = useState<number>(100000);
  const [fees, setFees] = useState<number>(10000);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(0.07);
  const [rate, setRate] = useState<number>(0.045);
  const [years, setYears] = useState<number>(5);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const taxableAmount = Math.max(0, price - down);
  const purchaseTax = taxableAmount * Math.max(0, salesTaxRate);
  const principal = Math.max(0, price - down + fees + purchaseTax);
  const res = useMemo(() => calcLoan(principal, rate * 100, years), [principal, rate, years]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="car-price">Vehicle price</label>
          <input id="car-price" className="input" type="number" min={0} value={price} onChange={(e) => setPrice(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="car-down">Down payment</label>
          <input id="car-down" className="input" type="number" min={0} value={down} onChange={(e) => setDown(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="car-fees">Fees</label>
          <input id="car-fees" className="input" type="number" min={0} value={fees} onChange={(e) => setFees(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="car-tax">Sales tax rate</label>
          <input id="car-tax" className="input" type="number" min={0} step={0.0001} value={salesTaxRate} onChange={(e) => setSalesTaxRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(salesTaxRate)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="car-rate">APR</label>
          <input id="car-rate" className="input" type="number" min={0} step={0.0001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(rate)}</small>
        </div>
        <div>
          <label className="label" htmlFor="car-years">{t(lang, 'years')}</label>
          <input id="car-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Purchase tax:</strong> {nf.format(purchaseTax)}</div>
        <div><strong>Loan principal:</strong> {nf.format(principal)}</div>
        <div><strong>{t(lang, 'monthlyPayment')}:</strong> {nf.format(res.monthly)}</div>
        <div><strong>{t(lang, 'totalRepayment')}:</strong> {nf.format(res.total)}</div>
        <div><strong>{t(lang, 'totalInterest')}:</strong> {nf.format(res.interest)}</div>
      </div>
      <small className="muted">Includes estimated sales tax; actual tax rules vary by jurisdiction.</small>
    </div>
  );
}

