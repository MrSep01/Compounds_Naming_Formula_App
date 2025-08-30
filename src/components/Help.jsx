import React from 'react'
import { ionComparison, acids, bases, molecularCompounds, stateSymbols, namingPatterns } from '../utils/data.js'

export default function Help() {
  return (
    <div className="help-container">
      <div className="card help">
        <h3>How to Use This Game</h3>
        <p>Step 1: Decide whether the compound is <b>Ionic</b> or <b>Covalent</b>. Step 2: Type the correct name. You'll get instant feedback and friendly hints.</p>

        <h3>Ionic Compounds (IGCSE & A‑Level Edexcel)</h3>
        <ul>
          <li><b>Binary ionic</b> (Group 1/2 metal + non‑metal): metal name + non‑metal root + "ide".<br/>Examples: NaCl → <i>sodium chloride</i>; MgO → <i>magnesium oxide</i>.</li>
          <li><b>Transition metals</b> (variable oxidation state): include a <b>Roman numeral</b> for the metal's charge.<br/>Examples: FeCl₃ → <i>iron(III) chloride</i>; Cu₂O → <i>copper(I) oxide</i>.</li>
          <li><b>Polyatomic ions</b>: keep the ion's name.<br/>Examples: NaNO₃ → <i>sodium nitrate</i>; (NH₄)₂SO₄ → <i>ammonium sulfate</i>.</li>
          <li><b>Parentheses</b> around a polyatomic ion only when more than one of that ion is present: Ca(OH)₂; Ba(NO₃)₂.</li>
          <li><b>Hydrates</b> (A‑Level extension): ionic name + prefix‑hydrate. Example: CuSO₄·5H₂O → <i>copper(II) sulfate pentahydrate</i>.</li>
        </ul>

        <h3>Covalent (Molecular) Compounds</h3>
        <ul>
          <li>Use <b>Greek prefixes</b> to show atom counts: mono‑, di‑, tri‑, tetra‑, penta‑, hexa‑, hepta‑, octa‑, nona‑, deca‑.</li>
          <li>First element: full name (omit "mono‑" if only one). Second element: root + "ide".<br/>Examples: CO → <i>carbon monoxide</i>; CO₂ → <i>carbon dioxide</i>; N₂O₄ → <i>dinitrogen tetroxide</i>.</li>
          <li><b>Vowel drop</b>: "mono‑oxide" → "monoxide", "penta‑oxide" → "pentoxide".</li>
          <li><b>Common names accepted</b> in class: H₂O → <i>water</i>, NH₃ → <i>ammonia</i> (systematic also acceptable).</li>
        </ul>

        <h3>🧪 Acids & Bases</h3>
        <h4>Binary Acids</h4>
        <ul>
          <li><b>Pattern:</b> H + non-metal → hydro[non-metal root]ic acid</li>
          <li><b>Examples:</b> HCl(aq) → <i>hydrochloric acid</i>, HBr(aq) → <i>hydrobromic acid</i></li>
          <li><b>State:</b> Always aqueous (aq) - dissolved in water</li>
        </ul>

        <h4>Oxyacids</h4>
        <ul>
          <li><b>Pattern:</b> H + polyatomic → [polyatomic root]ic/ous acid</li>
          <li><b>More oxygen:</b> -ate → -ic (H₂SO₄ → <i>sulfuric acid</i>)</li>
          <li><b>Less oxygen:</b> -ite → -ous (H₂SO₃ → <i>sulfurous acid</i>)</li>
          <li><b>Special prefixes:</b> per...ate → per...ic (HClO₄ → <i>perchloric acid</i>)</li>
          <li><b>Special prefixes:</b> hypo...ite → hypo...ous (HClO → <i>hypochlorous acid</i>)</li>
        </ul>

        <h4>Bases</h4>
        <ul>
          <li><b>Metal hydroxides:</b> Metal + OH → [metal] hydroxide</li>
          <li><b>Examples:</b> NaOH(aq) → <i>sodium hydroxide</i>, Ca(OH)₂(aq) → <i>calcium hydroxide</i></li>
          <li><b>Ammonia:</b> NH₃(g) → NH₄OH(aq) → <i>ammonium hydroxide</i></li>
        </ul>

        <h3>⚗️ State Symbols & Naming Differences</h3>
        <div className="state-symbols-grid">
          {stateSymbols.map((state, index) => (
            <div key={index} className="state-symbol-card">
              <div className="state-symbol">{state.symbol}</div>
              <div className="state-name">{state.name}</div>
              <div className="state-description">{state.description}</div>
            </div>
          ))}
        </div>

        <h4>Key Distinction: Molecular vs Aqueous</h4>
        <div className="callout">
          <strong>Example:</strong> HCl(g) = hydrogen chloride (covalent gas molecule), HCl(aq) = hydrochloric acid (aqueous solution)
        </div>
        <ul>
          <li><b>Molecular form (g):</b> Covalent molecule, poor conductor, gas at room temperature</li>
          <li><b>Aqueous form (aq):</b> Dissolved in water, good conductor, acidic/basic properties</li>
          <li><b>Naming changes:</b> Different naming conventions apply based on state</li>
        </ul>

        <h3>📊 Ion Comparison Table</h3>
        <div className="ion-comparison-table">
          {ionComparison.map((element, index) => (
            <div key={index} className="ion-element-card">
              <div className="element-header">
                <h4>{element.element} ({element.symbol})</h4>
              </div>
              
              <div className="ion-types">
                <div className="ion-type elemental">
                  <div className="ion-header">Elemental Ion</div>
                  <div className="ion-symbol">{element.elemental.symbol}</div>
                  <div className="ion-name">{element.elemental.name}</div>
                  <div className="ion-charge">Charge: {element.elemental.charge}</div>
                </div>
                
                <div className="ion-arrow">→</div>
                
                <div className="ion-type polyatomic">
                  <div className="ion-header">Polyatomic Ions</div>
                  {element.polyatomic.map((ion, ionIndex) => (
                    <div key={ionIndex} className="polyatomic-ion">
                      <div className="ion-symbol">{ion.symbol}</div>
                      <div className="ion-name">{ion.name}</div>
                      <div className="ion-pattern">{ion.pattern}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

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
          <li>Acids: HCl(aq) (<i>hydrochloric acid</i>), H₂SO₄(aq) (<i>sulfuric acid</i>), HNO₃(aq) (<i>nitric acid</i>).</li>
          <li>Bases: NaOH(aq) (<i>sodium hydroxide</i>), Ca(OH)₂(aq) (<i>calcium hydroxide</i>), NH₄OH(aq) (<i>ammonium hydroxide</i>).</li>
        </ul>
      </div>
    </div>
  )
}
