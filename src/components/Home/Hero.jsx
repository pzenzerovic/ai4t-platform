import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from '../common/Icons'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-gradient-to-br from-[#1E3A5F] via-[#2B547E] to-[#3A6FA0] overflow-hidden">
      {/* Decorative blobs — warmer and more visible */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full bg-blue-300/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-4 font-medium">
            {t('hero.titleSub')}
          </p>
          <p className="text-base sm:text-lg text-blue-200/90 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Scroll indicator */}
          <div className="mt-10 animate-bounce-slow">
            <ChevronDownIcon className="w-6 h-6 text-white/50 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
