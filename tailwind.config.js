const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        "dashed": `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='200' ry='200' stroke='%2364A36FFF' stroke-width='4' stroke-dasharray='17' stroke-dashoffset='6' stroke-linecap='butt'/%3e%3c/svg%3e")`,
        "dashedCard": `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='44' ry='44' stroke='%2364A36FFF' stroke-width='4' stroke-dasharray='15%2c 26' stroke-dashoffset='16' stroke-linecap='round'/%3e%3c/svg%3e");`
      },
      colors: {
        primary: {
          200: '#f8ec9b',
          500: '#ffe11f',
          800: '#ffc20a',
        },
        accent: {
          200: '#cdf0b7',
          500: '#87c591',
          800: '#65a46f',
        },
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '2px 2px 5px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
    require('@tailwindcss/forms'),
  ],
};
