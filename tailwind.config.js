/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- ADD THIS SECTION ---
      backgroundImage: {
        'radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      // ------------------------
      keyframes: {
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        lightwave: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      animation: {
        aurora: 'aurora 20s ease infinite',
        lightwave: 'lightwave 30s ease infinite',
      },
    },
  },
  plugins: [],
}