export type LoanResult = { monthly: number; total: number; interest: number };
export type MortgageResult = { monthly: number; total: number; interest: number };
export type TaxResult = { tax: number; effectiveRate: number };
export type InsuranceResult = { premium: number };

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

export function calcTax(income: number): TaxResult {
  const taxable = Math.max(0, income);
  let remaining = taxable;
  let tax = 0;
  let lower = 0;
  for (const { limit, rate } of TAX_BRACKETS) {
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

