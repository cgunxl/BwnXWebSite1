import Link from 'next/link';

const categories = [
  { id: 'finance', name: 'Finance', emoji: '🏦' },
  { id: 'health', name: 'Health', emoji: '❤️' },
  { id: 'education', name: 'Education', emoji: '📚' },
  { id: 'engineering', name: 'Engineering', emoji: '⚙️' },
  { id: 'lifestyle', name: 'Lifestyle', emoji: '🍔' },
  { id: 'insurance', name: 'Insurance', emoji: '🛡️' },
  { id: 'tech', name: 'Tech', emoji: '💻' },
  { id: 'math', name: 'Math', emoji: '📐' },
  { id: 'conversion', name: 'Conversion', emoji: '🔁' },
  { id: 'business', name: 'Business', emoji: '📈' },
  { id: 'environment', name: 'Environment', emoji: '🌍' },
  { id: 'fun', name: 'Fun', emoji: '🎲' },
  { id: 'logistics', name: 'Logistics', emoji: '📦' },
  { id: 'household', name: 'Household', emoji: '🏠' },
];

export default function LocaleHome({ params }: { params: { locale: string } }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">{params.locale.toUpperCase()} Calculators</h1>
        <p className="text-text-secondary mt-2">Choose a category to explore calculators.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(c => (
          <Link key={c.id} href={`/${params.locale}/${c.id}`} className="block p-5 rounded-xl border border-stroke-soft bg-surface-1 hover:scale-[1.01] transition-transform">
            <div className="text-2xl">{c.emoji}</div>
            <div className="mt-3 font-medium">{c.name}</div>
            <div className="text-sm text-text-muted">Tap to view calculators</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

