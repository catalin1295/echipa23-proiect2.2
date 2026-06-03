/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Font 1: Bricolage Grotesque — headings (distinctiv, geometric)
        heading: ['Bricolage Grotesque', 'sans-serif'],
        // Font 2: Nunito — body (curat, lizibil)
        sans: ['Nunito', 'sans-serif'],
        // Font 3: Playfair Display — accente italic/serif
        accent: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
