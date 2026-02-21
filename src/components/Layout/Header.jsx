import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hasResults, setHasResults] = useState(false)

  useEffect(() => {
    setHasResults(!!localStorage.getItem('ai4t-kas-results'))
    const onStorage = () => setHasResults(!!localStorage.getItem('ai4t-kas-results'))
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const navLinks = [
    { to: `/${lang}/`, label: t('nav.home') },
    { to: `/${lang}/resources`, label: t('nav.resources') },
    { to: `/${lang}/assessment`, label: t('nav.assessment') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={`/${lang}/`} className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">AI4Teachers</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-primary font-medium transition-colors no-underline"
              >
                {link.label}
              </Link>
            ))}
            {hasResults && (
              <Link
                to={`/${lang}/assessment?view=results`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent hover:bg-accent/20 rounded-lg text-sm font-medium transition-colors no-underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('nav.myResults')}
              </Link>
            )}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-100 pt-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-gray-600 hover:text-primary font-medium no-underline"
              >
                {link.label}
              </Link>
            ))}
            {hasResults && (
              <Link
                to={`/${lang}/assessment?view=results`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-1.5 py-2 text-accent font-medium no-underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('nav.myResults')}
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
