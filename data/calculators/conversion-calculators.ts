import { Calculator } from '@/lib/types/calculator';

export const conversionCalculators: Calculator[] = [
  {
    id: 'length-converter',
    slug: 'length-converter',
    category: 'conversion',
    icon: '📏',
    color: '#6366F1',
    inputs: [
      {
        key: 'value',
        label: 'Value to Convert',
        type: 'number',
        defaultValue: 1,
        step: 0.000001,
        required: true
      },
      {
        key: 'fromUnit',
        label: 'From',
        type: 'select',
        defaultValue: 'meter',
        required: true,
        options: [
          { value: 'meter', label: 'Meter (m)' },
          { value: 'kilometer', label: 'Kilometer (km)' },
          { value: 'centimeter', label: 'Centimeter (cm)' },
          { value: 'millimeter', label: 'Millimeter (mm)' },
          { value: 'micrometer', label: 'Micrometer (μm)' },
          { value: 'nanometer', label: 'Nanometer (nm)' },
          { value: 'mile', label: 'Mile (mi)' },
          { value: 'yard', label: 'Yard (yd)' },
          { value: 'foot', label: 'Foot (ft)' },
          { value: 'inch', label: 'Inch (in)' },
          { value: 'nauticalMile', label: 'Nautical Mile' },
          { value: 'lightYear', label: 'Light Year' }
        ]
      },
      {
        key: 'toUnit',
        label: 'To',
        type: 'select',
        defaultValue: 'foot',
        required: true,
        options: [
          { value: 'meter', label: 'Meter (m)' },
          { value: 'kilometer', label: 'Kilometer (km)' },
          { value: 'centimeter', label: 'Centimeter (cm)' },
          { value: 'millimeter', label: 'Millimeter (mm)' },
          { value: 'micrometer', label: 'Micrometer (μm)' },
          { value: 'nanometer', label: 'Nanometer (nm)' },
          { value: 'mile', label: 'Mile (mi)' },
          { value: 'yard', label: 'Yard (yd)' },
          { value: 'foot', label: 'Foot (ft)' },
          { value: 'inch', label: 'Inch (in)' },
          { value: 'nauticalMile', label: 'Nautical Mile' },
          { value: 'lightYear', label: 'Light Year' }
        ]
      }
    ],
    outputs: [
      {
        key: 'result',
        label: 'Converted Value',
        format: 'number',
        decimals: 10,
        description: 'Result of conversion',
        highlight: true
      },
      {
        key: 'formula',
        label: 'Conversion Formula',
        format: 'text',
        description: 'How the conversion works'
      },
      {
        key: 'scientificNotation',
        label: 'Scientific Notation',
        format: 'text',
        description: 'Result in scientific notation'
      },
      {
        key: 'reverseConversion',
        label: 'Reverse Conversion',
        format: 'text',
        description: 'Opposite direction conversion'
      }
    ],
    formulas: [
      {
        key: 'convert',
        expression: `
          // Conversion factors to meters
          const toMeters = {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            micrometer: 0.000001,
            nanometer: 0.000000001,
            mile: 1609.344,
            yard: 0.9144,
            foot: 0.3048,
            inch: 0.0254,
            nauticalMile: 1852,
            lightYear: 9.4607e15
          };
          
          // Convert to meters first, then to target unit
          const meters = value * toMeters[fromUnit];
          const result = meters / toMeters[toUnit];
          
          // Create formula explanation
          const formula = \`1 \${fromUnit} = \${toMeters[fromUnit]} meters, 1 \${toUnit} = \${toMeters[toUnit]} meters\`;
          
          // Scientific notation for very large or small numbers
          let scientificNotation = result.toExponential(4);
          
          // Reverse conversion
          const reverseValue = 1 / (toMeters[fromUnit] / toMeters[toUnit]);
          const reverseConversion = \`1 \${toUnit} = \${reverseValue.toFixed(6)} \${fromUnit}\`;
          
          return {
            result,
            formula,
            scientificNotation,
            reverseConversion
          };
        `,
        description: 'Convert between length units'
      }
    ],
    localizedContent: {
      en: {
        title: 'Length Converter',
        description: 'Convert between meters, feet, inches, kilometers, miles, and more',
        keywords: ['length converter', 'distance converter', 'meter to feet', 'km to miles', 'unit converter'],
        faq: [
          {
            question: 'How accurate are the conversions?',
            answer: 'Conversions use exact international standards. For example, 1 inch = exactly 2.54 cm, 1 foot = exactly 0.3048 meters.'
          },
          {
            question: 'What is the difference between a mile and nautical mile?',
            answer: 'A mile (statute mile) is 1,609.344 meters, used on land. A nautical mile is 1,852 meters, used in aviation and maritime.'
          },
          {
            question: 'Why use scientific notation?',
            answer: 'Scientific notation helps express very large (light years) or very small (nanometers) values clearly and prevents rounding errors.'
          }
        ],
        article: {
          title: 'Understanding Length Measurements',
          introduction: 'Length units vary by country and application, making conversion essential.',
          sections: [
            {
              heading: 'Metric vs Imperial',
              content: 'Metric (meters) is used worldwide except USA, Myanmar, and Liberia. Imperial (feet/inches) remains common in USA construction and aviation.'
            },
            {
              heading: 'Common Conversions',
              content: 'Remember key conversions: 1 inch = 2.54 cm, 1 foot = 30.48 cm, 1 meter = 3.28 feet, 1 mile = 1.61 km.'
            }
          ],
          conclusion: 'Accurate unit conversion is crucial in engineering, science, and international communication.',
          wordCount: 250
        }
      },
      th: {
        title: 'แปลงหน่วยความยาว',
        description: 'แปลงระหว่างเมตร ฟุต นิ้ว กิโลเมตร ไมล์ และอื่นๆ',
        keywords: ['แปลงความยาว', 'แปลงระยะทาง', 'เมตรเป็นฟุต', 'กิโลเมตรเป็นไมล์', 'แปลงหน่วย'],
        faq: [
          {
            question: 'การแปลงแม่นยำแค่ไหน?',
            answer: 'การแปลงใช้มาตรฐานสากลที่แม่นยำ เช่น 1 นิ้ว = 2.54 ซม. พอดี, 1 ฟุต = 0.3048 เมตร พอดี'
          },
          {
            question: 'ไมล์กับไมล์ทะเลต่างกันอย่างไร?',
            answer: 'ไมล์ (statute mile) = 1,609.344 เมตร ใช้บนบก ไมล์ทะเล (nautical mile) = 1,852 เมตร ใช้ในการบินและเดินเรือ'
          }
        ],
        article: {
          title: 'เข้าใจการวัดความยาว',
          introduction: 'หน่วยความยาวแตกต่างกันตามประเทศและการใช้งาน การแปลงจึงสำคัญ',
          sections: [
            {
              heading: 'เมตริกกับอิมพีเรียล',
              content: 'เมตริก (เมตร) ใช้ทั่วโลกยกเว้น สหรัฐฯ พม่า ไลบีเรีย อิมพีเรียล (ฟุต/นิ้ว) ยังใช้ในงานก่อสร้างและการบินของสหรัฐฯ'
            }
          ],
          conclusion: 'การแปลงหน่วยที่แม่นยำสำคัญในวิศวกรรม วิทยาศาสตร์ และการสื่อสารระหว่างประเทศ',
          wordCount: 200
        }
      }
    }
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    category: 'conversion',
    icon: '⚖️',
    color: '#EF4444',
    inputs: [
      {
        key: 'value',
        label: 'Value to Convert',
        type: 'number',
        defaultValue: 1,
        step: 0.000001,
        required: true
      },
      {
        key: 'fromUnit',
        label: 'From',
        type: 'select',
        defaultValue: 'kilogram',
        required: true,
        options: [
          { value: 'kilogram', label: 'Kilogram (kg)' },
          { value: 'gram', label: 'Gram (g)' },
          { value: 'milligram', label: 'Milligram (mg)' },
          { value: 'microgram', label: 'Microgram (μg)' },
          { value: 'metricTon', label: 'Metric Ton (t)' },
          { value: 'pound', label: 'Pound (lb)' },
          { value: 'ounce', label: 'Ounce (oz)' },
          { value: 'stone', label: 'Stone (st)' },
          { value: 'usTon', label: 'US Ton' },
          { value: 'imperialTon', label: 'Imperial Ton' },
          { value: 'carat', label: 'Carat (ct)' },
          { value: 'grain', label: 'Grain (gr)' }
        ]
      },
      {
        key: 'toUnit',
        label: 'To',
        type: 'select',
        defaultValue: 'pound',
        required: true,
        options: [
          { value: 'kilogram', label: 'Kilogram (kg)' },
          { value: 'gram', label: 'Gram (g)' },
          { value: 'milligram', label: 'Milligram (mg)' },
          { value: 'microgram', label: 'Microgram (μg)' },
          { value: 'metricTon', label: 'Metric Ton (t)' },
          { value: 'pound', label: 'Pound (lb)' },
          { value: 'ounce', label: 'Ounce (oz)' },
          { value: 'stone', label: 'Stone (st)' },
          { value: 'usTon', label: 'US Ton' },
          { value: 'imperialTon', label: 'Imperial Ton' },
          { value: 'carat', label: 'Carat (ct)' },
          { value: 'grain', label: 'Grain (gr)' }
        ]
      }
    ],
    outputs: [
      {
        key: 'result',
        label: 'Converted Value',
        format: 'number',
        decimals: 10,
        description: 'Result of conversion',
        highlight: true
      },
      {
        key: 'formula',
        label: 'Conversion Factor',
        format: 'text',
        description: 'Conversion relationship'
      },
      {
        key: 'commonEquivalents',
        label: 'Common Equivalents',
        format: 'text',
        description: 'Useful reference values'
      }
    ],
    formulas: [
      {
        key: 'convert',
        expression: `
          // Conversion factors to kilograms
          const toKilograms = {
            kilogram: 1,
            gram: 0.001,
            milligram: 0.000001,
            microgram: 0.000000001,
            metricTon: 1000,
            pound: 0.45359237,
            ounce: 0.028349523125,
            stone: 6.35029318,
            usTon: 907.18474,
            imperialTon: 1016.0469088,
            carat: 0.0002,
            grain: 0.00006479891
          };
          
          // Convert to kilograms first, then to target unit
          const kilograms = value * toKilograms[fromUnit];
          const result = kilograms / toKilograms[toUnit];
          
          // Create conversion factor
          const factor = toKilograms[fromUnit] / toKilograms[toUnit];
          const formula = \`1 \${fromUnit} = \${factor.toFixed(6)} \${toUnit}\`;
          
          // Common equivalents
          let commonEquivalents = '';
          if (fromUnit === 'kilogram' || toUnit === 'kilogram') {
            commonEquivalents = '1 kg = 2.20462 lb, 1 lb = 0.453592 kg';
          } else if (fromUnit === 'pound' || toUnit === 'pound') {
            commonEquivalents = '1 lb = 16 oz, 1 stone = 14 lb';
          } else if (fromUnit === 'gram' || toUnit === 'gram') {
            commonEquivalents = '1 kg = 1000 g, 1 g = 1000 mg';
          }
          
          return {
            result,
            formula,
            commonEquivalents
          };
        `,
        description: 'Convert between weight/mass units'
      }
    ],
    localizedContent: {
      en: {
        title: 'Weight Converter',
        description: 'Convert between kilograms, pounds, ounces, grams, tons, and more',
        keywords: ['weight converter', 'mass converter', 'kg to lbs', 'pounds to kilograms', 'weight conversion'],
        faq: [
          {
            question: 'Is weight the same as mass?',
            answer: 'Technically no. Mass is constant, weight varies with gravity. However, on Earth, we commonly use them interchangeably.'
          },
          {
            question: 'Why are there different tons?',
            answer: 'Metric ton = 1000 kg, US ton (short ton) = 2000 lb = 907.18 kg, Imperial ton (long ton) = 2240 lb = 1016.05 kg.'
          },
          {
            question: 'What is a stone?',
            answer: 'Stone is a British unit equal to 14 pounds (6.35 kg), commonly used for body weight in the UK.'
          }
        ],
        article: {
          title: 'Weight and Mass Conversions',
          introduction: 'Understanding weight units is essential for cooking, shipping, science, and health.',
          sections: [
            {
              heading: 'Key Conversions',
              content: 'Memorize: 1 kg = 2.2 lb, 1 lb = 454 g, 1 oz = 28.35 g. These cover most daily needs.'
            },
            {
              heading: 'Precision Matters',
              content: 'For cooking, round to nearest gram. For science, use full precision. For shipping, follow carrier standards.'
            }
          ],
          conclusion: 'Accurate weight conversion prevents errors in recipes, dosages, and shipping costs.',
          wordCount: 250
        }
      }
    }
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    category: 'conversion',
    icon: '🌡️',
    color: '#F59E0B',
    inputs: [
      {
        key: 'value',
        label: 'Temperature Value',
        type: 'number',
        defaultValue: 0,
        step: 0.1,
        required: true
      },
      {
        key: 'fromUnit',
        label: 'From',
        type: 'select',
        defaultValue: 'celsius',
        required: true,
        options: [
          { value: 'celsius', label: 'Celsius (°C)' },
          { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
          { value: 'kelvin', label: 'Kelvin (K)' },
          { value: 'rankine', label: 'Rankine (°R)' },
          { value: 'reaumur', label: 'Réaumur (°Ré)' }
        ]
      },
      {
        key: 'toUnit',
        label: 'To',
        type: 'select',
        defaultValue: 'fahrenheit',
        required: true,
        options: [
          { value: 'celsius', label: 'Celsius (°C)' },
          { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
          { value: 'kelvin', label: 'Kelvin (K)' },
          { value: 'rankine', label: 'Rankine (°R)' },
          { value: 'reaumur', label: 'Réaumur (°Ré)' }
        ]
      }
    ],
    outputs: [
      {
        key: 'result',
        label: 'Converted Temperature',
        format: 'number',
        decimals: 2,
        description: 'Temperature in target unit',
        highlight: true
      },
      {
        key: 'absoluteZero',
        label: 'Absolute Zero',
        format: 'text',
        description: 'Absolute zero in this scale'
      },
      {
        key: 'waterFreeze',
        label: 'Water Freezes',
        format: 'text',
        description: 'Freezing point of water'
      },
      {
        key: 'waterBoil',
        label: 'Water Boils',
        format: 'text',
        description: 'Boiling point of water'
      },
      {
        key: 'formula',
        label: 'Conversion Formula',
        format: 'text',
        description: 'Mathematical formula used'
      }
    ],
    formulas: [
      {
        key: 'convert',
        expression: `
          // Convert to Celsius first
          let celsius = value;
          
          switch (fromUnit) {
            case 'fahrenheit':
              celsius = (value - 32) * 5/9;
              break;
            case 'kelvin':
              celsius = value - 273.15;
              break;
            case 'rankine':
              celsius = (value - 491.67) * 5/9;
              break;
            case 'reaumur':
              celsius = value * 5/4;
              break;
          }
          
          // Convert from Celsius to target unit
          let result = celsius;
          let formula = '';
          
          switch (toUnit) {
            case 'celsius':
              result = celsius;
              formula = 'Direct conversion to Celsius';
              break;
            case 'fahrenheit':
              result = celsius * 9/5 + 32;
              formula = '°F = °C × 9/5 + 32';
              break;
            case 'kelvin':
              result = celsius + 273.15;
              formula = 'K = °C + 273.15';
              break;
            case 'rankine':
              result = (celsius + 273.15) * 9/5;
              formula = '°R = (°C + 273.15) × 9/5';
              break;
            case 'reaumur':
              result = celsius * 4/5;
              formula = '°Ré = °C × 4/5';
              break;
          }
          
          // Reference points
          const references = {
            celsius: { zero: '-273.15°C', freeze: '0°C', boil: '100°C' },
            fahrenheit: { zero: '-459.67°F', freeze: '32°F', boil: '212°F' },
            kelvin: { zero: '0 K', freeze: '273.15 K', boil: '373.15 K' },
            rankine: { zero: '0°R', freeze: '491.67°R', boil: '671.67°R' },
            reaumur: { zero: '-218.52°Ré', freeze: '0°Ré', boil: '80°Ré' }
          };
          
          return {
            result,
            absoluteZero: references[toUnit].zero,
            waterFreeze: references[toUnit].freeze,
            waterBoil: references[toUnit].boil,
            formula
          };
        `,
        description: 'Convert between temperature scales'
      }
    ],
    localizedContent: {
      en: {
        title: 'Temperature Converter',
        description: 'Convert between Celsius, Fahrenheit, Kelvin, and other temperature scales',
        keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin converter'],
        faq: [
          {
            question: 'Why does water freeze at 32°F?',
            answer: 'Fahrenheit set 0°F as the freezing point of a salt-water mixture and 96°F as body temperature. This puts water\'s freezing point at 32°F.'
          },
          {
            question: 'What is absolute zero?',
            answer: 'Absolute zero (-273.15°C, -459.67°F, 0 K) is the theoretical temperature where all molecular motion stops.'
          },
          {
            question: 'When to use Kelvin?',
            answer: 'Kelvin is used in science because it starts at absolute zero and has no negative values. Temperature differences in Kelvin equal those in Celsius.'
          }
        ],
        article: {
          title: 'Understanding Temperature Scales',
          introduction: 'Different temperature scales serve different purposes across science, weather, and cooking.',
          sections: [
            {
              heading: 'Common Scales',
              content: 'Celsius: Used worldwide, 0°C = water freezes. Fahrenheit: Used in USA, more granular for weather. Kelvin: Scientific standard, starts at absolute zero.'
            },
            {
              heading: 'Quick Conversions',
              content: 'C to F: Double and add 30 (approximate). F to C: Subtract 30 and halve. Exact: °F = °C × 1.8 + 32.'
            }
          ],
          conclusion: 'Understanding temperature conversions helps in cooking, travel, and scientific work.',
          wordCount: 280
        }
      }
    }
  }
];

// Export function to get all conversion calculators
export function getConversionCalculators(): Calculator[] {
  return conversionCalculators;
}

// Export function to get calculator by slug
export function getConversionCalculatorBySlug(slug: string): Calculator | undefined {
  return conversionCalculators.find(calc => calc.slug === slug);
}