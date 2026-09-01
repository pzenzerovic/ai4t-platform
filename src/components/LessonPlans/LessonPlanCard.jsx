import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ImplementedBadge from './ImplementedBadge'

// How many tools fit on a card before the row starts wrapping into a wall of
// chips. The rest are counted rather than listed; the plan page shows them all.
const MAX_TOOLS_SHOWN = 3

export default function LessonPlanCard({ plan }) {
  const { t } = useTranslation()
  const { lang } = useParams()

  const tools = plan.aiTools || []
  const shownTools = tools.slice(0, MAX_TOOLS_SHOWN)
  const hiddenToolCount = tools.length - shownTools.length

  return (
    <Link
      to={`/${lang}/lesson-plans/${plan.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 no-underline"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {plan.implemented && <ImplementedBadge />}
        <span className="text-xs text-gray-500">{plan.duration}</span>
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-snug">
        {plan.title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
        {plan.subject}
      </p>

      <dl className="mt-3 space-y-1 text-xs">
        <div className="flex gap-1.5">
          <dt className="text-gray-500 shrink-0">{t('lessonPlans.ageGroup')}:</dt>
          <dd className="text-gray-700 font-medium">{plan.ageGroup}</dd>
        </div>
      </dl>

      {tools.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {shownTools.map(tool => (
            <span
              key={tool}
              className="text-[11px] leading-none px-2 py-1 rounded-full bg-accent-50 text-accent-dark font-medium"
            >
              {tool}
            </span>
          ))}
          {hiddenToolCount > 0 && (
            <span className="text-[11px] leading-none px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
              +{hiddenToolCount}
            </span>
          )}
        </div>
      )}

      {/* mt-auto pins the attribution to the bottom so cards of different text
          lengths still line their footers up across the grid row. */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-700 font-medium">{plan.author}</p>
        {plan.school && plan.school !== plan.author && (
          <p className="text-xs text-gray-500">{plan.school}</p>
        )}
      </div>
    </Link>
  )
}
