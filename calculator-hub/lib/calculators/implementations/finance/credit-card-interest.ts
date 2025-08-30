// Credit Card Interest Calculator Implementation
import { Calculator } from '@/lib/types/calculator';

export const creditCardInterestCalculator: Calculator = {
  id: 'credit-card-interest',
  category: 'finance',
  slug: 'credit-card-interest',
  icon: '💳',
  color: 'bg-red-500',
  inputs: [
    {
      key: 'balance',
      label: 'Current Balance',
      type: 'number',
      unit: 'currency',
      validation: { min: 0, required: true },
      defaultValue: 5000,
    },
    {
      key: 'apr',
      label: 'Annual Percentage Rate (APR)',
      type: 'number',
      unit: '%',
      validation: { min: 0, max: 50, required: true },
      defaultValue: 18.99,
    },
    {
      key: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'number',
      unit: 'currency',
      validation: { min: 0, required: true },
      defaultValue: 200,
    },
    {
      key: 'paymentType',
      label: 'Payment Type',
      type: 'radio',
      options: [
        { value: 'fixed', label: 'Fixed Payment' },
        { value: 'minimum', label: 'Minimum Payment (2%)' },
        { value: 'percentage', label: 'Percentage of Balance' },
      ],
      defaultValue: 'fixed',
    },
    {
      key: 'percentagePayment',
      label: 'Payment Percentage',
      type: 'number',
      unit: '%',
      validation: { min: 1, max: 100 },
      defaultValue: 5,
      showWhen: { paymentType: 'percentage' },
    },
  ],
  outputs: [
    {
      key: 'monthsToPayoff',
      label: 'Months to Pay Off',
      format: 'number',
      primary: true,
    },
    {
      key: 'totalInterest',
      label: 'Total Interest Paid',
      format: 'currency',
    },
    {
      key: 'totalPayment',
      label: 'Total Amount Paid',
      format: 'currency',
    },
    {
      key: 'monthlyInterest',
      label: 'First Month Interest',
      format: 'currency',
    },
    {
      key: 'dailyInterestRate',
      label: 'Daily Interest Rate',
      format: 'percentage',
      decimals: 4,
    },
  ],
  formulas: [
    {
      name: 'creditCardPayoff',
      expression: 'calculateCreditCardPayoff(balance, apr, payment)',
      variables: ['balance', 'apr', 'payment'],
    },
  ],
  graph: {
    type: 'bar',
    dataKey: 'payoffComparison',
    categories: ['Current Plan', 'Pay $50 More', 'Pay $100 More', 'Double Payment'],
  },
  relatedCalculators: [
    'debt-payoff',
    'loan-calculator',
    'compound-interest',
    'personal-loan',
  ],
  localizedContent: {
    en: {
      title: 'Credit Card Interest Calculator - Payoff Calculator',
      description: 'Calculate how long it will take to pay off your credit card debt and how much interest you will pay.',
      keywords: ['credit card', 'interest calculator', 'debt payoff', 'APR', 'minimum payment'],
      faq: [
        {
          question: 'How is credit card interest calculated?',
          answer: 'Credit card interest is calculated daily using your APR divided by 365, then multiplied by your daily balance. This compounds monthly.',
        },
        {
          question: 'What is APR?',
          answer: 'APR (Annual Percentage Rate) is the yearly interest rate charged on your credit card balance. Most cards have APRs between 15-25%.',
        },
        {
          question: 'Why does paying only minimum take so long?',
          answer: 'Minimum payments (usually 2% of balance) barely cover interest charges, so very little goes toward principal, extending payoff time significantly.',
        },
        {
          question: 'How can I pay off my card faster?',
          answer: 'Pay more than the minimum, make bi-weekly payments, use balance transfer cards with 0% APR, or consider debt consolidation loans.',
        },
        {
          question: 'What is a good credit card APR?',
          answer: 'Good APRs are below 15%, average is 16-20%, and anything above 24% is considered high. Your rate depends on your credit score.',
        },
      ],
      article: {
        title: 'Understanding Credit Card Interest and Payoff Strategies',
        introduction: 'Credit card debt can be expensive due to high interest rates. Understanding how interest works and using smart payoff strategies can save you thousands.',
        sections: [
          {
            heading: 'How Credit Card Interest Works',
            content: 'Credit cards charge interest daily on your outstanding balance. The APR is divided by 365 to get the daily rate, which compounds over time.',
          },
          {
            heading: 'The Minimum Payment Trap',
            content: 'Paying only the minimum (typically 2% of balance) can take decades to pay off debt and cost thousands in interest. Always pay more when possible.',
          },
          {
            heading: 'Payoff Strategies',
            content: 'Avalanche method: Pay highest APR first. Snowball method: Pay smallest balance first. Balance transfers: Move to 0% APR card. Consolidation: Get a lower-rate loan.',
          },
          {
            heading: 'Avoiding Interest Charges',
            content: 'Pay your full balance by the due date to avoid interest. Use the grace period wisely. Set up automatic payments to never miss a due date.',
          },
        ],
        conclusion: 'Use our calculator to see how different payment amounts affect your payoff time and total interest. Even small payment increases can save significant money.',
      },
    },
    th: {
      title: 'คำนวณดอกเบี้ยบัตรเครดิต - คำนวณการชำระหนี้',
      description: 'คำนวณระยะเวลาชำระหนี้บัตรเครดิตและดอกเบี้ยที่ต้องจ่าย พร้อมแผนการชำระที่ประหยัดที่สุด',
      keywords: ['บัตรเครดิต', 'ดอกเบี้ย', 'ชำระหนี้', 'ขั้นต่ำ', 'APR'],
      faq: [
        {
          question: 'ดอกเบี้ยบัตรเครดิตคิดอย่างไร?',
          answer: 'ดอกเบี้ยคิดรายวันจาก APR หารด้วย 365 คูณกับยอดค้างชำระ แล้วทบต้นทุกเดือน',
        },
        {
          question: 'APR คืออะไร?',
          answer: 'APR (อัตราดอกเบี้ยต่อปี) คืออัตราดอกเบี้ยรายปีของบัตรเครดิต ปกติอยู่ที่ 16-20% ต่อปี',
        },
        {
          question: 'ทำไมจ่ายขั้นต่ำแล้วหนี้ไม่หมด?',
          answer: 'การจ่ายขั้นต่ำ (ปกติ 5-10% ของยอด) ส่วนใหญ่ไปจ่ายดอกเบี้ย เหลือน้อยมากที่ลดเงินต้น',
        },
        {
          question: 'จะปลดหนี้เร็วขึ้นได้อย่างไร?',
          answer: 'จ่ายมากกว่าขั้นต่ำ จ่าย 2 ครั้งต่อเดือน โอนยอดไปบัตร 0% หรือกู้ปลดหนี้ดอกเบี้ยต่ำ',
        },
        {
          question: 'ดอกเบี้ยเท่าไรถือว่าดี?',
          answer: 'ต่ำกว่า 15% = ดีมาก, 16-20% = ปานกลาง, มากกว่า 20% = สูง ขึ้นอยู่กับเครดิตของคุณ',
        },
      ],
      article: {
        title: 'เข้าใจดอกเบี้ยบัตรเครดิตและวิธีปลดหนี้',
        introduction: 'หนี้บัตรเครดิตมีดอกเบี้ยสูง การเข้าใจระบบและใช้กลยุทธ์ที่ถูกต้องจะช่วยประหยัดเงินหลายหมื่นบาท',
        sections: [
          {
            heading: 'ระบบดอกเบี้ยบัตรเครดิต',
            content: 'ดอกเบี้ยคิดรายวันจากยอดค้างชำระ นำ APR หาร 365 ได้อัตรารายวัน แล้วทบต้นทุกเดือน',
          },
          {
            heading: 'กับดักการจ่ายขั้นต่ำ',
            content: 'จ่ายขั้นต่ำ 5-10% อาจใช้เวลา 10-20 ปีกว่าจะหมด และเสียดอกเบี้ยมากกว่าเงินต้นหลายเท่า',
          },
          {
            heading: 'กลยุทธ์ปลดหนี้',
            content: 'วิธีหิมะถล่ม: จ่ายดอกเบี้ยสูงสุดก่อน วิธีก้อนหิมะ: จ่ายยอดน้อยสุดก่อน โอนยอด: ย้ายไปบัตร 0% รวมหนี้: กู้ดอกเบี้ยต่ำ',
          },
          {
            heading: 'หลีกเลี่ยงดอกเบี้ย',
            content: 'จ่ายเต็มจำนวนก่อนกำหนด ใช้ช่วงปลอดดอกเบี้ยให้คุ้ม ตั้งจ่ายอัตโนมัติไม่พลาดชำระ',
          },
        ],
        conclusion: 'ใช้เครื่องคำนวณเปรียบเทียบการจ่ายต่างๆ แม้เพิ่มการจ่ายเพียงเล็กน้อยก็ประหยัดได้มาก',
      },
    },
  },
};