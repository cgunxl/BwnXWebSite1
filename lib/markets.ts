export type Market = {
  display: string;
  currency: string;
  symbol: string;
  localTerm: string;
  exampleAPR: number;
  fees: { name: string; value: string }[];
  bullets: string[];
};

export const MARKETS: Record<string, Market> = {
  us: {
    display: 'United States',
    currency: 'USD',
    symbol: '$',
    localTerm: 'Loan',
    exampleAPR: 6.9,
    fees: [
      { name: 'Origination fee', value: '0–1%' },
      { name: 'Prepayment', value: 'Typically none' },
      { name: 'State taxes', value: 'Varies by state' },
    ],
    bullets: [
      'Credit score heavily impacts APR tiers',
      'Discounts for autopay and bank clients',
      'APR includes fees; compare APR not rate',
      'No prepayment penalty on most consumer loans',
      'Debt-to-income ratio often capped near 43%',
    ],
  },
  mx: {
    display: 'Mexico',
    currency: 'MXN',
    symbol: '$',
    localTerm: 'Crédito',
    exampleAPR: 17.5,
    fees: [
      { name: 'Comisión por apertura', value: '1–3%' },
      { name: 'Penalización por prepago', value: '0–3%' },
      { name: 'IVA', value: '16% sobre comisiones' },
    ],
    bullets: [
      'CAT (Costo Anual Total) es referencia principal',
      'Seguros de vida/daños pueden ser obligatorios',
      'Descuentos por nómina con bancos afiliados',
      'Comisiones por administración pueden aplicar',
    ],
  },
  br: {
    display: 'Brazil',
    currency: 'BRL',
    symbol: 'R$',
    localTerm: 'Crédito',
    exampleAPR: 22.0,
    fees: [
      { name: 'Tarifa de abertura', value: '0–3%' },
      { name: 'IOF', value: 'Imposto sobre operações financeiras' },
      { name: 'Multa por quitação antecipada', value: '0–2%' },
    ],
    bullets: [
      'Juros variam bastante por score e banco',
      'Consignado tem taxas menores para assalariados',
      'IOF impacta custo no curto prazo',
      'Seguro crédito pode ser embutido',
    ],
  },
  de: {
    display: 'Germany',
    currency: 'EUR',
    symbol: '€',
    localTerm: 'Kredit',
    exampleAPR: 5.2,
    fees: [
      { name: 'Bearbeitungsgebühr', value: '0–1%' },
      { name: 'Vorzeitige Rückzahlung', value: '0–1% Restschuld' },
      { name: 'Schufa', value: 'Bonität beeinflusst Zinssatz' },
    ],
    bullets: [
      'Fester vs. variabler Zinssatz je nach Bank',
      'Sondertilgung oft einmal pro Jahr möglich',
      'Effektivzins (APR) ist maßgeblich',
      'Restschuldversicherung optional',
    ],
  },
  fr: {
    display: 'France',
    currency: 'EUR',
    symbol: '€',
    localTerm: 'Prêt',
    exampleAPR: 4.9,
    fees: [
      { name: 'Frais de dossier', value: '0–1%' },
      { name: 'Indemnité de remboursement', value: '0–3%' },
      { name: 'Assurance emprunteur', value: 'Peut être exigée' },
    ],
    bullets: [
      'TAEG inclut tous les coûts obligatoires',
      'Délégation d’assurance possible pour baisser le coût',
      'Taux d’endettement conseillé < 35%',
      'Prêts à taux fixe dominants',
    ],
  },
  jp: {
    display: 'Japan',
    currency: 'JPY',
    symbol: '¥',
    localTerm: 'ローン',
    exampleAPR: 3.2,
    fees: [
      { name: '事務手数料', value: '0–2%' },
      { name: '繰上返済手数料', value: '0–2%' },
      { name: '印紙税', value: '契約額により' },
    ],
    bullets: [
      '固定・変動金利を選択可能',
      '団信が必要な場合あり',
      'ボーナス併用払いで月々を圧縮',
      '繰上返済で総利息を削減',
    ],
  },
  kr: {
    display: 'South Korea',
    currency: 'KRW',
    symbol: '₩',
    localTerm: '대출',
    exampleAPR: 4.1,
    fees: [
      { name: '취급 수수료', value: '0–1%' },
      { name: '중도상환 수수료', value: '0–1.5%' },
      { name: '인지세', value: '대출금액별 차등' },
    ],
    bullets: [
      'DSR 규제 적용, 한도 영향',
      '고정/변동 혼합형 상품 존재',
      '제휴금리 할인(급여이체 등)',
      '대환대출 활성화로 갈아타기 용이',
    ],
  },
  cn: {
    display: 'China',
    currency: 'CNY',
    symbol: '¥',
    localTerm: '贷款',
    exampleAPR: 4.8,
    fees: [
      { name: '服务费', value: '0–2%' },
      { name: '提前还款费', value: '0–2%' },
      { name: '印花税', value: '按规定' },
    ],
    bullets: [
      'LPR 基准影响贷款利率',
      '线上放款流程加快',
      '部分产品需担保或抵押',
      '提前还款需预约',
    ],
  },
  th: {
    display: 'Thailand',
    currency: 'THB',
    symbol: '฿',
    localTerm: 'สินเชื่อ',
    exampleAPR: 7.2,
    fees: [
      { name: 'ค่าธรรมเนียมเปิดบัญชี', value: '0–2%' },
      { name: 'ค่าปรับปิดก่อนกำหนด', value: '0–3%' },
      { name: 'อากรแสตมป์', value: 'ตามวงเงิน' },
    ],
    bullets: [
      'MRate อ้างอิงดอกเบี้ยธนาคาร',
      'สินเชื่อบุคคลดอกเบี้ยสูงกว่าบ้าน/รถ',
      'ทำประกันสินเชื่อเพื่อลดความเสี่ยง',
      'ผ่อนแบบคงที่นิยมมาก',
    ],
  },
  sa: {
    display: 'Saudi Arabia',
    currency: 'SAR',
    symbol: '﷼',
    localTerm: 'تمويل',
    exampleAPR: 5.5,
    fees: [
      { name: 'رسوم إدارية', value: '0–1%' },
      { name: 'رسوم السداد المبكر', value: '0–3%' },
      { name: 'ضريبة القيمة المضافة', value: '15% على الرسوم' },
    ],
    bullets: [
      'منتجات متوافقة مع الشريعة (مرابحة/إجارة)',
      'نسبة الاستقطاع تحدد حسب الراتب',
      'تحويل راتب قد يخفض الهامش',
      'رسوم السداد المبكر حسب المتبقي',
    ],
  },
  in: {
    display: 'India',
    currency: 'INR',
    symbol: '₹',
    localTerm: 'EMI',
    exampleAPR: 8.5,
    fees: [
      { name: 'Processing fee', value: '0.5–2%' },
      { name: 'Prepayment penalty', value: '0–3%' },
      { name: 'GST', value: 'As applicable' },
    ],
    bullets: [
      'Repo-linked lending rates adjust quickly',
      'Credit card closure can affect score temporarily',
      'Prepayment lowers interest outgo significantly',
      'Home loans often allow partial prepayments free',
      'PSU banks offer competitive rates for salaried',
    ],
  },
  id: {
    display: 'Indonesia',
    currency: 'IDR',
    symbol: 'Rp',
    localTerm: 'KPR',
    exampleAPR: 9.9,
    fees: [
      { name: 'Provisi', value: '0.5–1.5%' },
      { name: 'Penalty pelunasan dipercepat', value: '0–3%' },
      { name: 'BPHTB/Notaris', value: 'Sesuai ketentuan' },
    ],
    bullets: [
      'Fixed-to-floating period umum 1–5 tahun',
      'Asuransi jiwa & kebakaran sering diwajibkan',
      'Biaya notaris dan appraisal signifikan',
      'Program subsidi DP untuk rumah pertama',
    ],
  },
  ru: {
    display: 'Russia',
    currency: 'RUB',
    symbol: '₽',
    localTerm: 'Кредит',
    exampleAPR: 13.0,
    fees: [
      { name: 'Комиссия', value: '0–2%' },
      { name: 'Досрочное погашение', value: 'обычно без штрафа' },
      { name: 'Страхование', value: 'может быть обязательным' },
    ],
    bullets: [
      'Плавающие ставки зависят от ключевой ставки',
      'Скоринг и подтверждение доходов критичны',
      'Реструктуризация возможна при просрочке',
      'Досрочное погашение часто без комиссий',
    ],
  },
};

export type CountryKey = keyof typeof MARKETS;

export function marketOf(country: CountryKey) {
  return MARKETS[country];
}