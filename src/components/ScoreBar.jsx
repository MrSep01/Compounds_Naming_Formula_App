import React from 'react'

export function ScoreBar({ score }) {
  const pct = score.total ? Math.round(100 * score.correct / score.total) : 0
  
  // Calculate grade based on percentage
  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A'
    if (percentage >= 80) return 'B'
    if (percentage >= 70) return 'C'
    if (percentage >= 60) return 'D'
    return 'F'
  }
  
  const grade = getGrade(pct)
  
  return (
    <div className='score'>
      <div className='pill success'>
        ✅ {score.correct}
        <span className='pill-label'>Correct</span>
      </div>
      <div className='pill error'>
        ❌ {score.total - score.correct}
        <span className='pill-label'>Incorrect</span>
      </div>
      <div className='pill streak'>
        🔥 {score.streak}
        <span className='pill-label'>Streak</span>
      </div>
      <div className={`pill grade grade-${grade.toLowerCase()}`}>
        🎯 {pct}%
        <span className='pill-label'>{grade}</span>
      </div>
    </div>
  )
}
