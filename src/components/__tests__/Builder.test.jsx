import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Builder from '../Builder.jsx'

// Mock the data utilities
vi.mock('../../utils/data.js', () => ({
  cations: [
    { symbol: 'Na+', core: 'Na', name: 'sodium', charge: 1, poly: false },
    { symbol: 'K+', core: 'K', name: 'potassium', charge: 1, poly: false },
    { symbol: 'Ca2+', core: 'Ca', name: 'calcium', charge: 2, poly: false },
    { symbol: 'Al3+', core: 'Al', name: 'aluminium', charge: 3, poly: false },
    { symbol: 'NH4+', core: 'NH4', name: 'ammonium', charge: 1, poly: true },
  ],
  anions: [
    { symbol: 'Cl-', core: 'Cl', name: 'chloride', charge: -1, poly: false },
    { symbol: 'O2-', core: 'O', name: 'oxide', charge: -2, poly: false },
    { symbol: 'OH-', core: 'OH', name: 'hydroxide', charge: -1, poly: true },
    { symbol: 'SO4 2-', core: 'SO4', name: 'sulfate', charge: -2, poly: true },
    { symbol: 'NO3-', core: 'NO3', name: 'nitrate', charge: -1, poly: true },
  ],
  nonmetals: [
    { symbol: 'H', name: 'hydrogen' },
    { symbol: 'C', name: 'carbon' },
    { symbol: 'N', name: 'nitrogen' },
    { symbol: 'O', name: 'oxygen' },
    { symbol: 'F', name: 'fluorine' },
    { symbol: 'Cl', name: 'chlorine' },
    { symbol: 'S', name: 'sulfur' },
  ],
  acids: [
    { formula: 'HCl', name: 'hydrochloric acid', type: 'binary', elements: ['H', 'Cl'], state: 'aq' },
    { formula: 'H2SO4', name: 'sulfuric acid', type: 'oxyacid', elements: ['H', 'SO4'], state: 'aq' },
  ],
  bases: [
    { formula: 'NaOH', name: 'sodium hydroxide', type: 'metal hydroxide', elements: ['Na', 'OH'], state: 'aq' },
    { formula: 'Ca(OH)2', name: 'calcium hydroxide', type: 'metal hydroxide', elements: ['Ca', 'OH'], state: 'aq' },
  ],
  elementRoot: vi.fn((symbol) => {
    const roots = { 'H': 'hydr', 'Cl': 'chlor', 'F': 'fluor', 'S': 'sulf' }
    return roots[symbol] || symbol.toLowerCase()
  }),
  formatFormula: vi.fn((parts) => {
    return parts.map(p => `${p.symbol}${p.count > 1 ? p.count : ''}`).join('')
  }),
  nameIonicFromParts: vi.fn((cation, anion) => `${cation.name} ${anion.name}`),
  nameCovalentFromParts: vi.fn((e1, n1, e2, n2) => `${e1.name} ${e2.name}`),
  ionTokenHtml: vi.fn((core, charge) => `${core}${charge > 0 ? '+' : charge < 0 ? '-' : ''}`),
  covalentLooksCommon: vi.fn(() => true),
}))

describe('Builder Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component with title and description', () => {
    render(<Builder />)
    
    expect(screen.getByText('Sandbox Builder')).toBeInTheDocument()
    expect(screen.getByText(/Build compounds step by step/)).toBeInTheDocument()
  })

  it('shows mode selection buttons', () => {
    render(<Builder />)
    
    expect(screen.getByRole('button', { name: 'Ionic Compounds' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Covalent Compounds' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Acids' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Bases' })).toBeInTheDocument()
  })

  it('starts with ionic mode selected by default', () => {
    render(<Builder />)
    
    const ionicButton = screen.getByRole('button', { name: 'Ionic Compounds' })
    expect(ionicButton).toHaveClass('active')
  })

  describe('Ionic Mode', () => {
    it('shows ionic compound building interface when selected', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Ionic Compounds' }))
      
      expect(screen.getByText('Cation (Positive Ion)')).toBeInTheDocument()
      expect(screen.getByText('Anion (Negative Ion)')).toBeInTheDocument()
    })

    it('allows selection of cation and anion', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Ionic Compounds' }))
      
      const cationSelect = screen.getByLabelText('Cation (Positive Ion)')
      const anionSelect = screen.getByLabelText('Anion (Negative Ion)')
      
      expect(cationSelect).toBeInTheDocument()
      expect(anionSelect).toBeInTheDocument()
    })
  })

  describe('Covalent Mode', () => {
    it('shows covalent compound building interface when selected', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Covalent Compounds' }))
      
      expect(screen.getByText('Element 1')).toBeInTheDocument()
      expect(screen.getByText('Element 2')).toBeInTheDocument()
    })

    it('allows selection of elements and counts', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Covalent Compounds' }))
      
      const element1Select = screen.getByLabelText('Element 1')
      const element2Select = screen.getByLabelText('Element 2')
      const count1Input = screen.getByDisplayValue('1')
      const count2Input = screen.getByDisplayValue('2')
      
      expect(element1Select).toBeInTheDocument()
      expect(element2Select).toBeInTheDocument()
      expect(count1Input).toBeInTheDocument()
      expect(count2Input).toBeInTheDocument()
    })
  })

  describe('Acids Mode', () => {
    it('shows acids building interface when selected', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Acids' }))
      
      expect(screen.getByText('Binary Acids (H + Non-metal)')).toBeInTheDocument()
      expect(screen.getByText('Oxyacids (H + Polyatomic)')).toBeInTheDocument()
    })

    it('starts with binary acids selected by default', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Acids' }))
      
      const binaryButton = screen.getByText('Binary Acids (H + Non-metal)')
      expect(binaryButton).toHaveClass('active')
    })

    it('shows binary acid interface with non-metal selection', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Acids' }))
      
      expect(screen.getByText('Non-metal Element')).toBeInTheDocument()
      expect(screen.getByText(/Select a non-metal that can form binary acids/)).toBeInTheDocument()
    })

    it('shows oxyacid interface when oxyacid button is clicked', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Acids' }))
      await user.click(screen.getByText('Oxyacids (H + Polyatomic)'))
      
      expect(screen.getByText('Polyatomic Ion')).toBeInTheDocument()
      expect(screen.getByText(/Select a polyatomic ion with oxygen/)).toBeInTheDocument()
    })

    it('displays acid formula and name', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Acids' }))
      
      // Wait for the acid interface to render
      await waitFor(() => {
        expect(screen.getByText('Acid Formula')).toBeInTheDocument()
        expect(screen.getByText('Acid Name')).toBeInTheDocument()
        expect(screen.getByText('State')).toBeInTheDocument()
      })
    })
  })

  describe('Bases Mode', () => {
    it('shows bases building interface when selected', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Bases' }))
      
      expect(screen.getByText('Metal Cation')).toBeInTheDocument()
      expect(screen.getByText('OH Groups')).toBeInTheDocument()
    })

    it('allows selection of metal cation and OH count', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Bases' }))
      
      const metalSelect = screen.getByLabelText('Metal Cation')
      const ohCountInput = screen.getByLabelText('OH Groups')
      
      expect(metalSelect).toBeInTheDocument()
      expect(ohCountInput).toBeInTheDocument()
    })

    it('displays base formula and name', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Bases' }))
      
      // Wait for the base interface to render
      await waitFor(() => {
        expect(screen.getByText('Base Formula')).toBeInTheDocument()
        expect(screen.getByText('Base Name')).toBeInTheDocument()
        expect(screen.getByText('State')).toBeInTheDocument()
      })
    })
  })

  describe('Mode Switching', () => {
    it('switches between different modes correctly', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      
      // Start with ionic (default)
      expect(screen.getByRole('button', { name: 'Ionic Compounds' })).toHaveClass('active')
      
      // Switch to covalent
      await user.click(screen.getByRole('button', { name: 'Covalent Compounds' }))
      expect(screen.getByRole('button', { name: 'Covalent Compounds' })).toHaveClass('active')
      expect(screen.getByRole('button', { name: 'Ionic Compounds' })).not.toHaveClass('active')
      
      // Switch to acids
      await user.click(screen.getByRole('button', { name: 'Acids' }))
      expect(screen.getByRole('button', { name: 'Acids' })).toHaveClass('active')
      expect(screen.getByRole('button', { name: 'Covalent Compounds' })).not.toHaveClass('active')
      
      // Switch to bases
      await user.click(screen.getByRole('button', { name: 'Bases' }))
      expect(screen.getByRole('button', { name: 'Bases' })).toHaveClass('active')
      expect(screen.getByRole('button', { name: 'Acids' })).not.toHaveClass('active')
    })
  })

  describe('Help Section', () => {
    it('displays comprehensive help information', () => {
      render(<Builder />)
      
      expect(screen.getByText('How It Works')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Ionic Compounds' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Covalent Compounds' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Acids' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Bases' })).toBeInTheDocument()
      expect(screen.getByText('Naming Rules')).toBeInTheDocument()
    })

    it('includes naming rules for all compound types', () => {
      render(<Builder />)
      
      const namingRules = screen.getByText('Naming Rules').closest('div')
      expect(namingRules).toHaveTextContent('Ionic:')
      expect(namingRules).toHaveTextContent('Covalent:')
      expect(namingRules).toHaveTextContent('Binary Acids:')
      expect(namingRules).toHaveTextContent('Oxyacids:')
      expect(namingRules).toHaveTextContent('Bases:')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<Builder />)
      
      const ionicButton = screen.getByRole('button', { name: 'Ionic Compounds' })
      expect(ionicButton).toHaveAttribute('aria-pressed', 'true')
      
      const covalentButton = screen.getByRole('button', { name: 'Covalent Compounds' })
      expect(covalentButton).toHaveAttribute('aria-pressed', 'false')
    })

    it('has proper form labels and help text', async () => {
      render(<Builder />)
      
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Ionic Compounds' }))
      
      expect(screen.getByText('Cation (Positive Ion)')).toBeInTheDocument()
      expect(screen.getByText('Select a positively charged ion')).toBeInTheDocument()
    })
  })
})
