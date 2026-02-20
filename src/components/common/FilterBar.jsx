import { useTranslation } from 'react-i18next'
import categories from '../../data/categories.json'

export default function FilterBar({ activeCategory, activeLevel, onCategoryChange, onLevelChange }) {
  const { t } = useTranslation()

  const levels = ['all', 'beginner', 'intermediate', 'advanced']

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !activeCategory
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {t('resources.all')}
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat.slug
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t(cat.nameKey)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 sm:ml-auto">
        {levels.map(level => (
          <button
            key={level}
            onClick={() => onLevelChange(level === 'all' ? null : level)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              (level === 'all' && !activeLevel) || activeLevel === level
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {level === 'all' ? t('resources.allLevels') : t(`levels.${level}`)}
          </button>
        ))}
      </div>
    </div>
  )
}
