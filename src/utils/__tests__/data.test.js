import { describe, it, expect } from 'vitest'
import { 
  cations, 
  anions, 
  nonmetals, 
  acids, 
  bases, 
  elementRoot, 
  nameBinaryAcid, 
  nameOxyacid, 
  nameBase,
  getCompoundName,
  compareForms
} from '../data.js'

describe('Data Utilities', () => {
  describe('elementRoot function', () => {
    it('should return correct root for hydrogen', () => {
      expect(elementRoot('H')).toBe('hydr')
    })

    it('should return correct root for chlorine', () => {
      expect(elementRoot('Cl')).toBe('chlor')
    })

    it('should return correct root for sulfur', () => {
      expect(elementRoot('S')).toBe('sulf')
    })

    it('should return lowercase symbol for unknown elements', () => {
      expect(elementRoot('X')).toBe('x')
    })
  })

  describe('nameBinaryAcid function', () => {
    it('should name hydrochloric acid correctly', () => {
      expect(nameBinaryAcid('Cl')).toBe('hydrochloric acid')
    })

    it('should name hydrofluoric acid correctly', () => {
      expect(nameBinaryAcid('F')).toBe('hydrofluoric acid')
    })

    it('should name hydrobromic acid correctly', () => {
      expect(nameBinaryAcid('Br')).toBe('hydrobromic acid')
    })
  })

  describe('nameOxyacid function', () => {
    it('should convert -ate to -ic acid', () => {
      expect(nameOxyacid('sulfate', true)).toBe('sulfic acid')
    })

    it('should convert -ite to -ous acid', () => {
      expect(nameOxyacid('sulfite', false)).toBe('sulfous acid')
    })
  })

  describe('nameBase function', () => {
    it('should name single hydroxide base correctly', () => {
      expect(nameBase('sodium', 1)).toBe('sodium hydroxide')
    })

    it('should name multiple hydroxide base correctly', () => {
      expect(nameBase('calcium', 2)).toBe('calcium hydroxide')
    })
  })

  describe('getCompoundName function', () => {
    it('should return acid name for aqueous HCl', () => {
      expect(getCompoundName('HCl', 'aq')).toBe('hydrochloric acid')
    })

    it('should return base name for aqueous NaOH', () => {
      expect(getCompoundName('NaOH', 'aq')).toBe('sodium hydroxide')
    })

    it('should return molecular name for gaseous HCl', () => {
      expect(getCompoundName('HCl', 'g')).toBe('hydrogen chloride')
    })

    it('should return formula for unknown compound', () => {
      expect(getCompoundName('Unknown', 'aq')).toBe('Unknown')
    })
  })

  describe('compareForms function', () => {
    it('should compare molecular and aqueous forms of HCl', () => {
      const result = compareForms('HCl')
      expect(result).toBeTruthy()
      expect(result.molecular.name).toBe('hydrogen chloride')
      expect(result.aqueous.name).toBe('hydrochloric acid')
      expect(result.molecular.state).toBe('g')
      expect(result.aqueous.state).toBe('aq')
    })

    it('should return null for unknown compound', () => {
      expect(compareForms('Unknown')).toBeNull()
    })
  })
})

describe('Data Arrays', () => {
  describe('cations', () => {
    it('should contain common metal cations', () => {
      const symbols = cations.map(c => c.symbol)
      expect(symbols).toContain('Na+')
      expect(symbols).toContain('K+')
      expect(symbols).toContain('Ca2+')
      expect(symbols).toContain('Al3+')
    })

    it('should have correct structure for each cation', () => {
      cations.forEach(cation => {
        expect(cation).toHaveProperty('symbol')
        expect(cation).toHaveProperty('core')
        expect(cation).toHaveProperty('name')
        expect(cation).toHaveProperty('charge')
        expect(typeof cation.charge).toBe('number')
      })
    })
  })

  describe('anions', () => {
    it('should contain common anions', () => {
      const symbols = anions.map(a => a.symbol)
      expect(symbols).toContain('Cl-')
      expect(symbols).toContain('O2-')
      expect(symbols).toContain('OH-')
      expect(symbols).toContain('SO4 2-')
    })

    it('should have correct structure for each anion', () => {
      anions.forEach(anion => {
        expect(anion).toHaveProperty('symbol')
        expect(anion).toHaveProperty('core')
        expect(anion).toHaveProperty('name')
        expect(anion).toHaveProperty('charge')
        expect(typeof anion.charge).toBe('number')
      })
    })
  })

  describe('nonmetals', () => {
    it('should contain common nonmetal elements', () => {
      const symbols = nonmetals.map(n => n.symbol)
      expect(symbols).toContain('H')
      expect(symbols).toContain('C')
      expect(symbols).toContain('N')
      expect(symbols).toContain('O')
      expect(symbols).toContain('F')
      expect(symbols).toContain('Cl')
      expect(symbols).toContain('S')
    })

    it('should have correct structure for each nonmetal', () => {
      nonmetals.forEach(nonmetal => {
        expect(nonmetal).toHaveProperty('symbol')
        expect(nonmetal).toHaveProperty('name')
      })
    })
  })

  describe('acids', () => {
    it('should contain binary acids', () => {
      const binaryAcids = acids.filter(a => a.type === 'binary')
      expect(binaryAcids.length).toBeGreaterThan(0)
      
      const hcl = binaryAcids.find(a => a.formula === 'HCl')
      expect(hcl).toBeTruthy()
      expect(hcl.name).toBe('hydrochloric acid')
    })

    it('should contain oxyacids', () => {
      const oxyacids = acids.filter(a => a.type === 'oxyacid')
      expect(oxyacids.length).toBeGreaterThan(0)
      
      const h2so4 = oxyacids.find(a => a.formula === 'H2SO4')
      expect(h2so4).toBeTruthy()
      expect(h2so4.name).toBe('sulfuric acid')
    })

    it('should have correct structure for each acid', () => {
      acids.forEach(acid => {
        expect(acid).toHaveProperty('formula')
        expect(acid).toHaveProperty('name')
        expect(acid).toHaveProperty('type')
        expect(acid).toHaveProperty('elements')
        expect(acid).toHaveProperty('state')
        expect(acid.state).toBe('aq')
      })
    })
  })

  describe('bases', () => {
    it('should contain metal hydroxides', () => {
      const metalHydroxides = bases.filter(b => b.type === 'metal hydroxide')
      expect(metalHydroxides.length).toBeGreaterThan(0)
      
      const naoh = metalHydroxides.find(b => b.formula === 'NaOH')
      expect(naoh).toBeTruthy()
      expect(naoh.name).toBe('sodium hydroxide')
    })

    it('should contain ammonium hydroxide', () => {
      const nh4oh = bases.find(b => b.formula === 'NH4OH')
      expect(nh4oh).toBeTruthy()
      expect(nh4oh.name).toBe('ammonium hydroxide')
    })

    it('should have correct structure for each base', () => {
      bases.forEach(base => {
        expect(base).toHaveProperty('formula')
        expect(base).toHaveProperty('name')
        expect(base).toHaveProperty('type')
        expect(base).toHaveProperty('elements')
        expect(base).toHaveProperty('state')
        expect(base.state).toBe('aq')
      })
    })
  })
})
