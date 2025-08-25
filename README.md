# Loan Calculator (Next.js 14, i18n, Deep SEO)

Production-ready international loan calculator with 13 locales and 13 country routes. Ships SSG/ISR, programmatic hreflang, sitemap, robots, JSON-LD, and fast UX.

## Run

1) Install deps
```bash
npm i
```

2) Develop
```bash
npm run dev
```

3) Build
```bash
npm run build
```

Deploy to Vercel. Optionally set `NEXT_PUBLIC_SITE_URL` to your domain.

## Configure domain
- In Vercel project settings, add your domain and set as production.

## Ads & Analytics
- TODO: paste your ad script into `app/layout.tsx` where markers exist.
- TODO: paste GA4 tag likewise.

## Search Console
- Add your site in Google Search Console.
- Submit `https://yourdomain.com/sitemap.xml`.

## Content rules
- Country copy comes from `lib/markets.ts`. Edit bullets/fees for realism.
- Localized labels and SEO terms live in `i18n/config.ts` and `i18n/templates.ts`.
- To add calculators like auto/personal/refinance, copy the page and adjust content.

## Core Web Vitals
- CLS: reserved ad slot in `app/layout.tsx` prevents layout shift.
- No external fonts; minimal JS; unoptimized images.

## i18n
- Locales: en, es, pt, de, fr, ja, ko, zh, th, ar, hi, id, ru
- Countries: us, mx, br, de, fr, jp, kr, cn, th, sa, in, id, ru
- Routes: `/(i18n)/[locale]/[country]/loan-calculator`

## SEO
- Unique title/description per locale-country using `i18n/templates.ts`.
- Hreflang across all pairs + x-default.
- JSON-LD: FAQPage, WebApplication, Breadcrumb.
- Sitemap includes all pages; robots points to sitemap.

## Extend
- Add new locales/countries in `i18n/config.ts` and `lib/seo.ts`.
- Add new pages under `app/(i18n)/[locale]/[country]/...` and reuse components.