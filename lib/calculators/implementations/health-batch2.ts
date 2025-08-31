// Health Calculators Batch 2 - Real implementations with country-specific standards
import { Calculator, CalculatorInput, CalculatorOutput } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';

// Country-specific health configurations
const healthConfigs: Partial<Record<Locale, any>> = {
  en: {
    bmiCategories: [
      { min: 0, max: 18.5, label: 'Underweight', color: '#3B82F6' },
      { min: 18.5, max: 25, label: 'Normal', color: '#10B981' },
      { min: 25, max: 30, label: 'Overweight', color: '#F59E0B' },
      { min: 30, max: 35, label: 'Obese Class I', color: '#EF4444' },
      { min: 35, max: 40, label: 'Obese Class II', color: '#DC2626' },
      { min: 40, max: Infinity, label: 'Obese Class III', color: '#991B1B' }
    ],
    calorieMultipliers: {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9
    },
    proteinPerKg: { min: 0.8, optimal: 1.6, athlete: 2.2 },
    waterIntake: { mlPerKg: 35, ozPerLb: 0.5 }
  },
  th: {
    bmiCategories: [
      { min: 0, max: 18.5, label: 'น้ำหนักต่ำกว่าเกณฑ์', color: '#3B82F6' },
      { min: 18.5, max: 23, label: 'ปกติ', color: '#10B981' }, // Asian standard
      { min: 23, max: 25, label: 'น้ำหนักเกิน', color: '#F59E0B' },
      { min: 25, max: 30, label: 'อ้วนระดับ 1', color: '#EF4444' },
      { min: 30, max: 35, label: 'อ้วนระดับ 2', color: '#DC2626' },
      { min: 35, max: Infinity, label: 'อ้วนระดับ 3', color: '#991B1B' }
    ],
    calorieMultipliers: {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9
    },
    proteinPerKg: { min: 0.8, optimal: 1.2, athlete: 2.0 },
    waterIntake: { mlPerKg: 30, ozPerLb: 0.45 }
  },
  ja: {
    bmiCategories: [
      { min: 0, max: 18.5, label: '低体重', color: '#3B82F6' },
      { min: 18.5, max: 23, label: '普通体重', color: '#10B981' }, // Asian standard
      { min: 23, max: 25, label: '過体重', color: '#F59E0B' },
      { min: 25, max: 30, label: '肥満度1', color: '#EF4444' },
      { min: 30, max: 35, label: '肥満度2', color: '#DC2626' },
      { min: 35, max: Infinity, label: '肥満度3', color: '#991B1B' }
    ],
    calorieMultipliers: {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9
    },
    proteinPerKg: { min: 0.9, optimal: 1.3, athlete: 2.0 },
    waterIntake: { mlPerKg: 35, ozPerLb: 0.5 }
  },
  // Add more locales...
};

// 1. BMI Calculator with Asian/Western standards
export function createBMICalculator(locale: Locale): Calculator {
  const config = healthConfigs[locale] || healthConfigs.en;
  const isAsian = ['th', 'ja', 'zh', 'ko', 'vi', 'id'].includes(locale);
  
  return {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    category: 'health',
    icon: '⚖️',
    color: '#10B981',
    inputs: [
      {
        key: 'weight',
        label: 'Weight',
        type: 'number',
        unit: 'kg',
        required: true,
        validation: { min: 20, max: 300, required: true },
        placeholder: 'Enter your weight'
      },
      {
        key: 'weightUnit',
        label: 'Weight Unit',
        type: 'select',
        required: true,
        defaultValue: locale === 'en' ? 'lbs' : 'kg',
        options: [
          { value: 'kg', label: 'Kilograms (kg)' },
          { value: 'lbs', label: 'Pounds (lbs)' }
        ]
      },
      {
        key: 'height',
        label: 'Height',
        type: 'number',
        unit: 'cm',
        required: true,
        validation: { min: 100, max: 250, required: true },
        placeholder: 'Enter your height'
      },
      {
        key: 'heightUnit',
        label: 'Height Unit',
        type: 'select',
        required: true,
        defaultValue: locale === 'en' ? 'ft' : 'cm',
        options: [
          { value: 'cm', label: 'Centimeters (cm)' },
          { value: 'ft', label: 'Feet & Inches' },
          { value: 'm', label: 'Meters (m)' }
        ]
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        unit: 'years',
        required: false,
        validation: { min: 1, max: 120, required: false },
        placeholder: 'Optional'
      },
      {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        required: false,
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' }
        ]
      }
    ],
    outputs: [
      { key: 'bmi', label: 'BMI Value', format: 'number', precision: 1, primary: true },
      { key: 'category', label: 'BMI Category', format: 'text' },
      { key: 'idealWeight', label: 'Ideal Weight Range', format: 'text' },
      { key: 'weightToLose', label: 'Weight to Lose/Gain', format: 'text' },
      { key: 'healthRisk', label: 'Health Risk Level', format: 'text' },
      { key: 'percentile', label: 'BMI Percentile', format: 'text' }
    ],
    formulas: [
      {
        name: 'primary',
        expression: `({weight, weightUnit, height, heightUnit, age, gender}) => {
          // Convert to metric
          let weightKg = weight;
          if (weightUnit === 'lbs') {
            weightKg = weight * 0.453592;
          }
          
          let heightM = height / 100;
          if (heightUnit === 'ft') {
            heightM = height * 0.3048;
          } else if (heightUnit === 'm') {
            heightM = height;
          }
          
          // Calculate BMI
          const bmi = weightKg / (heightM * heightM);
          
          // Determine category based on Asian/Western standards
          const categories = ${JSON.stringify(config.bmiCategories)};
          let category = '';
          let categoryColor = '';
          
          for (const cat of categories) {
            if (bmi >= cat.min && bmi < cat.max) {
              category = cat.label;
              categoryColor = cat.color;
              break;
            }
          }
          
          // Calculate ideal weight range (BMI 18.5-23 for Asian, 18.5-25 for Western)
          const idealBMIMin = 18.5;
          const idealBMIMax = ${isAsian ? 23 : 25};
          const idealWeightMin = idealBMIMin * heightM * heightM;
          const idealWeightMax = idealBMIMax * heightM * heightM;
          
          // Weight to lose/gain
          let weightToLose = '';
          if (bmi < idealBMIMin) {
            const gainKg = idealWeightMin - weightKg;
            weightToLose = 'Gain ' + gainKg.toFixed(1) + ' kg';
          } else if (bmi > idealBMIMax) {
            const loseKg = weightKg - idealWeightMax;
            weightToLose = 'Lose ' + loseKg.toFixed(1) + ' kg';
          } else {
            weightToLose = 'Maintain current weight';
          }
          
          // Health risk assessment
          let healthRisk = 'Low';
          if (bmi < 18.5) healthRisk = 'Moderate (Underweight)';
          else if (bmi >= 25 && bmi < 30) healthRisk = 'Moderate';
          else if (bmi >= 30 && bmi < 35) healthRisk = 'High';
          else if (bmi >= 35) healthRisk = 'Very High';
          
          // BMI Percentile (simplified)
          let percentile = '';
          if (age && age < 20) {
            // For children/teens, would need growth charts
            percentile = 'Age-adjusted percentile requires growth charts';
          } else {
            // Adult population distribution
            if (bmi < 18.5) percentile = 'Below 5th percentile';
            else if (bmi < 25) percentile = '5th-75th percentile';
            else if (bmi < 30) percentile = '75th-90th percentile';
            else if (bmi < 35) percentile = '90th-95th percentile';
            else percentile = 'Above 95th percentile';
          }
          
          return {
            bmi,
            category,
            idealWeight: idealWeightMin.toFixed(1) + ' - ' + idealWeightMax.toFixed(1) + ' kg',
            weightToLose,
            healthRisk,
            percentile
          };
        }`,
        variables: ['weight', 'weightUnit', 'height', 'heightUnit', 'age', 'gender'],
        description: 'BMI calculation with Asian/Western standards'
      }
    ],
    graph: {
      type: 'gauge',
      min: 15,
      max: 40,
      zones: config.bmiCategories,
      animated: true
    },
    relatedCalculators: ['body-fat-calculator', 'calorie-calculator', 'ideal-weight'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณดัชนีมวลกาย (BMI)' : 'BMI Calculator',
        description: locale === 'th' ? 
          'คำนวณดัชนีมวลกายตามมาตรฐานเอเชีย พร้อมคำแนะนำสุขภาพ' :
          'Calculate Body Mass Index with health recommendations',
        keywords: ['bmi', 'body mass index', 'weight', 'health'],
        faq: [],
        article: ''
      }
    }
  };
}

// 2. TDEE & Calorie Calculator with Macros
export function createCalorieCalculator(locale: Locale): Calculator {
  const config = healthConfigs[locale] || healthConfigs.en;
  
  return {
    id: 'calorie-calculator',
    slug: 'calorie-calculator',
    category: 'health',
    icon: '🔥',
    color: '#F59E0B',
    inputs: [
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        unit: 'years',
        required: true,
        validation: { min: 15, max: 100, required: true }
      },
      {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        required: true,
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ]
      },
      {
        key: 'weight',
        label: 'Weight',
        type: 'number',
        unit: 'kg',
        required: true,
        validation: { min: 30, max: 300, required: true }
      },
      {
        key: 'height',
        label: 'Height',
        type: 'number',
        unit: 'cm',
        required: true,
        validation: { min: 100, max: 250, required: true }
      },
      {
        key: 'activityLevel',
        label: 'Activity Level',
        type: 'select',
        required: true,
        options: [
          { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
          { value: 'lightlyActive', label: 'Lightly Active (1-3 days/week)' },
          { value: 'moderatelyActive', label: 'Moderately Active (3-5 days/week)' },
          { value: 'veryActive', label: 'Very Active (6-7 days/week)' },
          { value: 'extraActive', label: 'Extra Active (athlete/physical job)' }
        ]
      },
      {
        key: 'goal',
        label: 'Goal',
        type: 'select',
        required: true,
        defaultValue: 'maintain',
        options: [
          { value: 'lose2', label: 'Lose 1 kg/week' },
          { value: 'lose1', label: 'Lose 0.5 kg/week' },
          { value: 'maintain', label: 'Maintain Weight' },
          { value: 'gain1', label: 'Gain 0.5 kg/week' },
          { value: 'gain2', label: 'Gain 1 kg/week' }
        ]
      },
      {
        key: 'formula',
        label: 'Formula',
        type: 'select',
        required: true,
        defaultValue: 'mifflin',
        options: [
          { value: 'mifflin', label: 'Mifflin-St Jeor (Recommended)' },
          { value: 'harris', label: 'Harris-Benedict' },
          { value: 'katch', label: 'Katch-McArdle (requires body fat %)' }
        ]
      }
    ],
    outputs: [
      { key: 'bmr', label: 'BMR (Basal Metabolic Rate)', format: 'number', precision: 0 },
      { key: 'tdee', label: 'TDEE (Maintenance Calories)', format: 'number', precision: 0, primary: true },
      { key: 'targetCalories', label: 'Target Daily Calories', format: 'number', precision: 0 },
      { key: 'protein', label: 'Protein (grams)', format: 'number', precision: 0 },
      { key: 'carbs', label: 'Carbohydrates (grams)', format: 'number', precision: 0 },
      { key: 'fat', label: 'Fat (grams)', format: 'number', precision: 0 },
      { key: 'weeklyChange', label: 'Expected Weekly Change', format: 'text' },
      { key: 'monthlyChange', label: 'Expected Monthly Change', format: 'text' }
    ],
    formulas: [
      {
        name: 'primary',
        expression: `({age, gender, weight, height, activityLevel, goal, formula}) => {
          let bmr = 0;
          
          // Calculate BMR based on selected formula
          if (formula === 'mifflin') {
            // Mifflin-St Jeor Equation
            if (gender === 'male') {
              bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
              bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
          } else if (formula === 'harris') {
            // Harris-Benedict Equation
            if (gender === 'male') {
              bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
              bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
          } else {
            // Katch-McArdle (simplified, assumes average body fat)
            const leanMass = gender === 'male' ? weight * 0.85 : weight * 0.75;
            bmr = 370 + (21.6 * leanMass);
          }
          
          // Activity multipliers
          const multipliers = ${JSON.stringify(config.calorieMultipliers)};
          const tdee = bmr * multipliers[activityLevel];
          
          // Goal adjustments
          let targetCalories = tdee;
          let weeklyChange = 'Maintain weight';
          let monthlyChange = 'No change expected';
          
          switch(goal) {
            case 'lose2':
              targetCalories = tdee - 1000; // 1kg = ~7700 calories
              weeklyChange = 'Lose ~1 kg';
              monthlyChange = 'Lose ~4 kg';
              break;
            case 'lose1':
              targetCalories = tdee - 500;
              weeklyChange = 'Lose ~0.5 kg';
              monthlyChange = 'Lose ~2 kg';
              break;
            case 'gain1':
              targetCalories = tdee + 500;
              weeklyChange = 'Gain ~0.5 kg';
              monthlyChange = 'Gain ~2 kg';
              break;
            case 'gain2':
              targetCalories = tdee + 1000;
              weeklyChange = 'Gain ~1 kg';
              monthlyChange = 'Gain ~4 kg';
              break;
          }
          
          // Calculate macros (balanced approach)
          let proteinRatio, carbRatio, fatRatio;
          
          if (goal.includes('lose')) {
            // Higher protein for weight loss
            proteinRatio = 0.30;
            carbRatio = 0.35;
            fatRatio = 0.35;
          } else if (goal.includes('gain')) {
            // More carbs for weight gain
            proteinRatio = 0.25;
            carbRatio = 0.45;
            fatRatio = 0.30;
          } else {
            // Balanced for maintenance
            proteinRatio = 0.25;
            carbRatio = 0.40;
            fatRatio = 0.35;
          }
          
          const protein = (targetCalories * proteinRatio) / 4; // 4 cal/g
          const carbs = (targetCalories * carbRatio) / 4; // 4 cal/g
          const fat = (targetCalories * fatRatio) / 9; // 9 cal/g
          
          return {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            targetCalories: Math.round(targetCalories),
            protein: Math.round(protein),
            carbs: Math.round(carbs),
            fat: Math.round(fat),
            weeklyChange,
            monthlyChange
          };
        }`,
        variables: ['age', 'gender', 'weight', 'height', 'activityLevel', 'goal', 'formula'],
        description: 'TDEE and macro calculation with multiple formulas'
      }
    ],
    graph: {
      type: 'donut',
      showLegend: true,
      colors: ['#EF4444', '#3B82F6', '#F59E0B']
    },
    relatedCalculators: ['bmi-calculator', 'macro-calculator', 'protein-intake'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณแคลอรี่และ TDEE' : 'Calorie & TDEE Calculator',
        description: locale === 'th' ? 
          'คำนวณแคลอรี่ที่ต้องการต่อวัน พร้อมสัดส่วนโปรตีน คาร์บ ไขมัน' :
          'Calculate daily calorie needs with macro breakdown',
        keywords: ['calories', 'tdee', 'macros', 'diet'],
        faq: [],
        article: ''
      }
    }
  };
}

// 3. Body Fat Calculator (Multiple Methods)
export function createBodyFatCalculator(locale: Locale): Calculator {
  return {
    id: 'body-fat-calculator',
    slug: 'body-fat-calculator',
    category: 'health',
    icon: '💪',
    color: '#8B5CF6',
    inputs: [
      {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        required: true,
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ]
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        unit: 'years',
        required: true,
        validation: { min: 15, max: 100, required: true }
      },
      {
        key: 'weight',
        label: 'Weight',
        type: 'number',
        unit: 'kg',
        required: true,
        validation: { min: 30, max: 300, required: true }
      },
      {
        key: 'height',
        label: 'Height',
        type: 'number',
        unit: 'cm',
        required: true,
        validation: { min: 100, max: 250, required: true }
      },
      {
        key: 'neck',
        label: 'Neck Circumference',
        type: 'number',
        unit: 'cm',
        required: true,
        validation: { min: 20, max: 60, required: true },
        placeholder: 'Measure below larynx'
      },
      {
        key: 'waist',
        label: 'Waist Circumference',
        type: 'number',
        unit: 'cm',
        required: true,
        validation: { min: 50, max: 200, required: true },
        placeholder: 'At navel level'
      },
      {
        key: 'hip',
        label: 'Hip Circumference',
        type: 'number',
        unit: 'cm',
        required: true,
        validation: { min: 50, max: 200, required: true },
        placeholder: 'Widest point (women only)',
        showIf: { gender: 'female' }
      }
    ],
    outputs: [
      { key: 'bodyFatPercentage', label: 'Body Fat %', format: 'percentage', precision: 1, primary: true },
      { key: 'bodyFatMass', label: 'Fat Mass', format: 'text' },
      { key: 'leanMass', label: 'Lean Body Mass', format: 'text' },
      { key: 'category', label: 'Body Fat Category', format: 'text' },
      { key: 'idealBodyFat', label: 'Ideal Body Fat Range', format: 'text' },
      { key: 'bmi', label: 'BMI', format: 'number', precision: 1 }
    ],
    formulas: [
      {
        name: 'primary',
        expression: `({gender, age, weight, height, neck, waist, hip}) => {
          // US Navy Method
          let bodyFatPercentage;
          
          if (gender === 'male') {
            // Men: 495/(1.0324-0.19077*log10(waist-neck)+0.15456*log10(height))-450
            bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
          } else {
            // Women: 495/(1.29579-0.35004*log10(waist+hip-neck)+0.22100*log10(height))-450
            bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + (hip || 0) - neck) + 0.22100 * Math.log10(height)) - 450;
          }
          
          // Calculate fat mass and lean mass
          const bodyFatMass = weight * (bodyFatPercentage / 100);
          const leanMass = weight - bodyFatMass;
          
          // Determine category
          let category = '';
          if (gender === 'male') {
            if (bodyFatPercentage < 6) category = 'Essential Fat';
            else if (bodyFatPercentage < 14) category = 'Athletes';
            else if (bodyFatPercentage < 18) category = 'Fitness';
            else if (bodyFatPercentage < 25) category = 'Average';
            else category = 'Obese';
          } else {
            if (bodyFatPercentage < 14) category = 'Essential Fat';
            else if (bodyFatPercentage < 21) category = 'Athletes';
            else if (bodyFatPercentage < 25) category = 'Fitness';
            else if (bodyFatPercentage < 32) category = 'Average';
            else category = 'Obese';
          }
          
          // Ideal body fat range
          let idealBodyFat = '';
          if (gender === 'male') {
            if (age < 30) idealBodyFat = '8-19%';
            else if (age < 40) idealBodyFat = '11-21%';
            else if (age < 50) idealBodyFat = '12-22%';
            else idealBodyFat = '13-25%';
          } else {
            if (age < 30) idealBodyFat = '16-24%';
            else if (age < 40) idealBodyFat = '17-25%';
            else if (age < 50) idealBodyFat = '18-26%';
            else idealBodyFat = '19-28%';
          }
          
          // Calculate BMI
          const heightM = height / 100;
          const bmi = weight / (heightM * heightM);
          
          return {
            bodyFatPercentage,
            bodyFatMass: bodyFatMass.toFixed(1) + ' kg',
            leanMass: leanMass.toFixed(1) + ' kg',
            category,
            idealBodyFat,
            bmi
          };
        }`,
        variables: ['gender', 'age', 'weight', 'height', 'neck', 'waist', 'hip'],
        description: 'US Navy body fat calculation method'
      }
    ],
    graph: {
      type: 'gauge',
      min: 5,
      max: 40,
      zones: [
        { min: 0, max: 10, color: '#3B82F6', label: 'Essential' },
        { min: 10, max: 20, color: '#10B981', label: 'Athletic' },
        { min: 20, max: 25, color: '#F59E0B', label: 'Fitness' },
        { min: 25, max: 32, color: '#EF4444', label: 'Average' },
        { min: 32, max: 50, color: '#991B1B', label: 'Obese' }
      ],
      animated: true
    },
    relatedCalculators: ['bmi-calculator', 'ideal-weight', 'muscle-mass'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณเปอร์เซ็นต์ไขมันในร่างกาย' : 'Body Fat Calculator',
        description: locale === 'th' ? 
          'คำนวณเปอร์เซ็นต์ไขมันด้วยวิธี US Navy' :
          'Calculate body fat percentage using US Navy method',
        keywords: ['body fat', 'lean mass', 'fitness'],
        faq: [],
        article: ''
      }
    }
  };
}

// 4. Pregnancy Due Date Calculator
export function createPregnancyCalculator(locale: Locale): Calculator {
  return {
    id: 'pregnancy-calculator',
    slug: 'pregnancy-calculator',
    category: 'health',
    icon: '🤰',
    color: '#EC4899',
    inputs: [
      {
        key: 'calculationMethod',
        label: 'Calculation Method',
        type: 'select',
        required: true,
        defaultValue: 'lmp',
        options: [
          { value: 'lmp', label: 'Last Menstrual Period (LMP)' },
          { value: 'conception', label: 'Conception Date' },
          { value: 'ivf', label: 'IVF Transfer Date' },
          { value: 'ultrasound', label: 'Ultrasound Date' }
        ]
      },
      {
        key: 'lmpDate',
        label: 'First Day of Last Period',
        type: 'date',
        required: true,
        showIf: { calculationMethod: 'lmp' }
      },
      {
        key: 'conceptionDate',
        label: 'Conception Date',
        type: 'date',
        required: true,
        showIf: { calculationMethod: 'conception' }
      },
      {
        key: 'ivfDate',
        label: 'IVF Transfer Date',
        type: 'date',
        required: true,
        showIf: { calculationMethod: 'ivf' }
      },
      {
        key: 'ivfType',
        label: 'Embryo Age at Transfer',
        type: 'select',
        required: true,
        defaultValue: '5',
        showIf: { calculationMethod: 'ivf' },
        options: [
          { value: '3', label: 'Day 3 Embryo' },
          { value: '5', label: 'Day 5 Blastocyst' }
        ]
      },
      {
        key: 'cycleLength',
        label: 'Average Cycle Length',
        type: 'number',
        unit: 'days',
        defaultValue: 28,
        validation: { min: 20, max: 45, required: false },
        placeholder: 'Default: 28 days'
      }
    ],
    outputs: [
      { key: 'dueDate', label: 'Estimated Due Date', format: 'text', primary: true },
      { key: 'gestationalAge', label: 'Current Gestational Age', format: 'text' },
      { key: 'trimester', label: 'Current Trimester', format: 'text' },
      { key: 'daysRemaining', label: 'Days Until Due Date', format: 'number', precision: 0 },
      { key: 'conceptionDate', label: 'Estimated Conception', format: 'text' },
      { key: 'viableDate', label: 'Viability Date (24 weeks)', format: 'text' },
      { key: 'fullTermDate', label: 'Full Term Date (37 weeks)', format: 'text' }
    ],
    formulas: [
      {
        name: 'primary',
        expression: `({calculationMethod, lmpDate, conceptionDate, ivfDate, ivfType, cycleLength}) => {
          const today = new Date();
          let dueDate, conception, lmp;
          
          // Calculate based on method
          if (calculationMethod === 'lmp' && lmpDate) {
            lmp = new Date(lmpDate);
            // Naegele's Rule: LMP + 280 days (adjusted for cycle length)
            const adjustment = (cycleLength || 28) - 28;
            dueDate = new Date(lmp);
            dueDate.setDate(dueDate.getDate() + 280 + adjustment);
            
            // Estimated conception (ovulation around day 14)
            conception = new Date(lmp);
            conception.setDate(conception.getDate() + 14 + adjustment/2);
            
          } else if (calculationMethod === 'conception' && conceptionDate) {
            conception = new Date(conceptionDate);
            // Due date = conception + 266 days
            dueDate = new Date(conception);
            dueDate.setDate(dueDate.getDate() + 266);
            
            // Estimated LMP
            lmp = new Date(conception);
            lmp.setDate(lmp.getDate() - 14);
            
          } else if (calculationMethod === 'ivf' && ivfDate) {
            const transfer = new Date(ivfDate);
            const embryoAge = parseInt(ivfType || '5');
            
            // Calculate conception date (transfer - embryo age)
            conception = new Date(transfer);
            conception.setDate(conception.getDate() - embryoAge);
            
            // Due date = conception + 266 days
            dueDate = new Date(conception);
            dueDate.setDate(dueDate.getDate() + 266);
            
            // Estimated LMP
            lmp = new Date(conception);
            lmp.setDate(lmp.getDate() - 14);
          } else {
            // Default fallback
            dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 280);
            conception = new Date();
            lmp = new Date();
          }
          
          // Calculate gestational age
          const gestationalDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
          const weeks = Math.floor(gestationalDays / 7);
          const days = gestationalDays % 7;
          const gestationalAge = weeks + ' weeks, ' + days + ' days';
          
          // Determine trimester
          let trimester = '';
          if (weeks < 13) trimester = 'First Trimester (Week 1-12)';
          else if (weeks < 27) trimester = 'Second Trimester (Week 13-26)';
          else trimester = 'Third Trimester (Week 27-40)';
          
          // Days remaining
          const daysRemaining = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
          
          // Important dates
          const viableDate = new Date(lmp);
          viableDate.setDate(viableDate.getDate() + (24 * 7)); // 24 weeks
          
          const fullTermDate = new Date(lmp);
          fullTermDate.setDate(fullTermDate.getDate() + (37 * 7)); // 37 weeks
          
          // Format dates
          const formatDate = (date) => {
            return date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
          };
          
          return {
            dueDate: formatDate(dueDate),
            gestationalAge,
            trimester,
            daysRemaining: Math.max(0, daysRemaining),
            conceptionDate: formatDate(conception),
            viableDate: formatDate(viableDate),
            fullTermDate: formatDate(fullTermDate)
          };
        }`,
        variables: ['calculationMethod', 'lmpDate', 'conceptionDate', 'ivfDate', 'ivfType', 'cycleLength'],
        description: 'Pregnancy due date calculation using multiple methods'
      }
    ],
    graph: {
      type: 'timeline',
      milestones: ['Conception', 'First Trimester', 'Second Trimester', 'Third Trimester', 'Due Date'],
      animated: true
    },
    relatedCalculators: ['ovulation-calculator', 'pregnancy-weight-gain', 'baby-gender-predictor'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณวันคลอด' : 'Pregnancy Due Date Calculator',
        description: locale === 'th' ? 
          'คำนวณวันครบกำหนดคลอดและอายุครรภ์' :
          'Calculate due date and gestational age',
        keywords: ['pregnancy', 'due date', 'gestational age'],
        faq: [],
        article: ''
      }
    }
  };
}

// 5. Water Intake Calculator
export function createWaterIntakeCalculator(locale: Locale): Calculator {
  const config = healthConfigs[locale] || healthConfigs.en;
  
  return {
    id: 'water-intake-calculator',
    slug: 'water-intake-calculator',
    category: 'health',
    icon: '💧',
    color: '#06B6D4',
    inputs: [
      {
        key: 'weight',
        label: 'Body Weight',
        type: 'number',
        unit: 'kg',
        required: true,
        validation: { min: 20, max: 300, required: true }
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        unit: 'years',
        required: true,
        validation: { min: 1, max: 120, required: true }
      },
      {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        required: true,
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ]
      },
      {
        key: 'activityLevel',
        label: 'Activity Level',
        type: 'select',
        required: true,
        options: [
          { value: 'sedentary', label: 'Sedentary' },
          { value: 'light', label: 'Light Exercise (1-3 days/week)' },
          { value: 'moderate', label: 'Moderate (3-5 days/week)' },
          { value: 'active', label: 'Active (6-7 days/week)' },
          { value: 'athlete', label: 'Athlete/Very Active' }
        ]
      },
      {
        key: 'climate',
        label: 'Climate',
        type: 'select',
        required: true,
        defaultValue: 'temperate',
        options: [
          { value: 'cold', label: 'Cold Climate' },
          { value: 'temperate', label: 'Temperate Climate' },
          { value: 'hot', label: 'Hot/Humid Climate' },
          { value: 'dry', label: 'Hot/Dry Climate' }
        ]
      },
      {
        key: 'pregnancy',
        label: 'Pregnancy/Breastfeeding',
        type: 'select',
        required: false,
        showIf: { gender: 'female' },
        options: [
          { value: 'none', label: 'Not Applicable' },
          { value: 'pregnant', label: 'Pregnant' },
          { value: 'breastfeeding', label: 'Breastfeeding' }
        ]
      }
    ],
    outputs: [
      { key: 'dailyWaterML', label: 'Daily Water (mL)', format: 'number', precision: 0, primary: true },
      { key: 'dailyWaterL', label: 'Daily Water (Liters)', format: 'number', precision: 1 },
      { key: 'dailyWaterOz', label: 'Daily Water (Ounces)', format: 'number', precision: 0 },
      { key: 'glassesPerDay', label: 'Glasses per Day (250ml)', format: 'number', precision: 0 },
      { key: 'hourlyIntake', label: 'Hourly Intake (awake)', format: 'text' },
      { key: 'recommendation', label: 'Recommendation', format: 'text' }
    ],
    formulas: [
      {
        name: 'primary',
        expression: `({weight, age, gender, activityLevel, climate, pregnancy}) => {
          // Base water calculation
          let baseWater = weight * ${config.waterIntake.mlPerKg};
          
          // Age adjustment
          if (age < 18) {
            baseWater *= 1.1; // Children need more relative to weight
          } else if (age > 65) {
            baseWater *= 0.95; // Elderly may need slightly less
          }
          
          // Gender adjustment
          if (gender === 'female') {
            baseWater *= 0.9; // Women typically need slightly less
          }
          
          // Activity level adjustment
          const activityMultipliers = {
            sedentary: 1.0,
            light: 1.15,
            moderate: 1.3,
            active: 1.45,
            athlete: 1.6
          };
          baseWater *= activityMultipliers[activityLevel];
          
          // Climate adjustment
          const climateMultipliers = {
            cold: 0.95,
            temperate: 1.0,
            hot: 1.2,
            dry: 1.25
          };
          baseWater *= climateMultipliers[climate];
          
          // Pregnancy/breastfeeding adjustment
          if (pregnancy === 'pregnant') {
            baseWater += 300; // Extra 300ml for pregnancy
          } else if (pregnancy === 'breastfeeding') {
            baseWater += 700; // Extra 700ml for breastfeeding
          }
          
          // Calculate different units
          const dailyWaterML = Math.round(baseWater);
          const dailyWaterL = dailyWaterML / 1000;
          const dailyWaterOz = Math.round(dailyWaterML * 0.033814);
          const glassesPerDay = Math.round(dailyWaterML / 250);
          
          // Hourly intake (assuming 16 waking hours)
          const hourlyML = Math.round(dailyWaterML / 16);
          const hourlyIntake = hourlyML + ' mL (' + Math.round(hourlyML * 0.033814) + ' oz)';
          
          // Recommendation
          let recommendation = '';
          if (dailyWaterML < 1500) {
            recommendation = 'Your water intake seems low. Try to increase gradually.';
          } else if (dailyWaterML > 4000) {
            recommendation = 'High water needs due to activity/climate. Space intake throughout the day.';
          } else {
            recommendation = 'Healthy water intake. Drink before feeling thirsty.';
          }
          
          return {
            dailyWaterML,
            dailyWaterL,
            dailyWaterOz,
            glassesPerDay,
            hourlyIntake,
            recommendation
          };
        }`,
        variables: ['weight', 'age', 'gender', 'activityLevel', 'climate', 'pregnancy'],
        description: 'Personalized water intake calculation'
      }
    ],
    graph: {
      type: 'bar',
      showComparison: true,
      animated: true
    },
    relatedCalculators: ['calorie-calculator', 'bmi-calculator', 'electrolyte-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณปริมาณน้ำที่ควรดื่ม' : 'Water Intake Calculator',
        description: locale === 'th' ? 
          'คำนวณปริมาณน้ำที่ควรดื่มต่อวันตามสภาพร่างกาย' :
          'Calculate daily water intake based on your body and lifestyle',
        keywords: ['water', 'hydration', 'health'],
        faq: [],
        article: ''
      }
    }
  };
}

// Export all health calculators batch 2
export const healthCalculatorsBatch2 = [
  createBMICalculator,
  createCalorieCalculator,
  createBodyFatCalculator,
  createPregnancyCalculator,
  createWaterIntakeCalculator
];