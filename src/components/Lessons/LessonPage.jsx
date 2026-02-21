import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLesson, useLessonsByCategory } from '../../hooks/useContent'
import LevelBadge from './LevelBadge'
import { ChevronLeftIcon, ChevronRightIcon } from '../common/Icons'
import categories from '../../data/categories.json'

// Extract YouTube video ID from various URL formats
function getYouTubeId(url) {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1)
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2]
      return u.searchParams.get('v')
    }
  } catch {
    return null
  }
  return null
}

// Custom Markdown components for images and video embeds
const markdownComponents = {
  // Custom image renderer with size control and captions
  // Usage: ![Caption text](url) → full width
  //        ![Caption text|small](url) → 40% width
  //        ![Caption text|medium](url) → 65% width
  img({ src, alt }) {
    let caption = alt || ''
    let sizeClass = 'max-w-full'

    // Parse size hint from alt text: "Description|small" or "Description|medium"
    if (caption.includes('|')) {
      const parts = caption.split('|')
      caption = parts[0].trim()
      const size = parts[1].trim().toLowerCase()
      if (size === 'small') sizeClass = 'max-w-[40%]'
      else if (size === 'medium') sizeClass = 'max-w-[65%]'
    }

    return (
      <figure className="my-6">
        <img
          src={src}
          alt={caption}
          className={`${sizeClass} mx-auto block rounded-lg`}
          loading="lazy"
        />
        {caption && (
          <figcaption className="text-sm text-gray-500 text-center italic mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  },

  // Custom link renderer — detects YouTube URLs and renders as embedded players
  // Usage: [Video Title](https://youtube.com/watch?v=xxxxx)
  a({ href, children }) {
    const videoId = href ? getYouTubeId(href) : null

    if (videoId) {
      const title = typeof children === 'string' ? children :
        Array.isArray(children) ? children.join('') : 'Video'

      return (
        <div className="my-6">
          <p className="text-sm font-medium text-gray-700 mb-2">{title}</p>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )
    }

    // Regular link — open external links in new tab
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'))
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },
}

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
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {lesson.content}
        </ReactMarkdown>
      </article>

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
