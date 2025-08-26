# Finance Hub (Next.js 14 + TypeScript)

Production‑ready, static‑exportable finance calculators with multilingual routing, dark mode, animations, SEO sitemap, and footnoted articles. Deployable to Vercel and GitHub Pages.

## Features
- 17 languages via URL segment: en, es, pt, de, fr, ja, ko, zh, th, ar, hi, id, ru, it, nl, vi, fa
- App Router (Next.js 14), Static Site Generation with revalidate 86400
- Four calculators: Loan, Mortgage (with closing costs), Progressive Tax, Insurance Premium
- Localized UI strings with graceful English fallback
- Dark/Light theme toggle stored in localStorage
- Fade‑in animation on page mount
- Dynamic sitemap.xml and robots.txt
- No heavy UI libraries; clean CSS in `app/globals.css`
- Ad and GA4 placeholders in `app/layout.tsx`

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Run dev server
```bash
npm run dev
```
Visit `http://localhost:3000`.

3) Build (static export enabled via next.config output=export)
```bash
npm run build
```
The static output is generated to `out/` automatically by Next (output: 'export'). To preview with a simple server:
```bash
npm run start
```

## Deploying

### Vercel
- Connect the repository to Vercel.
- No special config needed. `output: 'export'` will produce a static export.
- Optionally set `NEXT_PUBLIC_SITE_URL` in project settings for canonical sitemap origins.

### GitHub Pages
- Enable GitHub Pages to serve from the `out/` directory published by your CI.
- Example GitHub Actions step after `npm run build`:
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: out
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```

## Customization

### Ads and GA4
Open `app/layout.tsx` and paste your scripts:
```tsx
{/* Ad Slot Top */}
<div id="ad-top" style={{minHeight:'90px'}}></div>
{/* TODO: paste your ad script here */}
{/* Google Analytics */}
{/* TODO: paste GA4 script here */}
```
Maintain the reserved minHeight to minimize CLS.

### Languages and Translations
Edit `lib/i18n.ts` to add or refine translations. The `t(lang,key)` helper falls back to English for missing keys.

### Calculators
Calculator logic lives in `lib/calculators.ts`:
- calcLoan(principal, ratePercent, years)
- calcMortgage(principal, ratePercent, years, closing)
- calcTax(income)
- calcInsurance(amount, annualRate)

### SEO
- Dynamic sitemap: `app/sitemap.ts`. Set `NEXT_PUBLIC_SITE_URL` in environments to generate absolute URLs.
- Robots: `app/robots.txt`.

## Structure
```
app/
  layout.tsx
  globals.css
  sitemap.ts
  robots.txt
  (i18n)/[lang]/
    page.tsx
    loan/page.tsx
    mortgage/page.tsx
    tax/page.tsx
    insurance/page.tsx
lib/
  calculators.ts
  i18n.ts
  HeaderClient.tsx
  clients/
    LoanClient.tsx
    MortgageClient.tsx
    TaxClient.tsx
    InsuranceClient.tsx
```

## Notes
- Content is informational only; consult professionals for personal advice.
- Numbers are formatted with `Intl.NumberFormat` using the current language.
- Revalidation is set to 86400 seconds (1 day) globally.

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build` (outputs to `out/`)
- Preview static export: `npm run start`