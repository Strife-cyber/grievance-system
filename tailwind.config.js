/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  darkMode: 'class', // Enable dark mode based on a class (e.g., 'dark' on body)
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: '#FF8C00', // Bright orange
        secondary: '#FF4500', // Red-Orange
        light: '#FFA500', // Standard orange
        lightest: '#E5A100', // Light gold
        golden: '#E5A100', // Same as lightest
        grayish: '#E0E0E0', // Light gray
        background: '#F5F5F5', // Nice light background white
        text: '#333333', // Dark gray for text
        pastel: '#FFAA4D',
        soft: '#FFB347',
        reddish: '#FF8C42',

        // Dark theme colors
        'dark-primary': '#FFA500', // Lighter, golden orange
        'dark-secondary': '#FF6347', // Tomato red
        'dark-light': '#FFD700', // Gold yellow
        'dark-lightest': '#D4AF37', // Darker gold
        'dark-background': '#1E1E1E', // Dark background
        'dark-text': '#F5F5F5', // Light text for dark theme
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        montaga: ['Montaga', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        xs: { max: '640px' },
      },
    },
  },
  plugins: [],
}
