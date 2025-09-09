import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-[80vh] grid place-items-center">
      <div className="absolute inset-0 scan-lines" aria-hidden />
      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">BwnXCalculator</h1>
          <p className="mt-4 text-text-secondary max-w-xl">
            Explore 430+ calculators across finance, health, education, and more. Fully localized in 17 languages.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/en" className="btn-primary animate-glow">Get Started</Link>
            <Link href="/en/about" className="btn-ghost">About</Link>
          </div>
        </div>
        <figure className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-glow">
          <svg viewBox="0 0 800 600" className="w-full h-full">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#66FFF5" />
                <stop offset="100%" stopColor="#00FFC6" />
              </linearGradient>
            </defs>
            <polyline points="0,320 120,280 240,340 360,300 480,360 600,320 800,360" fill="none" stroke="url(#g)" strokeWidth="2">
              <animate attributeName="stroke-dashoffset" from="280" to="0" dur="2.8s" fill="freeze" />
            </polyline>
          </svg>
        </figure>
      </div>
    </main>
  );
}

