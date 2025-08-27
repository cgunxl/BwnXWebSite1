export type CountryCode =
  | 'th' | 'us' | 'gb' | 'ca' | 'au' | 'sg' | 'my' | 'id'
  | 'vn' | 'ph' | 'kh' | 'la' | 'mm' | 'cn' | 'jp' | 'kr'
  | 'in' | 'tw';

export const SUPPORTED_COUNTRIES: CountryCode[] = [
  'th','us','gb','ca','au','sg','my','id','vn','ph','kh','la','mm','cn','jp','kr','in','tw'
];

export type TaxBracket = { limit: number; rate: number };

// Country-specific progressive brackets (simplified, can be refined per law/year)
const COUNTRY_TAX_BRACKETS: Record<CountryCode, TaxBracket[]> = {
  // Thailand PIT (simplified 2024): 0% to 150k, 5% to 300k, 10% to 500k, 15% to 750k, 20% to 1M,
  // 25% to 2M, 30% to 5M, 35% above
  th: [
    { limit: 150_000, rate: 0 },
    { limit: 300_000, rate: 0.05 },
    { limit: 500_000, rate: 0.10 },
    { limit: 750_000, rate: 0.15 },
    { limit: 1_000_000, rate: 0.20 },
    { limit: 2_000_000, rate: 0.25 },
    { limit: 5_000_000, rate: 0.30 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.35 }
  ],
  us: [
    { limit: 11_600, rate: 0.10 },
    { limit: 47_150, rate: 0.12 },
    { limit: 100_525, rate: 0.22 },
    { limit: 191_950, rate: 0.24 },
    { limit: 243_725, rate: 0.32 },
    { limit: 609_350, rate: 0.35 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.37 }
  ],
  gb: [
    { limit: 12_570, rate: 0 },
    { limit: 50_270, rate: 0.20 },
    { limit: 125_140, rate: 0.40 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.45 }
  ],
  ca: [
    { limit: 55_867, rate: 0.15 },
    { limit: 111_733, rate: 0.205 },
    { limit: 173_205, rate: 0.26 },
    { limit: 246_752, rate: 0.29 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.33 }
  ],
  au: [
    { limit: 18_200, rate: 0 },
    { limit: 45_000, rate: 0.19 },
    { limit: 120_000, rate: 0.325 },
    { limit: 180_000, rate: 0.37 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.45 }
  ],
  sg: [
    { limit: 20_000, rate: 0 },
    { limit: 30_000, rate: 0.02 },
    { limit: 40_000, rate: 0.035 },
    { limit: 80_000, rate: 0.07 },
    { limit: 120_000, rate: 0.115 },
    { limit: 160_000, rate: 0.15 },
    { limit: 200_000, rate: 0.18 },
    { limit: 240_000, rate: 0.19 },
    { limit: 280_000, rate: 0.195 },
    { limit: 320_000, rate: 0.20 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.22 }
  ],
  my: [ { limit: Number.POSITIVE_INFINITY, rate: 0.20 } ],
  id: [ { limit: Number.POSITIVE_INFINITY, rate: 0.30 } ],
  vn: [ { limit: Number.POSITIVE_INFINITY, rate: 0.20 } ],
  ph: [ { limit: Number.POSITIVE_INFINITY, rate: 0.30 } ],
  kh: [ { limit: Number.POSITIVE_INFINITY, rate: 0.20 } ],
  la: [ { limit: Number.POSITIVE_INFINITY, rate: 0.10 } ],
  mm: [ { limit: Number.POSITIVE_INFINITY, rate: 0.25 } ],
  cn: [ { limit: Number.POSITIVE_INFINITY, rate: 0.30 } ],
  jp: [ { limit: Number.POSITIVE_INFINITY, rate: 0.23 } ],
  kr: [ { limit: Number.POSITIVE_INFINITY, rate: 0.24 } ],
  in: [ { limit: Number.POSITIVE_INFINITY, rate: 0.30 } ],
  tw: [ { limit: Number.POSITIVE_INFINITY, rate: 0.20 } ]
};

const COUNTRY_CURRENCY: Record<CountryCode, string> = {
  th: 'THB', us: 'USD', gb: 'GBP', ca: 'CAD', au: 'AUD', sg: 'SGD', my: 'MYR', id: 'IDR',
  vn: 'VND', ph: 'PHP', kh: 'KHR', la: 'LAK', mm: 'MMK', cn: 'CNY', jp: 'JPY', kr: 'KRW',
  in: 'INR', tw: 'TWD'
};

export function getAllCountries(): CountryCode[] {
  return SUPPORTED_COUNTRIES;
}

export function getDefaultCountryForLang(lang: string): CountryCode {
  switch (lang) {
    case 'th': return 'th';
    case 'en': return 'us';
    case 'zh': return 'cn';
    case 'ja': return 'jp';
    case 'ko': return 'kr';
    case 'vi': return 'vn';
    case 'id': return 'id';
    case 'ar': return 'ae' as any; // not supported; fallback later
    case 'hi': return 'in';
    case 'fr': return 'fr' as any; // not supported; fallback later
    case 'es': return 'es' as any; // not supported; fallback later
    default: return 'us';
  }
}

export function getCurrencyForCountry(country: string): string {
  const c = country.toLowerCase() as CountryCode;
  return (COUNTRY_CURRENCY as any)[c] || 'USD';
}

export function getTaxBracketsForCountry(country?: string): TaxBracket[] {
  if (!country) return COUNTRY_TAX_BRACKETS['th'];
  const c = country.toLowerCase() as CountryCode;
  return (COUNTRY_TAX_BRACKETS as any)[c] || COUNTRY_TAX_BRACKETS['us'];
}

