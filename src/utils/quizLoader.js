// Import all quiz definitions at build time using Vite's glob import.
//
// Layout: /src/data/quizzes/<lang>/<categorySlug>/<lessonSlug>.json
// This mirrors /src/content/<lang>/ deliberately — quizzes are lesson content and
// are translated alongside the lessons, so they are organised the same way. Adding
// a language means adding a folder; no code changes.
const quizFiles = import.meta.glob('/src/data/quizzes/**/*.json', { import: 'default', eager: true })

const FALLBACK_LANG = 'en'

function load(lang, categorySlug, lessonSlug) {
  const quiz = quizFiles[`/src/data/quizzes/${lang}/${categorySlug}/${lessonSlug}.json`]
  if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) return null
  return quiz
}

// Returns the quiz for a lesson in the requested language.
//
// Falls back to English when a translation is missing, so a partially translated
// language shows the English quiz rather than silently dropping the self-check.
// Returns null only when the lesson has no quiz at all in any language.
export function getQuiz(categorySlug, lessonSlug, lang = FALLBACK_LANG) {
  if (!categorySlug || !lessonSlug) return null
  return (
    load(lang, categorySlug, lessonSlug) ||
    (lang === FALLBACK_LANG ? null : load(FALLBACK_LANG, categorySlug, lessonSlug))
  )
}
