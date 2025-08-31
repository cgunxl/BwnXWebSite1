import { Calculator } from '@/lib/types/calculator';

export const insuranceCalculators: Calculator[] = [
  {
    id: 'life-insurance-calculator',
    slug: 'life-insurance-calculator',
    category: 'insurance',
    icon: '🛡️',
    color: '#06B6D4',
    inputs: [
      {
        key: 'age',
        label: 'Current Age',
        type: 'number',
        defaultValue: 35,
        min: 18,
        max: 80,
        step: 1,
        required: true,
        unit: 'years'
      },
      {
        key: 'annualIncome',
        label: 'Annual Income',
        type: 'number',
        defaultValue: 60000,
        min: 0,
        max: 10000000,
        step: 1000,
        required: true,
        unit: '$'
      },
      {
        key: 'coverageMultiplier',
        label: 'Coverage Multiplier',
        type: 'slider',
        defaultValue: 10,
        min: 5,
        max: 20,
        step: 1,
        required: true,
        tooltip: 'Typically 10-15x annual income'
      },
      {
        key: 'existingCoverage',
        label: 'Existing Life Insurance',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 10000000,
        step: 1000,
        required: false,
        unit: '$'
      },
      {
        key: 'debts',
        label: 'Total Debts',
        type: 'number',
        defaultValue: 200000,
        min: 0,
        max: 10000000,
        step: 1000,
        required: false,
        unit: '$',
        tooltip: 'Mortgage, loans, credit cards'
      },
      {
        key: 'dependents',
        label: 'Number of Dependents',
        type: 'number',
        defaultValue: 2,
        min: 0,
        max: 10,
        step: 1,
        required: false
      },
      {
        key: 'collegeExpenses',
        label: 'Future College Expenses',
        type: 'number',
        defaultValue: 100000,
        min: 0,
        max: 1000000,
        step: 10000,
        required: false,
        unit: '$',
        tooltip: 'Per child'
      },
      {
        key: 'finalExpenses',
        label: 'Final Expenses',
        type: 'number',
        defaultValue: 15000,
        min: 0,
        max: 100000,
        step: 1000,
        required: false,
        unit: '$',
        tooltip: 'Funeral, estate costs'
      },
      {
        key: 'smoker',
        label: 'Tobacco Use',
        type: 'boolean',
        defaultValue: false,
        required: false
      },
      {
        key: 'termLength',
        label: 'Term Length',
        type: 'select',
        defaultValue: '20',
        required: true,
        options: [
          { value: '10', label: '10 Years' },
          { value: '15', label: '15 Years' },
          { value: '20', label: '20 Years' },
          { value: '30', label: '30 Years' },
          { value: 'whole', label: 'Whole Life' }
        ]
      }
    ],
    outputs: [
      {
        key: 'recommendedCoverage',
        label: 'Recommended Coverage',
        format: 'currency',
        decimals: 0,
        description: 'Total coverage needed',
        highlight: true
      },
      {
        key: 'additionalNeeded',
        label: 'Additional Coverage Needed',
        format: 'currency',
        decimals: 0,
        description: 'Gap in current coverage',
        highlight: true
      },
      {
        key: 'monthlyPremium',
        label: 'Estimated Monthly Premium',
        format: 'currency',
        decimals: 2,
        description: 'Approximate cost'
      },
      {
        key: 'incomeReplacement',
        label: 'Income Replacement',
        format: 'currency',
        decimals: 0,
        description: 'Years of income covered'
      },
      {
        key: 'debtCoverage',
        label: 'Debt Coverage',
        format: 'currency',
        decimals: 0,
        description: 'Total debts to clear'
      },
      {
        key: 'educationFund',
        label: 'Education Fund',
        format: 'currency',
        decimals: 0,
        description: 'College expenses'
      },
      {
        key: 'coverageAnalysis',
        label: 'Coverage Analysis',
        format: 'text',
        description: 'Coverage adequacy'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate income replacement needs
          const incomeReplacement = annualIncome * coverageMultiplier;
          
          // Calculate education fund
          const educationFund = collegeExpenses * dependents;
          
          // Calculate total debts to cover
          const debtCoverage = debts + finalExpenses;
          
          // Calculate total recommended coverage
          const recommendedCoverage = incomeReplacement + educationFund + debtCoverage;
          
          // Calculate additional coverage needed
          const additionalNeeded = Math.max(0, recommendedCoverage - existingCoverage);
          
          // Estimate monthly premium (simplified calculation)
          // Base rate varies by age, smoking status, and term
          let baseRate = 0.001; // Base rate per $1000 of coverage
          
          // Age factor
          if (age < 30) baseRate *= 0.5;
          else if (age < 40) baseRate *= 0.7;
          else if (age < 50) baseRate *= 1.0;
          else if (age < 60) baseRate *= 2.0;
          else baseRate *= 4.0;
          
          // Smoking factor
          if (smoker) baseRate *= 2.5;
          
          // Term factor
          if (termLength === '10') baseRate *= 0.8;
          else if (termLength === '15') baseRate *= 0.9;
          else if (termLength === '20') baseRate *= 1.0;
          else if (termLength === '30') baseRate *= 1.3;
          else if (termLength === 'whole') baseRate *= 8.0;
          
          const monthlyPremium = (additionalNeeded / 1000) * baseRate;
          
          // Coverage analysis
          let coverageAnalysis = '';
          const coverageRatio = existingCoverage / recommendedCoverage;
          
          if (coverageRatio >= 1) {
            coverageAnalysis = 'Fully covered - You have adequate life insurance';
          } else if (coverageRatio >= 0.75) {
            coverageAnalysis = 'Mostly covered - Consider adding ' + ((1 - coverageRatio) * 100).toFixed(0) + '% more';
          } else if (coverageRatio >= 0.5) {
            coverageAnalysis = 'Partially covered - You need ' + ((1 - coverageRatio) * 100).toFixed(0) + '% more coverage';
          } else {
            coverageAnalysis = 'Significantly underinsured - Critical gap in coverage';
          }
          
          return {
            recommendedCoverage,
            additionalNeeded,
            monthlyPremium,
            incomeReplacement,
            debtCoverage,
            educationFund,
            coverageAnalysis
          };
        `,
        description: 'Calculate life insurance needs and premium estimate'
      }
    ],
    localizedContent: {
      en: {
        title: 'Life Insurance Calculator',
        description: 'Calculate how much life insurance coverage you need and estimate premiums',
        keywords: ['life insurance calculator', 'coverage calculator', 'insurance needs', 'term life', 'whole life'],
        faq: [
          {
            question: 'How much life insurance do I need?',
            answer: 'A common rule is 10-15 times your annual income, plus debts, future college costs, and final expenses. Consider your family\'s specific needs and financial goals.'
          },
          {
            question: 'Term vs Whole Life Insurance?',
            answer: 'Term life is temporary (10-30 years) and affordable. Whole life is permanent with cash value but costs 5-10x more. Most people benefit from term life insurance.'
          },
          {
            question: 'What affects life insurance premiums?',
            answer: 'Age, health, smoking status, coverage amount, term length, and lifestyle. Younger, healthier non-smokers get the best rates. Lock in rates while young and healthy.'
          },
          {
            question: 'When should I get life insurance?',
            answer: 'When others depend on your income: marriage, mortgage, children. The younger you are, the lower your premiums. Don\'t wait - rates increase with age.'
          },
          {
            question: 'Is employer life insurance enough?',
            answer: 'Usually not. Employer coverage is often only 1-2x salary and ends if you leave. Get personal coverage you control for true financial security.'
          }
        ],
        article: {
          title: 'Complete Guide to Life Insurance Planning',
          introduction: 'Life insurance protects your family\'s financial future if something happens to you. Understanding your needs helps ensure adequate coverage.',
          sections: [
            {
              heading: 'Calculating Coverage Needs',
              content: 'Consider income replacement (10-15x annual income), outstanding debts, future education costs, and final expenses. Subtract existing assets and coverage.'
            },
            {
              heading: 'Types of Life Insurance',
              content: 'Term life: affordable temporary coverage. Whole life: permanent with cash value. Universal life: flexible permanent. Variable life: investment component.'
            },
            {
              heading: 'Getting the Best Rates',
              content: 'Shop multiple insurers, buy young and healthy, choose longer terms to lock rates, consider laddering policies, maintain good health, quit smoking.'
            }
          ],
          conclusion: 'Life insurance is an act of love - protecting those who depend on you. Calculate your needs carefully and review coverage regularly.',
          wordCount: 350
        }
      },
      th: {
        title: 'คำนวณประกันชีวิต',
        description: 'คำนวณความคุ้มครองประกันชีวิตที่คุณต้องการและประมาณเบี้ยประกัน',
        keywords: ['คำนวณประกันชีวิต', 'ความคุ้มครอง', 'เบี้ยประกัน', 'ประกันชีวิตแบบชั่วระยะ'],
        faq: [
          {
            question: 'ควรทำประกันชีวิตเท่าไหร่?',
            answer: 'ทั่วไปแนะนำ 10-15 เท่าของรายได้ต่อปี บวกหนี้สิน ค่าการศึกษาบุตร และค่าใช้จ่ายสุดท้าย พิจารณาตามความต้องการของครอบครัว'
          },
          {
            question: 'ประกันแบบชั่วระยะ vs ตลอดชีพ?',
            answer: 'ชั่วระยะ: คุ้มครอง 10-30 ปี เบี้ยถูก ตลอดชีพ: คุ้มครองถาวร มีมูลค่าเงินสด แต่เบี้ยแพงกว่า 5-10 เท่า'
          }
        ],
        article: {
          title: 'คู่มือวางแผนประกันชีวิต',
          introduction: 'ประกันชีวิตปกป้องอนาคตทางการเงินของครอบครัวหากเกิดเหตุการณ์ไม่คาดคิด',
          sections: [
            {
              heading: 'คำนวณความคุ้มครอง',
              content: 'พิจารณาการทดแทนรายได้ (10-15 เท่าของรายได้ต่อปี) หนี้คงค้าง ค่าการศึกษา และค่าใช้จ่ายสุดท้าย'
            }
          ],
          conclusion: 'ประกันชีวิตคือการแสดงความรักต่อคนที่คุณรัก คำนวณความต้องการอย่างรอบคอบ',
          wordCount: 300
        }
      }
    }
  },
  {
    id: 'health-insurance-calculator',
    slug: 'health-insurance-calculator',
    category: 'insurance',
    icon: '🏥',
    color: '#10B981',
    inputs: [
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        defaultValue: 35,
        min: 0,
        max: 100,
        step: 1,
        required: true
      },
      {
        key: 'familySize',
        label: 'Family Size',
        type: 'select',
        defaultValue: 'family',
        required: true,
        options: [
          { value: 'individual', label: 'Individual' },
          { value: 'couple', label: 'Couple' },
          { value: 'family', label: 'Family (2 adults + children)' },
          { value: 'single-parent', label: 'Single Parent + Children' }
        ]
      },
      {
        key: 'annualIncome',
        label: 'Annual Household Income',
        type: 'number',
        defaultValue: 75000,
        min: 0,
        max: 1000000,
        step: 1000,
        required: true,
        unit: '$'
      },
      {
        key: 'planType',
        label: 'Plan Type',
        type: 'select',
        defaultValue: 'silver',
        required: true,
        options: [
          { value: 'bronze', label: 'Bronze (60% coverage)' },
          { value: 'silver', label: 'Silver (70% coverage)' },
          { value: 'gold', label: 'Gold (80% coverage)' },
          { value: 'platinum', label: 'Platinum (90% coverage)' }
        ]
      },
      {
        key: 'deductible',
        label: 'Annual Deductible',
        type: 'select',
        defaultValue: '2000',
        required: true,
        options: [
          { value: '500', label: '$500 (High Premium)' },
          { value: '1000', label: '$1,000' },
          { value: '2000', label: '$2,000' },
          { value: '5000', label: '$5,000' },
          { value: '10000', label: '$10,000 (Low Premium)' }
        ]
      },
      {
        key: 'expectedMedicalUse',
        label: 'Expected Medical Use',
        type: 'select',
        defaultValue: 'moderate',
        required: true,
        options: [
          { value: 'low', label: 'Low (Healthy, preventive care only)' },
          { value: 'moderate', label: 'Moderate (Occasional visits)' },
          { value: 'high', label: 'High (Chronic conditions)' },
          { value: 'very-high', label: 'Very High (Major procedures)' }
        ]
      },
      {
        key: 'employerContribution',
        label: 'Employer Contribution',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 50000,
        step: 100,
        required: false,
        unit: '$/year'
      }
    ],
    outputs: [
      {
        key: 'monthlyPremium',
        label: 'Monthly Premium',
        format: 'currency',
        decimals: 2,
        description: 'Estimated monthly cost',
        highlight: true
      },
      {
        key: 'annualPremium',
        label: 'Annual Premium',
        format: 'currency',
        decimals: 2,
        description: 'Total yearly cost'
      },
      {
        key: 'outOfPocketMax',
        label: 'Out-of-Pocket Maximum',
        format: 'currency',
        decimals: 0,
        description: 'Maximum annual cost'
      },
      {
        key: 'subsidyAmount',
        label: 'Potential Subsidy',
        format: 'currency',
        decimals: 2,
        description: 'ACA subsidy estimate'
      },
      {
        key: 'effectiveCost',
        label: 'Effective Monthly Cost',
        format: 'currency',
        decimals: 2,
        description: 'After employer/subsidy',
        highlight: true
      },
      {
        key: 'totalAnnualCost',
        label: 'Total Expected Annual Cost',
        format: 'currency',
        decimals: 2,
        description: 'Premium + expected medical'
      },
      {
        key: 'recommendation',
        label: 'Plan Recommendation',
        format: 'text',
        description: 'Best plan for your situation'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Base premium calculation
          let basePremium = 300; // Base monthly premium
          
          // Age factor
          if (age < 25) basePremium *= 0.7;
          else if (age < 35) basePremium *= 0.9;
          else if (age < 45) basePremium *= 1.2;
          else if (age < 55) basePremium *= 1.8;
          else if (age < 65) basePremium *= 2.5;
          else basePremium *= 3.5;
          
          // Family size factor
          let familyFactor = 1;
          if (familySize === 'couple') familyFactor = 2;
          else if (familySize === 'family') familyFactor = 2.8;
          else if (familySize === 'single-parent') familyFactor = 1.8;
          
          basePremium *= familyFactor;
          
          // Plan type factor
          if (planType === 'bronze') basePremium *= 0.7;
          else if (planType === 'silver') basePremium *= 1.0;
          else if (planType === 'gold') basePremium *= 1.3;
          else if (planType === 'platinum') basePremium *= 1.6;
          
          // Deductible factor
          const deductibleNum = parseInt(deductible);
          if (deductibleNum <= 500) basePremium *= 1.5;
          else if (deductibleNum <= 1000) basePremium *= 1.3;
          else if (deductibleNum <= 2000) basePremium *= 1.0;
          else if (deductibleNum <= 5000) basePremium *= 0.8;
          else basePremium *= 0.6;
          
          const monthlyPremium = basePremium;
          const annualPremium = monthlyPremium * 12;
          
          // Out-of-pocket maximum
          let outOfPocketMax = deductibleNum * 3;
          if (familySize !== 'individual') outOfPocketMax *= 2;
          outOfPocketMax = Math.min(outOfPocketMax, 18900); // 2024 limit
          
          // Calculate ACA subsidy (simplified)
          let subsidyAmount = 0;
          const fpl = 14580; // Federal Poverty Level for individual
          const familySizeNum = familySize === 'individual' ? 1 : familySize === 'couple' ? 2 : 4;
          const familyFPL = fpl + (5140 * (familySizeNum - 1));
          const incomePercent = annualIncome / familyFPL;
          
          if (incomePercent <= 4.0) { // Up to 400% FPL
            const maxPercent = 0.085; // Max 8.5% of income for benchmark plan
            const maxContribution = annualIncome * maxPercent;
            subsidyAmount = Math.max(0, annualPremium - maxContribution);
          }
          
          // Effective cost after employer contribution and subsidy
          const totalSupport = (employerContribution + subsidyAmount) / 12;
          const effectiveCost = Math.max(0, monthlyPremium - totalSupport);
          
          // Expected medical costs
          let expectedMedicalCost = 0;
          if (expectedMedicalUse === 'low') expectedMedicalCost = 500;
          else if (expectedMedicalUse === 'moderate') expectedMedicalCost = 2000;
          else if (expectedMedicalUse === 'high') expectedMedicalCost = 5000;
          else expectedMedicalCost = 10000;
          
          const totalAnnualCost = (effectiveCost * 12) + Math.min(expectedMedicalCost, deductibleNum);
          
          // Recommendation
          let recommendation = '';
          if (expectedMedicalUse === 'low' || expectedMedicalUse === 'moderate') {
            if (deductibleNum >= 5000) {
              recommendation = 'High-deductible plan recommended for lower premiums. Consider HSA for tax benefits.';
            } else {
              recommendation = 'Silver plan offers good balance of premium and coverage for your needs.';
            }
          } else {
            if (deductibleNum <= 1000) {
              recommendation = 'Low-deductible Gold/Platinum plan recommended due to high medical use.';
            } else {
              recommendation = 'Consider lowering deductible to reduce out-of-pocket costs with frequent medical use.';
            }
          }
          
          return {
            monthlyPremium,
            annualPremium,
            outOfPocketMax,
            subsidyAmount,
            effectiveCost,
            totalAnnualCost,
            recommendation
          };
        `,
        description: 'Calculate health insurance costs and recommendations'
      }
    ],
    localizedContent: {
      en: {
        title: 'Health Insurance Calculator',
        description: 'Estimate health insurance premiums, subsidies, and find the best plan for your needs',
        keywords: ['health insurance calculator', 'medical insurance', 'ACA calculator', 'insurance premium', 'healthcare costs'],
        faq: [
          {
            question: 'What is a deductible?',
            answer: 'The amount you pay for covered healthcare services before insurance starts paying. Lower deductibles mean higher premiums but less out-of-pocket when you need care.'
          },
          {
            question: 'What are the metal tiers?',
            answer: 'Bronze (60% coverage), Silver (70%), Gold (80%), Platinum (90%). Higher tiers have higher premiums but lower costs when you use healthcare.'
          },
          {
            question: 'How do subsidies work?',
            answer: 'ACA subsidies help if income is 100-400% of Federal Poverty Level. Premium tax credits lower monthly costs, cost-sharing reductions lower deductibles.'
          },
          {
            question: 'HSA vs FSA?',
            answer: 'HSA: High-deductible plans only, rolls over, portable, triple tax advantage. FSA: Any plan, use-it-or-lose-it, employer-owned, pre-tax only.'
          }
        ],
        article: {
          title: 'Choosing the Right Health Insurance',
          introduction: 'Health insurance protects against high medical costs. Understanding plans helps choose coverage that fits your health needs and budget.',
          sections: [
            {
              heading: 'Understanding Costs',
              content: 'Premium: monthly payment. Deductible: amount before insurance pays. Copay: fixed amount per service. Coinsurance: percentage you pay. Out-of-pocket max: yearly limit.'
            },
            {
              heading: 'Choosing a Plan',
              content: 'High-deductible if healthy and want low premiums. Low-deductible if frequent medical needs. Check provider networks, prescription coverage, and total expected costs.'
            }
          ],
          conclusion: 'Balance monthly premiums with potential out-of-pocket costs based on your health needs.',
          wordCount: 320
        }
      }
    }
  },
  {
    id: 'car-insurance-calculator',
    slug: 'car-insurance-calculator',
    category: 'insurance',
    icon: '🚗',
    color: '#EF4444',
    inputs: [
      {
        key: 'vehicleValue',
        label: 'Vehicle Value',
        type: 'number',
        defaultValue: 25000,
        min: 1000,
        max: 200000,
        step: 1000,
        required: true,
        unit: '$'
      },
      {
        key: 'vehicleAge',
        label: 'Vehicle Age',
        type: 'number',
        defaultValue: 3,
        min: 0,
        max: 30,
        step: 1,
        required: true,
        unit: 'years'
      },
      {
        key: 'driverAge',
        label: 'Primary Driver Age',
        type: 'number',
        defaultValue: 35,
        min: 16,
        max: 100,
        step: 1,
        required: true
      },
      {
        key: 'drivingRecord',
        label: 'Driving Record',
        type: 'select',
        defaultValue: 'clean',
        required: true,
        options: [
          { value: 'excellent', label: 'Excellent (No violations)' },
          { value: 'clean', label: 'Clean (Minor violations)' },
          { value: 'average', label: 'Average (1-2 tickets)' },
          { value: 'poor', label: 'Poor (Accidents/DUI)' }
        ]
      },
      {
        key: 'annualMileage',
        label: 'Annual Mileage',
        type: 'select',
        defaultValue: '12000',
        required: true,
        options: [
          { value: '5000', label: 'Under 5,000 miles' },
          { value: '7500', label: '5,000 - 7,500 miles' },
          { value: '10000', label: '7,500 - 10,000 miles' },
          { value: '12000', label: '10,000 - 12,000 miles' },
          { value: '15000', label: '12,000 - 15,000 miles' },
          { value: '20000', label: 'Over 15,000 miles' }
        ]
      },
      {
        key: 'coverageLevel',
        label: 'Coverage Level',
        type: 'select',
        defaultValue: 'standard',
        required: true,
        options: [
          { value: 'minimum', label: 'State Minimum' },
          { value: 'basic', label: 'Basic (Liability only)' },
          { value: 'standard', label: 'Standard (Full coverage)' },
          { value: 'premium', label: 'Premium (High limits)' }
        ]
      },
      {
        key: 'deductible',
        label: 'Collision/Comprehensive Deductible',
        type: 'select',
        defaultValue: '500',
        required: true,
        options: [
          { value: '250', label: '$250' },
          { value: '500', label: '$500' },
          { value: '1000', label: '$1,000' },
          { value: '2000', label: '$2,000' }
        ]
      },
      {
        key: 'creditScore',
        label: 'Credit Score Range',
        type: 'select',
        defaultValue: 'good',
        required: true,
        options: [
          { value: 'excellent', label: 'Excellent (750+)' },
          { value: 'good', label: 'Good (700-749)' },
          { value: 'fair', label: 'Fair (650-699)' },
          { value: 'poor', label: 'Poor (Below 650)' }
        ]
      }
    ],
    outputs: [
      {
        key: 'monthlyPremium',
        label: 'Estimated Monthly Premium',
        format: 'currency',
        decimals: 2,
        description: 'Monthly insurance cost',
        highlight: true
      },
      {
        key: 'annualPremium',
        label: 'Annual Premium',
        format: 'currency',
        decimals: 2,
        description: 'Yearly total cost',
        highlight: true
      },
      {
        key: 'liabilityPortion',
        label: 'Liability Coverage',
        format: 'currency',
        decimals: 2,
        description: 'Bodily injury & property damage'
      },
      {
        key: 'collisionPortion',
        label: 'Collision Coverage',
        format: 'currency',
        decimals: 2,
        description: 'Your vehicle damage'
      },
      {
        key: 'comprehensivePortion',
        label: 'Comprehensive Coverage',
        format: 'currency',
        decimals: 2,
        description: 'Non-collision damage'
      },
      {
        key: 'savingsTips',
        label: 'Ways to Save',
        format: 'text',
        description: 'Reduce your premium'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Base rate calculation
          let baseRate = vehicleValue * 0.004; // 0.4% of vehicle value monthly
          
          // Vehicle age factor
          if (vehicleAge < 1) baseRate *= 1.3;
          else if (vehicleAge < 3) baseRate *= 1.1;
          else if (vehicleAge < 5) baseRate *= 1.0;
          else if (vehicleAge < 10) baseRate *= 0.9;
          else baseRate *= 0.7;
          
          // Driver age factor
          if (driverAge < 25) baseRate *= 2.0;
          else if (driverAge < 30) baseRate *= 1.5;
          else if (driverAge < 65) baseRate *= 1.0;
          else baseRate *= 1.1;
          
          // Driving record factor
          if (drivingRecord === 'excellent') baseRate *= 0.8;
          else if (drivingRecord === 'clean') baseRate *= 1.0;
          else if (drivingRecord === 'average') baseRate *= 1.3;
          else baseRate *= 2.0;
          
          // Mileage factor
          const mileageNum = parseInt(annualMileage);
          if (mileageNum <= 5000) baseRate *= 0.8;
          else if (mileageNum <= 10000) baseRate *= 0.9;
          else if (mileageNum <= 12000) baseRate *= 1.0;
          else if (mileageNum <= 15000) baseRate *= 1.1;
          else baseRate *= 1.3;
          
          // Credit score factor
          if (creditScore === 'excellent') baseRate *= 0.85;
          else if (creditScore === 'good') baseRate *= 1.0;
          else if (creditScore === 'fair') baseRate *= 1.2;
          else baseRate *= 1.5;
          
          // Coverage level adjustments
          let liabilityPortion = baseRate * 0.4;
          let collisionPortion = 0;
          let comprehensivePortion = 0;
          
          if (coverageLevel === 'minimum') {
            liabilityPortion *= 0.5;
          } else if (coverageLevel === 'basic') {
            liabilityPortion *= 0.7;
          } else if (coverageLevel === 'standard') {
            collisionPortion = baseRate * 0.35;
            comprehensivePortion = baseRate * 0.25;
          } else { // premium
            liabilityPortion *= 1.5;
            collisionPortion = baseRate * 0.4;
            comprehensivePortion = baseRate * 0.3;
          }
          
          // Deductible adjustment for collision/comprehensive
          const deductibleNum = parseInt(deductible);
          if (deductibleNum === 250) {
            collisionPortion *= 1.3;
            comprehensivePortion *= 1.3;
          } else if (deductibleNum === 500) {
            collisionPortion *= 1.0;
            comprehensivePortion *= 1.0;
          } else if (deductibleNum === 1000) {
            collisionPortion *= 0.8;
            comprehensivePortion *= 0.8;
          } else {
            collisionPortion *= 0.6;
            comprehensivePortion *= 0.6;
          }
          
          const monthlyPremium = liabilityPortion + collisionPortion + comprehensivePortion;
          const annualPremium = monthlyPremium * 12;
          
          // Savings tips based on inputs
          let savingsTips = [];
          
          if (deductibleNum < 1000 && coverageLevel !== 'minimum') {
            savingsTips.push('Increase deductible to $1000+ (save ~20%)');
          }
          
          if (parseInt(annualMileage) > 10000) {
            savingsTips.push('Reduce annual mileage if possible');
          }
          
          if (creditScore === 'fair' || creditScore === 'poor') {
            savingsTips.push('Improve credit score (save 15-30%)');
          }
          
          if (driverAge < 25) {
            savingsTips.push('Add experienced driver or take defensive driving course');
          }
          
          if (vehicleAge > 10 && coverageLevel === 'standard' || coverageLevel === 'premium') {
            savingsTips.push('Consider dropping collision/comprehensive on older vehicle');
          }
          
          savingsTips.push('Bundle with home insurance', 'Pay annually vs monthly', 'Install anti-theft devices');
          
          return {
            monthlyPremium,
            annualPremium,
            liabilityPortion,
            collisionPortion,
            comprehensivePortion,
            savingsTips: savingsTips.slice(.0, 4).join('; ')
          };
        `,
        description: 'Calculate car insurance premium estimate'
      }
    ],
    localizedContent: {
      en: {
        title: 'Car Insurance Calculator',
        description: 'Estimate auto insurance premiums based on vehicle, driver, and coverage factors',
        keywords: ['car insurance calculator', 'auto insurance', 'vehicle insurance', 'insurance premium', 'coverage calculator'],
        faq: [
          {
            question: 'What coverage do I need?',
            answer: 'Minimum: state requirements only. Full coverage: adds collision/comprehensive for vehicle damage. Recommended: 100/300/100 liability plus collision/comprehensive if car is worth $4000+.'
          },
          {
            question: 'How can I lower my premium?',
            answer: 'Increase deductibles, maintain good credit, bundle policies, take defensive driving, install safety features, pay annually, compare quotes from multiple insurers.'
          },
          {
            question: 'What affects car insurance rates?',
            answer: 'Age, driving record, credit score, vehicle type/age, location, mileage, coverage levels, deductibles, claims history, and marital status.'
          }
        ],
        article: {
          title: 'Smart Car Insurance Shopping',
          introduction: 'Car insurance protects against financial loss from accidents, theft, and liability. Understanding factors helps find affordable coverage.',
          sections: [
            {
              heading: 'Coverage Types',
              content: 'Liability: required, covers others. Collision: your car in accidents. Comprehensive: non-collision damage. Uninsured motorist: protects against uninsured drivers.'
            },
            {
              heading: 'Saving Money',
              content: 'Shop around every 6-12 months. Raise deductibles if you have emergency fund. Drop collision on cars worth under $4000. Maintain good credit and driving record.'
            }
          ],
          conclusion: 'Balance coverage needs with budget. Don\'t sacrifice essential liability coverage to save money.',
          wordCount: 300
        }
      }
    }
  },
  {
    id: 'home-insurance-calculator',
    slug: 'home-insurance-calculator',
    category: 'insurance',
    icon: '🏠',
    color: '#8B5CF6',
    inputs: [
      {
        key: 'homeValue',
        label: 'Home Value',
        type: 'number',
        defaultValue: 350000,
        min: 50000,
        max: 5000000,
        step: 10000,
        required: true,
        unit: '$'
      },
      {
        key: 'rebuildCost',
        label: 'Rebuild Cost',
        type: 'number',
        defaultValue: 300000,
        min: 50000,
        max: 5000000,
        step: 10000,
        required: true,
        unit: '$',
        tooltip: 'Cost to rebuild, not market value'
      },
      {
        key: 'location',
        label: 'Location Risk',
        type: 'select',
        defaultValue: 'moderate',
        required: true,
        options: [
          { value: 'low', label: 'Low Risk (Safe area)' },
          { value: 'moderate', label: 'Moderate Risk' },
          { value: 'high', label: 'High Risk (Natural disasters)' },
          { value: 'coastal', label: 'Coastal (Hurricane zone)' }
        ]
      },
      {
        key: 'homeAge',
        label: 'Home Age',
        type: 'number',
        defaultValue: 15,
        min: 0,
        max: 150,
        step: 1,
        required: true,
        unit: 'years'
      },
      {
        key: 'deductible',
        label: 'Deductible',
        type: 'select',
        defaultValue: '1000',
        required: true,
        options: [
          { value: '500', label: '$500' },
          { value: '1000', label: '$1,000' },
          { value: '2500', label: '$2,500' },
          { value: '5000', label: '$5,000' },
          { value: '1percent', label: '1% of home value' },
          { value: '2percent', label: '2% of home value' }
        ]
      },
      {
        key: 'coverageType',
        label: 'Coverage Type',
        type: 'select',
        defaultValue: 'replacement',
        required: true,
        options: [
          { value: 'actual', label: 'Actual Cash Value' },
          { value: 'replacement', label: 'Replacement Cost' },
          { value: 'extended', label: 'Extended Replacement' },
          { value: 'guaranteed', label: 'Guaranteed Replacement' }
        ]
      },
      {
        key: 'personalProperty',
        label: 'Personal Property Coverage',
        type: 'select',
        defaultValue: '70',
        required: true,
        options: [
          { value: '50', label: '50% of dwelling' },
          { value: '70', label: '70% of dwelling' },
          { value: '100', label: '100% of dwelling' }
        ]
      },
      {
        key: 'liabilityLimit',
        label: 'Liability Coverage',
        type: 'select',
        defaultValue: '300000',
        required: true,
        options: [
          { value: '100000', label: '$100,000' },
          { value: '300000', label: '$300,000' },
          { value: '500000', label: '$500,000' },
          { value: '1000000', label: '$1,000,000' }
        ]
      }
    ],
    outputs: [
      {
        key: 'monthlyPremium',
        label: 'Monthly Premium',
        format: 'currency',
        decimals: 2,
        description: 'Estimated monthly cost',
        highlight: true
      },
      {
        key: 'annualPremium',
        label: 'Annual Premium',
        format: 'currency',
        decimals: 2,
        description: 'Yearly insurance cost',
        highlight: true
      },
      {
        key: 'dwellingCoverage',
        label: 'Dwelling Coverage',
        format: 'currency',
        decimals: 0,
        description: 'Structure protection'
      },
      {
        key: 'personalPropertyCoverage',
        label: 'Personal Property',
        format: 'currency',
        decimals: 0,
        description: 'Belongings coverage'
      },
      {
        key: 'liabilityCoverage',
        label: 'Liability Protection',
        format: 'currency',
        decimals: 0,
        description: 'Lawsuit protection'
      },
      {
        key: 'effectiveDeductible',
        label: 'Effective Deductible',
        format: 'currency',
        decimals: 0,
        description: 'Out-of-pocket for claims'
      },
      {
        key: 'coverageAnalysis',
        label: 'Coverage Analysis',
        format: 'text',
        description: 'Coverage adequacy'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Base rate: 0.35% of rebuild cost annually
          let baseRate = rebuildCost * 0.0035 / 12;
          
          // Location risk factor
          if (location === 'low') baseRate *= 0.8;
          else if (location === 'moderate') baseRate *= 1.0;
          else if (location === 'high') baseRate *= 1.5;
          else if (location === 'coastal') baseRate *= 2.5;
          
          // Home age factor
          if (homeAge < 10) baseRate *= 0.9;
          else if (homeAge < 25) baseRate *= 1.0;
          else if (homeAge < 50) baseRate *= 1.2;
          else baseRate *= 1.5;
          
          // Coverage type factor
          if (coverageType === 'actual') baseRate *= 0.8;
          else if (coverageType === 'replacement') baseRate *= 1.0;
          else if (coverageType === 'extended') baseRate *= 1.15;
          else if (coverageType === 'guaranteed') baseRate *= 1.3;
          
          // Deductible adjustment
          let effectiveDeductible = 0;
          if (deductible === '500') {
            baseRate *= 1.2;
            effectiveDeductible = 500;
          } else if (deductible === '1000') {
            baseRate *= 1.0;
            effectiveDeductible = 1000;
          } else if (deductible === '2500') {
            baseRate *= 0.85;
            effectiveDeductible = 2500;
          } else if (deductible === '5000') {
            baseRate *= 0.7;
            effectiveDeductible = 5000;
          } else if (deductible === '1percent') {
            baseRate *= 0.8;
            effectiveDeductible = homeValue * 0.01;
          } else { // 2percent
            baseRate *= 0.65;
            effectiveDeductible = homeValue * 0.02;
          }
          
          // Personal property factor
          const propertyPercent = parseInt(personalProperty) / 100;
          baseRate *= (1 + propertyPercent * 0.2);
          
          // Liability factor
          const liabilityNum = parseInt(liabilityLimit);
          if (liabilityNum >= 500000) baseRate *= 1.1;
          if (liabilityNum >= 1000000) baseRate *= 1.2;
          
          const monthlyPremium = baseRate;
          const annualPremium = monthlyPremium * 12;
          
          // Coverage amounts
          const dwellingCoverage = rebuildCost;
          const personalPropertyCoverage = rebuildCost * propertyPercent;
          const liabilityCoverage = liabilityNum;
          
          // Coverage analysis
          let coverageAnalysis = '';
          const coverageRatio = rebuildCost / homeValue;
          
          if (coverageRatio < 0.8) {
            coverageAnalysis = 'Underinsured: Rebuild cost seems low. Review with contractor for accurate replacement cost.';
          } else if (coverageType === 'actual') {
            coverageAnalysis = 'Basic coverage: Consider replacement cost coverage for better protection.';
          } else if (coverageType === 'guaranteed' || coverageType === 'extended') {
            coverageAnalysis = 'Excellent coverage: Full protection even if rebuild costs exceed coverage.';
          } else {
            coverageAnalysis = 'Good coverage: Standard replacement cost protection. Consider extended coverage in high-cost areas.';
          }
          
          return {
            monthlyPremium,
            annualPremium,
            dwellingCoverage,
            personalPropertyCoverage,
            liabilityCoverage,
            effectiveDeductible,
            coverageAnalysis
          };
        `,
        description: 'Calculate homeowners insurance premium'
      }
    ],
    localizedContent: {
      en: {
        title: 'Home Insurance Calculator',
        description: 'Estimate homeowners insurance premiums and coverage needs',
        keywords: ['home insurance calculator', 'homeowners insurance', 'property insurance', 'dwelling coverage', 'insurance estimate'],
        faq: [
          {
            question: 'Replacement cost vs actual cash value?',
            answer: 'Replacement cost pays to rebuild/replace without depreciation. Actual cash value deducts depreciation. Always choose replacement cost despite higher premium.'
          },
          {
            question: 'How much dwelling coverage do I need?',
            answer: 'Cover 100% of rebuild cost, not market value. Get contractor estimates. Consider extended (125%) or guaranteed replacement for full protection.'
          },
          {
            question: 'What\'s typically not covered?',
            answer: 'Floods, earthquakes, maintenance, pests, and intentional damage require separate policies. Review exclusions carefully.'
          }
        ],
        article: {
          title: 'Homeowners Insurance Guide',
          introduction: 'Home insurance protects your largest investment from damage, theft, and liability.',
          sections: [
            {
              heading: 'Coverage Components',
              content: 'Dwelling: structure. Personal property: belongings. Liability: lawsuits. Additional living expenses: temporary housing. Medical payments: guest injuries.'
            },
            {
              heading: 'Saving on Premiums',
              content: 'Bundle with auto, install security systems, maintain good credit, raise deductibles, update home systems, shop annually.'
            }
          ],
          conclusion: 'Adequate coverage is crucial. Don\'t underinsure to save money - protect your investment properly.',
          wordCount: 290
        }
      }
    }
  }
];

// Export function to get all insurance calculators
export function getInsuranceCalculators(): Calculator[] {
  return insuranceCalculators;
}

// Export function to get calculator by slug
export function getInsuranceCalculatorBySlug(slug: string): Calculator | undefined {
  return insuranceCalculators.find(calc => calc.slug === slug);
}