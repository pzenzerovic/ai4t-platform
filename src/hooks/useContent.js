import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getAllLessons, getLessonsByCategory, getLesson } from '../utils/markdownLoader'

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
