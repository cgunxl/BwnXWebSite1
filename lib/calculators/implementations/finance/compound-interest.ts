// Compound Interest Calculator Implementation
import { Calculator } from '@/lib/types/calculator';

export const compoundInterestCalculator: Calculator = {
  id: 'compound-interest',
  category: 'finance',
  slug: 'compound-interest',
  icon: '📈',
  color: 'bg-green-500',
  inputs: [
    {
      key: 'principal',
      label: 'Initial Investment',
      type: 'number',
      unit: 'currency',
      validation: { min: 0, required: true },
      defaultValue: 10000,
    },
    {
      key: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'number',
      unit: 'currency',
      validation: { min: 0 },
      defaultValue: 500,
    },
    {
      key: 'annualRate',
      label: 'Annual Interest Rate',
      type: 'number',
      unit: '%',
      validation: { min: 0, max: 50, required: true },
      defaultValue: 7,
    },
    {
      key: 'years',
      label: 'Investment Period',
      type: 'number',
      unit: 'years',
      validation: { min: 1, max: 50, required: true },
      defaultValue: 10,
    },
    {
      key: 'compoundFrequency',
      label: 'Compound Frequency',
      type: 'select',
      options: [
        { value: '1', label: 'Annually' },
        { value: '2', label: 'Semi-annually' },
        { value: '4', label: 'Quarterly' },
        { value: '12', label: 'Monthly' },
        { value: '365', label: 'Daily' },
      ],
      defaultValue: '12',
    },
  ],
  outputs: [
    {
      key: 'futureValue',
      label: 'Future Value',
      format: 'currency',
      primary: true,
    },
    {
      key: 'totalContributions',
      label: 'Total Contributions',
      format: 'currency',
    },
    {
      key: 'totalInterest',
      label: 'Total Interest Earned',
      format: 'currency',
    },
    {
      key: 'effectiveRate',
      label: 'Effective Annual Rate',
      format: 'percentage',
      decimals: 2,
    },
    {
      key: 'percentageGain',
      label: 'Percentage Gain',
      format: 'percentage',
      decimals: 1,
    },
  ],
  formulas: [
    {
      key: 'compoundInterest',
      expression: 'P * Math.pow(1 + r/n, n*t) + PMT * ((Math.pow(1 + r/n, n*t) - 1) / (r/n))',
      variables: ['P', 'r', 'n', 't', 'PMT'],
    },
  ],
  graph: {
    type: 'line',
    dataKey: 'growthOverTime',
    xAxis: 'Year',
    yAxis: 'Value',
    lines: ['Principal', 'Contributions', 'Interest'],
  },
  relatedCalculators: [
    'simple-interest',
    'investment-calculator',
    'retirement-calculator',
    'savings-goal',
  ],
  localizedContent: {
    en: {
      title: 'Compound Interest Calculator - Investment Growth Calculator',
      description: 'Calculate compound interest and see how your investment grows over time with regular contributions.',
      keywords: ['compound interest', 'investment calculator', 'interest calculator', 'compound growth', 'investment returns'],
      faq: [
        {
          question: 'What is compound interest?',
          answer: 'Compound interest is interest calculated on both the initial principal and accumulated interest from previous periods, creating exponential growth.',
        },
        {
          question: 'How does compounding frequency affect returns?',
          answer: 'More frequent compounding (daily vs annually) results in higher returns. Daily compounding can add 0.5-1% more than annual compounding.',
        },
        {
          question: 'What is the Rule of 72?',
          answer: 'The Rule of 72 estimates how long it takes to double your money: divide 72 by the interest rate. At 8% interest, money doubles in 9 years.',
        },
        {
          question: 'How do regular contributions affect growth?',
          answer: 'Regular contributions significantly boost growth through dollar-cost averaging and additional compounding on each contribution.',
        },
        {
          question: 'What is a realistic return rate?',
          answer: 'Stock market averages 7-10% annually long-term. Bonds 3-5%. Savings accounts 0.5-2%. High-yield savings 4-5% currently.',
        },
      ],
      article: {
        title: 'The Power of Compound Interest: Your Complete Guide',
        introduction: 'Albert Einstein called compound interest the eighth wonder of the world. Understanding and harnessing its power is key to building wealth over time.',
        sections: [
          {
            heading: 'How Compound Interest Works',
            content: 'Compound interest earns returns on both your principal and previously earned interest. This creates exponential growth - slow at first, then accelerating dramatically.',
          },
          {
            heading: 'Time is Your Best Friend',
            content: 'Starting early is crucial. $100/month from age 25 to 65 at 7% becomes $264,000. Starting at 35 only yields $122,000 - less than half!',
          },
          {
            heading: 'Maximizing Compound Growth',
            content: 'Increase contributions regularly, reinvest all dividends, choose tax-advantaged accounts, maintain consistent investing regardless of market conditions.',
          },
          {
            heading: 'Real-World Applications',
            content: '401(k) retirement accounts, IRA investments, college savings (529 plans), high-yield savings, dividend reinvestment plans (DRIPs).',
          },
        ],
        conclusion: 'Start investing early and consistently. Even small amounts compound into significant wealth over time. Use our calculator to see your potential growth.',
      },
    },
    th: {
      title: 'คำนวณดอกเบี้ยทบต้น - เครื่องคำนวณการเติบโตของเงินลงทุน',
      description: 'คำนวณดอกเบี้ยทบต้นและดูการเติบโตของเงินลงทุนเมื่อมีการฝากเพิ่มสม่ำเสมอ',
      keywords: ['ดอกเบี้ยทบต้น', 'คำนวณการลงทุน', 'ผลตอบแทนทบต้น', 'การออม', 'การลงทุน'],
      faq: [
        {
          question: 'ดอกเบี้ยทบต้นคืออะไร?',
          answer: 'ดอกเบี้ยทบต้นคือดอกเบี้ยที่คิดจากเงินต้นและดอกเบี้ยสะสม ทำให้เงินเติบโตแบบทวีคูณ',
        },
        {
          question: 'ความถี่ในการทบต้นมีผลอย่างไร?',
          answer: 'ทบต้นบ่อย (รายวัน vs รายปี) ให้ผลตอบแทนสูงกว่า ทบต้นรายวันอาจเพิ่มผลตอบแทน 0.5-1% ต่อปี',
        },
        {
          question: 'กฎ 72 คืออะไร?',
          answer: 'กฎ 72 ใช้คำนวณเวลาที่เงินจะเพิ่มเป็น 2 เท่า: 72 หารด้วยอัตราดอกเบี้ย เช่น ดอกเบี้ย 8% ใช้เวลา 9 ปี',
        },
        {
          question: 'การฝากเพิ่มสม่ำเสมอสำคัญแค่ไหน?',
          answer: 'สำคัญมาก ช่วยเฉลี่ยต้นทุน และแต่ละยอดฝากจะได้ดอกเบี้ยทบต้นเพิ่ม ทำให้เงินโตเร็วขึ้นมาก',
        },
        {
          question: 'ผลตอบแทนเท่าไรถือว่าสมเหตุสมผล?',
          answer: 'หุ้นระยะยาว 7-10% ต่อปี พันธบัตร 3-5% บัญชีออมทรัพย์ 0.5-2% เงินฝากดอกเบี้ยสูง 3-4%',
        },
      ],
      article: {
        title: 'พลังของดอกเบี้ยทบต้น: คู่มือฉบับสมบูรณ์',
        introduction: 'ไอน์สไตน์เรียกดอกเบี้ยทบต้นว่าสิ่งมหัศจรรย์ที่ 8 ของโลก การเข้าใจและใช้ประโยชน์จากมันคือกุญแจสู่ความมั่งคั่ง',
        sections: [
          {
            heading: 'ดอกเบี้ยทบต้นทำงานอย่างไร',
            content: 'ดอกเบี้ยทบต้นคิดจากเงินต้นและดอกเบี้ยสะสม สร้างการเติบโตแบบทวีคูณ - ช้าตอนแรก แล้วเร่งขึ้นอย่างมาก',
          },
          {
            heading: 'เวลาคือมิตรที่ดีที่สุด',
            content: 'เริ่มเร็วสำคัญมาก ฝาก 3,000/เดือน อายุ 25-65 ดอกเบี้ย 7% ได้ 8 ล้าน แต่เริ่มอายุ 35 ได้แค่ 3.7 ล้าน',
          },
          {
            heading: 'เพิ่มการเติบโตสูงสุด',
            content: 'เพิ่มเงินฝากสม่ำเสมอ นำปันผลกลับมาลงทุน เลือกบัญชีลดหย่อนภาษี ลงทุนต่อเนื่องไม่ว่าตลาดจะเป็นอย่างไร',
          },
          {
            heading: 'การใช้งานจริง',
            content: 'กองทุนสำรองเลี้ยงชีพ กองทุน RMF/SSF/LTF การออมเพื่อการศึกษา เงินฝากดอกเบี้ยสูง กองทุนปันผล',
          },
        ],
        conclusion: 'เริ่มลงทุนเร็วและสม่ำเสมอ แม้เงินน้อยก็เติบโตเป็นความมั่งคั่งได้ ใช้เครื่องคำนวณดูศักยภาพการเติบโตของคุณ',
      },
    },
  },
};