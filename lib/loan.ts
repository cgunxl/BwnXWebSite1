export function emi(principal: number, aprPct: number, years: number) {
  const monthlyRate = (aprPct / 100) / 12;
  const n = Math.max(1, Math.round(years * 12));
  if (monthlyRate === 0) return principal / n;
  const factor = Math.pow(1 + monthlyRate, n);
  return principal * monthlyRate * factor / (factor - 1);
}

export type AmortRow = { month: number; payment: number; interest: number; principal: number; balance: number };

export function amortize(principal: number, aprPct: number, years: number) {
  const payment = emi(principal, aprPct, years);
  const schedule: AmortRow[] = [];
  const monthlyRate = (aprPct / 100) / 12;
  let balance = principal;
  const n = Math.max(1, Math.round(years * 12));
  let totalInterest = 0;
  for (let i = 1; i <= n; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = Math.min(payment - interest, balance);
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    schedule.push({ month: i, payment, interest, principal: principalPaid, balance });
    if (balance <= 0) break;
  }
  return { payment, totalInterest, schedule };
}

export function toCSV(schedule: AmortRow[]): string {
  const header = 'Month,Payment,Interest,Principal,Balance';
  const rows = schedule.map(r => [r.month, r.payment, r.interest, r.principal, r.balance].map(v => typeof v === 'number' ? v.toFixed(2) : v).join(','));
  return [header, ...rows].join('\n');
}
