export type CalculatorId =
  | 'loan'
  | 'mortgage'
  | 'tax'
  | 'insurance'
  | 'vat'
  | 'paycheck'
  | 'currency'
  | 'compound'
  | 'savings'
  | 'credit-card'
  | 'car-loan'
  | 'bmi'
  | 'bmr'
  | 'tdee';

export type CalculatorEntry = {
  id: CalculatorId;
  path: (lang: string) => string;
  titleKey: string;
  description?: string;
  category: 'finance' | 'tax' | 'insurance' | 'conversion' | 'savings' | 'health';
  keywords: string[];
};

export const REGISTRY: CalculatorEntry[] = [
  { id: 'loan', path: (lang) => `/${lang}/loan`, titleKey: 'loanCalc', description: 'Amortizing loan monthly payment and totals', category: 'finance', keywords: ['loan','amortization','emi','installment'] },
  { id: 'mortgage', path: (lang) => `/${lang}/mortgage`, titleKey: 'mortgageCalc', description: 'Mortgage with closing costs', category: 'finance', keywords: ['mortgage','home loan','closing costs'] },
  { id: 'tax', path: (lang) => `/${lang}/tax`, titleKey: 'taxCalc', description: 'Progressive tax estimate', category: 'tax', keywords: ['income tax','effective rate','brackets'] },
  { id: 'insurance', path: (lang) => `/${lang}/insurance`, titleKey: 'insuranceCalc', description: 'Premium estimate', category: 'insurance', keywords: ['premium','policy','risk'] },
  { id: 'vat', path: (lang) => `/${lang}/vat`, titleKey: 'vatCalc', description: 'Value-added tax from net/gross', category: 'tax', keywords: ['vat','sales tax','gst','net','gross'] },
  { id: 'paycheck', path: (lang) => `/${lang}/paycheck`, titleKey: 'paycheckCalc', description: 'Net pay after tax and social contributions', category: 'tax', keywords: ['paycheck','take home','salary','net pay'] },
  { id: 'currency', path: (lang) => `/${lang}/currency`, titleKey: 'currencyConverter', description: 'Convert between currencies', category: 'conversion', keywords: ['currency','fx','exchange','forex'] },
  { id: 'compound', path: (lang) => `/${lang}/compound`, titleKey: 'compoundCalc', description: 'Compound interest with contributions', category: 'savings', keywords: ['compound interest','investment','apy'] },
  { id: 'savings', path: (lang) => `/${lang}/savings-goal`, titleKey: 'savingsGoalCalc', description: 'How much to save to reach a goal', category: 'savings', keywords: ['savings','goal','future value'] },
  { id: 'credit-card', path: (lang) => `/${lang}/credit-card`, titleKey: 'creditCardCalc', description: 'Credit card interest and payoff time', category: 'finance', keywords: ['credit card','apr','payoff','interest'] },
  { id: 'car-loan', path: (lang) => `/${lang}/car-loan`, titleKey: 'carLoanCalc', description: 'Car loan with down payment, taxes and fees', category: 'finance', keywords: ['car loan','auto loan','vehicle','sales tax'] },
  { id: 'bmi', path: (lang) => `/${lang}/bmi`, titleKey: 'bmiCalc', description: 'Body Mass Index based on height and weight', category: 'health', keywords: ['bmi','body mass index','health'] },
  { id: 'bmr', path: (lang) => `/${lang}/bmr`, titleKey: 'bmrCalc', description: 'Basal Metabolic Rate (Mifflin–St Jeor)', category: 'health', keywords: ['bmr','basal metabolic rate'] },
  { id: 'tdee', path: (lang) => `/${lang}/tdee`, titleKey: 'tdeeCalc', description: 'Total Daily Energy Expenditure', category: 'health', keywords: ['tdee','calories','energy'] },
  { id: 'macro' as any, path: (lang) => `/${lang}/macro`, titleKey: 'macroCalc', description: 'Protein/Fat/Carbs grams from calorie split', category: 'health', keywords: ['macros','protein','fat','carbs'] },
  { id: 'water-intake' as any, path: (lang) => `/${lang}/water-intake`, titleKey: 'waterIntakeCalc', description: 'Daily water requirement', category: 'health', keywords: ['water','hydration'] },
  { id: 'ideal-weight' as any, path: (lang) => `/${lang}/ideal-weight`, titleKey: 'idealWeightCalc', description: 'Ideal weight estimate', category: 'health', keywords: ['ideal weight','devine'] },
  { id: 'body-fat' as any, path: (lang) => `/${lang}/body-fat`, titleKey: 'bodyFatCalc', description: 'Body fat percentage estimate', category: 'health', keywords: ['body fat','bf%'] },
  { id: 'running-pace' as any, path: (lang) => `/${lang}/running-pace`, titleKey: 'runningPaceCalc', description: 'Pace per km from distance and time', category: 'health', keywords: ['running','pace'] },
  { id: 'marathon-time' as any, path: (lang) => `/${lang}/marathon-time`, titleKey: 'marathonTimeCalc', description: 'Estimated marathon time from pace', category: 'health', keywords: ['marathon','race time'] }
  ,{ id: 'vo2max' as any, path: (lang) => `/${lang}/vo2max`, titleKey: 'vo2maxCalc', description: 'VO2 Max via Cooper test', category: 'health', keywords: ['vo2','cooper'] }
  ,{ id: 'heart-rate' as any, path: (lang) => `/${lang}/heart-rate`, titleKey: 'heartRateCalc', description: 'Max HR and HR reserve', category: 'health', keywords: ['heart rate','hr'] }
  ,{ id: 'target-hr' as any, path: (lang) => `/${lang}/target-hr`, titleKey: 'targetHrCalc', description: 'Target heart rate zones', category: 'health', keywords: ['karvonen','zones'] }
  ,{ id: 'bac' as any, path: (lang) => `/${lang}/bac`, titleKey: 'bacCalc', description: 'Blood alcohol concentration estimate', category: 'health', keywords: ['bac','alcohol'] }
  ,{ id: 'sleep' as any, path: (lang) => `/${lang}/sleep`, titleKey: 'sleepCalc', description: 'Suggested bedtime from cycles', category: 'health', keywords: ['sleep','cycles'] }
  ,{ id: 'cholesterol-ratio' as any, path: (lang) => `/${lang}/cholesterol-ratio`, titleKey: 'cholesterolRatioCalc', description: 'Total to HDL ratio', category: 'health', keywords: ['cholesterol','hdl'] }
  ,{ id: 'ohms-law' as any, path: (lang) => `/${lang}/ohms-law`, titleKey: 'ohmsLawCalc' as any, description: 'Solve V, I, R, P', category: 'engineering' as any, keywords: ['ohm','voltage','current','resistance','power'] }
  ,{ id: 'permutation' as any, path: (lang) => `/${lang}/permutation`, titleKey: 'permutationCalc' as any, description: 'nPr permutations', category: 'math' as any, keywords: ['permutation','nPr','arrangements'] }
  ,{ id: 'combination' as any, path: (lang) => `/${lang}/combination`, titleKey: 'combinationCalc' as any, description: 'nCr combinations', category: 'math' as any, keywords: ['combination','nCr','binomial'] }
  ,{ id: 'z-score' as any, path: (lang) => `/${lang}/z-score`, titleKey: 'zScoreCalc' as any, description: 'z-score and normal CDF', category: 'math' as any, keywords: ['z-score','standard score','normal cdf'] }
  ,{ id: 'circle-area' as any, path: (lang) => `/${lang}/circle-area`, titleKey: 'circleAreaCalc' as any, description: 'Circle area and circumference', category: 'math' as any, keywords: ['circle','area','circumference'] }
  ,{ id: 'triangle-area' as any, path: (lang) => `/${lang}/triangle-area`, titleKey: 'triangleAreaCalc' as any, description: 'Triangle area by base/height or sides', category: 'math' as any, keywords: ['triangle','area','heron'] }
  ,{ id: 'gcf' as any, path: (lang) => `/${lang}/gcf`, titleKey: 'gcfCalc' as any, description: 'Greatest common factor', category: 'math' as any, keywords: ['gcf','gcd','hcf'] }
  ,{ id: 'lcm' as any, path: (lang) => `/${lang}/lcm`, titleKey: 'lcmCalc' as any, description: 'Least common multiple', category: 'math' as any, keywords: ['lcm','least common multiple'] }
  ,{ id: 'age' as any, path: (lang) => `/${lang}/age`, titleKey: 'ageCalc' as any, description: 'Exact age and next birthday', category: 'lifestyle' as any, keywords: ['age','birthday','date'] }
  ,{ id: 'date-difference' as any, path: (lang) => `/${lang}/date-difference`, titleKey: 'dateDiffCalc' as any, description: 'Days/weeks/months between dates', category: 'lifestyle' as any, keywords: ['date difference','days between','duration'] }
  ,{ id: 'fuel-cost' as any, path: (lang) => `/${lang}/fuel-cost`, titleKey: 'fuelCostCalc' as any, description: 'Trip fuel and cost estimate', category: 'lifestyle' as any, keywords: ['fuel','gas','trip cost'] }
  ,{ id: 'electricity-bill' as any, path: (lang) => `/${lang}/electricity-bill`, titleKey: 'electricityBillCalc' as any, description: 'Monthly electricity bill estimate', category: 'household' as any, keywords: ['electricity','bill','kwh'] }
  ,{ id: 'download-time' as any, path: (lang) => `/${lang}/download-time`, titleKey: 'downloadTimeCalc' as any, description: 'Download time from size and speed', category: 'tech' as any, keywords: ['download time','throughput','network'] }
  ,{ id: 'age-gap' as any, path: (lang) => `/${lang}/age-gap`, titleKey: 'ageGapCalc' as any, description: 'Age difference between two people', category: 'lifestyle' as any, keywords: ['age gap','difference','dates'] }
  ,{ id: 'random-number' as any, path: (lang) => `/${lang}/random-number`, titleKey: 'rngCalc' as any, description: 'Random numbers in a range', category: 'lifestyle' as any, keywords: ['random','rng'] }
  ,{ id: 'dice' as any, path: (lang) => `/${lang}/dice`, titleKey: 'diceCalc' as any, description: 'Dice roller', category: 'fun' as any, keywords: ['dice','roll'] }
  ,{ id: 'coin-flip' as any, path: (lang) => `/${lang}/coin-flip`, titleKey: 'coinFlipCalc' as any, description: 'Coin flip simulator', category: 'fun' as any, keywords: ['coin','flip'] }
  ,{ id: 'countdown' as any, path: (lang) => `/${lang}/countdown`, titleKey: 'countdownCalc' as any, description: 'Countdown to a date', category: 'lifestyle' as any, keywords: ['countdown','timer'] }
  ,{ id: 'website-bandwidth' as any, path: (lang) => `/${lang}/website-bandwidth`, titleKey: 'websiteBandwidthCalc' as any, description: 'Estimate site bandwidth needs', category: 'tech' as any, keywords: ['bandwidth','website','traffic'] }
  ,{ id: 'data-transfer' as any, path: (lang) => `/${lang}/data-transfer`, titleKey: 'dataTransferCalc' as any, description: 'Throughput from data and time', category: 'tech' as any, keywords: ['data transfer','throughput'] }
  ,{ id: 'streaming-bandwidth' as any, path: (lang) => `/${lang}/streaming-bandwidth`, titleKey: 'streamingBandwidthCalc' as any, description: 'Streaming capacity planner', category: 'tech' as any, keywords: ['streaming','bandwidth','bitrate'] }
  ,{ id: 'api-usage' as any, path: (lang) => `/${lang}/api-usage`, titleKey: 'apiUsageCalc' as any, description: 'API request cost estimate', category: 'tech' as any, keywords: ['api','requests','cost'] }
  ,{ id: 'salary' as any, path: (lang) => `/${lang}/salary`, titleKey: 'salaryCalc', description: 'Net salary after taxes and contributions', category: 'tax' as any, keywords: ['salary','net pay','take home'] }
  // More entries are added progressively in batches
];

export function getAllCalculatorPaths(lang: string): string[] {
  return REGISTRY.map((r) => r.path(lang));
}

