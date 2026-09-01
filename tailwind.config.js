/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B547E',
          light: '#3A6FA0',
          dark: '#1E3A5F',
          50: '#EEF3F8',
        },
        // Brand orange, WCAG AA edition.
        //
        // The old #E8732A scored 3.04:1 against white, which fails AA for small
        // text (4.5:1) in BOTH directions -- WCAG contrast is symmetric, so
        // orange-on-white and white-on-orange are literally the same number.
        // That means one shade can serve both, and no component needs to pick
        // a different token depending on which way round it is used.
        //
        // DEFAULT keeps the brand hue and saturation exactly and lowers only
        // lightness: hsl(23.1, 80.5%, 53.7%) -> hsl(22.9, 80.0%, 37.3%).
        // One axis moved, so it still reads as the same orange.
        accent: {
          DEFAULT: '#AB4D13', // 5.52:1 on white — text on light, and white text on it
          light: '#F09050',   // 7.44:1 on gray-900 — the dark-surface variant (footer)
          dark: '#893E0F',    // 7.61:1 on white — hover/active, and emphasis text
          vivid: '#E8732A',   // the original brand orange — DECORATION ONLY.
                              // Never put text on or in this: it is 3.04:1.
                              // Used for the hero glow, where an AA-dark orange
                              // over the dark blue gradient would kill the warmth.
          50: '#FEF3EC',
        },
        warm: {
          50: '#FFFBF5',
          100: '#FFF7ED',
          200: '#FEECD6',
        },
        level: {
          beginner: '#22C55E',
          intermediate: '#3B82F6',
          advanced: '#8B5CF6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}
