import type { Locale } from '@/i18n/config';
import { buildFAQ } from './FAQ';

export default function SchemaFAQ({ locale, country }: { locale: Locale; country: keyof typeof import('@/lib/markets').MARKETS }) {
  const faqs = buildFAQ(locale, country);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
