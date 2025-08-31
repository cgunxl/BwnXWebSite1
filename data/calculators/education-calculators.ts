import { Calculator } from '@/lib/types/calculator';

export const educationCalculators: Calculator[] = [
  {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    category: 'education',
    icon: '🎓',
    color: '#8B5CF6',
    inputs: [
      {
        key: 'gradeSystem',
        label: 'Grade System',
        type: 'select',
        defaultValue: '4.0',
        required: true,
        options: [
          { value: '4.0', label: '4.0 Scale (US)' },
          { value: '5.0', label: '5.0 Scale' },
          { value: '10.0', label: '10.0 Scale' },
          { value: '100', label: 'Percentage' }
        ]
      },
      {
        key: 'courses',
        label: 'Courses',
        type: 'dynamic-list',
        required: true,
        minItems: 1,
        maxItems: 20,
        fields: [
          {
            key: 'name',
            label: 'Course Name',
            type: 'text',
            placeholder: 'e.g., Mathematics'
          },
          {
            key: 'grade',
            label: 'Grade',
            type: 'select',
            options: [
              { value: 'A+', label: 'A+ (4.0)' },
              { value: 'A', label: 'A (4.0)' },
              { value: 'A-', label: 'A- (3.7)' },
              { value: 'B+', label: 'B+ (3.3)' },
              { value: 'B', label: 'B (3.0)' },
              { value: 'B-', label: 'B- (2.7)' },
              { value: 'C+', label: 'C+ (2.3)' },
              { value: 'C', label: 'C (2.0)' },
              { value: 'C-', label: 'C- (1.7)' },
              { value: 'D+', label: 'D+ (1.3)' },
              { value: 'D', label: 'D (1.0)' },
              { value: 'F', label: 'F (0.0)' }
            ]
          },
          {
            key: 'credits',
            label: 'Credits',
            type: 'number',
            min: 0.5,
            max: 10,
            step: 0.5,
            defaultValue: 3
          }
        ]
      }
    ],
    outputs: [
      {
        key: 'gpa',
        label: 'Your GPA',
        format: 'number',
        decimals: 2,
        description: 'Grade Point Average',
        highlight: true
      },
      {
        key: 'totalCredits',
        label: 'Total Credits',
        format: 'number',
        decimals: 1,
        description: 'Sum of all course credits'
      },
      {
        key: 'totalPoints',
        label: 'Total Grade Points',
        format: 'number',
        decimals: 2,
        description: 'Weighted grade points'
      },
      {
        key: 'letterGrade',
        label: 'Letter Grade',
        format: 'text',
        description: 'Equivalent letter grade'
      },
      {
        key: 'standing',
        label: 'Academic Standing',
        format: 'text',
        description: 'Your academic performance level'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          const gradePoints = {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'F': 0.0
          };
          
          let totalPoints = 0;
          let totalCredits = 0;
          
          for (const course of courses) {
            const points = gradePoints[course.grade] || 0;
            totalPoints += points * course.credits;
            totalCredits += course.credits;
          }
          
          const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
          
          let letterGrade = 'F';
          if (gpa >= 3.7) letterGrade = 'A';
          else if (gpa >= 3.3) letterGrade = 'B+';
          else if (gpa >= 3.0) letterGrade = 'B';
          else if (gpa >= 2.7) letterGrade = 'B-';
          else if (gpa >= 2.3) letterGrade = 'C+';
          else if (gpa >= 2.0) letterGrade = 'C';
          else if (gpa >= 1.7) letterGrade = 'C-';
          else if (gpa >= 1.0) letterGrade = 'D';
          
          let standing = 'Academic Probation';
          if (gpa >= 3.5) standing = 'Dean\'s List';
          else if (gpa >= 3.0) standing = 'Good Standing';
          else if (gpa >= 2.0) standing = 'Satisfactory';
          
          return { gpa, totalCredits, totalPoints, letterGrade, standing };
        `,
        description: 'Calculate GPA from courses and credits'
      }
    ],
    graph: {
      type: 'bar',
      title: 'Grade Distribution',
      data: ['courses'],
      xAxis: 'Course',
      yAxis: 'Grade Points',
      colors: ['#8B5CF6']
    },
    localizedContent: {
      en: {
        title: 'GPA Calculator',
        description: 'Calculate your Grade Point Average with weighted credits',
        keywords: ['gpa calculator', 'grade point average', 'college gpa', 'university gpa', 'cumulative gpa'],
        faq: [
          {
            question: 'How is GPA calculated?',
            answer: 'GPA is calculated by dividing total grade points (grade × credits) by total credits. Each letter grade has a point value (A=4.0, B=3.0, etc.).'
          },
          {
            question: 'What is a good GPA?',
            answer: 'Generally, 3.5+ is excellent (Dean\'s List), 3.0+ is good, 2.5+ is average, and below 2.0 may result in academic probation.'
          },
          {
            question: 'Do all colleges use the same GPA scale?',
            answer: 'No, while 4.0 is most common in the US, some schools use 5.0, 10.0, or percentage scales. Always check your institution\'s system.'
          },
          {
            question: 'How do weighted GPAs work?',
            answer: 'Weighted GPAs give extra points for harder classes (AP/Honors). An A in AP might be 5.0 instead of 4.0.'
          },
          {
            question: 'Can I improve my GPA?',
            answer: 'Yes! Focus on current courses, retake failed classes if allowed, take easier electives strategically, and seek academic support early.'
          }
        ],
        article: {
          title: 'Complete Guide to GPA Calculation',
          introduction: 'Understanding your GPA is crucial for academic success, scholarships, and graduate school applications.',
          sections: [
            {
              heading: 'Understanding Grade Points',
              content: 'Each letter grade corresponds to points: A (4.0), B (3.0), C (2.0), D (1.0), F (0.0). Plus/minus grades add/subtract 0.3 points.'
            },
            {
              heading: 'Credit Hours Matter',
              content: 'A 4-credit A (16 points) impacts GPA more than a 2-credit A (8 points). This weights importance by course difficulty and time commitment.'
            },
            {
              heading: 'Cumulative vs Semester GPA',
              content: 'Semester GPA is one term only. Cumulative GPA includes all courses ever taken. Both matter for different purposes.'
            },
            {
              heading: 'GPA for Grad School',
              content: 'Most programs require 3.0+ GPA. Competitive programs often expect 3.5+. Your major GPA may matter more than overall.'
            }
          ],
          conclusion: 'Monitor your GPA regularly, understand your school\'s policies, and seek help early if struggling.',
          wordCount: 350
        },
        examples: [
          {
            title: 'Semester Example',
            inputs: {
              courses: [
                { name: 'Calculus', grade: 'B+', credits: 4 },
                { name: 'English', grade: 'A-', credits: 3 },
                { name: 'Chemistry', grade: 'B', credits: 4 },
                { name: 'History', grade: 'A', credits: 3 }
              ]
            },
            outputs: {
              gpa: 3.41,
              totalCredits: 14,
              totalPoints: 47.7,
              letterGrade: 'B+',
              standing: 'Good Standing'
            },
            explanation: 'With mixed grades but mostly B+ and above, this student maintains good academic standing.'
          }
        ],
        references: [
          {
            title: 'College Board - Understanding Your GPA',
            url: 'https://www.collegeboard.org/',
            publisher: 'College Board',
            dateAccessed: '2024-01-01',
            type: 'organization'
          }
        ]
      },
      th: {
        title: 'คำนวณเกรดเฉลี่ย GPA',
        description: 'คำนวณเกรดเฉลี่ยสะสมพร้อมหน่วยกิตถ่วงน้ำหนัก',
        keywords: ['คำนวณ gpa', 'เกรดเฉลี่ย', 'คำนวณเกรด', 'เกรดเฉลี่ยสะสม', 'gpax'],
        faq: [
          {
            question: 'GPA คำนวณอย่างไร?',
            answer: 'GPA คำนวณจากผลรวมของ (เกรด × หน่วยกิต) หารด้วยหน่วยกิตทั้งหมด โดย A=4.0, B=3.0, C=2.0, D=1.0, F=0'
          },
          {
            question: 'GPA เท่าไหร่ถือว่าดี?',
            answer: 'โดยทั่วไป 3.5+ ดีเยี่ยม (เกียรตินิยม), 3.0+ ดี, 2.5+ ปานกลาง, ต่ำกว่า 2.0 อาจติด Probation'
          },
          {
            question: 'ทุกมหาวิทยาลัยใช้สเกลเดียวกันไหม?',
            answer: 'ไม่ ในไทยส่วนใหญ่ใช้ 4.0 แต่บางที่ใช้ 5.0 หรือคิดเป็นเปอร์เซ็นต์ ควรเช็คกับสถาบันของคุณ'
          }
        ],
        article: {
          title: 'คู่มือการคำนวณ GPA ฉบับสมบูรณ์',
          introduction: 'การเข้าใจ GPA สำคัญต่อความสำเร็จทางการศึกษา ทุน และการสมัครเรียนต่อ',
          sections: [
            {
              heading: 'ความหมายของเกรด',
              content: 'แต่ละเกรดมีค่าคะแนน: A (4.0), B+ (3.5), B (3.0), C+ (2.5), C (2.0), D+ (1.5), D (1.0), F (0)'
            },
            {
              heading: 'หน่วยกิตมีผลอย่างไร',
              content: 'วิชา 4 หน่วยกิตที่ได้ A (16 คะแนน) มีผลต่อ GPA มากกว่าวิชา 2 หน่วยกิตที่ได้ A (8 คะแนน)'
            }
          ],
          conclusion: 'ติดตาม GPA อย่างสม่ำเสมอ เข้าใจระบบของสถาบัน และขอความช่วยเหลือทันทีหากมีปัญหา',
          wordCount: 300
        }
      }
    }
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    category: 'mathematics',
    icon: '%',
    color: '#10B981',
    inputs: [
      {
        key: 'calculationType',
        label: 'Calculation Type',
        type: 'select',
        defaultValue: 'basic',
        required: true,
        options: [
          { value: 'basic', label: 'X% of Y' },
          { value: 'whatPercent', label: 'X is what % of Y' },
          { value: 'increase', label: 'Percentage Increase' },
          { value: 'decrease', label: 'Percentage Decrease' },
          { value: 'difference', label: 'Percentage Difference' },
          { value: 'change', label: 'Percentage Change' }
        ]
      },
      {
        key: 'value1',
        label: 'First Value',
        type: 'number',
        defaultValue: 100,
        step: 0.01,
        required: true
      },
      {
        key: 'value2',
        label: 'Second Value',
        type: 'number',
        defaultValue: 50,
        step: 0.01,
        required: true,
        dependsOn: ['calculationType'],
        showWhen: { 
          calculationType: ['whatPercent', 'increase', 'decrease', 'difference', 'change'] 
        }
      },
      {
        key: 'percentage',
        label: 'Percentage',
        type: 'number',
        defaultValue: 10,
        min: 0,
        step: 0.01,
        required: true,
        unit: '%',
        dependsOn: ['calculationType'],
        showWhen: { calculationType: 'basic' }
      }
    ],
    outputs: [
      {
        key: 'result',
        label: 'Result',
        format: 'number',
        decimals: 2,
        description: 'Calculated result',
        highlight: true
      },
      {
        key: 'formula',
        label: 'Formula Used',
        format: 'text',
        description: 'Mathematical formula'
      },
      {
        key: 'explanation',
        label: 'Explanation',
        format: 'text',
        description: 'Step-by-step explanation'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          let result = 0;
          let formula = '';
          let explanation = '';
          
          switch (calculationType) {
            case 'basic':
              result = (percentage / 100) * value1;
              formula = '(Percentage ÷ 100) × Value';
              explanation = \`\${percentage}% of \${value1} = \${result}\`;
              break;
              
            case 'whatPercent':
              result = (value1 / value2) * 100;
              formula = '(Value1 ÷ Value2) × 100';
              explanation = \`\${value1} is \${result}% of \${value2}\`;
              break;
              
            case 'increase':
              result = ((value2 - value1) / value1) * 100;
              formula = '((New - Old) ÷ Old) × 100';
              explanation = \`Increase from \${value1} to \${value2} = \${result}%\`;
              break;
              
            case 'decrease':
              result = ((value1 - value2) / value1) * 100;
              formula = '((Old - New) ÷ Old) × 100';
              explanation = \`Decrease from \${value1} to \${value2} = \${result}%\`;
              break;
              
            case 'difference':
              result = (Math.abs(value1 - value2) / ((value1 + value2) / 2)) * 100;
              formula = '|V1 - V2| ÷ ((V1 + V2) ÷ 2) × 100';
              explanation = \`Difference between \${value1} and \${value2} = \${result}%\`;
              break;
              
            case 'change':
              result = ((value2 - value1) / Math.abs(value1)) * 100;
              formula = '(New - Old) ÷ |Old| × 100';
              explanation = \`Change from \${value1} to \${value2} = \${result}%\`;
              break;
          }
          
          return { result, formula, explanation };
        `,
        description: 'Calculate various percentage operations'
      }
    ],
    localizedContent: {
      en: {
        title: 'Percentage Calculator',
        description: 'Calculate percentages, increases, decreases, and differences',
        keywords: ['percentage calculator', 'percent calculator', 'percentage increase', 'percentage decrease', 'percentage change'],
        faq: [
          {
            question: 'How do I calculate percentage?',
            answer: 'To find X% of Y, multiply Y by (X/100). For example, 20% of 150 = 150 × 0.20 = 30.'
          },
          {
            question: 'What\'s the difference between percentage change and percentage difference?',
            answer: 'Percentage change uses the original value as base: (New-Old)/Old. Percentage difference uses the average: |A-B|/((A+B)/2).'
          },
          {
            question: 'How do I calculate percentage increase?',
            answer: 'Percentage increase = ((New Value - Original Value) / Original Value) × 100. If price goes from $50 to $60, increase = (60-50)/50 × 100 = 20%.'
          }
        ],
        article: {
          title: 'Master Percentage Calculations',
          introduction: 'Percentages are everywhere - from sales discounts to test scores to financial returns.',
          sections: [
            {
              heading: 'Basic Percentage',
              content: 'Finding a percentage of a number is simple: convert the percentage to decimal (divide by 100) and multiply.'
            },
            {
              heading: 'Reverse Percentage',
              content: 'To find what percentage X is of Y, divide X by Y and multiply by 100. This answers "what percent" questions.'
            },
            {
              heading: 'Real-World Applications',
              content: 'Use percentages for tips (15-20% of bill), sales tax (multiply by tax rate), discounts (subtract from 100%), and grade calculations.'
            }
          ],
          conclusion: 'Understanding percentages helps in shopping, investing, academics, and data analysis.',
          wordCount: 280
        }
      },
      th: {
        title: 'คำนวณเปอร์เซ็นต์',
        description: 'คำนวณเปอร์เซ็นต์ การเพิ่ม การลด และผลต่าง',
        keywords: ['คำนวณเปอร์เซ็นต์', 'หาเปอร์เซ็นต์', 'เปอร์เซ็นต์เพิ่ม', 'เปอร์เซ็นต์ลด'],
        faq: [
          {
            question: 'คำนวณเปอร์เซ็นต์อย่างไร?',
            answer: 'หา X% ของ Y โดยคูณ Y ด้วย (X/100) เช่น 20% ของ 150 = 150 × 0.20 = 30'
          },
          {
            question: 'เปอร์เซ็นต์การเปลี่ยนแปลงต่างจากผลต่างอย่างไร?',
            answer: 'การเปลี่ยนแปลงใช้ค่าเดิมเป็นฐาน: (ใหม่-เก่า)/เก่า ผลต่างใช้ค่าเฉลี่ย: |A-B|/((A+B)/2)'
          }
        ],
        article: {
          title: 'เข้าใจการคำนวณเปอร์เซ็นต์',
          introduction: 'เปอร์เซ็นต์อยู่รอบตัวเรา ตั้งแต่ส่วนลด คะแนนสอบ ไปถึงผลตอบแทนการลงทุน',
          sections: [
            {
              heading: 'เปอร์เซ็นต์พื้นฐาน',
              content: 'หาเปอร์เซ็นต์ของตัวเลข: แปลงเปอร์เซ็นต์เป็นทศนิยม (หาร 100) แล้วคูณ'
            }
          ],
          conclusion: 'การเข้าใจเปอร์เซ็นต์ช่วยในการช้อปปิ้ง การลงทุน การเรียน และการวิเคราะห์ข้อมูล',
          wordCount: 250
        }
      }
    }
  },
  {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    category: 'mathematics',
    icon: '🔬',
    color: '#6366F1',
    inputs: [
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'basic',
        required: true,
        options: [
          { value: 'basic', label: 'Basic (+, -, ×, ÷)' },
          { value: 'power', label: 'Power & Roots' },
          { value: 'logarithm', label: 'Logarithms' },
          { value: 'trigonometry', label: 'Trigonometry' },
          { value: 'factorial', label: 'Factorial & Combinations' },
          { value: 'constants', label: 'Scientific Constants' }
        ]
      },
      {
        key: 'x',
        label: 'Value X',
        type: 'number',
        defaultValue: 10,
        step: 0.0001,
        required: true
      },
      {
        key: 'y',
        label: 'Value Y',
        type: 'number',
        defaultValue: 2,
        step: 0.0001,
        required: false,
        dependsOn: ['operation'],
        showWhen: { 
          operation: ['basic', 'power', 'logarithm'] 
        }
      },
      {
        key: 'basicOp',
        label: 'Basic Operation',
        type: 'select',
        defaultValue: 'add',
        required: true,
        dependsOn: ['operation'],
        showWhen: { operation: 'basic' },
        options: [
          { value: 'add', label: 'Addition (+)' },
          { value: 'subtract', label: 'Subtraction (-)' },
          { value: 'multiply', label: 'Multiplication (×)' },
          { value: 'divide', label: 'Division (÷)' },
          { value: 'modulo', label: 'Modulo (%)' }
        ]
      },
      {
        key: 'trigFunc',
        label: 'Trig Function',
        type: 'select',
        defaultValue: 'sin',
        required: true,
        dependsOn: ['operation'],
        showWhen: { operation: 'trigonometry' },
        options: [
          { value: 'sin', label: 'Sine' },
          { value: 'cos', label: 'Cosine' },
          { value: 'tan', label: 'Tangent' },
          { value: 'asin', label: 'Arcsine' },
          { value: 'acos', label: 'Arccosine' },
          { value: 'atan', label: 'Arctangent' }
        ]
      },
      {
        key: 'angleUnit',
        label: 'Angle Unit',
        type: 'radio',
        defaultValue: 'degrees',
        required: true,
        dependsOn: ['operation'],
        showWhen: { operation: 'trigonometry' },
        options: [
          { value: 'degrees', label: 'Degrees' },
          { value: 'radians', label: 'Radians' }
        ]
      }
    ],
    outputs: [
      {
        key: 'result',
        label: 'Result',
        format: 'number',
        decimals: 10,
        description: 'Calculated result',
        highlight: true
      },
      {
        key: 'scientificNotation',
        label: 'Scientific Notation',
        format: 'text',
        description: 'Result in scientific notation'
      },
      {
        key: 'binary',
        label: 'Binary',
        format: 'text',
        description: 'Binary representation'
      },
      {
        key: 'hexadecimal',
        label: 'Hexadecimal',
        format: 'text',
        description: 'Hex representation'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          let result = 0;
          
          switch (operation) {
            case 'basic':
              switch (basicOp) {
                case 'add': result = x + y; break;
                case 'subtract': result = x - y; break;
                case 'multiply': result = x * y; break;
                case 'divide': result = x / y; break;
                case 'modulo': result = x % y; break;
              }
              break;
              
            case 'power':
              if (y === 2) result = x * x;
              else if (y === 0.5) result = Math.sqrt(x);
              else if (y === 3) result = x * x * x;
              else if (y === 1/3) result = Math.cbrt(x);
              else result = Math.pow(x, y);
              break;
              
            case 'logarithm':
              if (y === 10) result = Math.log10(x);
              else if (y === Math.E) result = Math.log(x);
              else if (y === 2) result = Math.log2(x);
              else result = Math.log(x) / Math.log(y);
              break;
              
            case 'trigonometry':
              const angle = angleUnit === 'degrees' ? x * Math.PI / 180 : x;
              switch (trigFunc) {
                case 'sin': result = Math.sin(angle); break;
                case 'cos': result = Math.cos(angle); break;
                case 'tan': result = Math.tan(angle); break;
                case 'asin': result = Math.asin(x); break;
                case 'acos': result = Math.acos(x); break;
                case 'atan': result = Math.atan(x); break;
              }
              if (angleUnit === 'degrees' && trigFunc.startsWith('a')) {
                result = result * 180 / Math.PI;
              }
              break;
              
            case 'factorial':
              result = 1;
              for (let i = 2; i <= Math.floor(x); i++) {
                result *= i;
              }
              break;
              
            case 'constants':
              if (x === 1) result = Math.PI;
              else if (x === 2) result = Math.E;
              else if (x === 3) result = Math.SQRT2;
              else if (x === 4) result = Math.LN2;
              else if (x === 5) result = Math.LN10;
              break;
          }
          
          const scientificNotation = result.toExponential(4);
          const binary = Math.floor(result).toString(2);
          const hexadecimal = Math.floor(result).toString(16).toUpperCase();
          
          return { result, scientificNotation, binary, hexadecimal };
        `,
        description: 'Perform scientific calculations'
      }
    ],
    localizedContent: {
      en: {
        title: 'Scientific Calculator',
        description: 'Advanced scientific calculations with trigonometry, logarithms, and more',
        keywords: ['scientific calculator', 'trigonometry calculator', 'logarithm calculator', 'power calculator'],
        faq: [
          {
            question: 'What functions does this calculator support?',
            answer: 'It supports basic arithmetic, powers, roots, logarithms, trigonometry, factorials, and scientific constants.'
          },
          {
            question: 'How do I use trigonometric functions?',
            answer: 'Select Trigonometry, choose your function (sin, cos, tan, etc.), enter the angle, and select degrees or radians.'
          },
          {
            question: 'What is scientific notation?',
            answer: 'Scientific notation expresses numbers as a × 10^b, useful for very large or small numbers. Example: 1234 = 1.234 × 10^3.'
          }
        ],
        article: {
          title: 'Using a Scientific Calculator Effectively',
          introduction: 'Scientific calculators are essential tools for mathematics, science, and engineering.',
          sections: [
            {
              heading: 'Basic Operations',
              content: 'Start with basic arithmetic before moving to advanced functions. Always check your order of operations (PEMDAS).'
            },
            {
              heading: 'Trigonometry Tips',
              content: 'Remember to set the correct angle unit (degrees vs radians). Most real-world problems use degrees, but calculus uses radians.'
            },
            {
              heading: 'Common Mistakes',
              content: 'Watch for: wrong angle units, forgetting parentheses, confusing log vs ln, and integer overflow in factorials.'
            }
          ],
          conclusion: 'Practice regularly with different types of problems to master your scientific calculator.',
          wordCount: 300
        }
      }
    }
  }
];

// Export function to get all education calculators
export function getEducationCalculators(): Calculator[] {
  return educationCalculators;
}

// Export function to get calculator by slug
export function getEducationCalculatorBySlug(slug: string): Calculator | undefined {
  return educationCalculators.find(calc => calc.slug === slug);
}