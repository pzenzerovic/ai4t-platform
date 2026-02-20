import { useTranslation } from 'react-i18next'

export default function KASProgress({
  currentQuestion,
  totalQuestions,
  categoryIndex,
  totalCategories,
  categoryName,
}) {
  const { t } = useTranslation()
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-primary">
          {t('kas.sectionOf', { current: categoryIndex + 1, total: totalCategories })}: {categoryName}
        </span>
        <span className="text-sm text-gray-500">
          {t('kas.questionOf', { current: currentQuestion + 1, total: totalQuestions })}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
