import { Calculator } from '@/lib/types/calculator';

export const householdCalculators: Calculator[] = [
  {
    id: 'home-budget-calculator',
    slug: 'home-budget-calculator',
    category: 'household',
    icon: '🏠',
    color: '#EC4899',
    inputs: [
      {
        key: 'monthlyIncome',
        label: 'Monthly Income (After Tax)',
        type: 'number',
        defaultValue: 5000,
        min: 0,
        max: 100000,
        step: 100,
        required: true,
        unit: '$'
      },
      {
        key: 'housing',
        label: 'Housing (Rent/Mortgage)',
        type: 'number',
        defaultValue: 1500,
        min: 0,
        max: 50000,
        step: 50,
        required: true,
        unit: '$'
      },
      {
        key: 'utilities',
        label: 'Utilities',
        type: 'number',
        defaultValue: 200,
        min: 0,
        max: 1000,
        step: 10,
        required: true,
        unit: '$',
        tooltip: 'Electric, gas, water, internet'
      },
      {
        key: 'groceries',
        label: 'Groceries & Food',
        type: 'number',
        defaultValue: 600,
        min: 0,
        max: 5000,
        step: 50,
        required: true,
        unit: '$'
      },
      {
        key: 'transportation',
        label: 'Transportation',
        type: 'number',
        defaultValue: 400,
        min: 0,
        max: 2000,
        step: 25,
        required: true,
        unit: '$',
        tooltip: 'Car payment, gas, insurance, public transit'
      },
      {
        key: 'insurance',
        label: 'Insurance',
        type: 'number',
        defaultValue: 300,
        min: 0,
        max: 2000,
        step: 25,
        required: false,
        unit: '$',
        tooltip: 'Health, life, disability'
      },
      {
        key: 'debt',
        label: 'Debt Payments',
        type: 'number',
        defaultValue: 200,
        min: 0,
        max: 5000,
        step: 25,
        required: false,
        unit: '$',
        tooltip: 'Credit cards, loans'
      },
      {
        key: 'entertainment',
        label: 'Entertainment',
        type: 'number',
        defaultValue: 200,
        min: 0,
        max: 2000,
        step: 25,
        required: false,
        unit: '$'
      },
      {
        key: 'savings',
        label: 'Savings Goal',
        type: 'slider',
        defaultValue: 20,
        min: 0,
        max: 50,
        step: 5,
        required: false,
        unit: '%',
        tooltip: 'Percentage of income to save'
      },
      {
        key: 'otherExpenses',
        label: 'Other Expenses',
        type: 'number',
        defaultValue: 200,
        min: 0,
        max: 5000,
        step: 25,
        required: false,
        unit: '$'
      }
    ],
    outputs: [
      {
        key: 'totalExpenses',
        label: 'Total Monthly Expenses',
        format: 'currency',
        decimals: 2,
        description: 'All expenses combined',
        highlight: true
      },
      {
        key: 'remainingIncome',
        label: 'Remaining Income',
        format: 'currency',
        decimals: 2,
        description: 'After expenses',
        highlight: true
      },
      {
        key: 'savingsAmount',
        label: 'Savings Target',
        format: 'currency',
        decimals: 2,
        description: 'Monthly savings goal'
      },
      {
        key: 'actualSavings',
        label: 'Actual Savings Possible',
        format: 'currency',
        decimals: 2,
        description: 'What you can save'
      },
      {
        key: 'housingRatio',
        label: 'Housing Cost Ratio',
        format: 'percentage',
        decimals: 1,
        description: 'Of income'
      },
      {
        key: 'budgetStatus',
        label: 'Budget Status',
        format: 'text',
        description: 'Financial health',
        highlight: true
      },
      {
        key: 'recommendations',
        label: 'Budget Recommendations',
        format: 'text',
        description: 'Improvement suggestions'
      },
      {
        key: 'yearlyProjection',
        label: 'Yearly Savings',
        format: 'currency',
        decimals: 0,
        description: 'Annual savings potential'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate total expenses
          const totalExpenses = housing + utilities + groceries + transportation + 
                               (insurance || 0) + (debt || 0) + (entertainment || 0) + (otherExpenses || 0);
          
          // Calculate remaining income
          const remainingIncome = monthlyIncome - totalExpenses;
          
          // Calculate savings
          const savingsAmount = monthlyIncome * (savings / 100);
          const actualSavings = Math.max(0, remainingIncome);
          
          // Calculate ratios
          const housingRatio = monthlyIncome > 0 ? (housing / monthlyIncome) * 100 : 0;
          
          // Budget status analysis
          let budgetStatus = '';
          const expenseRatio = monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 100;
          
          if (remainingIncome < 0) {
            budgetStatus = 'Over Budget: Expenses exceed income by $' + Math.abs(remainingIncome).toFixed(0);
          } else if (expenseRatio > 90) {
            budgetStatus = 'Tight: Only ' + (100 - expenseRatio).toFixed(0) + '% margin';
          } else if (expenseRatio > 75) {
            budgetStatus = 'Moderate: ' + (100 - expenseRatio).toFixed(0) + '% available for savings';
          } else {
            budgetStatus = 'Healthy: ' + (100 - expenseRatio).toFixed(0) + '% available for savings/investments';
          }
          
          // Recommendations based on common budgeting rules
          const recommendations = [];
          
          // 50/30/20 rule check
          const needsPercent = ((housing + utilities + groceries + insurance + debt) / monthlyIncome) * 100;
          const wantsPercent = ((entertainment + otherExpenses) / monthlyIncome) * 100;
          const savingsPercent = (actualSavings / monthlyIncome) * 100;
          
          if (housingRatio > 30) {
            recommendations.push('Housing exceeds 30% rule - consider downsizing');
          }
          
          if (needsPercent > 50) {
            recommendations.push('Essential expenses exceed 50% - review necessities');
          }
          
          if (savingsPercent < 20) {
            recommendations.push('Save 20% minimum - reduce discretionary spending');
          }
          
          if (debt > monthlyIncome * 0.2) {
            recommendations.push('High debt payments - focus on debt reduction');
          }
          
          if (remainingIncome < monthlyIncome * 0.1) {
            recommendations.push('Low emergency buffer - build 3-6 month fund');
          }
          
          const yearlyProjection = actualSavings * 12;
          
          return {
            totalExpenses,
            remainingIncome,
            savingsAmount,
            actualSavings,
            housingRatio,
            budgetStatus,
            recommendations: recommendations.slice(0, 3).join('; ') || 'Budget looks good! Consider investing surplus',
            yearlyProjection
          };
        `,
        description: 'Calculate monthly budget and savings'
      }
    ],
    localizedContent: {
      en: {
        title: 'Home Budget Calculator',
        description: 'Plan your monthly budget, track expenses, and calculate savings potential',
        keywords: ['budget calculator', 'home budget', 'monthly budget', 'expense tracker', 'savings calculator'],
        faq: [
          {
            question: 'What is the 50/30/20 budget rule?',
            answer: '50% for needs (housing, utilities, groceries), 30% for wants (entertainment, dining out), 20% for savings and debt repayment. Adjust based on your situation.'
          },
          {
            question: 'How much should housing cost?',
            answer: 'The 30% rule suggests spending no more than 30% of gross income on housing. In high-cost areas, up to 35-40% may be necessary, but compensate in other areas.'
          },
          {
            question: 'How much emergency fund do I need?',
            answer: '3-6 months of expenses minimum. Single income or unstable job: 6-12 months. Dual income stable jobs: 3 months may suffice. Build gradually.'
          },
          {
            question: 'What if I can\'t save 20%?',
            answer: 'Start with any amount, even 1%. Gradually increase by 1% every few months. Automate savings. Cut unnecessary subscriptions. Every dollar saved matters.'
          }
        ],
        article: {
          title: 'Master Your Home Budget',
          introduction: 'A budget is your financial roadmap. It helps you control spending, save for goals, and build wealth over time.',
          sections: [
            {
              heading: 'Creating Your Budget',
              content: 'Track all income and expenses for a month. Categorize spending. Set realistic limits. Use the 50/30/20 rule as a starting point, then adjust.'
            },
            {
              heading: 'Sticking to Your Budget',
              content: 'Automate fixed expenses and savings. Use cash envelopes for variable spending. Review weekly. Adjust as needed. Celebrate small wins.'
            },
            {
              heading: 'Common Mistakes',
              content: 'Being too restrictive, forgetting irregular expenses, not tracking small purchases, no emergency fund, not adjusting for life changes.'
            }
          ],
          conclusion: 'A budget isn\'t about restriction—it\'s about making your money work for your goals.',
          wordCount: 350
        }
      },
      th: {
        title: 'คำนวณงบประมาณครัวเรือน',
        description: 'วางแผนงบประมาณรายเดือน ติดตามค่าใช้จ่าย และคำนวณเงินออม',
        keywords: ['คำนวณงบประมาณ', 'งบครัวเรือน', 'งบรายเดือน', 'ติดตามค่าใช้จ่าย', 'คำนวณเงินออม'],
        faq: [
          {
            question: 'กฎ 50/30/20 คืออะไร?',
            answer: '50% สำหรับความจำเป็น (บ้าน อาหาร), 30% สำหรับความต้องการ (บันเทิง), 20% สำหรับการออมและชำระหนี้'
          },
          {
            question: 'ค่าบ้านควรเป็นเท่าไหร่?',
            answer: 'ไม่ควรเกิน 30% ของรายได้ ในเมืองใหญ่อาจถึง 35-40% แต่ต้องลดค่าใช้จ่ายอื่น'
          }
        ],
        article: {
          title: 'เชี่ยวชาญการจัดงบประมาณบ้าน',
          introduction: 'งบประมาณคือแผนที่ทางการเงิน ช่วยควบคุมการใช้จ่าย ออมเงิน และสร้างความมั่งคั่ง',
          sections: [
            {
              heading: 'สร้างงบประมาณ',
              content: 'บันทึกรายรับ-รายจ่าย 1 เดือน จัดหมวดหมู่ ตั้งขีดจำกัด ใช้กฎ 50/30/20 เป็นจุดเริ่มต้น'
            }
          ],
          conclusion: 'งบประมาณไม่ใช่การจำกัด แต่เป็นการทำให้เงินทำงานเพื่อเป้าหมายของคุณ',
          wordCount: 300
        }
      }
    }
  },
  {
    id: 'electricity-usage-calculator',
    slug: 'electricity-usage-calculator',
    category: 'household',
    icon: '⚡',
    color: '#F59E0B',
    inputs: [
      {
        key: 'applianceType',
        label: 'Appliance Type',
        type: 'select',
        defaultValue: 'custom',
        required: true,
        options: [
          { value: 'custom', label: 'Custom Appliance' },
          { value: 'refrigerator', label: 'Refrigerator (150W)' },
          { value: 'ac', label: 'Air Conditioner (2000W)' },
          { value: 'heater', label: 'Space Heater (1500W)' },
          { value: 'washer', label: 'Washing Machine (500W)' },
          { value: 'dryer', label: 'Clothes Dryer (3000W)' },
          { value: 'tv', label: 'TV (100W)' },
          { value: 'computer', label: 'Desktop Computer (300W)' },
          { value: 'laptop', label: 'Laptop (50W)' },
          { value: 'microwave', label: 'Microwave (1000W)' },
          { value: 'dishwasher', label: 'Dishwasher (1800W)' },
          { value: 'light-led', label: 'LED Light Bulb (10W)' },
          { value: 'light-cfl', label: 'CFL Bulb (15W)' },
          { value: 'light-incandescent', label: 'Incandescent Bulb (60W)' }
        ]
      },
      {
        key: 'wattage',
        label: 'Power Consumption',
        type: 'number',
        defaultValue: 100,
        min: 1,
        max: 10000,
        step: 10,
        required: true,
        unit: 'Watts',
        dependsOn: ['applianceType'],
        showWhen: { applianceType: 'custom' }
      },
      {
        key: 'hoursPerDay',
        label: 'Hours Used Per Day',
        type: 'number',
        defaultValue: 5,
        min: 0.1,
        max: 24,
        step: 0.5,
        required: true
      },
      {
        key: 'daysPerMonth',
        label: 'Days Used Per Month',
        type: 'number',
        defaultValue: 30,
        min: 1,
        max: 31,
        step: 1,
        required: true
      },
      {
        key: 'electricityRate',
        label: 'Electricity Rate',
        type: 'number',
        defaultValue: 0.12,
        min: 0.01,
        max: 1,
        step: 0.01,
        required: true,
        unit: '$/kWh'
      },
      {
        key: 'quantity',
        label: 'Number of Appliances',
        type: 'number',
        defaultValue: 1,
        min: 1,
        max: 20,
        step: 1,
        required: false
      }
    ],
    outputs: [
      {
        key: 'dailyUsage',
        label: 'Daily Usage',
        format: 'number',
        decimals: 2,
        unit: 'kWh',
        description: 'Energy per day'
      },
      {
        key: 'monthlyUsage',
        label: 'Monthly Usage',
        format: 'number',
        decimals: 2,
        unit: 'kWh',
        description: 'Energy per month',
        highlight: true
      },
      {
        key: 'yearlyUsage',
        label: 'Yearly Usage',
        format: 'number',
        decimals: 0,
        unit: 'kWh',
        description: 'Annual consumption'
      },
      {
        key: 'dailyCost',
        label: 'Daily Cost',
        format: 'currency',
        decimals: 2,
        description: 'Cost per day'
      },
      {
        key: 'monthlyCost',
        label: 'Monthly Cost',
        format: 'currency',
        decimals: 2,
        description: 'Cost per month',
        highlight: true
      },
      {
        key: 'yearlyCost',
        label: 'Yearly Cost',
        format: 'currency',
        decimals: 2,
        description: 'Annual cost',
        highlight: true
      },
      {
        key: 'co2Emissions',
        label: 'CO₂ Emissions',
        format: 'number',
        decimals: 1,
        unit: 'kg/year',
        description: 'Carbon footprint'
      },
      {
        key: 'savingsTips',
        label: 'Energy Saving Tips',
        format: 'text',
        description: 'Ways to reduce usage'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Get wattage based on appliance type
          let actualWattage = wattage || 100;
          
          const applianceWattages = {
            refrigerator: 150,
            ac: 2000,
            heater: 1500,
            washer: 500,
            dryer: 3000,
            tv: 100,
            computer: 300,
            laptop: 50,
            microwave: 1000,
            dishwasher: 1800,
            'light-led': 10,
            'light-cfl': 15,
            'light-incandescent': 60
          };
          
          if (applianceType !== 'custom' && applianceWattages[applianceType]) {
            actualWattage = applianceWattages[applianceType];
          }
          
          // Apply quantity
          actualWattage *= (quantity || 1);
          
          // Calculate usage (convert watts to kilowatts)
          const dailyUsage = (actualWattage / 1000) * hoursPerDay;
          const monthlyUsage = dailyUsage * daysPerMonth;
          const yearlyUsage = monthlyUsage * 12;
          
          // Calculate costs
          const dailyCost = dailyUsage * electricityRate;
          const monthlyCost = monthlyUsage * electricityRate;
          const yearlyCost = yearlyUsage * electricityRate;
          
          // Calculate CO2 emissions (0.92 lbs CO2 per kWh average in US)
          const co2Emissions = yearlyUsage * 0.92 * 0.453592; // Convert lbs to kg
          
          // Energy saving tips based on appliance and usage
          const tips = [];
          
          if (applianceType === 'ac' || applianceType === 'heater') {
            tips.push('Use programmable thermostat');
            tips.push('Improve insulation');
            tips.push('Set moderate temperatures (68°F winter, 78°F summer)');
          } else if (applianceType === 'refrigerator') {
            tips.push('Keep at 37-40°F');
            tips.push('Clean coils regularly');
            tips.push('Check door seals');
          } else if (applianceType.includes('light')) {
            tips.push('Switch to LED bulbs (75% less energy)');
            tips.push('Use natural light');
            tips.push('Install motion sensors');
          } else if (hoursPerDay > 8) {
            tips.push('Reduce usage hours');
            tips.push('Use timer or smart plug');
          }
          
          if (actualWattage > 1000) {
            tips.push('Consider energy-efficient model');
          }
          
          tips.push('Unplug when not in use', 'Use during off-peak hours');
          
          const savingsTips = tips.slice(0, 3).join('; ');
          
          return {
            dailyUsage,
            monthlyUsage,
            yearlyUsage,
            dailyCost,
            monthlyCost,
            yearlyCost,
            co2Emissions,
            savingsTips
          };
        `,
        description: 'Calculate electricity usage and costs'
      }
    ],
    localizedContent: {
      en: {
        title: 'Electricity Usage Calculator',
        description: 'Calculate appliance energy consumption, costs, and find ways to save',
        keywords: ['electricity calculator', 'energy usage', 'power consumption', 'electricity cost', 'appliance calculator'],
        faq: [
          {
            question: 'How do I find appliance wattage?',
            answer: 'Check the label on the appliance, owner\'s manual, or manufacturer website. Use a watt meter for exact measurement. Estimate: small appliances 50-200W, large 500-3000W.'
          },
          {
            question: 'What uses the most electricity?',
            answer: 'Heating/cooling (45%), water heater (14%), appliances (13%), lighting (9%), electronics (4%). AC, heaters, dryers, and water heaters are biggest users.'
          },
          {
            question: 'How can I reduce electricity bills?',
            answer: 'Use LED bulbs, unplug phantom loads, adjust thermostat 1-2°, use appliances during off-peak, upgrade to Energy Star, improve insulation.'
          }
        ],
        article: {
          title: 'Reduce Your Electricity Usage',
          introduction: 'Understanding appliance energy consumption helps identify savings opportunities and reduce bills.',
          sections: [
            {
              heading: 'Biggest Energy Users',
              content: 'HVAC systems use 40-50% of home energy. Water heaters 14%, washers/dryers 13%, lighting 9%, refrigerators 4%. Focus on the biggest users first.'
            },
            {
              heading: 'Quick Wins',
              content: 'Replace incandescent with LED (75% savings), adjust thermostat 1° (3% savings), unplug devices (5-10% savings), use cold water washing (90% savings per load).'
            }
          ],
          conclusion: 'Small changes in energy habits can lead to significant savings over time.',
          wordCount: 320
        }
      }
    }
  },
  {
    id: 'water-bill-calculator',
    slug: 'water-bill-calculator',
    category: 'household',
    icon: '💧',
    color: '#06B6D4',
    inputs: [
      {
        key: 'showerMinutes',
        label: 'Daily Shower Minutes',
        type: 'number',
        defaultValue: 10,
        min: 0,
        max: 60,
        step: 1,
        required: true,
        tooltip: 'Per person'
      },
      {
        key: 'showerType',
        label: 'Shower Head Type',
        type: 'select',
        defaultValue: 'standard',
        required: true,
        options: [
          { value: 'standard', label: 'Standard (2.5 GPM)' },
          { value: 'low-flow', label: 'Low-Flow (1.5 GPM)' },
          { value: 'old', label: 'Old/High-Flow (4 GPM)' }
        ]
      },
      {
        key: 'bathsPerWeek',
        label: 'Baths Per Week',
        type: 'number',
        defaultValue: 1,
        min: 0,
        max: 20,
        step: 1,
        required: false
      },
      {
        key: 'toiletFlushes',
        label: 'Toilet Flushes Per Day',
        type: 'number',
        defaultValue: 5,
        min: 0,
        max: 30,
        step: 1,
        required: true,
        tooltip: 'Per person'
      },
      {
        key: 'toiletType',
        label: 'Toilet Type',
        type: 'select',
        defaultValue: 'standard',
        required: true,
        options: [
          { value: 'old', label: 'Old (3.5 gallons)' },
          { value: 'standard', label: 'Standard (1.6 gallons)' },
          { value: 'efficient', label: 'High-Efficiency (1.28 gallons)' },
          { value: 'dual', label: 'Dual-Flush (1.1/1.6 gallons)' }
        ]
      },
      {
        key: 'dishwasherLoads',
        label: 'Dishwasher Loads/Week',
        type: 'number',
        defaultValue: 4,
        min: 0,
        max: 20,
        step: 1,
        required: false
      },
      {
        key: 'laundryLoads',
        label: 'Laundry Loads/Week',
        type: 'number',
        defaultValue: 3,
        min: 0,
        max: 20,
        step: 1,
        required: false
      },
      {
        key: 'householdSize',
        label: 'Number of People',
        type: 'number',
        defaultValue: 3,
        min: 1,
        max: 10,
        step: 1,
        required: true
      },
      {
        key: 'waterRate',
        label: 'Water Rate',
        type: 'number',
        defaultValue: 0.004,
        min: 0.001,
        max: 0.02,
        step: 0.001,
        required: true,
        unit: '$/gallon'
      },
      {
        key: 'sewerRate',
        label: 'Sewer Rate',
        type: 'number',
        defaultValue: 0.003,
        min: 0,
        max: 0.02,
        step: 0.001,
        required: false,
        unit: '$/gallon'
      }
    ],
    outputs: [
      {
        key: 'dailyUsage',
        label: 'Daily Water Usage',
        format: 'number',
        decimals: 0,
        unit: 'gallons',
        description: 'Total household'
      },
      {
        key: 'monthlyUsage',
        label: 'Monthly Usage',
        format: 'number',
        decimals: 0,
        unit: 'gallons',
        description: 'Monthly total',
        highlight: true
      },
      {
        key: 'monthlyBill',
        label: 'Monthly Water Bill',
        format: 'currency',
        decimals: 2,
        description: 'Water + sewer',
        highlight: true
      },
      {
        key: 'yearlyBill',
        label: 'Yearly Cost',
        format: 'currency',
        decimals: 2,
        description: 'Annual water costs'
      },
      {
        key: 'perPersonDaily',
        label: 'Per Person Daily',
        format: 'number',
        decimals: 0,
        unit: 'gallons',
        description: 'Individual usage'
      },
      {
        key: 'usageComparison',
        label: 'Usage Comparison',
        format: 'text',
        description: 'vs average household'
      },
      {
        key: 'savingsPotential',
        label: 'Savings Potential',
        format: 'currency',
        decimals: 2,
        unit: '/year',
        description: 'If optimized'
      },
      {
        key: 'conservationTips',
        label: 'Conservation Tips',
        format: 'text',
        description: 'Ways to save water'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Shower water usage
          let showerGPM = 2.5;
          if (showerType === 'low-flow') showerGPM = 1.5;
          else if (showerType === 'old') showerGPM = 4;
          
          const dailyShowerGallons = showerMinutes * showerGPM * householdSize;
          
          // Bath water usage (35 gallons per bath)
          const weeklyBathGallons = (bathsPerWeek || 0) * 35;
          const dailyBathGallons = weeklyBathGallons / 7;
          
          // Toilet water usage
          let toiletGPF = 1.6;
          if (toiletType === 'old') toiletGPF = 3.5;
          else if (toiletType === 'efficient') toiletGPF = 1.28;
          else if (toiletType === 'dual') toiletGPF = 1.35; // Average of dual flush
          
          const dailyToiletGallons = toiletFlushes * toiletGPF * householdSize;
          
          // Dishwasher usage (6 gallons per load for new, 10 for old)
          const weeklyDishwasherGallons = (dishwasherLoads || 0) * 6;
          const dailyDishwasherGallons = weeklyDishwasherGallons / 7;
          
          // Laundry usage (25 gallons per load for new, 40 for old)
          const weeklyLaundryGallons = (laundryLoads || 0) * 25;
          const dailyLaundryGallons = weeklyLaundryGallons / 7;
          
          // Other usage (cooking, drinking, cleaning - estimate 20 gallons per person)
          const dailyOtherGallons = 20 * householdSize;
          
          // Total usage
          const dailyUsage = dailyShowerGallons + dailyBathGallons + dailyToiletGallons + 
                            dailyDishwasherGallons + dailyLaundryGallons + dailyOtherGallons;
          
          const monthlyUsage = dailyUsage * 30;
          const yearlyUsage = dailyUsage * 365;
          
          // Calculate costs
          const totalRate = waterRate + (sewerRate || 0);
          const monthlyBill = monthlyUsage * totalRate;
          const yearlyBill = yearlyUsage * totalRate;
          
          // Per person usage
          const perPersonDaily = dailyUsage / householdSize;
          
          // Comparison (US average is 80 gallons per person per day)
          const avgUsage = 80 * householdSize;
          let usageComparison = '';
          
          if (perPersonDaily < 50) {
            usageComparison = 'Excellent! ' + ((80 - perPersonDaily) / 80 * 100).toFixed(0) + '% below average';
          } else if (perPersonDaily < 80) {
            usageComparison = 'Good: ' + ((80 - perPersonDaily) / 80 * 100).toFixed(0) + '% below average';
          } else if (perPersonDaily < 100) {
            usageComparison = 'Above average: ' + ((perPersonDaily - 80) / 80 * 100).toFixed(0) + '% higher';
          } else {
            usageComparison = 'High usage: ' + ((perPersonDaily - 80) / 80 * 100).toFixed(0) + '% above average';
          }
          
          // Calculate savings potential
          let potentialSavings = 0;
          
          if (showerType !== 'low-flow') {
            potentialSavings += dailyShowerGallons * 0.4 * 365 * totalRate; // 40% reduction
          }
          
          if (toiletType === 'old' || toiletType === 'standard') {
            potentialSavings += dailyToiletGallons * 0.2 * 365 * totalRate; // 20% reduction
          }
          
          const savingsPotential = potentialSavings;
          
          // Conservation tips
          const tips = [];
          
          if (showerMinutes > 5) {
            tips.push('Reduce shower time to 5 minutes');
          }
          
          if (showerType !== 'low-flow') {
            tips.push('Install low-flow showerheads');
          }
          
          if (toiletType === 'old') {
            tips.push('Upgrade to efficient toilets');
          }
          
          if (perPersonDaily > 80) {
            tips.push('Fix leaks (can waste 3000 gal/year)');
          }
          
          tips.push('Run full loads only', 'Turn off tap while brushing');
          
          const conservationTips = tips.slice(0, 3).join('; ');
          
          return {
            dailyUsage,
            monthlyUsage,
            monthlyBill,
            yearlyBill,
            perPersonDaily,
            usageComparison,
            savingsPotential,
            conservationTips
          };
        `,
        description: 'Calculate water usage and bills'
      }
    ],
    localizedContent: {
      en: {
        title: 'Water Bill Calculator',
        description: 'Calculate water usage, bills, and find conservation opportunities',
        keywords: ['water bill calculator', 'water usage', 'water conservation', 'utility calculator', 'water costs'],
        faq: [
          {
            question: 'What is average water usage?',
            answer: 'US average: 80 gallons per person per day. Family of 4: ~12,000 gallons/month. Efficient homes use 50-60 gallons per person.'
          },
          {
            question: 'Where does household water go?',
            answer: 'Toilets (24%), washing machines (20%), showers (20%), faucets (19%), leaks (12%), other (5%). Focus on biggest users for savings.'
          },
          {
            question: 'How can I reduce water usage?',
            answer: 'Fix leaks immediately, install low-flow fixtures, take shorter showers, run full loads, turn off taps, collect shower water for plants.'
          }
        ],
        article: {
          title: 'Water Conservation at Home',
          introduction: 'Reducing water usage saves money and helps the environment. Small changes make big differences.',
          sections: [
            {
              heading: 'Quick Fixes',
              content: 'Low-flow showerhead saves 2,700 gal/year. Fixing leaky toilet saves 3,000 gal/year. Shorter showers save 150 gal/month per minute reduced.'
            },
            {
              heading: 'Behavior Changes',
              content: 'Turn off tap while brushing (8 gal/day), run full loads (15-45 gal/load), collect cold water while waiting for hot, use dishwasher instead of hand washing.'
            }
          ],
          conclusion: 'Water conservation protects resources and reduces utility bills significantly.',
          wordCount: 290
        }
      }
    }
  }
];

// Export function to get all household calculators
export function getHouseholdCalculators(): Calculator[] {
  return householdCalculators;
}

// Export function to get calculator by slug
export function getHouseholdCalculatorBySlug(slug: string): Calculator | undefined {
  return householdCalculators.find(calc => calc.slug === slug);
}