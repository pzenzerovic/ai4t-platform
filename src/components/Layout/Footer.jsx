import { useTranslation } from 'react-i18next'

const partners = [
  { name: 'OS Ivana Cankara', location: 'Zagreb, Croatia', role: 'Coordinator' },
  { name: '105 Dimotiko Scholio Thessalonikis', location: 'Thessaloniki, Greece' },
  { name: 'OS Horvati', location: 'Zagreb, Croatia' },
  { name: 'Asociatia Adfaber', location: 'Timișoara, Romania' },
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
                  <span className="text-gray-500"> — {p.location}</span>
                  {p.role && <span className="text-accent text-xs ml-2">({p.role})</span>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-8 bg-blue-800 rounded flex items-center justify-center">
                <div className="text-yellow-400 text-xs font-bold">EU</div>
              </div>
              <div className="flex-shrink-0 px-3 py-1 bg-blue-700 rounded">
                <span className="text-white text-xs font-semibold">Erasmus+</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              {t('footer.disclaimer')}
            </p>
            <p className="text-xs text-gray-500">
              {t('footer.projectNumber')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>AI4Teachers — Erasmus+ KA210-SCH</p>
        </div>
      </div>
    </footer>
  )
}
