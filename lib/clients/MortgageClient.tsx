"use client";

import { useMemo, useState } from 'react';
import { calcMortgage, buildAmortizationSchedule, scheduleToCsv } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { getCurrencyForCountry } from '@/lib/countries';
import { toNumberSafe } from '@/lib/number';

export default function MortgageClient({ lang, country }: { lang: string, country?: string }) {
  const [principal, setPrincipal] = useState<number>(300000);
  const [rate, setRate] = useState<number>(6.75);
  const [years, setYears] = useState<number>(30);
  const [closing, setClosing] = useState<number>(6000);

  const currency = country ? getCurrencyForCountry(country) : getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const result = useMemo(() => calcMortgage(principal, rate, years, closing), [principal, rate, years, closing]);
  const schedule = useMemo(() => buildAmortizationSchedule(principal + closing, rate, years), [principal, closing, rate, years]);
  const csvHref = useMemo(() => {
    const blob = new Blob([scheduleToCsv(schedule)], { type: 'text/csv' });
    return URL.createObjectURL(blob);
  }, [schedule]);

  return (
    <div className="card" style={{marginTop: 12}}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mortgage-principal">{t(lang, 'principal')}</label>
          <input id="mortgage-principal" className="input" type="number" min={0} value={principal} onChange={(e) => setPrincipal(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="mortgage-rate">{t(lang, 'interestRate')}</label>
          <input id="mortgage-rate" className="input" type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mortgage-years">{t(lang, 'years')}</label>
          <input id="mortgage-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="mortgage-closing">{t(lang, 'closingCosts')}</label>
          <input id="mortgage-closing" className="input" type="number" min={0} step={1} value={closing} onChange={(e) => setClosing(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>{t(lang, 'monthlyPayment')}:</strong> {nf.format(result.monthly || 0)}</div>
        <div><strong>{t(lang, 'totalRepayment')}:</strong> {nf.format(result.total || 0)}</div>
        <div><strong>{t(lang, 'totalInterest')}:</strong> {nf.format(result.interest || 0)}</div>
      </div>
      <details className="card" style={{ marginTop: 12 }}>
        <summary>{t(lang, 'amortizationSchedule')}</summary>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', marginTop: 8 }}>
            <thead>
              <tr>
                <th>{t(lang, 'month')}</th>
                <th>{t(lang, 'monthlyPayment')}</th>
                <th>{t(lang, 'principalPaid')}</th>
                <th>{t(lang, 'interestPaid')}</th>
                <th>{t(lang, 'balance')}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.slice(0, 360).map((r) => (
                <tr key={r.monthIndex}>
                  <td>{r.monthIndex}</td>
                  <td>{nf.format(r.payment)}</td>
                  <td>{nf.format(r.principalPaid)}</td>
                  <td>{nf.format(r.interestPaid)}</td>
                  <td>{nf.format(r.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a className="button ghost" download="schedule.csv" href={csvHref} style={{ marginTop: 8 }}>{t(lang, 'downloadCsv')}</a>
      </details>
    </div>
  );
}