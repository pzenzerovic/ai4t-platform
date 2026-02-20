import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLesson, useLessonsByCategory } from '../../hooks/useContent'
import LevelBadge from './LevelBadge'
import CuratedLinks from './CuratedLinks'
import { ChevronLeftIcon, ChevronRightIcon } from '../common/Icons'
import categories from '../../data/categories.json'

export default function LessonPage() {
  const { t } = useTranslation()
  const { lang, categorySlug, lessonSlug } = useParams()
  const lesson = useLesson(categorySlug, lessonSlug)
  const categoryLessons = useLessonsByCategory(categorySlug)

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h1>
        <Link to={`/${lang}/resources`} className="text-accent hover:text-accent-dark">
          {t('resources.backToResources')}
        </Link>
      </div>
    )
  }

  const currentIndex = categoryLessons.findIndex(l => l.slug === lessonSlug)
  const prevLesson = currentIndex > 0 ? categoryLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < categoryLessons.length - 1 ? categoryLessons[currentIndex + 1] : null
  const category = categories.find(c => c.slug === categorySlug)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link to={`/${lang}/`} className="hover:text-primary no-underline">{t('nav.home')}</Link>
        <span>/</span>
        <Link to={`/${lang}/resources`} className="hover:text-primary no-underline">{t('nav.resources')}</Link>
        <span>/</span>
        <Link to={`/${lang}/resources/${categorySlug}`} className="hover:text-primary no-underline">
          {t(`categories.${categorySlug}`)}
        </Link>
        <span>/</span>
        <span className="text-gray-700">{lesson.title}</span>
      </nav>

      {/* Lesson header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <LevelBadge level={lesson.level} size="md" />
          <span className="text-sm text-gray-500">{lesson.readingTime} {t('resources.readTime')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-lg text-gray-600 mt-3">{lesson.description}</p>
        )}
      </header>

      {/* Content */}
      <article className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
      </article>

      {/* Curated links */}
      {lesson.curatedLinks && lesson.curatedLinks.length > 0 && (
        <section className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('lesson.relatedResources')}</h2>
          <div className="space-y-3">
            {lesson.curatedLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors no-underline"
              >
                <div className="font-medium text-primary">{link.title}</div>
                {link.provider && <div className="text-xs text-gray-500 mt-1">{link.provider}</div>}
                {link.description && <div className="text-sm text-gray-600 mt-1">{link.description}</div>}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <nav className="mt-10 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center gap-4">
          {prevLesson ? (
            <Link
              to={`/${lang}/lesson/${categorySlug}/${prevLesson.slug}`}
              className="flex items-center gap-2 text-primary hover:text-primary-dark no-underline"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <div>
                <div className="text-xs text-gray-500">{t('lesson.previousLesson')}</div>
                <div className="font-medium text-sm">{prevLesson.title}</div>
              </div>
            </Link>
          ) : <div />}

          {nextLesson ? (
            <Link
              to={`/${lang}/lesson/${categorySlug}/${nextLesson.slug}`}
              className="flex items-center gap-2 text-primary hover:text-primary-dark text-right no-underline"
            >
              <div>
                <div className="text-xs text-gray-500">{t('lesson.nextLesson')}</div>
                <div className="font-medium text-sm">{nextLesson.title}</div>
              </div>
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          ) : <div />}
        </div>

        <div className="text-center mt-6">
          <Link
            to={`/${lang}/resources/${categorySlug}`}
            className="text-accent hover:text-accent-dark font-medium text-sm no-underline"
          >
            {t('lesson.backToCategory', { category: t(`categories.${categorySlug}`) })}
          </Link>
        </div>
      </nav>
    </div>
  )
}
