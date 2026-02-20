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
        accent: {
          DEFAULT: '#E8732A',
          light: '#F09050',
          dark: '#C55E1E',
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
