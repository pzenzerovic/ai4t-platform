import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

// Only languages with substantial lesson content translated are shown.
// To re-enable HR or EL, uncomment the relevant line below once translations land.
const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  // { code: 'hr', label: 'HR', flag: '🇭🇷' },
  // { code: 'el', label: 'EL', flag: '🇬🇷' },
  { code: 'ro', label: 'RO', flag: '🇷🇴' },
]

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useParams()
  const current = (i18n.resolvedLanguage || i18n.language || '').split('-')[0]

  const handleChange = (newLang) => {
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`)
    i18n.changeLanguage(newLang)
    navigate(newPath)
  }

  return (
    <div className="flex items-center gap-1">
      {languages.map(l => {
        // Compare the base code: a detected "en-GB" still means the EN button is
        // the active one, and previously neither button was marked in that case.
        const isActive = current === l.code
        return (
          <button
            key={l.code}
            onClick={() => handleChange(l.code)}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              isActive
                ? 'bg-primary text-white font-semibold'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
            // Label goes through t() so it is spoken in the language of the page,
            // and aria-pressed says which language is currently on — colour alone
            // did not (AIT-16, finding 10).
            aria-label={t('a11y.switchLanguage', { lang: l.label })}
            aria-pressed={isActive}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
