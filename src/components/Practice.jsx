import React, { useState, useEffect } from 'react'
import { getCompoundName, getCompoundType } from '../utils/data.js'

export default function Practice({ score, setScore }) {
  const [formula, setFormula] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [difficulty, setDifficulty] = useState('easy')
  const [timerMode, setTimerMode] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showHint, setShowHint] = useState(false)
  const [hintLevel, setHintLevel] = useState(0)
  const [questionType, setQuestionType] = useState('naming') // 'naming', 'type', 'formula'
  const [currentQuestion, setCurrentQuestion] = useState(null)

  // Enhanced question pool including acids, bases, and type identification
  const questionPool = {
    naming: [
      // Ionic compounds
      { formula: 'NaCl', answer: 'sodium chloride', type: 'ionic', difficulty: 'easy', hint: 'Metal + non-metal = ionic compound' },
      { formula: 'CaO', answer: 'calcium oxide', type: 'ionic', difficulty: 'easy', hint: 'Group 2 metal + oxygen' },
      { formula: 'FeCl₂', answer: 'iron(II) chloride', type: 'ionic', difficulty: 'medium', hint: 'Transition metal needs Roman numeral' },
      { formula: 'CuO', answer: 'copper(II) oxide', type: 'ionic', difficulty: 'medium', hint: 'Copper commonly has +2 charge' },
      { formula: 'Na₂SO₄', answer: 'sodium sulfate', type: 'ionic', difficulty: 'medium', hint: 'Polyatomic ion keeps its name' },
      { formula: 'CaCO₃', answer: 'calcium carbonate', type: 'ionic', difficulty: 'medium', hint: 'Common polyatomic ion' },
      
      // Covalent compounds
      { formula: 'CO₂', answer: 'carbon dioxide', type: 'covalent', difficulty: 'easy', hint: 'Use Greek prefix: di- means 2' },
      { formula: 'N₂O', answer: 'dinitrogen monoxide', type: 'covalent', difficulty: 'medium', hint: 'Both elements need prefixes' },
      { formula: 'SO₃', answer: 'sulfur trioxide', type: 'covalent', difficulty: 'easy', hint: 'Tri- means 3 oxygen atoms' },
      { formula: 'PCl₅', answer: 'phosphorus pentachloride', type: 'covalent', difficulty: 'medium', hint: 'Penta- means 5 chlorine atoms' },
      
      // Acids
      { formula: 'HCl(aq)', answer: 'hydrochloric acid', type: 'acid', difficulty: 'easy', hint: 'Binary acid: hydro- + non-metal root + -ic acid' },
      { formula: 'HF(aq)', answer: 'hydrofluoric acid', type: 'acid', difficulty: 'easy', hint: 'Fluorine root is fluor-' },
      { formula: 'H₂SO₄(aq)', answer: 'sulfuric acid', type: 'acid', difficulty: 'medium', hint: 'Sulfate becomes sulfuric acid' },
      { formula: 'HNO₃(aq)', answer: 'nitric acid', type: 'acid', difficulty: 'medium', hint: 'Nitrate becomes nitric acid' },
      { formula: 'HNO₂(aq)', answer: 'nitrous acid', type: 'acid', difficulty: 'hard', hint: 'Nitrite becomes nitrous acid' },
      { formula: 'HClO₄(aq)', answer: 'perchloric acid', type: 'acid', difficulty: 'hard', hint: 'Perchlorate becomes perchloric acid' },
      
      // Bases
      { formula: 'NaOH(aq)', answer: 'sodium hydroxide', type: 'base', difficulty: 'easy', hint: 'Metal hydroxide: metal name + hydroxide' },
      { formula: 'Ca(OH)₂(aq)', answer: 'calcium hydroxide', type: 'base', difficulty: 'medium', hint: 'Parentheses needed for multiple OH groups' },
      { formula: 'KOH(aq)', answer: 'potassium hydroxide', type: 'base', difficulty: 'easy', hint: 'Group 1 metal hydroxide' },
      { formula: 'NH₄OH(aq)', answer: 'ammonium hydroxide', type: 'base', difficulty: 'medium', hint: 'Ammonium is a special cation' }
    ],
    type: [
      { formula: 'NaCl', answer: 'ionic', type: 'ionic', difficulty: 'easy', hint: 'Contains a metal (Na) and non-metal (Cl)' },
      { formula: 'CO₂', answer: 'covalent', type: 'covalent', difficulty: 'easy', hint: 'Only non-metals (C and O)' },
      { formula: 'HCl(aq)', answer: 'acid', type: 'acid', difficulty: 'easy', hint: 'Starts with H and is aqueous' },
      { formula: 'NaOH(aq)', answer: 'base', type: 'base', difficulty: 'easy', hint: 'Contains OH group' },
      { formula: 'Fe₂O₃', answer: 'ionic', type: 'ionic', difficulty: 'medium', hint: 'Metal (Fe) + non-metal (O)' },
      { formula: 'NH₃', answer: 'base', type: 'base', difficulty: 'medium', hint: 'Ammonia is a base' },
      { formula: 'H₂SO₄(aq)', answer: 'acid', type: 'acid', difficulty: 'medium', hint: 'Starts with H and is aqueous' },
      { formula: 'PCl₃', answer: 'covalent', type: 'covalent', difficulty: 'medium', hint: 'Only non-metals (P and Cl)' }
    ],
    formula: [
      { name: 'sodium chloride', answer: 'NaCl', type: 'ionic', difficulty: 'easy', hint: 'Sodium is Na, chlorine is Cl' },
      { name: 'carbon dioxide', answer: 'CO₂', type: 'covalent', difficulty: 'easy', hint: 'Carbon is C, dioxide means 2 oxygen atoms' },
      { name: 'hydrochloric acid', answer: 'HCl(aq)', type: 'acid', difficulty: 'easy', hint: 'H + Cl, aqueous state for acid' },
      { name: 'sodium hydroxide', answer: 'NaOH(aq)', type: 'base', difficulty: 'easy', hint: 'Na + OH, aqueous state for base' },
      { name: 'iron(II) chloride', answer: 'FeCl₂', type: 'ionic', difficulty: 'medium', hint: 'Fe²⁺ + 2 Cl⁻' },
      { name: 'sulfuric acid', answer: 'H₂SO₄(aq)', type: 'acid', difficulty: 'medium', hint: 'H₂ + SO₄²⁻, aqueous state' },
      { name: 'dinitrogen monoxide', answer: 'N₂O', type: 'covalent', difficulty: 'medium', hint: 'Di- means 2 N, mono- means 1 O' }
    ]
  }

  useEffect(() => {
    if (timerMode && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timerMode && timeLeft === 0) {
      handleTimeout()
    }
  }, [timerMode, timeLeft])

  useEffect(() => {
    generateQuestion()
  }, [difficulty, questionType])

  function generateQuestion() {
    const questions = questionPool[questionType].filter(q => {
      if (difficulty === 'easy') return q.difficulty === 'easy'
      if (difficulty === 'medium') return ['easy', 'medium'].includes(q.difficulty)
      return true // hard includes all difficulties
    })
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
    setCurrentQuestion(randomQuestion)
    setFormula(randomQuestion.formula || '')
    setUserAnswer('')
    setFeedback(null)
    setShowHint(false)
    setHintLevel(0)
    
    if (timerMode) {
      setTimeLeft(60)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (isLoading || !userAnswer.trim()) return
    
    setIsLoading(true)
    
    // Simulate processing time
    setTimeout(() => {
      checkAnswer()
      setIsLoading(false)
    }, 500)
  }

  function checkAnswer() {
    if (!currentQuestion) return
    
    let isCorrect = false
    let message = ''
    
    if (questionType === 'naming') {
      isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase()
      message = isCorrect ? 
        '✅ Perfect! You got it right!' : 
        `❌ Not quite right. The correct answer is: ${currentQuestion.answer}`
    } else if (questionType === 'type') {
      isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase()
      message = isCorrect ? 
        '✅ Excellent! You correctly identified the compound type!' : 
        `❌ Not quite right. ${currentQuestion.formula} is a ${currentQuestion.answer} compound.`
    } else if (questionType === 'formula') {
      isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase()
      message = isCorrect ? 
        '✅ Great job! You wrote the correct formula!' : 
        `❌ Not quite right. The correct formula is: ${currentQuestion.answer}`
    }
    
    setFeedback({
      correct: isCorrect,
      message,
      type: isCorrect ? 'success' : 'error'
    })
    
    updateScore(isCorrect)
    
    if (isCorrect) {
      setTimeout(() => {
        generateQuestion()
      }, 2000)
    }
  }

  function updateScore(correct) {
    setScore(prev => {
      const newStreak = correct ? prev.streak + 1 : 0
      return {
        correct: correct ? prev.correct + 1 : prev.correct,
        total: prev.total + 1,
        streak: newStreak
      }
    })
  }

  function handleTimeout() {
    setFeedback({
      correct: false,
      message: '⏰ Time\'s up! The answer was: ' + currentQuestion.answer,
      type: 'error'
    })
    updateScore(false)
  }

  function getHint() {
    if (hintLevel < 3) {
      setHintLevel(hintLevel + 1)
      setShowHint(true)
    }
  }

  function getHintText() {
    if (!currentQuestion) return ''
    
    const hints = [
      currentQuestion.hint,
      `This is a ${currentQuestion.type} compound.`,
      `Think about the naming rules for ${currentQuestion.type} compounds.`
    ]
    
    return hints[hintLevel] || 'No more hints available.'
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="card">
      <div className="section-title">Practice Naming Compounds</div>
      <div className="headerband">
          Practice naming ionic, covalent, acid, and base compounds. Choose your difficulty and question type!
        </div>

        {/* Controls */}
        <div className="row" style={{ marginBottom: 16 }}>
          <div>
            <label htmlFor="question-type-select" className="section-title">Question Type</label>
            <select 
              id="question-type-select"
              value={questionType} 
              onChange={e => setQuestionType(e.target.value)}
            >
              <option value="naming">Name the Compound</option>
              <option value="type">Identify Compound Type</option>
              <option value="formula">Write the Formula</option>
            </select>
          </div>
          
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

        {/* Question Display */}
        {currentQuestion && (
          <div className="question-display">
            <div className="question-header">
              <h3>
                {questionType === 'naming' && `Name this compound:`}
                {questionType === 'type' && `What type of compound is this?`}
                {questionType === 'formula' && `Write the formula for:`}
              </h3>
              
              <div className="question-content">
                {questionType === 'naming' && (
                  <div className="formula-display">
                    <span className="formula-large">{currentQuestion.formula}</span>
                    <span className="compound-type-badge">{currentQuestion.type}</span>
                  </div>
                )}
                
                {questionType === 'type' && (
                  <div className="formula-display">
                    <span className="formula-large">{currentQuestion.formula}</span>
                  </div>
                )}
                
                {questionType === 'formula' && (
                  <div className="name-display">
                    <span className="compound-name-large">{currentQuestion.name}</span>
                    <span className="compound-type-badge">{currentQuestion.type}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Answer Input */}
            <form onSubmit={handleSubmit} className="answer-form">
              <div className="input-group">
                <label htmlFor="answer-input" className="section-title">
                  {questionType === 'naming' && 'Your answer:'}
                  {questionType === 'type' && 'Compound type:'}
                  {questionType === 'formula' && 'Formula:'}
                </label>
                <input 
                  id="answer-input"
                  type="text" 
                  placeholder={
                    questionType === 'naming' ? 'Enter the compound name...' :
                    questionType === 'type' ? 'ionic, covalent, acid, or base...' :
                    'Enter the chemical formula...'
                  }
                  value={userAnswer} 
                  onChange={e => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  aria-label="Answer input"
                />
              </div>
              
              <div className="row" style={{ marginTop: 12 }}>
                <button 
                  type="submit" 
                  className="success" 
                  disabled={isLoading || !userAnswer.trim()}
                >
                  {isLoading ? 'Checking...' : 'Check Answer'}
                </button>
                
                <button 
                  type="button" 
                  className="ghost" 
                  onClick={() => setUserAnswer('')}
                >
                  Clear
                </button>
                
                <button 
                  type="button" 
                  className="secondary" 
                  onClick={getHint}
                  disabled={hintLevel >= 3}
                >
                  💡 Hint ({3 - hintLevel} left)
                </button>
              </div>
            </form>

            {/* Feedback */}
            {feedback && (
              <div className={`feedback feedback-${feedback.type}`} style={{ marginTop: 16 }}>
                {feedback.message}
              </div>
            )}

            {/* Hint Display */}
            {showHint && (
              <div className="hint-display">
                <strong>💡 Hint:</strong> {getHintText()}
              </div>
            )}

            {/* Next Question Button */}
            {feedback && !feedback.correct && (
              <button 
                className="success" 
                onClick={generateQuestion}
                style={{ marginTop: 12 }}
              >
                Next Question
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
