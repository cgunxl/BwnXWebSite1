"use client";
import { useMemo, useState } from 'react';
import type { AmortRow } from '@/lib/loan';
import { toCSV } from '@/lib/loan';
import type { Locale } from '@/i18n/config';
import { getLabels } from '@/i18n/config';

export default function AmortTable({ locale, rows, currencySymbol }: { locale: Locale; rows: AmortRow[]; currencySymbol: string }) {
  const L = getLabels(locale);
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? rows : rows.slice(0, 12);
  const csv = useMemo(() => toCSV(rows), [rows]);

  function download() {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amortization.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="card">
      <div className="inline" style={{ justifyContent: 'space-between', width: '100%' }}>
        <button className="ghost" type="button" onClick={() => setExpanded(v => !v)}>{expanded ? 'Hide' : L.showAll}</button>
        <button type="button" onClick={download}>{L.downloadCsv}</button>
      </div>
      <div className="spacer" />
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Payment</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {visible.map(r => (
            <tr key={r.month}>
              <td>{r.month}</td>
              <td>{currencySymbol}{r.payment.toFixed(2)}</td>
              <td>{currencySymbol}{r.interest.toFixed(2)}</td>
              <td>{currencySymbol}{r.principal.toFixed(2)}</td>
              <td>{currencySymbol}{r.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
