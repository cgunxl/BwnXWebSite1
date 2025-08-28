export type CalculatorId =
  | 'loan'
  | 'mortgage'
  | 'tax'
  | 'insurance'
  | 'vat'
  | 'paycheck'
  | 'currency'
  | 'compound'
  | 'apr-apy'
  | 'rule-72'
  | 'simple-interest'
  | 'savings'
  | 'credit-card'
  | 'car-loan'
  | 'lease'
  | 'refinance'
  | 'bmi'
  | 'bmr'
  | 'tdee'
  | 'calorie'
  | 'protein-intake'
  // Additional ids progressively added
  | 'roi'
  | 'break-even'
  | 'stock-return'
  | 'dividend'
  | 'sales-tax'
  | 'tip'
  | 'discount'
  | 'crypto-profit'
  | 'bitcoin-mining'
  | 'eth-gas'
  | 'nft-profit'
  | 'sip'
  | 'mutual-fund'
  | 'property-tax'
  | 'inflation'
  | 'profit-margin'
  | 'business-loan'
  | 'tdee' // keep for type compatibility
  | 'vo2max'
  | 'heart-rate'
  | 'target-hr'
  | 'bac'
  | 'sleep'
  | 'cholesterol-ratio'
  | 'ohms-law'
  | 'permutation'
  | 'combination'
  | 'z-score'
  | 'circle-area'
  | 'triangle-area'
  | 'gcf'
  | 'lcm'
  | 'age'
  | 'date-difference'
  | 'fuel-cost'
  | 'electricity-bill'
  | 'download-time'
  | 'age-gap'
  | 'random-number'
  | 'dice'
  | 'coin-flip'
  | 'countdown'
  | 'website-bandwidth'
  | 'data-transfer'
  | 'streaming-bandwidth'
  | 'api-usage'
  | 'debt-payoff'
  | 'salary'
  | 'retirement'
  | '401k'
  | 'roth-ira'
  | 'currency-arbitrage'
  | 'npv-irr'
  | 'annuity'
  | 'bond-price'
  | 'bond-yield'
  | 'wacc'
  | 'dscr'
  | 'average'
  | 'median-mode'
  | 'std-dev'
  | 'exponent'
  | 'ratio'
  | 'percentage'
  | 'overtime'
  | 'markup'
  | 'hourly-wage'
  | 'freelancer-rate'
  | 'time'
  | 'power'
  | 'frequency'
  | 'length'
  | 'weight'
  | 'speed'
  | 'temperature'
  | 'pressure'
  | 'angle'
  | 'area'
  | 'volume'
  | 'energy'
  | 'amortization'
  | 'cooking'
  | 'blood-sugar'
  | 'fuel-efficiency'
  | 'prime'
  | 'factorial'
  | 'ovulation'
  | 'pregnancy-due-date'
  | 'pregnancy-weight-gain'
  | 'marathon-time'
  | 'ideal-weight'
  | 'water-intake'
  | 'macro'
  | 'currency'
  | 'house-affordability'
  | 'ltv'
  | 'dti'
  | 'emergency-fund'
  | 'solar-panel'
  | 'ev-charging'
  | 'rectangle-area'
  | 'pythagorean';

// Newly added ids (appended for type support)
export type _ExtendedCalculatorId = CalculatorId | 'house-affordability' | 'ltv' | 'dti' | 'emergency-fund' | 'solar-panel' | 'ev-charging' | 'rectangle-area' | 'pythagorean';

export type CalculatorEntry = {
  id: CalculatorId;
  path: (lang: string) => string;
  titleKey: string;
  description?: string;
  category:
    | 'finance'
    | 'tax'
    | 'insurance'
    | 'conversion'
    | 'savings'
    | 'health'
    | 'tech'
    | 'engineering'
    | 'math'
    | 'lifestyle'
    | 'household'
    | 'fun';
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
  { id: 'apr-apy' as any, path: (lang) => `/${lang}/apr-apy`, titleKey: 'aprApyCalc' as any, description: 'Convert APR and APY given compounding frequency', category: 'finance' as any, keywords: ['apr','apy','compounding','rate'] },
  { id: 'rule-72' as any, path: (lang) => `/${lang}/rule-72`, titleKey: 'rule72Calc' as any, description: 'Rule of 72: doubling time or required rate', category: 'finance' as any, keywords: ['rule of 72','doubling time','heuristic'] },
  { id: 'simple-interest' as any, path: (lang) => `/${lang}/simple-interest`, titleKey: 'simpleInterestCalc' as any, description: 'Simple interest using I = P × r × t', category: 'finance' as any, keywords: ['simple interest','I=Prt','interest'] },
  { id: 'savings', path: (lang) => `/${lang}/savings-goal`, titleKey: 'savingsGoalCalc', description: 'How much to save to reach a goal', category: 'savings', keywords: ['savings','goal','future value'] },
  { id: 'credit-card', path: (lang) => `/${lang}/credit-card`, titleKey: 'creditCardCalc', description: 'Credit card interest and payoff time', category: 'finance', keywords: ['credit card','apr','payoff','interest'] },
  { id: 'car-loan', path: (lang) => `/${lang}/car-loan`, titleKey: 'carLoanCalc', description: 'Car loan with down payment, taxes and fees', category: 'finance', keywords: ['car loan','auto loan','vehicle','sales tax'] },
  { id: 'lease', path: (lang) => `/${lang}/lease`, titleKey: 'leaseCalc', description: 'Lease payment from cap cost, residual, money factor and fees', category: 'finance', keywords: ['lease','money factor','residual','cap cost'] },
  { id: 'refinance', path: (lang) => `/${lang}/refinance`, titleKey: 'refinanceCalc', description: 'Compare current payment vs new refi terms including closing costs', category: 'finance', keywords: ['refinance','refi','closing costs','monthly payment'] },
  { id: 'bmi', path: (lang) => `/${lang}/bmi`, titleKey: 'bmiCalc', description: 'Body Mass Index based on height and weight', category: 'health', keywords: ['bmi','body mass index','health'] },
  { id: 'bmr', path: (lang) => `/${lang}/bmr`, titleKey: 'bmrCalc', description: 'Basal Metabolic Rate (Mifflin–St Jeor)', category: 'health', keywords: ['bmr','basal metabolic rate'] },
  { id: 'tdee', path: (lang) => `/${lang}/tdee`, titleKey: 'tdeeCalc', description: 'Total Daily Energy Expenditure', category: 'health', keywords: ['tdee','calories','energy'] },
  { id: 'calorie' as any, path: (lang) => `/${lang}/calorie`, titleKey: 'calorieCalc' as any, description: 'Daily calories from BMR, TDEE and goal', category: 'health' as any, keywords: ['calories','bmr','tdee'] },
  { id: 'macro' as any, path: (lang) => `/${lang}/macro`, titleKey: 'macroCalc', description: 'Protein/Fat/Carbs grams from calorie split', category: 'health', keywords: ['macros','protein','fat','carbs'] },
  { id: 'protein-intake' as any, path: (lang) => `/${lang}/protein-intake`, titleKey: 'proteinIntakeCalc' as any, description: 'Daily protein needs by goal and body weight', category: 'health' as any, keywords: ['protein','intake','g/kg'] },
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
  ,{ id: 'debt-payoff' as any, path: (lang) => `/${lang}/debt-payoff`, titleKey: 'debtPayoffCalc' as any, description: 'Estimate payoff time and total interest for revolving debt', category: 'finance' as any, keywords: ['debt','payoff','interest','avalanche','snowball'] }
  ,{ id: 'amortization' as any, path: (lang) => `/${lang}/amortization`, titleKey: 'amortizationCalc' as any, description: 'Build an amortization schedule and download CSV', category: 'finance' as any, keywords: ['amortization','schedule','csv','mortgage'] }
  ,{ id: 'cooking' as any, path: (lang) => `/${lang}/cooking`, titleKey: 'cookingConverter' as any, description: 'Convert teaspoons, tablespoons, cups, mL, and liters', category: 'conversion' as any, keywords: ['cooking','tsp','tbsp','cup','ml','l'] }
  ,{ id: 'salary' as any, path: (lang) => `/${lang}/salary`, titleKey: 'salaryCalc', description: 'Net salary after taxes and contributions', category: 'tax' as any, keywords: ['salary','net pay','take home'] }
  ,{ id: 'retirement' as any, path: (lang) => `/${lang}/retirement`, titleKey: 'retirementCalc' as any, description: 'Retirement savings projection', category: 'savings' as any, keywords: ['retirement','nest egg','4% rule'] }
  ,{ id: '401k' as any, path: (lang) => `/${lang}/401k`, titleKey: 'k401Calc' as any, description: '401(k) plan with employer match', category: 'savings' as any, keywords: ['401k','match','contribution'] }
  ,{ id: 'roth-ira' as any, path: (lang) => `/${lang}/roth-ira`, titleKey: 'rothIraCalc' as any, description: 'Roth IRA growth projection', category: 'savings' as any, keywords: ['roth ira','retirement'] }
  ,{ id: 'currency-arbitrage' as any, path: (lang) => `/${lang}/currency-arbitrage`, titleKey: 'currencyArbCalc' as any, description: 'FX triangular arbitrage simulator', category: 'finance' as any, keywords: ['currency','arbitrage','fx'] }
  ,{ id: 'npv-irr' as any, path: (lang) => `/${lang}/npv-irr`, titleKey: 'npvIrrCalc' as any, description: 'NPV and IRR from cash flows', category: 'finance' as any, keywords: ['npv','irr','discount rate','cash flow'] }
  ,{ id: 'annuity' as any, path: (lang) => `/${lang}/annuity`, titleKey: 'annuityCalc' as any, description: 'Present and future value of annuities', category: 'finance' as any, keywords: ['annuity','pv','fv'] }
  ,{ id: 'bond-price' as any, path: (lang) => `/${lang}/bond-price`, titleKey: 'bondPriceCalc' as any, description: 'Bond price from yield, coupon, and term', category: 'finance' as any, keywords: ['bond','price','ytm'] }
  ,{ id: 'bond-yield' as any, path: (lang) => `/${lang}/bond-yield`, titleKey: 'bondYieldCalc' as any, description: 'Solve yield to maturity from bond price', category: 'finance' as any, keywords: ['bond','yield','ytm'] }
  ,{ id: 'wacc' as any, path: (lang) => `/${lang}/wacc`, titleKey: 'waccCalc' as any, description: 'Weighted average cost of capital', category: 'finance' as any, keywords: ['wacc','cost of capital'] }
  ,{ id: 'dscr' as any, path: (lang) => `/${lang}/dscr`, titleKey: 'dscrCalc' as any, description: 'Debt service coverage ratio', category: 'finance' as any, keywords: ['dscr','coverage','noi'] }
  // Existing pages not yet listed above
  ,{ id: 'roi' as any, path: (lang) => `/${lang}/roi`, titleKey: 'roiCalc' as any, description: 'Return on Investment and CAGR', category: 'finance' as any, keywords: ['roi','return','cagr'] }
  ,{ id: 'stock-return' as any, path: (lang) => `/${lang}/stock-return`, titleKey: 'stockReturnCalc' as any, description: 'Stock total return with dividends', category: 'finance' as any, keywords: ['stock','return','dividend'] }
  ,{ id: 'dividend' as any, path: (lang) => `/${lang}/dividend`, titleKey: 'dividendCalc' as any, description: 'Dividend income and yield', category: 'finance' as any, keywords: ['dividend','yield','income'] }
  ,{ id: 'sales-tax' as any, path: (lang) => `/${lang}/sales-tax`, titleKey: 'salesTaxCalc' as any, description: 'Sales tax from rate and price', category: 'tax' as any, keywords: ['sales tax','vat','gst'] }
  ,{ id: 'tip' as any, path: (lang) => `/${lang}/tip`, titleKey: 'tipCalc' as any, description: 'Bill tip and split per person', category: 'lifestyle' as any, keywords: ['tip','gratuity','bill split'] }
  ,{ id: 'discount' as any, path: (lang) => `/${lang}/discount`, titleKey: 'discountCalc' as any, description: 'Final price after discount', category: 'lifestyle' as any, keywords: ['discount','sale','markdown'] }
  ,{ id: 'crypto-profit' as any, path: (lang) => `/${lang}/crypto-profit`, titleKey: 'cryptoProfitCalc' as any, description: 'Crypto trade profit after fees', category: 'finance' as any, keywords: ['crypto','profit','fees'] }
  ,{ id: 'bitcoin-mining' as any, path: (lang) => `/${lang}/bitcoin-mining`, titleKey: 'bitcoinMiningCalc' as any, description: 'Bitcoin mining revenue and cost', category: 'tech' as any, keywords: ['bitcoin','mining','hashrate'] }
  ,{ id: 'eth-gas' as any, path: (lang) => `/${lang}/eth-gas`, titleKey: 'ethGasCalc' as any, description: 'Ethereum transaction fee from gas', category: 'tech' as any, keywords: ['ethereum','gas','fee'] }
  ,{ id: 'nft-profit' as any, path: (lang) => `/${lang}/nft-profit`, titleKey: 'nftProfitCalc' as any, description: 'NFT trade profit after fees', category: 'finance' as any, keywords: ['nft','profit','royalty'] }
  ,{ id: 'sip' as any, path: (lang) => `/${lang}/sip`, titleKey: 'sipCalc' as any, description: 'SIP returns (India)', category: 'savings' as any, keywords: ['sip','india','investment'] }
  ,{ id: 'mutual-fund' as any, path: (lang) => `/${lang}/mutual-fund`, titleKey: 'mutualFundCalc' as any, description: 'Mutual fund return after expense ratio', category: 'finance' as any, keywords: ['mutual fund','nav','expense ratio'] }
  ,{ id: 'property-tax' as any, path: (lang) => `/${lang}/property-tax`, titleKey: 'propertyTaxCalc' as any, description: 'Property tax estimate', category: 'tax' as any, keywords: ['property tax','assessment','levy'] }
  ,{ id: 'inflation' as any, path: (lang) => `/${lang}/inflation`, titleKey: 'inflationCalc' as any, description: 'Adjust values for inflation', category: 'finance' as any, keywords: ['inflation','cpi','purchasing power'] }
  ,{ id: 'profit-margin' as any, path: (lang) => `/${lang}/profit-margin`, titleKey: 'profitMarginCalc' as any, description: 'Gross/operating profit margins', category: 'finance' as any, keywords: ['margin','gross','operating'] }
  ,{ id: 'business-loan' as any, path: (lang) => `/${lang}/business-loan`, titleKey: 'businessLoanCalc' as any, description: 'Business loan payment and totals', category: 'finance' as any, keywords: ['business loan','emi','payment'] }
  ,{ id: 'house-affordability' as any, path: (lang) => `/${lang}/house-affordability`, titleKey: 'houseAffordabilityCalc' as any, description: 'Max affordable home price from income, DTI, rate, and taxes', category: 'finance' as any, keywords: ['house','affordability','mortgage','dti'] }
  ,{ id: 'ltv' as any, path: (lang) => `/${lang}/ltv`, titleKey: 'ltvCalc' as any, description: 'Loan-to-Value and equity percent from value and loan', category: 'finance' as any, keywords: ['ltv','loan to value','equity'] }
  ,{ id: 'dti' as any, path: (lang) => `/${lang}/dti`, titleKey: 'dtiCalc' as any, description: 'Debt-to-income ratio with basic categorization', category: 'finance' as any, keywords: ['dti','debt to income','affordability'] }
  ,{ id: 'emergency-fund' as any, path: (lang) => `/${lang}/emergency-fund`, titleKey: 'emergencyFundCalc' as any, description: 'Target emergency fund and months to reach goal', category: 'savings' as any, keywords: ['emergency fund','safety net','savings'] }
  ,{ id: 'solar-panel' as any, path: (lang) => `/${lang}/solar-panel`, titleKey: 'solarPanelCalc' as any, description: 'Estimate panels and system size from usage and sun hours', category: 'household' as any, keywords: ['solar','panel','pv','renewable'] }
  ,{ id: 'ev-charging' as any, path: (lang) => `/${lang}/ev-charging`, titleKey: 'evChargingCalc' as any, description: 'EV charging time and cost from battery, charger, and efficiency', category: 'tech' as any, keywords: ['ev','charging','battery','kwh'] }
  ,{ id: 'rectangle-area' as any, path: (lang) => `/${lang}/rectangle-area`, titleKey: 'rectangleAreaCalc' as any, description: 'Rectangle area, perimeter, and diagonal', category: 'math' as any, keywords: ['rectangle','area','perimeter','diagonal'] }
  ,{ id: 'pythagorean' as any, path: (lang) => `/${lang}/pythagorean`, titleKey: 'pythagoreanCalc' as any, description: 'Solve right triangle sides using a²+b²=c²', category: 'math' as any, keywords: ['pythagorean','right triangle','hypotenuse'] }
  
  ,{ id: 'average' as any, path: (lang) => `/${lang}/average`, titleKey: 'averageCalc' as any, description: 'Compute mean from numbers', category: 'math' as any, keywords: ['average','mean'] }
  ,{ id: 'median-mode' as any, path: (lang) => `/${lang}/median-mode`, titleKey: 'medianModeCalc' as any, description: 'Compute median and mode', category: 'math' as any, keywords: ['median','mode'] }
  ,{ id: 'std-dev' as any, path: (lang) => `/${lang}/std-dev`, titleKey: 'stdDevCalc' as any, description: 'Standard deviation and variance', category: 'math' as any, keywords: ['std dev','variance'] }
  ,{ id: 'exponent' as any, path: (lang) => `/${lang}/exponent`, titleKey: 'exponentCalc' as any, description: 'Exponent and logarithm tools', category: 'math' as any, keywords: ['exponent','logarithm'] }
  ,{ id: 'ratio' as any, path: (lang) => `/${lang}/ratio`, titleKey: 'ratioCalc' as any, description: 'Simplify and scale ratios', category: 'math' as any, keywords: ['ratio','proportion'] }
  ,{ id: 'percentage' as any, path: (lang) => `/${lang}/percentage`, titleKey: 'percentageCalc' as any, description: 'Percent increase/decrease and parts', category: 'math' as any, keywords: ['percent','percentage'] }
  ,{ id: 'overtime' as any, path: (lang) => `/${lang}/overtime`, titleKey: 'overtimeCalc' as any, description: 'Overtime pay and total weekly pay', category: 'finance' as any, keywords: ['overtime','ot','pay'] }
  ,{ id: 'markup' as any, path: (lang) => `/${lang}/markup`, titleKey: 'markupCalc' as any, description: 'Price from cost and markup', category: 'finance' as any, keywords: ['markup','margin','pricing'] }
  ,{ id: 'hourly-wage' as any, path: (lang) => `/${lang}/hourly-wage`, titleKey: 'hourlyWageCalc' as any, description: 'Hourly wage and annual salary', category: 'finance' as any, keywords: ['hourly','wage','salary'] }
  ,{ id: 'freelancer-rate' as any, path: (lang) => `/${lang}/freelancer-rate`, titleKey: 'freelancerRateCalc' as any, description: 'Freelancer target rate', category: 'finance' as any, keywords: ['freelancer','rate','pricing'] }
  ,{ id: 'time' as any, path: (lang) => `/${lang}/time`, titleKey: 'timeCalc' as any, description: 'Time unit converter', category: 'conversion' as any, keywords: ['time','seconds','minutes'] }
  ,{ id: 'power' as any, path: (lang) => `/${lang}/power`, titleKey: 'powerCalc' as any, description: 'Power unit converter', category: 'conversion' as any, keywords: ['power','watt','kw'] }
  ,{ id: 'frequency' as any, path: (lang) => `/${lang}/frequency`, titleKey: 'frequencyCalc' as any, description: 'Frequency unit converter', category: 'conversion' as any, keywords: ['frequency','hz','khz'] }
  ,{ id: 'length' as any, path: (lang) => `/${lang}/length`, titleKey: 'lengthConverter' as any, description: 'Length unit converter', category: 'conversion' as any, keywords: ['length','meter','inch'] }
  ,{ id: 'weight' as any, path: (lang) => `/${lang}/weight`, titleKey: 'weightConverter' as any, description: 'Weight unit converter', category: 'conversion' as any, keywords: ['weight','kg','lb'] }
  ,{ id: 'speed' as any, path: (lang) => `/${lang}/speed`, titleKey: 'speedConverter' as any, description: 'Speed unit converter', category: 'conversion' as any, keywords: ['speed','kmh','mph'] }
  ,{ id: 'temperature' as any, path: (lang) => `/${lang}/temperature`, titleKey: 'temperatureConverter' as any, description: 'Temperature unit converter', category: 'conversion' as any, keywords: ['temperature','celsius','fahrenheit'] }
  ,{ id: 'pressure' as any, path: (lang) => `/${lang}/pressure`, titleKey: 'pressureConverter' as any, description: 'Pressure unit converter', category: 'conversion' as any, keywords: ['pressure','bar','psi'] }
  ,{ id: 'angle' as any, path: (lang) => `/${lang}/angle`, titleKey: 'angleConverter' as any, description: 'Angle unit converter', category: 'conversion' as any, keywords: ['angle','degree','radian'] }
  ,{ id: 'area' as any, path: (lang) => `/${lang}/area`, titleKey: 'areaConverter' as any, description: 'Area unit converter', category: 'conversion' as any, keywords: ['area','m2','ft2'] }
  ,{ id: 'volume' as any, path: (lang) => `/${lang}/volume`, titleKey: 'volumeConverter' as any, description: 'Volume unit converter', category: 'conversion' as any, keywords: ['volume','litre','gallon'] }
  ,{ id: 'energy' as any, path: (lang) => `/${lang}/energy`, titleKey: 'energyConverter' as any, description: 'Energy unit converter', category: 'conversion' as any, keywords: ['energy','joule','calorie'] }
  ,{ id: 'blood-sugar' as any, path: (lang) => `/${lang}/blood-sugar`, titleKey: 'bloodSugarCalc' as any, description: 'Blood sugar unit converter', category: 'health' as any, keywords: ['blood sugar','glucose','diabetes'] }
  ,{ id: 'fuel-efficiency' as any, path: (lang) => `/${lang}/fuel-efficiency`, titleKey: 'fuelEfficiencyCalc' as any, description: 'Fuel efficiency converter', category: 'conversion' as any, keywords: ['fuel','efficiency','mpg'] }
  ,{ id: 'prime' as any, path: (lang) => `/${lang}/prime`, titleKey: 'primeCalc' as any, description: 'Prime check and list', category: 'math' as any, keywords: ['prime','primality'] }
  ,{ id: 'factorial' as any, path: (lang) => `/${lang}/factorial`, titleKey: 'factorialCalc' as any, description: 'Factorial and permutations', category: 'math' as any, keywords: ['factorial','n!'] }
  ,{ id: 'ovulation' as any, path: (lang) => `/${lang}/ovulation`, titleKey: 'ovulationCalc' as any, description: 'Ovulation window estimate', category: 'health' as any, keywords: ['ovulation','fertility'] }
  ,{ id: 'pregnancy-due-date' as any, path: (lang) => `/${lang}/pregnancy-due-date`, titleKey: 'pregnancyDueDateCalc' as any, description: 'Estimated due date (Naegeles rule)', category: 'health' as any, keywords: ['pregnancy','due date'] }
  ,{ id: 'pregnancy-weight-gain' as any, path: (lang) => `/${lang}/pregnancy-weight-gain`, titleKey: 'pregnancyWeightGainCalc' as any, description: 'Recommended weight gain during pregnancy', category: 'health' as any, keywords: ['pregnancy','weight gain'] }
  
  // More entries are added progressively in batches
];

export function getAllCalculatorPaths(lang: string): string[] {
  return REGISTRY.map((r) => r.path(lang));
}

