import { useEffect } from 'react'
import { Outlet, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { lang } = useParams()
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang)
    }
    // The document language has to follow the route, not the build. Without this
    // a screen reader reads the Romanian pages with English pronunciation rules
    // (AIT-16, finding 1 / WCAG 3.1.1).
    document.documentElement.lang = lang || 'en'
  }, [lang, i18n])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Visible only once focused: lets a keyboard user jump the header instead of
          tabbing through it on every page (AIT-16, finding 12 / WCAG 2.4.1). */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-medium focus:no-underline"
      >
        {t('a11y.skipToContent')}
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
