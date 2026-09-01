import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getQuiz } from '../../utils/quizLoader'

const HINT_KEYS = {
  single: 'quiz.hintSingle',
  multi: 'quiz.hintMulti',
  truefalse: 'quiz.hintTrueFalse',
}

function sameSet(a, b) {
  if (a.length !== b.length) return false
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((value, i) => value === sortedB[i])
}

// Self-check quiz shown at the end of a lesson.
// Click-only, no text input, and nothing is stored — reloading starts over.
export default function Quiz({ categorySlug, lessonSlug }) {
  const { t } = useTranslation()
  const quiz = getQuiz(categorySlug, lessonSlug)
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState(false)

  if (!quiz) return null

  const questions = quiz.questions

  const optionsFor = q =>
    q.type === 'truefalse'
      ? [{ id: 'true', text: t('quiz.true') }, { id: 'false', text: t('quiz.false') }]
      : q.options || []

  const answerFor = q => answers[q.id] || []
  const isCorrect = q => sameSet(answerFor(q), q.correct)
  const allAnswered = questions.every(q => answerFor(q).length > 0)
  const score = questions.filter(isCorrect).length

  function toggle(q, optionId) {
    if (checked) return
    setAnswers(prev => {
      const current = prev[q.id] || []
      if (q.type === 'multi') {
        return {
          ...prev,
          [q.id]: current.includes(optionId)
            ? current.filter(id => id !== optionId)
            : [...current, optionId],
        }
      }
      // single / truefalse — one answer, clicking it again clears it
      return { ...prev, [q.id]: current[0] === optionId ? [] : [optionId] }
    })
  }

  function reset() {
    setAnswers({})
    setChecked(false)
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">{t('quiz.title')}</h2>
      <p className="text-sm text-gray-500 mb-6">{t('quiz.subtitle')}</p>

      <div className="space-y-4">
        {questions.map((q, index) => {
          const given = answerFor(q)
          const questionCorrect = isCorrect(q)

          return (
            <div
              key={q.id}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5"
            >
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                {t('quiz.questionOf', { current: index + 1, total: questions.length })}
                <span className="normal-case tracking-normal"> — {t(HINT_KEYS[q.type] || HINT_KEYS.single)}</span>
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 leading-relaxed">
                {q.text}
              </h3>

              <div className="space-y-2.5" role="group" aria-label={q.text}>
                {optionsFor(q).map(option => {
                  const selected = given.includes(option.id)
                  const optionIsCorrect = q.correct.includes(option.id)
                  const isMulti = q.type === 'multi'

                  let stateClasses = 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  if (checked) {
                    if (optionIsCorrect) stateClasses = 'border-green-600 bg-green-50'
                    else if (selected) stateClasses = 'border-red-500 bg-red-50'
                    else stateClasses = 'border-gray-200 opacity-70'
                  } else if (selected) {
                    stateClasses = 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  }

                  let markerClasses = selected ? 'border-primary' : 'border-gray-300'
                  if (checked) {
                    if (optionIsCorrect) markerClasses = 'border-green-600 bg-green-600'
                    else if (selected) markerClasses = 'border-red-500 bg-red-500'
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggle(q, option.id)}
                      disabled={checked}
                      aria-pressed={selected}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all ${stateClasses} ${checked ? 'cursor-default' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-5 h-5 border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                            isMulti ? 'rounded' : 'rounded-full'
                          } ${markerClasses}`}
                        >
                          {checked && optionIsCorrect && (
                            <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          {checked && !optionIsCorrect && selected && (
                            <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z" clipRule="evenodd" />
                            </svg>
                          )}
                          {!checked && selected && (
                            isMulti
                              ? <span className="w-2.5 h-2.5 rounded-sm bg-primary" />
                              : <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                          )}
                        </span>
                        <span className={`text-sm leading-relaxed ${selected || (checked && optionIsCorrect) ? 'text-gray-900' : 'text-gray-700'}`}>
                          {option.text}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {checked && (
                <div
                  aria-live="polite"
                  className={`mt-4 p-3 sm:p-4 rounded-r-lg border-l-4 ${
                    questionCorrect ? 'bg-green-50 border-green-600' : 'bg-amber-50 border-accent'
                  }`}
                >
                  <p className={`text-sm font-semibold mb-1 ${questionCorrect ? 'text-green-800' : 'text-accent-dark'}`}>
                    {questionCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
        {!checked ? (
          <>
            <button
              type="button"
              onClick={() => setChecked(true)}
              disabled={!allAnswered}
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t('quiz.check')}
            </button>
            {!allAnswered && (
              <p className="text-sm text-gray-500">{t('quiz.answerAllFirst')}</p>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
          >
            {t('quiz.tryAgain')}
          </button>
        )}

        {/* The score lives in a live region that is present from the first render and
            empty until the quiz is checked. A live region inserted into the DOM
            together with its text is usually not announced at all, so mounting it
            up front is what makes "Check answers" audible (AIT-16, finding 7). */}
        <p role="status" aria-live="polite" className="text-sm font-medium text-gray-700">
          {checked ? t('quiz.score', { correct: score, total: questions.length }) : ''}
        </p>
      </div>
    </section>
  )
}
