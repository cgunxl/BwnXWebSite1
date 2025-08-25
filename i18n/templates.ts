import type { Locale, Country } from './config';

const LOCAL_TERMS: Record<Locale, string> = {
  en: 'Loan Calculator',
  es: 'Calculadora de préstamos',
  pt: 'Calculadora de empréstimos',
  de: 'Kreditrechner',
  fr: 'Simulateur de prêt',
  ja: 'ローン計算機',
  ko: '대출 계산기',
  zh: '贷款计算器',
  th: 'คำนวณสินเชื่อ',
  ar: 'حاسبة القرض',
  hi: 'EMI कैलकुलेटर',
  id: 'KPR Kalkulator',
  ru: 'Кредитный калькулятор',
};

export function termByLocale(locale: Locale) {
  return LOCAL_TERMS[locale];
}

const COUNTRY_DISPLAY: Record<Country, string> = {
  us: 'United States',
  mx: 'Mexico',
  br: 'Brazil',
  de: 'Germany',
  fr: 'France',
  jp: 'Japan',
  kr: 'South Korea',
  cn: 'China',
  th: 'Thailand',
  sa: 'Saudi Arabia',
  in: 'India',
  id: 'Indonesia',
  ru: 'Russia',
};

export function countryDisplay(country: Country) {
  return COUNTRY_DISPLAY[country];
}

export function buildTitle(locale: Locale, country: Country, year: number) {
  return `${termByLocale(locale)} – ${countryDisplay(country)} ${year}`;
}

export function buildDescription(locale: Locale, country: Country) {
  const t = termByLocale(locale);
  return `${t} for ${countryDisplay(country)}: monthly payment, amortization, fees, FAQ.`;
}
