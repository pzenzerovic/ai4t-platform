import { useTranslation } from 'react-i18next'

const partners = [
  { name: 'OS Ivana Cankara', location: 'Zagreb, Croatia', role: 'Coordinator' },
  { name: '105 Dimotiko Scholio Thessalonikis', location: 'Thessaloniki, Greece' },
  { name: 'OS Horvati', location: 'Zagreb, Croatia' },
  { name: 'Asociatia Adfaber', location: 'București, Romania' },
  { name: 'EDUKA', location: 'Zagreb, Croatia' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.partners')}</h3>
            <ul className="space-y-2">
              {partners.map(p => (
                <li key={p.name} className="text-sm">
                  <span className="text-gray-100">{p.name}</span>
                  <span className="text-gray-400"> — {p.location}</span>
                  {p.role && <span className="text-accent text-xs ml-2">({p.role})</span>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* EU emblem with the short funding statement required alongside it.
                This is the badge-length wording; the long EACEA paragraph below is
                a separate, prescribed text and must not be merged into this one. */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-12 h-8 bg-blue-800 rounded flex items-center justify-center">
                  <span className="text-yellow-400 text-xs font-bold">EU</span>
                </div>
                <span className="text-sm font-medium text-gray-100">
                  {t('footer.euFunding')}
                </span>
              </div>
              <span className="flex-shrink-0 px-3 py-1 bg-blue-700 rounded text-white text-xs font-semibold">
                Erasmus+
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              {t('footer.disclaimer')}
            </p>
            <p className="text-xs text-gray-400">
              {t('footer.projectNumber')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-400">
          <p>AI4Teachers — Erasmus+ KA210-SCH</p>
        </div>
      </div>
    </footer>
  )
}
