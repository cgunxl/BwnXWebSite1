import { Calculator } from '@/lib/types/calculator';

export const lifestyleCalculators: Calculator[] = [
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    category: 'lifestyle',
    icon: '🎂',
    color: '#EC4899',
    inputs: [
      {
        key: 'birthDate',
        label: 'Date of Birth',
        type: 'date',
        required: true,
        defaultValue: '1990-01-01'
      },
      {
        key: 'calculateDate',
        label: 'Calculate Age On',
        type: 'date',
        required: true,
        defaultValue: new Date().toISOString().split('T')[0]
      },
      {
        key: 'includeTime',
        label: 'Include Time',
        type: 'boolean',
        defaultValue: false,
        required: false
      },
      {
        key: 'birthTime',
        label: 'Time of Birth',
        type: 'time',
        defaultValue: '00:00',
        required: false,
        dependsOn: ['includeTime'],
        showWhen: { includeTime: true }
      },
      {
        key: 'currentTime',
        label: 'Current Time',
        type: 'time',
        defaultValue: '12:00',
        required: false,
        dependsOn: ['includeTime'],
        showWhen: { includeTime: true }
      }
    ],
    outputs: [
      {
        key: 'years',
        label: 'Age in Years',
        format: 'number',
        decimals: 0,
        description: 'Complete years lived',
        highlight: true
      },
      {
        key: 'months',
        label: 'Total Months',
        format: 'number',
        decimals: 0,
        description: 'Total months lived'
      },
      {
        key: 'days',
        label: 'Total Days',
        format: 'number',
        decimals: 0,
        description: 'Total days lived'
      },
      {
        key: 'hours',
        label: 'Total Hours',
        format: 'number',
        decimals: 0,
        description: 'Approximate hours lived'
      },
      {
        key: 'nextBirthday',
        label: 'Next Birthday',
        format: 'text',
        description: 'Days until next birthday'
      },
      {
        key: 'dayOfWeek',
        label: 'Born on',
        format: 'text',
        description: 'Day of the week'
      },
      {
        key: 'zodiacSign',
        label: 'Zodiac Sign',
        format: 'text',
        description: 'Western zodiac sign'
      },
      {
        key: 'chineseZodiac',
        label: 'Chinese Zodiac',
        format: 'text',
        description: 'Chinese zodiac animal'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          const birth = new Date(birthDate);
          const calc = new Date(calculateDate);
          
          // Add time if specified
          if (includeTime) {
            const [bHour, bMin] = birthTime.split(':').map(Number);
            const [cHour, cMin] = currentTime.split(':').map(Number);
            birth.setHours(bHour, bMin);
            calc.setHours(cHour, cMin);
          }
          
          // Calculate age
          let years = calc.getFullYear() - birth.getFullYear();
          let months = calc.getMonth() - birth.getMonth();
          let days = calc.getDate() - birth.getDate();
          
          if (days < 0) {
            months--;
            const lastMonth = new Date(calc.getFullYear(), calc.getMonth(), 0);
            days += lastMonth.getDate();
          }
          
          if (months < 0) {
            years--;
            months += 12;
          }
          
          // Total calculations
          const totalDays = Math.floor((calc - birth) / (1000 * 60 * 60 * 24));
          const totalMonths = years * 12 + months;
          const totalHours = Math.floor((calc - birth) / (1000 * 60 * 60));
          
          // Next birthday
          let nextBday = new Date(calc.getFullYear(), birth.getMonth(), birth.getDate());
          if (nextBday < calc) {
            nextBday = new Date(calc.getFullYear() + 1, birth.getMonth(), birth.getDate());
          }
          const daysToNext = Math.ceil((nextBday - calc) / (1000 * 60 * 60 * 24));
          const nextBirthday = daysToNext + ' days';
          
          // Day of week born
          const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const dayOfWeek = weekDays[birth.getDay()];
          
          // Zodiac signs
          const zodiacSigns = [
            { name: 'Capricorn', start: [12, 22], end: [1, 19] },
            { name: 'Aquarius', start: [1, 20], end: [2, 18] },
            { name: 'Pisces', start: [2, 19], end: [3, 20] },
            { name: 'Aries', start: [3, 21], end: [4, 19] },
            { name: 'Taurus', start: [4, 20], end: [5, 20] },
            { name: 'Gemini', start: [5, 21], end: [6, 20] },
            { name: 'Cancer', start: [6, 21], end: [7, 22] },
            { name: 'Leo', start: [7, 23], end: [8, 22] },
            { name: 'Virgo', start: [8, 23], end: [9, 22] },
            { name: 'Libra', start: [9, 23], end: [10, 22] },
            { name: 'Scorpio', start: [10, 23], end: [11, 21] },
            { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
          ];
          
          const month = birth.getMonth() + 1;
          const day = birth.getDate();
          let zodiacSign = 'Capricorn';
          
          for (const sign of zodiacSigns) {
            if ((month === sign.start[0] && day >= sign.start[1]) ||
                (month === sign.end[0] && day <= sign.end[1])) {
              zodiacSign = sign.name;
              break;
            }
          }
          
          // Chinese zodiac
          const chineseAnimals = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
          const chineseZodiac = chineseAnimals[birth.getFullYear() % 12];
          
          return {
            years,
            months: totalMonths,
            days: totalDays,
            hours: totalHours,
            nextBirthday,
            dayOfWeek,
            zodiacSign,
            chineseZodiac
          };
        `,
        description: 'Calculate age and related information'
      }
    ],
    localizedContent: {
      en: {
        title: 'Age Calculator',
        description: 'Calculate exact age in years, months, days, and discover zodiac signs',
        keywords: ['age calculator', 'birthday calculator', 'how old am i', 'zodiac sign', 'age in days'],
        faq: [
          {
            question: 'How is age calculated exactly?',
            answer: 'Age is calculated by comparing birth date to the selected date, accounting for leap years and varying month lengths.'
          },
          {
            question: 'What is the Chinese zodiac?',
            answer: 'The Chinese zodiac assigns an animal to each year in a 12-year cycle. Your animal is determined by your birth year.'
          },
          {
            question: 'Why include time in age calculation?',
            answer: 'Including time gives precise age down to hours and minutes, useful for newborns or exact age requirements.'
          },
          {
            question: 'How accurate is the zodiac sign calculation?',
            answer: 'Western zodiac dates are approximate as they vary slightly each year. For exact results, consult an ephemeris.'
          }
        ],
        article: {
          title: 'Understanding Age Calculations',
          introduction: 'Age calculation seems simple but involves interesting complexities and cultural variations.',
          sections: [
            {
              heading: 'Cultural Differences',
              content: 'In Korea, everyone is 1 year old at birth and gains a year on New Year\'s Day. In China, age counting varies by region.'
            },
            {
              heading: 'Legal Age',
              content: 'Different countries have different ages for majority (18-21), driving (14-18), and other rights. Always check local laws.'
            },
            {
              heading: 'Fun Facts',
              content: 'If you\'ve lived 1 billion seconds, you\'re about 31.7 years old. The oldest verified person lived to 122 years.'
            }
          ],
          conclusion: 'Age is more than just a number - it\'s a measure of experiences and milestones.',
          wordCount: 280
        }
      },
      th: {
        title: 'คำนวณอายุ',
        description: 'คำนวณอายุแม่นยำเป็นปี เดือน วัน และดูราศีของคุณ',
        keywords: ['คำนวณอายุ', 'คำนวณวันเกิด', 'อายุกี่วัน', 'ราศี', 'นักษัตร'],
        faq: [
          {
            question: 'คำนวณอายุแม่นยำได้อย่างไร?',
            answer: 'คำนวณอายุโดยเปรียบเทียบวันเกิดกับวันที่เลือก คำนึงถึงปีอธิกสุรทินและความยาวเดือนที่ต่างกัน'
          },
          {
            question: 'ปีนักษัตรจีนคืออะไร?',
            answer: 'ปีนักษัตรจีนกำหนดสัตว์ให้แต่ละปีในวงจร 12 ปี นักษัตรของคุณขึ้นอยู่กับปีเกิด'
          }
        ],
        article: {
          title: 'เข้าใจการคำนวณอายุ',
          introduction: 'การคำนวณอายุดูง่ายแต่มีความซับซ้อนและความแตกต่างทางวัฒนธรรม',
          sections: [
            {
              heading: 'ความแตกต่างทางวัฒนธรรม',
              content: 'ในเกาหลี ทุกคนอายุ 1 ขวบตั้งแต่เกิดและเพิ่มอีก 1 ปีในวันปีใหม่ ในจีนการนับอายุแตกต่างตามภูมิภาค'
            }
          ],
          conclusion: 'อายุไม่ใช่แค่ตัวเลข แต่เป็นการวัดประสบการณ์และความสำเร็จในชีวิต',
          wordCount: 250
        }
      }
    }
  },
  {
    id: 'tip-calculator',
    slug: 'tip-calculator',
    category: 'lifestyle',
    icon: '💵',
    color: '#10B981',
    inputs: [
      {
        key: 'billAmount',
        label: 'Bill Amount',
        type: 'number',
        defaultValue: 100,
        min: 0,
        max: 100000,
        step: 0.01,
        required: true,
        unit: '$'
      },
      {
        key: 'tipPercentage',
        label: 'Tip Percentage',
        type: 'slider',
        defaultValue: 15,
        min: 0,
        max: 50,
        step: 1,
        required: true,
        unit: '%'
      },
      {
        key: 'numberOfPeople',
        label: 'Number of People',
        type: 'number',
        defaultValue: 1,
        min: 1,
        max: 100,
        step: 1,
        required: true
      },
      {
        key: 'roundUp',
        label: 'Round Up Total',
        type: 'boolean',
        defaultValue: false,
        required: false
      },
      {
        key: 'serviceQuality',
        label: 'Service Quality Guide',
        type: 'select',
        defaultValue: 'good',
        required: false,
        options: [
          { value: 'poor', label: 'Poor (10%)' },
          { value: 'fair', label: 'Fair (15%)' },
          { value: 'good', label: 'Good (18%)' },
          { value: 'excellent', label: 'Excellent (20%)' },
          { value: 'exceptional', label: 'Exceptional (25%)' }
        ]
      }
    ],
    outputs: [
      {
        key: 'tipAmount',
        label: 'Tip Amount',
        format: 'currency',
        decimals: 2,
        description: 'Total tip',
        highlight: true
      },
      {
        key: 'totalAmount',
        label: 'Total Amount',
        format: 'currency',
        decimals: 2,
        description: 'Bill + Tip',
        highlight: true
      },
      {
        key: 'tipPerPerson',
        label: 'Tip Per Person',
        format: 'currency',
        decimals: 2,
        description: 'Individual tip share'
      },
      {
        key: 'totalPerPerson',
        label: 'Total Per Person',
        format: 'currency',
        decimals: 2,
        description: 'Individual total'
      },
      {
        key: 'suggestedAmounts',
        label: 'Quick Options',
        format: 'text',
        description: 'Common tip amounts'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate tip
          let tipAmount = billAmount * (tipPercentage / 100);
          let totalAmount = billAmount + tipAmount;
          
          // Round up if requested
          if (roundUp) {
            totalAmount = Math.ceil(totalAmount);
            tipAmount = totalAmount - billAmount;
          }
          
          // Per person calculations
          const tipPerPerson = tipAmount / numberOfPeople;
          const totalPerPerson = totalAmount / numberOfPeople;
          
          // Suggested amounts for quick reference
          const suggested = [];
          [10, 15, 18, 20, 25].forEach(pct => {
            const amt = billAmount * (pct / 100);
            suggested.push(pct + '%: $' + amt.toFixed(2));
          });
          const suggestedAmounts = suggested.join(', ');
          
          return {
            tipAmount,
            totalAmount,
            tipPerPerson,
            totalPerPerson,
            suggestedAmounts
          };
        `,
        description: 'Calculate tip and split among people'
      }
    ],
    localizedContent: {
      en: {
        title: 'Tip Calculator',
        description: 'Calculate tips and split bills among multiple people',
        keywords: ['tip calculator', 'gratuity calculator', 'bill splitter', 'restaurant tip', 'tipping calculator'],
        faq: [
          {
            question: 'What is standard tipping in the USA?',
            answer: 'Standard tips: Restaurants 15-20%, Bars $1-2 per drink or 15-20%, Delivery 10-15%, Hair/Spa 15-20%, Taxi/Uber 10-15%.'
          },
          {
            question: 'Should I tip on tax?',
            answer: 'Opinions vary. Some tip on pre-tax amount, others on total. When in doubt, tip on the total for better service appreciation.'
          },
          {
            question: 'How does tipping work internationally?',
            answer: 'Tipping varies greatly: USA/Canada expect 15-20%, Europe often includes service charge, Asia varies (Japan considers tipping rude).'
          },
          {
            question: 'What if service was poor?',
            answer: 'Even for poor service, 10% is customary in the USA as servers rely on tips. Speak to management about service issues.'
          }
        ],
        article: {
          title: 'The Complete Guide to Tipping',
          introduction: 'Tipping customs vary by country and service type. Understanding proper etiquette ensures fair compensation.',
          sections: [
            {
              heading: 'Why We Tip',
              content: 'In the USA, tips supplement low base wages for service workers. The federal tipped minimum wage is only $2.13/hour.'
            },
            {
              heading: 'Tipping Guidelines',
              content: 'Restaurant servers: 15-20%, Bartenders: $1-2 per drink, Food delivery: 10-15%, Hotel housekeeping: $2-5 per day.'
            },
            {
              heading: 'Modern Tipping',
              content: 'Digital payments make tipping easier. Many apps suggest tip amounts. Consider tipping more during holidays or bad weather.'
            }
          ],
          conclusion: 'Tipping fairly shows appreciation for service and supports workers who depend on gratuities.',
          wordCount: 300
        }
      },
      th: {
        title: 'คำนวณทิป',
        description: 'คำนวณทิปและแบ่งบิลสำหรับหลายคน',
        keywords: ['คำนวณทิป', 'ค่าบริการ', 'แบ่งบิล', 'ทิปร้านอาหาร', 'คำนวณค่าบริการ'],
        faq: [
          {
            question: 'ทิปมาตรฐานในไทยเท่าไหร่?',
            answer: 'ในไทยไม่บังคับทิป แต่นิยม: ร้านอาหารหรู 10%, ร้านทั่วไป ทิปตามใจ, บริการส่งอาหาร 20-50 บาท, สปา/นวด 50-100 บาท'
          },
          {
            question: 'ต้องให้ทิปในไทยไหม?',
            answer: 'ไม่บังคับแต่เป็นมารยาท ร้านหรูอาจรวมค่าบริการ 10% อยู่แล้ว ดูในบิลก่อนให้ทิปเพิ่ม'
          }
        ],
        article: {
          title: 'คู่มือการให้ทิปฉบับสมบูรณ์',
          introduction: 'การให้ทิปแตกต่างกันตามประเทศและประเภทบริการ การเข้าใจมารยาทช่วยให้เหมาะสม',
          sections: [
            {
              heading: 'ทำไมต้องให้ทิป',
              content: 'ในสหรัฐฯ ทิปเป็นรายได้หลักของพนักงานบริการ ในไทยเป็นการแสดงความพอใจในบริการ'
            }
          ],
          conclusion: 'การให้ทิปอย่างเหมาะสมแสดงความขอบคุณและสนับสนุนผู้ให้บริการ',
          wordCount: 250
        }
      }
    }
  },
  {
    id: 'fuel-cost-calculator',
    slug: 'fuel-cost-calculator',
    category: 'lifestyle',
    icon: '⛽',
    color: '#F59E0B',
    inputs: [
      {
        key: 'distance',
        label: 'Trip Distance',
        type: 'number',
        defaultValue: 100,
        min: 0,
        max: 100000,
        step: 0.1,
        required: true,
        unit: 'km'
      },
      {
        key: 'fuelEfficiency',
        label: 'Fuel Efficiency',
        type: 'number',
        defaultValue: 8,
        min: 0.1,
        max: 100,
        step: 0.1,
        required: true,
        unit: 'L/100km',
        tooltip: 'Lower is better'
      },
      {
        key: 'fuelPrice',
        label: 'Fuel Price',
        type: 'number',
        defaultValue: 1.5,
        min: 0,
        max: 10,
        step: 0.01,
        required: true,
        unit: '$/L'
      },
      {
        key: 'numberOfPeople',
        label: 'Number of People',
        type: 'number',
        defaultValue: 1,
        min: 1,
        max: 10,
        step: 1,
        required: false,
        tooltip: 'For cost splitting'
      },
      {
        key: 'returnTrip',
        label: 'Return Trip',
        type: 'boolean',
        defaultValue: false,
        required: false
      },
      {
        key: 'tollCost',
        label: 'Toll Costs',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 1000,
        step: 0.01,
        required: false,
        unit: '$'
      }
    ],
    outputs: [
      {
        key: 'fuelNeeded',
        label: 'Fuel Needed',
        format: 'number',
        decimals: 2,
        unit: 'L',
        description: 'Total fuel required'
      },
      {
        key: 'fuelCost',
        label: 'Fuel Cost',
        format: 'currency',
        decimals: 2,
        description: 'Cost of fuel',
        highlight: true
      },
      {
        key: 'totalCost',
        label: 'Total Trip Cost',
        format: 'currency',
        decimals: 2,
        description: 'Including tolls',
        highlight: true
      },
      {
        key: 'costPerPerson',
        label: 'Cost Per Person',
        format: 'currency',
        decimals: 2,
        description: 'Split cost'
      },
      {
        key: 'costPerKm',
        label: 'Cost Per Kilometer',
        format: 'currency',
        decimals: 3,
        description: 'Unit cost'
      },
      {
        key: 'co2Emissions',
        label: 'CO₂ Emissions',
        format: 'number',
        decimals: 2,
        unit: 'kg',
        description: 'Estimated emissions'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Adjust distance for return trip
          const totalDistance = returnTrip ? distance * 2 : distance;
          
          // Calculate fuel needed
          const fuelNeeded = (totalDistance * fuelEfficiency) / 100;
          
          // Calculate costs
          const fuelCost = fuelNeeded * fuelPrice;
          const totalCost = fuelCost + tollCost;
          const costPerPerson = totalCost / numberOfPeople;
          const costPerKm = totalCost / totalDistance;
          
          // Estimate CO2 emissions (average 2.31 kg CO2 per liter of gasoline)
          const co2Emissions = fuelNeeded * 2.31;
          
          return {
            fuelNeeded,
            fuelCost,
            totalCost,
            costPerPerson,
            costPerKm,
            co2Emissions
          };
        `,
        description: 'Calculate trip fuel costs and emissions'
      }
    ],
    localizedContent: {
      en: {
        title: 'Fuel Cost Calculator',
        description: 'Calculate trip fuel costs, split expenses, and estimate CO₂ emissions',
        keywords: ['fuel cost calculator', 'gas calculator', 'trip cost', 'fuel consumption', 'road trip calculator'],
        faq: [
          {
            question: 'How do I find my car\'s fuel efficiency?',
            answer: 'Check your owner\'s manual, look for the sticker on your car, or calculate it: fill tank, note odometer, drive normally, refill and divide distance by fuel used.'
          },
          {
            question: 'What affects fuel efficiency?',
            answer: 'Speed (optimal 50-80 km/h), acceleration style, tire pressure, vehicle load, air conditioning, and road conditions all impact fuel consumption.'
          },
          {
            question: 'How accurate is the CO₂ calculation?',
            answer: 'It\'s an estimate using average emissions. Actual emissions vary by fuel type: gasoline ~2.31 kg/L, diesel ~2.68 kg/L.'
          }
        ],
        article: {
          title: 'Optimize Your Fuel Costs',
          introduction: 'Understanding fuel costs helps budget trips and reduce environmental impact.',
          sections: [
            {
              heading: 'Improve Fuel Efficiency',
              content: 'Maintain steady speed, avoid rapid acceleration, keep tires inflated, remove excess weight, use cruise control on highways.'
            },
            {
              heading: 'Planning Efficient Routes',
              content: 'Use GPS for shortest routes, avoid rush hour, combine errands, consider carpooling. Highway driving is generally more efficient than city.'
            }
          ],
          conclusion: 'Small changes in driving habits can significantly reduce fuel costs and emissions.',
          wordCount: 280
        }
      }
    }
  },
  {
    id: 'random-number-generator',
    slug: 'random-number-generator',
    category: 'lifestyle',
    icon: '🎲',
    color: '#8B5CF6',
    inputs: [
      {
        key: 'min',
        label: 'Minimum Value',
        type: 'number',
        defaultValue: 1,
        step: 1,
        required: true
      },
      {
        key: 'max',
        label: 'Maximum Value',
        type: 'number',
        defaultValue: 100,
        step: 1,
        required: true
      },
      {
        key: 'count',
        label: 'How Many Numbers',
        type: 'number',
        defaultValue: 1,
        min: 1,
        max: 1000,
        step: 1,
        required: true
      },
      {
        key: 'allowDuplicates',
        label: 'Allow Duplicates',
        type: 'boolean',
        defaultValue: true,
        required: false
      },
      {
        key: 'sortResults',
        label: 'Sort Results',
        type: 'select',
        defaultValue: 'none',
        required: false,
        options: [
          { value: 'none', label: 'No Sorting' },
          { value: 'asc', label: 'Ascending' },
          { value: 'desc', label: 'Descending' }
        ]
      }
    ],
    outputs: [
      {
        key: 'numbers',
        label: 'Random Numbers',
        format: 'text',
        description: 'Generated numbers',
        highlight: true
      },
      {
        key: 'sum',
        label: 'Sum',
        format: 'number',
        decimals: 0,
        description: 'Total of all numbers'
      },
      {
        key: 'average',
        label: 'Average',
        format: 'number',
        decimals: 2,
        description: 'Mean value'
      },
      {
        key: 'min_generated',
        label: 'Minimum',
        format: 'number',
        decimals: 0,
        description: 'Smallest number'
      },
      {
        key: 'max_generated',
        label: 'Maximum',
        format: 'number',
        decimals: 0,
        description: 'Largest number'
      }
    ],
    formulas: [
      {
        key: 'generate',
        expression: `
          const results = [];
          const range = max - min + 1;
          
          // Check if unique numbers are possible
          if (!allowDuplicates && count > range) {
            return {
              numbers: 'Error: Not enough unique numbers in range',
              sum: 0,
              average: 0,
              min_generated: 0,
              max_generated: 0
            };
          }
          
          // Generate numbers
          if (!allowDuplicates) {
            // Generate unique numbers
            const available = [];
            for (let i = min; i <= max; i++) {
              available.push(i);
            }
            
            for (let i = 0; i < count; i++) {
              const index = Math.floor(Math.random() * available.length);
              results.push(available[index]);
              available.splice(index, 1);
            }
          } else {
            // Allow duplicates
            for (let i = 0; i < count; i++) {
              results.push(Math.floor(Math.random() * range) + min);
            }
          }
          
          // Sort if requested
          if (sortResults === 'asc') {
            results.sort((a, b) => a - b);
          } else if (sortResults === 'desc') {
            results.sort((a, b) => b - a);
          }
          
          // Calculate statistics
          const sum = results.reduce((a, b) => a + b, 0);
          const average = sum / results.length;
          const min_generated = Math.min(...results);
          const max_generated = Math.max(...results);
          
          return {
            numbers: results.join(', '),
            sum,
            average,
            min_generated,
            max_generated
          };
        `,
        description: 'Generate random numbers with options'
      }
    ],
    localizedContent: {
      en: {
        title: 'Random Number Generator',
        description: 'Generate random numbers for lottery, games, statistics, or decision making',
        keywords: ['random number generator', 'RNG', 'lottery numbers', 'random picker', 'number generator'],
        faq: [
          {
            question: 'How random are these numbers?',
            answer: 'We use JavaScript\'s Math.random() which is pseudorandom - good for games and general use, but not for cryptography.'
          },
          {
            question: 'Can I use this for lottery numbers?',
            answer: 'Yes! Set the range to match your lottery (e.g., 1-49) and generate without duplicates for the number of balls drawn.'
          },
          {
            question: 'What\'s the difference between true and pseudo random?',
            answer: 'True random comes from physical phenomena (radioactive decay, atmospheric noise). Pseudorandom uses algorithms - predictable if you know the seed, but appears random.'
          }
        ],
        article: {
          title: 'Understanding Random Number Generation',
          introduction: 'Random numbers are essential for games, simulations, and decision-making.',
          sections: [
            {
              heading: 'Applications',
              content: 'Use random numbers for: lottery picks, raffles, game dice, statistical sampling, password generation, and fair decision-making.'
            },
            {
              heading: 'Fairness',
              content: 'Each number in the range has equal probability. With no duplicates, it\'s like drawing from a hat without replacement.'
            }
          ],
          conclusion: 'Random number generators are powerful tools for fair and unbiased selection.',
          wordCount: 250
        }
      }
    }
  }
];

// Export function to get all lifestyle calculators
export function getLifestyleCalculators(): Calculator[] {
  return lifestyleCalculators;
}

// Export function to get calculator by slug
export function getLifestyleCalculatorBySlug(slug: string): Calculator | undefined {
  return lifestyleCalculators.find(calc => calc.slug === slug);
}