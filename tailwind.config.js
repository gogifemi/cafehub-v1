const defaultTheme = require('tailwindcss/defaultTheme');

const withOpacity = (variable) => `hsl(var(${variable}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        /* Semantic color tokens backed by CSS variables */
        bg: {
          DEFAULT: withOpacity('--color-bg'),
          soft: withOpacity('--color-bg-soft')
        },
        surface: {
          DEFAULT: withOpacity('--color-surface'),
          subtle: withOpacity('--color-surface-subtle'),
          elevated: withOpacity('--color-surface-elevated')
        },
        border: {
          DEFAULT: withOpacity('--color-border'),
          subtle: withOpacity('--color-border-subtle'),
          strong: withOpacity('--color-border-strong')
        },
        text: {
          DEFAULT: withOpacity('--color-text'),
          muted: withOpacity('--color-text-muted'),
          subtle: withOpacity('--color-text-subtle'),
          accent: withOpacity('--color-text-accent')
        },
        accent: {
          DEFAULT: withOpacity('--color-accent'),
          soft: withOpacity('--color-accent-soft'),
          strong: withOpacity('--color-accent-strong')
        },
        status: {
          success: withOpacity('--color-success'),
          warning: withOpacity('--color-warning'),
          info: withOpacity('--color-info')
        },
        core: {
          black: withOpacity('--core-black'),
          white: withOpacity('--core-white')
        }
      }
    }
  },
  plugins: []
};

