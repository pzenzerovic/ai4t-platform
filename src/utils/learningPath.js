import { getAllLessons } from './markdownLoader'
import curatedLinks from '../data/curated-links.json'

export function generateLearningPath(scores, lang = 'en') {
  // Sort categories by score ascending (weakest first)
  const sorted = [...scores].sort((a, b) => a.score - b.score)
  const allLessons = getAllLessons(lang)
  const path = []

  for (const catScore of sorted) {
    const categoryLessons = allLessons.filter(l => l.category === catScore.categoryId)
    const level = catScore.level

    let recommended = []

    if (level === 'beginner') {
      // Recommend Beginner + Intermediate lessons
      recommended = categoryLessons.filter(
        l => l.level === 'beginner' || l.level === 'intermediate'
      )
    } else if (level === 'intermediate') {
      // Recommend Intermediate + Advanced lessons
      recommended = categoryLessons.filter(
        l => l.level === 'intermediate' || l.level === 'advanced'
      )
    } else {
      // Advanced: recommend Advanced lessons + curated links
      recommended = categoryLessons.filter(l => l.level === 'advanced')
    }

    // Sort by order
    recommended.sort((a, b) => (a.order || 99) - (b.order || 99))

    for (const lesson of recommended) {
      path.push({
        type: 'lesson',
        title: lesson.title,
        category: catScore.categoryName,
        categorySlug: catScore.categoryId,
        level: lesson.level,
        readingTime: lesson.readingTime,
        slug: lesson.slug,
      })
    }

    // For advanced users, add curated links
    if (level === 'advanced') {
      const links = curatedLinks[catScore.categoryId] || []
      const advancedLinks = links.filter(l => l.level === 'advanced').slice(0, 3)
      for (const link of advancedLinks) {
        path.push({
          type: 'external',
          title: link.title,
          category: catScore.categoryName,
          categorySlug: catScore.categoryId,
          level: link.level,
          provider: link.provider,
          url: link.url,
        })
      }
    }
  }

  return path
}
