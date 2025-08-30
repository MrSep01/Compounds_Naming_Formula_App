export const cations=[
  {symbol:'H+', core:'H', name:'hydrogen',charge:+1,poly:false},
  {symbol:'Na+',core:'Na',name:'sodium',charge:+1,poly:false},
  {symbol:'K+', core:'K', name:'potassium',charge:+1,poly:false},
  {symbol:'Mg2+',core:'Mg',name:'magnesium',charge:+2,poly:false},
  {symbol:'Ca2+',core:'Ca',name:'calcium',charge:+2,poly:false},
  {symbol:'Al3+',core:'Al',name:'aluminium',charge:+3,poly:false},
  {symbol:'NH4+',core:'NH4',name:'ammonium',charge:+1,poly:true},
  {symbol:'Fe2+',core:'Fe',name:'iron',charge:+2,poly:false,multiple:true,alwaysRoman:true},
  {symbol:'Fe3+',core:'Fe',name:'iron',charge:+3,poly:false,multiple:true,alwaysRoman:true},
  {symbol:'Cu+', core:'Cu',name:'copper',charge:+1,poly:false,multiple:true,alwaysRoman:true},
  {symbol:'Cu2+',core:'Cu',name:'copper',charge:+2,poly:false,multiple:true,alwaysRoman:true},
  {symbol:'Sn2+',core:'Sn',name:'tin',charge:+2,poly:false,multiple:true,alwaysRoman:true},
  {symbol:'Sn4+',core:'Sn',name:'tin',charge:+4,poly:false,multiple:true,alwaysRoman:true},
  {symbol:'Pb2+',core:'Pb',name:'lead',charge:+2,poly:false,multiple:true,alwaysRoman:true},
  {symbol:'Pb4+',core:'Pb',name:'lead',charge:+4,poly:false,multiple:true,alwaysRoman:true},
  {symbol:'Ag+', core:'Ag',name:'silver',charge:+1,poly:false},
  {symbol:'Zn2+',core:'Zn',name:'zinc',charge:+2,poly:false},
]

export const anions=[
  {symbol:'F-', core:'F',  name:'fluoride',charge:-1,poly:false},
  {symbol:'Cl-',core:'Cl', name:'chloride',charge:-1,poly:false},
  {symbol:'Br-',core:'Br', name:'bromide',charge:-1,poly:false},
  {symbol:'I-', core:'I',  name:'iodide',charge:-1,poly:false},
  {symbol:'O2-',core:'O',  name:'oxide',charge:-2,poly:false},
  {symbol:'S2-',core:'S',  name:'sulfide',charge:-2,poly:false},
  {symbol:'N3-',core:'N',  name:'nitride',charge:-3,poly:false},
  {symbol:'OH-', core:'OH', name:'hydroxide',charge:-1,poly:true},
  {symbol:'NO3-',core:'NO3',name:'nitrate',charge:-1,poly:true},
  {symbol:'NO2-',core:'NO2',name:'nitrite',charge:-1,poly:true},
  {symbol:'SO4 2-',core:'SO4',name:'sulfate',charge:-2,poly:true},
  {symbol:'SO3 2-',core:'SO3',name:'sulfite',charge:-2,poly:true},
  {symbol:'CO3 2-',core:'CO3',name:'carbonate',charge:-2,poly:true},
  {symbol:'HCO3-',core:'HCO3',name:'hydrogencarbonate',charge:-1,poly:true},
  {symbol:'PO4 3-',core:'PO4',name:'phosphate',charge:-3,poly:true},
  {symbol:'CN-', core:'CN', name:'cyanide',charge:-1,poly:true},
  {symbol:'CH3COO-',core:'CH3COO',name:'ethanoate',charge:-1,poly:true},
]

// New: Acids data
export const acids = [
  // Binary acids (H + non-metal)
  {formula: 'HCl', name: 'hydrochloric acid', type: 'binary', elements: ['H', 'Cl'], state: 'aq'},
  {formula: 'HBr', name: 'hydrobromic acid', type: 'binary', elements: ['H', 'Br'], state: 'aq'},
  {formula: 'HI', name: 'hydroiodic acid', type: 'binary', elements: ['H', 'I'], state: 'aq'},
  {formula: 'HF', name: 'hydrofluoric acid', type: 'binary', elements: ['H', 'F'], state: 'aq'},
  {formula: 'H2S', name: 'hydrosulfuric acid', type: 'binary', elements: ['H', 'S'], state: 'aq'},
  
  // Oxyacids (H + polyatomic with oxygen)
  {formula: 'HNO3', name: 'nitric acid', type: 'oxyacid', elements: ['H', 'NO3'], pattern: 'ate→ic', state: 'aq'},
  {formula: 'HNO2', name: 'nitrous acid', type: 'oxyacid', elements: ['H', 'NO2'], pattern: 'ite→ous', state: 'aq'},
  {formula: 'H2SO4', name: 'sulfuric acid', type: 'oxyacid', elements: ['H', 'SO4'], pattern: 'ate→ic', state: 'aq'},
  {formula: 'H2SO3', name: 'sulfurous acid', type: 'oxyacid', elements: ['H', 'SO3'], pattern: 'ite→ous', state: 'aq'},
  {formula: 'H3PO4', name: 'phosphoric acid', type: 'oxyacid', elements: ['H', 'PO4'], pattern: 'ate→ic', state: 'aq'},
  {formula: 'H3PO3', name: 'phosphorous acid', type: 'oxyacid', elements: ['H', 'PO3'], pattern: 'ite→ous', state: 'aq'},
  {formula: 'HClO4', name: 'perchloric acid', type: 'oxyacid', elements: ['H', 'ClO4'], pattern: 'per...ate→per...ic', state: 'aq'},
  {formula: 'HClO3', name: 'chloric acid', type: 'oxyacid', elements: ['H', 'ClO3'], pattern: 'ate→ic', state: 'aq'},
  {formula: 'HClO2', name: 'chlorous acid', type: 'oxyacid', elements: ['H', 'ClO2'], pattern: 'ite→ous', state: 'aq'},
  {formula: 'HClO', name: 'hypochlorous acid', type: 'oxyacid', elements: ['H', 'ClO'], pattern: 'hypo...ite→hypo...ous', state: 'aq'},
  {formula: 'H2CO3', name: 'carbonic acid', type: 'oxyacid', elements: ['H', 'CO3'], pattern: 'ate→ic', state: 'aq'},
  {formula: 'H2CrO4', name: 'chromic acid', type: 'oxyacid', elements: ['H', 'CrO4'], pattern: 'ate→ic', state: 'aq'},
  {formula: 'H2Cr2O7', name: 'dichromic acid', type: 'oxyacid', elements: ['H', 'Cr2O7'], pattern: 'ate→ic', state: 'aq'},
]

// New: Molecular compounds (gaseous/liquid forms)
export const molecularCompounds = [
  {
    formula: 'HCl',
    name: 'hydrogen chloride',
    type: 'molecular',
    elements: ['H', 'Cl'],
    state: 'g',
    acidForm: 'hydrochloric acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'HBr',
    name: 'hydrogen bromide',
    type: 'molecular',
    elements: ['H', 'Br'],
    state: 'g',
    acidForm: 'hydrobromic acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'HI',
    name: 'hydrogen iodide',
    type: 'molecular',
    elements: ['H', 'I'],
    state: 'g',
    acidForm: 'hydroiodic acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'HF',
    name: 'hydrogen fluoride',
    type: 'molecular',
    elements: ['H', 'F'],
    state: 'g',
    acidForm: 'hydrofluoric acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'H2S',
    name: 'hydrogen sulfide',
    type: 'molecular',
    elements: ['H', 'S'],
    state: 'g',
    acidForm: 'hydrosulfuric acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'NH3',
    name: 'ammonia',
    type: 'molecular',
    elements: ['N', 'H'],
    state: 'g',
    baseForm: 'ammonium hydroxide',
    baseState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'CO2',
    name: 'carbon dioxide',
    type: 'molecular',
    elements: ['C', 'O'],
    state: 'g',
    acidForm: 'carbonic acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'SO2',
    name: 'sulfur dioxide',
    type: 'molecular',
    elements: ['S', 'O'],
    state: 'g',
    acidForm: 'sulfurous acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'SO3',
    name: 'sulfur trioxide',
    type: 'molecular',
    elements: ['S', 'O'],
    state: 'g',
    acidForm: 'sulfuric acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'NO2',
    name: 'nitrogen dioxide',
    type: 'molecular',
    elements: ['N', 'O'],
    state: 'g',
    acidForm: 'nitrous acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'N2O3',
    name: 'dinitrogen trioxide',
    type: 'molecular',
    elements: ['N', 'O'],
    state: 'g',
    acidForm: 'nitrous acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  },
  {
    formula: 'N2O5',
    name: 'dinitrogen pentoxide',
    type: 'molecular',
    elements: ['N', 'O'],
    state: 'g',
    acidForm: 'nitric acid',
    acidState: 'aq',
    description: 'Covalent gas molecule'
  }
]

// New: Bases data
export const bases = [
  {formula: 'NaOH', name: 'sodium hydroxide', type: 'metal hydroxide', elements: ['Na', 'OH'], state: 'aq'},
  {formula: 'KOH', name: 'potassium hydroxide', type: 'metal hydroxide', elements: ['K', 'OH'], state: 'aq'},
  {formula: 'Ca(OH)2', name: 'calcium hydroxide', type: 'metal hydroxide', elements: ['Ca', 'OH'], state: 'aq'},
  {formula: 'Mg(OH)2', name: 'magnesium hydroxide', type: 'metal hydroxide', elements: ['Mg', 'OH'], state: 'aq'},
  {formula: 'Al(OH)3', name: 'aluminium hydroxide', type: 'metal hydroxide', elements: ['Al', 'OH'], state: 'aq'},
  {formula: 'Fe(OH)2', name: 'iron(II) hydroxide', type: 'metal hydroxide', elements: ['Fe', 'OH'], multiple: true, state: 'aq'},
  {formula: 'Fe(OH)3', name: 'iron(III) hydroxide', type: 'metal hydroxide', elements: ['Fe', 'OH'], multiple: true, state: 'aq'},
  {formula: 'Cu(OH)2', name: 'copper(II) hydroxide', type: 'metal hydroxide', elements: ['Cu', 'OH'], multiple: true, state: 'aq'},
  {formula: 'NH4OH', name: 'ammonium hydroxide', type: 'ammonia solution', elements: ['NH4', 'OH'], state: 'aq'},
]

// New: Comprehensive ion comparison data
export const ionComparison = [
  {
    element: 'Sulfur',
    symbol: 'S',
    elemental: { symbol: 'S²⁻', name: 'sulfide', charge: -2, type: 'elemental' },
    polyatomic: [
      { symbol: 'SO₄²⁻', name: 'sulfate', charge: -2, type: 'polyatomic', oxygen: 4, pattern: 'more oxygen' },
      { symbol: 'SO₃²⁻', name: 'sulfite', charge: -2, type: 'polyatomic', oxygen: 3, pattern: 'less oxygen' },
      { symbol: 'S₂O₃²⁻', name: 'thiosulfate', charge: -2, type: 'polyatomic', oxygen: 3, pattern: 'thio- prefix' }
    ]
  },
  {
    element: 'Chlorine',
    symbol: 'Cl',
    elemental: { symbol: 'Cl⁻', name: 'chloride', charge: -1, type: 'elemental' },
    polyatomic: [
      { symbol: 'ClO₄⁻', name: 'perchlorate', charge: -1, type: 'polyatomic', oxygen: 4, pattern: 'per...ate (most oxygen)' },
      { symbol: 'ClO₃⁻', name: 'chlorate', charge: -1, type: 'polyatomic', oxygen: 3, pattern: 'ate (more oxygen)' },
      { symbol: 'ClO₂⁻', name: 'chlorite', charge: -1, type: 'polyatomic', oxygen: 2, pattern: 'ite (less oxygen)' },
      { symbol: 'ClO⁻', name: 'hypochlorite', charge: -1, type: 'polyatomic', oxygen: 1, pattern: 'hypo...ite (least oxygen)' }
    ]
  },
  {
    element: 'Nitrogen',
    symbol: 'N',
    elemental: { symbol: 'N³⁻', name: 'nitride', charge: -3, type: 'elemental' },
    polyatomic: [
      { symbol: 'NO₃⁻', name: 'nitrate', charge: -1, type: 'polyatomic', oxygen: 3, pattern: 'ate (more oxygen)' },
      { symbol: 'NO₂⁻', name: 'nitrite', charge: -1, type: 'polyatomic', oxygen: 2, pattern: 'ite (less oxygen)' }
    ]
  },
  {
    element: 'Carbon',
    symbol: 'C',
    elemental: { symbol: 'C⁴⁻', name: 'carbide', charge: -4, type: 'elemental' },
    polyatomic: [
      { symbol: 'CO₃²⁻', name: 'carbonate', charge: -2, type: 'polyatomic', oxygen: 3, pattern: 'ate (more oxygen)' },
      { symbol: 'CO₂²⁻', name: 'carbonite', charge: -2, type: 'polyatomic', oxygen: 2, pattern: 'ite (less oxygen)' },
      { symbol: 'HCO₃⁻', name: 'hydrogencarbonate', charge: -1, type: 'polyatomic', oxygen: 3, pattern: 'hydrogen + ate' }
    ]
  },
  {
    element: 'Phosphorus',
    symbol: 'P',
    elemental: { symbol: 'P³⁻', name: 'phosphide', charge: -3, type: 'elemental' },
    polyatomic: [
      { symbol: 'PO₄³⁻', name: 'phosphate', charge: -3, type: 'polyatomic', oxygen: 4, pattern: 'ate (more oxygen)' },
      { symbol: 'PO₃³⁻', name: 'phosphite', charge: -3, type: 'polyatomic', oxygen: 3, pattern: 'ite (less oxygen)' },
      { symbol: 'HPO₄²⁻', name: 'hydrogenphosphate', charge: -2, type: 'polyatomic', oxygen: 4, pattern: 'hydrogen + ate' }
    ]
  },
  {
    element: 'Chromium',
    symbol: 'Cr',
    elemental: { symbol: 'Cr²⁻', name: 'chromide', charge: -2, type: 'elemental' },
    polyatomic: [
      { symbol: 'CrO₄²⁻', name: 'chromate', charge: -2, type: 'polyatomic', oxygen: 4, pattern: 'ate (more oxygen)' },
      { symbol: 'Cr₂O₇²⁻', name: 'dichromate', charge: -2, type: 'polyatomic', oxygen: 7, pattern: 'di- prefix + ate' }
    ]
  }
]

// New: State symbols and their meanings
export const stateSymbols = [
  { symbol: '(g)', name: 'gas', description: 'Gaseous state at room temperature' },
  { symbol: '(l)', name: 'liquid', description: 'Liquid state at room temperature' },
  { symbol: '(s)', name: 'solid', description: 'Solid state at room temperature' },
  { symbol: '(aq)', name: 'aqueous', description: 'Dissolved in water (solution)' },
  { symbol: '(cr)', name: 'crystalline', description: 'Crystalline solid form' },
  { symbol: '(am)', name: 'amorphous', description: 'Amorphous solid form' }
]

// New: Compound vs Solution naming patterns
export const namingPatterns = [
  {
    category: 'Binary Compounds',
    molecular: 'hydrogen + non-metal name',
    acid: 'hydro + non-metal root + ic acid',
    example: 'HCl(g) = hydrogen chloride, HCl(aq) = hydrochloric acid'
  },
  {
    category: 'Oxyacids',
    molecular: 'element + oxide (with prefixes)',
    acid: 'polyatomic root + ic/ous acid',
    example: 'SO3(g) = sulfur trioxide, H2SO4(aq) = sulfuric acid'
  },
  {
    category: 'Bases',
    molecular: 'ammonia (NH3)',
    base: 'ammonium hydroxide (NH4OH)',
    example: 'NH3(g) = ammonia, NH4OH(aq) = ammonium hydroxide'
  }
]

export const nonmetals=[
  {symbol:'H',name:'hydrogen'},
  {symbol:'C',name:'carbon'},
  {symbol:'N',name:'nitrogen'},
  {symbol:'O',name:'oxygen'},
  {symbol:'F',name:'fluorine'},
  {symbol:'P',name:'phosphorus'},
  {symbol:'S',name:'sulfur'},
  {symbol:'Cl',name:'chlorine'},
  {symbol:'Br',name:'bromine'},
  {symbol:'I',name:'iodine'},
]

export const prefixes={1:'mono',2:'di',3:'tri',4:'tetra',5:'penta',6:'hexa',7:'hepta',8:'octa',9:'nona',10:'deca'}
const rootMap={H:'hydr',C:'carb',N:'nitr',O:'ox',F:'fluor',P:'phosph',S:'sulf',Cl:'chlor',Br:'brom',I:'iod'}
export function elementRoot(sym){return rootMap[sym]||sym.toLowerCase()}
export function isTransitionMetal(sym){return ['Fe','Cu','Sn','Pb','Cr','Mn','Co','Ni','Hg'].includes(sym)}
export function aliasAccept(primary, parts){
  const formula = parts.map(p=>`${(p.core||p.symbol)}${p.count>1?p.count:''}`).join('')
  const f = formula.replace(/\s+/g,'')
  const aliases=[]
  if(f==='H2O'){aliases.push('water','dihydrogen monoxide')}
  if(f==='NH3'){aliases.push('ammonia','nitrogen trihydride')}
  if(f==='NO'){aliases.push('nitrogen monoxide')}
  if(f==='N2O'){aliases.push('dinitrogen monoxide')}
  return aliases
}

// New: Acid naming helper functions
export function nameBinaryAcid(nonmetal) {
  const root = elementRoot(nonmetal)
  return `hydro${root}ic acid`
}

export function nameOxyacid(polyatomic, hasMoreOxygen = true) {
  if (hasMoreOxygen) {
    // -ate → -ic
    return polyatomic.replace(/ate$/, 'ic acid')
  } else {
    // -ite → -ous
    return polyatomic.replace(/ite$/, 'ous acid')
  }
}

// New: Base naming helper function
export function nameBase(metal, hydroxideCount = 1) {
  if (hydroxideCount === 1) {
    return `${metal} hydroxide`
  } else {
    return `${metal} hydroxide`
  }
}

// New: State-based naming helper
export function getCompoundName(formula, state) {
  if (state === 'aq') {
    // Aqueous state - use acid/base naming
    const acid = acids.find(a => a.formula === formula)
    if (acid) return acid.name
    
    const base = bases.find(b => b.formula === formula)
    if (base) return base.name
  } else {
    // Gaseous/solid state - use molecular naming
    const molecular = molecularCompounds.find(m => m.formula === formula)
    if (molecular) return molecular.name
  }
  return formula // fallback
}

// New: Compare molecular vs aqueous forms
export function compareForms(formula) {
  const molecular = molecularCompounds.find(m => m.formula === formula)
  if (!molecular) return null
  
  return {
    molecular: {
      formula: molecular.formula,
      name: molecular.name,
      state: molecular.state,
      description: molecular.description
    },
    aqueous: {
      formula: molecular.formula,
      name: molecular.acidForm || molecular.baseForm,
      state: molecular.acidState || molecular.baseState,
      description: molecular.acidForm ? 'Acidic solution' : 'Basic solution'
    }
  }
}
