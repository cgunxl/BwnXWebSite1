export const LOCALES = ['en','es','pt','de','fr','ja','ko','zh','th','ar','hi','id','ru'] as const;
export type Locale = typeof LOCALES[number];

export const COUNTRIES = ['us','mx','br','de','fr','jp','kr','cn','th','sa','in','id','ru'] as const;
export type Country = typeof COUNTRIES[number];

export const DEFAULT_COUNTRY_BY_LOCALE: Record<Locale, Country> = {
  en: 'us',
  es: 'mx',
  pt: 'br',
  de: 'de',
  fr: 'fr',
  ja: 'jp',
  ko: 'kr',
  zh: 'cn',
  th: 'th',
  ar: 'sa',
  hi: 'in',
  id: 'id',
  ru: 'ru',
};

export function getLabels(locale: Locale) {
  const map: Record<Locale, { principal: string; rate: string; years: string; fee?: string; monthlyPayment: string; totalInterest: string; totalCost: string; downloadCsv: string; showAll: string; examples: string; feesNotes: string; faq: string; }> = {
    en: { principal: 'Principal', rate: 'Annual Rate (%)', years: 'Years', fee: 'Fee (%)', monthlyPayment: 'Monthly Payment', totalInterest: 'Total Interest', totalCost: 'Total Cost', downloadCsv: 'Download CSV', showAll: 'Show all', examples: 'Examples', feesNotes: 'Fees & Notes', faq: 'FAQ' },
    es: { principal: 'Principal', rate: 'Tasa anual (%)', years: 'Años', fee: 'Comisión (%)', monthlyPayment: 'Pago mensual', totalInterest: 'Interés total', totalCost: 'Costo total', downloadCsv: 'Descargar CSV', showAll: 'Ver todo', examples: 'Ejemplos', feesNotes: 'Comisiones y notas', faq: 'Preguntas' },
    pt: { principal: 'Principal', rate: 'Taxa anual (%)', years: 'Anos', fee: 'Taxa (%)', monthlyPayment: 'Parcela mensal', totalInterest: 'Juros totais', totalCost: 'Custo total', downloadCsv: 'Baixar CSV', showAll: 'Ver tudo', examples: 'Exemplos', feesNotes: 'Taxas e notas', faq: 'Perguntas' },
    de: { principal: 'Darlehen', rate: 'Jahreszins (%)', years: 'Jahre', fee: 'Gebühr (%)', monthlyPayment: 'Monatsrate', totalInterest: 'Zinsen gesamt', totalCost: 'Gesamtkosten', downloadCsv: 'CSV herunterladen', showAll: 'Alle anzeigen', examples: 'Beispiele', feesNotes: 'Gebühren & Hinweise', faq: 'FAQ' },
    fr: { principal: 'Capital', rate: 'Taux annuel (%)', years: 'Années', fee: 'Frais (%)', monthlyPayment: 'Mensualité', totalInterest: 'Intérêts totaux', totalCost: 'Coût total', downloadCsv: 'Télécharger CSV', showAll: 'Tout afficher', examples: 'Exemples', feesNotes: 'Frais & notes', faq: 'FAQ' },
    ja: { principal: '元金', rate: '年利率 (%)', years: '年数', fee: '手数料 (%)', monthlyPayment: '毎月の支払い', totalInterest: '総利息', totalCost: '総支払額', downloadCsv: 'CSVをダウンロード', showAll: 'すべて表示', examples: '例', feesNotes: '手数料と注意', faq: 'よくある質問' },
    ko: { principal: '원금', rate: '연 이자율 (%)', years: '년수', fee: '수수료 (%)', monthlyPayment: '월 상환액', totalInterest: '총 이자', totalCost: '총 비용', downloadCsv: 'CSV 다운로드', showAll: '전체 보기', examples: '예시', feesNotes: '수수료 및 참고', faq: 'FAQ' },
    zh: { principal: '本金', rate: '年利率 (%)', years: '年限', fee: '费用 (%)', monthlyPayment: '每月还款', totalInterest: '总利息', totalCost: '总成本', downloadCsv: '下载 CSV', showAll: '显示全部', examples: '示例', feesNotes: '费用与说明', faq: '常见问题' },
    th: { principal: 'เงินต้น', rate: 'ดอกเบี้ยต่อปี (%)', years: 'ปี', fee: 'ค่าธรรมเนียม (%)', monthlyPayment: 'ค่างวดต่อเดือน', totalInterest: 'ดอกเบี้ยรวม', totalCost: 'ต้นทุนรวม', downloadCsv: 'ดาวน์โหลด CSV', showAll: 'ดูทั้งหมด', examples: 'ตัวอย่าง', feesNotes: 'ค่าธรรมเนียม & หมายเหตุ', faq: 'คำถามที่พบบ่อย' },
    ar: { principal: 'المبلغ', rate: 'نسبة سنوية (%)', years: 'سنوات', fee: 'رسوم (%)', monthlyPayment: 'القسط الشهري', totalInterest: 'إجمالي الفائدة', totalCost: 'التكلفة الإجمالية', downloadCsv: 'تنزيل CSV', showAll: 'عرض الكل', examples: 'أمثلة', feesNotes: 'الرسوم والملاحظات', faq: 'الأسئلة الشائعة' },
    hi: { principal: 'मूलधन', rate: 'वार्षिक दर (%)', years: 'वर्ष', fee: 'शुल्क (%)', monthlyPayment: 'मासिक किस्त', totalInterest: 'कुल ब्याज', totalCost: 'कुल लागत', downloadCsv: 'CSV डाउनलोड', showAll: 'सभी देखें', examples: 'उदाहरण', feesNotes: 'Fees & Notes', faq: 'प्रश्न' },
    id: { principal: 'Pokok', rate: 'Bunga tahunan (%)', years: 'Tahun', fee: 'Biaya (%)', monthlyPayment: 'Angsuran bulanan', totalInterest: 'Total bunga', totalCost: 'Total biaya', downloadCsv: 'Unduh CSV', showAll: 'Tampilkan semua', examples: 'Contoh', feesNotes: 'Biaya & Catatan', faq: 'FAQ' },
    ru: { principal: 'Сумма', rate: 'Годовая ставка (%)', years: 'Лет', fee: 'Комиссия (%)', monthlyPayment: 'Ежемесячный платёж', totalInterest: 'Итого процентов', totalCost: 'Итоговая стоимость', downloadCsv: 'Скачать CSV', showAll: 'Показать все', examples: 'Примеры', feesNotes: 'Комиссии и прим.', faq: 'Вопросы' },
  };
  return map[locale];
}
