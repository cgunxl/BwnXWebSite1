"use client";
import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';

type Field = {
  key: string;
  label: string;
  type: 'number' | 'text' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
};

export type CalculatorShellProps = {
  title: string;
  description: string;
  fields: Field[];
  calculate: (values: Record<string, number | string>) => { result: string; series?: { label: string; data: number[] } };
  faq: { q: string; a: string }[];
  related: { label: string; href: string }[];
};

export default function CalculatorShell({ title, description, fields, calculate, faq, related }: CalculatorShellProps) {
  const [values, setValues] = useState<Record<string, number | string>>({});
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => calculate(values), [values, calculate]);

  const onChange = (key: string, value: string) => {
    const numeric = Number(value);
    setValues((v) => ({ ...v, [key]: isNaN(numeric) ? value : numeric }));
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(output.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <header>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-text-secondary mt-2">{description}</p>
        </header>
        <section className="p-5 rounded-xl border border-stroke-soft bg-surface-1 space-y-4">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="text-sm text-text-secondary">{f.label}</span>
              <input
                className="mt-1 w-full input"
                inputMode={f.type === 'number' ? 'decimal' : undefined}
                type={f.type === 'number' ? 'number' : 'text'}
                step={f.step}
                min={f.min}
                max={f.max}
                onChange={(e) => onChange(f.key, e.target.value)}
              />
            </label>
          ))}
          <div className="flex gap-3 pt-2">
            <button className="btn-primary" onClick={() => setValues({})}>Reset</button>
            <button className="btn-ghost" onClick={onCopy}>{copied ? 'Copied' : 'Copy Result'}</button>
          </div>
        </section>
        <section className="p-5 rounded-xl border border-stroke-soft bg-surface-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-text-secondary text-sm">Result</div>
              <div className="text-3xl font-semibold mt-1">{output.result}</div>
            </div>
            {output.series && (
              <div className="w-1/2 min-w-[260px]">
                {/* Placeholder for chart data; integrate chart library later if desired */}
                <div className="text-sm text-text-muted">Chart preview</div>
              </div>
            )}
          </div>
        </section>
        <section className="p-5 rounded-xl border border-stroke-soft bg-surface-1">
          <h2 className="text-xl font-medium">How to use</h2>
          <p className="text-text-secondary mt-2">Enter your values and the result updates instantly. Use Reset to clear inputs and Copy to share results.</p>
        </section>
        <section className="p-5 rounded-xl border border-stroke-soft bg-surface-1">
          <h2 className="text-xl font-medium">FAQ</h2>
          <div className="mt-3 space-y-2">
            {faq.map((f, i) => (
              <details key={i} className="rounded-lg border border-stroke-soft p-3 bg-surface-2">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="text-text-secondary mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <aside className="space-y-4">
        <div className="p-5 rounded-xl border border-stroke-soft bg-surface-1">
          <h3 className="font-medium">Related Calculators</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {related.map((r) => (
              <a key={r.href} href={r.href} className="px-3 py-1 rounded-full border border-[rgba(0,255,198,0.25)] text-accent bg-[rgba(0,255,198,0.1)]">
                {r.label}
              </a>
            ))}
          </div>
        </div>
        <div className="p-5 rounded-xl border border-stroke-soft bg-surface-1">
          <div className="text-sm text-text-muted">Ad Slot</div>
          <div className="mt-2 h-40 rounded-lg bg-[rgba(255,255,255,0.03)] border border-stroke-soft grid place-items-center text-text-secondary">Your Ad Here</div>
        </div>
      </aside>
    </div>
  );
}

