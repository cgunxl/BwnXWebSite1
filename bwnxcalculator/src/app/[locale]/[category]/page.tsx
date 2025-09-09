import Link from 'next/link';
import { notFound } from 'next/navigation';

const categoryToSlugs: Record<string, { slug: string; name: string }[]> = {
  finance: [
    { slug: 'loan-calculator', name: 'Loan Calculator' },
    { slug: 'mortgage-calculator', name: 'Mortgage Calculator' },
    { slug: 'compound-interest', name: 'Compound Interest' },
    { slug: 'roi-calculator', name: 'ROI Calculator' },
  ],
  health: [
    { slug: 'bmi-calculator', name: 'BMI Calculator' },
    { slug: 'bmr-calculator', name: 'BMR Calculator' },
    { slug: 'calorie-calculator', name: 'Calorie Calculator' },
    { slug: 'sleep-calculator', name: 'Sleep Calculator' },
  ],
};

export default function CategoryPage({ params }: { params: { locale: string; category: string } }) {
  const items = categoryToSlugs[params.category];
  if (!items) notFound();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold capitalize">{params.category}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <Link key={it.slug} href={`/${params.locale}/${params.category}/${it.slug}`} className="block p-5 rounded-xl border border-stroke-soft bg-surface-1 hover:scale-[1.01] transition-transform">
            <div className="font-medium">{it.name}</div>
            <div className="text-sm text-text-muted">Open</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

