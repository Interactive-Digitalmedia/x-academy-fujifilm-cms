'use client'

import type React from 'react'

import { createContext, useContext, useEffect, useState } from 'react'

type ColorTheme = 'blue' | 'black'
type Mode = 'light' | 'dark' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultColorTheme?: ColorTheme
  defaultMode?: Mode
  storageKey?: string
}

type ThemeProviderState = {
  colorTheme: ColorTheme
  mode: Mode
  setColorTheme: (colorTheme: ColorTheme) => void
  setMode: (mode: Mode) => void
}

const initialState: ThemeProviderState = {
  colorTheme: 'blue',
  mode: 'system',
  setColorTheme: () => null,
  setMode: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultColorTheme = 'blue',
  defaultMode = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(defaultColorTheme)
  const [mode, setMode] = useState<Mode>(defaultMode)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove(
      'theme-blue-light',
      'theme-blue-dark',
      'theme-black-light',
      'theme-black-dark',
      'light',
      'dark'
    )

    // Determine if we should use dark mode
    let isDark = false
    if (mode === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    } else {
      isDark = mode === 'dark'
    }

    // Apply the appropriate theme class
    if (isDark) {
      root.classList.add('dark')
      // root.classList.add(`theme-${colorTheme}-dark`)
    } else {
      // root.classList.add(`theme-${colorTheme}-light`)
    }
  }, [colorTheme, mode])

  const value = {
    colorTheme,
    mode,
    setColorTheme: (colorTheme: ColorTheme) => {
      localStorage.setItem(`${storageKey}-color`, colorTheme)
      setColorTheme(colorTheme)
    },
    setMode: (mode: Mode) => {
      localStorage.setItem(`${storageKey}-mode`, mode)
      setMode(mode)
    }
  }

  useEffect(() => {
    const savedColorTheme = localStorage.getItem(
      `${storageKey}-color`
    ) as ColorTheme | null
    const savedMode = localStorage.getItem(`${storageKey}-mode`) as Mode | null

    if (savedColorTheme) {
      setColorTheme(savedColorTheme)
    }

    if (savedMode) {
      setMode(savedMode)
    } 
    // else {
    //   const prefersDark = window.matchMedia(
    //     '(prefers-color-scheme: light)'
    //   ).matches
    //   setMode(prefersDark ? 'dark' : 'light')
    // }
  }, [storageKey])

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
