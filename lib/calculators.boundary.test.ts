import { calcLoan, calcMortgage, calcTax, calcInsurance, TAX_BRACKETS } from '@/lib/calculators';

describe('calculators boundaries', () => {
	it('loan rounds months by years*12 and handles decimals', () => {
		const r = calcLoan(1200, 0, 1.4); // ~16.8 -> 17 months
		expect(r.total).toBeCloseTo(r.monthly * Math.round(1.4 * 12));
	});
	it('loan guards negative inputs', () => {
		const r = calcLoan(-1000, -5, -1);
		expect(r.monthly).toBeGreaterThanOrEqual(0);
		expect(r.total).toBeGreaterThanOrEqual(0);
		expect(r.interest).toBeGreaterThanOrEqual(0);
	});
	it('mortgage includes closing costs only when positive', () => {
		const a = calcMortgage(200000, 5, 30, 0);
		const b = calcMortgage(200000, 5, 30, -5000);
		expect(b.total).toBeCloseTo(a.total);
	});
	it('tax hits exact bracket edges correctly', () => {
		let lower = 0; let prev = 0;
		for (const { limit, rate } of TAX_BRACKETS) {
			if (!Number.isFinite(limit)) break;
			const r = calcTax(limit);
			expect(r.tax).toBeGreaterThanOrEqual(prev);
			prev = r.tax;
			lower = limit;
		}
	});
	it('insurance premium never negative', () => {
		const r = calcInsurance(-1000, -0.2);
		expect(r.premium).toBe(0);
	});
});