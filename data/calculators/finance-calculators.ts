import { Calculator } from '@/lib/types/calculator';

export const financeCalculators: Calculator[] = [
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    category: 'finance',
    icon: '💰',
    color: '#10B981',
    inputs: [
      {
        key: 'principal',
        label: 'Loan Amount',
        type: 'number',
        defaultValue: 10000,
        min: 0,
        max: 10000000,
        step: 100,
        required: true,
        unit: '$'
      },
      {
        key: 'rate',
        label: 'Interest Rate',
        type: 'number',
        defaultValue: 5,
        min: 0,
        max: 50,
        step: 0.1,
        required: true,
        unit: '%'
      },
      {
        key: 'term',
        label: 'Loan Term',
        type: 'number',
        defaultValue: 5,
        min: 1,
        max: 30,
        step: 1,
        required: true,
        unit: 'years'
      }
    ],
    outputs: [
      {
        key: 'monthlyPayment',
        label: 'Monthly Payment',
        format: 'currency',
        description: 'Your estimated monthly payment'
      },
      {
        key: 'totalPayment',
        label: 'Total Payment',
        format: 'currency',
        description: 'Total amount you will pay'
      },
      {
        key: 'totalInterest',
        label: 'Total Interest',
        format: 'currency',
        description: 'Total interest over the loan term'
      }
    ],
    formulas: [
      {
        key: 'monthlyPayment',
        expression: 'principal * (rate/100/12 * Math.pow(1 + rate/100/12, term*12)) / (Math.pow(1 + rate/100/12, term*12) - 1)',
        description: 'Standard amortization formula'
      },
      {
        key: 'totalPayment',
        expression: 'monthlyPayment * term * 12',
        description: 'Monthly payment × number of months'
      },
      {
        key: 'totalInterest',
        expression: 'totalPayment - principal',
        description: 'Total payment - Principal'
      }
    ],
    localizedContent: {
      en: {
        title: 'Loan Calculator',
        description: 'Calculate your monthly loan payments, total interest, and amortization schedule',
        keywords: ['loan calculator', 'loan payment', 'interest calculator', 'amortization'],
        faq: [
          {
            question: 'How is the monthly payment calculated?',
            answer: 'The monthly payment is calculated using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where M is monthly payment, P is principal, r is monthly interest rate, and n is number of payments.'
          },
          {
            question: 'What is included in the monthly payment?',
            answer: 'The monthly payment includes both principal and interest. It does not include taxes, insurance, or other fees unless specifically added.'
          },
          {
            question: 'Can I pay off my loan early?',
            answer: 'Yes, most loans allow early payoff. Check with your lender about prepayment penalties. Paying extra toward principal can save significant interest.'
          }
        ],
        article: {
          title: 'How to Use the Loan Calculator',
          introduction: 'Our loan calculator helps you understand the true cost of borrowing and plan your finances effectively.',
          sections: [
            {
              heading: 'Understanding Your Inputs',
              content: 'Enter your loan amount (principal), annual interest rate, and loan term in years. The calculator will instantly show your monthly payment and total costs.'
            },
            {
              heading: 'Interpreting Results',
              content: 'The monthly payment is what you\'ll pay each month. Total interest shows how much extra you\'ll pay beyond the principal. Use this to compare different loan options.'
            },
            {
              heading: 'Tips for Better Loan Terms',
              content: 'Shop around for better rates, consider a larger down payment, and improve your credit score before applying. Even a 1% rate difference can save thousands.'
            }
          ],
          conclusion: 'Use our calculator to make informed borrowing decisions and understand the long-term impact of loans on your finances.',
          wordCount: 250
        },
        examples: [
          {
            title: 'Car Loan Example',
            inputs: { principal: 25000, rate: 4.5, term: 5 },
            outputs: { monthlyPayment: 466.08, totalPayment: 27964.80, totalInterest: 2964.80 },
            explanation: 'For a $25,000 car loan at 4.5% for 5 years, you\'ll pay $466.08 monthly with $2,964.80 in total interest.'
          }
        ],
        references: [
          {
            title: 'Federal Reserve - Consumer Credit',
            url: 'https://www.federalreserve.gov/releases/g19/current/',
            publisher: 'Federal Reserve',
            dateAccessed: '2024-01-01',
            type: 'government'
          }
        ]
      },
      th: {
        title: 'เครื่องคำนวณสินเชื่อ',
        description: 'คำนวณค่างวดรายเดือน ดอกเบี้ยรวม และตารางผ่อนชำระ',
        keywords: ['คำนวณสินเชื่อ', 'คำนวณค่างวด', 'ดอกเบี้ยเงินกู้', 'ตารางผ่อนชำระ'],
        faq: [
          {
            question: 'ค่างวดรายเดือนคำนวณอย่างไร?',
            answer: 'ค่างวดรายเดือนคำนวณจากสูตรมาตรฐาน: M = P[r(1+r)^n]/[(1+r)^n-1] โดย M คือค่างวด, P คือเงินต้น, r คืออัตราดอกเบี้ยรายเดือน, n คือจำนวนงวด'
          },
          {
            question: 'ค่างวดรายเดือนรวมอะไรบ้าง?',
            answer: 'ค่างวดรายเดือนรวมเงินต้นและดอกเบี้ย ไม่รวมภาษี ประกัน หรือค่าธรรมเนียมอื่นๆ นอกจากจะระบุเพิ่มเติม'
          },
          {
            question: 'สามารถชำระหนี้ก่อนกำหนดได้หรือไม่?',
            answer: 'ได้ สินเชื่อส่วนใหญ่อนุญาตให้ชำระก่อนกำหนด ควรตรวจสอบค่าปรับกับผู้ให้กู้ การชำระเงินต้นเพิ่มช่วยประหยัดดอกเบี้ยได้มาก'
          }
        ],
        article: {
          title: 'วิธีใช้เครื่องคำนวณสินเชื่อ',
          introduction: 'เครื่องคำนวณสินเชื่อช่วยให้คุณเข้าใจต้นทุนการกู้ยืมที่แท้จริงและวางแผนการเงินอย่างมีประสิทธิภาพ',
          sections: [
            {
              heading: 'การกรอกข้อมูล',
              content: 'ใส่จำนวนเงินกู้ อัตราดอกเบี้ยต่อปี และระยะเวลากู้เป็นปี เครื่องคำนวณจะแสดงค่างวดรายเดือนและต้นทุนรวมทันที'
            },
            {
              heading: 'การอ่านผลลัพธ์',
              content: 'ค่างวดรายเดือนคือจำนวนที่ต้องจ่ายทุกเดือน ดอกเบี้ยรวมแสดงจำนวนเงินที่จ่ายเพิ่มจากเงินต้น ใช้เปรียบเทียบตัวเลือกสินเชื่อต่างๆ'
            }
          ],
          conclusion: 'ใช้เครื่องคำนวณเพื่อตัดสินใจกู้ยืมอย่างมีข้อมูลและเข้าใจผลกระทบระยะยาวของสินเชื่อต่อการเงินของคุณ',
          wordCount: 200
        }
      }
    }
  },
  {
    id: 'mortgage-calculator',
    slug: 'mortgage-calculator',
    category: 'finance',
    icon: '🏠',
    color: '#3B82F6',
    inputs: [
      {
        key: 'homePrice',
        label: 'Home Price',
        type: 'number',
        defaultValue: 300000,
        min: 0,
        max: 10000000,
        step: 1000,
        required: true,
        unit: '$'
      },
      {
        key: 'downPayment',
        label: 'Down Payment',
        type: 'number',
        defaultValue: 60000,
        min: 0,
        max: 10000000,
        step: 1000,
        required: true,
        unit: '$'
      },
      {
        key: 'interestRate',
        label: 'Interest Rate',
        type: 'number',
        defaultValue: 6.5,
        min: 0,
        max: 20,
        step: 0.1,
        required: true,
        unit: '%'
      },
      {
        key: 'loanTerm',
        label: 'Loan Term',
        type: 'select',
        defaultValue: 30,
        required: true,
        options: [
          { value: 15, label: '15 years' },
          { value: 20, label: '20 years' },
          { value: 30, label: '30 years' }
        ]
      },
      {
        key: 'propertyTax',
        label: 'Annual Property Tax',
        type: 'number',
        defaultValue: 3600,
        min: 0,
        max: 50000,
        step: 100,
        required: false,
        unit: '$/year'
      },
      {
        key: 'homeInsurance',
        label: 'Annual Home Insurance',
        type: 'number',
        defaultValue: 1200,
        min: 0,
        max: 10000,
        step: 50,
        required: false,
        unit: '$/year'
      },
      {
        key: 'hoa',
        label: 'Monthly HOA Fees',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 2000,
        step: 10,
        required: false,
        unit: '$/month'
      },
      {
        key: 'pmi',
        label: 'Monthly PMI',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 1000,
        step: 10,
        required: false,
        unit: '$/month',
        tooltip: 'Required if down payment is less than 20%'
      }
    ],
    outputs: [
      {
        key: 'loanAmount',
        label: 'Loan Amount',
        format: 'currency',
        description: 'Principal amount borrowed'
      },
      {
        key: 'monthlyPrincipalInterest',
        label: 'Principal & Interest',
        format: 'currency',
        description: 'Monthly principal and interest payment'
      },
      {
        key: 'monthlyPropertyTax',
        label: 'Property Tax',
        format: 'currency',
        description: 'Monthly property tax'
      },
      {
        key: 'monthlyHomeInsurance',
        label: 'Home Insurance',
        format: 'currency',
        description: 'Monthly insurance'
      },
      {
        key: 'totalMonthlyPayment',
        label: 'Total Monthly Payment',
        format: 'currency',
        description: 'Total PITI payment',
        highlight: true
      },
      {
        key: 'totalInterest',
        label: 'Total Interest Paid',
        format: 'currency',
        description: 'Total interest over loan term'
      },
      {
        key: 'totalPaid',
        label: 'Total Amount Paid',
        format: 'currency',
        description: 'Total of all payments'
      }
    ],
    formulas: [
      {
        key: 'loanAmount',
        expression: 'homePrice - downPayment',
        description: 'Home price minus down payment'
      },
      {
        key: 'monthlyPrincipalInterest',
        expression: 'loanAmount * (interestRate/100/12 * Math.pow(1 + interestRate/100/12, loanTerm*12)) / (Math.pow(1 + interestRate/100/12, loanTerm*12) - 1)',
        description: 'Standard mortgage amortization formula'
      },
      {
        key: 'monthlyPropertyTax',
        expression: 'propertyTax / 12',
        description: 'Annual property tax divided by 12'
      },
      {
        key: 'monthlyHomeInsurance',
        expression: 'homeInsurance / 12',
        description: 'Annual insurance divided by 12'
      },
      {
        key: 'totalMonthlyPayment',
        expression: 'monthlyPrincipalInterest + monthlyPropertyTax + monthlyHomeInsurance + hoa + pmi',
        description: 'Sum of all monthly costs'
      },
      {
        key: 'totalInterest',
        expression: '(monthlyPrincipalInterest * loanTerm * 12) - loanAmount',
        description: 'Total payments minus principal'
      },
      {
        key: 'totalPaid',
        expression: 'totalMonthlyPayment * loanTerm * 12',
        description: 'Monthly payment times number of months'
      }
    ],
    graph: {
      type: 'pie',
      title: 'Monthly Payment Breakdown',
      data: ['monthlyPrincipalInterest', 'monthlyPropertyTax', 'monthlyHomeInsurance', 'hoa', 'pmi'],
      labels: ['Principal & Interest', 'Property Tax', 'Insurance', 'HOA', 'PMI'],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
    },
    localizedContent: {
      en: {
        title: 'Mortgage Calculator',
        description: 'Calculate your monthly mortgage payment including taxes, insurance, HOA, and PMI',
        keywords: ['mortgage calculator', 'home loan calculator', 'house payment calculator', 'mortgage payment'],
        faq: [
          {
            question: 'What is included in the monthly payment?',
            answer: 'The total monthly payment (PITI) includes Principal, Interest, Taxes, and Insurance. It may also include HOA fees and PMI if applicable.'
          },
          {
            question: 'When is PMI required?',
            answer: 'Private Mortgage Insurance (PMI) is typically required when your down payment is less than 20% of the home price. It protects the lender if you default.'
          },
          {
            question: 'Should I choose a 15-year or 30-year mortgage?',
            answer: 'A 15-year mortgage has higher monthly payments but saves significant interest. A 30-year mortgage has lower payments but costs more overall. Choose based on your budget and goals.'
          },
          {
            question: 'How much should I put down?',
            answer: '20% down payment avoids PMI and gets better rates. However, many loans accept 3-5% down. Consider your savings, monthly budget, and local programs.'
          },
          {
            question: 'What is a good debt-to-income ratio?',
            answer: 'Lenders typically prefer a debt-to-income ratio below 43%. This includes your mortgage and all other debts. Lower ratios get better rates.'
          }
        ],
        article: {
          title: 'Complete Guide to Using the Mortgage Calculator',
          introduction: 'Understanding your mortgage payment is crucial for homebuying decisions. Our calculator provides a comprehensive view of your monthly costs.',
          sections: [
            {
              heading: 'Key Components of Your Payment',
              content: 'Your mortgage payment consists of principal (loan paydown), interest (cost of borrowing), property taxes, homeowners insurance, and potentially HOA fees and PMI.'
            },
            {
              heading: 'Factors Affecting Your Payment',
              content: 'Interest rates, loan term, down payment size, and local property taxes all impact your payment. Even small rate changes can mean thousands in savings.'
            },
            {
              heading: 'Tips for Lower Payments',
              content: 'Improve your credit score, save for a larger down payment, shop multiple lenders, consider different loan terms, and look into first-time buyer programs.'
            }
          ],
          conclusion: 'Use this calculator to explore different scenarios and find a mortgage payment that fits your budget comfortably.',
          wordCount: 300
        }
      },
      th: {
        title: 'คำนวณสินเชื่อบ้าน',
        description: 'คำนวณค่างวดบ้านรายเดือน รวมภาษี ประกัน ค่าส่วนกลาง และ PMI',
        keywords: ['คำนวณสินเชื่อบ้าน', 'คำนวณค่างวดบ้าน', 'คำนวณเงินกู้บ้าน', 'ผ่อนบ้าน'],
        faq: [
          {
            question: 'ค่างวดรายเดือนรวมอะไรบ้าง?',
            answer: 'ค่างวดรายเดือนรวม (PITI) ประกอบด้วย เงินต้น ดอกเบี้ย ภาษี และประกัน อาจรวมค่าส่วนกลางและ PMI ถ้ามี'
          },
          {
            question: 'เมื่อไหร่ต้องจ่าย PMI?',
            answer: 'ประกันสินเชื่อบ้าน (PMI) มักต้องจ่ายเมื่อดาวน์น้อยกว่า 20% ของราคาบ้าน เพื่อคุ้มครองผู้ให้กู้หากผิดนัดชำระ'
          },
          {
            question: 'ควรเลือกผ่อน 15 ปีหรือ 30 ปี?',
            answer: 'ผ่อน 15 ปีค่างวดสูงแต่ประหยัดดอกเบี้ยมาก ผ่อน 30 ปีค่างวดต่ำแต่จ่ายดอกเบี้ยมากกว่า เลือกตามงบประมาณและเป้าหมาย'
          }
        ],
        article: {
          title: 'คู่มือการใช้เครื่องคำนวณสินเชื่อบ้าน',
          introduction: 'การเข้าใจค่างวดสินเชื่อบ้านเป็นสิ่งสำคัญสำหรับการตัดสินใจซื้อบ้าน เครื่องคำนวณนี้ให้ภาพรวมค่าใช้จ่ายรายเดือนครบถ้วน',
          sections: [
            {
              heading: 'ส่วนประกอบสำคัญของค่างวด',
              content: 'ค่างวดประกอบด้วยเงินต้น (ชำระหนี้) ดอกเบี้ย (ต้นทุนการกู้) ภาษีทรัพย์สิน ประกันบ้าน และอาจมีค่าส่วนกลางและ PMI'
            }
          ],
          conclusion: 'ใช้เครื่องคำนวณนี้เพื่อสำรวจสถานการณ์ต่างๆ และหาค่างวดที่เหมาะกับงบประมาณของคุณ',
          wordCount: 250
        }
      }
    }
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    category: 'finance',
    icon: '📈',
    color: '#8B5CF6',
    inputs: [
      {
        key: 'principal',
        label: 'Initial Investment',
        type: 'number',
        defaultValue: 1000,
        min: 0,
        max: 10000000,
        step: 100,
        required: true,
        unit: '$'
      },
      {
        key: 'monthlyContribution',
        label: 'Monthly Contribution',
        type: 'number',
        defaultValue: 100,
        min: 0,
        max: 100000,
        step: 10,
        required: false,
        unit: '$'
      },
      {
        key: 'annualRate',
        label: 'Annual Interest Rate',
        type: 'number',
        defaultValue: 7,
        min: 0,
        max: 50,
        step: 0.1,
        required: true,
        unit: '%'
      },
      {
        key: 'years',
        label: 'Investment Period',
        type: 'number',
        defaultValue: 10,
        min: 1,
        max: 50,
        step: 1,
        required: true,
        unit: 'years'
      },
      {
        key: 'compoundFrequency',
        label: 'Compound Frequency',
        type: 'select',
        defaultValue: 12,
        required: true,
        options: [
          { value: 1, label: 'Annually' },
          { value: 2, label: 'Semi-annually' },
          { value: 4, label: 'Quarterly' },
          { value: 12, label: 'Monthly' },
          { value: 365, label: 'Daily' }
        ]
      }
    ],
    outputs: [
      {
        key: 'futureValue',
        label: 'Future Value',
        format: 'currency',
        description: 'Total value at the end',
        highlight: true
      },
      {
        key: 'totalContributions',
        label: 'Total Contributions',
        format: 'currency',
        description: 'Principal + all contributions'
      },
      {
        key: 'totalInterest',
        label: 'Total Interest Earned',
        format: 'currency',
        description: 'Interest earned over time'
      },
      {
        key: 'effectiveRate',
        label: 'Effective Annual Rate',
        format: 'percentage',
        description: 'Actual yearly return'
      }
    ],
    formulas: [
      {
        key: 'futureValue',
        expression: `
          const r = annualRate / 100;
          const n = compoundFrequency;
          const t = years;
          const principalGrowth = principal * Math.pow(1 + r/n, n*t);
          const contributionGrowth = monthlyContribution * (Math.pow(1 + r/n, n*t) - 1) / (r/n) * (n/12);
          return principalGrowth + contributionGrowth;
        `,
        description: 'Compound interest formula with regular contributions'
      },
      {
        key: 'totalContributions',
        expression: 'principal + (monthlyContribution * years * 12)',
        description: 'Initial investment plus all monthly contributions'
      },
      {
        key: 'totalInterest',
        expression: 'futureValue - totalContributions',
        description: 'Future value minus total contributions'
      },
      {
        key: 'effectiveRate',
        expression: '(Math.pow(1 + annualRate/100/compoundFrequency, compoundFrequency) - 1) * 100',
        description: 'Effective annual rate formula'
      }
    ],
    graph: {
      type: 'line',
      title: 'Investment Growth Over Time',
      xAxis: 'Years',
      yAxis: 'Value ($)',
      showProjection: true,
      data: ['principal', 'contributions', 'interest'],
      colors: ['#3B82F6', '#10B981', '#F59E0B']
    },
    localizedContent: {
      en: {
        title: 'Compound Interest Calculator',
        description: 'Calculate compound interest growth with regular contributions',
        keywords: ['compound interest', 'investment calculator', 'savings growth', 'compound interest calculator'],
        faq: [
          {
            question: 'What is compound interest?',
            answer: 'Compound interest is interest earned on both the initial principal and previously earned interest. It\'s often called "interest on interest" and causes wealth to grow exponentially.'
          },
          {
            question: 'How does compounding frequency affect returns?',
            answer: 'More frequent compounding (daily vs. annually) results in higher returns. Daily compounding can add 0.1-0.5% extra annual return compared to annual compounding.'
          },
          {
            question: 'What\'s the Rule of 72?',
            answer: 'The Rule of 72 estimates how long it takes to double your money. Divide 72 by your annual return rate. At 8% annual return, money doubles in about 9 years (72/8).'
          }
        ],
        article: {
          title: 'The Power of Compound Interest',
          introduction: 'Albert Einstein allegedly called compound interest the eighth wonder of the world. Understanding it is key to building wealth.',
          sections: [
            {
              heading: 'Time is Your Greatest Asset',
              content: 'Starting early makes a massive difference. $100/month invested at 7% for 40 years becomes $262,481, but waiting 10 years reduces it to $121,997.'
            },
            {
              heading: 'Regular Contributions Matter',
              content: 'Consistent monthly contributions, even small ones, significantly boost long-term growth through dollar-cost averaging and compound growth.'
            }
          ],
          conclusion: 'Start investing early, contribute regularly, and let compound interest work its magic over time.',
          wordCount: 280
        }
      }
    }
  }
];

// Export function to get all finance calculators
export function getFinanceCalculators(): Calculator[] {
  return financeCalculators;
}

// Export function to get calculator by slug
export function getFinanceCalculatorBySlug(slug: string): Calculator | undefined {
  return financeCalculators.find(calc => calc.slug === slug);
}