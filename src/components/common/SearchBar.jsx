import { useTranslation } from 'react-i18next'
import { SearchIcon } from './Icons'

export default function SearchBar({ value, onChange }) {
  const { t } = useTranslation()

  return (
    <div className="relative mb-6">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={t('resources.searchPlaceholder')}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
    </div>
  )
}
