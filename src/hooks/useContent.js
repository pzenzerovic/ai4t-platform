import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getAllLessons, getLessonsByCategory, getLesson } from '../utils/markdownLoader'
import { getLessonPlans, getLessonPlan } from '../utils/lessonPlanLoader'

export function useAllLessons() {
  const { lang } = useParams()
  return useMemo(() => getAllLessons(lang || 'en'), [lang])
}

export function useLessonsByCategory(categorySlug) {
  const { lang } = useParams()
  return useMemo(
    () => categorySlug ? getLessonsByCategory(categorySlug, lang || 'en') : getAllLessons(lang || 'en'),
    [categorySlug, lang]
  )
}

export function useLesson(categorySlug, lessonSlug) {
  const { lang } = useParams()
  return useMemo(
    () => getLesson(categorySlug, lessonSlug, lang || 'en'),
    [categorySlug, lessonSlug, lang]
  )
}

// Lesson plans — classroom plans contributed by the project's schools. A separate
// collection from the course lessons, with its own loader and its own English
// fallback for languages that have no plans yet.

export function useLessonPlans() {
  const { lang } = useParams()
  return useMemo(() => getLessonPlans(lang || 'en'), [lang])
}

export function useLessonPlan(planSlug) {
  const { lang } = useParams()
  return useMemo(() => getLessonPlan(planSlug, lang || 'en'), [planSlug, lang])
}
