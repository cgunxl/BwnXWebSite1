// Finance Calculators Batch 1 - Real implementations with country-specific logic
import { Calculator, CalculatorInput, CalculatorOutput, CalculatorFormula } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';

// Country-specific financial configurations
const financeConfigs: Partial<Record<Locale, any>> = {
  en: {
    currency: 'USD',
    taxBrackets: [
      { min: 0, max: 11000, rate: 0.10 },
      { min: 11000, max: 44725, rate: 0.12 },
      { min: 44725, max: 95375, rate: 0.22 },
      { min: 95375, max: 182050, rate: 0.24 },
      { min: 182050, max: 231250, rate: 0.32 },
      { min: 231250, max: 578125, rate: 0.35 },
      { min: 578125, max: Infinity, rate: 0.37 }
    ],
    standardDeduction: 13850,
    mortgageRates: { avg: 0.0725, min: 0.065, max: 0.085 },
    carLoanRates: { avg: 0.0675, min: 0.045, max: 0.095 },
    creditCardAPR: { avg: 0.2149, min: 0.1599, max: 0.2899 }
  },
  th: {
    currency: 'THB',
    taxBrackets: [
      { min: 0, max: 150000, rate: 0 },
      { min: 150000, max: 300000, rate: 0.05 },
      { min: 300000, max: 500000, rate: 0.10 },
      { min: 500000, max: 750000, rate: 0.15 },
      { min: 750000, max: 1000000, rate: 0.20 },
      { min: 1000000, max: 2000000, rate: 0.25 },
      { min: 2000000, max: 5000000, rate: 0.30 },
      { min: 5000000, max: Infinity, rate: 0.35 }
    ],
    personalAllowance: 60000,
    mortgageRates: { avg: 0.0625, min: 0.055, max: 0.075 },
    carLoanRates: { avg: 0.055, min: 0.045, max: 0.075 },
    creditCardAPR: { avg: 0.18, min: 0.16, max: 0.20 }
  },
  ja: {
    currency: 'JPY',
    taxBrackets: [
      { min: 0, max: 1950000, rate: 0.05 },
      { min: 1950000, max: 3300000, rate: 0.10 },
      { min: 3300000, max: 6950000, rate: 0.20 },
      { min: 6950000, max: 9000000, rate: 0.23 },
      { min: 9000000, max: 18000000, rate: 0.33 },
      { min: 18000000, max: 40000000, rate: 0.40 },
      { min: 40000000, max: Infinity, rate: 0.45 }
    ],
    basicDeduction: 480000,
    mortgageRates: { avg: 0.015, min: 0.01, max: 0.025 },
    carLoanRates: { avg: 0.025, min: 0.02, max: 0.04 },
    creditCardAPR: { avg: 0.15, min: 0.12, max: 0.18 }
  },
  de: {
    currency: 'EUR',
    taxBrackets: [
      { min: 0, max: 10908, rate: 0 },
      { min: 10908, max: 62810, rate: 0.14 },
      { min: 62810, max: 277826, rate: 0.42 },
      { min: 277826, max: Infinity, rate: 0.45 }
    ],
    solidarityTax: 0.055, // On top of income tax
    churchTax: 0.08, // Optional, 8-9% of income tax
    mortgageRates: { avg: 0.0425, min: 0.035, max: 0.055 },
    carLoanRates: { avg: 0.045, min: 0.035, max: 0.065 },
    creditCardAPR: { avg: 0.1199, min: 0.0999, max: 0.1599 }
  },
  // Add more locales...
};

// 1. Advanced Loan Calculator with amortization
export function createLoanCalculator(locale: Locale): Calculator {
  const config = financeConfigs[locale] || financeConfigs.en;
  
  return {
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
        unit: config.currency,
        required: true,
        validation: { min: 1000, max: 10000000, required: true },
        placeholder: `Enter amount in ${config.currency}`
      },
      {
        key: 'interestRate',
        label: 'Annual Interest Rate',
        type: 'number',
        unit: '%',
        required: true,
        defaultValue: config.carLoanRates.avg * 100,
        validation: { min: 0.1, max: 50, required: true },
        step: 0.01
      },
      {
        key: 'loanTerm',
        label: 'Loan Term',
        type: 'number',
        unit: 'years',
        required: true,
        defaultValue: 5,
        validation: { min: 1, max: 30, required: true }
      },
      {
        key: 'paymentFrequency',
        label: 'Payment Frequency',
        type: 'select',
        required: true,
        defaultValue: 'monthly',
        options: [
          { value: 'monthly', label: 'Monthly' },
          { value: 'biweekly', label: 'Bi-weekly' },
          { value: 'weekly', label: 'Weekly' }
        ]
      }
    ],
    outputs: [
      { key: 'payment', label: 'Payment Amount', format: 'currency', precision: 2, primary: true },
      { key: 'totalPayment', label: 'Total Payment', format: 'currency', precision: 2 },
      { key: 'totalInterest', label: 'Total Interest', format: 'currency', precision: 2 },
      { key: 'effectiveRate', label: 'Effective Interest Rate', format: 'percentage', precision: 2 },
      { key: 'payoffDate', label: 'Payoff Date', format: 'text' }
    ],
    formulas: [
      {
        name: 'primary',
        expression: `({principal, interestRate, loanTerm, paymentFrequency}) => {
          const P = principal;
          const annualRate = interestRate / 100;
          const years = loanTerm;
          
          let periodsPerYear, totalPeriods, periodRate;
          
          switch(paymentFrequency) {
            case 'weekly':
              periodsPerYear = 52;
              break;
            case 'biweekly':
              periodsPerYear = 26;
              break;
            default:
              periodsPerYear = 12;
          }
          
          totalPeriods = years * periodsPerYear;
          periodRate = annualRate / periodsPerYear;
          
          // Calculate payment using amortization formula
          const payment = P * (periodRate * Math.pow(1 + periodRate, totalPeriods)) / 
                          (Math.pow(1 + periodRate, totalPeriods) - 1);
          
          const totalPayment = payment * totalPeriods;
          const totalInterest = totalPayment - P;
          
          // Calculate effective rate
          const effectiveRate = Math.pow(1 + periodRate, periodsPerYear) - 1;
          
          // Calculate payoff date
          const today = new Date();
          const payoffDate = new Date(today.setMonth(today.getMonth() + (years * 12)));
          
          return {
            payment,
            totalPayment,
            totalInterest,
            effectiveRate: effectiveRate * 100,
            payoffDate: payoffDate.toLocaleDateString()
          };
        }`,
        variables: ['principal', 'interestRate', 'loanTerm', 'paymentFrequency'],
        description: 'Advanced loan amortization calculation'
      }
    ],
    graph: {
      type: 'line',
      xAxis: 'Payment Number',
      yAxis: 'Balance',
      showProjection: true,
      showMilestones: true
    },
    relatedCalculators: ['mortgage-calculator', 'car-loan-calculator', 'debt-payoff'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณสินเชื่อ' : 'Loan Calculator',
        description: locale === 'th' ? 
          'คำนวณค่างวดสินเชื่อ ดอกเบี้ย และแผนการผ่อนชำระ' :
          'Calculate loan payments, interest, and amortization schedule',
        keywords: ['loan', 'interest', 'payment', 'amortization'],
        faq: [],
        article: ''
      }
    }
  };
}

// 2. Mortgage Calculator with PMI, taxes, insurance
export function createMortgageCalculator(locale: Locale): Calculator {
  const config = financeConfigs[locale] || financeConfigs.en;
  
  return {
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
        unit: config.currency,
        required: true,
        validation: { min: 10000, max: 100000000, required: true }
      },
      {
        key: 'downPayment',
        label: 'Down Payment',
        type: 'number',
        unit: '%',
        required: true,
        defaultValue: 20,
        validation: { min: 0, max: 100, required: true }
      },
      {
        key: 'interestRate',
        label: 'Interest Rate',
        type: 'number',
        unit: '%',
        required: true,
        defaultValue: config.mortgageRates.avg * 100,
        validation: { min: 0.1, max: 20, required: true },
        step: 0.01
      },
      {
        key: 'loanTerm',
        label: 'Loan Term',
        type: 'select',
        required: true,
        defaultValue: '30',
        options: [
          { value: '15', label: '15 years' },
          { value: '20', label: '20 years' },
          { value: '30', label: '30 years' }
        ]
      },
      {
        key: 'propertyTax',
        label: 'Annual Property Tax',
        type: 'number',
        unit: config.currency,
        defaultValue: 0,
        validation: { min: 0, max: 100000, required: false }
      },
      {
        key: 'homeInsurance',
        label: 'Annual Home Insurance',
        type: 'number',
        unit: config.currency,
        defaultValue: 0,
        validation: { min: 0, max: 50000, required: false }
      },
      {
        key: 'hoaFees',
        label: 'Monthly HOA Fees',
        type: 'number',
        unit: config.currency,
        defaultValue: 0,
        validation: { min: 0, max: 5000, required: false }
      }
    ],
    outputs: [
      { key: 'monthlyPayment', label: 'Monthly Payment (P&I)', format: 'currency', precision: 2, primary: true },
      { key: 'totalMonthlyPayment', label: 'Total Monthly Payment', format: 'currency', precision: 2 },
      { key: 'loanAmount', label: 'Loan Amount', format: 'currency', precision: 2 },
      { key: 'totalInterest', label: 'Total Interest', format: 'currency', precision: 2 },
      { key: 'totalPaid', label: 'Total Amount Paid', format: 'currency', precision: 2 },
      { key: 'pmiAmount', label: 'Monthly PMI', format: 'currency', precision: 2 },
      { key: 'monthlyTax', label: 'Monthly Property Tax', format: 'currency', precision: 2 },
      { key: 'monthlyInsurance', label: 'Monthly Insurance', format: 'currency', precision: 2 }
    ],
    formulas: [
      {
        name: 'primary',
        expression: `({homePrice, downPayment, interestRate, loanTerm, propertyTax, homeInsurance, hoaFees}) => {
          const downPaymentAmount = homePrice * (downPayment / 100);
          const loanAmount = homePrice - downPaymentAmount;
          const monthlyRate = (interestRate / 100) / 12;
          const numPayments = parseInt(loanTerm) * 12;
          
          // Calculate monthly P&I payment
          const monthlyPayment = loanAmount * 
            (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
            (Math.pow(1 + monthlyRate, numPayments) - 1);
          
          // Calculate PMI if down payment < 20%
          let pmiAmount = 0;
          if (downPayment < 20) {
            pmiAmount = loanAmount * 0.005; // 0.5% of loan amount annually / 12
          }
          
          // Calculate monthly portions
          const monthlyTax = propertyTax / 12;
          const monthlyInsurance = homeInsurance / 12;
          
          // Total monthly payment
          const totalMonthlyPayment = monthlyPayment + pmiAmount + monthlyTax + monthlyInsurance + hoaFees;
          
          // Total amounts
          const totalPaid = monthlyPayment * numPayments;
          const totalInterest = totalPaid - loanAmount;
          
          return {
            monthlyPayment,
            totalMonthlyPayment,
            loanAmount,
            totalInterest,
            totalPaid,
            pmiAmount,
            monthlyTax,
            monthlyInsurance
          };
        }`,
        variables: ['homePrice', 'downPayment', 'interestRate', 'loanTerm', 'propertyTax', 'homeInsurance', 'hoaFees'],
        description: 'Complete mortgage calculation with taxes and insurance'
      }
    ],
    graph: {
      type: 'donut',
      showLegend: true,
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
    },
    relatedCalculators: ['loan-calculator', 'refinance-calculator', 'property-tax'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณสินเชื่อบ้าน' : 'Mortgage Calculator',
        description: locale === 'th' ? 
          'คำนวณค่างวดบ้าน พร้อมภาษี ประกัน และค่าใช้จ่ายอื่นๆ' :
          'Calculate mortgage payments with taxes, insurance, and fees',
        keywords: ['mortgage', 'home loan', 'property', 'real estate'],
        faq: [],
        article: ''
      }
    }
  };
}

// 3. Tax Calculator with progressive brackets
export function createTaxCalculator(locale: Locale): Calculator {
  const config = financeConfigs[locale] || financeConfigs.en;
  
  return {
    id: 'tax-calculator',
    slug: 'tax-calculator',
    category: 'finance',
    icon: '📊',
    color: '#F59E0B',
    inputs: [
      {
        key: 'annualIncome',
        label: 'Annual Income',
        type: 'number',
        unit: config.currency,
        required: true,
        validation: { min: 0, max: 100000000, required: true }
      },
      {
        key: 'filingStatus',
        label: 'Filing Status',
        type: 'select',
        required: true,
        defaultValue: 'single',
        options: [
          { value: 'single', label: 'Single' },
          { value: 'married', label: 'Married Filing Jointly' },
          { value: 'head', label: 'Head of Household' }
        ]
      },
      {
        key: 'deductions',
        label: 'Total Deductions',
        type: 'number',
        unit: config.currency,
        defaultValue: config.standardDeduction || config.personalAllowance || 0,
        validation: { min: 0, max: 10000000, required: false }
      },
      {
        key: 'dependents',
        label: 'Number of Dependents',
        type: 'number',
        defaultValue: 0,
        validation: { min: 0, max: 20, required: false }
      }
    ],
    outputs: [
      { key: 'taxableIncome', label: 'Taxable Income', format: 'currency', precision: 2 },
      { key: 'federalTax', label: 'Federal/National Tax', format: 'currency', precision: 2, primary: true },
      { key: 'effectiveRate', label: 'Effective Tax Rate', format: 'percentage', precision: 2 },
      { key: 'marginalRate', label: 'Marginal Tax Rate', format: 'percentage', precision: 2 },
      { key: 'afterTaxIncome', label: 'After-Tax Income', format: 'currency', precision: 2 },
      { key: 'monthlyTakeHome', label: 'Monthly Take-Home', format: 'currency', precision: 2 }
    ],
    formulas: [
      {
        name: 'primary',
        expression: `({annualIncome, filingStatus, deductions, dependents}) => {
          const brackets = ${JSON.stringify(config.taxBrackets)};
          
          // Calculate taxable income
          const standardDeduction = ${config.standardDeduction || config.personalAllowance || 0};
          const dependentDeduction = dependents * 2000; // Simplified
          const totalDeductions = Math.max(deductions, standardDeduction) + dependentDeduction;
          const taxableIncome = Math.max(0, annualIncome - totalDeductions);
          
          // Calculate tax using progressive brackets
          let tax = 0;
          let marginalRate = 0;
          
          for (let i = 0; i < brackets.length; i++) {
            const bracket = brackets[i];
            const bracketIncome = Math.min(taxableIncome, bracket.max) - bracket.min;
            
            if (bracketIncome > 0) {
              tax += bracketIncome * bracket.rate;
              marginalRate = bracket.rate;
            }
            
            if (taxableIncome <= bracket.max) break;
          }
          
          const effectiveRate = annualIncome > 0 ? (tax / annualIncome) : 0;
          const afterTaxIncome = annualIncome - tax;
          const monthlyTakeHome = afterTaxIncome / 12;
          
          return {
            taxableIncome,
            federalTax: tax,
            effectiveRate: effectiveRate * 100,
            marginalRate: marginalRate * 100,
            afterTaxIncome,
            monthlyTakeHome
          };
        }`,
        variables: ['annualIncome', 'filingStatus', 'deductions', 'dependents'],
        description: 'Progressive tax calculation based on country-specific brackets'
      }
    ],
    graph: {
      type: 'category-bar',
      animated: true,
      showLegend: true
    },
    relatedCalculators: ['paycheck-calculator', 'salary-calculator', 'vat-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณภาษีเงินได้' : 'Tax Calculator',
        description: locale === 'th' ? 
          'คำนวณภาษีเงินได้บุคคลธรรมดาตามอัตราก้าวหน้า' :
          'Calculate income tax with progressive tax brackets',
        keywords: ['tax', 'income tax', 'deductions', 'tax brackets'],
        faq: [],
        article: ''
      }
    }
  };
}

// 4. Compound Interest Calculator
export function createCompoundInterestCalculator(locale: Locale): Calculator {
  const config = financeConfigs[locale] || financeConfigs.en;
  
  return {
    id: 'compound-interest',
    slug: 'compound-interest',
    category: 'finance',
    icon: '📈',
    color: '#8B5CF6',
    inputs: [
      {
        key: 'principal',
        label: 'Initial Investment',
        type: 'number',
        unit: config.currency,
        required: true,
        validation: { min: 1, max: 100000000, required: true }
      },
      {
        key: 'monthlyContribution',
        label: 'Monthly Contribution',
        type: 'number',
        unit: config.currency,
        defaultValue: 0,
        validation: { min: 0, max: 1000000, required: false }
      },
      {
        key: 'annualRate',
        label: 'Annual Interest Rate',
        type: 'number',
        unit: '%',
        required: true,
        defaultValue: 7,
        validation: { min: -20, max: 50, required: true },
        step: 0.01
      },
      {
        key: 'years',
        label: 'Investment Period',
        type: 'number',
        unit: 'years',
        required: true,
        defaultValue: 10,
        validation: { min: 1, max: 50, required: true }
      },
      {
        key: 'compoundingFrequency',
        label: 'Compounding Frequency',
        type: 'select',
        required: true,
        defaultValue: 'monthly',
        options: [
          { value: 'daily', label: 'Daily (365)' },
          { value: 'monthly', label: 'Monthly (12)' },
          { value: 'quarterly', label: 'Quarterly (4)' },
          { value: 'annually', label: 'Annually (1)' }
        ]
      }
    ],
    outputs: [
      { key: 'futureValue', label: 'Future Value', format: 'currency', precision: 2, primary: true },
      { key: 'totalContributions', label: 'Total Contributions', format: 'currency', precision: 2 },
      { key: 'totalInterest', label: 'Total Interest Earned', format: 'currency', precision: 2 },
      { key: 'roi', label: 'Return on Investment', format: 'percentage', precision: 2 },
      { key: 'effectiveRate', label: 'Effective Annual Rate', format: 'percentage', precision: 3 }
    ],
    formulas: [
      {
        name: 'primary',
        expression: `({principal, monthlyContribution, annualRate, years, compoundingFrequency}) => {
          const r = annualRate / 100;
          const t = years;
          
          let n; // Compounding periods per year
          switch(compoundingFrequency) {
            case 'daily': n = 365; break;
            case 'quarterly': n = 4; break;
            case 'annually': n = 1; break;
            default: n = 12;
          }
          
          // Future value of initial principal
          const fvPrincipal = principal * Math.pow(1 + r/n, n*t);
          
          // Future value of monthly contributions (converted to match compounding)
          let fvContributions = 0;
          if (monthlyContribution > 0) {
            const monthlyRate = r / 12;
            const months = t * 12;
            fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
          }
          
          const futureValue = fvPrincipal + fvContributions;
          const totalContributions = principal + (monthlyContribution * 12 * t);
          const totalInterest = futureValue - totalContributions;
          const roi = totalContributions > 0 ? (totalInterest / totalContributions) * 100 : 0;
          
          // Effective annual rate
          const effectiveRate = (Math.pow(1 + r/n, n) - 1) * 100;
          
          return {
            futureValue,
            totalContributions,
            totalInterest,
            roi,
            effectiveRate
          };
        }`,
        variables: ['principal', 'monthlyContribution', 'annualRate', 'years', 'compoundingFrequency'],
        description: 'Compound interest calculation with regular contributions'
      }
    ],
    graph: {
      type: 'line',
      xAxis: 'Year',
      yAxis: 'Value',
      lines: ['Principal', 'Interest', 'Total'],
      showProjection: true
    },
    relatedCalculators: ['savings-goal', 'investment-calculator', 'retirement-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณดอกเบี้ยทบต้น' : 'Compound Interest Calculator',
        description: locale === 'th' ? 
          'คำนวณผลตอบแทนจากดอกเบี้ยทบต้นและการลงทุนสม่ำเสมอ' :
          'Calculate returns with compound interest and regular contributions',
        keywords: ['compound interest', 'investment', 'savings', 'returns'],
        faq: [],
        article: ''
      }
    }
  };
}

// Export all finance calculators batch 1
export const financeCalculatorsBatch1 = [
  createLoanCalculator,
  createMortgageCalculator,
  createTaxCalculator,
  createCompoundInterestCalculator
];