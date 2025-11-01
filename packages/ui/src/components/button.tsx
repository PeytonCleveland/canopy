'use client'

import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton } from 'react-aria-components'
import { cn } from '../utils/cn'

export interface ButtonProps extends AriaButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
}

const buttonVariants = {
	primary:
		'bg-[rgb(var(--color-brand-600))] text-white hover:bg-[rgb(var(--color-brand-700))] pressed:bg-[rgb(var(--color-brand-800))] disabled:bg-[rgb(var(--color-gray-300))] disabled:text-[rgb(var(--color-gray-500))]',
	secondary:
		'bg-[rgb(var(--color-gray-100))] text-[rgb(var(--color-gray-900))] hover:bg-[rgb(var(--color-gray-200))] pressed:bg-[rgb(var(--color-gray-300))] dark:bg-[rgb(var(--color-gray-800))] dark:text-[rgb(var(--color-gray-100))] dark:hover:bg-[rgb(var(--color-gray-700))]',
	outline:
		'border border-[rgb(var(--color-gray-300))] bg-transparent hover:bg-[rgb(var(--color-gray-50))] pressed:bg-[rgb(var(--color-gray-100))] dark:border-[rgb(var(--color-gray-700))] dark:hover:bg-[rgb(var(--color-gray-800))]',
	ghost:
		'bg-transparent hover:bg-[rgb(var(--color-gray-100))] pressed:bg-[rgb(var(--color-gray-200))] dark:hover:bg-[rgb(var(--color-gray-800))]',
}

const buttonSizes = {
	sm: 'h-8 px-3 text-sm',
	md: 'h-10 px-4 text-base',
	lg: 'h-12 px-6 text-lg',
}

export function Button({
	variant = 'primary',
	size = 'md',
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<AriaButton
			className={cn(
				'inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-colors',
				'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-brand-600))]',
				'disabled:cursor-not-allowed disabled:opacity-50',
				buttonVariants[variant],
				buttonSizes[size],
				className
			)}
			{...props}
		>
			{children}
		</AriaButton>
	)
}
