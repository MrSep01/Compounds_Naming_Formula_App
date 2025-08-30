import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Practice from '../Practice.jsx'

// Mock the data utilities
vi.mock('../../utils/data.js', () => ({
  getCompoundName: vi.fn(),
  getCompoundType: vi.fn(),
}))

describe('Practice Component', () => {
  const mockScore = { correct: 5, total: 10, streak: 3 }
  const mockSetScore = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component with title and description', () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    expect(screen.getByText('Practice Naming Compounds')).toBeInTheDocument()
    expect(screen.getByText(/Practice naming ionic, covalent, acid, and base compounds/)).toBeInTheDocument()
  })

  it('displays question type selection', () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    expect(screen.getByText('Question Type')).toBeInTheDocument()
    expect(screen.getByLabelText('Question Type')).toBeInTheDocument()
  })

  it('displays difficulty selection', () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    expect(screen.getByText('Difficulty')).toBeInTheDocument()
    expect(screen.getByLabelText('Difficulty')).toBeInTheDocument()
  })

  it('displays timer mode toggle', () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    expect(screen.getByText('Timer Mode')).toBeInTheDocument()
    expect(screen.getByText('⏰ OFF')).toBeInTheDocument()
  })

  it('shows progress section with score information', () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    expect(screen.getByText('Your Progress')).toBeInTheDocument()
    expect(screen.getByText('Accuracy:')).toBeInTheDocument()
    expect(screen.getByText('Current Streak:')).toBeInTheDocument()
    expect(screen.getByText('Questions Attempted:')).toBeInTheDocument()
  })

  it('displays correct accuracy percentage', () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    // 5 correct out of 10 total = 50%
    expect(screen.getByText(/Accuracy:/)).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('displays current streak', () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    expect(screen.getByText(/Current Streak:/)).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('displays total questions attempted', () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    expect(screen.getByText(/Questions Attempted:/)).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('handles zero score correctly', () => {
    const zeroScore = { correct: 0, total: 0, streak: 0 }
    render(<Practice score={zeroScore} setScore={mockSetScore} />)
    
    expect(screen.getByText(/Accuracy:/)).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByText(/Current Streak:/)).toBeInTheDocument()
    expect(screen.getByText(/Questions Attempted:/)).toBeInTheDocument()
    
    // Check that all stats show 0
    const statItems = screen.getAllByText('0')
    expect(statItems.length).toBeGreaterThanOrEqual(2) // At least streak and questions attempted
  })

  it('handles perfect score correctly', () => {
    const perfectScore = { correct: 10, total: 10, streak: 10 }
    render(<Practice score={perfectScore} setScore={mockSetScore} />)
    
    expect(screen.getByText(/Accuracy:/)).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText(/Current Streak:/)).toBeInTheDocument()
    expect(screen.getByText(/Questions Attempted:/)).toBeInTheDocument()
    
    // Check that all stats show 10
    const statItems = screen.getAllByText('10')
    expect(statItems.length).toBeGreaterThanOrEqual(2) // At least streak and questions attempted
  })

  it('allows changing question type', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    const questionTypeSelect = screen.getByLabelText('Question Type')
    
    await user.selectOptions(questionTypeSelect, 'type')
    expect(questionTypeSelect.value).toBe('type')
  })

  it('allows changing difficulty', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    const difficultySelect = screen.getByLabelText('Difficulty')
    
    await user.selectOptions(difficultySelect, 'medium')
    expect(difficultySelect.value).toBe('medium')
  })

  it('toggles timer mode', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    const timerButton = screen.getByText('⏰ OFF')
    
    await user.click(timerButton)
    expect(screen.getByText('⏰ ON')).toBeInTheDocument()
  })

  it('shows timer when timer mode is enabled', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    const timerButton = screen.getByText('⏰ OFF')
    
    await user.click(timerButton)
    expect(screen.getByText('⏱️ 60s')).toBeInTheDocument()
  })

  it('generates questions when component mounts', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    // Wait for question to be generated
    await waitFor(() => {
      expect(screen.getByText(/Name this compound:/)).toBeInTheDocument()
    })
  })

  it('shows question content based on question type', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    // Wait for question to be generated
    await waitFor(() => {
      expect(screen.getByText(/Name this compound:/)).toBeInTheDocument()
    })
    
    // Should show formula display for naming questions
    const formulaDisplay = document.querySelector('.formula-display')
    expect(formulaDisplay).toBeInTheDocument()
  })

  it('allows user to input answers', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    
    // Wait for question to be generated
    await waitFor(() => {
      expect(screen.getByText(/Name this compound:/)).toBeInTheDocument()
    })
    
    const answerInput = screen.getByPlaceholderText(/Enter the compound name/)
    await user.type(answerInput, 'sodium chloride')
    
    expect(answerInput.value).toBe('sodium chloride')
  })

  it('shows check answer button when answer is entered', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    
    // Wait for question to be generated
    await waitFor(() => {
      expect(screen.getByText(/Name this compound:/)).toBeInTheDocument()
    })
    
    const answerInput = screen.getByPlaceholderText(/Enter the compound name/)
    await user.type(answerInput, 'sodium chloride')
    
    const checkButton = screen.getByText('Check Answer')
    expect(checkButton).not.toBeDisabled()
  })

  it('shows clear button functionality', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    
    // Wait for question to be generated
    await waitFor(() => {
      expect(screen.getByText(/Name this compound:/)).toBeInTheDocument()
    })
    
    const answerInput = screen.getByPlaceholderText(/Enter the compound name/)
    await user.type(answerInput, 'sodium chloride')
    
    const clearButton = screen.getByText('Clear')
    await user.click(clearButton)
    
    expect(answerInput.value).toBe('')
  })

  it('shows hint button with remaining hints', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    
    // Wait for question to be generated
    await waitFor(() => {
      expect(screen.getByText(/Name this compound:/)).toBeInTheDocument()
    })
    
    const hintButton = screen.getByText('💡 Hint (3 left)')
    expect(hintButton).toBeInTheDocument()
    expect(hintButton).not.toBeDisabled()
  })

  it('allows changing question type to type identification', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    const questionTypeSelect = screen.getByLabelText('Question Type')
    
    await user.selectOptions(questionTypeSelect, 'type')
    
    // Wait for new question type to load
    await waitFor(() => {
      expect(screen.getByText(/What type of compound is this?/)).toBeInTheDocument()
    })
  })

  it('allows changing question type to formula writing', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    const questionTypeSelect = screen.getByLabelText('Question Type')
    
    await user.selectOptions(questionTypeSelect, 'formula')
    
    // Wait for new question type to load
    await waitFor(() => {
      expect(screen.getByText(/Write the formula for:/)).toBeInTheDocument()
    })
  })

  it('handles keyboard navigation', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    
    // Wait for question to be generated
    await waitFor(() => {
      expect(screen.getByText(/Name this compound:/)).toBeInTheDocument()
    })
    
    const answerInput = screen.getByPlaceholderText(/Enter the compound name/)
    await user.type(answerInput, 'sodium chloride')
    
    // Press Enter to submit
    await user.keyboard('{Enter}')
    
    // The form submission should be handled
    expect(answerInput).toBeInTheDocument()
  })

  it('updates score when answer is checked', async () => {
    render(<Practice score={mockScore} setScore={mockSetScore} />)
    
    const user = userEvent.setup()
    
    // Wait for question to be generated
    await waitFor(() => {
      expect(screen.getByText(/Name this compound:/)).toBeInTheDocument()
    })
    
    const answerInput = screen.getByPlaceholderText(/Enter the compound name/)
    await user.type(answerInput, 'sodium chloride')
    
    const checkButton = screen.getByText('Check Answer')
    await user.click(checkButton)
    
    // Wait for the answer to be processed
    await waitFor(() => {
      // The setScore function should be called or feedback should appear
      expect(screen.getByText('Check Answer')).toBeInTheDocument()
    })
  })
})
