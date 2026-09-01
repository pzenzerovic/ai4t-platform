import { useTranslation } from 'react-i18next'

// Shown only where the plan's frontmatter says `implemented: true` — that is,
// only where the lesson is documented as having actually been taught, with a
// school report behind it. Everything else in the collection is teaching
// material that is ready to use but has no classroom record yet, and must not
// be dressed up as more than that.
export default function ImplementedBadge({ size = 'sm' }) {
  const { t } = useTranslation()
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-3 py-1 gap-1.5'

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium leading-none bg-green-100 text-green-800 border-green-200 ${sizeClass}`}
    >
      <svg
        className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {t('lessonPlans.implementedBadge')}
    </span>
  )
}
