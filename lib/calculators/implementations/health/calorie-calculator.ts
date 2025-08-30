import { Calculator } from '@/lib/types/calculator';

export const calorieCalculator: Calculator = {
  id: 'calorie-calculator',
  category: 'health',
  slug: 'calorie-calculator',
  icon: '🍎',
  color: 'bg-red-500',
  inputs: [
    {
      key: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      placeholder: 'Enter your age',
      min: 1,
      max: 120,
      required: true,
      validation: [
        { type: 'min', value: 1, message: 'Age must be at least 1' },
        { type: 'max', value: 120, message: 'Please enter a valid age' }
      ],
    },
    {
      key: 'gender',
      label: 'Gender',
      type: 'radio',
      required: true,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    },
    {
      key: 'weight',
      label: 'Weight',
      type: 'number',
      unit: 'kg',
      placeholder: 'Enter your weight',
      min: 20,
      max: 300,
      required: true,
    },
    {
      key: 'height',
      label: 'Height',
      type: 'number',
      unit: 'cm',
      placeholder: 'Enter your height',
      min: 100,
      max: 250,
      required: true,
    },
    {
      key: 'activityLevel',
      label: 'Activity Level',
      type: 'select',
      required: true,
      defaultValue: 'moderate',
      options: [
        { value: 'sedentary', label: 'Sedentary (little or no exercise)', description: 'Desk job, no exercise' },
        { value: 'light', label: 'Lightly active (1-3 days/week)', description: 'Light exercise or sports' },
        { value: 'moderate', label: 'Moderately active (3-5 days/week)', description: 'Moderate exercise or sports' },
        { value: 'active', label: 'Very active (6-7 days/week)', description: 'Hard exercise or sports' },
        { value: 'extreme', label: 'Extremely active (physical job)', description: 'Very hard exercise & physical job' },
      ],
    },
    {
      key: 'goal',
      label: 'Your Goal',
      type: 'radio',
      required: true,
      defaultValue: 'maintain',
      options: [
        { value: 'lose2', label: 'Lose 1 kg per week' },
        { value: 'lose1', label: 'Lose 0.5 kg per week' },
        { value: 'maintain', label: 'Maintain weight' },
        { value: 'gain1', label: 'Gain 0.5 kg per week' },
        { value: 'gain2', label: 'Gain 1 kg per week' },
      ],
    },
    {
      key: 'unitSystem',
      label: 'Unit System',
      type: 'radio',
      defaultValue: 'metric',
      options: [
        { value: 'metric', label: 'Metric (kg/cm)' },
        { value: 'imperial', label: 'Imperial (lbs/inches)' },
      ],
    },
  ],
  outputs: [
    {
      key: 'bmr',
      label: 'Basal Metabolic Rate (BMR)',
      format: 'number',
      unit: 'calories/day',
      precision: 0,
      description: 'Calories burned at rest',
    },
    {
      key: 'tdee',
      label: 'Total Daily Energy Expenditure',
      format: 'number',
      unit: 'calories/day',
      precision: 0,
      visualization: 'gauge',
      description: 'Calories to maintain weight',
    },
    {
      key: 'targetCalories',
      label: 'Target Daily Calories',
      format: 'number',
      unit: 'calories/day',
      precision: 0,
      visualization: 'category-bar',
      description: 'Calories to reach your goal',
    },
    {
      key: 'protein',
      label: 'Protein',
      format: 'text',
      description: 'Recommended daily protein',
    },
    {
      key: 'carbs',
      label: 'Carbohydrates',
      format: 'text',
      description: 'Recommended daily carbs',
    },
    {
      key: 'fats',
      label: 'Fats',
      format: 'text',
      description: 'Recommended daily fats',
    },
    {
      key: 'weeklyChange',
      label: 'Expected Weekly Change',
      format: 'text',
      description: 'Weight change per week',
    },
  ],
  formulas: [
    {
      name: 'bmrMale',
      expression: '(10 * weight) + (6.25 * height) - (5 * age) + 5',
      variables: ['weight', 'height', 'age'],
      description: 'Mifflin-St Jeor Equation for males',
    },
    {
      name: 'bmrFemale',
      expression: '(10 * weight) + (6.25 * height) - (5 * age) - 161',
      variables: ['weight', 'height', 'age'],
      description: 'Mifflin-St Jeor Equation for females',
    },
  ],
  relatedCalculators: ['bmi-calculator', 'bmr-calculator', 'macro-calculator', 'tdee-calculator', 'protein-intake'],
  localizedContent: {
    en: {
      title: 'Calorie Calculator - Daily Calorie Needs & Macros',
      description: 'Calculate your daily calorie needs for weight loss, maintenance, or gain. Get personalized recommendations for protein, carbs, and fats based on your goals.',
      keywords: ['calorie calculator', 'daily calories', 'TDEE calculator', 'weight loss calculator', 'macro calculator'],
      faq: [
        {
          question: 'How many calories should I eat per day?',
          answer: 'Your daily calorie needs depend on age, gender, weight, height, and activity level. Most adults need 1,500-2,500 calories per day. Use our calculator for a personalized recommendation.',
        },
        {
          question: 'What is BMR vs TDEE?',
          answer: 'BMR (Basal Metabolic Rate) is calories burned at rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through activity. TDEE is what you need to maintain current weight.',
        },
        {
          question: 'How many calories to lose weight?',
          answer: 'To lose 1 pound (0.45 kg) per week, create a deficit of 500 calories per day. For 2 pounds (0.9 kg) per week, aim for 1,000 calorie deficit. Never go below 1,200 calories (women) or 1,500 calories (men) without medical supervision.',
        },
        {
          question: 'What are macros and why do they matter?',
          answer: 'Macronutrients (macros) are protein, carbohydrates, and fats. A balanced distribution helps with satiety, muscle preservation, and energy. Typical ratios are 40% carbs, 30% protein, 30% fat for weight loss.',
        },
        {
          question: 'How accurate is this calculator?',
          answer: 'Calorie calculators provide estimates based on population averages. Individual metabolism can vary by ±20%. Use the calculator as a starting point and adjust based on actual results over 2-4 weeks.',
        },
        {
          question: 'Should I eat back exercise calories?',
          answer: 'If using our calculator with your activity level selected, exercise is already included in TDEE. If tracking exercise separately, you may eat back 50-75% of exercise calories to account for overestimation.',
        },
      ],
      article: {
        title: 'Complete Guide to Calorie Counting and Weight Management',
        introduction: 'Understanding your caloric needs is fundamental to achieving your health and fitness goals. Whether you want to lose weight, gain muscle, or maintain your current physique, knowing how many calories to consume is crucial.',
        sections: [
          {
            heading: 'The Science of Calories',
            content: 'A calorie is a unit of energy. Your body needs calories to perform basic functions like breathing, circulating blood, and cell production. The number of calories you need depends on many factors including your basal metabolic rate and activity level.',
            subSections: [
              {
                heading: 'Understanding BMR',
                content: 'Your Basal Metabolic Rate (BMR) accounts for 60-75% of daily calorie burn. It is influenced by age, gender, weight, height, and genetics. Muscle tissue burns more calories at rest than fat tissue.',
              },
              {
                heading: 'Activity Multipliers',
                content: 'Your Total Daily Energy Expenditure (TDEE) = BMR × Activity Factor. Sedentary: 1.2, Light: 1.375, Moderate: 1.55, Active: 1.725, Extreme: 1.9.',
              },
            ],
          },
          {
            heading: 'Creating a Calorie Deficit or Surplus',
            content: 'Weight loss requires a caloric deficit (burn more than you eat). Weight gain requires a surplus. A deficit/surplus of 3,500 calories equals roughly 1 pound of body weight change.',
          },
          {
            heading: 'Macronutrient Distribution',
            content: 'Protein: 4 calories/gram - Essential for muscle preservation and satiety. Aim for 0.8-1g per pound of body weight.\nCarbohydrates: 4 calories/gram - Primary energy source. Choose complex carbs for sustained energy.\nFats: 9 calories/gram - Essential for hormones and nutrient absorption. Include healthy fats from nuts, avocados, and fish.',
          },
          {
            heading: 'Practical Tips for Success',
            content: 'Track your food intake using apps or journals. Weigh yourself weekly at the same time. Adjust calories based on actual results. Focus on whole, nutrient-dense foods. Stay hydrated and get adequate sleep.',
          },
        ],
        conclusion: 'Remember that calorie calculators provide estimates. Your actual needs may vary based on genetics, hormones, medications, and other factors. Use this calculator as a starting point and adjust based on your progress. Consistency and patience are key to achieving your goals.',
        wordCount: 1500,
      },
      examples: [
        {
          title: 'Weight Loss Example',
          inputs: { age: 30, gender: 'female', weight: 70, height: 165, activityLevel: 'moderate', goal: 'lose1' },
          outputs: { bmr: 1384, tdee: 2145, targetCalories: 1645, weeklyChange: '-0.5 kg' },
          explanation: '30-year-old moderately active woman, 70kg, 165cm, needs 1,645 calories/day to lose 0.5kg per week.',
        },
        {
          title: 'Muscle Gain Example',
          inputs: { age: 25, gender: 'male', weight: 75, height: 180, activityLevel: 'active', goal: 'gain1' },
          outputs: { bmr: 1755, tdee: 3027, targetCalories: 3527, weeklyChange: '+0.5 kg' },
          explanation: '25-year-old very active man, 75kg, 180cm, needs 3,527 calories/day to gain 0.5kg per week.',
        },
      ],
      references: [
        {
          title: 'Dietary Guidelines for Americans 2020-2025',
          url: 'https://www.dietaryguidelines.gov',
          publisher: 'USDA',
          dateAccessed: '2024-01-01',
          type: 'government',
        },
        {
          title: 'National Institute of Health - Body Weight Planner',
          url: 'https://www.niddk.nih.gov/bwp',
          publisher: 'NIH',
          dateAccessed: '2024-01-01',
          type: 'government',
        },
      ],
    },
    th: {
      title: 'เครื่องคำนวณแคลอรี่ - คำนวณแคลอรี่ที่ต้องการต่อวัน',
      description: 'คำนวณแคลอรี่ที่ต้องการต่อวันสำหรับลดน้ำหนัก คงน้ำหนัก หรือเพิ่มน้ำหนัก พร้อมคำแนะนำโปรตีน คาร์บ และไขมัน',
      keywords: ['คำนวณแคลอรี่', 'แคลอรี่ต่อวัน', 'ลดน้ำหนัก', 'เพิ่มน้ำหนัก', 'คำนวณ TDEE'],
      faq: [
        {
          question: 'ควรกินแคลอรี่วันละเท่าไร?',
          answer: 'แคลอรี่ที่ต้องการขึ้นกับอายุ เพศ น้ำหนัก ส่วนสูง และกิจกรรม ผู้ใหญ่ทั่วไปต้องการ 1,500-2,500 แคลอรี่/วัน ใช้เครื่องคำนวณเพื่อหาค่าที่เหมาะกับคุณ',
        },
        {
          question: 'BMR กับ TDEE ต่างกันอย่างไร?',
          answer: 'BMR คือแคลอรี่ที่ร่างกายเผาผลาญขณะพัก TDEE คือ BMR + แคลอรี่ที่ใช้จากกิจกรรม TDEE คือแคลอรี่ที่ต้องกินเพื่อคงน้ำหนัก',
        },
        {
          question: 'ลดน้ำหนักต้องกินแคลอรี่เท่าไร?',
          answer: 'ลด 0.5 กก./สัปดาห์ ให้กินน้อยกว่า TDEE 500 แคล/วัน ลด 1 กก./สัปดาห์ ให้กินน้อยกว่า 1,000 แคล/วัน แต่ผู้หญิงไม่ควรต่ำกว่า 1,200 ผู้ชายไม่ต่ำกว่า 1,500 แคล/วัน',
        },
        {
          question: 'สัดส่วนอาหารที่เหมาะสมเป็นอย่างไร?',
          answer: 'สัดส่วนทั่วไป: คาร์บ 45-65%, โปรตีน 10-35%, ไขมัน 20-35% สำหรับลดน้ำหนัก: คาร์บ 40%, โปรตีน 30%, ไขมัน 30%',
        },
        {
          question: 'คนไทยควรกินแคลอรี่เท่าไร?',
          answer: 'คนไทยผู้ใหญ่: ชาย 2,000-2,400 แคล/วัน, หญิง 1,600-2,000 แคล/วัน ขึ้นกับระดับกิจกรรม คนไทยมักมี BMR ต่ำกว่าคนตะวันตกเล็กน้อย',
        },
      ],
      article: {
        title: 'คู่มือนับแคลอรี่และควบคุมน้ำหนักสำหรับคนไทย',
        introduction: 'การเข้าใจความต้องการแคลอรี่ของร่างกายเป็นพื้นฐานสำคัญในการดูแลสุขภาพ ไม่ว่าจะลดน้ำหนัก เพิ่มกล้ามเนื้อ หรือรักษาน้ำหนัก การรู้ว่าควรกินแคลอรี่เท่าไรจะช่วยให้บรรลุเป้าหมาย',
        sections: [
          {
            heading: 'ทำความเข้าใจแคลอรี่',
            content: 'แคลอรี่คือหน่วยพลังงาน ร่างกายใช้แคลอรี่ในการทำงานพื้นฐาน เช่น หายใจ สูบฉีดเลือด สร้างเซลล์ ความต้องการแคลอรี่ขึ้นกับอัตราการเผาผลาญพื้นฐาน (BMR) และระดับกิจกรรม',
          },
          {
            heading: 'อาหารไทยกับแคลอรี่',
            content: 'อาหารไทยหลายอย่างมีแคลอรี่สูง: ข้าวมันไก่ 600 แคล, ผัดไทย 500 แคล, ต้มยำกุ้ง 300 แคล, ส้มตำ 150 แคล ควรเลือกอาหารที่มีผักมาก ลดของทอด และควบคุมปริมาณ',
          },
          {
            heading: 'เคล็ดลับลดน้ำหนักแบบไทยๆ',
            content: 'กินข้าวกล้อง/ข้าวซ้อมมือแทนข้าวขาว, เลือกอาหารต้ม ย่าง นึ่ง แทนผัด ทอด, ดื่มน้ำเปล่าแทนน้ำหวาน, กินผลไม้แทนขนมหวาน, แบ่งมื้ออาหารเป็น 5-6 มื้อเล็กๆ',
          },
        ],
        conclusion: 'การนับแคลอรี่เป็นเครื่องมือช่วยควบคุมน้ำหนัก แต่อย่าลืมคุณภาพอาหาร เลือกอาหารที่มีประโยชน์ ออกกำลังกายสม่ำเสมอ และพักผ่อนเพียงพอ ค่อยๆ ปรับเปลี่ยนพฤติกรรมอย่างยั่งยืน',
        wordCount: 1200,
      },
      examples: [
        {
          title: 'ตัวอย่างลดน้ำหนัก',
          inputs: { age: 30, gender: 'female', weight: 65, height: 160, activityLevel: 'light', goal: 'lose1' },
          outputs: { bmr: 1334, tdee: 1834, targetCalories: 1334, weeklyChange: '-0.5 กก.' },
          explanation: 'หญิงไทย อายุ 30 หนัก 65 กก. สูง 160 ซม. ออกกำลังกายเบา ต้องกิน 1,334 แคล/วัน เพื่อลด 0.5 กก./สัปดาห์',
        },
      ],
      references: [
        {
          title: 'กรมอนามัย - โภชนาการสำหรับคนไทย',
          url: 'https://nutrition.anamai.moph.go.th',
          publisher: 'กระทรวงสาธารณสุข',
          dateAccessed: '2024-01-01',
          type: 'government',
        },
      ],
    },
    // Add more languages...
  },
  countrySpecific: {
    en: {
      defaultValues: { 
        unitSystem: 'imperial',
        activityLevel: 'moderate',
      },
    },
    th: {
      defaultValues: { 
        unitSystem: 'metric',
        activityLevel: 'light', // Thai people tend to have lower activity levels
      },
      standards: {
        bmrAdjustment: 0.95, // Asians typically have 5% lower BMR
      },
    },
    ja: {
      defaultValues: { 
        unitSystem: 'metric',
        activityLevel: 'moderate',
      },
      standards: {
        bmrAdjustment: 0.95,
      },
    },
    // Add more countries...
  },
  tags: ['calories', 'diet', 'weight loss', 'nutrition', 'TDEE', 'BMR', 'macros'],
  difficulty: 'basic',
  popularity: 99,
};