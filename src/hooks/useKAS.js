import { useState, useCallback } from 'react'
import kasData from '../data/kas-questions.json'
import { calculateAllScores } from '../utils/scoring'

const totalQuestions = kasData.categories.reduce((sum, cat) => sum + cat.questions.length, 0)

export default function useKAS() {
  const [phase, setPhase] = useState('welcome') // welcome | questions | results
  const [currentQuestion, setCurrentQuestion] = useState(0) // 0 to totalQuestions-1
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  // Get all questions flat
  const allQuestions = kasData.categories.flatMap(cat =>
    cat.questions.map(q => ({ ...q, categoryId: cat.id, categoryName: cat.name }))
  )

  const currentQ = allQuestions[currentQuestion]

  // Which category section are we in?
  let questionIndex = 0
  let categoryIndex = 0
  let questionInCategory = 0
  for (let ci = 0; ci < kasData.categories.length; ci++) {
    const cat = kasData.categories[ci]
    if (currentQuestion < questionIndex + cat.questions.length) {
      categoryIndex = ci
      questionInCategory = currentQuestion - questionIndex
      break
    }
    questionIndex += cat.questions.length
  }

  const start = useCallback(() => {
    setPhase('questions')
    setCurrentQuestion(0)
    setAnswers({})
    setResults(null)
  }, [])

  const selectAnswer = useCallback((questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }, [])

  const next = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Calculate results
      const scores = calculateAllScores(answers, kasData.categories)
      setResults(scores)
      setPhase('results')
    }
  }, [currentQuestion, answers])

  const back = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }, [currentQuestion])

  const retake = useCallback(() => {
    setPhase('welcome')
    setCurrentQuestion(0)
    setAnswers({})
    setResults(null)
  }, [])

  return {
    phase,
    currentQuestion,
    totalQuestions,
    currentQ,
    categoryIndex,
    questionInCategory,
    totalCategories: kasData.categories.length,
    currentCategoryName: kasData.categories[categoryIndex]?.name,
    answers,
    results,
    start,
    selectAnswer,
    next,
    back,
    retake,
  }
}
