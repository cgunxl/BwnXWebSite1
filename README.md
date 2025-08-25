## Finance Hub (Next.js 14 + TypeScript)

Production-ready, static-exportable Finance Hub with high-CPC calculators, multilingual UI (17 languages), dark mode, SEO, animated pages, and ad/analytics placeholders. Works on Vercel (App Router) and GitHub Pages via `next export`.

### Features
- Multilingual routing at `/{lang}` with 17 languages (en, es, pt, de, fr, ja, ko, zh, th, ar, hi, id, ru, it, nl, vi, fa)
- Four calculators: Loan, Mortgage (with optional closing costs), Tax (progressive brackets), Insurance Premium
- Static Site Generation with revalidation (revalidate=86400) and prebuilt routes via `generateStaticParams`
- Dark/light theme toggle using CSS variables; fade-in animation
- Dynamic `sitemap.xml` and `robots.txt`
- Minimal dependencies, TypeScript + ESLint

### Quickstart
```bash
npm install
npm run dev
```
Open http://localhost:3000.

Build and export static site:
```bash
npm run build
npm run start   # serves the exported /out directory on port 3000
```

### Deploy
- Vercel: Import this repo. Build command: `npm run build`. Output directory: `out/`.
- GitHub Pages: Push to main. Use an action or locally run `npm run build` and push the `out/` directory to `gh-pages` branch.

Set `NEXT_PUBLIC_SITE_URL` for correct absolute URLs in the sitemap.

### Ads and Analytics
Paste your ad script and GA4 tag in `app/components/Header.tsx` placeholders:
```tsx
{/* Ad Slot Top */}
<div id="ad-top" className="ad-slot"></div>
{/* TODO: paste your ad script here */}
{/* Google Analytics */}
{/* TODO: paste GA4 script here */}
```
The `ad-top` and `ad-bottom` slots reserve vertical space to minimize CLS.

### i18n
- URL structure: `/{lang}` (no auto-detection). Language switch preserves current path.
- Translations defined in `lib/i18n.ts`. Unknown keys fallback to English.

### Calculators
- `calcLoan(principal, rate%, years)` amortizing formula
- `calcMortgage(principal, rate%, years, closing)` adds closing costs to principal then applies loan formula
- `calcTax(income)` applies a simple progressive bracket array
- `calcInsurance(amount, rate%)` multiplies amount by rate

All calculators update results as inputs change and format outputs using `Intl.NumberFormat` for the active locale.

### SEO
- `generateMetadata` used for page titles and descriptions (with the current year)
- Dynamic `app/sitemap.ts` generates all routes for all languages
- `app/robots.txt` allows all and references `/sitemap.xml`

### Local Development
- Type-check: `npm run typecheck`
- Lint: `npm run lint`

### Notes
- Content is informational only and not professional advice.
- Images are unoptimized and `output: 'export'` enables static export for GitHub Pages compatibility.

### Search Console
- Add your site in Google Search Console.
- Submit `https://yourdomain.com/sitemap.xml`.