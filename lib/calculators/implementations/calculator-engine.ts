// Calculator Engine - Core calculation logic for all calculators
// BwnXCalculator - Production Ready Implementation

export interface CalculatorInput {
  name: string;
  label: Record<string, string>;
  type: 'number' | 'text' | 'select' | 'date';
  placeholder?: Record<string, string>;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  options?: Array<{ value: string; label: Record<string, string> }>;
  validation?: (value: any) => boolean;
  unit?: Record<string, string>;
}

export interface CalculatorOutput {
  name: string;
  label: Record<string, string>;
  value: any;
  format?: 'number' | 'currency' | 'percentage' | 'text';
  unit?: Record<string, string>;
  description?: Record<string, string>;
  highlight?: boolean;
}

export interface CalculatorFormula {
  calculate: (inputs: Record<string, any>) => Record<string, any>;
  validate?: (inputs: Record<string, any>) => { valid: boolean; errors?: string[] };
}

// Financial Formulas
export const financialFormulas = {
  // Loan Calculator Formula
  loanCalculator: {
    calculate: (inputs: { principal: number; rate: number; months: number }) => {
      const { principal, rate, months } = inputs;
      const monthlyRate = rate / 100 / 12;
      
      if (monthlyRate === 0) {
        const monthlyPayment = principal / months;
        return {
          monthlyPayment,
          totalPayment: principal,
          totalInterest: 0,
          principalPercentage: 100,
          interestPercentage: 0
        };
      }
      
      const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                             (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;
      
      return {
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalPayment: Math.round(totalPayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        principalPercentage: Math.round((principal / totalPayment) * 100),
        interestPercentage: Math.round((totalInterest / totalPayment) * 100)
      };
    },
    validate: (inputs: { principal: number; rate: number; months: number }) => {
      const errors = [];
      if (inputs.principal <= 0) errors.push('Principal must be greater than 0');
      if (inputs.rate < 0) errors.push('Interest rate cannot be negative');
      if (inputs.months <= 0) errors.push('Loan term must be greater than 0');
      return { valid: errors.length === 0, errors };
    }
  },

  // Mortgage Calculator Formula
  mortgageCalculator: {
    calculate: (inputs: { 
      homePrice: number; 
      downPayment: number; 
      rate: number; 
      years: number;
      propertyTax?: number;
      homeInsurance?: number;
      pmi?: number;
      hoa?: number;
    }) => {
      const principal = inputs.homePrice - inputs.downPayment;
      const months = inputs.years * 12;
      const monthlyRate = inputs.rate / 100 / 12;
      
      let monthlyPayment = 0;
      if (monthlyRate === 0) {
        monthlyPayment = principal / months;
      } else {
        monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
      }
      
      const monthlyPropertyTax = (inputs.propertyTax || 0) / 12;
      const monthlyInsurance = (inputs.homeInsurance || 0) / 12;
      const monthlyPMI = inputs.downPayment < inputs.homePrice * 0.2 ? (inputs.pmi || principal * 0.005) / 12 : 0;
      const monthlyHOA = (inputs.hoa || 0);
      
      const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;
      
      return {
        monthlyPrincipalInterest: Math.round(monthlyPayment * 100) / 100,
        monthlyPropertyTax: Math.round(monthlyPropertyTax * 100) / 100,
        monthlyInsurance: Math.round(monthlyInsurance * 100) / 100,
        monthlyPMI: Math.round(monthlyPMI * 100) / 100,
        monthlyHOA: Math.round(monthlyHOA * 100) / 100,
        totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
        totalPayment: Math.round(totalPayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        loanAmount: principal,
        downPaymentPercentage: Math.round((inputs.downPayment / inputs.homePrice) * 100)
      };
    }
  },

  // Compound Interest Calculator
  compoundInterest: {
    calculate: (inputs: {
      principal: number;
      rate: number;
      time: number;
      compound: number; // times per year
      contribution?: number;
      contributionFrequency?: number; // times per year
    }) => {
      const { principal, rate, time, compound, contribution = 0, contributionFrequency = 12 } = inputs;
      const r = rate / 100;
      
      // Calculate compound interest
      let futureValue = principal * Math.pow(1 + r / compound, compound * time);
      
      // Add regular contributions if any
      if (contribution > 0) {
        const periodsPerYear = contributionFrequency;
        const ratePerPeriod = r / periodsPerYear;
        const totalPeriods = periodsPerYear * time;
        
        const contributionFV = contribution * 
          ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
        
        futureValue += contributionFV;
      }
      
      const totalContributions = contribution * contributionFrequency * time;
      const totalDeposits = principal + totalContributions;
      const totalInterest = futureValue - totalDeposits;
      
      return {
        futureValue: Math.round(futureValue * 100) / 100,
        totalDeposits: Math.round(totalDeposits * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalContributions: Math.round(totalContributions * 100) / 100,
        interestPercentage: Math.round((totalInterest / totalDeposits) * 100)
      };
    }
  },

  // Tax Calculator (US Federal)
  taxCalculator: {
    calculate: (inputs: {
      income: number;
      filingStatus: 'single' | 'married' | 'head';
      deductions?: number;
    }) => {
      const standardDeductions = {
        single: 13850,
        married: 27700,
        head: 20800
      };
      
      const taxBrackets2024 = {
        single: [
          { min: 0, max: 11600, rate: 0.10 },
          { min: 11600, max: 47150, rate: 0.12 },
          { min: 47150, max: 100525, rate: 0.22 },
          { min: 100525, max: 191950, rate: 0.24 },
          { min: 191950, max: 243725, rate: 0.32 },
          { min: 243725, max: 609350, rate: 0.35 },
          { min: 609350, max: Infinity, rate: 0.37 }
        ],
        married: [
          { min: 0, max: 23200, rate: 0.10 },
          { min: 23200, max: 94300, rate: 0.12 },
          { min: 94300, max: 201050, rate: 0.22 },
          { min: 201050, max: 383900, rate: 0.24 },
          { min: 383900, max: 487450, rate: 0.32 },
          { min: 487450, max: 731200, rate: 0.35 },
          { min: 731200, max: Infinity, rate: 0.37 }
        ],
        head: [
          { min: 0, max: 16550, rate: 0.10 },
          { min: 16550, max: 63100, rate: 0.12 },
          { min: 63100, max: 100500, rate: 0.22 },
          { min: 100500, max: 191950, rate: 0.24 },
          { min: 191950, max: 243700, rate: 0.32 },
          { min: 243700, max: 609350, rate: 0.35 },
          { min: 609350, max: Infinity, rate: 0.37 }
        ]
      };
      
      const deduction = inputs.deductions || standardDeductions[inputs.filingStatus];
      const taxableIncome = Math.max(0, inputs.income - deduction);
      const brackets = taxBrackets2024[inputs.filingStatus];
      
      let tax = 0;
      let marginalRate = 0;
      
      for (const bracket of brackets) {
        if (taxableIncome > bracket.min) {
          const taxableInBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
          tax += taxableInBracket * bracket.rate;
          marginalRate = bracket.rate;
        }
      }
      
      const afterTaxIncome = inputs.income - tax;
      const effectiveRate = inputs.income > 0 ? (tax / inputs.income) * 100 : 0;
      
      return {
        taxableIncome: Math.round(taxableIncome * 100) / 100,
        federalTax: Math.round(tax * 100) / 100,
        afterTaxIncome: Math.round(afterTaxIncome * 100) / 100,
        effectiveRate: Math.round(effectiveRate * 100) / 100,
        marginalRate: Math.round(marginalRate * 100),
        monthlyAfterTax: Math.round((afterTaxIncome / 12) * 100) / 100
      };
    }
  }
};

// Health Formulas
export const healthFormulas = {
  // BMI Calculator
  bmiCalculator: {
    calculate: (inputs: { weight: number; height: number; unit: 'metric' | 'imperial' }) => {
      let bmi: number;
      
      if (inputs.unit === 'metric') {
        // weight in kg, height in cm
        const heightInMeters = inputs.height / 100;
        bmi = inputs.weight / (heightInMeters * heightInMeters);
      } else {
        // weight in lbs, height in inches
        bmi = (inputs.weight / (inputs.height * inputs.height)) * 703;
      }
      
      let category: string;
      let healthRisk: string;
      
      if (bmi < 18.5) {
        category = 'Underweight';
        healthRisk = 'Malnutrition risk';
      } else if (bmi < 25) {
        category = 'Normal weight';
        healthRisk = 'Low risk';
      } else if (bmi < 30) {
        category = 'Overweight';
        healthRisk = 'Enhanced risk';
      } else if (bmi < 35) {
        category = 'Obese Class I';
        healthRisk = 'Medium risk';
      } else if (bmi < 40) {
        category = 'Obese Class II';
        healthRisk = 'High risk';
      } else {
        category = 'Obese Class III';
        healthRisk = 'Very high risk';
      }
      
      // Calculate ideal weight range
      const heightInMeters = inputs.unit === 'metric' ? inputs.height / 100 : inputs.height * 0.0254;
      const minIdealWeight = 18.5 * heightInMeters * heightInMeters;
      const maxIdealWeight = 24.9 * heightInMeters * heightInMeters;
      
      const idealWeightMin = inputs.unit === 'metric' ? minIdealWeight : minIdealWeight * 2.20462;
      const idealWeightMax = inputs.unit === 'metric' ? maxIdealWeight : maxIdealWeight * 2.20462;
      
      return {
        bmi: Math.round(bmi * 10) / 10,
        category,
        healthRisk,
        idealWeightMin: Math.round(idealWeightMin * 10) / 10,
        idealWeightMax: Math.round(idealWeightMax * 10) / 10,
        weightToLose: Math.max(0, Math.round((inputs.weight - idealWeightMax) * 10) / 10),
        weightToGain: Math.max(0, Math.round((idealWeightMin - inputs.weight) * 10) / 10)
      };
    }
  },

  // Calorie Calculator (TDEE)
  calorieCalculator: {
    calculate: (inputs: {
      age: number;
      gender: 'male' | 'female';
      weight: number; // kg
      height: number; // cm
      activity: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
      goal: 'maintain' | 'lose' | 'gain';
    }) => {
      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr: number;
      if (inputs.gender === 'male') {
        bmr = 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age + 5;
      } else {
        bmr = 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age - 161;
      }
      
      // Activity multipliers
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      };
      
      const tdee = bmr * activityMultipliers[inputs.activity];
      
      // Goal adjustments
      let targetCalories: number;
      let proteinGrams: number;
      let carbGrams: number;
      let fatGrams: number;
      
      switch (inputs.goal) {
        case 'lose':
          targetCalories = tdee - 500; // 1 lb per week loss
          proteinGrams = inputs.weight * 2.2; // Higher protein for muscle preservation
          fatGrams = targetCalories * 0.25 / 9;
          carbGrams = (targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4;
          break;
        case 'gain':
          targetCalories = tdee + 500; // 1 lb per week gain
          proteinGrams = inputs.weight * 1.8;
          fatGrams = targetCalories * 0.3 / 9;
          carbGrams = (targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4;
          break;
        default: // maintain
          targetCalories = tdee;
          proteinGrams = inputs.weight * 1.6;
          fatGrams = targetCalories * 0.3 / 9;
          carbGrams = (targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4;
      }
      
      return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetCalories: Math.round(targetCalories),
        proteinGrams: Math.round(proteinGrams),
        carbGrams: Math.round(carbGrams),
        fatGrams: Math.round(fatGrams),
        proteinCalories: Math.round(proteinGrams * 4),
        carbCalories: Math.round(carbGrams * 4),
        fatCalories: Math.round(fatGrams * 9),
        weeklyChange: inputs.goal === 'maintain' ? 0 : inputs.goal === 'lose' ? -0.45 : 0.45 // kg per week
      };
    }
  },

  // Pregnancy Calculator
  pregnancyCalculator: {
    calculate: (inputs: { lmpDate: Date; cycleLength?: number }) => {
      const cycleLength = inputs.cycleLength || 28;
      const lmp = new Date(inputs.lmpDate);
      
      // Calculate estimated due date (Naegele's rule)
      const dueDate = new Date(lmp);
      dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
      
      // Adjust for cycle length
      const adjustment = cycleLength - 28;
      dueDate.setDate(dueDate.getDate() + adjustment);
      
      // Calculate conception date
      const conceptionDate = new Date(lmp);
      conceptionDate.setDate(conceptionDate.getDate() + 14 + adjustment);
      
      // Calculate current gestational age
      const today = new Date();
      const gestationalDays = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
      const gestationalWeeks = Math.floor(gestationalDays / 7);
      const gestationalDaysRemainder = gestationalDays % 7;
      
      // Calculate trimester
      let trimester: number;
      if (gestationalWeeks < 13) trimester = 1;
      else if (gestationalWeeks < 27) trimester = 2;
      else trimester = 3;
      
      // Days until due date
      const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const weeksUntilDue = Math.floor(daysUntilDue / 7);
      
      return {
        dueDate: dueDate.toISOString().split('T')[0],
        conceptionDate: conceptionDate.toISOString().split('T')[0],
        gestationalAge: `${gestationalWeeks} weeks, ${gestationalDaysRemainder} days`,
        gestationalWeeks,
        trimester,
        daysUntilDue: Math.max(0, daysUntilDue),
        weeksUntilDue: Math.max(0, weeksUntilDue),
        percentComplete: Math.min(100, Math.round((gestationalDays / 280) * 100))
      };
    }
  }
};

// Math & Education Formulas
export const mathFormulas = {
  // Percentage Calculator
  percentageCalculator: {
    calculate: (inputs: { 
      calculationType: 'basic' | 'change' | 'difference';
      value1: number;
      value2: number;
    }) => {
      let result: any = {};
      
      switch (inputs.calculationType) {
        case 'basic':
          // What is X% of Y?
          result = {
            result: (inputs.value1 / 100) * inputs.value2,
            formula: `${inputs.value1}% of ${inputs.value2}`,
            percentage: inputs.value1,
            baseValue: inputs.value2
          };
          break;
          
        case 'change':
          // Percentage change from X to Y
          const change = inputs.value2 - inputs.value1;
          const percentChange = (change / Math.abs(inputs.value1)) * 100;
          result = {
            percentageChange: Math.round(percentChange * 100) / 100,
            absoluteChange: change,
            direction: change >= 0 ? 'increase' : 'decrease',
            fromValue: inputs.value1,
            toValue: inputs.value2
          };
          break;
          
        case 'difference':
          // Percentage difference between X and Y
          const average = (inputs.value1 + inputs.value2) / 2;
          const difference = Math.abs(inputs.value1 - inputs.value2);
          const percentDifference = (difference / average) * 100;
          result = {
            percentageDifference: Math.round(percentDifference * 100) / 100,
            absoluteDifference: difference,
            value1: inputs.value1,
            value2: inputs.value2,
            average
          };
          break;
      }
      
      return result;
    }
  },

  // GPA Calculator
  gpaCalculator: {
    calculate: (inputs: { 
      courses: Array<{ name: string; credits: number; grade: string }>;
      scale: '4.0' | '5.0';
    }) => {
      const gradePoints: Record<string, Record<string, number>> = {
        '4.0': {
          'A+': 4.0, 'A': 4.0, 'A-': 3.7,
          'B+': 3.3, 'B': 3.0, 'B-': 2.7,
          'C+': 2.3, 'C': 2.0, 'C-': 1.7,
          'D+': 1.3, 'D': 1.0, 'D-': 0.7,
          'F': 0.0
        },
        '5.0': {
          'A+': 5.0, 'A': 5.0, 'A-': 4.7,
          'B+': 4.3, 'B': 4.0, 'B-': 3.7,
          'C+': 3.3, 'C': 3.0, 'C-': 2.7,
          'D+': 2.3, 'D': 2.0, 'D-': 1.7,
          'F': 0.0
        }
      };
      
      const scale = gradePoints[inputs.scale];
      let totalPoints = 0;
      let totalCredits = 0;
      
      const courseResults = inputs.courses.map((course: any) => {
        const points = scale[course.grade] || 0;
        const coursePoints = points * course.credits;
        totalPoints += coursePoints;
        totalCredits += course.credits;
        
        return {
          name: course.name,
          credits: course.credits,
          grade: course.grade,
          gradePoints: points,
          qualityPoints: coursePoints
        };
      });
      
      const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
      
      // Determine academic standing
      let standing: string;
      if (gpa >= 3.5) standing = 'Excellent (Dean\'s List)';
      else if (gpa >= 3.0) standing = 'Good';
      else if (gpa >= 2.0) standing = 'Satisfactory';
      else if (gpa >= 1.0) standing = 'Academic Probation';
      else standing = 'Academic Suspension Risk';
      
      return {
        gpa: Math.round(gpa * 100) / 100,
        totalCredits,
        totalQualityPoints: Math.round(totalPoints * 100) / 100,
        academicStanding: standing,
        courses: courseResults,
        scale: inputs.scale
      };
    }
  }
};

// Conversion Formulas
export const conversionFormulas = {
  // Length Converter
  lengthConverter: {
    calculate: (inputs: { value: number; from: string; to: string }) => {
      // Convert to meters first
      const toMeters: Record<string, number> = {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        mile: 1609.344,
        yard: 0.9144,
        foot: 0.3048,
        inch: 0.0254
      };
      
      const valueInMeters = inputs.value * toMeters[inputs.from];
      const result = valueInMeters / toMeters[inputs.to];
      
      return {
        result: result,
        rounded: Math.round(result * 1000000) / 1000000,
        fromValue: inputs.value,
        fromUnit: inputs.from,
        toUnit: inputs.to,
        formula: `${inputs.value} ${inputs.from} = ${result} ${inputs.to}`
      };
    }
  },

  // Temperature Converter
  temperatureConverter: {
    calculate: (inputs: { value: number; from: string; to: string }) => {
      let celsius: number;
      
      // Convert to Celsius first
      switch (inputs.from) {
        case 'celsius':
          celsius = inputs.value;
          break;
        case 'fahrenheit':
          celsius = (inputs.value - 32) * 5/9;
          break;
        case 'kelvin':
          celsius = inputs.value - 273.15;
          break;
        default:
          celsius = inputs.value;
      }
      
      // Convert from Celsius to target
      let result: number;
      switch (inputs.to) {
        case 'celsius':
          result = celsius;
          break;
        case 'fahrenheit':
          result = celsius * 9/5 + 32;
          break;
        case 'kelvin':
          result = celsius + 273.15;
          break;
        default:
          result = celsius;
      }
      
      return {
        result: Math.round(result * 100) / 100,
        fromValue: inputs.value,
        fromUnit: inputs.from,
        toUnit: inputs.to,
        celsius: Math.round(celsius * 100) / 100
      };
    }
  },

  // Currency Converter (with mock rates - in production, use real API)
  currencyConverter: {
    calculate: (inputs: { amount: number; from: string; to: string }) => {
      // Mock exchange rates (to USD)
      const rateToUSD: Record<string, number> = {
        USD: 1,
        EUR: 1.18,
        GBP: 1.38,
        JPY: 0.0091,
        CNY: 0.154,
        THB: 0.030,
        INR: 0.012,
        KRW: 0.00075,
        AUD: 0.65,
        CAD: 0.74,
        CHF: 1.09,
        SGD: 0.74,
        HKD: 0.128,
        MXN: 0.050,
        BRL: 0.20
      };
      
      const amountInUSD = inputs.amount * rateToUSD[inputs.from];
      const result = amountInUSD / rateToUSD[inputs.to];
      
      const exchangeRate = rateToUSD[inputs.from] / rateToUSD[inputs.to];
      
      return {
        result: Math.round(result * 100) / 100,
        exchangeRate: Math.round(exchangeRate * 10000) / 10000,
        fromAmount: inputs.amount,
        fromCurrency: inputs.from,
        toCurrency: inputs.to,
        timestamp: new Date().toISOString()
      };
    }
  }
};

// Export all formulas
export const allFormulas = {
  ...financialFormulas,
  ...healthFormulas,
  ...mathFormulas,
  ...conversionFormulas
};

// Helper function to get formula by calculator ID
export function getFormula(calculatorId: string): CalculatorFormula | undefined {
  const formulaMap: Record<string, CalculatorFormula> = {
    'loan-calculator': financialFormulas.loanCalculator,
    'mortgage-calculator': financialFormulas.mortgageCalculator,
    'compound-interest-calculator': financialFormulas.compoundInterest,
    'tax-calculator': financialFormulas.taxCalculator,
    'bmi-calculator': healthFormulas.bmiCalculator,
    'calorie-calculator': healthFormulas.calorieCalculator,
    'pregnancy-calculator': healthFormulas.pregnancyCalculator,
    'percentage-calculator': mathFormulas.percentageCalculator,
    'gpa-calculator': mathFormulas.gpaCalculator,
    'length-converter': conversionFormulas.lengthConverter,
    'temperature-converter': conversionFormulas.temperatureConverter,
    'currency-converter': conversionFormulas.currencyConverter
  };
  
  return formulaMap[calculatorId];
}