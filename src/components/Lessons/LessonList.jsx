import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAllLessons } from '../../hooks/useContent'
import LessonCard from './LessonCard'
import CuratedLinks from './CuratedLinks'
import FilterBar from '../common/FilterBar'
import SearchBar from '../common/SearchBar'
import categories from '../../data/categories.json'
import curatedLinksData from '../../data/curated-links.json'

export default function LessonList() {
  const { t } = useTranslation()
  const { categorySlug } = useParams()
  const allLessons = useAllLessons()

  const [activeCategory, setActiveCategory] = useState(categorySlug || null)
  const [activeLevel, setActiveLevel] = useState(null)
  const [search, setSearch] = useState('')

  const filteredLessons = useMemo(() => {
    let result = allLessons

    if (activeCategory) {
      result = result.filter(l => l.category === activeCategory)
    }
    if (activeLevel) {
      result = result.filter(l => l.level === activeLevel)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(l =>
        l.title?.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q)
      )
    }

    return result
  }, [allLessons, activeCategory, activeLevel, search])

  const currentCategory = categories.find(c => c.slug === activeCategory)
  const curatedLinks = activeCategory ? curatedLinksData[activeCategory] || [] : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('resources.title')}</h1>

      {currentCategory && (
        <p className="text-gray-600 mb-6">{currentCategory.description}</p>
      )}

      <SearchBar value={search} onChange={setSearch} />
      <FilterBar
        activeCategory={activeCategory}
        activeLevel={activeLevel}
        onCategoryChange={setActiveCategory}
        onLevelChange={setActiveLevel}
      />

      {filteredLessons.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map(lesson => (
            <LessonCard key={`${lesson.category}-${lesson.slug}`} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">
            {allLessons.length === 0 ? t('resources.comingSoon') : t('resources.noResults')}
          </p>
        </div>
      )}

      {activeCategory && <CuratedLinks links={curatedLinks} />}
    </div>
  )
}
