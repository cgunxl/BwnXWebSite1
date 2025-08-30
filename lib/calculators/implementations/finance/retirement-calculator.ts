// Retirement Calculator Implementation
import { Calculator } from '@/lib/types/calculator';

export const retirementCalculator: Calculator = {
  id: 'retirement-calculator',
  category: 'finance',
  slug: 'retirement-calculator',
  icon: '👴',
  color: 'bg-indigo-500',
  inputs: [
    {
      key: 'currentAge',
      label: 'Current Age',
      type: 'number',
      unit: 'years',
      validation: { min: 18, max: 100, required: true },
      placeholder: 'e.g., 30',
    },
    {
      key: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      unit: 'years',
      validation: { min: 50, max: 100, required: true },
      placeholder: 'e.g., 65',
    },
    {
      key: 'currentSavings',
      label: 'Current Retirement Savings',
      type: 'number',
      unit: 'currency',
      validation: { min: 0 },
      placeholder: 'e.g., 50000',
    },
    {
      key: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'number',
      unit: 'currency',
      validation: { min: 0 },
      placeholder: 'e.g., 1000',
    },
    {
      key: 'annualReturn',
      label: 'Expected Annual Return',
      type: 'number',
      unit: '%',
      validation: { min: 0, max: 30 },
      placeholder: 'e.g., 7',
    },
    {
      key: 'retirementIncome',
      label: 'Desired Monthly Income in Retirement',
      type: 'number',
      unit: 'currency',
      validation: { min: 0, required: true },
      placeholder: 'e.g., 5000',
    },
    {
      key: 'inflationRate',
      label: 'Expected Inflation Rate',
      type: 'number',
      unit: '%',
      validation: { min: 0, max: 10 },
      placeholder: 'e.g., 3',
    },
    {
      key: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      unit: 'years',
      validation: { min: 60, max: 120 },
      placeholder: 'e.g., 85',
    },
  ],
  outputs: [
    {
      key: 'retirementBalance',
      label: 'Projected Retirement Balance',
      format: 'currency',
      primary: true,
    },
    {
      key: 'monthlyIncomeAvailable',
      label: 'Monthly Income Available',
      format: 'currency',
    },
    {
      key: 'shortfall',
      label: 'Shortfall/Surplus',
      format: 'currency',
    },
    {
      key: 'additionalMonthlyNeeded',
      label: 'Additional Monthly Savings Needed',
      format: 'currency',
    },
    {
      key: 'totalContributions',
      label: 'Total Contributions',
      format: 'currency',
    },
    {
      key: 'totalInterestEarned',
      label: 'Total Interest Earned',
      format: 'currency',
    },
  ],
  formulas: [
    {
      name: 'retirementProjection',
      expression: 'FV = PV * (1 + r)^n + PMT * (((1 + r)^n - 1) / r)',
      variables: ['PV', 'PMT', 'r', 'n'],
    },
  ],
  graph: {
    type: 'line',
    dataKey: 'retirementGrowth',
    xAxis: 'Age',
    yAxis: 'Balance',
    lines: ['Savings', 'Target'],
    showMilestones: true,
  },
  relatedCalculators: [
    '401k-calculator',
    'roth-ira',
    'compound-interest',
    'social-security',
    'pension-calculator',
  ],
  localizedContent: {
    en: {
      title: 'Retirement Calculator - Plan Your Financial Future',
      description: 'Calculate how much you need to save for retirement and whether you\'re on track to meet your retirement goals.',
      keywords: ['retirement calculator', 'retirement planning', 'retirement savings', '401k', 'pension', 'financial planning'],
      faq: [
        {
          question: 'How much do I need to retire?',
          answer: 'A common rule is to have 25x your annual expenses saved (4% withdrawal rate). This calculator helps determine your specific needs based on your goals.',
        },
        {
          question: 'What is the 4% rule?',
          answer: 'The 4% rule suggests you can withdraw 4% of your retirement savings annually (adjusted for inflation) without running out of money for 30 years.',
        },
        {
          question: 'When should I start saving for retirement?',
          answer: 'Start as early as possible. Due to compound interest, starting at 25 vs 35 can double your retirement savings with the same monthly contribution.',
        },
        {
          question: 'How much should I contribute monthly?',
          answer: 'Aim for 10-15% of gross income minimum. With employer matching, try to contribute enough to get the full match - it\'s free money.',
        },
        {
          question: 'Should I use pre-tax or Roth accounts?',
          answer: 'Pre-tax (traditional 401k/IRA) reduces current taxes. Roth accounts provide tax-free retirement income. Consider your current vs future tax rates.',
        },
      ],
      article: {
        title: 'Complete Guide to Retirement Planning',
        introduction: 'Retirement planning is about ensuring financial security in your golden years. Starting early and understanding the fundamentals can make the difference between a comfortable and stressful retirement.',
        sections: [
          {
            heading: 'The Three-Legged Stool',
            content: 'Traditional retirement planning relies on three sources: Social Security, employer pensions, and personal savings. With pensions declining, personal savings are increasingly critical.',
          },
          {
            heading: 'Account Types and Tax Benefits',
            content: '401(k): Employer-sponsored, often with matching. IRA: Individual account with tax benefits. Roth versions: Tax-free growth and withdrawals. HSA: Triple tax advantage for healthcare.',
          },
          {
            heading: 'Investment Strategy by Age',
            content: '20s-30s: Aggressive growth (80-90% stocks). 40s-50s: Balanced approach (60-70% stocks). 60s+: Capital preservation (30-50% stocks). Adjust based on risk tolerance.',
          },
          {
            heading: 'Common Retirement Mistakes',
            content: 'Starting too late, not getting employer match, early withdrawals with penalties, ignoring inflation, underestimating healthcare costs, no estate planning.',
          },
        ],
        conclusion: 'Use our calculator to assess your retirement readiness. Remember, it\'s never too early to start or too late to improve your retirement planning.',
      },
    },
    th: {
      title: 'คำนวณเงินเกษียณ - วางแผนอนาคตทางการเงิน',
      description: 'คำนวณเงินที่ต้องเก็บสำหรับเกษียณและตรวจสอบว่าคุณอยู่ในเส้นทางที่จะบรรลุเป้าหมายหรือไม่',
      keywords: ['คำนวณเกษียณ', 'วางแผนเกษียณ', 'เงินออมเกษียณ', 'กองทุนสำรองเลี้ยงชีพ', 'บำนาญ'],
      faq: [
        {
          question: 'ต้องมีเงินเท่าไรถึงจะเกษียณได้?',
          answer: 'หลักทั่วไปคือมีเงิน 25 เท่าของค่าใช้จ่ายต่อปี (ถอน 4% ต่อปี) เครื่องคำนวณนี้ช่วยหาจำนวนที่เหมาะกับคุณ',
        },
        {
          question: 'กฎ 4% คืออะไร?',
          answer: 'กฎ 4% แนะนำให้ถอนเงิน 4% ของเงินเกษียณต่อปี (ปรับตามเงินเฟ้อ) จะใช้ได้ 30 ปีโดยไม่หมด',
        },
        {
          question: 'ควรเริ่มเก็บเงินเกษียณเมื่อไร?',
          answer: 'เริ่มเร็วที่สุดเท่าที่ทำได้ เริ่มอายุ 25 vs 35 อาจได้เงินเกษียณมากเป็น 2 เท่าด้วยการออมเท่ากัน',
        },
        {
          question: 'ควรออมเดือนละเท่าไร?',
          answer: 'อย่างน้อย 10-15% ของรายได้ ถ้ามีกองทุนสำรองเลี้ยงชีพ พยายามสมทบให้ได้เต็มที่บริษัทแมตช์',
        },
        {
          question: 'เลือก PVD, RMF หรือ SSF?',
          answer: 'PVD: บริษัทร่วมจ่าย RMF: ลดหย่อนภาษีสูง ต้องถือนาน SSF: ลดหย่อนภาษี ถือสั้นกว่า ควรมีหลายประเภท',
        },
      ],
      article: {
        title: 'คู่มือวางแผนเกษียณฉบับสมบูรณ์',
        introduction: 'การวางแผนเกษียณคือการสร้างความมั่นคงทางการเงินในบั้นปลายชีวิต เริ่มเร็วและเข้าใจพื้นฐานจะช่วยให้เกษียณอย่างสบายใจ',
        sections: [
          {
            heading: 'เสาหลัก 3 ต้นของเงินเกษียณ',
            content: 'ประกันสังคม บำเหน็จบำนาญ และเงินออมส่วนตัว ปัจจุบันบำนาญลดลง เงินออมส่วนตัวจึงสำคัญมาก',
          },
          {
            heading: 'ประเภทบัญชีและสิทธิประโยชน์ทางภาษี',
            content: 'PVD: กองทุนสำรองเลี้ยงชีพ นายจ้างร่วมจ่าย RMF/SSF: ลดหย่อนภาษี LTF: ลงทุนหุ้นลดภาษี ประกันชีวิต: คุ้มครองและลดภาษี',
          },
          {
            heading: 'กลยุทธ์การลงทุนตามวัย',
            content: '20-30 ปี: เน้นเติบโต (หุ้น 80-90%) 40-50 ปี: สมดุล (หุ้น 60-70%) 60+ ปี: รักษาเงินต้น (หุ้น 30-50%)',
          },
          {
            heading: 'ข้อผิดพลาดที่พบบ่อย',
            content: 'เริ่มช้า ไม่รับเงินแมตช์จากบริษัท ถอนก่อนเกษียณเสียภาษี ลืมคิดเงินเฟ้อ ประมาทค่ารักษาพยาบาล ไม่ทำพินัยกรรม',
          },
        ],
        conclusion: 'ใช้เครื่องคำนวณประเมินความพร้อมเกษียณ จำไว้ว่าไม่มีคำว่าเร็วเกินไปที่จะเริ่ม หรือสายเกินไปที่จะปรับปรุง',
      },
    },
  },
};