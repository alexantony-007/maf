/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kid-red': '#FF6B6B',
        'kid-blue': '#4D96FF',
        'kid-yellow': '#FFD93D',
        'kid-green': '#6BCB77',
        'kid-purple': '#9B72CF',
        'kid-pink': '#FF8ACE',
        'kid-orange': '#FF9F43',
        'kid-cyan': '#00D2D3',
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        'kids': ['"Inter"', 'sans-serif'],
      },
      animation: {
        'bouncy': 'bouncy 0.3s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bouncy: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
