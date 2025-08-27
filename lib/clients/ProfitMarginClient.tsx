"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function ProfitMarginClient({ lang }: { lang: string }) {
  const [revenue, setRevenue] = useState<number>(100000);
  const [cogs, setCogs] = useState<number>(60000);
  const [opex, setOpex] = useState<number>(20000);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const grossProfit = Math.max(0, revenue - cogs);
  const operatingProfit = Math.max(0, grossProfit - opex);
  const grossMargin = revenue > 0 ? grossProfit / revenue : 0;
  const operatingMargin = revenue > 0 ? operatingProfit / revenue : 0;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="pm-rev">Revenue</label>
          <input id="pm-rev" className="input" type="number" min={0} value={revenue} onChange={(e) => setRevenue(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="pm-cogs">COGS</label>
          <input id="pm-cogs" className="input" type="number" min={0} value={cogs} onChange={(e) => setCogs(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="pm-opex">Operating expenses</label>
          <input id="pm-opex" className="input" type="number" min={0} value={opex} onChange={(e) => setOpex(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Gross profit:</strong> {nf.format(grossProfit)} ({pf.format(grossMargin)})</div>
        <div><strong>Operating profit:</strong> {nf.format(operatingProfit)} ({pf.format(operatingMargin)})</div>
      </div>
    </div>
  );
}

