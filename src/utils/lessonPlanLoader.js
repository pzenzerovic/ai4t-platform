// Import every lesson-plan markdown file at build time using Vite's glob import.
//
// Layout: /src/content/<lang>/lesson-plans/<NN>-<slug>.md
//
// Plans sit inside /src/content/ next to the lesson categories on purpose — they
// are content and will be translated the same way — but they are a separate
// collection with their own frontmatter (no category, no level, no description).
// That is why they get their own loader here and are deliberately skipped by
// getAllLessons() in markdownLoader.js: without that guard the course catalogue's
// glob would sweep them into the Resources library, where they belong to no
// category and would render without a level badge or a description.
const planFiles = import.meta.glob('/src/content/*/lesson-plans/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const FALLBACK_LANG = 'en'

// The plan frontmatter is a fixed 18-key block, machine-generated and verified
// upstream: every string value is JSON-quoted, `aiTools` is a JSON array (possibly
// empty), `implemented` is a bare boolean and `order` a bare integer.
//
// Parsing each value as JSON when it looks like JSON is what keeps an escaped
// quote inside a title — How Does AI \"Learn\"? — from reaching the page as a
// literal backslash, and what makes `aiTools` an actual array rather than the
// string "[...]". The hand-rolled parser in markdownLoader.js strips only the
// outer quote characters and can do neither, which is the second reason plans
// are loaded here instead of there.
function parseValue(raw) {
  const val = raw.trim()
  if (val === '') return ''
  if (val === 'true') return true
  if (val === 'false') return false
  if (/^-?\d+$/.test(val)) return parseInt(val, 10)
  if (val.startsWith('"') || val.startsWith('[') || val.startsWith('{')) {
    try {
      return JSON.parse(val)
    } catch {
      // Malformed JSON falls through to the plain-text reading below rather than
      // dropping the field: a broken quote should cost one ugly value, not a plan.
    }
  }
  return val.replace(/^['"]|['"]$/g, '')
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { metadata: {}, content: raw }

  const metadata = {}
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) metadata[kv[1]] = parseValue(kv[2])
  }

  return { metadata, content: match[2] }
}

function loadForLang(lang) {
  const prefix = `/src/content/${lang}/lesson-plans/`
  const plans = []

  for (const [path, raw] of Object.entries(planFiles)) {
    if (!path.startsWith(prefix)) continue

    const { metadata, content } = parseFrontmatter(raw)
    if (!metadata.title || !metadata.slug) continue

    plans.push({
      ...metadata,
      aiTools: Array.isArray(metadata.aiTools) ? metadata.aiTools : [],
      implemented: metadata.implemented === true,
      content,
      filePath: path,
    })
  }

  return plans.sort((a, b) => (a.order || 99) - (b.order || 99))
}

const cache = {}

// Returns every lesson plan for the requested language, in `order`.
//
// Falls back to English when a language has no plans of its own — the same rule
// the quizzes use in quizLoader.js. The plans were written in English for the
// whole partnership; Romanian versions do not exist yet, so /ro/lesson-plans/
// serves the English plans inside Romanian navigation rather than showing an
// empty section. Callers can spot that case by comparing the route language with
// `plan.language`, which always names the language the file is actually written in.
export function getLessonPlans(lang = FALLBACK_LANG) {
  if (!cache[lang]) {
    const own = loadForLang(lang)
    cache[lang] = own.length > 0 ? own : loadForLang(FALLBACK_LANG)
  }
  return cache[lang]
}

export function getLessonPlan(slug, lang = FALLBACK_LANG) {
  if (!slug) return undefined
  return getLessonPlans(lang).find(p => p.slug === slug)
}

// How many plans the collection holds, counted from the files on disk — the same
// reason getLessonCounts() exists for lessons: a number quoted on the homepage
// must not be able to drift away from what is actually published.
export function getLessonPlanCount() {
  return getLessonPlans(FALLBACK_LANG).length
}
