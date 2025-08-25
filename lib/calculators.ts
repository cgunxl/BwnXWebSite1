export type LoanResult = { monthly: number; total: number; interest: number };
export type MortgageResult = { monthly: number; total: number; interest: number };
export type TaxResult = { tax: number; effectiveRate: number };
export type InsuranceResult = { premium: number };

// Simple progressive tax brackets example
// Rates applied marginally up to limit; last bracket has limit = Infinity
export const TAX_BRACKETS: { limit: number; rate: number }[] = [
  { limit: 15000, rate: 0.05 },
  { limit: 50000, rate: 0.12 },
  { limit: 100000, rate: 0.22 },
  { limit: 200000, rate: 0.28 },
  { limit: Infinity, rate: 0.33 }
];

function toMonthlyRate(annualPercent: number): number {
  const annualRate = annualPercent / 100;
  return annualRate / 12;
}

export function calcLoan(principal: number, ratePercent: number, years: number): LoanResult {
  const n = Math.max(0, Math.round(years * 12));
  const r = toMonthlyRate(ratePercent);
  if (n === 0) {
    return { monthly: principal, total: principal, interest: 0 };
  }
  if (r === 0) {
    const monthly = principal / n;
    return { monthly, total: monthly * n, interest: 0 };
  }
  const factor = Math.pow(1 + r, n);
  const monthly = (principal * r * factor) / (factor - 1);
  const total = monthly * n;
  const interest = total - principal;
  return { monthly, total, interest };
}

export function calcMortgage(
  principal: number,
  ratePercent: number,
  years: number,
  closing: number
): MortgageResult {
  const totalPrincipal = principal + Math.max(0, closing);
  return calcLoan(totalPrincipal, ratePercent, years);
}

export function calcTax(income: number): TaxResult {
  const taxable = Math.max(0, income);
  let remaining = taxable;
  let lastLimit = 0;
  let tax = 0;
  for (const bracket of TAX_BRACKETS) {
    const span = Math.min(remaining, bracket.limit - lastLimit);
    if (span > 0) {
      tax += span * bracket.rate;
      remaining -= span;
      lastLimit = bracket.limit;
    }
    if (remaining <= 0) break;
  }
  const effectiveRate = taxable === 0 ? 0 : tax / taxable;
  return { tax, effectiveRate };
}

export function calcInsurance(amount: number, ratePercent: number): InsuranceResult {
  const rate = ratePercent / 100;
  const premium = Math.max(0, amount) * Math.max(0, rate);
  return { premium };
}

