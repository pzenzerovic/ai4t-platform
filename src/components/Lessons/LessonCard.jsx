import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LevelBadge from './LevelBadge'

export default function LessonCard({ lesson }) {
  const { t } = useTranslation()
  const { lang } = useParams()

  return (
    <Link
      to={`/${lang}/lesson/${lesson.category}/${lesson.slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 no-underline"
    >
      <div className="flex items-center gap-2 mb-3">
        <LevelBadge level={lesson.level} />
        <span className="text-xs text-gray-400">
          {lesson.readingTime} {t('resources.readTime')}
        </span>
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-snug">
        {lesson.title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
        {lesson.description}
      </p>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {t(`categories.${lesson.category}`)}
        </span>
      </div>
    </Link>
  )
}
