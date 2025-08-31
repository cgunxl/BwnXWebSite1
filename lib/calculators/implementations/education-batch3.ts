// Education & Math Calculators Batch 3 - Real implementations with country-specific grading
import { Calculator, CalculatorInput, CalculatorOutput } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';

// Country-specific education configurations
const educationConfigs: Partial<Record<Locale, any>> = {
  en: { // US System
    gradeScale: 4.0,
    gradePoints: {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    },
    percentageToGrade: [
      { min: 97, grade: 'A+' },
      { min: 93, grade: 'A' },
      { min: 90, grade: 'A-' },
      { min: 87, grade: 'B+' },
      { min: 83, grade: 'B' },
      { min: 80, grade: 'B-' },
      { min: 77, grade: 'C+' },
      { min: 73, grade: 'C' },
      { min: 70, grade: 'C-' },
      { min: 67, grade: 'D+' },
      { min: 63, grade: 'D' },
      { min: 60, grade: 'D-' },
      { min: 0, grade: 'F' }
    ]
  },
  th: { // Thai System
    gradeScale: 4.0,
    gradePoints: {
      'A': 4.0, 'B+': 3.5, 'B': 3.0,
      'C+': 2.5, 'C': 2.0, 'D+': 1.5,
      'D': 1.0, 'F': 0.0
    },
    percentageToGrade: [
      { min: 80, grade: 'A' },
      { min: 75, grade: 'B+' },
      { min: 70, grade: 'B' },
      { min: 65, grade: 'C+' },
      { min: 60, grade: 'C' },
      { min: 55, grade: 'D+' },
      { min: 50, grade: 'D' },
      { min: 0, grade: 'F' }
    ]
  },
  de: { // German System
    gradeScale: 5.0,
    gradePoints: {
      '1.0': 5.0, '1.3': 4.7, '1.7': 4.3,
      '2.0': 4.0, '2.3': 3.7, '2.7': 3.3,
      '3.0': 3.0, '3.3': 2.7, '3.7': 2.3,
      '4.0': 2.0, '5.0': 0.0
    },
    percentageToGrade: [
      { min: 95, grade: '1.0' },
      { min: 90, grade: '1.3' },
      { min: 85, grade: '1.7' },
      { min: 80, grade: '2.0' },
      { min: 75, grade: '2.3' },
      { min: 70, grade: '2.7' },
      { min: 65, grade: '3.0' },
      { min: 60, grade: '3.3' },
      { min: 55, grade: '3.7' },
      { min: 50, grade: '4.0' },
      { min: 0, grade: '5.0' }
    ]
  },
  ja: { // Japanese System
    gradeScale: 100,
    gradePoints: {
      'S': 4.0, 'A': 3.0, 'B': 2.0, 'C': 1.0, 'F': 0.0
    },
    percentageToGrade: [
      { min: 90, grade: 'S' },
      { min: 80, grade: 'A' },
      { min: 70, grade: 'B' },
      { min: 60, grade: 'C' },
      { min: 0, grade: 'F' }
    ]
  }
};

// 1. GPA Calculator with multiple grading systems
export function createGPACalculator(locale: Locale): Calculator {
  const config = educationConfigs[locale] || educationConfigs.en;
  
  return {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    category: 'education',
    icon: '🎓',
    color: '#10B981',
    inputs: [
      {
        key: 'courses',
        label: 'Courses',
        type: 'dynamic-list',
        required: true,
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
            options: Object.keys(config.gradePoints).map(g => ({ value: g, label: g }))
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
        ],
        minItems: 1,
        maxItems: 20,
        defaultItems: 4
      },
      {
        key: 'previousGPA',
        label: 'Previous GPA (optional)',
        type: 'number',
        required: false,
        validation: { min: 0, max: config.gradeScale, required: false },
        step: 0.01,
        placeholder: 'If calculating cumulative'
      },
      {
        key: 'previousCredits',
        label: 'Previous Total Credits',
        type: 'number',
        required: false,
        validation: { min: 0, max: 500, required: false },
        placeholder: 'If calculating cumulative'
      }
    ],
    outputs: [
      { key: 'semesterGPA', label: 'Semester GPA', format: 'number', precision: 2, primary: true },
      { key: 'cumulativeGPA', label: 'Cumulative GPA', format: 'number', precision: 2 },
      { key: 'totalCredits', label: 'Total Credits', format: 'number', precision: 1 },
      { key: 'gradeDistribution', label: 'Grade Distribution', format: 'text' },
      { key: 'classification', label: 'Academic Standing', format: 'text' },
      { key: 'percentageEquivalent', label: 'Percentage Equivalent', format: 'percentage', precision: 1 }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({courses, previousGPA, previousCredits}) => {
          const gradePoints = ${JSON.stringify(config.gradePoints)};
          const scale = ${config.gradeScale};
          
          // Calculate semester GPA
          let totalPoints = 0;
          let totalCredits = 0;
          const gradeCount = {};
          
          for (const course of courses) {
            if (course.grade && course.credits) {
              const points = gradePoints[course.grade] || 0;
              totalPoints += points * course.credits;
              totalCredits += parseFloat(course.credits);
              
              // Count grades for distribution
              gradeCount[course.grade] = (gradeCount[course.grade] || 0) + 1;
            }
          }
          
          const semesterGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
          
          // Calculate cumulative GPA if previous data provided
          let cumulativeGPA = semesterGPA;
          let cumulativeTotalCredits = totalCredits;
          
          if (previousGPA && previousCredits) {
            const prevPoints = previousGPA * previousCredits;
            const allPoints = prevPoints + totalPoints;
            cumulativeTotalCredits = previousCredits + totalCredits;
            cumulativeGPA = cumulativeTotalCredits > 0 ? allPoints / cumulativeTotalCredits : 0;
          }
          
          // Grade distribution
          const distribution = Object.entries(gradeCount)
            .map(([grade, count]) => grade + ': ' + count)
            .join(', ');
          
          // Academic standing classification
          let classification = '';
          if (semesterGPA >= 3.5) classification = 'Dean\\'s List / Excellent';
          else if (semesterGPA >= 3.0) classification = 'Good Standing';
          else if (semesterGPA >= 2.5) classification = 'Satisfactory';
          else if (semesterGPA >= 2.0) classification = 'Academic Warning';
          else classification = 'Academic Probation';
          
          // Convert to percentage (approximate)
          const percentageEquivalent = (semesterGPA / scale) * 100;
          
          return {
            semesterGPA,
            cumulativeGPA,
            totalCredits: cumulativeTotalCredits,
            gradeDistribution: distribution || 'No grades entered',
            classification,
            percentageEquivalent
          };
        }`,
        variables: ['courses', 'previousGPA', 'previousCredits'],
        description: 'GPA calculation with country-specific grading systems'
      }
    ],
    graph: {
      type: 'bar',
      showDistribution: true,
      animated: true
    },
    relatedCalculators: ['grade-calculator', 'cgpa-calculator', 'grade-needed'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณเกรดเฉลี่ย (GPA)' : 'GPA Calculator',
        description: locale === 'th' ? 
          'คำนวณเกรดเฉลี่ยสะสมตามระบบการศึกษาไทย' :
          'Calculate Grade Point Average for your courses',
        keywords: ['gpa', 'grades', 'academic', 'university'],
        faq: [],
        article: ''
      }
    }
  };
}

// 2. Percentage Calculator (Advanced)
export function createPercentageCalculator(locale: Locale): Calculator {
  return {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    category: 'math',
    icon: '📊',
    color: '#3B82F6',
    inputs: [
      {
        key: 'calculationType',
        label: 'Calculation Type',
        type: 'select',
        required: true,
        defaultValue: 'basic',
        options: [
          { value: 'basic', label: 'Basic Percentage' },
          { value: 'change', label: 'Percentage Change' },
          { value: 'increase', label: 'Percentage Increase' },
          { value: 'decrease', label: 'Percentage Decrease' },
          { value: 'of', label: 'X% of Y' },
          { value: 'ratio', label: 'Percentage Ratio' },
          { value: 'margin', label: 'Profit Margin' },
          { value: 'markup', label: 'Markup Percentage' }
        ]
      },
      {
        key: 'value1',
        label: 'First Value',
        type: 'number',
        required: true,
        validation: { required: true },
        placeholder: 'Enter value'
      },
      {
        key: 'value2',
        label: 'Second Value',
        type: 'number',
        required: true,
        validation: { required: true },
        placeholder: 'Enter value',
        showIf: { calculationType: ['change', 'increase', 'decrease', 'of', 'ratio', 'margin', 'markup'] }
      },
      {
        key: 'decimalPlaces',
        label: 'Decimal Places',
        type: 'number',
        defaultValue: 2,
        validation: { min: 0, max: 10, required: false }
      }
    ],
    outputs: [
      { key: 'result', label: 'Result', format: 'number', precision: 2, primary: true },
      { key: 'percentage', label: 'Percentage', format: 'percentage', precision: 2 },
      { key: 'formula', label: 'Formula Used', format: 'text' },
      { key: 'explanation', label: 'Explanation', format: 'text' },
      { key: 'inverseCalculation', label: 'Inverse Calculation', format: 'text' }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({calculationType, value1, value2, decimalPlaces}) => {
          const decimals = decimalPlaces || 2;
          let result = 0;
          let percentage = 0;
          let formula = '';
          let explanation = '';
          let inverseCalculation = '';
          
          switch(calculationType) {
            case 'basic':
              // What percentage is value1 of 100
              percentage = value1;
              result = value1;
              formula = 'Percentage = (Value / Total) × 100';
              explanation = value1 + '% means ' + value1 + ' out of 100';
              inverseCalculation = '100% would be 100';
              break;
              
            case 'change':
              // Percentage change from value1 to value2
              if (value1 !== 0) {
                percentage = ((value2 - value1) / Math.abs(value1)) * 100;
                result = percentage;
                formula = '((New - Old) / |Old|) × 100';
                explanation = value2 > value1 ? 'Increase of ' : 'Decrease of ';
                explanation += Math.abs(percentage).toFixed(decimals) + '%';
                inverseCalculation = 'To return to original: ' + 
                  (value1 !== 0 ? ((value1 - value2) / Math.abs(value2)) * 100).toFixed(decimals) + '%' : 'N/A');
              }
              break;
              
            case 'increase':
              // value1 increased by value2%
              result = value1 * (1 + value2/100);
              percentage = value2;
              formula = 'Result = Value × (1 + Percentage/100)';
              explanation = value1 + ' increased by ' + value2 + '% = ' + result.toFixed(decimals);
              inverseCalculation = 'Decrease needed to return: ' + 
                ((value1 - result) / result * 100).toFixed(decimals) + '%';
              break;
              
            case 'decrease':
              // value1 decreased by value2%
              result = value1 * (1 - value2/100);
              percentage = value2;
              formula = 'Result = Value × (1 - Percentage/100)';
              explanation = value1 + ' decreased by ' + value2 + '% = ' + result.toFixed(decimals);
              inverseCalculation = 'Increase needed to return: ' + 
                ((value1 - result) / result * 100).toFixed(decimals) + '%';
              break;
              
            case 'of':
              // What is value1% of value2
              result = (value1 / 100) * value2;
              percentage = value1;
              formula = 'Result = (Percentage / 100) × Value';
              explanation = value1 + '% of ' + value2 + ' = ' + result.toFixed(decimals);
              inverseCalculation = result + ' is ' + value1 + '% of ' + value2;
              break;
              
            case 'ratio':
              // What percentage is value1 of value2
              percentage = value2 !== 0 ? (value1 / value2) * 100 : 0;
              result = percentage;
              formula = '(Part / Whole) × 100';
              explanation = value1 + ' is ' + percentage.toFixed(decimals) + '% of ' + value2;
              inverseCalculation = value2 + ' is ' + 
                (value1 !== 0 ? (value2 / value1 * 100).toFixed(decimals) : 'N/A') + '% of ' + value1;
              break;
              
            case 'margin':
              // Profit margin: (value2-value1)/value2 * 100 where value1=cost, value2=price
              percentage = value2 !== 0 ? ((value2 - value1) / value2) * 100 : 0;
              result = percentage;
              formula = '((Price - Cost) / Price) × 100';
              explanation = 'Profit margin: ' + percentage.toFixed(decimals) + '%';
              inverseCalculation = 'Markup: ' + 
                (value1 !== 0 ? ((value2 - value1) / value1 * 100).toFixed(decimals) : 'N/A') + '%';
              break;
              
            case 'markup':
              // Markup: (value2-value1)/value1 * 100 where value1=cost, value2=price
              percentage = value1 !== 0 ? ((value2 - value1) / value1) * 100 : 0;
              result = percentage;
              formula = '((Price - Cost) / Cost) × 100';
              explanation = 'Markup: ' + percentage.toFixed(decimals) + '%';
              inverseCalculation = 'Margin: ' + 
                (value2 !== 0 ? ((value2 - value1) / value2 * 100).toFixed(decimals) : 'N/A') + '%';
              break;
          }
          
          return {
            result: parseFloat(result.toFixed(decimals)),
            percentage: parseFloat(percentage.toFixed(decimals)),
            formula,
            explanation,
            inverseCalculation
          };
        }`,
        variables: ['calculationType', 'value1', 'value2', 'decimalPlaces'],
        description: 'Advanced percentage calculations'
      }
    ],
    graph: {
      type: 'pie',
      showComparison: true,
      animated: true
    },
    relatedCalculators: ['ratio-calculator', 'proportion-calculator', 'fraction-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณเปอร์เซ็นต์' : 'Percentage Calculator',
        description: locale === 'th' ? 
          'คำนวณเปอร์เซ็นต์แบบต่างๆ พร้อมสูตรและคำอธิบาย' :
          'Calculate various percentage operations with formulas',
        keywords: ['percentage', 'percent', 'ratio', 'proportion'],
        faq: [],
        article: ''
      }
    }
  };
}

// 3. Scientific Calculator (Basic Operations)
export function createScientificCalculator(locale: Locale): Calculator {
  return {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    category: 'math',
    icon: '🔬',
    color: '#8B5CF6',
    inputs: [
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        required: true,
        options: [
          { value: 'power', label: 'Power (x^y)' },
          { value: 'sqrt', label: 'Square Root' },
          { value: 'cbrt', label: 'Cube Root' },
          { value: 'log', label: 'Logarithm (base 10)' },
          { value: 'ln', label: 'Natural Log (base e)' },
          { value: 'exp', label: 'Exponential (e^x)' },
          { value: 'factorial', label: 'Factorial (n!)' },
          { value: 'sin', label: 'Sine' },
          { value: 'cos', label: 'Cosine' },
          { value: 'tan', label: 'Tangent' },
          { value: 'asin', label: 'Arcsine' },
          { value: 'acos', label: 'Arccosine' },
          { value: 'atan', label: 'Arctangent' },
          { value: 'combination', label: 'Combination (nCr)' },
          { value: 'permutation', label: 'Permutation (nPr)' }
        ]
      },
      {
        key: 'x',
        label: 'Value (x)',
        type: 'number',
        required: true,
        validation: { required: true },
        step: 0.01
      },
      {
        key: 'y',
        label: 'Value (y)',
        type: 'number',
        required: false,
        validation: { required: false },
        step: 0.01,
        showIf: { operation: ['power', 'combination', 'permutation'] }
      },
      {
        key: 'angleUnit',
        label: 'Angle Unit',
        type: 'select',
        required: true,
        defaultValue: 'degrees',
        options: [
          { value: 'degrees', label: 'Degrees' },
          { value: 'radians', label: 'Radians' }
        ],
        showIf: { operation: ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'] }
      }
    ],
    outputs: [
      { key: 'result', label: 'Result', format: 'number', precision: 10, primary: true },
      { key: 'scientificNotation', label: 'Scientific Notation', format: 'text' },
      { key: 'steps', label: 'Calculation Steps', format: 'text' },
      { key: 'relatedValues', label: 'Related Values', format: 'text' }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({operation, x, y, angleUnit}) => {
          let result = 0;
          let steps = '';
          let relatedValues = '';
          
          // Helper function for factorial
          const factorial = (n) => {
            if (n < 0) return NaN;
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
              result *= i;
            }
            return result;
          };
          
          // Helper for combinations
          const combination = (n, r) => {
            if (r > n) return 0;
            return factorial(n) / (factorial(r) * factorial(n - r));
          };
          
          // Helper for permutations
          const permutation = (n, r) => {
            if (r > n) return 0;
            return factorial(n) / factorial(n - r);
          };
          
          // Convert angle if needed
          let angle = x;
          if (angleUnit === 'degrees' && ['sin', 'cos', 'tan'].includes(operation)) {
            angle = x * Math.PI / 180;
          }
          
          switch(operation) {
            case 'power':
              result = Math.pow(x, y || 2);
              steps = x + '^' + (y || 2) + ' = ' + result;
              relatedValues = 'Square: ' + Math.pow(x, 2) + ', Cube: ' + Math.pow(x, 3);
              break;
              
            case 'sqrt':
              result = Math.sqrt(x);
              steps = '√' + x + ' = ' + result;
              relatedValues = 'Squared: ' + Math.pow(result, 2);
              break;
              
            case 'cbrt':
              result = Math.cbrt(x);
              steps = '∛' + x + ' = ' + result;
              relatedValues = 'Cubed: ' + Math.pow(result, 3);
              break;
              
            case 'log':
              result = Math.log10(x);
              steps = 'log₁₀(' + x + ') = ' + result;
              relatedValues = '10^' + result + ' = ' + x;
              break;
              
            case 'ln':
              result = Math.log(x);
              steps = 'ln(' + x + ') = ' + result;
              relatedValues = 'e^' + result + ' = ' + x;
              break;
              
            case 'exp':
              result = Math.exp(x);
              steps = 'e^' + x + ' = ' + result;
              relatedValues = 'ln(' + result + ') = ' + x;
              break;
              
            case 'factorial':
              result = factorial(Math.floor(x));
              steps = Math.floor(x) + '! = ' + result;
              if (x <= 10) {
                let factorialSteps = [];
                for (let i = Math.floor(x); i > 0; i--) {
                  factorialSteps.push(i);
                }
                relatedValues = factorialSteps.join(' × ') + ' = ' + result;
              }
              break;
              
            case 'sin':
              result = Math.sin(angle);
              steps = 'sin(' + x + (angleUnit === 'degrees' ? '°' : ' rad') + ') = ' + result;
              relatedValues = 'cos: ' + Math.cos(angle).toFixed(6) + ', tan: ' + Math.tan(angle).toFixed(6);
              break;
              
            case 'cos':
              result = Math.cos(angle);
              steps = 'cos(' + x + (angleUnit === 'degrees' ? '°' : ' rad') + ') = ' + result;
              relatedValues = 'sin: ' + Math.sin(angle).toFixed(6) + ', tan: ' + Math.tan(angle).toFixed(6);
              break;
              
            case 'tan':
              result = Math.tan(angle);
              steps = 'tan(' + x + (angleUnit === 'degrees' ? '°' : ' rad') + ') = ' + result;
              relatedValues = 'sin: ' + Math.sin(angle).toFixed(6) + ', cos: ' + Math.cos(angle).toFixed(6);
              break;
              
            case 'asin':
              result = Math.asin(x);
              if (angleUnit === 'degrees') result = result * 180 / Math.PI;
              steps = 'arcsin(' + x + ') = ' + result + (angleUnit === 'degrees' ? '°' : ' rad');
              break;
              
            case 'acos':
              result = Math.acos(x);
              if (angleUnit === 'degrees') result = result * 180 / Math.PI;
              steps = 'arccos(' + x + ') = ' + result + (angleUnit === 'degrees' ? '°' : ' rad');
              break;
              
            case 'atan':
              result = Math.atan(x);
              if (angleUnit === 'degrees') result = result * 180 / Math.PI;
              steps = 'arctan(' + x + ') = ' + result + (angleUnit === 'degrees' ? '°' : ' rad');
              break;
              
            case 'combination':
              result = combination(Math.floor(x), Math.floor(y || 0));
              steps = 'C(' + Math.floor(x) + ',' + Math.floor(y || 0) + ') = ' + result;
              relatedValues = 'Formula: n!/(r!(n-r)!)';
              break;
              
            case 'permutation':
              result = permutation(Math.floor(x), Math.floor(y || 0));
              steps = 'P(' + Math.floor(x) + ',' + Math.floor(y || 0) + ') = ' + result;
              relatedValues = 'Formula: n!/(n-r)!';
              break;
          }
          
          // Scientific notation
          let scientificNotation = '';
          if (Math.abs(result) > 0) {
            const exponent = Math.floor(Math.log10(Math.abs(result)));
            const mantissa = result / Math.pow(10, exponent);
            scientificNotation = mantissa.toFixed(4) + ' × 10^' + exponent;
          }
          
          return {
            result,
            scientificNotation,
            steps,
            relatedValues
          };
        }`,
        variables: ['operation', 'x', 'y', 'angleUnit'],
        description: 'Scientific calculator operations'
      }
    ],
    graph: {
      type: 'function',
      showPlot: true,
      animated: true
    },
    relatedCalculators: ['logarithm-calculator', 'exponent-calculator', 'factorial-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'เครื่องคิดเลขวิทยาศาสตร์' : 'Scientific Calculator',
        description: locale === 'th' ? 
          'คำนวณฟังก์ชันทางคณิตศาสตร์ขั้นสูง' :
          'Advanced mathematical functions calculator',
        keywords: ['scientific', 'math', 'trigonometry', 'logarithm'],
        faq: [],
        article: ''
      }
    }
  };
}

// 4. Statistics Calculator
export function createStatisticsCalculator(locale: Locale): Calculator {
  return {
    id: 'statistics-calculator',
    slug: 'statistics-calculator',
    category: 'math',
    icon: '📈',
    color: '#F59E0B',
    inputs: [
      {
        key: 'dataSet',
        label: 'Data Set',
        type: 'textarea',
        required: true,
        placeholder: 'Enter numbers separated by commas or spaces\nExample: 10, 20, 30, 40, 50',
        validation: { required: true }
      },
      {
        key: 'calculations',
        label: 'Calculations to Perform',
        type: 'multiselect',
        required: true,
        defaultValue: ['mean', 'median', 'mode', 'stdDev'],
        options: [
          { value: 'mean', label: 'Mean (Average)' },
          { value: 'median', label: 'Median' },
          { value: 'mode', label: 'Mode' },
          { value: 'range', label: 'Range' },
          { value: 'variance', label: 'Variance' },
          { value: 'stdDev', label: 'Standard Deviation' },
          { value: 'quartiles', label: 'Quartiles' },
          { value: 'outliers', label: 'Outliers' },
          { value: 'skewness', label: 'Skewness' },
          { value: 'kurtosis', label: 'Kurtosis' }
        ]
      },
      {
        key: 'sampleType',
        label: 'Data Type',
        type: 'select',
        required: true,
        defaultValue: 'sample',
        options: [
          { value: 'sample', label: 'Sample Data' },
          { value: 'population', label: 'Population Data' }
        ]
      }
    ],
    outputs: [
      { key: 'count', label: 'Count', format: 'number', precision: 0 },
      { key: 'mean', label: 'Mean', format: 'number', precision: 2, primary: true },
      { key: 'median', label: 'Median', format: 'number', precision: 2 },
      { key: 'mode', label: 'Mode', format: 'text' },
      { key: 'range', label: 'Range', format: 'number', precision: 2 },
      { key: 'variance', label: 'Variance', format: 'number', precision: 2 },
      { key: 'stdDev', label: 'Standard Deviation', format: 'number', precision: 2 },
      { key: 'quartiles', label: 'Quartiles', format: 'text' },
      { key: 'outliers', label: 'Outliers', format: 'text' },
      { key: 'summary', label: 'Five Number Summary', format: 'text' }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({dataSet, calculations, sampleType}) => {
          // Parse data
          const data = dataSet
            .split(/[,\\s]+/)
            .map(v => parseFloat(v))
            .filter(v => !isNaN(v))
            .sort((a, b) => a - b);
          
          if (data.length === 0) {
            return {
              count: 0,
              mean: 0,
              median: 0,
              mode: 'No data',
              range: 0,
              variance: 0,
              stdDev: 0,
              quartiles: 'No data',
              outliers: 'No data',
              summary: 'No data'
            };
          }
          
          const n = data.length;
          
          // Mean
          const mean = data.reduce((sum, val) => sum + val, 0) / n;
          
          // Median
          let median;
          if (n % 2 === 0) {
            median = (data[n/2 - 1] + data[n/2]) / 2;
          } else {
            median = data[Math.floor(n/2)];
          }
          
          // Mode
          const frequency = {};
          let maxFreq = 0;
          data.forEach(val => {
            frequency[val] = (frequency[val] || 0) + 1;
            maxFreq = Math.max(maxFreq, frequency[val]);
          });
          const modes = Object.keys(frequency)
            .filter(key => frequency[key] === maxFreq)
            .map(Number);
          const mode = modes.length === n ? 'No mode' : modes.join(', ');
          
          // Range
          const range = data[n-1] - data[0];
          
          // Variance and Standard Deviation
          const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
          const divisor = sampleType === 'sample' ? n - 1 : n;
          const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / divisor;
          const stdDev = Math.sqrt(variance);
          
          // Quartiles
          const q1Index = Math.floor(n * 0.25);
          const q3Index = Math.floor(n * 0.75);
          const q1 = data[q1Index];
          const q3 = data[q3Index];
          const iqr = q3 - q1;
          const quartiles = 'Q1: ' + q1.toFixed(2) + ', Q2: ' + median.toFixed(2) + ', Q3: ' + q3.toFixed(2);
          
          // Outliers (using 1.5 * IQR rule)
          const lowerBound = q1 - 1.5 * iqr;
          const upperBound = q3 + 1.5 * iqr;
          const outlierValues = data.filter(val => val < lowerBound || val > upperBound);
          const outliers = outlierValues.length > 0 ? outlierValues.join(', ') : 'None';
          
          // Five number summary
          const summary = 'Min: ' + data[0].toFixed(2) + 
                         ', Q1: ' + q1.toFixed(2) + 
                         ', Median: ' + median.toFixed(2) + 
                         ', Q3: ' + q3.toFixed(2) + 
                         ', Max: ' + data[n-1].toFixed(2);
          
          return {
            count: n,
            mean,
            median,
            mode,
            range,
            variance,
            stdDev,
            quartiles,
            outliers,
            summary
          };
        }`,
        variables: ['dataSet', 'calculations', 'sampleType'],
        description: 'Comprehensive statistical analysis'
      }
    ],
    graph: {
      type: 'histogram',
      showBoxPlot: true,
      animated: true
    },
    relatedCalculators: ['mean-median-mode', 'standard-deviation', 'probability-calculator'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณสถิติ' : 'Statistics Calculator',
        description: locale === 'th' ? 
          'วิเคราะห์ข้อมูลทางสถิติแบบครบวงจร' :
          'Comprehensive statistical data analysis',
        keywords: ['statistics', 'mean', 'median', 'standard deviation'],
        faq: [],
        article: ''
      }
    }
  };
}

// 5. Grade Needed Calculator
export function createGradeNeededCalculator(locale: Locale): Calculator {
  const config = educationConfigs[locale] || educationConfigs.en;
  
  return {
    id: 'grade-needed-calculator',
    slug: 'grade-needed-calculator',
    category: 'education',
    icon: '📝',
    color: '#EC4899',
    inputs: [
      {
        key: 'currentGrade',
        label: 'Current Grade',
        type: 'number',
        unit: '%',
        required: true,
        validation: { min: 0, max: 100, required: true },
        placeholder: 'Your current grade'
      },
      {
        key: 'desiredGrade',
        label: 'Desired Final Grade',
        type: 'number',
        unit: '%',
        required: true,
        validation: { min: 0, max: 100, required: true },
        placeholder: 'Grade you want'
      },
      {
        key: 'examWeight',
        label: 'Final Exam Weight',
        type: 'number',
        unit: '%',
        required: true,
        validation: { min: 1, max: 100, required: true },
        placeholder: 'Weight of final exam'
      },
      {
        key: 'extraCredit',
        label: 'Extra Credit Available',
        type: 'number',
        unit: 'points',
        required: false,
        defaultValue: 0,
        validation: { min: 0, max: 20, required: false }
      }
    ],
    outputs: [
      { key: 'gradeNeeded', label: 'Grade Needed on Final', format: 'percentage', precision: 1, primary: true },
      { key: 'letterGrade', label: 'Letter Grade Needed', format: 'text' },
      { key: 'feasibility', label: 'Feasibility', format: 'text' },
      { key: 'safetyMargin', label: 'Safety Margin', format: 'text' },
      { key: 'scenarios', label: 'Grade Scenarios', format: 'text' }
    ],
    formulas: [
      {
        key: 'primary',
        expression: `({currentGrade, desiredGrade, examWeight, extraCredit}) => {
          // Calculate grade needed
          const currentWeight = 100 - examWeight;
          const currentContribution = (currentGrade * currentWeight) / 100;
          const neededContribution = desiredGrade - currentContribution - (extraCredit || 0);
          const gradeNeeded = (neededContribution / examWeight) * 100;
          
          // Determine letter grade needed
          const gradeMap = ${JSON.stringify(config.percentageToGrade)};
          let letterGrade = 'F';
          for (const mapping of gradeMap) {
            if (gradeNeeded >= mapping.min) {
              letterGrade = mapping.grade;
              break;
            }
          }
          
          // Assess feasibility
          let feasibility = '';
          if (gradeNeeded <= 50) {
            feasibility = 'Very Easy - You\\'re in great shape!';
          } else if (gradeNeeded <= 70) {
            feasibility = 'Easy - Achievable with normal effort';
          } else if (gradeNeeded <= 85) {
            feasibility = 'Moderate - Requires good preparation';
          } else if (gradeNeeded <= 95) {
            feasibility = 'Difficult - Requires excellent preparation';
          } else if (gradeNeeded <= 100) {
            feasibility = 'Very Difficult - Perfect score needed';
          } else {
            feasibility = 'Impossible - Grade needed exceeds 100%';
          }
          
          // Calculate safety margin
          let safetyMargin = '';
          if (gradeNeeded <= 100) {
            const margin = 100 - gradeNeeded;
            safetyMargin = 'You can afford to lose ' + margin.toFixed(1) + '% on the final';
          } else {
            const deficit = gradeNeeded - 100;
            safetyMargin = 'You need ' + deficit.toFixed(1) + '% extra credit or curve';
          }
          
          // Generate scenarios
          const scenarios = [];
          const examScores = [100, 90, 80, 70, 60, 50];
          examScores.forEach(score => {
            const finalGrade = ((currentGrade * currentWeight) + (score * examWeight)) / 100 + (extraCredit || 0);
            scenarios.push(score + '% → Final: ' + finalGrade.toFixed(1) + '%');
          });
          
          return {
            gradeNeeded,
            letterGrade: letterGrade + ' (' + gradeNeeded.toFixed(1) + '%)',
            feasibility,
            safetyMargin,
            scenarios: scenarios.join('\\n')
          };
        }`,
        variables: ['currentGrade', 'desiredGrade', 'examWeight', 'extraCredit'],
        description: 'Calculate required final exam grade'
      }
    ],
    graph: {
      type: 'gauge',
      min: 0,
      max: 100,
      zones: [
        { min: 0, max: 60, color: '#10B981', label: 'Easy' },
        { min: 60, max: 80, color: '#F59E0B', label: 'Moderate' },
        { min: 80, max: 95, color: '#EF4444', label: 'Difficult' },
        { min: 95, max: 100, color: '#991B1B', label: 'Very Hard' }
      ],
      animated: true
    },
    relatedCalculators: ['gpa-calculator', 'grade-calculator', 'weighted-average'],
    localizedContent: {
      [locale]: {
        title: locale === 'th' ? 'คำนวณเกรดที่ต้องการ' : 'Grade Needed Calculator',
        description: locale === 'th' ? 
          'คำนวณคะแนนสอบที่ต้องทำเพื่อได้เกรดที่ต้องการ' :
          'Calculate the grade needed on your final exam',
        keywords: ['grade', 'final exam', 'academic', 'study'],
        faq: [],
        article: ''
      }
    }
  };
}

// Export all education calculators batch 3
export const educationCalculatorsBatch3 = [
  createGPACalculator,
  createPercentageCalculator,
  createScientificCalculator,
  createStatisticsCalculator,
  createGradeNeededCalculator
];