"use client";

import { useMemo, useState } from 'react';
import { calcVat } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { getCurrencyForCountry } from '@/lib/countries';
import { toNumberSafe } from '@/lib/number';

export default function VatClient({ lang, country }: { lang: string; country?: string }) {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(0.07); // TH VAT 7% default
  const [mode, setMode] = useState<'fromNet'|'fromGross'>('fromNet');
  const [inputVat, setInputVat] = useState<number>(0);

  const currency = country ? getCurrencyForCountry(country) : getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const result = useMemo(() => calcVat(amount, rate, mode, inputVat || undefined), [amount, rate, mode, inputVat]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="vat-amount">Amount</label>
          <input id="vat-amount" className="input" type="number" min={0} value={amount} onChange={(e) => setAmount(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="vat-rate">VAT Rate</label>
          <input id="vat-rate" className="input" type="number" min={0} step={0.001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(rate)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="vat-mode">Mode</label>
          <select id="vat-mode" className="input" value={mode} onChange={(e) => setMode(e.target.value as any)}>
            <option value="fromNet">From net (add VAT)</option>
            <option value="fromGross">From gross (extract VAT)</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="vat-input">Input VAT (optional)</label>
          <input id="vat-input" className="input" type="number" min={0} step={0.01} value={inputVat} onChange={(e) => setInputVat(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Net:</strong> {nf.format(result.netPrice)}</div>
        <div><strong>VAT:</strong> {nf.format(result.vatAmount)}</div>
        <div><strong>Gross:</strong> {nf.format(result.grossPrice)}</div>
        {result.payableVat !== undefined && (
          <div><strong>VAT Payable:</strong> {nf.format(result.payableVat)}</div>
        )}
      </div>
    </div>
  );
}

