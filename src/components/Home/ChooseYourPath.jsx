import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CompassIcon, SearchIcon, ArrowRightIcon } from '../common/Icons'
import categories from '../../data/categories.json'

export default function ChooseYourPath() {
  const { t } = useTranslation()
  const { lang } = useParams()

  const steps = [
    t('home.pathNewStep1'),
    t('home.pathNewStep2'),
    t('home.pathNewStep3'),
  ]

  return (
    <section className="bg-gradient-to-b from-primary-50/80 to-warm-50 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3 tracking-tight">
          {t('home.choosePathTitle')}
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto text-base sm:text-lg">
          {t('home.choosePathSubtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Path A: New to AI — Recommended */}
          <div className="relative bg-white rounded-2xl border-2 border-primary/20 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="absolute -top-3.5 left-8">
              <span className="bg-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                {t('home.recommended')}
              </span>
            </div>

            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
              <CompassIcon className="w-7 h-7 text-primary" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('home.pathNewTitle')}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('home.pathNewDesc')}
            </p>

            {/* Visual 3-step mini-flow */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-8">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  {i > 0 && (
                    <span className="hidden sm:inline text-gray-300 text-lg">&rarr;</span>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold text-xs">{i + 1}</span>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{step}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to={`/${lang}/assessment`}
              className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl text-base transition-colors shadow-md hover:shadow-lg no-underline"
            >
              {t('home.pathNewCta')}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>

            <p className="text-xs text-gray-400 mt-3 text-center">
              {t('home.pathNewTime')}
            </p>
          </div>

          {/* Path B: Experienced — Browse Resources */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
              <SearchIcon className="w-7 h-7 text-accent" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('home.pathExperiencedTitle')}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('home.pathExperiencedDesc')}
            </p>

            {/* Category pills preview */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <span
                  key={cat.id}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{
                    backgroundColor: `${cat.color}12`,
                    color: cat.color,
                  }}
                >
                  {t(cat.nameKey)}
                </span>
              ))}
            </div>

            <Link
              to={`/${lang}/resources`}
              className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-colors shadow-md hover:shadow-lg no-underline"
            >
              {t('home.pathExperiencedCta')}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
