import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

export interface CardProps {
	children: ReactNode
	className?: string
	padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingVariants = {
	none: 'p-0',
	sm: 'p-4',
	md: 'p-6',
	lg: 'p-8',
}

export function Card({ children, className, padding = 'md' }: CardProps) {
	return (
		<div
			className={cn(
				'rounded-[var(--radius-lg)] border border-[rgb(var(--color-gray-200))] bg-white shadow-[var(--shadow-sm)]',
				'dark:border-[rgb(var(--color-gray-800))] dark:bg-[rgb(var(--color-gray-900))]',
				paddingVariants[padding],
				className
			)}
		>
			{children}
		</div>
	)
}

export interface CardHeaderProps {
	children: ReactNode
	className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
	return (
		<div
			className={cn(
				'mb-4 border-b border-[rgb(var(--color-gray-200))] pb-4',
				'dark:border-[rgb(var(--color-gray-800))]',
				className
			)}
		>
			{children}
		</div>
	)
}

export interface CardTitleProps {
	children: ReactNode
	className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
	return (
		<h3
			className={cn(
				'text-lg font-semibold text-[rgb(var(--color-gray-900))]',
				'dark:text-[rgb(var(--color-gray-100))]',
				className
			)}
		>
			{children}
		</h3>
	)
}

export interface CardDescriptionProps {
	children: ReactNode
	className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
	return (
		<p
			className={cn(
				'mt-1 text-sm text-[rgb(var(--color-gray-600))]',
				'dark:text-[rgb(var(--color-gray-400))]',
				className
			)}
		>
			{children}
		</p>
	)
}

export interface CardContentProps {
	children: ReactNode
	className?: string
}

export function CardContent({ children, className }: CardContentProps) {
	return <div className={cn('', className)}>{children}</div>
}

export interface CardFooterProps {
	children: ReactNode
	className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
	return (
		<div
			className={cn(
				'mt-4 flex items-center gap-2 border-t border-[rgb(var(--color-gray-200))] pt-4',
				'dark:border-[rgb(var(--color-gray-800))]',
				className
			)}
		>
			{children}
		</div>
	)
}
