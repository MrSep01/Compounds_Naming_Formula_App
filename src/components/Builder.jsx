import React, { useMemo, useState } from 'react'
import { cations, anions, nonmetals, formatFormula, nameIonicFromParts, nameCovalentFromParts, ionTokenHtml, covalentLooksCommon } from '../utils/naming.js'

export default function Builder() {
  const [mode, setMode] = useState('ionic') // 'ionic' | 'covalent'
  
  // Ionic selections
  const [cat, setCat] = useState('Na+')
  const [an, setAn] = useState('Cl-')
  
  // Covalent selections
  const [nm1, setNm1] = useState('C')
  const [n1, setN1] = useState(1)
  const [nm2, setNm2] = useState('O')
  const [n2, setN2] = useState(2)
  
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
  
  const nameResult = useMemo(() => {
    if (mode === 'ionic') {
      const c = cations.find(x => x.symbol === cat)
      const a = anions.find(x => x.symbol === an)
      if (!c || !a) return ''
      return nameIonicFromParts(c, a)
    } else {
      const e1 = nonmetals.find(x => x.symbol === nm1)
      const e2 = nonmetals.find(x => x.symbol === nm2)
      if (!e1 || !e2) return ''
      return nameCovalentFromParts(e1, Number(n1), e2, Number(n2))
    }
  }, [mode, cat, an, nm1, n1, nm2, n2])
  
  return (
    <div className="grid">
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
      </div>

      <div className="card">
        <div className="section-title">How It Works</div>
        <div className="help">
          <h4>Ionic Compounds</h4>
          <p>Ionic compounds form when metals lose electrons to non-metals. The charges must balance to create a neutral compound.</p>
          
          <h4>Covalent Compounds</h4>
          <p>Covalent compounds form when non-metals share electrons. Greek prefixes indicate the number of each element.</p>
          
          <h4>Naming Rules</h4>
          <ul>
            <li><strong>Ionic:</strong> Metal name + non-metal root + "ide"</li>
            <li><strong>Covalent:</strong> Greek prefix + first element + Greek prefix + second element root + "ide"</li>
            <li><strong>Polyatomic:</strong> Keep the ion's original name</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Helper function for greatest common divisor
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}
