export type LoanResult = { monthly: number; total: number; interest: number };
export type MortgageResult = { monthly: number; total: number; interest: number };
export type TaxResult = { tax: number; effectiveRate: number };
export type InsuranceResult = { premium: number };
export type TakeHomeResult = {
  grossAnnual: number;
  taxAnnual: number;
  socialAnnual: number;
  netAnnual: number;
  netMonthly: number;
};

export type VatResult = {
  netPrice: number; // price before VAT
  vatAmount: number;
  grossPrice: number; // price after VAT
  inputVat?: number; // for businesses: VAT paid on purchases
  outputVat?: number; // VAT collected on sales
  payableVat?: number; // output - input
};

// Progressive brackets for the tax calculator
// Example brackets: up to 150k at 5%, next 300k at 10%, next 500k at 20%, remainder 30%
export const TAX_BRACKETS: Array<{ limit: number; rate: number }> = [
  { limit: 150_000, rate: 0.05 },
  { limit: 300_000, rate: 0.10 },
  { limit: 500_000, rate: 0.20 },
  { limit: Number.POSITIVE_INFINITY, rate: 0.30 }
];

export function calcLoan(principal: number, annualRatePercent: number, years: number): LoanResult {
  const principalSafe = Math.max(0, principal);
  const monthlyRate = Math.max(0, annualRatePercent) / 100 / 12;
  const n = Math.max(0, Math.round(years * 12));

  if (n === 0) {
    return { monthly: 0, total: 0, interest: 0 };
  }

  if (monthlyRate === 0) {
    const monthly = principalSafe / n;
    const total = monthly * n;
    return { monthly, total, interest: total - principalSafe };
  }

  const factor = Math.pow(1 + monthlyRate, n);
  const monthly = (principalSafe * monthlyRate * factor) / (factor - 1);
  const total = monthly * n;
  const interest = total - principalSafe;
  return { monthly, total, interest };
}

export function calcMortgage(principal: number, annualRatePercent: number, years: number, closingCosts: number): MortgageResult {
  const base = Math.max(0, principal) + Math.max(0, closingCosts);
  return calcLoan(base, annualRatePercent, years);
}

export function calcTax(income: number, brackets: Array<{ limit: number; rate: number }> = TAX_BRACKETS): TaxResult {
  const taxable = Math.max(0, income);
  let remaining = taxable;
  let tax = 0;
  let lower = 0;
  for (const { limit, rate } of brackets) {
    const bracketAmount = Math.min(remaining, limit - lower);
    if (bracketAmount <= 0) break;
    tax += bracketAmount * rate;
    remaining -= bracketAmount;
    lower = limit;
  }
  const effectiveRate = taxable === 0 ? 0 : tax / taxable;
  return { tax, effectiveRate };
}

export function calcInsurance(amount: number, annualRate: number): InsuranceResult {
  const premium = Math.max(0, amount) * Math.max(0, annualRate);
  return { premium };
}

export type AmortizationRow = {
  monthIndex: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
};

export function buildAmortizationSchedule(principal: number, annualRatePercent: number, years: number): AmortizationRow[] {
  const schedule: AmortizationRow[] = [];
  const principalSafe = Math.max(0, principal);
  const monthlyRate = Math.max(0, annualRatePercent) / 100 / 12;
  const n = Math.max(0, Math.round(years * 12));
  if (n === 0) return schedule;
  if (monthlyRate === 0) {
    const payment = principalSafe / n;
    let balance = principalSafe;
    for (let i = 1; i <= n; i++) {
      const interestPaid = 0;
      const principalPaid = Math.min(payment, balance);
      balance = Math.max(0, balance - principalPaid);
      schedule.push({ monthIndex: i, payment, principalPaid, interestPaid, balance });
    }
    return schedule;
  }
  const factor = Math.pow(1 + monthlyRate, n);
  const payment = (principalSafe * monthlyRate * factor) / (factor - 1);
  let balance = principalSafe;
  for (let i = 1; i <= n; i++) {
    const interestPaid = balance * monthlyRate;
    const principalPaid = Math.min(payment - interestPaid, balance);
    balance = Math.max(0, balance - principalPaid);
    schedule.push({ monthIndex: i, payment, principalPaid, interestPaid, balance });
  }
  return schedule;
}

export function scheduleToCsv(rows: AmortizationRow[]): string {
  const header = 'month,payment,principal,interest,balance';
  const body = rows
    .map(r => [r.monthIndex, r.payment, r.principalPaid, r.interestPaid, r.balance].join(','))
    .join('\n');
  return `${header}\n${body}`;
}

export function calcTakeHome(
  grossAnnual: number,
  brackets: Array<{ limit: number; rate: number }>,
  socialRateAnnual: number = 0
): TakeHomeResult {
  const { tax } = calcTax(grossAnnual, brackets);
  const socialAnnual = Math.max(0, grossAnnual) * Math.max(0, socialRateAnnual);
  const netAnnual = Math.max(0, grossAnnual) - tax - socialAnnual;
  const netMonthly = netAnnual / 12;
  return { grossAnnual, taxAnnual: tax, socialAnnual, netAnnual, netMonthly };
}

export function calcVat(
  amount: number,
  rate: number,
  mode: 'fromNet' | 'fromGross' = 'fromNet',
  inputVat?: number
): VatResult {
  const r = Math.max(0, rate);
  if (mode === 'fromGross') {
    const grossPrice = Math.max(0, amount);
    const netPrice = grossPrice / (1 + r);
    const vatAmount = grossPrice - netPrice;
    const outputVat = vatAmount;
    const payableVat = inputVat !== undefined ? Math.max(0, outputVat - Math.max(0, inputVat)) : undefined;
    return { netPrice, vatAmount, grossPrice, inputVat, outputVat, payableVat };
  }
  const netPrice = Math.max(0, amount);
  const vatAmount = netPrice * r;
  const grossPrice = netPrice + vatAmount;
  const outputVat = vatAmount;
  const payableVat = inputVat !== undefined ? Math.max(0, outputVat - Math.max(0, inputVat)) : undefined;
  return { netPrice, vatAmount, grossPrice, inputVat, outputVat, payableVat };
}

