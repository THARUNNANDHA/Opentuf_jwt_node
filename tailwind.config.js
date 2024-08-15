/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/assets/css/**/*.css",
  ],
  screens: {
    'lsm': '375px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
  theme: {
    extend: {
      width: {
        '128': '32rem',
        '110': '27rem',
      },
      colors: {
        'cusgreen': '#4CAF4F'
      },
      minWidth: {
        '128': '32rem',
        '110': '27rem',
      },
      boxShadow: {
        'custom-shadow': '0 8px 30px 0 #262626',
      }

    },
  },
  plugins: [],
}

