import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import RadarChart from './RadarChart'
import LevelBadge from '../Lessons/LevelBadge'
import { ExternalLinkIcon } from '../common/Icons'
import { generateLearningPath } from '../../utils/learningPath'

export default function KASResults({ results, onRetake }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const resultsRef = useRef(null)

  const learningPath = generateLearningPath(results, lang)

  const handlePrint = () => {
    window.print()
  }

  const handlePDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default
    const element = resultsRef.current
    html2pdf().set({
      margin: 10,
      filename: 'AI4Teachers-Assessment-Results.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).from(element).save()
  }

  const firstLessonLink = learningPath.find(item => item.type === 'lesson')

  return (
    <div ref={resultsRef}>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('kas.resultsTitle')}</h1>
      </div>

      {/* Radar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <RadarChart scores={results} />
      </div>

      {/* Category Breakdown */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {results.map(r => (
          <div key={r.categoryId} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{r.categoryName}</h3>
              <LevelBadge level={r.level} />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-500">{t('kas.score')}:</span>
              <span className="text-lg font-bold text-primary">{r.score}/{r.maxScore}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{r.feedback}</p>
          </div>
        ))}
      </div>

      {/* Learning Path */}
      <section className="bg-gray-50 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('kas.learningPathTitle')}</h2>
        <p className="text-gray-600 mb-6">{t('kas.learningPathDesc')}</p>

        <div className="space-y-3">
          {learningPath.length > 0 ? learningPath.map((item, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                {item.type === 'lesson' ? (
                  <Link
                    to={`/${lang}/lesson/${item.categorySlug}/${item.slug}`}
                    className="font-medium text-gray-900 hover:text-primary no-underline"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 hover:text-primary no-underline inline-flex items-center gap-1"
                  >
                    {item.title} <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{item.category}</span>
                  {item.readingTime && (
                    <span className="text-xs text-gray-400">{item.readingTime} {t('resources.readTime')}</span>
                  )}
                  {item.provider && (
                    <span className="text-xs text-gray-400">{item.provider}</span>
                  )}
                </div>
              </div>
              <LevelBadge level={item.level} />
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4">
              {t('resources.comingSoon')}
            </p>
          )}
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center print:hidden">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
        >
          {t('kas.printBtn')}
        </button>
        <button
          onClick={handlePDF}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
        >
          {t('kas.pdfBtn')}
        </button>
        {firstLessonLink && (
          <Link
            to={`/${lang}/lesson/${firstLessonLink.categorySlug}/${firstLessonLink.slug}`}
            className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors no-underline"
          >
            {t('kas.startLearning')}
          </Link>
        )}
        <button
          onClick={onRetake}
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
        >
          {t('kas.retakeBtn')}
        </button>
      </div>
    </div>
  )
}
