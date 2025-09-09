import Link from 'next/link';
import { notFound } from 'next/navigation';
import '../../app/globals.css';

const locales = ['en','es','pt','de','fr','ja','ko','zh','th','ar','hi','id','ru','it','nl','vi','fa'] as const;

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!locales.includes(params.locale as any)) notFound();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-[#0F1115cc] backdrop-blur-md border-b border-stroke-soft">
        <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold">BwnXCalculator</Link>
          <div className="flex items-center gap-3">
            <Link href={`/${params.locale}`} className="btn-ghost">Home</Link>
            <Link href={`/${params.locale}/about`} className="btn-ghost">About</Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-stroke-soft py-8 text-sm text-text-secondary">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p>© {new Date().getFullYear()} BwnXCalculator</p>
          <nav className="flex gap-4">
            <Link href={`/${params.locale}/privacy`}>Privacy</Link>
            <Link href={`/${params.locale}/terms`}>Terms</Link>
            <Link href={`/${params.locale}/contact`}>Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

