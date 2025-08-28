export type CountryCode = 'GLOBAL' | 'US' | 'UK' | 'TH' | 'IN' | 'EU';

type QA = { question: string; answer: string };
type Ref = { label: string; url: string };

export type FaqHowTo = {
  useCases: string[];
  howTo: string[];
  faqs: QA[];
  references: Ref[];
};

export type FaqContentMap = Record<string, Partial<Record<CountryCode, FaqHowTo>>>;

export const FAQ_CONTENT: FaqContentMap = {
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
      useCases: [ 'คำนวณภาษีขายจากราคาสินค้า', 'แยกราคา net/gross' ],
      howTo: [ 'ใส่อัตราภาษีและราคาสินค้า', 'เลือกว่าเพิ่มภาษีหรือแยกภาษีออก' ],
      faqs: [ { question: 'ภาษีขายกับ VAT ต่างกันไหม?', answer: 'ต่างตามประเทศ: บางที่ใช้ Sales Tax ปลายทาง ผู้ขายเก็บ บางที่ใช้ VAT แบบเครดิตภาษีหักได้' } ],
      references: [ { label: 'OECD – Consumption taxes', url: 'https://www.oecd.org/tax/consumption-tax/' } ]
    },
    US: {
      useCases: [ 'คำนวณ sales tax รายรัฐ/ท้องถิ่น', 'ราคาหลังรวมภาษี' ],
      howTo: [ 'ใส่อัตราภาษีตามรัฐ/เมือง', 'พิจารณา taxability ของสินค้า' ],
      faqs: [ { question: 'อัตราต่างเมืองต่างกัน?', answer: 'ใช่ มีทั้งอัตรารัฐ มณฑล เมือง และพิเศษ' } ],
      references: [ { label: 'Tax Foundation – State and Local Sales Tax Rates', url: 'https://taxfoundation.org' } ]
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
      useCases: [ 'คำนวณ VAT จากราคา net/gross', 'ประเมิน VAT ที่ต้องชำระสุทธิ' ],
      howTo: [ 'ใส่อัตรา VAT และราคา', 'เลือกเพิ่ม VAT หรือแยก VAT ออกจากราคา' ],
      faqs: [ { question: 'VAT กับ Sales Tax ต่างกัน?', answer: 'VAT เก็บเป็นขั้นตอนและเครดิตภาษีได้ ส่วน Sales Tax เก็บครั้งสุดท้ายกับผู้บริโภค' } ],
      references: [ { label: 'OECD – Value Added Tax (VAT)', url: 'https://www.oecd.org/tax/consumption-tax/' } ]
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
      useCases: [ 'คำนวณดอกเบี้ยบัตรเครดิต', 'ประมาณเวลาปลดหนี้ตามยอดชำระต่อเดือน' ],
      howTo: [ 'ใส่ยอดคงค้าง อัตรา APR และยอดชำระ', 'ดูดอกเบี้ยรวมและเวลาปลดหนี้' ],
      faqs: [ { question: 'ชำระขั้นต่ำดีไหม?', answer: 'ไม่ควรหากทำได้ เพราะดอกเบี้ยสะสมสูง ใช้ยอดชำระสูงขึ้นเพื่อลดดอกเบี้ย' } ],
      references: [ { label: 'Investopedia – Credit Card Interest', url: 'https://www.investopedia.com/terms/c/creditcardinterest.asp' } ]
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
};

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  GLOBAL: '🌐 Global',
  US: '🇺🇸 United States',
  UK: '🇬🇧 United Kingdom',
  TH: '🇹🇭 Thailand',
  IN: '🇮🇳 India',
  EU: '🇪🇺 European Union'
};

