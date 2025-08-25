export const SUPPORTED_LANGS = [
  'en','es','pt','de','fr','ja','ko','zh','th','ar','hi','id','ru','it','nl','vi','fa'
] as const;

export type LangCode = typeof SUPPORTED_LANGS[number];

type Dict = Record<string, string>;
type Translations = Record<LangCode, Dict>;

const base: Dict = {
  siteName: 'Finance Hub',
  calculators: 'Calculators',
  explore: 'Explore',
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
  years: 'Term (years)',
  closingCosts: 'Closing Costs',
  premiumRate: 'Premium Rate (e.g., 2 for 2%)',
  insuredAmount: 'Insured Amount',
  calculate: 'Calculate',
  monthlyPayment: 'Monthly Payment',
  totalRepayment: 'Total Repayment',
  totalInterest: 'Total Interest',
  totalTax: 'Total Tax',
  effectiveRate: 'Effective Tax Rate',
  estimatedPremium: 'Estimated Annual Premium',
  disclaimerTax: 'This is a simplified estimator. Consult a tax professional for advice.',
  disclaimerInsurance: 'Actual premiums depend on underwriting and policy details.',
  whyMatters: 'Why this matters',
  sources: 'Sources',
  otherCalcs: 'Other calculators',
  language: 'Language',
  theme: 'Theme',
  light: 'Light',
  dark: 'Dark',
  hubIntro: 'Choose a calculator to estimate payments, taxes, or premiums.',
  loanDesc: 'Estimate monthly payments and total interest for personal loans.',
  mortgageDesc: 'Model mortgage payments including optional closing costs.',
  taxDesc: 'Quickly approximate tax due and effective rate using sample brackets.',
  insuranceDesc: 'Rough premium estimate based on insured amount and rate.'
};

const translations: Translations = {
  en: base,
  es: {
    ...base,
    siteName: 'Centro Financiero',
    calculators: 'Calculadoras',
    explore: 'Explorar',
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
    years: 'Plazo (años)',
    closingCosts: 'Costos de cierre',
    premiumRate: 'Tasa de prima (ej., 2 para 2%)',
    insuredAmount: 'Monto asegurado',
    calculate: 'Calcular',
    monthlyPayment: 'Pago mensual',
    totalRepayment: 'Reembolso total',
    totalInterest: 'Interés total',
    totalTax: 'Impuesto total',
    effectiveRate: 'Tasa efectiva',
    estimatedPremium: 'Prima anual estimada',
    disclaimerTax: 'Estimador simplificado. Consulte a un profesional fiscal.',
    disclaimerInsurance: 'Las primas reales dependen de la suscripción.',
    whyMatters: 'Por qué importa',
    sources: 'Fuentes',
    otherCalcs: 'Otras calculadoras',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    hubIntro: 'Elija una calculadora para estimar pagos, impuestos o primas.',
    loanDesc: 'Estime pagos mensuales e interés total de préstamos personales.',
    mortgageDesc: 'Modele pagos hipotecarios incluyendo costos de cierre.',
    taxDesc: 'Aproximación rápida del impuesto y tasa efectiva.',
    insuranceDesc: 'Estimación de prima según monto asegurado y tasa.'
  },
  pt: { ...base, siteName: 'Hub Financeiro', calculators: 'Calculadoras', explore: 'Explorar', loan: 'Empréstimo', mortgage: 'Hipoteca', tax: 'Imposto', insurance: 'Seguro', loanCalc: 'Calculadora de Empréstimo', mortgageCalc: 'Calculadora de Hipoteca', taxCalc: 'Calculadora de Imposto', insuranceCalc: 'Estimador de Prêmio de Seguro', years: 'Prazo (anos)', interestRate: 'Taxa de juros anual (%)', closingCosts: 'Custos de fechamento', premiumRate: 'Taxa de prêmio (ex.: 2 para 2%)', insuredAmount: 'Quantia assegurada', calculate: 'Calcular', monthlyPayment: 'Pagamento mensal', totalRepayment: 'Pagamento total', totalInterest: 'Juros totais', totalTax: 'Imposto total', effectiveRate: 'Taxa efetiva', estimatedPremium: 'Prêmio anual estimado', disclaimerTax: 'Estimador simples. Procure um profissional.', disclaimerInsurance: 'Prêmios reais dependem da subscrição.', whyMatters: 'Por que isso importa', sources: 'Fontes', otherCalcs: 'Outras calculadoras', language: 'Idioma', theme: 'Tema', light: 'Claro', dark: 'Escuro', hubIntro: 'Escolha uma calculadora.', loanDesc: 'Estime pagamentos e juros.', mortgageDesc: 'Inclua custos de fechamento.', taxDesc: 'Aproxime imposto e taxa efetiva.', insuranceDesc: 'Estimativa de prêmio.' },
  de: { ...base, siteName: 'Finanz Hub', calculators: 'Rechner', explore: 'Entdecken', loan: 'Kredit', mortgage: 'Hypothek', tax: 'Steuer', insurance: 'Versicherung', loanCalc: 'Kreditrechner', mortgageCalc: 'Hypothekenrechner', taxCalc: 'Steuerrechner', insuranceCalc: 'Versicherungsprämienrechner', years: 'Laufzeit (Jahre)', interestRate: 'Jahreszins (%)', closingCosts: 'Abschlusskosten', premiumRate: 'Prämiensatz (z. B. 2 für 2%)', insuredAmount: 'Versicherte Summe', calculate: 'Berechnen', monthlyPayment: 'Monatsrate', totalRepayment: 'Gesamtrückzahlung', totalInterest: 'Gesamtzinsen', totalTax: 'Gesamtsteuer', effectiveRate: 'Effektiver Satz', estimatedPremium: 'Geschätzte Jahresprämie', disclaimerTax: 'Vereinfachter Rechner. Steuerberater fragen.', disclaimerInsurance: 'Prämien hängen vom Underwriting ab.', whyMatters: 'Warum das wichtig ist', sources: 'Quellen', otherCalcs: 'Weitere Rechner', language: 'Sprache', theme: 'Theme', light: 'Hell', dark: 'Dunkel', hubIntro: 'Wähle einen Rechner.', loanDesc: 'Monatsraten und Zinsen schätzen.', mortgageDesc: 'Mit Abschlusskosten.', taxDesc: 'Steuer und effektiven Satz schätzen.', insuranceDesc: 'Prämie schätzen.' },
  fr: { ...base, siteName: 'Hub Financier', calculators: 'Calculatrices', explore: 'Explorer', loan: 'Prêt', mortgage: 'Hypothèque', tax: 'Impôt', insurance: 'Assurance', loanCalc: 'Calculateur de prêt', mortgageCalc: 'Calculateur hypothécaire', taxCalc: "Calculateur d'impôt", insuranceCalc: 'Estimation de prime', years: 'Durée (années)', interestRate: "Taux d'intérêt annuel (%)", closingCosts: 'Frais de clôture', premiumRate: 'Taux de prime (ex.: 2 pour 2%)', insuredAmount: 'Montant assuré', calculate: 'Calculer', monthlyPayment: 'Paiement mensuel', totalRepayment: 'Remboursement total', totalInterest: 'Intérêt total', totalTax: 'Impôt total', effectiveRate: 'Taux effectif', estimatedPremium: 'Prime annuelle estimée', disclaimerTax: 'Estimateur simplifié. Consultez un professionnel.', disclaimerInsurance: "Les primes réelles dépendent de la souscription.", whyMatters: 'Pourquoi c’est important', sources: 'Sources', otherCalcs: 'Autres calculatrices', language: 'Langue', theme: 'Thème', light: 'Clair', dark: 'Sombre', hubIntro: 'Choisissez une calculatrice.', loanDesc: 'Estimez paiements et intérêts.', mortgageDesc: 'Inclut les frais de clôture.', taxDesc: 'Approxime l’impôt et le taux effectif.', insuranceDesc: 'Estimation de prime.' },
  ja: { ...base, siteName: 'ファイナンスハブ', calculators: '電卓', explore: '見る', loan: 'ローン', mortgage: '住宅ローン', tax: '税金', insurance: '保険', loanCalc: 'ローン計算機', mortgageCalc: '住宅ローン計算機', taxCalc: '税金計算機', insuranceCalc: '保険料推定', years: '年数', interestRate: '年利 (%)', closingCosts: 'クロージング費用', premiumRate: '保険料率 (例: 2 は 2%)', insuredAmount: '保険金額', calculate: '計算', monthlyPayment: '毎月の支払い', totalRepayment: '総返済額', totalInterest: '総利息', totalTax: '税額', effectiveRate: '実効税率', estimatedPremium: '年間保険料', disclaimerTax: '簡易推定です。専門家に相談してください。', disclaimerInsurance: '実際の保険料は引受に依存します。', whyMatters: '重要な理由', sources: '出典', otherCalcs: '他の計算機', language: '言語', theme: 'テーマ', light: 'ライト', dark: 'ダーク', hubIntro: '計算機を選択。', loanDesc: '支払と利息を見積もる。', mortgageDesc: 'クロージング費用を含む。', taxDesc: '税額と実効税率を概算。', insuranceDesc: '保険料の概算。' },
  ko: { ...base, siteName: '파이낸스 허브', calculators: '계산기', explore: '살펴보기', loan: '대출', mortgage: '주택담보', tax: '세금', insurance: '보험', loanCalc: '대출 계산기', mortgageCalc: '모기지 계산기', taxCalc: '세금 계산기', insuranceCalc: '보험료 추정', years: '기간(년)', interestRate: '연이율 (%)', closingCosts: '클로징 비용', premiumRate: '보험료율 (예: 2는 2%)', insuredAmount: '보험금액', calculate: '계산', monthlyPayment: '월 상환금', totalRepayment: '총 상환액', totalInterest: '총 이자', totalTax: '총 세금', effectiveRate: '실효세율', estimatedPremium: '연간 보험료', disclaimerTax: '단순 추정치입니다. 전문가 상담 권장.', disclaimerInsurance: '실제 보험료는 인수심사에 따름.', whyMatters: '왜 중요한가', sources: '출처', otherCalcs: '다른 계산기', language: '언어', theme: '테마', light: '라이트', dark: '다크', hubIntro: '계산기를 선택하세요.', loanDesc: '월 상환금과 이자 추정.', mortgageDesc: '클로징 비용 포함.', taxDesc: '세금과 실효세율 개산.', insuranceDesc: '보험료 개산.' },
  zh: { ...base, siteName: '金融中心', calculators: '计算器', explore: '探索', loan: '贷款', mortgage: '按揭', tax: '税', insurance: '保险', loanCalc: '贷款计算器', mortgageCalc: '按揭计算器', taxCalc: '税务计算器', insuranceCalc: '保险费估算器', years: '年限', interestRate: '年利率 (%)', closingCosts: '过户费用', premiumRate: '保费率 (如 2 代表 2%)', insuredAmount: '承保金额', calculate: '计算', monthlyPayment: '月供', totalRepayment: '总还款', totalInterest: '总利息', totalTax: '总税额', effectiveRate: '有效税率', estimatedPremium: '预计年保费', disclaimerTax: '简化估算。请咨询专业人士。', disclaimerInsurance: '实际保费取决于核保。', whyMatters: '重要性', sources: '来源', otherCalcs: '其他计算器', language: '语言', theme: '主题', light: '浅色', dark: '深色', hubIntro: '选择一个计算器。', loanDesc: '估算月供和总利息。', mortgageDesc: '含过户费用。', taxDesc: '估算税额与有效税率。', insuranceDesc: '估算保费。' },
  th: { ...base, siteName: 'ไฟแนนซ์ฮับ', calculators: 'เครื่องคำนวณ', explore: 'สำรวจ', loan: 'กู้ยืม', mortgage: 'จำนอง', tax: 'ภาษี', insurance: 'ประกัน', loanCalc: 'เครื่องคำนวณเงินกู้', mortgageCalc: 'เครื่องคำนวณจำนอง', taxCalc: 'เครื่องคำนวณภาษี', insuranceCalc: 'ประมาณค่าเบี้ยประกัน', years: 'ระยะเวลา (ปี)', interestRate: 'อัตราดอกเบี้ยต่อปี (%)', closingCosts: 'ค่าใช้จ่ายปิดการขาย', premiumRate: 'อัตราเบี้ย (เช่น 2 คือ 2%)', insuredAmount: 'จำนวนเงินเอาประกัน', calculate: 'คำนวณ', monthlyPayment: 'ค่างวดรายเดือน', totalRepayment: 'ยอดชำระทั้งหมด', totalInterest: 'ดอกเบี้ยรวม', totalTax: 'ภาษีรวม', effectiveRate: 'อัตราที่มีผล', estimatedPremium: 'เบี้ยประกันรายปีโดยประมาณ', disclaimerTax: 'เป็นการประมาณง่ายๆ โปรดปรึกษาผู้เชี่ยวชาญ.', disclaimerInsurance: 'เบี้ยจริงขึ้นกับการรับประกันภัย.', whyMatters: 'ทำไมจึงสำคัญ', sources: 'แหล่งที่มา', otherCalcs: 'เครื่องคำนวณอื่นๆ', language: 'ภาษา', theme: 'ธีม', light: 'สว่าง', dark: 'มืด', hubIntro: 'เลือกเครื่องคำนวณ.', loanDesc: 'ประมาณการค่างวดและดอกเบี้ย.', mortgageDesc: 'รวมค่าใช้จ่ายปิดการขาย.', taxDesc: 'ประมาณภาษีและอัตราที่มีผล.', insuranceDesc: 'ประมาณเบี้ยประกัน.' },
  ar: { ...base, siteName: 'مركز التمويل', calculators: 'حاسبات', explore: 'استكشف', loan: 'قرض', mortgage: 'رهن عقاري', tax: 'ضريبة', insurance: 'تأمين', loanCalc: 'حاسبة القرض', mortgageCalc: 'حاسبة الرهن العقاري', taxCalc: 'حاسبة الضريبة', insuranceCalc: 'مقدر قسط التأمين', years: 'المدة (سنوات)', interestRate: 'سعر الفائدة السنوي (%)', closingCosts: 'تكاليف الإقفال', premiumRate: 'معدل القسط (مثلاً 2 لـ 2%)', insuredAmount: 'المبلغ المؤمن', calculate: 'احسب', monthlyPayment: 'القسط الشهري', totalRepayment: 'إجمالي السداد', totalInterest: 'إجمالي الفائدة', totalTax: 'إجمالي الضريبة', effectiveRate: 'المعدل الفعّال', estimatedPremium: 'القسط السنوي التقديري', disclaimerTax: 'مُقدِّر مبسّط. استشر مختصاً.', disclaimerInsurance: 'الأقساط الفعلية تعتمد على الاكتتاب.', whyMatters: 'لماذا هذا مهم', sources: 'المصادر', otherCalcs: 'حاسبات أخرى', language: 'اللغة', theme: 'السمة', light: 'فاتح', dark: 'داكن', hubIntro: 'اختر آلة حاسبة.', loanDesc: 'قدّر الأقساط والفائدة.', mortgageDesc: 'يشمل تكاليف الإقفال.', taxDesc: 'قدّر الضريبة والمعدل الفعّال.', insuranceDesc: 'تقدير القسط.' },
  hi: { ...base, siteName: 'वित्त हब', calculators: 'कैलकुलेटर', explore: 'खोजें', loan: 'ऋण', mortgage: 'बंधक', tax: 'कर', insurance: 'बीमा', loanCalc: 'ऋण कैलकुलेटर', mortgageCalc: 'बंधक कैलकुलेटर', taxCalc: 'कर कैलकुलेटर', insuranceCalc: 'बीमा प्रीमियम अनुमान', years: 'अवधि (वर्ष)', interestRate: 'वार्षिक ब्याज दर (%)', closingCosts: 'क्लोजिंग लागत', premiumRate: 'प्रीमियम दर (जैसे 2 = 2%)', insuredAmount: 'बीमित राशि', calculate: 'गणना करें', monthlyPayment: 'मासिक भुगतान', totalRepayment: 'कुल भुगतान', totalInterest: 'कुल ब्याज', totalTax: 'कुल कर', effectiveRate: 'प्रभावी दर', estimatedPremium: 'वार्षिक प्रीमियम अनुमान', disclaimerTax: 'सरल अनुमानक। विशेषज्ञ से सलाह लें।', disclaimerInsurance: 'वास्तविक प्रीमियम अंडरराइटिंग पर निर्भर।', whyMatters: 'यह क्यों महत्वपूर्ण है', sources: 'स्रोत', otherCalcs: 'अन्य कैलकुलेटर', language: 'भाषा', theme: 'थीम', light: 'हल्का', dark: 'गहरा', hubIntro: 'एक कैलकुलेटर चुनें।', loanDesc: 'भुगतान और ब्याज का अनुमान।', mortgageDesc: 'क्लोजिंग लागत सहित।', taxDesc: 'कर और प्रभावी दर का अनुमान।', insuranceDesc: 'प्रीमियम का अनुमान।' },
  id: { ...base, siteName: 'Pusat Keuangan', calculators: 'Kalkulator', explore: 'Jelajahi', loan: 'Pinjaman', mortgage: 'KPR', tax: 'Pajak', insurance: 'Asuransi', loanCalc: 'Kalkulator Pinjaman', mortgageCalc: 'Kalkulator KPR', taxCalc: 'Kalkulator Pajak', insuranceCalc: 'Perkiraan Premi', years: 'Tenor (tahun)', interestRate: 'Suku bunga tahunan (%)', closingCosts: 'Biaya penutupan', premiumRate: 'Tarif premi (mis. 2 untuk 2%)', insuredAmount: 'Jumlah pertanggungan', calculate: 'Hitung', monthlyPayment: 'Angsuran bulanan', totalRepayment: 'Total pembayaran', totalInterest: 'Total bunga', totalTax: 'Total pajak', effectiveRate: 'Tarif efektif', estimatedPremium: 'Perkiraan premi tahunan', disclaimerTax: 'Perkiraan sederhana. Konsultasikan profesional.', disclaimerInsurance: 'Premi nyata tergantung underwriting.', whyMatters: 'Mengapa penting', sources: 'Sumber', otherCalcs: 'Kalkulator lain', language: 'Bahasa', theme: 'Tema', light: 'Terang', dark: 'Gelap', hubIntro: 'Pilih kalkulator.', loanDesc: 'Perkirakan cicilan dan bunga.', mortgageDesc: 'Termasuk biaya penutupan.', taxDesc: 'Perkirakan pajak dan tarif efektif.', insuranceDesc: 'Perkiraan premi.' },
  ru: { ...base, siteName: 'Финансовый Хаб', calculators: 'Калькуляторы', explore: 'Исследовать', loan: 'Кредит', mortgage: 'Ипотека', tax: 'Налог', insurance: 'Страхование', loanCalc: 'Калькулятор кредита', mortgageCalc: 'Калькулятор ипотеки', taxCalc: 'Калькулятор налога', insuranceCalc: 'Оценка страховой премии', years: 'Срок (лет)', interestRate: 'Годовая ставка (%)', closingCosts: 'Затраты на закрытие', premiumRate: 'Тариф премии (напр., 2 = 2%)', insuredAmount: 'Страховая сумма', calculate: 'Рассчитать', monthlyPayment: 'Ежемесячный платеж', totalRepayment: 'Итого к выплате', totalInterest: 'Сумма процентов', totalTax: 'Налог итого', effectiveRate: 'Эффективная ставка', estimatedPremium: 'Годовая премия (оценка)', disclaimerTax: 'Упрощенная оценка. Обратитесь к специалисту.', disclaimerInsurance: 'Премии зависят от андеррайтинга.', whyMatters: 'Почему это важно', sources: 'Источники', otherCalcs: 'Другие калькуляторы', language: 'Язык', theme: 'Тема', light: 'Светлая', dark: 'Тёмная', hubIntro: 'Выберите калькулятор.', loanDesc: 'Оцените платежи и проценты.', mortgageDesc: 'Включая затраты на закрытие.', taxDesc: 'Оцените налог и эффективную ставку.', insuranceDesc: 'Оценка премии.' },
  it: { ...base, siteName: 'Hub Finanza', calculators: 'Calcolatori', explore: 'Esplora', loan: 'Prestito', mortgage: 'Mutuo', tax: 'Tasse', insurance: 'Assicurazione', loanCalc: 'Calcolatore Prestito', mortgageCalc: 'Calcolatore Mutuo', taxCalc: 'Calcolatore Tasse', insuranceCalc: 'Stima Premio Assicurativo', years: 'Durata (anni)', interestRate: 'Tasso annuo (%)', closingCosts: 'Spese di chiusura', premiumRate: 'Tasso premio (es. 2 = 2%)', insuredAmount: 'Importo assicurato', calculate: 'Calcola', monthlyPayment: 'Rata mensile', totalRepayment: 'Totale da rimborsare', totalInterest: 'Interessi totali', totalTax: 'Tasse totali', effectiveRate: 'Aliquota effettiva', estimatedPremium: 'Premio annuo stimato', disclaimerTax: 'Stima semplificata. Consulta un professionista.', disclaimerInsurance: 'I premi dipendono dall’underwriting.', whyMatters: 'Perché è importante', sources: 'Fonti', otherCalcs: 'Altri calcolatori', language: 'Lingua', theme: 'Tema', light: 'Chiaro', dark: 'Scuro', hubIntro: 'Scegli un calcolatore.', loanDesc: 'Stima rate e interessi.', mortgageDesc: 'Include spese di chiusura.', taxDesc: 'Stima tasse e aliquota effettiva.', insuranceDesc: 'Stima premio.' },
  nl: { ...base, siteName: 'Financieel Hub', calculators: 'Rekenmachines', explore: 'Ontdek', loan: 'Lening', mortgage: 'Hypotheek', tax: 'Belasting', insurance: 'Verzekering', loanCalc: 'Leningscalculator', mortgageCalc: 'Hypotheekcalculator', taxCalc: 'Belastingcalculator', insuranceCalc: 'Premie schatter', years: 'Termijn (jaren)', interestRate: 'Jaarlijkse rente (%)', closingCosts: 'Sluitkosten', premiumRate: 'Premietarief (bv. 2 = 2%)', insuredAmount: 'Verzekerd bedrag', calculate: 'Berekenen', monthlyPayment: 'Maandelijkse betaling', totalRepayment: 'Totale terugbetaling', totalInterest: 'Totale rente', totalTax: 'Totale belasting', effectiveRate: 'Effectieve tarief', estimatedPremium: 'Geschatte jaarlijkse premie', disclaimerTax: 'Eenvoudige schatting. Raadpleeg een professional.', disclaimerInsurance: 'Premies hangen af van underwriting.', whyMatters: 'Waarom dit belangrijk is', sources: 'Bronnen', otherCalcs: 'Andere rekenmachines', language: 'Taal', theme: 'Thema', light: 'Licht', dark: 'Donker', hubIntro: 'Kies een rekenmachine.', loanDesc: 'Schat betalingen en rente.', mortgageDesc: 'Inclusief sluitkosten.', taxDesc: 'Schat belasting en tarief.', insuranceDesc: 'Schat premie.' },
  vi: { ...base, siteName: 'Trung tâm Tài chính', calculators: 'Máy tính', explore: 'Khám phá', loan: 'Vay', mortgage: 'Thế chấp', tax: 'Thuế', insurance: 'Bảo hiểm', loanCalc: 'Máy tính khoản vay', mortgageCalc: 'Máy tính thế chấp', taxCalc: 'Máy tính thuế', insuranceCalc: 'Ước tính phí bảo hiểm', years: 'Kỳ hạn (năm)', interestRate: 'Lãi suất năm (%)', closingCosts: 'Chi phí kết thúc', premiumRate: 'Tỷ lệ phí (vd: 2 = 2%)', insuredAmount: 'Số tiền bảo hiểm', calculate: 'Tính', monthlyPayment: 'Khoản trả hàng tháng', totalRepayment: 'Tổng hoàn trả', totalInterest: 'Tổng lãi', totalTax: 'Tổng thuế', effectiveRate: 'Thuế suất hiệu quả', estimatedPremium: 'Phí bảo hiểm năm ước tính', disclaimerTax: 'Ước tính đơn giản. Hãy hỏi chuyên gia.', disclaimerInsurance: 'Phí thực tế phụ thuộc thẩm định.', whyMatters: 'Tại sao quan trọng', sources: 'Nguồn', otherCalcs: 'Máy tính khác', language: 'Ngôn ngữ', theme: 'Giao diện', light: 'Sáng', dark: 'Tối', hubIntro: 'Chọn một máy tính.', loanDesc: 'Ước tính khoản trả và lãi.', mortgageDesc: 'Bao gồm chi phí kết thúc.', taxDesc: 'Ước tính thuế và thuế suất.', insuranceDesc: 'Ước tính phí.' },
  fa: { ...base, siteName: 'هاب مالی', calculators: 'محاسبه‌گرها', explore: 'کاوش', loan: 'وام', mortgage: 'رهن', tax: 'مالیات', insurance: 'بیمه', loanCalc: 'محاسبه‌گر وام', mortgageCalc: 'محاسبه‌گر رهن', taxCalc: 'محاسبه‌گر مالیات', insuranceCalc: 'برآورد حق بیمه', years: 'مدت (سال)', interestRate: 'نرخ سود سالانه (%)', closingCosts: 'هزینه‌های اختتام', premiumRate: 'نرخ حق بیمه (مثلاً 2 = 2%)', insuredAmount: 'مبلغ بیمه‌شده', calculate: 'محاسبه', monthlyPayment: 'قسط ماهانه', totalRepayment: 'بازپرداخت کل', totalInterest: 'بهره کل', totalTax: 'مالیات کل', effectiveRate: 'نرخ مؤثر', estimatedPremium: 'حق بیمه سالانه برآوردی', disclaimerTax: 'برآورد ساده. با متخصص مشورت کنید.', disclaimerInsurance: 'حق بیمه واقعی به ارزیابی وابسته است.', whyMatters: 'چرا مهم است', sources: 'منابع', otherCalcs: 'محاسبه‌گرهای دیگر', language: 'زبان', theme: 'تم', light: 'روشن', dark: 'تیره', hubIntro: 'یک محاسبه‌گر انتخاب کنید.', loanDesc: 'برآورد پرداخت‌ها و بهره.', mortgageDesc: 'شامل هزینه‌های اختتام.', taxDesc: 'برآورد مالیات و نرخ مؤثر.', insuranceDesc: 'برآورد حق بیمه.' }
};

export function t(lang: string, key: string): string {
  const code = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as LangCode) : 'en';
  const dict = translations[code] || translations.en;
  return dict[key] ?? translations.en[key] ?? key;
}

