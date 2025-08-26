export type LangCode = 'en'|'es'|'pt'|'de'|'fr'|'ja'|'ko'|'zh'|'th'|'ar'|'hi'|'id'|'ru'|'it'|'nl'|'vi'|'fa';

export const SUPPORTED_LANGS: LangCode[] = ['en','es','pt','de','fr','ja','ko','zh','th','ar','hi','id','ru','it','nl','vi','fa'];

const dict: Record<LangCode, Record<string, string>> = {
  en: {
    siteTitle: 'Finance Hub',
    tagline: 'Clear calculators for smarter money decisions',
    hubIntro: 'Explore our free calculators to estimate payments, taxes, and premiums.',
    loan: 'Loan',
    mortgage: 'Mortgage',
    tax: 'Tax',
    insurance: 'Insurance',
    loanCalc: 'Loan Calculator',
    mortgageCalc: 'Mortgage Calculator',
    taxCalc: 'Tax Calculator',
    insuranceCalc: 'Insurance Premium Estimator',
    principal: 'Principal',
    interestRate: 'Annual Interest Rate (%)',
    years: 'Years',
    closingCosts: 'Closing Costs',
    income: 'Annual Income',
    premiumRate: 'Annual Premium Rate',
    calculate: 'Calculate',
    results: 'Results',
    monthlyPayment: 'Monthly Payment',
    totalRepayment: 'Total Repayment',
    totalInterest: 'Total Interest',
    totalTax: 'Total Tax Due',
    effectiveTaxRate: 'Effective Tax Rate',
    estimatedPremium: 'Estimated Annual Premium',
    disclaimer: 'Disclaimer: This is not financial, tax, or insurance advice.',
    taxDisclaimer: 'Disclaimer: This estimator is for education only. Consult a tax professional for personal advice.',
    insuranceDisclaimer: 'Disclaimer: Actual premiums depend on underwriting and policy terms.',
    whyMatters: 'Why this matters',
    sources: 'Sources',
    explore: 'Explore',
    backToHub: 'Back to hub',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    navLoan: 'Loan',
    navMortgage: 'Mortgage',
    navTax: 'Tax',
    navInsurance: 'Insurance'
  },
  es: {
    siteTitle: 'Centro Financiero',
    tagline: 'Calculadoras claras para decisiones inteligentes',
    hubIntro: 'Explora nuestras calculadoras gratuitas para estimar pagos, impuestos y primas.',
    loan: 'Préstamo',
    mortgage: 'Hipoteca',
    tax: 'Impuestos',
    insurance: 'Seguro',
    loanCalc: 'Calculadora de Préstamos',
    mortgageCalc: 'Calculadora de Hipotecas',
    taxCalc: 'Calculadora de Impuestos',
    insuranceCalc: 'Estimador de Prima de Seguro',
    principal: 'Principal',
    interestRate: 'Tasa de interés anual (%)',
    years: 'Años',
    closingCosts: 'Costos de cierre',
    income: 'Ingreso anual',
    premiumRate: 'Tasa de prima anual',
    calculate: 'Calcular',
    results: 'Resultados',
    monthlyPayment: 'Pago mensual',
    totalRepayment: 'Pago total',
    totalInterest: 'Interés total',
    totalTax: 'Impuesto total',
    effectiveTaxRate: 'Tasa efectiva',
    estimatedPremium: 'Prima anual estimada',
    disclaimer: 'Aviso: No es asesoramiento financiero, fiscal ni de seguros.',
    taxDisclaimer: 'Aviso: Solo educativo. Consulte a un profesional de impuestos.',
    insuranceDisclaimer: 'Aviso: Las primas reales dependen de la suscripción y la póliza.',
    whyMatters: 'Por qué importa',
    sources: 'Fuentes',
    explore: 'Explorar',
    backToHub: 'Volver al inicio',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    navLoan: 'Préstamo',
    navMortgage: 'Hipoteca',
    navTax: 'Impuestos',
    navInsurance: 'Seguro'
  },
  pt: {
    siteTitle: 'Hub Financeiro',
    tagline: 'Calculadoras claras para decisões melhores',
    hubIntro: 'Explore calculadoras gratuitas para estimar pagamentos, impostos e prêmios.',
    loan: 'Empréstimo',
    mortgage: 'Hipoteca',
    tax: 'Imposto',
    insurance: 'Seguro',
    loanCalc: 'Calculadora de Empréstimos',
    mortgageCalc: 'Calculadora de Hipotecas',
    taxCalc: 'Calculadora de Impostos',
    insuranceCalc: 'Estimador de Prêmio de Seguro',
    principal: 'Principal',
    interestRate: 'Taxa de juros anual (%)',
    years: 'Anos',
    closingCosts: 'Custos de fechamento',
    income: 'Renda anual',
    premiumRate: 'Taxa de prêmio anual',
    calculate: 'Calcular',
    results: 'Resultados',
    monthlyPayment: 'Pagamento mensal',
    totalRepayment: 'Pagamento total',
    totalInterest: 'Juros totais',
    totalTax: 'Imposto total',
    effectiveTaxRate: 'Taxa efetiva',
    estimatedPremium: 'Prêmio anual estimado',
    disclaimer: 'Aviso: Não é aconselhamento financeiro, fiscal ou de seguros.',
    taxDisclaimer: 'Aviso: Educacional. Procure um profissional tributário.',
    insuranceDisclaimer: 'Aviso: Prêmios reais dependem da subscrição.',
    whyMatters: 'Por que importa',
    sources: 'Fontes',
    explore: 'Explorar',
    backToHub: 'Voltar ao hub',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    navLoan: 'Empréstimo',
    navMortgage: 'Hipoteca',
    navTax: 'Imposto',
    navInsurance: 'Seguro'
  },
  de: {
    siteTitle: 'Finanz‑Hub',
    tagline: 'Klare Rechner für bessere Entscheidungen',
    hubIntro: 'Kostenlose Rechner für Zahlungen, Steuern und Prämien.',
    loan: 'Kredit',
    mortgage: 'Hypothek',
    tax: 'Steuer',
    insurance: 'Versicherung',
    loanCalc: 'Kreditrechner',
    mortgageCalc: 'Hypothekenrechner',
    taxCalc: 'Steuerrechner',
    insuranceCalc: 'Versicherungsprämien‑Rechner',
    principal: 'Kreditsumme',
    interestRate: 'Jahreszins (%)',
    years: 'Jahre',
    closingCosts: 'Abschlusskosten',
    income: 'Jahreseinkommen',
    premiumRate: 'Jährlicher Prämiensatz',
    calculate: 'Berechnen',
    results: 'Ergebnisse',
    monthlyPayment: 'Monatliche Rate',
    totalRepayment: 'Gesamtrückzahlung',
    totalInterest: 'Gesamtzinsen',
    totalTax: 'Gesamtsteuer',
    effectiveTaxRate: 'Effektiver Steuersatz',
    estimatedPremium: 'Geschätzte Jahresprämie',
    disclaimer: 'Hinweis: Keine Finanz‑, Steuer‑ oder Versicherungsberatung.',
    taxDisclaimer: 'Hinweis: Nur zu Bildungszwecken. Steuerberater konsultieren.',
    insuranceDisclaimer: 'Hinweis: Prämien hängen von der Zeichnung ab.',
    whyMatters: 'Warum es zählt',
    sources: 'Quellen',
    explore: 'Entdecken',
    backToHub: 'Zur Übersicht',
    language: 'Sprache',
    theme: 'Thema',
    light: 'Hell',
    dark: 'Dunkel',
    navLoan: 'Kredit',
    navMortgage: 'Hypothek',
    navTax: 'Steuer',
    navInsurance: 'Versicherung'
  },
  fr: {
    siteTitle: 'Hub Finance',
    tagline: 'Calculatrices claires pour de meilleures décisions',
    hubIntro: 'Explorez nos calculatrices gratuites pour paiements, impôts et primes.',
    loan: 'Prêt',
    mortgage: 'Hypothèque',
    tax: 'Impôt',
    insurance: 'Assurance',
    loanCalc: 'Calculatrice de prêt',
    mortgageCalc: 'Calculatrice hypothécaire',
    taxCalc: 'Calculatrice d’impôt',
    insuranceCalc: 'Estimateur de prime',
    principal: 'Capital',
    interestRate: 'Taux d’intérêt annuel (%)',
    years: 'Années',
    closingCosts: 'Frais de clôture',
    income: 'Revenu annuel',
    premiumRate: 'Taux de prime annuel',
    calculate: 'Calculer',
    results: 'Résultats',
    monthlyPayment: 'Paiement mensuel',
    totalRepayment: 'Remboursement total',
    totalInterest: 'Intérêts totaux',
    totalTax: 'Impôt total',
    effectiveTaxRate: 'Taux effectif',
    estimatedPremium: 'Prime annuelle estimée',
    disclaimer: 'Avertissement : pas de conseil financier, fiscal ou d’assurance.',
    taxDisclaimer: 'Avertissement : à titre éducatif. Consultez un professionnel.',
    insuranceDisclaimer: 'Avertissement : les primes dépendent de la souscription.',
    whyMatters: 'Pourquoi c’est important',
    sources: 'Sources',
    explore: 'Explorer',
    backToHub: 'Retour',
    language: 'Langue',
    theme: 'Thème',
    light: 'Clair',
    dark: 'Sombre',
    navLoan: 'Prêt',
    navMortgage: 'Hypothèque',
    navTax: 'Impôt',
    navInsurance: 'Assurance'
  },
  ja: { ...{} as any },
  ko: { ...{} as any },
  zh: { ...{} as any },
  th: { ...{} as any },
  ar: { ...{} as any },
  hi: { ...{} as any },
  id: { ...{} as any },
  ru: { ...{} as any },
  it: { ...{} as any },
  nl: { ...{} as any },
  vi: { ...{} as any },
  fa: { ...{} as any }
};

// Fallback for languages not fully translated: copy from English
for (const lang of SUPPORTED_LANGS) {
  if (lang === 'en') continue;
  dict[lang] = { ...dict.en, ...(dict[lang] as any) } as Record<string, string>;
}

export function t(lang: string, key: string): string {
  const l = (SUPPORTED_LANGS as string[]).includes(lang) ? (lang as LangCode) : 'en';
  const value = dict[l][key];
  return value ?? dict.en[key] ?? key;
}

export function getAllLocales(): LangCode[] {
  return SUPPORTED_LANGS;
}

export function isRtlLang(lang: string): boolean {
  return lang === 'ar' || lang === 'fa';
}

export function getCurrencyForLang(lang: string): string {
  switch (lang as LangCode) {
    case 'en': return 'USD';
    case 'es': return 'EUR';
    case 'pt': return 'BRL';
    case 'de': return 'EUR';
    case 'fr': return 'EUR';
    case 'ja': return 'JPY';
    case 'ko': return 'KRW';
    case 'zh': return 'CNY';
    case 'th': return 'THB';
    case 'ar': return 'AED';
    case 'hi': return 'INR';
    case 'id': return 'IDR';
    case 'ru': return 'RUB';
    case 'it': return 'EUR';
    case 'nl': return 'EUR';
    case 'vi': return 'VND';
    case 'fa': return 'IRR';
    default: return 'USD';
  }
}

