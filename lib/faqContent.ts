export type CountryCode = 'GLOBAL' | 'US' | 'UK' | 'TH' | 'IN' | 'EU';

type QA = { question: string; answer: string };
type Ref = { label: string; url: string };

export type FaqHowTo = {
  useCases: string[];
  howTo: string[];
  faqs: QA[];
  references: Ref[];
  keywords?: string[];
  seoHtml?: string; // Optional rich HTML with H2/H3 sections for SEO
  examples?: { headers: string[]; rows: string[][] };
};

export type FaqContentMap = Record<string, Partial<Record<CountryCode, FaqHowTo>>>;

export const FAQ_CONTENT: FaqContentMap = {
  
  // Finance: House Affordability
  'house-affordability': {
    GLOBAL: {
      useCases: [
        'ประเมินงบซื้อบ้านสูงสุดจากรายได้ต่อปีและหนี้ปัจจุบัน',
        'ดูผลกระทบของอัตราดอกเบี้ย ภาษีที่ดิน และประกันบ้านต่อค่างวด',
        'ใช้กำหนดกรอบงบประมาณก่อนหาบ้านจริง'
      ],
      howTo: [
        'กรอกเงินเดือนต่อปี เงินดาวน์ และอัตราดอกเบี้ย',
        'กรอกอัตราภาษีทรัพย์สิน (% ต่อปี) และค่าใช้จ่ายรายเดือน (ประกัน/ค่าส่วนกลาง)',
        'ระบุเพดาน DTI (%) เพื่อจำกัดสัดส่วนหนี้ต่อรายได้',
        'อ่านราคาบ้านสูงสุด วงเงินกู้ และค่างวดโดยประมาณ'
      ],
      faqs: [
        { question: 'DTI คืออะไร?', answer: 'Debt-to-Income คือสัดส่วนหนี้ต่อรายได้ต่อเดือน ธนาคารใช้กำหนดความสามารถในการผ่อน' },
        { question: 'Property tax ส่งผลยังไง?', answer: 'ภาษีทรัพย์สินคิดจากมูลค่าบ้านต่อปีและรวมในค่าใช้จ่ายรายเดือน ทำให้วงเงินผ่อนเปลี่ยน' }
      ],
      references: [
        { label: 'Fannie Mae – Qualifying Ratios (DTI)', url: 'https://singlefamily.fanniemae.com' },
        { label: 'Investopedia – Debt-to-Income Ratio (DTI)', url: 'https://www.investopedia.com/terms/d/dti.asp' }
      ]
    },
    TH: {
      useCases: [ 'ประมาณงบซื้อบ้านตามเกณฑ์ธนาคารไทย', 'ดูผลของดอกเบี้ยและภาษีที่ดิน/สิ่งปลูกสร้าง' ],
      howTo: [ 'กรอกข้อมูลรายได้และหนี้', 'ใช้อัตราภาษีท้องถิ่นโดยประมาณ', 'เปรียบเทียบหลายสถานการณ์' ],
      faqs: [ { question: 'DTI ไทยใช้เท่าไร?', answer: 'ขึ้นกับธนาคารและนโยบาย กรณีทั่วไปไม่ควรเกิน ~40–50% สำหรับหนี้ทั้งหมด' } ],
      references: [ { label: 'ธนาคารแห่งประเทศไทย – เกณฑ์สินเชื่อที่อยู่อาศัย', url: 'https://www.bot.or.th' } ]
    }
  },

  // Finance: Mortgage
  mortgage: {
    GLOBAL: {
      useCases: [
        'Estimate mortgage payment with principal, interest, term, and optional closing costs',
        'Understand total repayment and total interest over the life of the loan',
        'Download amortization schedule (CSV) to analyze principal vs interest by month'
      ],
      howTo: [
        'Enter home price or principal (after down payment)',
        'Enter annual interest rate (%) and term (years)',
        'Optionally include closing costs to see the true all‑in payment',
        'Read monthly payment, total repayment, and total interest; expand amortization to inspect month by month'
      ],
      faqs: [
        { question: 'What closing costs are included?', answer: 'Typical closing costs can include lender origination, underwriting, title insurance, appraisal, recording, credit report, prepaid interest and escrows. Lender credits can offset these costs in exchange for a higher interest rate.' },
        { question: 'Is a lower rate or lower closing cost better?', answer: 'It depends on how long you will keep the loan. A lower rate reduces monthly payment and total interest, which often dominates over small upfront credits if you hold the loan for many years.' },
        { question: 'How does term (30y vs 15y) change results?', answer: 'Shorter terms raise the monthly payment but reduce total interest substantially. The amortization schedule shows how quickly principal declines under each term.' },
        { question: 'Should I include taxes and insurance?', answer: 'This calculator focuses on principal and interest. For a full budget, add estimated property tax, homeowners insurance and HOA dues to the monthly payment.' },
        { question: 'What is APR vs interest rate?', answer: 'APR annualizes total borrowing cost (including certain fees) to allow comparison across lenders, while the interest rate determines the payment schedule itself.' }
      ],
      references: [
        { label: 'CFPB – Mortgage closing costs', url: 'https://www.consumerfinance.gov/ask-cfpb/what-are-mortgage-closing-costs-en-120/' },
        { label: 'CFPB – Cost of taking out a mortgage (2022)', url: 'https://www.consumerfinance.gov/about-us/blog/the-cost-of-taking-out-a-mortgage-soared-in-2022/' },
        { label: 'CFPB – Lender credits explained', url: 'https://www.consumerfinance.gov/ask-cfpb/what-are-lender-credits-and-how-do-they-work-en-114/' }
      ],
      keywords: ['mortgage calculator','closing costs','amortization schedule','monthly payment','APR vs rate'],
      seoHtml: '<h2>How mortgage payments are calculated</h2><p>A standard fixed‑rate mortgage uses an amortization formula where the monthly payment stays constant while the composition of interest and principal shifts over time. Early payments are interest‑heavy; later payments retire more principal. Including closing costs in the financed amount raises both monthly payment and total interest, which reveals the true all‑in cost of ownership.</p><h3>When to pay points or take credits</h3><p>Paying discount points trades upfront cash for a lower rate and lower lifetime interest. Lender credits do the opposite. The breakeven depends on how long you keep the loan. Use this calculator to compare scenarios and see breakeven months.</p><h3>Budgeting beyond P&I</h3><p>Principal & interest (P&I) are only part of housing cost. Property tax, homeowners insurance and HOA dues can add hundreds per month and vary widely by location. Model these in your broader budget to avoid surprises.</p>',
      examples: { headers: ['Principal','$ Rate','Term (years)','Closing costs','$ Payment','Total Interest'], rows: [ ['300,000','6.75%','30','$6,000','$1,945','$401,000'], ['300,000','6.00%','30','$0','$1,799','$347,500'] ] }
    },
    US: {
      useCases: [ 'Compare lender credits vs paying points for U.S. loans', 'Include typical U.S. closing costs and estimate APR contextually' ],
      howTo: [ 'Enter principal, rate, term and estimated closing costs', 'Use the amortization table to see interest vs principal by month', 'Test scenarios with and without lender credits to find breakeven' ],
      faqs: [
        { question: 'What are common U.S. closing costs?', answer: 'Title insurance, appraisal, origination and underwriting, credit report, recording, prepaid interest, escrows for taxes/insurance and optional discount points.' },
        { question: 'How do lender credits work?', answer: 'Credits reduce upfront cash but typically increase your rate; you pay more interest over time. They make sense if cash is tight and expected holding period is short.' }
      ],
      references: [
        { label: 'CFPB – Mortgage closing costs', url: 'https://www.consumerfinance.gov/ask-cfpb/what-are-mortgage-closing-costs-en-120/' },
        { label: 'CFPB – Lender credits', url: 'https://www.consumerfinance.gov/ask-cfpb/what-are-lender-credits-and-how-do-they-work-en-114/' }
      ]
    },
    TH: {
      useCases: [ 'เปรียบเทียบค่างวดจำนองรวมค่าใช้จ่ายวันโอน (ไทย)', 'ดูผลดอกเบี้ยรวมเมื่อระยะเวลาผ่อนต่างกัน' ],
      howTo: [ 'ใส่วงเงินกู้ อัตราดอกเบี้ย (%) และจำนวนปี', 'หากต้องการ รวมค่าใช้จ่ายวันโอน/จดจำนอง เพื่อดูค่างวดจริง', 'เปิดตารางผ่อน (amortization) เพื่อตรวจสอบเงินต้น/ดอกเบี้ยรายเดือน' ],
      faqs: [
        { question: 'ค่าใช้จ่ายวันโอนมีอะไรบ้าง?', answer: 'เช่น ค่าโอน ค่าจดจำนอง อากร/อากรแสตมป์ ค่าประเมิน ค่าประกันอัคคีภัย และค่าธรรมเนียมสถาบันการเงิน ขึ้นกับโครงการและโปรโมชั่น' },
        { question: 'ดอกเบี้ยลอยตัว (MRR/MOR/MRR) มีผลยังไง?', answer: 'เมื่ออัตราอ้างอิงเปลี่ยน ค่างวดจะปรับตาม ควรเผื่อความเสี่ยงดอกเบี้ยเพิ่มในอนาคต และทบทวนรีไฟแนนซ์เมื่อเหมาะสม' }
      ],
      references: [
        { label: 'ธนาคารแห่งประเทศไทย – อัตราดอกเบี้ยอ้างอิง', url: 'https://www.bot.or.th' }
      ]
    }
  },

  // Finance: Loan
  loan: {
    GLOBAL: {
      useCases: [ 'คำนวณค่างวดเงินกู้', 'ดูดอกเบี้ยรวมและตารางผ่อนชำระ (CSV)' ],
      howTo: [ 'กรอกเงินต้น อัตราดอกเบี้ยต่อปี และจำนวนปี', 'อ่านค่างวด ดอกเบี้ยรวม และดาวน์โหลดตารางผ่อนชำระ' ],
      faqs: [
        { question: 'สูตรค่างวดคืออะไร?', answer: 'ค่างวด = P × r × (1+r)^n / ((1+r)^n − 1) โดย r คืออัตราดอกเบี้ยต่อเดือน n คือจำนวนงวด' },
        { question: 'รีไฟแนนซ์ช่วยอะไร?', answer: 'ถ้าดอกเบี้ยลดลง ค่างวดอาจลดลง แต่ระยะเวลาที่นานขึ้นอาจทำให้ดอกเบี้ยรวมสูงขึ้น' }
      ],
      references: [ { label: 'Investopedia – Amortization', url: 'https://www.investopedia.com/terms/a/amortization.asp' } ],
      keywords: ['คำนวณเงินกู้','ตารางผ่อนชำระ','ดอกเบี้ยทบต้น']
    }
  },

  // Finance: LTV
  ltv: {
    GLOBAL: {
      useCases: [ 'ประเมิน LTV ของสินเชื่อที่อยู่อาศัย', 'คำนวณส่วนทุน (equity) ปัจจุบัน' ],
      howTo: [ 'กรอกมูลค่าทรัพย์สินและวงเงินกู้', 'อ่านค่า LTV (%) และ Equity (%)' ],
      faqs: [ { question: 'LTV สำคัญอย่างไร?', answer: 'LTV สูง = ความเสี่ยงสูง ผู้ปล่อยกู้อาจคิดดอกสูงหรือกำหนดเงินดาวน์มากขึ้น' } ],
      references: [ { label: 'Investopedia – Loan-to-Value (LTV) Ratio', url: 'https://www.investopedia.com/terms/l/loantovalue.asp' } ]
    }
  },

  // Finance: DTI
  dti: {
    GLOBAL: {
      useCases: [ 'ประเมินความสามารถในการเป็นหนี้', 'ใช้เป็นเกณฑ์เบื้องต้นก่อนยื่นกู้' ],
      howTo: [ 'กรอกหนี้รวมรายเดือนและรายได้รวมรายเดือน', 'อ่านค่า DTI (%) และเกณฑ์ความเสี่ยง' ],
      faqs: [ { question: 'DTI เท่าไรถือว่าดี?', answer: 'โดยทั่วไป <36% ถือว่าดี 36–43% พอรับได้ >43% สูง ควรลดหนี้หรือเพิ่มรายได้' } ],
      references: [ { label: 'CFPB – Debt-to-Income Ratio', url: 'https://www.consumerfinance.gov' } ]
    }
  },

  // Savings: Emergency Fund
  'emergency-fund': {
    GLOBAL: {
      useCases: [ 'ตั้งเป้าเงินสำรองฉุกเฉิน 3–12 เดือนของค่าใช้จ่าย', 'วางแผนสะสมเงินสำรองเป็นรายเดือน' ],
      howTo: [ 'กรอกค่าใช้จ่ายต่อเดือนและจำนวนเดือนเป้าหมาย', 'กรอกเงินออมปัจจุบันและยอดออมต่อเดือน', 'อ่านจำนวนเดือนที่คาดว่าจะถึงเป้า' ],
      faqs: [ { question: 'ควรเก็บกี่เดือน?', answer: 'ขึ้นกับความเสี่ยงงาน/ครอบครัว 3–6 เดือนทั่วไป 9–12 เดือนสำหรับอาชีพเสี่ยง/ผู้มีภาระ' } ],
      references: [ { label: 'Investopedia – Emergency Fund', url: 'https://www.investopedia.com/terms/e/emergency_fund.asp' } ]
    }
  },

  // Household/Energy: Solar Panel
  'solar-panel': {
    GLOBAL: {
      useCases: [ 'ประมาณจำนวนแผงและขนาดระบบจากการใช้ไฟ', 'วางแผนระบบโซลาร์บนหลังคาเบื้องต้น' ],
      howTo: [ 'ใส่ kWh ต่อเดือน ชั่วโมงแดดเฉลี่ยต่อวัน และกำลังแผง (W)', 'กรอก % การสูญเสียของระบบ', 'อ่านจำนวนแผงและขนาดระบบ (kW)' ],
      faqs: [ { question: 'System losses คืออะไร?', answer: 'รวมความสูญเสียจากอินเวอร์เตอร์ สายไฟ มุมเอียง เงาบดบัง อุณหภูมิ ฯลฯ' } ],
      references: [ { label: 'NREL – PVWatts Calculator', url: 'https://pvwatts.nrel.gov' } ]
    }
  },

  // Tech/EV: Charging
  'ev-charging': {
    GLOBAL: {
      useCases: [ 'คำนวณเวลาชาร์จ EV และค่าไฟโดยประมาณ', 'เปรียบเทียบหัวชาร์จ AC ระดับต่าง ๆ' ],
      howTo: [ 'กรอกขนาดแบตเตอรี่ (kWh) ระดับชาร์จเริ่ม/เป้า (%)', 'กรอกกำลังเครื่องชาร์จ (kW) และประสิทธิภาพ (%)', 'ถ้ามี ใส่อัตราค่าไฟต่อ kWh' ],
      faqs: [ { question: 'DC fast charge ต่างจาก AC ยังไง?', answer: 'DC ให้กำลังสูงกว่าอย่างมาก แต่ประสิทธิภาพและ taper ทำให้เวลาไม่เป็นเส้นตรง' } ],
      references: [ { label: 'U.S. DOE – Alternative Fuels Data Center', url: 'https://afdc.energy.gov' } ]
    }
  },

  // Math: Rectangle Area
  'rectangle-area': {
    GLOBAL: {
      useCases: [ 'หาพื้นที่และเส้นรอบรูปสี่เหลี่ยมผืนผ้า', 'คำนวณเส้นทแยงมุมจากกว้างและยาว' ],
      howTo: [ 'กรอกความกว้างและความยาว', 'อ่านพื้นที่ เส้นรอบรูป และเส้นทแยงมุม' ],
      faqs: [ { question: 'หน่วยของผลลัพธ์?', answer: 'พื้นที่เป็นหน่วยกำลังสอง (เช่น m²) เส้นรอบรูปและเส้นทแยงมุมเป็นหน่วยความยาว' } ],
      references: [ { label: 'Rectangle – geometry', url: 'https://en.wikipedia.org/wiki/Rectangle' } ]
    }
  },

  // Math: Pythagorean
  pythagorean: {
    GLOBAL: {
      useCases: [ 'หาด้านที่หายไปของสามเหลี่ยมมุมฉาก', 'ตรวจสอบความเป็นสามเหลี่ยมมุมฉากจากความยาวสามด้าน' ],
      howTo: [ 'ป้อนค่าอย่างน้อยสองด้านใน a,b,c', 'ใช้สูตร a² + b² = c² เพื่อหาด้านที่ขาด' ],
      faqs: [ { question: 'ใช้กับสามเหลี่ยมทั่วไปได้ไหม?', answer: 'สูตรนี้ใช้เฉพาะสามเหลี่ยมมุมฉาก หากไม่ใช่มุมฉากให้ใช้กฎโคไซน์' } ],
      references: [ { label: 'Pythagorean theorem', url: 'https://en.wikipedia.org/wiki/Pythagorean_theorem' } ]
    }
  },
  // Finance: ROI
  roi: {
    GLOBAL: {
      useCases: [
        'ประเมินผลตอบแทนของโปรเจกต์หรืองบการตลาดแบบง่าย',
        'เปรียบเทียบ ROI ของการลงทุนหลายทาง',
        'คำนวณ CAGR เพื่อดูอัตราเติบโตเฉลี่ยต่อปี'
      ],
      howTo: [
        'กรอกต้นทุนเริ่มต้น (Initial cost)',
        'กรอกมูลค่าปลายงวด (Ending value)',
        'ระบุจำนวนปี แล้วดู ROI และ CAGR ทันที'
      ],
      faqs: [
        { question: 'ROI ต่างจาก CAGR อย่างไร?', answer: 'ROI เป็นผลตอบแทนรวมตลอดช่วงเวลา ส่วน CAGR คืออัตราเติบโตเฉลี่ยต่อปีซึ่งคำนึงถึงระยะเวลา' },
        { question: 'ต้องรวมภาษีด้วยไหม?', answer: 'เพื่อความแม่นยำ ควรพิจารณาภาษี ค่าธรรมเนียม และเงินเฟ้อ ซึ่ง ROI พื้นฐานไม่รวม' }
      ],
      references: [
        { label: 'Investopedia – Return on Investment (ROI)', url: 'https://www.investopedia.com/terms/r/returnoninvestment.asp' }
      ]
    },
    US: {
      useCases: [
        'วัด ROI ของแคมเปญโฆษณาเทียบยอดขายที่เพิ่มขึ้น',
        'ประเมินโครงการลงทุนภายในองค์กรแบบ pre-/post-tax'
      ],
      howTo: [
        'ใส่ต้นทุนรวมพร้อมค่าธรรมเนียม',
        'ใส่มูลค่าปลายงวดหลังหักส่วนลด/คืนสินค้า',
        'หากต้องการความแม่นยำ ให้คำนึงถึงภาษีกำไรจากการลงทุน'
      ],
      faqs: [
        { question: 'ควรใช้ ROI แบบหลังหักภาษีไหม?', answer: 'ขึ้นกับบริบท หากเปรียบเทียบโปรเจกต์ภายใน มักใช้หลังหักภาษีเพื่อสะท้อนเงินสดจริง' }
      ],
      references: [
        { label: 'IRS – Capital Gains', url: 'https://www.irs.gov/taxtopics/tc409' },
        { label: 'CFPB – Consumer finance basics', url: 'https://www.consumerfinance.gov' }
      ]
    },
    UK: {
      useCases: [ 'วิเคราะห์ ROI โปรเจกต์ และเทียบกับต้นทุนเงินทุน (cost of capital)' ],
      howTo: [ 'ป้อนต้นทุนและมูลค่าปลายงวด', 'พิจารณา VAT/ภาษีที่เกี่ยวข้องเมื่อเทียบผลตอบแทนสุทธิ' ],
      faqs: [ { question: 'ต้องคิดภาษีกำไรจากการลงทุนหรือไม่?', answer: 'หากขายทรัพย์สินลงทุน ควรดู Capital Gains Tax และสิทธิยกเว้น' } ],
      references: [ { label: 'GOV.UK – Capital Gains Tax', url: 'https://www.gov.uk/capital-gains-tax' } ]
    },
    TH: {
      useCases: [ 'ประเมินคุ้มค่าการลงทุนโครงการ/แคมเปญการตลาด', 'เทียบ ROI ทางเลือกต่าง ๆ' ],
      howTo: [ 'ใส่ต้นทุนและมูลค่าปลายงวด', 'ถ้าต้องการเปรียบเทียบอย่างยุติธรรม ให้ใช้สมมติฐานเดียวกัน' ],
      faqs: [ { question: 'ต้องรวม VAT หรือไม่?', answer: 'ขึ้นอยู่กับบริบท หากเป็น ROI ภายในอาจใช้ตัวเลขหลังหักภาษี/ภาษีมูลค่าเพิ่มเพื่อสะท้อนกระแสเงินสดจริง' } ],
      references: [ { label: 'กรมสรรพากร – ภาษีอากร', url: 'https://www.rd.go.th' } ]
    },
    IN: {
      useCases: [ 'คำนวณ ROI แคมเปญดิจิทัลและออฟไลน์', 'เปรียบเทียบโครงการลงทุนระยะสั้น/ยาว' ],
      howTo: [ 'ป้อนต้นทุนรวมสุทธิ GST', 'ป้อนมูลค่าปลายงวด', 'ตีความ ROI ร่วมกับความเสี่ยงและระยะเวลา' ],
      faqs: [ { question: 'GST กระทบ ROI อย่างไร?', answer: 'ควรใช้ต้นทุนสุทธิหลัง GST/เครดิตภาษี เพื่อให้ ROI สะท้อนต้นทุนแท้จริง' } ],
      references: [ { label: 'CBIC – GST', url: 'https://cbic-gst.gov.in' } ]
    },
    EU: {
      useCases: [ 'วิเคราะห์ผลตอบแทนโครงการเทียบ WACC', 'เทียบ ROI ระหว่างประเทศสมาชิก' ],
      howTo: [ 'ใช้ตัวเลขสกุลเงินเดียวกัน', 'จัดการ VAT/ภาษีให้เป็นฐานเดียวกันก่อนเทียบ' ],
      faqs: [ { question: 'ต้อง normalize ค่าเงินหรือไม่?', answer: 'ควร แนะนำให้ใช้สกุลเงินเดียวและอัตราเงินเฟ้อที่สอดคล้องกัน' } ],
      references: [ { label: 'Eurostat – Economic indicators', url: 'https://ec.europa.eu/eurostat' } ]
    }
  },

  // Business: ROI Marketing
  'roi-marketing': {
    GLOBAL: {
      useCases: [ 'วัดผลตอบแทนงบการตลาดจากรายได้เพิ่มขึ้น', 'เทียบประสิทธิภาพแคมเปญโดยคำนึงถึง gross margin' ],
      howTo: [ 'ใส่งบการตลาดและรายได้เพิ่มขึ้น (incremental)', 'ระบุ % กำไรขั้นต้น เพื่อแปลงรายได้เป็นกำไร', 'อ่านค่า ROI (%)' ],
      faqs: [ { question: 'ทำไมต้องใช้ gross margin?', answer: 'รายได้ที่เพิ่มต้องแปลงเป็นกำไรเพื่อสะท้อนผลตอบแทนที่แท้จริงหลังต้นทุนสินค้า/บริการ' } ],
      references: [ { label: 'HubSpot – Marketing ROI', url: 'https://blog.hubspot.com/marketing/marketing-roi' } ]
    }
  },

  // Business: CAC
  cac: {
    GLOBAL: {
      useCases: [ 'หาต้นทุนเฉลี่ยต่อการได้ลูกค้าใหม่หนึ่งราย', 'เทียบ CAC กับ LTV' ],
      howTo: [ 'ใส่งบการตลาดช่วงเวลาหนึ่ง', 'ใส่จำนวนลูกค้าใหม่ที่ได้ในช่วงเดียวกัน', 'อ่าน CAC = ต้นทุน/ลูกค้า' ],
      faqs: [ { question: 'CAC ควรเทียบกับอะไร?', answer: 'ควรเทียบกับ LTV (อัตราส่วน LTV:CAC) เพื่อดูความคุ้มค่าในการลงทุนการตลาด' } ],
      references: [ { label: 'Profitwell – CAC', url: 'https://www.profitwell.com' } ]
    }
  },

  // Business: LTV
  'ltv-customer': {
    GLOBAL: {
      useCases: [ 'ประเมินมูลค่าตลอดอายุลูกค้า (LTV) แบบง่าย', 'เปรียบเทียบกับ CAC' ],
      howTo: [ 'ใส่ ARPU ต่อเดือน', 'ใส่ % กำไรขั้นต้น', 'ใส่ churn ต่อเดือน (%)', 'อ่าน LTV = ARPU × margin ÷ churn' ],
      faqs: [ { question: 'สูตรนี้เหมาะเมื่อไร?', answer: 'ใช้กับโมเดลสมัครสมาชิกที่มี churn คงที่และ ARPU สม่ำเสมอ เป็นการประมาณเชิงเส้น' } ],
      references: [ { label: 'Reforge – SaaS LTV', url: 'https://www.reforge.com' } ]
    }
  },

  // Business: Churn Rate
  'churn-rate': {
    GLOBAL: {
      useCases: [ 'คำนวณ Churn รายเดือนจากลูกค้าที่เริ่ม/จบและลูกค้าใหม่', 'ประเมิน Retention รายเดือนเพื่อดูสุขภาพธุรกิจ SaaS' ],
      howTo: [ 'ใส่จำนวนลูกค้าเมื่อเริ่มเดือน', 'ใส่จำนวนลูกค้าสิ้นเดือนและจำนวนลูกค้าใหม่ที่เพิ่มระหว่างเดือน', 'อ่านค่า Churn (%) และ Retention (%)' ],
      faqs: [
        { question: 'สูตรคำนวณ Churn คืออะไร?', answer: 'Churn = (ลูกค้าที่หายไป ÷ ลูกค้าที่มีตอนต้นงวด) × 100 โดยลูกค้าที่หายไป = ลูกค้าตอนต้น + ลูกค้าใหม่ − ลูกค้าตอนปลาย' },
        { question: 'Churn เท่าไรถึงดี?', answer: 'ขึ้นกับธุรกิจ สำหรับ SaaS รายเดือน Churn < 3%/เดือน มักถือว่าดีมาก ส่วน B2C อาจสูงกว่า' },
        { question: 'ควรใช้ Net หรือ Gross Churn?', answer: 'Gross Churn วัดเฉพาะการสูญเสียลูกค้า Net Revenue Churn รวมการขยายรายได้จากลูกค้าเดิม เลือกตามวัตถุประสงค์' },
        { question: 'Retention คิดอย่างไร?', answer: 'Retention = 100% − Churn (%)' },
        { question: 'วัดรายไตรมาส/รายปีได้ไหม?', answer: 'ได้ แต่ควรระบุช่วงเวลาให้ชัดเจนและแปลงอัตราให้เทียบเคียงกัน' }
      ],
      references: [
        { label: 'OpenView – SaaS Benchmarks', url: 'https://openviewpartners.com' },
        { label: 'ProfitWell – Churn Benchmarks', url: 'https://www.profitwell.com' }
      ],
      keywords: [ 'Churn Rate', 'อัตราการเลิกใช้', 'Retention', 'SaaS', 'LTV' ],
      seoHtml: '<h2>Churn Rate คืออะไร</h2><p>Churn บอกสัดส่วนลูกค้าที่เลิกใช้งานในช่วงเวลาที่กำหนด ยิ่งต่ำยิ่งดี</p><h3>ทำไมสำคัญ</h3><p>Churn กำหนดอายุลูกค้าเฉลี่ยและส่งผลโดยตรงต่อ LTV และการเติบโต</p>'
    }
  },

  // Business: Conversion Rate
  'conversion-rate': {
    GLOBAL: {
      useCases: [ 'คำนวณ Conversion จากจำนวน Visit และ Conversions', 'เทียบประสิทธิภาพแคมเปญและหน้า Landing' ],
      howTo: [ 'กรอกจำนวน Visits', 'กรอกจำนวน Conversions', 'อ่าน Conversion Rate (%) และ Leads ต่อ 1,000 Visits' ],
      faqs: [
        { question: 'Conversion Rate คืออะไร?', answer: 'อัตราส่วนผู้ที่ทำกิจกรรมเป้าหมายเทียบกับจำนวนผู้เยี่ยมชมทั้งหมด (เป็น %)' },
        { question: 'ค่า CR เท่าไรถึงดี?', answer: 'ขึ้นกับอุตสาหกรรม 1–5% พบได้ทั่วไป E‑commerce ชั้นนำอาจสูงกว่านี้' },
        { question: 'ควร A/B Test อย่างไร?', answer: 'ทดสอบทีละตัวแปร เช่น Headline หรือปุ่ม CTA เก็บสถิติให้พอเพื่อความน่าเชื่อถือ' },
        { question: 'CTR ต่างจาก CR ยังไง?', answer: 'CTR คืออัตราการคลิกต่อการแสดงผล ส่วน CR คือการแปลงเป็นเป้าหมายสุดท้าย' },
        { question: 'Leads ต่อ 1,000 visits คืออะไร?', answer: 'เป็นตัวช่วยแปลผลให้เข้าใจง่าย ว่าทุก ๆ พันคนจะได้ Leads กี่ราย' }
      ],
      references: [ { label: 'Google – Conversion modeling', url: 'https://support.google.com/analytics' } ],
      keywords: [ 'Conversion Rate', 'CR', 'อัตราแปลง', 'A/B Testing', 'Landing Page' ],
      seoHtml: '<h2>Conversion Rate คืออะไร</h2><p>ชี้วัดคุณภาพทราฟฟิกและความเหมาะสมของข้อเสนอ</p><h3>เทคนิคเพิ่ม Conversion</h3><ul><li>ปรับข้อความและข้อเสนอให้ชัด</li><li>เพิ่มความไว้วางใจ (รีวิว/การรับประกัน)</li><li>ลดฟอร์มที่ไม่จำเป็น</li></ul>'
    }
  },

  // Business: Subscription Revenue
  'subscription-revenue': {
    GLOBAL: {
      useCases: [ 'คำนวณ MRR และ ARR จากจำนวนสมาชิกและราคา', 'ประมาณผลกระทบจากส่วนลดหรือโค้ดโปรโมชั่น' ],
      howTo: [ 'กรอกจำนวนผู้สมัครใช้งานปัจจุบัน', 'กรอกราคาต่อเดือน และส่วนลด (%) ถ้ามี', 'อ่านค่า MRR และ ARR' ],
      faqs: [
        { question: 'MRR กับ ARR ต่างกันอย่างไร?', answer: 'MRR คือรายได้ประจำต่อเดือน ส่วน ARR = MRR × 12 ใช้ดูแนวโน้มรายปี' },
        { question: 'รวมภาษีหรือค่าธรรมเนียมดีไหม?', answer: 'เครื่องมือนี้โฟกัสรายได้สุทธิจากสมาชิก ราคาไม่รวมภาษี/ค่าธรรมเนียม' },
        { question: 'ส่วนลดส่งผลกับ MRR ยังไง?', answer: 'ส่วนลดลดรายได้ต่อสมาชิกโดยตรง ควรระบุเป็น % เพื่อดูผลกระทบ' },
        { question: 'เกี่ยวข้องกับ LTV อย่างไร?', answer: 'เมื่อรู้ ARPU และ Churn สามารถคำนวณ LTV ได้ (LTV = ARPU × Margin ÷ Churn)' },
        { question: 'ควรใช้กับธุรกิจแบบไหน?', answer: 'เหมาะกับธุรกิจ Subscription เช่น SaaS, สตรีมมิ่ง หรือสมาชิกแบบรายเดือน' }
      ],
      references: [ { label: 'Baremetrics – MRR/ARR', url: 'https://baremetrics.com' } ],
      keywords: [ 'Subscription Revenue', 'MRR', 'ARR', 'รายได้ประจำ', 'SaaS' ],
      seoHtml: '<h2>รายได้แบบสมาชิก (Subscription)</h2><p>ตัวชี้วัดหลักของธุรกิจที่มีรายได้ประจำ</p><h3>การใช้งาน</h3><p>กรอกจำนวนสมาชิก ราคา และส่วนลด เพื่อประเมิน MRR/ARR ได้ทันที</p>',
      examples: { headers: ['Subscribers','Price','Discount','MRR'], rows: [['1,000','15','0%','15,000'],['2,500','9.99','10%','22,477.5']] }
    }
  },

  

  // Business: CPM
  cpm: {
    GLOBAL: {
      useCases: [ 'หาค่า CPM จากต้นทุนและจำนวนการแสดงผล', 'เปรียบเทียบสื่อเน้น Reach/Branding' ],
      howTo: [ 'ใส่ต้นทุนรวม', 'ใส่จำนวน impressions', 'อ่านค่า CPM = ต้นทุน/Impressions×1000' ],
      faqs: [
        { question: 'CPM ใช้เมื่อไร?', answer: 'ใช้กับแคมเปญเน้นการรับรู้แบรนด์หรือการเข้าถึง' },
        { question: 'CPM ต่ำเสมอดีไหม?', answer: 'ขึ้นกับคุณภาพผู้ชมและความสอดคล้องของกลุ่มเป้าหมาย' }
      ],
      references: [ { label: 'IAB – Digital Ad Metrics', url: 'https://www.iab.com' } ],
      keywords: [ 'CPM', 'Cost per Mille', 'Impressions', 'Brand awareness' ],
      seoHtml: '<h2>CPM คืออะไร</h2><p>ต้นทุนต่อ 1,000 การแสดงผล</p><h3>การใช้งาน</h3><p>ใช้เทียบราคา media buy ข้ามแพลตฟอร์ม</p>'
    }
  },

  // Business: Affiliate Earnings
  'affiliate-earnings': {
    GLOBAL: {
      useCases: [ 'ประเมินรายได้จากแคมเปญ Affiliate', 'จำลองผลจากการปรับ CR, AOV หรือ Commission%' ],
      howTo: [ 'ใส่จำนวนคลิก', 'ใส่ Conversion Rate (%)', 'ใส่ Average Order Value', 'ใส่ Commission (%) แล้วอ่านค่ารายได้' ],
      faqs: [
        { question: 'CR เท่าไรถึงดี?', answer: 'ขึ้นกับสินค้า/ช่องทาง ค่า 1–5% พบได้ทั่วไปในหลาย vertical' },
        { question: 'AOV ส่งผลอย่างไร?', answer: 'AOV สูงขึ้นทำให้รายได้คอมมิชชั่นสูงขึ้นตามสัดส่วน' },
        { question: 'ควรดู KPI อื่นอะไรอีก?', answer: 'ดู EPC (earning per click) และ Refund/Chargeback rate' }
      ],
      references: [ { label: 'CJ/Impact – Affiliate marketing basics', url: 'https://www.cj.com' } ],
      keywords: [ 'Affiliate', 'Commission', 'Earnings', 'CR', 'AOV' ],
      seoHtml: '<h2>คำนวณรายได้จาก Affiliate</h2><p>ประเมินรายได้จากพารามิเตอร์หลัก CR, AOV และ Commission%</p><h3>แนวทางเพิ่มรายได้</h3><ul><li>เพิ่มความเหมาะสมของข้อเสนอ</li><li>ปรับปรุง Conversion Rate</li><li>เจรจา Commission ที่สูงขึ้น</li></ul>'
    }
  },

  // Health: Calorie
  calorie: {
    GLOBAL: {
      useCases: [
        'ประเมินปริมาณแคลอรี่ต่อวันที่ควรกินจาก BMR และ TDEE',
        'ตั้งเป้าลด/เพิ่มน้ำหนักอย่างปลอดภัยด้วยแคลอรี่ขาด/เกิน'
      ],
      howTo: [
        'ใส่เพศ อายุ ส่วนสูง และน้ำหนักเพื่อคำนวณ BMR',
        'เลือกระดับกิจกรรมเพื่อได้ TDEE',
        'เลือกเป้าหมาย (รักษาน้ำหนัก/ลด/เพิ่ม) เพื่อดูแคลอรี่ต่อวัน'
      ],
      faqs: [
        { question: 'BMR กับ TDEE ต่างกันอย่างไร?', answer: 'BMR คือพลังงานพื้นฐานขณะพัก ส่วน TDEE คือพลังงานที่ใช้จริงต่อวันเมื่อรวมกิจกรรม' }
      ],
      references: [
        { label: 'Mifflin–St Jeor Equation', url: 'https://en.wikipedia.org/wiki/Basal_metabolic_rate#BMR_estimation_formulas' }
      ]
    }
  },

  // Health: Protein Intake
  'protein-intake': {
    GLOBAL: {
      useCases: [
        'คำนวณโปรตีนต่อวันตามน้ำหนักตัวและเป้าหมาย',
        'วางแผนโภชนาการร่วมกับการออกกำลังกาย'
      ],
      howTo: [
        'ใส่น้ำหนักตัว (กก.)',
        'เลือกเป้าหมาย (สุขภาพทั่วไป/ลดน้ำหนัก/เพิ่มกล้าม/นักกีฬา)',
        'อ่านโปรตีนที่แนะนำเป็นกรัมต่อวัน'
      ],
      faqs: [
        { question: 'ควรกินโปรตีนต่อวันเท่าไร?', answer: 'ขึ้นกับเป้าหมายและกิจกรรม ช่วงทั่วไป ~1.2–2.0 กรัม/กก./วัน' }
      ],
      references: [
        { label: 'ISSN Position Stand – Protein and Exercise', url: 'https://jissn.biomedcentral.com/articles/10.1186/1550-2783-4-8' }
      ]
    }
  },

  // Finance: NPV & IRR
  'npv-irr': {
    GLOBAL: {
      useCases: [
        'ประเมินความคุ้มค่าของโครงการด้วย NPV',
        'หา IRR เพื่อเทียบกับค่าใช้จ่ายเงินทุน (WACC)'
      ],
      howTo: [
        'ใส่อัตราคิดลด (discount rate) เป็น %',
        'ใส่กระแสเงินสดเริ่มต้น (t=0) และกระแสเงินสดในอนาคต',
        'ดูผล NPV และ IRR ทันที'
      ],
      faqs: [
        { question: 'NPV กับ IRR ต่างกันอย่างไร?', answer: 'NPV ให้มูลค่าปัจจุบันสุทธิเป็นจำนวนเงิน ส่วน IRR ให้ผลตอบแทนเป็นเปอร์เซ็นต์ที่ทำให้ NPV = 0' },
        { question: 'ใช้ rate เท่าไรดี?', answer: 'มักใช้ต้นทุนเงินทุนถัวเฉลี่ยถ่วงน้ำหนัก (WACC) ของกิจการหรืออัตราขั้นต่ำที่ยอมรับ' }
      ],
      references: [
        { label: 'Investopedia – NPV vs IRR', url: 'https://www.investopedia.com/ask/answers/042415/what-are-differences-between-net-present-value-and-internal-rate-return.asp' }
      ]
    }
  },

  // Finance: CAGR
  cagr: {
    GLOBAL: {
      useCases: [ 'หาค่า CAGR จากมูลค่าเริ่ม มูลค่าปลายงวด และจำนวนปี', 'เทียบการเติบโตเฉลี่ยต่อปีกับตัวเลือกการลงทุนอื่น' ],
      howTo: [ 'ใส่มูลค่าเริ่ม มูลค่าปลายงวด และจำนวนปี', 'อ่าน CAGR (%/ปี) และ Total return (%)' ],
      faqs: [ { question: 'CAGR คืออะไร?', answer: 'อัตราการเติบโตเฉลี่ยต่อปีที่ทำให้มูลค่าเริ่มกลายเป็นมูลค่าปลายงวดในช่วงเวลาที่กำหนด' } ],
      references: [ { label: 'Investopedia – CAGR', url: 'https://www.investopedia.com/terms/c/cagr.asp' } ]
    }
  },

  // Finance: EBITDA Margin
  'ebitda-margin': {
    GLOBAL: {
      useCases: [ 'วัดความสามารถทำกำไรก่อนดอกเบี้ย ภาษี ค่าเสื่อมและค่าตัดจำหน่าย', 'เทียบประสิทธิภาพการดำเนินงานระหว่างบริษัท' ],
      howTo: [ 'ใส่รายได้ (Revenue) และ EBITDA', 'อ่าน EBITDA margin (%)' ],
      faqs: [ { question: 'ทำไม EBITDA margin สำคัญ?', answer: 'ช่วยเปรียบเทียบประสิทธิภาพแกนหลักของธุรกิจ โดยลดผลของโครงสร้างเงินทุนและนโยบายบัญชี' } ],
      references: [ { label: 'CFA Institute – EBITDA', url: 'https://www.cfainstitute.org' } ]
    }
  },

  // Finance: Enterprise Value
  'enterprise-value': {
    GLOBAL: {
      useCases: [ 'ประเมินมูลค่ากิจการสำหรับการเปรียบเทียบอุตสาหกรรม', 'ใช้ EV ในอัตราส่วน EV/EBITDA' ],
      howTo: [ 'ใส่มาร์เก็ตแคป ยอดหนี้รวม และเงินสด', 'อ่าน Enterprise Value' ],
      faqs: [ { question: 'EV ต่างจาก Market Cap ยังไง?', answer: 'EV รวมโครงสร้างหนี้และเงินสด ทำให้สะท้อนมูลค่ากิจการที่ผู้ซื้อต้องจ่ายจริงมากกว่า' } ],
      references: [ { label: 'Investopedia – Enterprise Value (EV)', url: 'https://www.investopedia.com/terms/e/enterprisevalue.asp' } ]
    }
  },

  // Finance: Rent vs Buy
  'rent-vs-buy': {
    GLOBAL: {
      useCases: [ 'เทียบค่าใช้จ่ายรายเดือนระหว่างเช่ากับซื้อ', 'ประมาณผลกระทบของภาษีทรัพย์สินและค่าบำรุงรักษา' ],
      howTo: [ 'ใส่ราคาบ้าน เงินดาวน์ ดอกเบี้ย และปีผ่อน', 'กำหนดภาษีทรัพย์สินและค่าบำรุงรักษา (เป็น %/ปี)', 'เปรียบเทียบกับค่าเช่าต่อเดือน' ],
      faqs: [ { question: 'ควรเช่าหรือซื้อดี?', answer: 'ขึ้นกับระยะเวลาพำนัก อัตราดอกเบี้ย ภาษี และค่าโอกาสของเงินดาวน์ เครื่องมือนี้ช่วยเทียบค่าใช้จ่ายรายเดือนพื้นฐาน' } ],
      references: [ { label: 'Investopedia – Rent vs. Buy', url: 'https://www.investopedia.com/rent-vs-buy-5072237' } ]
    }
  },

  // Finance: Annuity vs Lump Sum
  'annuity-vs-lump-sum': {
    GLOBAL: {
      useCases: [ 'ตัดสินใจเลือกรับรายปีหรือรับเงินก้อน', 'ใช้ส่วนลดอัตราผลตอบแทนเพื่อเทียบมูลค่าปัจจุบัน' ],
      howTo: [ 'ใส่ยอดจ่ายรายเดือน จำนวนปี และอัตราคิดลด (APR %)', 'เปรียบเทียบมูลค่าปัจจุบันของรายปี กับเงินก้อนที่เสนอ' ],
      faqs: [ { question: 'อัตราคิดลดคืออะไร?', answer: 'อัตราผลตอบแทนขั้นต่ำที่ต้องการหรือค่าใช้จ่ายเงินทุนที่ใช้แปลงกระแสเงินสดอนาคตกลับมาเป็นปัจจุบัน' } ],
      references: [ { label: 'CFA Institute – Time Value of Money', url: 'https://www.cfainstitute.org' } ]
    }
  },

  // Finance: Pension
  pension: {
    GLOBAL: {
      useCases: [ 'วางแผนเงินบำนาญต่อเดือนจากเงินสะสมและผลตอบแทน', 'ประมาณระยะเวลารับเงินบำนาญจากกองทุนที่มี' ],
      howTo: [ 'ใส่อายุปัจจุบัน อายุเกษียณ ยอดออมรายเดือน และอัตราผลตอบแทน', 'กำหนดจำนวนปีที่ต้องการรับเงินบำนาญ' ],
      faqs: [ { question: 'ผลตอบแทนควรใช้เท่าไร?', answer: 'ขึ้นกับสินทรัพย์ที่ลงทุน ระวังใช้สมมติฐานอนุรักษ์นิยมเพื่อความปลอดภัย' } ],
      references: [ { label: 'Vanguard – Investment returns', url: 'https://investor.vanguard.com' } ]
    }
  },

  // Finance: Payday Loan
  'payday-loan': {
    GLOBAL: {
      useCases: [ 'คำนวณ APR โดยประมาณจากค่าธรรมเนียมและจำนวนวัน', 'ทำความเข้าใจค่าใช้จ่ายที่แท้จริงของสินเชื่อด่วน' ],
      howTo: [ 'ใส่วงเงิน ค่าธรรมเนียม และจำนวนวันของสัญญา', 'อ่านค่าประมาณ APR (แบบง่าย)' ],
      faqs: [ { question: 'APR ทำไมสูง?', answer: 'แม้ค่าธรรมเนียมดูน้อย แต่เมื่อปรับเป็นรายปีตามระยะเวลาสั้น ๆ APR จะสูงมาก' } ],
      references: [ { label: 'CFPB – Payday loans', url: 'https://www.consumerfinance.gov' } ]
    }
  },

  // Finance: Tuition Loan
  'tuition-loan': {
    GLOBAL: {
      useCases: [ 'ประมาณค่างวดกู้ยืมการศึกษาและดอกเบี้ยรวม', 'คำนวณดอกเบี้ยช่วงพักชำระ (deferment)' ],
      howTo: [ 'ใส่ยอดกู้ อัตราดอกเบี้ย และระยะเวลากู้', 'ถ้ามี ใส่จำนวนเดือนพักชำระเพื่อดูดอกเบี้ยที่งอกจากพักชำระ' ],
      faqs: [ { question: 'พักชำระมีผลยังไง?', answer: 'ช่วงพักชำระดอกเบี้ยยังคงงอกและถูกบวกเข้ายอดหนี้ ทำให้จ่ายรวมสูงขึ้น' } ],
      references: [ { label: 'Studentaid.gov – Interest capitalization', url: 'https://studentaid.gov/help-center/answers/article/interest-capitalization' } ]
    }
  },

  // Finance: Annuity
  annuity: {
    GLOBAL: {
      useCases: [ 'หามูลค่าปัจจุบัน/อนาคตของเงินงวดรายงวด', 'วางแผนเงินบำนาญ/เงินผ่อน' ],
      howTo: [ 'ใส่ยอดชำระต่อรอบ อัตราดอกเบี้ยต่อรอบ และจำนวนรอบ', 'เลือกชนิด ordinary/due' ],
      faqs: [ { question: 'Ordinary กับ Annuity due ต่างกัน?', answer: 'Ordinary ชำระท้ายรอบ ส่วน due ชำระต้นรอบ ทำให้มูลค่ามากกว่า' } ],
      references: [ { label: 'CFA Institute – Time Value of Money', url: 'https://www.cfainstitute.org' } ]
    }
  },

  // Finance: Bond Price
  'bond-price': {
    GLOBAL: {
      useCases: [ 'ประเมินราคาพันธบัตรจาก YTM', 'เทียบพรีเมียม/ดิสเคานต์พันธบัตร' ],
      howTo: [ 'ใส่มูลค่าที่ตราไว้ อัตราคูปอง YTM ปี และอายุคงเหลือ', 'เลือกความถี่คูปอง' ],
      faqs: [ { question: 'ทำไมราคาเปลี่ยนตาม YTM?', answer: 'ยีลด์สูงขึ้นทำให้มูลค่าปัจจุบันของกระแสเงินสดต่ำลง จึงราคาต่ำลง' } ],
      references: [ { label: 'Investopedia – Bond Pricing', url: 'https://www.investopedia.com/terms/b/bond-valuation.asp' } ]
    }
  },

  // Finance: Bond Yield (YTM)
  'bond-yield': {
    GLOBAL: {
      useCases: [ 'แก้หา YTM จากราคาตลาด', 'เปรียบเทียบยีลด์พันธบัตรต่าง ๆ' ],
      howTo: [ 'ใส่ราคา มูลค่าที่ตราไว้ อัตราคูปอง อายุ และความถี่คูปอง', 'ระบบจะคำนวณ YTM โดยประมาณ' ],
      faqs: [ { question: 'YTM คืออะไร?', answer: 'ผลตอบแทนต่อปีโดยสมมติว่าถือจนถึงกำหนดและนำคูปองไปลงทุนซ้ำในอัตราเดียวกัน' } ],
      references: [ { label: 'FRED – Interest Rates', url: 'https://fred.stlouisfed.org' } ]
    }
  },

  // Finance: WACC
  wacc: {
    GLOBAL: {
      useCases: [ 'หาต้นทุนเงินทุนเฉลี่ยถ่วงน้ำหนักของกิจการ', 'ใช้เป็น discount rate สำหรับ NPV' ],
      howTo: [ 'ใส่น้ำหนัก Equity/Debt/Preferred และต้นทุนของแต่ละส่วน', 'ระบุอัตราภาษีเพื่อคำนวณภาษีของหนี้' ],
      faqs: [ { question: 'ทำไมต้องปรับภาษีของหนี้?', answer: 'ดอกเบี้ยเป็นค่าใช้จ่ายลดหย่อนภาษี ทำให้ต้นทุนหนี้หลังภาษีต่ำลง' } ],
      references: [ { label: 'Investopedia – WACC', url: 'https://www.investopedia.com/terms/w/wacc.asp' } ]
    }
  },

  // Finance: DSCR
  dscr: {
    GLOBAL: {
      useCases: [ 'ประเมินความสามารถชำระหนี้ของโครงการ/ธุรกิจ', 'ใช้ประกอบการอนุมัติสินเชื่อ' ],
      howTo: [ 'ใส่ NOI และยอดชำระหนี้ต่อปี', 'ดูค่า DSCR และการตีความเบื้องต้น' ],
      faqs: [ { question: 'เกณฑ์ DSCR ที่ดีคือเท่าไร?', answer: 'ขึ้นกับสถาบันการเงินและประเภทโครงการ หลายแห่งต้องการ ≥ 1.2' } ],
      references: [ { label: 'World Bank – Project Finance Basics', url: 'https://www.worldbank.org' } ]
    }
  },

  // Finance: Stock Return
  'stock-return': {
    GLOBAL: {
      useCases: [ 'คำนวณกำไร/ขาดทุนจากหุ้นรวมปันผล', 'คำนวณ ROI และอัตราผลตอบแทนรวม' ],
      howTo: [ 'ใส่ราคาซื้อ-ขาย จำนวนหุ้น และปันผล', 'พิจารณาค่าธรรมเนียมโบรกเกอร์/ภาษี', 'ดูผลตอบแทนรวมและ ROI' ],
      faqs: [ { question: 'รวมภาษีปันผลหรือไม่?', answer: 'ผู้ใช้ควรปรับด้วยตัวเองเพราะอัตราภาษีต่างกันตามประเทศ' } ],
      references: [ { label: 'OECD – Taxation of dividends', url: 'https://www.oecd.org/tax/' } ]
    },
    US: {
      useCases: [ 'ประมาณ capital gains และภาษีที่เกี่ยวข้องคร่าว ๆ', 'วิเคราะห์ total return รวมปันผล' ],
      howTo: [ 'ใส่ราคา ค่าธรรมเนียม และปันผล', 'ภาษีกำไรจากการขายอาจใช้กฎต่างกัน (short/long-term)' ],
      faqs: [ { question: 'Short-term vs Long-term?', answer: 'กำไรถือครองสั้นมักเสียภาษีสูงกว่า ถือครองยาวใช้อัตราพิเศษ' } ],
      references: [ { label: 'IRS – Topic No. 409 Capital Gains', url: 'https://www.irs.gov/taxtopics/tc409' } ]
    },
    TH: {
      useCases: [ 'คำนวณกำไรสุทธิหลังค่าธรรมเนียม/ภาษี', 'รวมเงินปันผลสุทธิ (หักภาษี ณ ที่จ่าย)' ],
      howTo: [ 'ใส่ราคาซื้อขาย ค่าคอมมิชชั่น และปันผล', 'ตรวจสอบภาษีเงินได้/ภาษีหัก ณ ที่จ่าย' ],
      faqs: [ { question: 'ภาษีปันผลหัก ณ ที่จ่ายเท่าไร?', answer: 'ตามกฎหมายไทยโดยทั่วไปหัก ณ ที่จ่าย 10% (ตรวจสอบประกาศล่าสุด)' } ],
      references: [ { label: 'ตลาดหลักทรัพย์ฯ (SET) – ภาษี', url: 'https://www.set.or.th' } ]
    }
  },

  // Finance: Dividend
  dividend: {
    GLOBAL: {
      useCases: [ 'คำนวณเงินปันผลรายปี', 'คำนวณ dividend yield' ],
      howTo: [ 'ใส่จำนวนหุ้นและปันผลต่อหุ้น', 'ใส่ราคาหุ้นเพื่อคำนวณ yield' ],
      faqs: [ { question: 'Yield สูงดีเสมอไหม?', answer: 'ไม่ จำเป็นต้องดูความยั่งยืนของเงินปันผลและงบการเงิน' } ],
      references: [ { label: 'Investopedia – Dividend Yield', url: 'https://www.investopedia.com/terms/d/dividendyield.asp' } ]
    },
    US: {
      useCases: [ 'ประมาณภาษีปันผลแบบ qualified/non‑qualified', 'เปรียบเทียบหุ้นจ่ายปันผล' ],
      howTo: [ 'แยกประเภทปันผลสำหรับภาษี', 'ตรวจสอบแบบฟอร์ม 1099-DIV' ],
      faqs: [ { question: 'Qualified dividend คืออะไร?', answer: 'ปันผลที่เข้าเกณฑ์จะเสียภาษีต่ำกว่า ต้องถือครองตามระยะเวลาที่กำหนด' } ],
      references: [ { label: 'IRS – Topic No. 404 Dividends', url: 'https://www.irs.gov/taxtopics/tc404' } ]
    },
    TH: {
      useCases: [ 'คำนวณปันผลสุทธิหลังหัก ณ ที่จ่าย', 'วางแผนกระแสเงินสดจากปันผล' ],
      howTo: [ 'ใส่จำนวนหุ้น/ปันผลต่อหุ้น', 'คำนวณเงินสุทธิหลังหักภาษี' ],
      faqs: [ { question: 'เครดิตภาษีเงินปันผลคืออะไร?', answer: 'เป็นสิทธิ์เครดิตภาษีสำหรับผู้มีเงินได้บางกรณี โปรดปรึกษาผู้เชี่ยวชาญ' } ],
      references: [ { label: 'กรมสรรพากร – ภาษีเงินได้', url: 'https://www.rd.go.th' } ]
    }
  },

  // Tax: VAT/Sales Tax
  'sales-tax': {
    GLOBAL: {
      useCases: [ 'คำนวณภาษีขายจากราคาสินค้า', 'แยกราคา net/gross', 'ดู Effective tax เมื่อมีหลายระดับอัตรา' ],
      howTo: [ 'ใส่อัตราภาษีและราคาสินค้า', 'เลือกว่าเพิ่มภาษีหรือแยกภาษีออก', 'ในบางประเทศ พิจารณาอัตราท้องถิ่นเพิ่มเติม' ],
      faqs: [ { question: 'ภาษีขายกับ VAT ต่างกันไหม?', answer: 'ต่างตามประเทศ: บางที่ใช้ Sales Tax ปลายทาง ผู้ขายเก็บ บางที่ใช้ VAT แบบเครดิตภาษีหักได้' } ],
      references: [ { label: 'OECD – Consumption taxes', url: 'https://www.oecd.org/tax/consumption-tax/' } ],
      keywords: ['sales tax calculator','net to gross','tax inclusive price','consumption tax'],
      seoHtml: '<h2>Sales tax vs VAT</h2><p>Sales tax is typically applied once at the final sale to consumers, while VAT applies at each stage with input tax credits. This tool helps compute tax from either net or tax-inclusive price.</p>'
    },
    US: {
      useCases: [ 'คำนวณ sales tax รายรัฐ/ท้องถิ่น', 'ราคาหลังรวมภาษี' ],
      howTo: [ 'ใส่อัตราภาษีตามรัฐ/เมือง', 'พิจารณา taxability ของสินค้า' ],
      faqs: [ { question: 'อัตราต่างเมืองต่างกัน?', answer: 'ใช่ มีทั้งอัตรารัฐ มณฑล เมือง และพิเศษ' } ],
      references: [ { label: 'Tax Foundation – State and Local Sales Tax Rates', url: 'https://taxfoundation.org' } ],
      keywords: ['state sales tax','local tax','us sales tax'],
      seoHtml: '<h2>U.S. combined rates</h2><p>Combined sales tax includes state, county, city and district add-ons. Merchants must charge the destination rate for shipped orders in many states.</p>'
    },
    TH: {
      useCases: [ 'คำนวณ VAT 7% จากราคาสินค้า', 'คำนวณยอด VAT ที่ต้องชำระ' ],
      howTo: [ 'ใส่ราคาและเลือกเพิ่ม/แยก VAT', 'สำหรับผู้ประกอบการคำนวณ VAT ชำระสุทธิ' ],
      faqs: [ { question: 'VAT 7% ใช้กับสินค้าทุกชนิดไหม?', answer: 'บางกรณีอาจยกเว้น/อัตราศูนย์ ดูประกาศกรมสรรพากร' } ],
      references: [ { label: 'กรมสรรพากร – VAT', url: 'https://www.rd.go.th' } ]
    }
  },

  // Crypto: ETH Gas Fee
  'eth-gas': {
    GLOBAL: {
      useCases: [ 'ประเมินค่าโอน ETH ตาม gas price และ gas used', 'เทียบต้นทุนธุรกรรมช่วงเครือข่ายหนาแน่น' ],
      howTo: [ 'กรอก gas price (gwei) และ gas used', 'กรอกค่า ETH/USD', 'ดูค่าใช้จ่าย ETH และสกุลเงินท้องถิ่น' ],
      faqs: [ { question: 'ทำไมค่าธรรมเนียมผันผวน?', answer: 'ขึ้นกับความหนาแน่นเครือข่ายและกลไก EIP‑1559 (base fee + tip)' } ],
      references: [ { label: 'Ethereum – Gas and fees', url: 'https://ethereum.org/en/developers/docs/gas/' } ]
    }
  },

  // Crypto: Profit
  'crypto-profit': {
    GLOBAL: {
      useCases: [ 'คำนวณกำไร/ขาดทุนซื้อขายคริปโต', 'รวมค่าธรรมเนียม exchange เป็นต้นทุน' ],
      howTo: [ 'ใส่ราคาซื้อ-ขาย ปริมาณ และค่าธรรมเนียม', 'ดูผลกำไรสุทธิ' ],
      faqs: [ { question: 'ภาษีคริปโตคิดอย่างไร?', answer: 'แตกต่างตามประเทศ ควรตรวจแหล่งข้อมูลทางการ' } ],
      references: [ { label: 'OECD – Crypto-Asset Reporting Framework', url: 'https://www.oecd.org/tax/exchange-of-tax-information/crypto-asset-reporting-framework/' } ]
    }
  },

  // Finance: VAT (Value Added Tax)
  vat: {
    GLOBAL: {
      useCases: [ 'คำนวณ VAT จากราคา net/gross', 'ประเมิน VAT ที่ต้องชำระสุทธิ (output – input)' ],
      howTo: [ 'ใส่อัตรา VAT และราคา', 'เลือกเพิ่ม VAT หรือแยก VAT ออกจากราคา', 'กรณีผู้ประกอบการ ใส่ VAT ขาเข้าเพื่อคำนวณชำระสุทธิ' ],
      faqs: [ { question: 'VAT กับ Sales Tax ต่างกัน?', answer: 'VAT เก็บเป็นขั้นตอนและเครดิตภาษีได้ ส่วน Sales Tax เก็บครั้งสุดท้ายกับผู้บริโภค' } ],
      references: [ { label: 'OECD – Value Added Tax (VAT)', url: 'https://www.oecd.org/tax/consumption-tax/' } ],
      keywords: ['vat calculator','net to gross','input tax credit','output tax'],
      seoHtml: '<h2>หลักการ VAT</h2><p>VAT จัดเก็บในทุกขั้นของห่วงโซ่อุปทาน ผู้ประกอบการนำ VAT ขาเข้ามาหักออกจาก VAT ขาออก เหลือเป็น VAT ชำระสุทธิ</p>'
    },
    TH: {
      useCases: [ 'คำนวณ VAT 7% สำหรับไทย', 'คำนวน VAT ชำระสุทธิ (output - input)' ],
      howTo: [ 'ใส่ราคาและอัตรา 7%', 'สำหรับผู้ประกอบการ คิด VAT ขาออกลบขาเข้า' ],
      faqs: [ { question: 'สินค้าหรือบริการยกเว้น VAT มีไหม?', answer: 'มี เช่น การส่งออกอัตราศูนย์ และบางกิจการได้รับยกเว้น โปรดดูประกาศ' } ],
      references: [ { label: 'กรมสรรพากร – ภาษีมูลค่าเพิ่ม', url: 'https://www.rd.go.th' } ]
    },
    EU: {
      useCases: [ 'คำนวณ VAT ตามประเทศสมาชิก', 'คำนวณ reverse charge ในบางกรณี B2B' ],
      howTo: [ 'เลือกอัตราประเทศ', 'พิจารณากฎ cross‑border และ OSS/IOSS' ],
      faqs: [ { question: 'อัตราเดียวทั้ง EU ไหม?', answer: 'ไม่ แต่ละประเทศกำหนดอัตราเองและมีอัตราลดหย่อน' } ],
      references: [ { label: 'European Commission – VAT', url: 'https://taxation-customs.ec.europa.eu/taxation-1/value-added-tax-vat_en' } ]
    },
    UK: {
      useCases: [ 'คำนวณ VAT หลัง Brexit', 'ตรวจสอบ VAT registration threshold' ],
      howTo: [ 'ใช้อัตรา VAT ปัจจุบันของสหราชอาณาจักร', 'พิจารณา zero‑rated และ exempt supplies' ],
      faqs: [ { question: 'ต้องลงทะเบียน VAT เมื่อไร?', answer: 'เมื่อมูลค่าการขายเกิน threshold ตามที่ HMRC กำหนด' } ],
      references: [ { label: 'GOV.UK – VAT rates', url: 'https://www.gov.uk/vat-rates' } ]
    },
    IN: {
      useCases: [ 'ใช้เป็นตัวช่วยคำนวณ GST (คล้าย VAT)', 'คำนวณ input tax credit' ],
      howTo: [ 'ใส่อัตรา GST และราคา', 'ใช้ ITC เพื่อลดภาษีสุทธิ' ],
      faqs: [ { question: 'GST กับ VAT ต่างกันไหม?', answer: 'GST เป็นการปฏิรูปแทน VAT หลายรัฐ โดยหลักการคล้าย VAT' } ],
      references: [ { label: 'CBIC – GST', url: 'https://cbic-gst.gov.in' } ]
    }
  },

  // Lifestyle: Tip
  tip: {
    GLOBAL: {
      useCases: [ 'คำนวณทิปต่อบิล', 'หารบิลต่อคนรวมทิป' ],
      howTo: [ 'ใส่ยอดบิล อัตราทิป และจำนวนคน', 'ดูทิปรวมและต่อคน' ],
      faqs: [ { question: 'ควรให้ทิปเท่าไรดี?', answer: 'ต่างกันตามประเทศ/บริการ ใช้แนวทางท้องถิ่นเป็นหลัก' } ],
      references: [ { label: 'Wikipedia – Gratuity (by country overview)', url: 'https://en.wikipedia.org/wiki/Gratuity' } ]
    },
    US: {
      useCases: [ 'คำนวณ 15–20% สำหรับร้านอาหาร', 'แยก service charge ออกจากทิป' ],
      howTo: [ 'ใส่ยอดก่อนภาษี', 'ตรวจดูว่ามี service charge แล้วหรือไม่' ],
      faqs: [ { question: 'Service charge คือทิปไหม?', answer: 'ไม่เสมอไป บางกรณีเป็นค่าบริการของร้าน ไม่ใช่ทิปของพนักงาน' } ],
      references: [ { label: 'U.S. Department of Labor – Tipped employees', url: 'https://www.dol.gov/agencies/whd/fact-sheets/15-flsa-tipped' } ]
    },
    UK: {
      useCases: [ 'ประเมิน discretionary service charge', 'ให้ทิปกรณีไม่มี service charge' ],
      howTo: [ 'ตรวจใบเสร็จว่ามี service charge แล้วหรือยัง', 'ถ้าไม่มี อาจให้ 10–12.5% ตามความเหมาะสม' ],
      faqs: [ { question: 'ทิปต้องถึงลูกจ้างหรือไม่?', answer: 'มีกฎหมายคุ้มครองให้ทิปถึงลูกจ้างในบางกรณี' } ],
      references: [ { label: 'GOV.UK – Tips, gratuities and service charges', url: 'https://www.gov.uk/tips-and-gratuities' } ]
    },
    TH: {
      useCases: [ 'คำนวณบิลรวมทิป', 'เทียบกรณีมี service charge 10%' ],
      howTo: [ 'เช็ก service charge ในบิล', 'ระบุอัตราทิปเพิ่มเติมหากต้องการ' ],
      faqs: [ { question: 'ไทยมีมาตรฐานทิปไหม?', answer: 'ไม่มีมาตรฐานบังคับ เป็นธรรมเนียม ขึ้นกับบริการและสถานที่' } ],
      references: [ { label: 'การท่องเที่ยวแห่งประเทศไทย – มารยาทในไทย', url: 'https://www.tourismthailand.org' } ]
    }
  },

  // Health: Pregnancy calculators
  'pregnancy-due-date': {
    GLOBAL: {
      useCases: [ 'คำนวณวันกำหนดคลอด (EDD)', 'ประเมินช่วงไตรมาสและนัดตรวจ' ],
      howTo: [ 'ใส่วันแรกของประจำเดือนครั้งสุดท้าย (LMP)', 'ระบุความยาวรอบเดือน', 'ดู EDD โดยอิงกฎ Naegele' ],
      faqs: [ { question: 'รอบเดือนต่างจาก 28 วันทำยังไง?', answer: 'ตัวคำนวณจะชดเชยความยาวรอบเดือน (+/-) จาก 28 วัน' } ],
      references: [ { label: 'ACOG – Determining Due Date', url: 'https://www.acog.org' } ]
    }
  },
  ovulation: {
    GLOBAL: {
      useCases: [ 'ประเมินวันไข่ตก', 'หาช่วง fertile window' ],
      howTo: [ 'ใส่ LMP และความยาวรอบเดือน', 'ดูช่วงไข่ตกและช่วง fertile window' ],
      faqs: [ { question: 'ผลแม่นยำแค่ไหน?', answer: 'เป็นการประมาณ อาจใช้ชุดตรวจ LH หรืออุณหภูมิร่างกายประกอบ' } ],
      references: [ { label: 'NHS – Ovulation and fertility', url: 'https://www.nhs.uk' } ]
    }
  },
  conception: {
    GLOBAL: {
      useCases: [ 'ประมาณวันปฏิสนธิจากกำหนดคลอด (EDD)' ],
      howTo: [ 'กรอก EDD', 'ระบบจะคำนวณย้อนกลับ ~266 วัน' ],
      faqs: [ { question: 'ต่างจากวันมีเพศสัมพันธ์ไหม?', answer: 'เป็นค่าโดยประมาณ ปัจจัยไข่ตก/การปฏิสนธิจริงอาจต่างกัน' } ],
      references: [ { label: 'Mayo Clinic – Pregnancy due date', url: 'https://www.mayoclinic.org' } ]
    }
  },
  'pregnancy-weight-gain': {
    GLOBAL: {
      useCases: [ 'ดูคำแนะนำการเพิ่มน้ำหนักระหว่างตั้งครรภ์ตาม BMI ก่อนตั้งครรภ์' ],
      howTo: [ 'ใส่ BMI ก่อนตั้งครรภ์และอายุครรภ์ (สัปดาห์)', 'ดูช่วงแนะนำและค่าโดยประมาณ' ],
      faqs: [ { question: 'ครรภ์แฝดใช้เกณฑ์เดียวกันไหม?', answer: 'ไม่ เกณฑ์ต่างกัน ควรปรึกษาแพทย์' } ],
      references: [ { label: 'IOM/NAM – Weight Gain During Pregnancy', url: 'https://www.nationalacademies.org' } ]
    }
  },

  // Finance: Credit Card Interest
  'credit-card': {
    GLOBAL: {
      useCases: [ 'คำนวณดอกเบี้ยบัตรเครดิต', 'ประมาณเวลาปลดหนี้ตามยอดชำระต่อเดือน', 'จำลอง snowball/avalanche เบื้องต้น (ทีละใบ)' ],
      howTo: [ 'ใส่ยอดคงค้าง อัตรา APR และยอดชำระ', 'ดูดอกเบี้ยรวมและเวลาปลดหนี้', 'เพิ่มยอดชำระเพื่อดูผลกระทบ' ],
      faqs: [
        { question: 'ชำระขั้นต่ำดีไหม?', answer: 'ไม่ควรหากทำได้ เพราะดอกเบี้ยสะสมสูง ใช้ยอดชำระสูงขึ้นเพื่อลดดอกเบี้ยรวม' },
        { question: 'APR ต่างจากดอกเบี้ยรายวัน?', answer: 'ผู้ออกบัตรมักคิดดอกเบี้ยรายวันจาก APR/365 (หรือ 360) แล้วสะสมตลอดรอบบิล' }
      ],
      references: [ { label: 'Investopedia – Credit Card Interest', url: 'https://www.investopedia.com/terms/c/creditcardinterest.asp' } ],
      keywords: ['credit card calculator','APR interest','payoff time','minimum payment'],
      seoHtml: '<h2>เข้าใจ APR และการคิดดอกเบี้ย</h2><p>ดอกบัตรเครดิตคำนวณจาก APR รายปีที่ถูกเฉลี่ยเป็นรายวันและคูณกับยอดคงค้าง หากชำระเพียงขั้นต่ำ ยอดดอกจะสะสมและยืดเวลาปลดหนี้</p>'
    },
    US: {
      useCases: [ 'ประมาณดอกเบี้ยตาม APR และค่าธรรมเนียม', 'จำลองผลจากยอดชำระเพิ่ม' ],
      howTo: [ 'ใส่ยอดคงค้างและ APR', 'เพิ่มยอดชำระเพื่อดูเวลาปลดหนี้' ],
      faqs: [ { question: 'APR คิดอย่างไร?', answer: 'เป็นอัตราต่อปี คิดดอกเบี้ยรายวัน/รายรอบบิลตามผู้ออกบัตร' } ],
      references: [ { label: 'CFPB – Credit cards', url: 'https://www.consumerfinance.gov/credit-cards/' } ]
    },
    TH: {
      useCases: [ 'คำนวณดอกเบี้ยตามเพดานธปท.', 'วางแผนชำระหนี้ให้เร็วขึ้น' ],
      howTo: [ 'ใส่ยอดคงค้างและอัตราที่ธนาคารคิด', 'จำลองยอดชำระเพิ่มเพื่อลดเวลาปลดหนี้' ],
      faqs: [ { question: 'เพดานดอกเบี้ยบัตรเครดิตไทยเท่าไร?', answer: 'ดูประกาศธนาคารแห่งประเทศไทย อัตราอาจเปลี่ยนตามนโยบาย' } ],
      references: [ { label: 'ธนาคารแห่งประเทศไทย – บัตรเครดิต', url: 'https://www.bot.or.th' } ]
    }
  },

  // Finance: Inflation
  inflation: {
    GLOBAL: {
      useCases: [ 'ปรับมูลค่าเงินตามอัตราเงินเฟ้อ', 'เทียบราคาสินค้าในคนละช่วงเวลา' ],
      howTo: [ 'ใส่ปีและอัตราเงินเฟ้อโดยประมาณ', 'คำนวณมูลค่าปัจจุบันเทียบอดีต/อนาคต' ],
      faqs: [ { question: 'ใช้ CPI ประเทศไหน?', answer: 'ควรใช้สถิติของประเทศที่เกี่ยวข้อง เพื่อความแม่นยำ' } ],
      references: [ { label: 'World Bank – Inflation, consumer prices (CPI)', url: 'https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG' } ]
    }
  },

  // Tax: Property Tax
  'property-tax': {
    GLOBAL: {
      useCases: [ 'ประมาณภาษีทรัพย์สินจากมูลค่าประเมิน', 'วางแผนเงินสดสำหรับชำระภาษีรายปี' ],
      howTo: [ 'ใส่มูลค่าประเมิน อัตราภาษี และยกเว้น', 'ดูภาษีที่ต้องชำระ' ],
      faqs: [ { question: 'ทำไมแต่ละเขตไม่เท่ากัน?', answer: 'ภาษีทรัพย์สินเป็นอำนาจท้องถิ่น กฎเกณฑ์และยกเว้นต่างกัน' } ],
      references: [ { label: 'Local government resources', url: 'https://en.wikipedia.org/wiki/Property_tax' } ]
    }
  },

  // Finance: Profit Margin
  'profit-margin': {
    GLOBAL: {
      useCases: [ 'หากำไรขั้นต้นและกำไรจากการดำเนินงาน', 'จำลองผลกระทบของ COGS/OPEX ต่อ margin' ],
      howTo: [ 'กรอกยอดขาย ต้นทุน และค่าใช้จ่าย', 'ดูอัตรากำไร' ],
      faqs: [ { question: 'Margin กับ Markup ต่างกัน?', answer: 'Margin คือกำไรคิดจากยอดขาย ส่วน Markup คือการบวกจากต้นทุน' } ],
      references: [ { label: 'Investopedia – Profit Margin', url: 'https://www.investopedia.com/terms/p/profitmargin.asp' } ]
    }
  },

  // Finance: Business Loan
  'business-loan': {
    GLOBAL: {
      useCases: [ 'คำนวณค่างวดกู้ธุรกิจรวมค่าตั้งวงเงิน', 'เปรียบเทียบระยะเวลาผ่อน' ],
      howTo: [ 'ใส่เงินต้น อัตราดอกเบี้ย และค่าธรรมเนียม', 'ระบุจำนวนปีและดูค่างวด' ],
      faqs: [ { question: 'Effective rate ต่างจาก APR?', answer: 'Effective rate รวมผลของทบต้น ส่วน APR เป็นอัตราต่อปีไม่รวมค่าธรรมเนียมทั้งหมดเสมอ' } ],
      references: [ { label: 'SBA – Small Business Loans', url: 'https://www.sba.gov/funding-programs/loans' } ]
    }
  },

  // Health: TDEE
  tdee: {
    GLOBAL: {
      useCases: [ 'คำนวณพลังงานที่ใช้ต่อวัน', 'ตั้งเป้าลด/เพิ่มน้ำหนักจากแคลอรีที่เหมาะสม' ],
      howTo: [ 'คำนวณ BMR และคูณด้วยระดับกิจกรรม', 'ปรับเพิ่ม/ลดแคลอรีตามเป้าหมาย' ],
      faqs: [ { question: 'ทำไมค่า TDEE ต่างกันในแต่ละสูตร?', answer: 'สูตรและสมมติฐานต่างกัน ควรใช้เป็นแนวทางไม่ใช่ข้อเท็จจริงแน่นอน' } ],
      references: [ { label: 'NIH – Estimated Energy Requirement', url: 'https://www.nal.usda.gov/human-nutrition-and-food-safety/dri-calculator' } ]
    }
  },

  // Finance: Car Loan
  'car-loan': {
    GLOBAL: {
      useCases: [ 'คำนวณค่างวดรถรวมภาษีและค่าธรรมเนียม', 'เปรียบเทียบระยะเวลาผ่อนหลายแบบ' ],
      howTo: [ 'กรอกราคารถ เงินดาวน์ ค่าธรรมเนียม และอัตราดอกเบี้ย', 'ระบุภาษีขาย (ถ้ามี) และจำนวนปี', 'ดูค่างวด ดอกเบี้ยรวม และยอดชำระทั้งหมด' ],
      faqs: [ { question: 'ภาษีขายคิดกับอะไร?', answer: 'หลายพื้นที่คิดจากราคาหลังหักเงินดาวน์ บางที่คิดจากราคารถเต็ม ตรวจสอบตามกฎหมายท้องถิ่น' } ],
      references: [ { label: 'Investopedia – Auto Loans', url: 'https://www.investopedia.com/terms/a/auto-loan.asp' } ]
    },
    US: {
      useCases: [ 'ประมาณค่างวดรวม Sales Tax และ DMV fees', 'เทียบเงินดาวน์ต่าง ๆ' ],
      howTo: [ 'ใส่ราคารถ เงินดาวน์ ค่าธรรมเนียม', 'ใส่ Sales Tax ตามรัฐ และ APR', 'ดูค่างวดและดอกเบี้ยรวม' ],
      faqs: [ { question: 'Sales Tax ต่างรัฐต่างกันไหม?', answer: 'ใช่ อัตราแตกต่างตามรัฐและท้องถิ่น ควรตรวจสอบแหล่งข้อมูลทางการ' } ],
      references: [
        { label: 'CFPB – Auto loans', url: 'https://www.consumerfinance.gov/consumer-tools/auto-loans/' },
        { label: 'Tax Foundation – State Sales Taxes', url: 'https://taxfoundation.org' }
      ]
    },
    UK: {
      useCases: [ 'คำนวณค่างวดรถรวม VAT', 'ประเมินผลกระทบของ VED/ค่าจดทะเบียนแยกต่างหาก' ],
      howTo: [ 'กรอกราคารถและเงินดาวน์', 'ใช้อัตรา VAT ปัจจุบัน', 'ตรวจสอบ VED กับ DVLA แยกต่างหาก' ],
      faqs: [ { question: 'VAT กับ VED เกี่ยวข้องอย่างไร?', answer: 'VAT เป็นภาษีการขาย ส่วน VED คือภาษียานพาหนะรายปี จัดเก็บต่างวัตถุประสงค์' } ],
      references: [
        { label: 'GOV.UK – VAT rates', url: 'https://www.gov.uk/vat-rates' },
        { label: 'GOV.UK – Vehicle tax (VED)', url: 'https://www.gov.uk/vehicle-tax' }
      ]
    },
    TH: {
      useCases: [ 'ประมาณค่างวดรวม VAT และค่าธรรมเนียม', 'เปรียบเทียบดอกเบี้ยหลายสถาบัน' ],
      howTo: [ 'กรอกราคารถ เงินดาวน์ ค่าธรรมเนียม', 'ใช้อัตรา VAT ตามประกาศ', 'ตรวจสอบภาษีสรรพสามิตตามประเภทรถ' ],
      faqs: [ { question: 'ภาษีสรรพสามิตมีผลต่อราคารถไหม?', answer: 'มี ผลต่อราคารถก่อนคำนวณ VAT อ้างอิงประกาศกรมสรรพสามิต' } ],
      references: [
        { label: 'กรมสรรพากร – VAT', url: 'https://www.rd.go.th' },
        { label: 'กรมสรรพสามิต', url: 'https://www.excise.go.th' }
      ]
    },
    IN: {
      useCases: [ 'คำนวณค่างวดรถรวม GST', 'เปรียบเทียบ EMI หลายระยะเวลา' ],
      howTo: [ 'กรอก ex-showroom price และ on-road fees', 'ใช้อัตรา GST ตามประเภท', 'กำหนดอัตราดอกเบี้ยและระยะเวลา' ],
      faqs: [ { question: 'GST รถยนต์คิดเท่าไร?', answer: 'ขึ้นกับประเภท/ขนาดเครื่องยนต์ โปรดตรวจสอบกับ CBIC หรือประกาศรัฐ' } ],
      references: [
        { label: 'CBIC – GST', url: 'https://cbic-gst.gov.in' },
        { label: 'Parivahan', url: 'https://parivahan.gov.in' }
      ]
    },
    EU: {
      useCases: [ 'คำนวณค่างวดรวม VAT ประเทศสมาชิก', 'ประเมินภาษีจดทะเบียน (ถ้ามี)' ],
      howTo: [ 'กำหนด VAT ตามประเทศ', 'แยกค่าธรรมเนียมจดทะเบียน/ภาษีท้องถิ่น', 'คำนวณดอกเบี้ยรวม' ],
      faqs: [ { question: 'VAT ใน EU เท่ากันหมดไหม?', answer: 'ไม่เท่ากัน อัตราแตกต่างระหว่างประเทศสมาชิก' } ],
      references: [ { label: 'European Commission – VAT', url: 'https://taxation-customs.ec.europa.eu/' } ]
    }
  },

  // Health: BMI
  bmi: {
    GLOBAL: {
      useCases: [ 'ประเมินสถานะน้ำหนักเบื้องต้น', 'ติดตามแนวโน้ม BMI เมื่อปรับอาหาร/ออกกำลัง' ],
      howTo: [ 'กรอกส่วนสูง (ซม.) และน้ำหนัก (กก.)', 'ดูค่า BMI และหมวดหมู่', 'ใช้ร่วมกับรอบเอว องค์ประกอบร่างกาย เพื่อประเมินสุขภาพจริง' ],
      faqs: [ { question: 'BMI เพียงพอไหม?', answer: 'ไม่ BMI เป็นเพียงตัวชี้วัดเบื้องต้น ควรดูมวลกล้ามเนื้อ ไขมัน และสุขภาพโดยรวม' } ],
      references: [ { label: 'WHO – Body mass index (BMI)', url: 'https://www.who.int/health-topics/obesity#tab=tab_1' } ]
    },
    US: {
      useCases: [ 'ใช้แนวทาง CDC สำหรับการคัดกรองเบื้องต้น', 'ติดตามน้ำหนักเมื่อปรับพฤติกรรม' ],
      howTo: [ 'ป้อนส่วนสูงและน้ำหนัก', 'ตีความด้วยเกณฑ์ผู้ใหญ่ของ CDC', 'ปรึกษาผู้เชี่ยวชาญเมื่อจำเป็น' ],
      faqs: [ { question: 'เกณฑ์ของเด็กต่างจากผู้ใหญ่ไหม?', answer: 'ต่าง เด็กใช้เปอร์เซ็นไทล์ตามอายุ/เพศ ดูเกณฑ์ CDC' } ],
      references: [ { label: 'CDC – About Adult BMI', url: 'https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html' } ]
    },
    UK: {
      useCases: [ 'ประเมินน้ำหนักตามคำแนะนำ NHS', 'ใช้คู่กับรอบเอวเพื่อประเมินความเสี่ยง' ],
      howTo: [ 'ป้อนส่วนสูงและน้ำหนัก', 'อ้างอิงหมวดหมู่จาก NHS', 'พิจารณาปัจจัยส่วนบุคคล' ],
      faqs: [ { question: 'BMI ของชนชาติเอเชียควรตีความอย่างไร?', answer: 'ค่า BMI เดียวกันอาจมีความเสี่ยงต่างกันในชาติพันธุ์ต่างกัน NHS แนะนำดูรอบเอวประกอบ' } ],
      references: [ { label: 'NHS – BMI Calculator', url: 'https://www.nhs.uk/live-well/healthy-weight/bmi-calculator/' } ]
    },
    TH: {
      useCases: [ 'ประเมินน้ำหนักตามเกณฑ์คนเอเชีย', 'ติดตามผลการควบคุมอาหารและการออกกำลังกาย' ],
      howTo: [ 'กรอกส่วนสูงและน้ำหนัก', 'พิจารณาเกณฑ์ BMI สำหรับชาวเอเชียที่เข้มงวดกว่า', 'ปรึกษาแพทย์หรือนักกำหนดอาหาร' ],
      faqs: [ { question: 'เกณฑ์คนเอเชียต่างจาก WHO ทั่วไป?', answer: 'ใช่ มักถือว่า BMI ≥ 23 เป็นน้ำหนักเกิน และ ≥ 25 เป็นโรคอ้วนสำหรับชาวเอเชีย' } ],
      references: [ { label: 'WHO Expert Consultation – Appropriate BMI for Asian populations', url: 'https://apps.who.int/iris/handle/10665/43029' } ]
    },
    IN: {
      useCases: [ 'ประเมินความเสี่ยงเมตาบอลิกในชาวเอเชียใต้', 'ติดตามน้ำหนักระยะยาว' ],
      howTo: [ 'ป้อนส่วนสูงและน้ำหนัก', 'ใช้เกณฑ์เอเชียใต้ที่เข้มงวดกว่า', 'ขอคำแนะนำบุคลากรทางการแพทย์เมื่อเหมาะสม' ],
      faqs: [ { question: 'ค่า cutoff ของอินเดีย?', answer: 'หลายแนวทางเสนอ >=23 น้ำหนักเกิน และ >=25 โรคอ้วน แต่ให้ยึดแนวทางแพทย์ของคุณ' } ],
      references: [ { label: 'ICMR/NIN – Dietary guidelines', url: 'https://www.nin.res.in' } ]
    },
    EU: {
      useCases: [ 'ประเมินภาวะน้ำหนักเกิน/อ้วนในผู้ใหญ่ยุโรป', 'ติดตามเมื่อโปรแกรมลดน้ำหนัก' ],
      howTo: [ 'ป้อนส่วนสูงและน้ำหนัก', 'อ้างอิงแนวทาง WHO/ยุโรป', 'พิจารณาปัจจัยส่วนบุคคล' ],
      faqs: [ { question: 'ต้องดูรอบเอวไหม?', answer: 'ควร เพราะ BMI ไม่แยกมวลไขมันและกล้ามเนื้อ' } ],
      references: [ { label: 'WHO/Europe – Nutrition and obesity', url: 'https://www.who.int/europe/health-topics/obesity' } ]
    }
  },

  // Conversions
  length: { GLOBAL: { useCases: ['แปลงเมตร/เซนติเมตร/นิ้ว/ฟุต','เทียบเมตริกกับอิมพีเรียล'], howTo: ['เลือกหน่วยต้นทางและปลายทาง','กรอกค่าเพื่อดูผลทันที'], faqs: [{ question: 'ควรปัดทศนิยมเท่าไร?', answer: 'ขึ้นกับบริบทงาน แนะนำปัดตามความละเอียดที่ใช้งานจริง' }], references: [{ label: 'NIST – SI Units', url: 'https://www.nist.gov/pml/owm/si-units' }] } },
  weight: { GLOBAL: { useCases: ['แปลงกก./กรัม/ปอนด์/ออนซ์'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: '1 lb = กี่กก.', answer: '≈ 0.45359237 kg' }], references: [{ label: 'NIST – Metric/Imperial', url: 'https://www.nist.gov/pml/owm/metric-si' }] } },
  temperature: { GLOBAL: { useCases: ['แปลง °C/°F/K'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: 'สูตร °F→°C', answer: '°C = (°F − 32) × 5/9' }], references: [{ label: 'NOAA – Temperature', url: 'https://www.weather.gov' }] }, US: { useCases: ['ใช้กับพยากรณ์อากาศ/เตาอบ'], howTo: ['ใส่ °F เพื่อแปลงเป็น °C/K'], faqs: [{ question: 'Absolute zero คือ?', answer: '0 K ต่ำสุดตามทฤษฎี' }], references: [{ label: 'NIST – SI', url: 'https://www.nist.gov/pml/owm/metric-si' }] } },
  speed: { GLOBAL: { useCases: ['แปลง km/h, mph, m/s, knot'], howTo: ['เลือกหน่วยต้นทาง/ปลายทาง','กรอกค่า'], faqs: [{ question: 'knot คือ?', answer: '1 knot ≈ 1.852 km/h' }], references: [{ label: 'Wikipedia – Speed', url: 'https://en.wikipedia.org/wiki/Speed' }] } },
  area: { GLOBAL: { useCases: ['แปลง m², ft², acre, hectare'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: '1 acre = m²?', answer: '≈ 4046.8564224 m²' }], references: [{ label: 'NIST – SI Units', url: 'https://www.nist.gov/pml/owm/si-units' }] } },
  volume: { GLOBAL: { useCases: ['แปลง L, mL, gal, cup'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: 'gal US/UK ต่างกัน?', answer: 'US ≈ 3.785 L, UK ≈ 4.546 L' }], references: [{ label: 'NIST – SI Units', url: 'https://www.nist.gov/pml/owm/si-units' }] } },
  energy: { GLOBAL: { useCases: ['แปลง J, kJ, cal, kcal, Wh, kWh'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: 'kcal คือ?', answer: '1 kcal = 1000 cal' }], references: [{ label: 'USDA – FoodData', url: 'https://fdc.nal.usda.gov' }] } },
  power: { GLOBAL: { useCases: ['แปลง W, kW, hp'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: '1 hp เท่ากับ?', answer: '≈ 745.7 W' }], references: [{ label: 'NIST – SI Units', url: 'https://www.nist.gov/pml/owm/si-units' }] } },
  pressure: { GLOBAL: { useCases: ['แปลง Pa, kPa, bar, atm, psi'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: '1 atm = Pa?', answer: '≈ 101,325 Pa' }], references: [{ label: 'NIST – SI Units', url: 'https://www.nist.gov/pml/owm/si-units' }] } },
  time: { GLOBAL: { useCases: ['แปลง s, ms, min, h, day'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: 'ms คือ?', answer: '1 ms = 0.001 s' }], references: [{ label: 'NIST – Time', url: 'https://www.nist.gov/time' }] } },
  frequency: { GLOBAL: { useCases: ['แปลง Hz, kHz, MHz, GHz'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: '1 kHz = Hz?', answer: '1000 Hz' }], references: [{ label: 'IEEE', url: 'https://www.ieee.org' }] } },
  angle: { GLOBAL: { useCases: ['แปลง degree/radian/grad'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: 'rad→deg', answer: 'deg = rad × 180/π' }], references: [{ label: 'NIST – SI Units', url: 'https://www.nist.gov/pml/owm/si-units' }] } },
  cooking: { GLOBAL: { useCases: ['แปลง tsp/tbsp/cup ↔ mL/L'], howTo: ['เลือกหน่วยจาก/ไป','กรอกค่า'], faqs: [{ question: 'cup เท่ากับกี่ mL?', answer: 'metric ≈ 240 mL' }], references: [{ label: 'Cooking measures', url: 'https://en.wikipedia.org/wiki/Cooking_weights_and_measures' }] }, TH: { useCases: ['แปลงช้อนชา/ช้อนโต๊ะ ↔ mL'], howTo: ['1 ช้อนชา ≈ 5 mL','1 ช้อนโต๊ะ ≈ 15 mL'], faqs: [{ question: 'ช้อนตวงต่างจากช้อนกิน?', answer: 'ต่าง ควรใช้ช้อนตวงมาตรฐาน' }], references: [{ label: 'มาตรวิทยาอาหาร', url: 'https://en.wikipedia.org/wiki/Cooking_weights_and_measures' }] } },
  'blood-sugar': { GLOBAL: { useCases: ['แปลง mg/dL ↔ mmol/L'], howTo: ['ใส่ค่าแล้วเลือกหน่วยเป้าหมาย'], faqs: [{ question: '1 mmol/L = mg/dL?', answer: '≈ 18 mg/dL' }], references: [{ label: 'WHO – Diabetes', url: 'https://www.who.int/health-topics/diabetes' }] }, US: { useCases: ['บันทึกค่าตามหน่วย mg/dL'], howTo: ['กรอก mg/dL แล้วเลือก mmol/L'], faqs: [{ question: 'ค่าปกติ?', answer: 'ขึ้นกับแนวทางแพทย์' }], references: [{ label: 'CDC – Diabetes', url: 'https://www.cdc.gov/diabetes' }] } },
  'fuel-efficiency': { GLOBAL: { useCases: ['แปลง L/100km ↔ km/L ↔ mpg (US)'], howTo: ['เลือกหน่วยและกรอกค่า'], faqs: [{ question: 'ทำไมค่าไม่เท่ากัน?', answer: 'นิยามต่างกัน L/100km (ยิ่งน้อยยิ่งดี) vs mpg (ยิ่งมากยิ่งดี)' }], references: [{ label: 'EPA – Fuel economy', url: 'https://www.fueleconomy.gov' }] }, TH: { useCases: ['เทียบ km/L กับ L/100km'], howTo: ['กรอก km/L แล้วดู L/100km'], faqs: [{ question: 'km/L→mpg?', answer: 'mpg ≈ km/L × 2.352' }], references: [{ label: 'กรมธุรกิจพลังงาน', url: 'https://www.doeb.go.th' }] } }
  , 'ohms-law': {
    GLOBAL: {
      useCases: ['คำนวณ V, I, R, P จากความสัมพันธ์โอห์ม','ตรวจสอบวงจรง่าย ๆ'],
      howTo: ['กรอกค่ารู้ 2 ตัว เช่น V และ R','เครื่องมือจะคำนวณค่าที่เหลือ'],
      faqs: [ { question: 'ใช้กับ AC ได้ไหม?', answer: 'สูตรพื้นฐานใช้กับ DC/ค่าทันที ใน AC ซับซ้อนขึ้น (อิมพีแดนซ์)' } ],
      references: [ { label: 'Wikipedia – Ohm’s law', url: 'https://en.wikipedia.org/wiki/Ohm%27s_law' } ]
    }
  }
  , 'permutation': { GLOBAL: { useCases: ['นับจำนวนการจัดเรียง','ความน่าจะเป็นแบบจัดลำดับ'], howTo: ['ใส่ n และ r','เลือกแบบซ้ำได้/ไม่ได้'], faqs: [{ question: 'ต่างจาก combination?', answer: 'permutation สนลำดับ, combination ไม่สนลำดับ' }], references: [{ label: 'Permutations and combinations', url: 'https://en.wikipedia.org/wiki/Permutation' }] } }
  , 'combination': { GLOBAL: { useCases: ['นับจำนวนชุดที่เลือก','สถิติ/ความน่าจะเป็น'], howTo: ['ใส่ n และ r','เลือกแบบซ้ำได้/ไม่ได้'], faqs: [{ question: 'ใช้สูตรไหน?', answer: 'nCr = n! / (r!(n-r)!)' }], references: [{ label: 'Binomial coefficient', url: 'https://en.wikipedia.org/wiki/Binomial_coefficient' }] } }
  , 'z-score': { GLOBAL: { useCases: ['คำนวณคะแนนมาตรฐาน','หาความน่าจะเป็นสะสม'], howTo: ['ใส่ค่า X, mean, sd','อ่านค่า z และ CDF'], faqs: [{ question: 'z ใช้เมื่อไร?', answer: 'เมื่อแจกแจงปกติหรือขนาดตัวอย่างใหญ่' }], references: [{ label: 'Z-score (standard score)', url: 'https://en.wikipedia.org/wiki/Standard_score' }] } }
  , 'circle-area': { GLOBAL: { useCases: ['หาพื้นที่/เส้นรอบวงจากรัศมี'], howTo: ['ใส่ r','อ่าน πr² และ 2πr'], faqs: [{ question: 'หน่วย?', answer: 'หน่วยพื้นที่เป็นหน่วยกำลังสอง' }], references: [{ label: 'Circle', url: 'https://en.wikipedia.org/wiki/Circle' }] } }
  , 'triangle-area': { GLOBAL: { useCases: ['หาพื้นที่จากฐานสูงหรือสามด้าน'], howTo: ['เลือกโหมด ฐาน/สูง หรือ 3 ด้าน','กรอกค่าเพื่อคำนวณ'], faqs: [{ question: 'สูตรเฮรอนคือ?', answer: 'A = √(s(s-a)(s-b)(s-c))' }], references: [{ label: 'Heron’s formula', url: 'https://en.wikipedia.org/wiki/Heron%27s_formula' }] } }
  , gcf: { GLOBAL: { useCases: ['หาตัวหารร่วมมาก','ย่อเศษส่วน'], howTo: ['ใส่จำนวนเต็มหลายตัว','อ่านค่า GCF'], faqs: [{ question: 'ต่างจาก GCD?', answer: 'หมายถึงเรื่องเดียวกัน' }], references: [{ label: 'Greatest common divisor', url: 'https://en.wikipedia.org/wiki/Greatest_common_divisor' }] } }
  , lcm: { GLOBAL: { useCases: ['หาคูณร่วมน้อย','จัดตารางเวลา/รอบการทำงาน'], howTo: ['ใส่จำนวนเต็มหลายตัว','อ่านค่า LCM'], faqs: [{ question: 'ศูนย์มีผลอย่างไร?', answer: 'ถ้ามีศูนย์ LCM เป็น 0' }], references: [{ label: 'Least common multiple', url: 'https://en.wikipedia.org/wiki/Least_common_multiple' }] } }
  , age: { GLOBAL: { useCases: ['คำนวณอายุจริง','หานับวัน/ถึงวันเกิดถัดไป'], howTo: ['ใส่วันเกิดและวันอ้างอิง','อ่านผลปี/เดือน/วัน รวมวันทั้งหมด'], faqs: [{ question: 'นับแบบรวมปลายทาง?', answer: 'สามารถเลือกโหมด inclusive ได้ใน Date Difference' }], references: [{ label: 'ISO 8601 – Dates', url: 'https://en.wikipedia.org/wiki/ISO_8601' }] } }
  , 'date-difference': { GLOBAL: { useCases: ['นับวันระหว่างสองวัน','หาจำนวนสัปดาห์/เดือน/ปี'], howTo: ['ใส่วันเริ่มและวันสิ้นสุด','เลือกนับแบบรวมปลายทางหรือไม่'], faqs: [{ question: 'เดือน/ปีต่างกันเพราะอะไร?', answer: 'จำนวนวันต่อเดือนต่างกัน จึงคำนวณแบบปฏิทิน' }], references: [{ label: 'Date arithmetic', url: 'https://en.wikipedia.org/wiki/Date_arithmetic' }] } }
  , 'fuel-cost': { GLOBAL: { useCases: ['ประเมินค่าน้ำมันทริป','เปรียบเทียบรถต่างรุ่น'], howTo: ['ใส่ระยะทาง ราคาเชื้อเพลิงต่อ L และอัตราสิ้นเปลือง','เลือกหน่วยประสิทธิภาพเชื้อเพลิง'], faqs: [{ question: 'mpg เทียบ km/L อย่างไร?', answer: 'km/L ≈ mpg × 1.609344 / 3.785411784' }], references: [{ label: 'EPA – Fuel economy', url: 'https://www.fueleconomy.gov' }] } }
  , 'electricity-bill': { GLOBAL: { useCases: ['ประมาณค่าไฟฟ้ารายเดือน','วางแผนลดการใช้ไฟ'], howTo: ['ใส่หน่วย kWh ต่อเดือน','ใส่ค่า energy rate, Ft, service fee และภาษี'], faqs: [{ question: 'อัตราเป็นขั้นบันได?', answer: 'เครื่องมือนี้เป็นแบบอัตราเดียว หากต้องการขั้นบันได ให้คำนวณเป็นช่วง ๆ' }], references: [{ label: 'Utility tariff basics', url: 'https://en.wikipedia.org/wiki/Electricity_pricing' }] } }
  , 'download-time': { GLOBAL: { useCases: ['ประเมินเวลาดาวน์โหลดไฟล์','วางแผนรับไฟล์ขนาดใหญ่'], howTo: ['ใส่ขนาดไฟล์ (MB)','ใส่ความเร็วลิงก์และเลือกหน่วย','ตั้งค่า overhead (เช่น 10%)'], faqs: [{ question: 'Mbps กับ MBps ต่างกัน', answer: 'Mbps คือเมกะบิตต่อวินาที; MBps คือเมกะไบต์ต่อวินาที (1 MBps = 8 Mbps)' }], references: [{ label: 'Bandwidth vs Throughput', url: 'https://en.wikipedia.org/wiki/Throughput' }] } }
  , 'age-gap': { GLOBAL: { useCases: ['คำนวณความต่างอายุคู่รัก/เพื่อนร่วมงาน'], howTo: ['เลือกวันเกิดสองคน','อ่านค่าต่างปี/เดือน/วัน'], faqs: [{ question: 'นับรวมปลายทาง?', answer: 'เป็นความต่างระหว่างวันเกิดสองวันแบบปฏิทิน' }], references: [{ label: 'ISO 8601 – Dates', url: 'https://en.wikipedia.org/wiki/ISO_8601' }] } }
  , 'random-number': { GLOBAL: { useCases: ['สุ่มตัวเลขสำหรับงานทั่วไป','สุ่มตัวอย่าง'], howTo: ['กำหนดช่วง Min/Max','กำหนดจำนวนและเลือกห้ามซ้ำ'], faqs: [{ question: 'ปลอดภัยเชิงคริปโตหรือไม่?', answer: 'ไม่ เป็น RNG ทั่วไป หากต้องความปลอดภัยใช้แหล่ง CSPRNG' }], references: [{ label: 'Randomness', url: 'https://en.wikipedia.org/wiki/Random_number_generation' }] } }
  , dice: { GLOBAL: { useCases: ['ทอยเต๋าเล่นเกม RPG/บอร์ดเกม'], howTo: ['กำหนดจำนวนเต๋าและหน้าของเต๋า','เพิ่มตัวปรับ (modifier) หากต้องการ'], faqs: [{ question: 'ยุติธรรมไหม?', answer: 'ใช้ตัวสุ่มทั่วไป ผลใกล้เคียงแบบยุติธรรมในระยะยาว' }], references: [{ label: 'Dice', url: 'https://en.wikipedia.org/wiki/Dice' }] } }
  , 'coin-flip': { GLOBAL: { useCases: ['สุ่มเลือกอย่างง่าย','จำลองโยนเหรียญหลายครั้ง'], howTo: ['กำหนดจำนวนครั้ง','ดูจำนวนหัว/ก้อย และลำดับผล'], faqs: [{ question: 'โอกาสหัว/ก้อยเท่ากัน?', answer: 'โดยทฤษฎีเท่ากัน 50/50' }], references: [{ label: 'Coin flipping', url: 'https://en.wikipedia.org/wiki/Coin_flipping' }] } }
  , average: { GLOBAL: { useCases: ['หาค่าเฉลี่ยจากชุดข้อมูล','สรุปตัวเลขหลายรายการ'], howTo: ['ใส่ตัวเลขคั่นด้วยจุลภาค ช่องว่าง หรือบรรทัดใหม่','อ่านผลรวมและค่าเฉลี่ย'], faqs: [{ question: 'ค่าเฉลี่ยไวต่อ outlier ไหม?', answer: 'ไว ควรดู median ร่วมเมื่อมี outlier มาก' }], references: [{ label: 'Mean (average)', url: 'https://en.wikipedia.org/wiki/Mean' }] } }
  , 'median-mode': { GLOBAL: { useCases: ['สรุปแนวโน้มกึ่งกลางและค่าที่พบบ่อย'], howTo: ['ใส่รายการตัวเลข','อ่าน median และ mode'], faqs: [{ question: 'ถ้ามีหลาย mode?', answer: 'อาจมีหลายค่า พบได้ในข้อมูลหลายกลุ่ม' }], references: [{ label: 'Median', url: 'https://en.wikipedia.org/wiki/Median' }] } }
  , 'std-dev': { GLOBAL: { useCases: ['วัดการกระจายของข้อมูล','เปรียบเทียบความผันผวน'], howTo: ['ใส่รายการตัวเลข','อ่านค่าเบี่ยงเบนมาตรฐานและความแปรปรวน'], faqs: [{ question: 'ใช้ sample หรือ population?', answer: 'ขึ้นกับบริบท เครื่องมือนี้คำนวณแบบทั่วไปเพื่อการศึกษา' }], references: [{ label: 'Standard deviation', url: 'https://en.wikipedia.org/wiki/Standard_deviation' }] } }
  , overtime: { GLOBAL: { useCases: ['คำนวณค่าโอทีพนักงานรายชั่วโมง','ประเมินค่าจ้างรวมรายสัปดาห์'], howTo: ['ใส่ชั่วโมงทำงานปกติและชั่วโมง OT','กำหนดอัตรา OT เช่น 1.5x'], faqs: [{ question: 'กฎหมาย OT ต่างประเทศ?', answer: 'แตกต่างตามประเทศ/รัฐ โปรดตรวจข้อกำหนดท้องถิ่น' }], references: [{ label: 'US DOL – Overtime Pay', url: 'https://www.dol.gov/agencies/whd/overtime' }] } }
  , percentage: { GLOBAL: { useCases: ['คำนวณเปอร์เซ็นต์เพิ่ม/ลด','หาส่วนเป็นเปอร์เซ็นต์'], howTo: ['เลือกโหมด เช่น เพิ่ม/ลด หรือ ส่วนของทั้งหมด','กรอกตัวเลขแล้วอ่านผล'], faqs: [{ question: 'ต่างจากส่วนต่อส่วน?', answer: 'เปอร์เซ็นต์คืออัตราส่วนเทียบกับ 100' }], references: [{ label: 'Percentage', url: 'https://en.wikipedia.org/wiki/Percentage' }] } }
  , ratio: { GLOBAL: { useCases: ['ทำให้อัตราส่วนเป็นรูปอย่างง่าย','ปรับขยาย/ย่ออัตราส่วน'], howTo: ['ใส่ a:b และตัวคูณ','อ่านผลที่ย่อแล้ว'], faqs: [{ question: 'ย่ออัตราส่วนอย่างไร?', answer: 'หารด้วยตัวประกอบร่วมมาก (GCF)' }], references: [{ label: 'Ratio', url: 'https://en.wikipedia.org/wiki/Ratio' }] } }
  , exponent: { GLOBAL: { useCases: ['คำนวณเลขยกกำลัง','แก้ปัญหาการเติบโตแบบเอ็กซ์โปเนนเชียล'], howTo: ['ใส่ฐานและชี้กำลัง','อ่านผลลัพธ์'], faqs: [{ question: 'ค่ามากเกินไปโอเวอร์โฟลว์?', answer: 'อาจปัด/จำกัดขนาดตามเบราว์เซอร์' }], references: [{ label: 'Exponentiation', url: 'https://en.wikipedia.org/wiki/Exponentiation' }] } }
  , logarithm: { GLOBAL: { useCases: ['หาลอการิทึมฐานใด ๆ','แปลงเลขยกกำลังเป็นผลคูณ/ผลบวก'], howTo: ['ใส่ค่า x และฐาน b','ใช้สูตรเปลี่ยนฐาน log_b(x) = ln(x)/ln(b)'], faqs: [{ question: 'ฐาน 10 กับ e ต่างกัน?', answer: 'ฐาน 10 เรียก common log, ฐาน e เรียก natural log (ln)' }], references: [{ label: 'Logarithm', url: 'https://en.wikipedia.org/wiki/Logarithm' }] } }
  , countdown: { GLOBAL: { useCases: ['นับถอยหลังกิจกรรม/เดดไลน์'], howTo: ['กำหนดวันเวลาเป้าหมาย','แสดงเวลาที่เหลือเป็น d/h/m/s'], faqs: [{ question: 'โซนเวลา?', answer: 'อิงเขตเวลาของเบราว์เซอร์ผู้ใช้' }], references: [{ label: 'Timekeeping', url: 'https://en.wikipedia.org/wiki/Time' }] } }
  , 'website-bandwidth': { GLOBAL: { useCases: ['ประมาณแบนด์วิดธ์เว็บและทราฟฟิก','วางแผนโควต้าโฮสติ้ง/CDN'], howTo: ['ใส่น้ำหนักหน้าเว็บ (MB)','ใส่จำนวน visits/เดือน และ pages/visit','กำหนด headroom'], faqs: [{ question: 'CDN มีผลอย่างไร?', answer: 'ช่วยลดโหลดเซิร์ฟเวอร์ต้นทาง ปรับ page weight ให้สะท้อน cache hit จริง' }], references: [{ label: 'Web performance', url: 'https://web.dev/fast/' }] } }
  , 'data-transfer': { GLOBAL: { useCases: ['คำนวณอัตราโอนข้อมูลเฉลี่ย','ประเมินเวลา/ความเร็วที่ต้องใช้'], howTo: ['ใส่ขนาดข้อมูลและระยะเวลา'], faqs: [{ question: 'MB/s กับ Mbps?', answer: '1 MB/s = 8 Mbps' }], references: [{ label: 'Networking basics', url: 'https://en.wikipedia.org/wiki/Throughput' }] } }
  , 'streaming-bandwidth': { GLOBAL: { useCases: ['วางแผนกำลังส่งสำหรับสตรีม','ประเมินค่าส่งออกรายเดือน'], howTo: ['ใส่ bitrate และจำนวนผู้ชมพร้อมกัน','เพิ่ม headroom'], faqs: [{ question: 'ABR ทำอย่างไร?', answer: 'ใช้ค่าเฉลี่ยถ่วงน้ำหนักตามสัดส่วนความละเอียดที่ใช้จริง' }], references: [{ label: 'Adaptive bitrate streaming', url: 'https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming' }] } }
  , 'api-usage': { GLOBAL: { useCases: ['ประเมินค่าบริการ API','ประมาณ compute time รวม'], howTo: ['ใส่จำนวน request/เดือนและราคา/1,000','ใส่ latency เฉลี่ย'], faqs: [{ question: 'ฟรีทีเยอร์?', answer: 'หักโควตาฟรีก่อนคำนวณค่าใช้จ่ายจริง' }], references: [{ label: 'API pricing examples', url: 'https://openai.com/pricing' }] } }
  , salary: { GLOBAL: { useCases: ['คำนวณเงินเดือนสุทธิ','วางแผนภาษี/ประกันสังคม'], howTo: ['ใส่รายได้ต่อปี','ปรับอัตราส่งประกันสังคม/กองทุนตามประเทศ'], faqs: [{ question: 'อัตราภาษี?', answer: 'ขึ้นกับประเทศ ใช้วงเล็บภาษีพื้นฐานเป็นค่าเริ่มต้น' }], references: [{ label: 'OECD – Taxing wages', url: 'https://www.oecd.org/tax/tax-policy/taxing-wages.htm' }] } }
  , retirement: { GLOBAL: { useCases: ['ประมาณเงินเกษียณ','ดูผลของอัตราถอน 4%'], howTo: ['ใส่อายุ เงินออม รายเดือน อัตราผลตอบแทน/เงินเฟ้อ','อ่านมูลค่าอนาคตและรายได้ที่คาด'], faqs: [{ question: 'ปลอดภัยแค่ไหน 4%?', answer: 'เป็นกฎทั่วไป ไม่รับประกันระยะยาว ขึ้นกับตลาด' }], references: [{ label: 'Trinity Study (safe withdrawal rate)', url: 'https://en.wikipedia.org/wiki/Trinity_study' }] } }
  , '401k': { GLOBAL: { useCases: ['วางแผนเงินออมพร้อมเงินสมทบบริษัท'], howTo: ['ใส่อัตราออมพนักงานและอัตราสมทบ/เพดาน','ดูยอดเงินปลายทาง'], faqs: [{ question: 'ข้อจำกัดเพดาน?', answer: 'มีเพดานรายปีและเงื่อนไขภาษี ตรวจสอบกับ IRS' }], references: [{ label: 'IRS – 401(k) resource', url: 'https://www.irs.gov/retirement-plans/plan-sponsor/401k-plan' }] } }
  , 'roth-ira': { GLOBAL: { useCases: ['ประเมินการเติบโตของ Roth IRA'], howTo: ['ใส่เงินออมปัจจุบันและออมต่อปี','กำหนดอัตราผลตอบแทนและจำนวนปี'], faqs: [{ question: 'ขีดจำกัด/เงื่อนไขอะไรบ้าง?', answer: 'มีเพดานเงินออมและ phase-out ตามรายได้ ตรวจสอบกับ IRS' }], references: [{ label: 'IRS – Roth IRA', url: 'https://www.irs.gov/retirement-plans/roth-iras' }] } }
  , 'currency-arbitrage': { GLOBAL: { useCases: ['ทดสอบอาร์บิทราจสามสกุล','ดูผลตอบแทนหลังหักค่าธรรมเนียม'], howTo: ['ใส่อัตรา A→B, B→C, C→A และค่าธรรมเนียม','อ่านกำไร/ROI'], faqs: [{ question: 'ทำได้จริงไหม?', answer: 'ตลาดจริงมีสเปรด/สลิปเพจ ทำให้โอกาสลดลง' }], references: [{ label: 'Triangular arbitrage', url: 'https://en.wikipedia.org/wiki/Triangular_arbitrage' }] } }
  , 'simple-interest': {
    GLOBAL: {
      useCases: [ 'คำนวณดอกเบี้ยแบบง่ายสำหรับเงินกู้ระยะสั้น', 'ประเมินดอกเบี้ยเงินกู้ที่คิดแบบ I = P×r×t' ],
      howTo: [ 'ใส่เงินต้น (P)', 'ใส่อัตราดอกเบี้ยต่อปี (r)', 'ใส่ระยะเวลาเป็นปี (t)', 'ดูดอกเบี้ย (I) และยอดรวม (P+I)' ],
      faqs: [
        { question: 'Simple interest ต่างจาก compound interest อย่างไร?', answer: 'Simple interest คิดดอกเฉพาะจากเงินต้นเดิมเท่านั้น ส่วน compound interest ทบต้น ดอกทบดอก' },
        { question: 'ควรใช้เมื่อไร?', answer: 'มักใช้กับเงินกู้ระยะสั้น สินเชื่อรายย่อย หรือกรณีที่ไม่ทบต้นตามรอบ' }
      ],
      references: [
        { label: 'Investopedia – Simple Interest', url: 'https://www.investopedia.com/terms/s/simple_interest.asp' }
      ]
    },
    TH: {
      useCases: [ 'คำนวณดอกเบี้ยกู้ยืมส่วนบุคคลที่ไม่ทบต้น', 'เปรียบเทียบกับดอกเบี้ยทบต้นเพื่อเห็นผลต่าง' ],
      howTo: [ 'กรอกเงินต้น อัตราต่อปี และเวลาเป็นปี', 'อ่านค่าดอกเบี้ยและยอดรวม' ],
      faqs: [ { question: 'อัตราดอกเบี้ยรายเดือนทำอย่างไร?', answer: 'แปลงอัตรารายเดือนเป็นรายปีโดยคูณ 12 (สำหรับ simple interest)' } ],
      references: [ { label: 'ธนาคารแห่งประเทศไทย – อัตราดอกเบี้ยพื้นฐาน', url: 'https://www.bot.or.th' } ]
    }
  }
  , 'apr-apy': {
    GLOBAL: {
      useCases: [ 'แปลง APR เป็น APY หรือกลับกัน', 'เทียบอัตราระหว่างธนาคาร/กองทุนที่คอมพาวด์ต่างกัน' ],
      howTo: [ 'เลือกโหมด APR→APY หรือ APY→APR', 'กรอกอัตรา', 'เลือกจำนวนครั้งที่ทบต่อปี (m)', 'อ่านผลลัพธ์' ],
      faqs: [
        { question: 'APR กับ APY ต่างกัน?', answer: 'APR คืออัตราต่อปีแบบไม่ทบต้น ส่วน APY คืออัตราผลตอบแทนที่แท้จริงเมื่อคำนึงถึงการทบต้น' },
        { question: 'ควรใช้ค่า m เท่าไร?', answer: 'ขึ้นกับผลิตภัณฑ์การเงิน เช่น รายเดือน m=12, รายไตรมาส m=4, รายวัน m=365' }
      ],
      references: [ { label: 'Investopedia – APY vs APR', url: 'https://www.investopedia.com/ask/answers/040115/what-difference-between-annual-percentage-rate-apr-and-apy.asp' } ]
    }
  }
  , 'rule-72': {
    GLOBAL: {
      useCases: [ 'ประมาณเวลาที่เงินจะเพิ่มเป็นสองเท้าอย่างรวดเร็ว', 'ประมาณอัตราที่ต้องการเพื่อให้เงินเพิ่มเป็นสองเท้าภายในเวลาที่กำหนด' ],
      howTo: [ 'เลือกว่าจะหาเวลาหรือหาอัตรา', 'ใส่อัตราเป็น % ต่อปีหรือจำนวนปี', 'อ่านผลจากสูตร 72 ÷ อัตรา% หรือ 72 ÷ ปี' ],
      faqs: [
        { question: 'ความแม่นยำเป็นอย่างไร?', answer: 'แม่นยำโดยประมาณสำหรับอัตรา 6–10% หากอัตราเบี่ยงมาก ควรใช้สูตรทบต้นจริง' },
        { question: 'ทำไมใช้เลข 72?', answer: '72 แบ่งลงตัวด้วยหลายจำนวน (2,3,4,6,8,9,12) จึงสะดวกในการคำนวณคร่าว ๆ' }
      ],
      references: [ { label: 'Investopedia – Rule of 72', url: 'https://www.investopedia.com/terms/r/ruleof72.asp' } ]
    }
  }
};

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  GLOBAL: '🌐 Global',
  US: '🇺🇸 United States',
  UK: '🇬🇧 United Kingdom',
  TH: '🇹🇭 Thailand',
  IN: '🇮🇳 India',
  EU: '🇪🇺 European Union'
};

