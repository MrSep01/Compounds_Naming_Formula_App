import React, { useMemo, useState } from 'react'
import { cations, anions, nonmetals, formatFormula, nameIonicFromParts, nameCovalentFromParts, ionTokenHtml, covalentLooksCommon } from '../utils/naming.js'

export default function Builder(){
  const [mode, setMode] = useState('ionic') // 'ionic' | 'covalent'
  // Ionic selections
  const [cat, setCat] = useState('Na+')
  const [an, setAn] = useState('Cl-')
  // Covalent selections
  const [nm1, setNm1] = useState('C')
  const [n1, setN1] = useState(1)
  const [nm2, setNm2] = useState('O')
  const [n2, setN2] = useState(2)
  
  const ionicFormula = useMemo(()=>{
    if(mode!=='ionic') return ''
    const c = cations.find(x=>x.symbol===cat)
    const a = anions.find(x=>x.symbol===an)
    if(!c || !a) return ''
    const g = gcd(Math.abs(c.charge), Math.abs(a.charge))
    const cCount = Math.abs(a.charge)/g
    const aCount = Math.abs(c.charge)/g
    return formatFormula([{symbol:c.symbol, core:c.core, count:cCount, poly:c.poly},{symbol:a.symbol, core:a.core, count:aCount, poly:a.poly}])
  },[mode,cat,an])
  
  const ionicIonsHTML = useMemo(()=>{
    if(mode!=='ionic') return ''
    const c = cations.find(x=>x.symbol===cat)
    const a = anions.find(x=>x.symbol===an)
    if(!c||!a) return ''
    const g = gcd(Math.abs(c.charge), Math.abs(a.charge))
    const cCount = Math.abs(a.charge)/g
    const aCount = Math.abs(c.charge)/g
    const left = (cCount>1?`<span>${cCount}</span> `:'') + ionTokenHtml(c.core, c.charge)
    const right = (aCount>1?`<span>${aCount}</span> `:'') + ionTokenHtml(a.core, a.charge)
    return left + ' + ' + right
  },[mode,cat,an])
  
  const covFormula = useMemo(()=>{
    if(mode!=='covalent') return ''
    return formatFormula([{symbol:nm1, count:Number(n1)},{symbol:nm2, count:Number(n2)}])
  },[mode,nm1,n1,nm2,n2])
  
  const covalentUncommon = useMemo(()=>{
    if(mode!=='covalent') return false
    return !covalentLooksCommon([{symbol:nm1,count:Number(n1)},{symbol:nm2,count:Number(n2)}])
  },[mode,nm1,n1,nm2,n2])
  
  const nameResult = useMemo(()=>{
    if(mode==='ionic'){
      const c = cations.find(x=>x.symbol===cat)
      const a = anions.find(x=>x.symbol===an)
      if(!c||!a) return ''
      return nameIonicFromParts(c, a)
    } else {
      const e1 = nonmetals.find(x=>x.symbol===nm1)
      const e2 = nonmetals.find(x=>x.symbol===nm2)
      if(!e1||!e2) return ''
      return nameCovalentFromParts(e1, Number(n1), e2, Number(n2))
    }
  },[mode,cat,an,nm1,n1,nm2,n2])
  
  return (
    <div className="grid">
      <div className="card">
        <div className="section-title">Sandbox Builder</div>
        <div className="row" style={{marginBottom:8}}>
          <button className={mode==='ionic'?'':'secondary'} onClick={()=>setMode('ionic')}>Ionic</button>
          <button className={mode==='covalent'?'':'secondary'} onClick={()=>setMode('covalent')}>Covalent</button>
        </div>
        
        {mode==='ionic' && (
          <>
          <div className="row">
            <div>
              <div className="section-title">Cation</div>
              <select value={cat} onChange={e=>setCat(e.target.value)}>
                {cations.map(x=>(<option key={x.symbol} value={x.symbol}>{x.symbol} — {x.name}</option>))}
              </select>
            </div>
            <div>
              <div className="section-title">Anion</div>
              <select value={an} onChange={e=>setAn(e.target.value)}>
                {anions.map(x=>(<option key={x.symbol} value={x.symbol}>{x.symbol} — {x.name}</option>))}
              </select>
            </div>
          </div>
          <div style={{marginTop:12}}><span className="section-title">Ions (with charges)</span><div className="formula" dangerouslySetInnerHTML={{__html: ionicIonsHTML}}/></div>
            <div style={{marginTop:12}}><span className="section-title">Formula Unit (neutral)</span><div className="formula" dangerouslySetInnerHTML={{__html: ionicFormula}}/></div>
            <div style={{marginTop:8}}><span className="section-title">Name</span><div className="feedback">{nameResult}</div></div>
          </>
        )}
        
        {mode==='covalent' && (
          <>
          <div className="row">
            <div>
              <div className="section-title">Element 1</div>
              <select value={nm1} onChange={e=>setNm1(e.target.value)}>
                {nonmetals.map(x=>(<option key={x.symbol} value={x.symbol}>{x.symbol} — {x.name}</option>))}
              </select>
            </div>
            <div>
              <div className="section-title">Count</div>
              <input type="number" min="1" max="10" value={n1} onChange={e=>setN1(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div>
              <div className="section-title">Element 2</div>
              <select value={nm2} onChange={e=>setNm2(e.target.value)}>
                {nonmetals.map(x=>(<option key={x.symbol} value={x.symbol}>{x.symbol} — {x.name}</option>))}
              </select>
            </div>
            <div>
              <div className="section-title">Count</div>
              <input type="number" min="1" max="10" value={n2} onChange={e=>setN2(e.target.value)} />
            </div>
          </div>
          <div style={{marginTop:12}}><span className="section-title">Formula</span><div className="formula" dangerouslySetInnerHTML={{__html: covFormula}}/></div>
          <div style={{marginTop:8}}><span className="section-title">IUPAC Name</span><div className="feedback">{nameResult}</div></div>
          </>
        )}
      </div>
      
      <div className="card">
        <div className="section-title">Tips</div>
        <ul>
          <li>For ionic compounds, the formula automatically balances charges (e.g., Al<sub>2</sub>O<sub>3</sub>).</li>
          <li>For covalent molecules, try common pairs like CO₂, NO, SO₃, PCl₅, N₂O₄.</li>
          <li>Use the <b>Guide & Rules</b> tab for full naming instructions and examples.</li>
        </ul>
      </div>
    </div>
  )
}

function gcd(a,b){ return b?gcd(b, a%b):a }
