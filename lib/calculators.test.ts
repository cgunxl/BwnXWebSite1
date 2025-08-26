import { calcLoan, calcMortgage, calcTax, calcInsurance, TAX_BRACKETS } from '@/lib/calculators';

describe('calcLoan', () => {
  it('handles zero months', () => {
    expect(calcLoan(1000, 5, 0)).toEqual({ monthly: 0, total: 0, interest: 0 });
  });
  it('handles zero rate', () => {
    const r = calcLoan(1200, 0, 1);
    expect(r.monthly).toBeCloseTo(100);
    expect(r.total).toBeCloseTo(1200);
    expect(r.interest).toBeCloseTo(0);
  });
  it('computes amortized payment', () => {
    const r = calcLoan(10000, 12, 1);
    expect(r.monthly).toBeGreaterThan(0);
    expect(r.total).toBeGreaterThan(10000);
    expect(r.interest).toBeCloseTo(r.total - 10000);
  });
});

describe('calcMortgage', () => {
  it('adds closing costs to principal', () => {
    const base = calcLoan(100000, 5, 30);
    const withClosing = calcMortgage(100000, 5, 30, 5000);
    expect(withClosing.total).toBeGreaterThan(base.total);
  });
});

describe('calcTax', () => {
  it('zero income yields zero tax', () => {
    const r = calcTax(0);
    expect(r.tax).toBe(0);
    expect(r.effectiveRate).toBe(0);
  });
  it('progressive brackets apply', () => {
    const low = calcTax(100000);
    const high = calcTax(700000);
    expect(high.tax).toBeGreaterThan(low.tax);
    expect(high.effectiveRate).toBeGreaterThan(low.effectiveRate);
  });
  it('matches manual bracket calc at boundary', () => {
    const income = TAX_BRACKETS[0].limit + 1000;
    const r = calcTax(income);
    const expected = TAX_BRACKETS[0].limit * TAX_BRACKETS[0].rate + 1000 * TAX_BRACKETS[1].rate;
    expect(r.tax).toBeCloseTo(expected);
  });
});

describe('calcInsurance', () => {
  it('computes premium as amount * rate', () => {
    const r = calcInsurance(100000, 0.02);
    expect(r.premium).toBeCloseTo(2000);
  });
});