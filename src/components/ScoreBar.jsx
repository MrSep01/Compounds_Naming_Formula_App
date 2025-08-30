import React from 'react'
export function ScoreBar({score}){const pct=score.total?Math.round(100*score.correct/score.total):0;return(<div className='score'><div className='pill'>✅ {score.correct}</div><div className='pill'>❌ {score.total-score.correct}</div><div className='pill'>🔥 Streak: {score.streak}</div><div className='pill'>🎯 {pct}%</div></div>)}
