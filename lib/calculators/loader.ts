// Dynamic calculator loader
import { Calculator } from '@/lib/types/calculator';
import { loanCalculator } from './implementations/finance/loan-calculator';
import { mortgageCalculator } from './implementations/finance/mortgage-calculator';
import { carLoanCalculator } from './implementations/finance/car-loan-calculator';
import { creditCardInterestCalculator } from './implementations/finance/credit-card-interest';
import { compoundInterestCalculator } from './implementations/finance/compound-interest';
import { savingsGoalCalculator } from './implementations/finance/savings-goal';
import { retirementCalculator } from './implementations/finance/retirement-calculator';
import { bmiCalculator } from './implementations/health/bmi-calculator';
import { calorieCalculator } from './implementations/health/calorie-calculator';
import { createCalculator } from './factory';
import { discoverSourcesForCalculator } from '@/lib/discovery/search';
import { extractFromPages } from '@/lib/discovery/process';

// Map of manually implemented calculators (for special cases)
const calculatorImplementations: Record<string, Calculator> = {
  // Finance calculators
  'loan-calculator': loanCalculator,
  'mortgage-calculator': mortgageCalculator,
  'car-loan-calculator': carLoanCalculator,
  'credit-card-interest': creditCardInterestCalculator,
  'compound-interest': compoundInterestCalculator,
  'savings-goal': savingsGoalCalculator,
  'retirement-calculator': retirementCalculator,
  // Health calculators
  'bmi-calculator': bmiCalculator,
  'calorie-calculator': calorieCalculator,
};

export async function loadCalculatorData(slug: string): Promise<Calculator | null> {
  // Check if we have a manually implemented calculator
  if (calculatorImplementations[slug]) {
    const calc = calculatorImplementations[slug];
    // Enrich with references lazily (best-effort, no external SDK)
    if (!calc.localizedContent.en.references || calc.localizedContent.en.references.length < 2) {
      const pages = await discoverSourcesForCalculator(slug, { locale: 'en', category: calc.category, limitPerQuery: 5 });
      const extracted = extractFromPages(pages, slug);
      for (const loc of Object.keys(calc.localizedContent)) {
        calc.localizedContent[loc].references = extracted.references;
      }
    }
    return calc;
  }

  // Use factory to create calculator from definition
  const calculator = createCalculator(slug);
  if (calculator) {
    // Enrich with references (minimum 2)
    const pages = await discoverSourcesForCalculator(slug, { locale: 'en', category: calculator.category, limitPerQuery: 5 });
    const extracted = extractFromPages(pages, slug);
    for (const loc of Object.keys(calculator.localizedContent)) {
      calculator.localizedContent[loc].references = extracted.references;
    }
    return calculator;
  }

  // Fallback: generate a basic calculator structure
  return generateCalculatorFromSlug(slug);
}

function generateCalculatorFromSlug(slug: string): Calculator | null {
  // This is a fallback generator for calculators not yet implemented
  // It creates a basic structure that can be used for any calculator
  
  const name = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const calculator: Calculator = {
    id: slug,
    category: detectCategory(slug),
    slug: slug,
    icon: '🧮',
    color: 'bg-blue-500',
    inputs: generateDefaultInputs(slug),
    outputs: generateDefaultOutputs(slug),
    formulas: [],
    relatedCalculators: [],
    localizedContent: generateLocalizedContent(slug, name),
    tags: [slug.replace('-', ' ')],
    difficulty: 'basic',
    popularity: 50,
  };

  return calculator;
}

function detectCategory(slug: string): any {
  if (slug.includes('loan') || slug.includes('mortgage') || slug.includes('tax') || slug.includes('interest')) {
    return 'finance';
  }
  if (slug.includes('bmi') || slug.includes('calorie') || slug.includes('health') || slug.includes('weight')) {
    return 'health';
  }
  if (slug.includes('gpa') || slug.includes('grade') || slug.includes('math')) {
    return 'education';
  }
  // Add more category detection...
  return 'miscellaneous';
}

function generateDefaultInputs(slug: string): any[] {
  // Generate basic inputs based on calculator type
  const inputs = [
    {
      key: 'value1',
      label: 'Value 1',
      type: 'number',
      placeholder: 'Enter value',
      required: true,
    },
    {
      key: 'value2',
      label: 'Value 2',
      type: 'number',
      placeholder: 'Enter value',
      required: true,
    },
  ];

  return inputs;
}

function generateDefaultOutputs(slug: string): any[] {
  return [
    {
      key: 'result',
      label: 'Result',
      format: 'number',
      precision: 2,
    },
  ];
}

function generateLocalizedContent(slug: string, name: string): any {
  return {
    en: {
      title: name,
      description: `Calculate ${name.toLowerCase()} quickly and accurately with our free online tool.`,
      keywords: [slug, 'calculator', 'online', 'free'],
      faq: [
        {
          question: `What is ${name}?`,
          answer: `${name} is a tool that helps you calculate specific values based on your inputs.`,
        },
        {
          question: `How to use ${name}?`,
          answer: `Simply enter the required values and click Calculate to get your results instantly.`,
        },
      ],
      article: {
        title: `Understanding ${name}`,
        introduction: `This comprehensive guide will help you understand how to use the ${name} effectively.`,
        sections: [
          {
            heading: 'Overview',
            content: `The ${name} is designed to provide quick and accurate calculations for your needs.`,
          },
        ],
        conclusion: `Use our ${name} to make informed decisions based on accurate calculations.`,
        wordCount: 500,
      },
      examples: [],
      references: [],
    },
    th: {
      title: `เครื่องคำนวณ${name}`,
      description: `คำนวณ${name}อย่างรวดเร็วและแม่นยำด้วยเครื่องมือออนไลน์ฟรีของเรา`,
      keywords: [slug, 'เครื่องคิดเลข', 'ออนไลน์', 'ฟรี'],
      faq: [
        {
          question: `${name} คืออะไร?`,
          answer: `${name} เป็นเครื่องมือที่ช่วยคุณคำนวณค่าเฉพาะตามข้อมูลที่คุณป้อน`,
        },
      ],
      article: {
        title: `ทำความเข้าใจ${name}`,
        introduction: `คู่มือนี้จะช่วยให้คุณเข้าใจวิธีใช้${name}อย่างมีประสิทธิภาพ`,
        sections: [
          {
            heading: 'ภาพรวม',
            content: `${name}ถูกออกแบบมาเพื่อให้การคำนวณที่รวดเร็วและแม่นยำสำหรับความต้องการของคุณ`,
          },
        ],
        conclusion: `ใช้${name}ของเราเพื่อตัดสินใจอย่างมีข้อมูลจากการคำนวณที่แม่นยำ`,
        wordCount: 500,
      },
      examples: [],
      references: [],
    },
  };
}