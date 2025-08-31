import { Calculator } from '@/lib/types/calculator';

export const mathCalculators: Calculator[] = [
  {
    id: 'average-calculator',
    slug: 'average-calculator',
    category: 'mathematics',
    icon: '📊',
    color: '#F59E0B',
    inputs: [
      {
        key: 'numbers',
        label: 'Enter Numbers',
        type: 'textarea',
        placeholder: 'Enter numbers separated by commas or spaces\nExample: 10, 20, 30, 40, 50',
        defaultValue: '10, 20, 30, 40, 50',
        required: true,
        rows: 4
      },
      {
        key: 'calculationType',
        label: 'Type of Average',
        type: 'select',
        defaultValue: 'all',
        required: true,
        options: [
          { value: 'all', label: 'All Types' },
          { value: 'mean', label: 'Mean (Arithmetic Average)' },
          { value: 'median', label: 'Median (Middle Value)' },
          { value: 'mode', label: 'Mode (Most Frequent)' },
          { value: 'geometric', label: 'Geometric Mean' },
          { value: 'harmonic', label: 'Harmonic Mean' }
        ]
      },
      {
        key: 'precision',
        label: 'Decimal Places',
        type: 'number',
        defaultValue: 2,
        min: 0,
        max: 10,
        step: 1,
        required: true
      }
    ],
    outputs: [
      {
        key: 'mean',
        label: 'Mean (Average)',
        format: 'number',
        decimals: 2,
        description: 'Arithmetic average',
        highlight: true
      },
      {
        key: 'median',
        label: 'Median',
        format: 'number',
        decimals: 2,
        description: 'Middle value'
      },
      {
        key: 'mode',
        label: 'Mode',
        format: 'text',
        description: 'Most frequent value(s)'
      },
      {
        key: 'range',
        label: 'Range',
        format: 'number',
        decimals: 2,
        description: 'Max - Min'
      },
      {
        key: 'count',
        label: 'Count',
        format: 'number',
        decimals: 0,
        description: 'Number of values'
      },
      {
        key: 'sum',
        label: 'Sum',
        format: 'number',
        decimals: 2,
        description: 'Total of all values'
      },
      {
        key: 'min',
        label: 'Minimum',
        format: 'number',
        decimals: 2,
        description: 'Smallest value'
      },
      {
        key: 'max',
        label: 'Maximum',
        format: 'number',
        decimals: 2,
        description: 'Largest value'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Parse numbers from input
          const nums = numbers
            .replace(/[^0-9.,\\-\\s]/g, '')
            .split(/[,\\s]+/)
            .filter(n => n)
            .map(n => parseFloat(n))
            .filter(n => !isNaN(n));
          
          if (nums.length === 0) {
            return { mean: 0, median: 0, mode: 'No data', range: 0, count: 0, sum: 0, min: 0, max: 0 };
          }
          
          // Sort for median calculation
          const sorted = [...nums].sort((a, b) => a - b);
          
          // Calculate mean
          const sum = nums.reduce((a, b) => a + b, 0);
          const mean = sum / nums.length;
          
          // Calculate median
          let median;
          const mid = Math.floor(sorted.length / 2);
          if (sorted.length % 2 === 0) {
            median = (sorted[mid - 1] + sorted[mid]) / 2;
          } else {
            median = sorted[mid];
          }
          
          // Calculate mode
          const frequency = {};
          nums.forEach(n => {
            frequency[n] = (frequency[n] || 0) + 1;
          });
          const maxFreq = Math.max(...Object.values(frequency));
          const modes = Object.keys(frequency)
            .filter(k => frequency[k] === maxFreq)
            .map(k => parseFloat(k));
          const mode = modes.length === nums.length ? 'No mode' : modes.join(', ');
          
          // Calculate range
          const min = Math.min(...nums);
          const max = Math.max(...nums);
          const range = max - min;
          
          return {
            mean: Math.round(mean * Math.pow(10, precision)) / Math.pow(10, precision),
            median: Math.round(median * Math.pow(10, precision)) / Math.pow(10, precision),
            mode,
            range: Math.round(range * Math.pow(10, precision)) / Math.pow(10, precision),
            count: nums.length,
            sum: Math.round(sum * Math.pow(10, precision)) / Math.pow(10, precision),
            min: Math.round(min * Math.pow(10, precision)) / Math.pow(10, precision),
            max: Math.round(max * Math.pow(10, precision)) / Math.pow(10, precision)
          };
        `,
        description: 'Calculate various types of averages and statistics'
      }
    ],
    graph: {
      type: 'histogram',
      title: 'Data Distribution',
      data: ['numbers'],
      xAxis: 'Value',
      yAxis: 'Frequency',
      colors: ['#F59E0B']
    },
    localizedContent: {
      en: {
        title: 'Average Calculator - Mean, Median, Mode',
        description: 'Calculate mean, median, mode, and other statistics from your data set',
        keywords: ['average calculator', 'mean calculator', 'median calculator', 'mode calculator', 'statistics calculator'],
        faq: [
          {
            question: 'What is the difference between mean, median, and mode?',
            answer: 'Mean is the arithmetic average (sum/count). Median is the middle value when sorted. Mode is the most frequent value.'
          },
          {
            question: 'When should I use median instead of mean?',
            answer: 'Use median when you have outliers that skew the mean. For example, income data often uses median because a few high earners skew the mean.'
          },
          {
            question: 'Can there be multiple modes?',
            answer: 'Yes! A dataset can be bimodal (2 modes) or multimodal (multiple modes) if several values appear with the same highest frequency.'
          },
          {
            question: 'What does "no mode" mean?',
            answer: 'If all values appear exactly once, there is no mode since no value is more frequent than others.'
          }
        ],
        article: {
          title: 'Understanding Different Types of Averages',
          introduction: 'Not all averages are created equal. Choosing the right type of average depends on your data and what you want to measure.',
          sections: [
            {
              heading: 'Mean: The Classic Average',
              content: 'The mean adds all values and divides by count. It\'s best for normally distributed data without outliers. Use for test scores, temperatures, and measurements.'
            },
            {
              heading: 'Median: The Middle Ground',
              content: 'The median finds the middle value. It\'s resistant to outliers, making it ideal for income, house prices, and skewed distributions.'
            },
            {
              heading: 'Mode: The Popular Choice',
              content: 'The mode identifies the most common value. Use it for categorical data, shoe sizes, survey responses, and finding typical values.'
            }
          ],
          conclusion: 'Choose your average wisely: mean for symmetric data, median for skewed data, mode for categories.',
          wordCount: 320
        }
      },
      th: {
        title: 'คำนวณค่าเฉลี่ย - Mean, Median, Mode',
        description: 'คำนวณค่าเฉลี่ย มัธยฐาน ฐานนิยม และสถิติอื่นๆ จากชุดข้อมูล',
        keywords: ['คำนวณค่าเฉลี่ย', 'หาค่าเฉลี่ย', 'มัธยฐาน', 'ฐานนิยม', 'สถิติ'],
        faq: [
          {
            question: 'Mean, Median, Mode ต่างกันอย่างไร?',
            answer: 'Mean คือค่าเฉลี่ยเลขคณิต (ผลรวม/จำนวน) Median คือค่ากลางเมื่อเรียงลำดับ Mode คือค่าที่พบบ่อยที่สุด'
          },
          {
            question: 'เมื่อไหร่ควรใช้ Median แทน Mean?',
            answer: 'ใช้ Median เมื่อมีค่าผิดปกติที่ทำให้ Mean เบี่ยงเบน เช่น ข้อมูลรายได้มักใช้ Median เพราะคนรวยน้อยคนทำให้ Mean สูงเกินจริง'
          }
        ],
        article: {
          title: 'เข้าใจค่าเฉลี่ยแบบต่างๆ',
          introduction: 'ค่าเฉลี่ยมีหลายแบบ การเลือกใช้ขึ้นอยู่กับข้อมูลและสิ่งที่ต้องการวัด',
          sections: [
            {
              heading: 'Mean: ค่าเฉลี่ยคลาสสิก',
              content: 'Mean คือผลรวมหารจำนวน เหมาะกับข้อมูลกระจายปกติไม่มีค่าผิดปกติ ใช้กับคะแนนสอบ อุณหภูมิ การวัด'
            }
          ],
          conclusion: 'เลือกค่าเฉลี่ยให้เหมาะสม: Mean สำหรับข้อมูลสมมาตร Median สำหรับข้อมูลเบ้ Mode สำหรับหมวดหมู่',
          wordCount: 280
        }
      }
    }
  },
  {
    id: 'standard-deviation-calculator',
    slug: 'standard-deviation-calculator',
    category: 'mathematics',
    icon: '📈',
    color: '#EF4444',
    inputs: [
      {
        key: 'data',
        label: 'Data Set',
        type: 'textarea',
        placeholder: 'Enter numbers separated by commas\nExample: 2, 4, 6, 8, 10',
        defaultValue: '2, 4, 6, 8, 10, 12, 14',
        required: true,
        rows: 4
      },
      {
        key: 'sampleType',
        label: 'Data Type',
        type: 'radio',
        defaultValue: 'sample',
        required: true,
        options: [
          { value: 'sample', label: 'Sample (n-1)' },
          { value: 'population', label: 'Population (n)' }
        ]
      }
    ],
    outputs: [
      {
        key: 'standardDeviation',
        label: 'Standard Deviation',
        format: 'number',
        decimals: 4,
        description: 'Measure of spread',
        highlight: true
      },
      {
        key: 'variance',
        label: 'Variance',
        format: 'number',
        decimals: 4,
        description: 'Square of standard deviation'
      },
      {
        key: 'mean',
        label: 'Mean',
        format: 'number',
        decimals: 4,
        description: 'Average value'
      },
      {
        key: 'count',
        label: 'N',
        format: 'number',
        decimals: 0,
        description: 'Number of data points'
      },
      {
        key: 'sumOfSquares',
        label: 'Sum of Squares',
        format: 'number',
        decimals: 4,
        description: 'Σ(x - μ)²'
      },
      {
        key: 'coefficientOfVariation',
        label: 'Coefficient of Variation',
        format: 'percentage',
        decimals: 2,
        description: 'CV = (σ/μ) × 100'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Parse data
          const nums = data
            .replace(/[^0-9.,\\-\\s]/g, '')
            .split(/[,\\s]+/)
            .filter(n => n)
            .map(n => parseFloat(n))
            .filter(n => !isNaN(n));
          
          if (nums.length === 0) {
            return { 
              standardDeviation: 0, 
              variance: 0, 
              mean: 0, 
              count: 0, 
              sumOfSquares: 0,
              coefficientOfVariation: 0 
            };
          }
          
          const n = nums.length;
          const mean = nums.reduce((a, b) => a + b, 0) / n;
          
          // Calculate sum of squares
          const sumOfSquares = nums.reduce((sum, x) => {
            return sum + Math.pow(x - mean, 2);
          }, 0);
          
          // Calculate variance (sample vs population)
          const divisor = sampleType === 'sample' ? n - 1 : n;
          const variance = sumOfSquares / divisor;
          
          // Calculate standard deviation
          const standardDeviation = Math.sqrt(variance);
          
          // Calculate coefficient of variation
          const coefficientOfVariation = mean !== 0 ? (standardDeviation / Math.abs(mean)) * 100 : 0;
          
          return {
            standardDeviation,
            variance,
            mean,
            count: n,
            sumOfSquares,
            coefficientOfVariation
          };
        `,
        description: 'Calculate standard deviation and variance'
      }
    ],
    graph: {
      type: 'scatter',
      title: 'Data Distribution with Standard Deviation',
      data: ['data'],
      showAverage: true,
      showDistribution: true,
      colors: ['#EF4444', '#10B981']
    },
    localizedContent: {
      en: {
        title: 'Standard Deviation Calculator',
        description: 'Calculate standard deviation, variance, and coefficient of variation',
        keywords: ['standard deviation calculator', 'variance calculator', 'statistics', 'spread calculator'],
        faq: [
          {
            question: 'What is standard deviation?',
            answer: 'Standard deviation measures how spread out numbers are from their average. A low SD means data points are close to the mean, while high SD indicates more spread.'
          },
          {
            question: 'Sample vs Population standard deviation?',
            answer: 'Sample SD divides by (n-1) for unbiased estimation when you have a subset of data. Population SD divides by n when you have all data points.'
          },
          {
            question: 'What is a good standard deviation?',
            answer: 'It depends on context. For test scores, SD of 10-15 is typical. For investment returns, lower SD means less volatility (risk).'
          },
          {
            question: 'What is coefficient of variation?',
            answer: 'CV = (SD/Mean) × 100%. It allows comparing variation between datasets with different units or scales. CV < 1 is low variation.'
          }
        ],
        article: {
          title: 'Understanding Standard Deviation',
          introduction: 'Standard deviation is crucial for understanding data variability in statistics, finance, and quality control.',
          sections: [
            {
              heading: 'The 68-95-99.7 Rule',
              content: 'In normal distributions: 68% of data falls within 1 SD, 95% within 2 SD, and 99.7% within 3 SD of the mean.'
            },
            {
              heading: 'Applications',
              content: 'Use SD for: risk assessment (finance), quality control (manufacturing), grading curves (education), and measurement error (science).'
            },
            {
              heading: 'Interpreting Results',
              content: 'Compare SD to the mean. If SD > mean, data is highly variable. If SD < 0.5×mean, data is relatively consistent.'
            }
          ],
          conclusion: 'Standard deviation helps identify outliers, assess risk, and understand data reliability.',
          wordCount: 300
        }
      },
      th: {
        title: 'คำนวณส่วนเบี่ยงเบนมาตรฐาน',
        description: 'คำนวณส่วนเบี่ยงเบนมาตรฐาน ความแปรปรวน และสัมประสิทธิ์การแปรผัน',
        keywords: ['ส่วนเบี่ยงเบนมาตรฐาน', 'ความแปรปรวน', 'สถิติ', 'SD'],
        faq: [
          {
            question: 'ส่วนเบี่ยงเบนมาตรฐานคืออะไร?',
            answer: 'SD วัดการกระจายของข้อมูลจากค่าเฉลี่ย SD ต่ำ = ข้อมูลอยู่ใกล้ค่าเฉลี่ย SD สูง = ข้อมูลกระจายมาก'
          },
          {
            question: 'Sample vs Population ต่างกันอย่างไร?',
            answer: 'Sample SD หารด้วย (n-1) สำหรับข้อมูลตัวอย่าง Population SD หารด้วย n สำหรับข้อมูลทั้งหมด'
          }
        ],
        article: {
          title: 'เข้าใจส่วนเบี่ยงเบนมาตรฐาน',
          introduction: 'ส่วนเบี่ยงเบนมาตรฐานสำคัญในการเข้าใจความแปรปรวนของข้อมูลในสถิติ การเงิน และควบคุมคุณภาพ',
          sections: [
            {
              heading: 'กฎ 68-95-99.7',
              content: 'ในการแจกแจงปกติ: 68% ของข้อมูลอยู่ใน 1 SD, 95% ใน 2 SD, และ 99.7% ใน 3 SD จากค่าเฉลี่ย'
            }
          ],
          conclusion: 'ส่วนเบี่ยงเบนมาตรฐานช่วยระบุค่าผิดปกติ ประเมินความเสี่ยง และเข้าใจความน่าเชื่อถือของข้อมูล',
          wordCount: 250
        }
      }
    }
  },
  {
    id: 'factorial-calculator',
    slug: 'factorial-calculator',
    category: 'mathematics',
    icon: '!',
    color: '#8B5CF6',
    inputs: [
      {
        key: 'number',
        label: 'Number (n)',
        type: 'number',
        defaultValue: 5,
        min: 0,
        max: 170,
        step: 1,
        required: true,
        tooltip: 'Maximum 170 due to JavaScript limitations'
      },
      {
        key: 'showSteps',
        label: 'Show Calculation Steps',
        type: 'boolean',
        defaultValue: true,
        required: false
      }
    ],
    outputs: [
      {
        key: 'factorial',
        label: 'n! (Factorial)',
        format: 'text',
        description: 'Factorial result',
        highlight: true
      },
      {
        key: 'scientificNotation',
        label: 'Scientific Notation',
        format: 'text',
        description: 'Result in scientific notation'
      },
      {
        key: 'digits',
        label: 'Number of Digits',
        format: 'number',
        decimals: 0,
        description: 'Digits in result'
      },
      {
        key: 'steps',
        label: 'Calculation Steps',
        format: 'text',
        description: 'Step-by-step calculation'
      },
      {
        key: 'primeFactorization',
        label: 'Prime Factorization',
        format: 'text',
        description: 'Prime factors of n!'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          const n = Math.floor(number);
          
          if (n < 0) {
            return {
              factorial: 'Undefined (negative number)',
              scientificNotation: 'N/A',
              digits: 0,
              steps: 'Factorial is not defined for negative numbers',
              primeFactorization: 'N/A'
            };
          }
          
          if (n === 0 || n === 1) {
            return {
              factorial: '1',
              scientificNotation: '1.00e+0',
              digits: 1,
              steps: n + '! = 1 (by definition)',
              primeFactorization: '1'
            };
          }
          
          // Calculate factorial
          let result = 1;
          let steps = showSteps ? n + '! = ' : '';
          
          for (let i = n; i >= 1; i--) {
            result *= i;
            if (showSteps) {
              steps += i;
              if (i > 1) steps += ' × ';
            }
          }
          
          // Handle large numbers
          let factorialStr;
          let scientificNotation;
          
          if (result === Infinity) {
            factorialStr = 'Infinity (exceeds maximum)';
            scientificNotation = 'Infinity';
          } else {
            factorialStr = result.toString();
            scientificNotation = result.toExponential(4);
          }
          
          const digits = factorialStr.replace(/[^0-9]/g, '').length;
          
          if (showSteps && result !== Infinity) {
            steps += ' = ' + factorialStr;
          }
          
          // Simple prime factorization for small numbers
          let primeFactorization = '';
          if (n <= 20) {
            const primes = [2, 3, 5, 7, 11, 13, 17, 19];
            const factors = {};
            
            for (let i = 2; i <= n; i++) {
              let temp = i;
              for (const p of primes) {
                while (temp % p === 0) {
                  factors[p] = (factors[p] || 0) + 1;
                  temp /= p;
                }
              }
            }
            
            primeFactorization = Object.entries(factors)
              .map(([p, count]) => p + '^' + count)
              .join(' × ');
          } else {
            primeFactorization = 'Too large to factorize';
          }
          
          return {
            factorial: factorialStr,
            scientificNotation,
            digits,
            steps: showSteps ? steps : 'Steps hidden',
            primeFactorization
          };
        `,
        description: 'Calculate factorial n!'
      }
    ],
    localizedContent: {
      en: {
        title: 'Factorial Calculator',
        description: 'Calculate factorial (n!) with steps and prime factorization',
        keywords: ['factorial calculator', 'n factorial', 'factorial formula', 'permutation calculator'],
        faq: [
          {
            question: 'What is factorial?',
            answer: 'Factorial of n (written as n!) is the product of all positive integers from 1 to n. For example, 5! = 5×4×3×2×1 = 120.'
          },
          {
            question: 'Why is 0! equal to 1?',
            answer: 'By definition, 0! = 1. This makes mathematical formulas work correctly, such as combinations and permutations.'
          },
          {
            question: 'What are factorials used for?',
            answer: 'Factorials are used in permutations, combinations, probability, Taylor series, and many areas of mathematics and statistics.'
          }
        ],
        article: {
          title: 'Understanding Factorials',
          introduction: 'Factorials are fundamental in combinatorics, probability, and calculus.',
          sections: [
            {
              heading: 'Growth Rate',
              content: 'Factorials grow extremely fast. 10! = 3,628,800 and 20! = 2.4 quintillion. This rapid growth is why we often use Stirling\'s approximation for large n.'
            },
            {
              heading: 'Applications',
              content: 'Use factorials for: arranging objects (permutations), selecting groups (combinations), probability calculations, and series expansions.'
            }
          ],
          conclusion: 'Factorials are building blocks for advanced mathematics and practical problem-solving.',
          wordCount: 250
        }
      }
    }
  }
];

// Export function to get all math calculators
export function getMathCalculators(): Calculator[] {
  return mathCalculators;
}

// Export function to get math calculator by slug
export function getMathCalculatorBySlug(slug: string): Calculator | undefined {
  return mathCalculators.find(calc => calc.slug === slug);
}