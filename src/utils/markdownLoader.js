// Import all markdown files at build time using Vite's glob import
const markdownFiles = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { metadata: {}, content: raw }

  const frontmatterStr = match[1]
  const content = match[2]

  const metadata = {}
  let currentKey = null
  let currentList = null

  const lines = frontmatterStr.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Check for list item under curatedLinks
    if (currentList !== null && line.match(/^\s+-\s/)) {
      // If it's a "- title:" line, start new item
      if (line.match(/^\s+-\s+\w+:/)) {
        const itemLine = line.replace(/^\s+-\s+/, '')
        const [key, ...valParts] = itemLine.split(':')
        const val = valParts.join(':').trim().replace(/^["']|["']$/g, '')

        // Check if this starts a new list item
        if (key.trim() === 'title') {
          currentList.push({ title: val })
        } else if (currentList.length > 0) {
          currentList[currentList.length - 1][key.trim()] = val
        }
      }
      continue
    }

    // Check for continuation of list item properties
    if (currentList !== null && line.match(/^\s+\w+:/)) {
      const trimmed = line.trim()
      const [key, ...valParts] = trimmed.split(':')
      const val = valParts.join(':').trim().replace(/^["']|["']$/g, '')
      if (currentList.length > 0) {
        currentList[currentList.length - 1][key.trim()] = val
      }
      continue
    }

    // Regular key: value
    const kvMatch = line.match(/^(\w+):\s*(.*)$/)
    if (kvMatch) {
      const key = kvMatch[1]
      const val = kvMatch[2].trim().replace(/^["']|["']$/g, '')

      if (val === '') {
        // Could be start of a list
        currentKey = key
        currentList = []
        metadata[key] = currentList
      } else {
        currentKey = null
        currentList = null
        // Parse numbers
        if (/^\d+$/.test(val)) {
          metadata[key] = parseInt(val, 10)
        } else {
          metadata[key] = val
        }
      }
    }
  }

  return { metadata, content }
}

export function getAllLessons(lang = 'en') {
  const lessons = []
  const prefix = `/src/content/${lang}/`

  for (const [path, raw] of Object.entries(markdownFiles)) {
    if (!path.startsWith(prefix)) continue

    const { metadata, content } = parseFrontmatter(raw)
    if (!metadata.title) continue

    // Calculate reading time from actual word count (200 wpm for educational content)
    const plainText = content.replace(/[#*`>|\-\[\]()!]/g, '').replace(/\s+/g, ' ').trim()
    const wordCount = plainText.split(' ').filter(w => w.length > 0).length
    metadata.readingTime = Math.max(1, Math.ceil(wordCount / 200))

    lessons.push({
      ...metadata,
      content,
      filePath: path,
    })
  }

  return lessons.sort((a, b) => (a.order || 99) - (b.order || 99))
}

export function getLessonsByCategory(categorySlug, lang = 'en') {
  return getAllLessons(lang).filter(l => l.category === categorySlug)
}

export function getLesson(categorySlug, lessonSlug, lang = 'en') {
  return getAllLessons(lang).find(
    l => l.category === categorySlug && l.slug === lessonSlug
  )
}
