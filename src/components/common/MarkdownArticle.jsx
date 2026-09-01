import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// The one place markdown becomes HTML on this site.
//
// Lessons and lesson plans are both authored as markdown and must read the same:
// same prose styles, same image sizing, same YouTube handling. Keeping the
// renderer here rather than inside LessonPage is what guarantees that — a change
// to how a table or an embed looks lands on both at once, and neither can quietly
// drift into its own typography.

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
export const markdownComponents = {
  // Custom image renderer with size control and captions
  // Usage: ![Caption text](url) → full width
  //        ![Caption text|small](url) → 40% width
  //        ![Caption text|medium](url) → 65% width
  img({ src, alt }) {
    let caption = alt || ''
    let maxWidth = '100%'

    // Parse size hint from alt text: "Description|small" or "Description|medium"
    if (caption.includes('|')) {
      const parts = caption.split('|')
      caption = parts[0].trim()
      const size = parts[1].trim().toLowerCase()
      if (size === 'small') maxWidth = '40%'
      else if (size === 'medium') maxWidth = '65%'
    }

    return (
      <figure className="my-6" style={{ textAlign: 'center' }}>
        <img
          src={src}
          alt={caption}
          style={{ maxWidth, margin: '0 auto', display: 'block' }}
          className="rounded-lg"
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
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3`}
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

export default function MarkdownArticle({ children, className = 'prose max-w-none' }) {
  return (
    <article className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {children}
      </ReactMarkdown>
    </article>
  )
}
