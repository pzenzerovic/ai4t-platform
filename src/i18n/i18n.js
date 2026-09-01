import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import hr from './locales/hr.json'
import el from './locales/el.json'
import ro from './locales/ro.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hr: { translation: hr },
      el: { translation: el },
      ro: { translation: ro },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'hr', 'el', 'ro'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // The URL is the source of truth for language: every route is /<lang>/...,
      // so the path is checked first. Without this, someone opening a shared
      // /ro/ link for the first time got Romanian lesson text inside English
      // navigation and footer — the detector had only their browser language and
      // a stale cache to go on, and the language switch that Layout performs
      // afterwards did not reach the already-rendered header and footer.
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
  })

export default i18n
