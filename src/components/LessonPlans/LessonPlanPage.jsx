import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLessonPlan, useLessonPlans } from '../../hooks/useContent'
import ImplementedBadge from './ImplementedBadge'
import MarkdownArticle from '../common/MarkdownArticle'
import { ChevronLeftIcon, ChevronRightIcon } from '../common/Icons'
import usePageTitle from '../../hooks/usePageTitle'

function MetaRow({ label, children }) {
  if (!children) return null
  return (
    <div className="sm:flex sm:gap-3 py-2 border-b border-gray-100 last:border-b-0">
      <dt className="text-sm text-gray-500 sm:w-40 sm:shrink-0">{label}</dt>
      <dd className="text-sm text-gray-800">{children}</dd>
    </div>
  )
}

export default function LessonPlanPage() {
  const { t } = useTranslation()
  const { lang, planSlug } = useParams()
  const plan = useLessonPlan(planSlug)
  const plans = useLessonPlans()
  // Called before the early return below so the hook order stays stable.
  usePageTitle(plan?.title)

  if (!plan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('lessonPlans.notFound')}</h1>
        <Link to={`/${lang}/lesson-plans`} className="text-accent hover:text-accent-dark">
          {t('lessonPlans.backToList')}
        </Link>
      </div>
    )
  }

  const currentIndex = plans.findIndex(p => p.slug === planSlug)
  const prevPlan = currentIndex > 0 ? plans[currentIndex - 1] : null
  const nextPlan = currentIndex < plans.length - 1 ? plans[currentIndex + 1] : null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link to={`/${lang}/`} className="hover:text-primary no-underline">{t('nav.home')}</Link>
        <span>/</span>
        <Link to={`/${lang}/lesson-plans`} className="hover:text-primary no-underline">
          {t('nav.lessonPlans')}
        </Link>
        <span>/</span>
        <span className="text-gray-700">{plan.title}</span>
      </nav>

      {/* Plan header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {plan.implemented && <ImplementedBadge size="md" />}
          <span className="text-sm text-gray-500">{plan.duration}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.title}</h1>
        {plan.subject && <p className="text-lg text-gray-600 mt-3">{plan.subject}</p>}
      </header>

      {/* At-a-glance panel — the frontmatter facts a teacher needs before reading
          the plan itself: who it is for, how long it takes, which tools it uses
          and, crucially, who used them and for what. */}
      <dl className="bg-white border border-gray-200 rounded-2xl px-5 py-3 mb-8">
        <MetaRow label={t('lessonPlans.ageGroup')}>{plan.ageGroup}</MetaRow>
        <MetaRow label={t('lessonPlans.duration')}>{plan.duration}</MetaRow>
        <MetaRow label={t('lessonPlans.aiTools')}>
          {plan.aiTools.length > 0 ? (
            <span className="flex flex-wrap gap-1.5">
              {plan.aiTools.map(tool => (
                <span
                  key={tool}
                  className="text-xs leading-none px-2 py-1 rounded-full bg-accent-50 text-accent-dark font-medium"
                >
                  {tool}
                </span>
              ))}
            </span>
          ) : (
            <span className="text-gray-500">{t('lessonPlans.noAiTools')}</span>
          )}
        </MetaRow>
        <MetaRow label={t('lessonPlans.aiUse')}>{plan.aiUse}</MetaRow>
        <MetaRow label={t('lessonPlans.author')}>{plan.author}</MetaRow>
        <MetaRow label={t('lessonPlans.school')}>{plan.school}</MetaRow>
        <MetaRow label={t('lessonPlans.classroomUse')}>{plan.implementationNote}</MetaRow>
      </dl>

      {/* Content — rendered by the same component as the course lessons, so a
          plan and a lesson read identically. */}
      <MarkdownArticle>{plan.content}</MarkdownArticle>

      {/* Discreet pointer to where the conversation about this material happens */}
      <div className="mt-8 text-center">
        <Link
          to={`/${lang}/community`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors no-underline"
        >
          {t('lessonPlans.discussWithColleagues')}
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-10 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center gap-4">
          {prevPlan ? (
            <Link
              to={`/${lang}/lesson-plans/${prevPlan.slug}`}
              className="flex items-center gap-2 text-primary hover:text-primary-dark no-underline"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <div>
                <div className="text-xs text-gray-500">{t('lessonPlans.previousPlan')}</div>
                <div className="font-medium text-sm">{prevPlan.title}</div>
              </div>
            </Link>
          ) : <div />}

          {nextPlan ? (
            <Link
              to={`/${lang}/lesson-plans/${nextPlan.slug}`}
              className="flex items-center gap-2 text-primary hover:text-primary-dark text-right no-underline"
            >
              <div>
                <div className="text-xs text-gray-500">{t('lessonPlans.nextPlan')}</div>
                <div className="font-medium text-sm">{nextPlan.title}</div>
              </div>
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          ) : <div />}
        </div>

        <div className="text-center mt-6">
          <Link
            to={`/${lang}/lesson-plans`}
            className="text-accent hover:text-accent-dark font-medium text-sm no-underline"
          >
            {t('lessonPlans.backToList')}
          </Link>
        </div>
      </nav>
    </div>
  )
}
