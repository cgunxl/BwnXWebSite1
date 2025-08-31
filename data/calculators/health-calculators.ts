import { Calculator } from '@/lib/types/calculator';

export const healthCalculators: Calculator[] = [
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    category: 'health',
    icon: '⚖️',
    color: '#EF4444',
    inputs: [
      {
        key: 'unit',
        label: 'Unit System',
        type: 'radio',
        defaultValue: 'metric',
        required: true,
        options: [
          { value: 'metric', label: 'Metric (kg, cm)' },
          { value: 'imperial', label: 'Imperial (lbs, ft/in)' }
        ]
      },
      {
        key: 'weight',
        label: 'Weight',
        type: 'number',
        defaultValue: 70,
        min: 1,
        max: 500,
        step: 0.1,
        required: true,
        unit: 'kg',
        dependsOn: ['unit'],
        showWhen: { unit: 'metric' }
      },
      {
        key: 'weightLbs',
        label: 'Weight',
        type: 'number',
        defaultValue: 154,
        min: 1,
        max: 1000,
        step: 1,
        required: true,
        unit: 'lbs',
        dependsOn: ['unit'],
        showWhen: { unit: 'imperial' }
      },
      {
        key: 'height',
        label: 'Height',
        type: 'number',
        defaultValue: 170,
        min: 50,
        max: 300,
        step: 1,
        required: true,
        unit: 'cm',
        dependsOn: ['unit'],
        showWhen: { unit: 'metric' }
      },
      {
        key: 'feet',
        label: 'Height (feet)',
        type: 'number',
        defaultValue: 5,
        min: 1,
        max: 8,
        step: 1,
        required: true,
        unit: 'ft',
        dependsOn: ['unit'],
        showWhen: { unit: 'imperial' }
      },
      {
        key: 'inches',
        label: 'Height (inches)',
        type: 'number',
        defaultValue: 7,
        min: 0,
        max: 11,
        step: 1,
        required: true,
        unit: 'in',
        dependsOn: ['unit'],
        showWhen: { unit: 'imperial' }
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        defaultValue: 30,
        min: 2,
        max: 120,
        step: 1,
        required: false,
        unit: 'years',
        tooltip: 'Optional: For age-adjusted recommendations'
      },
      {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        defaultValue: 'other',
        required: false,
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Prefer not to say' }
        ],
        tooltip: 'Optional: For gender-specific recommendations'
      }
    ],
    outputs: [
      {
        key: 'bmi',
        label: 'Your BMI',
        format: 'number',
        decimals: 1,
        description: 'Body Mass Index',
        highlight: true
      },
      {
        key: 'category',
        label: 'BMI Category',
        format: 'text',
        description: 'Weight classification'
      },
      {
        key: 'healthRisk',
        label: 'Health Risk',
        format: 'text',
        description: 'Associated health risk level'
      },
      {
        key: 'idealWeightMin',
        label: 'Ideal Weight Range (Min)',
        format: 'number',
        decimals: 1,
        unit: 'kg',
        description: 'Minimum healthy weight'
      },
      {
        key: 'idealWeightMax',
        label: 'Ideal Weight Range (Max)',
        format: 'number',
        decimals: 1,
        unit: 'kg',
        description: 'Maximum healthy weight'
      },
      {
        key: 'weightToLose',
        label: 'Weight Adjustment Needed',
        format: 'number',
        decimals: 1,
        unit: 'kg',
        description: 'To reach healthy BMI'
      }
    ],
    formulas: [
      {
        key: 'bmi',
        expression: `
          if (unit === 'metric') {
            return weight / Math.pow(height / 100, 2);
          } else {
            const totalInches = feet * 12 + inches;
            return (weightLbs / Math.pow(totalInches, 2)) * 703;
          }
        `,
        description: 'BMI = weight(kg) / height(m)²'
      },
      {
        key: 'category',
        expression: `
          if (bmi < 18.5) return 'Underweight';
          if (bmi < 25) return 'Normal weight';
          if (bmi < 30) return 'Overweight';
          if (bmi < 35) return 'Obese Class I';
          if (bmi < 40) return 'Obese Class II';
          return 'Obese Class III';
        `,
        description: 'WHO BMI classifications'
      },
      {
        key: 'healthRisk',
        expression: `
          if (bmi < 18.5) return 'Increased risk';
          if (bmi < 25) return 'Low risk';
          if (bmi < 30) return 'Increased risk';
          if (bmi < 35) return 'High risk';
          if (bmi < 40) return 'Very high risk';
          return 'Extremely high risk';
        `,
        description: 'Health risk based on BMI'
      },
      {
        key: 'idealWeightMin',
        expression: `
          const heightM = unit === 'metric' ? height / 100 : (feet * 12 + inches) * 0.0254;
          return 18.5 * Math.pow(heightM, 2);
        `,
        description: 'Minimum healthy weight for BMI 18.5'
      },
      {
        key: 'idealWeightMax',
        expression: `
          const heightM = unit === 'metric' ? height / 100 : (feet * 12 + inches) * 0.0254;
          return 24.9 * Math.pow(heightM, 2);
        `,
        description: 'Maximum healthy weight for BMI 24.9'
      },
      {
        key: 'weightToLose',
        expression: `
          const currentWeight = unit === 'metric' ? weight : weightLbs * 0.453592;
          if (bmi < 18.5) return idealWeightMin - currentWeight;
          if (bmi > 25) return currentWeight - idealWeightMax;
          return 0;
        `,
        description: 'Weight change needed for healthy BMI'
      }
    ],
    graph: {
      type: 'gauge',
      title: 'BMI Scale',
      min: 15,
      max: 40,
      segments: [
        { threshold: 18.5, color: '#3B82F6', label: 'Underweight' },
        { threshold: 25, color: '#10B981', label: 'Normal' },
        { threshold: 30, color: '#F59E0B', label: 'Overweight' },
        { threshold: 35, color: '#EF4444', label: 'Obese I' },
        { threshold: 40, color: '#991B1B', label: 'Obese II' }
      ]
    },
    localizedContent: {
      en: {
        title: 'BMI Calculator',
        description: 'Calculate your Body Mass Index and understand your weight category',
        keywords: ['bmi calculator', 'body mass index', 'weight calculator', 'health calculator', 'bmi chart'],
        faq: [
          {
            question: 'What is BMI?',
            answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It\'s calculated as weight in kilograms divided by height in meters squared.'
          },
          {
            question: 'Is BMI accurate for everyone?',
            answer: 'BMI has limitations. It doesn\'t distinguish between muscle and fat, so athletes may have high BMI despite being healthy. It also doesn\'t account for age, gender, or body composition.'
          },
          {
            question: 'What is a healthy BMI range?',
            answer: 'A healthy BMI is typically 18.5-24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese. However, individual health varies.'
          },
          {
            question: 'How can I improve my BMI?',
            answer: 'Focus on sustainable lifestyle changes: balanced diet, regular exercise, adequate sleep, and stress management. Consult healthcare providers for personalized advice.'
          },
          {
            question: 'Does BMI differ by ethnicity?',
            answer: 'Yes, some ethnicities have different health risks at the same BMI. For example, Asian populations may have higher health risks at lower BMIs.'
          }
        ],
        article: {
          title: 'Understanding Your BMI: A Complete Guide',
          introduction: 'BMI is a widely used screening tool for weight categories, but it\'s important to understand both its uses and limitations.',
          sections: [
            {
              heading: 'What BMI Tells You',
              content: 'BMI provides a quick assessment of weight relative to height. It\'s useful for population studies and initial health screenings but shouldn\'t be the only health measure considered.'
            },
            {
              heading: 'BMI Limitations',
              content: 'BMI doesn\'t measure body fat directly. Athletes with high muscle mass may be classified as overweight. Older adults may have normal BMI but higher body fat. Distribution of fat also matters.'
            },
            {
              heading: 'Beyond BMI',
              content: 'Consider waist circumference, body fat percentage, physical fitness, blood pressure, cholesterol, and blood sugar. These provide a more complete health picture.'
            },
            {
              heading: 'Taking Action',
              content: 'If your BMI indicates health risks, consult healthcare providers. Focus on healthy habits rather than just numbers. Small, sustainable changes lead to long-term health improvements.'
            }
          ],
          conclusion: 'BMI is a useful starting point for health assessment, but remember it\'s just one piece of the puzzle. Focus on overall health and wellbeing.',
          wordCount: 350
        }
      },
      th: {
        title: 'คำนวณ BMI',
        description: 'คำนวณดัชนีมวลกายและเข้าใจประเภทน้ำหนักของคุณ',
        keywords: ['คำนวณ bmi', 'ดัชนีมวลกาย', 'คำนวณน้ำหนัก', 'เครื่องคำนวณสุขภาพ', 'ตาราง bmi'],
        faq: [
          {
            question: 'BMI คืออะไร?',
            answer: 'BMI (ดัชนีมวลกาย) เป็นการวัดไขมันในร่างกายจากส่วนสูงและน้ำหนัก คำนวณจากน้ำหนัก(กก.)หารด้วยส่วนสูง(ม.)ยกกำลังสอง'
          },
          {
            question: 'BMI แม่นยำสำหรับทุกคนหรือไม่?',
            answer: 'BMI มีข้อจำกัด ไม่แยกแยะระหว่างกล้ามเนื้อและไขมัน นักกีฬาอาจมี BMI สูงแม้สุขภาพดี ไม่คำนึงถึงอายุ เพศ หรือองค์ประกอบร่างกาย'
          },
          {
            question: 'ช่วง BMI ที่สุขภาพดีคือเท่าไหร่?',
            answer: 'BMI สุขภาพดีคือ 18.5-24.9 ต่ำกว่า 18.5 คือน้ำหนักน้อย 25-29.9 คือน้ำหนักเกิน 30+ คืออ้วน แต่สุขภาพแต่ละคนแตกต่างกัน'
          }
        ],
        article: {
          title: 'เข้าใจ BMI ของคุณ: คู่มือฉบับสมบูรณ์',
          introduction: 'BMI เป็นเครื่องมือคัดกรองประเภทน้ำหนักที่ใช้กันอย่างแพร่หลาย แต่สำคัญที่ต้องเข้าใจทั้งประโยชน์และข้อจำกัด',
          sections: [
            {
              heading: 'BMI บอกอะไร',
              content: 'BMI ให้การประเมินน้ำหนักเทียบกับส่วนสูงอย่างรวดเร็ว มีประโยชน์สำหรับการศึกษาประชากรและการคัดกรองสุขภาพเบื้องต้น'
            },
            {
              heading: 'ข้อจำกัดของ BMI',
              content: 'BMI ไม่วัดไขมันโดยตรง นักกีฬาที่มีกล้ามเนื้อมากอาจถูกจัดว่าน้ำหนักเกิน ผู้สูงอายุอาจมี BMI ปกติแต่ไขมันสูง การกระจายไขมันก็สำคัญ'
            }
          ],
          conclusion: 'BMI เป็นจุดเริ่มต้นที่ดีสำหรับการประเมินสุขภาพ แต่จำไว้ว่าเป็นเพียงส่วนหนึ่ง โฟกัสที่สุขภาพโดยรวม',
          wordCount: 300
        }
      }
    }
  },
  {
    id: 'calorie-calculator',
    slug: 'calorie-calculator',
    category: 'health',
    icon: '🔥',
    color: '#F59E0B',
    inputs: [
      {
        key: 'gender',
        label: 'Gender',
        type: 'radio',
        defaultValue: 'male',
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
        defaultValue: 30,
        min: 15,
        max: 100,
        step: 1,
        required: true,
        unit: 'years'
      },
      {
        key: 'weight',
        label: 'Weight',
        type: 'number',
        defaultValue: 70,
        min: 30,
        max: 300,
        step: 0.5,
        required: true,
        unit: 'kg'
      },
      {
        key: 'height',
        label: 'Height',
        type: 'number',
        defaultValue: 170,
        min: 100,
        max: 250,
        step: 1,
        required: true,
        unit: 'cm'
      },
      {
        key: 'activityLevel',
        label: 'Activity Level',
        type: 'select',
        defaultValue: 1.55,
        required: true,
        options: [
          { value: 1.2, label: 'Sedentary (little or no exercise)' },
          { value: 1.375, label: 'Lightly active (1-3 days/week)' },
          { value: 1.55, label: 'Moderately active (3-5 days/week)' },
          { value: 1.725, label: 'Very active (6-7 days/week)' },
          { value: 1.9, label: 'Extra active (very hard exercise)' }
        ]
      },
      {
        key: 'goal',
        label: 'Your Goal',
        type: 'radio',
        defaultValue: 'maintain',
        required: true,
        options: [
          { value: 'lose2', label: 'Lose 1 kg/week' },
          { value: 'lose1', label: 'Lose 0.5 kg/week' },
          { value: 'maintain', label: 'Maintain weight' },
          { value: 'gain1', label: 'Gain 0.5 kg/week' },
          { value: 'gain2', label: 'Gain 1 kg/week' }
        ]
      }
    ],
    outputs: [
      {
        key: 'bmr',
        label: 'Basal Metabolic Rate (BMR)',
        format: 'number',
        decimals: 0,
        unit: 'cal/day',
        description: 'Calories burned at rest'
      },
      {
        key: 'tdee',
        label: 'Total Daily Energy Expenditure',
        format: 'number',
        decimals: 0,
        unit: 'cal/day',
        description: 'Maintenance calories'
      },
      {
        key: 'targetCalories',
        label: 'Target Daily Calories',
        format: 'number',
        decimals: 0,
        unit: 'cal/day',
        description: 'Calories for your goal',
        highlight: true
      },
      {
        key: 'protein',
        label: 'Protein',
        format: 'number',
        decimals: 0,
        unit: 'g/day',
        description: 'Recommended protein intake'
      },
      {
        key: 'carbs',
        label: 'Carbohydrates',
        format: 'number',
        decimals: 0,
        unit: 'g/day',
        description: 'Recommended carb intake'
      },
      {
        key: 'fat',
        label: 'Fat',
        format: 'number',
        decimals: 0,
        unit: 'g/day',
        description: 'Recommended fat intake'
      }
    ],
    formulas: [
      {
        key: 'bmr',
        expression: `
          if (gender === 'male') {
            return 10 * weight + 6.25 * height - 5 * age + 5;
          } else {
            return 10 * weight + 6.25 * height - 5 * age - 161;
          }
        `,
        description: 'Mifflin-St Jeor equation'
      },
      {
        key: 'tdee',
        expression: 'bmr * activityLevel',
        description: 'BMR × activity factor'
      },
      {
        key: 'targetCalories',
        expression: `
          const adjustments = {
            lose2: -1000,
            lose1: -500,
            maintain: 0,
            gain1: 500,
            gain2: 1000
          };
          return tdee + adjustments[goal];
        `,
        description: 'TDEE adjusted for goal'
      },
      {
        key: 'protein',
        expression: 'weight * 2',
        description: '2g per kg body weight'
      },
      {
        key: 'carbs',
        expression: '(targetCalories * 0.45) / 4',
        description: '45% of calories ÷ 4 cal/g'
      },
      {
        key: 'fat',
        expression: '(targetCalories * 0.25) / 9',
        description: '25% of calories ÷ 9 cal/g'
      }
    ],
    graph: {
      type: 'bar',
      title: 'Daily Calorie Breakdown',
      data: ['bmr', 'tdee', 'targetCalories'],
      labels: ['BMR', 'Maintenance', 'Target'],
      colors: ['#3B82F6', '#10B981', '#F59E0B']
    },
    localizedContent: {
      en: {
        title: 'Calorie Calculator',
        description: 'Calculate daily calorie needs for weight loss, maintenance, or gain',
        keywords: ['calorie calculator', 'tdee calculator', 'daily calories', 'weight loss calculator', 'macro calculator'],
        faq: [
          {
            question: 'How many calories should I eat to lose weight?',
            answer: 'To lose 0.5 kg per week, eat 500 calories below your TDEE. For 1 kg per week, create a 1000 calorie deficit. Never go below 1200 calories for women or 1500 for men without medical supervision.'
          },
          {
            question: 'What is TDEE?',
            answer: 'Total Daily Energy Expenditure (TDEE) is the total calories you burn daily, including BMR, exercise, and daily activities. It\'s your maintenance calories.'
          },
          {
            question: 'How accurate is this calculator?',
            answer: 'Calorie calculators provide estimates. Individual metabolism varies by ±10-20%. Track your weight and adjust intake based on actual results over 2-4 weeks.'
          },
          {
            question: 'Should I eat back exercise calories?',
            answer: 'This calculator includes exercise in your activity level. Don\'t add exercise calories unless you selected sedentary and track workouts separately.'
          }
        ],
        article: {
          title: 'Master Your Calorie Needs',
          introduction: 'Understanding your calorie needs is fundamental for weight management and health optimization.',
          sections: [
            {
              heading: 'The Science of Calories',
              content: 'Calories are energy units. Your body burns calories for basic functions (BMR), daily activities, and exercise. Balance intake with expenditure for your goals.'
            },
            {
              heading: 'Creating a Sustainable Deficit',
              content: 'For weight loss, aim for 500-750 calorie deficit daily. This yields 0.5-0.75 kg loss weekly - a sustainable, healthy rate that preserves muscle mass.'
            },
            {
              heading: 'Quality Matters',
              content: 'Not all calories are equal. Prioritize whole foods, lean proteins, complex carbs, and healthy fats. These provide nutrients and keep you satisfied longer.'
            }
          ],
          conclusion: 'Use this calculator as a starting point, then adjust based on your progress and how you feel.',
          wordCount: 320
        }
      }
    }
  },
  {
    id: 'body-fat-calculator',
    slug: 'body-fat-calculator',
    category: 'health',
    icon: '💪',
    color: '#6366F1',
    inputs: [
      {
        key: 'method',
        label: 'Calculation Method',
        type: 'select',
        defaultValue: 'navy',
        required: true,
        options: [
          { value: 'navy', label: 'US Navy Method' },
          { value: 'bmi', label: 'BMI-based Estimate' }
        ]
      },
      {
        key: 'gender',
        label: 'Gender',
        type: 'radio',
        defaultValue: 'male',
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
        defaultValue: 30,
        min: 18,
        max: 100,
        step: 1,
        required: true,
        unit: 'years'
      },
      {
        key: 'weight',
        label: 'Weight',
        type: 'number',
        defaultValue: 75,
        min: 30,
        max: 300,
        step: 0.5,
        required: true,
        unit: 'kg'
      },
      {
        key: 'height',
        label: 'Height',
        type: 'number',
        defaultValue: 175,
        min: 100,
        max: 250,
        step: 1,
        required: true,
        unit: 'cm'
      },
      {
        key: 'neck',
        label: 'Neck Circumference',
        type: 'number',
        defaultValue: 37,
        min: 20,
        max: 60,
        step: 0.5,
        required: true,
        unit: 'cm',
        dependsOn: ['method'],
        showWhen: { method: 'navy' },
        tooltip: 'Measure below the larynx, slightly downward'
      },
      {
        key: 'waist',
        label: 'Waist Circumference',
        type: 'number',
        defaultValue: 85,
        min: 50,
        max: 200,
        step: 0.5,
        required: true,
        unit: 'cm',
        dependsOn: ['method'],
        showWhen: { method: 'navy' },
        tooltip: 'Men: at navel level. Women: at narrowest point'
      },
      {
        key: 'hip',
        label: 'Hip Circumference',
        type: 'number',
        defaultValue: 95,
        min: 60,
        max: 200,
        step: 0.5,
        required: true,
        unit: 'cm',
        dependsOn: ['method', 'gender'],
        showWhen: { method: 'navy', gender: 'female' },
        tooltip: 'Measure at the widest point'
      }
    ],
    outputs: [
      {
        key: 'bodyFatPercentage',
        label: 'Body Fat Percentage',
        format: 'percentage',
        decimals: 1,
        description: 'Estimated body fat',
        highlight: true
      },
      {
        key: 'bodyFatMass',
        label: 'Body Fat Mass',
        format: 'number',
        decimals: 1,
        unit: 'kg',
        description: 'Total fat weight'
      },
      {
        key: 'leanBodyMass',
        label: 'Lean Body Mass',
        format: 'number',
        decimals: 1,
        unit: 'kg',
        description: 'Muscle, bone, organs'
      },
      {
        key: 'category',
        label: 'Body Fat Category',
        format: 'text',
        description: 'Fitness level'
      },
      {
        key: 'idealBodyFat',
        label: 'Ideal Body Fat Range',
        format: 'text',
        description: 'Healthy range for your age/gender'
      }
    ],
    formulas: [
      {
        key: 'bodyFatPercentage',
        expression: `
          if (method === 'navy') {
            if (gender === 'male') {
              return 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
            } else {
              return 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
            }
          } else {
            // BMI-based estimate
            const bmi = weight / Math.pow(height / 100, 2);
            if (gender === 'male') {
              return 1.20 * bmi + 0.23 * age - 16.2;
            } else {
              return 1.20 * bmi + 0.23 * age - 5.4;
            }
          }
        `,
        description: 'US Navy or BMI-based formula'
      },
      {
        key: 'bodyFatMass',
        expression: 'weight * (bodyFatPercentage / 100)',
        description: 'Total weight × body fat %'
      },
      {
        key: 'leanBodyMass',
        expression: 'weight - bodyFatMass',
        description: 'Total weight - fat mass'
      },
      {
        key: 'category',
        expression: `
          if (gender === 'male') {
            if (bodyFatPercentage < 6) return 'Essential Fat';
            if (bodyFatPercentage < 14) return 'Athletes';
            if (bodyFatPercentage < 18) return 'Fitness';
            if (bodyFatPercentage < 25) return 'Average';
            return 'Above Average';
          } else {
            if (bodyFatPercentage < 14) return 'Essential Fat';
            if (bodyFatPercentage < 21) return 'Athletes';
            if (bodyFatPercentage < 25) return 'Fitness';
            if (bodyFatPercentage < 32) return 'Average';
            return 'Above Average';
          }
        `,
        description: 'ACE body fat categories'
      },
      {
        key: 'idealBodyFat',
        expression: `
          if (gender === 'male') {
            if (age < 30) return '8-19%';
            if (age < 40) return '11-21%';
            if (age < 50) return '12-22%';
            return '13-25%';
          } else {
            if (age < 30) return '16-24%';
            if (age < 40) return '17-25%';
            if (age < 50) return '18-26%';
            return '20-27%';
          }
        `,
        description: 'Age and gender specific healthy ranges'
      }
    ],
    localizedContent: {
      en: {
        title: 'Body Fat Calculator',
        description: 'Calculate your body fat percentage using Navy method or BMI',
        keywords: ['body fat calculator', 'body fat percentage', 'navy method', 'lean body mass'],
        faq: [
          {
            question: 'Which method is more accurate?',
            answer: 'The US Navy method is generally more accurate than BMI-based estimates, especially for athletic individuals. For best accuracy, use DEXA scan or hydrostatic weighing.'
          },
          {
            question: 'What is a healthy body fat percentage?',
            answer: 'For men: 10-20% is healthy, 6-13% is athletic. For women: 18-28% is healthy, 14-20% is athletic. Essential fat is 3-5% for men, 10-13% for women.'
          },
          {
            question: 'How do I measure correctly?',
            answer: 'Use a flexible tape measure. Keep it snug but not tight. Measure at the same time of day. Take multiple measurements and use the average.'
          }
        ],
        article: {
          title: 'Understanding Body Fat Percentage',
          introduction: 'Body fat percentage is a better indicator of fitness than weight alone.',
          sections: [
            {
              heading: 'Why Body Fat Matters',
              content: 'Body fat percentage shows your body composition. Two people with the same weight can look completely different based on their muscle-to-fat ratio.'
            },
            {
              heading: 'Measurement Methods',
              content: 'Methods range from simple (tape measure) to advanced (DEXA scan). The Navy method offers good accuracy for home use. Consistency in measurement is key.'
            }
          ],
          conclusion: 'Focus on healthy body fat ranges rather than extremes. Combine with other health markers for complete assessment.',
          wordCount: 280
        }
      }
    }
  }
];

// Export function to get all health calculators
export function getHealthCalculators(): Calculator[] {
  return healthCalculators;
}

// Export function to get calculator by slug
export function getHealthCalculatorBySlug(slug: string): Calculator | undefined {
  return healthCalculators.find(calc => calc.slug === slug);
}