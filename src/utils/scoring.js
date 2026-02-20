export function calculateCategoryScore(answers, categoryQuestions) {
  let score = 0
  for (const question of categoryQuestions) {
    const answerId = answers[question.id]
    if (answerId) {
      const option = question.options.find(o => o.id === answerId)
      if (option) score += option.score
    }
  }
  return score
}

export function getLevel(score) {
  if (score <= 3) return 'beginner'
  if (score <= 7) return 'intermediate'
  return 'advanced'
}

export function calculateAllScores(answers, categories) {
  return categories.map(cat => {
    const score = calculateCategoryScore(answers, cat.questions)
    return {
      categoryId: cat.id,
      categoryName: cat.name,
      score,
      maxScore: 10,
      level: getLevel(score),
      feedback: cat.feedback[getLevel(score)],
    }
  })
}
