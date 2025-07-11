/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'
import { channel } from 'diagnostics_channel'
import twAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      screens: {
        xs: '340px'
      },
      colors: {
        border: 'var(--border)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        framebackground: 'var(--framebackground)',
        background: 'var(--background)',
        foreground: 'hsl(var(--foreground))',
        calendar_hours_hover: 'var(--calendar-hours-hover)',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Custom app colors
        disable: 'var(--disable)',

        'note-bg': 'var(--note-bg)',
        'note-hover': 'var(--note-hover)',
        'sidebar-bg': 'hsl(var(--sidebar-bg))',
        'header-bg': 'hsl(var(--header-bg))',
        'banner-overlay': 'hsl(var(--banner-overlay))',
        'task-bg': 'hsl(var(--task-bg))',
        'priority-bg': 'hsl(var(--priority-bg))',
        'priority-text': 'hsl(var(--priority-text))',
        'save-button-bg': 'hsl(var(--save-button-bg))',
        'save-button-text': 'hsl(var(--save-button-text))',
        'checkbox-bg': 'hsl(var(--checkbox-bg))',
        'checkbox-border': 'hsl(var(--checkbox-border))'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        modalIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.95) translateY(20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1) translateY(0)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        modalIn: 'modalIn 900ms ease-out forwards'
      }
    }
  },
  // darkMode: "class",
  plugins: [twAnimate, nextui(), require('tailwindcss-animate'),require('@tailwindcss/typography')]
}
