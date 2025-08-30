import { Calculator } from '@/lib/types/calculator';

export const bmiCalculator: Calculator = {
  id: 'bmi-calculator',
  category: 'health',
  slug: 'bmi-calculator',
  icon: '⚖️',
  color: 'bg-red-500',
  inputs: [
    {
      key: 'weight',
      label: 'Weight',
      type: 'number',
      unit: 'kg',
      placeholder: 'Enter your weight',
      min: 1,
      max: 500,
      required: true,
      validation: {
        min: 1,
        max: 500,
        required: true,
        message: 'Weight must be between 1 and 500 kg'
      },
    },
    {
      key: 'height',
      label: 'Height',
      type: 'number',
      unit: 'cm',
      placeholder: 'Enter your height',
      min: 50,
      max: 300,
      required: true,
      validation: {
        min: 50,
        max: 300,
        required: true,
        message: 'Height must be between 50 and 300 cm'
      },
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
    {
      key: 'age',
      label: 'Age (optional)',
      type: 'number',
      placeholder: 'Enter your age',
      min: 1,
      max: 120,
      required: false,
    },
    {
      key: 'gender',
      label: 'Gender (optional)',
      type: 'select',
      defaultValue: '',
      options: [
        { value: '', label: 'Select gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    },
  ],
  outputs: [
    {
      key: 'bmi',
      label: 'BMI Value',
      format: 'number',
      precision: 1,
      visualization: 'gauge',
    },
    {
      key: 'category',
      label: 'BMI Category',
      format: 'text',
      visualization: 'category-bar',
    },
    {
      key: 'healthRisk',
      label: 'Health Risk',
      format: 'text',
    },
    {
      key: 'idealWeight',
      label: 'Ideal Weight Range',
      format: 'text',
    },
  ],
  formulas: [
    {
      name: 'bmiMetric',
      expression: 'weight / Math.pow(height / 100, 2)',
      variables: ['weight', 'height'],
      description: 'BMI = weight(kg) / height(m)²',
    },
    {
      name: 'bmiImperial',
      expression: '(weight * 703) / Math.pow(height, 2)',
      variables: ['weight', 'height'],
      description: 'BMI = (weight(lbs) × 703) / height(inches)²',
    },
  ],
  relatedCalculators: ['bmr-calculator', 'calorie-calculator', 'ideal-weight', 'body-fat'],
  localizedContent: {
    en: {
      title: 'BMI Calculator - Body Mass Index Calculator',
      description: 'Calculate your Body Mass Index (BMI) to assess if your weight is healthy for your height. Get personalized health recommendations.',
      keywords: ['BMI calculator', 'body mass index', 'healthy weight', 'BMI chart', 'weight calculator'],
      faq: [
        {
          question: 'What is BMI?',
          answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It helps assess whether a person has a healthy body weight for their height.',
        },
        {
          question: 'How is BMI calculated?',
          answer: 'BMI is calculated by dividing weight in kilograms by height in meters squared (kg/m²). For imperial units, multiply weight in pounds by 703 and divide by height in inches squared.',
        },
        {
          question: 'What is a healthy BMI range?',
          answer: 'A healthy BMI range is typically 18.5-24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese. However, these ranges may vary by ethnicity and individual factors.',
        },
        {
          question: 'Is BMI accurate for everyone?',
          answer: 'BMI is a general screening tool but may not be accurate for athletes with high muscle mass, elderly people, pregnant women, or children. It does not directly measure body fat percentage.',
        },
        {
          question: 'What should I do if my BMI is unhealthy?',
          answer: 'Consult with a healthcare provider for personalized advice. Generally, maintaining a balanced diet, regular exercise, and healthy lifestyle habits can help achieve a healthy BMI.',
        },
        {
          question: 'Does BMI differ by age and gender?',
          answer: 'While the BMI calculation is the same, interpretation may vary. Children and teens use age and gender-specific percentiles, and older adults may have slightly different healthy ranges.',
        },
      ],
      article: {
        title: 'Understanding BMI: Your Complete Guide to Body Mass Index',
        introduction: 'Body Mass Index (BMI) is one of the most widely used indicators of healthy body weight. This comprehensive guide explains what BMI is, how to calculate it, what the results mean, and how to use this information to improve your health.',
        sections: [
          {
            heading: 'What is Body Mass Index?',
            content: 'BMI is a simple calculation using height and weight to estimate body fat and assess whether a person is at a healthy weight. Developed by Adolphe Quetelet in the 1830s, it remains a primary screening tool used by healthcare providers worldwide.',
          },
          {
            heading: 'BMI Categories and Ranges',
            content: 'BMI values are categorized into different weight status groups that help identify potential health risks.',
            subSections: [
              {
                heading: 'Standard BMI Categories',
                content: 'Underweight: BMI < 18.5\nNormal weight: BMI 18.5-24.9\nOverweight: BMI 25-29.9\nObese Class I: BMI 30-34.9\nObese Class II: BMI 35-39.9\nObese Class III: BMI ≥ 40',
              },
              {
                heading: 'Health Risks by Category',
                content: 'Each BMI category is associated with different health risks. Underweight individuals may face malnutrition and osteoporosis risks. Overweight and obese categories increase risks of heart disease, diabetes, and certain cancers.',
              },
            ],
          },
          {
            heading: 'Limitations of BMI',
            content: 'While useful, BMI has limitations. It does not distinguish between muscle and fat mass, making it less accurate for athletes. It also does not account for fat distribution, age-related muscle loss, or ethnic variations in body composition.',
          },
          {
            heading: 'Beyond BMI: Other Health Indicators',
            content: 'Consider additional measurements like waist circumference, body fat percentage, and waist-to-hip ratio for a more complete health assessment. Regular health check-ups and blood tests provide comprehensive health insights.',
          },
          {
            heading: 'Achieving and Maintaining a Healthy BMI',
            content: 'Focus on sustainable lifestyle changes including balanced nutrition, regular physical activity (150 minutes of moderate exercise weekly), adequate sleep (7-9 hours), stress management, and staying hydrated.',
          },
        ],
        conclusion: 'BMI is a valuable screening tool for assessing weight status and potential health risks. While it has limitations, when used alongside other health indicators and professional medical advice, it can guide you toward better health decisions. Remember that health is multifaceted, and BMI is just one piece of the puzzle.',
        wordCount: 1200,
      },
      examples: [
        {
          title: 'Healthy Weight Example',
          inputs: { weight: 70, height: 175, unitSystem: 'metric' },
          outputs: { bmi: 22.9, category: 'Normal Weight', healthRisk: 'Low', idealWeight: '57-76 kg' },
          explanation: 'A person weighing 70kg at 175cm height has a BMI of 22.9, which falls in the normal weight range with low health risk.',
        },
        {
          title: 'Overweight Example',
          inputs: { weight: 85, height: 170, unitSystem: 'metric' },
          outputs: { bmi: 29.4, category: 'Overweight', healthRisk: 'Moderate', idealWeight: '53-72 kg' },
          explanation: 'A person weighing 85kg at 170cm height has a BMI of 29.4, classified as overweight with moderate health risk.',
        },
      ],
      references: [
        {
          title: 'World Health Organization - Body Mass Index',
          url: 'https://www.who.int/health-topics/obesity',
          publisher: 'WHO',
          dateAccessed: '2024-01-01',
          type: 'organization',
        },
        {
          title: 'CDC - About Adult BMI',
          url: 'https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html',
          publisher: 'Centers for Disease Control and Prevention',
          dateAccessed: '2024-01-01',
          type: 'government',
        },
      ],
    },
    th: {
      title: 'เครื่องคำนวณ BMI - ดัชนีมวลกาย',
      description: 'คำนวณค่าดัชนีมวลกาย (BMI) เพื่อประเมินว่าน้ำหนักของคุณเหมาะสมกับส่วนสูงหรือไม่ พร้อมคำแนะนำสุขภาพ',
      keywords: ['คำนวณ BMI', 'ดัชนีมวลกาย', 'น้ำหนักสุขภาพดี', 'ตาราง BMI', 'เครื่องคิดน้ำหนัก'],
      faq: [
        {
          question: 'BMI คืออะไร?',
          answer: 'BMI (ดัชนีมวลกาย) เป็นค่าที่ใช้ประเมินภาวะน้ำหนักตัวโดยคำนวณจากน้ำหนักและส่วนสูง ช่วยบอกว่าน้ำหนักเหมาะสมหรือไม่',
        },
        {
          question: 'คำนวณ BMI อย่างไร?',
          answer: 'BMI = น้ำหนัก(กิโลกรัม) ÷ ส่วนสูง(เมตร)ยกกำลังสอง เช่น หนัก 60 กก. สูง 1.65 ม. จะได้ BMI = 60 ÷ (1.65×1.65) = 22.0',
        },
        {
          question: 'ค่า BMI ปกติของคนไทยเท่าไร?',
          answer: 'คนไทยและคนเอเชีย: ผอม < 18.5, ปกติ 18.5-22.9, ท้วม 23-24.9, อ้วน ระดับ 1: 25-29.9, อ้วน ระดับ 2: ≥ 30',
        },
        {
          question: 'BMI สูงหรือต่ำเสี่ยงโรคอะไร?',
          answer: 'BMI ต่ำเสี่ยงขาดสารอาหาร ภูมิต้านทานต่ำ BMI สูงเสี่ยงเบาหวาน ความดันสูง โรคหัวใจ ไขมันในเลือดสูง',
        },
        {
          question: 'BMI ไม่ปกติควรทำอย่างไร?',
          answer: 'ปรึกษาแพทย์หรือนักโภชนาการ ปรับอาหาร ออกกำลังกายสม่ำเสมอ นอนพักผ่อนเพียงพอ จัดการความเครียด',
        },
      ],
      article: {
        title: 'คู่มือครบ: ดัชนีมวลกาย BMI สำหรับคนไทย',
        introduction: 'ดัชนีมวลกาย (BMI) เป็นเครื่องมือประเมินสุขภาพที่คนไทยควรรู้ คู่มือนี้จะอธิบาย BMI แบบละเอียด วิธีคำนวณ การแปลผล และวิธีนำไปใช้ปรับปรุงสุขภาพ โดยเฉพาะมาตรฐานสำหรับคนเอเชีย',
        sections: [
          {
            heading: 'ทำไมคนไทยต้องใช้เกณฑ์ BMI ต่างจากฝรั่ง',
            content: 'คนเอเชียรวมถึงคนไทยมีสัดส่วนไขมันในร่างกายมากกว่าคนตะวันตกที่ BMI เท่ากัน จึงเสี่ยงโรคเร็วกว่า องค์การอนามัยโลกจึงกำหนดเกณฑ์พิเศษสำหรับเอเชีย',
          },
          {
            heading: 'เกณฑ์ BMI สำหรับคนไทย',
            content: 'ผอมเกินไป: BMI น้อยกว่า 18.5\nน้ำหนักปกติ: BMI 18.5-22.9\nน้ำหนักเกิน: BMI 23-24.9\nอ้วนระดับ 1: BMI 25-29.9\nอ้วนระดับ 2: BMI 30 ขึ้นไป',
          },
        ],
        conclusion: 'BMI เป็นจุดเริ่มต้นที่ดีในการดูแลสุขภาพ แต่ควรพิจารณาปัจจัยอื่นร่วมด้วย เช่น รอบเอว เปอร์เซ็นต์ไขมัน และผลตรวจสุขภาพประจำปี',
        wordCount: 800,
      },
      examples: [
        {
          title: 'ตัวอย่างน้ำหนักปกติ',
          inputs: { weight: 55, height: 160, unitSystem: 'metric' },
          outputs: { bmi: 21.5, category: 'น้ำหนักปกติ', healthRisk: 'ต่ำ', idealWeight: '47-58 กก.' },
          explanation: 'คนไทยหนัก 55 กก. สูง 160 ซม. มี BMI 21.5 อยู่ในเกณฑ์ปกติ ความเสี่ยงโรคต่ำ',
        },
      ],
      references: [
        {
          title: 'กรมอนามัย - เกณฑ์ BMI คนไทย',
          url: 'https://www.anamai.moph.go.th',
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
      defaultValues: { unitSystem: 'imperial' },
      standards: {
        underweight: { max: 18.5 },
        normal: { min: 18.5, max: 24.9 },
        overweight: { min: 25, max: 29.9 },
        obese: { min: 30 },
      },
    },
    th: {
      defaultValues: { unitSystem: 'metric' },
      standards: {
        underweight: { max: 18.5 },
        normal: { min: 18.5, max: 22.9 },
        overweight: { min: 23, max: 24.9 },
        obese1: { min: 25, max: 29.9 },
        obese2: { min: 30 },
      },
    },
    ja: {
      defaultValues: { unitSystem: 'metric' },
      standards: {
        underweight: { max: 18.5 },
        normal: { min: 18.5, max: 22.9 },
        overweight: { min: 23, max: 24.9 },
        obese: { min: 25 },
      },
    },
    // Add more countries...
  },
  tags: ['bmi', 'health', 'weight', 'fitness', 'body mass index'],
  difficulty: 'basic',
  popularity: 100,
};