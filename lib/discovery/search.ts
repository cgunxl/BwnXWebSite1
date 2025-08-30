/*
  Internal web discovery (no external SDK/API). Fetches public HTML pages,
  respects robots.txt in a best-effort way, and returns lightweight page info
  for schema enrichment. Designed to be used server-side only.
*/

export interface DiscoveredPage {
  url: string;
  title: string;
  publisher: string;
  htmlSnippet: string;
  dateAccessed: string; // ISO8601
}

export interface DiscoveryOptions {
  locale: string; // e.g., 'en', 'th'
  category?: string;
  limitPerQuery?: number; // default 5
}

// Build candidate URLs from topic/slug heuristics (no search engine SDK)
export function buildCandidateUrls(slug: string, options: DiscoveryOptions): string[] {
  const { locale, category } = options;
  const topicWords = slug.replace(/-/g, ' ');
  const wikiTitle = topicWords
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('_');

  const lang = ['en','es','pt','de','fr','ja','ko','zh','th','ar','hi','id','ru','it','nl','vi','fa'].includes(locale)
    ? locale
    : 'en';

  // Always include Wikipedia in local language, then English fallback
  const candidates: string[] = [
    `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(wikiTitle)}`,
    `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiTitle)}`,
  ];

  // Category/slug-specific authoritative domains
  const slugLc = slug.toLowerCase();
  if (category === 'finance' || /loan|mortgage|tax|interest|roi|npv|irr|dividend|stock|salary|paycheck|vat|sales-tax/.test(slugLc)) {
    candidates.push(
      'https://www.investopedia.com/',
      'https://www.irs.gov/',
      'https://www.sec.gov/',
    );
  }
  if (category === 'health' || /bmi|bmr|calorie|cholesterol|insulin|ivf|pregnancy|vo2|max|heart|sleep|stress/.test(slugLc)) {
    candidates.push(
      'https://www.who.int/',
      'https://www.cdc.gov/',
      'https://www.nih.gov/',
    );
  }
  if (category === 'education' || category === 'mathematics' || /probability|variance|regression|derivative|integral|matrix|limit|anova|distribution/.test(slugLc)) {
    candidates.push(
      'https://mathworld.wolfram.com/',
      'https://ocw.mit.edu/',
      'https://www.khanacademy.org/',
    );
  }
  if (category === 'conversion' || /converter|convert|unit|temperature|speed|pressure|energy|power|volume|area|length|weight/.test(slugLc)) {
    candidates.push(
      'https://physics.nist.gov/',
      'https://www.bipm.org/',
    );
  }
  if (category === 'technology' || /bandwidth|hash|subnet|latency|database|email|streaming/.test(slugLc)) {
    candidates.push(
      'https://datatracker.ietf.org/',
      'https://cloud.google.com/architecture',
    );
  }

  // De-duplicate
  return Array.from(new Set(candidates)).slice(0, 12);
}

export async function isAllowedByRobots(urlStr: string): Promise<boolean> {
  try {
    const url = new URL(urlStr);
    const robotsUrl = `${url.protocol}//${url.host}/robots.txt`;
    const res = await fetch(robotsUrl, { headers: { 'User-Agent': userAgent } });
    if (!res.ok) return true; // be permissive if robots.txt unavailable
    const text = await res.text();
    // Very simple parser: block if Disallow: / at global level
    const uaSections = text.split(/User-agent:/i);
    for (const sectionRaw of uaSections) {
      const section = sectionRaw.toLowerCase();
      if (section.startsWith(' *') || section.startsWith('*')) {
        if (/disallow:\s*\//i.test(section)) {
          return false;
        }
      }
    }
    return true;
  } catch {
    return true;
  }
}

const userAgent = 'CalculatorHubBot/1.0 (+https://calculatorhub.com)';

export async function fetchPublicHtml(url: string): Promise<string | null> {
  try {
    const allowed = await isAllowedByRobots(url);
    if (!allowed) return null;
    const res = await fetch(url, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const html = await res.text();
    return html;
  } catch {
    return null;
  }
}

export function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return '';
  return m[1].replace(/\s+/g, ' ').trim();
}

export function guessPublisher(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export async function discoverSourcesForCalculator(slug: string, options: DiscoveryOptions): Promise<DiscoveredPage[]> {
  const candidates = buildCandidateUrls(slug, options);
  const limit = options.limitPerQuery ?? 5;
  const selected = candidates.slice(0, limit);
  const results: DiscoveredPage[] = [];
  for (const url of selected) {
    const html = await fetchPublicHtml(url);
    if (!html) continue;
    results.push({
      url,
      title: extractTitle(html) || url,
      publisher: guessPublisher(url),
      htmlSnippet: html.slice(0, 2000),
      dateAccessed: new Date().toISOString(),
    });
  }
  return results;
}

