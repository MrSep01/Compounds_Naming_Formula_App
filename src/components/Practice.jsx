import React, { useEffect, useMemo, useState } from 'react'
import { randomChallenge, checkAnswer, formatFormula } from '../utils/naming.js'

export default function Practice({ score, setScore }){
  const [q, setQ] = useState(()=>randomChallenge())
  const [stage, setStage] = useState('classify') // 'classify' -> 'name' -> 'done'
  const [guessType, setGuessType] = useState('ionic')
  const [guessName, setGuessName] = useState('')
  const [feedback, setFeedback] = useState(null)

  useEffect(()=>{
    setGuessType('ionic')
    setGuessName('')
    setFeedback(null)
    setStage('classify')
  },[q.id])

  const formulaHTML = useMemo(()=>formatFormula(q.parts),[q])

  function onCheckType(){
    const correct = guessType === q.kind
    if(correct){
      setStage('name')
      setFeedback({ msg: '✅ Correct type! Now enter the correct name.', okType:true })
    }else{
      // Lose a point for wrong classification; clamp at 0
      const newCorrect = Math.max(0, score.correct - 1)
      setScore({ ...score, correct: newCorrect, total: score.total + 1, streak: 0 })
      setFeedback({ msg: `❌ It's ${q.kind}. Expected name: ${q.primary}`, okType:false, reveal:true })
      setStage('done')
    }
  }

  function onCheckName(){
    const res = checkAnswer(q, q.kind, guessName) // type already validated
    const isCorrect = res.okName
    setFeedback({
      msg: isCorrect ? '✅ Name is correct!' : `❌ Incorrect. Expected: ${res.expectedPrimary}`,
      okName: isCorrect, expectedPrimary: res.expectedPrimary, accepted: res.accepted
    })
    // scoring: +1 if correct, -1 if wrong
    const delta = isCorrect ? 1 : -1

    setScore({
      correct: Math.max(0, score.correct + delta),
      total: score.total + 1,
      streak: isCorrect ? score.streak + 1 : 0
    })
    setStage('done')
  }

  function onNext(){
    setQ(randomChallenge())
    setGuessName('')
    setFeedback(null)
    setStage('classify')
  }

  return (
    <div className="grid">
      <div className="card">
        <div className="section-title">Practice Mode — Step-by-step</div>
        <div className="headerband">Step 1: Decide if the compound is <b>Ionic</b> or <b>Covalent</b>. If correct, Step 2 unlocks: name it.</div>
        <div className="row" style={{alignItems:'center', marginTop:8}}>
          <div><span className="section-title">Formula Unit</span><div className="formula" dangerouslySetInnerHTML={{__html: formulaHTML}}/></div>
        </div>

        <div className="row" style={{marginTop:12}}>
          <div>
            <div className="section-title">Type</div>
            <select value={guessType} onChange={e=>setGuessType(e.target.value)} disabled={stage!=='classify'}>
              <option value="ionic">Ionic</option>
              <option value="covalent">Covalent</option>
            </select>
          </div>
          <div>
            <div className="section-title">Name</div>
            <input placeholder="Enter the compound name" value={guessName} onChange={e=>setGuessName(e.target.value)} disabled={stage!=='name'} />
          </div>
        </div>

        <div className="row" style={{marginTop:8}}>
          {stage==='classify' && <button className="success" onClick={onCheckType}>Check Type</button>}
          {stage==='name' && <button className="success" onClick={onCheckName}>Check Name</button>}
          <button className="ghost" onClick={onNext}>Next</button>
        </div>

        {feedback && (
          <div className="feedback" style={{marginTop:12}}>
            <div>{feedback.msg}</div>
            {feedback.accepted && feedback.accepted.length>0 && (
              <div style={{marginTop:6}}><b>Also accepted:</b> {feedback.accepted.join(', ')}</div>
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
