import { Calculator, CalculationResult, CalculatorEngine } from '@/types/calculator';

export class CalculatorEngineImpl implements CalculatorEngine {
  private calculator: Calculator;

  constructor(calculator: Calculator) {
    this.calculator = calculator;
  }

  calculate(inputs: Record<string, any>): CalculationResult {
    const results: CalculationResult = {};
    
    try {
      // Basic validation
      const validation = this.validate(inputs);
      if (!validation.valid) {
        throw new Error(validation.errors.join(', '));
      }

      // Execute formula based on calculator type
      switch (this.calculator.id) {
        case 'loan-calculator':
          return this.calculateLoan(inputs);
        case 'bmi-calculator':
          return this.calculateBMI(inputs);
        case 'mortgage-calculator':
          return this.calculateMortgage(inputs);
        case 'compound-interest-calculator':
          return this.calculateCompoundInterest(inputs);
        case 'savings-goal-calculator':
          return this.calculateSavingsGoal(inputs);
        case 'retirement-calculator':
          return this.calculateRetirement(inputs);
        case 'tax-calculator':
          return this.calculateTax(inputs);
        case 'vat-calculator':
          return this.calculateVAT(inputs);
        case 'roi-calculator':
          return this.calculateROI(inputs);
        case 'currency-converter':
          return this.calculateCurrency(inputs);
        case 'crypto-profit-calculator':
          return this.calculateCryptoProfit(inputs);
        case 'paycheck-calculator':
          return this.calculatePaycheck(inputs);
        case 'salary-calculator':
          return this.calculateSalary(inputs);
        case 'hourly-wage-calculator':
          return this.calculateHourlyWage(inputs);
        case 'overtime-pay-calculator':
          return this.calculateOvertimePay(inputs);
        case 'freelancer-rate-calculator':
          return this.calculateFreelancerRate(inputs);
        case 'business-loan-calculator':
          return this.calculateBusinessLoan(inputs);
        case 'refinance-calculator':
          return this.calculateRefinance(inputs);
        case 'debt-payoff-calculator':
          return this.calculateDebtPayoff(inputs);
        case 'amortization-calculator':
          return this.calculateAmortization(inputs);
        case 'lease-calculator':
          return this.calculateLease(inputs);
        case 'break-even-calculator':
          return this.calculateBreakEven(inputs);
        case 'profit-margin-calculator':
          return this.calculateProfitMargin(inputs);
        case 'markup-calculator':
          return this.calculateMarkup(inputs);
        case 'discount-calculator':
          return this.calculateDiscount(inputs);
        case 'sales-tax-calculator':
          return this.calculateSalesTax(inputs);
        case 'tipping-calculator':
          return this.calculateTipping(inputs);
        case 'currency-arbitrage-calculator':
          return this.calculateCurrencyArbitrage(inputs);
        default:
          throw new Error(`Calculator ${this.calculator.id} not implemented`);
      }
    } catch (error) {
      throw new Error(`Calculation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  validate(inputs: Record<string, any>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    for (const input of this.calculator.inputs) {
      if (input.required && (inputs[input.id] === undefined || inputs[input.id] === null || inputs[input.id] === '')) {
        errors.push(`${input.label} is required`);
      }
      
      if (inputs[input.id] !== undefined && input.type === 'number') {
        const value = Number(inputs[input.id]);
        if (isNaN(value)) {
          errors.push(`${input.label} must be a valid number`);
        } else {
          if (input.min !== undefined && value < input.min) {
            errors.push(`${input.label} must be at least ${input.min}`);
          }
          if (input.max !== undefined && value > input.max) {
            errors.push(`${input.label} must be at most ${input.max}`);
          }
        }
      }
    }
    
    return { valid: errors.length === 0, errors };
  }

  // Loan Calculator
  private calculateLoan(inputs: Record<string, any>): CalculationResult {
    const principal = Number(inputs.amount);
    const annualRate = Number(inputs.rate) / 100;
    const years = Number(inputs.term);
    const monthlyRate = annualRate / 12;
    const totalPayments = years * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      principal,
      annualRate: Number(inputs.rate),
      term: years
    };
  }

  // BMI Calculator
  private calculateBMI(inputs: Record<string, any>): CalculationResult {
    const weight = Number(inputs.weight);
    const height = Number(inputs.height) / 100; // Convert cm to m
    const bmi = weight / (height * height);
    
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    return {
      bmi: Math.round(bmi * 10) / 10,
      category,
      weight,
      height: Number(inputs.height)
    };
  }

  // Mortgage Calculator
  private calculateMortgage(inputs: Record<string, any>): CalculationResult {
    const principal = Number(inputs.amount);
    const annualRate = Number(inputs.rate) / 100;
    const years = Number(inputs.term);
    const monthlyRate = annualRate / 12;
    const totalPayments = years * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      principal,
      annualRate: Number(inputs.rate),
      term: years
    };
  }

  // Compound Interest Calculator
  private calculateCompoundInterest(inputs: Record<string, any>): CalculationResult {
    const principal = Number(inputs.principal);
    const rate = Number(inputs.rate) / 100;
    const time = Number(inputs.time);
    const compoundFrequency = Number(inputs.frequency) || 12;
    
    const amount = principal * Math.pow(1 + (rate / compoundFrequency), compoundFrequency * time);
    const interest = amount - principal;

    return {
      principal,
      amount: Math.round(amount * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      rate: Number(inputs.rate),
      time,
      frequency: compoundFrequency
    };
  }

  // Savings Goal Calculator
  private calculateSavingsGoal(inputs: Record<string, any>): CalculationResult {
    const goal = Number(inputs.goal);
    const current = Number(inputs.current);
    const monthly = Number(inputs.monthly);
    const rate = Number(inputs.rate) / 100 / 12;
    
    const months = Math.log(1 + (goal - current) * rate / monthly) / Math.log(1 + rate);
    const years = months / 12;

    return {
      goal,
      current,
      monthly,
      months: Math.ceil(months),
      years: Math.round(years * 10) / 10,
      rate: Number(inputs.rate)
    };
  }

  // Retirement Calculator
  private calculateRetirement(inputs: Record<string, any>): CalculationResult {
    const currentAge = Number(inputs.currentAge);
    const retirementAge = Number(inputs.retirementAge);
    const currentSavings = Number(inputs.currentSavings);
    const monthlyContribution = Number(inputs.monthlyContribution);
    const annualReturn = Number(inputs.annualReturn) / 100;
    
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyReturn = annualReturn / 12;
    const totalMonths = yearsToRetirement * 12;
    
    const futureValue = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement) +
                       monthlyContribution * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);

    return {
      currentAge,
      retirementAge,
      yearsToRetirement,
      currentSavings,
      monthlyContribution,
      futureValue: Math.round(futureValue * 100) / 100,
      annualReturn: Number(inputs.annualReturn)
    };
  }

  // Tax Calculator (simplified)
  private calculateTax(inputs: Record<string, any>): CalculationResult {
    const income = Number(inputs.income);
    const country = inputs.country || 'US';
    
    // Simplified tax calculation - in real implementation, this would be country-specific
    let taxRate = 0.22; // Default 22%
    if (income < 10000) taxRate = 0.10;
    else if (income < 40000) taxRate = 0.15;
    else if (income < 100000) taxRate = 0.22;
    else if (income < 200000) taxRate = 0.24;
    else taxRate = 0.32;
    
    const tax = income * taxRate;
    const afterTax = income - tax;

    return {
      income,
      taxRate: Math.round(taxRate * 100),
      tax: Math.round(tax * 100) / 100,
      afterTax: Math.round(afterTax * 100) / 100,
      country
    };
  }

  // VAT Calculator
  private calculateVAT(inputs: Record<string, any>): CalculationResult {
    const amount = Number(inputs.amount);
    const vatRate = Number(inputs.vatRate) / 100;
    
    const vatAmount = amount * vatRate;
    const totalWithVAT = amount + vatAmount;
    const amountWithoutVAT = amount;

    return {
      amountWithoutVAT,
      vatRate: Number(inputs.vatRate),
      vatAmount: Math.round(vatAmount * 100) / 100,
      totalWithVAT: Math.round(totalWithVAT * 100) / 100
    };
  }

  // ROI Calculator
  private calculateROI(inputs: Record<string, any>): CalculationResult {
    const initialInvestment = Number(inputs.initialInvestment);
    const finalValue = Number(inputs.finalValue);
    const timePeriod = Number(inputs.timePeriod);
    
    const roi = ((finalValue - initialInvestment) / initialInvestment) * 100;
    const annualizedROI = Math.pow(finalValue / initialInvestment, 1 / timePeriod) - 1;

    return {
      initialInvestment,
      finalValue,
      roi: Math.round(roi * 100) / 100,
      annualizedROI: Math.round(annualizedROI * 10000) / 100,
      timePeriod
    };
  }

  // Currency Converter (simplified - would need real API)
  private calculateCurrency(inputs: Record<string, any>): CalculationResult {
    const amount = Number(inputs.amount);
    const fromCurrency = inputs.fromCurrency;
    const toCurrency = inputs.toCurrency;
    
    // Simplified exchange rates - in real implementation, use real-time data
    const exchangeRates: Record<string, Record<string, number>> = {
      'USD': { 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110, 'THB': 33 },
      'EUR': { 'USD': 1.18, 'GBP': 0.86, 'JPY': 129, 'THB': 39 },
      'GBP': { 'USD': 1.37, 'EUR': 1.16, 'JPY': 150, 'THB': 45 },
      'JPY': { 'USD': 0.009, 'EUR': 0.0078, 'GBP': 0.0067, 'THB': 0.30 },
      'THB': { 'USD': 0.030, 'EUR': 0.026, 'GBP': 0.022, 'JPY': 3.33 }
    };
    
    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
    const convertedAmount = amount * rate;

    return {
      amount,
      fromCurrency,
      toCurrency,
      rate: Math.round(rate * 10000) / 10000,
      convertedAmount: Math.round(convertedAmount * 100) / 100
    };
  }

  // Crypto Profit Calculator
  private calculateCryptoProfit(inputs: Record<string, any>): CalculationResult {
    const buyPrice = Number(inputs.buyPrice);
    const sellPrice = Number(inputs.sellPrice);
    const quantity = Number(inputs.quantity);
    const fees = Number(inputs.fees) || 0;
    
    const totalCost = (buyPrice * quantity) + fees;
    const totalRevenue = sellPrice * quantity;
    const profit = totalRevenue - totalCost;
    const profitPercentage = (profit / totalCost) * 100;

    return {
      buyPrice,
      sellPrice,
      quantity,
      totalCost: Math.round(totalCost * 100) / 100,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      profitPercentage: Math.round(profitPercentage * 100) / 100,
      fees
    };
  }

  // Paycheck Calculator
  private calculatePaycheck(inputs: Record<string, any>): CalculationResult {
    const grossPay = Number(inputs.grossPay);
    const federalTax = Number(inputs.federalTax) / 100;
    const stateTax = Number(inputs.stateTax) / 100;
    const socialSecurity = Number(inputs.socialSecurity) / 100;
    const medicare = Number(inputs.medicare) / 100;
    const otherDeductions = Number(inputs.otherDeductions) || 0;
    
    const federalTaxAmount = grossPay * federalTax;
    const stateTaxAmount = grossPay * stateTax;
    const socialSecurityAmount = grossPay * socialSecurity;
    const medicareAmount = grossPay * medicare;
    
    const totalDeductions = federalTaxAmount + stateTaxAmount + socialSecurityAmount + medicareAmount + otherDeductions;
    const netPay = grossPay - totalDeductions;

    return {
      grossPay,
      federalTaxAmount: Math.round(federalTaxAmount * 100) / 100,
      stateTaxAmount: Math.round(stateTaxAmount * 100) / 100,
      socialSecurityAmount: Math.round(socialSecurityAmount * 100) / 100,
      medicareAmount: Math.round(medicareAmount * 100) / 100,
      otherDeductions,
      totalDeductions: Math.round(totalDeductions * 100) / 100,
      netPay: Math.round(netPay * 100) / 100
    };
  }

  // Salary Calculator
  private calculateSalary(inputs: Record<string, any>): CalculationResult {
    const hourlyRate = Number(inputs.hourlyRate);
    const hoursPerWeek = Number(inputs.hoursPerWeek);
    const weeksPerYear = Number(inputs.weeksPerYear) || 52;
    
    const weeklySalary = hourlyRate * hoursPerWeek;
    const annualSalary = weeklySalary * weeksPerYear;
    const monthlySalary = annualSalary / 12;

    return {
      hourlyRate,
      hoursPerWeek,
      weeklySalary: Math.round(weeklySalary * 100) / 100,
      monthlySalary: Math.round(monthlySalary * 100) / 100,
      annualSalary: Math.round(annualSalary * 100) / 100,
      weeksPerYear
    };
  }

  // Hourly Wage Calculator
  private calculateHourlyWage(inputs: Record<string, any>): CalculationResult {
    const annualSalary = Number(inputs.annualSalary);
    const hoursPerWeek = Number(inputs.hoursPerWeek);
    const weeksPerYear = Number(inputs.weeksPerYear) || 52;
    
    const totalHours = hoursPerWeek * weeksPerYear;
    const hourlyWage = annualSalary / totalHours;

    return {
      annualSalary,
      hoursPerWeek,
      weeksPerYear,
      totalHours,
      hourlyWage: Math.round(hourlyWage * 100) / 100
    };
  }

  // Overtime Pay Calculator
  private calculateOvertimePay(inputs: Record<string, any>): CalculationResult {
    const regularHours = Number(inputs.regularHours);
    const overtimeHours = Number(inputs.overtimeHours);
    const hourlyRate = Number(inputs.hourlyRate);
    const overtimeMultiplier = Number(inputs.overtimeMultiplier) || 1.5;
    
    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
    const totalPay = regularPay + overtimePay;

    return {
      regularHours,
      overtimeHours,
      hourlyRate,
      regularPay: Math.round(regularPay * 100) / 100,
      overtimePay: Math.round(overtimePay * 100) / 100,
      totalPay: Math.round(totalPay * 100) / 100,
      overtimeMultiplier
    };
  }

  // Freelancer Rate Calculator
  private calculateFreelancerRate(inputs: Record<string, any>): CalculationResult {
    const desiredAnnualIncome = Number(inputs.desiredAnnualIncome);
    const businessExpenses = Number(inputs.businessExpenses);
    const personalExpenses = Number(inputs.personalExpenses);
    const billableHours = Number(inputs.billableHours);
    const vacationWeeks = Number(inputs.vacationWeeks) || 4;
    
    const totalExpenses = businessExpenses + personalExpenses;
    const totalIncomeNeeded = desiredAnnualIncome + totalExpenses;
    const workingWeeks = 52 - vacationWeeks;
    const billableHoursPerYear = billableHours * workingWeeks;
    const hourlyRate = totalIncomeNeeded / billableHoursPerYear;

    return {
      desiredAnnualIncome,
      totalExpenses: Math.round(totalExpenses * 100) / 100,
      totalIncomeNeeded: Math.round(totalIncomeNeeded * 100) / 100,
      billableHoursPerYear,
      hourlyRate: Math.round(hourlyRate * 100) / 100,
      workingWeeks
    };
  }

  // Business Loan Calculator
  private calculateBusinessLoan(inputs: Record<string, any>): CalculationResult {
    const principal = Number(inputs.amount);
    const annualRate = Number(inputs.rate) / 100;
    const years = Number(inputs.term);
    const monthlyRate = annualRate / 12;
    const totalPayments = years * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      principal,
      annualRate: Number(inputs.rate),
      term: years
    };
  }

  // Refinance Calculator
  private calculateRefinance(inputs: Record<string, any>): CalculationResult {
    const currentBalance = Number(inputs.currentBalance);
    const currentRate = Number(inputs.currentRate) / 100;
    const newRate = Number(inputs.newRate) / 100;
    const remainingTerm = Number(inputs.remainingTerm);
    const newTerm = Number(inputs.newTerm);
    const closingCosts = Number(inputs.closingCosts) || 0;
    
    // Current loan calculations
    const currentMonthlyRate = currentRate / 12;
    const currentTotalPayments = remainingTerm * 12;
    const currentMonthlyPayment = (currentBalance * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentTotalPayments)) / 
                                 (Math.pow(1 + currentMonthlyRate, currentTotalPayments) - 1);
    const currentTotalPayment = currentMonthlyPayment * currentTotalPayments;
    
    // New loan calculations
    const newMonthlyRate = newRate / 12;
    const newTotalPayments = newTerm * 12;
    const newMonthlyPayment = (currentBalance * newMonthlyRate * Math.pow(1 + newMonthlyRate, newTotalPayments)) / 
                             (Math.pow(1 + newMonthlyRate, newTotalPayments) - 1);
    const newTotalPayment = newMonthlyPayment * newTotalPayments;
    
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    const totalSavings = (currentTotalPayment - newTotalPayment) - closingCosts;
    const breakEvenMonths = closingCosts / monthlySavings;

    return {
      currentMonthlyPayment: Math.round(currentMonthlyPayment * 100) / 100,
      newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
      monthlySavings: Math.round(monthlySavings * 100) / 100,
      totalSavings: Math.round(totalSavings * 100) / 100,
      breakEvenMonths: Math.round(breakEvenMonths * 100) / 100,
      closingCosts
    };
  }

  // Debt Payoff Calculator
  private calculateDebtPayoff(inputs: Record<string, any>): CalculationResult {
    const debts = inputs.debts || [];
    const strategy = inputs.strategy || 'snowball';
    const extraPayment = Number(inputs.extraPayment) || 0;
    
    // Simplified debt payoff calculation
    let totalDebt = 0;
    let totalInterest = 0;
    let monthsToPayoff = 0;
    
    for (const debt of debts) {
      totalDebt += Number(debt.balance);
      const monthlyRate = Number(debt.rate) / 100 / 12;
      const monthlyPayment = Number(debt.minimumPayment) + extraPayment;
      const balance = Number(debt.balance);
      
      let remainingBalance = balance;
      let months = 0;
      
      while (remainingBalance > 0.01 && months < 600) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;
        totalInterest += interestPayment;
        months++;
      }
      
      monthsToPayoff = Math.max(monthsToPayoff, months);
    }

    return {
      totalDebt: Math.round(totalDebt * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      monthsToPayoff,
      extraPayment
    };
  }

  // Amortization Calculator
  private calculateAmortization(inputs: Record<string, any>): CalculationResult {
    const principal = Number(inputs.amount);
    const annualRate = Number(inputs.rate) / 100;
    const years = Number(inputs.term);
    const monthlyRate = annualRate / 12;
    const totalPayments = years * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const schedule = [];
    let remainingBalance = principal;
    
    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.round(remainingBalance * 100) / 100
      });
    }

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      schedule,
      totalPayments
    };
  }

  // Lease Calculator
  private calculateLease(inputs: Record<string, any>): CalculationResult {
    const msrp = Number(inputs.msrp);
    const negotiatedPrice = Number(inputs.negotiatedPrice);
    const downPayment = Number(inputs.downPayment) || 0;
    const tradeInValue = Number(inputs.tradeInValue) || 0;
    const residualValue = Number(inputs.residualValue);
    const moneyFactor = Number(inputs.moneyFactor) / 2400; // Convert to decimal
    const leaseTerm = Number(inputs.leaseTerm);
    
    const capitalizedCost = negotiatedPrice - downPayment - tradeInValue;
    const depreciation = capitalizedCost - residualValue;
    const monthlyDepreciation = depreciation / leaseTerm;
    const monthlyInterest = (capitalizedCost + residualValue) * moneyFactor;
    const monthlyPayment = monthlyDepreciation + monthlyInterest;
    const totalCost = monthlyPayment * leaseTerm + downPayment;

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      capitalizedCost: Math.round(capitalizedCost * 100) / 100,
      depreciation: Math.round(depreciation * 100) / 100,
      leaseTerm
    };
  }

  // Break Even Calculator
  private calculateBreakEven(inputs: Record<string, any>): CalculationResult {
    const fixedCosts = Number(inputs.fixedCosts);
    const variableCosts = Number(inputs.variableCosts);
    const sellingPrice = Number(inputs.sellingPrice);
    
    const contributionMargin = sellingPrice - variableCosts;
    const breakEvenUnits = fixedCosts / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * sellingPrice;

    return {
      breakEvenUnits: Math.round(breakEvenUnits * 100) / 100,
      breakEvenRevenue: Math.round(breakEvenRevenue * 100) / 100,
      contributionMargin: Math.round(contributionMargin * 100) / 100,
      fixedCosts,
      variableCosts,
      sellingPrice
    };
  }

  // Profit Margin Calculator
  private calculateProfitMargin(inputs: Record<string, any>): CalculationResult {
    const revenue = Number(inputs.revenue);
    const costOfGoodsSold = Number(inputs.costOfGoodsSold);
    const operatingExpenses = Number(inputs.operatingExpenses) || 0;
    
    const grossProfit = revenue - costOfGoodsSold;
    const grossMargin = (grossProfit / revenue) * 100;
    const operatingProfit = grossProfit - operatingExpenses;
    const operatingMargin = (operatingProfit / revenue) * 100;
    const netProfit = operatingProfit; // Simplified - would include taxes, interest, etc.
    const netMargin = (netProfit / revenue) * 100;

    return {
      revenue,
      grossProfit: Math.round(grossProfit * 100) / 100,
      grossMargin: Math.round(grossMargin * 100) / 100,
      operatingProfit: Math.round(operatingProfit * 100) / 100,
      operatingMargin: Math.round(operatingMargin * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      netMargin: Math.round(netMargin * 100) / 100
    };
  }

  // Markup Calculator
  private calculateMarkup(inputs: Record<string, any>): CalculationResult {
    const cost = Number(inputs.cost);
    const markupPercentage = Number(inputs.markupPercentage);
    
    const markupAmount = cost * (markupPercentage / 100);
    const sellingPrice = cost + markupAmount;
    const marginPercentage = (markupAmount / sellingPrice) * 100;

    return {
      cost,
      markupAmount: Math.round(markupAmount * 100) / 100,
      sellingPrice: Math.round(sellingPrice * 100) / 100,
      markupPercentage,
      marginPercentage: Math.round(marginPercentage * 100) / 100
    };
  }

  // Discount Calculator
  private calculateDiscount(inputs: Record<string, any>): CalculationResult {
    const originalPrice = Number(inputs.originalPrice);
    const discountPercentage = Number(inputs.discountPercentage);
    
    const discountAmount = originalPrice * (discountPercentage / 100);
    const finalPrice = originalPrice - discountAmount;
    const savingsPercentage = discountPercentage;

    return {
      originalPrice,
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      discountPercentage,
      savingsPercentage
    };
  }

  // Sales Tax Calculator
  private calculateSalesTax(inputs: Record<string, any>): CalculationResult {
    const amount = Number(inputs.amount);
    const taxRate = Number(inputs.taxRate) / 100;
    
    const taxAmount = amount * taxRate;
    const totalWithTax = amount + taxAmount;

    return {
      amount,
      taxRate: Number(inputs.taxRate),
      taxAmount: Math.round(taxAmount * 100) / 100,
      totalWithTax: Math.round(totalWithTax * 100) / 100
    };
  }

  // Tipping Calculator
  private calculateTipping(inputs: Record<string, any>): CalculationResult {
    const billAmount = Number(inputs.billAmount);
    const tipPercentage = Number(inputs.tipPercentage);
    const numberOfPeople = Number(inputs.numberOfPeople) || 1;
    
    const tipAmount = billAmount * (tipPercentage / 100);
    const totalAmount = billAmount + tipAmount;
    const amountPerPerson = totalAmount / numberOfPeople;

    return {
      billAmount,
      tipAmount: Math.round(tipAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      amountPerPerson: Math.round(amountPerPerson * 100) / 100,
      tipPercentage,
      numberOfPeople
    };
  }

  // Currency Arbitrage Calculator
  private calculateCurrencyArbitrage(inputs: Record<string, any>): CalculationResult {
    const amount = Number(inputs.amount);
    const fromRate = Number(inputs.fromRate);
    const toRate = Number(inputs.toRate);
    const fees = Number(inputs.fees) || 0;
    
    const convertedAmount = (amount / fromRate) * toRate;
    const profit = convertedAmount - amount - fees;
    const profitPercentage = (profit / amount) * 100;

    return {
      amount,
      convertedAmount: Math.round(convertedAmount * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      profitPercentage: Math.round(profitPercentage * 100) / 100,
      fees
    };
  }
}