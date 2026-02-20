import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout/Layout'
import HomePage from './components/Home/HomePage'
import LessonList from './components/Lessons/LessonList'
import LessonPage from './components/Lessons/LessonPage'
import KASWizard from './components/KAS/KASWizard'

export default function App() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0] || 'en'

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${lang}/`} replace />} />
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="resources" element={<LessonList />} />
        <Route path="resources/:categorySlug" element={<LessonList />} />
        <Route path="lesson/:categorySlug/:lessonSlug" element={<LessonPage />} />
        <Route path="assessment" element={<KASWizard />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${lang}/`} replace />} />
    </Routes>
  )
}
