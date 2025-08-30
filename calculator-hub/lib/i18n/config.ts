// Internationalization configuration for 17 languages
export const i18n = {
  defaultLocale: 'en',
  locales: [
    'en', // English
    'es', // Spanish
    'pt', // Portuguese
    'de', // German
    'fr', // French
    'ja', // Japanese
    'ko', // Korean
    'zh', // Chinese
    'th', // Thai
    'ar', // Arabic
    'hi', // Hindi
    'id', // Indonesian
    'ru', // Russian
    'it', // Italian
    'nl', // Dutch
    'vi', // Vietnamese
    'fa', // Persian/Farsi
  ] as const,
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  de: 'Deutsch',
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  th: 'ไทย',
  ar: 'العربية',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  ru: 'Русский',
  it: 'Italiano',
  nl: 'Nederlands',
  vi: 'Tiếng Việt',
  fa: 'فارسی',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  pt: '🇧🇷',
  de: '🇩🇪',
  fr: '🇫🇷',
  ja: '🇯🇵',
  ko: '🇰🇷',
  zh: '🇨🇳',
  th: '🇹🇭',
  ar: '🇸🇦',
  hi: '🇮🇳',
  id: '🇮🇩',
  ru: '🇷🇺',
  it: '🇮🇹',
  nl: '🇳🇱',
  vi: '🇻🇳',
  fa: '🇮🇷',
};

export const localeCurrencies: Record<Locale, string> = {
  en: 'USD',
  es: 'EUR',
  pt: 'BRL',
  de: 'EUR',
  fr: 'EUR',
  ja: 'JPY',
  ko: 'KRW',
  zh: 'CNY',
  th: 'THB',
  ar: 'SAR',
  hi: 'INR',
  id: 'IDR',
  ru: 'RUB',
  it: 'EUR',
  nl: 'EUR',
  vi: 'VND',
  fa: 'IRR',
};

export const localeNumberFormats: Record<Locale, Intl.NumberFormatOptions> = {
  en: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  es: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  pt: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  de: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  fr: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  ja: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  ko: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  zh: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  th: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  ar: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  hi: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  id: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  ru: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  it: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  nl: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  vi: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
  fa: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
};

export const rtlLocales: Locale[] = ['ar', 'fa'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}