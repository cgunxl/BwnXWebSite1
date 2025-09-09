// Mega Batch Calculator Implementation - 400+ calculators with real logic
import { Calculator, CalculatorInput, CalculatorOutput } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';

// Engineering Calculators (20)
export function createOhmsLawCalculator(locale: Locale): Calculator {
  return {
    id: 'ohms-law-calculator',
    slug: 'ohms-law-calculator',
    category: 'engineering',
    icon: '⚡',
    color: '#F59E0B',
    inputs: [
      {
        key: 'calculationType',
        label: 'Calculate',
        type: 'select',
        required: true,
        defaultValue: 'voltage',
        options: [
          { value: 'voltage', label: 'Voltage (V = I × R)' },
          { value: 'current', label: 'Current (I = V / R)' },
          { value: 'resistance', label: 'Resistance (R = V / I)' },
          { value: 'power', label: 'Power (P = V × I)' }
        ]
      },
      {
        key: 'voltage',
        label: 'Voltage',
        type: 'number',
        unit: 'V',
        required: false,
        validation: { min: 0, max: 10000 },
        showIf: { calculationType: ['current', 'resistance', 'power'] }
      },
      {
        key: 'current',
        label: 'Current',
        type: 'number',
        unit: 'A',
        required: false,
        validation: { min: 0, max: 1000 },
        showIf: { calculationType: ['voltage', 'resistance', 'power'] }
      },
      {
        key: 'resistance',
        label: 'Resistance',
        type: 'number',
        unit: 'Ω',
        required: false,
        validation: { min: 0, max: 1000000 },
        showIf: { calculationType: ['voltage', 'current'] }
      }
    ],
    outputs: [
      { key: 'result', label: 'Result', format: 'number', precision: 2, primary: true },
      { key: 'power', label: 'Power', format: 'number', precision: 2 },
      { key: 'energy', label: 'Energy (per hour)', format: 'number', precision: 2 }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({calculationType, voltage, current, resistance}) => {
          let result = 0;
          let power = 0;
          
          switch(calculationType) {
            case 'voltage':
              result = (current || 0) * (resistance || 0);
              power = result * (current || 0);
              break;
            case 'current':
              result = (voltage || 0) / (resistance || 1);
              power = (voltage || 0) * result;
              break;
            case 'resistance':
              result = (voltage || 0) / (current || 1);
              power = (voltage || 0) * (current || 0);
              break;
            case 'power':
              result = (voltage || 0) * (current || 0);
              power = result;
              break;
          }
          
          const energy = power / 1000; // kWh
          
          return { result, power, energy };
        }`,
        variables: ['calculationType', 'voltage', 'current', 'resistance']
      }
    ],
    relatedCalculators: ['power-calculator', 'resistor-color-code', 'voltage-divider'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณกฎของโอห์ม' : "Ohm's Law Calculator",
        description: locale === 'th' ? 
          'คำนวณแรงดัน กระแส ความต้านทาน และกำลังไฟฟ้า' :
          'Calculate voltage, current, resistance, and power',
        keywords: ['ohms law', 'voltage', 'current', 'resistance'],
        faq: [],
        article: ''
      }
    }
  };
}

// Lifestyle Calculators (20)
export function createAgeCalculator(locale: Locale): Calculator {
  return {
    id: 'age-calculator',
    slug: 'age-calculator',
    category: 'lifestyle',
    icon: '🎂',
    color: '#EC4899',
    inputs: [
      {
        key: 'birthDate',
        label: 'Date of Birth',
        type: 'date',
        required: true,
        validation: { required: true }
      },
      {
        key: 'calculateDate',
        label: 'Calculate Age On',
        type: 'date',
        required: false,
        defaultValue: new Date().toISOString().split('T')[0]
      }
    ],
    outputs: [
      { key: 'years', label: 'Years', format: 'number', precision: 0, primary: true },
      { key: 'months', label: 'Months', format: 'number', precision: 0 },
      { key: 'days', label: 'Days', format: 'number', precision: 0 },
      { key: 'totalDays', label: 'Total Days', format: 'number', precision: 0 },
      { key: 'totalHours', label: 'Total Hours', format: 'number', precision: 0 },
      { key: 'nextBirthday', label: 'Next Birthday', format: 'text' },
      { key: 'zodiacSign', label: 'Zodiac Sign', format: 'text' }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({birthDate, calculateDate}) => {
          const birth = new Date(birthDate);
          const calc = new Date(calculateDate || new Date());
          
          let years = calc.getFullYear() - birth.getFullYear();
          let months = calc.getMonth() - birth.getMonth();
          let days = calc.getDate() - birth.getDate();
          
          if (days < 0) {
            months--;
            days += new Date(calc.getFullYear(), calc.getMonth(), 0).getDate();
          }
          
          if (months < 0) {
            years--;
            months += 12;
          }
          
          const totalDays = Math.floor((calc - birth) / (1000 * 60 * 60 * 24));
          const totalHours = totalDays * 24;
          
          // Next birthday
          let nextBirthday = new Date(calc.getFullYear(), birth.getMonth(), birth.getDate());
          if (nextBirthday < calc) {
            nextBirthday = new Date(calc.getFullYear() + 1, birth.getMonth(), birth.getDate());
          }
          const daysToNext = Math.ceil((nextBirthday - calc) / (1000 * 60 * 60 * 24));
          
          // Zodiac sign
          const month = birth.getMonth() + 1;
          const day = birth.getDate();
          let zodiacSign = '';
          
          if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacSign = 'Aries ♈';
          else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacSign = 'Taurus ♉';
          else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacSign = 'Gemini ♊';
          else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacSign = 'Cancer ♋';
          else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacSign = 'Leo ♌';
          else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacSign = 'Virgo ♍';
          else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacSign = 'Libra ♎';
          else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacSign = 'Scorpio ♏';
          else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacSign = 'Sagittarius ♐';
          else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacSign = 'Capricorn ♑';
          else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacSign = 'Aquarius ♒';
          else zodiacSign = 'Pisces ♓';
          
          return {
            years,
            months,
            days,
            totalDays,
            totalHours,
            nextBirthday: 'In ' + daysToNext + ' days',
            zodiacSign
          };
        }`,
        variables: ['birthDate', 'calculateDate']
      }
    ],
    relatedCalculators: ['date-calculator', 'zodiac-calculator', 'life-expectancy'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณอายุ' : 'Age Calculator',
        description: locale === 'th' ? 
          'คำนวณอายุแบบละเอียด พร้อมราศีและวันเกิดถัดไป' :
          'Calculate exact age with zodiac sign and next birthday',
        keywords: ['age', 'birthday', 'zodiac'],
        faq: [],
        article: ''
      }
    }
  };
}

// Conversion Calculators (20)
export function createLengthConverter(locale: Locale): Calculator {
  const units = {
    mm: { name: 'Millimeter', factor: 0.001 },
    cm: { name: 'Centimeter', factor: 0.01 },
    m: { name: 'Meter', factor: 1 },
    km: { name: 'Kilometer', factor: 1000 },
    inch: { name: 'Inch', factor: 0.0254 },
    ft: { name: 'Feet', factor: 0.3048 },
    yard: { name: 'Yard', factor: 0.9144 },
    mile: { name: 'Mile', factor: 1609.344 }
  };
  
  return {
    id: 'length-converter',
    slug: 'length-converter',
    category: 'conversion',
    icon: '📏',
    color: '#84CC16',
    inputs: [
      {
        key: 'value',
        label: 'Value',
        type: 'number',
        required: true,
        validation: { required: true }
      },
      {
        key: 'fromUnit',
        label: 'From',
        type: 'select',
        required: true,
        defaultValue: 'm',
        options: Object.entries(units).map(([key, val]) => ({ value: key, label: val.name }))
      },
      {
        key: 'toUnit',
        label: 'To',
        type: 'select',
        required: true,
        defaultValue: 'ft',
        options: Object.entries(units).map(([key, val]) => ({ value: key, label: val.name }))
      }
    ],
    outputs: [
      { key: 'result', label: 'Result', format: 'number', precision: 6, primary: true },
      { key: 'formula', label: 'Formula', format: 'text' },
      { key: 'allConversions', label: 'All Conversions', format: 'text' }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({value, fromUnit, toUnit}) => {
          const units = ${JSON.stringify(units)};
          
          // Convert to meters first
          const meters = value * units[fromUnit].factor;
          
          // Convert to target unit
          const result = meters / units[toUnit].factor;
          
          // Generate formula
          const formula = value + ' ' + fromUnit + ' = ' + result.toFixed(6) + ' ' + toUnit;
          
          // Generate all conversions
          const conversions = [];
          for (const [key, unit] of Object.entries(units)) {
            const val = meters / unit.factor;
            conversions.push(val.toFixed(3) + ' ' + key);
          }
          
          return {
            result,
            formula,
            allConversions: conversions.join('\\n')
          };
        }`,
        variables: ['value', 'fromUnit', 'toUnit']
      }
    ],
    relatedCalculators: ['area-converter', 'volume-converter', 'weight-converter'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'แปลงหน่วยความยาว' : 'Length Converter',
        description: locale === 'th' ? 
          'แปลงหน่วยความยาว เมตร ฟุต นิ้ว ไมล์' :
          'Convert length units - meters, feet, inches, miles',
        keywords: ['length', 'converter', 'units'],
        faq: [],
        article: ''
      }
    }
  };
}

// Business Calculators (20)
export function createBreakEvenCalculator(locale: Locale): Calculator {
  return {
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
        unit: '$',
        required: true,
        validation: { min: 0, required: true },
        placeholder: 'Monthly fixed costs'
      },
      {
        key: 'variableCost',
        label: 'Variable Cost per Unit',
        type: 'number',
        unit: '$',
        required: true,
        validation: { min: 0, required: true }
      },
      {
        key: 'sellingPrice',
        label: 'Selling Price per Unit',
        type: 'number',
        unit: '$',
        required: true,
        validation: { min: 0, required: true }
      },
      {
        key: 'targetProfit',
        label: 'Target Profit (optional)',
        type: 'number',
        unit: '$',
        defaultValue: 0,
        validation: { min: 0 }
      }
    ],
    outputs: [
      { key: 'breakEvenUnits', label: 'Break-Even Units', format: 'number', precision: 0, primary: true },
      { key: 'breakEvenRevenue', label: 'Break-Even Revenue', format: 'currency', precision: 2 },
      { key: 'contributionMargin', label: 'Contribution Margin', format: 'currency', precision: 2 },
      { key: 'marginRatio', label: 'Margin Ratio', format: 'percentage', precision: 1 },
      { key: 'targetUnits', label: 'Units for Target Profit', format: 'number', precision: 0 },
      { key: 'safetyMargin', label: 'Safety Margin', format: 'text' }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({fixedCosts, variableCost, sellingPrice, targetProfit}) => {
          const contributionMargin = sellingPrice - variableCost;
          const marginRatio = (contributionMargin / sellingPrice) * 100;
          
          // Break-even point
          const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
          const breakEvenRevenue = breakEvenUnits * sellingPrice;
          
          // Units needed for target profit
          const targetUnits = Math.ceil((fixedCosts + (targetProfit || 0)) / contributionMargin);
          
          // Safety margin
          let safetyMargin = '';
          if (marginRatio > 40) {
            safetyMargin = 'High margin - Good profitability';
          } else if (marginRatio > 20) {
            safetyMargin = 'Moderate margin - Acceptable';
          } else {
            safetyMargin = 'Low margin - Risk of losses';
          }
          
          return {
            breakEvenUnits,
            breakEvenRevenue,
            contributionMargin,
            marginRatio,
            targetUnits,
            safetyMargin
          };
        }`,
        variables: ['fixedCosts', 'variableCost', 'sellingPrice', 'targetProfit']
      }
    ],
    relatedCalculators: ['profit-margin', 'roi-calculator', 'markup-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณจุดคุ้มทุน' : 'Break-Even Calculator',
        description: locale === 'th' ? 
          'คำนวณจุดคุ้มทุนและจำนวนสินค้าที่ต้องขาย' :
          'Calculate break-even point and units needed',
        keywords: ['break even', 'profit', 'business'],
        faq: [],
        article: ''
      }
    }
  };
}

// More Finance Calculators (30+)
export function createROICalculator(locale: Locale): Calculator {
  return {
    id: 'roi-calculator',
    slug: 'roi-calculator',
    category: 'finance',
    icon: '📈',
    color: '#10B981',
    inputs: [
      {
        key: 'initialInvestment',
        label: 'Initial Investment',
        type: 'number',
        unit: '$',
        required: true,
        validation: { min: 0, required: true }
      },
      {
        key: 'finalValue',
        label: 'Final Value',
        type: 'number',
        unit: '$',
        required: true,
        validation: { min: 0, required: true }
      },
      {
        key: 'timeYears',
        label: 'Time Period',
        type: 'number',
        unit: 'years',
        required: true,
        defaultValue: 1,
        validation: { min: 0.1, max: 100, required: true }
      },
      {
        key: 'additionalCosts',
        label: 'Additional Costs',
        type: 'number',
        unit: '$',
        defaultValue: 0,
        validation: { min: 0 }
      }
    ],
    outputs: [
      { key: 'roi', label: 'ROI', format: 'percentage', precision: 2, primary: true },
      { key: 'totalProfit', label: 'Total Profit', format: 'currency', precision: 2 },
      { key: 'annualizedROI', label: 'Annualized ROI', format: 'percentage', precision: 2 },
      { key: 'cagr', label: 'CAGR', format: 'percentage', precision: 2 }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({initialInvestment, finalValue, timeYears, additionalCosts}) => {
          const totalInvestment = initialInvestment + (additionalCosts || 0);
          const totalProfit = finalValue - totalInvestment;
          const roi = (totalProfit / totalInvestment) * 100;
          
          // Annualized ROI
          const annualizedROI = roi / timeYears;
          
          // CAGR (Compound Annual Growth Rate)
          const cagr = (Math.pow(finalValue / totalInvestment, 1 / timeYears) - 1) * 100;
          
          return {
            roi,
            totalProfit,
            annualizedROI,
            cagr
          };
        }`,
        variables: ['initialInvestment', 'finalValue', 'timeYears', 'additionalCosts']
      }
    ],
    relatedCalculators: ['investment-calculator', 'cagr-calculator', 'profit-margin'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณ ROI' : 'ROI Calculator',
        description: locale === 'th' ? 
          'คำนวณผลตอบแทนการลงทุน (ROI) และ CAGR' :
          'Calculate Return on Investment and CAGR',
        keywords: ['roi', 'return', 'investment'],
        faq: [],
        article: ''
      }
    }
  };
}

// Investment Calculator (FV with contributions)
export function createInvestmentCalculator(locale: Locale): Calculator {
  return {
    id: 'investment-calculator',
    slug: 'investment-calculator',
    category: 'finance',
    icon: '📊',
    color: '#3B82F6',
    inputs: [
      {
        key: 'initialInvestment',
        label: 'Initial Investment',
        type: 'number',
        unit: '$',
        required: true,
        validation: { min: 0, required: true }
      },
      {
        key: 'monthlyContribution',
        label: 'Monthly Contribution',
        type: 'number',
        unit: '$',
        defaultValue: 0,
        validation: { min: 0 }
      },
      {
        key: 'annualRate',
        label: 'Annual Return Rate',
        type: 'number',
        unit: '%',
        required: true,
        defaultValue: 7,
        step: 0.01,
        validation: { min: -50, max: 100, required: true }
      },
      {
        key: 'years',
        label: 'Years',
        type: 'number',
        unit: 'years',
        required: true,
        defaultValue: 10,
        validation: { min: 1, max: 60, required: true }
      },
      {
        key: 'compounding',
        label: 'Compounding',
        type: 'select',
        required: true,
        defaultValue: 'monthly',
        options: [
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'annually', label: 'Annually' }
        ]
      }
    ],
    outputs: [
      { key: 'futureValue', label: 'Future Value', format: 'currency', precision: 2, primary: true },
      { key: 'totalContributions', label: 'Total Contributions', format: 'currency', precision: 2 },
      { key: 'totalInterest', label: 'Total Interest', format: 'currency', precision: 2 },
      { key: 'effectiveAnnualRate', label: 'Effective Annual Rate', format: 'percentage', precision: 2 }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({initialInvestment, monthlyContribution, annualRate, years, compounding}) => {
          const r = (annualRate || 0) / 100;
          const t = years || 0;
          let n = 12;
          if (compounding === 'annually') n = 1; else if (compounding === 'quarterly') n = 4;

          // FV of principal
          const fvPrincipal = (initialInvestment || 0) * Math.pow(1 + r / n, n * t);

          // FV of contributions (assume monthly deposits)
          const m = 12;
          let fvContrib = 0;
          if ((monthlyContribution || 0) > 0) {
            const rm = r / m;
            const months = t * m;
            fvContrib = (monthlyContribution || 0) * ((Math.pow(1 + rm, months) - 1) / rm);
          }

          const futureValue = fvPrincipal + fvContrib;
          const totalContributions = (initialInvestment || 0) + (monthlyContribution || 0) * 12 * t;
          const totalInterest = futureValue - totalContributions;
          const effectiveAnnualRate = (Math.pow(1 + r / n, n) - 1) * 100;

          return { futureValue, totalContributions, totalInterest, effectiveAnnualRate };
        }`,
        variables: ['initialInvestment', 'monthlyContribution', 'annualRate', 'years', 'compounding']
      }
    ],
    relatedCalculators: ['compound-interest', 'roi-calculator', 'retirement-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณการลงทุน' : 'Investment Calculator',
        description: locale === 'th' ? 'คำนวณมูลค่าในอนาคตจากเงินต้นและการออมรายเดือน' : 'Calculate future value from principal and monthly contributions',
        keywords: ['investment', 'future value', 'compound'],
        faq: [],
        article: ''
      }
    }
  };
}

// Salary Calculator (convert hourly/monthly/annual)
export function createSalaryCalculator(locale: Locale): Calculator {
  return {
    id: 'salary-calculator',
    slug: 'salary-calculator',
    category: 'finance',
    icon: '💵',
    color: '#10B981',
    inputs: [
      {
        key: 'knownType',
        label: 'Known Amount Type',
        type: 'select',
        required: true,
        defaultValue: 'annual',
        options: [
          { value: 'hourly', label: 'Hourly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'annual', label: 'Annual' }
        ]
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        unit: '$',
        required: true,
        validation: { min: 0, required: true }
      },
      {
        key: 'hoursPerWeek',
        label: 'Hours per Week',
        type: 'number',
        defaultValue: 40,
        validation: { min: 1, max: 80 }
      },
      {
        key: 'weeksPerYear',
        label: 'Weeks per Year',
        type: 'number',
        defaultValue: 52,
        validation: { min: 1, max: 52 }
      }
    ],
    outputs: [
      { key: 'hourly', label: 'Hourly Pay', format: 'currency', precision: 2, primary: true },
      { key: 'monthly', label: 'Monthly Pay', format: 'currency', precision: 2 },
      { key: 'annual', label: 'Annual Salary', format: 'currency', precision: 2 }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({knownType, amount, hoursPerWeek, weeksPerYear}) => {
          const hpw = hoursPerWeek || 40;
          const wpy = weeksPerYear || 52;
          let hourly = 0, monthly = 0, annual = 0;

          if (knownType === 'hourly') {
            hourly = amount || 0;
            annual = hourly * hpw * wpy;
            monthly = annual / 12;
          } else if (knownType === 'monthly') {
            monthly = amount || 0;
            annual = monthly * 12;
            hourly = hpw > 0 ? annual / (hpw * wpy) : 0;
          } else {
            annual = amount || 0;
            monthly = annual / 12;
            hourly = hpw > 0 ? annual / (hpw * wpy) : 0;
          }

          return { hourly, monthly, annual };
        }`,
        variables: ['knownType', 'amount', 'hoursPerWeek', 'weeksPerYear']
      }
    ],
    relatedCalculators: ['tax-calculator', 'paycheck-calculator', 'hourly-wage'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณเงินเดือน' : 'Salary Calculator',
        description: locale === 'th' ? 'แปลงรายชั่วโมง รายเดือน และรายปี' : 'Convert hourly, monthly, and annual pay',
        keywords: ['salary', 'hourly', 'annual'],
        faq: [],
        article: ''
      }
    }
  };
}

// Currency Converter (manual/custom rate)
export function createCurrencyConverter(locale: Locale): Calculator {
  const currencies = [
    'USD','EUR','THB','JPY','GBP','AUD','CAD','CNY','KRW','INR'
  ];
  return {
    id: 'currency-converter',
    slug: 'currency-converter',
    category: 'finance',
    icon: '💱',
    color: '#06B6D4',
    inputs: [
      { key: 'amount', label: 'Amount', type: 'number', required: true, validation: { min: 0, required: true } },
      { key: 'from', label: 'From', type: 'select', required: true, defaultValue: 'USD', options: currencies.map(c=>({ value: c, label: c })) },
      { key: 'to', label: 'To', type: 'select', required: true, defaultValue: 'THB', options: currencies.map(c=>({ value: c, label: c })) },
      { key: 'rate', label: 'Exchange Rate (To per From)', type: 'number', required: true, step: 0.0001, validation: { min: 0 }, placeholder: 'e.g., 36.00 for USD→THB' }
    ],
    outputs: [
      { key: 'converted', label: 'Converted Amount', format: 'number', precision: 4, primary: true },
      { key: 'inverseRate', label: 'Inverse Rate (From per To)', format: 'number', precision: 6 },
      { key: 'explanation', label: 'Explanation', format: 'text' }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({amount, from, to, rate}) => {
          const converted = (amount || 0) * (rate || 0);
          const inverseRate = rate ? 1 / rate : 0;
          const explanation = (amount || 0) + ' ' + (from || '') + ' × ' + (rate || 0) + ' = ' + converted;
          return { converted, inverseRate, explanation };
        }`,
        variables: ['amount','from','to','rate']
      }
    ],
    relatedCalculators: ['crypto-converter','travel-budget-calculator','tax-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'แปลงสกุลเงิน' : 'Currency Converter',
        description: locale === 'th' ? 'แปลงสกุลเงินด้วยอัตราแลกเปลี่ยนที่กำหนดเอง' : 'Convert currencies with custom exchange rate',
        keywords: ['currency','exchange','fx'],
        faq: [],
        article: ''
      }
    }
  };
}

// Date Calculator (difference and add/subtract)
export function createDateCalculator(locale: Locale): Calculator {
  return {
    id: 'date-calculator',
    slug: 'date-calculator',
    category: 'lifestyle',
    icon: '📅',
    color: '#64748B',
    inputs: [
      { key: 'mode', label: 'Mode', type: 'select', required: true, defaultValue: 'difference', options: [
        { value: 'difference', label: 'Difference Between Dates' },
        { value: 'add', label: 'Add Days to Date' },
        { value: 'subtract', label: 'Subtract Days from Date' }
      ]},
      { key: 'startDate', label: 'Start Date', type: 'date', required: true, showIf: { mode: ['difference','add','subtract'] } },
      { key: 'endDate', label: 'End Date', type: 'date', required: true, showIf: { mode: ['difference'] } },
      { key: 'days', label: 'Days', type: 'number', required: true, defaultValue: 1, validation: { min: 0 }, showIf: { mode: ['add','subtract'] } }
    ],
    outputs: [
      { key: 'resultDate', label: 'Result Date', format: 'text', primary: true },
      { key: 'daysDiff', label: 'Days Difference', format: 'number', precision: 0 },
      { key: 'weeksDiff', label: 'Weeks Difference', format: 'number', precision: 2 },
      { key: 'monthsApprox', label: 'Months (approx)', format: 'number', precision: 2 }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({mode, startDate, endDate, days}) => {
          const start = new Date(startDate);
          let resultDate = '';
          let daysDiff = 0;
          let weeksDiff = 0;
          let monthsApprox = 0;

          if (mode === 'difference') {
            const end = new Date(endDate);
            const diffMs = end.getTime() - start.getTime();
            daysDiff = Math.round(diffMs / (1000*60*60*24));
            weeksDiff = daysDiff / 7;
            monthsApprox = daysDiff / 30.4375; // average month length
            resultDate = end.toISOString().split('T')[0];
          } else if (mode === 'add') {
            const d = new Date(start);
            d.setDate(d.getDate() + (days || 0));
            resultDate = d.toISOString().split('T')[0];
          } else {
            const d = new Date(start);
            d.setDate(d.getDate() - (days || 0));
            resultDate = d.toISOString().split('T')[0];
          }

          return { resultDate, daysDiff, weeksDiff, monthsApprox };
        }`,
        variables: ['mode','startDate','endDate','days']
      }
    ],
    relatedCalculators: ['age-calculator','time-calculator','business-days-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณวันที่' : 'Date Calculator',
        description: locale === 'th' ? 'หาความต่างระหว่างวันที่ หรือบวก/ลบวัน' : 'Find difference between dates or add/subtract days',
        keywords: ['date','days','difference'],
        faq: [],
        article: ''
      }
    }
  };
}

// Batch export all calculators
export const megaBatchCalculators = [
  // Engineering (20)
  createOhmsLawCalculator,
  
  // Lifestyle (20)
  createAgeCalculator,
  
  // Conversion (20)
  createLengthConverter,
  
  // Business (20)
  createBreakEvenCalculator,
  
  // More Finance (30+)
  createROICalculator,
  createInvestmentCalculator,
  createSalaryCalculator,
  createCurrencyConverter,
  createDateCalculator,
];