import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useKAS from '../../hooks/useKAS'
import KASProgress from './KASProgress'
import KASQuestion from './KASQuestion'
import KASResults from './KASResults'

export default function KASWizard() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const kas = useKAS()

  // React to URL changes: show results or reset to welcome
  useEffect(() => {
    if (searchParams.get('view') === 'results') {
      kas.viewResults()
    } else {
      kas.resetToWelcome()
    }
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  // Welcome screen
  if (kas.phase === 'welcome') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('kas.title')}</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          {t('kas.description')}
        </p>
        <button
          onClick={kas.start}
          className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg text-lg transition-colors shadow-lg"
        >
          {t('kas.startBtn')}
        </button>
      </div>
    )
  }

  // Results screen
  if (kas.phase === 'results') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <KASResults results={kas.results} onRetake={kas.retake} />
      </div>
    )
  }

  // Question screen
  const hasAnswer = !!kas.answers[kas.currentQ?.id]

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <KASProgress
        currentQuestion={kas.currentQuestion}
        totalQuestions={kas.totalQuestions}
        categoryIndex={kas.categoryIndex}
        totalCategories={kas.totalCategories}
        categoryName={kas.currentCategoryName}
      />

      <KASQuestion
        question={kas.currentQ}
        selectedAnswer={kas.answers[kas.currentQ?.id]}
        onSelect={kas.selectAnswer}
      />

      <div className="flex justify-between mt-8">
        <button
          onClick={kas.back}
          disabled={kas.currentQuestion === 0}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t('kas.backBtn')}
        </button>
        <button
          onClick={kas.next}
          disabled={!hasAnswer}
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {kas.currentQuestion === kas.totalQuestions - 1
            ? t('kas.getResults')
            : t('kas.nextBtn')
          }
        </button>
      </div>

      {!hasAnswer && (
        <p className="text-center text-sm text-gray-400 mt-4">{t('kas.selectAnswer')}</p>
      )}
    </div>
  )
}
