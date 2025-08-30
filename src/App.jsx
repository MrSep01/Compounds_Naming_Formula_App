import React, { useState } from 'react'
import Practice from './components/Practice.jsx'
import Builder from './components/Builder.jsx'
import Help from './components/Help.jsx'
import { ScoreBar } from './components/ScoreBar.jsx'
export default function App(){const [tab,setTab]=useState('practice');const [score,setScore]=useState({correct:0,total:0,streak:0});return(<div className='container'><div className='title'>🧪 Name That Compound! <span className='badge brand'>v0.5</span></div><div className='subtitle'>Build compounds, decide ionic vs covalent, and name them correctly. Includes a full built-in naming guide.</div><div className='topnav'>Student-friendly practice for naming compounds (IGCSE & A‑Level Edexcel).</div>
        <div className='tabs'><div className={tab==='practice'?'tab active':'tab'} onClick={()=>setTab('practice')}>Practice Mode</div><div className={tab==='builder'?'tab active':'tab'} onClick={()=>setTab('builder')}>Sandbox Builder</div><div className={tab==='help'?'tab active':'tab'} onClick={()=>setTab('help')}>Guide & Rules</div><div style={{flex:1}} /><ScoreBar score={score} /></div>{tab==='practice'&&<Practice score={score} setScore={setScore}/>} {tab==='builder'&&<Builder/>} {tab==='help'&&<Help/>}</div>)}
