// Complete Calculator Data Structure for BwnXCalculator
// 50 High-Value Calculators with full metadata

export interface CalculatorData {
  id: string;
  slug: string;
  category: string;
  name: Record<string, string>; // Localized names
  description: Record<string, string>; // Localized descriptions
  icon: string;
  keywords: {
    primary: string;
    secondary: string[];
    longtail: string[];
  };
  searchVolume: number;
  difficulty: number;
  priority: number;
  relatedCalculators: string[];
  externalLinks: string[];
}

export const calculatorCategories = {
  finance: { 
    name: { en: 'Finance', th: 'การเงิน', ja: '金融', zh: '金融', es: 'Finanzas' },
    icon: '💰',
    slug: 'finance'
  },
  health: {
    name: { en: 'Health', th: 'สุขภาพ', ja: '健康', zh: '健康', es: 'Salud' },
    icon: '❤️',
    slug: 'health'
  },
  education: {
    name: { en: 'Education', th: 'การศึกษา', ja: '教育', zh: '教育', es: 'Educación' },
    icon: '📚',
    slug: 'education'
  },
  math: {
    name: { en: 'Math', th: 'คณิตศาสตร์', ja: '数学', zh: '数学', es: 'Matemáticas' },
    icon: '📐',
    slug: 'math'
  },
  conversion: {
    name: { en: 'Conversion', th: 'แปลงหน่วย', ja: '変換', zh: '转换', es: 'Conversión' },
    icon: '🔄',
    slug: 'conversion'
  }
};

// Top 50 High-Value Calculators
export const calculatorsData: CalculatorData[] = [
  // Finance Calculators (1-15)
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    category: 'finance',
    name: {
      en: 'Loan Calculator',
      th: 'คำนวณสินเชื่อ',
      ja: 'ローン計算機',
      zh: '贷款计算器',
      es: 'Calculadora de Préstamos',
      pt: 'Calculadora de Empréstimo',
      de: 'Kreditrechner',
      fr: 'Calculateur de Prêt',
      ko: '대출 계산기',
      ar: 'حاسبة القرض',
      hi: 'ऋण कैलकुलेटर',
      id: 'Kalkulator Pinjaman',
      ru: 'Калькулятор кредита',
      it: 'Calcolatore di Prestito',
      nl: 'Lening Calculator',
      vi: 'Máy tính vay',
      fa: 'ماشین حساب وام'
    },
    description: {
      en: 'Calculate monthly loan payments, total interest, and amortization schedule',
      th: 'คำนวณค่างวดรายเดือน ดอกเบี้ยรวม และตารางผ่อนชำระ',
      ja: '月々の返済額、総利息、返済スケジュールを計算',
      zh: '计算每月还款额、总利息和还款计划',
      es: 'Calcule pagos mensuales, interés total y calendario de amortización'
    },
    icon: '💳',
    keywords: {
      primary: 'loan calculator',
      secondary: ['monthly payment', 'interest rate', 'amortization'],
      longtail: ['personal loan calculator monthly payment', 'loan interest calculator online']
    },
    searchVolume: 165000,
    difficulty: 45,
    priority: 1,
    relatedCalculators: ['mortgage-calculator', 'car-loan-calculator', 'credit-card-calculator'],
    externalLinks: [
      'https://www.investopedia.com/terms/l/loan.asp',
      'https://en.wikipedia.org/wiki/Loan'
    ]
  },
  {
    id: 'mortgage-calculator',
    slug: 'mortgage-calculator',
    category: 'finance',
    name: {
      en: 'Mortgage Calculator',
      th: 'คำนวณสินเชื่อบ้าน',
      ja: '住宅ローン計算機',
      zh: '房贷计算器',
      es: 'Calculadora de Hipoteca',
      pt: 'Calculadora de Hipoteca',
      de: 'Hypothekenrechner',
      fr: 'Calculateur Hypothécaire',
      ko: '모기지 계산기',
      ar: 'حاسبة الرهن العقاري',
      hi: 'बंधक कैलकुलेटर',
      id: 'Kalkulator Hipotek',
      ru: 'Ипотечный калькулятор',
      it: 'Calcolatore Mutuo',
      nl: 'Hypotheek Calculator',
      vi: 'Máy tính thế chấp',
      fa: 'ماشین حساب رهن'
    },
    description: {
      en: 'Calculate mortgage payments with taxes, insurance, PMI and amortization',
      th: 'คำนวณค่างวดบ้านพร้อมภาษี ประกัน และตารางผ่อนชำระ',
      ja: '税金、保険、PMIを含む住宅ローンの支払いを計算',
      zh: '计算包括税费、保险和PMI的房贷付款'
    },
    icon: '🏠',
    keywords: {
      primary: 'mortgage calculator',
      secondary: ['home loan', 'mortgage payment', 'house payment'],
      longtail: ['mortgage calculator with taxes insurance', 'home loan calculator with extra payments']
    },
    searchVolume: 450000,
    difficulty: 65,
    priority: 1,
    relatedCalculators: ['loan-calculator', 'refinance-calculator', 'property-tax-calculator'],
    externalLinks: [
      'https://www.investopedia.com/terms/m/mortgage.asp',
      'https://www.consumerfinance.gov/owning-a-home/'
    ]
  },
  {
    id: 'tax-calculator',
    slug: 'tax-calculator',
    category: 'finance',
    name: {
      en: 'Tax Calculator',
      th: 'คำนวณภาษี',
      ja: '税金計算機',
      zh: '税收计算器',
      es: 'Calculadora de Impuestos',
      pt: 'Calculadora de Impostos',
      de: 'Steuerrechner',
      fr: 'Calculateur de Taxes',
      ko: '세금 계산기',
      ar: 'حاسبة الضرائب',
      hi: 'कर कैलकुलेटर',
      id: 'Kalkulator Pajak',
      ru: 'Налоговый калькулятор',
      it: 'Calcolatore Tasse',
      nl: 'Belasting Calculator',
      vi: 'Máy tính thuế',
      fa: 'ماشین حساب مالیات'
    },
    description: {
      en: 'Calculate income tax, deductions, and refunds for multiple countries',
      th: 'คำนวณภาษีเงินได้ ค่าลดหย่อน และเงินคืนภาษี',
      ja: '所得税、控除、還付金を計算',
      zh: '计算所得税、扣除额和退税'
    },
    icon: '📊',
    keywords: {
      primary: 'tax calculator',
      secondary: ['income tax', 'tax refund', 'tax deduction'],
      longtail: ['income tax calculator 2024', 'federal tax calculator with deductions']
    },
    searchVolume: 890000,
    difficulty: 60,
    priority: 1,
    relatedCalculators: ['salary-calculator', 'paycheck-calculator', 'vat-calculator'],
    externalLinks: [
      'https://www.irs.gov/',
      'https://www.investopedia.com/taxes-4427724'
    ]
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    category: 'finance',
    name: {
      en: 'Compound Interest Calculator',
      th: 'คำนวณดอกเบี้ยทบต้น',
      ja: '複利計算機',
      zh: '复利计算器',
      es: 'Calculadora de Interés Compuesto'
    },
    description: {
      en: 'Calculate compound interest growth over time with regular contributions',
      th: 'คำนวณการเติบโตของดอกเบี้ยทบต้นพร้อมการฝากเพิ่ม',
      ja: '定期的な拠出を含む複利成長を計算'
    },
    icon: '📈',
    keywords: {
      primary: 'compound interest calculator',
      secondary: ['compound interest', 'investment growth', 'interest calculator'],
      longtail: ['compound interest calculator monthly contribution', 'compound interest formula calculator']
    },
    searchVolume: 246000,
    difficulty: 30,
    priority: 1,
    relatedCalculators: ['savings-calculator', 'investment-calculator', 'retirement-calculator'],
    externalLinks: ['https://www.investopedia.com/terms/c/compoundinterest.asp']
  },
  {
    id: 'currency-converter',
    slug: 'currency-converter',
    category: 'finance',
    name: {
      en: 'Currency Converter',
      th: 'แปลงสกุลเงิน',
      ja: '通貨換算',
      zh: '货币转换器',
      es: 'Conversor de Divisas'
    },
    description: {
      en: 'Convert between 150+ world currencies with real-time exchange rates',
      th: 'แปลงสกุลเงินกว่า 150 สกุลทั่วโลกด้วยอัตราแลกเปลี่ยนแบบเรียลไทม์',
      ja: 'リアルタイムレートで150以上の通貨を変換'
    },
    icon: '💱',
    keywords: {
      primary: 'currency converter',
      secondary: ['exchange rate', 'currency exchange', 'money converter'],
      longtail: ['usd to eur converter', 'real time currency converter']
    },
    searchVolume: 2200000,
    difficulty: 70,
    priority: 1,
    relatedCalculators: ['crypto-converter', 'travel-budget-calculator'],
    externalLinks: ['https://www.xe.com/', 'https://www.oanda.com/']
  },

  // Health Calculators (16-25)
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    category: 'health',
    name: {
      en: 'BMI Calculator',
      th: 'คำนวณ BMI',
      ja: 'BMI計算機',
      zh: 'BMI计算器',
      es: 'Calculadora de IMC'
    },
    description: {
      en: 'Calculate Body Mass Index and healthy weight range',
      th: 'คำนวณดัชนีมวลกายและช่วงน้ำหนักที่เหมาะสม',
      ja: 'BMIと健康的な体重範囲を計算'
    },
    icon: '⚖️',
    keywords: {
      primary: 'bmi calculator',
      secondary: ['body mass index', 'healthy weight', 'bmi chart'],
      longtail: ['bmi calculator with age', 'body mass index calculator metric']
    },
    searchVolume: 673000,
    difficulty: 35,
    priority: 1,
    relatedCalculators: ['body-fat-calculator', 'ideal-weight-calculator', 'calorie-calculator'],
    externalLinks: [
      'https://www.who.int/health-topics/obesity',
      'https://www.cdc.gov/healthyweight/assessing/bmi/'
    ]
  },
  {
    id: 'calorie-calculator',
    slug: 'calorie-calculator',
    category: 'health',
    name: {
      en: 'Calorie Calculator',
      th: 'คำนวณแคลอรี่',
      ja: 'カロリー計算機',
      zh: '卡路里计算器',
      es: 'Calculadora de Calorías'
    },
    description: {
      en: 'Calculate daily calorie needs for weight loss, gain, or maintenance',
      th: 'คำนวณแคลอรี่ที่ต้องการต่อวันสำหรับลดน้ำหนัก เพิ่มน้ำหนัก หรือคงน้ำหนัก',
      ja: '減量、増量、維持のための1日のカロリー必要量を計算'
    },
    icon: '🔥',
    keywords: {
      primary: 'calorie calculator',
      secondary: ['tdee calculator', 'calorie deficit', 'daily calories'],
      longtail: ['calorie calculator for weight loss', 'tdee calculator with activity level']
    },
    searchVolume: 550000,
    difficulty: 40,
    priority: 1,
    relatedCalculators: ['macro-calculator', 'bmi-calculator', 'protein-calculator'],
    externalLinks: ['https://www.healthline.com/nutrition/how-many-calories-per-day']
  },
  {
    id: 'pregnancy-calculator',
    slug: 'pregnancy-calculator',
    category: 'health',
    name: {
      en: 'Pregnancy Calculator',
      th: 'คำนวณอายุครรภ์',
      ja: '妊娠計算機',
      zh: '怀孕计算器',
      es: 'Calculadora de Embarazo'
    },
    description: {
      en: 'Calculate due date, conception date, and pregnancy milestones',
      th: 'คำนวณวันคลอด วันปฏิสนธิ และช่วงสำคัญของการตั้งครรภ์',
      ja: '出産予定日、受胎日、妊娠マイルストーンを計算'
    },
    icon: '🤰',
    keywords: {
      primary: 'pregnancy calculator',
      secondary: ['due date calculator', 'conception calculator', 'pregnancy weeks'],
      longtail: ['pregnancy due date calculator by lmp', 'pregnancy week calculator from conception']
    },
    searchVolume: 301000,
    difficulty: 30,
    priority: 1,
    relatedCalculators: ['ovulation-calculator', 'baby-gender-calculator'],
    externalLinks: ['https://www.acog.org/womens-health/pregnancy']
  },

  // Education Calculators (26-35)
  {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    category: 'education',
    name: {
      en: 'GPA Calculator',
      th: 'คำนวณ GPA',
      ja: 'GPA計算機',
      zh: 'GPA计算器',
      es: 'Calculadora de GPA'
    },
    description: {
      en: 'Calculate Grade Point Average for college and high school',
      th: 'คำนวณเกรดเฉลี่ยสะสมสำหรับมหาวิทยาลัยและมัธยม',
      ja: '大学と高校のGPAを計算'
    },
    icon: '🎓',
    keywords: {
      primary: 'gpa calculator',
      secondary: ['grade point average', 'college gpa', 'cumulative gpa'],
      longtail: ['college gpa calculator 4.0 scale', 'weighted gpa calculator high school']
    },
    searchVolume: 301000,
    difficulty: 25,
    priority: 1,
    relatedCalculators: ['grade-calculator', 'final-grade-calculator'],
    externalLinks: ['https://www.collegeboard.org/']
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    category: 'math',
    name: {
      en: 'Percentage Calculator',
      th: 'คำนวณเปอร์เซ็นต์',
      ja: 'パーセント計算機',
      zh: '百分比计算器',
      es: 'Calculadora de Porcentaje'
    },
    description: {
      en: 'Calculate percentages, percentage change, and percentage difference',
      th: 'คำนวณเปอร์เซ็นต์ การเปลี่ยนแปลง และความแตกต่าง',
      ja: 'パーセンテージ、変化率、差異を計算'
    },
    icon: '%',
    keywords: {
      primary: 'percentage calculator',
      secondary: ['percent calculator', 'percentage change', 'percentage increase'],
      longtail: ['percentage increase calculator', 'percentage difference calculator']
    },
    searchVolume: 823000,
    difficulty: 25,
    priority: 1,
    relatedCalculators: ['fraction-calculator', 'ratio-calculator'],
    externalLinks: ['https://www.mathsisfun.com/percentage.html']
  },

  // Math & Science Calculators (36-40)
  {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    category: 'math',
    name: {
      en: 'Scientific Calculator',
      th: 'เครื่องคิดเลขวิทยาศาสตร์',
      ja: '関数電卓',
      zh: '科学计算器',
      es: 'Calculadora Científica'
    },
    description: {
      en: 'Advanced calculator with trigonometric, logarithmic, and exponential functions',
      th: 'เครื่องคิดเลขขั้นสูงพร้อมฟังก์ชันตรีโกณมิติ ลอการิทึม และเอ็กซ์โพเนนเชียล',
      ja: '三角関数、対数、指数関数を備えた高度な計算機'
    },
    icon: '🔬',
    keywords: {
      primary: 'scientific calculator',
      secondary: ['online calculator', 'advanced calculator', 'math calculator'],
      longtail: ['scientific calculator with fractions', 'online scientific calculator radians']
    },
    searchVolume: 450000,
    difficulty: 40,
    priority: 1,
    relatedCalculators: ['graphing-calculator', 'matrix-calculator'],
    externalLinks: ['https://www.wolframalpha.com/']
  },

  // Conversion Calculators (41-50)
  {
    id: 'length-converter',
    slug: 'length-converter',
    category: 'conversion',
    name: {
      en: 'Length Converter',
      th: 'แปลงหน่วยความยาว',
      ja: '長さ変換',
      zh: '长度转换器',
      es: 'Conversor de Longitud'
    },
    description: {
      en: 'Convert between metric and imperial length units',
      th: 'แปลงหน่วยความยาวระหว่างเมตริกและอิมพีเรียล',
      ja: 'メートル法とヤード・ポンド法の長さ単位を変換'
    },
    icon: '📏',
    keywords: {
      primary: 'length converter',
      secondary: ['meter to feet', 'cm to inches', 'distance converter'],
      longtail: ['meters to feet converter', 'centimeters to inches calculator']
    },
    searchVolume: 165000,
    difficulty: 20,
    priority: 2,
    relatedCalculators: ['area-converter', 'volume-converter'],
    externalLinks: ['https://www.nist.gov/pml/weights-and-measures']
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    category: 'conversion',
    name: {
      en: 'Weight Converter',
      th: 'แปลงหน่วยน้ำหนัก',
      ja: '重量変換',
      zh: '重量转换器',
      es: 'Conversor de Peso'
    },
    description: {
      en: 'Convert between kg, pounds, ounces, and other weight units',
      th: 'แปลงระหว่างกิโลกรัม ปอนด์ ออนซ์ และหน่วยน้ำหนักอื่นๆ',
      ja: 'キログラム、ポンド、オンスなどの重量単位を変換'
    },
    icon: '⚖️',
    keywords: {
      primary: 'weight converter',
      secondary: ['kg to lbs', 'pounds to kg', 'mass converter'],
      longtail: ['kilograms to pounds converter', 'weight conversion calculator']
    },
    searchVolume: 201000,
    difficulty: 20,
    priority: 2,
    relatedCalculators: ['bmi-calculator', 'volume-converter'],
    externalLinks: ['https://www.nist.gov/']
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    category: 'conversion',
    name: {
      en: 'Temperature Converter',
      th: 'แปลงหน่วยอุณหภูมิ',
      ja: '温度変換',
      zh: '温度转换器',
      es: 'Conversor de Temperatura'
    },
    description: {
      en: 'Convert between Celsius, Fahrenheit, and Kelvin',
      th: 'แปลงระหว่างเซลเซียส ฟาเรนไฮต์ และเคลวิน',
      ja: '摂氏、華氏、ケルビンを変換'
    },
    icon: '🌡️',
    keywords: {
      primary: 'temperature converter',
      secondary: ['celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin converter'],
      longtail: ['celsius to fahrenheit converter', 'temperature conversion calculator']
    },
    searchVolume: 368000,
    difficulty: 20,
    priority: 2,
    relatedCalculators: ['weather-calculator', 'cooking-converter'],
    externalLinks: ['https://www.weather.gov/']
  },

  // Business Calculators
  {
    id: 'roi-calculator',
    slug: 'roi-calculator',
    category: 'finance',
    name: {
      en: 'ROI Calculator',
      th: 'คำนวณ ROI',
      ja: 'ROI計算機',
      zh: 'ROI计算器',
      es: 'Calculadora de ROI'
    },
    description: {
      en: 'Calculate Return on Investment for business and marketing',
      th: 'คำนวณผลตอบแทนการลงทุนสำหรับธุรกิจและการตลาด',
      ja: 'ビジネスとマーケティングのROIを計算'
    },
    icon: '💹',
    keywords: {
      primary: 'roi calculator',
      secondary: ['return on investment', 'investment return', 'roi formula'],
      longtail: ['marketing roi calculator', 'business roi calculator percentage']
    },
    searchVolume: 74000,
    difficulty: 30,
    priority: 2,
    relatedCalculators: ['profit-margin-calculator', 'break-even-calculator'],
    externalLinks: ['https://www.investopedia.com/articles/personal-finance/053015/how-calculate-roi-marketing-campaign.asp']
  },
  {
    id: 'salary-calculator',
    slug: 'salary-calculator',
    category: 'finance',
    name: {
      en: 'Salary Calculator',
      th: 'คำนวณเงินเดือน',
      ja: '給与計算機',
      zh: '工资计算器',
      es: 'Calculadora de Salario'
    },
    description: {
      en: 'Convert between hourly, monthly, and annual salary',
      th: 'แปลงระหว่างค่าจ้างรายชั่วโมง รายเดือน และรายปี',
      ja: '時給、月給、年収を変換'
    },
    icon: '💵',
    keywords: {
      primary: 'salary calculator',
      secondary: ['hourly to salary', 'annual salary', 'paycheck calculator'],
      longtail: ['hourly to annual salary calculator', 'salary calculator after taxes']
    },
    searchVolume: 165000,
    difficulty: 35,
    priority: 1,
    relatedCalculators: ['tax-calculator', 'paycheck-calculator', 'hourly-wage-calculator'],
    externalLinks: ['https://www.bls.gov/']
  },

  // Additional High-Value Calculators
  {
    id: 'retirement-calculator',
    slug: 'retirement-calculator',
    category: 'finance',
    name: {
      en: 'Retirement Calculator',
      th: 'คำนวณเงินเกษียณ',
      ja: '退職金計算機',
      zh: '退休计算器',
      es: 'Calculadora de Jubilación'
    },
    description: {
      en: 'Calculate retirement savings needed and monthly contributions',
      th: 'คำนวณเงินออมที่ต้องการสำหรับเกษียณและเงินออมรายเดือน',
      ja: '必要な退職金と月々の拠出額を計算'
    },
    icon: '🏖️',
    keywords: {
      primary: 'retirement calculator',
      secondary: ['retirement savings', '401k calculator', 'retirement planning'],
      longtail: ['retirement savings calculator by age', 'how much do i need to retire calculator']
    },
    searchVolume: 110000,
    difficulty: 40,
    priority: 1,
    relatedCalculators: ['401k-calculator', 'compound-interest-calculator', 'investment-calculator'],
    externalLinks: ['https://www.ssa.gov/retirement']
  },
  {
    id: 'investment-calculator',
    slug: 'investment-calculator',
    category: 'finance',
    name: {
      en: 'Investment Calculator',
      th: 'คำนวณการลงทุน',
      ja: '投資計算機',
      zh: '投资计算器',
      es: 'Calculadora de Inversión'
    },
    description: {
      en: 'Calculate investment growth with compound returns',
      th: 'คำนวณการเติบโตของการลงทุนพร้อมผลตอบแทนทบต้น',
      ja: '複利リターンで投資成長を計算'
    },
    icon: '📊',
    keywords: {
      primary: 'investment calculator',
      secondary: ['investment return', 'stock calculator', 'portfolio calculator'],
      longtail: ['investment return calculator with inflation', 'stock investment calculator dividend']
    },
    searchVolume: 90500,
    difficulty: 35,
    priority: 1,
    relatedCalculators: ['compound-interest-calculator', 'roi-calculator', 'stock-return-calculator'],
    externalLinks: ['https://www.sec.gov/investor']
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    category: 'lifestyle',
    name: {
      en: 'Age Calculator',
      th: 'คำนวณอายุ',
      ja: '年齢計算機',
      zh: '年龄计算器',
      es: 'Calculadora de Edad'
    },
    description: {
      en: 'Calculate exact age in years, months, days, hours, and minutes',
      th: 'คำนวณอายุที่แน่นอนเป็นปี เดือน วัน ชั่วโมง และนาที',
      ja: '年、月、日、時間、分単位で正確な年齢を計算'
    },
    icon: '🎂',
    keywords: {
      primary: 'age calculator',
      secondary: ['birthday calculator', 'date calculator', 'age in days'],
      longtail: ['age calculator in months and days', 'exact age calculator with time']
    },
    searchVolume: 450000,
    difficulty: 20,
    priority: 2,
    relatedCalculators: ['date-calculator', 'birthday-calculator', 'zodiac-calculator'],
    externalLinks: ['https://en.wikipedia.org/wiki/Age']
  },
  {
    id: 'date-calculator',
    slug: 'date-calculator',
    category: 'lifestyle',
    name: {
      en: 'Date Calculator',
      th: 'คำนวณวันที่',
      ja: '日付計算機',
      zh: '日期计算器',
      es: 'Calculadora de Fechas'
    },
    description: {
      en: 'Calculate days between dates, add or subtract days from a date',
      th: 'คำนวณจำนวนวันระหว่างวันที่ บวกหรือลบวันจากวันที่',
      ja: '日付間の日数を計算、日付に日数を加算または減算'
    },
    icon: '📅',
    keywords: {
      primary: 'date calculator',
      secondary: ['days between dates', 'date difference', 'day calculator'],
      longtail: ['days between dates calculator', 'date calculator add days']
    },
    searchVolume: 301000,
    difficulty: 20,
    priority: 2,
    relatedCalculators: ['age-calculator', 'time-calculator', 'business-days-calculator'],
    externalLinks: ['https://www.timeanddate.com/']
  },
  {
    id: 'random-number-generator',
    slug: 'random-number-generator',
    category: 'math',
    name: {
      en: 'Random Number Generator',
      th: 'สุ่มตัวเลข',
      ja: '乱数生成器',
      zh: '随机数生成器',
      es: 'Generador de Números Aleatorios'
    },
    description: {
      en: 'Generate random numbers for lottery, games, and statistical sampling',
      th: 'สุ่มตัวเลขสำหรับลอตเตอรี่ เกม และการสุ่มตัวอย่างทางสถิติ',
      ja: '宝くじ、ゲーム、統計サンプリング用の乱数を生成'
    },
    icon: '🎲',
    keywords: {
      primary: 'random number generator',
      secondary: ['number generator', 'random picker', 'lottery number generator'],
      longtail: ['random number generator 1-100', 'lottery random number generator']
    },
    searchVolume: 368000,
    difficulty: 15,
    priority: 2,
    relatedCalculators: ['dice-roller', 'coin-flip', 'lottery-calculator'],
    externalLinks: ['https://www.random.org/']
  }
];

// Export supported locales
export const supportedLocales = [
  'en', 'es', 'pt', 'de', 'fr', 'ja', 'ko', 'zh', 
  'th', 'ar', 'hi', 'id', 'ru', 'it', 'nl', 'vi', 'fa'
] as const;

export type SupportedLocale = typeof supportedLocales[number];

// Helper function to get calculator by slug
export function getCalculatorBySlug(slug: string): CalculatorData | undefined {
  return calculatorsData.find(calc => calc.slug === slug);
}

// Helper function to get calculators by category
export function getCalculatorsByCategory(category: string): CalculatorData[] {
  return calculatorsData.filter(calc => calc.category === category);
}

// Helper function to get top calculators
export function getTopCalculators(limit: number = 30): CalculatorData[] {
  return calculatorsData
    .sort((a, b) => a.priority - b.priority || b.searchVolume - a.searchVolume)
    .slice(0, limit);
}

// Helper function to search calculators
export function searchCalculators(query: string, locale: SupportedLocale = 'en'): CalculatorData[] {
  const normalizedQuery = query.toLowerCase();
  return calculatorsData.filter(calc => {
    const name = calc.name[locale] || calc.name.en;
    const description = calc.description[locale] || calc.description.en;
    return (
      name.toLowerCase().includes(normalizedQuery) ||
      description.toLowerCase().includes(normalizedQuery) ||
      calc.keywords.primary.includes(normalizedQuery) ||
      calc.keywords.secondary.some(k => k.includes(normalizedQuery))
    );
  });
}