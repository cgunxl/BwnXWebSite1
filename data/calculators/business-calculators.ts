import { Calculator } from '@/lib/types/calculator';

export const businessCalculators: Calculator[] = [
  {
    id: 'break-even-calculator',
    slug: 'break-even-calculator',
    category: 'business',
    icon: '📊',
    color: '#F97316',
    inputs: [
      {
        key: 'fixedCosts',
        label: 'Fixed Costs',
        type: 'number',
        defaultValue: 10000,
        min: 0,
        max: 10000000,
        step: 0.01,
        required: true,
        unit: '$',
        tooltip: 'Rent, salaries, insurance, etc.'
      },
      {
        key: 'variableCostPerUnit',
        label: 'Variable Cost Per Unit',
        type: 'number',
        defaultValue: 25,
        min: 0,
        max: 100000,
        step: 0.01,
        required: true,
        unit: '$',
        tooltip: 'Materials, labor, shipping per unit'
      },
      {
        key: 'pricePerUnit',
        label: 'Selling Price Per Unit',
        type: 'number',
        defaultValue: 50,
        min: 0,
        max: 100000,
        step: 0.01,
        required: true,
        unit: '$'
      },
      {
        key: 'targetProfit',
        label: 'Target Profit (Optional)',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 10000000,
        step: 0.01,
        required: false,
        unit: '$',
        tooltip: 'Desired profit amount'
      },
      {
        key: 'currentUnits',
        label: 'Current Units Sold',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 1000000,
        step: 1,
        required: false,
        tooltip: 'For comparison'
      }
    ],
    outputs: [
      {
        key: 'breakEvenUnits',
        label: 'Break-Even Units',
        format: 'number',
        decimals: 0,
        description: 'Units to break even',
        highlight: true
      },
      {
        key: 'breakEvenRevenue',
        label: 'Break-Even Revenue',
        format: 'currency',
        decimals: 2,
        description: 'Revenue at break-even',
        highlight: true
      },
      {
        key: 'contributionMargin',
        label: 'Contribution Margin',
        format: 'currency',
        decimals: 2,
        description: 'Per unit profit contribution'
      },
      {
        key: 'contributionMarginRatio',
        label: 'Contribution Margin Ratio',
        format: 'percentage',
        decimals: 2,
        description: 'Margin as percentage'
      },
      {
        key: 'targetUnits',
        label: 'Units for Target Profit',
        format: 'number',
        decimals: 0,
        description: 'Units needed for target'
      },
      {
        key: 'currentProfit',
        label: 'Current Profit/Loss',
        format: 'currency',
        decimals: 2,
        description: 'At current sales level'
      },
      {
        key: 'marginOfSafety',
        label: 'Margin of Safety',
        format: 'percentage',
        decimals: 2,
        description: 'Buffer above break-even'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate contribution margin
          const contributionMargin = pricePerUnit - variableCostPerUnit;
          const contributionMarginRatio = (contributionMargin / pricePerUnit) * 100;
          
          // Calculate break-even point
          let breakEvenUnits = 0;
          let breakEvenRevenue = 0;
          
          if (contributionMargin > 0) {
            breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
            breakEvenRevenue = breakEvenUnits * pricePerUnit;
          } else {
            breakEvenUnits = Infinity;
            breakEvenRevenue = Infinity;
          }
          
          // Calculate units for target profit
          let targetUnits = 0;
          if (contributionMargin > 0 && targetProfit > 0) {
            targetUnits = Math.ceil((fixedCosts + targetProfit) / contributionMargin);
          } else if (targetProfit === 0) {
            targetUnits = breakEvenUnits;
          }
          
          // Calculate current profit/loss
          const currentRevenue = currentUnits * pricePerUnit;
          const currentVariableCosts = currentUnits * variableCostPerUnit;
          const currentProfit = currentRevenue - currentVariableCosts - fixedCosts;
          
          // Calculate margin of safety
          let marginOfSafety = 0;
          if (currentUnits > breakEvenUnits) {
            marginOfSafety = ((currentUnits - breakEvenUnits) / currentUnits) * 100;
          }
          
          return {
            breakEvenUnits,
            breakEvenRevenue,
            contributionMargin,
            contributionMarginRatio,
            targetUnits,
            currentProfit,
            marginOfSafety
          };
        `,
        description: 'Calculate break-even point and profitability metrics'
      }
    ],
    graph: {
      type: 'line',
      title: 'Break-Even Analysis',
      xAxis: 'Units Sold',
      yAxis: 'Amount ($)',
      data: ['revenue', 'totalCosts', 'profit'],
      colors: ['#10B981', '#EF4444', '#3B82F6']
    },
    localizedContent: {
      en: {
        title: 'Break-Even Calculator',
        description: 'Calculate break-even point, contribution margin, and profitability metrics',
        keywords: ['break even calculator', 'break even analysis', 'contribution margin', 'business calculator', 'profitability'],
        faq: [
          {
            question: 'What is break-even point?',
            answer: 'The break-even point is where total revenue equals total costs, resulting in zero profit or loss. It\'s the minimum sales needed to cover all expenses.'
          },
          {
            question: 'What is contribution margin?',
            answer: 'Contribution margin is the selling price minus variable cost per unit. It shows how much each unit contributes to covering fixed costs and generating profit.'
          },
          {
            question: 'How do I reduce my break-even point?',
            answer: 'Lower break-even by: reducing fixed costs, decreasing variable costs, increasing selling price, or improving efficiency. Focus on the most impactful changes.'
          },
          {
            question: 'What is margin of safety?',
            answer: 'Margin of safety is how much sales can drop before reaching break-even. Higher margin means lower risk. Aim for at least 20-30%.'
          }
        ],
        article: {
          title: 'Understanding Break-Even Analysis',
          introduction: 'Break-even analysis is crucial for business planning, pricing decisions, and profitability assessment.',
          sections: [
            {
              heading: 'Why Break-Even Matters',
              content: 'Knowing your break-even helps set sales targets, evaluate business viability, make pricing decisions, and assess risk.'
            },
            {
              heading: 'Improving Profitability',
              content: 'Focus on contribution margin. Small improvements in price or cost reduction have multiplied effects on profit due to operating leverage.'
            },
            {
              heading: 'Limitations',
              content: 'Assumes linear relationships, constant prices/costs, and single product. Real businesses have complexities like economies of scale and product mix.'
            }
          ],
          conclusion: 'Regular break-even analysis helps monitor business health and guide strategic decisions.',
          wordCount: 320
        }
      },
      th: {
        title: 'คำนวณจุดคุ้มทุน',
        description: 'คำนวณจุดคุ้มทุน กำไรส่วนเกิน และตัวชี้วัดความสามารถในการทำกำไร',
        keywords: ['คำนวณจุดคุ้มทุน', 'วิเคราะห์จุดคุ้มทุน', 'กำไรส่วนเกิน', 'คำนวณธุรกิจ'],
        faq: [
          {
            question: 'จุดคุ้มทุนคืออะไร?',
            answer: 'จุดคุ้มทุนคือจุดที่รายได้รวมเท่ากับต้นทุนรวม ไม่มีกำไรหรือขาดทุน เป็นยอดขายขั้นต่ำที่ครอบคลุมค่าใช้จ่ายทั้งหมด'
          },
          {
            question: 'กำไรส่วนเกินคืออะไร?',
            answer: 'กำไรส่วนเกินคือราคาขายลบต้นทุนผันแปรต่อหน่วย แสดงว่าแต่ละหน่วยช่วยครอบคลุมต้นทุนคงที่และสร้างกำไรเท่าไหร่'
          }
        ],
        article: {
          title: 'เข้าใจการวิเคราะห์จุดคุ้มทุน',
          introduction: 'การวิเคราะห์จุดคุ้มทุนสำคัญสำหรับการวางแผนธุรกิจ การตัดสินใจด้านราคา และการประเมินความสามารถในการทำกำไร',
          sections: [
            {
              heading: 'ทำไมจุดคุ้มทุนถึงสำคัญ',
              content: 'การรู้จุดคุ้มทุนช่วยตั้งเป้าหมายการขาย ประเมินความเป็นไปได้ของธุรกิจ ตัดสินใจด้านราคา และประเมินความเสี่ยง'
            }
          ],
          conclusion: 'การวิเคราะห์จุดคุ้มทุนสม่ำเสมอช่วยติดตามสุขภาพธุรกิจและนำทางการตัดสินใจเชิงกลยุทธ์',
          wordCount: 280
        }
      }
    }
  },
  {
    id: 'roi-calculator',
    slug: 'roi-calculator',
    category: 'business',
    icon: '📈',
    color: '#10B981',
    inputs: [
      {
        key: 'initialInvestment',
        label: 'Initial Investment',
        type: 'number',
        defaultValue: 10000,
        min: 0,
        max: 100000000,
        step: 0.01,
        required: true,
        unit: '$'
      },
      {
        key: 'finalValue',
        label: 'Final Value',
        type: 'number',
        defaultValue: 15000,
        min: 0,
        max: 100000000,
        step: 0.01,
        required: true,
        unit: '$',
        tooltip: 'Current or expected value'
      },
      {
        key: 'additionalCosts',
        label: 'Additional Costs',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 100000000,
        step: 0.01,
        required: false,
        unit: '$',
        tooltip: 'Maintenance, fees, etc.'
      },
      {
        key: 'timeperiod',
        label: 'Time Period',
        type: 'number',
        defaultValue: 1,
        min: 0.1,
        max: 100,
        step: 0.1,
        required: true,
        unit: 'years'
      },
      {
        key: 'includeAnnualized',
        label: 'Calculate Annualized ROI',
        type: 'boolean',
        defaultValue: true,
        required: false
      }
    ],
    outputs: [
      {
        key: 'roi',
        label: 'ROI',
        format: 'percentage',
        decimals: 2,
        description: 'Return on Investment',
        highlight: true
      },
      {
        key: 'netProfit',
        label: 'Net Profit',
        format: 'currency',
        decimals: 2,
        description: 'Total profit',
        highlight: true
      },
      {
        key: 'annualizedROI',
        label: 'Annualized ROI',
        format: 'percentage',
        decimals: 2,
        description: 'Yearly return rate'
      },
      {
        key: 'totalInvestment',
        label: 'Total Investment',
        format: 'currency',
        decimals: 2,
        description: 'Initial + additional costs'
      },
      {
        key: 'profitMargin',
        label: 'Profit Margin',
        format: 'percentage',
        decimals: 2,
        description: 'Profit as % of revenue'
      },
      {
        key: 'paybackPeriod',
        label: 'Payback Period',
        format: 'text',
        description: 'Time to recover investment'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate total investment
          const totalInvestment = initialInvestment + additionalCosts;
          
          // Calculate net profit
          const netProfit = finalValue - totalInvestment;
          
          // Calculate ROI
          const roi = (netProfit / totalInvestment) * 100;
          
          // Calculate annualized ROI if time period is not 1 year
          let annualizedROI = roi;
          if (includeAnnualized && timeperiod !== 1) {
            // Using compound annual growth rate formula
            annualizedROI = (Math.pow(finalValue / totalInvestment, 1 / timeperiod) - 1) * 100;
          }
          
          // Calculate profit margin
          const profitMargin = finalValue > 0 ? (netProfit / finalValue) * 100 : 0;
          
          // Calculate payback period
          let paybackPeriod = 'Never';
          if (netProfit > 0) {
            const monthlyReturn = netProfit / (timeperiod * 12);
            const paybackMonths = totalInvestment / monthlyReturn;
            
            if (paybackMonths < 12) {
              paybackPeriod = Math.round(paybackMonths) + ' months';
            } else {
              paybackPeriod = (paybackMonths / 12).toFixed(1) + ' years';
            }
          } else if (netProfit === 0) {
            paybackPeriod = 'Break even';
          }
          
          return {
            roi,
            netProfit,
            annualizedROI,
            totalInvestment,
            profitMargin,
            paybackPeriod
          };
        `,
        description: 'Calculate return on investment metrics'
      }
    ],
    localizedContent: {
      en: {
        title: 'ROI Calculator - Return on Investment',
        description: 'Calculate ROI, annualized returns, and payback period for investments',
        keywords: ['roi calculator', 'return on investment', 'investment calculator', 'profit calculator', 'business roi'],
        faq: [
          {
            question: 'What is a good ROI?',
            answer: 'Good ROI varies by industry and risk. Stock market averages 10% annually. Business projects often target 15-20%. Higher risk should yield higher returns.'
          },
          {
            question: 'ROI vs Annualized ROI?',
            answer: 'ROI is total return. Annualized ROI is yearly average, useful for comparing investments of different durations. It uses compound growth formula.'
          },
          {
            question: 'What costs should I include?',
            answer: 'Include all costs: purchase price, implementation, training, maintenance, opportunity cost. Missing hidden costs overstates ROI.'
          },
          {
            question: 'How is ROI different from profit?',
            answer: 'Profit is absolute gain in dollars. ROI is relative gain as percentage of investment. ROI helps compare investments of different sizes.'
          }
        ],
        article: {
          title: 'Maximizing Return on Investment',
          introduction: 'ROI is the universal metric for evaluating investment performance across all business decisions.',
          sections: [
            {
              heading: 'Calculating True ROI',
              content: 'Include all costs: direct, indirect, and opportunity costs. Consider time value of money for long-term investments using NPV or IRR.'
            },
            {
              heading: 'ROI Benchmarks',
              content: 'Marketing: 5:1 ratio (400% ROI), Real Estate: 8-12% annually, Stock Market: 10% historical average, Startups: 20-30% target.'
            },
            {
              heading: 'Improving ROI',
              content: 'Focus on high-margin activities, reduce costs without sacrificing quality, accelerate returns, and diversify to manage risk.'
            }
          ],
          conclusion: 'ROI analysis guides smart investment decisions but consider qualitative factors too.',
          wordCount: 300
        }
      }
    }
  },
  {
    id: 'profit-margin-calculator',
    slug: 'profit-margin-calculator',
    category: 'business',
    icon: '💰',
    color: '#3B82F6',
    inputs: [
      {
        key: 'revenue',
        label: 'Revenue/Sales',
        type: 'number',
        defaultValue: 100000,
        min: 0,
        max: 1000000000,
        step: 0.01,
        required: true,
        unit: '$'
      },
      {
        key: 'costOfGoods',
        label: 'Cost of Goods Sold (COGS)',
        type: 'number',
        defaultValue: 60000,
        min: 0,
        max: 1000000000,
        step: 0.01,
        required: true,
        unit: '$',
        tooltip: 'Direct costs of producing goods/services'
      },
      {
        key: 'operatingExpenses',
        label: 'Operating Expenses',
        type: 'number',
        defaultValue: 20000,
        min: 0,
        max: 1000000000,
        step: 0.01,
        required: false,
        unit: '$',
        tooltip: 'Rent, salaries, utilities, etc.'
      },
      {
        key: 'otherExpenses',
        label: 'Other Expenses',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 1000000000,
        step: 0.01,
        required: false,
        unit: '$',
        tooltip: 'Interest, taxes, etc.'
      },
      {
        key: 'targetMargin',
        label: 'Target Net Margin',
        type: 'number',
        defaultValue: 15,
        min: 0,
        max: 100,
        step: 0.1,
        required: false,
        unit: '%',
        tooltip: 'Desired profit margin'
      }
    ],
    outputs: [
      {
        key: 'grossProfit',
        label: 'Gross Profit',
        format: 'currency',
        decimals: 2,
        description: 'Revenue - COGS'
      },
      {
        key: 'grossMargin',
        label: 'Gross Margin',
        format: 'percentage',
        decimals: 2,
        description: 'Gross profit %',
        highlight: true
      },
      {
        key: 'operatingProfit',
        label: 'Operating Profit',
        format: 'currency',
        decimals: 2,
        description: 'EBITDA'
      },
      {
        key: 'operatingMargin',
        label: 'Operating Margin',
        format: 'percentage',
        decimals: 2,
        description: 'Operating profit %'
      },
      {
        key: 'netProfit',
        label: 'Net Profit',
        format: 'currency',
        decimals: 2,
        description: 'Bottom line'
      },
      {
        key: 'netMargin',
        label: 'Net Margin',
        format: 'percentage',
        decimals: 2,
        description: 'Net profit %',
        highlight: true
      },
      {
        key: 'targetRevenue',
        label: 'Revenue for Target Margin',
        format: 'currency',
        decimals: 2,
        description: 'Needed for target %'
      },
      {
        key: 'markup',
        label: 'Markup',
        format: 'percentage',
        decimals: 2,
        description: 'Price markup over cost'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate gross profit and margin
          const grossProfit = revenue - costOfGoods;
          const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
          
          // Calculate operating profit and margin
          const operatingProfit = grossProfit - operatingExpenses;
          const operatingMargin = revenue > 0 ? (operatingProfit / revenue) * 100 : 0;
          
          // Calculate net profit and margin
          const netProfit = operatingProfit - otherExpenses;
          const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
          
          // Calculate revenue needed for target margin
          const totalExpenses = costOfGoods + operatingExpenses + otherExpenses;
          const targetRevenue = targetMargin > 0 && targetMargin < 100 
            ? totalExpenses / (1 - targetMargin / 100)
            : revenue;
          
          // Calculate markup
          const totalCost = costOfGoods + operatingExpenses + otherExpenses;
          const markup = totalCost > 0 ? ((revenue - totalCost) / totalCost) * 100 : 0;
          
          return {
            grossProfit,
            grossMargin,
            operatingProfit,
            operatingMargin,
            netProfit,
            netMargin,
            targetRevenue,
            markup
          };
        `,
        description: 'Calculate profit margins at different levels'
      }
    ],
    localizedContent: {
      en: {
        title: 'Profit Margin Calculator',
        description: 'Calculate gross, operating, and net profit margins for your business',
        keywords: ['profit margin calculator', 'gross margin', 'net margin', 'markup calculator', 'profit calculator'],
        faq: [
          {
            question: 'What\'s the difference between margin and markup?',
            answer: 'Margin is profit as % of revenue (profit/revenue). Markup is profit as % of cost (profit/cost). 50% markup = 33.3% margin.'
          },
          {
            question: 'What are good profit margins?',
            answer: 'Varies by industry: Retail 2-5%, Restaurants 3-5%, Software 70-90% gross. Net margins: 5% average, 10% good, 20% excellent.'
          },
          {
            question: 'Gross vs Operating vs Net margin?',
            answer: 'Gross: after COGS. Operating: after operating expenses. Net: after all expenses including taxes. Each shows different efficiency aspects.'
          }
        ],
        article: {
          title: 'Understanding Profit Margins',
          introduction: 'Profit margins reveal business efficiency and pricing power at different operational levels.',
          sections: [
            {
              heading: 'Margin Analysis',
              content: 'Gross margin shows production efficiency. Operating margin reveals operational efficiency. Net margin indicates overall profitability.'
            },
            {
              heading: 'Improving Margins',
              content: 'Increase prices strategically, reduce COGS through efficiency, optimize operating expenses, leverage economies of scale.'
            }
          ],
          conclusion: 'Monitor all margin levels to identify improvement opportunities and maintain competitiveness.',
          wordCount: 280
        }
      }
    }
  }
];

// Export function to get all business calculators
export function getBusinessCalculators(): Calculator[] {
  return businessCalculators;
}

// Export function to get calculator by slug
export function getBusinessCalculatorBySlug(slug: string): Calculator | undefined {
  return businessCalculators.find(calc => calc.slug === slug);
}