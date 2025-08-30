import { Calculator } from '@/lib/types/calculator';

export const mortgageCalculator: Calculator = {
  id: 'mortgage-calculator',
  category: 'finance',
  slug: 'mortgage-calculator',
  icon: '🏠',
  color: 'bg-green-500',
  inputs: [
    {
      key: 'homePrice',
      label: 'Home Price',
      type: 'number',
      unit: 'currency',
      placeholder: 'Enter home price',
      min: 0,
      required: true,
      validation: [
        { type: 'min', value: 0, message: 'Home price must be positive' }
      ],
    },
    {
      key: 'downPayment',
      label: 'Down Payment',
      type: 'number',
      unit: 'currency',
      placeholder: 'Enter down payment amount',
      min: 0,
      required: true,
    },
    {
      key: 'downPaymentPercent',
      label: 'Or Down Payment %',
      type: 'slider',
      unit: '%',
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 20,
    },
    {
      key: 'interestRate',
      label: 'Interest Rate',
      type: 'number',
      unit: '%',
      placeholder: 'Annual interest rate',
      min: 0,
      max: 30,
      step: 0.01,
      required: true,
    },
    {
      key: 'loanTerm',
      label: 'Loan Term',
      type: 'select',
      defaultValue: '30',
      options: [
        { value: '10', label: '10 years' },
        { value: '15', label: '15 years' },
        { value: '20', label: '20 years' },
        { value: '25', label: '25 years' },
        { value: '30', label: '30 years' },
      ],
    },
    {
      key: 'propertyTax',
      label: 'Annual Property Tax',
      type: 'number',
      unit: 'currency/year',
      placeholder: 'Annual property tax',
      defaultValue: 0,
    },
    {
      key: 'homeInsurance',
      label: 'Annual Home Insurance',
      type: 'number',
      unit: 'currency/year',
      placeholder: 'Annual insurance',
      defaultValue: 0,
    },
    {
      key: 'hoa',
      label: 'Monthly HOA Fees',
      type: 'number',
      unit: 'currency/month',
      placeholder: 'HOA fees',
      defaultValue: 0,
    },
    {
      key: 'pmi',
      label: 'Monthly PMI',
      type: 'number',
      unit: 'currency/month',
      placeholder: 'PMI if down payment < 20%',
      defaultValue: 0,
    },
  ],
  outputs: [
    {
      key: 'monthlyPayment',
      label: 'Monthly Payment (P&I)',
      format: 'currency',
      precision: 2,
      visualization: 'gauge',
    },
    {
      key: 'totalMonthlyPayment',
      label: 'Total Monthly Payment',
      format: 'currency',
      precision: 2,
      description: 'Including taxes, insurance, HOA',
    },
    {
      key: 'loanAmount',
      label: 'Loan Amount',
      format: 'currency',
      precision: 2,
    },
    {
      key: 'totalInterest',
      label: 'Total Interest Paid',
      format: 'currency',
      precision: 2,
      visualization: 'bar',
    },
    {
      key: 'totalPaid',
      label: 'Total Amount Paid',
      format: 'currency',
      precision: 2,
    },
    {
      key: 'payoffDate',
      label: 'Payoff Date',
      format: 'text',
    },
  ],
  formulas: [
    {
      name: 'monthlyMortgagePayment',
      expression: '(loanAmount * (rate / 12)) / (1 - Math.pow(1 + (rate / 12), -months))',
      variables: ['loanAmount', 'rate', 'months'],
      description: 'Standard mortgage payment formula',
    },
  ],
  relatedCalculators: ['loan-calculator', 'refinance-calculator', 'property-tax', 'rent-vs-buy'],
  localizedContent: {
    en: {
      title: 'Mortgage Calculator - Calculate Your Monthly Home Payment',
      description: 'Calculate your monthly mortgage payment, total interest, and create an amortization schedule. Include taxes, insurance, HOA fees, and PMI.',
      keywords: ['mortgage calculator', 'home loan', 'monthly payment', 'mortgage payment calculator', 'home buying calculator'],
      faq: [
        {
          question: 'How is my monthly mortgage payment calculated?',
          answer: 'Your monthly payment is calculated using the loan amount, interest rate, and loan term. The formula considers compound interest to determine how much of each payment goes toward principal and interest.',
        },
        {
          question: 'What is included in the total monthly payment?',
          answer: 'Total monthly payment includes: Principal & Interest (P&I), Property taxes, Homeowners insurance, HOA fees (if applicable), and PMI (if down payment is less than 20%).',
        },
        {
          question: 'What is PMI and when do I need it?',
          answer: 'PMI (Private Mortgage Insurance) is typically required when your down payment is less than 20% of the home price. It protects the lender and usually costs 0.5-1% of the loan amount annually.',
        },
        {
          question: 'Should I choose a 15-year or 30-year mortgage?',
          answer: 'A 15-year mortgage has higher monthly payments but saves significant interest over the loan life. A 30-year mortgage has lower monthly payments but costs more in total interest. Choose based on your budget and financial goals.',
        },
        {
          question: 'How much should my down payment be?',
          answer: 'While 20% down payment avoids PMI, many loans accept as little as 3-5% down. A larger down payment means lower monthly payments and less interest paid over time.',
        },
        {
          question: 'What is the 28/36 rule for mortgages?',
          answer: 'The 28/36 rule suggests your monthly housing costs should not exceed 28% of gross monthly income, and total debt payments should not exceed 36% of gross monthly income.',
        },
      ],
      article: {
        title: 'Complete Guide to Understanding Your Mortgage Payment',
        introduction: 'Buying a home is likely the largest financial decision you will make. Understanding your mortgage payment structure, what affects it, and how to optimize it can save you thousands of dollars over the life of your loan.',
        sections: [
          {
            heading: 'Components of Your Mortgage Payment',
            content: 'Your mortgage payment typically consists of four main components, often referred to as PITI: Principal (the amount that goes toward your loan balance), Interest (the cost of borrowing), Taxes (property taxes), and Insurance (homeowners insurance and possibly PMI).',
            subSections: [
              {
                heading: 'Principal and Interest',
                content: 'Early in your mortgage, most of your payment goes toward interest. As time passes, more goes toward principal. This process is called amortization. Understanding this can help you see the benefit of extra principal payments.',
              },
              {
                heading: 'Property Taxes and Insurance',
                content: 'These are often collected monthly and held in an escrow account. Your lender pays them on your behalf when due. Property taxes vary significantly by location and can change annually.',
              },
            ],
          },
          {
            heading: 'Factors Affecting Your Payment',
            content: 'Several factors determine your monthly payment: loan amount, interest rate, loan term, down payment size, credit score, and location-specific costs like property taxes.',
          },
          {
            heading: 'Strategies to Lower Your Payment',
            content: 'Consider these strategies: Shop for better interest rates, increase your down payment, buy down your rate with points, choose a longer loan term (though this increases total interest), or consider an adjustable-rate mortgage if appropriate.',
          },
          {
            heading: 'The True Cost of Your Mortgage',
            content: 'Look beyond monthly payments. A 30-year mortgage at 4% interest means you will pay about 72% more than the home price in total. Understanding this helps you appreciate the value of extra principal payments.',
          },
        ],
        conclusion: 'Use our mortgage calculator to explore different scenarios and find the right balance between monthly affordability and long-term costs. Remember to factor in all costs, not just the principal and interest, when budgeting for homeownership.',
        wordCount: 1250,
      },
      examples: [
        {
          title: 'Typical Home Purchase',
          inputs: { homePrice: 400000, downPayment: 80000, interestRate: 6.5, loanTerm: 30 },
          outputs: { monthlyPayment: 2022, totalInterest: 407920, totalPaid: 727920 },
          explanation: 'For a $400,000 home with 20% down at 6.5% for 30 years, monthly P&I is $2,022 with total interest of $407,920.',
        },
        {
          title: '15-Year vs 30-Year Comparison',
          inputs: { homePrice: 300000, downPayment: 60000, interestRate: 6.0, loanTerm: 15 },
          outputs: { monthlyPayment: 2030, totalInterest: 125400, totalPaid: 365400 },
          explanation: 'Same $300,000 home with 15-year term: higher payment ($2,030 vs $1,439) but saves $156,000 in interest.',
        },
      ],
      references: [
        {
          title: 'Consumer Financial Protection Bureau - Buying a House',
          url: 'https://www.consumerfinance.gov/owning-a-home/',
          publisher: 'CFPB',
          dateAccessed: '2024-01-01',
          type: 'government',
        },
        {
          title: 'Federal Housing Administration - FHA Loans',
          url: 'https://www.hud.gov/buying/loans',
          publisher: 'HUD',
          dateAccessed: '2024-01-01',
          type: 'government',
        },
      ],
    },
    th: {
      title: 'เครื่องคำนวณสินเชื่อบ้าน - คำนวณค่างวดรายเดือน',
      description: 'คำนวณค่างวดบ้านรายเดือน ดอกเบี้ยรวม และตารางการผ่อนชำระ รวมภาษี ประกัน ค่าส่วนกลาง',
      keywords: ['คำนวณสินเชื่อบ้าน', 'ค่างวดบ้าน', 'เครื่องคิดเงินกู้บ้าน', 'คำนวณดอกเบี้ยบ้าน'],
      faq: [
        {
          question: 'ค่างวดบ้านคำนวณอย่างไร?',
          answer: 'ค่างวดคำนวณจากวงเงินกู้ อัตราดอกเบี้ย และระยะเวลาผ่อน โดยใช้สูตรดอกเบี้ยทบต้นเพื่อหาว่าแต่ละงวดจ่ายเงินต้นและดอกเบี้ยเท่าไร',
        },
        {
          question: 'ค่างวดรวมประกอบด้วยอะไรบ้าง?',
          answer: 'ค่างวดรวม ประกอบด้วย: เงินต้น+ดอกเบี้ย, ภาษีที่ดินและสิ่งปลูกสร้าง, ประกันอัคคีภัย, ค่าส่วนกลาง (ถ้ามี), และประกันสินเชื่อ (ถ้าดาวน์น้อยกว่า 20%)',
        },
        {
          question: 'ควรดาวน์บ้านกี่เปอร์เซ็นต์?',
          answer: 'ดาวน์ 20% ขึ้นไปจะไม่ต้องทำประกันสินเชื่อ แต่หลายธนาคารรับดาวน์ต่ำสุด 5-10% การดาวน์มากจะช่วยลดค่างวดและดอกเบี้ยรวม',
        },
        {
          question: 'ผ่อน 15 ปี หรือ 30 ปี ดีกว่ากัน?',
          answer: 'ผ่อน 15 ปี ค่างวดสูงแต่ประหยัดดอกเบี้ยมาก ผ่อน 30 ปี ค่างวดต่ำแต่จ่ายดอกเบี้ยรวมมาก เลือกตามความสามารถและเป้าหมายการเงิน',
        },
        {
          question: 'LTV คืออะไร สำคัญอย่างไร?',
          answer: 'LTV (Loan-to-Value) คืออัตราส่วนเงินกู้ต่อราคาบ้าน เช่น บ้าน 3 ล้าน กู้ 2.7 ล้าน = LTV 90% ยิ่ง LTV ต่ำ ดอกเบี้ยยิ่งดี',
        },
      ],
      article: {
        title: 'คู่มือครบ: ทำความเข้าใจค่างวดบ้านของคุณ',
        introduction: 'การซื้อบ้านเป็นการตัดสินใจทางการเงินที่สำคัญที่สุดในชีวิต การเข้าใจโครงสร้างค่างวด ปัจจัยที่มีผล และวิธีการลดภาระ จะช่วยประหยัดเงินหลายแสนบาทตลอดอายุสินเชื่อ',
        sections: [
          {
            heading: 'องค์ประกอบของค่างวดบ้าน',
            content: 'ค่างวดบ้านประกอบด้วย 4 ส่วนหลัก: เงินต้น (ส่วนที่ลดยอดหนี้), ดอกเบี้ย (ค่าใช้จ่ายในการกู้), ภาษี (ภาษีที่ดินและสิ่งปลูกสร้าง), และประกัน (ประกันอัคคีภัยและประกันสินเชื่อ)',
          },
          {
            heading: 'เทคนิคลดค่างวดและดอกเบี้ย',
            content: 'เปรียบเทียบดอกเบี้ยหลายธนาคาร, ดาวน์มากขึ้น, รีไฟแนนซ์เมื่อดอกเบี้ยลด, จ่ายเงินต้นเพิ่ม, เลือกระยะเวลาผ่อนที่เหมาะสม',
          },
        ],
        conclusion: 'ใช้เครื่องคำนวณสินเชื่อบ้านเพื่อวางแผนการเงิน อย่าลืมคิดค่าใช้จ่ายทั้งหมด ไม่ใช่แค่เงินต้นและดอกเบี้ย เพื่อเตรียมตัวเป็นเจ้าของบ้านอย่างมั่นคง',
        wordCount: 900,
      },
      examples: [
        {
          title: 'ตัวอย่างบ้านทั่วไป',
          inputs: { homePrice: 3000000, downPayment: 300000, interestRate: 6.5, loanTerm: 30 },
          outputs: { monthlyPayment: 17055, totalInterest: 3439800, totalPaid: 6139800 },
          explanation: 'บ้าน 3 ล้านบาท ดาวน์ 10% ดอกเบี้ย 6.5% ผ่อน 30 ปี ค่างวด 17,055 บาท/เดือน ดอกเบี้ยรวม 3.44 ล้านบาท',
        },
      ],
      references: [
        {
          title: 'ธนาคารแห่งประเทศไทย - สินเชื่อที่อยู่อาศัย',
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
      defaultValues: { 
        interestRate: 7.0,
        propertyTax: 3600,
        homeInsurance: 1200,
      },
      regulations: {
        pmiThreshold: 0.20, // PMI required if down payment < 20%
        maxDTI: 0.43, // Max debt-to-income ratio
      },
    },
    th: {
      currency: 'THB',
      defaultValues: { 
        interestRate: 6.5,
        propertyTax: 0, // Thailand has different property tax structure
        homeInsurance: 5000,
      },
      regulations: {
        maxLTV: 0.90, // Max loan-to-value for first home
        maxDTI: 0.70, // Thailand allows higher DTI
      },
    },
    // Add more countries...
  },
  tags: ['mortgage', 'home loan', 'real estate', 'property', 'housing'],
  difficulty: 'intermediate',
  popularity: 98,
};