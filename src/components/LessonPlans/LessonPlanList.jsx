import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLessonPlans } from '../../hooks/useContent'
import LessonPlanCard from './LessonPlanCard'
import usePageTitle from '../../hooks/usePageTitle'

export default function LessonPlanList() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const plans = useLessonPlans()
  usePageTitle(t('lessonPlans.title'))

  const implementedCount = plans.filter(p => p.implemented).length

  // The loader falls back to English for languages that have no plans of their
  // own, so the plans on screen may not be in the language of the surrounding
  // navigation. Saying so is cheaper than letting a Romanian visitor wonder
  // whether the page is broken.
  const servedLanguage = plans[0]?.language
  const showLanguageNotice = Boolean(servedLanguage) && servedLanguage !== lang

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('lessonPlans.title')}</h1>
      <p className="text-gray-600 max-w-3xl mb-4 leading-relaxed">{t('lessonPlans.intro')}</p>

      <p className="text-sm text-gray-500 mb-6">
        {t('lessonPlans.countSummary', {
          total: plans.length,
          implemented: implementedCount,
        })}
      </p>

      {showLanguageNotice && (
        <p className="text-sm text-gray-600 bg-warm-100 border border-warm-200 rounded-xl px-4 py-3 mb-6">
          {t('lessonPlans.englishNotice')}
        </p>
      )}

      {plans.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan => (
            <LessonPlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">{t('resources.comingSoon')}</p>
        </div>
      )}
    </div>
  )
}
