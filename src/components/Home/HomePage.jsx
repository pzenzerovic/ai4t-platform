import { useTranslation } from 'react-i18next'
import Hero from './Hero'
import ChooseYourPath from './ChooseYourPath'
import CategoryCard from './CategoryCard'
import categories from '../../data/categories.json'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      {/* 1. Warm hero — no CTAs */}
      <Hero />

      {/* 2. Choose Your Path — two-column fork */}
      <ChooseYourPath />

      {/* 3. Available Resource Topics */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-warm-50 via-accent-50/30 to-warm-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3 tracking-tight">
            {t('home.categoriesTitle')}
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto text-base sm:text-lg">
            {t('home.categoriesSubtitle')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
