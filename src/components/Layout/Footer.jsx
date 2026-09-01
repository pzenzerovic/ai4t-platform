import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

// Official EU emblem, "Co-funded by the European Union" horizontal lockup,
// NEG variant (white wording, flag keeps its white keyline) because this footer
// is dark. Sources and provenance: EU-EMBLEM-SOURCES.md in the repo root.
// hr is not exposed in the language switcher yet, but the asset is in place.
// Intrinsic sizes are carried so the browser reserves the box and the footer
// does not shift while the image loads. Widths differ because the wording does.
const EMBLEMS = {
  en: { src: '/images/eu-emblem/en.png', w: 645, h: 144 },
  hr: { src: '/images/eu-emblem/hr.png', w: 549, h: 144 },
  ro: { src: '/images/eu-emblem/ro.png', w: 643, h: 144 },
  el: { src: '/images/eu-emblem/el.png', w: 767, h: 144 },
}

const partners = [
  { name: 'OS Ivana Cankara', location: 'Zagreb, Croatia', role: 'Coordinator' },
  { name: '105 Dimotiko Scholio Thessalonikis', location: 'Thessaloniki, Greece' },
  { name: 'OS Horvati', location: 'Zagreb, Croatia' },
  { name: 'Asociatia Adfaber', location: 'București, Romania' },
  { name: 'EDUKA', location: 'Zagreb, Croatia' },
]

export default function Footer() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const emblem = EMBLEMS[lang] || EMBLEMS.en

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
                  {/* accent-light, not accent: this footer is dark, so the
                      orange has to go lighter here, not darker (7.44:1). */}
                  {p.role && <span className="text-accent-light text-xs ml-2">({p.role})</span>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* The official emblem carries the short funding statement as set
                type inside the artwork, so the separate text line that used to
                sit beside the placeholder is gone -- it would print the same
                sentence twice, on screen and again to a screen reader. The
                wording survives verbatim as the alt text. The long disclaimer
                paragraph below is a different, prescribed text and must not be
                merged into this one -- it names AMPEU (our national agency,
                the granting authority for this decentralised KA210 action),
                not EACEA. See AIT-33 decision memo. */}
            <div className="flex items-center gap-5 mb-4 flex-wrap">
              <img
                src={emblem.src}
                width={emblem.w}
                height={emblem.h}
                alt={t('footer.euFunding')}
                className="h-12 w-auto flex-shrink-0"
              />
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
