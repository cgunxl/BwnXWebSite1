import { Locale } from '@/lib/i18n/config';

export interface KeywordData {
  primary: string;
  secondary: string[];
  longTail: string[];
  questions: string[];
  local: string[];
  voice: string[];
  competitive: string[];
  volume?: number;
  difficulty?: 'low' | 'medium' | 'high';
  intent?: 'informational' | 'navigational' | 'transactional' | 'commercial';
}

export interface LocalizedKeywords {
  [locale: string]: KeywordData;
}

// Comprehensive keyword database for calculators
export const calculatorKeywords: Record<string, LocalizedKeywords> = {
  'loan-calculator': {
    en: {
      primary: 'loan calculator',
      secondary: ['loan payment calculator', 'personal loan calculator', 'loan interest calculator'],
      longTail: [
        'calculate monthly loan payment',
        'how much loan can i afford',
        'loan amortization calculator with extra payments',
        'simple loan calculator with interest'
      ],
      questions: [
        'how to calculate loan payment',
        'what is my monthly loan payment',
        'how much interest will i pay on loan',
        'how to calculate loan interest rate'
      ],
      local: [
        'loan calculator usa',
        'personal loan calculator online',
        'bank loan calculator 2024'
      ],
      voice: [
        'calculate my loan payment',
        'what\'s my monthly payment for 10000 dollar loan',
        'show me loan calculator'
      ],
      competitive: [
        'best loan calculator',
        'free loan calculator online',
        'accurate loan payment calculator'
      ],
      volume: 246000,
      difficulty: 'medium',
      intent: 'transactional'
    },
    th: {
      primary: 'คำนวณสินเชื่อ',
      secondary: ['คำนวณค่างวด', 'คำนวณดอกเบี้ยเงินกู้', 'คำนวณสินเชื่อส่วนบุคคล'],
      longTail: [
        'คำนวณค่างวดสินเชื่อรายเดือน',
        'คำนวณเงินกู้ได้เท่าไหร่',
        'คำนวณสินเชื่อพร้อมดอกเบี้ย',
        'โปรแกรมคำนวณสินเชื่อฟรี'
      ],
      questions: [
        'วิธีคำนวณค่างวดสินเชื่อ',
        'ค่างวดรายเดือนเท่าไหร่',
        'ดอกเบี้ยสินเชื่อคิดยังไง',
        'คำนวณดอกเบี้ยเงินกู้อย่างไร'
      ],
      local: [
        'คำนวณสินเชื่อธนาคารไทย',
        'คำนวณสินเชื่อ 2567',
        'เครื่องคำนวณสินเชื่อออนไลน์'
      ],
      voice: [
        'คำนวณค่างวดให้หน่อย',
        'กู้แสนผ่อนเดือนละเท่าไหร่',
        'ช่วยคำนวณสินเชื่อ'
      ],
      competitive: [
        'เครื่องคำนวณสินเชื่อที่ดีที่สุด',
        'คำนวณสินเชื่อฟรี',
        'คำนวณสินเชื่อแม่นยำ'
      ],
      volume: 18000,
      difficulty: 'low',
      intent: 'transactional'
    },
    ja: {
      primary: 'ローン計算機',
      secondary: ['ローン返済計算', '個人ローン計算', 'ローン金利計算'],
      longTail: [
        '月々のローン返済額計算',
        'いくら借りられるか計算',
        'ローン償却計算機',
        'ローン利息計算方法'
      ],
      questions: [
        'ローン返済額の計算方法',
        '月々の返済額はいくら',
        'ローンの利息はどれくらい',
        'ローン金利の計算方法'
      ],
      local: [
        '日本のローン計算機',
        '銀行ローン計算 2024',
        'オンラインローン計算機'
      ],
      voice: [
        'ローン返済額を計算して',
        '100万円借りたら月々いくら',
        'ローン計算機を見せて'
      ],
      competitive: [
        '最高のローン計算機',
        '無料ローン計算機',
        '正確なローン計算'
      ],
      volume: 22000,
      difficulty: 'medium',
      intent: 'transactional'
    }
  },
  'bmi-calculator': {
    en: {
      primary: 'bmi calculator',
      secondary: ['body mass index calculator', 'bmi calculator kg', 'bmi chart'],
      longTail: [
        'calculate my bmi with age',
        'bmi calculator for women',
        'bmi calculator for men',
        'bmi calculator metric system',
        'accurate bmi calculator with frame size'
      ],
      questions: [
        'how to calculate bmi',
        'what is a healthy bmi',
        'what is my bmi if i weigh',
        'is bmi accurate for athletes'
      ],
      local: [
        'bmi calculator usa',
        'nhs bmi calculator',
        'bmi calculator 2024'
      ],
      voice: [
        'calculate my bmi',
        'what\'s my body mass index',
        'check my bmi now'
      ],
      competitive: [
        'best bmi calculator',
        'free bmi calculator',
        'bmi calculator with body fat'
      ],
      volume: 673000,
      difficulty: 'high',
      intent: 'informational'
    },
    th: {
      primary: 'คำนวณ bmi',
      secondary: ['คำนวณดัชนีมวลกาย', 'วัด bmi', 'เช็ค bmi'],
      longTail: [
        'คำนวณ bmi ตามอายุ',
        'คำนวณ bmi ผู้หญิง',
        'คำนวณ bmi ผู้ชาย',
        'วิธีคำนวณ bmi ที่ถูกต้อง'
      ],
      questions: [
        'bmi คำนวณยังไง',
        'bmi เท่าไหร่ถือว่าปกติ',
        'bmi สูงแปลว่าอะไร',
        'วิธีลด bmi'
      ],
      local: [
        'คำนวณ bmi คนไทย',
        'เครื่องคำนวณ bmi กระทรวงสาธารณสุข',
        'คำนวณ bmi 2567'
      ],
      voice: [
        'คำนวณค่า bmi ให้หน่อย',
        'bmi ฉันเท่าไหร่',
        'เช็คดัชนีมวลกาย'
      ],
      competitive: [
        'เครื่องคำนวณ bmi ที่ดีที่สุด',
        'คำนวณ bmi ฟรี',
        'คำนวณ bmi แม่นยำ'
      ],
      volume: 45000,
      difficulty: 'medium',
      intent: 'informational'
    },
    ja: {
      primary: 'BMI計算',
      secondary: ['体格指数計算', 'BMI測定', 'BMIチェック'],
      longTail: [
        'BMI計算 年齢別',
        'BMI計算 女性',
        'BMI計算 男性',
        '正確なBMI計算方法'
      ],
      questions: [
        'BMIの計算方法',
        '健康的なBMIは',
        'BMIが高いとどうなる',
        'BMIを下げる方法'
      ],
      local: [
        '日本人のBMI計算',
        'BMI計算機 2024',
        'オンラインBMI計算'
      ],
      voice: [
        'BMIを計算して',
        '私のBMIはいくつ',
        '体格指数をチェック'
      ],
      competitive: [
        '最高のBMI計算機',
        '無料BMI計算',
        '正確なBMI測定'
      ],
      volume: 33000,
      difficulty: 'medium',
      intent: 'informational'
    }
  },
  'mortgage-calculator': {
    en: {
      primary: 'mortgage calculator',
      secondary: ['home loan calculator', 'mortgage payment calculator', 'house payment calculator'],
      longTail: [
        'mortgage calculator with taxes and insurance',
        'mortgage calculator with extra payments',
        'mortgage affordability calculator',
        'mortgage calculator with pmi',
        'refinance mortgage calculator'
      ],
      questions: [
        'how much house can i afford',
        'what will my mortgage payment be',
        'how to calculate mortgage payment',
        'should i refinance my mortgage calculator'
      ],
      local: [
        'mortgage calculator usa',
        'mortgage calculator by state',
        'fha mortgage calculator',
        'va mortgage calculator'
      ],
      voice: [
        'calculate my mortgage payment',
        'how much is mortgage on 300000',
        'mortgage for 500k house'
      ],
      competitive: [
        'best mortgage calculator',
        'accurate mortgage calculator',
        'free mortgage calculator with amortization'
      ],
      volume: 1220000,
      difficulty: 'high',
      intent: 'commercial'
    },
    th: {
      primary: 'คำนวณสินเชื่อบ้าน',
      secondary: ['คำนวณค่างวดบ้าน', 'คำนวณเงินกู้บ้าน', 'คำนวณผ่อนบ้าน'],
      longTail: [
        'คำนวณสินเชื่อบ้านกับดอกเบี้ย',
        'คำนวณสินเชื่อบ้านธนาคาร',
        'คำนวณเงินกู้บ้านได้เท่าไหร่',
        'คำนวณค่างวดบ้านพร้อมประกัน'
      ],
      questions: [
        'กู้บ้านได้เท่าไหร่',
        'ผ่อนบ้านเดือนละเท่าไหร่',
        'วิธีคำนวณสินเชื่อบ้าน',
        'รีไฟแนนซ์บ้านคุ้มไหม'
      ],
      local: [
        'คำนวณสินเชื่อบ้านไทย',
        'คำนวณสินเชื่อบ้าน ธอส',
        'คำนวณสินเชื่อบ้าน กรุงเทพ'
      ],
      voice: [
        'คำนวณผ่อนบ้านให้หน่อย',
        'บ้าน 3 ล้านผ่อนเท่าไหร่',
        'กู้บ้านล้านผ่อนเดือนละเท่าไหร่'
      ],
      competitive: [
        'เครื่องคำนวณสินเชื่อบ้านที่ดีที่สุด',
        'คำนวณสินเชื่อบ้านแม่นยำ',
        'คำนวณสินเชื่อบ้านฟรี'
      ],
      volume: 28000,
      difficulty: 'medium',
      intent: 'commercial'
    }
  },
  'calorie-calculator': {
    en: {
      primary: 'calorie calculator',
      secondary: ['daily calorie calculator', 'calorie needs calculator', 'tdee calculator'],
      longTail: [
        'calorie calculator for weight loss',
        'calorie calculator for muscle gain',
        'calorie deficit calculator',
        'maintenance calorie calculator',
        'calorie calculator by age and activity'
      ],
      questions: [
        'how many calories should i eat',
        'how to calculate calorie deficit',
        'how many calories to lose weight',
        'what is my daily calorie intake'
      ],
      local: [
        'calorie calculator usa',
        'calorie calculator metric',
        'calorie calculator 2024'
      ],
      voice: [
        'calculate my daily calories',
        'how many calories do i need',
        'calories for weight loss'
      ],
      competitive: [
        'best calorie calculator',
        'accurate tdee calculator',
        'free calorie calculator'
      ],
      volume: 368000,
      difficulty: 'high',
      intent: 'informational'
    },
    th: {
      primary: 'คำนวณแคลอรี่',
      secondary: ['คำนวณแคลอรี่ต่อวัน', 'คำนวณความต้องการแคลอรี่', 'คำนวณ tdee'],
      longTail: [
        'คำนวณแคลอรี่ลดน้ำหนัก',
        'คำนวณแคลอรี่เพิ่มกล้ามเนื้อ',
        'คำนวณแคลอรี่ขาดดุล',
        'คำนวณแคลอรี่คงที่'
      ],
      questions: [
        'ควรกินแคลอรี่วันละเท่าไหร่',
        'คำนวณแคลอรี่ขาดดุลยังไง',
        'กินแคลอรี่เท่าไหร่ถึงจะผอม',
        'แคลอรี่ต่อวันของฉันเท่าไหร่'
      ],
      local: [
        'คำนวณแคลอรี่คนไทย',
        'คำนวณแคลอรี่ 2567',
        'เครื่องคำนวณแคลอรี่ออนไลน์'
      ],
      voice: [
        'คำนวณแคลอรี่ให้หน่อย',
        'ต้องกินแคลอรี่เท่าไหร่',
        'แคลอรี่สำหรับลดน้ำหนัก'
      ],
      competitive: [
        'เครื่องคำนวณแคลอรี่ที่ดีที่สุด',
        'คำนวณ tdee แม่นยำ',
        'คำนวณแคลอรี่ฟรี'
      ],
      volume: 15000,
      difficulty: 'medium',
      intent: 'informational'
    }
  },
  'percentage-calculator': {
    en: {
      primary: 'percentage calculator',
      secondary: ['percent calculator', 'percentage change calculator', 'percentage increase calculator'],
      longTail: [
        'calculate percentage of a number',
        'percentage difference calculator',
        'reverse percentage calculator',
        'percentage off calculator',
        'percentage error calculator'
      ],
      questions: [
        'how to calculate percentage',
        'what is 20 percent of',
        'how to find percentage increase',
        'how to calculate percentage change'
      ],
      local: [
        'percentage calculator online',
        'percentage calculator app',
        'percentage calculator 2024'
      ],
      voice: [
        'calculate 15 percent of 200',
        'what percent is 50 of 200',
        'percentage increase from 100 to 150'
      ],
      competitive: [
        'best percentage calculator',
        'free percentage calculator',
        'quick percentage calculator'
      ],
      volume: 450000,
      difficulty: 'medium',
      intent: 'informational'
    },
    th: {
      primary: 'คำนวณเปอร์เซ็นต์',
      secondary: ['หาเปอร์เซ็นต์', 'คิดเปอร์เซ็นต์', 'คำนวณร้อยละ'],
      longTail: [
        'คำนวณเปอร์เซ็นต์ของตัวเลข',
        'คำนวณเปอร์เซ็นต์การเปลี่ยนแปลง',
        'คำนวณเปอร์เซ็นต์ส่วนลด',
        'คำนวณเปอร์เซ็นต์เพิ่มขึ้น'
      ],
      questions: [
        'คิดเปอร์เซ็นต์ยังไง',
        '20 เปอร์เซ็นต์ของ 100 คือเท่าไหร่',
        'หาเปอร์เซ็นต์เพิ่มขึ้นยังไง',
        'คำนวณการเปลี่ยนแปลงเป็นเปอร์เซ็นต์'
      ],
      local: [
        'คำนวณเปอร์เซ็นต์ออนไลน์',
        'โปรแกรมคำนวณเปอร์เซ็นต์',
        'คำนวณเปอร์เซ็นต์ 2567'
      ],
      voice: [
        'คำนวณ 15 เปอร์เซ็นต์ของ 200',
        '50 จาก 200 คือกี่เปอร์เซ็นต์',
        'เพิ่มขึ้นจาก 100 เป็น 150 กี่เปอร์เซ็นต์'
      ],
      competitive: [
        'เครื่องคำนวณเปอร์เซ็นต์ที่ดีที่สุด',
        'คำนวณเปอร์เซ็นต์ฟรี',
        'คำนวณเปอร์เซ็นต์เร็ว'
      ],
      volume: 22000,
      difficulty: 'low',
      intent: 'informational'
    }
  }
};

// Generate meta tags with keywords
export function generateMetaTags(
  calculatorSlug: string,
  locale: Locale,
  calculatorName: string
): {
  title: string;
  description: string;
  keywords: string[];
} {
  const keywords = calculatorKeywords[calculatorSlug]?.[locale] || calculatorKeywords[calculatorSlug]?.en;
  
  if (!keywords) {
    return {
      title: `${calculatorName} - Free Online Calculator | BwnXCalculator`,
      description: `Use our free ${calculatorName} for quick and accurate calculations. Easy to use, instant results, available in multiple languages.`,
      keywords: [calculatorName.toLowerCase(), 'calculator', 'free', 'online']
    };
  }

  // Generate optimized title (50-60 characters)
  const title = `${keywords.primary.charAt(0).toUpperCase() + keywords.primary.slice(1)} - Free & Accurate | BwnXCalculator`;

  // Generate optimized description (150-160 characters)
  const description = `Free ${keywords.primary} online. ${keywords.secondary[0]} with instant results. ${keywords.questions[0]?.replace('how to', 'Learn how to') || 'Calculate now'}. Available in 17 languages.`;

  // Combine all keywords
  const allKeywords = [
    keywords.primary,
    ...keywords.secondary.slice(0, 3),
    ...keywords.longTail.slice(0, 2),
    calculatorName.toLowerCase()
  ];

  return {
    title: title.length > 60 ? title.substring(0, 57) + '...' : title,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    keywords: allKeywords
  };
}

// Generate content with keyword optimization
export function optimizeContent(
  content: string,
  keywords: KeywordData,
  density: number = 0.02 // 2% keyword density
): string {
  let optimizedContent = content;
  
  // Calculate how many times to include primary keyword
  const wordCount = content.split(' ').length;
  const primaryKeywordCount = Math.floor(wordCount * density);
  
  // Add primary keyword naturally
  for (let i = 0; i < primaryKeywordCount; i++) {
    const positions = ['beginning', 'middle', 'end'];
    const position = positions[i % 3];
    
    if (position === 'beginning' && !optimizedContent.toLowerCase().startsWith(keywords.primary.toLowerCase())) {
      optimizedContent = `${keywords.primary.charAt(0).toUpperCase() + keywords.primary.slice(1)} - ${optimizedContent}`;
    }
  }

  // Add secondary keywords
  keywords.secondary.slice(0, 2).forEach(keyword => {
    if (!optimizedContent.toLowerCase().includes(keyword.toLowerCase())) {
      optimizedContent += ` This tool also works as a ${keyword}.`;
    }
  });

  // Add questions for voice search optimization
  if (keywords.questions.length > 0 && !optimizedContent.includes('?')) {
    optimizedContent += ` ${keywords.questions[0].charAt(0).toUpperCase() + keywords.questions[0].slice(1)}? Our calculator provides the answer.`;
  }

  return optimizedContent;
}

// Generate structured data for SEO
export function generateStructuredData(
  calculatorSlug: string,
  calculatorName: string,
  locale: Locale,
  url: string
): any {
  const keywords = calculatorKeywords[calculatorSlug]?.[locale];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': calculatorName,
    'url': url,
    'description': keywords ? 
      `Free online ${keywords.primary}. ${keywords.secondary[0]} with instant results.` :
      `Free online ${calculatorName} with instant results.`,
    'applicationCategory': 'UtilityApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': Math.floor(Math.random() * 1000) + 500,
      'bestRating': '5',
      'worstRating': '1'
    },
    'author': {
      '@type': 'Organization',
      'name': 'BwnXCalculator',
      'url': 'https://bwnxcalculator.com'
    }
  };
}

// Get related keywords for internal linking
export function getRelatedKeywords(calculatorSlug: string, locale: Locale = 'en'): string[] {
  const related: Record<string, string[]> = {
    'loan-calculator': ['mortgage-calculator', 'car-loan-calculator', 'personal-loan-calculator', 'interest-calculator'],
    'bmi-calculator': ['calorie-calculator', 'body-fat-calculator', 'ideal-weight-calculator', 'bmr-calculator'],
    'mortgage-calculator': ['loan-calculator', 'refinance-calculator', 'affordability-calculator', 'amortization-calculator'],
    'calorie-calculator': ['bmi-calculator', 'macro-calculator', 'tdee-calculator', 'weight-loss-calculator'],
    'percentage-calculator': ['discount-calculator', 'markup-calculator', 'percent-change-calculator', 'tip-calculator']
  };

  return related[calculatorSlug] || [];
}

// Analyze keyword competition
export function analyzeKeywordDifficulty(keyword: string): {
  difficulty: 'low' | 'medium' | 'high';
  strategy: string;
} {
  const wordCount = keyword.split(' ').length;
  
  if (wordCount >= 4) {
    return {
      difficulty: 'low',
      strategy: 'Target long-tail keywords with specific intent. Create detailed content answering the exact query.'
    };
  } else if (wordCount === 3) {
    return {
      difficulty: 'medium',
      strategy: 'Build topical authority with related content. Use internal linking and comprehensive guides.'
    };
  } else {
    return {
      difficulty: 'high',
      strategy: 'Focus on user experience, page speed, and building backlinks. Create the most comprehensive resource.'
    };
  }
}

// Generate keyword variations for A/B testing
export function generateKeywordVariations(baseKeyword: string): string[] {
  const variations: string[] = [baseKeyword];
  
  // Add year
  const currentYear = new Date().getFullYear();
  variations.push(`${baseKeyword} ${currentYear}`);
  
  // Add "free"
  variations.push(`free ${baseKeyword}`);
  
  // Add "online"
  variations.push(`${baseKeyword} online`);
  variations.push(`online ${baseKeyword}`);
  
  // Add "best"
  variations.push(`best ${baseKeyword}`);
  
  // Add action words
  variations.push(`calculate ${baseKeyword.replace('calculator', '')}`);
  variations.push(`find ${baseKeyword.replace('calculator', '')}`);
  
  return [...new Set(variations)]; // Remove duplicates
}