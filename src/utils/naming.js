import { toRoman } from './roman.js'
import { cations, anions, nonmetals, prefixes, elementRoot, isTransitionMetal, aliasAccept } from './data.js'

export { cations, anions, nonmetals }

/* ---------------- Display helpers ---------------- */

// Turn digits into subscripts (e.g., SO4 -> SO<sub>4</sub>)
export function coreToHtml(core){
  return String(core).replace(/(\d+)/g, '<sub>$1</sub>')
}

// Ion token with superscript charge, e.g. Fe3+ -> Fe<sup>3+</sup>
export function ionTokenHtml(core, charge){
  const mag = Math.abs(charge)
  const sign = charge > 0 ? '+' : '−'
  const chargeStr = (mag===1 ? '' : String(mag)) + sign
  return coreToHtml(core) + '<sup>' + chargeStr + '</sup>'
}

// Build a neutral formula display (no charges) from parts
export function formatFormula(parts){
  // parts: [{symbol, core?, count, poly?}]
  return parts.map(p=>{
    // prefer p.core (e.g., "SO4", "NH4") else sanitize p.symbol
    let token = (p.core || p.symbol || '')
    // strip any trailing charge notation if it slipped in (e.g., "Na+", "SO4 2-")
    token = String(token).replace(/\s*[0-9]*[+−-]$/, '').replace(/\s+/g,'')
    if(p.poly && p.count>1){
      return `(${coreToHtml(token)})<sub>${p.count}</sub>`
    } else {
      const cnt = p.count>1 ? `<sub>${p.count}</sub>` : ''
      return `${coreToHtml(token)}${cnt}`
    }
  }).join('')
}

// Simple classroom heuristic for "common" covalent ratios
const commonCovalentSet = new Set([
  'H2O','NH3','CO','CO2','NO','NO2','N2O','N2O4','SO2','SO3','CH4','CCl4','OF2','SF6',
  'HF','HCl','HBr','HI','PCl3','PCl5','P4','S8','O2','N2','F2','Cl2','Br2','I2'
])
export function covalentLooksCommon(parts){
  // parts like [{symbol:'C', count:1},{symbol:'O',count:2}]
  const copy = parts.map(p=>({sym:p.symbol, n:Number(p.count||1)}))
  copy.sort((a,b)=>a.sym.localeCompare(b.sym))
  const formula = copy.map(p=>p.sym + (p.n>1?p.n:'' )).join('')
  return commonCovalentSet.has(formula)
}

/* ---------------- Core logic ---------------- */

export function classifyFromParts(parts){
  const ions = [...cations, ...anions].map(x=>x.symbol)
  const isIonic = parts.some(p=>ions.includes(p.symbol))
  return isIonic ? 'ionic' : 'covalent'
}

// Ionic naming
export function nameIonicFromParts(cat, an){
  const g = gcd(Math.abs(cat.charge), Math.abs(an.charge))
  const cCount = Math.abs(an.charge)/g
  const aCount = Math.abs(cat.charge)/g
  const ox = (aCount * Math.abs(an.charge)) / cCount
  const catName = transitionCationName(cat, ox)
  const anName = an.name // already correct English name
  return `${catName} ${anName}`
}

function transitionCationName(c, ox){
  if(!isTransitionMetal(c.symbol) && !c.alwaysRoman) return c.name
  if(!c.multiple && !c.alwaysRoman) return c.name
  return `${c.name}(${toRoman(ox)})`
}

// Covalent naming
export function nameCovalentFromParts(e1, n1, e2, n2){
  const p1 = (n1===1? '' : (prefixes[n1] || `${n1}-`))
  const p2raw = prefixes[n2] || `${n2}-`
  const root2 = elementRoot(e2.symbol) + 'ide'
  let p2 = p2raw
  if((p2raw.endsWith('a') || p2raw.endsWith('o')) && root2.startsWith('o')){
    p2 = p2raw.slice(0,-1)
  }
  const name1 = `${p1}${e1.name}`
  const name2 = `${p2}${root2}`
  const final1 = (n1===1 ? e1.name : name1)
  return `${final1} ${name2}`
}

/* ---------------- Challenge generation & checking ---------------- */

export function randomChallenge(){
  const ionic = Math.random()<0.7
  if(ionic){
    const cat = pick(cations.filter(c=>c.charge>0))
    const an  = pick(anions.filter(a=>a.charge<0))
    const g = gcd(Math.abs(cat.charge), Math.abs(an.charge))
    const cCount = Math.abs(an.charge)/g
    const aCount = Math.abs(cat.charge)/g
    const parts = [
      {symbol:cat.symbol, core:cat.core, count:cCount, poly:cat.poly},
      {symbol:an.symbol,  core:an.core,  count:aCount, poly:an.poly}
    ]
    const primary = nameIonicFromParts(cat, an)
    const accepted = aliasAccept(primary, parts)
    return { id: cryptoRandomId(), kind:'ionic', parts, primary, accepted }
  } else {
    const e1 = pick(nonmetals)
    let e2 = pick(nonmetals)
    let tries=0; while(e2.symbol===e1.symbol && tries++<5){ e2 = pick(nonmetals) }
    const n1 = 1 + Math.floor(Math.random()*3)
    const n2 = 1 + Math.floor(Math.random()*5)
    const parts = [{symbol:e1.symbol, count:n1},{symbol:e2.symbol, count:n2}]
    const primary = nameCovalentFromParts(e1,n1,e2,n2)
    const accepted = aliasAccept(primary, parts)
    return { id: cryptoRandomId(), kind:'covalent', parts, primary, accepted }
  }
}

export function checkAnswer(q, guessedType, guessedName){
  const okType = (guessedType||'').toLowerCase().trim() === q.kind.toLowerCase()
  const norm = normalizeName(guessedName)
  const primary = normalizeName(q.primary)
  const accepted = (q.accepted||[]).map(normalizeName)
  const okName = (norm === primary) || accepted.includes(norm)
  return { okType, okName, expectedPrimary: q.primary, accepted: q.accepted }
}

/* ---------------- Utilities ---------------- */

function gcd(a,b){ return b?gcd(b, a%b):a }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function normalizeName(s){ return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim() }
function cryptoRandomId(){ const a=crypto.getRandomValues(new Uint32Array(2)); return a[0].toString(36)+a[1].toString(36) }
