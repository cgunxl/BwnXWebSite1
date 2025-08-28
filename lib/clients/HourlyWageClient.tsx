"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function HourlyWageClient({ lang }: { lang: string }) {
  const [hourly, setHourly] = useState<number>(200);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);

  const weekly = hourly * hoursPerWeek;
  const annual = hourly * hoursPerWeek * weeksPerYear;
  const monthly = annual / 12;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="hw-hourly">Hourly wage</label>
          <input id="hw-hourly" className="input" type="number" min={0} step={0.01} value={hourly} onChange={(e) => setHourly(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="hw-hrs">Hours/week</label>
          <input id="hw-hrs" className="input" type="number" min={0} step={1} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="hw-weeks">Weeks/year</label>
          <input id="hw-weeks" className="input" type="number" min={1} step={1} value={weeksPerYear} onChange={(e) => setWeeksPerYear(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Weekly:</strong> {nf.format(weekly)}</div>
        <div><strong>Monthly:</strong> {nf.format(monthly)}</div>
        <div><strong>Annual:</strong> {nf.format(annual)}</div>
      </div>
    </div>
  );
}

