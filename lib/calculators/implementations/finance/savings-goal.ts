// Savings Goal Calculator Implementation
import { Calculator } from '@/lib/types/calculator';

export const savingsGoalCalculator: Calculator = {
  id: 'savings-goal',
  category: 'finance',
  slug: 'savings-goal',
  icon: '🎯',
  color: 'bg-purple-500',
  inputs: [
    {
      key: 'goalAmount',
      label: 'Savings Goal',
      type: 'number',
      unit: 'currency',
      validation: { min: 0, required: true },
      placeholder: 'e.g., 50000',
    },
    {
      key: 'currentSavings',
      label: 'Current Savings',
      type: 'number',
      unit: 'currency',
      validation: { min: 0 },
      placeholder: 'e.g., 5000',
    },
    {
      key: 'timeframe',
      label: 'Time to Reach Goal',
      type: 'number',
      unit: 'years',
      validation: { min: 0.1, max: 50, required: true },
      placeholder: 'e.g., 5',
    },
    {
      key: 'interestRate',
      label: 'Expected Annual Return',
      type: 'number',
      unit: '%',
      validation: { min: 0, max: 30 },
      placeholder: 'e.g., 6',
    },
    {
      key: 'compoundFrequency',
      label: 'Compound Frequency',
      type: 'select',
      options: [
        { value: '12', label: 'Monthly' },
        { value: '4', label: 'Quarterly' },
        { value: '2', label: 'Semi-annually' },
        { value: '1', label: 'Annually' },
      ],
      defaultValue: '12',
    },
  ],
  outputs: [
    {
      key: 'monthlyRequired',
      label: 'Monthly Savings Required',
      format: 'currency',
      primary: true,
    },
    {
      key: 'totalContributions',
      label: 'Total Contributions',
      format: 'currency',
    },
    {
      key: 'interestEarned',
      label: 'Interest Earned',
      format: 'currency',
    },
    {
      key: 'weeklyRequired',
      label: 'Weekly Savings Required',
      format: 'currency',
    },
    {
      key: 'dailyRequired',
      label: 'Daily Savings Required',
      format: 'currency',
    },
  ],
  formulas: [
    {
      name: 'savingsRequired',
      expression: 'PMT = (FV - PV * (1 + r/n)^(n*t)) / (((1 + r/n)^(n*t) - 1) / (r/n))',
      variables: ['FV', 'PV', 'r', 'n', 't'],
    },
  ],
  graph: {
    type: 'line',
    dataKey: 'savingsProgress',
    xAxis: 'Month',
    yAxis: 'Balance',
    showProjection: true,
  },
  relatedCalculators: [
    'compound-interest',
    'retirement-calculator',
    'investment-calculator',
    'emergency-fund',
  ],
  localizedContent: {
    en: {
      title: 'Savings Goal Calculator - How Much to Save Monthly',
      description: 'Calculate how much you need to save monthly to reach your financial goal with compound interest.',
      keywords: ['savings goal', 'monthly savings', 'financial goal', 'savings calculator', 'goal planner'],
      faq: [
        {
          question: 'How much should I save monthly?',
          answer: 'A good rule of thumb is to save at least 20% of your income. Use this calculator to determine the exact amount needed for your specific goal.',
        },
        {
          question: 'What interest rate should I use?',
          answer: 'Use conservative estimates: 0.5-2% for savings accounts, 3-5% for bonds, 6-8% for balanced portfolios, 8-10% for stock market long-term.',
        },
        {
          question: 'Should I account for inflation?',
          answer: 'Yes, subtract expected inflation (2-3%) from your return rate for more accurate planning, or increase your goal amount to account for future purchasing power.',
        },
        {
          question: 'What if I can\'t afford the monthly amount?',
          answer: 'Try extending your timeframe, finding ways to increase income, reducing expenses, or adjusting your goal to be more realistic.',
        },
        {
          question: 'How does compound interest help?',
          answer: 'Compound interest accelerates growth - the earlier you start and the more frequently interest compounds, the less you need to save monthly.',
        },
      ],
      article: {
        title: 'Achieving Your Savings Goals: A Strategic Approach',
        introduction: 'Setting and reaching savings goals requires planning, discipline, and understanding how compound interest works in your favor.',
        sections: [
          {
            heading: 'Setting SMART Goals',
            content: 'Make goals Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of "save money," set "save $20,000 for a house down payment in 3 years."',
          },
          {
            heading: 'The Power of Automation',
            content: 'Automate transfers to savings immediately after payday. Treat savings like a non-negotiable bill. "Pay yourself first" before other expenses.',
          },
          {
            heading: 'Maximizing Returns Safely',
            content: 'Short-term goals (1-2 years): Use high-yield savings. Medium-term (3-5 years): Consider CDs or bonds. Long-term (5+ years): Invest in diversified portfolios.',
          },
          {
            heading: 'Common Savings Goals',
            content: 'Emergency fund (3-6 months expenses), house down payment (10-20% of price), car purchase, vacation, wedding, education, retirement.',
          },
        ],
        conclusion: 'Start with clear goals and use our calculator to determine realistic monthly savings. Remember, consistency matters more than perfection.',
      },
    },
    th: {
      title: 'คำนวณเป้าหมายการออม - ต้องออมเดือนละเท่าไร',
      description: 'คำนวณจำนวนเงินที่ต้องออมต่อเดือนเพื่อให้ถึงเป้าหมายทางการเงินพร้อมดอกเบี้ยทบต้น',
      keywords: ['เป้าหมายการออม', 'ออมเงิน', 'วางแผนการเงิน', 'คำนวณการออม', 'เป้าหมายทางการเงิน'],
      faq: [
        {
          question: 'ควรออมเดือนละเท่าไร?',
          answer: 'หลักทั่วไปคือออมอย่างน้อย 20% ของรายได้ ใช้เครื่องคำนวณนี้หาจำนวนที่แน่นอนสำหรับเป้าหมายของคุณ',
        },
        {
          question: 'ใช้อัตราดอกเบี้ยเท่าไรดี?',
          answer: 'ประมาณการแบบระวัง: ออมทรัพย์ 0.5-2%, พันธบัตร 3-5%, พอร์ตผสม 6-8%, หุ้นระยะยาว 8-10%',
        },
        {
          question: 'ต้องคิดเงินเฟ้อด้วยไหม?',
          answer: 'ควรคิด ลบเงินเฟ้อคาดการณ์ (2-3%) จากผลตอบแทน หรือเพิ่มเป้าหมายเพื่อรักษากำลังซื้อในอนาคต',
        },
        {
          question: 'ถ้าออมไม่ไหวทำอย่างไร?',
          answer: 'ขยายเวลา หารายได้เพิ่ม ลดค่าใช้จ่าย หรือปรับเป้าหมายให้เป็นจริงมากขึ้น',
        },
        {
          question: 'ดอกเบี้ยทบต้นช่วยอย่างไร?',
          answer: 'ดอกเบี้ยทบต้นเร่งการเติบโต ยิ่งเริ่มเร็วและทบต้นบ่อย ยิ่งออมน้อยลงต่อเดือน',
        },
      ],
      article: {
        title: 'บรรลุเป้าหมายการออม: แนวทางเชิงกลยุทธ์',
        introduction: 'การตั้งและบรรลุเป้าหมายการออมต้องมีแผน วินัย และเข้าใจว่าดอกเบี้ยทบต้นช่วยคุณอย่างไร',
        sections: [
          {
            heading: 'ตั้งเป้าหมาย SMART',
            content: 'เป้าหมายต้องเจาะจง วัดได้ ทำได้จริง เกี่ยวข้อง มีกำหนดเวลา เช่น "ออม 600,000 บาทเป็นเงินดาวน์บ้านใน 3 ปี"',
          },
          {
            heading: 'พลังของระบบอัตโนมัติ',
            content: 'ตั้งโอนอัตโนมัติทันทีหลังได้เงินเดือน ถือว่าการออมเป็นบิลที่ต้องจ่าย "จ่ายตัวเองก่อน" ค่าใช้จ่ายอื่น',
          },
          {
            heading: 'เพิ่มผลตอบแทนอย่างปลอดภัย',
            content: 'ระยะสั้น (1-2 ปี): เงินฝากดอกเบี้ยสูง ระยะกลาง (3-5 ปี): พันธบัตร ระยะยาว (5+ ปี): ลงทุนพอร์ตกระจายความเสี่ยง',
          },
          {
            heading: 'เป้าหมายการออมทั่วไป',
            content: 'เงินฉุกเฉิน (3-6 เดือนของค่าใช้จ่าย), ดาวน์บ้าน (10-20% ของราคา), ซื้อรถ, เที่ยว, แต่งงาน, การศึกษา, เกษียณ',
          },
        ],
        conclusion: 'เริ่มด้วยเป้าหมายชัดเจนและใช้เครื่องคำนวณหาการออมรายเดือนที่เป็นจริง จำไว้ว่าความสม่ำเสมอสำคัญกว่าความสมบูรณ์แบบ',
      },
    },
  },
};