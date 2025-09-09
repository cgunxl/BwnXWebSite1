import type { Metadata } from 'next';
import Script from 'next/script';
import CalculatorShell from '@/components/CalculatorShell';
import { faqJsonLd, breadcrumbsJsonLd, articleJsonLd, howToJsonLd, makeHreflang } from '@/lib/seo';

type Definition = {
  title: string;
  description: string;
  fields: { key: string; label: string; type: 'number' | 'text' }[];
  calculate: (values: Record<string, number | string>) => { result: string };
  faq: { q: string; a: string }[];
  related: { label: string; href: string }[];
};

const registry: Record<string, Definition> = {
  'bmi-calculator': {
    title: 'BMI Calculator',
    description: 'Calculate Body Mass Index from height and weight instantly.',
    fields: [
      { key: 'weight', label: 'Weight (kg)', type: 'number' },
      { key: 'height', label: 'Height (cm)', type: 'number' }
    ],
    calculate: (v) => {
      const w = Number(v.weight || 0);
      const h = Number(v.height || 0) / 100;
      const bmi = h > 0 ? w / (h * h) : 0;
      let cat = 'Underweight';
      if (bmi >= 18.5 && bmi < 25) cat = 'Normal';
      else if (bmi >= 25 && bmi < 30) cat = 'Overweight';
      else if (bmi >= 30) cat = 'Obese';
      return { result: `${bmi ? bmi.toFixed(1) : '0.0'} (${cat})` };
    },
    faq: [
      { q: 'What is BMI?', a: 'BMI is a screening tool that estimates body fat based on height and weight.' },
      { q: 'Is BMI accurate?', a: 'It is a general guide and may not fit athletes and some populations.' }
    ],
    related: [
      { label: 'BMR Calculator', href: '../bmr-calculator' },
      { label: 'Calorie Calculator', href: '../calorie-calculator' }
    ]
  },
  'loan-calculator': {
    title: 'Loan Calculator',
    description: 'Estimate monthly payment from principal, rate, and term.',
    fields: [
      { key: 'principal', label: 'Principal', type: 'number' },
      { key: 'rate', label: 'Annual Rate (%)', type: 'number' },
      { key: 'years', label: 'Term (years)', type: 'number' }
    ],
    calculate: (v) => {
      const P = Number(v.principal || 0);
      const r = Number(v.rate || 0) / 100 / 12;
      const n = Number(v.years || 0) * 12;
      const m = r === 0 || n === 0 ? 0 : (P * r) / (1 - Math.pow(1 + r, -n));
      return { result: m ? `$${m.toFixed(2)} / mo` : '$0.00 / mo' };
    },
    faq: [
      { q: 'How is payment calculated?', a: 'Using standard amortization formula with monthly compounding.' },
      { q: 'What about fees?', a: 'For total cost include taxes and fees outside this simple model.' }
    ],
    related: [
      { label: 'Mortgage Calculator', href: '../mortgage-calculator' },
      { label: 'Amortization', href: '../amortization' }
    ]
  }
};

export async function generateMetadata({ params }: { params: { locale: string; category: string; slug: string } }): Promise<Metadata> {
  const def = registry[params.slug] ?? { title: params.slug, description: '' } as any;
  const base = 'https://bwnxcalculator.vercel.app';
  const url = `${base}/${params.locale}/${params.category}/${params.slug}`;
  return {
    title: `${def.title} | BwnXCalculator`,
    description: def.description,
    alternates: { canonical: url },
    openGraph: { url, title: def.title, description: def.description }
  };
}

export default function CalculatorPage({ params }: { params: { locale: string; category: string; slug: string } }) {
  const def = registry[params.slug];
  if (!def) return <div>Not implemented yet.</div>;
  const base = 'https://bwnxcalculator.vercel.app';
  const url = `${base}/${params.locale}/${params.category}/${params.slug}`;

  const faq = faqJsonLd(def.faq);
  const crumbs = breadcrumbsJsonLd([
    { name: 'Home', item: `${base}/${params.locale}` },
    { name: def.title.split(' ')[0], item: `${base}/${params.locale}/${params.category}` },
    { name: def.title, item: url }
  ]);
  const article = articleJsonLd({ title: def.title, description: def.description, url });
  const howto = howToJsonLd(['Enter inputs', 'Press calculate', 'Review result and chart']);

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <Script id="breadcrumbs-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <Script id="howto-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howto) }} />
      <CalculatorShell {...def} />
    </>
  );
}

