/**
 * Fun & Novelty Calculators
 * Entertainment calculators that engage users and drive traffic
 */

import { Calculator } from '@/lib/types/calculator';

// Love Calculator
export const loveCalculator: Calculator = {
  id: 'love-calculator',
  slug: 'love',
  category: 'lifestyle',
  icon: '❤️',
  color: '#EC4899',
  inputs: [
    {
      key: 'name1',
      label: 'Your Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your name'
    },
    {
      key: 'name2',
      label: 'Partner\'s Name',
      type: 'text',
      required: true,
      placeholder: 'Enter partner\'s name'
    },
    {
      key: 'birthdate1',
      label: 'Your Birth Date',
      type: 'date',
      required: false
    },
    {
      key: 'birthdate2',
      label: 'Partner\'s Birth Date',
      type: 'date',
      required: false
    }
  ],
  outputs: [
    {
      key: 'compatibility',
      label: 'Love Compatibility',
      format: 'percentage',
      decimals: 0,
      highlight: true
    },
    {
      key: 'message',
      label: 'Relationship Message',
      format: 'text'
    },
    {
      key: 'advice',
      label: 'Love Advice',
      format: 'text'
    }
  ],
  formulas: [{
    key: 'calculate',
    expression: `
      // Fun love calculation algorithm
      const name1Lower = inputs.name1.toLowerCase();
      const name2Lower = inputs.name2.toLowerCase();
      
      // Calculate based on names
      let score = 50; // Start at 50%
      
      // Common letters boost compatibility
      const letters1 = new Set(name1Lower.replace(/[^a-z]/g, ''));
      const letters2 = new Set(name2Lower.replace(/[^a-z]/g, ''));
      const commonLetters = [...letters1].filter(l => letters2.has(l)).length;
      score += commonLetters * 3;
      
      // Name length harmony
      const lengthDiff = Math.abs(name1Lower.length - name2Lower.length);
      score -= lengthDiff * 2;
      
      // Vowel compatibility
      const vowels1 = (name1Lower.match(/[aeiou]/g) || []).length;
      const vowels2 = (name2Lower.match(/[aeiou]/g) || []).length;
      score += Math.min(vowels1, vowels2) * 2;
      
      // Add some "randomness" based on name combination
      const combined = name1Lower + name2Lower;
      const hashCode = combined.split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
      }, 0);
      score += (Math.abs(hashCode) % 20) - 10;
      
      // If birthdates provided, add zodiac compatibility
      if (inputs.birthdate1 && inputs.birthdate2) {
        const date1 = new Date(inputs.birthdate1);
        const date2 = new Date(inputs.birthdate2);
        const ageDiff = Math.abs(date1.getFullYear() - date2.getFullYear());
        score -= Math.min(ageDiff, 10); // Slight penalty for large age gaps
      }
      
      // Ensure score is between 0 and 100
      score = Math.max(0, Math.min(100, score));
      
      // Generate message based on score
      let message = '';
      let advice = '';
      
      if (score >= 90) {
        message = '💕 Perfect Match! You two are meant to be together!';
        advice = 'Your compatibility is off the charts! Cherish each other and never let go.';
      } else if (score >= 75) {
        message = '❤️ Great Compatibility! You make a wonderful couple!';
        advice = 'You have strong chemistry. Keep communicating and supporting each other.';
      } else if (score >= 60) {
        message = '💗 Good Match! There\'s definitely potential here!';
        advice = 'Work on understanding each other better. Love grows with effort.';
      } else if (score >= 45) {
        message = '💝 Average Compatibility. Love needs work!';
        advice = 'Focus on common interests and give each other space to grow.';
      } else if (score >= 30) {
        message = '💔 Challenging Match. But love conquers all!';
        advice = 'Opposites can attract! Find ways to appreciate your differences.';
      } else {
        message = '💙 Friendship Zone. Better as friends?';
        advice = 'Sometimes the best relationships start as friendships. Take it slow!';
      }
      
      return {
        compatibility: score,
        message: message,
        advice: advice
      };
    `,
    variables: ['name1', 'name2', 'birthdate1', 'birthdate2'],
    description: 'Calculate love compatibility'
  }],
  localizedContent: {
    en: {
      title: 'Love Calculator',
      description: 'Calculate love compatibility between you and your partner',
      instructions: 'Enter both names to discover your love compatibility percentage!',
      keywords: ['love calculator', 'compatibility test', 'relationship calculator'],
      faq: [],
      article: '',
      meta: {
        title: 'Love Calculator - Test Your Compatibility | BwnXCalculator',
        description: 'Calculate love compatibility between you and your partner. Fun love test with compatibility percentage and relationship advice.',
        keywords: 'love calculator, compatibility test, relationship calculator, love test, romance calculator'
      }
    },
    th: {
      title: 'คำนวณความรัก',
      description: 'คำนวณความเข้ากันในความรักระหว่างคุณและคนที่คุณรัก',
      instructions: 'ใส่ชื่อทั้งสองเพื่อค้นหาเปอร์เซ็นต์ความเข้ากัน!',
      keywords: ['คำนวณความรัก', 'ทดสอบความเข้ากัน', 'ความรัก'],
      faq: [],
      article: ''
    }
  }
};

// Lucky Number Generator
export const luckyNumberCalculator: Calculator = {
  id: 'lucky-number-generator',
  slug: 'lucky-number',
  category: 'lifestyle',
  icon: '🍀',
  color: '#10B981',
  inputs: [
    {
      key: 'name',
      label: 'Your Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your name'
    },
    {
      key: 'birthdate',
      label: 'Birth Date',
      type: 'date',
      required: true
    },
    {
      key: 'purpose',
      label: 'Purpose',
      type: 'select',
      required: true,
      options: [
        { value: 'general', label: 'General Luck' },
        { value: 'lottery', label: 'Lottery Numbers' },
        { value: 'business', label: 'Business Decision' },
        { value: 'love', label: 'Love & Romance' },
        { value: 'career', label: 'Career Move' }
      ]
    },
    {
      key: 'count',
      label: 'How many numbers?',
      type: 'number',
      required: true,
      defaultValue: 6,
      min: 1,
      max: 10
    },
    {
      key: 'maxNumber',
      label: 'Maximum number',
      type: 'number',
      required: true,
      defaultValue: 49,
      min: 10,
      max: 100
    }
  ],
  outputs: [
    {
      key: 'luckyNumbers',
      label: 'Your Lucky Numbers',
      format: 'text',
      highlight: true
    },
    {
      key: 'luckyDay',
      label: 'Lucky Day',
      format: 'text'
    },
    {
      key: 'luckyColor',
      label: 'Lucky Color',
      format: 'text'
    },
    {
      key: 'advice',
      label: 'Fortune Advice',
      format: 'text'
    }
  ],
  formulas: [{
    key: 'calculate',
    expression: `
      // Generate lucky numbers based on personal data
      const name = inputs.name.toLowerCase();
      const birthdate = new Date(inputs.birthdate);
      const purpose = inputs.purpose;
      const count = parseInt(inputs.count);
      const maxNum = parseInt(inputs.maxNumber);
      
      // Create seed from personal data
      let seed = 0;
      for (let i = 0; i < name.length; i++) {
        seed += name.charCodeAt(i) * (i + 1);
      }
      seed += birthdate.getDate() + birthdate.getMonth() + birthdate.getFullYear();
      
      // Purpose modifier
      const purposeModifiers = {
        general: 1,
        lottery: 7,
        business: 3,
        love: 2,
        career: 5
      };
      seed *= purposeModifiers[purpose] || 1;
      
      // Generate lucky numbers
      const numbers = new Set();
      let counter = seed;
      
      while (numbers.size < count) {
        counter = (counter * 9301 + 49297) % 233280;
        const num = (counter % maxNum) + 1;
        numbers.add(num);
      }
      
      const luckyNumbers = Array.from(numbers).sort((a, b) => a - b).join(', ');
      
      // Calculate lucky day
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const luckyDayIndex = (seed + birthdate.getDay()) % 7;
      const luckyDay = days[luckyDayIndex];
      
      // Calculate lucky color
      const colors = [
        { name: 'Red', meaning: 'passion and energy' },
        { name: 'Blue', meaning: 'peace and wisdom' },
        { name: 'Green', meaning: 'growth and harmony' },
        { name: 'Yellow', meaning: 'joy and optimism' },
        { name: 'Purple', meaning: 'creativity and luxury' },
        { name: 'Orange', meaning: 'enthusiasm and success' },
        { name: 'Pink', meaning: 'love and compassion' },
        { name: 'Gold', meaning: 'wealth and prosperity' }
      ];
      const colorIndex = seed % colors.length;
      const luckyColorObj = colors[colorIndex];
      const luckyColor = luckyColorObj.name + ' - ' + luckyColorObj.meaning;
      
      // Generate advice based on purpose
      let advice = '';
      switch(purpose) {
        case 'lottery':
          advice = 'Play responsibly! These numbers are for entertainment. Remember, true wealth comes from hard work and smart decisions.';
          break;
        case 'business':
          advice = 'Trust your instincts combined with careful analysis. Your lucky numbers suggest timing is favorable for calculated risks.';
          break;
        case 'love':
          advice = 'Open your heart to new possibilities. Your lucky numbers indicate positive romantic energy surrounding you.';
          break;
        case 'career':
          advice = 'Professional opportunities are aligning in your favor. Use these numbers as motivation to pursue your goals.';
          break;
        default:
          advice = 'Fortune favors the prepared mind. Use these lucky numbers as positive reminders throughout your day.';
      }
      
      return {
        luckyNumbers: luckyNumbers,
        luckyDay: luckyDay,
        luckyColor: luckyColor,
        advice: advice
      };
    `,
    variables: ['name', 'birthdate', 'purpose', 'count', 'maxNumber'],
    description: 'Generate personalized lucky numbers'
  }],
  localizedContent: {
    en: {
      title: 'Lucky Number Generator',
      description: 'Generate your personal lucky numbers based on your name and birthdate',
      instructions: 'Enter your details to discover your lucky numbers!',
      keywords: ['lucky number generator', 'fortune numbers', 'lottery numbers'],
      faq: [],
      article: '',
      meta: {
        title: 'Lucky Number Generator - Personal Fortune Numbers | BwnXCalculator',
        description: 'Generate personalized lucky numbers based on your name and birthdate. Perfect for lottery, decisions, or just for fun!',
        keywords: 'lucky number generator, fortune numbers, lottery numbers, personal lucky numbers'
      }
    },
    th: {
      title: 'สร้างเลขนำโชค',
      description: 'สร้างเลขนำโชคส่วนตัวจากชื่อและวันเกิดของคุณ',
      instructions: 'กรอกข้อมูลเพื่อค้นหาเลขนำโชคของคุณ!',
      keywords: ['เลขนำโชค', 'สร้างเลขมงคล', 'เลขเสี่ยงโชค'],
      faq: [],
      article: ''
    }
  }
};

// Birthday Calculator
export const birthdayCalculator: Calculator = {
  id: 'birthday-calculator',
  slug: 'birthday',
  category: 'lifestyle',
  icon: '🎂',
  color: '#F59E0B',
  inputs: [
    {
      key: 'birthdate',
      label: 'Your Birth Date',
      type: 'date',
      required: true
    },
    {
      key: 'birthTime',
      label: 'Birth Time (optional)',
      type: 'time',
      required: false
    }
  ],
  outputs: [
    {
      key: 'ageYears',
      label: 'Age in Years',
      format: 'number',
      decimals: 0
    },
    {
      key: 'ageMonths',
      label: 'Age in Months',
      format: 'number',
      decimals: 0
    },
    {
      key: 'ageDays',
      label: 'Age in Days',
      format: 'number',
      decimals: 0,
      highlight: true
    },
    {
      key: 'ageHours',
      label: 'Age in Hours',
      format: 'number',
      decimals: 0
    },
    {
      key: 'nextBirthday',
      label: 'Next Birthday',
      format: 'text'
    },
    {
      key: 'daysUntil',
      label: 'Days Until Birthday',
      format: 'number',
      decimals: 0
    },
    {
      key: 'dayOfWeek',
      label: 'Born on',
      format: 'text'
    },
    {
      key: 'zodiacSign',
      label: 'Zodiac Sign',
      format: 'text'
    },
    {
      key: 'chineseZodiac',
      label: 'Chinese Zodiac',
      format: 'text'
    },
    {
      key: 'lifeNumber',
      label: 'Life Path Number',
      format: 'text'
    }
  ],
  formulas: [{
    key: 'calculate',
    expression: `
      const birthdate = new Date(inputs.birthdate);
      const now = new Date();
      
      // Calculate age components
      let ageYears = now.getFullYear() - birthdate.getFullYear();
      let ageMonths = now.getMonth() - birthdate.getMonth();
      
      if (ageMonths < 0 || (ageMonths === 0 && now.getDate() < birthdate.getDate())) {
        ageYears--;
        ageMonths += 12;
      }
      
      if (now.getDate() < birthdate.getDate()) {
        ageMonths--;
      }
      
      // Calculate total months and days
      const totalMonths = ageYears * 12 + ageMonths;
      const ageDays = Math.floor((now - birthdate) / (1000 * 60 * 60 * 24));
      const ageHours = Math.floor((now - birthdate) / (1000 * 60 * 60));
      
      // Calculate next birthday
      let nextBirthday = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());
      if (nextBirthday < now) {
        nextBirthday = new Date(now.getFullYear() + 1, birthdate.getMonth(), birthdate.getDate());
      }
      
      const daysUntil = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
      
      // Day of week born
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = days[birthdate.getDay()];
      
      // Zodiac sign
      const month = birthdate.getMonth() + 1;
      const day = birthdate.getDate();
      let zodiacSign = '';
      
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacSign = '♈ Aries';
      else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacSign = '♉ Taurus';
      else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacSign = '♊ Gemini';
      else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacSign = '♋ Cancer';
      else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacSign = '♌ Leo';
      else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacSign = '♍ Virgo';
      else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacSign = '♎ Libra';
      else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacSign = '♏ Scorpio';
      else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacSign = '♐ Sagittarius';
      else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacSign = '♑ Capricorn';
      else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacSign = '♒ Aquarius';
      else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) zodiacSign = '♓ Pisces';
      
      // Chinese Zodiac
      const chineseAnimals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
      const chineseIndex = (birthdate.getFullYear() - 1900) % 12;
      const chineseZodiac = chineseAnimals[chineseIndex];
      
      // Life Path Number (Numerology)
      const dateStr = birthdate.toISOString().split('T')[0].replace(/-/g, '');
      let lifePathSum = 0;
      for (let digit of dateStr) {
        lifePathSum += parseInt(digit);
      }
      while (lifePathSum > 9 && lifePathSum !== 11 && lifePathSum !== 22) {
        lifePathSum = lifePathSum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
      }
      const lifeNumber = 'Life Path ' + lifePathSum;
      
      return {
        ageYears: ageYears,
        ageMonths: totalMonths,
        ageDays: ageDays,
        ageHours: ageHours,
        nextBirthday: nextBirthday.toDateString(),
        daysUntil: daysUntil,
        dayOfWeek: dayOfWeek,
        zodiacSign: zodiacSign,
        chineseZodiac: chineseZodiac,
        lifeNumber: lifeNumber
      };
    `,
    variables: ['birthdate', 'birthTime'],
    description: 'Calculate detailed birthday information'
  }],
  localizedContent: {
    en: {
      title: 'Birthday Calculator',
      description: 'Calculate your exact age and discover interesting facts about your birthday',
      instructions: 'Enter your birth date to see detailed age calculations and zodiac information!',
      keywords: ['birthday calculator', 'age calculator', 'zodiac sign'],
      faq: [],
      article: '',
      meta: {
        title: 'Birthday Calculator - Age & Zodiac Info | BwnXCalculator',
        description: 'Calculate your exact age in years, months, days, and hours. Discover your zodiac sign, Chinese zodiac, and life path number.',
        keywords: 'birthday calculator, age calculator, zodiac sign, chinese zodiac, life path number'
      }
    },
    th: {
      title: 'คำนวณวันเกิด',
      description: 'คำนวณอายุที่แน่นอนและค้นพบข้อมูลน่าสนใจเกี่ยวกับวันเกิดของคุณ',
      instructions: 'ใส่วันเกิดเพื่อดูการคำนวณอายุและข้อมูลราศี!',
      keywords: ['คำนวณวันเกิด', 'คำนวณอายุ', 'หาราศี'],
      faq: [],
      article: ''
    }
  }
};

// Personality Test Calculator
export const personalityCalculator: Calculator = {
  id: 'personality-test',
  slug: 'personality',
  category: 'lifestyle',
  icon: '🧠',
  color: '#8B5CF6',
  inputs: [
    {
      key: 'social',
      label: 'I enjoy being around people',
      type: 'slider',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 3,
      unit: '1=Disagree, 5=Agree'
    },
    {
      key: 'organized',
      label: 'I like things to be organized',
      type: 'slider',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 3,
      unit: '1=Disagree, 5=Agree'
    },
    {
      key: 'creative',
      label: 'I enjoy creative activities',
      type: 'slider',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 3,
      unit: '1=Disagree, 5=Agree'
    },
    {
      key: 'emotional',
      label: 'I am in touch with my emotions',
      type: 'slider',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 3,
      unit: '1=Disagree, 5=Agree'
    },
    {
      key: 'adventurous',
      label: 'I like trying new things',
      type: 'slider',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 3,
      unit: '1=Disagree, 5=Agree'
    }
  ],
  outputs: [
    {
      key: 'personalityType',
      label: 'Personality Type',
      format: 'text',
      highlight: true
    },
    {
      key: 'extroversion',
      label: 'Extroversion',
      format: 'percentage',
      decimals: 0
    },
    {
      key: 'organization',
      label: 'Organization',
      format: 'percentage',
      decimals: 0
    },
    {
      key: 'creativity',
      label: 'Creativity',
      format: 'percentage',
      decimals: 0
    },
    {
      key: 'emotionalIntelligence',
      label: 'Emotional Intelligence',
      format: 'percentage',
      decimals: 0
    },
    {
      key: 'openness',
      label: 'Openness',
      format: 'percentage',
      decimals: 0
    },
    {
      key: 'description',
      label: 'Description',
      format: 'text'
    },
    {
      key: 'strengths',
      label: 'Strengths',
      format: 'text'
    },
    {
      key: 'advice',
      label: 'Personal Growth Advice',
      format: 'text'
    }
  ],
  formulas: [{
    key: 'calculate',
    expression: `
      // Calculate personality scores
      const extroversion = (inputs.social / 5) * 100;
      const organization = (inputs.organized / 5) * 100;
      const creativity = (inputs.creative / 5) * 100;
      const emotionalIntelligence = (inputs.emotional / 5) * 100;
      const openness = (inputs.adventurous / 5) * 100;
      
      // Determine personality type
      let personalityType = '';
      let description = '';
      let strengths = '';
      let advice = '';
      
      // Simple personality categorization
      const avgScore = (extroversion + organization + creativity + emotionalIntelligence + openness) / 5;
      
      if (extroversion >= 60 && creativity >= 60) {
        personalityType = '🌟 The Innovator';
        description = 'You are creative, social, and love bringing new ideas to life. You thrive in dynamic environments.';
        strengths = 'Leadership, Innovation, Communication, Inspiration';
        advice = 'Channel your energy into creative projects and collaborative ventures. Remember to also make time for reflection.';
      } else if (organization >= 60 && emotionalIntelligence >= 60) {
        personalityType = '⚖️ The Harmonizer';
        description = 'You balance structure with empathy, making you excellent at managing both tasks and relationships.';
        strengths = 'Planning, Empathy, Reliability, Team Building';
        advice = 'Your balanced approach is valuable. Continue developing both your analytical and interpersonal skills.';
      } else if (creativity >= 60 && openness >= 60) {
        personalityType = '🎨 The Creator';
        description = 'You have a rich imagination and love exploring new possibilities. Art and innovation are your domains.';
        strengths = 'Creativity, Adaptability, Vision, Original Thinking';
        advice = 'Embrace your creative nature while also developing practical skills to bring your visions to reality.';
      } else if (extroversion < 40 && organization >= 60) {
        personalityType = '📊 The Analyst';
        description = 'You prefer working independently with clear structure and goals. Detail-oriented and thorough.';
        strengths = 'Analysis, Focus, Precision, Problem-Solving';
        advice = 'Your analytical skills are powerful. Consider stepping out of your comfort zone occasionally for growth.';
      } else if (emotionalIntelligence >= 60 && extroversion >= 60) {
        personalityType = '💫 The Connector';
        description = 'You excel at understanding and connecting with others. Natural networker and relationship builder.';
        strengths = 'Empathy, Networking, Influence, Collaboration';
        advice = 'Use your people skills to create positive change. Remember to set boundaries for self-care.';
      } else if (avgScore >= 60) {
        personalityType = '🔮 The Versatile';
        description = 'You are well-rounded with strengths across multiple areas. Adaptable and balanced in approach.';
        strengths = 'Versatility, Balance, Adaptability, Learning';
        advice = 'Your balanced nature is an asset. Focus on developing one or two areas of expertise.';
      } else if (avgScore >= 40) {
        personalityType = '🌱 The Developer';
        description = 'You are on a journey of self-discovery and growth. Open to learning and developing new skills.';
        strengths = 'Growth Mindset, Potential, Curiosity, Flexibility';
        advice = 'Embrace your growth journey. Try new experiences to discover your passions and strengths.';
      } else {
        personalityType = '🧘 The Contemplator';
        description = 'You are introspective and thoughtful. You prefer observation and reflection over action.';
        strengths = 'Observation, Wisdom, Independence, Deep Thinking';
        advice = 'Your reflective nature provides unique insights. Consider sharing your perspectives more often.';
      }
      
      return {
        personalityType: personalityType,
        extroversion: extroversion,
        organization: organization,
        creativity: creativity,
        emotionalIntelligence: emotionalIntelligence,
        openness: openness,
        description: description,
        strengths: strengths,
        advice: advice
      };
    `,
    variables: ['social', 'organized', 'creative', 'emotional', 'adventurous'],
    description: 'Analyze personality traits'
  }],
  localizedContent: {
    en: {
      title: 'Personality Test Calculator',
      description: 'Discover your personality type and traits through a quick assessment',
      instructions: 'Rate each statement to reveal your personality profile!',
      keywords: ['personality test', 'personality calculator', 'personality type'],
      faq: [],
      article: '',
      meta: {
        title: 'Personality Test Calculator - Discover Your Type | BwnXCalculator',
        description: 'Take a quick personality test to discover your personality type, strengths, and growth areas. Free personality assessment.',
        keywords: 'personality test, personality calculator, personality type, personality assessment, traits test'
      }
    },
    th: {
      title: 'ทดสอบบุคลิกภาพ',
      description: 'ค้นพบประเภทบุคลิกภาพและลักษณะนิสัยของคุณ',
      instructions: 'ให้คะแนนแต่ละข้อเพื่อเปิดเผยบุคลิกภาพของคุณ!',
      keywords: ['ทดสอบบุคลิกภาพ', 'วิเคราะห์บุคลิกภาพ', 'แบบทดสอบ'],
      faq: [],
      article: ''
    }
  }
};

// Export all fun calculators
export const funCalculators = [
  loveCalculator,
  luckyNumberCalculator,
  birthdayCalculator,
  personalityCalculator
];