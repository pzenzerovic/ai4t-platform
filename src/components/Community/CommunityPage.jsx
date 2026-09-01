import { useTranslation } from 'react-i18next'
import { ExternalLinkIcon } from '../common/Icons'
import usePageTitle from '../../hooks/usePageTitle'

const ESEP_URL = 'https://school-education.ec.europa.eu/en/etwinning'

// Group names and URLs come from the project's eTwinning dissemination record.
// The names are proper nouns on the platform, so — like the partner names in the
// footer — they stay as they are and only the descriptions go through i18n.
const groups = [
  {
    id: 'mediaLiteracy',
    name: 'Literacy, media literacy and critical thinking',
    url: 'https://school-education.ec.europa.eu/en/etwinning/group/literacy-media-literacy-and-critical-thinking',
    featured: true,
  },
  {
    id: 'creativeClassrooms',
    name: 'Creative and innovative classrooms - thinking outside of the box',
    url: 'https://school-education.ec.europa.eu/en/etwinning/group/creative-and-innovative-classrooms-thinking-outside-box',
  },
  {
    id: 'innovationEducation',
    name: 'Innovation and Education - AI, Creativity and Well-being with eTwinning',
    url: 'https://school-education.ec.europa.eu/en/etwinning/group/innovation-and-education-ai-creativity-and-well-being-etwinning',
  },
]

export default function CommunityPage() {
  const { t } = useTranslation()
  usePageTitle(t('community.title'))

  const featured = groups.find(g => g.featured)
  const rest = groups.filter(g => !g.featured)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t('community.title')}</h1>
        <p className="text-lg text-gray-600 mt-3 leading-relaxed">{t('community.intro')}</p>
      </header>

      {/* What eTwinning groups are, and where they live */}
      <section className="bg-primary-50 border border-primary/10 rounded-xl p-5 sm:p-6 mb-10">
        <h2 className="text-lg font-semibold text-primary-dark mb-2">{t('community.esepTitle')}</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
          {t('community.esepBody')}
        </p>
        <a
          href={ESEP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-sm transition-colors no-underline"
        >
          {t('community.esepCta')}
          <ExternalLinkIcon className="w-4 h-4" />
        </a>
      </section>

      {/* Project groups */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('community.groupsTitle')}</h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
          {t('community.groupsIntro')}
        </p>

        {featured && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white border-2 border-accent rounded-xl p-5 sm:p-6 mb-4 hover:shadow-md transition-all no-underline"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-block bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {t('community.featuredBadge')}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-accent-dark transition-colors">
                {featured.name}
              </h3>
              <ExternalLinkIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {t(`community.groups.${featured.id}`)}
            </p>
            <p className="text-sm text-accent-dark font-medium leading-relaxed">
              {t('community.featuredNote')}
            </p>
          </a>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {rest.map(group => (
            <a
              key={group.id}
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-md hover:border-gray-300 transition-all no-underline"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-base leading-snug">
                  {group.name}
                </h3>
                <ExternalLinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(`community.groups.${group.id}`)}
              </p>
            </a>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-6 leading-relaxed">{t('community.accountNote')}</p>
      </section>
    </div>
  )
}
