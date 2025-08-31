import React, { useMemo, useState } from 'react'
import { cations, anions, nonmetals, acids, bases, elementRoot } from '../utils/data.js'
import { formatFormula, nameIonicFromParts, nameCovalentFromParts, ionTokenHtml, covalentLooksCommon } from '../utils/naming.js'

// Helper function for greatest common divisor
function gcd(a, b) { return b ? gcd(b, a % b) : a }

export default function Builder() {
  const [mode, setMode] = useState('ionic') // 'ionic' | 'covalent' | 'acids' | 'bases'
  
  // Ionic selections
  const [cat, setCat] = useState('Na+')
  const [an, setAn] = useState('Cl-')
  
  // Covalent selections
  const [nm1, setNm1] = useState('C')
  const [n1, setN1] = useState(1)
  const [nm2, setNm2] = useState('O')
  const [n2, setN2] = useState(2)
  
  // Acids and bases selections
  const [acidType, setAcidType] = useState('binary') // 'binary' | 'oxyacid'
  const [acidElement, setAcidElement] = useState('Cl')
  const [acidPolyatomic, setAcidPolyatomic] = useState('NO3')
  const [baseMetal, setBaseMetal] = useState('Na')
  const [baseOHCount, setBaseOHCount] = useState(1)
  
  const ionicFormula = useMemo(() => {
    if (mode !== 'ionic') return ''
    const c = cations.find(x => x.symbol === cat)
    const a = anions.find(x => x.symbol === an)
    if (!c || !a) return ''
    const g = gcd(Math.abs(c.charge), Math.abs(a.charge))
    const cCount = Math.abs(a.charge) / g
    const aCount = Math.abs(c.charge) / g
    return formatFormula([
      { symbol: c.symbol, core: c.core, count: cCount, poly: c.poly },
      { symbol: a.symbol, core: a.core, count: aCount, poly: a.poly }
    ])
  }, [mode, cat, an])
  
  const ionicIonsHTML = useMemo(() => {
    if (mode !== 'ionic') return ''
    const c = cations.find(x => x.symbol === cat)
    const a = anions.find(x => x.symbol === an)
    if (!c || !a) return ''
    const g = gcd(Math.abs(c.charge), Math.abs(a.charge))
    const cCount = Math.abs(a.charge) / g
    const aCount = Math.abs(c.charge) / g
    const left = (cCount > 1 ? `<span>${cCount}</span> ` : '') + ionTokenHtml(c.core, c.charge)
    const right = (aCount > 1 ? `<span>${aCount}</span> ` : '') + ionTokenHtml(a.core, a.charge)
    return left + ' + ' + right
  }, [mode, cat, an])
  
  const covFormula = useMemo(() => {
    if (mode !== 'covalent') return ''
    return formatFormula([
      { symbol: nm1, count: Number(n1) },
      { symbol: nm2, count: Number(n2) }
    ])
  }, [mode, nm1, n1, nm2, n2])
  
  const covalentUncommon = useMemo(() => {
    if (mode !== 'covalent') return false
    return !covalentLooksCommon([
      { symbol: nm1, count: Number(n1) },
      { symbol: nm2, count: Number(n2) }
    ])
  }, [mode, nm1, n1, nm2, n2])
  
  // Acid formula and name
  const acidFormula = useMemo(() => {
    if (mode !== 'acids') return ''
    if (acidType === 'binary') {
      return `H${acidElement}`
    } else {
      // For oxyacids, we need to determine the number of H atoms based on the polyatomic charge
      const anion = anions.find(a => a.core === acidPolyatomic)
      if (!anion) return ''
      const hCount = Math.abs(anion.charge)
      return `H${hCount > 1 ? hCount : ''}${acidPolyatomic}`
    }
  }, [mode, acidType, acidElement, acidPolyatomic])
  
  const acidName = useMemo(() => {
    if (mode !== 'acids') return ''
    if (acidType === 'binary') {
      const element = nonmetals.find(n => n.symbol === acidElement)
      if (!element) return ''
      return `hydro${elementRoot(element.symbol)}ic acid`
    } else {
      // For oxyacids, we need to find the corresponding acid in our data
      const acid = acids.find(a => a.formula === acidFormula)
      return acid ? acid.name : 'Unknown acid'
    }
  }, [mode, acidType, acidElement, acidPolyatomic, acidFormula])
  
  // Base formula and name
  const baseFormula = useMemo(() => {
    if (mode !== 'bases') return ''
    const metal = cations.find(c => c.symbol === baseMetal)
    if (!metal) return ''
    if (baseOHCount > 1) {
      return `${metal.core}(${baseOHCount})OH`
    }
    return `${metal.core}OH`
  }, [mode, baseMetal, baseOHCount])
  
  const baseName = useMemo(() => {
    if (mode !== 'bases') return ''
    const metal = cations.find(c => c.symbol === baseMetal)
    if (!metal) return ''
    if (baseMetal === 'NH4+') {
      return 'ammonium hydroxide'
    }
    return `${metal.name} hydroxide`
  }, [mode, baseMetal])
  
  const nameResult = useMemo(() => {
    if (mode === 'ionic') {
      const c = cations.find(x => x.symbol === cat)
      const a = anions.find(x => x.symbol === an)
      if (!c || !a) return ''
      return nameIonicFromParts(c, a)
    } else if (mode === 'covalent') {
      const e1 = nonmetals.find(x => x.symbol === nm1)
      const e2 = nonmetals.find(x => x.symbol === nm2)
      if (!e1 || !e2) return ''
      return nameCovalentFromParts(e1, Number(n1), e2, Number(n2))
    } else if (mode === 'acids') {
      return acidName
    } else if (mode === 'bases') {
      return baseName
    }
    return ''
  }, [mode, cat, an, nm1, n1, nm2, n2, acidName, baseName])
  
  return (
    <div className="card">
      <div className="section-title">Sandbox Builder</div>
      <div className="headerband">
        Build compounds step by step and see how naming works. 
        Switch between Ionic and Covalent modes to explore different compound types.
      </div>
      
      <div className="row" style={{ marginBottom: 16 }}>
        <button 
          className={mode === 'ionic' ? 'active' : 'secondary'} 
          onClick={() => setMode('ionic')}
          aria-pressed={mode === 'ionic'}
        >
          Ionic Compounds
        </button>
        <button 
          className={mode === 'covalent' ? 'active' : 'secondary'} 
          onClick={() => setMode('covalent')}
          aria-pressed={mode === 'covalent'}
        >
          Covalent Compounds
        </button>
        <button 
          className={mode === 'acids' ? 'active' : 'secondary'} 
          onClick={() => setMode('acids')}
          aria-pressed={mode === 'acids'}
        >
          Acids
        </button>
        <button 
          className={mode === 'bases' ? 'active' : 'secondary'} 
          onClick={() => setMode('bases')}
          aria-pressed={mode === 'bases'}
        >
          Bases
        </button>
      </div>
      
      {mode === 'ionic' && (
        <>
          <div className="row">
            <div>
              <label htmlFor="cation-select" className="section-title">Cation (Positive Ion)</label>
              <select 
                id="cation-select"
                value={cat} 
                onChange={e => setCat(e.target.value)}
                aria-describedby="cation-help"
              >
                {cations.map(x => (
                  <option key={x.symbol} value={x.symbol}>
                    {x.symbol} — {x.name}
                  </option>
                ))}
              </select>
              <div id="cation-help" className="help-text">
                Select a positively charged ion
              </div>
            </div>
            <div>
              <label htmlFor="anion-select" className="section-title">Anion (Negative Ion)</label>
              <select 
                id="anion-select"
                value={an} 
                onChange={e => setAn(e.target.value)}
                aria-describedby="anion-help"
              >
                {anions.map(x => (
                  <option key={x.symbol} value={x.symbol}>
                    {x.symbol} — {x.name}
                  </option>
                ))}
              </select>
              <div id="anion-help" className="help-text">
                Select a negatively charged ion
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: 16 }}>
            <span className="section-title">Ions (with charges)</span>
            <div 
              className="formula" 
              dangerouslySetInnerHTML={{ __html: ionicIonsHTML }}
              aria-label={`Ionic components: ${ionicIonsHTML.replace(/<[^>]*>/g, '')}`}
            />
          </div>
          
          <div style={{ marginTop: 16 }}>
            <span className="section-title">Formula Unit (neutral)</span>
            <div 
              className="formula" 
              dangerouslySetInnerHTML={{ __html: ionicFormula }}
              aria-label={`Chemical formula: ${ionicFormula.replace(/<[^>]*>/g, '')}`}
            />
          </div>
          
          <div style={{ marginTop: 12 }}>
            <span className="section-title">Systematic Name</span>
            <div className="feedback feedback-info">{nameResult}</div>
          </div>
        </>
      )}
      
      {mode === 'covalent' && (
        <>
          <div className="row">
            <div>
              <label htmlFor="element1-select" className="section-title">Element 1</label>
              <select 
                id="element1-select"
                value={nm1} 
                onChange={e => setNm1(e.target.value)}
              >
                {nonmetals.map(x => (
                  <option key={x.symbol} value={x.symbol}>
                    {x.symbol} — {x.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="count1-input" className="section-title">Count</label>
              <input 
                id="count1-input"
                type="number" 
                min="1" 
                max="10" 
                value={n1} 
                onChange={e => setN1(e.target.value)}
              />
            </div>
          </div>
          
          <div className="row">
            <div>
              <label htmlFor="element2-select" className="section-title">Element 2</label>
              <select 
                id="element2-select"
                value={nm2} 
                onChange={e => setNm2(e.target.value)}
              >
                {nonmetals.map(x => (
                  <option key={x.symbol} value={x.symbol}>
                    {x.symbol} — {x.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="count2-input" className="section-title">Count</label>
              <input 
                id="count2-input"
                type="number" 
                min="1" 
                max="10" 
                value={n2} 
                onChange={e => setN2(e.target.value)}
              />
            </div>
          </div>
          
          <div style={{ marginTop: 16 }}>
            <span className="section-title">Molecular Formula</span>
            <div 
              className="formula" 
              dangerouslySetInnerHTML={{ __html: covFormula }}
              aria-label={`Chemical formula: ${covFormula.replace(/<[^>]*>/g, '')}`}
            />
          </div>
          
          {covalentUncommon && (
            <div className="callout" style={{ marginTop: 12 }}>
              <strong>Note:</strong> This compound uses systematic naming (Greek prefixes) 
              rather than common names.
            </div>
          )}
          
          <div style={{ marginTop: 12 }}>
            <span className="section-title">Systematic Name</span>
            <div className="feedback feedback-info">{nameResult}</div>
          </div>
        </>
      )}
      
      {mode === 'acids' && (
        <>
          <div className="row" style={{ marginBottom: 16 }}>
            <button 
              className={acidType === 'binary' ? 'active' : 'secondary'} 
              onClick={() => setAcidType('binary')}
              aria-pressed={acidType === 'binary'}
            >
              Binary Acids (H + Non-metal)
            </button>
            <button 
              className={acidType === 'oxyacid' ? 'active' : 'secondary'} 
              onClick={() => setAcidType('oxyacid')}
              aria-pressed={acidType === 'oxyacid'}
            >
              Oxyacids (H + Polyatomic)
            </button>
          </div>
          
          {acidType === 'binary' && (
            <div className="row">
              <div>
                <label htmlFor="acid-element-select" className="section-title">Non-metal Element</label>
                <select 
                  id="acid-element-select"
                  value={acidElement} 
                  onChange={e => setAcidElement(e.target.value)}
                >
                  {nonmetals.filter(n => ['F', 'Cl', 'Br', 'I', 'S'].includes(n.symbol)).map(x => (
                    <option key={x.symbol} value={x.symbol}>
                      {x.symbol} — {x.name}
                    </option>
                  ))}
                </select>
                <div className="help-text">
                  Select a non-metal that can form binary acids
                </div>
              </div>
            </div>
          )}
          
          {acidType === 'oxyacid' && (
            <div className="row">
              <div>
                <label htmlFor="acid-polyatomic-select" className="section-title">Polyatomic Ion</label>
                <select 
                  id="acid-polyatomic-select"
                  value={acidPolyatomic} 
                  onChange={e => setAcidPolyatomic(e.target.value)}
                >
                  {anions.filter(a => a.poly && ['NO3', 'NO2', 'SO4', 'SO3', 'CO3', 'PO4', 'ClO4', 'ClO3', 'ClO2', 'ClO'].includes(a.core)).map(x => (
                    <option key={x.core} value={x.core}>
                      {x.core} — {x.name}
                    </option>
                  ))}
                </select>
                <div className="help-text">
                  Select a polyatomic ion with oxygen
                </div>
              </div>
            </div>
          )}
          
          <div style={{ marginTop: 16 }}>
            <span className="section-title">Acid Formula</span>
            <div 
              className="formula" 
              dangerouslySetInnerHTML={{ __html: acidFormula }}
              aria-label={`Acid formula: ${acidFormula}`}
            />
          </div>
          
          <div style={{ marginTop: 12 }}>
            <span className="section-title">Acid Name</span>
            <div className="feedback feedback-info">{acidName}</div>
          </div>
          
          <div style={{ marginTop: 12 }}>
            <span className="section-title">State</span>
            <div className="feedback feedback-info">(aq) - Aqueous solution</div>
          </div>
        </>
      )}
      
      {mode === 'bases' && (
        <>
          <div className="row">
            <div>
              <label htmlFor="base-metal-select" className="section-title">Metal Cation</label>
              <select 
                id="base-metal-select"
                value={baseMetal} 
                onChange={e => setBaseMetal(e.target.value)}
              >
                {cations.filter(c => ['Na+', 'K+', 'Ca2+', 'Mg2+', 'Al3+', 'Fe2+', 'Fe3+', 'Cu2+', 'NH4+'].includes(c.symbol)).map(x => (
                  <option key={x.symbol} value={x.symbol}>
                    {x.symbol} — {x.name}
                  </option>
                ))}
              </select>
              <div className="help-text">
                Select a metal cation that can form hydroxides
              </div>
            </div>
            <div>
              <label htmlFor="base-oh-count" className="section-title">OH Groups</label>
              <input 
                id="base-oh-count"
                type="number" 
                min="1" 
                max="3" 
                value={baseOHCount} 
                onChange={e => setBaseOHCount(Number(e.target.value))}
              />
              <div className="help-text">
                Number of hydroxide groups (usually matches metal charge)
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: 16 }}>
            <span className="section-title">Base Formula</span>
            <div 
              className="formula" 
              dangerouslySetInnerHTML={{ __html: baseFormula }}
              aria-label={`Base formula: ${baseFormula}`}
            />
          </div>
          
          <div style={{ marginTop: 12 }}>
            <span className="section-title">Base Name</span>
            <div className="feedback feedback-info">{baseName}</div>
          </div>
          
          <div style={{ marginTop: 12 }}>
            <span className="section-title">State</span>
            <div className="feedback feedback-info">(aq) - Aqueous solution</div>
          </div>
        </>
      )}
    </div>
  )
}

