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
