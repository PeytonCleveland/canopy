'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
	const [theme, setTheme] = useState<Theme>('system')
	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		// Check localStorage for saved theme
		const savedTheme = localStorage.getItem('theme') as Theme | null
		if (savedTheme) {
			setTheme(savedTheme)
		}

		// Check system preference
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = () => {
			if (theme === 'system') {
				setResolvedTheme(mediaQuery.matches ? 'dark' : 'light')
			}
		}

		handleChange()
		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [theme])

	useEffect(() => {
		const root = document.documentElement

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light'
			setResolvedTheme(systemTheme)
			root.classList.toggle('dark', systemTheme === 'dark')
		} else {
			setResolvedTheme(theme)
			root.classList.toggle('dark', theme === 'dark')
		}

		localStorage.setItem('theme', theme)
	}, [theme])

	return {
		theme,
		resolvedTheme,
		setTheme,
	}
}
