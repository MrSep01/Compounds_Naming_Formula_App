import React from 'react'

export default function Help(){
  return (
    <div className="card help">
      <h3>How to Use This Game</h3>
      <p>Step 1: Decide whether the compound is <b>Ionic</b> or <b>Covalent</b>. Step 2: Type the correct name. You’ll get instant feedback and friendly hints.</p>

      <h3>Ionic Compounds (IGCSE & A‑Level Edexcel)</h3>
      <ul>
        <li><b>Binary ionic</b> (Group 1/2 metal + non‑metal): metal name + non‑metal root + “ide”.<br/>Examples: NaCl → <i>sodium chloride</i>; MgO → <i>magnesium oxide</i>.</li>
        <li><b>Transition metals</b> (variable oxidation state): include a <b>Roman numeral</b> for the metal’s charge.<br/>Examples: FeCl₃ → <i>iron(III) chloride</i>; Cu₂O → <i>copper(I) oxide</i>.</li>
        <li><b>Polyatomic ions</b>: keep the ion’s name.<br/>Examples: NaNO₃ → <i>sodium nitrate</i>; (NH₄)₂SO₄ → <i>ammonium sulfate</i>.</li>
        <li><b>Parentheses</b> around a polyatomic ion only when more than one of that ion is present: Ca(OH)₂; Ba(NO₃)₂.</li>
        <li><b>Hydrates</b> (A‑Level extension): ionic name + prefix‑hydrate. Example: CuSO₄·5H₂O → <i>copper(II) sulfate pentahydrate</i>.</li>
      </ul>

      <h3>Covalent (Molecular) Compounds</h3>
      <ul>
        <li>Use <b>Greek prefixes</b> to show atom counts: mono‑, di‑, tri‑, tetra‑, penta‑, hexa‑, hepta‑, octa‑, nona‑, deca‑.</li>
        <li>First element: full name (omit “mono‑” if only one). Second element: root + “ide”.<br/>Examples: CO → <i>carbon monoxide</i>; CO₂ → <i>carbon dioxide</i>; N₂O₄ → <i>dinitrogen tetroxide</i>.</li>
        <li><b>Vowel drop</b>: “mono‑oxide” → “monoxide”, “penta‑oxide” → “pentoxide”.</li>
        <li><b>Common names accepted</b> in class: H₂O → <i>water</i>, NH₃ → <i>ammonia</i> (systematic also acceptable).</li>
      </ul>

      <h3>Ionic vs Covalent — Quick Clues</h3>
      <div className="tip">
        <ul>
          <li><b>Ionic</b>: metal + non‑metal or contains a polyatomic ion; high melting point; conducts when molten/aqueous.</li>
          <li><b>Covalent</b>: non‑metals only; molecules or giant structures; generally poor conductors (except graphite).</li>
        </ul>
      </div>

      <h3>Practice Examples</h3>
      <ul>
        <li>Ionic: Na₂S (<i>sodium sulfide</i>), FeCl₂ (<i>iron(II) chloride</i>), CuSO₄ (<i>copper(II) sulfate</i>), NH₄NO₃ (<i>ammonium nitrate</i>).</li>
        <li>Covalent: CO₂ (<i>carbon dioxide</i>), N₂O (<i>dinitrogen monoxide</i>), SO₃ (<i>sulfur trioxide</i>), PCl₅ (<i>phosphorus pentachloride</i>).</li>
      </ul>
    </div>
  )
}
