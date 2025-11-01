'use client'

import type { InputProps as AriaInputProps } from 'react-aria-components'
import { Input as AriaInput, Label, TextField } from 'react-aria-components'
import { cn } from '../utils/cn'

export interface InputProps extends Omit<AriaInputProps, 'className'> {
	label?: string
	description?: string
	errorMessage?: string
	className?: string
	containerClassName?: string
}

export function Input({
	label,
	description,
	errorMessage,
	className,
	containerClassName,
	...props
}: InputProps) {
	return (
		<TextField
			className={cn('flex flex-col gap-1', containerClassName)}
			isInvalid={!!errorMessage}
		>
			{label && (
				<Label className="text-sm font-medium text-[rgb(var(--color-gray-700))] dark:text-[rgb(var(--color-gray-300))]">
					{label}
				</Label>
			)}
			<AriaInput
				className={cn(
					'w-full rounded-[var(--radius-md)] border border-[rgb(var(--color-gray-300))] bg-white px-3 py-2 text-sm',
					'placeholder:text-[rgb(var(--color-gray-400))]',
					'focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-[rgb(var(--color-brand-600))]',
					'disabled:cursor-not-allowed disabled:opacity-50',
					'dark:border-[rgb(var(--color-gray-700))] dark:bg-[rgb(var(--color-gray-900))] dark:text-[rgb(var(--color-gray-100))]',
					'invalid:border-[rgb(var(--color-red-500))] invalid:focus:outline-[rgb(var(--color-red-500))]',
					className
				)}
				{...props}
			/>
			{description && !errorMessage && (
				<p className="text-xs text-[rgb(var(--color-gray-500))]">
					{description}
				</p>
			)}
			{errorMessage && (
				<p className="text-xs text-[rgb(var(--color-red-600))]">
					{errorMessage}
				</p>
			)}
		</TextField>
	)
}
