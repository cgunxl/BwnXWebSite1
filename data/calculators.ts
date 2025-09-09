import { Calculator, Category } from '@/types/calculator';

export const categories: Category[] = [
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial calculators for loans, investments, taxes, and more',
    icon: '💳',
    emoji: '💰',
    calculators: [
      'loan-calculator', 'mortgage-calculator', 'car-loan-calculator', 'credit-card-interest-calculator',
      'compound-interest-calculator', 'savings-goal-calculator', 'retirement-calculator', '401k-calculator',
      'roth-ira-calculator', 'tax-calculator', 'vat-calculator', 'property-tax-calculator',
      'inflation-calculator', 'roi-calculator', 'stock-return-calculator', 'dividend-calculator',
      'sip-calculator', 'mutual-fund-calculator', 'currency-converter', 'crypto-profit-calculator',
      'bitcoin-mining-calculator', 'ethereum-gas-fee-calculator', 'nft-profit-calculator', 'paycheck-calculator',
      'salary-calculator', 'hourly-wage-calculator', 'overtime-pay-calculator', 'freelancer-rate-calculator',
      'business-loan-calculator', 'refinance-calculator', 'debt-payoff-calculator', 'amortization-calculator',
      'lease-calculator', 'break-even-calculator', 'profit-margin-calculator', 'markup-calculator',
      'discount-calculator', 'sales-tax-calculator', 'tipping-calculator', 'currency-arbitrage-calculator'
    ],
    localizedName: {
      en: 'Finance',
      th: 'การเงิน',
      es: 'Finanzas',
      pt: 'Finanças',
      de: 'Finanzen',
      fr: 'Finance',
      ja: '金融',
      ko: '금융',
      zh: '金融',
      ar: 'المالية',
      hi: 'वित्त',
      id: 'Keuangan',
      ru: 'Финансы',
      it: 'Finanza',
      nl: 'Financiën',
      vi: 'Tài chính',
      fa: 'مالی'
    },
    localizedDescription: {
      en: 'Financial calculators for loans, investments, taxes, and more',
      th: 'เครื่องคิดเลขทางการเงินสำหรับเงินกู้ การลงทุน ภาษี และอื่นๆ',
      es: 'Calculadoras financieras para préstamos, inversiones, impuestos y más',
      pt: 'Calculadoras financeiras para empréstimos, investimentos, impostos e mais',
      de: 'Finanzrechner für Kredite, Investitionen, Steuern und mehr',
      fr: 'Calculateurs financiers pour prêts, investissements, taxes et plus',
      ja: 'ローン、投資、税金などの金融計算機',
      ko: '대출, 투자, 세금 등을 위한 금융 계산기',
      zh: '贷款、投资、税收等金融计算器',
      ar: 'حاسبات مالية للقروض والاستثمارات والضرائب والمزيد',
      hi: 'ऋण, निवेश, कर और अधिक के लिए वित्तीय कैलकुलेटर',
      id: 'Kalkulator keuangan untuk pinjaman, investasi, pajak, dan lainnya',
      ru: 'Финансовые калькуляторы для кредитов, инвестиций, налогов и многого другого',
      it: 'Calcolatori finanziari per prestiti, investimenti, tasse e altro',
      nl: 'Financiële rekenmachines voor leningen, investeringen, belastingen en meer',
      vi: 'Máy tính tài chính cho vay, đầu tư, thuế và hơn thế nữa',
      fa: 'ماشین حساب های مالی برای وام، سرمایه گذاری، مالیات و بیشتر'
    }
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Health and fitness calculators for BMI, calories, nutrition, and more',
    icon: '❤️',
    emoji: '🏥',
    calculators: [
      'bmi-calculator', 'bmr-calculator', 'calorie-calculator', 'macro-calculator',
      'protein-intake-calculator', 'water-intake-calculator', 'ideal-weight-calculator', 'body-fat-calculator',
      'tdee-calculator', 'running-pace-calculator', 'marathon-time-calculator', 'vo2-max-calculator',
      'heart-rate-calculator', 'target-heart-rate-calculator', 'pregnancy-due-date-calculator', 'ovulation-calculator',
      'conception-calculator', 'pregnancy-weight-gain-calculator', 'bac-calculator', 'cholesterol-ratio-calculator',
      'insulin-dose-calculator', 'ivf-success-calculator', 'sleep-calculator', 'stress-level-calculator'
    ],
    localizedName: {
      en: 'Health',
      th: 'สุขภาพ',
      es: 'Salud',
      pt: 'Saúde',
      de: 'Gesundheit',
      fr: 'Santé',
      ja: '健康',
      ko: '건강',
      zh: '健康',
      ar: 'الصحة',
      hi: 'स्वास्थ्य',
      id: 'Kesehatan',
      ru: 'Здоровье',
      it: 'Salute',
      nl: 'Gezondheid',
      vi: 'Sức khỏe',
      fa: 'سلامت'
    },
    localizedDescription: {
      en: 'Health and fitness calculators for BMI, calories, nutrition, and more',
      th: 'เครื่องคิดเลขสุขภาพและฟิตเนสสำหรับ BMI แคลอรี่ โภชนาการ และอื่นๆ',
      es: 'Calculadoras de salud y fitness para IMC, calorías, nutrición y más',
      pt: 'Calculadoras de saúde e fitness para IMC, calorias, nutrição e mais',
      de: 'Gesundheits- und Fitness-Rechner für BMI, Kalorien, Ernährung und mehr',
      fr: 'Calculateurs de santé et fitness pour IMC, calories, nutrition et plus',
      ja: 'BMI、カロリー、栄養などの健康・フィットネス計算機',
      ko: 'BMI, 칼로리, 영양 등을 위한 건강 및 피트니스 계산기',
      zh: 'BMI、卡路里、营养等健康健身计算器',
      ar: 'حاسبات الصحة واللياقة البدنية لمؤشر كتلة الجسم والسعرات الحرارية والتغذية والمزيد',
      hi: 'BMI, कैलोरी, पोषण और अधिक के लिए स्वास्थ्य और फिटनेस कैलकुलेटर',
      id: 'Kalkulator kesehatan dan kebugaran untuk BMI, kalori, nutrisi, dan lainnya',
      ru: 'Калькуляторы здоровья и фитнеса для ИМТ, калорий, питания и многого другого',
      it: 'Calcolatori di salute e fitness per BMI, calorie, nutrizione e altro',
      nl: 'Gezondheids- en fitnessrekenmachines voor BMI, calorieën, voeding en meer',
      vi: 'Máy tính sức khỏe và thể dục cho BMI, calo, dinh dưỡng và hơn thế nữa',
      fa: 'ماشین حساب های سلامت و تناسب اندام برای BMI، کالری، تغذیه و بیشتر'
    }
  }
  // Add more categories as needed
];

export const calculators: Calculator[] = [
  // Finance Calculators
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly loan payments with interest and amortization schedule',
    category: 'finance',
    keywords: ['loan', 'payment', 'interest', 'amortization', 'monthly payment'],
    formula: 'M = P[r(1+r)^n]/[(1+r)^n-1]',
    inputs: [
      {
        id: 'amount',
        label: 'Loan Amount',
        type: 'number',
        placeholder: 'Enter loan amount',
        min: 0,
        required: true,
        unit: '$',
        localizedLabel: {
          en: 'Loan Amount',
          th: 'จำนวนเงินกู้',
          es: 'Monto del Préstamo',
          pt: 'Valor do Empréstimo',
          de: 'Darlehenssumme',
          fr: 'Montant du Prêt',
          ja: 'ローン金額',
          ko: '대출 금액',
          zh: '贷款金额',
          ar: 'مبلغ القرض',
          hi: 'ऋण राशि',
          id: 'Jumlah Pinjaman',
          ru: 'Сумма кредита',
          it: 'Importo del Prestito',
          nl: 'Leningbedrag',
          vi: 'Số tiền vay',
          fa: 'مبلغ وام'
        }
      },
      {
        id: 'rate',
        label: 'Interest Rate',
        type: 'number',
        placeholder: 'Enter interest rate',
        min: 0,
        max: 100,
        step: 0.01,
        required: true,
        unit: '%',
        localizedLabel: {
          en: 'Interest Rate',
          th: 'อัตราดอกเบี้ย',
          es: 'Tasa de Interés',
          pt: 'Taxa de Juros',
          de: 'Zinssatz',
          fr: 'Taux d\'Intérêt',
          ja: '金利',
          ko: '이자율',
          zh: '利率',
          ar: 'معدل الفائدة',
          hi: 'ब्याज दर',
          id: 'Suku Bunga',
          ru: 'Процентная ставка',
          it: 'Tasso di Interesse',
          nl: 'Rente',
          vi: 'Lãi suất',
          fa: 'نرخ بهره'
        }
      },
      {
        id: 'term',
        label: 'Loan Term',
        type: 'number',
        placeholder: 'Enter loan term',
        min: 1,
        max: 50,
        required: true,
        unit: 'years',
        localizedLabel: {
          en: 'Loan Term',
          th: 'ระยะเวลากู้',
          es: 'Plazo del Préstamo',
          pt: 'Prazo do Empréstimo',
          de: 'Laufzeit',
          fr: 'Durée du Prêt',
          ja: 'ローン期間',
          ko: '대출 기간',
          zh: '贷款期限',
          ar: 'مدة القرض',
          hi: 'ऋण अवधि',
          id: 'Jangka Waktu Pinjaman',
          ru: 'Срок кредита',
          it: 'Durata del Prestito',
          nl: 'Leningtermijn',
          vi: 'Thời hạn vay',
          fa: 'مدت وام'
        }
      }
    ],
    outputs: [
      {
        id: 'monthlyPayment',
        label: 'Monthly Payment',
        type: 'number',
        format: 'currency',
        unit: '$',
        localizedLabel: {
          en: 'Monthly Payment',
          th: 'ค่างวดรายเดือน',
          es: 'Pago Mensual',
          pt: 'Pagamento Mensal',
          de: 'Monatliche Zahlung',
          fr: 'Paiement Mensuel',
          ja: '月々の支払い',
          ko: '월 납입금',
          zh: '月付款',
          ar: 'الدفعة الشهرية',
          hi: 'मासिक भुगतान',
          id: 'Pembayaran Bulanan',
          ru: 'Ежемесячный платеж',
          it: 'Pagamento Mensile',
          nl: 'Maandelijkse Betaling',
          vi: 'Thanh toán hàng tháng',
          fa: 'پرداخت ماهانه'
        }
      },
      {
        id: 'totalInterest',
        label: 'Total Interest',
        type: 'number',
        format: 'currency',
        unit: '$',
        localizedLabel: {
          en: 'Total Interest',
          th: 'ดอกเบี้ยรวม',
          es: 'Interés Total',
          pt: 'Juros Totais',
          de: 'Gesamtzinsen',
          fr: 'Intérêts Totaux',
          ja: '総利息',
          ko: '총 이자',
          zh: '总利息',
          ar: 'إجمالي الفائدة',
          hi: 'कुल ब्याज',
          id: 'Total Bunga',
          ru: 'Общие проценты',
          it: 'Interessi Totali',
          nl: 'Totale Rente',
          vi: 'Tổng lãi suất',
          fa: 'کل بهره'
        }
      },
      {
        id: 'totalPayment',
        label: 'Total Payment',
        type: 'number',
        format: 'currency',
        unit: '$',
        localizedLabel: {
          en: 'Total Payment',
          th: 'ยอดชำระรวม',
          es: 'Pago Total',
          pt: 'Pagamento Total',
          de: 'Gesamtzahlung',
          fr: 'Paiement Total',
          ja: '総支払い',
          ko: '총 납입금',
          zh: '总付款',
          ar: 'إجمالي الدفع',
          hi: 'कुल भुगतान',
          id: 'Total Pembayaran',
          ru: 'Общий платеж',
          it: 'Pagamento Totale',
          nl: 'Totale Betaling',
          vi: 'Tổng thanh toán',
          fa: 'کل پرداخت'
        }
      }
    ],
    faq: [
      {
        question: 'How does the loan calculator work?',
        answer: 'The loan calculator uses the standard amortization formula to calculate your monthly payment based on the loan amount, interest rate, and term.',
        localizedQuestion: {
          en: 'How does the loan calculator work?',
          th: 'เครื่องคิดเลขเงินกู้ทำงานอย่างไร?',
          es: '¿Cómo funciona la calculadora de préstamos?',
          pt: 'Como funciona a calculadora de empréstimos?',
          de: 'Wie funktioniert der Kreditrechner?',
          fr: 'Comment fonctionne le calculateur de prêt?',
          ja: 'ローン計算機はどのように動作しますか？',
          ko: '대출 계산기는 어떻게 작동하나요?',
          zh: '贷款计算器如何工作？',
          ar: 'كيف تعمل حاسبة القروض؟',
          hi: 'ऋण कैलकुलेटर कैसे काम करता है?',
          id: 'Bagaimana cara kerja kalkulator pinjaman?',
          ru: 'Как работает калькулятор кредитов?',
          it: 'Come funziona il calcolatore di prestiti?',
          nl: 'Hoe werkt de leningcalculator?',
          vi: 'Máy tính vay hoạt động như thế nào?',
          fa: 'ماشین حساب وام چگونه کار می کند؟'
        },
        localizedAnswer: {
          en: 'The loan calculator uses the standard amortization formula to calculate your monthly payment based on the loan amount, interest rate, and term.',
          th: 'เครื่องคิดเลขเงินกู้ใช้สูตรการผ่อนชำระมาตรฐานเพื่อคำนวณค่างวดรายเดือนตามจำนวนเงินกู้ อัตราดอกเบี้ย และระยะเวลา',
          es: 'La calculadora de préstamos utiliza la fórmula de amortización estándar para calcular su pago mensual basado en el monto del préstamo, la tasa de interés y el plazo.',
          pt: 'A calculadora de empréstimos usa a fórmula de amortização padrão para calcular seu pagamento mensal baseado no valor do empréstimo, taxa de juros e prazo.',
          de: 'Der Kreditrechner verwendet die Standard-Amortisationsformel, um Ihre monatliche Zahlung basierend auf dem Darlehensbetrag, dem Zinssatz und der Laufzeit zu berechnen.',
          fr: 'Le calculateur de prêt utilise la formule d\'amortissement standard pour calculer votre paiement mensuel basé sur le montant du prêt, le taux d\'intérêt et la durée.',
          ja: 'ローン計算機は、ローン金額、金利、期間に基づいて月々の支払いを計算するために標準的な償却式を使用します。',
          ko: '대출 계산기는 대출 금액, 이자율, 기간을 기반으로 월 납입금을 계산하기 위해 표준 상환 공식을 사용합니다.',
          zh: '贷款计算器使用标准摊销公式，根据贷款金额、利率和期限计算您的月付款。',
          ar: 'تستخدم حاسبة القروض صيغة الإطفاء القياسية لحساب دفعتك الشهرية بناءً على مبلغ القرض ومعدل الفائدة والمدة.',
          hi: 'ऋण कैलकुलेटर ऋण राशि, ब्याज दर और अवधि के आधार पर आपके मासिक भुगतान की गणना करने के लिए मानक परिशोधन सूत्र का उपयोग करता है।',
          id: 'Kalkulator pinjaman menggunakan rumus amortisasi standar untuk menghitung pembayaran bulanan Anda berdasarkan jumlah pinjaman, suku bunga, dan jangka waktu.',
          ru: 'Калькулятор кредитов использует стандартную формулу амортизации для расчета вашего ежемесячного платежа на основе суммы кредита, процентной ставки и срока.',
          it: 'Il calcolatore di prestiti utilizza la formula di ammortamento standard per calcolare il pagamento mensile basato sull\'importo del prestito, tasso di interesse e durata.',
          nl: 'De leningcalculator gebruikt de standaard aflossingsformule om uw maandelijkse betaling te berekenen op basis van het leningbedrag, rente en looptijd.',
          vi: 'Máy tính vay sử dụng công thức khấu hao tiêu chuẩn để tính toán khoản thanh toán hàng tháng dựa trên số tiền vay, lãi suất và thời hạn.',
          fa: 'ماشین حساب وام از فرمول استاندارد استهلاک برای محاسبه پرداخت ماهانه شما بر اساس مبلغ وام، نرخ بهره و مدت استفاده می کند.'
        }
      }
    ],
    howToUse: 'Enter the loan amount, interest rate, and term to calculate your monthly payment, total interest, and total payment amount.',
    references: [
      {
        title: 'Amortization Formula - Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Amortization_calculator',
        type: 'wikipedia'
      },
      {
        title: 'Loan Calculator - Investopedia',
        url: 'https://www.investopedia.com/loan-calculator-5083159',
        type: 'financial'
      }
    ],
    relatedCalculators: ['mortgage-calculator', 'car-loan-calculator', 'refinance-calculator'],
    icon: '💳',
    emoji: '💰',
    localizedContent: {
      en: {
        name: 'Loan Calculator',
        description: 'Calculate monthly loan payments with interest and amortization schedule',
        howToUse: 'Enter the loan amount, interest rate, and term to calculate your monthly payment, total interest, and total payment amount.',
        faq: []
      },
      th: {
        name: 'เครื่องคิดเลขเงินกู้',
        description: 'คำนวณค่างวดเงินกู้รายเดือนพร้อมดอกเบี้ยและตารางการผ่อนชำระ',
        howToUse: 'กรอกจำนวนเงินกู้ อัตราดอกเบี้ย และระยะเวลาเพื่อคำนวณค่างวดรายเดือน ดอกเบี้ยรวม และยอดชำระรวม',
        faq: []
      }
    }
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to assess your weight status',
    category: 'health',
    keywords: ['bmi', 'body mass index', 'weight', 'height', 'health'],
    formula: 'BMI = weight(kg) / height(m)²',
    inputs: [
      {
        id: 'weight',
        label: 'Weight',
        type: 'number',
        placeholder: 'Enter your weight',
        min: 0,
        max: 500,
        step: 0.1,
        required: true,
        unit: 'kg',
        localizedLabel: {
          en: 'Weight',
          th: 'น้ำหนัก',
          es: 'Peso',
          pt: 'Peso',
          de: 'Gewicht',
          fr: 'Poids',
          ja: '体重',
          ko: '체중',
          zh: '体重',
          ar: 'الوزن',
          hi: 'वजन',
          id: 'Berat Badan',
          ru: 'Вес',
          it: 'Peso',
          nl: 'Gewicht',
          vi: 'Cân nặng',
          fa: 'وزن'
        }
      },
      {
        id: 'height',
        label: 'Height',
        type: 'number',
        placeholder: 'Enter your height',
        min: 0,
        max: 300,
        step: 0.1,
        required: true,
        unit: 'cm',
        localizedLabel: {
          en: 'Height',
          th: 'ส่วนสูง',
          es: 'Altura',
          pt: 'Altura',
          de: 'Größe',
          fr: 'Taille',
          ja: '身長',
          ko: '키',
          zh: '身高',
          ar: 'الطول',
          hi: 'ऊंचाई',
          id: 'Tinggi Badan',
          ru: 'Рост',
          it: 'Altezza',
          nl: 'Lengte',
          vi: 'Chiều cao',
          fa: 'قد'
        }
      }
    ],
    outputs: [
      {
        id: 'bmi',
        label: 'BMI',
        type: 'number',
        format: 'decimal',
        localizedLabel: {
          en: 'BMI',
          th: 'ดัชนีมวลกาย',
          es: 'IMC',
          pt: 'IMC',
          de: 'BMI',
          fr: 'IMC',
          ja: 'BMI',
          ko: 'BMI',
          zh: 'BMI',
          ar: 'مؤشر كتلة الجسم',
          hi: 'बीएमआई',
          id: 'BMI',
          ru: 'ИМТ',
          it: 'BMI',
          nl: 'BMI',
          vi: 'BMI',
          fa: 'شاخص توده بدنی'
        }
      },
      {
        id: 'category',
        label: 'Category',
        type: 'text',
        localizedLabel: {
          en: 'Category',
          th: 'หมวดหมู่',
          es: 'Categoría',
          pt: 'Categoria',
          de: 'Kategorie',
          fr: 'Catégorie',
          ja: 'カテゴリ',
          ko: '카테고리',
          zh: '类别',
          ar: 'الفئة',
          hi: 'श्रेणी',
          id: 'Kategori',
          ru: 'Категория',
          it: 'Categoria',
          nl: 'Categorie',
          vi: 'Phân loại',
          fa: 'دسته بندی'
        }
      }
    ],
    faq: [
      {
        question: 'What is BMI and how is it calculated?',
        answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It is calculated by dividing weight in kilograms by height in meters squared.',
        localizedQuestion: {
          en: 'What is BMI and how is it calculated?',
          th: 'BMI คืออะไรและคำนวณอย่างไร?',
          es: '¿Qué es el IMC y cómo se calcula?',
          pt: 'O que é IMC e como é calculado?',
          de: 'Was ist BMI und wie wird es berechnet?',
          fr: 'Qu\'est-ce que l\'IMC et comment est-il calculé?',
          ja: 'BMIとは何か、どのように計算されますか？',
          ko: 'BMI란 무엇이며 어떻게 계산되나요?',
          zh: '什么是BMI以及如何计算？',
          ar: 'ما هو مؤشر كتلة الجسم وكيف يتم حسابه؟',
          hi: 'BMI क्या है और इसकी गणना कैसे की जाती है?',
          id: 'Apa itu BMI dan bagaimana cara menghitungnya?',
          ru: 'Что такое ИМТ и как он рассчитывается?',
          it: 'Cos\'è il BMI e come viene calcolato?',
          nl: 'Wat is BMI en hoe wordt het berekend?',
          vi: 'BMI là gì và được tính như thế nào?',
          fa: 'BMI چیست و چگونه محاسبه می شود؟'
        },
        localizedAnswer: {
          en: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It is calculated by dividing weight in kilograms by height in meters squared.',
          th: 'BMI (ดัชนีมวลกาย) เป็นการวัดไขมันในร่างกายตามส่วนสูงและน้ำหนัก คำนวณโดยการหารน้ำหนักเป็นกิโลกรัมด้วยส่วนสูงเป็นเมตรยกกำลังสอง',
          es: 'El IMC (Índice de Masa Corporal) es una medida de grasa corporal basada en la altura y el peso. Se calcula dividiendo el peso en kilogramos por la altura en metros al cuadrado.',
          pt: 'O IMC (Índice de Massa Corporal) é uma medida de gordura corporal baseada na altura e peso. É calculado dividindo o peso em quilogramas pela altura em metros ao quadrado.',
          de: 'BMI (Body Mass Index) ist ein Maß für Körperfett basierend auf Größe und Gewicht. Es wird berechnet, indem das Gewicht in Kilogramm durch die Größe in Metern zum Quadrat geteilt wird.',
          fr: 'L\'IMC (Indice de Masse Corporelle) est une mesure de graisse corporelle basée sur la taille et le poids. Il est calculé en divisant le poids en kilogrammes par la taille en mètres au carré.',
          ja: 'BMI（ボディマス指数）は、身長と体重に基づいた体脂肪の測定値です。体重（キログラム）を身長（メートル）の二乗で割って計算されます。',
          ko: 'BMI(체질량지수)는 키와 체중을 기반으로 한 체지방 측정값입니다. 체중(킬로그램)을 키(미터)의 제곱으로 나누어 계산됩니다.',
          zh: 'BMI（身体质量指数）是基于身高和体重的体脂测量值。通过体重（公斤）除以身高（米）的平方来计算。',
          ar: 'مؤشر كتلة الجسم (BMI) هو مقياس للدهون في الجسم يعتمد على الطول والوزن. يتم حسابه بقسمة الوزن بالكيلوجرام على الطول بالمتر المربع.',
          hi: 'BMI (बॉडी मास इंडेक्स) ऊंचाई और वजन के आधार पर शरीर की चर्बी का माप है। इसे किलोग्राम में वजन को मीटर में ऊंचाई के वर्ग से विभाजित करके गणना की जाती है।',
          id: 'BMI (Indeks Massa Tubuh) adalah ukuran lemak tubuh berdasarkan tinggi dan berat badan. Dihitung dengan membagi berat badan dalam kilogram dengan tinggi badan dalam meter kuadrat.',
          ru: 'ИМТ (Индекс массы тела) - это мера жира в организме, основанная на росте и весе. Он рассчитывается путем деления веса в килограммах на рост в метрах в квадрате.',
          it: 'Il BMI (Indice di Massa Corporea) è una misura del grasso corporeo basata su altezza e peso. Viene calcolato dividendo il peso in chilogrammi per l\'altezza in metri al quadrato.',
          nl: 'BMI (Body Mass Index) is een maat voor lichaamsvet gebaseerd op lengte en gewicht. Het wordt berekend door het gewicht in kilogram te delen door de lengte in meters in het kwadraat.',
          vi: 'BMI (Chỉ số khối cơ thể) là thước đo chất béo trong cơ thể dựa trên chiều cao và cân nặng. Nó được tính bằng cách chia cân nặng tính bằng kg cho chiều cao tính bằng mét bình phương.',
          fa: 'BMI (شاخص توده بدنی) معیاری برای چربی بدن بر اساس قد و وزن است. با تقسیم وزن بر حسب کیلوگرم بر قد بر حسب متر مربع محاسبه می شود.'
        }
      }
    ],
    howToUse: 'Enter your weight in kilograms and height in centimeters to calculate your BMI and determine your weight category.',
    references: [
      {
        title: 'Body Mass Index - Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Body_mass_index',
        type: 'wikipedia'
      },
      {
        title: 'BMI Calculator - CDC',
        url: 'https://www.cdc.gov/healthyweight/assessing/bmi/index.html',
        type: 'government'
      }
    ],
    relatedCalculators: ['bmr-calculator', 'calorie-calculator', 'ideal-weight-calculator'],
    icon: '❤️',
    emoji: '🏥',
    localizedContent: {
      en: {
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index to assess your weight status',
        howToUse: 'Enter your weight in kilograms and height in centimeters to calculate your BMI and determine your weight category.',
        faq: []
      },
      th: {
        name: 'เครื่องคิดเลขดัชนีมวลกาย',
        description: 'คำนวณดัชนีมวลกายเพื่อประเมินสถานะน้ำหนักของคุณ',
        howToUse: 'กรอกน้ำหนักเป็นกิโลกรัมและส่วนสูงเป็นเซนติเมตรเพื่อคำนวณ BMI และกำหนดหมวดหมู่น้ำหนักของคุณ',
        faq: []
      }
    }
  }
  // Add more calculators as needed
];

export const getCalculatorById = (id: string): Calculator | undefined => {
  return calculators.find(calc => calc.id === id);
};

export const getCalculatorsByCategory = (category: string): Calculator[] => {
  return calculators.filter(calc => calc.category === category);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getAllCategories = (): Category[] => {
  return categories;
};