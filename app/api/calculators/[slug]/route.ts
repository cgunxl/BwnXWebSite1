import { NextRequest } from 'next/server';
import { discoverSourcesForCalculator } from '@/lib/discovery/search';
import { extractFromPages } from '@/lib/discovery/process';
import { getCalculatorBySlug } from '@/lib/calculators/registry';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/').pop() as string;
  const locale = req.nextUrl.searchParams.get('locale') || 'en';
  const base = getCalculatorBySlug(slug);
  if (!base) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  const pages = await discoverSourcesForCalculator(slug, { locale, category: base.category, limitPerQuery: 5 });
  const extracted = extractFromPages(pages, slug);

  return Response.json({
    slug,
    locale,
    category: base.category,
    references: extracted.references,
  });
}

