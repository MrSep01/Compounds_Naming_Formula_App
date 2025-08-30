import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreBar } from '../ScoreBar.jsx'

describe('ScoreBar Component', () => {
  it('renders with correct score information', () => {
    const score = { correct: 8, total: 10, streak: 5 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('✅ 8')).toBeInTheDocument()
    expect(screen.getByText('❌ 2')).toBeInTheDocument()
    expect(screen.getByText('🔥 5')).toBeInTheDocument()
    expect(screen.getByText('🎯 80%')).toBeInTheDocument()
  })

  it('displays correct labels', () => {
    const score = { correct: 8, total: 10, streak: 5 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('Correct')).toBeInTheDocument()
    expect(screen.getByText('Incorrect')).toBeInTheDocument()
    expect(screen.getByText('Streak')).toBeInTheDocument()
  })

  it('calculates percentage correctly', () => {
    const score = { correct: 7, total: 10, streak: 3 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('🎯 70%')).toBeInTheDocument()
  })

  it('handles zero score correctly', () => {
    const score = { correct: 0, total: 0, streak: 0 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('✅ 0')).toBeInTheDocument()
    expect(screen.getByText('❌ 0')).toBeInTheDocument()
    expect(screen.getByText('🔥 0')).toBeInTheDocument()
    expect(screen.getByText('🎯 0%')).toBeInTheDocument()
  })

  it('handles perfect score correctly', () => {
    const score = { correct: 10, total: 10, streak: 10 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('✅ 10')).toBeInTheDocument()
    expect(screen.getByText('❌ 0')).toBeInTheDocument()
    expect(screen.getByText('🔥 10')).toBeInTheDocument()
    expect(screen.getByText('🎯 100%')).toBeInTheDocument()
  })

  it('calculates incorrect answers correctly', () => {
    const score = { correct: 3, total: 10, streak: 2 }
    render(<ScoreBar score={score} />)
    
    // 10 total - 3 correct = 7 incorrect
    expect(screen.getByText('❌ 7')).toBeInTheDocument()
  })

  it('displays correct grade for A (90%+)', () => {
    const score = { correct: 9, total: 10, streak: 5 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('displays correct grade for B (80-89%)', () => {
    const score = { correct: 8, total: 10, streak: 4 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('displays correct grade for C (70-79%)', () => {
    const score = { correct: 7, total: 10, streak: 3 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('displays correct grade for D (60-69%)', () => {
    const score = { correct: 6, total: 10, streak: 2 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('D')).toBeInTheDocument()
  })

  it('displays correct grade for F (<60%)', () => {
    const score = { correct: 5, total: 10, streak: 1 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('F')).toBeInTheDocument()
  })

  it('handles decimal percentages correctly', () => {
    const score = { correct: 1, total: 3, streak: 1 }
    render(<ScoreBar score={score} />)
    
    // 1/3 = 33.33... should round to 33%
    expect(screen.getByText('🎯 33%')).toBeInTheDocument()
  })

  it('handles large numbers correctly', () => {
    const score = { correct: 95, total: 100, streak: 25 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('✅ 95')).toBeInTheDocument()
    expect(screen.getByText('❌ 5')).toBeInTheDocument()
    expect(screen.getByText('🔥 25')).toBeInTheDocument()
    expect(screen.getByText('🎯 95%')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('applies correct CSS classes for grades', () => {
    const score = { correct: 9, total: 10, streak: 5 }
    render(<ScoreBar score={score} />)
    
    const gradeElement = screen.getByText('A')
    expect(gradeElement.closest('.pill')).toHaveClass('grade-a')
  })

  it('handles edge case of single question', () => {
    const score = { correct: 1, total: 1, streak: 1 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('✅ 1')).toBeInTheDocument()
    expect(screen.getByText('❌ 0')).toBeInTheDocument()
    expect(screen.getByText('🔥 1')).toBeInTheDocument()
    expect(screen.getByText('🎯 100%')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('handles edge case of no questions attempted', () => {
    const score = { correct: 0, total: 0, streak: 0 }
    render(<ScoreBar score={score} />)
    
    expect(screen.getByText('✅ 0')).toBeInTheDocument()
    expect(screen.getByText('❌ 0')).toBeInTheDocument()
    expect(screen.getByText('🔥 0')).toBeInTheDocument()
    expect(screen.getByText('🎯 0%')).toBeInTheDocument()
    expect(screen.getByText('F')).toBeInTheDocument()
  })

  it('maintains proper structure with all score elements', () => {
    const score = { correct: 5, total: 8, streak: 3 }
    render(<ScoreBar score={score} />)
    
    const scoreContainer = screen.getByText('✅ 5').closest('.score')
    expect(scoreContainer).toBeInTheDocument()
    
    // Should have 4 pill elements: correct, incorrect, streak, grade
    const pills = scoreContainer.querySelectorAll('.pill')
    expect(pills).toHaveLength(4)
  })
})
