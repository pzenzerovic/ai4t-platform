import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ClipboardIcon, ArrowRightIcon } from '../common/Icons'
import { getLessonPlanCount } from '../../utils/lessonPlanLoader'

// A slim band below the category grid, deliberately quieter than the cards above
// it: the course is what the homepage is for, and the plans are the classroom
// evidence sitting next to it. Counted from the plan files themselves, never
// hardcoded — same rule as the lesson counts on the category cards.
export default function LessonPlansBand() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const planCount = getLessonPlanCount()

  if (planCount === 0) return null

  return (
    <section className="pb-16 sm:pb-20 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/${lang}/lesson-plans`}
          className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <ClipboardIcon className="w-6 h-6 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                {t('lessonPlans.homeTitle')}
              </h3>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                {planCount}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('lessonPlans.homeDesc')}
            </p>
          </div>

          <span className="text-accent font-semibold text-sm inline-flex items-center gap-1.5 flex-shrink-0 group-hover:translate-x-1 transition-transform">
            {t('lessonPlans.homeCta')}
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  )
}
