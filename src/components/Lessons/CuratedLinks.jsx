import { useTranslation } from 'react-i18next'
import LevelBadge from './LevelBadge'
import { ExternalLinkIcon } from '../common/Icons'

export default function CuratedLinks({ links }) {
  const { t } = useTranslation()

  if (!links || links.length === 0) return null

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('resources.curatedTitle')}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all no-underline"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm">
                {link.title}
              </h3>
              <ExternalLinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-gray-500 mb-2">{link.provider} {link.type && `— ${link.type}`}</p>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{link.description}</p>
            <LevelBadge level={link.level} />
          </a>
        ))}
      </div>
    </section>
  )
}
