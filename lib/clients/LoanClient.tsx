"use client";

import { useMemo, useState } from 'react';
import { calcLoan, buildAmortizationSchedule, scheduleToCsv } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { getCurrencyForCountry } from '@/lib/countries';
import { toNumberSafe } from '@/lib/number';
import FaqHowToClient from './FaqHowToClient';

export default function LoanClient({ lang, country }: { lang: string, country?: string }) {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(7.5);
  const [years, setYears] = useState<number>(3);

  const currency = country ? getCurrencyForCountry(country) : getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const result = useMemo(() => calcLoan(principal, rate, years), [principal, rate, years]);
  const schedule = useMemo(() => buildAmortizationSchedule(principal, rate, years), [principal, rate, years]);
  const csvHref = useMemo(() => {
    const blob = new Blob([scheduleToCsv(schedule)], { type: 'text/csv' });
    return URL.createObjectURL(blob);
  }, [schedule]);

  return (
    <div className="card" style={{marginTop: 12}}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="loan-principal">{t(lang, 'principal')}</label>
          <input id="loan-principal" className="input" type="number" min={0} value={principal} onChange={(e) => setPrincipal(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="loan-rate">{t(lang, 'interestRate')}</label>
          <input id="loan-rate" className="input" type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="loan-years">{t(lang, 'years')}</label>
          <input id="loan-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}} aria-hidden>
          <button className="button" type="button" disabled>{t(lang, 'results')}</button>
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
      <FaqHowToClient lang={lang} slug="loan" />
    </div>
  );
}