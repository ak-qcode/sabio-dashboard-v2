/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      'dop-color': '#B9BADB',
      'grey-color': '#151515',
      'white-opacity-color': '#1F1F1F',
      'dark-blue-color': '#000B36',
      'blue-color': '#0C1A98',
      'accent-green-color': '#17F871',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin', {
      charts: true,
    }),
  ],
}

