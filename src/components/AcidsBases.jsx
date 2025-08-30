import React, { useState, useMemo } from 'react'
import { acids, bases, molecularCompounds, compareForms, stateSymbols } from '../utils/data.js'

export default function AcidsBases() {
  const [mode, setMode] = useState('acids') // 'acids', 'bases', 'comparison'
  const [selectedCompound, setSelectedCompound] = useState('')
  const [showState, setShowState] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)

  const currentData = mode === 'acids' ? acids : mode === 'bases' ? bases : molecularCompounds

  const comparisonData = useMemo(() => {
    if (selectedCompound) {
      return compareForms(selectedCompound)
    }
    return null
  }, [selectedCompound])

  function handleCompoundSelect(formula) {
    setSelectedCompound(formula)
    setUserAnswer('')
    setFeedback(null)
    setShowState(false)
  }

  function checkAnswer() {
    if (!userAnswer.trim()) return

    const compound = currentData.find(c => c.formula === selectedCompound)
    if (!compound) return

    const isCorrect = userAnswer.toLowerCase().trim() === compound.name.toLowerCase()
    
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? '✅ Correct!' : `❌ Incorrect. The answer is: ${compound.name}`,
      type: isCorrect ? 'success' : 'error'
    })
  }

  function toggleState() {
    setShowState(!showState)
  }

  function getStateSymbol(state) {
    const stateInfo = stateSymbols.find(s => s.symbol === `(${state})`)
    return stateInfo ? stateInfo : { symbol: `(${state})`, name: state, description: 'Unknown state' }
  }

  return (
    <div className="grid">
      <div className="card">
        <div className="section-title">Acids & Bases Practice</div>
        <div className="headerband">
          Practice naming acids, bases, and understand the difference between molecular compounds and their aqueous forms.
        </div>

        <div className="row" style={{ marginBottom: 16 }}>
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
          <button 
            className={mode === 'comparison' ? 'active' : 'secondary'} 
            onClick={() => setMode('comparison')}
            aria-pressed={mode === 'comparison'}
          >
            Molecular vs Aqueous
          </button>
        </div>

        {mode !== 'comparison' && (
          <>
            <div className="row" style={{ marginBottom: 16 }}>
              <div>
                <label htmlFor="compound-select" className="section-title">
                  Select {mode === 'acids' ? 'Acid' : 'Base'}
                </label>
                <select 
                  id="compound-select"
                  value={selectedCompound} 
                  onChange={e => handleCompoundSelect(e.target.value)}
                >
                  <option value="">Choose a compound...</option>
                  {currentData.map(compound => (
                    <option key={compound.formula} value={compound.formula}>
                      {compound.formula} — {compound.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedCompound && (
              <div className="card" style={{ marginTop: 16 }}>
                <div className="section-title">Practice Naming</div>
                <div className="row">
                  <div>
                    <label htmlFor="answer-input" className="section-title">Name this compound:</label>
                    <input 
                      id="answer-input"
                      type="text" 
                      placeholder={`Enter the name of ${selectedCompound}`}
                      value={userAnswer} 
                      onChange={e => setUserAnswer(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && checkAnswer()}
                    />
                  </div>
                  <div>
                    <label className="section-title">State</label>
                    <div className="formula">
                      {selectedCompound} {getStateSymbol(currentData.find(c => c.formula === selectedCompound)?.state || 'aq').symbol}
                    </div>
                  </div>
                </div>
                
                <div className="row" style={{ marginTop: 12 }}>
                  <button className="success" onClick={checkAnswer}>
                    Check Answer
                  </button>
                  <button className="ghost" onClick={() => setUserAnswer('')}>
                    Clear
                  </button>
                </div>

                {feedback && (
                  <div className={`feedback feedback-${feedback.type}`} style={{ marginTop: 12 }}>
                    {feedback.message}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {mode === 'comparison' && (
          <>
            <div className="row" style={{ marginBottom: 16 }}>
              <div>
                <label htmlFor="comparison-select" className="section-title">Select Compound</label>
                <select 
                  id="comparison-select"
                  value={selectedCompound} 
                  onChange={e => handleCompoundSelect(e.target.value)}
                >
                  <option value="">Choose a compound...</option>
                  {molecularCompounds.map(compound => (
                    <option key={compound.formula} value={compound.formula}>
                      {compound.formula} — {compound.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {comparisonData && (
              <>
                <div className="comparison-grid">
                  <div className="comparison-card molecular">
                    <div className="comparison-header">
                      <h4>🧪 Molecular Form</h4>
                      <div className="state-badge">{comparisonData.molecular.state}</div>
                    </div>
                    <div className="formula-large">
                      {comparisonData.molecular.formula}
                    </div>
                    <div className="compound-name">
                      {comparisonData.molecular.name}
                    </div>
                    <div className="description">
                      {comparisonData.molecular.description}
                    </div>
                    <div className="properties">
                      <div className="property">
                        <strong>Type:</strong> Covalent molecule
                      </div>
                      <div className="property">
                        <strong>State:</strong> Gas at room temperature
                      </div>
                      <div className="property">
                        <strong>Conductivity:</strong> Poor conductor
                      </div>
                    </div>
                  </div>

                  <div className="comparison-arrow">→</div>

                  <div className="comparison-card aqueous">
                    <div className="comparison-header">
                      <h4>💧 Aqueous Form</h4>
                      <div className="state-badge">{comparisonData.aqueous.state}</div>
                    </div>
                    <div className="formula-large">
                      {comparisonData.aqueous.formula}
                    </div>
                    <div className="compound-name">
                      {comparisonData.aqueous.name}
                    </div>
                    <div className="description">
                      {comparisonData.aqueous.description}
                    </div>
                    <div className="properties">
                      <div className="property">
                        <strong>Type:</strong> {comparisonData.aqueous.description.includes('Acidic') ? 'Acid solution' : 'Base solution'}
                      </div>
                      <div className="property">
                        <strong>State:</strong> Dissolved in water
                      </div>
                      <div className="property">
                        <strong>Conductivity:</strong> Good conductor
                      </div>
                    </div>
                  </div>
                </div>

                <div className="naming-pattern" style={{ marginTop: 16 }}>
                  <h4>📝 Naming Pattern</h4>
                  <div className="pattern-example">
                    <strong>Molecular:</strong> {comparisonData.molecular.name} ({comparisonData.molecular.state})
                    <br />
                    <strong>Aqueous:</strong> {comparisonData.aqueous.name} ({comparisonData.aqueous.state})
                  </div>
                  <div className="pattern-rule">
                    <strong>Rule:</strong> When dissolved in water, molecular compounds often form acids or bases with different naming conventions.
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="card">
        <div className="section-title">Key Concepts</div>
        <div className="help">
          <h4>🧪 Acids</h4>
          <ul>
            <li><strong>Binary acids:</strong> H + non-metal → hydro[non-metal root]ic acid</li>
            <li><strong>Oxyacids:</strong> H + polyatomic → [polyatomic root]ic/ous acid</li>
            <li><strong>State:</strong> Always aqueous (aq) - dissolved in water</li>
          </ul>

          <h4>🧪 Bases</h4>
          <ul>
            <li><strong>Metal hydroxides:</strong> Metal + OH → [metal] hydroxide</li>
            <li><strong>Ammonia:</strong> NH₃(g) → NH₄OH(aq)</li>
            <li><strong>State:</strong> Always aqueous (aq) - dissolved in water</li>
          </ul>

          <h4>⚗️ State Symbols</h4>
          <ul>
            <li><strong>(g):</strong> Gas - molecular form</li>
            <li><strong>(aq):</strong> Aqueous - dissolved in water</li>
            <li><strong>(s):</strong> Solid - crystalline form</li>
            <li><strong>(l):</strong> Liquid - liquid form</li>
          </ul>

          <h4>🔄 Naming Differences</h4>
          <div className="callout">
            <strong>Example:</strong> HCl(g) = hydrogen chloride (covalent gas), HCl(aq) = hydrochloric acid (aqueous solution)
          </div>
        </div>
      </div>
    </div>
  )
}
