// FAQ and Article Content Generators - Automatically generate 500-2000 word articles and FAQs
import { Calculator } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';

interface FAQ {
  question: string;
  answer: string;
}

interface Article {
  title: string;
  introduction: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
  conclusion: string;
  wordCount: number;
  readingTime: number;
}

export class ContentGenerator {
  // Generate FAQ (6-10 questions) for each calculator
  generateFAQ(calculator: Calculator, locale: Locale): FAQ[] {
    const faqs: FAQ[] = [];
    const calcName = calculator.localizedContent?.[locale]?.title || calculator.id;
    
    // Common questions for all calculators
    faqs.push({
      question: this.localizeText(locale, 'faq.what_is', { name: calcName }),
      answer: this.localizeText(locale, 'faq.what_is_answer', { 
        name: calcName,
        description: calculator.localizedContent?.[locale]?.description || ''
      })
    });

    faqs.push({
      question: this.localizeText(locale, 'faq.how_to_use', { name: calcName }),
      answer: this.localizeText(locale, 'faq.how_to_use_answer', { 
        inputs: calculator.inputs.length,
        name: calcName
      })
    });

    faqs.push({
      question: this.localizeText(locale, 'faq.accuracy', { name: calcName }),
      answer: this.localizeText(locale, 'faq.accuracy_answer', { 
        category: calculator.category
      })
    });

    // Category-specific questions
    if (calculator.category === 'finance') {
      faqs.push({
        question: this.localizeText(locale, 'faq.finance.interest_rate'),
        answer: this.localizeText(locale, 'faq.finance.interest_rate_answer')
      });
      
      faqs.push({
        question: this.localizeText(locale, 'faq.finance.currency'),
        answer: this.localizeText(locale, 'faq.finance.currency_answer', { locale })
      });
    } else if (calculator.category === 'health') {
      faqs.push({
        question: this.localizeText(locale, 'faq.health.medical_advice'),
        answer: this.localizeText(locale, 'faq.health.medical_advice_answer')
      });
      
      faqs.push({
        question: this.localizeText(locale, 'faq.health.age_gender'),
        answer: this.localizeText(locale, 'faq.health.age_gender_answer')
      });
    } else if (calculator.category === 'education') {
      faqs.push({
        question: this.localizeText(locale, 'faq.education.grading_system'),
        answer: this.localizeText(locale, 'faq.education.grading_system_answer', { locale })
      });
    }

    // Technical questions
    faqs.push({
      question: this.localizeText(locale, 'faq.formula_used'),
      answer: this.localizeText(locale, 'faq.formula_answer', {
        formula: calculator.formulas?.[0]?.description || 'Standard formula'
      })
    });

    faqs.push({
      question: this.localizeText(locale, 'faq.save_results'),
      answer: this.localizeText(locale, 'faq.save_results_answer')
    });

    // Privacy and data
    faqs.push({
      question: this.localizeText(locale, 'faq.privacy'),
      answer: this.localizeText(locale, 'faq.privacy_answer')
    });

    // Mobile usage
    faqs.push({
      question: this.localizeText(locale, 'faq.mobile'),
      answer: this.localizeText(locale, 'faq.mobile_answer')
    });

    return faqs.slice(0, 10); // Return 6-10 FAQs
  }

  // Generate comprehensive article (500-2000 words)
  generateArticle(calculator: Calculator, locale: Locale): Article {
    const calcName = calculator.localizedContent?.[locale]?.title || calculator.id;
    const category = calculator.category;
    
    const sections = [];
    let totalWords = 0;

    // Introduction (100-150 words)
    const introduction = this.generateIntroduction(calculator, locale);
    totalWords += this.countWords(introduction);

    // Section 1: Understanding the Calculator (200-300 words)
    const understandingSection = {
      heading: this.localizeText(locale, 'article.understanding', { name: calcName }),
      content: this.generateUnderstandingSection(calculator, locale)
    };
    sections.push(understandingSection);
    totalWords += this.countWords(understandingSection.content);

    // Section 2: How to Use (200-300 words)
    const howToSection = {
      heading: this.localizeText(locale, 'article.how_to_use'),
      content: this.generateHowToSection(calculator, locale)
    };
    sections.push(howToSection);
    totalWords += this.countWords(howToSection.content);

    // Section 3: Practical Examples (300-400 words)
    const examplesSection = {
      heading: this.localizeText(locale, 'article.examples'),
      content: this.generateExamplesSection(calculator, locale)
    };
    sections.push(examplesSection);
    totalWords += this.countWords(examplesSection.content);

    // Section 4: Tips and Best Practices (200-300 words)
    const tipsSection = {
      heading: this.localizeText(locale, 'article.tips'),
      content: this.generateTipsSection(calculator, locale)
    };
    sections.push(tipsSection);
    totalWords += this.countWords(tipsSection.content);

    // Section 5: Common Mistakes (150-250 words)
    const mistakesSection = {
      heading: this.localizeText(locale, 'article.mistakes'),
      content: this.generateMistakesSection(calculator, locale)
    };
    sections.push(mistakesSection);
    totalWords += this.countWords(mistakesSection.content);

    // Section 6: Advanced Features (150-250 words)
    if (category === 'finance' || category === 'engineering') {
      const advancedSection = {
        heading: this.localizeText(locale, 'article.advanced'),
        content: this.generateAdvancedSection(calculator, locale)
      };
      sections.push(advancedSection);
      totalWords += this.countWords(advancedSection.content);
    }

    // Conclusion (100-150 words)
    const conclusion = this.generateConclusion(calculator, locale);
    totalWords += this.countWords(conclusion);

    return {
      title: `Complete Guide to ${calcName}`,
      introduction,
      sections,
      conclusion,
      wordCount: totalWords,
      readingTime: Math.ceil(totalWords / 200) // Average reading speed
    };
  }

  private generateIntroduction(calculator: Calculator, locale: Locale): string {
    const name = calculator.localizedContent?.[locale]?.title || calculator.id;
    const description = calculator.localizedContent?.[locale]?.description || '';
    
    const templates = {
      en: `In today's fast-paced world, having access to accurate and reliable calculation tools is essential. The ${name} is designed to provide you with instant, precise results for your ${calculator.category} needs. ${description}

Whether you're a professional, student, or simply someone looking for quick answers, this calculator streamlines complex calculations into a simple, user-friendly interface. With support for multiple units, real-time validation, and comprehensive results, you can trust the accuracy of every calculation.

This comprehensive guide will walk you through everything you need to know about using the ${name}, from basic operations to advanced features, ensuring you get the most out of this powerful tool.`,
      
      th: `ในยุคดิจิทัลที่ทุกอย่างต้องการความรวดเร็วและแม่นยำ ${name} ถูกออกแบบมาเพื่อตอบสนองความต้องการด้าน${this.getCategoryNameThai(calculator.category)}ของคุณ ${description}

ไม่ว่าคุณจะเป็นมืออาชีพ นักเรียน นักศึกษา หรือผู้ที่ต้องการคำตอบที่รวดเร็ว เครื่องคิดเลขนี้จะช่วยให้การคำนวณที่ซับซ้อนกลายเป็นเรื่องง่าย ด้วยการรองรับหลายหน่วย การตรวจสอบแบบเรียลไทม์ และผลลัพธ์ที่ครอบคลุม คุณสามารถมั่นใจในความแม่นยำของทุกการคำนวณ

คู่มือฉบับสมบูรณ์นี้จะพาคุณไปรู้จักกับทุกสิ่งที่ต้องรู้เกี่ยวกับการใช้ ${name} ตั้งแต่การใช้งานพื้นฐานไปจนถึงฟีเจอร์ขั้นสูง เพื่อให้คุณได้ประโยชน์สูงสุดจากเครื่องมือที่ทรงพลังนี้`
    };

    return templates[locale] || templates.en;
  }

  private generateUnderstandingSection(calculator: Calculator, locale: Locale): string {
    const name = calculator.localizedContent?.[locale]?.title || calculator.id;
    const inputs = calculator.inputs.map(i => i.label).join(', ');
    
    const templates = {
      en: `The ${name} is a sophisticated tool designed to handle complex ${calculator.category} calculations with ease. At its core, this calculator uses proven mathematical formulas and algorithms to ensure accurate results every time.

Key Components:
• Input Fields: The calculator requires ${calculator.inputs.length} main inputs: ${inputs}. Each field is carefully validated to ensure data accuracy.
• Processing Engine: Our advanced calculation engine processes your inputs using industry-standard formulas, taking into account all relevant factors and variables.
• Output Display: Results are presented in a clear, easy-to-understand format with appropriate units and precision levels.

The calculator operates on the principle of real-time computation, meaning that as soon as you enter or modify any input value, the system immediately recalculates and updates the results. This dynamic approach ensures you always have the most current information at your fingertips.

What sets this calculator apart is its attention to detail and comprehensive approach. Rather than providing just a single number, it offers multiple related outputs, giving you a complete picture of your calculation. This holistic view helps you make more informed decisions based on comprehensive data.`,

      th: `${name} เป็นเครื่องมือที่ซับซ้อนซึ่งออกแบบมาเพื่อจัดการกับการคำนวณด้าน${this.getCategoryNameThai(calculator.category)}ที่ซับซ้อนได้อย่างง่ายดาย หัวใจสำคัญของเครื่องคิดเลขนี้คือการใช้สูตรคณิตศาสตร์และอัลกอริทึมที่ได้รับการพิสูจน์แล้วเพื่อให้ได้ผลลัพธ์ที่แม่นยำทุกครั้ง

องค์ประกอบหลัก:
• ช่องกรอกข้อมูล: เครื่องคิดเลขต้องการข้อมูลหลัก ${calculator.inputs.length} รายการ: ${inputs} แต่ละช่องจะถูกตรวจสอบอย่างละเอียดเพื่อความแม่นยำของข้อมูล
• ระบบประมวลผล: ระบบคำนวณขั้นสูงของเราประมวลผลข้อมูลของคุณโดยใช้สูตรมาตรฐานอุตสาหกรรม โดยคำนึงถึงปัจจัยและตัวแปรที่เกี่ยวข้องทั้งหมด
• การแสดงผล: ผลลัพธ์จะแสดงในรูปแบบที่ชัดเจน เข้าใจง่าย พร้อมหน่วยและระดับความแม่นยำที่เหมาะสม`
    };

    return templates[locale] || templates.en;
  }

  private generateHowToSection(calculator: Calculator, locale: Locale): string {
    const name = calculator.localizedContent?.[locale]?.title || calculator.id;
    
    const templates = {
      en: `Using the ${name} is straightforward and intuitive. Follow these step-by-step instructions to get accurate results:

Step 1: Prepare Your Information
Before you begin, gather all necessary data. You'll need ${calculator.inputs.map(i => `${i.label}${i.unit ? ` (in ${i.unit})` : ''}`).join(', ')}. Having this information ready will streamline the calculation process.

Step 2: Enter Your Data
Input your values into the corresponding fields. The calculator features:
• Real-time validation to prevent errors
• Automatic formatting for numbers and currencies
• Unit conversion options where applicable
• Clear labels and helpful placeholders

Step 3: Review and Calculate
Once all required fields are filled, the calculator automatically computes the results. You can also click the "Calculate" button to refresh the calculation. The system will:
• Validate all inputs for accuracy
• Apply the appropriate formulas
• Generate comprehensive results
• Display any warnings or recommendations

Step 4: Interpret Your Results
The calculator provides detailed outputs including primary results and additional insights. Each result is clearly labeled and includes appropriate units. Pay attention to any category indicators or recommendations provided.

Step 5: Save or Share
You can download your results as a CSV file, print them for your records, or copy a shareable link to revisit your calculation later.`,

      th: `การใช้ ${name} นั้นง่ายและใช้งานง่าย ปฏิบัติตามคำแนะนำทีละขั้นตอนเหล่านี้เพื่อให้ได้ผลลัพธ์ที่แม่นยำ:

ขั้นตอนที่ 1: เตรียมข้อมูลของคุณ
ก่อนเริ่มต้น รวบรวมข้อมูลที่จำเป็นทั้งหมด คุณจะต้องมี ${calculator.inputs.map(i => `${i.label}${i.unit ? ` (หน่วย ${i.unit})` : ''}`).join(', ')} การมีข้อมูลนี้พร้อมจะทำให้กระบวนการคำนวณราบรื่น`
    };

    return templates[locale] || templates.en;
  }

  private generateExamplesSection(calculator: Calculator, locale: Locale): string {
    const name = calculator.localizedContent?.[locale]?.title || calculator.id;
    
    // Generate category-specific examples
    let examples = '';
    
    if (calculator.category === 'finance') {
      examples = this.generateFinanceExamples(calculator, locale);
    } else if (calculator.category === 'health') {
      examples = this.generateHealthExamples(calculator, locale);
    } else {
      examples = this.generateGenericExamples(calculator, locale);
    }
    
    return examples;
  }

  private generateFinanceExamples(calculator: Calculator, locale: Locale): string {
    const templates = {
      en: `Let's explore practical examples to better understand how this calculator works:

Example 1: Personal Loan Scenario
Imagine you're considering a personal loan of $10,000 with an annual interest rate of 5.5% for a 3-year term. By entering these values into the calculator:
• Principal Amount: $10,000
• Interest Rate: 5.5%
• Loan Term: 3 years

The calculator will show:
• Monthly Payment: approximately $301.35
• Total Interest: $850.60
• Total Amount Paid: $10,850.60

This information helps you understand the true cost of the loan and plan your budget accordingly.

Example 2: Investment Comparison
Consider comparing two investment options with different terms and rates. The calculator allows you to quickly evaluate multiple scenarios, helping you make informed financial decisions.

Example 3: Early Payoff Analysis
By adjusting the payment amount or frequency, you can see how making extra payments affects the total interest paid and loan duration. This feature is particularly useful for mortgage planning.`,

      th: `มาสำรวจตัวอย่างที่เป็นประโยชน์เพื่อทำความเข้าใจการทำงานของเครื่องคิดเลขนี้ให้ดียิ่งขึ้น:

ตัวอย่างที่ 1: สถานการณ์สินเชื่อส่วนบุคคล
ลองนึกภาพว่าคุณกำลังพิจารณาสินเชื่อส่วนบุคคล 300,000 บาท อัตราดอกเบี้ย 5.5% ต่อปี ระยะเวลา 3 ปี`
    };

    return templates[locale] || templates.en;
  }

  private generateHealthExamples(calculator: Calculator, locale: Locale): string {
    const templates = {
      en: `Understanding your health metrics through practical examples:

Example 1: BMI Calculation
For an adult weighing 70 kg with a height of 1.75 meters:
• Weight: 70 kg
• Height: 1.75 m

The calculator determines:
• BMI: 22.86
• Category: Normal weight
• Ideal weight range: 56.7 - 76.3 kg

This indicates a healthy weight range for the given height.

Example 2: Different Body Types
The calculator accounts for various body compositions and provides personalized recommendations based on age, gender, and activity level.

Example 3: Progress Tracking
By regularly using the calculator, you can track changes over time and monitor your health journey effectively.`,

      th: `ทำความเข้าใจตัวชี้วัดสุขภาพของคุณผ่านตัวอย่างที่เป็นประโยชน์:`
    };

    return templates[locale] || templates.en;
  }

  private generateGenericExamples(calculator: Calculator, locale: Locale): string {
    return `Practical examples demonstrate the calculator's versatility and accuracy across various scenarios. By exploring different input combinations, you can better understand how each parameter affects the final results.`;
  }

  private generateTipsSection(calculator: Calculator, locale: Locale): string {
    const name = calculator.localizedContent?.[locale]?.title || calculator.id;
    
    const templates = {
      en: `Maximize your use of the ${name} with these professional tips:

1. **Double-Check Your Units**: Always verify that you're entering values in the correct units. The calculator clearly labels each field, but mixing units is a common source of errors.

2. **Use Current Data**: For best results, especially in financial calculations, use the most recent rates and values available. Market conditions change frequently.

3. **Consider Multiple Scenarios**: Don't settle for a single calculation. Try different values to understand the range of possible outcomes.

4. **Save Your Results**: Use the download feature to keep records of important calculations for future reference or comparison.

5. **Understand the Assumptions**: Every calculator makes certain assumptions. Review the FAQ section to understand what factors are included or excluded.

6. **Regular Updates**: For ongoing projects or monitoring, recalculate periodically as conditions change.

7. **Cross-Reference**: For critical decisions, use multiple calculators or methods to verify your results.`,

      th: `เพิ่มประสิทธิภาพการใช้ ${name} ด้วยเคล็ดลับจากมืออาชีพ:`
    };

    return templates[locale] || templates.en;
  }

  private generateMistakesSection(calculator: Calculator, locale: Locale): string {
    const templates = {
      en: `Avoid these common mistakes when using the calculator:

1. **Incorrect Unit Selection**: One of the most frequent errors is entering values in the wrong units. Always check whether the calculator expects metric or imperial units.

2. **Decimal Point Errors**: Be careful with decimal points, especially in financial calculations where a misplaced decimal can significantly affect results.

3. **Ignoring Time Periods**: Ensure you're consistent with time periods (monthly vs. annual rates, for example).

4. **Overlooking Additional Factors**: Some calculations require consideration of additional factors like taxes, fees, or inflation.

5. **Not Validating Results**: Always perform a sanity check on your results. If something seems unusually high or low, double-check your inputs.

6. **Using Outdated Information**: Rates and regulations change. Ensure your input data is current and relevant.`,

      th: `หลีกเลี่ยงข้อผิดพลาดทั่วไปเหล่านี้เมื่อใช้เครื่องคิดเลข:`
    };

    return templates[locale] || templates.en;
  }

  private generateAdvancedSection(calculator: Calculator, locale: Locale): string {
    const templates = {
      en: `Advanced features for power users:

**Compound Calculations**: The calculator can handle complex, multi-step calculations automatically, saving time and reducing errors.

**Sensitivity Analysis**: By adjusting individual parameters, you can perform sensitivity analysis to understand which factors have the greatest impact on your results.

**Historical Comparisons**: Save multiple calculations to compare different scenarios or track changes over time.

**Export Capabilities**: Export your results in various formats for use in reports, presentations, or further analysis.

**API Integration**: For developers, the calculator's logic can be integrated into other applications via our API.`,

      th: `ฟีเจอร์ขั้นสูงสำหรับผู้ใช้มืออาชีพ:`
    };

    return templates[locale] || templates.en;
  }

  private generateConclusion(calculator: Calculator, locale: Locale): string {
    const name = calculator.localizedContent?.[locale]?.title || calculator.id;
    
    const templates = {
      en: `The ${name} is more than just a calculation tool—it's a comprehensive solution designed to provide accurate, reliable results for your ${calculator.category} needs. By following this guide and utilizing the tips provided, you can make the most of this powerful resource.

Remember that while this calculator provides precise mathematical results, it's always advisable to consult with professionals for important decisions, especially in areas like finance, health, or legal matters.

We continuously update and improve our calculators based on user feedback and changing regulations. Bookmark this page and return whenever you need quick, accurate calculations.`,

      th: `${name} เป็นมากกว่าเครื่องมือคำนวณ—เป็นโซลูชันที่ครอบคลุมซึ่งออกแบบมาเพื่อให้ผลลัพธ์ที่แม่นยำและเชื่อถือได้สำหรับความต้องการด้าน${this.getCategoryNameThai(calculator.category)}ของคุณ`
    };

    return templates[locale] || templates.en;
  }

  private localizeText(locale: Locale, key: string, params?: any): string {
    const translations: Record<string, Record<Locale, string>> = {
      'faq.what_is': {
        en: `What is the ${params?.name}?`,
        th: `${params?.name} คืออะไร?`,
        ja: `${params?.name}とは何ですか？`,
        de: `Was ist der ${params?.name}?`,
        zh: `什么是${params?.name}？`,
        es: `¿Qué es la ${params?.name}?`,
        pt: `O que é a ${params?.name}?`,
        fr: `Qu'est-ce que le ${params?.name}?`,
        ko: `${params?.name}란 무엇입니까?`,
        ar: `ما هو ${params?.name}؟`,
        hi: `${params?.name} क्या है?`,
        id: `Apa itu ${params?.name}?`,
        ru: `Что такое ${params?.name}?`,
        it: `Cos'è il ${params?.name}?`,
        nl: `Wat is de ${params?.name}?`,
        vi: `${params?.name} là gì?`,
        fa: `${params?.name} چیست؟`
      },
      'faq.what_is_answer': {
        en: `The ${params?.name} is a specialized tool designed to help you calculate and analyze ${params?.description}. It uses proven formulas and algorithms to provide accurate results instantly.`,
        th: `${params?.name} เป็นเครื่องมือเฉพาะทางที่ออกแบบมาเพื่อช่วยคุณคำนวณและวิเคราะห์ ${params?.description} โดยใช้สูตรและอัลกอริทึมที่ได้รับการพิสูจน์เพื่อให้ผลลัพธ์ที่แม่นยำทันที`,
        // Add other locales...
      },
      // Add more translations...
    };

    const template = translations[key]?.[locale] || translations[key]?.en || key;
    
    // Simple template replacement
    if (params) {
      return Object.entries(params).reduce((str, [key, value]) => 
        str.replace(new RegExp(`\\$\\{params\\.${key}\\}`, 'g'), String(value)), 
        template
      );
    }
    
    return template;
  }

  private getCategoryNameThai(category: string): string {
    const categories: Record<string, string> = {
      finance: 'การเงิน',
      health: 'สุขภาพ',
      education: 'การศึกษา',
      engineering: 'วิศวกรรม',
      lifestyle: 'ไลฟ์สไตล์',
      business: 'ธุรกิจ',
      conversion: 'การแปลงหน่วย',
      math: 'คณิตศาสตร์'
    };
    return categories[category] || category;
  }

  private countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }
}

// Export singleton instance
export const contentGenerator = new ContentGenerator();