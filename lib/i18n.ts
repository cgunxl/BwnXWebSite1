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
    howToUse: 'How to use',
    faq: 'FAQ',
    selectCountry: 'Country',
    useCases: 'What you can do with this calculator',
    explore: 'Explore',
    backToHub: 'Back to hub',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    navLoan: 'Loan',
    navMortgage: 'Mortgage',
    navTax: 'Tax',
    navInsurance: 'Insurance',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    consentMessage: 'We use cookies for analytics. You can change your choice anytime.',
    accept: 'Accept',
    decline: 'Decline',
    settings: 'Settings',
    reset: 'Reset',
    downloadCsv: 'Download CSV',
    amortizationSchedule: 'Amortization Schedule',
    month: 'Month',
    principalPaid: 'Principal Paid',
    interestPaid: 'Interest Paid',
    balance: 'Balance',
    resultsLive: 'Results will update as you type',
    rateUnit: 'Rate Unit',
    percent: 'Percent',
    decimal: 'Decimal',
    currency: 'Currency',
    search: 'Search',
    searchPlaceholder: 'Search calculators... ',
    vatCalc: 'VAT Calculator',
    paycheckCalc: 'Paycheck Calculator',
    currencyConverter: 'Currency Converter',
    compoundCalc: 'Compound Interest Calculator',
    savingsGoalCalc: 'Savings Goal Calculator',
    creditCardCalc: 'Credit Card Interest Calculator',
    carLoanCalc: 'Car Loan Calculator',
    propertyTaxCalc: 'Property Tax Calculator',
    inflationCalc: 'Inflation Calculator',
    roiCalc: 'ROI Calculator',
    stockReturnCalc: 'Stock Return Calculator',
    dividendCalc: 'Dividend Calculator',
    salesTaxCalc: 'Sales Tax Calculator',
    tipCalc: 'Tip Calculator',
    discountCalc: 'Discount Calculator',
    cryptoProfitCalc: 'Crypto Profit Calculator',
    bitcoinMiningCalc: 'Bitcoin Mining Calculator',
    ethGasCalc: 'Ethereum Gas Fee Calculator',
    nftProfitCalc: 'NFT Profit Calculator',
    sipCalc: 'SIP Calculator',
    mutualFundCalc: 'Mutual Fund Calculator'
    ,averageCalc: 'Average Calculator'
    ,medianModeCalc: 'Median & Mode Calculator'
    ,stdDevCalc: 'Standard Deviation Calculator'
    ,exponentCalc: 'Exponent Calculator'
    ,logarithmCalc: 'Logarithm Calculator'
    ,ratioCalc: 'Ratio Calculator'
    ,percentageCalc: 'Percentage Calculator'
    ,markupCalc: 'Markup Calculator'
    ,hourlyWageCalc: 'Hourly Wage Calculator'
    ,freelancerRateCalc: 'Freelancer Rate Calculator'
    ,timeCalc: 'Time Converter'
    ,powerCalc: 'Power Converter'
    ,frequencyCalc: 'Frequency Converter'
    ,lengthConverter: 'Length Converter'
    ,weightConverter: 'Weight Converter'
    ,speedConverter: 'Speed Converter'
    ,temperatureConverter: 'Temperature Converter'
    ,pressureConverter: 'Pressure Converter'
    ,angleConverter: 'Angle Converter'
    ,areaConverter: 'Area Converter'
    ,volumeConverter: 'Volume Converter'
    ,energyConverter: 'Energy Converter'
    ,bloodSugarCalc: 'Blood Sugar Converter'
    ,fuelEfficiencyCalc: 'Fuel Efficiency Converter'
    ,primeCalc: 'Prime Number Calculator'
    ,factorialCalc: 'Factorial Calculator'
    ,ovulationCalc: 'Ovulation Calculator'
    ,pregnancyDueDateCalc: 'Pregnancy Due Date Calculator'
    ,pregnancyWeightGainCalc: 'Pregnancy Weight Gain Calculator'
    ,profitMarginCalc: 'Profit Margin Calculator'
    ,overtimeCalc: 'Overtime Pay Calculator'
    ,bmiCalc: 'BMI Calculator'
    ,bmrCalc: 'BMR Calculator'
    ,tdeeCalc: 'TDEE Calculator'
    ,macroCalc: 'Macro Calculator'
    ,waterIntakeCalc: 'Water Intake Calculator'
    ,idealWeightCalc: 'Ideal Weight Calculator'
    ,bodyFatCalc: 'Body Fat Calculator'
    ,runningPaceCalc: 'Running Pace Calculator'
    ,marathonTimeCalc: 'Marathon Time Calculator'
    ,vo2maxCalc: 'VO2 Max Calculator'
    ,heartRateCalc: 'Heart Rate Calculator'
    ,targetHrCalc: 'Target Heart Rate Calculator'
    ,bacCalc: 'BAC Calculator'
    ,sleepCalc: 'Sleep Calculator'
    ,cholesterolRatioCalc: 'Cholesterol Ratio Calculator'
    ,ohmsLawCalc: 'Ohm’s Law Calculator'
    ,permutationCalc: 'Permutation Calculator'
    ,combinationCalc: 'Combination Calculator'
    ,zScoreCalc: 'Z-Score Calculator'
    ,circleAreaCalc: 'Circle Area Calculator'
    ,triangleAreaCalc: 'Triangle Area Calculator'
    ,gcfCalc: 'GCF Calculator'
    ,lcmCalc: 'LCM Calculator'
    ,ageCalc: 'Age Calculator'
    ,dateDiffCalc: 'Date Difference Calculator'
    ,fuelCostCalc: 'Fuel Cost Calculator'
    ,electricityBillCalc: 'Electricity Bill Calculator'
    ,downloadTimeCalc: 'Download Time Calculator'
    ,ageGapCalc: 'Age Gap Calculator'
    ,rngCalc: 'Random Number Generator'
    ,diceCalc: 'Dice Roller'
    ,coinFlipCalc: 'Coin Flip Simulator'
    ,countdownCalc: 'Countdown Timer'
    ,websiteBandwidthCalc: 'Website Bandwidth Calculator'
    ,dataTransferCalc: 'Data Transfer Calculator'
    ,streamingBandwidthCalc: 'Streaming Bandwidth Calculator'
    ,apiUsageCalc: 'API Usage Calculator'
    ,salaryCalc: 'Salary Calculator'
    ,retirementCalc: 'Retirement Calculator'
    ,k401Calc: '401(k) Calculator'
    ,rothIraCalc: 'Roth IRA Calculator'
    ,currencyArbCalc: 'Currency Arbitrage Calculator'
    ,npvIrrCalc: 'NPV & IRR Calculator'
    ,annuityCalc: 'Annuity Calculator'
    ,bondPriceCalc: 'Bond Price Calculator'
    ,bondYieldCalc: 'Bond Yield (YTM) Calculator'
    ,waccCalc: 'WACC Calculator'
    ,dscrCalc: 'DSCR Calculator'
    ,aprApyCalc: 'APR ↔ APY Converter'
    ,rule72Calc: 'Rule of 72 Calculator'
    ,simpleInterestCalc: 'Simple Interest Calculator'
    ,houseAffordabilityCalc: 'House Affordability Calculator'
    ,ltvCalc: 'LTV Calculator'
    ,dtiCalc: 'DTI Calculator'
    ,emergencyFundCalc: 'Emergency Fund Calculator'
    ,solarPanelCalc: 'Solar Panel Calculator'
    ,evChargingCalc: 'EV Charging Calculator'
    ,rectangleAreaCalc: 'Rectangle Area Calculator'
    ,pythagoreanCalc: 'Pythagorean Theorem Calculator'
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
  th: {
    siteTitle: 'ศูนย์รวมการเงิน',
    tagline: 'เครื่องคิดเลขที่ชัดเจนเพื่อการตัดสินใจทางการเงินที่ดีกว่า',
    hubIntro: 'สำรวจเครื่องคิดเลขฟรีเพื่อคำนวณค่างวด ภาษี และเบี้ยประกัน',
    loan: 'เงินกู้',
    mortgage: 'จำนอง',
    tax: 'ภาษี',
    insurance: 'ประกันภัย',
    loanCalc: 'เครื่องคิดเลขเงินกู้',
    mortgageCalc: 'เครื่องคิดเลขสินเชื่อที่อยู่อาศัย',
    taxCalc: 'เครื่องคำนวณภาษี',
    insuranceCalc: 'เครื่องประมาณเบี้ยประกันภัย',
    principal: 'เงินต้น',
    interestRate: 'อัตราดอกเบี้ยต่อปี (%)',
    years: 'จำนวนปี',
    closingCosts: 'ค่าใช้จ่ายวันโอน',
    income: 'รายได้ต่อปี',
    premiumRate: 'อัตราเบี้ยประกันต่อปี',
    calculate: 'คำนวณ',
    results: 'ผลลัพธ์',
    monthlyPayment: 'ค่างวดต่อเดือน',
    totalRepayment: 'ยอดชำระทั้งหมด',
    totalInterest: 'ดอกเบี้ยรวม',
    totalTax: 'ภาษีทั้งหมด',
    effectiveTaxRate: 'อัตราภาษีที่แท้จริง',
    estimatedPremium: 'เบี้ยประกันรายปีโดยประมาณ',
    disclaimer: 'ข้อสงวนสิทธิ์: ไม่ใช่คำแนะนำด้านการเงิน ภาษี หรือประกันภัย',
    taxDisclaimer: 'ข้อสงวนสิทธิ์: เพื่อการศึกษาเท่านั้น โปรดปรึกษาผู้เชี่ยวชาญ',
    insuranceDisclaimer: 'ข้อสงวนสิทธิ์: เบี้ยจริงขึ้นกับการพิจารณารับประกันและเงื่อนไขกรมธรรม์',
    whyMatters: 'ทำไมเรื่องนี้จึงสำคัญ',
    sources: 'แหล่งอ้างอิง',
    howToUse: 'วิธีใช้',
    faq: 'คำถามที่พบบ่อย',
    selectCountry: 'ประเทศ',
    useCases: 'เครื่องคิดเลขนี้ใช้ทำอะไรได้บ้าง',
    explore: 'ดูรายละเอียด',
    backToHub: 'กลับหน้าแรก',
    language: 'ภาษา',
    theme: 'ธีม',
    light: 'สว่าง',
    dark: 'มืด',
    navLoan: 'เงินกู้',
    navMortgage: 'จำนอง',
    navTax: 'ภาษี',
    navInsurance: 'ประกันภัย',
    privacy: 'ความเป็นส่วนตัว',
    terms: 'เงื่อนไขการใช้บริการ',
    contact: 'ติดต่อ',
    consentMessage: 'เราใช้คุกกี้เพื่อการวิเคราะห์ คุณสามารถเปลี่ยนการยินยอมได้ทุกเมื่อ',
    accept: 'ยอมรับ',
    decline: 'ปฏิเสธ',
    settings: 'การตั้งค่า',
    reset: 'รีเซ็ต',
    downloadCsv: 'ดาวน์โหลด CSV',
    amortizationSchedule: 'ตารางผ่อนชำระ',
    month: 'เดือน',
    principalPaid: 'เงินต้นที่ชำระ',
    interestPaid: 'ดอกเบี้ยที่ชำระ',
    balance: 'ยอดคงเหลือ',
    resultsLive: 'ผลลัพธ์จะอัปเดตตามที่คุณพิมพ์',
    rateUnit: 'หน่วยอัตรา',
    percent: 'เปอร์เซ็นต์',
    decimal: 'ทศนิยม',
    currency: 'สกุลเงิน',
    search: 'ค้นหา',
    searchPlaceholder: 'ค้นหาเครื่องคิดเลข...',
    vatCalc: 'เครื่องคิดเลขภาษีมูลค่าเพิ่ม',
    paycheckCalc: 'เครื่องคำนวณเงินเข้าบัญชี',
    currencyConverter: 'ตัวแปลงสกุลเงิน',
    compoundCalc: 'เครื่องคิดเลขดอกเบี้ยทบต้น',
    savingsGoalCalc: 'เครื่องคำนวณเป้าหมายการออม',
    creditCardCalc: 'ดอกเบี้ยบัตรเครดิต',
    carLoanCalc: 'เครื่องคำนวณค่างวดรถยนต์',
    propertyTaxCalc: 'คำนวณภาษีที่ดินและสิ่งปลูกสร้าง',
    inflationCalc: 'คำนวณเงินด้อยค่า (เงินเฟ้อ)',
    roiCalc: 'คำนวณ ROI',
    stockReturnCalc: 'คำนวณกำไรหุ้น',
    dividendCalc: 'คำนวณเงินปันผล',
    salesTaxCalc: 'คำนวณภาษีขาย',
    tipCalc: 'คำนวณทิป',
    discountCalc: 'คำนวณราคาหลังลด',
    cryptoProfitCalc: 'คำนวณกำไรคริปโต',
    bitcoinMiningCalc: 'คำนวณขุด Bitcoin',
    ethGasCalc: 'คำนวณค่าธรรมเนียม ETH',
    nftProfitCalc: 'คำนวณกำไร NFT',
    sipCalc: 'คำนวณ SIP (อินเดีย)',
    mutualFundCalc: 'คำนวณกองทุนรวม'
    ,averageCalc: 'คำนวณค่าเฉลี่ย'
    ,medianModeCalc: 'คำนวณค่ามัธยฐานและฐานนิยม'
    ,stdDevCalc: 'คำนวณค่าเบี่ยงเบนมาตรฐาน'
    ,exponentCalc: 'คำนวณเลขยกกำลัง'
    ,logarithmCalc: 'คำนวณลอการิทึม'
    ,ratioCalc: 'คำนวณอัตราส่วน'
    ,percentageCalc: 'คำนวณเปอร์เซ็นต์'
    ,markupCalc: 'คำนวณมาร์กอัป'
    ,hourlyWageCalc: 'คำนวณค่าจ้างรายชั่วโมง'
    ,freelancerRateCalc: 'คำนวณเรทฟรีแลนซ์'
    ,timeCalc: 'ตัวแปลงเวลา'
    ,powerCalc: 'ตัวแปลงกำลังไฟฟ้า'
    ,frequencyCalc: 'ตัวแปลงความถี่'
    ,lengthConverter: 'ตัวแปลงความยาว'
    ,weightConverter: 'ตัวแปลงน้ำหนัก'
    ,speedConverter: 'ตัวแปลงความเร็ว'
    ,temperatureConverter: 'ตัวแปลงอุณหภูมิ'
    ,pressureConverter: 'ตัวแปลงความดัน'
    ,angleConverter: 'ตัวแปลงมุม'
    ,areaConverter: 'ตัวแปลงพื้นที่'
    ,volumeConverter: 'ตัวแปลงปริมาตร'
    ,energyConverter: 'ตัวแปลงพลังงาน'
    ,bloodSugarCalc: 'แปลงหน่วยน้ำตาลในเลือด'
    ,fuelEfficiencyCalc: 'ตัวแปลงอัตราสิ้นเปลือง'
    ,primeCalc: 'ตรวจสอบจำนวนเฉพาะ'
    ,factorialCalc: 'คำนวณแฟกทอเรียล'
    ,ovulationCalc: 'คำนวณวันไข่ตก'
    ,pregnancyDueDateCalc: 'คำนวณกำหนดคลอด'
    ,pregnancyWeightGainCalc: 'คำนวณน้ำหนักที่ควรเพิ่มระหว่างตั้งครรภ์'
    ,profitMarginCalc: 'คำนวณอัตรากำไร'
    ,overtimeCalc: 'คำนวณค่าโอที'
    ,bmiCalc: 'คำนวณ BMI'
    ,bmrCalc: 'คำนวณ BMR'
    ,tdeeCalc: 'คำนวณ TDEE'
    ,macroCalc: 'คำนวณสัดส่วนสารอาหาร (Macro)'
    ,waterIntakeCalc: 'คำนวณปริมาณน้ำที่ควรดื่ม'
    ,idealWeightCalc: 'คำนวณน้ำหนักเหมาะสม'
    ,bodyFatCalc: 'คำนวณเปอร์เซ็นต์ไขมัน'
    ,runningPaceCalc: 'คำนวณเพซวิ่ง'
    ,marathonTimeCalc: 'คาดการณ์เวลา Marathon'
    ,vo2maxCalc: 'คำนวณ VO2 Max'
    ,heartRateCalc: 'คำนวณอัตราการเต้นหัวใจ'
    ,targetHrCalc: 'คำนวณโซนอัตราการเต้นหัวใจ'
    ,bacCalc: 'คำนวณแอลกอฮอล์ในเลือด (BAC)'
    ,sleepCalc: 'คำนวณเวลานอน'
    ,cholesterolRatioCalc: 'คำนวณอัตราส่วนคอเลสเตอรอล'
    ,ohmsLawCalc: 'คำนวณกฎของโอห์ม'
    ,permutationCalc: 'คำนวณการจัดเรียง (Permutation)'
    ,combinationCalc: 'คำนวณการเลือก (Combination)'
    ,zScoreCalc: 'คำนวณค่า Z-Score'
    ,circleAreaCalc: 'คำนวณพื้นที่วงกลม'
    ,triangleAreaCalc: 'คำนวณพื้นที่สามเหลี่ยม'
    ,gcfCalc: 'คำนวณ ห.ร.ม.'
    ,lcmCalc: 'คำนวณ ค.ร.น.'
    ,ageCalc: 'คำนวณอายุ'
    ,dateDiffCalc: 'นับวันระหว่างสองวัน'
    ,fuelCostCalc: 'คำนวณค่าน้ำมัน'
    ,electricityBillCalc: 'คำนวณค่าไฟฟ้า'
    ,downloadTimeCalc: 'คำนวณเวลาโหลดไฟล์'
    ,ageGapCalc: 'คำนวณความต่างอายุ'
    ,rngCalc: 'เครื่องสุ่มตัวเลข'
    ,diceCalc: 'ทอยลูกเต๋า'
    ,coinFlipCalc: 'จำลองโยนเหรียญ'
    ,countdownCalc: 'จับเวลานับถอยหลัง'
    ,websiteBandwidthCalc: 'คำนวณแบนด์วิดธ์เว็บไซต์'
    ,dataTransferCalc: 'คำนวณอัตราการโอนข้อมูล'
    ,streamingBandwidthCalc: 'คำนวณแบนด์วิดธ์สตรีมมิ่ง'
    ,apiUsageCalc: 'คำนวณการใช้งาน API'
    ,salaryCalc: 'คำนวณเงินเดือนสุทธิ'
    ,retirementCalc: 'คำนวณเงินเกษียณ'
    ,k401Calc: 'คำนวณ 401(k)'
    ,rothIraCalc: 'คำนวณ Roth IRA'
    ,currencyArbCalc: 'คำนวณอาร์บิทราจค่าเงิน'
    ,npvIrrCalc: 'คำนวณ NPV และ IRR'
    ,annuityCalc: 'คำนวณเงินงวด (Annuity)'
    ,bondPriceCalc: 'คำนวณราคา Bond'
    ,bondYieldCalc: 'คำนวณอัตราผลตอบแทนพันธบัตร (YTM)'
    ,waccCalc: 'คำนวณ WACC'
    ,dscrCalc: 'คำนวณ DSCR'
    ,aprApyCalc: 'ตัวแปลง APR ↔ APY'
    ,rule72Calc: 'คำนวณกฎ 72'
    ,simpleInterestCalc: 'คำนวณดอกเบี้ยแบบง่าย'
    ,houseAffordabilityCalc: 'คำนวณงบซื้อบ้านที่เหมาะสม'
    ,ltvCalc: 'คำนวณ LTV'
    ,dtiCalc: 'คำนวณ DTI'
    ,emergencyFundCalc: 'คำนวณเงินสำรองฉุกเฉิน'
    ,solarPanelCalc: 'คำนวณแผงโซลาร์เซลล์ที่ต้องใช้'
    ,evChargingCalc: 'คำนวณชาร์จรถ EV'
    ,rectangleAreaCalc: 'คำนวณพื้นที่สี่เหลี่ยมผืนผ้า'
    ,pythagoreanCalc: 'คำนวณทฤษฎีพีทาโกรัส'
  },
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

const NATIVE_NAMES: Record<LangCode, string> = {
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
  fa: 'فارسی'
};

export function getNativeName(lang: string): string {
  const l = (SUPPORTED_LANGS as string[]).includes(lang) ? (lang as LangCode) : 'en';
  return NATIVE_NAMES[l];
}

