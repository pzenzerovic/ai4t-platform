import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'hr', label: 'HR', flag: '🇭🇷' },
  { code: 'el', label: 'EL', flag: '🇬🇷' },
  { code: 'ro', label: 'RO', flag: '🇷🇴' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useParams()

  const handleChange = (newLang) => {
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`)
    i18n.changeLanguage(newLang)
    navigate(newPath)
  }

  return (
    <div className="flex items-center gap-1">
      {languages.map(l => (
        <button
          key={l.code}
          onClick={() => handleChange(l.code)}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            i18n.language === l.code
              ? 'bg-primary text-white font-semibold'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          }`}
          aria-label={`Switch to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
