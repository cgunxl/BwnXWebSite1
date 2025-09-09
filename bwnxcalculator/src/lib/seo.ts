export type HrefLang = {
  hreflang: string;
  href: string;
};

export const locales = ['en','es','pt','de','fr','ja','ko','zh','th','ar','hi','id','ru','it','nl','vi','fa'] as const;

export function makeHreflang(urlBase: string, locale: string, category?: string, slug?: string): HrefLang[] {
  const path = [locale, category, slug].filter(Boolean).join('/');
  return locales.map((loc) => ({ hreflang: loc, href: `${urlBase}/${loc}/${category ? category + '/' : ''}${slug ?? ''}`.replace(/\/$/, '') }));
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } }))
  };
}

export function breadcrumbsJsonLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: b.item }))
  };
}

export function articleJsonLd({ title, description, url }: { title: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: url
  };
}

export function howToJsonLd(steps: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to use this calculator',
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s }))
  };
}

