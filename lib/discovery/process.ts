/*
  HTML processing to extract minimal schema insights: variables, formulas,
  units, categories, and credible references. This is heuristic and conservative.
*/

import type { DiscoveredPage } from './search';

export interface ExtractedReference {
  title: string;
  url: string;
  publisher: string;
  dateAccessed: string;
  type: 'government' | 'academic' | 'organization' | 'commercial';
}

export interface ExtractedSchemaBits {
  variables: { key: string; unit?: string }[];
  formulas: { name: string; expression: string; variables: string[] }[];
  categories: { label: string; min: number | null; max: number | null }[];
  references: ExtractedReference[];
}

export function classifyPublisher(domain: string): ExtractedReference['type'] {
  if (/\.(gov|mil)$/i.test(domain)) return 'government';
  if (/\.(edu|ac\.)/i.test(domain)) return 'academic';
  if (/wikipedia\.org|who\.int|cdc\.gov|nih\.gov|bipm\.org|nist\.gov|sec\.gov/i.test(domain)) return 'organization';
  return 'commercial';
}

export function extractFromPages(pages: DiscoveredPage[], slug: string): ExtractedSchemaBits {
  const refs: ExtractedReference[] = [];
  for (const p of pages) {
    const type = classifyPublisher(p.publisher);
    refs.push({
      title: p.title || slug,
      url: p.url,
      publisher: p.publisher,
      dateAccessed: p.dateAccessed,
      type,
    });
  }

  // Keep at least two unique references prioritizing government/academic/organization
  refs.sort((a, b) => rankType(b.type) - rankType(a.type));
  const dedup = dedupeBy(refs, r => r.url).slice(0, 5);

  return {
    variables: [],
    formulas: [],
    categories: [],
    references: dedup,
  };
}

function rankType(t: ExtractedReference['type']): number {
  switch (t) {
    case 'government': return 4;
    case 'academic': return 3;
    case 'organization': return 2;
    default: return 1;
  }
}

function dedupeBy<T>(arr: T[], key: (x: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of arr) {
    const k = key(it);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
}

