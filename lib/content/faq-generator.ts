import { Locale } from '@/lib/i18n/config';

export interface FAQItem {
  question: string;
  answer: string;
  schema?: boolean; // Include in FAQ schema
}

export interface LocalizedFAQ {
  [locale: string]: FAQItem[];
}

// Generic FAQ templates that can be customized per calculator
export const faqTemplates = {
  howToUse: {
    en: 'How do I use the {calculatorName}?',
    th: 'ฉันจะใช้{calculatorName}ได้อย่างไร?',
    ja: '{calculatorName}の使い方は？',
    zh: '如何使用{calculatorName}？',
    es: '¿Cómo uso la {calculatorName}?',
    fr: 'Comment utiliser le {calculatorName}?',
    de: 'Wie benutze ich den {calculatorName}?',
    ko: '{calculatorName}를 어떻게 사용하나요?',
    ar: 'كيف أستخدم {calculatorName}؟',
    hi: 'मैं {calculatorName} का उपयोग कैसे करूं?',
    id: 'Bagaimana cara menggunakan {calculatorName}?',
    ru: 'Как использовать {calculatorName}?',
    it: 'Come uso il {calculatorName}?',
    nl: 'Hoe gebruik ik de {calculatorName}?',
    vi: 'Làm thế nào để sử dụng {calculatorName}?',
    pt: 'Como uso a {calculatorName}?',
    fa: 'چگونه از {calculatorName} استفاده کنم؟'
  },
  accuracy: {
    en: 'How accurate is the {calculatorName}?',
    th: '{calculatorName}มีความแม่นยำแค่ไหน?',
    ja: '{calculatorName}の精度はどのくらいですか？',
    zh: '{calculatorName}的准确度如何？',
    es: '¿Qué tan precisa es la {calculatorName}?',
    fr: 'Quelle est la précision du {calculatorName}?',
    de: 'Wie genau ist der {calculatorName}?',
    ko: '{calculatorName}의 정확도는 어느 정도인가요?',
    ar: 'ما مدى دقة {calculatorName}؟',
    hi: '{calculatorName} कितना सटीक है?',
    id: 'Seberapa akurat {calculatorName}?',
    ru: 'Насколько точен {calculatorName}?',
    it: 'Quanto è accurato il {calculatorName}?',
    nl: 'Hoe nauwkeurig is de {calculatorName}?',
    vi: '{calculatorName} chính xác đến mức nào?',
    pt: 'Quão precisa é a {calculatorName}?',
    fa: '{calculatorName} چقدر دقیق است؟'
  },
  formula: {
    en: 'What formula does the {calculatorName} use?',
    th: '{calculatorName}ใช้สูตรอะไร?',
    ja: '{calculatorName}はどのような計算式を使用していますか？',
    zh: '{calculatorName}使用什么公式？',
    es: '¿Qué fórmula usa la {calculatorName}?',
    fr: 'Quelle formule utilise le {calculatorName}?',
    de: 'Welche Formel verwendet der {calculatorName}?',
    ko: '{calculatorName}는 어떤 공식을 사용하나요?',
    ar: 'ما الصيغة التي يستخدمها {calculatorName}؟',
    hi: '{calculatorName} कौन सा सूत्र उपयोग करता है?',
    id: 'Formula apa yang digunakan {calculatorName}?',
    ru: 'Какую формулу использует {calculatorName}?',
    it: 'Quale formula usa il {calculatorName}?',
    nl: 'Welke formule gebruikt de {calculatorName}?',
    vi: '{calculatorName} sử dụng công thức nào?',
    pt: 'Qual fórmula a {calculatorName} usa?',
    fa: '{calculatorName} از چه فرمولی استفاده می‌کند؟'
  },
  difference: {
    en: 'What\'s the difference between {calculatorName} and {otherCalculator}?',
    th: '{calculatorName}กับ{otherCalculator}ต่างกันอย่างไร?',
    ja: '{calculatorName}と{otherCalculator}の違いは何ですか？',
    zh: '{calculatorName}和{otherCalculator}有什么区别？',
    es: '¿Cuál es la diferencia entre {calculatorName} y {otherCalculator}?',
    fr: 'Quelle est la différence entre {calculatorName} et {otherCalculator}?',
    de: 'Was ist der Unterschied zwischen {calculatorName} und {otherCalculator}?',
    ko: '{calculatorName}와 {otherCalculator}의 차이점은 무엇인가요?',
    ar: 'ما الفرق بين {calculatorName} و{otherCalculator}؟',
    hi: '{calculatorName} और {otherCalculator} में क्या अंतर है?',
    id: 'Apa perbedaan antara {calculatorName} dan {otherCalculator}?',
    ru: 'В чем разница между {calculatorName} и {otherCalculator}?',
    it: 'Qual è la differenza tra {calculatorName} e {otherCalculator}?',
    nl: 'Wat is het verschil tussen {calculatorName} en {otherCalculator}?',
    vi: 'Sự khác biệt giữa {calculatorName} và {otherCalculator} là gì?',
    pt: 'Qual é a diferença entre {calculatorName} e {otherCalculator}?',
    fa: 'تفاوت بین {calculatorName} و {otherCalculator} چیست؟'
  },
  whenToUse: {
    en: 'When should I use the {calculatorName}?',
    th: 'ควรใช้{calculatorName}เมื่อไหร่?',
    ja: '{calculatorName}はいつ使うべきですか？',
    zh: '什么时候应该使用{calculatorName}？',
    es: '¿Cuándo debo usar la {calculatorName}?',
    fr: 'Quand dois-je utiliser le {calculatorName}?',
    de: 'Wann sollte ich den {calculatorName} verwenden?',
    ko: '{calculatorName}는 언제 사용해야 하나요?',
    ar: 'متى يجب أن أستخدم {calculatorName}؟',
    hi: 'मुझे {calculatorName} का उपयोग कब करना चाहिए?',
    id: 'Kapan saya harus menggunakan {calculatorName}?',
    ru: 'Когда следует использовать {calculatorName}?',
    it: 'Quando dovrei usare il {calculatorName}?',
    nl: 'Wanneer moet ik de {calculatorName} gebruiken?',
    vi: 'Khi nào nên sử dụng {calculatorName}?',
    pt: 'Quando devo usar a {calculatorName}?',
    fa: 'چه زمانی باید از {calculatorName} استفاده کنم؟'
  }
};

// Calculator-specific FAQs
export const calculatorFAQs: Record<string, LocalizedFAQ> = {
  'loan-calculator': {
    en: [
      {
        question: 'How do I use the Loan Calculator?',
        answer: 'Enter your loan amount, interest rate, and loan term. The calculator will instantly show your monthly payment, total interest, and total amount to be paid.',
        schema: true
      },
      {
        question: 'What formula does the Loan Calculator use?',
        answer: 'The calculator uses the standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1], where M is monthly payment, P is principal, r is monthly interest rate, and n is number of payments.',
        schema: true
      },
      {
        question: 'Is the Loan Calculator accurate for all types of loans?',
        answer: 'This calculator provides estimates for standard fixed-rate loans. For variable rates, balloon payments, or special loan types, consult with a financial advisor.',
        schema: true
      },
      {
        question: 'Can I calculate early loan payoff?',
        answer: 'Yes, you can adjust the loan term or add extra monthly payments to see how it affects your total interest and payoff time.',
        schema: true
      },
      {
        question: 'Does the calculator include taxes and insurance?',
        answer: 'This basic loan calculator focuses on principal and interest. For mortgages with taxes and insurance, use our Mortgage Calculator.',
        schema: true
      }
    ],
    th: [
      {
        question: 'ฉันจะใช้เครื่องคำนวณสินเชื่อได้อย่างไร?',
        answer: 'ใส่จำนวนเงินกู้ อัตราดอกเบี้ย และระยะเวลากู้ เครื่องคำนวณจะแสดงค่างวดรายเดือน ดอกเบี้ยรวม และยอดชำระทั้งหมดทันที',
        schema: true
      },
      {
        question: 'เครื่องคำนวณสินเชื่อใช้สูตรอะไร?',
        answer: 'ใช้สูตรการผ่อนชำระมาตรฐาน: M = P * [r(1+r)^n] / [(1+r)^n - 1] โดย M คือค่างวดรายเดือน P คือเงินต้น r คืออัตราดอกเบี้ยรายเดือน n คือจำนวนงวด',
        schema: true
      },
      {
        question: 'เครื่องคำนวณสินเชื่อแม่นยำสำหรับสินเชื่อทุกประเภทหรือไม่?',
        answer: 'เครื่องคำนวณนี้ให้ค่าประมาณสำหรับสินเชื่ออัตราคงที่มาตรฐาน สำหรับอัตราแปรผันหรือสินเชื่อพิเศษ ควรปรึกษาที่ปรึกษาทางการเงิน',
        schema: true
      },
      {
        question: 'สามารถคำนวณการชำระหนี้ก่อนกำหนดได้หรือไม่?',
        answer: 'ได้ คุณสามารถปรับระยะเวลากู้หรือเพิ่มการชำระพิเศษรายเดือนเพื่อดูผลต่อดอกเบี้ยรวมและเวลาชำระหนี้',
        schema: true
      },
      {
        question: 'เครื่องคำนวณรวมภาษีและประกันด้วยหรือไม่?',
        answer: 'เครื่องคำนวณสินเชื่อพื้นฐานนี้เน้นเงินต้นและดอกเบี้ย สำหรับสินเชื่อบ้านที่มีภาษีและประกัน ใช้เครื่องคำนวณสินเชื่อบ้านของเรา',
        schema: true
      }
    ],
    ja: [
      {
        question: 'ローン計算機の使い方は？',
        answer: 'ローン金額、金利、ローン期間を入力してください。計算機は月々の支払い、総利息、総支払額を即座に表示します。',
        schema: true
      },
      {
        question: 'ローン計算機はどのような計算式を使用していますか？',
        answer: '標準的な償却式を使用しています：M = P * [r(1+r)^n] / [(1+r)^n - 1]。Mは月々の支払い、Pは元本、rは月利、nは支払い回数です。',
        schema: true
      },
      {
        question: 'ローン計算機はすべてのローンタイプに正確ですか？',
        answer: 'この計算機は標準的な固定金利ローンの見積もりを提供します。変動金利や特別なローンタイプについては、ファイナンシャルアドバイザーにご相談ください。',
        schema: true
      }
    ]
  },
  'bmi-calculator': {
    en: [
      {
        question: 'How do I calculate my BMI?',
        answer: 'Enter your weight and height. The calculator will compute your BMI using the formula: BMI = weight (kg) / height (m)². The result includes your BMI category.',
        schema: true
      },
      {
        question: 'What is a healthy BMI range?',
        answer: 'A healthy BMI typically ranges from 18.5 to 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese. However, BMI doesn\'t account for muscle mass.',
        schema: true
      },
      {
        question: 'Is BMI accurate for everyone?',
        answer: 'BMI is a general screening tool but has limitations. It doesn\'t distinguish between muscle and fat, so athletes may have high BMI despite being healthy. Consult healthcare providers for comprehensive assessment.',
        schema: true
      },
      {
        question: 'How often should I check my BMI?',
        answer: 'Monthly BMI checks are sufficient for most people tracking weight changes. Focus more on overall health habits rather than frequent BMI monitoring.',
        schema: true
      },
      {
        question: 'Does BMI differ by age and gender?',
        answer: 'While the BMI formula is the same, interpretation varies. Children use age-specific percentiles, and older adults may have slightly higher healthy ranges. Some countries use different thresholds.',
        schema: true
      }
    ],
    th: [
      {
        question: 'ฉันจะคำนวณ BMI ได้อย่างไร?',
        answer: 'ใส่น้ำหนักและส่วนสูงของคุณ เครื่องคำนวณจะคำนวณ BMI โดยใช้สูตร: BMI = น้ำหนัก (กก.) / ส่วนสูง (ม.)² ผลลัพธ์จะแสดงหมวดหมู่ BMI ของคุณ',
        schema: true
      },
      {
        question: 'ช่วง BMI ที่สุขภาพดีคือเท่าไหร่?',
        answer: 'BMI ที่สุขภาพดีอยู่ระหว่าง 18.5-24.9 ต่ำกว่า 18.5 คือน้ำหนักน้อย 25-29.9 คือน้ำหนักเกิน และ 30+ คืออ้วน แต่ BMI ไม่คำนึงถึงมวลกล้ามเนื้อ',
        schema: true
      },
      {
        question: 'BMI แม่นยำสำหรับทุกคนหรือไม่?',
        answer: 'BMI เป็นเครื่องมือคัดกรองทั่วไปแต่มีข้อจำกัด ไม่แยกแยะระหว่างกล้ามเนื้อและไขมัน นักกีฬาอาจมี BMI สูงแม้จะสุขภาพดี ควรปรึกษาแพทย์เพื่อประเมินที่ครอบคลุม',
        schema: true
      }
    ],
    ja: [
      {
        question: 'BMIの計算方法は？',
        answer: '体重と身長を入力してください。計算機はBMI = 体重(kg) / 身長(m)²の公式を使用してBMIを計算します。結果にはBMIカテゴリーが含まれます。',
        schema: true
      },
      {
        question: '健康的なBMI範囲は？',
        answer: '健康的なBMIは通常18.5から24.9です。18.5未満は低体重、25-29.9は過体重、30以上は肥満です。ただし、BMIは筋肉量を考慮しません。',
        schema: true
      }
    ]
  },
  'mortgage-calculator': {
    en: [
      {
        question: 'How does the Mortgage Calculator work?',
        answer: 'Enter your home price, down payment, interest rate, and loan term. The calculator shows monthly payment including principal, interest, and optionally taxes and insurance (PITI).',
        schema: true
      },
      {
        question: 'What\'s included in the monthly payment?',
        answer: 'The basic calculation includes principal and interest. You can add property taxes, homeowners insurance, HOA fees, and PMI for a complete monthly payment estimate.',
        schema: true
      },
      {
        question: 'How much down payment do I need?',
        answer: 'Conventional loans typically require 20% to avoid PMI. FHA loans accept 3.5% minimum, VA loans may require 0%. Lower down payments mean higher monthly payments and PMI.',
        schema: true
      },
      {
        question: 'Should I choose a 15-year or 30-year mortgage?',
        answer: '15-year mortgages have higher monthly payments but save significant interest. 30-year mortgages have lower payments but cost more overall. Choose based on your budget and goals.',
        schema: true
      },
      {
        question: 'How accurate is the mortgage estimate?',
        answer: 'Our calculator provides close estimates, but actual rates depend on credit score, debt-to-income ratio, and lender terms. Get pre-approved for exact numbers.',
        schema: true
      }
    ],
    th: [
      {
        question: 'เครื่องคำนวณสินเชื่อบ้านทำงานอย่างไร?',
        answer: 'ใส่ราคาบ้าน เงินดาวน์ อัตราดอกเบี้ย และระยะเวลากู้ เครื่องคำนวณจะแสดงค่างวดรายเดือนรวมเงินต้น ดอกเบี้ย และภาษี/ประกัน (ถ้าเลือก)',
        schema: true
      },
      {
        question: 'ค่างวดรายเดือนรวมอะไรบ้าง?',
        answer: 'การคำนวณพื้นฐานรวมเงินต้นและดอกเบี้ย คุณสามารถเพิ่มภาษีทรัพย์สิน ประกันบ้าน ค่าส่วนกลาง และ PMI เพื่อประมาณค่างวดรายเดือนที่สมบูรณ์',
        schema: true
      }
    ]
  }
};

// Generate FAQ for a calculator
export function generateFAQ(
  calculatorSlug: string,
  calculatorName: string,
  locale: Locale = 'en',
  relatedCalculator?: string
): FAQItem[] {
  // Get calculator-specific FAQs if available
  const specificFAQs = calculatorFAQs[calculatorSlug]?.[locale];
  if (specificFAQs && specificFAQs.length > 0) {
    return specificFAQs;
  }

  // Generate generic FAQs using templates
  const genericFAQs: FAQItem[] = [];

  // How to use
  genericFAQs.push({
    question: faqTemplates.howToUse[locale]?.replace('{calculatorName}', calculatorName) || 
              `How do I use the ${calculatorName}?`,
    answer: getGenericAnswer('howToUse', calculatorName, locale),
    schema: true
  });

  // Accuracy
  genericFAQs.push({
    question: faqTemplates.accuracy[locale]?.replace('{calculatorName}', calculatorName) ||
              `How accurate is the ${calculatorName}?`,
    answer: getGenericAnswer('accuracy', calculatorName, locale),
    schema: true
  });

  // Formula
  genericFAQs.push({
    question: faqTemplates.formula[locale]?.replace('{calculatorName}', calculatorName) ||
              `What formula does the ${calculatorName} use?`,
    answer: getGenericAnswer('formula', calculatorName, locale),
    schema: true
  });

  // When to use
  genericFAQs.push({
    question: faqTemplates.whenToUse[locale]?.replace('{calculatorName}', calculatorName) ||
              `When should I use the ${calculatorName}?`,
    answer: getGenericAnswer('whenToUse', calculatorName, locale),
    schema: true
  });

  // Difference (if related calculator provided)
  if (relatedCalculator) {
    genericFAQs.push({
      question: faqTemplates.difference[locale]
        ?.replace('{calculatorName}', calculatorName)
        ?.replace('{otherCalculator}', relatedCalculator) ||
        `What's the difference between ${calculatorName} and ${relatedCalculator}?`,
      answer: getGenericAnswer('difference', calculatorName, locale, relatedCalculator),
      schema: true
    });
  }

  return genericFAQs;
}

// Get generic answer based on type
function getGenericAnswer(
  type: string,
  calculatorName: string,
  locale: Locale,
  relatedCalculator?: string
): string {
  const answers: Record<string, Record<Locale, string>> = {
    howToUse: {
      en: `Simply enter the required values in the input fields and click "Calculate". The ${calculatorName} will instantly display your results with detailed breakdowns.`,
      th: `เพียงใส่ค่าที่ต้องการในช่องกรอกข้อมูลและคลิก "คำนวณ" ${calculatorName}จะแสดงผลลัพธ์พร้อมรายละเอียดทันที`,
      ja: `必要な値を入力フィールドに入力し、「計算」をクリックしてください。${calculatorName}は詳細な内訳とともに結果を即座に表示します。`,
      zh: `只需在输入字段中输入所需值，然后点击"计算"。${calculatorName}将立即显示详细的结果。`,
      es: `Simplemente ingrese los valores requeridos en los campos y haga clic en "Calcular". La ${calculatorName} mostrará instantáneamente sus resultados con desgloses detallados.`,
      fr: `Entrez simplement les valeurs requises dans les champs et cliquez sur "Calculer". Le ${calculatorName} affichera instantanément vos résultats avec des détails.`,
      de: `Geben Sie einfach die erforderlichen Werte in die Felder ein und klicken Sie auf "Berechnen". Der ${calculatorName} zeigt sofort Ihre Ergebnisse mit detaillierten Aufschlüsselungen an.`,
      ko: `필요한 값을 입력 필드에 입력하고 "계산"을 클릭하세요. ${calculatorName}가 상세한 분석과 함께 결과를 즉시 표시합니다.`,
      ar: `ما عليك سوى إدخال القيم المطلوبة في الحقول والنقر على "حساب". ستعرض ${calculatorName} نتائجك على الفور مع تفاصيل مفصلة.`,
      hi: `आवश्यक मान इनपुट फ़ील्ड में दर्ज करें और "गणना करें" पर क्लिक करें। ${calculatorName} तुरंत विस्तृत विवरण के साथ आपके परिणाम प्रदर्शित करेगा।`,
      id: `Cukup masukkan nilai yang diperlukan di kolom input dan klik "Hitung". ${calculatorName} akan langsung menampilkan hasil Anda dengan rincian lengkap.`,
      ru: `Просто введите необходимые значения в поля ввода и нажмите "Рассчитать". ${calculatorName} мгновенно отобразит ваши результаты с подробной разбивкой.`,
      it: `Inserisci semplicemente i valori richiesti nei campi e fai clic su "Calcola". Il ${calculatorName} mostrerà istantaneamente i tuoi risultati con dettagli.`,
      nl: `Voer gewoon de vereiste waarden in de velden in en klik op "Berekenen". De ${calculatorName} toont direct uw resultaten met gedetailleerde uitsplitsingen.`,
      vi: `Chỉ cần nhập các giá trị cần thiết vào các trường và nhấp vào "Tính toán". ${calculatorName} sẽ hiển thị kết quả của bạn ngay lập tức với chi tiết.`,
      pt: `Simplesmente insira os valores necessários nos campos e clique em "Calcular". A ${calculatorName} exibirá instantaneamente seus resultados com detalhes.`,
      fa: `کافی است مقادیر مورد نیاز را در فیلدها وارد کرده و روی "محاسبه" کلیک کنید. ${calculatorName} بلافاصله نتایج شما را با جزئیات نمایش می‌دهد.`
    },
    accuracy: {
      en: `Our ${calculatorName} uses industry-standard formulas and algorithms to ensure accurate results. However, results should be used as estimates and verified with professionals for critical decisions.`,
      th: `${calculatorName}ของเราใช้สูตรและอัลกอริทึมมาตรฐานอุตสาหกรรมเพื่อให้ผลลัพธ์แม่นยำ แต่ควรใช้ผลลัพธ์เป็นการประมาณการและตรวจสอบกับผู้เชี่ยวชาญสำหรับการตัดสินใจที่สำคัญ`,
      ja: `当社の${calculatorName}は、正確な結果を保証するために業界標準の公式とアルゴリズムを使用しています。ただし、結果は見積もりとして使用し、重要な決定については専門家に確認してください。`,
      zh: `我们的${calculatorName}使用行业标准公式和算法来确保准确的结果。但是，结果应作为估计使用，关键决策应与专业人士核实。`,
      es: `Nuestra ${calculatorName} utiliza fórmulas y algoritmos estándar de la industria para garantizar resultados precisos. Sin embargo, los resultados deben usarse como estimaciones y verificarse con profesionales para decisiones críticas.`,
      fr: `Notre ${calculatorName} utilise des formules et algorithmes standard de l'industrie pour garantir des résultats précis. Cependant, les résultats doivent être utilisés comme estimations et vérifiés avec des professionnels pour les décisions critiques.`,
      de: `Unser ${calculatorName} verwendet branchenübliche Formeln und Algorithmen, um genaue Ergebnisse zu gewährleisten. Die Ergebnisse sollten jedoch als Schätzungen verwendet und für kritische Entscheidungen mit Fachleuten überprüft werden.`,
      ko: `저희 ${calculatorName}는 정확한 결과를 보장하기 위해 업계 표준 공식과 알고리즘을 사용합니다. 그러나 결과는 추정치로 사용해야 하며 중요한 결정은 전문가와 확인해야 합니다.`,
      ar: `تستخدم ${calculatorName} الخاصة بنا صيغًا وخوارزميات قياسية في الصناعة لضمان نتائج دقيقة. ومع ذلك، يجب استخدام النتائج كتقديرات والتحقق منها مع المتخصصين للقرارات الحاسمة.`,
      hi: `हमारा ${calculatorName} सटीक परिणाम सुनिश्चित करने के लिए उद्योग-मानक सूत्रों और एल्गोरिदम का उपयोग करता है। हालांकि, परिणामों को अनुमान के रूप में उपयोग किया जाना चाहिए और महत्वपूर्ण निर्णयों के लिए पेशेवरों से सत्यापित किया जाना चाहिए।`,
      id: `${calculatorName} kami menggunakan rumus dan algoritma standar industri untuk memastikan hasil yang akurat. Namun, hasil harus digunakan sebagai perkiraan dan diverifikasi dengan profesional untuk keputusan penting.`,
      ru: `Наш ${calculatorName} использует отраслевые стандартные формулы и алгоритмы для обеспечения точных результатов. Однако результаты следует использовать как оценки и проверять с профессионалами для критических решений.`,
      it: `Il nostro ${calculatorName} utilizza formule e algoritmi standard del settore per garantire risultati accurati. Tuttavia, i risultati dovrebbero essere utilizzati come stime e verificati con professionisti per decisioni critiche.`,
      nl: `Onze ${calculatorName} gebruikt industriestandaard formules en algoritmen om nauwkeurige resultaten te garanderen. Resultaten moeten echter als schattingen worden gebruikt en geverifieerd met professionals voor kritieke beslissingen.`,
      vi: `${calculatorName} của chúng tôi sử dụng công thức và thuật toán tiêu chuẩn ngành để đảm bảo kết quả chính xác. Tuy nhiên, kết quả nên được sử dụng như ước tính và xác minh với chuyên gia cho các quyết định quan trọng.`,
      pt: `Nossa ${calculatorName} usa fórmulas e algoritmos padrão da indústria para garantir resultados precisos. No entanto, os resultados devem ser usados como estimativas e verificados com profissionais para decisões críticas.`,
      fa: `${calculatorName} ما از فرمول‌ها و الگوریتم‌های استاندارد صنعت برای اطمینان از نتایج دقیق استفاده می‌کند. با این حال، نتایج باید به عنوان تخمین استفاده شود و برای تصمیمات مهم با متخصصان تأیید شود.`
    },
    formula: {
      en: `The ${calculatorName} uses mathematical formulas specific to its calculation type. You can find detailed formula information in our documentation or by clicking the "Show Formula" button on the calculator page.`,
      th: `${calculatorName}ใช้สูตรคณิตศาสตร์เฉพาะสำหรับประเภทการคำนวณ คุณสามารถดูข้อมูลสูตรโดยละเอียดในเอกสารของเราหรือคลิกปุ่ม "แสดงสูตร" บนหน้าเครื่องคำนวณ`,
      ja: `${calculatorName}は計算タイプに固有の数学的公式を使用します。詳細な公式情報は、ドキュメントまたは計算機ページの「数式を表示」ボタンをクリックして確認できます。`,
      zh: `${calculatorName}使用特定于其计算类型的数学公式。您可以在我们的文档中找到详细的公式信息，或点击计算器页面上的"显示公式"按钮。`,
      es: `La ${calculatorName} utiliza fórmulas matemáticas específicas para su tipo de cálculo. Puede encontrar información detallada sobre la fórmula en nuestra documentación o haciendo clic en el botón "Mostrar fórmula" en la página de la calculadora.`,
      fr: `Le ${calculatorName} utilise des formules mathématiques spécifiques à son type de calcul. Vous pouvez trouver des informations détaillées sur la formule dans notre documentation ou en cliquant sur le bouton "Afficher la formule" sur la page de la calculatrice.`,
      de: `Der ${calculatorName} verwendet mathematische Formeln, die für seinen Berechnungstyp spezifisch sind. Detaillierte Formelinformationen finden Sie in unserer Dokumentation oder durch Klicken auf die Schaltfläche "Formel anzeigen" auf der Rechnerseite.`,
      ko: `${calculatorName}는 계산 유형에 특정한 수학 공식을 사용합니다. 문서에서 자세한 공식 정보를 찾거나 계산기 페이지의 "공식 표시" 버튼을 클릭하여 확인할 수 있습니다.`,
      ar: `تستخدم ${calculatorName} صيغًا رياضية خاصة بنوع الحساب الخاص بها. يمكنك العثور على معلومات مفصلة عن الصيغة في وثائقنا أو بالنقر فوق زر "إظهار الصيغة" على صفحة الآلة الحاسبة.`,
      hi: `${calculatorName} अपने गणना प्रकार के लिए विशिष्ट गणितीय सूत्रों का उपयोग करता है। आप हमारे दस्तावेज़ में विस्तृत सूत्र जानकारी पा सकते हैं या कैलकुलेटर पेज पर "सूत्र दिखाएं" बटन पर क्लिक करके।`,
      id: `${calculatorName} menggunakan rumus matematika khusus untuk jenis perhitungannya. Anda dapat menemukan informasi rumus terperinci dalam dokumentasi kami atau dengan mengklik tombol "Tampilkan Rumus" di halaman kalkulator.`,
      ru: `${calculatorName} использует математические формулы, специфичные для его типа расчета. Вы можете найти подробную информацию о формуле в нашей документации или нажав кнопку "Показать формулу" на странице калькулятора.`,
      it: `Il ${calculatorName} utilizza formule matematiche specifiche per il suo tipo di calcolo. Puoi trovare informazioni dettagliate sulla formula nella nostra documentazione o facendo clic sul pulsante "Mostra formula" nella pagina del calcolatore.`,
      nl: `De ${calculatorName} gebruikt wiskundige formules die specifiek zijn voor het berekeningstype. U kunt gedetailleerde formule-informatie vinden in onze documentatie of door op de knop "Formule tonen" op de rekenmachinepagina te klikken.`,
      vi: `${calculatorName} sử dụng công thức toán học cụ thể cho loại tính toán của nó. Bạn có thể tìm thông tin công thức chi tiết trong tài liệu của chúng tôi hoặc bằng cách nhấp vào nút "Hiển thị công thức" trên trang máy tính.`,
      pt: `A ${calculatorName} usa fórmulas matemáticas específicas para seu tipo de cálculo. Você pode encontrar informações detalhadas sobre a fórmula em nossa documentação ou clicando no botão "Mostrar fórmula" na página da calculadora.`,
      fa: `${calculatorName} از فرمول‌های ریاضی مخصوص نوع محاسبه خود استفاده می‌کند. می‌توانید اطلاعات دقیق فرمول را در مستندات ما پیدا کنید یا با کلیک بر روی دکمه "نمایش فرمول" در صفحه ماشین حساب.`
    },
    whenToUse: {
      en: `Use the ${calculatorName} whenever you need quick, accurate calculations for planning, analysis, or decision-making. It's perfect for both personal and professional use.`,
      th: `ใช้${calculatorName}เมื่อคุณต้องการคำนวณที่รวดเร็วและแม่นยำสำหรับการวางแผน วิเคราะห์ หรือตัดสินใจ เหมาะสำหรับใช้งานส่วนตัวและเชิงอาชีพ`,
      ja: `計画、分析、意思決定のために迅速で正確な計算が必要な場合はいつでも${calculatorName}を使用してください。個人的および専門的な使用の両方に最適です。`,
      zh: `当您需要快速、准确的计算来进行规划、分析或决策时，请使用${calculatorName}。它非常适合个人和专业使用。`,
      es: `Use la ${calculatorName} siempre que necesite cálculos rápidos y precisos para planificación, análisis o toma de decisiones. Es perfecta tanto para uso personal como profesional.`,
      fr: `Utilisez le ${calculatorName} chaque fois que vous avez besoin de calculs rapides et précis pour la planification, l'analyse ou la prise de décision. Il est parfait pour un usage personnel et professionnel.`,
      de: `Verwenden Sie den ${calculatorName}, wann immer Sie schnelle, genaue Berechnungen für Planung, Analyse oder Entscheidungsfindung benötigen. Er ist perfekt für den persönlichen und beruflichen Gebrauch.`,
      ko: `계획, 분석 또는 의사 결정을 위해 빠르고 정확한 계산이 필요할 때마다 ${calculatorName}를 사용하세요. 개인 및 전문적 사용 모두에 완벽합니다.`,
      ar: `استخدم ${calculatorName} كلما احتجت إلى حسابات سريعة ودقيقة للتخطيط أو التحليل أو اتخاذ القرار. إنها مثالية للاستخدام الشخصي والمهني.`,
      hi: `${calculatorName} का उपयोग तब करें जब आपको योजना, विश्लेषण या निर्णय लेने के लिए त्वरित, सटीक गणना की आवश्यकता हो। यह व्यक्तिगत और पेशेवर उपयोग दोनों के लिए एकदम सही है।`,
      id: `Gunakan ${calculatorName} kapan pun Anda memerlukan perhitungan cepat dan akurat untuk perencanaan, analisis, atau pengambilan keputusan. Ini sempurna untuk penggunaan pribadi dan profesional.`,
      ru: `Используйте ${calculatorName}, когда вам нужны быстрые и точные расчеты для планирования, анализа или принятия решений. Он идеально подходит как для личного, так и для профессионального использования.`,
      it: `Usa il ${calculatorName} ogni volta che hai bisogno di calcoli rapidi e accurati per pianificazione, analisi o processo decisionale. È perfetto sia per uso personale che professionale.`,
      nl: `Gebruik de ${calculatorName} wanneer u snelle, nauwkeurige berekeningen nodig heeft voor planning, analyse of besluitvorming. Het is perfect voor zowel persoonlijk als professioneel gebruik.`,
      vi: `Sử dụng ${calculatorName} bất cứ khi nào bạn cần tính toán nhanh chóng, chính xác cho việc lập kế hoạch, phân tích hoặc ra quyết định. Nó hoàn hảo cho cả sử dụng cá nhân và chuyên nghiệp.`,
      pt: `Use a ${calculatorName} sempre que precisar de cálculos rápidos e precisos para planejamento, análise ou tomada de decisão. É perfeita para uso pessoal e profissional.`,
      fa: `از ${calculatorName} هر زمان که به محاسبات سریع و دقیق برای برنامه‌ریزی، تحلیل یا تصمیم‌گیری نیاز دارید استفاده کنید. برای استفاده شخصی و حرفه‌ای عالی است.`
    },
    difference: {
      en: `While both calculators serve similar purposes, the ${calculatorName} focuses on specific calculations, whereas the ${relatedCalculator} may offer different features or calculation methods. Choose based on your specific needs.`,
      th: `แม้เครื่องคำนวณทั้งสองจะมีวัตถุประสงค์คล้ายกัน แต่${calculatorName}เน้นการคำนวณเฉพาะ ในขณะที่${relatedCalculator}อาจมีคุณสมบัติหรือวิธีคำนวณที่แตกต่าง เลือกตามความต้องการเฉพาะของคุณ`,
      ja: `両方の計算機は同様の目的を果たしますが、${calculatorName}は特定の計算に焦点を当てているのに対し、${relatedCalculator}は異なる機能や計算方法を提供する場合があります。特定のニーズに基づいて選択してください。`,
      zh: `虽然两个计算器的用途相似，但${calculatorName}专注于特定计算，而${relatedCalculator}可能提供不同的功能或计算方法。根据您的具体需求进行选择。`,
      es: `Si bien ambas calculadoras sirven para propósitos similares, la ${calculatorName} se centra en cálculos específicos, mientras que la ${relatedCalculator} puede ofrecer diferentes características o métodos de cálculo. Elija según sus necesidades específicas.`,
      fr: `Bien que les deux calculatrices servent des objectifs similaires, le ${calculatorName} se concentre sur des calculs spécifiques, tandis que le ${relatedCalculator} peut offrir différentes fonctionnalités ou méthodes de calcul. Choisissez en fonction de vos besoins spécifiques.`,
      de: `Während beide Rechner ähnlichen Zwecken dienen, konzentriert sich der ${calculatorName} auf spezifische Berechnungen, während der ${relatedCalculator} möglicherweise andere Funktionen oder Berechnungsmethoden bietet. Wählen Sie basierend auf Ihren spezifischen Bedürfnissen.`,
      ko: `두 계산기 모두 비슷한 목적을 제공하지만 ${calculatorName}는 특정 계산에 중점을 두는 반면 ${relatedCalculator}는 다른 기능이나 계산 방법을 제공할 수 있습니다. 특정 요구 사항에 따라 선택하세요.`,
      ar: `بينما تخدم كلتا الآلتين الحاسبتين أغراضًا مماثلة، تركز ${calculatorName} على حسابات محددة، بينما قد تقدم ${relatedCalculator} ميزات أو طرق حساب مختلفة. اختر بناءً على احتياجاتك المحددة.`,
      hi: `जबकि दोनों कैलकुलेटर समान उद्देश्यों की पूर्ति करते हैं, ${calculatorName} विशिष्ट गणनाओं पर केंद्रित है, जबकि ${relatedCalculator} विभिन्न सुविधाएं या गणना विधियों की पेशकश कर सकता है। अपनी विशिष्ट आवश्यकताओं के आधार पर चुनें।`,
      id: `Meskipun kedua kalkulator melayani tujuan yang sama, ${calculatorName} berfokus pada perhitungan spesifik, sedangkan ${relatedCalculator} mungkin menawarkan fitur atau metode perhitungan yang berbeda. Pilih berdasarkan kebutuhan spesifik Anda.`,
      ru: `Хотя оба калькулятора служат схожим целям, ${calculatorName} фокусируется на конкретных расчетах, тогда как ${relatedCalculator} может предлагать другие функции или методы расчета. Выбирайте в зависимости от ваших конкретных потребностей.`,
      it: `Mentre entrambi i calcolatori servono scopi simili, il ${calculatorName} si concentra su calcoli specifici, mentre il ${relatedCalculator} può offrire diverse funzionalità o metodi di calcolo. Scegli in base alle tue esigenze specifiche.`,
      nl: `Hoewel beide rekenmachines vergelijkbare doelen dienen, richt de ${calculatorName} zich op specifieke berekeningen, terwijl de ${relatedCalculator} verschillende functies of berekeningsmethoden kan bieden. Kies op basis van uw specifieke behoeften.`,
      vi: `Mặc dù cả hai máy tính phục vụ mục đích tương tự, ${calculatorName} tập trung vào các phép tính cụ thể, trong khi ${relatedCalculator} có thể cung cấp các tính năng hoặc phương pháp tính toán khác nhau. Chọn dựa trên nhu cầu cụ thể của bạn.`,
      pt: `Embora ambas as calculadoras sirvam a propósitos semelhantes, a ${calculatorName} foca em cálculos específicos, enquanto a ${relatedCalculator} pode oferecer recursos ou métodos de cálculo diferentes. Escolha com base em suas necessidades específicas.`,
      fa: `در حالی که هر دو ماشین حساب اهداف مشابهی دارند، ${calculatorName} بر محاسبات خاص تمرکز دارد، در حالی که ${relatedCalculator} ممکن است ویژگی‌ها یا روش‌های محاسبه متفاوتی ارائه دهد. بر اساس نیازهای خاص خود انتخاب کنید.`
    }
  };

  return answers[type]?.[locale] || answers[type]?.en || `Information about ${calculatorName} ${type}.`;
}

// Generate FAQ Schema for SEO
export function generateFAQSchema(faqs: FAQItem[], locale: Locale = 'en'): any {
  const schemaFAQs = faqs.filter(faq => faq.schema);
  
  if (schemaFAQs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': schemaFAQs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}