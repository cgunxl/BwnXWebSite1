export type ConverterCategory =
  | 'length' | 'weight' | 'temperature' | 'speed' | 'area' | 'volume'
  | 'energy' | 'power' | 'pressure' | 'time' | 'frequency' | 'angle'
  | 'cooking' | 'blood-sugar' | 'fuel-efficiency';

export type UnitDef = { key: string; label: string };

type LinearMap = Record<string, number>; // factor to base unit

// Note: linear categories handled via maps; temperature/cooking/blood-sugar/fuel-efficiency have special handling.

const lengthMap: LinearMap = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
  km: 1000,
  inch: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mile: 1609.344
};

const weightMap: LinearMap = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.45359237,
  oz: 0.028349523125
};

const speedMap: LinearMap = {
  'm/s': 1,
  'km/h': 1000/3600,
  mph: 1609.344/3600,
  knot: 1852/3600
};

const areaMap: LinearMap = {
  'm2': 1,
  'cm2': 0.0001,
  'mm2': 0.000001,
  'km2': 1_000_000,
  'ft2': 0.09290304,
  'in2': 0.00064516,
  acre: 4046.8564224,
  hectare: 10000
};

const volumeMap: LinearMap = {
  l: 1,
  ml: 0.001,
  'm3': 1000,
  'cm3': 0.001,
  gal: 3.785411784,
  'gal-uk': 4.54609,
  qt: 0.946352946,
  pt: 0.473176473,
  cup: 0.24, // metric cup
  floz: 0.0295735295625
};

const energyMap: LinearMap = {
  J: 1,
  kJ: 1000,
  cal: 4.184,
  kcal: 4184,
  Wh: 3600,
  kWh: 3_600_000
};

const powerMap: LinearMap = {
  W: 1,
  kW: 1000,
  MW: 1_000_000,
  hp: 745.6998715822702
};

const pressureMap: LinearMap = {
  Pa: 1,
  kPa: 1000,
  bar: 100000,
  atm: 101325,
  psi: 6894.757293168
};

const timeMap: LinearMap = {
  s: 1,
  ms: 0.001,
  min: 60,
  h: 3600,
  day: 86400
};

const frequencyMap: LinearMap = {
  Hz: 1,
  kHz: 1000,
  MHz: 1_000_000,
  GHz: 1_000_000_000
};

const angleMap: LinearMap = {
  deg: 1,
  rad: 180/Math.PI,
  grad: 0.9
};

export function getUnits(category: ConverterCategory): UnitDef[] {
  switch (category) {
    case 'length': return [
      { key: 'm', label: 'meter (m)' }, { key: 'cm', label: 'centimeter (cm)' }, { key: 'mm', label: 'millimeter (mm)' }, { key: 'km', label: 'kilometer (km)' },
      { key: 'inch', label: 'inch (in)' }, { key: 'ft', label: 'foot (ft)' }, { key: 'yd', label: 'yard (yd)' }, { key: 'mile', label: 'mile (mi)' }
    ];
    case 'weight': return [
      { key: 'kg', label: 'kilogram (kg)' }, { key: 'g', label: 'gram (g)' }, { key: 'mg', label: 'milligram (mg)' }, { key: 'lb', label: 'pound (lb)' }, { key: 'oz', label: 'ounce (oz)' }
    ];
    case 'speed': return [ { key: 'm/s', label: 'meter/second' }, { key: 'km/h', label: 'km/hour' }, { key: 'mph', label: 'mile/hour' }, { key: 'knot', label: 'knot' } ];
    case 'area': return [ { key: 'm2', label: 'square meter' }, { key: 'cm2', label: 'square centimeter' }, { key: 'mm2', label: 'square millimeter' }, { key: 'km2', label: 'square kilometer' }, { key: 'ft2', label: 'square foot' }, { key: 'in2', label: 'square inch' }, { key: 'acre', label: 'acre' }, { key: 'hectare', label: 'hectare' } ];
    case 'volume': return [ { key: 'l', label: 'liter (L)' }, { key: 'ml', label: 'milliliter (mL)' }, { key: 'm3', label: 'cubic meter' }, { key: 'cm3', label: 'cubic centimeter' }, { key: 'gal', label: 'gallon (US)' }, { key: 'gal-uk', label: 'gallon (UK)' }, { key: 'qt', label: 'quart' }, { key: 'pt', label: 'pint' }, { key: 'cup', label: 'cup' }, { key: 'floz', label: 'fluid ounce (US)' } ];
    case 'energy': return [ { key: 'J', label: 'joule (J)' }, { key: 'kJ', label: 'kilojoule (kJ)' }, { key: 'cal', label: 'calorie (cal)' }, { key: 'kcal', label: 'kilocalorie (kcal)' }, { key: 'Wh', label: 'watt-hour (Wh)' }, { key: 'kWh', label: 'kilowatt-hour (kWh)' } ];
    case 'power': return [ { key: 'W', label: 'watt (W)' }, { key: 'kW', label: 'kilowatt (kW)' }, { key: 'MW', label: 'megawatt (MW)' }, { key: 'hp', label: 'horsepower (hp)' } ];
    case 'pressure': return [ { key: 'Pa', label: 'pascal (Pa)' }, { key: 'kPa', label: 'kilopascal (kPa)' }, { key: 'bar', label: 'bar' }, { key: 'atm', label: 'atmosphere (atm)' }, { key: 'psi', label: 'psi' } ];
    case 'time': return [ { key: 'ms', label: 'millisecond (ms)' }, { key: 's', label: 'second (s)' }, { key: 'min', label: 'minute (min)' }, { key: 'h', label: 'hour (h)' }, { key: 'day', label: 'day' } ];
    case 'frequency': return [ { key: 'Hz', label: 'hertz (Hz)' }, { key: 'kHz', label: 'kilohertz (kHz)' }, { key: 'MHz', label: 'megahertz (MHz)' }, { key: 'GHz', label: 'gigahertz (GHz)' } ];
    case 'angle': return [ { key: 'deg', label: 'degree (°)' }, { key: 'rad', label: 'radian (rad)' }, { key: 'grad', label: 'gradian (gon)' } ];
    case 'temperature': return [ { key: 'C', label: 'Celsius (°C)' }, { key: 'F', label: 'Fahrenheit (°F)' }, { key: 'K', label: 'Kelvin (K)' } ];
    case 'cooking': return [ { key: 'tsp', label: 'teaspoon' }, { key: 'tbsp', label: 'tablespoon' }, { key: 'cup', label: 'cup' }, { key: 'ml', label: 'milliliter' }, { key: 'l', label: 'liter' } ];
    case 'blood-sugar': return [ { key: 'mgdl', label: 'mg/dL' }, { key: 'mmoll', label: 'mmol/L' } ];
    case 'fuel-efficiency': return [ { key: 'l/100km', label: 'L/100km' }, { key: 'mpg-us', label: 'mpg (US)' }, { key: 'kmpl', label: 'km/L' } ];
  }
}

function linearConvert(value: number, from: string, to: string, map: LinearMap): number {
  const base = value * map[from];
  return base / map[to];
}

export function convert(category: ConverterCategory, value: number, from: string, to: string): number {
  if (Number.isNaN(value)) return 0;
  switch (category) {
    case 'length': return linearConvert(value, from, to, lengthMap);
    case 'weight': return linearConvert(value, from, to, weightMap);
    case 'speed': return linearConvert(value, from, to, speedMap);
    case 'area': return linearConvert(value, from, to, areaMap);
    case 'volume': return linearConvert(value, from, to, volumeMap);
    case 'energy': return linearConvert(value, from, to, energyMap);
    case 'power': return linearConvert(value, from, to, powerMap);
    case 'pressure': return linearConvert(value, from, to, pressureMap);
    case 'time': return linearConvert(value, from, to, timeMap);
    case 'frequency': return linearConvert(value, from, to, frequencyMap);
    case 'angle': return linearConvert(value, from, to, angleMap);
    case 'temperature': {
      // Convert to Celsius first
      let c = value;
      if (from === 'F') c = (value - 32) * 5/9;
      else if (from === 'K') c = value - 273.15;
      // Celsius to target
      if (to === 'F') return c * 9/5 + 32;
      if (to === 'K') return c + 273.15;
      return c;
    }
    case 'cooking': {
      // Simple volume-focused conversions; 1 tbsp = 3 tsp; 1 cup = 16 tbsp; 1 tsp = 4.92892159375 mL
      const map: LinearMap = {
        tsp: 4.92892159375,
        tbsp: 14.78676478125,
        cup: 236.5882365,
        ml: 1,
        l: 1000
      };
      return linearConvert(value, from, to, map);
    }
    case 'blood-sugar': {
      // 1 mmol/L glucose ≈ 18 mg/dL
      if (from === 'mgdl' && to === 'mmoll') return value / 18;
      if (from === 'mmoll' && to === 'mgdl') return value * 18;
      return value;
    }
    case 'fuel-efficiency': {
      // base as km/L; L/100km -> km/L: 100 / L/100km; mpg (US) -> km/L: mpg * 1.609344 / 3.785411784
      let kmpl = value;
      if (from === 'l/100km') kmpl = value === 0 ? 0 : 100 / value;
      else if (from === 'mpg-us') kmpl = value * 1.609344 / 3.785411784;
      // convert km/L to target
      if (to === 'l/100km') return kmpl === 0 ? 0 : 100 / kmpl;
      if (to === 'mpg-us') return kmpl * 3.785411784 / 1.609344;
      return kmpl;
    }
  }
  return value;
}

