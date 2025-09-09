import { createLoanCalculator } from '@/lib/calculators/implementations/finance-batch1';
import { Locale } from '@/lib/i18n/config';

// Simple deterministic input for snapshot-like assertion
const locale: Locale = 'en';
const calc = createLoanCalculator(locale);

function runPrimaryFormula(input: Record<string, any>) {
  // Formula is stored as string expression that returns object.
  // eslint-disable-next-line no-new-func
  const fn = eval(calc.formulas[0].expression) as (args: any) => any;
  return fn(input);
}

describe('Loan calculator primary formula', () => {
  it('calculates payment for known values', () => {
    const result = runPrimaryFormula({
      principal: 10000,
      interestRate: 5, // %
      loanTerm: 1, // years
      paymentFrequency: 'monthly',
    });

    // Basic expectations
    expect(result.payment).toBeGreaterThan(0);
    expect(result.totalPayment).toBeCloseTo(result.payment * 12, 2);
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - 10000, 2);
    expect(result.effectiveRate).toBeGreaterThan(0);
  });
});