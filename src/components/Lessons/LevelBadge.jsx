import { useTranslation } from 'react-i18next'

const colorMap = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
  advanced: 'bg-purple-100 text-purple-700 border-purple-200',
}

export default function LevelBadge({ level, size = 'sm' }) {
  const { t } = useTranslation()
  const colors = colorMap[level] || colorMap.beginner
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  return (
    <span className={`inline-flex items-center rounded-full border font-medium leading-none ${colors} ${sizeClass}`}>
      {t(`levels.${level}`)}
    </span>
  )
}
