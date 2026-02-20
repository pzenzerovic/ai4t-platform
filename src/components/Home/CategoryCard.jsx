import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CategoryIcon } from '../common/Icons'

export default function CategoryCard({ category }) {
  const { t } = useTranslation()
  const { lang } = useParams()

  return (
    <Link
      to={`/${lang}/resources/${category.slug}`}
      className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 no-underline"
    >
      {/* Colored top bar */}
      <div className="h-1.5" style={{ backgroundColor: category.color }} />

      {/* Card body */}
      <div
        className="p-6"
        style={{
          background: `linear-gradient(135deg, ${category.color}08 0%, white 60%)`,
        }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <CategoryIcon icon={category.icon} className="w-7 h-7" style={{ color: category.color }} />
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {t(category.nameKey)}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {category.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {category.lessonCount} {t('home.lessons')}
          </span>
          <span className="text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            {t('home.explore')} &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
