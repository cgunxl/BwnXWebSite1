import { Calculator } from '@/lib/types/calculator';

export const environmentCalculators: Calculator[] = [
  {
    id: 'carbon-footprint-calculator',
    slug: 'carbon-footprint-calculator',
    category: 'environment',
    icon: '🌍',
    color: '#059669',
    inputs: [
      {
        key: 'electricityUsage',
        label: 'Monthly Electricity Usage',
        type: 'number',
        defaultValue: 500,
        min: 0,
        max: 10000,
        step: 10,
        required: true,
        unit: 'kWh'
      },
      {
        key: 'gasUsage',
        label: 'Monthly Natural Gas Usage',
        type: 'number',
        defaultValue: 50,
        min: 0,
        max: 1000,
        step: 1,
        required: false,
        unit: 'therms'
      },
      {
        key: 'carMileage',
        label: 'Monthly Car Mileage',
        type: 'number',
        defaultValue: 1000,
        min: 0,
        max: 10000,
        step: 10,
        required: true,
        unit: 'miles'
      },
      {
        key: 'carType',
        label: 'Vehicle Type',
        type: 'select',
        defaultValue: 'sedan',
        required: true,
        options: [
          { value: 'small', label: 'Small Car (40+ MPG)' },
          { value: 'sedan', label: 'Sedan (25-40 MPG)' },
          { value: 'suv', label: 'SUV/Truck (15-25 MPG)' },
          { value: 'hybrid', label: 'Hybrid (50+ MPG)' },
          { value: 'electric', label: 'Electric Vehicle' },
          { value: 'none', label: 'No Car' }
        ]
      },
      {
        key: 'flightsPerYear',
        label: 'Flights Per Year',
        type: 'select',
        defaultValue: '2',
        required: false,
        options: [
          { value: '0', label: 'None' },
          { value: '1', label: '1-2 short flights' },
          { value: '2', label: '3-5 short flights' },
          { value: '3', label: '1-2 long flights' },
          { value: '4', label: '3+ long flights' }
        ]
      },
      {
        key: 'diet',
        label: 'Diet Type',
        type: 'select',
        defaultValue: 'average',
        required: true,
        options: [
          { value: 'meat-heavy', label: 'Meat Heavy (Daily)' },
          { value: 'average', label: 'Average (Meat 3-4x/week)' },
          { value: 'low-meat', label: 'Low Meat (1-2x/week)' },
          { value: 'vegetarian', label: 'Vegetarian' },
          { value: 'vegan', label: 'Vegan' }
        ]
      },
      {
        key: 'recycling',
        label: 'Recycling Habits',
        type: 'select',
        defaultValue: 'sometimes',
        required: false,
        options: [
          { value: 'never', label: 'Never recycle' },
          { value: 'sometimes', label: 'Sometimes recycle' },
          { value: 'often', label: 'Often recycle' },
          { value: 'always', label: 'Always recycle' }
        ]
      },
      {
        key: 'householdSize',
        label: 'Household Size',
        type: 'number',
        defaultValue: 2,
        min: 1,
        max: 10,
        step: 1,
        required: true,
        tooltip: 'Number of people in household'
      }
    ],
    outputs: [
      {
        key: 'totalCO2',
        label: 'Total Annual CO₂ Emissions',
        format: 'number',
        decimals: 2,
        unit: 'tons',
        description: 'Your carbon footprint',
        highlight: true
      },
      {
        key: 'electricityCO2',
        label: 'Electricity Emissions',
        format: 'number',
        decimals: 2,
        unit: 'tons/year',
        description: 'From power usage'
      },
      {
        key: 'transportCO2',
        label: 'Transportation Emissions',
        format: 'number',
        decimals: 2,
        unit: 'tons/year',
        description: 'From driving & flying'
      },
      {
        key: 'homeCO2',
        label: 'Home Energy Emissions',
        format: 'number',
        decimals: 2,
        unit: 'tons/year',
        description: 'Heating & cooling'
      },
      {
        key: 'dietCO2',
        label: 'Diet Emissions',
        format: 'number',
        decimals: 2,
        unit: 'tons/year',
        description: 'Food choices impact'
      },
      {
        key: 'comparison',
        label: 'Comparison',
        format: 'text',
        description: 'vs average person',
        highlight: true
      },
      {
        key: 'treesNeeded',
        label: 'Trees to Offset',
        format: 'number',
        decimals: 0,
        description: 'Trees needed annually'
      },
      {
        key: 'reductionTips',
        label: 'Top Reduction Tips',
        format: 'text',
        description: 'Ways to reduce footprint'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // CO2 emissions factors (in kg CO2)
          const CO2_PER_KWH = 0.92; // US average
          const CO2_PER_THERM = 5.3;
          const CO2_PER_GALLON = 8.887;
          
          // Calculate electricity emissions (tons/year)
          const electricityCO2 = (electricityUsage * 12 * CO2_PER_KWH) / 1000;
          
          // Calculate gas/heating emissions
          const gasCO2 = (gasUsage * 12 * CO2_PER_THERM) / 1000;
          
          // Calculate car emissions
          let mpg = 25; // default
          if (carType === 'small') mpg = 40;
          else if (carType === 'sedan') mpg = 30;
          else if (carType === 'suv') mpg = 20;
          else if (carType === 'hybrid') mpg = 50;
          else if (carType === 'electric') mpg = 100; // equivalent
          else if (carType === 'none') mpg = 0;
          
          const gallonsPerMonth = mpg > 0 ? carMileage / mpg : 0;
          const carCO2 = (gallonsPerMonth * 12 * CO2_PER_GALLON) / 1000;
          
          // Calculate flight emissions
          let flightCO2 = 0;
          if (flightsPerYear === '1') flightCO2 = 0.9; // tons
          else if (flightsPerYear === '2') flightCO2 = 2.2;
          else if (flightsPerYear === '3') flightCO2 = 3.5;
          else if (flightsPerYear === '4') flightCO2 = 6.0;
          
          const transportCO2 = carCO2 + flightCO2;
          const homeCO2 = electricityCO2 + gasCO2;
          
          // Calculate diet emissions (tons/year)
          let dietCO2 = 2.5; // average
          if (diet === 'meat-heavy') dietCO2 = 3.3;
          else if (diet === 'average') dietCO2 = 2.5;
          else if (diet === 'low-meat') dietCO2 = 1.9;
          else if (diet === 'vegetarian') dietCO2 = 1.7;
          else if (diet === 'vegan') dietCO2 = 1.5;
          
          // Apply recycling reduction
          let recyclingReduction = 0;
          if (recycling === 'sometimes') recyclingReduction = 0.1;
          else if (recycling === 'often') recyclingReduction = 0.2;
          else if (recycling === 'always') recyclingReduction = 0.3;
          
          // Calculate total per person
          let totalCO2 = (homeCO2 + transportCO2 + dietCO2) * (1 - recyclingReduction);
          totalCO2 = totalCO2 / householdSize; // Per person in household
          
          // Comparison to average (US average is 16 tons)
          const usAverage = 16;
          const worldAverage = 4;
          let comparison = '';
          
          if (totalCO2 < worldAverage) {
            comparison = 'Excellent! ' + ((worldAverage / totalCO2 - 1) * 100).toFixed(0) + '% below world average';
          } else if (totalCO2 < usAverage * 0.5) {
            comparison = 'Great! ' + ((usAverage / totalCO2 - 1) * 100).toFixed(0) + '% below US average';
          } else if (totalCO2 < usAverage) {
            comparison = 'Good! ' + ((usAverage - totalCO2) / usAverage * 100).toFixed(0) + '% below US average';
          } else {
            comparison = 'High: ' + ((totalCO2 / usAverage - 1) * 100).toFixed(0) + '% above US average';
          }
          
          // Trees needed to offset (1 tree absorbs ~48 lbs CO2/year)
          const treesNeeded = Math.ceil(totalCO2 * 2000 / 48);
          
          // Reduction tips based on biggest contributors
          const tips = [];
          if (transportCO2 > totalCO2 * 0.3) {
            tips.push('Reduce driving or switch to electric/hybrid');
          }
          if (electricityCO2 > totalCO2 * 0.3) {
            tips.push('Switch to renewable energy or reduce usage');
          }
          if (diet === 'meat-heavy' || diet === 'average') {
            tips.push('Reduce meat consumption');
          }
          if (flightsPerYear !== '0') {
            tips.push('Reduce air travel or buy offsets');
          }
          tips.push('Improve home insulation', 'Use public transport');
          
          const reductionTips = tips.slice(0, 3).join('; ');
          
          return {
            totalCO2,
            electricityCO2,
            transportCO2,
            homeCO2,
            dietCO2,
            comparison,
            treesNeeded,
            reductionTips
          };
        `,
        description: 'Calculate personal carbon footprint'
      }
    ],
    localizedContent: {
      en: {
        title: 'Carbon Footprint Calculator',
        description: 'Calculate your personal carbon footprint and find ways to reduce emissions',
        keywords: ['carbon footprint calculator', 'CO2 emissions', 'carbon calculator', 'environmental impact', 'climate change'],
        faq: [
          {
            question: 'What is a carbon footprint?',
            answer: 'Your carbon footprint is the total greenhouse gas emissions caused by your activities, measured in tons of CO2 equivalent per year.'
          },
          {
            question: 'What is the average carbon footprint?',
            answer: 'US average: 16 tons/year. European: 7 tons. World: 4 tons. Target for climate goals: 2 tons by 2050.'
          },
          {
            question: 'How can I reduce my carbon footprint?',
            answer: 'Top ways: Use renewable energy, drive less/electric, fly less, eat less meat, improve home efficiency, buy local, reduce/reuse/recycle.'
          },
          {
            question: 'How do carbon offsets work?',
            answer: 'Carbon offsets fund projects that remove CO2 from atmosphere (tree planting, renewable energy). Buy offsets equal to your emissions to be "carbon neutral".'
          },
          {
            question: 'Why does diet affect carbon footprint?',
            answer: 'Food production causes emissions. Meat (especially beef) has highest impact due to methane, land use, and feed production. Plant-based foods have lower impact.'
          }
        ],
        article: {
          title: 'Understanding Your Carbon Footprint',
          introduction: 'Climate change requires individual action. Understanding your carbon footprint is the first step to reducing your environmental impact.',
          sections: [
            {
              heading: 'Major Contributors',
              content: 'Transportation (29%), electricity (25%), industry (23%), commercial/residential (13%), agriculture (10%). Personal choices affect all categories.'
            },
            {
              heading: 'Reduction Strategies',
              content: 'Energy: switch to renewable, improve efficiency. Transport: electric vehicles, public transit, bike. Diet: reduce meat, buy local. Lifestyle: reduce, reuse, recycle.'
            },
            {
              heading: 'Carbon Neutrality',
              content: 'Reduce emissions first, then offset remainder. Support verified offset projects. Consider lifestyle changes for permanent reduction.'
            }
          ],
          conclusion: 'Small changes multiplied by millions of people create significant impact. Start reducing your footprint today.',
          wordCount: 350
        }
      },
      th: {
        title: 'คำนวณคาร์บอนฟุตพริ้นท์',
        description: 'คำนวณการปล่อยก๊าซเรือนกระจกและหาวิธีลดผลกระทบต่อสิ่งแวดล้อม',
        keywords: ['คำนวณคาร์บอนฟุตพริ้นท์', 'ก๊าซเรือนกระจก', 'CO2', 'สิ่งแวดล้อม', 'โลกร้อน'],
        faq: [
          {
            question: 'คาร์บอนฟุตพริ้นท์คืออะไร?',
            answer: 'คาร์บอนฟุตพริ้นท์คือปริมาณก๊าซเรือนกระจกทั้งหมดที่เกิดจากกิจกรรมของเรา วัดเป็นตัน CO2 ต่อปี'
          },
          {
            question: 'ค่าเฉลี่ยคาร์บอนฟุตพริ้นท์เท่าไหร่?',
            answer: 'สหรัฐฯ: 16 ตัน/ปี ยุโรป: 7 ตัน โลก: 4 ตัน เป้าหมาย 2050: 2 ตัน'
          }
        ],
        article: {
          title: 'เข้าใจคาร์บอนฟุตพริ้นท์ของคุณ',
          introduction: 'การเปลี่ยนแปลงสภาพภูมิอากาศต้องการการกระทำจากทุกคน การเข้าใจคาร์บอนฟุตพริ้นท์เป็นก้าวแรก',
          sections: [
            {
              heading: 'ปัจจัยหลัก',
              content: 'การขนส่ง (29%), ไฟฟ้า (25%), อุตสาหกรรม (23%), ที่อยู่อาศัย (13%), เกษตร (10%)'
            }
          ],
          conclusion: 'การเปลี่ยนแปลงเล็กๆ จากหลายล้านคนสร้างผลกระทบใหญ่ เริ่มลดคาร์บอนฟุตพริ้นท์วันนี้',
          wordCount: 300
        }
      }
    }
  },
  {
    id: 'solar-savings-calculator',
    slug: 'solar-savings-calculator',
    category: 'environment',
    icon: '☀️',
    color: '#F59E0B',
    inputs: [
      {
        key: 'monthlyBill',
        label: 'Average Monthly Electric Bill',
        type: 'number',
        defaultValue: 150,
        min: 0,
        max: 1000,
        step: 10,
        required: true,
        unit: '$'
      },
      {
        key: 'roofArea',
        label: 'Available Roof Area',
        type: 'number',
        defaultValue: 500,
        min: 100,
        max: 5000,
        step: 50,
        required: true,
        unit: 'sq ft',
        tooltip: 'South-facing roof area'
      },
      {
        key: 'sunHours',
        label: 'Peak Sun Hours/Day',
        type: 'select',
        defaultValue: '5',
        required: true,
        options: [
          { value: '3', label: '3 hours (Northern states)' },
          { value: '4', label: '4 hours (Midwest)' },
          { value: '5', label: '5 hours (Average)' },
          { value: '6', label: '6 hours (Southwest)' },
          { value: '7', label: '7 hours (Desert regions)' }
        ]
      },
      {
        key: 'electricityRate',
        label: 'Electricity Rate',
        type: 'number',
        defaultValue: 0.13,
        min: 0.05,
        max: 0.50,
        step: 0.01,
        required: true,
        unit: '$/kWh'
      },
      {
        key: 'systemCost',
        label: 'System Cost per Watt',
        type: 'number',
        defaultValue: 3,
        min: 2,
        max: 5,
        step: 0.1,
        required: true,
        unit: '$/W',
        tooltip: 'Average $2.50-3.50/W'
      },
      {
        key: 'incentives',
        label: 'Tax Credits & Incentives',
        type: 'slider',
        defaultValue: 30,
        min: 0,
        max: 50,
        step: 5,
        required: false,
        unit: '%',
        tooltip: 'Federal tax credit: 30%'
      },
      {
        key: 'financingOption',
        label: 'Payment Option',
        type: 'select',
        defaultValue: 'cash',
        required: true,
        options: [
          { value: 'cash', label: 'Cash Purchase' },
          { value: 'loan', label: 'Solar Loan (5% APR)' },
          { value: 'lease', label: 'Solar Lease' },
          { value: 'ppa', label: 'Power Purchase Agreement' }
        ]
      }
    ],
    outputs: [
      {
        key: 'systemSize',
        label: 'Recommended System Size',
        format: 'number',
        decimals: 1,
        unit: 'kW',
        description: 'Solar system capacity'
      },
      {
        key: 'panelsNeeded',
        label: 'Number of Panels',
        format: 'number',
        decimals: 0,
        description: '400W panels',
        highlight: true
      },
      {
        key: 'totalCost',
        label: 'Total System Cost',
        format: 'currency',
        decimals: 0,
        description: 'Before incentives'
      },
      {
        key: 'netCost',
        label: 'Net Cost After Incentives',
        format: 'currency',
        decimals: 0,
        description: 'Your actual cost',
        highlight: true
      },
      {
        key: 'annualSavings',
        label: 'Annual Savings',
        format: 'currency',
        decimals: 0,
        description: 'Electricity savings/year'
      },
      {
        key: 'paybackPeriod',
        label: 'Payback Period',
        format: 'number',
        decimals: 1,
        unit: 'years',
        description: 'Break-even time',
        highlight: true
      },
      {
        key: 'lifetimeSavings',
        label: '25-Year Savings',
        format: 'currency',
        decimals: 0,
        description: 'Total savings'
      },
      {
        key: 'roi',
        label: 'Return on Investment',
        format: 'percentage',
        decimals: 1,
        description: '25-year ROI'
      },
      {
        key: 'co2Reduction',
        label: 'CO₂ Reduction',
        format: 'number',
        decimals: 1,
        unit: 'tons/year',
        description: 'Environmental impact'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate monthly energy usage
          const monthlyUsage = monthlyBill / electricityRate; // kWh/month
          const annualUsage = monthlyUsage * 12;
          
          // Calculate system size needed
          const sunHoursNum = parseFloat(sunHours);
          const dailyProduction = monthlyUsage / 30; // kWh/day needed
          const systemSize = dailyProduction / sunHoursNum; // kW system size
          
          // Check roof space (assume 20 sq ft per panel, 400W panels)
          const maxPanels = Math.floor(roofArea / 20);
          const panelsNeeded = Math.ceil((systemSize * 1000) / 400);
          
          // Adjust system size if roof space is limited
          const actualPanels = Math.min(panelsNeeded, maxPanels);
          const actualSystemSize = (actualPanels * 400) / 1000; // kW
          
          // Calculate costs
          const totalCost = actualSystemSize * 1000 * systemCost;
          const incentiveAmount = totalCost * (incentives / 100);
          const netCost = totalCost - incentiveAmount;
          
          // Calculate savings
          const annualProduction = actualSystemSize * sunHoursNum * 365; // kWh/year
          const annualSavings = Math.min(annualProduction * electricityRate, monthlyBill * 12);
          
          // Calculate financing costs
          let effectiveCost = netCost;
          if (financingOption === 'loan') {
            // 10-year loan at 5% APR
            const loanInterest = netCost * 0.05 * 10 * 0.5; // Simple interest approximation
            effectiveCost = netCost + loanInterest;
          } else if (financingOption === 'lease' || financingOption === 'ppa') {
            effectiveCost = 0; // No upfront cost
          }
          
          // Calculate payback period
          let paybackPeriod = 0;
          if (financingOption === 'cash' || financingOption === 'loan') {
            paybackPeriod = effectiveCost / annualSavings;
          } else {
            paybackPeriod = 0; // Immediate savings with lease/PPA
          }
          
          // Calculate lifetime savings (25 years)
          // Account for 3% annual electricity rate increase
          let lifetimeSavings = 0;
          let currentSavings = annualSavings;
          for (let year = 1; year <= 25; year++) {
            lifetimeSavings += currentSavings;
            currentSavings *= 1.03; // 3% annual increase
          }
          
          if (financingOption === 'lease' || financingOption === 'ppa') {
            lifetimeSavings *= 0.2; // Only save about 20% with lease/PPA
          } else {
            lifetimeSavings -= effectiveCost; // Subtract system cost
          }
          
          // Calculate ROI
          const roi = effectiveCost > 0 ? ((lifetimeSavings / effectiveCost) * 100) : 100;
          
          // Calculate CO2 reduction (0.92 lbs CO2 per kWh)
          const co2Reduction = (annualProduction * 0.92) / 2000; // tons/year
          
          return {
            systemSize: actualSystemSize,
            panelsNeeded: actualPanels,
            totalCost,
            netCost,
            annualSavings,
            paybackPeriod,
            lifetimeSavings,
            roi,
            co2Reduction
          };
        `,
        description: 'Calculate solar panel savings and ROI'
      }
    ],
    localizedContent: {
      en: {
        title: 'Solar Savings Calculator',
        description: 'Calculate solar panel costs, savings, ROI, and environmental impact',
        keywords: ['solar calculator', 'solar savings', 'solar panel cost', 'solar ROI', 'renewable energy'],
        faq: [
          {
            question: 'How much do solar panels cost?',
            answer: 'Average cost is $2.50-3.50 per watt. A 6kW system costs $15,000-21,000 before incentives, $10,500-14,700 after 30% federal tax credit.'
          },
          {
            question: 'Do solar panels really save money?',
            answer: 'Yes! Most systems pay for themselves in 6-10 years and save $20,000-50,000 over 25 years. Savings depend on location, electricity rates, and system size.'
          },
          {
            question: 'How long do solar panels last?',
            answer: 'Solar panels last 25-30+ years with warranties typically covering 25 years. They degrade slowly, producing 80-85% of original capacity after 25 years.'
          },
          {
            question: 'What affects solar panel efficiency?',
            answer: 'Location (sun hours), roof angle/direction (south-facing best), shading, temperature (cooler is better), panel quality, and maintenance.'
          }
        ],
        article: {
          title: 'Going Solar: Complete Guide',
          introduction: 'Solar energy is now affordable and accessible for most homeowners, offering significant savings and environmental benefits.',
          sections: [
            {
              heading: 'Is Solar Right for You?',
              content: 'Good candidates: own home, south-facing roof, good credit, high electricity bills, planning to stay 5+ years. Check local incentives and net metering policies.'
            },
            {
              heading: 'Financing Options',
              content: 'Cash: best ROI. Loan: own system, no money down. Lease/PPA: no upfront cost but lower savings. Consider federal tax credit (30% through 2032).'
            }
          ],
          conclusion: 'Solar is a smart investment that pays dividends through savings and increased home value.',
          wordCount: 320
        }
      }
    }
  },
  {
    id: 'ev-charging-cost-calculator',
    slug: 'ev-charging-cost-calculator',
    category: 'environment',
    icon: '🔌',
    color: '#3B82F6',
    inputs: [
      {
        key: 'batteryCapacity',
        label: 'Battery Capacity',
        type: 'number',
        defaultValue: 75,
        min: 20,
        max: 200,
        step: 5,
        required: true,
        unit: 'kWh',
        tooltip: 'Total battery size'
      },
      {
        key: 'currentCharge',
        label: 'Current Charge Level',
        type: 'slider',
        defaultValue: 20,
        min: 0,
        max: 100,
        step: 5,
        required: true,
        unit: '%'
      },
      {
        key: 'targetCharge',
        label: 'Target Charge Level',
        type: 'slider',
        defaultValue: 80,
        min: 0,
        max: 100,
        step: 5,
        required: true,
        unit: '%',
        tooltip: '80% recommended for battery life'
      },
      {
        key: 'chargingLocation',
        label: 'Charging Location',
        type: 'select',
        defaultValue: 'home',
        required: true,
        options: [
          { value: 'home', label: 'Home (Level 2)' },
          { value: 'public-l2', label: 'Public Level 2' },
          { value: 'public-dc', label: 'DC Fast Charging' },
          { value: 'supercharger', label: 'Tesla Supercharger' }
        ]
      },
      {
        key: 'electricityRate',
        label: 'Electricity Rate',
        type: 'number',
        defaultValue: 0.13,
        min: 0.05,
        max: 0.50,
        step: 0.01,
        required: true,
        unit: '$/kWh',
        dependsOn: ['chargingLocation'],
        showWhen: { chargingLocation: 'home' }
      },
      {
        key: 'milesPerMonth',
        label: 'Miles Driven per Month',
        type: 'number',
        defaultValue: 1000,
        min: 0,
        max: 5000,
        step: 50,
        required: true
      },
      {
        key: 'efficiency',
        label: 'Vehicle Efficiency',
        type: 'number',
        defaultValue: 3.5,
        min: 2,
        max: 5,
        step: 0.1,
        required: true,
        unit: 'mi/kWh',
        tooltip: 'Miles per kWh'
      }
    ],
    outputs: [
      {
        key: 'energyNeeded',
        label: 'Energy Needed',
        format: 'number',
        decimals: 2,
        unit: 'kWh',
        description: 'To reach target charge'
      },
      {
        key: 'chargingCost',
        label: 'Charging Cost',
        format: 'currency',
        decimals: 2,
        description: 'This session cost',
        highlight: true
      },
      {
        key: 'chargingTime',
        label: 'Charging Time',
        format: 'text',
        description: 'Estimated duration',
        highlight: true
      },
      {
        key: 'rangeAdded',
        label: 'Range Added',
        format: 'number',
        decimals: 0,
        unit: 'miles',
        description: 'Driving range gained'
      },
      {
        key: 'costPerMile',
        label: 'Cost per Mile',
        format: 'currency',
        decimals: 3,
        description: 'Fuel cost equivalent'
      },
      {
        key: 'monthlyCost',
        label: 'Monthly Charging Cost',
        format: 'currency',
        decimals: 2,
        description: 'Based on driving habits'
      },
      {
        key: 'gasSavings',
        label: 'vs Gas Car Savings',
        format: 'currency',
        decimals: 2,
        description: 'Monthly fuel savings',
        highlight: true
      },
      {
        key: 'co2Avoided',
        label: 'CO₂ Avoided',
        format: 'number',
        decimals: 1,
        unit: 'lbs/month',
        description: 'Environmental benefit'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate energy needed
          const chargeNeeded = targetCharge - currentCharge;
          const energyNeeded = batteryCapacity * (chargeNeeded / 100);
          
          // Charging efficiency (typically 85-90%)
          const chargingEfficiency = 0.88;
          const actualEnergyNeeded = energyNeeded / chargingEfficiency;
          
          // Calculate cost based on location
          let ratePerKwh = 0;
          let chargingSpeed = 0; // kW
          
          if (chargingLocation === 'home') {
            ratePerKwh = electricityRate;
            chargingSpeed = 7.2; // Level 2 home charger
          } else if (chargingLocation === 'public-l2') {
            ratePerKwh = 0.20; // Average public L2 rate
            chargingSpeed = 7.2;
          } else if (chargingLocation === 'public-dc') {
            ratePerKwh = 0.35; // DC fast charging rate
            chargingSpeed = 50; // 50kW DC fast charger
          } else if (chargingLocation === 'supercharger') {
            ratePerKwh = 0.28; // Tesla Supercharger average
            chargingSpeed = 150; // V3 Supercharger
          }
          
          const chargingCost = actualEnergyNeeded * ratePerKwh;
          
          // Calculate charging time
          let chargingHours = energyNeeded / chargingSpeed;
          
          // DC fast charging slows down after 80%
          if ((chargingLocation === 'public-dc' || chargingLocation === 'supercharger') && targetCharge > 80) {
            const fastChargeEnergy = batteryCapacity * 0.6; // 20% to 80%
            const slowChargeEnergy = batteryCapacity * ((targetCharge - 80) / 100);
            chargingHours = (fastChargeEnergy / chargingSpeed) + (slowChargeEnergy / (chargingSpeed * 0.3));
          }
          
          let chargingTime = '';
          if (chargingHours < 1) {
            chargingTime = Math.round(chargingHours * 60) + ' minutes';
          } else {
            const hours = Math.floor(chargingHours);
            const minutes = Math.round((chargingHours - hours) * 60);
            chargingTime = hours + ' hr ' + minutes + ' min';
          }
          
          // Calculate range added
          const rangeAdded = energyNeeded * efficiency;
          
          // Cost per mile
          const costPerMile = ratePerKwh / efficiency;
          
          // Monthly calculations
          const monthlyEnergyNeeded = milesPerMonth / efficiency;
          const monthlyCost = monthlyEnergyNeeded * (chargingLocation === 'home' ? electricityRate : ratePerKwh);
          
          // Compare to gas car (assume 25 MPG, $3.50/gallon)
          const gasGallonsNeeded = milesPerMonth / 25;
          const gasCost = gasGallonsNeeded * 3.50;
          const gasSavings = gasCost - monthlyCost;
          
          // CO2 avoided (8.887 kg CO2 per gallon of gas)
          const co2Avoided = gasGallonsNeeded * 8.887 * 2.205; // Convert kg to lbs
          
          return {
            energyNeeded,
            chargingCost,
            chargingTime,
            rangeAdded,
            costPerMile,
            monthlyCost,
            gasSavings,
            co2Avoided
          };
        `,
        description: 'Calculate EV charging costs and savings'
      }
    ],
    localizedContent: {
      en: {
        title: 'EV Charging Cost Calculator',
        description: 'Calculate electric vehicle charging costs, time, and savings vs gasoline',
        keywords: ['EV charging calculator', 'electric car cost', 'EV savings', 'charging time', 'electric vehicle'],
        faq: [
          {
            question: 'How much does it cost to charge an EV?',
            answer: 'Home charging: $5-15 for full charge. Public Level 2: $10-25. DC fast charging: $15-40. Much cheaper than gas - typically 3-5¢ per mile vs 14¢ for gas.'
          },
          {
            question: 'How long does EV charging take?',
            answer: 'Level 1 (120V): 40+ hours. Level 2 (240V): 4-10 hours. DC Fast: 20-60 minutes to 80%. Tesla Supercharger: 15-30 minutes to 80%.'
          },
          {
            question: 'Should I charge to 100%?',
            answer: 'For daily use, charge to 80-90% to preserve battery life. Only charge to 100% for long trips. Most EVs have settings to limit charge level.'
          }
        ],
        article: {
          title: 'EV Charging Economics',
          introduction: 'Electric vehicles offer significant fuel savings, but understanding charging costs and options is key.',
          sections: [
            {
              heading: 'Charging at Home',
              content: 'Most economical option. Install Level 2 charger ($500-2000). Charge overnight on lower rates. Costs $5-15 for 200-300 miles range.'
            },
            {
              heading: 'Public Charging',
              content: 'Level 2: good for shopping/work. DC fast: for road trips. Apps show locations and prices. Membership plans offer discounts.'
            }
          ],
          conclusion: 'EVs typically cost 50-70% less to fuel than gas cars, with added convenience of home charging.',
          wordCount: 290
        }
      }
    }
  }
];

// Export function to get all environment calculators
export function getEnvironmentCalculators(): Calculator[] {
  return environmentCalculators;
}

// Export function to get calculator by slug
export function getEnvironmentCalculatorBySlug(slug: string): Calculator | undefined {
  return environmentCalculators.find(calc => calc.slug === slug);
}