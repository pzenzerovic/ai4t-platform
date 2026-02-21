import { useEffect } from 'react'
import { Outlet, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
