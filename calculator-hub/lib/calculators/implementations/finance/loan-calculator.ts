import { Calculator } from '@/lib/types/calculator';

export const loanCalculator: Calculator = {
  id: 'loan-calculator',
  category: 'finance',
  slug: 'loan-calculator',
  icon: '💰',
  color: 'bg-green-500',
  inputs: [
    {
      key: 'principal',
      label: 'Loan Amount',
      type: 'number',
      unit: 'currency',
      placeholder: 'Enter loan amount',
      min: 0,
      required: true,
      validation: [
        { type: 'min', value: 0, message: 'Loan amount must be positive' }
      ],
    },
    {
      key: 'interestRate',
      label: 'Annual Interest Rate',
      type: 'number',
      unit: '%',
      placeholder: 'Enter interest rate',
      min: 0,
      max: 100,
      step: 0.01,
      required: true,
    },
    {
      key: 'term',
      label: 'Loan Term',
      type: 'number',
      unit: 'years',
      placeholder: 'Enter loan term',
      min: 1,
      max: 50,
      required: true,
    },
    {
      key: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      defaultValue: 'monthly',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'biweekly', label: 'Bi-weekly' },
        { value: 'weekly', label: 'Weekly' },
      ],
    },
  ],
  outputs: [
    {
      key: 'payment',
      label: 'Payment Amount',
      format: 'currency',
      precision: 2,
      visualization: 'gauge',
    },
    {
      key: 'totalPayment',
      label: 'Total Payment',
      format: 'currency',
      precision: 2,
    },
    {
      key: 'totalInterest',
      label: 'Total Interest',
      format: 'currency',
      precision: 2,
      visualization: 'bar',
    },
    {
      key: 'payoffDate',
      label: 'Payoff Date',
      format: 'text',
    },
  ],
  formulas: [
    {
      name: 'monthlyPayment',
      expression: '(principal * (rate / 12)) / (1 - Math.pow(1 + (rate / 12), -months))',
      variables: ['principal', 'rate', 'months'],
      description: 'Standard loan payment formula',
    },
  ],
  relatedCalculators: ['mortgage-calculator', 'car-loan-calculator', 'refinance-calculator'],
  localizedContent: {
    en: {
      title: 'Loan Calculator - Calculate Your Monthly Payments',
      description: 'Calculate loan payments, total interest, and create an amortization schedule for any type of loan.',
      keywords: ['loan calculator', 'monthly payment', 'interest calculator', 'loan payment calculator'],
      faq: [
        {
          question: 'How is the monthly loan payment calculated?',
          answer: 'The monthly payment is calculated using the formula: P × (r(1+r)^n) / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is number of payments.',
        },
        {
          question: 'What factors affect my loan payment?',
          answer: 'Your loan payment is affected by the loan amount (principal), interest rate, loan term, and payment frequency.',
        },
        {
          question: 'How can I reduce my total interest paid?',
          answer: 'You can reduce total interest by making extra payments, choosing a shorter loan term, or refinancing to a lower interest rate.',
        },
        {
          question: 'What is an amortization schedule?',
          answer: 'An amortization schedule shows how each payment is split between principal and interest over the life of the loan.',
        },
        {
          question: 'Should I choose a longer or shorter loan term?',
          answer: 'Shorter terms have higher monthly payments but less total interest. Longer terms have lower payments but more total interest.',
        },
      ],
      article: {
        title: 'Complete Guide to Loan Calculations',
        introduction: 'Understanding how loans work is crucial for making informed financial decisions. This comprehensive guide will help you understand loan calculations, factors affecting your payments, and strategies to save money on interest.',
        sections: [
          {
            heading: 'Understanding Loan Basics',
            content: 'A loan is a sum of money borrowed that must be repaid with interest over time. The key components include the principal (amount borrowed), interest rate (cost of borrowing), and term (repayment period).',
          },
          {
            heading: 'How Loan Payments Are Calculated',
            content: 'Loan payments are calculated using a mathematical formula that considers the principal amount, interest rate, and loan term. The formula ensures that each payment covers both interest and principal reduction.',
            subSections: [
              {
                heading: 'The Amortization Formula',
                content: 'The standard formula divides your payment between interest (calculated on the remaining balance) and principal reduction. Early payments go mostly toward interest, while later payments reduce more principal.',
              },
              {
                heading: 'Payment Frequency Impact',
                content: 'Choosing bi-weekly or weekly payments instead of monthly can significantly reduce total interest paid and shorten your loan term.',
              },
            ],
          },
          {
            heading: 'Factors Affecting Your Loan',
            content: 'Several factors influence your loan terms and total cost, including your credit score, debt-to-income ratio, down payment amount, and current market interest rates.',
          },
          {
            heading: 'Strategies to Save Money',
            content: 'Consider making extra principal payments, refinancing when rates drop, or choosing a shorter term if you can afford higher payments. Even small extra payments can save thousands in interest.',
          },
        ],
        conclusion: 'Using a loan calculator helps you understand the true cost of borrowing and make informed decisions. Always compare multiple loan offers and consider the total cost, not just the monthly payment.',
        wordCount: 850,
      },
      examples: [
        {
          title: 'Car Loan Example',
          inputs: { principal: 25000, interestRate: 5.5, term: 5 },
          outputs: { payment: 477.53, totalPayment: 28651.80, totalInterest: 3651.80 },
          explanation: 'For a $25,000 car loan at 5.5% for 5 years, you would pay $477.53 monthly, totaling $3,651.80 in interest.',
        },
        {
          title: 'Personal Loan Example',
          inputs: { principal: 10000, interestRate: 8.5, term: 3 },
          outputs: { payment: 315.69, totalPayment: 11364.84, totalInterest: 1364.84 },
          explanation: 'A $10,000 personal loan at 8.5% for 3 years results in $315.69 monthly payments.',
        },
      ],
      references: [
        {
          title: 'Federal Reserve - Consumer Credit',
          url: 'https://www.federalreserve.gov/releases/g19/current/',
          publisher: 'Federal Reserve',
          dateAccessed: '2024-01-01',
          type: 'government',
        },
        {
          title: 'Consumer Financial Protection Bureau - Loans',
          url: 'https://www.consumerfinance.gov/consumer-tools/loans/',
          publisher: 'CFPB',
          dateAccessed: '2024-01-01',
          type: 'government',
        },
      ],
    },
    th: {
      title: 'เครื่องคำนวณสินเชื่อ - คำนวณค่างวดรายเดือน',
      description: 'คำนวณค่างวดสินเชื่อ ดอกเบี้ยรวม และตารางการผ่อนชำระสำหรับสินเชื่อทุกประเภท',
      keywords: ['คำนวณสินเชื่อ', 'ค่างวดรายเดือน', 'คำนวณดอกเบี้ย', 'เครื่องคิดเงินกู้'],
      faq: [
        {
          question: 'ค่างวดรายเดือนคำนวณอย่างไร?',
          answer: 'ค่างวดคำนวณจากสูตร: เงินต้น × (อัตราดอกเบี้ย(1+อัตราดอกเบี้ย)^งวด) / ((1+อัตราดอกเบี้ย)^งวด - 1)',
        },
        {
          question: 'อะไรบ้างที่มีผลต่อค่างวด?',
          answer: 'ค่างวดขึ้นอยู่กับวงเงินกู้ อัตราดอกเบี้ย ระยะเวลาผ่อน และความถี่การชำระ',
        },
        {
          question: 'ลดดอกเบี้ยได้อย่างไร?',
          answer: 'ชำระเงินต้นเพิ่ม เลือกระยะเวลาสั้นลง หรือรีไฟแนนซ์เมื่อดอกเบี้ยลดลง',
        },
        {
          question: 'ตารางการผ่อนชำระคืออะไร?',
          answer: 'แสดงว่าแต่ละงวดแบ่งเป็นเงินต้นและดอกเบี้ยเท่าไรตลอดอายุสินเชื่อ',
        },
        {
          question: 'เลือกผ่อนนานหรือสั้นดี?',
          answer: 'ผ่อนสั้นค่างวดสูงแต่ดอกเบี้ยน้อย ผ่อนนานค่างวดต่ำแต่ดอกเบี้ยมาก',
        },
      ],
      article: {
        title: 'คู่มือครบวงจรการคำนวณสินเชื่อ',
        introduction: 'การเข้าใจระบบสินเชื่อเป็นสิ่งสำคัญสำหรับการตัดสินใจทางการเงิน คู่มือนี้จะช่วยให้คุณเข้าใจการคำนวณสินเชื่อ ปัจจัยที่มีผลต่อค่างวด และวิธีประหยัดดอกเบี้ย',
        sections: [
          {
            heading: 'พื้นฐานสินเชื่อ',
            content: 'สินเชื่อคือเงินที่กู้ยืมและต้องชำระคืนพร้อมดอกเบี้ย องค์ประกอบหลักได้แก่ เงินต้น (วงเงินกู้) อัตราดอกเบี้ย (ค่าใช้จ่ายในการกู้) และระยะเวลา (ระยะเวลาชำระคืน)',
          },
          {
            heading: 'วิธีคำนวณค่างวด',
            content: 'ค่างวดคำนวณจากสูตรคณิตศาสตร์ที่พิจารณาเงินต้น อัตราดอกเบี้ย และระยะเวลากู้ สูตรนี้ทำให้แต่ละงวดครอบคลุมทั้งดอกเบี้ยและการลดเงินต้น',
          },
        ],
        conclusion: 'การใช้เครื่องคำนวณสินเชื่อช่วยให้เข้าใจต้นทุนที่แท้จริงของการกู้ยืม เปรียบเทียบข้อเสนอหลายๆ แห่งและพิจารณาต้นทุนรวม ไม่ใช่แค่ค่างวดรายเดือน',
        wordCount: 750,
      },
      examples: [
        {
          title: 'ตัวอย่างสินเชื่อรถยนต์',
          inputs: { principal: 800000, interestRate: 3.5, term: 5 },
          outputs: { payment: 14545, totalPayment: 872700, totalInterest: 72700 },
          explanation: 'สินเชื่อรถยนต์ 800,000 บาท ดอกเบี้ย 3.5% ผ่อน 5 ปี ค่างวด 14,545 บาท/เดือน ดอกเบี้ยรวม 72,700 บาท',
        },
      ],
      references: [
        {
          title: 'ธนาคารแห่งประเทศไทย - สินเชื่อผู้บริโภค',
          url: 'https://www.bot.or.th',
          publisher: 'ธปท.',
          dateAccessed: '2024-01-01',
          type: 'government',
        },
      ],
    },
    // Add more languages...
  },
  countrySpecific: {
    en: {
      currency: 'USD',
      defaultValues: { interestRate: 7.5 },
    },
    th: {
      currency: 'THB',
      defaultValues: { interestRate: 6.5 },
    },
    // Add more countries...
  },
  tags: ['loan', 'finance', 'payment', 'interest', 'amortization'],
  difficulty: 'basic',
  popularity: 95,
};