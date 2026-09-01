// Import all quiz definitions at build time using Vite's glob import.
// Layout: /src/data/quizzes/<categorySlug>/<lessonSlug>.json
const quizFiles = import.meta.glob('/src/data/quizzes/**/*.json', { import: 'default', eager: true })

// Returns the quiz for a lesson, or null when that lesson has no quiz yet.
// Quizzes are authored in English only for now, so they are not language-scoped.
export function getQuiz(categorySlug, lessonSlug) {
  if (!categorySlug || !lessonSlug) return null
  const quiz = quizFiles[`/src/data/quizzes/${categorySlug}/${lessonSlug}.json`]
  if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) return null
  return quiz
}
