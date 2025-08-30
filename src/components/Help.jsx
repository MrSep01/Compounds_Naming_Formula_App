import React, { useState } from 'react'
import { oxyanions, namingRules, ionComparison, stateSymbols } from '../utils/data.js'

export default function Help() {
  const [activeSection, setActiveSection] = useState('naming-rules')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizResults, setQuizResults] = useState({})

  const sections = [
    { id: 'naming-rules', title: '📚 Naming Rules', icon: '📚' },
    { id: 'oxyanions', title: '⚗️ Oxyanions', icon: '⚗️' },
    { id: 'ions', title: '⚡ Ions', icon: '⚡' },
    { id: 'states', title: '🔬 States', icon: '🔬' },
    { id: 'quiz', title: '🧪 Quick Quiz', icon: '🧪' }
  ]

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const checkQuiz = () => {
    const results = {}
    let score = 0
    const total = quizQuestions.length

    quizQuestions.forEach(q => {
      const userAnswer = quizAnswers[q.id] || ''
      const isCorrect = userAnswer.toLowerCase().trim() === q.answer.toLowerCase()
      results[q.id] = { correct: isCorrect, userAnswer, correctAnswer: q.answer }
      if (isCorrect) score++
    })

    setQuizResults(results)
    return { score, total }
  }

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the name of NaCl?',
      answer: 'sodium chloride',
      type: 'ionic',
      hint: 'Think: metal + non-metal = ionic compound'
    },
    {
      id: 'q2',
      question: 'What is the name of CO₂?',
      answer: 'carbon dioxide',
      type: 'covalent',
      hint: 'Use Greek prefixes: di- means 2'
    },
    {
      id: 'q3',
      question: 'What is the name of HCl(aq)?',
      answer: 'hydrochloric acid',
      type: 'acid',
      hint: 'Binary acid: hydro- + non-metal root + -ic acid'
    },
    {
      id: 'q4',
      question: 'What is the name of NaOH(aq)?',
      answer: 'sodium hydroxide',
      type: 'base',
      hint: 'Metal hydroxide: metal name + hydroxide'
    },
    {
      id: 'q5',
      question: 'What is the formula for sulfate?',
      answer: 'SO₄²⁻',
      type: 'polyatomic',
      hint: 'Sulfur with 4 oxygen atoms, 2- charge'
    }
  ]

  return (
    <div className="help-container">
      {/* Navigation Tabs */}
      <div className="help-nav">
        {sections.map(section => (
          <button
            key={section.id}
            className={`help-nav-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.icon} {section.title}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="help-content">
        {/* Naming Rules Section */}
        {activeSection === 'naming-rules' && (
          <div className="help-section">
            <h2>🧪 Compound Naming Rules</h2>
            <p className="section-intro">
              Learn the simple patterns for naming different types of compounds. Each type follows its own rules, but once you learn them, naming becomes easy!
            </p>
            
            <div className="rules-grid">
              {Object.entries(namingRules).map(([type, ruleSet]) => (
                <div key={type} className="rule-card">
                  <div className="rule-header">
                    <h3>{ruleSet.title}</h3>
                    <p>{ruleSet.description}</p>
                  </div>
                  
                  <div className="rule-list">
                    {ruleSet.rules.map((rule, index) => (
                      <div key={index} className="rule-item">
                        <div className="rule-title">
                          <span className="rule-number">{index + 1}</span>
                          <strong>{rule.rule}</strong>
                        </div>
                        <div className="rule-pattern">
                          <strong>Pattern:</strong> {rule.pattern}
                        </div>
                        <div className="rule-examples">
                          <strong>Examples:</strong>
                          <ul>
                            {rule.examples.map((example, i) => (
                              <li key={i}>{example}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="rule-explanation">
                          <strong>💡 Tip:</strong> {rule.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Oxyanions Section */}
        {activeSection === 'oxyanions' && (
          <div className="help-section">
            <h2>⚗️ Oxyanion Naming System</h2>
            <p className="section-intro">
              Oxyanions are polyatomic ions containing oxygen. Their names change based on the number of oxygen atoms - more oxygen means higher oxidation state!
            </p>
            
            <div className="oxyanion-grid">
              {oxyanions.map(element => (
                <div key={element.symbol} className="oxyanion-card">
                  <div className="oxyanion-header">
                    <h3>{element.element} ({element.symbol})</h3>
                    <div className="base-charge">Base charge: {element.baseCharge}</div>
                  </div>
                  
                  <div className="oxygen-progression">
                    <h4>Oxygen Progression (Most → Least)</h4>
                    {element.progression.map((ion, index) => (
                      <div key={ion.formula} className="ion-progression-item">
                        <div className="ion-formula">
                          <strong>{ion.formula}</strong>
                          <span className="ion-name">{ion.name}</span>
                        </div>
                        <div className="ion-details">
                          <div className="oxygen-count">
                            <span className="oxygen-badge">O{ion.oxygen}</span>
                            <span className="pattern-label">{ion.pattern}</span>
                          </div>
                          <div className="ion-definition">{ion.definition}</div>
                          <div className="ion-examples">
                            <strong>Examples:</strong> {ion.examples.join(', ')}
                          </div>
                          <div className="ion-uses">
                            <strong>Uses:</strong> {ion.commonUses}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="naming-pattern-summary">
              <h3>🎯 Quick Naming Pattern</h3>
              <div className="pattern-flow">
                <div className="pattern-step">
                  <span className="step-number">1</span>
                  <span className="step-text">Most oxygen = <strong>-ate</strong> ending</span>
                </div>
                <div className="pattern-arrow">↓</div>
                <div className="pattern-step">
                  <span className="step-number">2</span>
                  <span className="step-text">Less oxygen = <strong>-ite</strong> ending</span>
                </div>
                <div className="pattern-arrow">↓</div>
                <div className="pattern-step">
                  <span className="step-number">3</span>
                  <span className="step-text">Even less = <strong>hypo-</strong> prefix</span>
                </div>
                <div className="pattern-arrow">↓</div>
                <div className="pattern-step">
                  <span className="step-number">4</span>
                  <span className="step-text">Most = <strong>per-</strong> prefix</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ions Section */}
        {activeSection === 'ions' && (
          <div className="help-section">
            <h2>⚡ Ion Comparison Table</h2>
            <p className="section-intro">
              Understanding the difference between elemental ions and polyatomic ions is key to naming compounds correctly.
            </p>
            
            <div className="ion-comparison-table">
              {ionComparison.map(element => (
                <div key={element.symbol} className="ion-element-card">
                  <div className="ion-element-header">
                    <h3>{element.element} ({element.symbol})</h3>
                  </div>
                  
                  <div className="ion-types">
                    <div className="ion-type elemental">
                      <div className="ion-type-header">
                        <h4>🔴 Elemental Ion</h4>
                        <div className="ion-charge">{element.elemental.charge}</div>
                      </div>
                      <div className="ion-formula">{element.elemental.symbol}</div>
                      <div className="ion-name">{element.elemental.name}</div>
                      <div className="ion-description">
                        Simple ion formed from a single element
                      </div>
                    </div>
                    
                    <div className="ion-type polyatomic">
                      <div className="ion-type-header">
                        <h4>🔵 Polyatomic Ions</h4>
                        <div className="ion-count">{element.polyatomic.length} forms</div>
                      </div>
                      {element.polyatomic.map(ion => (
                        <div key={ion.symbol} className="polyatomic-ion">
                          <div className="ion-formula">{ion.symbol}</div>
                          <div className="ion-name">{ion.name}</div>
                          <div className="ion-pattern">{ion.pattern}</div>
                          <div className="ion-oxygen">O{ion.oxygen}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* States Section */}
        {activeSection === 'states' && (
          <div className="help-section">
            <h2>🔬 State Symbols & Properties</h2>
            <p className="section-intro">
              State symbols tell us the physical form of a compound and help us understand its properties and naming.
            </p>
            
            <div className="state-symbols-grid">
              {stateSymbols.map(state => (
                <div key={state.symbol} className="state-symbol-card">
                  <div className="state-symbol">{state.symbol}</div>
                  <div className="state-name">{state.name}</div>
                  <div className="state-description">{state.description}</div>
                  <div className="state-examples">
                    <strong>Examples:</strong> {state.examples.join(', ')}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="state-comparison">
              <h3>🔄 Molecular vs Aqueous Forms</h3>
              <div className="comparison-example">
                <div className="molecular-form">
                  <h4>🧪 Molecular Form (g)</h4>
                  <div className="formula">HCl(g)</div>
                  <div className="name">hydrogen chloride</div>
                  <div className="properties">
                    <strong>Properties:</strong> Gas, covalent, poor conductor
                  </div>
                </div>
                
                <div className="comparison-arrow">→</div>
                
                <div className="aqueous-form">
                  <h4>💧 Aqueous Form (aq)</h4>
                  <div className="formula">HCl(aq)</div>
                  <div className="name">hydrochloric acid</div>
                  <div className="properties">
                    <strong>Properties:</strong> Solution, acidic, good conductor
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        {activeSection === 'quiz' && (
          <div className="help-section">
            <h2>🧪 Quick Assessment Quiz</h2>
            <p className="section-intro">
              Test your knowledge with these quick questions. Don't worry if you get some wrong - it's all part of learning!
            </p>
            
            <div className="quiz-container">
              {quizQuestions.map(q => (
                <div key={q.id} className="quiz-question">
                  <div className="question-header">
                    <span className="question-type">{q.type}</span>
                    <h4>{q.question}</h4>
                  </div>
                  
                  <div className="question-input">
                    <input
                      type="text"
                      placeholder="Type your answer..."
                      value={quizAnswers[q.id] || ''}
                      onChange={(e) => handleQuizAnswer(q.id, e.target.value)}
                      className={quizResults[q.id] ? 
                        (quizResults[q.id].correct ? 'correct' : 'incorrect') : ''
                      }
                    />
                  </div>
                  
                  {quizResults[q.id] && (
                    <div className={`quiz-feedback ${quizResults[q.id].correct ? 'correct' : 'incorrect'}`}>
                      {quizResults[q.id].correct ? (
                        <span>✅ Correct! Great job!</span>
                      ) : (
                        <div>
                          <span>❌ Not quite right.</span>
                          <div className="correct-answer">
                            <strong>Correct answer:</strong> {quizResults[q.id].correctAnswer}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="question-hint">
                    <strong>💡 Hint:</strong> {q.hint}
                  </div>
                </div>
              ))}
              
              <div className="quiz-actions">
                <button className="quiz-check-btn" onClick={checkQuiz}>
                  Check Answers
                </button>
                <button className="quiz-reset-btn" onClick={() => {
                  setQuizAnswers({})
                  setQuizResults({})
                }}>
                  Reset Quiz
                </button>
              </div>
              
              {Object.keys(quizResults).length > 0 && (
                <div className="quiz-results">
                  {(() => {
                    const { score, total } = checkQuiz()
                    const percentage = Math.round((score / total) * 100)
                    return (
                      <div className={`results-summary ${percentage >= 80 ? 'excellent' : percentage >= 60 ? 'good' : 'needs-work'}`}>
                        <h3>Quiz Results</h3>
                        <div className="score-display">
                          <span className="score-number">{score}/{total}</span>
                          <span className="score-percentage">{percentage}%</span>
                        </div>
                        <div className="score-message">
                          {percentage >= 80 ? '🎉 Excellent! You really know your stuff!' :
                           percentage >= 60 ? '👍 Good work! Keep practicing!' :
                           '📚 Keep studying! Review the rules and try again!'}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
