"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function OvertimeClient({ lang }: { lang: string }) {
  const [hourly, setHourly] = useState<number>(200);
  const [regularHours, setRegularHours] = useState<number>(40);
  const [overtimeHours, setOvertimeHours] = useState<number>(5);
  const [multiplier, setMultiplier] = useState<number>(1.5);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);

  const regularPay = hourly * regularHours;
  const overtimePay = hourly * multiplier * overtimeHours;
  const total = regularPay + overtimePay;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ot-hourly">Hourly wage</label>
          <input id="ot-hourly" className="input" type="number" min={0} step={0.01} value={hourly} onChange={(e) => setHourly(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="ot-regular">Regular hours</label>
          <input id="ot-regular" className="input" type="number" min={0} step={1} value={regularHours} onChange={(e) => setRegularHours(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ot-hrs">Overtime hours</label>
          <input id="ot-hrs" className="input" type="number" min={0} step={1} value={overtimeHours} onChange={(e) => setOvertimeHours(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="ot-multi">OT multiplier</label>
          <input id="ot-multi" className="input" type="number" min={1} step={0.1} value={multiplier} onChange={(e) => setMultiplier(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Regular pay:</strong> {nf.format(regularPay)}</div>
        <div><strong>Overtime pay:</strong> {nf.format(overtimePay)}</div>
        <div><strong>Total:</strong> {nf.format(total)}</div>
      </div>
    </div>
  );
}

