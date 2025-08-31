// Fun & Novelty Calculator Implementations
import { Calculator } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';
import { 
  loveCalculator,
  luckyNumberCalculator,
  birthdayCalculator,
  personalityCalculator
} from '@/data/calculators/fun-calculators';

// Create factory functions for each calculator
export const funCalculatorsBatch = [
  (locale: Locale) => loveCalculator,
  (locale: Locale) => luckyNumberCalculator,
  (locale: Locale) => birthdayCalculator,
  (locale: Locale) => personalityCalculator
];