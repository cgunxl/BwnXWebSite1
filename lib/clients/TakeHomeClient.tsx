"use client";

import { useMemo, useState } from 'react';
import { calcTakeHome } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { getCurrencyForCountry, getTaxBracketsForCountry } from '@/lib/countries';
import { toNumberSafe } from '@/lib/number';

export default function TakeHomeClient({ lang, country }: { lang: string; country?: string }) {
  const [income, setIncome] = useState<number>(480000); // default annual
  const [socialRate, setSocialRate] = useState<number>(0.05); // 5% default (adjust per country on page later)

  const currency = country ? getCurrencyForCountry(country) : getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const brackets = useMemo(() => getTaxBracketsForCountry(country), [country]);
  const result = useMemo(() => calcTakeHome(income, brackets, socialRate), [income, brackets, socialRate]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="th-income">{t(lang, 'income')}</label>
          <input id="th-income" className="input" type="number" min={0} value={income} onChange={(e) => setIncome(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="th-social">{t(lang, 'premiumRate')}</label>
          <input id="th-social" className="input" type="number" min={0} step={0.001} value={socialRate} onChange={(e) => setSocialRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(socialRate)} payroll/social contributions</small>
        </div>
      </div>
      <div className="result">
        <div><strong>{t(lang, 'totalTax')}:</strong> {nf.format(result.taxAnnual || 0)}</div>
        <div><strong>Social:</strong> {nf.format(result.socialAnnual || 0)}</div>
        <div><strong>Net (annual):</strong> {nf.format(result.netAnnual || 0)}</div>
        <div><strong>Net (monthly):</strong> {nf.format(result.netMonthly || 0)}</div>
      </div>
    </div>
  );
}

