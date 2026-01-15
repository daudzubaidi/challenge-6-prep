import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors (from Figma Design System - Movie Explorer Dark Theme)
        primary: {
          DEFAULT: '#7f1d1d',  // Very dark burgundy for buttons (exact Figma match)
          dark: '#6B1212',
          light: '#8B1818',
          hover: '#991b1b',
        },
        // Secondary Accent Color
        secondary: {
          DEFAULT: '#4ecdc4',  // Teal for secondary actions
          dark: '#45b7aa',
          light: '#6ee7dd',
        },
        // Text Colors (from Figma - Light theme on dark background)
        text: {
          primary: '#ffffff',     // Pure white for primary text
          secondary: '#b0b0b0',   // Light gray for secondary text
          tertiary: '#666666',    // Gray for disabled/hints
        },
        // Background Colors (from Figma - Dark theme)
        background: {
          dark: '#000000',        // Pure black as per Figma spec
          darker: '#1a1a1a',      // Card backgrounds
          medium: '#2d2d2d',      // Hover states
        },
        // Gray Scale (Neutral) - Adjusted for dark theme
        gray: {
          25: '#ffffff',
          50: '#f5f5f5',
          100: '#eeeeee',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#b0b0b0',  // Light gray for secondary text
          500: '#888888',
          600: '#666666',
          700: '#444444',
          800: '#1a1a1a',  // Dark gray for cards
          900: '#000000',  // Black
        },
        // Neutral colors with Figma names
        neutral: {
          25: '#fdfdfd',
          50: '#f5f5f5',
          100: '#eeeeee',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#a4a7ae',
          500: '#888888',
          600: '#717680',
          700: '#444444',
          800: '#252b37',
          900: '#181d27',
        },
        // Base colors
        'base': {
          black: '#000000',
          'black/60': 'rgba(10,13,18,0.6)',
        },
        'neutral-black': '#0a0d12',
        // Additional Colors from Figma
        success: {
          DEFAULT: '#4ecdc4',
          background: 'rgba(78, 205, 196, 0.1)',
          text: '#4ecdc4',
        },
        error: {
          DEFAULT: '#ff6b6b',
          light: '#ff8787',
          dark: '#e63946',
        },
        warning: {
          DEFAULT: '#ffd93d',
          light: '#ffff66',
        },
      },
      fontFamily: {
        sans: ['"Poppins"', 'system-ui', '-apple-system', 'sans-serif'],
        poppins: ['"Poppins"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Display Sizes (from Figma Design System)
        'display-3xl': ['56px', { lineHeight: '72px' }],
        'display-2xl': ['48px', { lineHeight: '60px' }],
        'display-xl': ['40px', { lineHeight: '56px' }],
        'display-lg': ['36px', { lineHeight: '48px' }],
        'display-md': ['32px', { lineHeight: '46px' }],
        'display-sm': ['28px', { lineHeight: '38px' }],
        'display-xs': ['24px', { lineHeight: '36px' }],
        // Text Sizes (from Figma Design System)
        'text-xl': ['20px', { lineHeight: '34px' }],
        'text-lg': ['18px', { lineHeight: '32px' }],
        'text-md': ['16px', { lineHeight: '30px' }],
        'text-sm': ['14px', { lineHeight: '28px' }],
        'text-xs': ['12px', { lineHeight: '24px' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      spacing: {
        // Spacing Scale from Figma (16px base)
        '0': '0px',
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '35': '140px',
      },
      borderRadius: {
        // Border Radius from Figma
        none: '0px',
        'xs': '2px',
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        full: '9999px',
      },
      maxWidth: {
        // Container widths from Figma
        'container-desktop': '1160px',
        'container-mobile': '361px',
      },
      height: {
        // Component heights from Figma
        'header-desktop': '90px',
        'header-mobile': '64px',
        'footer': '120px',
        'hero-desktop': '810px',
        'hero-mobile': '392px',
        'button-lg': '52px',
        'button-md': '44px',
        'search-lg': '56px',
        'search-md': '44px',
      },
      width: {
        // Component widths from Figma
        'logo-desktop': '129px',
        'logo-mobile': '92px',
        'search-bar': '243px',
        'movie-card-desktop': '216px',
        'movie-card-mobile': '173px',
      },
    },
  },
  plugins: [],
};

export default config;
