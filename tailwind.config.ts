import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand uses the third violet variant (#7928FE)
        brand: {
          DEFAULT: '#7928FE',
          dark: '#5b01eb'
        },
        violetA: {
          DEFAULT: '#772FF2',
          100: '#160337',
          200: '#2c076d',
          300: '#430aa4',
          400: '#590edb',
          500: '#772ff2',
          600: '#935af4',
          700: '#ae83f7',
          800: '#c9adfa',
          900: '#e4d6fc'
        },
        violetB: {
          DEFAULT: '#762CFB',
          100: '#15013a',
          200: '#2a0274',
          300: '#3f04ae',
          400: '#5405e8',
          500: '#762cfb',
          600: '#9157fc',
          700: '#ac81fc',
          800: '#c8abfd',
          900: '#e3d5fe'
        },
        violetC: {
          DEFAULT: '#7928FE',
          100: '#17003b',
          200: '#2d0176',
          300: '#4401b1',
          400: '#5b01eb',
          500: '#7928fe',
          600: '#9654fe',
          700: '#b07ffe',
          800: '#caaaff',
          900: '#e5d4ff'
        },
        blue_violet: {
          DEFAULT: '#742FE9',
          100: '#160533',
          200: '#2c0b66',
          300: '#421098',
          400: '#5815cb',
          500: '#742fe9',
          600: '#8f59ee',
          700: '#ab82f2',
          800: '#c7acf6',
          900: '#e3d5fb'
        },
        brand_white: {
          DEFAULT: '#FEFEFE',
          100: '#333333',
          200: '#666666',
          300: '#999999',
          400: '#cccccc',
          500: '#fefefe',
          600: '#ffffff',
          700: '#ffffff',
          800: '#ffffff',
          900: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Inter', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;


