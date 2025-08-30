import React, { useEffect, useMemo, useState } from 'react'
import { randomChallenge, checkAnswer, formatFormula } from '../utils/naming.js'

export default function Practice({ score, setScore }) {
  const [q, setQ] = useState(() => randomChallenge())
  const [stage, setStage] = useState('classify') // 'classify' -> 'name' -> 'done'
  const [guessType, setGuessType] = useState('ionic')
  const [guessName, setGuessName] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // New features
  const [difficulty, setDifficulty] = useState('medium') // 'easy', 'medium', 'hard'
  const [timerMode, setTimerMode] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showHint, setShowHint] = useState(false)
  const [hintLevel, setHintLevel] = useState(0)

  useEffect(() => {
    setGuessType('ionic')
    setGuessName('')
    setFeedback(null)
    setStage('classify')
    setShowHint(false)
    setHintLevel(0)
  }, [q.id])

  // Timer effect
  useEffect(() => {
    if (!timerMode || stage === 'done') return
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - mark as wrong
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerMode, stage])

  const formulaHTML = useMemo(() => formatFormula(q.parts), [q])

  function handleTimeUp() {
    setFeedback({
      msg: '⏰ Time\'s up! The answer was: ' + q.primary,
      type: 'error',
      reveal: true
    })
    setScore({
      ...score,
      total: score.total + 1,
      streak: 0
    })
    setStage('done')
  }

  function onCheckType() {
    if (isLoading) return
    
    setIsLoading(true)
    const correct = guessType === q.kind
    
    if (correct) {
      setStage('name')
      setFeedback({ 
        msg: '✅ Correct type! Now enter the correct name.', 
        okType: true,
        type: 'success'
      })
    } else {
      // Lose a point for wrong classification; clamp at 0
      const newCorrect = Math.max(0, score.correct - 1)
      setScore({ 
        ...score, 
        correct: newCorrect, 
        total: score.total + 1, 
        streak: 0 
      })
      setFeedback({ 
        msg: `❌ It's ${q.kind}. Expected name: ${q.primary}`, 
        okType: false, 
        reveal: true,
        type: 'error'
      })
      setStage('done')
    }
    
    setTimeout(() => setIsLoading(false), 300)
  }

  function onCheckName() {
    if (isLoading || !guessName.trim()) return
    
    setIsLoading(true)
    const res = checkAnswer(q, q.kind, guessName.trim()) // type already validated
    const isCorrect = res.okName
    
    setFeedback({
      msg: isCorrect ? '✅ Name is correct!' : `❌ Incorrect. Expected: ${res.expectedPrimary}`,
      okName: isCorrect, 
      expectedPrimary: res.expectedPrimary, 
      accepted: res.accepted,
      type: isCorrect ? 'success' : 'error'
    })
    
    // scoring: +1 if correct, -1 if wrong
    const delta = isCorrect ? 1 : -1

    setScore({
      correct: Math.max(0, score.correct + delta),
      total: score.total + 1,
      streak: isCorrect ? score.streak + 1 : 0
    })
    setStage('done')
    
    setTimeout(() => setIsLoading(false), 300)
  }

  function onNext() {
    setQ(randomChallenge())
    setGuessName('')
    setFeedback(null)
    setStage('classify')
    setShowHint(false)
    setHintLevel(0)
    if (timerMode) setTimeLeft(60)
  }

  function handleKeyPress(e, action) {
    if (e.key === 'Enter') {
      e.preventDefault()
      action()
    }
  }

  function getHint() {
    if (hintLevel === 0) {
      setHintLevel(1)
      setShowHint(true)
    } else if (hintLevel === 1) {
      setHintLevel(2)
    }
  }

  function getHintText() {
    if (hintLevel === 1) {
      return q.kind === 'ionic' 
        ? 'Look for metal + non-metal combination'
        : 'Look for non-metal + non-metal combination'
    } else if (hintLevel === 2) {
      return q.kind === 'ionic'
        ? `Think: ${q.parts[0]?.symbol || ''} + ${q.parts[1]?.symbol || ''}`
        : `Count the atoms: ${q.parts.map(p => p.count).join('')}`
    }
    return ''
  }

  return (
    <div className="grid">
      <div className="card">
        <div className="section-title">Practice Mode — Step-by-step</div>
        
        {/* Difficulty and Timer Controls */}
        <div className="row" style={{ marginBottom: 16 }}>
          <div>
            <label htmlFor="difficulty-select" className="section-title">Difficulty</label>
            <select 
              id="difficulty-select"
              value={difficulty} 
              onChange={e => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="section-title">Timer Mode</label>
            <div className="row" style={{ gap: 8, marginTop: 4 }}>
              <button 
                className={timerMode ? 'active' : 'ghost'}
                onClick={() => setTimerMode(!timerMode)}
                style={{ padding: '6px 12px', fontSize: '14px' }}
              >
                {timerMode ? '⏰ ON' : '⏰ OFF'}
              </button>
              {timerMode && (
                <div className="timer">
                  ⏱️ {timeLeft}s
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="headerband">
          Step 1: Decide if the compound is <b>Ionic</b> or <b>Covalent</b>. 
          If correct, Step 2 unlocks: name it.
        </div>
        
        <div className="row" style={{ alignItems: 'center', marginTop: 8 }}>
          <div>
            <span className="section-title">Formula Unit</span>
            <div 
              className="formula" 
              dangerouslySetInnerHTML={{ __html: formulaHTML }}
              aria-label={`Chemical formula: ${q.parts.map(p => p.symbol).join('')}`}
            />
          </div>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <div>
            <label htmlFor="compound-type" className="section-title">Type</label>
            <select 
              id="compound-type"
              value={guessType} 
              onChange={e => setGuessType(e.target.value)} 
              disabled={stage !== 'classify'}
              aria-describedby="type-description"
            >
              <option value="ionic">Ionic</option>
              <option value="covalent">Covalent</option>
            </select>
            <div id="type-description" className="sr-only">
              Select whether this compound is ionic or covalent
            </div>
          </div>
          
          <div>
            <label htmlFor="compound-name" className="section-title">Name</label>
            <input 
              id="compound-name"
              placeholder="Enter the compound name" 
              value={guessName} 
              onChange={e => setGuessName(e.target.value)}
              onKeyPress={e => handleKeyPress(e, onCheckName)}
              disabled={stage !== 'name'} 
              aria-describedby="name-description"
            />
            <div id="name-description" className="sr-only">
              Enter the systematic name for this compound
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          {stage === 'classify' && (
            <button 
              className="success" 
              onClick={onCheckType}
              disabled={isLoading}
              aria-label="Check if compound type is correct"
            >
              {isLoading ? 'Checking...' : 'Check Type'}
            </button>
          )}
          
          {stage === 'name' && (
            <button 
              className="success" 
              onClick={onCheckName}
              disabled={isLoading || !guessName.trim()}
              aria-label="Check if compound name is correct"
            >
              {isLoading ? 'Checking...' : 'Check Name'}
            </button>
          )}
          
          <button 
            className="ghost" 
            onClick={onNext}
            aria-label="Move to next compound"
          >
            Next
          </button>
          
          {stage === 'classify' && (
            <button 
              className="secondary" 
              onClick={getHint}
              disabled={hintLevel >= 2}
              aria-label="Get a hint"
            >
              💡 Hint ({hintLevel}/2)
            </button>
          )}
        </div>

        {showHint && hintLevel > 0 && (
          <div className="feedback feedback-info" style={{ marginTop: 12 }}>
            <div><strong>💡 Hint:</strong> {getHintText()}</div>
          </div>
        )}

        {feedback && (
          <div className={`feedback feedback-${feedback.type}`} style={{ marginTop: 12 }}>
            <div>{feedback.msg}</div>
            {feedback.accepted && feedback.accepted.length > 0 && (
              <div style={{ marginTop: 6 }}>
                <b>Also accepted:</b> {feedback.accepted.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card">
        <div className="section-title">Hint</div>
        <ul>
          <li>Metal + nonmetal (or contains a polyatomic ion) → usually <b>Ionic</b>.</li>
          <li>Two nonmetals → usually <b>Covalent</b> (use Greek prefixes).</li>
          <li>Transition-metal ionic names use <b>Roman numerals</b> for the metal oxidation number.</li>
        </ul>
      </div>
    </div>
  )
}
