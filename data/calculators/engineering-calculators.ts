import { Calculator } from '@/lib/types/calculator';

export const engineeringCalculators: Calculator[] = [
  {
    id: 'ohms-law-calculator',
    slug: 'ohms-law-calculator',
    category: 'engineering',
    icon: '⚡',
    color: '#F59E0B',
    inputs: [
      {
        key: 'calculationType',
        label: 'Calculate',
        type: 'select',
        defaultValue: 'voltage',
        required: true,
        options: [
          { value: 'voltage', label: 'Voltage (V)' },
          { value: 'current', label: 'Current (I)' },
          { value: 'resistance', label: 'Resistance (R)' },
          { value: 'power', label: 'Power (P)' }
        ]
      },
      {
        key: 'voltage',
        label: 'Voltage',
        type: 'number',
        defaultValue: 12,
        min: 0,
        max: 1000000,
        step: 0.01,
        unit: 'V',
        required: false,
        dependsOn: ['calculationType'],
        showWhen: { calculationType: ['current', 'resistance', 'power'] }
      },
      {
        key: 'current',
        label: 'Current',
        type: 'number',
        defaultValue: 2,
        min: 0,
        max: 10000,
        step: 0.001,
        unit: 'A',
        required: false,
        dependsOn: ['calculationType'],
        showWhen: { calculationType: ['voltage', 'resistance', 'power'] }
      },
      {
        key: 'resistance',
        label: 'Resistance',
        type: 'number',
        defaultValue: 6,
        min: 0,
        max: 1000000,
        step: 0.01,
        unit: 'Ω',
        required: false,
        dependsOn: ['calculationType'],
        showWhen: { calculationType: ['voltage', 'current', 'power'] }
      },
      {
        key: 'power',
        label: 'Power',
        type: 'number',
        defaultValue: 24,
        min: 0,
        max: 1000000,
        step: 0.01,
        unit: 'W',
        required: false,
        dependsOn: ['calculationType'],
        showWhen: { calculationType: ['voltage', 'current', 'resistance'] }
      }
    ],
    outputs: [
      {
        key: 'result',
        label: 'Calculated Value',
        format: 'number',
        decimals: 3,
        description: 'Result based on Ohm\'s Law',
        highlight: true
      },
      {
        key: 'voltage_out',
        label: 'Voltage',
        format: 'number',
        decimals: 3,
        unit: 'V',
        description: 'Electrical potential difference'
      },
      {
        key: 'current_out',
        label: 'Current',
        format: 'number',
        decimals: 3,
        unit: 'A',
        description: 'Electric current flow'
      },
      {
        key: 'resistance_out',
        label: 'Resistance',
        format: 'number',
        decimals: 3,
        unit: 'Ω',
        description: 'Electrical resistance'
      },
      {
        key: 'power_out',
        label: 'Power',
        format: 'number',
        decimals: 3,
        unit: 'W',
        description: 'Electrical power'
      },
      {
        key: 'formula',
        label: 'Formula Used',
        format: 'text',
        description: 'Mathematical formula applied'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          let result = 0;
          let formula = '';
          let v_out = voltage || 0;
          let i_out = current || 0;
          let r_out = resistance || 0;
          let p_out = power || 0;
          
          switch (calculationType) {
            case 'voltage':
              // V = I × R or V = P / I or V = √(P × R)
              if (current > 0 && resistance > 0) {
                result = current * resistance;
                formula = 'V = I × R';
                v_out = result;
                p_out = result * current;
              } else if (power > 0 && current > 0) {
                result = power / current;
                formula = 'V = P / I';
                v_out = result;
                r_out = result / current;
              } else if (power > 0 && resistance > 0) {
                result = Math.sqrt(power * resistance);
                formula = 'V = √(P × R)';
                v_out = result;
                i_out = result / resistance;
              }
              break;
              
            case 'current':
              // I = V / R or I = P / V or I = √(P / R)
              if (voltage > 0 && resistance > 0) {
                result = voltage / resistance;
                formula = 'I = V / R';
                i_out = result;
                p_out = voltage * result;
              } else if (power > 0 && voltage > 0) {
                result = power / voltage;
                formula = 'I = P / V';
                i_out = result;
                r_out = voltage / result;
              } else if (power > 0 && resistance > 0) {
                result = Math.sqrt(power / resistance);
                formula = 'I = √(P / R)';
                i_out = result;
                v_out = result * resistance;
              }
              break;
              
            case 'resistance':
              // R = V / I or R = V² / P or R = P / I²
              if (voltage > 0 && current > 0) {
                result = voltage / current;
                formula = 'R = V / I';
                r_out = result;
                p_out = voltage * current;
              } else if (voltage > 0 && power > 0) {
                result = (voltage * voltage) / power;
                formula = 'R = V² / P';
                r_out = result;
                i_out = voltage / result;
              } else if (power > 0 && current > 0) {
                result = power / (current * current);
                formula = 'R = P / I²';
                r_out = result;
                v_out = current * result;
              }
              break;
              
            case 'power':
              // P = V × I or P = V² / R or P = I² × R
              if (voltage > 0 && current > 0) {
                result = voltage * current;
                formula = 'P = V × I';
                p_out = result;
                r_out = voltage / current;
              } else if (voltage > 0 && resistance > 0) {
                result = (voltage * voltage) / resistance;
                formula = 'P = V² / R';
                p_out = result;
                i_out = voltage / resistance;
              } else if (current > 0 && resistance > 0) {
                result = current * current * resistance;
                formula = 'P = I² × R';
                p_out = result;
                v_out = current * resistance;
              }
              break;
          }
          
          return {
            result,
            voltage_out: v_out,
            current_out: i_out,
            resistance_out: r_out,
            power_out: p_out,
            formula
          };
        `,
        description: 'Calculate using Ohm\'s Law and Power formulas'
      }
    ],
    graph: {
      type: 'gauge',
      title: 'Electrical Values',
      min: 0,
      max: 100,
      segments: [
        { threshold: 20, color: '#10B981', label: 'Low' },
        { threshold: 50, color: '#F59E0B', label: 'Medium' },
        { threshold: 80, color: '#EF4444', label: 'High' },
        { threshold: 100, color: '#991B1B', label: 'Very High' }
      ]
    },
    localizedContent: {
      en: {
        title: 'Ohm\'s Law Calculator',
        description: 'Calculate voltage, current, resistance, and power using Ohm\'s Law',
        keywords: ['ohms law calculator', 'voltage calculator', 'current calculator', 'resistance calculator', 'electrical calculator'],
        faq: [
          {
            question: 'What is Ohm\'s Law?',
            answer: 'Ohm\'s Law states that V = I × R, where V is voltage (volts), I is current (amperes), and R is resistance (ohms). It describes the relationship between these three fundamental electrical quantities.'
          },
          {
            question: 'How do I calculate power?',
            answer: 'Power (P) in watts can be calculated using: P = V × I, P = V²/R, or P = I² × R. Use the formula based on which values you know.'
          },
          {
            question: 'What units are used?',
            answer: 'Voltage is in Volts (V), Current in Amperes (A), Resistance in Ohms (Ω), and Power in Watts (W). For larger values, use kilo (k) or mega (M) prefixes.'
          },
          {
            question: 'When do I use each formula?',
            answer: 'Use V = IR when you know current and resistance. Use P = VI for power calculations. Choose the formula based on your known values.'
          },
          {
            question: 'What is the power wheel?',
            answer: 'The power wheel is a circular diagram showing all 12 formulas relating V, I, R, and P. It helps quickly find the right formula for any calculation.'
          }
        ],
        article: {
          title: 'Master Ohm\'s Law and Electrical Calculations',
          introduction: 'Ohm\'s Law is fundamental to electrical engineering, electronics, and circuit design.',
          sections: [
            {
              heading: 'The Basics',
              content: 'Ohm\'s Law (V = IR) describes how voltage, current, and resistance relate in electrical circuits. Adding power (P = VI) completes the picture.'
            },
            {
              heading: 'Practical Applications',
              content: 'Use Ohm\'s Law for: sizing resistors in LED circuits, calculating wire gauge needs, determining power supply requirements, and troubleshooting circuits.'
            },
            {
              heading: 'Safety Considerations',
              content: 'Always consider power ratings. Components can overheat if power exceeds ratings. Use safety margins (typically 50-70% of max ratings).'
            },
            {
              heading: 'Common Mistakes',
              content: 'Watch units (mA vs A, kΩ vs Ω). Remember that resistance changes with temperature. Account for tolerances in real components (±5% typical).'
            }
          ],
          conclusion: 'Mastering Ohm\'s Law is essential for anyone working with electricity or electronics.',
          wordCount: 350
        }
      },
      th: {
        title: 'คำนวณกฎของโอห์ม',
        description: 'คำนวณแรงดัน กระแส ความต้านทาน และกำลังไฟฟ้าด้วยกฎของโอห์ม',
        keywords: ['กฎของโอห์ม', 'คำนวณแรงดันไฟฟ้า', 'คำนวณกระแสไฟฟ้า', 'คำนวณความต้านทาน', 'คำนวณไฟฟ้า'],
        faq: [
          {
            question: 'กฎของโอห์มคืออะไร?',
            answer: 'กฎของโอห์มกล่าวว่า V = I × R โดย V คือแรงดัน (โวลต์), I คือกระแส (แอมแปร์), R คือความต้านทาน (โอห์ม) อธิบายความสัมพันธ์ของปริมาณไฟฟ้าพื้นฐาน'
          },
          {
            question: 'คำนวณกำลังไฟฟ้าอย่างไร?',
            answer: 'กำลังไฟฟ้า (P) หน่วยวัตต์ คำนวณได้จาก: P = V × I, P = V²/R, หรือ P = I² × R เลือกสูตรตามค่าที่ทราบ'
          },
          {
            question: 'ใช้หน่วยอะไรบ้าง?',
            answer: 'แรงดันใช้โวลต์ (V), กระแสใช้แอมแปร์ (A), ความต้านทานใช้โอห์ม (Ω), กำลังไฟฟ้าใช้วัตต์ (W) ค่าใหญ่ใช้ กิโล (k) หรือ เมกะ (M)'
          }
        ],
        article: {
          title: 'เข้าใจกฎของโอห์มและการคำนวณไฟฟ้า',
          introduction: 'กฎของโอห์มเป็นพื้นฐานสำคัญในวิศวกรรมไฟฟ้า อิเล็กทรอนิกส์ และการออกแบบวงจร',
          sections: [
            {
              heading: 'พื้นฐาน',
              content: 'กฎของโอห์ม (V = IR) อธิบายความสัมพันธ์ของแรงดัน กระแส และความต้านทานในวงจรไฟฟ้า เพิ่มกำลังไฟฟ้า (P = VI) ได้ภาพสมบูรณ์'
            },
            {
              heading: 'การใช้งานจริง',
              content: 'ใช้กฎของโอห์มในการ: คำนวณค่าตัวต้านทานสำหรับ LED, เลือกขนาดสายไฟ, กำหนดขนาดแหล่งจ่ายไฟ, แก้ปัญหาวงจร'
            }
          ],
          conclusion: 'การเข้าใจกฎของโอห์มเป็นสิ่งจำเป็นสำหรับผู้ที่ทำงานเกี่ยวกับไฟฟ้าและอิเล็กทรอนิกส์',
          wordCount: 300
        }
      }
    }
  },
  {
    id: 'voltage-divider-calculator',
    slug: 'voltage-divider-calculator',
    category: 'engineering',
    icon: '🔌',
    color: '#3B82F6',
    inputs: [
      {
        key: 'inputVoltage',
        label: 'Input Voltage (Vin)',
        type: 'number',
        defaultValue: 12,
        min: 0,
        max: 1000,
        step: 0.01,
        unit: 'V',
        required: true
      },
      {
        key: 'r1',
        label: 'Resistor R1 (Top)',
        type: 'number',
        defaultValue: 10000,
        min: 0.1,
        max: 10000000,
        step: 0.1,
        unit: 'Ω',
        required: true
      },
      {
        key: 'r2',
        label: 'Resistor R2 (Bottom)',
        type: 'number',
        defaultValue: 10000,
        min: 0.1,
        max: 10000000,
        step: 0.1,
        unit: 'Ω',
        required: true
      },
      {
        key: 'loadResistance',
        label: 'Load Resistance (Optional)',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 10000000,
        step: 0.1,
        unit: 'Ω',
        required: false,
        tooltip: 'Leave 0 for no load'
      }
    ],
    outputs: [
      {
        key: 'outputVoltage',
        label: 'Output Voltage (Vout)',
        format: 'number',
        decimals: 3,
        unit: 'V',
        description: 'Voltage across R2',
        highlight: true
      },
      {
        key: 'voltageRatio',
        label: 'Voltage Ratio',
        format: 'percentage',
        decimals: 2,
        description: 'Vout/Vin ratio'
      },
      {
        key: 'voltageDrop',
        label: 'Voltage Drop (R1)',
        format: 'number',
        decimals: 3,
        unit: 'V',
        description: 'Voltage across R1'
      },
      {
        key: 'totalCurrent',
        label: 'Total Current',
        format: 'number',
        decimals: 6,
        unit: 'A',
        description: 'Current through circuit'
      },
      {
        key: 'powerDissipated',
        label: 'Total Power',
        format: 'number',
        decimals: 6,
        unit: 'W',
        description: 'Power dissipated'
      },
      {
        key: 'r2Effective',
        label: 'R2 Effective (with load)',
        format: 'number',
        decimals: 2,
        unit: 'Ω',
        description: 'R2 parallel with load'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          // Calculate effective R2 if load is present
          let r2Eff = r2;
          if (loadResistance > 0) {
            // R2 in parallel with load
            r2Eff = (r2 * loadResistance) / (r2 + loadResistance);
          }
          
          // Calculate output voltage using voltage divider formula
          const outputVoltage = inputVoltage * (r2Eff / (r1 + r2Eff));
          
          // Calculate other parameters
          const voltageRatio = (outputVoltage / inputVoltage) * 100;
          const voltageDrop = inputVoltage - outputVoltage;
          const totalCurrent = inputVoltage / (r1 + r2Eff);
          const powerDissipated = inputVoltage * totalCurrent;
          
          return {
            outputVoltage,
            voltageRatio,
            voltageDrop,
            totalCurrent,
            powerDissipated,
            r2Effective: r2Eff
          };
        `,
        description: 'Voltage divider formula: Vout = Vin × (R2 / (R1 + R2))'
      }
    ],
    localizedContent: {
      en: {
        title: 'Voltage Divider Calculator',
        description: 'Calculate output voltage in a resistor voltage divider circuit',
        keywords: ['voltage divider', 'resistor divider', 'voltage division', 'circuit calculator'],
        faq: [
          {
            question: 'How does a voltage divider work?',
            answer: 'A voltage divider uses two resistors in series to reduce voltage. The output voltage is proportional to the ratio of R2 to the total resistance (R1 + R2).'
          },
          {
            question: 'What is the voltage divider formula?',
            answer: 'Vout = Vin × (R2 / (R1 + R2)). This gives the voltage across R2 when R1 and R2 are in series.'
          },
          {
            question: 'How does load affect the output?',
            answer: 'A load in parallel with R2 reduces the effective resistance, lowering the output voltage. Always consider load effects in real circuits.'
          },
          {
            question: 'What are common applications?',
            answer: 'Voltage dividers are used for: sensor interfacing, reference voltages, level shifting, volume controls, and measuring high voltages.'
          }
        ],
        article: {
          title: 'Understanding Voltage Dividers',
          introduction: 'Voltage dividers are fundamental circuits used to reduce voltage levels.',
          sections: [
            {
              heading: 'Design Considerations',
              content: 'Choose resistor values considering: current consumption (use high values for low power), loading effects (keep R2 << load resistance), and tolerance (1% resistors for accuracy).'
            },
            {
              heading: 'Limitations',
              content: 'Voltage dividers are not voltage regulators. Output changes with load. Use buffers (op-amps) for stable output with varying loads.'
            }
          ],
          conclusion: 'Voltage dividers are simple but powerful tools when used correctly.',
          wordCount: 280
        }
      }
    }
  },
  {
    id: 'power-factor-calculator',
    slug: 'power-factor-calculator',
    category: 'engineering',
    icon: '⚡',
    color: '#10B981',
    inputs: [
      {
        key: 'calculationType',
        label: 'Known Values',
        type: 'select',
        defaultValue: 'power',
        required: true,
        options: [
          { value: 'power', label: 'Real & Apparent Power' },
          { value: 'angle', label: 'Phase Angle' },
          { value: 'impedance', label: 'Resistance & Impedance' }
        ]
      },
      {
        key: 'realPower',
        label: 'Real Power (P)',
        type: 'number',
        defaultValue: 800,
        min: 0,
        max: 1000000,
        step: 0.1,
        unit: 'W',
        required: true,
        dependsOn: ['calculationType'],
        showWhen: { calculationType: 'power' }
      },
      {
        key: 'apparentPower',
        label: 'Apparent Power (S)',
        type: 'number',
        defaultValue: 1000,
        min: 0,
        max: 1000000,
        step: 0.1,
        unit: 'VA',
        required: true,
        dependsOn: ['calculationType'],
        showWhen: { calculationType: 'power' }
      },
      {
        key: 'phaseAngle',
        label: 'Phase Angle (φ)',
        type: 'number',
        defaultValue: 30,
        min: -90,
        max: 90,
        step: 0.1,
        unit: '°',
        required: true,
        dependsOn: ['calculationType'],
        showWhen: { calculationType: 'angle' }
      },
      {
        key: 'resistance',
        label: 'Resistance (R)',
        type: 'number',
        defaultValue: 40,
        min: 0,
        max: 100000,
        step: 0.1,
        unit: 'Ω',
        required: true,
        dependsOn: ['calculationType'],
        showWhen: { calculationType: 'impedance' }
      },
      {
        key: 'impedance',
        label: 'Impedance (Z)',
        type: 'number',
        defaultValue: 50,
        min: 0,
        max: 100000,
        step: 0.1,
        unit: 'Ω',
        required: true,
        dependsOn: ['calculationType'],
        showWhen: { calculationType: 'impedance' }
      }
    ],
    outputs: [
      {
        key: 'powerFactor',
        label: 'Power Factor (PF)',
        format: 'number',
        decimals: 4,
        description: 'cos(φ)',
        highlight: true
      },
      {
        key: 'phaseAngleOut',
        label: 'Phase Angle',
        format: 'number',
        decimals: 2,
        unit: '°',
        description: 'Angle between voltage and current'
      },
      {
        key: 'reactivePower',
        label: 'Reactive Power (Q)',
        format: 'number',
        decimals: 2,
        unit: 'VAR',
        description: 'Reactive power'
      },
      {
        key: 'powerFactorType',
        label: 'PF Type',
        format: 'text',
        description: 'Leading or Lagging'
      },
      {
        key: 'efficiency',
        label: 'Efficiency',
        format: 'percentage',
        decimals: 2,
        description: 'Power efficiency'
      }
    ],
    formulas: [
      {
        key: 'calculate',
        expression: `
          let powerFactor = 0;
          let phaseAngleOut = 0;
          let reactivePower = 0;
          let powerFactorType = 'Unity';
          
          switch (calculationType) {
            case 'power':
              if (apparentPower > 0) {
                powerFactor = realPower / apparentPower;
                if (powerFactor > 1) powerFactor = 1;
                phaseAngleOut = Math.acos(powerFactor) * 180 / Math.PI;
                reactivePower = Math.sqrt(apparentPower * apparentPower - realPower * realPower);
              }
              break;
              
            case 'angle':
              phaseAngleOut = phaseAngle;
              powerFactor = Math.cos(phaseAngle * Math.PI / 180);
              break;
              
            case 'impedance':
              if (impedance > 0) {
                powerFactor = resistance / impedance;
                if (powerFactor > 1) powerFactor = 1;
                phaseAngleOut = Math.acos(powerFactor) * 180 / Math.PI;
              }
              break;
          }
          
          // Determine leading or lagging
          if (powerFactor === 1) {
            powerFactorType = 'Unity (Resistive)';
          } else if (phaseAngleOut > 0) {
            powerFactorType = 'Lagging (Inductive)';
          } else if (phaseAngleOut < 0) {
            powerFactorType = 'Leading (Capacitive)';
          }
          
          const efficiency = powerFactor * 100;
          
          return {
            powerFactor: Math.abs(powerFactor),
            phaseAngleOut,
            reactivePower,
            powerFactorType,
            efficiency
          };
        `,
        description: 'Calculate power factor from various electrical parameters'
      }
    ],
    localizedContent: {
      en: {
        title: 'Power Factor Calculator',
        description: 'Calculate power factor, phase angle, and reactive power in AC circuits',
        keywords: ['power factor calculator', 'cos phi', 'reactive power', 'apparent power', 'AC power'],
        faq: [
          {
            question: 'What is power factor?',
            answer: 'Power factor (PF) is the ratio of real power (W) to apparent power (VA). It indicates how efficiently electrical power is being used. PF = cos(φ) where φ is the phase angle.'
          },
          {
            question: 'What causes poor power factor?',
            answer: 'Inductive loads (motors, transformers) cause lagging power factor. Capacitive loads cause leading power factor. Poor PF increases current for the same real power.'
          },
          {
            question: 'Why improve power factor?',
            answer: 'Better power factor reduces: electricity bills (utility penalties), line losses, voltage drops, and required cable/transformer sizes.'
          }
        ],
        article: {
          title: 'Power Factor in AC Circuits',
          introduction: 'Power factor is crucial for efficient electrical systems and reducing energy costs.',
          sections: [
            {
              heading: 'Types of Power',
              content: 'Real Power (P) does actual work. Reactive Power (Q) maintains magnetic/electric fields. Apparent Power (S) is the total power supplied.'
            },
            {
              heading: 'Correction Methods',
              content: 'Improve lagging PF with capacitor banks. Size capacitors to achieve target PF (typically 0.95). Automatic correction systems adjust as loads vary.'
            }
          ],
          conclusion: 'Maintaining good power factor saves money and improves electrical system efficiency.',
          wordCount: 300
        }
      }
    }
  }
];

// Export function to get all engineering calculators
export function getEngineeringCalculators(): Calculator[] {
  return engineeringCalculators;
}

// Export function to get calculator by slug
export function getEngineeringCalculatorBySlug(slug: string): Calculator | undefined {
  return engineeringCalculators.find(calc => calc.slug === slug);
}